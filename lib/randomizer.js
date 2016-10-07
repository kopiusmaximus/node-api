'use strict';

'use strict';

const fs = require('fs');

let inFile = process.argv[2];
let outFile = process.argv[3];

// array-shuffling function from StackOverflow
// (a JavaScript implementation of the Fisher-Yates Shuffle)
function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    console.log('randomIndex is', randomIndex);
    console.log('currentIndex is', currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


fs.readFile(inFile, 'utf8', (err, names) => {
  if (err) {
    console.error(err);
    return;
  }

  let namesArray = names.split('\n').filter(name => name);
  console.log(namesArray);
  namesArray = shuffle(namesArray);
  console.log(namesArray);

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
