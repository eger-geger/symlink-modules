#! /usr/bin/env node
'use strict'

const minimist = require('minimist');
const link = require('./index.js');

const usage = 'symlink-modules [(-d|--dir|--linksDirectory) FOLDER] [PKG ...]';

const args = minimist(process.argv.slice(2), {
    boolean: ['help'],
    string: ['linksDirectory'],
    alias: { 'linksDirectory': ['d', 'dir'], 'help': 'h' },
    default: { 'linksDirectory': 'linked_modules' }
})

if (args.help) {
    return console.log(usage);
}

link(args._, args);