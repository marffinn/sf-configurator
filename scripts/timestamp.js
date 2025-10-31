
const fs = require('fs');
const path = require('path');

const timestamp = new Date().toLocaleString();
const content = `export const timestamp = '${timestamp}';`;

fs.writeFileSync(path.join(__dirname, '../src/timestamp.js'), content);
