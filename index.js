#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');
var webpackconfig = require('./template/webpack.config');
var packageBaseJson = require('./template/package.base.json');
var babelrc = require('./template/babelrc');

function write (path, str) {
  fs.writeFileSync(path, str);
}

function mkdir (dir, cb) {
  mkdirp(dir, cb);
}

function action () {
  var root = path.join(__dirname, process.env.NODE_ENV === 'development' ? 'test' : '');
  
  mkdir(root + '/dist');
  mkdir(root + '/test');
  mkdir(root + '/view');
  write(root + '/app.js', '');
  write(root + '/webpack.config.js', webpackconfig);
  write(root + '/.package.json', JSON.stringify(packageBaseJson, null, 2));
  write(root + '/.babelrc.js', JSON.stringify(babelrc, null, 2));

}

action();