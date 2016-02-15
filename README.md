# parse-server-urban-airship
[![Build Status](https://travis-ci.org/flovilmart/parse-server-urban-airship.svg?branch=master)](https://travis-ci.org/flovilmart/parse-server-urban-airship)
[![codecov.io](https://codecov.io/github/flovilmart/parse-server-urban-airship/coverage.svg?branch=master)](https://codecov.io/github/flovilmart/parse-server-urban-airship?branch=master)
[![npm version](https://img.shields.io/npm/v/parse-server-urban-airship.svg?style=flat)](https://www.npmjs.com/package/parse-server-urban-airship)

Urban Airship adapter for parse-server


## Usage

install in your project with

`npm install --save parse-server-urban-airship`

Configure:


```
var UAPushAdapter = require('parse-server-urban-airship');
var pushAdapter = new UAPushAdapter({
  key: 'YOUR APP KEY',
  secret: 'YOUR APP SECRET',
  masterSecret: 'YOUR APP MASTER SECRET'
});


var server = new ParseServer({
  ...
  push: {
    adapter: pushAdapter
  }
}

```
