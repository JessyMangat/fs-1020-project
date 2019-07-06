'use strict';

let util = require('util');
let path = require('path');
let fs = require('fs');

let readFile = util.promisify(fs.readFile);
let writeFile = util.promisify(fs.writeFile);

const filePath = path.resolve('server/db/jerseys.json');

async function readJerseys() {
  const json = await readFile(filePath);
  return JSON.parse(json);
}

async function writeJerseys(jerseys) {
  const json = JSON.stringify(jerseys, null, 2);
  await writeFile(filePath, json);
}

async function getJerseyById(id) {
  const allJersies = await readJerseys();
  let jerseyById;
  allJersies.forEach((jersey) => {
    if (jersey.id === id) {
      jerseyById = jersey;
    }
  });
  return jerseyById;
}

async function createNewJersey(newJersey) {
  const jersey = await readJerseys();
  jersey.push(newJersey);
  return writeJerseys(jersey);
}

async function removeJerseyById(id) {
  const allJersies = await readJerseys();
  // 2
  allJersies.forEach((jersey, i) => {
    if (jersey.id === id) {
      allJersies.splice(i, 1);
    }
  });
  return writeJerseys(allJersies);
}


module.exports = {
  readJerseys,
  writeJerseys,
  getJerseyById,
  createNewJersey,
  removeJerseyById
};
