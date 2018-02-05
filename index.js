const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const iswindows = require('is-windows');
const resolvepkg = require('resolve-pkg');

module.exports = function (packages, root, folder = 'linked_modules') {
	if (!Array.isArray(packages)) {
		throw Error(`Invalid packages: ${packages}. Expected array of package names.`)
	} else if (!folder) {
		throw Error(`Invalid folder: ${folder}.`);
	} else if (!folder) {
		throw Error(`Invalid root: ${root}.`);
	} else if (!fs.statSync(root).isDirectory()){
		throw Error(`Invalid root: ${root} is not a folder.`);
	}

	rimraf.sync(folder);
	fs.mkdirSync(folder);
	
	return packages.map(pkgname => linkpkg(root, folder, pkgname));
}

function linkpkg(root, folder, pkgname) {
	if (!pkgname) {
		throw Error(`Invalid package name: <${pkgname}>.`);
	}

	const pkgpath = resolvepkg(pkgname, {
		cwd: root
	});

	if (!pkgpath) {
		throw Error(`Package <${pkgname}> not resolved.`)
	}

	const linkpath = path.join(folder, pkgname);

	fs.symlinkSync(pkgpath, linkpath, iswindows() ? 'junction' : 'dir');

	return { name: pkgname, path: pkgpath, link: linkpath };
}