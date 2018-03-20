const bookmarks = require('../db/bookmarks');

module.exports = function(app) {

  app.get('/api/bookmarks', function(req, res, next) {
    bookmarks.findAll(function(err, result) {
      if (err) { return next(err); }
      res.json(result);
    });
  });

  app.delete('/api/bookmarks', function(req, res, next) {
    bookmarks.deleteAll(function(err, result) {
      if (err) { return next(err); }
      res.sendStatus(204);
    });
  });

  app.post('/api/bookmarks', function(req, res, next) {
    if (!req.body.url || !req.body.name) {
      return res.sendStatus(401);
    }

    bookmarks.create(req.body, (err) => {
      if (err) { return next(err); }
      res.sendStatus(201);
    });
  });
};

