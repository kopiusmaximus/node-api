'use strict';

const fs = require('fs');

const stdin = '/dev/stdin';
const stdout = '/dev/stdout';

//
let inFile = process.argv[2] === '-' ? stdin : process.argv[2];
// ^ this means that:
// cat data/example.json | node lib/copy-json.js -
// does the same thing as:
// node lib/copy-json.js data/example.json
let outFile = process.argv[3] ? process.argv[3] : stdout;
let outFileFlag = outFile === stdout ? 'a' : 'w';

fs.readFile(inFile, { encoding: 'utf8' }, (error, data) => {
  // declare 2 variables at once
  let json, pojo;
  // N.B. 'pojo' stands for 'plain old JavaScript object'

  // if there's an error, print to the console and kick out
  if (error) {
    console.error(error.stack);
    return;
  }
  // same as:
  // if (error) throw error;

  // We are still inside the callback function! With no errors, we move on...

  // parse the data into JSON
  try {
    pojo = JSON.parse(data);
    // if you can't parse the data into a pojo...
  } catch (error) {
    // ...catch and log the error...
    console.error(error.stack);
    // ...and kick out of the function.
    return;
    // by catching errors in several places, we ensure that we'll get good,
    // specific information about what happened if our program breaks.
  }

  // do something with the pojo
  pojo.user.email = 'butts@butts.com'

  // make a string out of the pojo
  json = JSON.stringify(pojo, null, 2);

  // save it
  fs.writeFile(outFile, json, { flag: outFileFlag }, error => {
    if (error) {
      console.error(error.stack);
      return;
    }

    console.error('\ncopied');
  });
});
