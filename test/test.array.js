/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	stdev = require( './../lib/array.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'array standard deviation', function tests() {

	it( 'should export a function', function test() {
		expect( stdev ).to.be.a( 'function' );
	});

	it( 'should compute the standard deviation', function test() {
		var data, expected;

		data = [ 2, 4, 5, 3, 8, 2 ];
		expected = 2.280350850198276;

		assert.strictEqual( stdev( data ), expected );
	});

	it( 'should compute the (biased) standard deviation', function test() {
		var data, expected;

		data = [ 2, 4, 5, 3, 8, 2 ];
		expected = 2.0816659994661326;

		assert.strictEqual( stdev( data, true ), expected );
	});

	it( 'should return 0 for a single element array', function test() {
		var data, expected;

		data = [ 2 ];
		expected = 0;

		assert.strictEqual( stdev( data ), expected );
	});

	it( 'should return null if provided an empty array', function test() {
		assert.isNull( stdev( [] ) );
	});

});
