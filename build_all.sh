#!/bin/bash

cd PasswordApp
npm install
npm test
cd ..
cd BookmarksApp
npm install
npm run migrate
npm test