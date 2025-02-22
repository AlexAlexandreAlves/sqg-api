const fs = require('fs');
const path = require('path');
const ncp = require('ncp').ncp;

const source = path.join(__dirname, '../../../src/tests');
const destination = path.join(process.cwd(), 'tests');

ncp(source, destination, function (err) {
  if (err) {
    return console.error(err);
  }
  console.log('Tests folder copied to project directory.');
});