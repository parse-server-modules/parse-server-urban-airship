# parse-server-urban-airship
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
