# object-value-equality

assert that the value of each key of an object has a corresponding value in another object that matches while ignoring the object keys. For example this would return true

```js
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
  
  objectValueEquality(objOne, objTwo); // true
  ```
