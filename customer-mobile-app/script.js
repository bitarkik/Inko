const fs = require('fs');
let code = fs.readFileSync('src/app/(tabs)/index.tsx', 'utf8');

const startIdx = code.indexOf('<LinearGradient');
const endIdx = code.indexOf('</LinearGradient>') + '</LinearGradient>'.length;

if (startIdx !== -1 && endIdx !== -1) {
  console.log('Found LinearGradient!');
  let gradientStr = code.substring(startIdx, endIdx);
  code = code.substring(0, startIdx) + code.substring(endIdx);
  
  gradientStr = gradientStr.replace(/paddingBottom: 44 \}\}/, 'paddingBottom: 44, marginTop: -16, marginHorizontal: -16 }}');
  
  const targetStr = '<>';
  const insertIdx = code.indexOf(targetStr, code.indexOf('const renderHeader'));
  
  if (insertIdx !== -1) {
    console.log('Found renderHeader target!');
    code = code.substring(0, insertIdx + targetStr.length) + '\n      ' + gradientStr + code.substring(insertIdx + targetStr.length);
  } else {
    console.log('Target not found!');
  }
} else {
  console.log('LinearGradient not found!');
}

if (!code.includes('<StatusBar style="light" />')) {
  code = code.replace(/<View style=\{styles\.container\}>/, '<View style={styles.container}>\n      <StatusBar style="light" />');
  console.log('Added StatusBar');
}

fs.writeFileSync('src/app/(tabs)/index.tsx', code);
