const fs = require('fs');

['src/app/(tabs)/orders.tsx', 'src/app/(tabs)/profile.tsx'].forEach(file => {
  let code = fs.readFileSync(file, 'utf8');
  if (!code.includes('expo-status-bar')) {
    code = 'import { StatusBar } from \'expo-status-bar\';\n' + code;
    code = code.replace(/<View style=\{styles\.container\}>|<SafeAreaView style=\{styles\.container\}>/, match => match + '\n      <StatusBar style="dark" />');
    fs.writeFileSync(file, code);
  }
});
