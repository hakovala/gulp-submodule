"use strict";

var path = require('path');
var fs = require('fs');

module.exports = function (gulp, sep) {
	sep = sep || ':';

	var submodules = {};
	gulp.submodule = function(submodule, filepath) {
		filepath = filepath || submodule;
		filepath = path.resolve(filepath);

		// if filepath is directory, append 'gulpfile.js' to the path
		if (fs.lstatSync(filepath).isDirectory()) {
			filepath = path.join(filepath, 'gulpfile.js');
		}

		// get submodules task name
		function getName(name) {
			return [submodule, name].join(sep);
		}

		submodules[submodule] = { tasks: [], ret: null };
		// cache original gulp.task method
		var _task = gulp.task;
		gulp.task = function(name, deps, fn) {
			// prefix deps with submodule name
			if (Array.isArray(deps)) {
				deps = deps.map(getName);
			} else if (typeof deps === 'string') {
				deps = getName(deps);
			}
			submodules[submodule].tasks.push(name);
			// call original gulp.task method
			return _task.call(this, getName(name), deps, fn);
		};
		var mod = require(filepath);
		submodules[submodule].ret = mod;
		// restore original gulp.task method
		gulp.task = _task;

		// return required module
		return mod;
	};

	return submodules;
};
