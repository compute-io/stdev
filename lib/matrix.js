'use strict';

/**
* FUNCTION: stdev( out, mat,[bias , dim] )
*	Computes the standard deviation along a matrix dimension
*
* @param {Matrix} out - output matrix
* @param {Matrix} mat - input matrix
* @param {Boolean} [bias=false] - boolean indicating whether to calculate a biased or unbiased estimate of the standard deviation
* @param {Number} [dim=2] - matrix dimension along which to compute the standard deviation. If `dim=1`, compute along matrix rows. If `dim=2`, compute along matrix columns.
* @returns {Matrix|Null} standard deviation(s) or null
*/
function stdev( out, mat, bias, dim ) {
	var mu, delta, x, M2,
		M, N,
		s0, s1,
		o,
		i, j, k;

	if ( dim === 1 ) {
		// Compute along the rows...
		M = mat.shape[ 1 ];
		N = mat.shape[ 0 ];
		s0 = mat.strides[ 1 ];
		s1 = mat.strides[ 0 ];
	} else {
		// Compute along the columns...
		M = mat.shape[ 0 ];
		N = mat.shape[ 1 ];
		s0 = mat.strides[ 0 ];
		s1 = mat.strides[ 1 ];
	}
	if ( M === 0 || N === 0 ) {
		return null;
	}
	o = mat.offset;

	for ( i = 0; i < M; i++ ) {
		k = o + i * s0;
		mu = 0;
		delta = 0;
		M2 = 0;
		for ( j = 0; j < N; j++ ) {
			x = mat.data[ k + j*s1 ];
			delta = x - mu;
			mu += delta / (j+1);
			M2 += delta * ( x - mu );
		}
		if ( bias ) {
			out.data[ i ] = Math.sqrt( M2 / ( N ) );
		} else {
			out.data[ i ] = Math.sqrt( M2 / ( N - 1 ) );
		}
	}

	return out;
} // end FUNCTION stdev()


// EXPORTS //

module.exports = stdev;
