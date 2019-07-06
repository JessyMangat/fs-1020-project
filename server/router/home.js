'use strict';

function getHomeRoute(req, res) {
  res
    .status(200)
    .render('home', {
      pageId: 'home',
      title: 'Home',
      username: req.session.username,
  });
}


module.exports = { get: getHomeRoute };
