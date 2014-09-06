
// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	stdev = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-stdev', function tests() {
	'use strict';

	it( 'should export a function', function test() {
		expect( stdev ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided a non-array', function test() {
		var values = [
				'5',
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

	it( 'should compute the sample standard deviation', function test() {
		var data, expected;

		data = [ 2, 4, 5, 3, 8, 2 ];
		expected = Math.sqrt( 5.2 );

		assert.strictEqual( stdev( data ), expected );
	});

	it( 'should return 0 for a single element array', function test() {
		var data, expected;

		data = [ 2 ];
		expected = 0;

		assert.strictEqual( stdev( data ), expected );
	});

});