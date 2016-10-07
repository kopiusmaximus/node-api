'use strict';

const fs = require('fs');

let inFile = process.argv[2];
let outFile = process.argv[3];

fs.readFile(inFile, 'utf8', (err, names) => {
  if (err) {
    console.error(err);
    return;
  }

  let namesArray = names.split('\n').filter(name => name);
  namesArray.forEach(name => {
    let line = "Hello, " + name + '!\n';
    fs.writeFile(outFile, line, {flag: 'a'}, (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });
  });
  console.log('\n Great Success!');
});
