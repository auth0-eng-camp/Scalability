const chakram = require('chakram'),
    expect = chakram.expect;

const baseUrl = 'http://localhost:3000/api/bookmarks';
const server = require('../bin/web');

describe('bookmarks api', function () {
  
  before(function() {
    server.start();
  });

  after(function() {
    server.stop();
  });

  it('DELETE /bookmarks should return 204', function() {
    var response = chakram.delete(baseUrl);
    expect(response).to.have.status(204);
    return chakram.wait();
  });

  it('POST /bookmarks should return status 201', function() {
    const newBookmark = {
        name: 'my test bookmark',
        url: 'http://mytest.com',
        user_id: 1
    };
    var response = chakram.post(baseUrl, newBookmark);
    expect(response).to.have.status(201);
    return chakram.wait();
  });

  it('GET /bookmarks should return all items', function() {
    var response = chakram.get(baseUrl);
    expect(response).to.have.json(function (json) {
        expect(json).to.have.length(1);
    });
    return chakram.wait();
  });

});
