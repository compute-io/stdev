'use strict';

// MODULES //

var isObject = require( 'validate.io-object' ),
	isFunction = require( 'validate.io-function' ),
	isString = require( 'validate.io-string-primitive' ),
	isBoolean = require( 'validate.io-boolean-primitive'),
	isPositiveInteger = require( 'validate.io-positive-integer' );


// VALIDATE //

/**
* FUNCTION: validate( opts, options )
*	Validates function options.
*
* @param {Object} opts - destination for validated options
* @param {Object} options - function options
* @param {Function} [options.accessor] - accessor function for accessing array values
* @param {Number} [options.dim] - dimension
* @param {String} [options.dtype] - output data type
* @param {Boolean} [options.bias=false] - Boolean indicating whether to calculate a biased or unbiased estimate of the standard deviation
* @returns {Null|Error} null or an error
*/
function validate( opts, options ) {
	if ( !isObject( options ) ) {
		return new TypeError( 'variance()::invalid input argument. Options argument must be an object. Value: `' + options + '`.' );
	}
	if ( options.hasOwnProperty( 'accessor' ) ) {
		opts.accessor = options.accessor;
		if ( !isFunction( opts.accessor ) ) {
			return new TypeError( 'stdev()::invalid option. Accessor must be a function. Option: `' + opts.accessor + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'dim' ) ) {
		opts.dim = options.dim;
		if ( !isPositiveInteger( opts.dim ) ) {
			return new TypeError( 'stdev()::invalid option. Dimension option must be a positive integer. Option: `' + opts.dim + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'dtype' ) ) {
		opts.dtype = options.dtype;
		if ( !isString( opts.dtype ) ) {
			return new TypeError( 'stdev()::invalid option. Data type option must be a string primitive. Option: `' + opts.dtype + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'bias' ) ) {
		opts.bias = options.bias;
		if ( !isBoolean( opts.bias ) ) {
			return new TypeError( 'stdev()::invalid option. Bias option must be a Boolean primitive. Option: `' + opts.dim + '`.' );
		}
	}
	return null;
} // end FUNCTION validate()


// EXPORTS //

module.exports = validate;
