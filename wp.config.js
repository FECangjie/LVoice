var path = require('path')
const devModule = require('./webpack/wp.config.dev');
const prodModule = require('./webpack/wp.config.prod');
let finalModule = {};
let ENV = process.env.ENV;

switch (ENV) {
  case 'DEV':
    finalModule = devModule;
    break;
  case 'PROD':
    finalModule = prodModule;
    break;
  default:
    // finalModule = devModule;
    break;
}
module.exports = finalModule;
