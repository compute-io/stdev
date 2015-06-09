'use strict';

/**
* FUNCTION: stdev( arr[, bias] )
*	Computes the standard deviation of an array.
*
* @param {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} arr - input array
* @param {Boolean} [bias=false] - boolean indicating whether to calculate a biased or unbiased estimate of the variance
* @returns {Number|Null} standard deviation or null
*/
function stdev( arr, bias ) {
	var len = arr.length,
		delta = 0,
		mean = 0,
		M2 = 0,
		x, i;

	if ( !len ) {
		return null;
	}
	if ( len < 2 ) {
		return 0;
	}
	for ( i = 0; i < len; i++ ) {
		x = arr[ i ];
		delta = x - mean;
		mean += delta / (i+1);
		M2 += delta * ( x - mean );
	}
	if ( bias ) {
		return Math.sqrt( M2 / ( i ) );
	}
	return Math.sqrt( M2 / ( i - 1 ) );
} // end FUNCTION stdev()


// EXPORTS //

module.exports = stdev;
