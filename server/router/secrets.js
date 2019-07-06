'use strict';

const db = require('../../db');

async function getSecretsRoutes(req, res, next) {
  if (!req.session.username) {
    res
      .status(403)
      .render('status/forbidden');
  } else {
    try {
      const jerseys = await db.readJerseys();
      res
        .status(200)
        .render('secrets', {
          pageId: 'Secrets',
          title: 'Secrets',
          username: req.session.username,
          jerseys: jerseys.map(jerseys => ({
            ...jerseys,
          })),
        });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = { get: getSecretsRoutes };
