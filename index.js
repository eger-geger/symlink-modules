const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const process = require('process');
const iswindows = require('is-windows');
const resolvepkg = require('resolve-pkg');

module.exports = function (packages, folder = 'linked_modules') {
	if (!Array.isArray(packages)) {
		throw Error(`Invalid packages: ${packages}. Expected array of package names.`)
	} if (!folder) {
		throw Error(`Invalid folder: ${folder}.`);
	}

	rimraf.sync(folder);
	fs.mkdirSync(folder);
	
	return packages.map(linkpkg);

	function linkpkg(pkgname) {
		if (!pkgname) {
			throw Error(`Invalid package name: <${pkgname}>.`);
		}

		const pkgpath = resolvepkg(pkgname);

		if (!pkgpath) {
			throw Error(`Package <${pkgname}> not resolved.`)
		}

		const linkpath = path.join(process.cwd(), folder, pkgname);

		fs.symlinkSync(pkgpath, linkpath, iswindows() ? 'junction' : 'dir');

		return { name: pkgname, path: pkgpath, link: linkpath };
	}
}
