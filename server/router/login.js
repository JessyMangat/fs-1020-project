'use strict';

const argon2 = require('argon2');
const db = require('../../db');

function getLoginRoute(req, res) {
  res.render('login', {
    pageId: 'login',
    title: 'Login',
    username: req.session.username,
    formError: null,
    formValues: { username: null, password: null },
  });
}

async function postLoginRoute(req, res, next) {
  try {
    let hashedPassword = await db.getUserPasswordHash(req.body.username);
    if (await argon2.verify(hashedPassword, req.body.password)) {
      req.session.username = req.body.username;
      res.redirect('/');
    } else {
      res
        .status(401)
        .render('login', {
          pageId: 'login',
          title: 'Login',
          username: req.session.username,
          formError: 'Authentication failed.',
          formValues: {
            username: req.body.username || null,
            password: req.body.password || null,
          },
        });
    }
  } catch (error) {
    next(error);
  }
}


module.exports = {
  get: getLoginRoute,
  post: postLoginRoute,
};
