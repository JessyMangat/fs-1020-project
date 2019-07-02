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
  const jersey = await readJerseys();
  let jerseyById;
  jersey.forEach((jersey) => {
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
  const jersey = await readJerseys();
  let jerseyByid;
  if (jersey.id === id) {

  }
}

module.exports = {
  readJerseys,
  writeJerseys,
  getJerseyById,
  createNewJersey,
  removeJerseyById
};
