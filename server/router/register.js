'use strict';

const argon2 = require('argon2');
const db = require('../../db');


function getRegisterRoute(req, res) {
  res.render('register', {
    pageId: 'register',
    title: 'Register',
    username: req.session.username,
    formValues: { username: null, password: null },
    formErrors: { username: null, password: null },
  });
}

async function postRegisterRoute(req, res, next) {
  try {
    let usernameExists = await db.usernameExists(req.body.username);

    let formErrors = {};
    if (!usernameExists && req.body.username) {
      formErrors.username = null;
    } else {
      formErrors.username = 'Invalid username';
    }
    if (formErrors.username) {
      res
        .status(400)
        .render('register', {
          pageId: 'register',
          title: 'Register',
          username: req.session.username,
          formErrors: formErrors,
          formValues: {
            username: req.body.username,
          },
        });
    } else {
      const hashedPassword = await argon2.hash(req.body.password);
      await db.addUser({
        username: req.body.username,
        password: hashedPassword,
      });
      res.redirect('/login');
    }
  } catch (error) {
    next(error);
  }
}


module.exports = {
  get: getRegisterRoute,
  post: postRegisterRoute,
};
