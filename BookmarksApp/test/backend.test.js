const chai = require('chai');  
const assert = chai.assert;
const expect = chai.expect;
const bookmarks = require('../lib/db/bookmarks');
const scheduler = require('../bin/scheduler');
const worker = require('../bin/worker');

describe('End2End test', function () {
  
  before(function() {
  });

  after(function() {
    setTimeout(() => {
      process.exit(0);
    }, 5000);
  });

  it('should check links', function(done) {
    const bm1 = {
      user_id: 1,
      name: 'My best bookmark',
      url: 'http://www.nba.com',
      id: undefined
    };
    bookmarks.create(bm1, function(err, newId) {
      if (err) {
        console.log(err);
        done(err);
      }
      bm1.id = newId;
    });
    const bm2 = {
      user_id: 1,
      name: 'My worst bookmark',
      url: 'http://no.existe.ar/',
      id: undefined
    };
    bookmarks.create(bm2, function(err, newId) {
      if (err) done(err);
    });
    setTimeout(() => {
      scheduler.start();
      worker.start();
    }, 100);
    setTimeout(() => {
      bookmarks.findById(bm1.id, function(err, result) {
        if (err) done(err);
        expect(result.is_ok).to.be.true;
        done(null);
      })
    }, 1500); 
  });
});
