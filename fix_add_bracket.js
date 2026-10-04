const fs = require('fs');
let text = fs.readFileSync('apps/desktop-agent/electron/main.ts', 'utf8');

text = text.replace(
  `});
});

function createWindow()`,
  `});
  });
});

function createWindow()`
);

fs.writeFileSync('apps/desktop-agent/electron/main.ts', text);
console.log('Added one back');
