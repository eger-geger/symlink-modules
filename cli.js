#! /usr/bin/env node
'use strict'
const process = require('process');
const minimist = require('minimist');
const linkpkg = require('./index.js');

const usage = [
    'linkpkg [(-d|--dir) FOLDER] [(-r|--root) ROOT] [PKG ...]',
    '',
    'Arguments:',
    '   PKG            list of packages to link separated with space',
    '   -d, --dir      path to linked packages folder (default: linked_modules)',
    `   -r, --root     path used as staring point for package resolution (default: ${process.cwd()})`,
].join('\n');

const args = minimist(process.argv.slice(2), {
    boolean: ['help'],
    string: ['dir', 'root'],
    alias: {
        'dir': 'd',
        'root': 'r',
        'help': 'h'
    },
    default: {
        'dir': 'linked_modules',
        'root': process.cwd()
    }
})

if (args.help) {
    return console.log(usage);
}

try {
    linkpkg(args._, args.root, args.dir).forEach(printpkg);
} catch (err) {
    console.error(err);
    console.log(usage);
}

function printpkg(pkg) {
    if (pkg && pkg.name && pkg.path && pkg.link) {
        console.log(`linked ${pkg.name}: ${pkg.path} -> ${pkg.link}`);
    }
}