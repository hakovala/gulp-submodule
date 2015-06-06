# gulp-submodule

Load gulp tasks from submodules to their own namespace.

## Installation

```
$ npm install gulp-submodule
```

## Usage

Let's say we have a super project that contains multiple submodules. And we want to run submodule gulp tasks from super projects gulp file.

Example _mod/gulpfile.js_

```js
var gulp = require('gulp');

gulp.task('build', function() {
    console.log('building mod');
});

gulp.task('watch', ['build'], function() {
    console.log('watching mod');
});

module.exports = "for giggles!";
```

Example _gulpfile.js_

```js
var gulp = require('gulp');
require('gulp-submodule')(gulp);

var mod = gulp.submodule('mod');
console.log('Mod returns ' + mod);

gulp.task('build', ['mod:build'], function() {
    console.log('building super');
});
gulp.task('watch', ['mod:watch'], function() {

});

```

## Methods

### submodule(gulp[, separator])
 - `gulp` gulp object
 - `separator` separator string (default `:`)

### gulp.submodule(module[, gulpfile])
 - `module` submodule name
 - `gulpfile` path to submodules gulpfile

If optional `gulpfile` is omitted then module name is used as the modules directory.

`gulpfile` can be a submodule directory or full path to the gulpfile. If `gulpfile` points to a directory, then `gulpfile.js` in that directory is loaded.

Returns anything that submodule exports.

## License

The MIT License (MIT)

Copyright (c) 2015 Harri Kovalainen

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
