import re

with open('apps/desktop-agent/electron/main.ts', 'r') as f:
    main_ts = f.read()

# 1. Mutex + Timeout in processOrder
mutex_code = '''
let isPrinting = false;

async function processOrder(order: any, isAutoPrint = false) {
  if (isPrinting) {
    sendLog([System] Printer busy, waiting to process ...);
    while (isPrinting) {
      await new Promise(r => setTimeout(r, 1000));
    }
  }
  isPrinting = true;
  try {
'''

main_ts = re.sub(r'async function processOrder\(order: any, isAutoPrint = false\) \{', mutex_code.strip(), main_ts)
main_ts = re.sub(r'async function processOrder\(order: any, isAutoPrint = false\) \{\s*try \{', mutex_code.strip(), main_ts) # in case it matches the inner try

# We need to wrap the whole processOrder body in try..finally { isPrinting = false; }
# It's easier to just append isPrinting = false; at the end of processOrder and before early returns.
main_ts = main_ts.replace("sendLog([Print Spooler] Job successfully sent to printer for order .);", "sendLog([Print Spooler] Job successfully sent to printer for order .);\n    isPrinting = false;")
main_ts = main_ts.replace("await handlePrintFailure(id);", "await handlePrintFailure(id);\n    isPrinting = false;")
main_ts = main_ts.replace("return;\n    }", "isPrinting = false;\n      return;\n    }")

# Update Axios timeouts
main_ts = main_ts.replace("await axios.get(${API_URL}/orders//download", "await axios.get(${API_URL}/orders//download, { timeout: 30000 }")
main_ts = main_ts.replace("const fileResponse = await axios.get(url,", "const fileResponse = await axios.get(url, { responseType: 'stream', timeout: 30000 }); //")
main_ts = re.sub(r"const fileResponse = await axios\.get\(url, \{\s*responseType: 'stream'\s*\}\);", "const fileResponse = await axios.get(url, { responseType: 'stream', timeout: 30000 });", main_ts)


# Diagnostic log bug
main_ts = main_ts.replace("Fetched 0 ready-to-print", "Fetched  ready-to-print")
main_ts = main_ts.replace("Fetched  ready-to-print", "Fetched  ready-to-print")

# Force-update defer
update_handler = '''
  let pendingForceUpdate = false;
  autoUpdater.on('update-downloaded', (info) => {
    sendLog([System] Update v downloaded.);
    
    const releaseNotes = (info.releaseNotes || '').toString().toUpperCase();
    const isForceUpdate = releaseNotes.includes('[FORCE_UPDATE]');
    
    win?.webContents.send('update-downloaded', { version: info.version, force: isForceUpdate });

    if (isForceUpdate) {
      sendLog('[System] FORCE UPDATE detected. Will install when idle.');
      pendingForceUpdate = true;
      checkAndInstallUpdate();
    }
  });

  function checkAndInstallUpdate() {
    if (pendingForceUpdate && !isPrinting) {
      sendLog('[System] Installing force update now...');
      autoUpdater.quitAndInstall();
    } else if (pendingForceUpdate) {
      setTimeout(checkAndInstallUpdate, 5000);
    }
  }
'''

main_ts = re.sub(r"autoUpdater\.on\('update-downloaded', \(info\) => \{.*?\n  \}\);\n", update_handler.strip() + "\n", main_ts, flags=re.DOTALL)

with open('apps/desktop-agent/electron/main.ts', 'w') as f:
    f.write(main_ts)
