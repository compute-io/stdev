stdev
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Computes the sample [standard deviation](http://en.wikipedia.org/wiki/Standard_deviation).

The unbiased [standard deviation](http://en.wikipedia.org/wiki/Standard_deviation) is defined by

<div class="equation" align="center" data-raw-text="s =\sqrt{\frac{1}{N-1} \sum_{i=0}^{N-1} \left(x_i - \overline{x} \right)^2}" data-equation="eq:stdev">
	<img src="https://cdn.rawgit.com/compute-io/stdev/7681b6761ebc97576a11d4daaadb2857998a51f8/docs/img/eqn1.svg" alt="Equation for the sample standard deviation.">
	<br>
</div>

where `x_0, x_1,...,x_{N-1}` are individual data values and `N` is the total number of values in the data set. It is the square root of the [sample variance](http://en.wikipedia.org/wiki/Variance).


## Installation

``` bash
$ npm install compute-stdev
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

``` javascript
var stdev = require( 'compute-stdev' );
```

### stdev( x[, opts] )

Computes the [variance](http://en.wikipedia.org/wiki/Variance). `x` may be either an [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays), or [`matrix`](https://github.com/dstructs/matrix).

For numeric `arrays`,

``` javascript
var data = [ 2, 4, 5, 3, 4, 3, 1, 5, 6, 9 ];

var s = stdev( data );
// returns 5.067

data = new Int8Array( data );
s = stdev( data );
// returns 5.067
```

For non-numeric `arrays`, provide an accessor `function` for accessing numeric `array` values

``` javascript
var data = [
    {'x':2},
    {'x':4},
    {'x':5},
    {'x':3},
    {'x':4},
    {'x':3},
    {'x':1},
    {'x':5},
    {'x':6},
    {'x':9}
];

function getValue( d ) {
    return d.x;
}

var s = stdev( data, {
	'accessor': getValue
});
// returns 5.067
```

By default, the function calculates the *unbiased* sample [standard deviation](http://en.wikipedia.org/wiki/Standard_deviation). To calculate the population standard deviation (or a *biased* sample standard deviation), set the `bias` option to `true`.

``` javascript
var data = [ 2, 4, 5, 3, 4, 3, 1, 5, 6, 9 ];

var value = stdev( data, {
	'bias': true
});
// returns 4.56
```

The biased [standard deviation](http://en.wikipedia.org/wiki/Standard_deviation) is calculated as follows:

<div class="equation" align="center" data-raw-text="s = \sqrt{\frac{1}{N} \sum_{i=0}^{N-1} \left(x_i - \overline{x} \right)^2}" data-equation="eq:biased_stdev">
	<img src="https://cdn.rawgit.com/compute-io/stdev/7681b6761ebc97576a11d4daaadb2857998a51f8/docs/img/eqn2.svg" alt="Equation for the biased sample standard deviation.">
	<br>
</div>

If provided a [`matrix`](https://github.com/dstructs/matrix), the function accepts the following additional `options`:

*	__dim__: dimension along which to compute the [standard deviation](http://en.wikipedia.org/wiki/Standard_deviation). Default: `2` (along the columns).
*	__dtype__: output [`matrix`](https://github.com/dstructs/matrix) data type. Default: `float64`.

By default, the function computes the [standard deviation](http://en.wikipedia.org/wiki/Standard_deviation) along the columns (`dim=2`).

``` javascript
var matrix = require( 'dstructs-matrix' ),
	data,
	mat,
	s,
	i;

data = new Int8Array( 25 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = i;
}
mat = matrix( data, [5,5], 'int8' );
/*
	[  0  1  2  3  4
	   5  6  7  8  9
	  10 11 12 13 14
	  15 16 17 18 19
	  20 21 22 23 24 ]
*/

s = stdev( mat );
/*
	[  2.5
	   2.5
	   2.5
	   2.5
	   2.5 ]
*/
```

To compute the [standard deviation](http://en.wikipedia.org/wiki/Standard_deviation) along the rows, set the `dim` option to `1`.

``` javascript
s = stdev( mat, {
	'dim': 1
});
/*
	[ 62.5, 62.5, 62.5, 62.5, 62.5 ]
*/
```

By default, the output [`matrix`](https://github.com/dstructs/matrix) data type is `float64`. To specify a different output data type, set the `dtype` option.

``` javascript
s = stdev( mat, {
	'dim': 1,
	'dtype': 'uint8'
});
/*
	[ 10, 11, 12, 13, 14 ]
*/

var dtype = s.dtype;
// returns 'uint8'
```

If provided a [`matrix`](https://github.com/dstructs/matrix) having either dimension equal to `1`, the function treats the [`matrix`](https://github.com/dstructs/matrix) as a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) and returns a `numeric` value.

``` javascript
data = [ 2, 4, 5, 3, 4, 3, 1, 5, 6, 9  ];

// Row vector:
mat = matrix( new Int8Array( data ), [1,10], 'int8' );
s = stdev( mat );
// returns 5.067

// Column vector:
mat = matrix( new Int8Array( data ), [10,1], 'int8' );
s = stdev( mat );
// returns 5.067
```

If provided an empty [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays), or [`matrix`](https://github.com/dstructs/matrix), the function returns `null`.

``` javascript
s = stdev( [] );
// returns null

s = stdev( new Int8Array( [] ) );
// returns null

s = stdev( matrix( [0,0] ) );
// returns null

s = stdev( matrix( [0,10] ) );
// returns null

s = stdev( matrix( [10,0] ) );
// returns null
```

## Examples

``` javascript
'use strict';

var matrix = require( 'dstructs-matrix' ),
	stdev = require( './../lib' );

var data,
	mat,
	s,
	i;

// ----
// Plain arrays...
var data = new Array( 100 );
for ( var i = 0; i < data.length; i++ ) {
	data[ i ] = Math.round( Math.random() * 10 + 1 );
}
s = stdev( data );
console.log( 'Arrays: %d\n', s );


// ----
// Object arrays (accessors)...
function getValue( d ) {
	return d.x;
}
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = {
		'x': data[ i ]
	};
}
s = stdev( data, {
	'accessor': getValue
});
console.log( 'Accessors: %d\n', s );


// ----
// Typed arrays...
data = new Int32Array( 100 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = Math.round( Math.random() * 10 + 1 );
}
s = stdev( data );


// ----
// Matrices (along rows)...
mat = matrix( data, [10,10], 'int32' );
s = stdev( mat, {
	'dim': 1
});
console.log( 'Matrix (rows): %s\n', s.toString() );


// ----
// Matrices (along columns)...
s = stdev( mat, {
	'dim': 2
});
console.log( 'Matrix (columns): %s\n', s.toString() );


// ----
// Matrices (custom output data type)...
s = stdev( mat, {
	'dtype': 'uint8'
});
console.log( 'Matrix (%s): %s\n', s.dtype, s.toString() );

```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

### Unit

Unit tests use the [Mocha](http://visionmedia.github.io/mocha) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ open reports/coverage/lcov-report/index.html
```


## License

[MIT license](http://opensource.org/licenses/MIT).


---
## Copyright

Copyright &copy; 2014. Athan Reines.


[npm-image]: http://img.shields.io/npm/v/compute-stdev.svg
[npm-url]: https://npmjs.org/package/compute-stdev

[travis-image]: http://img.shields.io/travis/compute-io/stdev/master.svg
[travis-url]: https://travis-ci.org/compute-io/stdev

[coveralls-image]: https://img.shields.io/coveralls/compute-io/stdev/master.svg
[coveralls-url]: https://coveralls.io/r/compute-io/stdev?branch=master

[dependencies-image]: http://img.shields.io/david/compute-io/stdev.svg
[dependencies-url]: https://david-dm.org/compute-io/stdev

[dev-dependencies-image]: http://img.shields.io/david/dev/compute-io/stdev.svg
[dev-dependencies-url]: https://david-dm.org/dev/compute-io/stdev

[github-issues-image]: http://img.shields.io/github/issues/compute-io/stdev.svg
[github-issues-url]: https://github.com/compute-io/stdev/issues
