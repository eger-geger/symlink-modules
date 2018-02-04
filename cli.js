#! /usr/bin/env node
'use strict'

const minimist = require('minimist');
const linkpkg = require('./index.js');

const usage = 'linkpkg [(-d|--dir|--folder) FOLDER] [PKG ...]';

const args = minimist(process.argv.slice(2), {
    boolean: ['help'],
    string: ['folder'],
    alias: {
        'folder': ['d', 'dir'],
        'help': 'h'
    },
    default: {
        'folder': 'linked_modules'
    }
})

if (args.help) {
    return console.log(usage);
}

try {
    linkpkg(args._, args.folder).forEach(printpkg);
} catch (err) {
    console.error(err);
    console.log(usage);
}

function printpkg(pkg) {
    if (pkg && pkg.name && pkg.path && pkg.link) {
        console.log(`${pkg.name}: ${pkg.path} -> ${pkg.link}`);
    }
}