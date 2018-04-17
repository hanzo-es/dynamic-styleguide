#! /usr/bin/env node
var shell = require("shelljs");
const path = require ('path');
const { rootPath } = require('get-root-path');
const browserRefreshBin = path.join(rootPath, './node_modules/browser-refresh/bin/browser-refresh')
const www = path.join(__dirname, './www')
const { nodeEnv } = require('../src/helpers/constants');

shell.exec(`NODE_ENV=${nodeEnv.prod} ${browserRefreshBin} ${www}`);
