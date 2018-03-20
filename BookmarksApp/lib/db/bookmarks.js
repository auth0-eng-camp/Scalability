const { Pool } = require('pg');
const config = require('config');
const client = new Pool(config.get('db'));

const bookmarks = module.exports;

bookmarks.findAll = function(callback) {
  const query = 'SELECT * FROM bookmarks;';
  return client.query(query, [], (err, result) => {
    if (err) {return callback(err); }
    callback(null, result.rows);
  });
};

bookmarks.create = function(params, callback) {
  const query = 'INSERT INTO bookmarks(user_id, name, url) values($1, $2, $3) RETURNING id';
  return client.query(query, [params.user_id, params.name, params.url], (err, result) => {
    if (err) callback(err);
    callback(null, result.rows[0].id);   
  });
};

bookmarks.deleteAll = function(callback) {
  const query = 'delete from bookmarks';
  return client.query(query, [], (err, result) => {
    if(err) callback(err);
    callback(null);
  });  
};

bookmarks.updateStatus = function(params, callback) {
  const query = 'UPDATE bookmarks SET checked_at = $1, is_ok = $2 WHERE id = $3;';
  return client.query(query, [new Date(), params.is_ok, params.id], (err, result) => {
    if (err) { return callback(err); }
    callback(null);
  });
};

bookmarks.findByUser = function(params, callback) {
  const query = 'SELECT id, name, url FROM bookmarks WHERE user_id = $1;';
  return client.query(query, [ params.user_id ], (err, result) => {
    if (err) { return callback(err); }
    callback(null, result.rows);
  });
};

bookmarks.findById = function(id, callback) {
  const query = 'SELECT id, name, url, is_ok, checked_at FROM bookmarks WHERE id = $1;';
  return client.query(query, [ id ], (err, result) => {
    if (err) { return callback(err); }
    callback(null, result.rows[0]);
  });
};