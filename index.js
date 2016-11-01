function getObjectValues(obj, keysToIgnore) {
  return Object.keys(obj).filter(function(key) {
    return keysToIgnore.indexOf(key) === -1;
  }).map(function(key) {
    return obj[key];
  });
}

function filterObject(obj, keysToIgnore) {
  return Object.keys(obj).reduce(function(newObj, key) {
    if (keysToIgnore.indexOf(key) === -1) {
      newObj[key] = obj[key];
    }
    return newObj;
  }, {});
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

function valueEquality(a, b, opts) {
  if (!hasSameType(a, b)) {
    return false;
  } else if (shouldTripleEquals(a)) {
    return a === b;
  } else if (Array.isArray(a)) {
    return arrayEquality(a, b, opts);
  } else if (typeof a === 'object') {
    return objectEquality(a, b, opts);
  }
}
function equality(a, b, opts) {
  return a.every(function(aValue) {
    return b.some(function(bValue) {
      return valueEquality(aValue, bValue, opts);
    });
  });
}

function arrayEquality(a, b, opts) {
  if (a.length !== b.length) {
    return false;
  }
  return equality(a, b, opts);
}

function objectEquality(a, b, opts) {
  var filteredObjectA = filterObject(a, opts.keysToIgnore);
  var filteredObjectB = filterObject(b, opts.keysToIgnore);
  if (Object.keys(filteredObjectA).length !== Object.keys(filteredObjectB).length) {
    return false;
  }
  return Object.keys(filteredObjectA).every(function(key) {
    return valueEquality(filteredObjectA[key], filteredObjectB[key], opts);
  });
}

function objectValueEquality(a, b, opts) {
  opts = opts || {};
  opts.keysToIgnore = opts.keysToIgnore || [];
  /* we can return early if number of keys is not equal */
  if (Object.keys(a).length !== Object.keys(b).length) {
    return false;
  }
  var aValues = getObjectValues(a, opts.keysToIgnore);
  var bValues = getObjectValues(b, opts.keysToIgnore);
  return equality(aValues, bValues, opts);
}

module.exports = objectValueEquality;