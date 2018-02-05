# linkpkg
Fork of [symlink-modules](https://github.com/adius/symlink-modules). 
Purpose remained the same – create symbolic links to resolved packages in given folder. 

Compared to original version following was changed:
* create directory junction on windows;
* extended command-line interface;
* added input validation;
* added resolution root argument.

## Motivation
Packages with frontend code often contain resources in addition to javascript code. Those resources are usually being referenced via relative path and everything works fine until we do not install package which references resources from other packages as dependency. At that point `npm` flatterns dependency tree and resources are no longer where they used to be. 

`linkpkg` resolves referenced packages and creates symbolic links for them in predictable location. Sugested usage is linkink referenced packages in `postinstall` phase:

```json
{
	...

	"dependencies": {
		"minimist": "^1.2.0",
		"rimraf": "^2.6.2",
		"linkpkg": "^1.0.0"
	}

	...

	"scripts": {
		...
		"postinstall": "linkpkg -d resources minimist rimraf"
		...
	}

	...
}
```

## Installation
```sh
npm install --save linkpkg
```

## Usage

Create a `my_modules` folder and symlink installed `minimist` and `rimraf` pckages there:
```sh
linkpkg -d my_modules minimist rimraf
```
