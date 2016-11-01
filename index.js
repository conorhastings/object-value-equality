function getObjectValues(obj, keysToIgnore) {
  return Object.keys(obj).filter(function(key) {
    return keysToIgnore.indexOf(key) === -1;
  }).map(function(key) {
    return obj[key];
  });
}

function hasSameType(a, b) {
  var bothArray = Array.isArray(a) && Array.isArray(b);
  var bothNull = a === null && b === null;
  var bothUndefined = a === undefined && b === undefined;
  var bothBool = typeof a === 'boolean' && typeof b === 'boolean';
  var bothObj = !bothArray && !bothNull && typeof a === 'object' && typeof b === 'object';
  var bothString = typeof a === 'string' && typeof b === 'string';
  var bothNumber = typeof a === 'number' && typeof b === 'number';
  return bothArray || bothNull || bothUndefined || bothBool || bothObj || bothString || bothNumber;
}

function shouldTripleEquals(item) {
  return (
    typeof item === 'string' || 
    typeof item === 'number' ||
    typeof item === 'boolean' ||
    item === null ||
    item === undefined
  );
}

function equality(a, b, opts) {
  return a.every(function(aValue) {
    return b.some(function(bValue) {
      if (!hasSameType(aValue, bValue)) {
        return false;
      } else if (shouldTripleEquals(aValue)) {
        return aValue === bValue;
      } else if (Array.isArray(aValue)) {
        return arrayEquality(aValue, bValue, opts);
      } else if (typeof aValue === 'object') {
        return objectValueEquality(aValue, bValue, opts);
      }
    });
  });
}

function arrayEquality(a, b, opts) {
  if (a.length !== b.length) {
    return false;
  }
  return equality(a, b, opts);
}

function objectValueEquality(a, b, opts) {
  opts = opts || {};
  var keysToIgnore = opts.keysToIgnore || [];
  /* we can return early if number of keys is not equal */
  if (Object.keys(a).length !== Object.keys(b).length) {
    return false;
  }
  var aValues = getObjectValues(a, keysToIgnore);
  var bValues = getObjectValues(b, keysToIgnore);
  return equality(aValues, bValues, opts);
}

module.exports = objectValueEquality;