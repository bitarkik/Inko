import re

with open('apps/desktop-agent/electron/main.ts', 'r') as f:
    main_ts = f.read()

mutex_code = '''
let isPrinting = false;
async function processOrder(order: any, isAuto: boolean) {
  if (isPrinting) {
    sendLog([System] Printer busy, waiting to process ...);
    while (isPrinting) {
      await new Promise(r => setTimeout(r, 1000));
    }
  }
  isPrinting = true;
'''

main_ts = main_ts.replace('async function processOrder(order: any, isAuto: boolean) {', mutex_code.strip())

main_ts = main_ts.replace('timeout: 15000,', 'timeout: 30000,')
main_ts = main_ts.replace('return;\n  }\n\n  const localFilePath', 'isPrinting = false;\n    return;\n  }\n\n  const localFilePath')
main_ts = main_ts.replace('await handlePrintFailure(id);\n  }', 'await handlePrintFailure(id);\n  }\n  isPrinting = false;')
main_ts = main_ts.replace('sendLog([Print Spooler] Job successfully sent to printer for order .);', 'sendLog([Print Spooler] Job successfully sent to printer for order .);\n    isPrinting = false;')
main_ts = main_ts.replace('Fetched 0', 'Fetched ')

with open('apps/desktop-agent/electron/main.ts', 'w') as f:
    f.write(main_ts)

