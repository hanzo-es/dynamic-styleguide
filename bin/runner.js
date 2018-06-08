#! /usr/bin/env node
const shell = require('shelljs');
const path = require('path');
const rootPath = require('../src/lib/root-path');
const browserRefreshBin = path.join(rootPath, './node_modules/browser-refresh/bin/browser-refresh');
const www = path.join(__dirname, './www');
const { nodeEnv } = require('../src/helpers/constants');
const args = process.argv.slice(2).join(' ');

shell.exec(`NODE_ENV=${nodeEnv.prod} ${browserRefreshBin} ${www} ${args}`);
