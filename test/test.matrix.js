/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Matrix data structure:
	matrix = require( 'dstructs-matrix' ),

	// Module to be tested:
	stdev = require( './../lib/matrix.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'matrix standard deviation', function tests() {

	var data,
		mat,
		i;

	data = new Int32Array( 25 );
	for ( i = 0; i < data.length; i++ ) {
		data[ i ] = i + 1;
	}
	mat = matrix( data, [5,5], 'int8' );


	it( 'should export a function', function test() {
		expect( stdev ).to.be.a( 'function' );
	});

	it( 'should compute the standard deviation along matrix columns', function test() {
		var out, p, expected;

		out = matrix( [5,1], 'float64' );

		p = stdev( out, mat );
		expected = '1.5811388300841898;1.5811388300841898;1.5811388300841898;1.5811388300841898;1.5811388300841898';

		assert.strictEqual( p.toString(), expected );

		p = stdev( out, mat, false, 2 );
		expected = '1.5811388300841898;1.5811388300841898;1.5811388300841898;1.5811388300841898;1.5811388300841898';

		assert.strictEqual( p.toString(), expected );
	});

	it( 'should compute the standard deviation along matrix rows', function test() {
		var out, p, expected;

		out = matrix( [1,5], 'float64' );

		p = stdev( out, mat, false, 1 );
		expected = '7.905694150420948,7.905694150420948,7.905694150420948,7.905694150420948,7.905694150420948';

		assert.strictEqual( p.toString(), expected );
	});

	it( 'should compute the (biased) standard deviation along matrix rows', function test() {
		var out, p, expected;

		out = matrix( [1,5], 'float64' );

		p = stdev( out, mat, true, 1 );
		expected = '7.0710678118654755,7.0710678118654755,7.0710678118654755,7.0710678118654755,7.0710678118654755';

		assert.strictEqual( p.toString(), expected );
	});

	it( 'should return null if provided a matrix having one or more zero dimensions', function test() {
		var out, mat;

		out = matrix( [0,0] );

		mat = matrix( [0,10] );
		assert.isNull( stdev( out, mat ) );

		mat = matrix( [10,0] );
		assert.isNull( stdev( out, mat ) );

		mat = matrix( [0,0] );
		assert.isNull( stdev( out, mat ) );
	});

});
