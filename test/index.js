const test = require('tape');
const objectValueEquality = require('../');

test('should match objects with different keys but matching non nested values', assert => {
	const objOne = {
		a: 'christopher',
		b: 'columbus',
		c: 'is so uncool',
		y: 2
	};
	const objTwo = {
		d: 'christopher',
		e: 'columbus',
		f: 'is so uncool',
		z: 2
	};
	assert.ok(objectValueEquality(objOne, objTwo));
	assert.end();
});

test('should match objects with different keys but matching non nested values, some keys ignored', assert => {
	const objOne = {
		a: 'christopher',
		b: 'columbus',
		c: 'is so uncool',
		z: 2
	};
	const objTwo = {
		d: 'christopher',
		e: 'columbus',
		f: 'is so uncool',
		z: 5
	};
	assert.ok(objectValueEquality(objOne, objTwo, { keysToIgnore: ['z'] }));
	assert.end();
});

test('should return false when each value does not have a corresponding value in the the other object', assert => {
	const objOne = {
		a: 'christopher',
		b: 'columbus',
		c: 'is so uncool',
		z: 2
	};
	const objTwo = {
		d: 'christopher',
		e: 'columbus',
		f: 'is so uncool',
		z: 5
	};
	assert.notOk(objectValueEquality(objOne, objTwo));
	assert.end();
});

test('should return false if objects have different key length', assert => {
	const objOne = {
		a: 'christopher',
		b: 'columbus',
		c: 'is so uncool',
		z: 2
	};
	const objTwo = {
		d: 'christopher',
		e: 'columbus',
		f: 'is so uncool'
	};
	assert.notOk(objectValueEquality(objOne, objTwo));
	assert.end();
});

test ('should be able to value match nested objects', assert => {
	const objOne = {
		a: 'christopher',
		b: 'columbus',
		c: 'is so uncool',
		h: {
			j: 'x',
			y: 'z'
		}
	};
	const objTwo = {
		d: 'christopher',
		e: 'columbus',
		f: 'is so uncool',
		z: {
			j: 'x',
			y: 'z'
		}
	};
	assert.ok(objectValueEquality(objOne, objTwo));
	assert.end();
});

test('should be able to value match with arrays of arbitrary types', assert => {
	const objOne = {
		a: 'christopher',
		b: 'columbus',
		c: 'is so uncool',
		h: {
			t: 'x',
			s: 'z'
		},
		e: [0, true, 'five', { a: 'b', c: 'd', y: [0, 1, 2, { a: 'hi'}] }]
	};
	const objTwo = {
		x: [{ a: 'b', c: 'd', y: [0, 1, 2, { a: 'hi'}] }, 0, true, 'five'],
		d: 'christopher',
		e: 'columbus',
		f: 'is so uncool',
		z: {
			t: 'x',
			s: 'z'
		}
	};
	assert.ok(objectValueEquality(objOne, objTwo));
	assert.end();
});

test('keysToIgnore should work on nested objects', assert => {
	const objOne = {
		a: 'christopher',
		b: 'columbus',
		c: 'is so uncool',
		h: {
			t: 'x',
			s: 'b'
		},
		e: [0, true, 'five', { a: 'b', c: 'd', y: [0, 1, 2, { a: 'hi'}] }]
	};
	const objTwo = {
		x: [{ a: 'b', c: 'd', y: [0, 1, 2, { a: 'hi'}] }, 0, true, 'five'],
		d: 'christopher',
		e: 'columbus',
		f: 'is so uncool',
		z: {
			t: 'x',
			s: 'j'
		}
	};
	assert.ok(objectValueEquality(objOne, objTwo, { keysToIgnore: ['s'] }));
	assert.end();
});