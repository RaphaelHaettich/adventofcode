const fs = require('fs');
 
const fileContent = fs.readFileSync('day3/input.txt', 'utf8');

const claims = fileContent.split("\n")