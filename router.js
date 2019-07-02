'use strict';

const express = require('express');
const db = require('./server/db');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const jerseys = await db.readJerseys();
    res
      .status(200)
      .render('home', {
        pageId: 'home',
        title: 'Home',
        jerseys: jerseys.map(jerseys => ({
          ...jerseys,
        })),
      });
  } catch (error) {
    next(error);
  }
});

router.post('/register', (req, res, next) => {
  res.statusCode = 201;
});

router.post('/login', (req, res, next) => {
  res.statusCode = 202;
});

router.get('/item', async (req, res, next) => {
  try {
    const allJerseys = await db.readJerseys();
    res
      .status(200)
      .send(allJerseys);
  } catch (error) {
    next(error);
  }
});

router.get('/item/:id', async (req, res, next) => {
  try {
    const jersey = await db.getJerseyById(req.params.id);
    res
      .json(jersey)
      .status(200);
  } catch (error) {
    next(error);
  }
});


router.post('/item', async (req, res, next) => {
  try {
    const newJersey = await db.createNewJersey({
      id: req.body.id,
      player: req.body.player,
      number: req.body.number,
      team: req.body.team,
      price: req.body.price,
    });
    res
      .json(newJersey)
      .status(200);
  } catch (error) {
    next(error);
  }
});

router.delete('/item/:id', async (req, res, next) => {
await db.removeJerseyById;

  res.statusCode = 200;
});

router.patch('/item/:id', (req, res, next) => {
  res.statusCode = 200;
});


module.exports = router;
