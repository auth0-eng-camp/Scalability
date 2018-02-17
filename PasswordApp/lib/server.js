const express = require('express');
const os = require('os');
const app = express();
const port = 3000;
const bcrypt = require('bcrypt');
const saltRounds = 12;
const passwordChecker = require('owasp-password-strength-test');
passwordChecker.config({
  allowPassphrases       : false,
  maxLength              : 128,
  minLength              : 10,
  minOptionalTestsToPass : 4
});


app.get('/', (req, res) => {
  res.json({ text: 'Hi, this is the Scalability Lab 01.'});
});

app.get('/valid', (req, res) => {
  const password = req.query.password;
  const validationResult = passwordChecker.test(password);
  res.json({ isValid : validationResult.strong,
    details : validationResult
   });
});

app.get('/hash', (req, res) => {
  const password = req.query.password;
  bcrypt.hash(password, saltRounds, function(err, hashedPassword) {
    res.json({ hash: hashedPassword });  
  });
});

app.get('/check-match', (req, res) => {
  const password = req.query.password;
  const hash = req.query.hash;
  bcrypt.compare(password, hash, function(err, result) {
    res.json({
      password: password,
      hash: hash, 
      matched: result
     });  
  });
});

app.get('/password', (req, res) => {
  const min = Math.ceil(0);
  const max = Math.floor(9);
  var result = '!';
  for(var i = 0; i < 3; i++) {
    result += Math.floor(Math.random() * (max - min)) + min;
  }
  for(var i = 0; i < 4; i++) {
    const code =  Math.floor(Math.random() * (90 - 60)) + 60;
    const char = String.fromCharCode(code);
    result += char + char.toLowerCase();
  }
  res.json({ password: result });
});

app.get('/health', (req, res) => {
  res.json({ 
    host: os.hostname(),
    loadavg: os.loadavg(),
    freemem: os.freemem(),
    appversion: process.env.npm_package_version });
});

app.listen(port, () => console.log(`App running on port: ${port}`));

module.exports = app
