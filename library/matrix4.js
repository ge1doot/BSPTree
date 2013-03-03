////////////////////////////////////////////////////////////
// ==== Array matrix4 lib ====
// http://www.dhteumeuleu.com/
// last update: Mar 03, 2013
////////////////////////////////////////////////////////////

"use strict";

//------------------------------------------------------------------------------
//	copy a point
//------------------------------------------------------------------------------

Array.prototype.copy = function () {
	
	return [
		this[0],
		this[1],
		this[2],
		this[3]
	];
	
},

//------------------------------------------------------------------------------
//	multiply by a scalar
//------------------------------------------------------------------------------

Array.prototype.multiplyScalar = function (s) {
	
	return [
		this[0] * s,
		this[1] * s,
		this[2] * s,
		this[3] * s || 0
	];
	
},

//------------------------------------------------------------------------------
//	subtraction
//------------------------------------------------------------------------------

Array.prototype.subtract = function (p) {
	
	return [
		this[0] - p[0],
		this[1] - p[1],
		this[2] - p[2],
		this[3] - p[3]
	];
	
}

//------------------------------------------------------------------------------
//	addition
//------------------------------------------------------------------------------

Array.prototype.add = function (p) {
	
	return [
		this[0] + p[0],
		this[1] + p[1],
		this[2] + p[2],
		this[3] + p[3]
	];
	
}

//------------------------------------------------------------------------------
//	self multiply by a matrix
//------------------------------------------------------------------------------

Array.prototype.applyMatrix = function (m) {
	
	var px = this[0], py = this[1], pz = this[2], pw = this[3];
	
	this[0] = px * m[0] + py * m[4] + pz * m[8] +  pw * m[12];
	this[1] = px * m[1] + py * m[5] + pz * m[9] +  pw * m[13];
	this[2] = px * m[2] + py * m[6] + pz * m[10] + pw * m[14];
	this[3] = px * m[3] + py * m[7] + pz * m[11] + pw * m[15];
	
	return this;
	
}

//------------------------------------------------------------------------------
//	multiply by a matrix
//------------------------------------------------------------------------------

Array.prototype.multiplyMatrix = function (m) {
	
	var px = this[0], py = this[1], pz = this[2], pw = this[3];
	
	return [
		px * m[0] + py * m[4] + pz * m[8] +  pw * m[12],
		px * m[1] + py * m[5] + pz * m[9] +  pw * m[13],
		px * m[2] + py * m[6] + pz * m[10] + pw * m[14],
		px * m[3] + py * m[7] + pz * m[11] + pw * m[15]
	];
	
}

//------------------------------------------------------------------------------
//	cross product
//------------------------------------------------------------------------------

Array.prototype.crossProduct = function (p) {
	
	return [
		this[1] * p[2] - this[2] * p[1], 
		this[2] * p[0] - this[0] * p[2],
		this[0] * p[1] - this[1] * p[0],
		0
	];
	
}

//------------------------------------------------------------------------------
//	inner product
//------------------------------------------------------------------------------

Array.prototype.dotProduct = function (p) {
	
	return (
		this[0] * p[0] +
		this[1] * p[1] +
		this[2] * p[2] +
		(this[3] || 0) * (p[3] || 0)
	);
	
}

//------------------------------------------------------------------------------
//	normalize
//------------------------------------------------------------------------------

Array.prototype.normalize = function () {
	
	var n = Math.sqrt(
		this[0] * this[0] +
		this[1] * this[1] +
		this[2] * this[2] +
		this[3] * this[3]
	);
	
	this[0] /= n;
	this[1] /= n;
	this[2] /= n;
	this[3] /= n;
	
	return this;
}

//------------------------------------------------------------------------------
//	composite rotation X Y Z
//------------------------------------------------------------------------------

Array.prototype.rotateXYZ = function (angleX, angleY, angleZ) {
	
	var cw = Math.cos(angleX),
		sw = Math.sin(angleX),
		cy = Math.cos(angleY),
		sy = Math.sin(angleY),
		ck = angleZ ? Math.cos(angleZ) : 1,
		sk = angleZ ? Math.sin(angleZ) : 0;
		
	return [
		 cy*ck,		 cw*sk+sw*sy*ck,		sw*sk-cw*sy*ck,		0,
		-cy*sk,		 cw*ck-sw*sy*sk,		sw*ck+cw*sy*sk,		0,
		 sy,		-sw*cy,					cw*cy,				0,
		 0,			 0,						0,					1
	];

}

//------------------------------------------------------------------------------
//	multiply matrix
//------------------------------------------------------------------------------

Array.prototype.multiply = function (m) {

	var m1XX = this[0],		m1XY = this[1],		m1XZ = this[2],		m1XW = this[3],
		m1YX = this[4],		m1YY = this[5],		m1YZ = this[6],		m1YW = this[7],
		m1ZX = this[8],		m1ZY = this[9],		m1ZZ = this[10],	m1ZW = this[11],
		m1WX = this[12],	m1WY = this[13],	m1WZ = this[14],	m1WW = this[15],
		m2XX = m[0],		m2XY = m[1],		m2XZ = m[2],		m2XW = m[3],
		m2YX = m[4],		m2YY = m[5],		m2YZ = m[6],		m2YW = m[7],
		m2ZX = m[8],		m2ZY = m[9],		m2ZZ = m[10],		m2ZW = m[11],
		m2WX = m[12],		m2WY = m[13],		m2WZ = m[14],		m2WW = m[15];

	return [
		m1XX * m2XX + m1XY * m2YX + m1XZ * m2ZX + m1XW * m2WX,
		m1XX * m2XY + m1XY * m2YY + m1XZ * m2ZY + m1XW * m2WY,
		m1XX * m2XZ + m1XY * m2YZ + m1XZ * m2ZZ + m1XW * m2WZ,
		m1XX * m2XW + m1XY * m2YW + m1XZ * m2ZW + m1XW * m2WW,
		m1YX * m2XX + m1YY * m2YX + m1YZ * m2ZX + m1YW * m2WX,
		m1YX * m2XY + m1YY * m2YY + m1YZ * m2ZY + m1YW * m2WY,
		m1YX * m2XZ + m1YY * m2YZ + m1YZ * m2ZZ + m1YW * m2WZ,
		m1YX * m2XW + m1YY * m2YW + m1YZ * m2ZW + m1YW * m2WW,
		m1ZX * m2XX + m1ZY * m2YX + m1ZZ * m2ZX + m1ZW * m2WX,
		m1ZX * m2XY + m1ZY * m2YY + m1ZZ * m2ZY + m1ZW * m2WY,
		m1ZX * m2XZ + m1ZY * m2YZ + m1ZZ * m2ZZ + m1ZW * m2WZ,
		m1ZX * m2XW + m1ZY * m2YW + m1ZZ * m2ZW + m1ZW * m2WW,
		m1WX * m2XX + m1WY * m2YX + m1WZ * m2ZX + m1WW * m2WX,
		m1WX * m2XY + m1WY * m2YY + m1WZ * m2ZY + m1WW * m2WY,
		m1WX * m2XZ + m1WY * m2YZ + m1WZ * m2ZZ + m1WW * m2WZ,
		m1WX * m2XW + m1WY * m2YW + m1WZ * m2ZW + m1WW * m2WW
	];
	
}

//------------------------------------------------------------------------------
//	inverse matrix
//------------------------------------------------------------------------------

Array.prototype.inverse = function (m) {
	
	var a00 = m[0],  a01 = m[1],  a02 = m[2],  a03 = m[3],
		a10 = m[4],  a11 = m[5],  a12 = m[6],  a13 = m[7],
		a20 = m[8],  a21 = m[9],  a22 = m[10], a23 = m[11],
		a30 = m[12], a31 = m[13], a32 = m[14], a33 = m[15],

	b00 = a00 * a11 - a01 * a10,
	b01 = a00 * a12 - a02 * a10,
	b02 = a00 * a13 - a03 * a10,
	b03 = a01 * a12 - a02 * a11,
	b04 = a01 * a13 - a03 * a11,
	b05 = a02 * a13 - a03 * a12,
	b06 = a20 * a31 - a21 * a30,
	b07 = a20 * a32 - a22 * a30,
	b08 = a20 * a33 - a23 * a30,
	b09 = a21 * a32 - a22 * a31,
	b10 = a21 * a33 - a23 * a31,
	b11 = a22 * a33 - a23 * a32,
	
	// Calculate the determinant
	det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
	
	if (!det) return this; 
	
	det = 1.0 / det;
	
	return [
		(a11 * b11 - a12 * b10 + a13 * b09) * det,
		(a02 * b10 - a01 * b11 - a03 * b09) * det,
		(a31 * b05 - a32 * b04 + a33 * b03) * det,
		(a22 * b04 - a21 * b05 - a23 * b03) * det,
		(a12 * b08 - a10 * b11 - a13 * b07) * det,
		(a00 * b11 - a02 * b08 + a03 * b07) * det,
		(a32 * b02 - a30 * b05 - a33 * b01) * det,
		(a20 * b05 - a22 * b02 + a23 * b01) * det,
		(a10 * b10 - a11 * b08 + a13 * b06) * det,
		(a01 * b08 - a00 * b10 - a03 * b06) * det,
		(a30 * b04 - a31 * b02 + a33 * b00) * det,
		(a21 * b02 - a20 * b04 - a23 * b00) * det,
		(a11 * b07 - a10 * b09 - a12 * b06) * det,
		(a00 * b09 - a01 * b07 + a02 * b06) * det,
		(a31 * b01 - a30 * b03 - a32 * b00) * det,
		(a20 * b03 - a21 * b01 + a22 * b00) * det
	];

}

//------------------------------------------------------------------------------
//	Transformation for rotating to an arbitrary basis at an arbitrary location
//------------------------------------------------------------------------------

Array.prototype.viewMatrix = function (u, v, n, r) {
	
	return [
		u[0],	v[0],	n[0],	0,
		u[1],	v[1],	n[1],	0,
		u[2],	v[2],	n[2],	0,
		- (
			r[0] * u[0] +
			r[1] * u[1] +
			r[2] * u[2] +
			r[3] * u[3]
		),
		- (
			r[0] * v[0] +
			r[1] * v[1] +
			r[2] * v[2] +
			r[3] * v[3]
		),
		- (
			r[0] * n[0] +
			r[1] * n[1] +
			r[2] * n[2] +
			r[3] * n[3]
		), 1
	];
}

//------------------------------------------------------------------------------
//	perspective
//------------------------------------------------------------------------------

Array.prototype.perspective = function (distance) {
	
	return [
		1, 0, 0, 0,
		0, 1, 0, 0,
		0, 0, 1,-1 / distance,	//	set the perspective factor to 1 / distance to the picture plane
		0, 0, 0, 1
	];
	
}

//------------------------------------------------------------------------------
//	define plane
//------------------------------------------------------------------------------

Array.prototype.definePlane = function () {
	
	var sum = [0,0,0,0];
	for (
		var i = 0, last = this.length - 1; 
		i < this.length; 
		last = i, i++
	) {
		var A = this[last];		//	assumes counter-clockwise points order
		var B = this[i];
		sum[0] += (A[1] - B[1]) * (A[2] + B[2]);
		sum[1] += (A[2] - B[2]) * (A[0] + B[0]);
		sum[2] += (A[0] - B[0]) * (A[1] + B[1]);
	}
	
	sum.normalize();
	var p = this[0];
	
	return [
		sum[0], 
		sum[1], 
		sum[2], 
		- (
			sum[0] * p[0] +
			sum[1] * p[1] +
			sum[2] * p[2] +
			sum[3] * p[3]
		)
	];
	
}

//------------------------------------------------------------------------------
//	 nex identity matrix
//------------------------------------------------------------------------------

Array.prototype.identity = function() {
	return [	// identity matrix
		1, 0, 0, 0,
		0, 1, 0, 0,
		0, 0, 1, 0,
		0, 0, 0, 1
	];
}

//------------------------------------------------------------------------------
//	 Transformation to scale a point by a specified amount 
//------------------------------------------------------------------------------

Array.prototype.scale = function (x, y, z) {
	
	return this.multiply(
		[
			x, 0, 0, 0,
			0, y, 0, 0,
			0, 0, z, 0,
			0, 0, 0, 1
		]
	);
	
}
//------------------------------------------------------------------------------
//	 Transformation to translate a point by a specified amount 
//------------------------------------------------------------------------------
Array.prototype.translate = function (x, y, z) {
	
	return this.multiply(
		[
			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			x, y, z, 1
		]
	);
	
}

//------------------------------------------------------------------------------
//	 Transformation to rotate a point about the x axis 
//------------------------------------------------------------------------------
		
Array.prototype.rotateX = function (angle) {
	
	angle = angle * (Math.PI / 180);
	var c = Math.cos(angle),
		s = Math.sin(angle);

	return this.multiply(
		[
			1, 0, 0, 0,
			0, c, s, 0,
			0,-s, c, 0,
			0, 0, 0, 1
		]
	);
	
}
//------------------------------------------------------------------------------
//	 Transformation to rotate a point about the y axis 
//------------------------------------------------------------------------------

Array.prototype.rotateY = function (angle) {
	
	angle = angle * (Math.PI / 180);
	var c = Math.cos(angle),
	s = Math.sin(angle);

	return this.multiply(
		[
			c, 0,-s, 0,
			0, 1, 0, 0,
			s, 0, c, 0,
			0, 0, 0, 1
		]
	);
	
}

//------------------------------------------------------------------------------
//	Transformation to rotate a point about the z axis
//------------------------------------------------------------------------------

Array.prototype.rotateZ = function (angle) {
	
	angle = angle * (Math.PI / 180);
	var c = Math.cos(angle),
	s = Math.sin(angle);

	return this.multiply(
		[
			c,-s, 0, 0,
			s, c, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1
		]
	);
}
