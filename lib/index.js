'use strict';

// MODULES //

var isArrayLike = require( 'validate.io-array-like' ),
	isMatrixLike = require( 'validate.io-matrix-like' ),
	ctors = require( 'compute-array-constructors' ),
	matrix = require( 'dstructs-matrix' ).raw,
	validate = require( './validate.js' );

// FUNCTIONS //

var stdev1 = require( './array.js' ),
	stdev2 = require( './accessor.js' ),
	stdev3 = require( './matrix.js' );


// STDEV //

/*
* FUNCTION: stdev( x[, options] )
*	Computes the standard deviation of elements in x.
*
* @param {Number[]|Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Matrix} x - input value
* @param {Object} [opts] - function options
* @param {Boolean} [opts.bias=false] - - boolean indicating whether to calculate a biased or unbiased estimate of the standard deviation
* @param {Function} [opts.accessor] - accessor function for accessing array values
* @param {Number} [opts.dim=2] - dimension along which to compute the standard deviation
* @param {String} [opts.dtype="float64"] - output data type
* @returns {Number|Matrix|Null} standard deviation(s) or null
*/
function stdev( x, options ) {
	/* jshint newcap:false */
	var opts = {},
		bias,
		shape,
		ctor,
		err,
		len,
		dim,
		dt,
		d,
		m;

	if ( arguments.length > 1 ) {
		err = validate( opts, options );
		if ( err ) {
			throw err;
		}
	}

	bias = opts.bias || false;

	if ( isMatrixLike( x ) ) {
		dt = opts.dtype || 'float64';
		dim = opts.dim;

		// Determine if provided a vector...
		if ( x.shape[ 0 ] === 1 || x.shape[ 1 ] === 1 ) {
			// Treat as an array-like object:
			return stdev1( x.data );
		}
		if ( dim > 2 ) {
			throw new RangeError( 'stdev()::invalid option. Dimension option exceeds number of matrix dimensions. Option: `' + dim + '`.' );
		}
		if ( dim === void 0 || dim === 2 ) {
			len = x.shape[ 0 ];
			shape = [ len, 1 ];
		} else {
			len = x.shape[ 1 ];
			shape = [ 1, len ];
		}
		ctor = ctors( dt );
		if ( ctor === null ) {
			throw new Error( 'stdev()::invalid option. Data type option does not have a corresponding array constructor. Option: `' + dt + '`.' );
		}
		// Create an output matrix and calculate the variance(s):
		d = new ctor( len );
		m = matrix( d, shape, dt );
		return stdev3( m, x, bias, dim );
	}
	if ( isArrayLike( x ) ) {
		if ( opts.accessor ) {
			return stdev2( x, opts.accessor, bias );
		}
		return stdev1( x, bias );
	}
	throw new TypeError( 'stdev()::invalid input argument. First argument must be either an array or a matrix. Value: `' + x + '`.' );
} // end FUNCTION stdev()


// EXPORTS //

module.exports = stdev;
