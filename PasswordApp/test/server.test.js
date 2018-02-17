process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const server = require('../lib/server');

after(function () {
    process.exit(0);
});

describe('GET /', () => {
  it('should respond with content-type application/json', (done) => {
    chai.request(server)
    .get('/')
    .end((err, res) => {
      should.not.exist(err);
      res.status.should.equal(200);
      res.type.should.equal('application/json');
      done();
    });
  });
});

describe('GET /hash', () => {
  it('should return hashed password', (done) => {
    const plainPassword = 'MyGreatPassword!01';
    chai.request(server)
    .get('/hash?password=' + plainPassword)
    .end((err, res) => {
      should.not.exist(err);
      res.body.hash.should.not.be.equal(plainPassword);
      done();
    });
  });
});

describe('GET /password', () => {
  it('should return password with length 12', (done) => {
    chai.request(server)
    .get('/password')
    .end((err, res) => {
      should.not.exist(err);
      res.body.password.length.should.be.equal(12);
      done();
    });
  });
});

describe('GET /check-match', () => {
  it('should return true when there is match', (done) => {
    const plainPassword = 'MyGreatPassword!01';
    chai.request(server)
    .get('/check-match?password=' + plainPassword + '&hash=' + '$2a$10$LqziJ5SJUr9m5nJGouhY8eIIG6lLtnH9MC15t2i0o3z3xUzA6goSC')
    .end((err, res) => {
      should.not.exist(err);
      res.body.matched.should.be.true;
      done();
    });
  });
  it('should return false when there is NO match', (done) => {
    const plainPassword = 'Some-Other-No-GoodPassword!';
    chai.request(server)
    .get('/check-match?password=' + plainPassword + '&hash=' + '$2a$10$LqziJ5SJUr9m5nJGouhY8eIIG6lLtnH9MC15t2i0o3z3xUzA6goSC')
    .end((err, res) => {
      should.not.exist(err);
      res.body.matched.should.be.false;
      done();
    });
  });
});

describe('GET /valid', () => {
  it('should return true for ThePa5sword!', (done) => {
    chai.request(server)
    .get('/valid?password=ThePa5sword!')
    .end((err, res) => {
      should.not.exist(err);
      res.body.isValid.should.be.true;
      done();
    });
  });

  it('should return false for miclave', (done) => {
    chai.request(server)
    .get('/valid?password=miclave')
    .end((err, res) => {
      should.not.exist(err);
      res.body.isValid.should.be.false;
      done();
    });
  });
});

describe('GET /health', () => {
  it('should respond ok', (done) => {
    chai.request(server)
    .get('/health')
    .end((err, res) => {
      should.not.exist(err);
      res.status.should.equal(200);
      done();
    });
  });
});