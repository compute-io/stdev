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
