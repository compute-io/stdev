/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// matrix data structure
	matrix = require( 'dstructs-matrix' ),

	// Module to be tested:
	stdev = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-stdev', function tests() {

	it( 'should export a function', function test() {
		expect( stdev ).to.be.a( 'function' );
	});

	it( 'should throw an error if the first argument is neither array-like or matrix-like', function test() {
		var values = [
			//'5', // valid as is array-like (length)
			5,
			true,
			undefined,
			null,
			NaN,
			function(){},
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				stdev( value );
			};
		}
	});

	it( 'should throw an error if provided an unrecognized/unsupported data type option', function test() {
		var values = [
			'beep',
			'boop'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				stdev( matrix( [2,2] ), {
					'dtype': value
				});
			};
		}
	});

	it( 'should throw an error if provided a dim option which is not a positive integer', function test() {
		var data = matrix( new Int32Array([1,2,3,4]), [2,2] );
		var values = [
			'5',
			-5,
			2.2,
			true,
			undefined,
			null,
			NaN,
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[ i ] ) ).to.throw( Error );
		}

		function badValue( value ) {
			return function() {
				stdev( data, {
					'dim': value
				});
			};
		}
	});

	it( 'should throw an error if provided a dim option which exceeds matrix dimensions ( = 2 )', function test() {
		var data = matrix( new Int32Array([1,2,3,4]), [2,2] );
		var values = [
			3,
			4,
			5
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[ i ] ) ).to.throw( RangeError );
		}

		function badValue( value ) {
			return function() {
				stdev( data, {
					'dim': value
				});
			};
		}
	});

	it( 'should compute the sample standard deviation', function test() {
		var data, expected;

		data = [ 2, 4, 5, 3, 8, 2 ];
		expected = 2.280350850198276;

		assert.strictEqual( stdev( data ), expected );
	});

	it( 'should compute the sample standard deviation of a typed array', function test() {
		var data, expected;

		data = new Int8Array( [ 2, 4, 5, 3, 8, 2 ] );
		expected = 2.280350850198276;

		assert.strictEqual( stdev( data ), expected );
	});

	it( 'should compute the (biased) sample standard deviation', function test() {
		var data, expected, actual;

		data = [ 2, 4, 5, 3, 8, 2 ];
		expected = 2.0816659994661326;

		actual =  stdev( data, {
			'bias': true
		});

		assert.strictEqual( actual, expected );
	});

	it( 'should compute the sample standard deviation using an accessor function', function test() {
		var data, expected, actual;

		data = [
			{'x':2},
			{'x':4},
			{'x':5},
			{'x':3},
			{'x':8},
			{'x':2}
		];
		expected = 2.280350850198276;
		actual = stdev( data, {
			'accessor': getValue
		});

		function getValue( d ) {
			return d.x;
		}

		assert.strictEqual( actual, expected );
	});

	it( 'should return `null` when provided an empty array', function test() {
		var data, expected;

		data = [];
		expected = null;

		assert.strictEqual( stdev( data ), expected );
	});

	it( 'should calculate the column standard deviations of a matrix', function test() {
		var data, expected, s;

		data = matrix( new Int32Array( [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ] ), [3,3] );
		expected = matrix( new Float64Array( [ 1, 1, 1 ] ), [3,1] );

		s = stdev( data, {
			'dim': 2
		});

		assert.deepEqual( s.data, expected.data );
	});

	it( 'should calculate the row standard deviations of a matrix', function test() {
		var data, expected, s;

		data = matrix( new Int32Array( [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ] ), [3,3] );
		expected = matrix( new Float64Array( [ 3, 3, 3 ] ), [1, 3] );

		s = stdev( data, {
			'dim': 1
		});

		assert.deepEqual( s.data, expected.data );
	});

	it( 'should compute the standard deviation for a vector (matrix with one column or row)', function test() {
		var data, expected;

		expected = 2.280350850198276;
		data = matrix( new Int32Array( [ 2, 4, 5, 3, 8, 2 ] ), [6,1] );

		assert.strictEqual( stdev( data ), expected );
	});

});
