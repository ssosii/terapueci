(self["webpackChunk"] = self["webpackChunk"] || []).push([["admin-common"],{

/***/ "./assets/admin/images/admin_check.svg":
/*!*********************************************!*\
  !*** ./assets/admin/images/admin_check.svg ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "images/admin_check.a28ea8b4.svg";

/***/ }),

/***/ "./assets/admin/images/admin_close.svg":
/*!*********************************************!*\
  !*** ./assets/admin/images/admin_close.svg ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "images/admin_close.54e3dd7b.svg";

/***/ }),

/***/ "./assets/admin/images/admin_uncheck.svg":
/*!***********************************************!*\
  !*** ./assets/admin/images/admin_uncheck.svg ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "images/admin_uncheck.e6ef0919.svg";

/***/ }),

/***/ "./node_modules/axios/dist/browser/axios.cjs":
/*!***************************************************!*\
  !*** ./node_modules/axios/dist/browser/axios.cjs ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// Axios v1.4.0 Copyright (c) 2023 Matt Zabriskie and contributors


function bind(fn, thisArg) {
  return function wrap() {
    return fn.apply(thisArg, arguments);
  };
}

// utils is a library of generic helper functions non-specific to axios

const {toString} = Object.prototype;
const {getPrototypeOf} = Object;

const kindOf = (cache => thing => {
    const str = toString.call(thing);
    return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
})(Object.create(null));

const kindOfTest = (type) => {
  type = type.toLowerCase();
  return (thing) => kindOf(thing) === type
};

const typeOfTest = type => thing => typeof thing === type;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 *
 * @returns {boolean} True if value is an Array, otherwise false
 */
const {isArray} = Array;

/**
 * Determine if a value is undefined
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if the value is undefined, otherwise false
 */
const isUndefined = typeOfTest('undefined');

/**
 * Determine if a value is a Buffer
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && isFunction(val.constructor.isBuffer) && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
const isArrayBuffer = kindOfTest('ArrayBuffer');


/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  let result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (isArrayBuffer(val.buffer));
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a String, otherwise false
 */
const isString = typeOfTest('string');

/**
 * Determine if a value is a Function
 *
 * @param {*} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
const isFunction = typeOfTest('function');

/**
 * Determine if a value is a Number
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Number, otherwise false
 */
const isNumber = typeOfTest('number');

/**
 * Determine if a value is an Object
 *
 * @param {*} thing The value to test
 *
 * @returns {boolean} True if value is an Object, otherwise false
 */
const isObject = (thing) => thing !== null && typeof thing === 'object';

/**
 * Determine if a value is a Boolean
 *
 * @param {*} thing The value to test
 * @returns {boolean} True if value is a Boolean, otherwise false
 */
const isBoolean = thing => thing === true || thing === false;

/**
 * Determine if a value is a plain Object
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a plain Object, otherwise false
 */
const isPlainObject = (val) => {
  if (kindOf(val) !== 'object') {
    return false;
  }

  const prototype = getPrototypeOf(val);
  return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in val) && !(Symbol.iterator in val);
};

/**
 * Determine if a value is a Date
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Date, otherwise false
 */
const isDate = kindOfTest('Date');

/**
 * Determine if a value is a File
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a File, otherwise false
 */
const isFile = kindOfTest('File');

/**
 * Determine if a value is a Blob
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Blob, otherwise false
 */
const isBlob = kindOfTest('Blob');

/**
 * Determine if a value is a FileList
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a File, otherwise false
 */
const isFileList = kindOfTest('FileList');

/**
 * Determine if a value is a Stream
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Stream, otherwise false
 */
const isStream = (val) => isObject(val) && isFunction(val.pipe);

/**
 * Determine if a value is a FormData
 *
 * @param {*} thing The value to test
 *
 * @returns {boolean} True if value is an FormData, otherwise false
 */
const isFormData = (thing) => {
  let kind;
  return thing && (
    (typeof FormData === 'function' && thing instanceof FormData) || (
      isFunction(thing.append) && (
        (kind = kindOf(thing)) === 'formdata' ||
        // detect form-data instance
        (kind === 'object' && isFunction(thing.toString) && thing.toString() === '[object FormData]')
      )
    )
  )
};

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
const isURLSearchParams = kindOfTest('URLSearchParams');

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 *
 * @returns {String} The String freed of excess whitespace
 */
const trim = (str) => str.trim ?
  str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 *
 * @param {Boolean} [allOwnKeys = false]
 * @returns {any}
 */
function forEach(obj, fn, {allOwnKeys = false} = {}) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  let i;
  let l;

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
    const len = keys.length;
    let key;

    for (i = 0; i < len; i++) {
      key = keys[i];
      fn.call(null, obj[key], key, obj);
    }
  }
}

function findKey(obj, key) {
  key = key.toLowerCase();
  const keys = Object.keys(obj);
  let i = keys.length;
  let _key;
  while (i-- > 0) {
    _key = keys[i];
    if (key === _key.toLowerCase()) {
      return _key;
    }
  }
  return null;
}

const _global = (() => {
  /*eslint no-undef:0*/
  if (typeof globalThis !== "undefined") return globalThis;
  return typeof self !== "undefined" ? self : (typeof window !== 'undefined' ? window : __webpack_require__.g)
})();

const isContextDefined = (context) => !isUndefined(context) && context !== _global;

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 *
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  const {caseless} = isContextDefined(this) && this || {};
  const result = {};
  const assignValue = (val, key) => {
    const targetKey = caseless && findKey(result, key) || key;
    if (isPlainObject(result[targetKey]) && isPlainObject(val)) {
      result[targetKey] = merge(result[targetKey], val);
    } else if (isPlainObject(val)) {
      result[targetKey] = merge({}, val);
    } else if (isArray(val)) {
      result[targetKey] = val.slice();
    } else {
      result[targetKey] = val;
    }
  };

  for (let i = 0, l = arguments.length; i < l; i++) {
    arguments[i] && forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 *
 * @param {Boolean} [allOwnKeys]
 * @returns {Object} The resulting value of object a
 */
const extend = (a, b, thisArg, {allOwnKeys}= {}) => {
  forEach(b, (val, key) => {
    if (thisArg && isFunction(val)) {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  }, {allOwnKeys});
  return a;
};

/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 *
 * @returns {string} content value without BOM
 */
const stripBOM = (content) => {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return content;
};

/**
 * Inherit the prototype methods from one constructor into another
 * @param {function} constructor
 * @param {function} superConstructor
 * @param {object} [props]
 * @param {object} [descriptors]
 *
 * @returns {void}
 */
const inherits = (constructor, superConstructor, props, descriptors) => {
  constructor.prototype = Object.create(superConstructor.prototype, descriptors);
  constructor.prototype.constructor = constructor;
  Object.defineProperty(constructor, 'super', {
    value: superConstructor.prototype
  });
  props && Object.assign(constructor.prototype, props);
};

/**
 * Resolve object with deep prototype chain to a flat object
 * @param {Object} sourceObj source object
 * @param {Object} [destObj]
 * @param {Function|Boolean} [filter]
 * @param {Function} [propFilter]
 *
 * @returns {Object}
 */
const toFlatObject = (sourceObj, destObj, filter, propFilter) => {
  let props;
  let i;
  let prop;
  const merged = {};

  destObj = destObj || {};
  // eslint-disable-next-line no-eq-null,eqeqeq
  if (sourceObj == null) return destObj;

  do {
    props = Object.getOwnPropertyNames(sourceObj);
    i = props.length;
    while (i-- > 0) {
      prop = props[i];
      if ((!propFilter || propFilter(prop, sourceObj, destObj)) && !merged[prop]) {
        destObj[prop] = sourceObj[prop];
        merged[prop] = true;
      }
    }
    sourceObj = filter !== false && getPrototypeOf(sourceObj);
  } while (sourceObj && (!filter || filter(sourceObj, destObj)) && sourceObj !== Object.prototype);

  return destObj;
};

/**
 * Determines whether a string ends with the characters of a specified string
 *
 * @param {String} str
 * @param {String} searchString
 * @param {Number} [position= 0]
 *
 * @returns {boolean}
 */
const endsWith = (str, searchString, position) => {
  str = String(str);
  if (position === undefined || position > str.length) {
    position = str.length;
  }
  position -= searchString.length;
  const lastIndex = str.indexOf(searchString, position);
  return lastIndex !== -1 && lastIndex === position;
};


/**
 * Returns new array from array like object or null if failed
 *
 * @param {*} [thing]
 *
 * @returns {?Array}
 */
const toArray = (thing) => {
  if (!thing) return null;
  if (isArray(thing)) return thing;
  let i = thing.length;
  if (!isNumber(i)) return null;
  const arr = new Array(i);
  while (i-- > 0) {
    arr[i] = thing[i];
  }
  return arr;
};

/**
 * Checking if the Uint8Array exists and if it does, it returns a function that checks if the
 * thing passed in is an instance of Uint8Array
 *
 * @param {TypedArray}
 *
 * @returns {Array}
 */
// eslint-disable-next-line func-names
const isTypedArray = (TypedArray => {
  // eslint-disable-next-line func-names
  return thing => {
    return TypedArray && thing instanceof TypedArray;
  };
})(typeof Uint8Array !== 'undefined' && getPrototypeOf(Uint8Array));

/**
 * For each entry in the object, call the function with the key and value.
 *
 * @param {Object<any, any>} obj - The object to iterate over.
 * @param {Function} fn - The function to call for each entry.
 *
 * @returns {void}
 */
const forEachEntry = (obj, fn) => {
  const generator = obj && obj[Symbol.iterator];

  const iterator = generator.call(obj);

  let result;

  while ((result = iterator.next()) && !result.done) {
    const pair = result.value;
    fn.call(obj, pair[0], pair[1]);
  }
};

/**
 * It takes a regular expression and a string, and returns an array of all the matches
 *
 * @param {string} regExp - The regular expression to match against.
 * @param {string} str - The string to search.
 *
 * @returns {Array<boolean>}
 */
const matchAll = (regExp, str) => {
  let matches;
  const arr = [];

  while ((matches = regExp.exec(str)) !== null) {
    arr.push(matches);
  }

  return arr;
};

/* Checking if the kindOfTest function returns true when passed an HTMLFormElement. */
const isHTMLForm = kindOfTest('HTMLFormElement');

const toCamelCase = str => {
  return str.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,
    function replacer(m, p1, p2) {
      return p1.toUpperCase() + p2;
    }
  );
};

/* Creating a function that will check if an object has a property. */
const hasOwnProperty = (({hasOwnProperty}) => (obj, prop) => hasOwnProperty.call(obj, prop))(Object.prototype);

/**
 * Determine if a value is a RegExp object
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a RegExp object, otherwise false
 */
const isRegExp = kindOfTest('RegExp');

const reduceDescriptors = (obj, reducer) => {
  const descriptors = Object.getOwnPropertyDescriptors(obj);
  const reducedDescriptors = {};

  forEach(descriptors, (descriptor, name) => {
    if (reducer(descriptor, name, obj) !== false) {
      reducedDescriptors[name] = descriptor;
    }
  });

  Object.defineProperties(obj, reducedDescriptors);
};

/**
 * Makes all methods read-only
 * @param {Object} obj
 */

const freezeMethods = (obj) => {
  reduceDescriptors(obj, (descriptor, name) => {
    // skip restricted props in strict mode
    if (isFunction(obj) && ['arguments', 'caller', 'callee'].indexOf(name) !== -1) {
      return false;
    }

    const value = obj[name];

    if (!isFunction(value)) return;

    descriptor.enumerable = false;

    if ('writable' in descriptor) {
      descriptor.writable = false;
      return;
    }

    if (!descriptor.set) {
      descriptor.set = () => {
        throw Error('Can not rewrite read-only method \'' + name + '\'');
      };
    }
  });
};

const toObjectSet = (arrayOrString, delimiter) => {
  const obj = {};

  const define = (arr) => {
    arr.forEach(value => {
      obj[value] = true;
    });
  };

  isArray(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter));

  return obj;
};

const noop = () => {};

const toFiniteNumber = (value, defaultValue) => {
  value = +value;
  return Number.isFinite(value) ? value : defaultValue;
};

const ALPHA = 'abcdefghijklmnopqrstuvwxyz';

const DIGIT = '0123456789';

const ALPHABET = {
  DIGIT,
  ALPHA,
  ALPHA_DIGIT: ALPHA + ALPHA.toUpperCase() + DIGIT
};

const generateString = (size = 16, alphabet = ALPHABET.ALPHA_DIGIT) => {
  let str = '';
  const {length} = alphabet;
  while (size--) {
    str += alphabet[Math.random() * length|0];
  }

  return str;
};

/**
 * If the thing is a FormData object, return true, otherwise return false.
 *
 * @param {unknown} thing - The thing to check.
 *
 * @returns {boolean}
 */
function isSpecCompliantForm(thing) {
  return !!(thing && isFunction(thing.append) && thing[Symbol.toStringTag] === 'FormData' && thing[Symbol.iterator]);
}

const toJSONObject = (obj) => {
  const stack = new Array(10);

  const visit = (source, i) => {

    if (isObject(source)) {
      if (stack.indexOf(source) >= 0) {
        return;
      }

      if(!('toJSON' in source)) {
        stack[i] = source;
        const target = isArray(source) ? [] : {};

        forEach(source, (value, key) => {
          const reducedValue = visit(value, i + 1);
          !isUndefined(reducedValue) && (target[key] = reducedValue);
        });

        stack[i] = undefined;

        return target;
      }
    }

    return source;
  };

  return visit(obj, 0);
};

const isAsyncFn = kindOfTest('AsyncFunction');

const isThenable = (thing) =>
  thing && (isObject(thing) || isFunction(thing)) && isFunction(thing.then) && isFunction(thing.catch);

var utils = {
  isArray,
  isArrayBuffer,
  isBuffer,
  isFormData,
  isArrayBufferView,
  isString,
  isNumber,
  isBoolean,
  isObject,
  isPlainObject,
  isUndefined,
  isDate,
  isFile,
  isBlob,
  isRegExp,
  isFunction,
  isStream,
  isURLSearchParams,
  isTypedArray,
  isFileList,
  forEach,
  merge,
  extend,
  trim,
  stripBOM,
  inherits,
  toFlatObject,
  kindOf,
  kindOfTest,
  endsWith,
  toArray,
  forEachEntry,
  matchAll,
  isHTMLForm,
  hasOwnProperty,
  hasOwnProp: hasOwnProperty, // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors,
  freezeMethods,
  toObjectSet,
  toCamelCase,
  noop,
  toFiniteNumber,
  findKey,
  global: _global,
  isContextDefined,
  ALPHABET,
  generateString,
  isSpecCompliantForm,
  toJSONObject,
  isAsyncFn,
  isThenable
};

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [config] The config.
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 *
 * @returns {Error} The created error.
 */
function AxiosError(message, code, config, request, response) {
  Error.call(this);

  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, this.constructor);
  } else {
    this.stack = (new Error()).stack;
  }

  this.message = message;
  this.name = 'AxiosError';
  code && (this.code = code);
  config && (this.config = config);
  request && (this.request = request);
  response && (this.response = response);
}

utils.inherits(AxiosError, Error, {
  toJSON: function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: utils.toJSONObject(this.config),
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null
    };
  }
});

const prototype$1 = AxiosError.prototype;
const descriptors = {};

[
  'ERR_BAD_OPTION_VALUE',
  'ERR_BAD_OPTION',
  'ECONNABORTED',
  'ETIMEDOUT',
  'ERR_NETWORK',
  'ERR_FR_TOO_MANY_REDIRECTS',
  'ERR_DEPRECATED',
  'ERR_BAD_RESPONSE',
  'ERR_BAD_REQUEST',
  'ERR_CANCELED',
  'ERR_NOT_SUPPORT',
  'ERR_INVALID_URL'
// eslint-disable-next-line func-names
].forEach(code => {
  descriptors[code] = {value: code};
});

Object.defineProperties(AxiosError, descriptors);
Object.defineProperty(prototype$1, 'isAxiosError', {value: true});

// eslint-disable-next-line func-names
AxiosError.from = (error, code, config, request, response, customProps) => {
  const axiosError = Object.create(prototype$1);

  utils.toFlatObject(error, axiosError, function filter(obj) {
    return obj !== Error.prototype;
  }, prop => {
    return prop !== 'isAxiosError';
  });

  AxiosError.call(axiosError, error.message, code, config, request, response);

  axiosError.cause = error;

  axiosError.name = error.name;

  customProps && Object.assign(axiosError, customProps);

  return axiosError;
};

// eslint-disable-next-line strict
var httpAdapter = null;

/**
 * Determines if the given thing is a array or js object.
 *
 * @param {string} thing - The object or array to be visited.
 *
 * @returns {boolean}
 */
function isVisitable(thing) {
  return utils.isPlainObject(thing) || utils.isArray(thing);
}

/**
 * It removes the brackets from the end of a string
 *
 * @param {string} key - The key of the parameter.
 *
 * @returns {string} the key without the brackets.
 */
function removeBrackets(key) {
  return utils.endsWith(key, '[]') ? key.slice(0, -2) : key;
}

/**
 * It takes a path, a key, and a boolean, and returns a string
 *
 * @param {string} path - The path to the current key.
 * @param {string} key - The key of the current object being iterated over.
 * @param {string} dots - If true, the key will be rendered with dots instead of brackets.
 *
 * @returns {string} The path to the current key.
 */
function renderKey(path, key, dots) {
  if (!path) return key;
  return path.concat(key).map(function each(token, i) {
    // eslint-disable-next-line no-param-reassign
    token = removeBrackets(token);
    return !dots && i ? '[' + token + ']' : token;
  }).join(dots ? '.' : '');
}

/**
 * If the array is an array and none of its elements are visitable, then it's a flat array.
 *
 * @param {Array<any>} arr - The array to check
 *
 * @returns {boolean}
 */
function isFlatArray(arr) {
  return utils.isArray(arr) && !arr.some(isVisitable);
}

const predicates = utils.toFlatObject(utils, {}, null, function filter(prop) {
  return /^is[A-Z]/.test(prop);
});

/**
 * Convert a data object to FormData
 *
 * @param {Object} obj
 * @param {?Object} [formData]
 * @param {?Object} [options]
 * @param {Function} [options.visitor]
 * @param {Boolean} [options.metaTokens = true]
 * @param {Boolean} [options.dots = false]
 * @param {?Boolean} [options.indexes = false]
 *
 * @returns {Object}
 **/

/**
 * It converts an object into a FormData object
 *
 * @param {Object<any, any>} obj - The object to convert to form data.
 * @param {string} formData - The FormData object to append to.
 * @param {Object<string, any>} options
 *
 * @returns
 */
function toFormData(obj, formData, options) {
  if (!utils.isObject(obj)) {
    throw new TypeError('target must be an object');
  }

  // eslint-disable-next-line no-param-reassign
  formData = formData || new (FormData)();

  // eslint-disable-next-line no-param-reassign
  options = utils.toFlatObject(options, {
    metaTokens: true,
    dots: false,
    indexes: false
  }, false, function defined(option, source) {
    // eslint-disable-next-line no-eq-null,eqeqeq
    return !utils.isUndefined(source[option]);
  });

  const metaTokens = options.metaTokens;
  // eslint-disable-next-line no-use-before-define
  const visitor = options.visitor || defaultVisitor;
  const dots = options.dots;
  const indexes = options.indexes;
  const _Blob = options.Blob || typeof Blob !== 'undefined' && Blob;
  const useBlob = _Blob && utils.isSpecCompliantForm(formData);

  if (!utils.isFunction(visitor)) {
    throw new TypeError('visitor must be a function');
  }

  function convertValue(value) {
    if (value === null) return '';

    if (utils.isDate(value)) {
      return value.toISOString();
    }

    if (!useBlob && utils.isBlob(value)) {
      throw new AxiosError('Blob is not supported. Use a Buffer instead.');
    }

    if (utils.isArrayBuffer(value) || utils.isTypedArray(value)) {
      return useBlob && typeof Blob === 'function' ? new Blob([value]) : Buffer.from(value);
    }

    return value;
  }

  /**
   * Default visitor.
   *
   * @param {*} value
   * @param {String|Number} key
   * @param {Array<String|Number>} path
   * @this {FormData}
   *
   * @returns {boolean} return true to visit the each prop of the value recursively
   */
  function defaultVisitor(value, key, path) {
    let arr = value;

    if (value && !path && typeof value === 'object') {
      if (utils.endsWith(key, '{}')) {
        // eslint-disable-next-line no-param-reassign
        key = metaTokens ? key : key.slice(0, -2);
        // eslint-disable-next-line no-param-reassign
        value = JSON.stringify(value);
      } else if (
        (utils.isArray(value) && isFlatArray(value)) ||
        ((utils.isFileList(value) || utils.endsWith(key, '[]')) && (arr = utils.toArray(value))
        )) {
        // eslint-disable-next-line no-param-reassign
        key = removeBrackets(key);

        arr.forEach(function each(el, index) {
          !(utils.isUndefined(el) || el === null) && formData.append(
            // eslint-disable-next-line no-nested-ternary
            indexes === true ? renderKey([key], index, dots) : (indexes === null ? key : key + '[]'),
            convertValue(el)
          );
        });
        return false;
      }
    }

    if (isVisitable(value)) {
      return true;
    }

    formData.append(renderKey(path, key, dots), convertValue(value));

    return false;
  }

  const stack = [];

  const exposedHelpers = Object.assign(predicates, {
    defaultVisitor,
    convertValue,
    isVisitable
  });

  function build(value, path) {
    if (utils.isUndefined(value)) return;

    if (stack.indexOf(value) !== -1) {
      throw Error('Circular reference detected in ' + path.join('.'));
    }

    stack.push(value);

    utils.forEach(value, function each(el, key) {
      const result = !(utils.isUndefined(el) || el === null) && visitor.call(
        formData, el, utils.isString(key) ? key.trim() : key, path, exposedHelpers
      );

      if (result === true) {
        build(el, path ? path.concat(key) : [key]);
      }
    });

    stack.pop();
  }

  if (!utils.isObject(obj)) {
    throw new TypeError('data must be an object');
  }

  build(obj);

  return formData;
}

/**
 * It encodes a string by replacing all characters that are not in the unreserved set with
 * their percent-encoded equivalents
 *
 * @param {string} str - The string to encode.
 *
 * @returns {string} The encoded string.
 */
function encode$1(str) {
  const charMap = {
    '!': '%21',
    "'": '%27',
    '(': '%28',
    ')': '%29',
    '~': '%7E',
    '%20': '+',
    '%00': '\x00'
  };
  return encodeURIComponent(str).replace(/[!'()~]|%20|%00/g, function replacer(match) {
    return charMap[match];
  });
}

/**
 * It takes a params object and converts it to a FormData object
 *
 * @param {Object<string, any>} params - The parameters to be converted to a FormData object.
 * @param {Object<string, any>} options - The options object passed to the Axios constructor.
 *
 * @returns {void}
 */
function AxiosURLSearchParams(params, options) {
  this._pairs = [];

  params && toFormData(params, this, options);
}

const prototype = AxiosURLSearchParams.prototype;

prototype.append = function append(name, value) {
  this._pairs.push([name, value]);
};

prototype.toString = function toString(encoder) {
  const _encode = encoder ? function(value) {
    return encoder.call(this, value, encode$1);
  } : encode$1;

  return this._pairs.map(function each(pair) {
    return _encode(pair[0]) + '=' + _encode(pair[1]);
  }, '').join('&');
};

/**
 * It replaces all instances of the characters `:`, `$`, `,`, `+`, `[`, and `]` with their
 * URI encoded counterparts
 *
 * @param {string} val The value to be encoded.
 *
 * @returns {string} The encoded value.
 */
function encode(val) {
  return encodeURIComponent(val).
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @param {?object} options
 *
 * @returns {string} The formatted url
 */
function buildURL(url, params, options) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }
  
  const _encode = options && options.encode || encode;

  const serializeFn = options && options.serialize;

  let serializedParams;

  if (serializeFn) {
    serializedParams = serializeFn(params, options);
  } else {
    serializedParams = utils.isURLSearchParams(params) ?
      params.toString() :
      new AxiosURLSearchParams(params, options).toString(_encode);
  }

  if (serializedParams) {
    const hashmarkIndex = url.indexOf("#");

    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
}

class InterceptorManager {
  constructor() {
    this.handlers = [];
  }

  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(fulfilled, rejected, options) {
    this.handlers.push({
      fulfilled,
      rejected,
      synchronous: options ? options.synchronous : false,
      runWhen: options ? options.runWhen : null
    });
    return this.handlers.length - 1;
  }

  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
   */
  eject(id) {
    if (this.handlers[id]) {
      this.handlers[id] = null;
    }
  }

  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    if (this.handlers) {
      this.handlers = [];
    }
  }

  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(fn) {
    utils.forEach(this.handlers, function forEachHandler(h) {
      if (h !== null) {
        fn(h);
      }
    });
  }
}

var InterceptorManager$1 = InterceptorManager;

var transitionalDefaults = {
  silentJSONParsing: true,
  forcedJSONParsing: true,
  clarifyTimeoutError: false
};

var URLSearchParams$1 = typeof URLSearchParams !== 'undefined' ? URLSearchParams : AxiosURLSearchParams;

var FormData$1 = typeof FormData !== 'undefined' ? FormData : null;

var Blob$1 = typeof Blob !== 'undefined' ? Blob : null;

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 *
 * @returns {boolean}
 */
const isStandardBrowserEnv = (() => {
  let product;
  if (typeof navigator !== 'undefined' && (
    (product = navigator.product) === 'ReactNative' ||
    product === 'NativeScript' ||
    product === 'NS')
  ) {
    return false;
  }

  return typeof window !== 'undefined' && typeof document !== 'undefined';
})();

/**
 * Determine if we're running in a standard browser webWorker environment
 *
 * Although the `isStandardBrowserEnv` method indicates that
 * `allows axios to run in a web worker`, the WebWorker will still be
 * filtered out due to its judgment standard
 * `typeof window !== 'undefined' && typeof document !== 'undefined'`.
 * This leads to a problem when axios post `FormData` in webWorker
 */
 const isStandardBrowserWebWorkerEnv = (() => {
  return (
    typeof WorkerGlobalScope !== 'undefined' &&
    // eslint-disable-next-line no-undef
    self instanceof WorkerGlobalScope &&
    typeof self.importScripts === 'function'
  );
})();


var platform = {
  isBrowser: true,
  classes: {
    URLSearchParams: URLSearchParams$1,
    FormData: FormData$1,
    Blob: Blob$1
  },
  isStandardBrowserEnv,
  isStandardBrowserWebWorkerEnv,
  protocols: ['http', 'https', 'file', 'blob', 'url', 'data']
};

function toURLEncodedForm(data, options) {
  return toFormData(data, new platform.classes.URLSearchParams(), Object.assign({
    visitor: function(value, key, path, helpers) {
      if (platform.isNode && utils.isBuffer(value)) {
        this.append(key, value.toString('base64'));
        return false;
      }

      return helpers.defaultVisitor.apply(this, arguments);
    }
  }, options));
}

/**
 * It takes a string like `foo[x][y][z]` and returns an array like `['foo', 'x', 'y', 'z']
 *
 * @param {string} name - The name of the property to get.
 *
 * @returns An array of strings.
 */
function parsePropPath(name) {
  // foo[x][y][z]
  // foo.x.y.z
  // foo-x-y-z
  // foo x y z
  return utils.matchAll(/\w+|\[(\w*)]/g, name).map(match => {
    return match[0] === '[]' ? '' : match[1] || match[0];
  });
}

/**
 * Convert an array to an object.
 *
 * @param {Array<any>} arr - The array to convert to an object.
 *
 * @returns An object with the same keys and values as the array.
 */
function arrayToObject(arr) {
  const obj = {};
  const keys = Object.keys(arr);
  let i;
  const len = keys.length;
  let key;
  for (i = 0; i < len; i++) {
    key = keys[i];
    obj[key] = arr[key];
  }
  return obj;
}

/**
 * It takes a FormData object and returns a JavaScript object
 *
 * @param {string} formData The FormData object to convert to JSON.
 *
 * @returns {Object<string, any> | null} The converted object.
 */
function formDataToJSON(formData) {
  function buildPath(path, value, target, index) {
    let name = path[index++];
    const isNumericKey = Number.isFinite(+name);
    const isLast = index >= path.length;
    name = !name && utils.isArray(target) ? target.length : name;

    if (isLast) {
      if (utils.hasOwnProp(target, name)) {
        target[name] = [target[name], value];
      } else {
        target[name] = value;
      }

      return !isNumericKey;
    }

    if (!target[name] || !utils.isObject(target[name])) {
      target[name] = [];
    }

    const result = buildPath(path, value, target[name], index);

    if (result && utils.isArray(target[name])) {
      target[name] = arrayToObject(target[name]);
    }

    return !isNumericKey;
  }

  if (utils.isFormData(formData) && utils.isFunction(formData.entries)) {
    const obj = {};

    utils.forEachEntry(formData, (name, value) => {
      buildPath(parsePropPath(name), value, obj, 0);
    });

    return obj;
  }

  return null;
}

const DEFAULT_CONTENT_TYPE = {
  'Content-Type': undefined
};

/**
 * It takes a string, tries to parse it, and if it fails, it returns the stringified version
 * of the input
 *
 * @param {any} rawValue - The value to be stringified.
 * @param {Function} parser - A function that parses a string into a JavaScript object.
 * @param {Function} encoder - A function that takes a value and returns a string.
 *
 * @returns {string} A stringified version of the rawValue.
 */
function stringifySafely(rawValue, parser, encoder) {
  if (utils.isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return utils.trim(rawValue);
    } catch (e) {
      if (e.name !== 'SyntaxError') {
        throw e;
      }
    }
  }

  return (encoder || JSON.stringify)(rawValue);
}

const defaults = {

  transitional: transitionalDefaults,

  adapter: ['xhr', 'http'],

  transformRequest: [function transformRequest(data, headers) {
    const contentType = headers.getContentType() || '';
    const hasJSONContentType = contentType.indexOf('application/json') > -1;
    const isObjectPayload = utils.isObject(data);

    if (isObjectPayload && utils.isHTMLForm(data)) {
      data = new FormData(data);
    }

    const isFormData = utils.isFormData(data);

    if (isFormData) {
      if (!hasJSONContentType) {
        return data;
      }
      return hasJSONContentType ? JSON.stringify(formDataToJSON(data)) : data;
    }

    if (utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      headers.setContentType('application/x-www-form-urlencoded;charset=utf-8', false);
      return data.toString();
    }

    let isFileList;

    if (isObjectPayload) {
      if (contentType.indexOf('application/x-www-form-urlencoded') > -1) {
        return toURLEncodedForm(data, this.formSerializer).toString();
      }

      if ((isFileList = utils.isFileList(data)) || contentType.indexOf('multipart/form-data') > -1) {
        const _FormData = this.env && this.env.FormData;

        return toFormData(
          isFileList ? {'files[]': data} : data,
          _FormData && new _FormData(),
          this.formSerializer
        );
      }
    }

    if (isObjectPayload || hasJSONContentType ) {
      headers.setContentType('application/json', false);
      return stringifySafely(data);
    }

    return data;
  }],

  transformResponse: [function transformResponse(data) {
    const transitional = this.transitional || defaults.transitional;
    const forcedJSONParsing = transitional && transitional.forcedJSONParsing;
    const JSONRequested = this.responseType === 'json';

    if (data && utils.isString(data) && ((forcedJSONParsing && !this.responseType) || JSONRequested)) {
      const silentJSONParsing = transitional && transitional.silentJSONParsing;
      const strictJSONParsing = !silentJSONParsing && JSONRequested;

      try {
        return JSON.parse(data);
      } catch (e) {
        if (strictJSONParsing) {
          if (e.name === 'SyntaxError') {
            throw AxiosError.from(e, AxiosError.ERR_BAD_RESPONSE, this, null, this.response);
          }
          throw e;
        }
      }
    }

    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,
  maxBodyLength: -1,

  env: {
    FormData: platform.classes.FormData,
    Blob: platform.classes.Blob
  },

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  },

  headers: {
    common: {
      'Accept': 'application/json, text/plain, */*'
    }
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

var defaults$1 = defaults;

// RawAxiosHeaders whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
const ignoreDuplicateOf = utils.toObjectSet([
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
]);

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} rawHeaders Headers needing to be parsed
 *
 * @returns {Object} Headers parsed into an object
 */
var parseHeaders = rawHeaders => {
  const parsed = {};
  let key;
  let val;
  let i;

  rawHeaders && rawHeaders.split('\n').forEach(function parser(line) {
    i = line.indexOf(':');
    key = line.substring(0, i).trim().toLowerCase();
    val = line.substring(i + 1).trim();

    if (!key || (parsed[key] && ignoreDuplicateOf[key])) {
      return;
    }

    if (key === 'set-cookie') {
      if (parsed[key]) {
        parsed[key].push(val);
      } else {
        parsed[key] = [val];
      }
    } else {
      parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
    }
  });

  return parsed;
};

const $internals = Symbol('internals');

function normalizeHeader(header) {
  return header && String(header).trim().toLowerCase();
}

function normalizeValue(value) {
  if (value === false || value == null) {
    return value;
  }

  return utils.isArray(value) ? value.map(normalizeValue) : String(value);
}

function parseTokens(str) {
  const tokens = Object.create(null);
  const tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let match;

  while ((match = tokensRE.exec(str))) {
    tokens[match[1]] = match[2];
  }

  return tokens;
}

const isValidHeaderName = (str) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(str.trim());

function matchHeaderValue(context, value, header, filter, isHeaderNameFilter) {
  if (utils.isFunction(filter)) {
    return filter.call(this, value, header);
  }

  if (isHeaderNameFilter) {
    value = header;
  }

  if (!utils.isString(value)) return;

  if (utils.isString(filter)) {
    return value.indexOf(filter) !== -1;
  }

  if (utils.isRegExp(filter)) {
    return filter.test(value);
  }
}

function formatHeader(header) {
  return header.trim()
    .toLowerCase().replace(/([a-z\d])(\w*)/g, (w, char, str) => {
      return char.toUpperCase() + str;
    });
}

function buildAccessors(obj, header) {
  const accessorName = utils.toCamelCase(' ' + header);

  ['get', 'set', 'has'].forEach(methodName => {
    Object.defineProperty(obj, methodName + accessorName, {
      value: function(arg1, arg2, arg3) {
        return this[methodName].call(this, header, arg1, arg2, arg3);
      },
      configurable: true
    });
  });
}

class AxiosHeaders {
  constructor(headers) {
    headers && this.set(headers);
  }

  set(header, valueOrRewrite, rewrite) {
    const self = this;

    function setHeader(_value, _header, _rewrite) {
      const lHeader = normalizeHeader(_header);

      if (!lHeader) {
        throw new Error('header name must be a non-empty string');
      }

      const key = utils.findKey(self, lHeader);

      if(!key || self[key] === undefined || _rewrite === true || (_rewrite === undefined && self[key] !== false)) {
        self[key || _header] = normalizeValue(_value);
      }
    }

    const setHeaders = (headers, _rewrite) =>
      utils.forEach(headers, (_value, _header) => setHeader(_value, _header, _rewrite));

    if (utils.isPlainObject(header) || header instanceof this.constructor) {
      setHeaders(header, valueOrRewrite);
    } else if(utils.isString(header) && (header = header.trim()) && !isValidHeaderName(header)) {
      setHeaders(parseHeaders(header), valueOrRewrite);
    } else {
      header != null && setHeader(valueOrRewrite, header, rewrite);
    }

    return this;
  }

  get(header, parser) {
    header = normalizeHeader(header);

    if (header) {
      const key = utils.findKey(this, header);

      if (key) {
        const value = this[key];

        if (!parser) {
          return value;
        }

        if (parser === true) {
          return parseTokens(value);
        }

        if (utils.isFunction(parser)) {
          return parser.call(this, value, key);
        }

        if (utils.isRegExp(parser)) {
          return parser.exec(value);
        }

        throw new TypeError('parser must be boolean|regexp|function');
      }
    }
  }

  has(header, matcher) {
    header = normalizeHeader(header);

    if (header) {
      const key = utils.findKey(this, header);

      return !!(key && this[key] !== undefined && (!matcher || matchHeaderValue(this, this[key], key, matcher)));
    }

    return false;
  }

  delete(header, matcher) {
    const self = this;
    let deleted = false;

    function deleteHeader(_header) {
      _header = normalizeHeader(_header);

      if (_header) {
        const key = utils.findKey(self, _header);

        if (key && (!matcher || matchHeaderValue(self, self[key], key, matcher))) {
          delete self[key];

          deleted = true;
        }
      }
    }

    if (utils.isArray(header)) {
      header.forEach(deleteHeader);
    } else {
      deleteHeader(header);
    }

    return deleted;
  }

  clear(matcher) {
    const keys = Object.keys(this);
    let i = keys.length;
    let deleted = false;

    while (i--) {
      const key = keys[i];
      if(!matcher || matchHeaderValue(this, this[key], key, matcher, true)) {
        delete this[key];
        deleted = true;
      }
    }

    return deleted;
  }

  normalize(format) {
    const self = this;
    const headers = {};

    utils.forEach(this, (value, header) => {
      const key = utils.findKey(headers, header);

      if (key) {
        self[key] = normalizeValue(value);
        delete self[header];
        return;
      }

      const normalized = format ? formatHeader(header) : String(header).trim();

      if (normalized !== header) {
        delete self[header];
      }

      self[normalized] = normalizeValue(value);

      headers[normalized] = true;
    });

    return this;
  }

  concat(...targets) {
    return this.constructor.concat(this, ...targets);
  }

  toJSON(asStrings) {
    const obj = Object.create(null);

    utils.forEach(this, (value, header) => {
      value != null && value !== false && (obj[header] = asStrings && utils.isArray(value) ? value.join(', ') : value);
    });

    return obj;
  }

  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }

  toString() {
    return Object.entries(this.toJSON()).map(([header, value]) => header + ': ' + value).join('\n');
  }

  get [Symbol.toStringTag]() {
    return 'AxiosHeaders';
  }

  static from(thing) {
    return thing instanceof this ? thing : new this(thing);
  }

  static concat(first, ...targets) {
    const computed = new this(first);

    targets.forEach((target) => computed.set(target));

    return computed;
  }

  static accessor(header) {
    const internals = this[$internals] = (this[$internals] = {
      accessors: {}
    });

    const accessors = internals.accessors;
    const prototype = this.prototype;

    function defineAccessor(_header) {
      const lHeader = normalizeHeader(_header);

      if (!accessors[lHeader]) {
        buildAccessors(prototype, _header);
        accessors[lHeader] = true;
      }
    }

    utils.isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);

    return this;
  }
}

AxiosHeaders.accessor(['Content-Type', 'Content-Length', 'Accept', 'Accept-Encoding', 'User-Agent', 'Authorization']);

utils.freezeMethods(AxiosHeaders.prototype);
utils.freezeMethods(AxiosHeaders);

var AxiosHeaders$1 = AxiosHeaders;

/**
 * Transform the data for a request or a response
 *
 * @param {Array|Function} fns A single function or Array of functions
 * @param {?Object} response The response object
 *
 * @returns {*} The resulting transformed data
 */
function transformData(fns, response) {
  const config = this || defaults$1;
  const context = response || config;
  const headers = AxiosHeaders$1.from(context.headers);
  let data = context.data;

  utils.forEach(fns, function transform(fn) {
    data = fn.call(config, data, headers.normalize(), response ? response.status : undefined);
  });

  headers.normalize();

  return data;
}

function isCancel(value) {
  return !!(value && value.__CANCEL__);
}

/**
 * A `CanceledError` is an object that is thrown when an operation is canceled.
 *
 * @param {string=} message The message.
 * @param {Object=} config The config.
 * @param {Object=} request The request.
 *
 * @returns {CanceledError} The created error.
 */
function CanceledError(message, config, request) {
  // eslint-disable-next-line no-eq-null,eqeqeq
  AxiosError.call(this, message == null ? 'canceled' : message, AxiosError.ERR_CANCELED, config, request);
  this.name = 'CanceledError';
}

utils.inherits(CanceledError, AxiosError, {
  __CANCEL__: true
});

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 *
 * @returns {object} The response.
 */
function settle(resolve, reject, response) {
  const validateStatus = response.config.validateStatus;
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(new AxiosError(
      'Request failed with status code ' + response.status,
      [AxiosError.ERR_BAD_REQUEST, AxiosError.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4],
      response.config,
      response.request,
      response
    ));
  }
}

var cookies = platform.isStandardBrowserEnv ?

// Standard browser envs support document.cookie
  (function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path, domain, secure) {
        const cookie = [];
        cookie.push(name + '=' + encodeURIComponent(value));

        if (utils.isNumber(expires)) {
          cookie.push('expires=' + new Date(expires).toGMTString());
        }

        if (utils.isString(path)) {
          cookie.push('path=' + path);
        }

        if (utils.isString(domain)) {
          cookie.push('domain=' + domain);
        }

        if (secure === true) {
          cookie.push('secure');
        }

        document.cookie = cookie.join('; ');
      },

      read: function read(name) {
        const match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
        return (match ? decodeURIComponent(match[3]) : null);
      },

      remove: function remove(name) {
        this.write(name, '', Date.now() - 86400000);
      }
    };
  })() :

// Non standard browser env (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return {
      write: function write() {},
      read: function read() { return null; },
      remove: function remove() {}
    };
  })();

/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 *
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
}

/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 *
 * @returns {string} The combined URL
 */
function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
}

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 *
 * @returns {string} The combined full path
 */
function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
}

var isURLSameOrigin = platform.isStandardBrowserEnv ?

// Standard browser envs have full support of the APIs needed to test
// whether the request URL is of the same origin as current location.
  (function standardBrowserEnv() {
    const msie = /(msie|trident)/i.test(navigator.userAgent);
    const urlParsingNode = document.createElement('a');
    let originURL;

    /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
    function resolveURL(url) {
      let href = url;

      if (msie) {
        // IE needs attribute set twice to normalize properties
        urlParsingNode.setAttribute('href', href);
        href = urlParsingNode.href;
      }

      urlParsingNode.setAttribute('href', href);

      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
          urlParsingNode.pathname :
          '/' + urlParsingNode.pathname
      };
    }

    originURL = resolveURL(window.location.href);

    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
    return function isURLSameOrigin(requestURL) {
      const parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
      return (parsed.protocol === originURL.protocol &&
          parsed.host === originURL.host);
    };
  })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  })();

function parseProtocol(url) {
  const match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
  return match && match[1] || '';
}

/**
 * Calculate data maxRate
 * @param {Number} [samplesCount= 10]
 * @param {Number} [min= 1000]
 * @returns {Function}
 */
function speedometer(samplesCount, min) {
  samplesCount = samplesCount || 10;
  const bytes = new Array(samplesCount);
  const timestamps = new Array(samplesCount);
  let head = 0;
  let tail = 0;
  let firstSampleTS;

  min = min !== undefined ? min : 1000;

  return function push(chunkLength) {
    const now = Date.now();

    const startedAt = timestamps[tail];

    if (!firstSampleTS) {
      firstSampleTS = now;
    }

    bytes[head] = chunkLength;
    timestamps[head] = now;

    let i = tail;
    let bytesCount = 0;

    while (i !== head) {
      bytesCount += bytes[i++];
      i = i % samplesCount;
    }

    head = (head + 1) % samplesCount;

    if (head === tail) {
      tail = (tail + 1) % samplesCount;
    }

    if (now - firstSampleTS < min) {
      return;
    }

    const passed = startedAt && now - startedAt;

    return passed ? Math.round(bytesCount * 1000 / passed) : undefined;
  };
}

function progressEventReducer(listener, isDownloadStream) {
  let bytesNotified = 0;
  const _speedometer = speedometer(50, 250);

  return e => {
    const loaded = e.loaded;
    const total = e.lengthComputable ? e.total : undefined;
    const progressBytes = loaded - bytesNotified;
    const rate = _speedometer(progressBytes);
    const inRange = loaded <= total;

    bytesNotified = loaded;

    const data = {
      loaded,
      total,
      progress: total ? (loaded / total) : undefined,
      bytes: progressBytes,
      rate: rate ? rate : undefined,
      estimated: rate && total && inRange ? (total - loaded) / rate : undefined,
      event: e
    };

    data[isDownloadStream ? 'download' : 'upload'] = true;

    listener(data);
  };
}

const isXHRAdapterSupported = typeof XMLHttpRequest !== 'undefined';

var xhrAdapter = isXHRAdapterSupported && function (config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    let requestData = config.data;
    const requestHeaders = AxiosHeaders$1.from(config.headers).normalize();
    const responseType = config.responseType;
    let onCanceled;
    function done() {
      if (config.cancelToken) {
        config.cancelToken.unsubscribe(onCanceled);
      }

      if (config.signal) {
        config.signal.removeEventListener('abort', onCanceled);
      }
    }

    if (utils.isFormData(requestData)) {
      if (platform.isStandardBrowserEnv || platform.isStandardBrowserWebWorkerEnv) {
        requestHeaders.setContentType(false); // Let the browser set it
      } else {
        requestHeaders.setContentType('multipart/form-data;', false); // mobile/desktop app frameworks
      }
    }

    let request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      const username = config.auth.username || '';
      const password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
      requestHeaders.set('Authorization', 'Basic ' + btoa(username + ':' + password));
    }

    const fullPath = buildFullPath(config.baseURL, config.url);

    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    function onloadend() {
      if (!request) {
        return;
      }
      // Prepare the response
      const responseHeaders = AxiosHeaders$1.from(
        'getAllResponseHeaders' in request && request.getAllResponseHeaders()
      );
      const responseData = !responseType || responseType === 'text' || responseType === 'json' ?
        request.responseText : request.response;
      const response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      };

      settle(function _resolve(value) {
        resolve(value);
        done();
      }, function _reject(err) {
        reject(err);
        done();
      }, response);

      // Clean up request
      request = null;
    }

    if ('onloadend' in request) {
      // Use onloadend if available
      request.onloadend = onloadend;
    } else {
      // Listen for ready state to emulate onloadend
      request.onreadystatechange = function handleLoad() {
        if (!request || request.readyState !== 4) {
          return;
        }

        // The request errored out and we didn't get a response, this will be
        // handled by onerror instead
        // With one exception: request that using file: protocol, most browsers
        // will return status as 0 even though it's a successful request
        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
          return;
        }
        // readystate handler is calling before onerror or ontimeout handlers,
        // so we should call onloadend on the next 'tick'
        setTimeout(onloadend);
      };
    }

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(new AxiosError('Request aborted', AxiosError.ECONNABORTED, config, request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(new AxiosError('Network Error', AxiosError.ERR_NETWORK, config, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      let timeoutErrorMessage = config.timeout ? 'timeout of ' + config.timeout + 'ms exceeded' : 'timeout exceeded';
      const transitional = config.transitional || transitionalDefaults;
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(new AxiosError(
        timeoutErrorMessage,
        transitional.clarifyTimeoutError ? AxiosError.ETIMEDOUT : AxiosError.ECONNABORTED,
        config,
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (platform.isStandardBrowserEnv) {
      // Add xsrf header
      const xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath))
        && config.xsrfCookieName && cookies.read(config.xsrfCookieName);

      if (xsrfValue) {
        requestHeaders.set(config.xsrfHeaderName, xsrfValue);
      }
    }

    // Remove Content-Type if data is undefined
    requestData === undefined && requestHeaders.setContentType(null);

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders.toJSON(), function setRequestHeader(val, key) {
        request.setRequestHeader(key, val);
      });
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (responseType && responseType !== 'json') {
      request.responseType = config.responseType;
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', progressEventReducer(config.onDownloadProgress, true));
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', progressEventReducer(config.onUploadProgress));
    }

    if (config.cancelToken || config.signal) {
      // Handle cancellation
      // eslint-disable-next-line func-names
      onCanceled = cancel => {
        if (!request) {
          return;
        }
        reject(!cancel || cancel.type ? new CanceledError(null, config, request) : cancel);
        request.abort();
        request = null;
      };

      config.cancelToken && config.cancelToken.subscribe(onCanceled);
      if (config.signal) {
        config.signal.aborted ? onCanceled() : config.signal.addEventListener('abort', onCanceled);
      }
    }

    const protocol = parseProtocol(fullPath);

    if (protocol && platform.protocols.indexOf(protocol) === -1) {
      reject(new AxiosError('Unsupported protocol ' + protocol + ':', AxiosError.ERR_BAD_REQUEST, config));
      return;
    }


    // Send the request
    request.send(requestData || null);
  });
};

const knownAdapters = {
  http: httpAdapter,
  xhr: xhrAdapter
};

utils.forEach(knownAdapters, (fn, value) => {
  if(fn) {
    try {
      Object.defineProperty(fn, 'name', {value});
    } catch (e) {
      // eslint-disable-next-line no-empty
    }
    Object.defineProperty(fn, 'adapterName', {value});
  }
});

var adapters = {
  getAdapter: (adapters) => {
    adapters = utils.isArray(adapters) ? adapters : [adapters];

    const {length} = adapters;
    let nameOrAdapter;
    let adapter;

    for (let i = 0; i < length; i++) {
      nameOrAdapter = adapters[i];
      if((adapter = utils.isString(nameOrAdapter) ? knownAdapters[nameOrAdapter.toLowerCase()] : nameOrAdapter)) {
        break;
      }
    }

    if (!adapter) {
      if (adapter === false) {
        throw new AxiosError(
          `Adapter ${nameOrAdapter} is not supported by the environment`,
          'ERR_NOT_SUPPORT'
        );
      }

      throw new Error(
        utils.hasOwnProp(knownAdapters, nameOrAdapter) ?
          `Adapter '${nameOrAdapter}' is not available in the build` :
          `Unknown adapter '${nameOrAdapter}'`
      );
    }

    if (!utils.isFunction(adapter)) {
      throw new TypeError('adapter is not a function');
    }

    return adapter;
  },
  adapters: knownAdapters
};

/**
 * Throws a `CanceledError` if cancellation has been requested.
 *
 * @param {Object} config The config that is to be used for the request
 *
 * @returns {void}
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }

  if (config.signal && config.signal.aborted) {
    throw new CanceledError(null, config);
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 *
 * @returns {Promise} The Promise to be fulfilled
 */
function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  config.headers = AxiosHeaders$1.from(config.headers);

  // Transform request data
  config.data = transformData.call(
    config,
    config.transformRequest
  );

  if (['post', 'put', 'patch'].indexOf(config.method) !== -1) {
    config.headers.setContentType('application/x-www-form-urlencoded', false);
  }

  const adapter = adapters.getAdapter(config.adapter || defaults$1.adapter);

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData.call(
      config,
      config.transformResponse,
      response
    );

    response.headers = AxiosHeaders$1.from(response.headers);

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData.call(
          config,
          config.transformResponse,
          reason.response
        );
        reason.response.headers = AxiosHeaders$1.from(reason.response.headers);
      }
    }

    return Promise.reject(reason);
  });
}

const headersToObject = (thing) => thing instanceof AxiosHeaders$1 ? thing.toJSON() : thing;

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 *
 * @returns {Object} New object resulting from merging config2 to config1
 */
function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  const config = {};

  function getMergedValue(target, source, caseless) {
    if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
      return utils.merge.call({caseless}, target, source);
    } else if (utils.isPlainObject(source)) {
      return utils.merge({}, source);
    } else if (utils.isArray(source)) {
      return source.slice();
    }
    return source;
  }

  // eslint-disable-next-line consistent-return
  function mergeDeepProperties(a, b, caseless) {
    if (!utils.isUndefined(b)) {
      return getMergedValue(a, b, caseless);
    } else if (!utils.isUndefined(a)) {
      return getMergedValue(undefined, a, caseless);
    }
  }

  // eslint-disable-next-line consistent-return
  function valueFromConfig2(a, b) {
    if (!utils.isUndefined(b)) {
      return getMergedValue(undefined, b);
    }
  }

  // eslint-disable-next-line consistent-return
  function defaultToConfig2(a, b) {
    if (!utils.isUndefined(b)) {
      return getMergedValue(undefined, b);
    } else if (!utils.isUndefined(a)) {
      return getMergedValue(undefined, a);
    }
  }

  // eslint-disable-next-line consistent-return
  function mergeDirectKeys(a, b, prop) {
    if (prop in config2) {
      return getMergedValue(a, b);
    } else if (prop in config1) {
      return getMergedValue(undefined, a);
    }
  }

  const mergeMap = {
    url: valueFromConfig2,
    method: valueFromConfig2,
    data: valueFromConfig2,
    baseURL: defaultToConfig2,
    transformRequest: defaultToConfig2,
    transformResponse: defaultToConfig2,
    paramsSerializer: defaultToConfig2,
    timeout: defaultToConfig2,
    timeoutMessage: defaultToConfig2,
    withCredentials: defaultToConfig2,
    adapter: defaultToConfig2,
    responseType: defaultToConfig2,
    xsrfCookieName: defaultToConfig2,
    xsrfHeaderName: defaultToConfig2,
    onUploadProgress: defaultToConfig2,
    onDownloadProgress: defaultToConfig2,
    decompress: defaultToConfig2,
    maxContentLength: defaultToConfig2,
    maxBodyLength: defaultToConfig2,
    beforeRedirect: defaultToConfig2,
    transport: defaultToConfig2,
    httpAgent: defaultToConfig2,
    httpsAgent: defaultToConfig2,
    cancelToken: defaultToConfig2,
    socketPath: defaultToConfig2,
    responseEncoding: defaultToConfig2,
    validateStatus: mergeDirectKeys,
    headers: (a, b) => mergeDeepProperties(headersToObject(a), headersToObject(b), true)
  };

  utils.forEach(Object.keys(Object.assign({}, config1, config2)), function computeConfigValue(prop) {
    const merge = mergeMap[prop] || mergeDeepProperties;
    const configValue = merge(config1[prop], config2[prop], prop);
    (utils.isUndefined(configValue) && merge !== mergeDirectKeys) || (config[prop] = configValue);
  });

  return config;
}

const VERSION = "1.4.0";

const validators$1 = {};

// eslint-disable-next-line func-names
['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach((type, i) => {
  validators$1[type] = function validator(thing) {
    return typeof thing === type || 'a' + (i < 1 ? 'n ' : ' ') + type;
  };
});

const deprecatedWarnings = {};

/**
 * Transitional option validator
 *
 * @param {function|boolean?} validator - set to false if the transitional option has been removed
 * @param {string?} version - deprecated version / removed since version
 * @param {string?} message - some message with additional info
 *
 * @returns {function}
 */
validators$1.transitional = function transitional(validator, version, message) {
  function formatMessage(opt, desc) {
    return '[Axios v' + VERSION + '] Transitional option \'' + opt + '\'' + desc + (message ? '. ' + message : '');
  }

  // eslint-disable-next-line func-names
  return (value, opt, opts) => {
    if (validator === false) {
      throw new AxiosError(
        formatMessage(opt, ' has been removed' + (version ? ' in ' + version : '')),
        AxiosError.ERR_DEPRECATED
      );
    }

    if (version && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      // eslint-disable-next-line no-console
      console.warn(
        formatMessage(
          opt,
          ' has been deprecated since v' + version + ' and will be removed in the near future'
        )
      );
    }

    return validator ? validator(value, opt, opts) : true;
  };
};

/**
 * Assert object's properties type
 *
 * @param {object} options
 * @param {object} schema
 * @param {boolean?} allowUnknown
 *
 * @returns {object}
 */

function assertOptions(options, schema, allowUnknown) {
  if (typeof options !== 'object') {
    throw new AxiosError('options must be an object', AxiosError.ERR_BAD_OPTION_VALUE);
  }
  const keys = Object.keys(options);
  let i = keys.length;
  while (i-- > 0) {
    const opt = keys[i];
    const validator = schema[opt];
    if (validator) {
      const value = options[opt];
      const result = value === undefined || validator(value, opt, options);
      if (result !== true) {
        throw new AxiosError('option ' + opt + ' must be ' + result, AxiosError.ERR_BAD_OPTION_VALUE);
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw new AxiosError('Unknown option ' + opt, AxiosError.ERR_BAD_OPTION);
    }
  }
}

var validator = {
  assertOptions,
  validators: validators$1
};

const validators = validator.validators;

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 *
 * @return {Axios} A new instance of Axios
 */
class Axios {
  constructor(instanceConfig) {
    this.defaults = instanceConfig;
    this.interceptors = {
      request: new InterceptorManager$1(),
      response: new InterceptorManager$1()
    };
  }

  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  request(configOrUrl, config) {
    /*eslint no-param-reassign:0*/
    // Allow for axios('example/url'[, config]) a la fetch API
    if (typeof configOrUrl === 'string') {
      config = config || {};
      config.url = configOrUrl;
    } else {
      config = configOrUrl || {};
    }

    config = mergeConfig(this.defaults, config);

    const {transitional, paramsSerializer, headers} = config;

    if (transitional !== undefined) {
      validator.assertOptions(transitional, {
        silentJSONParsing: validators.transitional(validators.boolean),
        forcedJSONParsing: validators.transitional(validators.boolean),
        clarifyTimeoutError: validators.transitional(validators.boolean)
      }, false);
    }

    if (paramsSerializer != null) {
      if (utils.isFunction(paramsSerializer)) {
        config.paramsSerializer = {
          serialize: paramsSerializer
        };
      } else {
        validator.assertOptions(paramsSerializer, {
          encode: validators.function,
          serialize: validators.function
        }, true);
      }
    }

    // Set config.method
    config.method = (config.method || this.defaults.method || 'get').toLowerCase();

    let contextHeaders;

    // Flatten headers
    contextHeaders = headers && utils.merge(
      headers.common,
      headers[config.method]
    );

    contextHeaders && utils.forEach(
      ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
      (method) => {
        delete headers[method];
      }
    );

    config.headers = AxiosHeaders$1.concat(contextHeaders, headers);

    // filter out skipped interceptors
    const requestInterceptorChain = [];
    let synchronousRequestInterceptors = true;
    this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
      if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {
        return;
      }

      synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;

      requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
    });

    const responseInterceptorChain = [];
    this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
      responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
    });

    let promise;
    let i = 0;
    let len;

    if (!synchronousRequestInterceptors) {
      const chain = [dispatchRequest.bind(this), undefined];
      chain.unshift.apply(chain, requestInterceptorChain);
      chain.push.apply(chain, responseInterceptorChain);
      len = chain.length;

      promise = Promise.resolve(config);

      while (i < len) {
        promise = promise.then(chain[i++], chain[i++]);
      }

      return promise;
    }

    len = requestInterceptorChain.length;

    let newConfig = config;

    i = 0;

    while (i < len) {
      const onFulfilled = requestInterceptorChain[i++];
      const onRejected = requestInterceptorChain[i++];
      try {
        newConfig = onFulfilled(newConfig);
      } catch (error) {
        onRejected.call(this, error);
        break;
      }
    }

    try {
      promise = dispatchRequest.call(this, newConfig);
    } catch (error) {
      return Promise.reject(error);
    }

    i = 0;
    len = responseInterceptorChain.length;

    while (i < len) {
      promise = promise.then(responseInterceptorChain[i++], responseInterceptorChain[i++]);
    }

    return promise;
  }

  getUri(config) {
    config = mergeConfig(this.defaults, config);
    const fullPath = buildFullPath(config.baseURL, config.url);
    return buildURL(fullPath, config.params, config.paramsSerializer);
  }
}

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(mergeConfig(config || {}, {
      method,
      url,
      data: (config || {}).data
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/

  function generateHTTPMethod(isForm) {
    return function httpMethod(url, data, config) {
      return this.request(mergeConfig(config || {}, {
        method,
        headers: isForm ? {
          'Content-Type': 'multipart/form-data'
        } : {},
        url,
        data
      }));
    };
  }

  Axios.prototype[method] = generateHTTPMethod();

  Axios.prototype[method + 'Form'] = generateHTTPMethod(true);
});

var Axios$1 = Axios;

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @param {Function} executor The executor function.
 *
 * @returns {CancelToken}
 */
class CancelToken {
  constructor(executor) {
    if (typeof executor !== 'function') {
      throw new TypeError('executor must be a function.');
    }

    let resolvePromise;

    this.promise = new Promise(function promiseExecutor(resolve) {
      resolvePromise = resolve;
    });

    const token = this;

    // eslint-disable-next-line func-names
    this.promise.then(cancel => {
      if (!token._listeners) return;

      let i = token._listeners.length;

      while (i-- > 0) {
        token._listeners[i](cancel);
      }
      token._listeners = null;
    });

    // eslint-disable-next-line func-names
    this.promise.then = onfulfilled => {
      let _resolve;
      // eslint-disable-next-line func-names
      const promise = new Promise(resolve => {
        token.subscribe(resolve);
        _resolve = resolve;
      }).then(onfulfilled);

      promise.cancel = function reject() {
        token.unsubscribe(_resolve);
      };

      return promise;
    };

    executor(function cancel(message, config, request) {
      if (token.reason) {
        // Cancellation has already been requested
        return;
      }

      token.reason = new CanceledError(message, config, request);
      resolvePromise(token.reason);
    });
  }

  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason) {
      throw this.reason;
    }
  }

  /**
   * Subscribe to the cancel signal
   */

  subscribe(listener) {
    if (this.reason) {
      listener(this.reason);
      return;
    }

    if (this._listeners) {
      this._listeners.push(listener);
    } else {
      this._listeners = [listener];
    }
  }

  /**
   * Unsubscribe from the cancel signal
   */

  unsubscribe(listener) {
    if (!this._listeners) {
      return;
    }
    const index = this._listeners.indexOf(listener);
    if (index !== -1) {
      this._listeners.splice(index, 1);
    }
  }

  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let cancel;
    const token = new CancelToken(function executor(c) {
      cancel = c;
    });
    return {
      token,
      cancel
    };
  }
}

var CancelToken$1 = CancelToken;

/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 *
 * @returns {Function}
 */
function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
}

/**
 * Determines whether the payload is an error thrown by Axios
 *
 * @param {*} payload The value to test
 *
 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
 */
function isAxiosError(payload) {
  return utils.isObject(payload) && (payload.isAxiosError === true);
}

const HttpStatusCode = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511,
};

Object.entries(HttpStatusCode).forEach(([key, value]) => {
  HttpStatusCode[value] = key;
});

var HttpStatusCode$1 = HttpStatusCode;

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 *
 * @returns {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  const context = new Axios$1(defaultConfig);
  const instance = bind(Axios$1.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios$1.prototype, context, {allOwnKeys: true});

  // Copy context to instance
  utils.extend(instance, context, null, {allOwnKeys: true});

  // Factory for creating new instances
  instance.create = function create(instanceConfig) {
    return createInstance(mergeConfig(defaultConfig, instanceConfig));
  };

  return instance;
}

// Create the default instance to be exported
const axios = createInstance(defaults$1);

// Expose Axios class to allow class inheritance
axios.Axios = Axios$1;

// Expose Cancel & CancelToken
axios.CanceledError = CanceledError;
axios.CancelToken = CancelToken$1;
axios.isCancel = isCancel;
axios.VERSION = VERSION;
axios.toFormData = toFormData;

// Expose AxiosError class
axios.AxiosError = AxiosError;

// alias for CanceledError for backward compatibility
axios.Cancel = axios.CanceledError;

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};

axios.spread = spread;

// Expose isAxiosError
axios.isAxiosError = isAxiosError;

// Expose mergeConfig
axios.mergeConfig = mergeConfig;

axios.AxiosHeaders = AxiosHeaders$1;

axios.formToJSON = thing => formDataToJSON(utils.isHTMLForm(thing) ? new FormData(thing) : thing);

axios.HttpStatusCode = HttpStatusCode$1;

axios.default = axios;

module.exports = axios;
//# sourceMappingURL=axios.cjs.map


/***/ }),

/***/ "./assets/admin/common/index.js":
/*!**************************************!*\
  !*** ./assets/admin/common/index.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_web_timers_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/web.timers.js */ "./node_modules/core-js/modules/web.timers.js");
/* harmony import */ var core_js_modules_web_timers_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_timers_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.scss */ "./assets/admin/common/index.scss");
/* harmony import */ var _pagination_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_pagination.scss */ "./assets/admin/common/_pagination.scss");
/* harmony import */ var _table_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./table.scss */ "./assets/admin/common/table.scss");
/* harmony import */ var _components_Toast__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../components/Toast */ "./assets/admin/components/Toast/index.js");
/* harmony import */ var _components_SingleLoadToast__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../components/SingleLoadToast */ "./assets/admin/components/SingleLoadToast/index.js");
/* harmony import */ var _modules_Navigation__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./../modules/Navigation */ "./assets/admin/modules/Navigation/index.js");
/* harmony import */ var _components_StatusSwitcher_indexList__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./../components/StatusSwitcher/indexList */ "./assets/admin/components/StatusSwitcher/indexList.js");









var hideLoader = function hideLoader() {
  setTimeout(function () {
    document.querySelector('body').classList.add('-loaded');
  }, 500);
};

var manegeNavigation = function manegeNavigation() {
  var navigationInit = document.querySelector('.navigationTrigger');
  navigationInit.addEventListener('click', function () {
    document.querySelector('body').classList.add('-navigation-opened');
  });
};

document.addEventListener('DOMContentLoaded', function (event) {
  hideLoader();
  manegeNavigation();
});

/***/ }),

/***/ "./assets/admin/components/SingleLoadToast/index.js":
/*!**********************************************************!*\
  !*** ./assets/admin/components/SingleLoadToast/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
/* harmony import */ var _Toast_message__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../Toast/message */ "./assets/admin/components/Toast/message.js");


var success = document.querySelector('.toast-success');
console.log("success", success);

if (success) {
  _Toast_message__WEBPACK_IMPORTED_MODULE_1__.default.success();
}

var error = document.querySelector('.toast-error');

if (success) {
  _Toast_message__WEBPACK_IMPORTED_MODULE_1__.default.error();
}

/***/ }),

/***/ "./assets/admin/components/StatusSwitcher/StatusSwitcherList.js":
/*!**********************************************************************!*\
  !*** ./assets/admin/components/StatusSwitcher/StatusSwitcherList.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_array_is_array_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.is-array.js */ "./node_modules/core-js/modules/es.array.is-array.js");
/* harmony import */ var core_js_modules_es_array_is_array_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_is_array_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.symbol.js */ "./node_modules/core-js/modules/es.symbol.js");
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.symbol.description.js */ "./node_modules/core-js/modules/es.symbol.description.js");
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.symbol.iterator.js */ "./node_modules/core-js/modules/es.symbol.iterator.js");
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.array.iterator.js */ "./node_modules/core-js/modules/es.array.iterator.js");
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.string.iterator.js */ "./node_modules/core-js/modules/es.string.iterator.js");
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.array.slice.js */ "./node_modules/core-js/modules/es.array.slice.js");
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/es.function.name.js */ "./node_modules/core-js/modules/es.function.name.js");
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_es_array_from_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core-js/modules/es.array.from.js */ "./node_modules/core-js/modules/es.array.from.js");
/* harmony import */ var core_js_modules_es_array_from_js__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_from_js__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _statusSwitcher_scss__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./statusSwitcher.scss */ "./assets/admin/components/StatusSwitcher/statusSwitcher.scss");
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
/* harmony import */ var preact_hooks__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! preact/hooks */ "./node_modules/preact/hooks/dist/hooks.module.js");
/* harmony import */ var _components_Toast_message__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./../../components/Toast/message */ "./assets/admin/components/Toast/message.js");
/* harmony import */ var _lib_api_useApi__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./../../lib/api/useApi */ "./assets/admin/lib/api/useApi.js");
/* harmony import */ var _images_admin_check_svg__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./../../images/admin_check.svg */ "./assets/admin/images/admin_check.svg");
/* harmony import */ var _images_admin_uncheck_svg__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./../../images/admin_uncheck.svg */ "./assets/admin/images/admin_uncheck.svg");












function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }



 // import CheckIcon from '@mui/icons-material/Check';
// import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';






var StatusSwitcherList = function StatusSwitcherList(_ref) {
  var type = _ref.type,
      id = _ref.id,
      label = _ref.label,
      listValueDefault = _ref.listValue;

  var _useState = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_13__.useState)(listValueDefault),
      _useState2 = _slicedToArray(_useState, 2),
      value = _useState2[0],
      setValue = _useState2[1];

  var _useApi = (0,_lib_api_useApi__WEBPACK_IMPORTED_MODULE_15__.default)(),
      _useApi2 = _slicedToArray(_useApi, 1),
      fetch = _useApi2[0];

  var onClick = function onClick() {
    console.log('type', type);

    if (type === "doctor-active") {
      fetch("/admin/api-doctor-toggle-active/".concat(id), {}, 'post').then(function (response) {
        _components_Toast_message__WEBPACK_IMPORTED_MODULE_14__.default.success();
        console.log('response', response);
      })["catch"](function (error) {// setType('fail');
      });
    }

    if (type === "doctor-highlighted") {
      fetch("/admin/api-doctor-toggle-highligthed/".concat(id), {}, 'post').then(function (response) {
        _components_Toast_message__WEBPACK_IMPORTED_MODULE_14__.default.success();
        console.log('response', response);
      })["catch"](function (error) {// setType('fail');
      });
    }

    if (type === "category-active") {
      fetch("/admin/api-category-toggle-active/".concat(id), {}, 'post').then(function (response) {
        _components_Toast_message__WEBPACK_IMPORTED_MODULE_14__.default.success();
        console.log('response', response);
      })["catch"](function (error) {// setType('fail');
      });
    }

    if (type === "langue-active") {
      fetch("/admin/api-langue-toggle-active/".concat(id), {}, 'post').then(function (response) {
        _components_Toast_message__WEBPACK_IMPORTED_MODULE_14__.default.success();
        console.log('response', response);
      })["catch"](function (error) {// setType('fail');
      });
    }

    if (type === "promo-active") {
      fetch("/admin/api-promo-code-toggle-active/".concat(id), {}, 'post').then(function (response) {
        _components_Toast_message__WEBPACK_IMPORTED_MODULE_14__.default.success();
        console.log('response', response);
      })["catch"](function (error) {// setType('fail');
      });
    } // if (type === "user-donated") {
    //     const [fetch] = useApi();
    //     fetch(`/admin/api-user-toggle-donated/${id}`, {}, 'post')
    //         .then((response) => {
    //             message.success();
    //             console.log('response', response);
    //         })
    //         .catch((error) => {
    //             // setType('fail');
    //         });
    // }
    // if (type === "recording-active") {
    //     const [fetch] = useApi();
    //     fetch(`/admin/api-recording-toggle-active/${id}`, {}, 'post')
    //         .then((response) => {
    //             message.success();
    //             console.log('response', response);
    //         })
    //         .catch((error) => {
    //             // setType('fail');
    //         });
    // }
    // if (type === "recording-active-advice") {
    //     const [fetch] = useApi();
    //     fetch(`/admin/api-recording-advice-toggle-active/${id}`, {}, 'post')
    //         .then((response) => {
    //             message.success();
    //             console.log('response', response);
    //         })
    //         .catch((error) => {
    //             // setType('fail');
    //         });
    // }
    // if (type === "education-active") {
    //     const [fetch] = useApi();
    //     fetch(`/admin/api-education-toggle-active/${id}`, {}, 'post')
    //         .then((response) => {
    //             message.success();
    //             console.log('response', response);
    //         })
    //         .catch((error) => {
    //             // setType('fail');
    //         });
    // }
    // if (type === "blog-active") {
    //     const [fetch] = useApi();
    //     fetch(`/admin/api-blog-toggle-active/${id}`, {}, 'post')
    //         .then((response) => {
    //             message.success();
    //             console.log('response', response);
    //         })
    //         .catch((error) => {
    //             // setType('fail');
    //         });
    // }


    setValue(!value);
  };

  return (0,preact__WEBPACK_IMPORTED_MODULE_12__.h)("div", {
    "class": "status--switcher"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_12__.h)("div", {
    "class": "status--content"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_12__.h)("div", {
    onClick: onClick,
    "class": "item -accept ".concat(value ? "-active" : "")
  }, (0,preact__WEBPACK_IMPORTED_MODULE_12__.h)("img", {
    style: {
      width: 24
    },
    src: _images_admin_check_svg__WEBPACK_IMPORTED_MODULE_16__
  })), (0,preact__WEBPACK_IMPORTED_MODULE_12__.h)("div", {
    onClick: onClick,
    "class": "item -reject ".concat(!value ? "-active" : "")
  }, (0,preact__WEBPACK_IMPORTED_MODULE_12__.h)("img", {
    style: {
      width: 24
    },
    src: _images_admin_uncheck_svg__WEBPACK_IMPORTED_MODULE_17__
  }))));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (StatusSwitcherList);

/***/ }),

/***/ "./assets/admin/components/StatusSwitcher/indexList.js":
/*!*************************************************************!*\
  !*** ./assets/admin/components/StatusSwitcher/indexList.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.for-each.js */ "./node_modules/core-js/modules/es.array.for-each.js");
/* harmony import */ var core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
/* harmony import */ var _StatusSwitcherList__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./StatusSwitcherList */ "./assets/admin/components/StatusSwitcher/StatusSwitcherList.js");




{
  /* <StatusSwitcherList type="tip" id={tips[tipKey].id} listValue={tips[tipKey].isVisible} />{tips[tipKey].isVisible} */
}
var elements = document.querySelectorAll('.statusSwitcherComponent');
elements.forEach(function (element) {
  var type = element.dataset.type;
  var id = element.dataset.id;
  var value = element.dataset.value;
  var label = element.dataset.label;
  (0,preact__WEBPACK_IMPORTED_MODULE_2__.render)((0,preact__WEBPACK_IMPORTED_MODULE_2__.h)(_StatusSwitcherList__WEBPACK_IMPORTED_MODULE_3__.default, {
    label: label,
    type: type,
    id: id,
    listValue: value
  }), element);
});

/***/ }),

/***/ "./assets/admin/components/Toast/Toast.js":
/*!************************************************!*\
  !*** ./assets/admin/components/Toast/Toast.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/dist/react-toastify.esm.mjs");
/* harmony import */ var react_toastify_dist_ReactToastify_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-toastify/dist/ReactToastify.css */ "./node_modules/react-toastify/dist/ReactToastify.css");




var Toast = function Toast() {
  return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)(react_toastify__WEBPACK_IMPORTED_MODULE_1__.ToastContainer, null);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Toast);

/***/ }),

/***/ "./assets/admin/components/Toast/index.js":
/*!************************************************!*\
  !*** ./assets/admin/components/Toast/index.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
/* harmony import */ var _Toast__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Toast */ "./assets/admin/components/Toast/Toast.js");


(0,preact__WEBPACK_IMPORTED_MODULE_0__.render)((0,preact__WEBPACK_IMPORTED_MODULE_0__.h)(_Toast__WEBPACK_IMPORTED_MODULE_1__.default, null), document.querySelector('.toastComponent'));

/***/ }),

/***/ "./assets/admin/components/Toast/message.js":
/*!**************************************************!*\
  !*** ./assets/admin/components/Toast/message.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/dist/react-toastify.esm.mjs");

var message = {
  success: function success() {
    var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    react_toastify__WEBPACK_IMPORTED_MODULE_0__.toast.success(text ? text : "Zapisano pomyślnie!", {
      hideProgressBar: true,
      autoClose: 3000,
      position: react_toastify__WEBPACK_IMPORTED_MODULE_0__.toast.POSITION.BOTTOM_LEFT
    });
  },
  error: function error() {
    var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    react_toastify__WEBPACK_IMPORTED_MODULE_0__.toast.error(text ? text : "Coś poszło nie tak!", {
      autoClose: 3000,
      hideProgressBar: true,
      position: react_toastify__WEBPACK_IMPORTED_MODULE_0__.toast.POSITION.BOTTOM_LEFT
    });
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (message);

/***/ }),

/***/ "./assets/admin/lib/api/prepareData.js":
/*!*********************************************!*\
  !*** ./assets/admin/lib/api/prepareData.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.map.js */ "./node_modules/core-js/modules/es.array.map.js");
/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.object.keys.js */ "./node_modules/core-js/modules/es.object.keys.js");
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_1__);



var prepareData = function prepareData(data) {
  var formData = new FormData();
  Object.keys(data).map(function (key) {
    formData.append(key, data[key]);
  });
  return formData;
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (prepareData);

/***/ }),

/***/ "./assets/admin/lib/api/useApi.js":
/*!****************************************!*\
  !*** ./assets/admin/lib/api/useApi.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "useApiStatic": () => (/* binding */ useApiStatic)
/* harmony export */ });
/* harmony import */ var regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! regenerator-runtime/runtime.js */ "./node_modules/regenerator-runtime/runtime.js");
/* harmony import */ var regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.concat.js */ "./node_modules/core-js/modules/es.array.concat.js");
/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.promise.js */ "./node_modules/core-js/modules/es.promise.js");
/* harmony import */ var core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _prepareData__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./prepareData */ "./assets/admin/lib/api/prepareData.js");





function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }



var useApi = function useApi() {
  var fetch = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(endpoint, payload, method) {
      var response;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(typeof window.axios === 'undefined')) {
                _context.next = 4;
                break;
              }

              _context.next = 3;
              return __webpack_require__(/*! axios */ "./node_modules/axios/dist/browser/axios.cjs").default;

            case 3:
              window.axios = _context.sent;

            case 4:
              _context.next = 6;
              return window.axios({
                url: endpoint,
                method: method,
                data: (0,_prepareData__WEBPACK_IMPORTED_MODULE_4__.default)(payload)
              });

            case 6:
              response = _context.sent;

              if (!(!response.data || !response.data.status || response.data.status !== 'OK')) {
                _context.next = 9;
                break;
              }

              throw new Error("(".concat(response.data.code, ") ").concat(response.data.message));

            case 9:
              return _context.abrupt("return", response.data);

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function fetch(_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }();

  return [fetch];
};

var useApiStatic = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(endpoint, payload, method) {
    var response;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!(typeof window.axios === 'undefined')) {
              _context2.next = 4;
              break;
            }

            _context2.next = 3;
            return __webpack_require__(/*! axios */ "./node_modules/axios/dist/browser/axios.cjs").default;

          case 3:
            window.axios = _context2.sent;

          case 4:
            _context2.next = 6;
            return window.axios({
              url: endpoint,
              method: method,
              data: (0,_prepareData__WEBPACK_IMPORTED_MODULE_4__.default)(payload)
            });

          case 6:
            response = _context2.sent;
            return _context2.abrupt("return", response.data);

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function useApiStatic(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useApi);


/***/ }),

/***/ "./assets/admin/modules/Navigation/Navigation.js":
/*!*******************************************************!*\
  !*** ./assets/admin/modules/Navigation/Navigation.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.regexp.exec.js */ "./node_modules/core-js/modules/es.regexp.exec.js");
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_string_split_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.string.split.js */ "./node_modules/core-js/modules/es.string.split.js");
/* harmony import */ var core_js_modules_es_string_split_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_split_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_array_is_array_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.is-array.js */ "./node_modules/core-js/modules/es.array.is-array.js");
/* harmony import */ var core_js_modules_es_array_is_array_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_is_array_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.symbol.js */ "./node_modules/core-js/modules/es.symbol.js");
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.symbol.description.js */ "./node_modules/core-js/modules/es.symbol.description.js");
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.symbol.iterator.js */ "./node_modules/core-js/modules/es.symbol.iterator.js");
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.array.iterator.js */ "./node_modules/core-js/modules/es.array.iterator.js");
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.string.iterator.js */ "./node_modules/core-js/modules/es.string.iterator.js");
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core-js/modules/es.array.slice.js */ "./node_modules/core-js/modules/es.array.slice.js");
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! core-js/modules/es.function.name.js */ "./node_modules/core-js/modules/es.function.name.js");
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var core_js_modules_es_array_from_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! core-js/modules/es.array.from.js */ "./node_modules/core-js/modules/es.array.from.js");
/* harmony import */ var core_js_modules_es_array_from_js__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_from_js__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
/* harmony import */ var preact_hooks__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! preact/hooks */ "./node_modules/preact/hooks/dist/hooks.module.js");
/* harmony import */ var _images_admin_close_svg__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./../../images/admin_close.svg */ "./assets/admin/images/admin_close.svg");














function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }


 // import logo from "./../../images/logo.svg";



var Navigation = function Navigation() {
  var _useState = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_14__.useState)(""),
      _useState2 = _slicedToArray(_useState, 2),
      page = _useState2[0],
      setPage = _useState2[1];

  var _useState3 = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_14__.useState)(""),
      _useState4 = _slicedToArray(_useState3, 2),
      subpage = _useState4[0],
      setSubpage = _useState4[1];

  var _useState5 = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_14__.useState)({
    page: "",
    subpage: ""
  }),
      _useState6 = _slicedToArray(_useState5, 2),
      params = _useState6[0],
      setParams = _useState6[1];

  var bodyClasslist = document.body.classList;
  (0,preact_hooks__WEBPACK_IMPORTED_MODULE_14__.useEffect)(function () {
    var bodyClasslistValue = bodyClasslist.value;

    if (bodyClasslistValue) {
      var _params = bodyClasslistValue.split('-');

      setPage(_params[0]);
      setSubpage(_params[1]);
    }
  }, []);

  var onClickClose = function onClickClose() {
    bodyClasslist.remove('-navigation-opened');
  };

  console.log("page", page);
  return (0,preact__WEBPACK_IMPORTED_MODULE_13__.h)("div", {
    "class": "navigation--component"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_13__.h)("a", {
    href: "/",
    "class": "navigation--header"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_13__.h)("div", {
    onClick: function onClick() {
      return onClickClose();
    },
    "class": "close"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_13__.h)("img", {
    "class": "icon",
    src: _images_admin_close_svg__WEBPACK_IMPORTED_MODULE_15__
  }))), (0,preact__WEBPACK_IMPORTED_MODULE_13__.h)("div", {
    "class": "navigation--list"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_13__.h)("a", {
    href: "/admin/wizyty",
    "class": "item -single ".concat(page == 'recording' ? '-active' : '')
  }, "Wizyty"), (0,preact__WEBPACK_IMPORTED_MODULE_13__.h)("a", {
    href: "/admin/jezyki",
    "class": "item -single ".concat(page == 'langue' ? '-active' : '')
  }, "J\u0119zyki"), (0,preact__WEBPACK_IMPORTED_MODULE_13__.h)("a", {
    href: "/admin/specjalisci",
    "class": "item -single ".concat(page == 'doctor' ? '-active' : '')
  }, "Specjali\u015Bci"), (0,preact__WEBPACK_IMPORTED_MODULE_13__.h)("a", {
    href: "/admin/pacjenci",
    "class": "item -single ".concat(page == 'patient' ? '-active' : '')
  }, "Pacjenci"), (0,preact__WEBPACK_IMPORTED_MODULE_13__.h)("a", {
    href: "/admin/cennik",
    "class": "item -single ".concat(page == 'pricing' ? '-active' : '')
  }, "Cennik"), (0,preact__WEBPACK_IMPORTED_MODULE_13__.h)("a", {
    href: "/admin/kody-promocyjne",
    "class": "item -single ".concat(page == 'promo' ? '-active' : '')
  }, "Kody promocyjne"), (0,preact__WEBPACK_IMPORTED_MODULE_13__.h)("a", {
    href: "/admin/newsletter",
    "class": "item -single ".concat(page == 'newsletter' ? '-active' : '')
  }, "Newsletter"), (0,preact__WEBPACK_IMPORTED_MODULE_13__.h)("a", {
    href: "/admin/faq",
    "class": "item -single ".concat(page == 'faq' ? '-active' : '')
  }, "Faq"), (0,preact__WEBPACK_IMPORTED_MODULE_13__.h)("div", {
    style: {
      height: 20,
      width: "100%"
    }
  }), (0,preact__WEBPACK_IMPORTED_MODULE_13__.h)("a", {
    href: "/admin/strona-glowna",
    "class": "item -single ".concat(page == 'homepage' ? '-active' : '')
  }, "Strona g\u0142\xF3wna"), (0,preact__WEBPACK_IMPORTED_MODULE_13__.h)("a", {
    href: "/admin/pracuj-u-nas",
    "class": "item -single ".concat(page == 'pracuj' ? '-active' : '')
  }, "Pracuj u nas"), (0,preact__WEBPACK_IMPORTED_MODULE_13__.h)("a", {
    href: "/admin/dla-firm",
    "class": "item -single ".concat(page == 'for' ? '-active' : '')
  }, "Dla firm")));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Navigation);

/***/ }),

/***/ "./assets/admin/modules/Navigation/index.js":
/*!**************************************************!*\
  !*** ./assets/admin/modules/Navigation/index.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
/* harmony import */ var _Navigation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Navigation */ "./assets/admin/modules/Navigation/Navigation.js");


console.log("components", document.querySelector('.navigationComponent'));
(0,preact__WEBPACK_IMPORTED_MODULE_0__.render)((0,preact__WEBPACK_IMPORTED_MODULE_0__.h)(_Navigation__WEBPACK_IMPORTED_MODULE_1__.default, null), document.querySelector('.navigationComponent'));

/***/ }),

/***/ "./node_modules/clsx/dist/clsx.m.js":
/*!******************************************!*\
  !*** ./node_modules/clsx/dist/clsx.m.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "clsx": () => (/* binding */ clsx),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function r(e){var t,f,n="";if("string"==typeof e||"number"==typeof e)n+=e;else if("object"==typeof e)if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(f=r(e[t]))&&(n&&(n+=" "),n+=f);else for(t in e)e[t]&&(n&&(n+=" "),n+=t);return n}function clsx(){for(var e,t,f=0,n="";f<arguments.length;)(e=arguments[f++])&&(t=r(e))&&(n&&(n+=" "),n+=t);return n}/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (clsx);

/***/ }),

/***/ "./node_modules/core-js/internals/a-function.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/a-function.js ***!
  \******************************************************/
/***/ ((module) => {

module.exports = function (it) {
  if (typeof it != 'function') {
    throw TypeError(String(it) + ' is not a function');
  } return it;
};


/***/ }),

/***/ "./node_modules/core-js/internals/a-possible-prototype.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/internals/a-possible-prototype.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");

module.exports = function (it) {
  if (!isObject(it) && it !== null) {
    throw TypeError("Can't set " + String(it) + ' as a prototype');
  } return it;
};


/***/ }),

/***/ "./node_modules/core-js/internals/add-to-unscopables.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/internals/add-to-unscopables.js ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");
var create = __webpack_require__(/*! ../internals/object-create */ "./node_modules/core-js/internals/object-create.js");
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js");

var UNSCOPABLES = wellKnownSymbol('unscopables');
var ArrayPrototype = Array.prototype;

// Array.prototype[@@unscopables]
// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
if (ArrayPrototype[UNSCOPABLES] == undefined) {
  definePropertyModule.f(ArrayPrototype, UNSCOPABLES, {
    configurable: true,
    value: create(null)
  });
}

// add a key to Array.prototype[@@unscopables]
module.exports = function (key) {
  ArrayPrototype[UNSCOPABLES][key] = true;
};


/***/ }),

/***/ "./node_modules/core-js/internals/advance-string-index.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/internals/advance-string-index.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var charAt = __webpack_require__(/*! ../internals/string-multibyte */ "./node_modules/core-js/internals/string-multibyte.js").charAt;

// `AdvanceStringIndex` abstract operation
// https://tc39.es/ecma262/#sec-advancestringindex
module.exports = function (S, index, unicode) {
  return index + (unicode ? charAt(S, index).length : 1);
};


/***/ }),

/***/ "./node_modules/core-js/internals/an-instance.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/an-instance.js ***!
  \*******************************************************/
/***/ ((module) => {

module.exports = function (it, Constructor, name) {
  if (!(it instanceof Constructor)) {
    throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
  } return it;
};


/***/ }),

/***/ "./node_modules/core-js/internals/an-object.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/an-object.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");

module.exports = function (it) {
  if (!isObject(it)) {
    throw TypeError(String(it) + ' is not an object');
  } return it;
};


/***/ }),

/***/ "./node_modules/core-js/internals/array-for-each.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/array-for-each.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $forEach = __webpack_require__(/*! ../internals/array-iteration */ "./node_modules/core-js/internals/array-iteration.js").forEach;
var arrayMethodIsStrict = __webpack_require__(/*! ../internals/array-method-is-strict */ "./node_modules/core-js/internals/array-method-is-strict.js");

var STRICT_METHOD = arrayMethodIsStrict('forEach');

// `Array.prototype.forEach` method implementation
// https://tc39.es/ecma262/#sec-array.prototype.foreach
module.exports = !STRICT_METHOD ? function forEach(callbackfn /* , thisArg */) {
  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
// eslint-disable-next-line es/no-array-prototype-foreach -- safe
} : [].forEach;


/***/ }),

/***/ "./node_modules/core-js/internals/array-from.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/array-from.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var bind = __webpack_require__(/*! ../internals/function-bind-context */ "./node_modules/core-js/internals/function-bind-context.js");
var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js/internals/to-object.js");
var callWithSafeIterationClosing = __webpack_require__(/*! ../internals/call-with-safe-iteration-closing */ "./node_modules/core-js/internals/call-with-safe-iteration-closing.js");
var isArrayIteratorMethod = __webpack_require__(/*! ../internals/is-array-iterator-method */ "./node_modules/core-js/internals/is-array-iterator-method.js");
var toLength = __webpack_require__(/*! ../internals/to-length */ "./node_modules/core-js/internals/to-length.js");
var createProperty = __webpack_require__(/*! ../internals/create-property */ "./node_modules/core-js/internals/create-property.js");
var getIteratorMethod = __webpack_require__(/*! ../internals/get-iterator-method */ "./node_modules/core-js/internals/get-iterator-method.js");

// `Array.from` method implementation
// https://tc39.es/ecma262/#sec-array.from
module.exports = function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
  var O = toObject(arrayLike);
  var C = typeof this == 'function' ? this : Array;
  var argumentsLength = arguments.length;
  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
  var mapping = mapfn !== undefined;
  var iteratorMethod = getIteratorMethod(O);
  var index = 0;
  var length, result, step, iterator, next, value;
  if (mapping) mapfn = bind(mapfn, argumentsLength > 2 ? arguments[2] : undefined, 2);
  // if the target is not iterable or it's an array with the default iterator - use a simple case
  if (iteratorMethod != undefined && !(C == Array && isArrayIteratorMethod(iteratorMethod))) {
    iterator = iteratorMethod.call(O);
    next = iterator.next;
    result = new C();
    for (;!(step = next.call(iterator)).done; index++) {
      value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
      createProperty(result, index, value);
    }
  } else {
    length = toLength(O.length);
    result = new C(length);
    for (;length > index; index++) {
      value = mapping ? mapfn(O[index], index) : O[index];
      createProperty(result, index, value);
    }
  }
  result.length = index;
  return result;
};


/***/ }),

/***/ "./node_modules/core-js/internals/array-includes.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/array-includes.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js/internals/to-indexed-object.js");
var toLength = __webpack_require__(/*! ../internals/to-length */ "./node_modules/core-js/internals/to-length.js");
var toAbsoluteIndex = __webpack_require__(/*! ../internals/to-absolute-index */ "./node_modules/core-js/internals/to-absolute-index.js");

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare -- NaN check
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};


/***/ }),

/***/ "./node_modules/core-js/internals/array-iteration.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/internals/array-iteration.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var bind = __webpack_require__(/*! ../internals/function-bind-context */ "./node_modules/core-js/internals/function-bind-context.js");
var IndexedObject = __webpack_require__(/*! ../internals/indexed-object */ "./node_modules/core-js/internals/indexed-object.js");
var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js/internals/to-object.js");
var toLength = __webpack_require__(/*! ../internals/to-length */ "./node_modules/core-js/internals/to-length.js");
var arraySpeciesCreate = __webpack_require__(/*! ../internals/array-species-create */ "./node_modules/core-js/internals/array-species-create.js");

var push = [].push;

// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterOut }` methods implementation
var createMethod = function (TYPE) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var IS_FILTER_OUT = TYPE == 7;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject($this);
    var self = IndexedObject(O);
    var boundFunction = bind(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var create = specificCreate || arraySpeciesCreate;
    var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_OUT ? create($this, 0) : undefined;
    var value, result;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      value = self[index];
      result = boundFunction(value, index, O);
      if (TYPE) {
        if (IS_MAP) target[index] = result; // map
        else if (result) switch (TYPE) {
          case 3: return true;              // some
          case 5: return value;             // find
          case 6: return index;             // findIndex
          case 2: push.call(target, value); // filter
        } else switch (TYPE) {
          case 4: return false;             // every
          case 7: push.call(target, value); // filterOut
        }
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};

module.exports = {
  // `Array.prototype.forEach` method
  // https://tc39.es/ecma262/#sec-array.prototype.foreach
  forEach: createMethod(0),
  // `Array.prototype.map` method
  // https://tc39.es/ecma262/#sec-array.prototype.map
  map: createMethod(1),
  // `Array.prototype.filter` method
  // https://tc39.es/ecma262/#sec-array.prototype.filter
  filter: createMethod(2),
  // `Array.prototype.some` method
  // https://tc39.es/ecma262/#sec-array.prototype.some
  some: createMethod(3),
  // `Array.prototype.every` method
  // https://tc39.es/ecma262/#sec-array.prototype.every
  every: createMethod(4),
  // `Array.prototype.find` method
  // https://tc39.es/ecma262/#sec-array.prototype.find
  find: createMethod(5),
  // `Array.prototype.findIndex` method
  // https://tc39.es/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod(6),
  // `Array.prototype.filterOut` method
  // https://github.com/tc39/proposal-array-filtering
  filterOut: createMethod(7)
};


/***/ }),

/***/ "./node_modules/core-js/internals/array-method-has-species-support.js":
/*!****************************************************************************!*\
  !*** ./node_modules/core-js/internals/array-method-has-species-support.js ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");
var V8_VERSION = __webpack_require__(/*! ../internals/engine-v8-version */ "./node_modules/core-js/internals/engine-v8-version.js");

var SPECIES = wellKnownSymbol('species');

module.exports = function (METHOD_NAME) {
  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/677
  return V8_VERSION >= 51 || !fails(function () {
    var array = [];
    var constructor = array.constructor = {};
    constructor[SPECIES] = function () {
      return { foo: 1 };
    };
    return array[METHOD_NAME](Boolean).foo !== 1;
  });
};


/***/ }),

/***/ "./node_modules/core-js/internals/array-method-is-strict.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/internals/array-method-is-strict.js ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

module.exports = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call,no-throw-literal -- required for testing
    method.call(null, argument || function () { throw 1; }, 1);
  });
};


/***/ }),

/***/ "./node_modules/core-js/internals/array-species-create.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/internals/array-species-create.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");
var isArray = __webpack_require__(/*! ../internals/is-array */ "./node_modules/core-js/internals/is-array.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

var SPECIES = wellKnownSymbol('species');

// `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate
module.exports = function (originalArray, length) {
  var C;
  if (isArray(originalArray)) {
    C = originalArray.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    else if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
};


/***/ }),

/***/ "./node_modules/core-js/internals/call-with-safe-iteration-closing.js":
/*!****************************************************************************!*\
  !*** ./node_modules/core-js/internals/call-with-safe-iteration-closing.js ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
var iteratorClose = __webpack_require__(/*! ../internals/iterator-close */ "./node_modules/core-js/internals/iterator-close.js");

// call something on iterator step with safe closing on error
module.exports = function (iterator, fn, value, ENTRIES) {
  try {
    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
  } catch (error) {
    iteratorClose(iterator);
    throw error;
  }
};


/***/ }),

/***/ "./node_modules/core-js/internals/check-correctness-of-iteration.js":
/*!**************************************************************************!*\
  !*** ./node_modules/core-js/internals/check-correctness-of-iteration.js ***!
  \**************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

var ITERATOR = wellKnownSymbol('iterator');
var SAFE_CLOSING = false;

try {
  var called = 0;
  var iteratorWithReturn = {
    next: function () {
      return { done: !!called++ };
    },
    'return': function () {
      SAFE_CLOSING = true;
    }
  };
  iteratorWithReturn[ITERATOR] = function () {
    return this;
  };
  // eslint-disable-next-line es/no-array-from, no-throw-literal -- required for testing
  Array.from(iteratorWithReturn, function () { throw 2; });
} catch (error) { /* empty */ }

module.exports = function (exec, SKIP_CLOSING) {
  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
  var ITERATION_SUPPORT = false;
  try {
    var object = {};
    object[ITERATOR] = function () {
      return {
        next: function () {
          return { done: ITERATION_SUPPORT = true };
        }
      };
    };
    exec(object);
  } catch (error) { /* empty */ }
  return ITERATION_SUPPORT;
};


/***/ }),

/***/ "./node_modules/core-js/internals/classof-raw.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/classof-raw.js ***!
  \*******************************************************/
/***/ ((module) => {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "./node_modules/core-js/internals/classof.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/internals/classof.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var TO_STRING_TAG_SUPPORT = __webpack_require__(/*! ../internals/to-string-tag-support */ "./node_modules/core-js/internals/to-string-tag-support.js");
var classofRaw = __webpack_require__(/*! ../internals/classof-raw */ "./node_modules/core-js/internals/classof-raw.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
};


/***/ }),

/***/ "./node_modules/core-js/internals/copy-constructor-properties.js":
/*!***********************************************************************!*\
  !*** ./node_modules/core-js/internals/copy-constructor-properties.js ***!
  \***********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
var ownKeys = __webpack_require__(/*! ../internals/own-keys */ "./node_modules/core-js/internals/own-keys.js");
var getOwnPropertyDescriptorModule = __webpack_require__(/*! ../internals/object-get-own-property-descriptor */ "./node_modules/core-js/internals/object-get-own-property-descriptor.js");
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js");

module.exports = function (target, source) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
  }
};


/***/ }),

/***/ "./node_modules/core-js/internals/correct-prototype-getter.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/internals/correct-prototype-getter.js ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

module.exports = !fails(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
  return Object.getPrototypeOf(new F()) !== F.prototype;
});


/***/ }),

/***/ "./node_modules/core-js/internals/create-iterator-constructor.js":
/*!***********************************************************************!*\
  !*** ./node_modules/core-js/internals/create-iterator-constructor.js ***!
  \***********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var IteratorPrototype = __webpack_require__(/*! ../internals/iterators-core */ "./node_modules/core-js/internals/iterators-core.js").IteratorPrototype;
var create = __webpack_require__(/*! ../internals/object-create */ "./node_modules/core-js/internals/object-create.js");
var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "./node_modules/core-js/internals/create-property-descriptor.js");
var setToStringTag = __webpack_require__(/*! ../internals/set-to-string-tag */ "./node_modules/core-js/internals/set-to-string-tag.js");
var Iterators = __webpack_require__(/*! ../internals/iterators */ "./node_modules/core-js/internals/iterators.js");

var returnThis = function () { return this; };

module.exports = function (IteratorConstructor, NAME, next) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = create(IteratorPrototype, { next: createPropertyDescriptor(1, next) });
  setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
  Iterators[TO_STRING_TAG] = returnThis;
  return IteratorConstructor;
};


/***/ }),

/***/ "./node_modules/core-js/internals/create-non-enumerable-property.js":
/*!**************************************************************************!*\
  !*** ./node_modules/core-js/internals/create-non-enumerable-property.js ***!
  \**************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js");
var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "./node_modules/core-js/internals/create-property-descriptor.js");

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "./node_modules/core-js/internals/create-property-descriptor.js":
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/internals/create-property-descriptor.js ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "./node_modules/core-js/internals/create-property.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/internals/create-property.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var toPrimitive = __webpack_require__(/*! ../internals/to-primitive */ "./node_modules/core-js/internals/to-primitive.js");
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js");
var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "./node_modules/core-js/internals/create-property-descriptor.js");

module.exports = function (object, key, value) {
  var propertyKey = toPrimitive(key);
  if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));
  else object[propertyKey] = value;
};


/***/ }),

/***/ "./node_modules/core-js/internals/define-iterator.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/internals/define-iterator.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var createIteratorConstructor = __webpack_require__(/*! ../internals/create-iterator-constructor */ "./node_modules/core-js/internals/create-iterator-constructor.js");
var getPrototypeOf = __webpack_require__(/*! ../internals/object-get-prototype-of */ "./node_modules/core-js/internals/object-get-prototype-of.js");
var setPrototypeOf = __webpack_require__(/*! ../internals/object-set-prototype-of */ "./node_modules/core-js/internals/object-set-prototype-of.js");
var setToStringTag = __webpack_require__(/*! ../internals/set-to-string-tag */ "./node_modules/core-js/internals/set-to-string-tag.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js/internals/create-non-enumerable-property.js");
var redefine = __webpack_require__(/*! ../internals/redefine */ "./node_modules/core-js/internals/redefine.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");
var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "./node_modules/core-js/internals/is-pure.js");
var Iterators = __webpack_require__(/*! ../internals/iterators */ "./node_modules/core-js/internals/iterators.js");
var IteratorsCore = __webpack_require__(/*! ../internals/iterators-core */ "./node_modules/core-js/internals/iterators-core.js");

var IteratorPrototype = IteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR = wellKnownSymbol('iterator');
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';

var returnThis = function () { return this; };

module.exports = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
  createIteratorConstructor(IteratorConstructor, NAME, next);

  var getIterationMethod = function (KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];
    switch (KIND) {
      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
    } return function () { return new IteratorConstructor(this); };
  };

  var TO_STRING_TAG = NAME + ' Iterator';
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator = IterablePrototype[ITERATOR]
    || IterablePrototype['@@iterator']
    || DEFAULT && IterablePrototype[DEFAULT];
  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY;

  // fix native
  if (anyNativeIterator) {
    CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
    if (IteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
      if (!IS_PURE && getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
        if (setPrototypeOf) {
          setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
        } else if (typeof CurrentIteratorPrototype[ITERATOR] != 'function') {
          createNonEnumerableProperty(CurrentIteratorPrototype, ITERATOR, returnThis);
        }
      }
      // Set @@toStringTag to native iterators
      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
      if (IS_PURE) Iterators[TO_STRING_TAG] = returnThis;
    }
  }

  // fix Array.prototype.{ values, @@iterator }.name in V8 / FF
  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    INCORRECT_VALUES_NAME = true;
    defaultIterator = function values() { return nativeIterator.call(this); };
  }

  // define iterator
  if ((!IS_PURE || FORCED) && IterablePrototype[ITERATOR] !== defaultIterator) {
    createNonEnumerableProperty(IterablePrototype, ITERATOR, defaultIterator);
  }
  Iterators[NAME] = defaultIterator;

  // export additional methods
  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES)
    };
    if (FORCED) for (KEY in methods) {
      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
        redefine(IterablePrototype, KEY, methods[KEY]);
      }
    } else $({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
  }

  return methods;
};


/***/ }),

/***/ "./node_modules/core-js/internals/define-well-known-symbol.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/internals/define-well-known-symbol.js ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var path = __webpack_require__(/*! ../internals/path */ "./node_modules/core-js/internals/path.js");
var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
var wrappedWellKnownSymbolModule = __webpack_require__(/*! ../internals/well-known-symbol-wrapped */ "./node_modules/core-js/internals/well-known-symbol-wrapped.js");
var defineProperty = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js").f;

module.exports = function (NAME) {
  var Symbol = path.Symbol || (path.Symbol = {});
  if (!has(Symbol, NAME)) defineProperty(Symbol, NAME, {
    value: wrappedWellKnownSymbolModule.f(NAME)
  });
};


/***/ }),

/***/ "./node_modules/core-js/internals/descriptors.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/descriptors.js ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

// Detect IE8's incomplete defineProperty implementation
module.exports = !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});


/***/ }),

/***/ "./node_modules/core-js/internals/document-create-element.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/internals/document-create-element.js ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");

var document = global.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};


/***/ }),

/***/ "./node_modules/core-js/internals/dom-iterables.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/dom-iterables.js ***!
  \*********************************************************/
/***/ ((module) => {

// iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
module.exports = {
  CSSRuleList: 0,
  CSSStyleDeclaration: 0,
  CSSValueList: 0,
  ClientRectList: 0,
  DOMRectList: 0,
  DOMStringList: 0,
  DOMTokenList: 1,
  DataTransferItemList: 0,
  FileList: 0,
  HTMLAllCollection: 0,
  HTMLCollection: 0,
  HTMLFormElement: 0,
  HTMLSelectElement: 0,
  MediaList: 0,
  MimeTypeArray: 0,
  NamedNodeMap: 0,
  NodeList: 1,
  PaintRequestList: 0,
  Plugin: 0,
  PluginArray: 0,
  SVGLengthList: 0,
  SVGNumberList: 0,
  SVGPathSegList: 0,
  SVGPointList: 0,
  SVGStringList: 0,
  SVGTransformList: 0,
  SourceBufferList: 0,
  StyleSheetList: 0,
  TextTrackCueList: 0,
  TextTrackList: 0,
  TouchList: 0
};


/***/ }),

/***/ "./node_modules/core-js/internals/engine-is-browser.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/engine-is-browser.js ***!
  \*************************************************************/
/***/ ((module) => {

module.exports = typeof window == 'object';


/***/ }),

/***/ "./node_modules/core-js/internals/engine-is-ios.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/engine-is-ios.js ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var userAgent = __webpack_require__(/*! ../internals/engine-user-agent */ "./node_modules/core-js/internals/engine-user-agent.js");

module.exports = /(?:iphone|ipod|ipad).*applewebkit/i.test(userAgent);


/***/ }),

/***/ "./node_modules/core-js/internals/engine-is-node.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/engine-is-node.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var classof = __webpack_require__(/*! ../internals/classof-raw */ "./node_modules/core-js/internals/classof-raw.js");
var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");

module.exports = classof(global.process) == 'process';


/***/ }),

/***/ "./node_modules/core-js/internals/engine-is-webos-webkit.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/internals/engine-is-webos-webkit.js ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var userAgent = __webpack_require__(/*! ../internals/engine-user-agent */ "./node_modules/core-js/internals/engine-user-agent.js");

module.exports = /web0s(?!.*chrome)/i.test(userAgent);


/***/ }),

/***/ "./node_modules/core-js/internals/engine-user-agent.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/engine-user-agent.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "./node_modules/core-js/internals/get-built-in.js");

module.exports = getBuiltIn('navigator', 'userAgent') || '';


/***/ }),

/***/ "./node_modules/core-js/internals/engine-v8-version.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/engine-v8-version.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var userAgent = __webpack_require__(/*! ../internals/engine-user-agent */ "./node_modules/core-js/internals/engine-user-agent.js");

var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  version = match[0] < 4 ? 1 : match[0] + match[1];
} else if (userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = match[1];
  }
}

module.exports = version && +version;


/***/ }),

/***/ "./node_modules/core-js/internals/enum-bug-keys.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/enum-bug-keys.js ***!
  \*********************************************************/
/***/ ((module) => {

// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];


/***/ }),

/***/ "./node_modules/core-js/internals/export.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/internals/export.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var getOwnPropertyDescriptor = __webpack_require__(/*! ../internals/object-get-own-property-descriptor */ "./node_modules/core-js/internals/object-get-own-property-descriptor.js").f;
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js/internals/create-non-enumerable-property.js");
var redefine = __webpack_require__(/*! ../internals/redefine */ "./node_modules/core-js/internals/redefine.js");
var setGlobal = __webpack_require__(/*! ../internals/set-global */ "./node_modules/core-js/internals/set-global.js");
var copyConstructorProperties = __webpack_require__(/*! ../internals/copy-constructor-properties */ "./node_modules/core-js/internals/copy-constructor-properties.js");
var isForced = __webpack_require__(/*! ../internals/is-forced */ "./node_modules/core-js/internals/is-forced.js");

/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty === typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    // extend global
    redefine(target, key, sourceProperty, options);
  }
};


/***/ }),

/***/ "./node_modules/core-js/internals/fails.js":
/*!*************************************************!*\
  !*** ./node_modules/core-js/internals/fails.js ***!
  \*************************************************/
/***/ ((module) => {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};


/***/ }),

/***/ "./node_modules/core-js/internals/fix-regexp-well-known-symbol-logic.js":
/*!******************************************************************************!*\
  !*** ./node_modules/core-js/internals/fix-regexp-well-known-symbol-logic.js ***!
  \******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

// TODO: Remove from `core-js@4` since it's moved to entry points
__webpack_require__(/*! ../modules/es.regexp.exec */ "./node_modules/core-js/modules/es.regexp.exec.js");
var redefine = __webpack_require__(/*! ../internals/redefine */ "./node_modules/core-js/internals/redefine.js");
var regexpExec = __webpack_require__(/*! ../internals/regexp-exec */ "./node_modules/core-js/internals/regexp-exec.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js/internals/create-non-enumerable-property.js");

var SPECIES = wellKnownSymbol('species');
var RegExpPrototype = RegExp.prototype;

module.exports = function (KEY, exec, FORCED, SHAM) {
  var SYMBOL = wellKnownSymbol(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;

    if (KEY === 'split') {
      // We can't use real regex here since it causes deoptimization
      // and serious performance degradation in V8
      // https://github.com/zloirock/core-js/issues/306
      re = {};
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
      re.flags = '';
      re[SYMBOL] = /./[SYMBOL];
    }

    re.exec = function () { execCalled = true; return null; };

    re[SYMBOL]('');
    return !execCalled;
  });

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    FORCED
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
      var $exec = regexp.exec;
      if ($exec === regexpExec || $exec === RegExpPrototype.exec) {
        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
          // The native String method already delegates to @@method (this
          // polyfilled function), leasing to infinite recursion.
          // We avoid it by directly calling the native @@method method.
          return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
        }
        return { done: true, value: nativeMethod.call(str, regexp, arg2) };
      }
      return { done: false };
    });

    redefine(String.prototype, KEY, methods[0]);
    redefine(RegExpPrototype, SYMBOL, methods[1]);
  }

  if (SHAM) createNonEnumerableProperty(RegExpPrototype[SYMBOL], 'sham', true);
};


/***/ }),

/***/ "./node_modules/core-js/internals/function-bind-context.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/internals/function-bind-context.js ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var aFunction = __webpack_require__(/*! ../internals/a-function */ "./node_modules/core-js/internals/a-function.js");

// optional / simple context binding
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 0: return function () {
      return fn.call(that);
    };
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "./node_modules/core-js/internals/get-built-in.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/internals/get-built-in.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var path = __webpack_require__(/*! ../internals/path */ "./node_modules/core-js/internals/path.js");
var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");

var aFunction = function (variable) {
  return typeof variable == 'function' ? variable : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global[namespace])
    : path[namespace] && path[namespace][method] || global[namespace] && global[namespace][method];
};


/***/ }),

/***/ "./node_modules/core-js/internals/get-iterator-method.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/internals/get-iterator-method.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var classof = __webpack_require__(/*! ../internals/classof */ "./node_modules/core-js/internals/classof.js");
var Iterators = __webpack_require__(/*! ../internals/iterators */ "./node_modules/core-js/internals/iterators.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

var ITERATOR = wellKnownSymbol('iterator');

module.exports = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),

/***/ "./node_modules/core-js/internals/global.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/internals/global.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof __webpack_require__.g == 'object' && __webpack_require__.g) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this; })() || Function('return this')();


/***/ }),

/***/ "./node_modules/core-js/internals/has.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/internals/has.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js/internals/to-object.js");

var hasOwnProperty = {}.hasOwnProperty;

module.exports = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty.call(toObject(it), key);
};


/***/ }),

/***/ "./node_modules/core-js/internals/hidden-keys.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/hidden-keys.js ***!
  \*******************************************************/
/***/ ((module) => {

module.exports = {};


/***/ }),

/***/ "./node_modules/core-js/internals/host-report-errors.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/internals/host-report-errors.js ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");

module.exports = function (a, b) {
  var console = global.console;
  if (console && console.error) {
    arguments.length === 1 ? console.error(a) : console.error(a, b);
  }
};


/***/ }),

/***/ "./node_modules/core-js/internals/html.js":
/*!************************************************!*\
  !*** ./node_modules/core-js/internals/html.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "./node_modules/core-js/internals/get-built-in.js");

module.exports = getBuiltIn('document', 'documentElement');


/***/ }),

/***/ "./node_modules/core-js/internals/ie8-dom-define.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/ie8-dom-define.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var createElement = __webpack_require__(/*! ../internals/document-create-element */ "./node_modules/core-js/internals/document-create-element.js");

// Thank's IE8 for his funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- requied for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});


/***/ }),

/***/ "./node_modules/core-js/internals/indexed-object.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/indexed-object.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var classof = __webpack_require__(/*! ../internals/classof-raw */ "./node_modules/core-js/internals/classof-raw.js");

var split = ''.split;

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split.call(it, '') : Object(it);
} : Object;


/***/ }),

/***/ "./node_modules/core-js/internals/inspect-source.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/inspect-source.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var store = __webpack_require__(/*! ../internals/shared-store */ "./node_modules/core-js/internals/shared-store.js");

var functionToString = Function.toString;

// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (typeof store.inspectSource != 'function') {
  store.inspectSource = function (it) {
    return functionToString.call(it);
  };
}

module.exports = store.inspectSource;


/***/ }),

/***/ "./node_modules/core-js/internals/internal-state.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/internal-state.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var NATIVE_WEAK_MAP = __webpack_require__(/*! ../internals/native-weak-map */ "./node_modules/core-js/internals/native-weak-map.js");
var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js/internals/create-non-enumerable-property.js");
var objectHas = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
var shared = __webpack_require__(/*! ../internals/shared-store */ "./node_modules/core-js/internals/shared-store.js");
var sharedKey = __webpack_require__(/*! ../internals/shared-key */ "./node_modules/core-js/internals/shared-key.js");
var hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ "./node_modules/core-js/internals/hidden-keys.js");

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP || shared.state) {
  var store = shared.state || (shared.state = new WeakMap());
  var wmget = store.get;
  var wmhas = store.has;
  var wmset = store.set;
  set = function (it, metadata) {
    if (wmhas.call(store, it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    wmset.call(store, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget.call(store, it) || {};
  };
  has = function (it) {
    return wmhas.call(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    if (objectHas(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return objectHas(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return objectHas(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};


/***/ }),

/***/ "./node_modules/core-js/internals/is-array-iterator-method.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/internals/is-array-iterator-method.js ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");
var Iterators = __webpack_require__(/*! ../internals/iterators */ "./node_modules/core-js/internals/iterators.js");

var ITERATOR = wellKnownSymbol('iterator');
var ArrayPrototype = Array.prototype;

// check on default Array iterator
module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
};


/***/ }),

/***/ "./node_modules/core-js/internals/is-array.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/internals/is-array.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var classof = __webpack_require__(/*! ../internals/classof-raw */ "./node_modules/core-js/internals/classof-raw.js");

// `IsArray` abstract operation
// https://tc39.es/ecma262/#sec-isarray
// eslint-disable-next-line es/no-array-isarray -- safe
module.exports = Array.isArray || function isArray(arg) {
  return classof(arg) == 'Array';
};


/***/ }),

/***/ "./node_modules/core-js/internals/is-forced.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/is-forced.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : typeof detection == 'function' ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;


/***/ }),

/***/ "./node_modules/core-js/internals/is-object.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/is-object.js ***!
  \*****************************************************/
/***/ ((module) => {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "./node_modules/core-js/internals/is-pure.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/internals/is-pure.js ***!
  \***************************************************/
/***/ ((module) => {

module.exports = false;


/***/ }),

/***/ "./node_modules/core-js/internals/is-regexp.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/is-regexp.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");
var classof = __webpack_require__(/*! ../internals/classof-raw */ "./node_modules/core-js/internals/classof-raw.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

var MATCH = wellKnownSymbol('match');

// `IsRegExp` abstract operation
// https://tc39.es/ecma262/#sec-isregexp
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classof(it) == 'RegExp');
};


/***/ }),

/***/ "./node_modules/core-js/internals/iterate.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/internals/iterate.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
var isArrayIteratorMethod = __webpack_require__(/*! ../internals/is-array-iterator-method */ "./node_modules/core-js/internals/is-array-iterator-method.js");
var toLength = __webpack_require__(/*! ../internals/to-length */ "./node_modules/core-js/internals/to-length.js");
var bind = __webpack_require__(/*! ../internals/function-bind-context */ "./node_modules/core-js/internals/function-bind-context.js");
var getIteratorMethod = __webpack_require__(/*! ../internals/get-iterator-method */ "./node_modules/core-js/internals/get-iterator-method.js");
var iteratorClose = __webpack_require__(/*! ../internals/iterator-close */ "./node_modules/core-js/internals/iterator-close.js");

var Result = function (stopped, result) {
  this.stopped = stopped;
  this.result = result;
};

module.exports = function (iterable, unboundFunction, options) {
  var that = options && options.that;
  var AS_ENTRIES = !!(options && options.AS_ENTRIES);
  var IS_ITERATOR = !!(options && options.IS_ITERATOR);
  var INTERRUPTED = !!(options && options.INTERRUPTED);
  var fn = bind(unboundFunction, that, 1 + AS_ENTRIES + INTERRUPTED);
  var iterator, iterFn, index, length, result, next, step;

  var stop = function (condition) {
    if (iterator) iteratorClose(iterator);
    return new Result(true, condition);
  };

  var callFn = function (value) {
    if (AS_ENTRIES) {
      anObject(value);
      return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
    } return INTERRUPTED ? fn(value, stop) : fn(value);
  };

  if (IS_ITERATOR) {
    iterator = iterable;
  } else {
    iterFn = getIteratorMethod(iterable);
    if (typeof iterFn != 'function') throw TypeError('Target is not iterable');
    // optimisation for array iterators
    if (isArrayIteratorMethod(iterFn)) {
      for (index = 0, length = toLength(iterable.length); length > index; index++) {
        result = callFn(iterable[index]);
        if (result && result instanceof Result) return result;
      } return new Result(false);
    }
    iterator = iterFn.call(iterable);
  }

  next = iterator.next;
  while (!(step = next.call(iterator)).done) {
    try {
      result = callFn(step.value);
    } catch (error) {
      iteratorClose(iterator);
      throw error;
    }
    if (typeof result == 'object' && result && result instanceof Result) return result;
  } return new Result(false);
};


/***/ }),

/***/ "./node_modules/core-js/internals/iterator-close.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/iterator-close.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");

module.exports = function (iterator) {
  var returnMethod = iterator['return'];
  if (returnMethod !== undefined) {
    return anObject(returnMethod.call(iterator)).value;
  }
};


/***/ }),

/***/ "./node_modules/core-js/internals/iterators-core.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/iterators-core.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var getPrototypeOf = __webpack_require__(/*! ../internals/object-get-prototype-of */ "./node_modules/core-js/internals/object-get-prototype-of.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js/internals/create-non-enumerable-property.js");
var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");
var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "./node_modules/core-js/internals/is-pure.js");

var ITERATOR = wellKnownSymbol('iterator');
var BUGGY_SAFARI_ITERATORS = false;

var returnThis = function () { return this; };

// `%IteratorPrototype%` object
// https://tc39.es/ecma262/#sec-%iteratorprototype%-object
var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

/* eslint-disable es/no-array-prototype-keys -- safe */
if ([].keys) {
  arrayIterator = [].keys();
  // Safari 8 has buggy iterators w/o `next`
  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
  else {
    PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
  }
}

var NEW_ITERATOR_PROTOTYPE = IteratorPrototype == undefined || fails(function () {
  var test = {};
  // FF44- legacy iterators case
  return IteratorPrototype[ITERATOR].call(test) !== test;
});

if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype = {};

// `%IteratorPrototype%[@@iterator]()` method
// https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
if ((!IS_PURE || NEW_ITERATOR_PROTOTYPE) && !has(IteratorPrototype, ITERATOR)) {
  createNonEnumerableProperty(IteratorPrototype, ITERATOR, returnThis);
}

module.exports = {
  IteratorPrototype: IteratorPrototype,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
};


/***/ }),

/***/ "./node_modules/core-js/internals/iterators.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/iterators.js ***!
  \*****************************************************/
/***/ ((module) => {

module.exports = {};


/***/ }),

/***/ "./node_modules/core-js/internals/microtask.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/microtask.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var getOwnPropertyDescriptor = __webpack_require__(/*! ../internals/object-get-own-property-descriptor */ "./node_modules/core-js/internals/object-get-own-property-descriptor.js").f;
var macrotask = __webpack_require__(/*! ../internals/task */ "./node_modules/core-js/internals/task.js").set;
var IS_IOS = __webpack_require__(/*! ../internals/engine-is-ios */ "./node_modules/core-js/internals/engine-is-ios.js");
var IS_WEBOS_WEBKIT = __webpack_require__(/*! ../internals/engine-is-webos-webkit */ "./node_modules/core-js/internals/engine-is-webos-webkit.js");
var IS_NODE = __webpack_require__(/*! ../internals/engine-is-node */ "./node_modules/core-js/internals/engine-is-node.js");

var MutationObserver = global.MutationObserver || global.WebKitMutationObserver;
var document = global.document;
var process = global.process;
var Promise = global.Promise;
// Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`
var queueMicrotaskDescriptor = getOwnPropertyDescriptor(global, 'queueMicrotask');
var queueMicrotask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;

var flush, head, last, notify, toggle, node, promise, then;

// modern engines have queueMicrotask method
if (!queueMicrotask) {
  flush = function () {
    var parent, fn;
    if (IS_NODE && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (error) {
        if (head) notify();
        else last = undefined;
        throw error;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
  // also except WebOS Webkit https://github.com/zloirock/core-js/issues/898
  if (!IS_IOS && !IS_NODE && !IS_WEBOS_WEBKIT && MutationObserver && document) {
    toggle = true;
    node = document.createTextNode('');
    new MutationObserver(flush).observe(node, { characterData: true });
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    promise = Promise.resolve(undefined);
    // workaround of WebKit ~ iOS Safari 10.1 bug
    promise.constructor = Promise;
    then = promise.then;
    notify = function () {
      then.call(promise, flush);
    };
  // Node.js without promises
  } else if (IS_NODE) {
    notify = function () {
      process.nextTick(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }
}

module.exports = queueMicrotask || function (fn) {
  var task = { fn: fn, next: undefined };
  if (last) last.next = task;
  if (!head) {
    head = task;
    notify();
  } last = task;
};


/***/ }),

/***/ "./node_modules/core-js/internals/native-promise-constructor.js":
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/internals/native-promise-constructor.js ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");

module.exports = global.Promise;


/***/ }),

/***/ "./node_modules/core-js/internals/native-symbol.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/native-symbol.js ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* eslint-disable es/no-symbol -- required for testing */
var V8_VERSION = __webpack_require__(/*! ../internals/engine-v8-version */ "./node_modules/core-js/internals/engine-v8-version.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  var symbol = Symbol();
  // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
  return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});


/***/ }),

/***/ "./node_modules/core-js/internals/native-weak-map.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/internals/native-weak-map.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var inspectSource = __webpack_require__(/*! ../internals/inspect-source */ "./node_modules/core-js/internals/inspect-source.js");

var WeakMap = global.WeakMap;

module.exports = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));


/***/ }),

/***/ "./node_modules/core-js/internals/new-promise-capability.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/internals/new-promise-capability.js ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var aFunction = __webpack_require__(/*! ../internals/a-function */ "./node_modules/core-js/internals/a-function.js");

var PromiseCapability = function (C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
};

// `NewPromiseCapability` abstract operation
// https://tc39.es/ecma262/#sec-newpromisecapability
module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),

/***/ "./node_modules/core-js/internals/object-create.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/object-create.js ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
var defineProperties = __webpack_require__(/*! ../internals/object-define-properties */ "./node_modules/core-js/internals/object-define-properties.js");
var enumBugKeys = __webpack_require__(/*! ../internals/enum-bug-keys */ "./node_modules/core-js/internals/enum-bug-keys.js");
var hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ "./node_modules/core-js/internals/hidden-keys.js");
var html = __webpack_require__(/*! ../internals/html */ "./node_modules/core-js/internals/html.js");
var documentCreateElement = __webpack_require__(/*! ../internals/document-create-element */ "./node_modules/core-js/internals/document-create-element.js");
var sharedKey = __webpack_require__(/*! ../internals/shared-key */ "./node_modules/core-js/internals/shared-key.js");

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO = sharedKey('IE_PROTO');

var EmptyConstructor = function () { /* empty */ };

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  // https://github.com/zloirock/core-js/issues/475
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
};

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function () {
  try {
    /* global ActiveXObject -- old IE */
    activeXDocument = document.domain && new ActiveXObject('htmlfile');
  } catch (error) { /* ignore */ }
  NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys[IE_PROTO] = true;

// `Object.create` method
// https://tc39.es/ecma262/#sec-object.create
module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : defineProperties(result, Properties);
};


/***/ }),

/***/ "./node_modules/core-js/internals/object-define-properties.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/internals/object-define-properties.js ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
var objectKeys = __webpack_require__(/*! ../internals/object-keys */ "./node_modules/core-js/internals/object-keys.js");

// `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es/no-object-defineproperties -- safe
module.exports = DESCRIPTORS ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) definePropertyModule.f(O, key = keys[index++], Properties[key]);
  return O;
};


/***/ }),

/***/ "./node_modules/core-js/internals/object-define-property.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/internals/object-define-property.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var IE8_DOM_DEFINE = __webpack_require__(/*! ../internals/ie8-dom-define */ "./node_modules/core-js/internals/ie8-dom-define.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
var toPrimitive = __webpack_require__(/*! ../internals/to-primitive */ "./node_modules/core-js/internals/to-primitive.js");

// eslint-disable-next-line es/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? $defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "./node_modules/core-js/internals/object-get-own-property-descriptor.js":
/*!******************************************************************************!*\
  !*** ./node_modules/core-js/internals/object-get-own-property-descriptor.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var propertyIsEnumerableModule = __webpack_require__(/*! ../internals/object-property-is-enumerable */ "./node_modules/core-js/internals/object-property-is-enumerable.js");
var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "./node_modules/core-js/internals/create-property-descriptor.js");
var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js/internals/to-indexed-object.js");
var toPrimitive = __webpack_require__(/*! ../internals/to-primitive */ "./node_modules/core-js/internals/to-primitive.js");
var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
var IE8_DOM_DEFINE = __webpack_require__(/*! ../internals/ie8-dom-define */ "./node_modules/core-js/internals/ie8-dom-define.js");

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return $getOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (has(O, P)) return createPropertyDescriptor(!propertyIsEnumerableModule.f.call(O, P), O[P]);
};


/***/ }),

/***/ "./node_modules/core-js/internals/object-get-own-property-names-external.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/core-js/internals/object-get-own-property-names-external.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* eslint-disable es/no-object-getownpropertynames -- safe */
var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js/internals/to-indexed-object.js");
var $getOwnPropertyNames = __webpack_require__(/*! ../internals/object-get-own-property-names */ "./node_modules/core-js/internals/object-get-own-property-names.js").f;

var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return $getOwnPropertyNames(it);
  } catch (error) {
    return windowNames.slice();
  }
};

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]'
    ? getWindowNames(it)
    : $getOwnPropertyNames(toIndexedObject(it));
};


/***/ }),

/***/ "./node_modules/core-js/internals/object-get-own-property-names.js":
/*!*************************************************************************!*\
  !*** ./node_modules/core-js/internals/object-get-own-property-names.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var internalObjectKeys = __webpack_require__(/*! ../internals/object-keys-internal */ "./node_modules/core-js/internals/object-keys-internal.js");
var enumBugKeys = __webpack_require__(/*! ../internals/enum-bug-keys */ "./node_modules/core-js/internals/enum-bug-keys.js");

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};


/***/ }),

/***/ "./node_modules/core-js/internals/object-get-own-property-symbols.js":
/*!***************************************************************************!*\
  !*** ./node_modules/core-js/internals/object-get-own-property-symbols.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ "./node_modules/core-js/internals/object-get-prototype-of.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/internals/object-get-prototype-of.js ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js/internals/to-object.js");
var sharedKey = __webpack_require__(/*! ../internals/shared-key */ "./node_modules/core-js/internals/shared-key.js");
var CORRECT_PROTOTYPE_GETTER = __webpack_require__(/*! ../internals/correct-prototype-getter */ "./node_modules/core-js/internals/correct-prototype-getter.js");

var IE_PROTO = sharedKey('IE_PROTO');
var ObjectPrototype = Object.prototype;

// `Object.getPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.getprototypeof
// eslint-disable-next-line es/no-object-getprototypeof -- safe
module.exports = CORRECT_PROTOTYPE_GETTER ? Object.getPrototypeOf : function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectPrototype : null;
};


/***/ }),

/***/ "./node_modules/core-js/internals/object-keys-internal.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/internals/object-keys-internal.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js/internals/to-indexed-object.js");
var indexOf = __webpack_require__(/*! ../internals/array-includes */ "./node_modules/core-js/internals/array-includes.js").indexOf;
var hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ "./node_modules/core-js/internals/hidden-keys.js");

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~indexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "./node_modules/core-js/internals/object-keys.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/object-keys.js ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var internalObjectKeys = __webpack_require__(/*! ../internals/object-keys-internal */ "./node_modules/core-js/internals/object-keys-internal.js");
var enumBugKeys = __webpack_require__(/*! ../internals/enum-bug-keys */ "./node_modules/core-js/internals/enum-bug-keys.js");

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
// eslint-disable-next-line es/no-object-keys -- safe
module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};


/***/ }),

/***/ "./node_modules/core-js/internals/object-property-is-enumerable.js":
/*!*************************************************************************!*\
  !*** ./node_modules/core-js/internals/object-property-is-enumerable.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

var $propertyIsEnumerable = {}.propertyIsEnumerable;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;


/***/ }),

/***/ "./node_modules/core-js/internals/object-set-prototype-of.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/internals/object-set-prototype-of.js ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* eslint-disable no-proto -- safe */
var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
var aPossiblePrototype = __webpack_require__(/*! ../internals/a-possible-prototype */ "./node_modules/core-js/internals/a-possible-prototype.js");

// `Object.setPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
// eslint-disable-next-line es/no-object-setprototypeof -- safe
module.exports = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
    setter.call(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    anObject(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter.call(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);


/***/ }),

/***/ "./node_modules/core-js/internals/object-to-string.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/internals/object-to-string.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var TO_STRING_TAG_SUPPORT = __webpack_require__(/*! ../internals/to-string-tag-support */ "./node_modules/core-js/internals/to-string-tag-support.js");
var classof = __webpack_require__(/*! ../internals/classof */ "./node_modules/core-js/internals/classof.js");

// `Object.prototype.toString` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.tostring
module.exports = TO_STRING_TAG_SUPPORT ? {}.toString : function toString() {
  return '[object ' + classof(this) + ']';
};


/***/ }),

/***/ "./node_modules/core-js/internals/own-keys.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/internals/own-keys.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "./node_modules/core-js/internals/get-built-in.js");
var getOwnPropertyNamesModule = __webpack_require__(/*! ../internals/object-get-own-property-names */ "./node_modules/core-js/internals/object-get-own-property-names.js");
var getOwnPropertySymbolsModule = __webpack_require__(/*! ../internals/object-get-own-property-symbols */ "./node_modules/core-js/internals/object-get-own-property-symbols.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
};


/***/ }),

/***/ "./node_modules/core-js/internals/path.js":
/*!************************************************!*\
  !*** ./node_modules/core-js/internals/path.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");

module.exports = global;


/***/ }),

/***/ "./node_modules/core-js/internals/perform.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/internals/perform.js ***!
  \***************************************************/
/***/ ((module) => {

module.exports = function (exec) {
  try {
    return { error: false, value: exec() };
  } catch (error) {
    return { error: true, value: error };
  }
};


/***/ }),

/***/ "./node_modules/core-js/internals/promise-resolve.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/internals/promise-resolve.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");
var newPromiseCapability = __webpack_require__(/*! ../internals/new-promise-capability */ "./node_modules/core-js/internals/new-promise-capability.js");

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),

/***/ "./node_modules/core-js/internals/redefine-all.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/internals/redefine-all.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var redefine = __webpack_require__(/*! ../internals/redefine */ "./node_modules/core-js/internals/redefine.js");

module.exports = function (target, src, options) {
  for (var key in src) redefine(target, key, src[key], options);
  return target;
};


/***/ }),

/***/ "./node_modules/core-js/internals/redefine.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/internals/redefine.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js/internals/create-non-enumerable-property.js");
var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
var setGlobal = __webpack_require__(/*! ../internals/set-global */ "./node_modules/core-js/internals/set-global.js");
var inspectSource = __webpack_require__(/*! ../internals/inspect-source */ "./node_modules/core-js/internals/inspect-source.js");
var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ "./node_modules/core-js/internals/internal-state.js");

var getInternalState = InternalStateModule.get;
var enforceInternalState = InternalStateModule.enforce;
var TEMPLATE = String(String).split('String');

(module.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  var state;
  if (typeof value == 'function') {
    if (typeof key == 'string' && !has(value, 'name')) {
      createNonEnumerableProperty(value, 'name', key);
    }
    state = enforceInternalState(value);
    if (!state.source) {
      state.source = TEMPLATE.join(typeof key == 'string' ? key : '');
    }
  }
  if (O === global) {
    if (simple) O[key] = value;
    else setGlobal(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }
  if (simple) O[key] = value;
  else createNonEnumerableProperty(O, key, value);
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return typeof this == 'function' && getInternalState(this).source || inspectSource(this);
});


/***/ }),

/***/ "./node_modules/core-js/internals/regexp-exec-abstract.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/internals/regexp-exec-abstract.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var classof = __webpack_require__(/*! ./classof-raw */ "./node_modules/core-js/internals/classof-raw.js");
var regexpExec = __webpack_require__(/*! ./regexp-exec */ "./node_modules/core-js/internals/regexp-exec.js");

// `RegExpExec` abstract operation
// https://tc39.es/ecma262/#sec-regexpexec
module.exports = function (R, S) {
  var exec = R.exec;
  if (typeof exec === 'function') {
    var result = exec.call(R, S);
    if (typeof result !== 'object') {
      throw TypeError('RegExp exec method returned something other than an Object or null');
    }
    return result;
  }

  if (classof(R) !== 'RegExp') {
    throw TypeError('RegExp#exec called on incompatible receiver');
  }

  return regexpExec.call(R, S);
};



/***/ }),

/***/ "./node_modules/core-js/internals/regexp-exec.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/regexp-exec.js ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

/* eslint-disable regexp/no-assertion-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */
/* eslint-disable regexp/no-useless-quantifier -- testing */
var regexpFlags = __webpack_require__(/*! ../internals/regexp-flags */ "./node_modules/core-js/internals/regexp-flags.js");
var stickyHelpers = __webpack_require__(/*! ../internals/regexp-sticky-helpers */ "./node_modules/core-js/internals/regexp-sticky-helpers.js");
var shared = __webpack_require__(/*! ../internals/shared */ "./node_modules/core-js/internals/shared.js");
var create = __webpack_require__(/*! ../internals/object-create */ "./node_modules/core-js/internals/object-create.js");
var getInternalState = __webpack_require__(/*! ../internals/internal-state */ "./node_modules/core-js/internals/internal-state.js").get;
var UNSUPPORTED_DOT_ALL = __webpack_require__(/*! ../internals/regexp-unsupported-dot-all */ "./node_modules/core-js/internals/regexp-unsupported-dot-all.js");
var UNSUPPORTED_NCG = __webpack_require__(/*! ../internals/regexp-unsupported-ncg */ "./node_modules/core-js/internals/regexp-unsupported-ncg.js");

var nativeExec = RegExp.prototype.exec;
var nativeReplace = shared('native-string-replace', String.prototype.replace);

var patchedExec = nativeExec;

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/;
  var re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
})();

var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y || stickyHelpers.BROKEN_CARET;

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG;

if (PATCH) {
  // eslint-disable-next-line max-statements -- TODO
  patchedExec = function exec(str) {
    var re = this;
    var state = getInternalState(re);
    var raw = state.raw;
    var result, reCopy, lastIndex, match, i, object, group;

    if (raw) {
      raw.lastIndex = re.lastIndex;
      result = patchedExec.call(raw, str);
      re.lastIndex = raw.lastIndex;
      return result;
    }

    var groups = state.groups;
    var sticky = UNSUPPORTED_Y && re.sticky;
    var flags = regexpFlags.call(re);
    var source = re.source;
    var charsAdded = 0;
    var strCopy = str;

    if (sticky) {
      flags = flags.replace('y', '');
      if (flags.indexOf('g') === -1) {
        flags += 'g';
      }

      strCopy = String(str).slice(re.lastIndex);
      // Support anchored sticky behavior.
      if (re.lastIndex > 0 && (!re.multiline || re.multiline && str[re.lastIndex - 1] !== '\n')) {
        source = '(?: ' + source + ')';
        strCopy = ' ' + strCopy;
        charsAdded++;
      }
      // ^(? + rx + ) is needed, in combination with some str slicing, to
      // simulate the 'y' flag.
      reCopy = new RegExp('^(?:' + source + ')', flags);
    }

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

    match = nativeExec.call(sticky ? reCopy : re, strCopy);

    if (sticky) {
      if (match) {
        match.input = match.input.slice(charsAdded);
        match[0] = match[0].slice(charsAdded);
        match.index = re.lastIndex;
        re.lastIndex += match[0].length;
      } else re.lastIndex = 0;
    } else if (UPDATES_LAST_INDEX_WRONG && match) {
      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    if (match && groups) {
      match.groups = object = create(null);
      for (i = 0; i < groups.length; i++) {
        group = groups[i];
        object[group[0]] = match[group[1]];
      }
    }

    return match;
  };
}

module.exports = patchedExec;


/***/ }),

/***/ "./node_modules/core-js/internals/regexp-flags.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/internals/regexp-flags.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");

// `RegExp.prototype.flags` getter implementation
// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.dotAll) result += 's';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),

/***/ "./node_modules/core-js/internals/regexp-sticky-helpers.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/internals/regexp-sticky-helpers.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

// babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError,
var RE = function (s, f) {
  return RegExp(s, f);
};

exports.UNSUPPORTED_Y = fails(function () {
  var re = RE('a', 'y');
  re.lastIndex = 2;
  return re.exec('abcd') != null;
});

exports.BROKEN_CARET = fails(function () {
  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
  var re = RE('^r', 'gy');
  re.lastIndex = 2;
  return re.exec('str') != null;
});


/***/ }),

/***/ "./node_modules/core-js/internals/regexp-unsupported-dot-all.js":
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/internals/regexp-unsupported-dot-all.js ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(/*! ./fails */ "./node_modules/core-js/internals/fails.js");

module.exports = fails(function () {
  // babel-minify transpiles RegExp('.', 's') -> /./s and it causes SyntaxError
  var re = RegExp('.', (typeof '').charAt(0));
  return !(re.dotAll && re.exec('\n') && re.flags === 's');
});


/***/ }),

/***/ "./node_modules/core-js/internals/regexp-unsupported-ncg.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/internals/regexp-unsupported-ncg.js ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(/*! ./fails */ "./node_modules/core-js/internals/fails.js");

module.exports = fails(function () {
  // babel-minify transpiles RegExp('.', 'g') -> /./g and it causes SyntaxError
  var re = RegExp('(?<a>b)', (typeof '').charAt(5));
  return re.exec('b').groups.a !== 'b' ||
    'b'.replace(re, '$<a>c') !== 'bc';
});


/***/ }),

/***/ "./node_modules/core-js/internals/require-object-coercible.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/internals/require-object-coercible.js ***!
  \********************************************************************/
/***/ ((module) => {

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};


/***/ }),

/***/ "./node_modules/core-js/internals/set-global.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/set-global.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js/internals/create-non-enumerable-property.js");

module.exports = function (key, value) {
  try {
    createNonEnumerableProperty(global, key, value);
  } catch (error) {
    global[key] = value;
  } return value;
};


/***/ }),

/***/ "./node_modules/core-js/internals/set-species.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/set-species.js ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "./node_modules/core-js/internals/get-built-in.js");
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");
var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");

var SPECIES = wellKnownSymbol('species');

module.exports = function (CONSTRUCTOR_NAME) {
  var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
  var defineProperty = definePropertyModule.f;

  if (DESCRIPTORS && Constructor && !Constructor[SPECIES]) {
    defineProperty(Constructor, SPECIES, {
      configurable: true,
      get: function () { return this; }
    });
  }
};


/***/ }),

/***/ "./node_modules/core-js/internals/set-to-string-tag.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/set-to-string-tag.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var defineProperty = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js").f;
var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');

module.exports = function (it, TAG, STATIC) {
  if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG)) {
    defineProperty(it, TO_STRING_TAG, { configurable: true, value: TAG });
  }
};


/***/ }),

/***/ "./node_modules/core-js/internals/shared-key.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/shared-key.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var shared = __webpack_require__(/*! ../internals/shared */ "./node_modules/core-js/internals/shared.js");
var uid = __webpack_require__(/*! ../internals/uid */ "./node_modules/core-js/internals/uid.js");

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};


/***/ }),

/***/ "./node_modules/core-js/internals/shared-store.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/internals/shared-store.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var setGlobal = __webpack_require__(/*! ../internals/set-global */ "./node_modules/core-js/internals/set-global.js");

var SHARED = '__core-js_shared__';
var store = global[SHARED] || setGlobal(SHARED, {});

module.exports = store;


/***/ }),

/***/ "./node_modules/core-js/internals/shared.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/internals/shared.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "./node_modules/core-js/internals/is-pure.js");
var store = __webpack_require__(/*! ../internals/shared-store */ "./node_modules/core-js/internals/shared-store.js");

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.15.2',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "./node_modules/core-js/internals/species-constructor.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/internals/species-constructor.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
var aFunction = __webpack_require__(/*! ../internals/a-function */ "./node_modules/core-js/internals/a-function.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

var SPECIES = wellKnownSymbol('species');

// `SpeciesConstructor` abstract operation
// https://tc39.es/ecma262/#sec-speciesconstructor
module.exports = function (O, defaultConstructor) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? defaultConstructor : aFunction(S);
};


/***/ }),

/***/ "./node_modules/core-js/internals/string-multibyte.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/internals/string-multibyte.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toInteger = __webpack_require__(/*! ../internals/to-integer */ "./node_modules/core-js/internals/to-integer.js");
var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "./node_modules/core-js/internals/require-object-coercible.js");

// `String.prototype.{ codePointAt, at }` methods implementation
var createMethod = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = String(requireObjectCoercible($this));
    var position = toInteger(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = S.charCodeAt(position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size
      || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
        ? CONVERT_TO_STRING ? S.charAt(position) : first
        : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

module.exports = {
  // `String.prototype.codePointAt` method
  // https://tc39.es/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod(true)
};


/***/ }),

/***/ "./node_modules/core-js/internals/task.js":
/*!************************************************!*\
  !*** ./node_modules/core-js/internals/task.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var bind = __webpack_require__(/*! ../internals/function-bind-context */ "./node_modules/core-js/internals/function-bind-context.js");
var html = __webpack_require__(/*! ../internals/html */ "./node_modules/core-js/internals/html.js");
var createElement = __webpack_require__(/*! ../internals/document-create-element */ "./node_modules/core-js/internals/document-create-element.js");
var IS_IOS = __webpack_require__(/*! ../internals/engine-is-ios */ "./node_modules/core-js/internals/engine-is-ios.js");
var IS_NODE = __webpack_require__(/*! ../internals/engine-is-node */ "./node_modules/core-js/internals/engine-is-node.js");

var location = global.location;
var set = global.setImmediate;
var clear = global.clearImmediate;
var process = global.process;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;

var run = function (id) {
  // eslint-disable-next-line no-prototype-builtins -- safe
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};

var runner = function (id) {
  return function () {
    run(id);
  };
};

var listener = function (event) {
  run(event.data);
};

var post = function (id) {
  // old engines have not location.origin
  global.postMessage(id + '', location.protocol + '//' + location.host);
};

// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!set || !clear) {
  set = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func -- spec requirement
      (typeof fn == 'function' ? fn : Function(fn)).apply(undefined, args);
    };
    defer(counter);
    return counter;
  };
  clear = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (IS_NODE) {
    defer = function (id) {
      process.nextTick(runner(id));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(runner(id));
    };
  // Browsers with MessageChannel, includes WebWorkers
  // except iOS - https://github.com/zloirock/core-js/issues/624
  } else if (MessageChannel && !IS_IOS) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = bind(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (
    global.addEventListener &&
    typeof postMessage == 'function' &&
    !global.importScripts &&
    location && location.protocol !== 'file:' &&
    !fails(post)
  ) {
    defer = post;
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in createElement('script')) {
    defer = function (id) {
      html.appendChild(createElement('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(runner(id), 0);
    };
  }
}

module.exports = {
  set: set,
  clear: clear
};


/***/ }),

/***/ "./node_modules/core-js/internals/to-absolute-index.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/to-absolute-index.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toInteger = __webpack_require__(/*! ../internals/to-integer */ "./node_modules/core-js/internals/to-integer.js");

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function (index, length) {
  var integer = toInteger(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};


/***/ }),

/***/ "./node_modules/core-js/internals/to-indexed-object.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/to-indexed-object.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__(/*! ../internals/indexed-object */ "./node_modules/core-js/internals/indexed-object.js");
var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "./node_modules/core-js/internals/require-object-coercible.js");

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};


/***/ }),

/***/ "./node_modules/core-js/internals/to-integer.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/to-integer.js ***!
  \******************************************************/
/***/ ((module) => {

var ceil = Math.ceil;
var floor = Math.floor;

// `ToInteger` abstract operation
// https://tc39.es/ecma262/#sec-tointeger
module.exports = function (argument) {
  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
};


/***/ }),

/***/ "./node_modules/core-js/internals/to-length.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/to-length.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toInteger = __webpack_require__(/*! ../internals/to-integer */ "./node_modules/core-js/internals/to-integer.js");

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
module.exports = function (argument) {
  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};


/***/ }),

/***/ "./node_modules/core-js/internals/to-object.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/to-object.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "./node_modules/core-js/internals/require-object-coercible.js");

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
module.exports = function (argument) {
  return Object(requireObjectCoercible(argument));
};


/***/ }),

/***/ "./node_modules/core-js/internals/to-primitive.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/internals/to-primitive.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (input, PREFERRED_STRING) {
  if (!isObject(input)) return input;
  var fn, val;
  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "./node_modules/core-js/internals/to-string-tag-support.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/internals/to-string-tag-support.js ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};

test[TO_STRING_TAG] = 'z';

module.exports = String(test) === '[object z]';


/***/ }),

/***/ "./node_modules/core-js/internals/uid.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/internals/uid.js ***!
  \***********************************************/
/***/ ((module) => {

var id = 0;
var postfix = Math.random();

module.exports = function (key) {
  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
};


/***/ }),

/***/ "./node_modules/core-js/internals/use-symbol-as-uid.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/use-symbol-as-uid.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* eslint-disable es/no-symbol -- required for testing */
var NATIVE_SYMBOL = __webpack_require__(/*! ../internals/native-symbol */ "./node_modules/core-js/internals/native-symbol.js");

module.exports = NATIVE_SYMBOL
  && !Symbol.sham
  && typeof Symbol.iterator == 'symbol';


/***/ }),

/***/ "./node_modules/core-js/internals/well-known-symbol-wrapped.js":
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/internals/well-known-symbol-wrapped.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

exports.f = wellKnownSymbol;


/***/ }),

/***/ "./node_modules/core-js/internals/well-known-symbol.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/well-known-symbol.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var shared = __webpack_require__(/*! ../internals/shared */ "./node_modules/core-js/internals/shared.js");
var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
var uid = __webpack_require__(/*! ../internals/uid */ "./node_modules/core-js/internals/uid.js");
var NATIVE_SYMBOL = __webpack_require__(/*! ../internals/native-symbol */ "./node_modules/core-js/internals/native-symbol.js");
var USE_SYMBOL_AS_UID = __webpack_require__(/*! ../internals/use-symbol-as-uid */ "./node_modules/core-js/internals/use-symbol-as-uid.js");

var WellKnownSymbolsStore = shared('wks');
var Symbol = global.Symbol;
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!has(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')) {
    if (NATIVE_SYMBOL && has(Symbol, name)) {
      WellKnownSymbolsStore[name] = Symbol[name];
    } else {
      WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
    }
  } return WellKnownSymbolsStore[name];
};


/***/ }),

/***/ "./node_modules/core-js/modules/es.array.concat.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es.array.concat.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var isArray = __webpack_require__(/*! ../internals/is-array */ "./node_modules/core-js/internals/is-array.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");
var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js/internals/to-object.js");
var toLength = __webpack_require__(/*! ../internals/to-length */ "./node_modules/core-js/internals/to-length.js");
var createProperty = __webpack_require__(/*! ../internals/create-property */ "./node_modules/core-js/internals/create-property.js");
var arraySpeciesCreate = __webpack_require__(/*! ../internals/array-species-create */ "./node_modules/core-js/internals/array-species-create.js");
var arrayMethodHasSpeciesSupport = __webpack_require__(/*! ../internals/array-method-has-species-support */ "./node_modules/core-js/internals/array-method-has-species-support.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");
var V8_VERSION = __webpack_require__(/*! ../internals/engine-v8-version */ "./node_modules/core-js/internals/engine-v8-version.js");

var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';

// We can't use this feature detection in V8 since it causes
// deoptimization and serious performance degradation
// https://github.com/zloirock/core-js/issues/679
var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails(function () {
  var array = [];
  array[IS_CONCAT_SPREADABLE] = false;
  return array.concat()[0] !== array;
});

var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

var isConcatSpreadable = function (O) {
  if (!isObject(O)) return false;
  var spreadable = O[IS_CONCAT_SPREADABLE];
  return spreadable !== undefined ? !!spreadable : isArray(O);
};

var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

// `Array.prototype.concat` method
// https://tc39.es/ecma262/#sec-array.prototype.concat
// with adding support of @@isConcatSpreadable and @@species
$({ target: 'Array', proto: true, forced: FORCED }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  concat: function concat(arg) {
    var O = toObject(this);
    var A = arraySpeciesCreate(O, 0);
    var n = 0;
    var i, k, length, len, E;
    for (i = -1, length = arguments.length; i < length; i++) {
      E = i === -1 ? O : arguments[i];
      if (isConcatSpreadable(E)) {
        len = toLength(E.length);
        if (n + len > MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
      } else {
        if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        createProperty(A, n++, E);
      }
    }
    A.length = n;
    return A;
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es.array.for-each.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es.array.for-each.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var forEach = __webpack_require__(/*! ../internals/array-for-each */ "./node_modules/core-js/internals/array-for-each.js");

// `Array.prototype.forEach` method
// https://tc39.es/ecma262/#sec-array.prototype.foreach
// eslint-disable-next-line es/no-array-prototype-foreach -- safe
$({ target: 'Array', proto: true, forced: [].forEach != forEach }, {
  forEach: forEach
});


/***/ }),

/***/ "./node_modules/core-js/modules/es.array.from.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es.array.from.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var from = __webpack_require__(/*! ../internals/array-from */ "./node_modules/core-js/internals/array-from.js");
var checkCorrectnessOfIteration = __webpack_require__(/*! ../internals/check-correctness-of-iteration */ "./node_modules/core-js/internals/check-correctness-of-iteration.js");

var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function (iterable) {
  // eslint-disable-next-line es/no-array-from -- required for testing
  Array.from(iterable);
});

// `Array.from` method
// https://tc39.es/ecma262/#sec-array.from
$({ target: 'Array', stat: true, forced: INCORRECT_ITERATION }, {
  from: from
});


/***/ }),

/***/ "./node_modules/core-js/modules/es.array.is-array.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es.array.is-array.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var isArray = __webpack_require__(/*! ../internals/is-array */ "./node_modules/core-js/internals/is-array.js");

// `Array.isArray` method
// https://tc39.es/ecma262/#sec-array.isarray
$({ target: 'Array', stat: true }, {
  isArray: isArray
});


/***/ }),

/***/ "./node_modules/core-js/modules/es.array.iterator.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es.array.iterator.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js/internals/to-indexed-object.js");
var addToUnscopables = __webpack_require__(/*! ../internals/add-to-unscopables */ "./node_modules/core-js/internals/add-to-unscopables.js");
var Iterators = __webpack_require__(/*! ../internals/iterators */ "./node_modules/core-js/internals/iterators.js");
var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ "./node_modules/core-js/internals/internal-state.js");
var defineIterator = __webpack_require__(/*! ../internals/define-iterator */ "./node_modules/core-js/internals/define-iterator.js");

var ARRAY_ITERATOR = 'Array Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(ARRAY_ITERATOR);

// `Array.prototype.entries` method
// https://tc39.es/ecma262/#sec-array.prototype.entries
// `Array.prototype.keys` method
// https://tc39.es/ecma262/#sec-array.prototype.keys
// `Array.prototype.values` method
// https://tc39.es/ecma262/#sec-array.prototype.values
// `Array.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-array.prototype-@@iterator
// `CreateArrayIterator` internal method
// https://tc39.es/ecma262/#sec-createarrayiterator
module.exports = defineIterator(Array, 'Array', function (iterated, kind) {
  setInternalState(this, {
    type: ARRAY_ITERATOR,
    target: toIndexedObject(iterated), // target
    index: 0,                          // next index
    kind: kind                         // kind
  });
// `%ArrayIteratorPrototype%.next` method
// https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
}, function () {
  var state = getInternalState(this);
  var target = state.target;
  var kind = state.kind;
  var index = state.index++;
  if (!target || index >= target.length) {
    state.target = undefined;
    return { value: undefined, done: true };
  }
  if (kind == 'keys') return { value: index, done: false };
  if (kind == 'values') return { value: target[index], done: false };
  return { value: [index, target[index]], done: false };
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values%
// https://tc39.es/ecma262/#sec-createunmappedargumentsobject
// https://tc39.es/ecma262/#sec-createmappedargumentsobject
Iterators.Arguments = Iterators.Array;

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),

/***/ "./node_modules/core-js/modules/es.array.map.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/es.array.map.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var $map = __webpack_require__(/*! ../internals/array-iteration */ "./node_modules/core-js/internals/array-iteration.js").map;
var arrayMethodHasSpeciesSupport = __webpack_require__(/*! ../internals/array-method-has-species-support */ "./node_modules/core-js/internals/array-method-has-species-support.js");

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('map');

// `Array.prototype.map` method
// https://tc39.es/ecma262/#sec-array.prototype.map
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es.array.slice.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es.array.slice.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");
var isArray = __webpack_require__(/*! ../internals/is-array */ "./node_modules/core-js/internals/is-array.js");
var toAbsoluteIndex = __webpack_require__(/*! ../internals/to-absolute-index */ "./node_modules/core-js/internals/to-absolute-index.js");
var toLength = __webpack_require__(/*! ../internals/to-length */ "./node_modules/core-js/internals/to-length.js");
var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js/internals/to-indexed-object.js");
var createProperty = __webpack_require__(/*! ../internals/create-property */ "./node_modules/core-js/internals/create-property.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");
var arrayMethodHasSpeciesSupport = __webpack_require__(/*! ../internals/array-method-has-species-support */ "./node_modules/core-js/internals/array-method-has-species-support.js");

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('slice');

var SPECIES = wellKnownSymbol('species');
var nativeSlice = [].slice;
var max = Math.max;

// `Array.prototype.slice` method
// https://tc39.es/ecma262/#sec-array.prototype.slice
// fallback for not array-like ES3 strings and DOM objects
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
  slice: function slice(start, end) {
    var O = toIndexedObject(this);
    var length = toLength(O.length);
    var k = toAbsoluteIndex(start, length);
    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
    // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
    var Constructor, result, n;
    if (isArray(O)) {
      Constructor = O.constructor;
      // cross-realm fallback
      if (typeof Constructor == 'function' && (Constructor === Array || isArray(Constructor.prototype))) {
        Constructor = undefined;
      } else if (isObject(Constructor)) {
        Constructor = Constructor[SPECIES];
        if (Constructor === null) Constructor = undefined;
      }
      if (Constructor === Array || Constructor === undefined) {
        return nativeSlice.call(O, k, fin);
      }
    }
    result = new (Constructor === undefined ? Array : Constructor)(max(fin - k, 0));
    for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);
    result.length = n;
    return result;
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es.function.name.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es.function.name.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var defineProperty = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js").f;

var FunctionPrototype = Function.prototype;
var FunctionPrototypeToString = FunctionPrototype.toString;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// Function instances `.name` property
// https://tc39.es/ecma262/#sec-function-instances-name
if (DESCRIPTORS && !(NAME in FunctionPrototype)) {
  defineProperty(FunctionPrototype, NAME, {
    configurable: true,
    get: function () {
      try {
        return FunctionPrototypeToString.call(this).match(nameRE)[1];
      } catch (error) {
        return '';
      }
    }
  });
}


/***/ }),

/***/ "./node_modules/core-js/modules/es.object.keys.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es.object.keys.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js/internals/to-object.js");
var nativeKeys = __webpack_require__(/*! ../internals/object-keys */ "./node_modules/core-js/internals/object-keys.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

var FAILS_ON_PRIMITIVES = fails(function () { nativeKeys(1); });

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
  keys: function keys(it) {
    return nativeKeys(toObject(it));
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es.object.to-string.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/es.object.to-string.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var TO_STRING_TAG_SUPPORT = __webpack_require__(/*! ../internals/to-string-tag-support */ "./node_modules/core-js/internals/to-string-tag-support.js");
var redefine = __webpack_require__(/*! ../internals/redefine */ "./node_modules/core-js/internals/redefine.js");
var toString = __webpack_require__(/*! ../internals/object-to-string */ "./node_modules/core-js/internals/object-to-string.js");

// `Object.prototype.toString` method
// https://tc39.es/ecma262/#sec-object.prototype.tostring
if (!TO_STRING_TAG_SUPPORT) {
  redefine(Object.prototype, 'toString', toString, { unsafe: true });
}


/***/ }),

/***/ "./node_modules/core-js/modules/es.promise.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/es.promise.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "./node_modules/core-js/internals/is-pure.js");
var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "./node_modules/core-js/internals/get-built-in.js");
var NativePromise = __webpack_require__(/*! ../internals/native-promise-constructor */ "./node_modules/core-js/internals/native-promise-constructor.js");
var redefine = __webpack_require__(/*! ../internals/redefine */ "./node_modules/core-js/internals/redefine.js");
var redefineAll = __webpack_require__(/*! ../internals/redefine-all */ "./node_modules/core-js/internals/redefine-all.js");
var setPrototypeOf = __webpack_require__(/*! ../internals/object-set-prototype-of */ "./node_modules/core-js/internals/object-set-prototype-of.js");
var setToStringTag = __webpack_require__(/*! ../internals/set-to-string-tag */ "./node_modules/core-js/internals/set-to-string-tag.js");
var setSpecies = __webpack_require__(/*! ../internals/set-species */ "./node_modules/core-js/internals/set-species.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");
var aFunction = __webpack_require__(/*! ../internals/a-function */ "./node_modules/core-js/internals/a-function.js");
var anInstance = __webpack_require__(/*! ../internals/an-instance */ "./node_modules/core-js/internals/an-instance.js");
var inspectSource = __webpack_require__(/*! ../internals/inspect-source */ "./node_modules/core-js/internals/inspect-source.js");
var iterate = __webpack_require__(/*! ../internals/iterate */ "./node_modules/core-js/internals/iterate.js");
var checkCorrectnessOfIteration = __webpack_require__(/*! ../internals/check-correctness-of-iteration */ "./node_modules/core-js/internals/check-correctness-of-iteration.js");
var speciesConstructor = __webpack_require__(/*! ../internals/species-constructor */ "./node_modules/core-js/internals/species-constructor.js");
var task = __webpack_require__(/*! ../internals/task */ "./node_modules/core-js/internals/task.js").set;
var microtask = __webpack_require__(/*! ../internals/microtask */ "./node_modules/core-js/internals/microtask.js");
var promiseResolve = __webpack_require__(/*! ../internals/promise-resolve */ "./node_modules/core-js/internals/promise-resolve.js");
var hostReportErrors = __webpack_require__(/*! ../internals/host-report-errors */ "./node_modules/core-js/internals/host-report-errors.js");
var newPromiseCapabilityModule = __webpack_require__(/*! ../internals/new-promise-capability */ "./node_modules/core-js/internals/new-promise-capability.js");
var perform = __webpack_require__(/*! ../internals/perform */ "./node_modules/core-js/internals/perform.js");
var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ "./node_modules/core-js/internals/internal-state.js");
var isForced = __webpack_require__(/*! ../internals/is-forced */ "./node_modules/core-js/internals/is-forced.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");
var IS_BROWSER = __webpack_require__(/*! ../internals/engine-is-browser */ "./node_modules/core-js/internals/engine-is-browser.js");
var IS_NODE = __webpack_require__(/*! ../internals/engine-is-node */ "./node_modules/core-js/internals/engine-is-node.js");
var V8_VERSION = __webpack_require__(/*! ../internals/engine-v8-version */ "./node_modules/core-js/internals/engine-v8-version.js");

var SPECIES = wellKnownSymbol('species');
var PROMISE = 'Promise';
var getInternalState = InternalStateModule.get;
var setInternalState = InternalStateModule.set;
var getInternalPromiseState = InternalStateModule.getterFor(PROMISE);
var NativePromisePrototype = NativePromise && NativePromise.prototype;
var PromiseConstructor = NativePromise;
var PromiseConstructorPrototype = NativePromisePrototype;
var TypeError = global.TypeError;
var document = global.document;
var process = global.process;
var newPromiseCapability = newPromiseCapabilityModule.f;
var newGenericPromiseCapability = newPromiseCapability;
var DISPATCH_EVENT = !!(document && document.createEvent && global.dispatchEvent);
var NATIVE_REJECTION_EVENT = typeof PromiseRejectionEvent == 'function';
var UNHANDLED_REJECTION = 'unhandledrejection';
var REJECTION_HANDLED = 'rejectionhandled';
var PENDING = 0;
var FULFILLED = 1;
var REJECTED = 2;
var HANDLED = 1;
var UNHANDLED = 2;
var SUBCLASSING = false;
var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;

var FORCED = isForced(PROMISE, function () {
  var PROMISE_CONSTRUCTOR_SOURCE = inspectSource(PromiseConstructor);
  var GLOBAL_CORE_JS_PROMISE = PROMISE_CONSTRUCTOR_SOURCE !== String(PromiseConstructor);
  // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
  // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
  // We can't detect it synchronously, so just check versions
  if (!GLOBAL_CORE_JS_PROMISE && V8_VERSION === 66) return true;
  // We need Promise#finally in the pure version for preventing prototype pollution
  if (IS_PURE && !PromiseConstructorPrototype['finally']) return true;
  // We can't use @@species feature detection in V8 since it causes
  // deoptimization and performance degradation
  // https://github.com/zloirock/core-js/issues/679
  if (V8_VERSION >= 51 && /native code/.test(PROMISE_CONSTRUCTOR_SOURCE)) return false;
  // Detect correctness of subclassing with @@species support
  var promise = new PromiseConstructor(function (resolve) { resolve(1); });
  var FakePromise = function (exec) {
    exec(function () { /* empty */ }, function () { /* empty */ });
  };
  var constructor = promise.constructor = {};
  constructor[SPECIES] = FakePromise;
  SUBCLASSING = promise.then(function () { /* empty */ }) instanceof FakePromise;
  if (!SUBCLASSING) return true;
  // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test
  return !GLOBAL_CORE_JS_PROMISE && IS_BROWSER && !NATIVE_REJECTION_EVENT;
});

var INCORRECT_ITERATION = FORCED || !checkCorrectnessOfIteration(function (iterable) {
  PromiseConstructor.all(iterable)['catch'](function () { /* empty */ });
});

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};

var notify = function (state, isReject) {
  if (state.notified) return;
  state.notified = true;
  var chain = state.reactions;
  microtask(function () {
    var value = state.value;
    var ok = state.state == FULFILLED;
    var index = 0;
    // variable length - can't use forEach
    while (chain.length > index) {
      var reaction = chain[index++];
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (state.rejection === UNHANDLED) onHandleUnhandled(state);
            state.rejection = HANDLED;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // can throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (error) {
        if (domain && !exited) domain.exit();
        reject(error);
      }
    }
    state.reactions = [];
    state.notified = false;
    if (isReject && !state.rejection) onUnhandled(state);
  });
};

var dispatchEvent = function (name, promise, reason) {
  var event, handler;
  if (DISPATCH_EVENT) {
    event = document.createEvent('Event');
    event.promise = promise;
    event.reason = reason;
    event.initEvent(name, false, true);
    global.dispatchEvent(event);
  } else event = { promise: promise, reason: reason };
  if (!NATIVE_REJECTION_EVENT && (handler = global['on' + name])) handler(event);
  else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
};

var onUnhandled = function (state) {
  task.call(global, function () {
    var promise = state.facade;
    var value = state.value;
    var IS_UNHANDLED = isUnhandled(state);
    var result;
    if (IS_UNHANDLED) {
      result = perform(function () {
        if (IS_NODE) {
          process.emit('unhandledRejection', value, promise);
        } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      state.rejection = IS_NODE || isUnhandled(state) ? UNHANDLED : HANDLED;
      if (result.error) throw result.value;
    }
  });
};

var isUnhandled = function (state) {
  return state.rejection !== HANDLED && !state.parent;
};

var onHandleUnhandled = function (state) {
  task.call(global, function () {
    var promise = state.facade;
    if (IS_NODE) {
      process.emit('rejectionHandled', promise);
    } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
  });
};

var bind = function (fn, state, unwrap) {
  return function (value) {
    fn(state, value, unwrap);
  };
};

var internalReject = function (state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  state.value = value;
  state.state = REJECTED;
  notify(state, true);
};

var internalResolve = function (state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  try {
    if (state.facade === value) throw TypeError("Promise can't be resolved itself");
    var then = isThenable(value);
    if (then) {
      microtask(function () {
        var wrapper = { done: false };
        try {
          then.call(value,
            bind(internalResolve, wrapper, state),
            bind(internalReject, wrapper, state)
          );
        } catch (error) {
          internalReject(wrapper, error, state);
        }
      });
    } else {
      state.value = value;
      state.state = FULFILLED;
      notify(state, false);
    }
  } catch (error) {
    internalReject({ done: false }, error, state);
  }
};

// constructor polyfill
if (FORCED) {
  // 25.4.3.1 Promise(executor)
  PromiseConstructor = function Promise(executor) {
    anInstance(this, PromiseConstructor, PROMISE);
    aFunction(executor);
    Internal.call(this);
    var state = getInternalState(this);
    try {
      executor(bind(internalResolve, state), bind(internalReject, state));
    } catch (error) {
      internalReject(state, error);
    }
  };
  PromiseConstructorPrototype = PromiseConstructor.prototype;
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  Internal = function Promise(executor) {
    setInternalState(this, {
      type: PROMISE,
      done: false,
      notified: false,
      parent: false,
      reactions: [],
      rejection: false,
      state: PENDING,
      value: undefined
    });
  };
  Internal.prototype = redefineAll(PromiseConstructorPrototype, {
    // `Promise.prototype.then` method
    // https://tc39.es/ecma262/#sec-promise.prototype.then
    then: function then(onFulfilled, onRejected) {
      var state = getInternalPromiseState(this);
      var reaction = newPromiseCapability(speciesConstructor(this, PromiseConstructor));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = IS_NODE ? process.domain : undefined;
      state.parent = true;
      state.reactions.push(reaction);
      if (state.state != PENDING) notify(state, false);
      return reaction.promise;
    },
    // `Promise.prototype.catch` method
    // https://tc39.es/ecma262/#sec-promise.prototype.catch
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    var state = getInternalState(promise);
    this.promise = promise;
    this.resolve = bind(internalResolve, state);
    this.reject = bind(internalReject, state);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === PromiseConstructor || C === PromiseWrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };

  if (!IS_PURE && typeof NativePromise == 'function' && NativePromisePrototype !== Object.prototype) {
    nativeThen = NativePromisePrototype.then;

    if (!SUBCLASSING) {
      // make `Promise#then` return a polyfilled `Promise` for native promise-based APIs
      redefine(NativePromisePrototype, 'then', function then(onFulfilled, onRejected) {
        var that = this;
        return new PromiseConstructor(function (resolve, reject) {
          nativeThen.call(that, resolve, reject);
        }).then(onFulfilled, onRejected);
      // https://github.com/zloirock/core-js/issues/640
      }, { unsafe: true });

      // makes sure that native promise-based APIs `Promise#catch` properly works with patched `Promise#then`
      redefine(NativePromisePrototype, 'catch', PromiseConstructorPrototype['catch'], { unsafe: true });
    }

    // make `.constructor === Promise` work for native promise-based APIs
    try {
      delete NativePromisePrototype.constructor;
    } catch (error) { /* empty */ }

    // make `instanceof Promise` work for native promise-based APIs
    if (setPrototypeOf) {
      setPrototypeOf(NativePromisePrototype, PromiseConstructorPrototype);
    }
  }
}

$({ global: true, wrap: true, forced: FORCED }, {
  Promise: PromiseConstructor
});

setToStringTag(PromiseConstructor, PROMISE, false, true);
setSpecies(PROMISE);

PromiseWrapper = getBuiltIn(PROMISE);

// statics
$({ target: PROMISE, stat: true, forced: FORCED }, {
  // `Promise.reject` method
  // https://tc39.es/ecma262/#sec-promise.reject
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    capability.reject.call(undefined, r);
    return capability.promise;
  }
});

$({ target: PROMISE, stat: true, forced: IS_PURE || FORCED }, {
  // `Promise.resolve` method
  // https://tc39.es/ecma262/#sec-promise.resolve
  resolve: function resolve(x) {
    return promiseResolve(IS_PURE && this === PromiseWrapper ? PromiseConstructor : this, x);
  }
});

$({ target: PROMISE, stat: true, forced: INCORRECT_ITERATION }, {
  // `Promise.all` method
  // https://tc39.es/ecma262/#sec-promise.all
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var $promiseResolve = aFunction(C.resolve);
      var values = [];
      var counter = 0;
      var remaining = 1;
      iterate(iterable, function (promise) {
        var index = counter++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        $promiseResolve.call(C, promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.error) reject(result.value);
    return capability.promise;
  },
  // `Promise.race` method
  // https://tc39.es/ecma262/#sec-promise.race
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      var $promiseResolve = aFunction(C.resolve);
      iterate(iterable, function (promise) {
        $promiseResolve.call(C, promise).then(capability.resolve, reject);
      });
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es.regexp.exec.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es.regexp.exec.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var exec = __webpack_require__(/*! ../internals/regexp-exec */ "./node_modules/core-js/internals/regexp-exec.js");

// `RegExp.prototype.exec` method
// https://tc39.es/ecma262/#sec-regexp.prototype.exec
$({ target: 'RegExp', proto: true, forced: /./.exec !== exec }, {
  exec: exec
});


/***/ }),

/***/ "./node_modules/core-js/modules/es.string.iterator.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es.string.iterator.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var charAt = __webpack_require__(/*! ../internals/string-multibyte */ "./node_modules/core-js/internals/string-multibyte.js").charAt;
var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ "./node_modules/core-js/internals/internal-state.js");
var defineIterator = __webpack_require__(/*! ../internals/define-iterator */ "./node_modules/core-js/internals/define-iterator.js");

var STRING_ITERATOR = 'String Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(STRING_ITERATOR);

// `String.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-string.prototype-@@iterator
defineIterator(String, 'String', function (iterated) {
  setInternalState(this, {
    type: STRING_ITERATOR,
    string: String(iterated),
    index: 0
  });
// `%StringIteratorPrototype%.next` method
// https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
}, function next() {
  var state = getInternalState(this);
  var string = state.string;
  var index = state.index;
  var point;
  if (index >= string.length) return { value: undefined, done: true };
  point = charAt(string, index);
  state.index += point.length;
  return { value: point, done: false };
});


/***/ }),

/***/ "./node_modules/core-js/modules/es.string.split.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es.string.split.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var fixRegExpWellKnownSymbolLogic = __webpack_require__(/*! ../internals/fix-regexp-well-known-symbol-logic */ "./node_modules/core-js/internals/fix-regexp-well-known-symbol-logic.js");
var isRegExp = __webpack_require__(/*! ../internals/is-regexp */ "./node_modules/core-js/internals/is-regexp.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "./node_modules/core-js/internals/require-object-coercible.js");
var speciesConstructor = __webpack_require__(/*! ../internals/species-constructor */ "./node_modules/core-js/internals/species-constructor.js");
var advanceStringIndex = __webpack_require__(/*! ../internals/advance-string-index */ "./node_modules/core-js/internals/advance-string-index.js");
var toLength = __webpack_require__(/*! ../internals/to-length */ "./node_modules/core-js/internals/to-length.js");
var callRegExpExec = __webpack_require__(/*! ../internals/regexp-exec-abstract */ "./node_modules/core-js/internals/regexp-exec-abstract.js");
var regexpExec = __webpack_require__(/*! ../internals/regexp-exec */ "./node_modules/core-js/internals/regexp-exec.js");
var stickyHelpers = __webpack_require__(/*! ../internals/regexp-sticky-helpers */ "./node_modules/core-js/internals/regexp-sticky-helpers.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y;
var arrayPush = [].push;
var min = Math.min;
var MAX_UINT32 = 0xFFFFFFFF;

// Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
// Weex JS has frozen built-in prototypes, so use try / catch wrapper
var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function () {
  // eslint-disable-next-line regexp/no-empty-group -- required for testing
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
});

// @@split logic
fixRegExpWellKnownSymbolLogic('split', function (SPLIT, nativeSplit, maybeCallNative) {
  var internalSplit;
  if (
    'abbc'.split(/(b)*/)[1] == 'c' ||
    // eslint-disable-next-line regexp/no-empty-group -- required for testing
    'test'.split(/(?:)/, -1).length != 4 ||
    'ab'.split(/(?:ab)*/).length != 2 ||
    '.'.split(/(.?)(.?)/).length != 4 ||
    // eslint-disable-next-line regexp/no-assertion-capturing-group, regexp/no-empty-group -- required for testing
    '.'.split(/()()/).length > 1 ||
    ''.split(/.?/).length
  ) {
    // based on es5-shim implementation, need to rework it
    internalSplit = function (separator, limit) {
      var string = String(requireObjectCoercible(this));
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (separator === undefined) return [string];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) {
        return nativeSplit.call(string, separator, lim);
      }
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var match, lastIndex, lastLength;
      while (match = regexpExec.call(separatorCopy, string)) {
        lastIndex = separatorCopy.lastIndex;
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          if (match.length > 1 && match.index < string.length) arrayPush.apply(output, match.slice(1));
          lastLength = match[0].length;
          lastLastIndex = lastIndex;
          if (output.length >= lim) break;
        }
        if (separatorCopy.lastIndex === match.index) separatorCopy.lastIndex++; // Avoid an infinite loop
      }
      if (lastLastIndex === string.length) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output.length > lim ? output.slice(0, lim) : output;
    };
  // Chakra, V8
  } else if ('0'.split(undefined, 0).length) {
    internalSplit = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : nativeSplit.call(this, separator, limit);
    };
  } else internalSplit = nativeSplit;

  return [
    // `String.prototype.split` method
    // https://tc39.es/ecma262/#sec-string.prototype.split
    function split(separator, limit) {
      var O = requireObjectCoercible(this);
      var splitter = separator == undefined ? undefined : separator[SPLIT];
      return splitter !== undefined
        ? splitter.call(separator, O, limit)
        : internalSplit.call(String(O), separator, limit);
    },
    // `RegExp.prototype[@@split]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@split
    //
    // NOTE: This cannot be properly polyfilled in engines that don't support
    // the 'y' flag.
    function (string, limit) {
      var res = maybeCallNative(internalSplit, this, string, limit, internalSplit !== nativeSplit);
      if (res.done) return res.value;

      var rx = anObject(this);
      var S = String(string);
      var C = speciesConstructor(rx, RegExp);

      var unicodeMatching = rx.unicode;
      var flags = (rx.ignoreCase ? 'i' : '') +
                  (rx.multiline ? 'm' : '') +
                  (rx.unicode ? 'u' : '') +
                  (UNSUPPORTED_Y ? 'g' : 'y');

      // ^(? + rx + ) is needed, in combination with some S slicing, to
      // simulate the 'y' flag.
      var splitter = new C(UNSUPPORTED_Y ? '^(?:' + rx.source + ')' : rx, flags);
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (S.length === 0) return callRegExpExec(splitter, S) === null ? [S] : [];
      var p = 0;
      var q = 0;
      var A = [];
      while (q < S.length) {
        splitter.lastIndex = UNSUPPORTED_Y ? 0 : q;
        var z = callRegExpExec(splitter, UNSUPPORTED_Y ? S.slice(q) : S);
        var e;
        if (
          z === null ||
          (e = min(toLength(splitter.lastIndex + (UNSUPPORTED_Y ? q : 0)), S.length)) === p
        ) {
          q = advanceStringIndex(S, q, unicodeMatching);
        } else {
          A.push(S.slice(p, q));
          if (A.length === lim) return A;
          for (var i = 1; i <= z.length - 1; i++) {
            A.push(z[i]);
            if (A.length === lim) return A;
          }
          q = p = e;
        }
      }
      A.push(S.slice(p));
      return A;
    }
  ];
}, !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC, UNSUPPORTED_Y);


/***/ }),

/***/ "./node_modules/core-js/modules/es.symbol.description.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es.symbol.description.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// `Symbol.prototype.description` getter
// https://tc39.es/ecma262/#sec-symbol.prototype.description

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");
var defineProperty = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js").f;
var copyConstructorProperties = __webpack_require__(/*! ../internals/copy-constructor-properties */ "./node_modules/core-js/internals/copy-constructor-properties.js");

var NativeSymbol = global.Symbol;

if (DESCRIPTORS && typeof NativeSymbol == 'function' && (!('description' in NativeSymbol.prototype) ||
  // Safari 12 bug
  NativeSymbol().description !== undefined
)) {
  var EmptyStringDescriptionStore = {};
  // wrap Symbol constructor for correct work with undefined description
  var SymbolWrapper = function Symbol() {
    var description = arguments.length < 1 || arguments[0] === undefined ? undefined : String(arguments[0]);
    var result = this instanceof SymbolWrapper
      ? new NativeSymbol(description)
      // in Edge 13, String(Symbol(undefined)) === 'Symbol(undefined)'
      : description === undefined ? NativeSymbol() : NativeSymbol(description);
    if (description === '') EmptyStringDescriptionStore[result] = true;
    return result;
  };
  copyConstructorProperties(SymbolWrapper, NativeSymbol);
  var symbolPrototype = SymbolWrapper.prototype = NativeSymbol.prototype;
  symbolPrototype.constructor = SymbolWrapper;

  var symbolToString = symbolPrototype.toString;
  var native = String(NativeSymbol('test')) == 'Symbol(test)';
  var regexp = /^Symbol\((.*)\)[^)]+$/;
  defineProperty(symbolPrototype, 'description', {
    configurable: true,
    get: function description() {
      var symbol = isObject(this) ? this.valueOf() : this;
      var string = symbolToString.call(symbol);
      if (has(EmptyStringDescriptionStore, symbol)) return '';
      var desc = native ? string.slice(7, -1) : string.replace(regexp, '$1');
      return desc === '' ? undefined : desc;
    }
  });

  $({ global: true, forced: true }, {
    Symbol: SymbolWrapper
  });
}


/***/ }),

/***/ "./node_modules/core-js/modules/es.symbol.iterator.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es.symbol.iterator.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var defineWellKnownSymbol = __webpack_require__(/*! ../internals/define-well-known-symbol */ "./node_modules/core-js/internals/define-well-known-symbol.js");

// `Symbol.iterator` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.iterator
defineWellKnownSymbol('iterator');


/***/ }),

/***/ "./node_modules/core-js/modules/es.symbol.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/modules/es.symbol.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "./node_modules/core-js/internals/get-built-in.js");
var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "./node_modules/core-js/internals/is-pure.js");
var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var NATIVE_SYMBOL = __webpack_require__(/*! ../internals/native-symbol */ "./node_modules/core-js/internals/native-symbol.js");
var USE_SYMBOL_AS_UID = __webpack_require__(/*! ../internals/use-symbol-as-uid */ "./node_modules/core-js/internals/use-symbol-as-uid.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
var isArray = __webpack_require__(/*! ../internals/is-array */ "./node_modules/core-js/internals/is-array.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js/internals/to-object.js");
var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js/internals/to-indexed-object.js");
var toPrimitive = __webpack_require__(/*! ../internals/to-primitive */ "./node_modules/core-js/internals/to-primitive.js");
var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "./node_modules/core-js/internals/create-property-descriptor.js");
var nativeObjectCreate = __webpack_require__(/*! ../internals/object-create */ "./node_modules/core-js/internals/object-create.js");
var objectKeys = __webpack_require__(/*! ../internals/object-keys */ "./node_modules/core-js/internals/object-keys.js");
var getOwnPropertyNamesModule = __webpack_require__(/*! ../internals/object-get-own-property-names */ "./node_modules/core-js/internals/object-get-own-property-names.js");
var getOwnPropertyNamesExternal = __webpack_require__(/*! ../internals/object-get-own-property-names-external */ "./node_modules/core-js/internals/object-get-own-property-names-external.js");
var getOwnPropertySymbolsModule = __webpack_require__(/*! ../internals/object-get-own-property-symbols */ "./node_modules/core-js/internals/object-get-own-property-symbols.js");
var getOwnPropertyDescriptorModule = __webpack_require__(/*! ../internals/object-get-own-property-descriptor */ "./node_modules/core-js/internals/object-get-own-property-descriptor.js");
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js");
var propertyIsEnumerableModule = __webpack_require__(/*! ../internals/object-property-is-enumerable */ "./node_modules/core-js/internals/object-property-is-enumerable.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js/internals/create-non-enumerable-property.js");
var redefine = __webpack_require__(/*! ../internals/redefine */ "./node_modules/core-js/internals/redefine.js");
var shared = __webpack_require__(/*! ../internals/shared */ "./node_modules/core-js/internals/shared.js");
var sharedKey = __webpack_require__(/*! ../internals/shared-key */ "./node_modules/core-js/internals/shared-key.js");
var hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ "./node_modules/core-js/internals/hidden-keys.js");
var uid = __webpack_require__(/*! ../internals/uid */ "./node_modules/core-js/internals/uid.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");
var wrappedWellKnownSymbolModule = __webpack_require__(/*! ../internals/well-known-symbol-wrapped */ "./node_modules/core-js/internals/well-known-symbol-wrapped.js");
var defineWellKnownSymbol = __webpack_require__(/*! ../internals/define-well-known-symbol */ "./node_modules/core-js/internals/define-well-known-symbol.js");
var setToStringTag = __webpack_require__(/*! ../internals/set-to-string-tag */ "./node_modules/core-js/internals/set-to-string-tag.js");
var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ "./node_modules/core-js/internals/internal-state.js");
var $forEach = __webpack_require__(/*! ../internals/array-iteration */ "./node_modules/core-js/internals/array-iteration.js").forEach;

var HIDDEN = sharedKey('hidden');
var SYMBOL = 'Symbol';
var PROTOTYPE = 'prototype';
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(SYMBOL);
var ObjectPrototype = Object[PROTOTYPE];
var $Symbol = global.Symbol;
var $stringify = getBuiltIn('JSON', 'stringify');
var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
var nativeDefineProperty = definePropertyModule.f;
var nativeGetOwnPropertyNames = getOwnPropertyNamesExternal.f;
var nativePropertyIsEnumerable = propertyIsEnumerableModule.f;
var AllSymbols = shared('symbols');
var ObjectPrototypeSymbols = shared('op-symbols');
var StringToSymbolRegistry = shared('string-to-symbol-registry');
var SymbolToStringRegistry = shared('symbol-to-string-registry');
var WellKnownSymbolsStore = shared('wks');
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var USE_SETTER = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDescriptor = DESCRIPTORS && fails(function () {
  return nativeObjectCreate(nativeDefineProperty({}, 'a', {
    get: function () { return nativeDefineProperty(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (O, P, Attributes) {
  var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor(ObjectPrototype, P);
  if (ObjectPrototypeDescriptor) delete ObjectPrototype[P];
  nativeDefineProperty(O, P, Attributes);
  if (ObjectPrototypeDescriptor && O !== ObjectPrototype) {
    nativeDefineProperty(ObjectPrototype, P, ObjectPrototypeDescriptor);
  }
} : nativeDefineProperty;

var wrap = function (tag, description) {
  var symbol = AllSymbols[tag] = nativeObjectCreate($Symbol[PROTOTYPE]);
  setInternalState(symbol, {
    type: SYMBOL,
    tag: tag,
    description: description
  });
  if (!DESCRIPTORS) symbol.description = description;
  return symbol;
};

var isSymbol = USE_SYMBOL_AS_UID ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return Object(it) instanceof $Symbol;
};

var $defineProperty = function defineProperty(O, P, Attributes) {
  if (O === ObjectPrototype) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
  anObject(O);
  var key = toPrimitive(P, true);
  anObject(Attributes);
  if (has(AllSymbols, key)) {
    if (!Attributes.enumerable) {
      if (!has(O, HIDDEN)) nativeDefineProperty(O, HIDDEN, createPropertyDescriptor(1, {}));
      O[HIDDEN][key] = true;
    } else {
      if (has(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
      Attributes = nativeObjectCreate(Attributes, { enumerable: createPropertyDescriptor(0, false) });
    } return setSymbolDescriptor(O, key, Attributes);
  } return nativeDefineProperty(O, key, Attributes);
};

var $defineProperties = function defineProperties(O, Properties) {
  anObject(O);
  var properties = toIndexedObject(Properties);
  var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
  $forEach(keys, function (key) {
    if (!DESCRIPTORS || $propertyIsEnumerable.call(properties, key)) $defineProperty(O, key, properties[key]);
  });
  return O;
};

var $create = function create(O, Properties) {
  return Properties === undefined ? nativeObjectCreate(O) : $defineProperties(nativeObjectCreate(O), Properties);
};

var $propertyIsEnumerable = function propertyIsEnumerable(V) {
  var P = toPrimitive(V, true);
  var enumerable = nativePropertyIsEnumerable.call(this, P);
  if (this === ObjectPrototype && has(AllSymbols, P) && !has(ObjectPrototypeSymbols, P)) return false;
  return enumerable || !has(this, P) || !has(AllSymbols, P) || has(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
};

var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
  var it = toIndexedObject(O);
  var key = toPrimitive(P, true);
  if (it === ObjectPrototype && has(AllSymbols, key) && !has(ObjectPrototypeSymbols, key)) return;
  var descriptor = nativeGetOwnPropertyDescriptor(it, key);
  if (descriptor && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) {
    descriptor.enumerable = true;
  }
  return descriptor;
};

var $getOwnPropertyNames = function getOwnPropertyNames(O) {
  var names = nativeGetOwnPropertyNames(toIndexedObject(O));
  var result = [];
  $forEach(names, function (key) {
    if (!has(AllSymbols, key) && !has(hiddenKeys, key)) result.push(key);
  });
  return result;
};

var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
  var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
  var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
  var result = [];
  $forEach(names, function (key) {
    if (has(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || has(ObjectPrototype, key))) {
      result.push(AllSymbols[key]);
    }
  });
  return result;
};

// `Symbol` constructor
// https://tc39.es/ecma262/#sec-symbol-constructor
if (!NATIVE_SYMBOL) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor');
    var description = !arguments.length || arguments[0] === undefined ? undefined : String(arguments[0]);
    var tag = uid(description);
    var setter = function (value) {
      if (this === ObjectPrototype) setter.call(ObjectPrototypeSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
    };
    if (DESCRIPTORS && USE_SETTER) setSymbolDescriptor(ObjectPrototype, tag, { configurable: true, set: setter });
    return wrap(tag, description);
  };

  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return getInternalState(this).tag;
  });

  redefine($Symbol, 'withoutSetter', function (description) {
    return wrap(uid(description), description);
  });

  propertyIsEnumerableModule.f = $propertyIsEnumerable;
  definePropertyModule.f = $defineProperty;
  getOwnPropertyDescriptorModule.f = $getOwnPropertyDescriptor;
  getOwnPropertyNamesModule.f = getOwnPropertyNamesExternal.f = $getOwnPropertyNames;
  getOwnPropertySymbolsModule.f = $getOwnPropertySymbols;

  wrappedWellKnownSymbolModule.f = function (name) {
    return wrap(wellKnownSymbol(name), name);
  };

  if (DESCRIPTORS) {
    // https://github.com/tc39/proposal-Symbol-description
    nativeDefineProperty($Symbol[PROTOTYPE], 'description', {
      configurable: true,
      get: function description() {
        return getInternalState(this).description;
      }
    });
    if (!IS_PURE) {
      redefine(ObjectPrototype, 'propertyIsEnumerable', $propertyIsEnumerable, { unsafe: true });
    }
  }
}

$({ global: true, wrap: true, forced: !NATIVE_SYMBOL, sham: !NATIVE_SYMBOL }, {
  Symbol: $Symbol
});

$forEach(objectKeys(WellKnownSymbolsStore), function (name) {
  defineWellKnownSymbol(name);
});

$({ target: SYMBOL, stat: true, forced: !NATIVE_SYMBOL }, {
  // `Symbol.for` method
  // https://tc39.es/ecma262/#sec-symbol.for
  'for': function (key) {
    var string = String(key);
    if (has(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
    var symbol = $Symbol(string);
    StringToSymbolRegistry[string] = symbol;
    SymbolToStringRegistry[symbol] = string;
    return symbol;
  },
  // `Symbol.keyFor` method
  // https://tc39.es/ecma262/#sec-symbol.keyfor
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol');
    if (has(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
  },
  useSetter: function () { USE_SETTER = true; },
  useSimple: function () { USE_SETTER = false; }
});

$({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL, sham: !DESCRIPTORS }, {
  // `Object.create` method
  // https://tc39.es/ecma262/#sec-object.create
  create: $create,
  // `Object.defineProperty` method
  // https://tc39.es/ecma262/#sec-object.defineproperty
  defineProperty: $defineProperty,
  // `Object.defineProperties` method
  // https://tc39.es/ecma262/#sec-object.defineproperties
  defineProperties: $defineProperties,
  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptors
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor
});

$({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL }, {
  // `Object.getOwnPropertyNames` method
  // https://tc39.es/ecma262/#sec-object.getownpropertynames
  getOwnPropertyNames: $getOwnPropertyNames,
  // `Object.getOwnPropertySymbols` method
  // https://tc39.es/ecma262/#sec-object.getownpropertysymbols
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
// https://bugs.chromium.org/p/v8/issues/detail?id=3443
$({ target: 'Object', stat: true, forced: fails(function () { getOwnPropertySymbolsModule.f(1); }) }, {
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    return getOwnPropertySymbolsModule.f(toObject(it));
  }
});

// `JSON.stringify` method behavior with symbols
// https://tc39.es/ecma262/#sec-json.stringify
if ($stringify) {
  var FORCED_JSON_STRINGIFY = !NATIVE_SYMBOL || fails(function () {
    var symbol = $Symbol();
    // MS Edge converts symbol values to JSON as {}
    return $stringify([symbol]) != '[null]'
      // WebKit converts symbol values to JSON as null
      || $stringify({ a: symbol }) != '{}'
      // V8 throws on boxed symbols
      || $stringify(Object(symbol)) != '{}';
  });

  $({ target: 'JSON', stat: true, forced: FORCED_JSON_STRINGIFY }, {
    // eslint-disable-next-line no-unused-vars -- required for `.length`
    stringify: function stringify(it, replacer, space) {
      var args = [it];
      var index = 1;
      var $replacer;
      while (arguments.length > index) args.push(arguments[index++]);
      $replacer = replacer;
      if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
      if (!isArray(replacer)) replacer = function (key, value) {
        if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
        if (!isSymbol(value)) return value;
      };
      args[1] = replacer;
      return $stringify.apply(null, args);
    }
  });
}

// `Symbol.prototype[@@toPrimitive]` method
// https://tc39.es/ecma262/#sec-symbol.prototype-@@toprimitive
if (!$Symbol[PROTOTYPE][TO_PRIMITIVE]) {
  createNonEnumerableProperty($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
}
// `Symbol.prototype[@@toStringTag]` property
// https://tc39.es/ecma262/#sec-symbol.prototype-@@tostringtag
setToStringTag($Symbol, SYMBOL);

hiddenKeys[HIDDEN] = true;


/***/ }),

/***/ "./node_modules/core-js/modules/web.dom-collections.for-each.js":
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/modules/web.dom-collections.for-each.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var DOMIterables = __webpack_require__(/*! ../internals/dom-iterables */ "./node_modules/core-js/internals/dom-iterables.js");
var forEach = __webpack_require__(/*! ../internals/array-for-each */ "./node_modules/core-js/internals/array-for-each.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js/internals/create-non-enumerable-property.js");

for (var COLLECTION_NAME in DOMIterables) {
  var Collection = global[COLLECTION_NAME];
  var CollectionPrototype = Collection && Collection.prototype;
  // some Chrome versions have non-configurable methods on DOMTokenList
  if (CollectionPrototype && CollectionPrototype.forEach !== forEach) try {
    createNonEnumerableProperty(CollectionPrototype, 'forEach', forEach);
  } catch (error) {
    CollectionPrototype.forEach = forEach;
  }
}


/***/ }),

/***/ "./node_modules/core-js/modules/web.dom-collections.iterator.js":
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/modules/web.dom-collections.iterator.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var DOMIterables = __webpack_require__(/*! ../internals/dom-iterables */ "./node_modules/core-js/internals/dom-iterables.js");
var ArrayIteratorMethods = __webpack_require__(/*! ../modules/es.array.iterator */ "./node_modules/core-js/modules/es.array.iterator.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js/internals/create-non-enumerable-property.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

var ITERATOR = wellKnownSymbol('iterator');
var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var ArrayValues = ArrayIteratorMethods.values;

for (var COLLECTION_NAME in DOMIterables) {
  var Collection = global[COLLECTION_NAME];
  var CollectionPrototype = Collection && Collection.prototype;
  if (CollectionPrototype) {
    // some Chrome versions have non-configurable methods on DOMTokenList
    if (CollectionPrototype[ITERATOR] !== ArrayValues) try {
      createNonEnumerableProperty(CollectionPrototype, ITERATOR, ArrayValues);
    } catch (error) {
      CollectionPrototype[ITERATOR] = ArrayValues;
    }
    if (!CollectionPrototype[TO_STRING_TAG]) {
      createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
    }
    if (DOMIterables[COLLECTION_NAME]) for (var METHOD_NAME in ArrayIteratorMethods) {
      // some Chrome versions have non-configurable methods on DOMTokenList
      if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME]) try {
        createNonEnumerableProperty(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
      } catch (error) {
        CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
      }
    }
  }
}


/***/ }),

/***/ "./node_modules/core-js/modules/web.timers.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/web.timers.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var userAgent = __webpack_require__(/*! ../internals/engine-user-agent */ "./node_modules/core-js/internals/engine-user-agent.js");

var slice = [].slice;
var MSIE = /MSIE .\./.test(userAgent); // <- dirty ie9- check

var wrap = function (scheduler) {
  return function (handler, timeout /* , ...arguments */) {
    var boundArgs = arguments.length > 2;
    var args = boundArgs ? slice.call(arguments, 2) : undefined;
    return scheduler(boundArgs ? function () {
      // eslint-disable-next-line no-new-func -- spec requirement
      (typeof handler == 'function' ? handler : Function(handler)).apply(this, args);
    } : handler, timeout);
  };
};

// ie9- setTimeout & setInterval additional parameters fix
// https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timers
$({ global: true, bind: true, forced: MSIE }, {
  // `setTimeout` method
  // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-settimeout
  setTimeout: wrap(global.setTimeout),
  // `setInterval` method
  // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-setinterval
  setInterval: wrap(global.setInterval)
});


/***/ }),

/***/ "./node_modules/react-toastify/dist/ReactToastify.css":
/*!************************************************************!*\
  !*** ./node_modules/react-toastify/dist/ReactToastify.css ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./assets/admin/common/_pagination.scss":
/*!**********************************************!*\
  !*** ./assets/admin/common/_pagination.scss ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./assets/admin/common/index.scss":
/*!****************************************!*\
  !*** ./assets/admin/common/index.scss ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./assets/admin/common/table.scss":
/*!****************************************!*\
  !*** ./assets/admin/common/table.scss ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./assets/admin/components/StatusSwitcher/statusSwitcher.scss":
/*!********************************************************************!*\
  !*** ./assets/admin/components/StatusSwitcher/statusSwitcher.scss ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/preact/compat/dist/compat.module.js":
/*!**********************************************************!*\
  !*** ./node_modules/preact/compat/dist/compat.module.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Component": () => (/* reexport safe */ preact__WEBPACK_IMPORTED_MODULE_0__.Component),
/* harmony export */   "Fragment": () => (/* reexport safe */ preact__WEBPACK_IMPORTED_MODULE_0__.Fragment),
/* harmony export */   "createContext": () => (/* reexport safe */ preact__WEBPACK_IMPORTED_MODULE_0__.createContext),
/* harmony export */   "createElement": () => (/* reexport safe */ preact__WEBPACK_IMPORTED_MODULE_0__.createElement),
/* harmony export */   "createRef": () => (/* reexport safe */ preact__WEBPACK_IMPORTED_MODULE_0__.createRef),
/* harmony export */   "useCallback": () => (/* reexport safe */ preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useCallback),
/* harmony export */   "useContext": () => (/* reexport safe */ preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useContext),
/* harmony export */   "useDebugValue": () => (/* reexport safe */ preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useDebugValue),
/* harmony export */   "useEffect": () => (/* reexport safe */ preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect),
/* harmony export */   "useErrorBoundary": () => (/* reexport safe */ preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useErrorBoundary),
/* harmony export */   "useId": () => (/* reexport safe */ preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useId),
/* harmony export */   "useImperativeHandle": () => (/* reexport safe */ preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useImperativeHandle),
/* harmony export */   "useLayoutEffect": () => (/* reexport safe */ preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useLayoutEffect),
/* harmony export */   "useMemo": () => (/* reexport safe */ preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useMemo),
/* harmony export */   "useReducer": () => (/* reexport safe */ preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useReducer),
/* harmony export */   "useRef": () => (/* reexport safe */ preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useRef),
/* harmony export */   "useState": () => (/* reexport safe */ preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState),
/* harmony export */   "Children": () => (/* binding */ O),
/* harmony export */   "PureComponent": () => (/* binding */ w),
/* harmony export */   "StrictMode": () => (/* binding */ yn),
/* harmony export */   "Suspense": () => (/* binding */ U),
/* harmony export */   "SuspenseList": () => (/* binding */ V),
/* harmony export */   "__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED": () => (/* binding */ ln),
/* harmony export */   "cloneElement": () => (/* binding */ hn),
/* harmony export */   "createFactory": () => (/* binding */ fn),
/* harmony export */   "createPortal": () => (/* binding */ z),
/* harmony export */   "default": () => (/* binding */ wn),
/* harmony export */   "findDOMNode": () => (/* binding */ dn),
/* harmony export */   "flushSync": () => (/* binding */ mn),
/* harmony export */   "forwardRef": () => (/* binding */ k),
/* harmony export */   "hydrate": () => (/* binding */ J),
/* harmony export */   "isElement": () => (/* binding */ Cn),
/* harmony export */   "isFragment": () => (/* binding */ sn),
/* harmony export */   "isValidElement": () => (/* binding */ an),
/* harmony export */   "lazy": () => (/* binding */ M),
/* harmony export */   "memo": () => (/* binding */ x),
/* harmony export */   "render": () => (/* binding */ G),
/* harmony export */   "startTransition": () => (/* binding */ _n),
/* harmony export */   "unmountComponentAtNode": () => (/* binding */ vn),
/* harmony export */   "unstable_batchedUpdates": () => (/* binding */ pn),
/* harmony export */   "useDeferredValue": () => (/* binding */ bn),
/* harmony export */   "useInsertionEffect": () => (/* binding */ gn),
/* harmony export */   "useSyncExternalStore": () => (/* binding */ En),
/* harmony export */   "useTransition": () => (/* binding */ Sn),
/* harmony export */   "version": () => (/* binding */ cn)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
/* harmony import */ var preact_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! preact/hooks */ "./node_modules/preact/hooks/dist/hooks.module.js");
function g(n,t){for(var e in t)n[e]=t[e];return n}function C(n,t){for(var e in n)if("__source"!==e&&!(e in t))return!0;for(var r in t)if("__source"!==r&&n[r]!==t[r])return!0;return!1}function E(n,t){return n===t&&(0!==n||1/n==1/t)||n!=n&&t!=t}function w(n){this.props=n}function x(n,e){function r(n){var t=this.props.ref,r=t==n.ref;return!r&&t&&(t.call?t(null):t.current=null),e?!e(this.props,n)||!r:C(this.props,n)}function u(e){return this.shouldComponentUpdate=r,(0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)(n,e)}return u.displayName="Memo("+(n.displayName||n.name)+")",u.prototype.isReactComponent=!0,u.__f=!0,u}(w.prototype=new preact__WEBPACK_IMPORTED_MODULE_0__.Component).isPureReactComponent=!0,w.prototype.shouldComponentUpdate=function(n,t){return C(this.props,n)||C(this.state,t)};var R=preact__WEBPACK_IMPORTED_MODULE_0__.options.__b;preact__WEBPACK_IMPORTED_MODULE_0__.options.__b=function(n){n.type&&n.type.__f&&n.ref&&(n.props.ref=n.ref,n.ref=null),R&&R(n)};var N="undefined"!=typeof Symbol&&Symbol.for&&Symbol.for("react.forward_ref")||3911;function k(n){function t(t){var e=g({},t);return delete e.ref,n(e,t.ref||null)}return t.$$typeof=N,t.render=t,t.prototype.isReactComponent=t.__f=!0,t.displayName="ForwardRef("+(n.displayName||n.name)+")",t}var A=function(n,t){return null==n?null:(0,preact__WEBPACK_IMPORTED_MODULE_0__.toChildArray)((0,preact__WEBPACK_IMPORTED_MODULE_0__.toChildArray)(n).map(t))},O={map:A,forEach:A,count:function(n){return n?(0,preact__WEBPACK_IMPORTED_MODULE_0__.toChildArray)(n).length:0},only:function(n){var t=(0,preact__WEBPACK_IMPORTED_MODULE_0__.toChildArray)(n);if(1!==t.length)throw"Children.only";return t[0]},toArray:preact__WEBPACK_IMPORTED_MODULE_0__.toChildArray},T=preact__WEBPACK_IMPORTED_MODULE_0__.options.__e;preact__WEBPACK_IMPORTED_MODULE_0__.options.__e=function(n,t,e,r){if(n.then)for(var u,o=t;o=o.__;)if((u=o.__c)&&u.__c)return null==t.__e&&(t.__e=e.__e,t.__k=e.__k),u.__c(n,t);T(n,t,e,r)};var F=preact__WEBPACK_IMPORTED_MODULE_0__.options.unmount;function I(n,t,e){return n&&(n.__c&&n.__c.__H&&(n.__c.__H.__.forEach(function(n){"function"==typeof n.__c&&n.__c()}),n.__c.__H=null),null!=(n=g({},n)).__c&&(n.__c.__P===e&&(n.__c.__P=t),n.__c=null),n.__k=n.__k&&n.__k.map(function(n){return I(n,t,e)})),n}function L(n,t,e){return n&&(n.__v=null,n.__k=n.__k&&n.__k.map(function(n){return L(n,t,e)}),n.__c&&n.__c.__P===t&&(n.__e&&e.insertBefore(n.__e,n.__d),n.__c.__e=!0,n.__c.__P=e)),n}function U(){this.__u=0,this.t=null,this.__b=null}function D(n){var t=n.__.__c;return t&&t.__a&&t.__a(n)}function M(n){var e,r,u;function o(o){if(e||(e=n()).then(function(n){r=n.default||n},function(n){u=n}),u)throw u;if(!r)throw e;return (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)(r,o)}return o.displayName="Lazy",o.__f=!0,o}function V(){this.u=null,this.o=null}preact__WEBPACK_IMPORTED_MODULE_0__.options.unmount=function(n){var t=n.__c;t&&t.__R&&t.__R(),t&&!0===n.__h&&(n.type=null),F&&F(n)},(U.prototype=new preact__WEBPACK_IMPORTED_MODULE_0__.Component).__c=function(n,t){var e=t.__c,r=this;null==r.t&&(r.t=[]),r.t.push(e);var u=D(r.__v),o=!1,i=function(){o||(o=!0,e.__R=null,u?u(l):l())};e.__R=i;var l=function(){if(!--r.__u){if(r.state.__a){var n=r.state.__a;r.__v.__k[0]=L(n,n.__c.__P,n.__c.__O)}var t;for(r.setState({__a:r.__b=null});t=r.t.pop();)t.forceUpdate()}},c=!0===t.__h;r.__u++||c||r.setState({__a:r.__b=r.__v.__k[0]}),n.then(i,i)},U.prototype.componentWillUnmount=function(){this.t=[]},U.prototype.render=function(n,e){if(this.__b){if(this.__v.__k){var r=document.createElement("div"),o=this.__v.__k[0].__c;this.__v.__k[0]=I(this.__b,r,o.__O=o.__P)}this.__b=null}var i=e.__a&&(0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)(preact__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,n.fallback);return i&&(i.__h=null),[(0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)(preact__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,e.__a?null:n.children),i]};var W=function(n,t,e){if(++e[1]===e[0]&&n.o.delete(t),n.props.revealOrder&&("t"!==n.props.revealOrder[0]||!n.o.size))for(e=n.u;e;){for(;e.length>3;)e.pop()();if(e[1]<e[0])break;n.u=e=e[2]}};function P(n){return this.getChildContext=function(){return n.context},n.children}function j(n){var e=this,r=n.i;e.componentWillUnmount=function(){(0,preact__WEBPACK_IMPORTED_MODULE_0__.render)(null,e.l),e.l=null,e.i=null},e.i&&e.i!==r&&e.componentWillUnmount(),e.l||(e.i=r,e.l={nodeType:1,parentNode:r,childNodes:[],appendChild:function(n){this.childNodes.push(n),e.i.appendChild(n)},insertBefore:function(n,t){this.childNodes.push(n),e.i.appendChild(n)},removeChild:function(n){this.childNodes.splice(this.childNodes.indexOf(n)>>>1,1),e.i.removeChild(n)}}),(0,preact__WEBPACK_IMPORTED_MODULE_0__.render)((0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)(P,{context:e.context},n.__v),e.l)}function z(n,e){var r=(0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)(j,{__v:n,i:e});return r.containerInfo=e,r}(V.prototype=new preact__WEBPACK_IMPORTED_MODULE_0__.Component).__a=function(n){var t=this,e=D(t.__v),r=t.o.get(n);return r[0]++,function(u){var o=function(){t.props.revealOrder?(r.push(u),W(t,n,r)):u()};e?e(o):o()}},V.prototype.render=function(n){this.u=null,this.o=new Map;var t=(0,preact__WEBPACK_IMPORTED_MODULE_0__.toChildArray)(n.children);n.revealOrder&&"b"===n.revealOrder[0]&&t.reverse();for(var e=t.length;e--;)this.o.set(t[e],this.u=[1,0,this.u]);return n.children},V.prototype.componentDidUpdate=V.prototype.componentDidMount=function(){var n=this;this.o.forEach(function(t,e){W(n,e,t)})};var B="undefined"!=typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103,H=/^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/,Z=/^on(Ani|Tra|Tou|BeforeInp|Compo)/,Y=/[A-Z0-9]/g,$="undefined"!=typeof document,q=function(n){return("undefined"!=typeof Symbol&&"symbol"==typeof Symbol()?/fil|che|rad/:/fil|che|ra/).test(n)};function G(n,t,e){return null==t.__k&&(t.textContent=""),(0,preact__WEBPACK_IMPORTED_MODULE_0__.render)(n,t),"function"==typeof e&&e(),n?n.__c:null}function J(n,t,e){return (0,preact__WEBPACK_IMPORTED_MODULE_0__.hydrate)(n,t),"function"==typeof e&&e(),n?n.__c:null}preact__WEBPACK_IMPORTED_MODULE_0__.Component.prototype.isReactComponent={},["componentWillMount","componentWillReceiveProps","componentWillUpdate"].forEach(function(t){Object.defineProperty(preact__WEBPACK_IMPORTED_MODULE_0__.Component.prototype,t,{configurable:!0,get:function(){return this["UNSAFE_"+t]},set:function(n){Object.defineProperty(this,t,{configurable:!0,writable:!0,value:n})}})});var K=preact__WEBPACK_IMPORTED_MODULE_0__.options.event;function Q(){}function X(){return this.cancelBubble}function nn(){return this.defaultPrevented}preact__WEBPACK_IMPORTED_MODULE_0__.options.event=function(n){return K&&(n=K(n)),n.persist=Q,n.isPropagationStopped=X,n.isDefaultPrevented=nn,n.nativeEvent=n};var tn,en={enumerable:!1,configurable:!0,get:function(){return this.class}},rn=preact__WEBPACK_IMPORTED_MODULE_0__.options.vnode;preact__WEBPACK_IMPORTED_MODULE_0__.options.vnode=function(n){"string"==typeof n.type&&function(n){var t=n.props,e=n.type,u={};for(var o in t){var i=t[o];if(!("value"===o&&"defaultValue"in t&&null==i||$&&"children"===o&&"noscript"===e||"class"===o||"className"===o)){var l=o.toLowerCase();"defaultValue"===o&&"value"in t&&null==t.value?o="value":"download"===o&&!0===i?i="":"ondoubleclick"===l?o="ondblclick":"onchange"!==l||"input"!==e&&"textarea"!==e||q(t.type)?"onfocus"===l?o="onfocusin":"onblur"===l?o="onfocusout":Z.test(o)?o=l:-1===e.indexOf("-")&&H.test(o)?o=o.replace(Y,"-$&").toLowerCase():null===i&&(i=void 0):l=o="oninput","oninput"===l&&u[o=l]&&(o="oninputCapture"),u[o]=i}}"select"==e&&u.multiple&&Array.isArray(u.value)&&(u.value=(0,preact__WEBPACK_IMPORTED_MODULE_0__.toChildArray)(t.children).forEach(function(n){n.props.selected=-1!=u.value.indexOf(n.props.value)})),"select"==e&&null!=u.defaultValue&&(u.value=(0,preact__WEBPACK_IMPORTED_MODULE_0__.toChildArray)(t.children).forEach(function(n){n.props.selected=u.multiple?-1!=u.defaultValue.indexOf(n.props.value):u.defaultValue==n.props.value})),t.class&&!t.className?(u.class=t.class,Object.defineProperty(u,"className",en)):(t.className&&!t.class||t.class&&t.className)&&(u.class=u.className=t.className),n.props=u}(n),n.$$typeof=B,rn&&rn(n)};var un=preact__WEBPACK_IMPORTED_MODULE_0__.options.__r;preact__WEBPACK_IMPORTED_MODULE_0__.options.__r=function(n){un&&un(n),tn=n.__c};var on=preact__WEBPACK_IMPORTED_MODULE_0__.options.diffed;preact__WEBPACK_IMPORTED_MODULE_0__.options.diffed=function(n){on&&on(n);var t=n.props,e=n.__e;null!=e&&"textarea"===n.type&&"value"in t&&t.value!==e.value&&(e.value=null==t.value?"":t.value),tn=null};var ln={ReactCurrentDispatcher:{current:{readContext:function(n){return tn.__n[n.__c].props.value}}}},cn="17.0.2";function fn(n){return preact__WEBPACK_IMPORTED_MODULE_0__.createElement.bind(null,n)}function an(n){return!!n&&n.$$typeof===B}function sn(n){return an(n)&&n.type===preact__WEBPACK_IMPORTED_MODULE_0__.Fragment}function hn(n){return an(n)?preact__WEBPACK_IMPORTED_MODULE_0__.cloneElement.apply(null,arguments):n}function vn(n){return!!n.__k&&((0,preact__WEBPACK_IMPORTED_MODULE_0__.render)(null,n),!0)}function dn(n){return n&&(n.base||1===n.nodeType&&n)||null}var pn=function(n,t){return n(t)},mn=function(n,t){return n(t)},yn=preact__WEBPACK_IMPORTED_MODULE_0__.Fragment;function _n(n){n()}function bn(n){return n}function Sn(){return[!1,_n]}var gn=preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useLayoutEffect,Cn=an;function En(n,t){var e=t(),r=(0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)({h:{__:e,v:t}}),u=r[0].h,o=r[1];return (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useLayoutEffect)(function(){u.__=e,u.v=t,E(u.__,t())||o({h:u})},[n,e,t]),(0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function(){return E(u.__,u.v())||o({h:u}),n(function(){E(u.__,u.v())||o({h:u})})},[n]),e}var wn={useState:preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState,useId:preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useId,useReducer:preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useReducer,useEffect:preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect,useLayoutEffect:preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useLayoutEffect,useInsertionEffect:gn,useTransition:Sn,useDeferredValue:bn,useSyncExternalStore:En,startTransition:_n,useRef:preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useRef,useImperativeHandle:preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useImperativeHandle,useMemo:preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useMemo,useCallback:preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useCallback,useContext:preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useContext,useDebugValue:preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useDebugValue,version:"17.0.2",Children:O,render:G,hydrate:J,unmountComponentAtNode:vn,createPortal:z,createElement:preact__WEBPACK_IMPORTED_MODULE_0__.createElement,createContext:preact__WEBPACK_IMPORTED_MODULE_0__.createContext,createFactory:fn,cloneElement:hn,createRef:preact__WEBPACK_IMPORTED_MODULE_0__.createRef,Fragment:preact__WEBPACK_IMPORTED_MODULE_0__.Fragment,isValidElement:an,isElement:Cn,isFragment:sn,findDOMNode:dn,Component:preact__WEBPACK_IMPORTED_MODULE_0__.Component,PureComponent:w,memo:x,forwardRef:k,flushSync:mn,unstable_batchedUpdates:pn,StrictMode:yn,Suspense:U,SuspenseList:V,lazy:M,__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:ln};
//# sourceMappingURL=compat.module.js.map


/***/ }),

/***/ "./node_modules/preact/dist/preact.module.js":
/*!***************************************************!*\
  !*** ./node_modules/preact/dist/preact.module.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Component": () => (/* binding */ b),
/* harmony export */   "Fragment": () => (/* binding */ k),
/* harmony export */   "cloneElement": () => (/* binding */ F),
/* harmony export */   "createContext": () => (/* binding */ G),
/* harmony export */   "createElement": () => (/* binding */ y),
/* harmony export */   "createRef": () => (/* binding */ _),
/* harmony export */   "h": () => (/* binding */ y),
/* harmony export */   "hydrate": () => (/* binding */ E),
/* harmony export */   "isValidElement": () => (/* binding */ t),
/* harmony export */   "options": () => (/* binding */ l),
/* harmony export */   "render": () => (/* binding */ D),
/* harmony export */   "toChildArray": () => (/* binding */ C)
/* harmony export */ });
var n,l,u,t,i,o,r,f,e,c={},s=[],a=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,h=Array.isArray;function v(n,l){for(var u in l)n[u]=l[u];return n}function p(n){var l=n.parentNode;l&&l.removeChild(n)}function y(l,u,t){var i,o,r,f={};for(r in u)"key"==r?i=u[r]:"ref"==r?o=u[r]:f[r]=u[r];if(arguments.length>2&&(f.children=arguments.length>3?n.call(arguments,2):t),"function"==typeof l&&null!=l.defaultProps)for(r in l.defaultProps)void 0===f[r]&&(f[r]=l.defaultProps[r]);return d(l,f,i,o,null)}function d(n,t,i,o,r){var f={type:n,props:t,key:i,ref:o,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:null==r?++u:r};return null==r&&null!=l.vnode&&l.vnode(f),f}function _(){return{current:null}}function k(n){return n.children}function b(n,l){this.props=n,this.context=l}function g(n,l){if(null==l)return n.__?g(n.__,n.__.__k.indexOf(n)+1):null;for(var u;l<n.__k.length;l++)if(null!=(u=n.__k[l])&&null!=u.__e)return u.__e;return"function"==typeof n.type?g(n):null}function m(n){var l,u;if(null!=(n=n.__)&&null!=n.__c){for(n.__e=n.__c.base=null,l=0;l<n.__k.length;l++)if(null!=(u=n.__k[l])&&null!=u.__e){n.__e=n.__c.base=u.__e;break}return m(n)}}function w(n){(!n.__d&&(n.__d=!0)&&i.push(n)&&!x.__r++||o!==l.debounceRendering)&&((o=l.debounceRendering)||r)(x)}function x(){var n,l,u,t,o,r,e,c,s;for(i.sort(f);n=i.shift();)n.__d&&(l=i.length,t=void 0,o=void 0,r=void 0,c=(e=(u=n).__v).__e,(s=u.__P)&&(t=[],o=[],(r=v({},e)).__v=e.__v+1,L(s,e,r,u.__n,void 0!==s.ownerSVGElement,null!=e.__h?[c]:null,t,null==c?g(e):c,e.__h,o),M(t,e,o),e.__e!=c&&m(e)),i.length>l&&i.sort(f));x.__r=0}function P(n,l,u,t,i,o,r,f,e,a,v){var p,y,_,b,m,w,x,P,C,H=0,I=t&&t.__k||s,T=I.length,j=T,z=l.length;for(u.__k=[],p=0;p<z;p++)null!=(b=u.__k[p]=null==(b=l[p])||"boolean"==typeof b||"function"==typeof b?null:"string"==typeof b||"number"==typeof b||"bigint"==typeof b?d(null,b,null,null,b):h(b)?d(k,{children:b},null,null,null):b.__b>0?d(b.type,b.props,b.key,b.ref?b.ref:null,b.__v):b)?(b.__=u,b.__b=u.__b+1,-1===(P=A(b,I,x=p+H,j))?_=c:(_=I[P]||c,I[P]=void 0,j--),L(n,b,_,i,o,r,f,e,a,v),m=b.__e,(y=b.ref)&&_.ref!=y&&(_.ref&&O(_.ref,null,b),v.push(y,b.__c||m,b)),null!=m&&(null==w&&(w=m),(C=_===c||null===_.__v)?-1==P&&H--:P!==x&&(P===x+1?H++:P>x?j>z-x?H+=P-x:H--:H=P<x&&P==x-1?P-x:0),x=p+H,"function"!=typeof b.type||P===x&&_.__k!==b.__k?"function"==typeof b.type||P===x&&!C?void 0!==b.__d?(e=b.__d,b.__d=void 0):e=m.nextSibling:e=S(n,m,e):e=$(b,e,n),"function"==typeof u.type&&(u.__d=e))):(_=I[p])&&null==_.key&&_.__e&&(_.__e==e&&(e=g(_)),q(_,_,!1),I[p]=null);for(u.__e=w,p=T;p--;)null!=I[p]&&("function"==typeof u.type&&null!=I[p].__e&&I[p].__e==u.__d&&(u.__d=I[p].__e.nextSibling),q(I[p],I[p]))}function $(n,l,u){for(var t,i=n.__k,o=0;i&&o<i.length;o++)(t=i[o])&&(t.__=n,l="function"==typeof t.type?$(t,l,u):S(u,t.__e,l));return l}function C(n,l){return l=l||[],null==n||"boolean"==typeof n||(h(n)?n.some(function(n){C(n,l)}):l.push(n)),l}function S(n,l,u){return null==u||u.parentNode!==n?n.insertBefore(l,null):l==u&&null!=l.parentNode||n.insertBefore(l,u),l.nextSibling}function A(n,l,u,t){var i=n.key,o=n.type,r=u-1,f=u+1,e=l[u];if(null===e||e&&i==e.key&&o===e.type)return u;if(t>(null!=e?1:0))for(;r>=0||f<l.length;){if(r>=0){if((e=l[r])&&i==e.key&&o===e.type)return r;r--}if(f<l.length){if((e=l[f])&&i==e.key&&o===e.type)return f;f++}}return-1}function H(n,l,u,t,i){var o;for(o in u)"children"===o||"key"===o||o in l||T(n,o,null,u[o],t);for(o in l)i&&"function"!=typeof l[o]||"children"===o||"key"===o||"value"===o||"checked"===o||u[o]===l[o]||T(n,o,l[o],u[o],t)}function I(n,l,u){"-"===l[0]?n.setProperty(l,null==u?"":u):n[l]=null==u?"":"number"!=typeof u||a.test(l)?u:u+"px"}function T(n,l,u,t,i){var o;n:if("style"===l)if("string"==typeof u)n.style.cssText=u;else{if("string"==typeof t&&(n.style.cssText=t=""),t)for(l in t)u&&l in u||I(n.style,l,"");if(u)for(l in u)t&&u[l]===t[l]||I(n.style,l,u[l])}else if("o"===l[0]&&"n"===l[1])o=l!==(l=l.replace(/(PointerCapture)$|Capture$/,"$1")),l=l.toLowerCase()in n?l.toLowerCase().slice(2):l.slice(2),n.l||(n.l={}),n.l[l+o]=u,u?t||n.addEventListener(l,o?z:j,o):n.removeEventListener(l,o?z:j,o);else if("dangerouslySetInnerHTML"!==l){if(i)l=l.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if("width"!==l&&"height"!==l&&"href"!==l&&"list"!==l&&"form"!==l&&"tabIndex"!==l&&"download"!==l&&"rowSpan"!==l&&"colSpan"!==l&&l in n)try{n[l]=null==u?"":u;break n}catch(n){}"function"==typeof u||(null==u||!1===u&&"-"!==l[4]?n.removeAttribute(l):n.setAttribute(l,u))}}function j(n){return this.l[n.type+!1](l.event?l.event(n):n)}function z(n){return this.l[n.type+!0](l.event?l.event(n):n)}function L(n,u,t,i,o,r,f,e,c,s){var a,p,y,d,_,g,m,w,x,$,C,S,A,H,I,T=u.type;if(void 0!==u.constructor)return null;null!=t.__h&&(c=t.__h,e=u.__e=t.__e,u.__h=null,r=[e]),(a=l.__b)&&a(u);n:if("function"==typeof T)try{if(w=u.props,x=(a=T.contextType)&&i[a.__c],$=a?x?x.props.value:a.__:i,t.__c?m=(p=u.__c=t.__c).__=p.__E:("prototype"in T&&T.prototype.render?u.__c=p=new T(w,$):(u.__c=p=new b(w,$),p.constructor=T,p.render=B),x&&x.sub(p),p.props=w,p.state||(p.state={}),p.context=$,p.__n=i,y=p.__d=!0,p.__h=[],p._sb=[]),null==p.__s&&(p.__s=p.state),null!=T.getDerivedStateFromProps&&(p.__s==p.state&&(p.__s=v({},p.__s)),v(p.__s,T.getDerivedStateFromProps(w,p.__s))),d=p.props,_=p.state,p.__v=u,y)null==T.getDerivedStateFromProps&&null!=p.componentWillMount&&p.componentWillMount(),null!=p.componentDidMount&&p.__h.push(p.componentDidMount);else{if(null==T.getDerivedStateFromProps&&w!==d&&null!=p.componentWillReceiveProps&&p.componentWillReceiveProps(w,$),!p.__e&&(null!=p.shouldComponentUpdate&&!1===p.shouldComponentUpdate(w,p.__s,$)||u.__v===t.__v)){for(u.__v!==t.__v&&(p.props=w,p.state=p.__s,p.__d=!1),u.__e=t.__e,u.__k=t.__k,u.__k.forEach(function(n){n&&(n.__=u)}),C=0;C<p._sb.length;C++)p.__h.push(p._sb[C]);p._sb=[],p.__h.length&&f.push(p);break n}null!=p.componentWillUpdate&&p.componentWillUpdate(w,p.__s,$),null!=p.componentDidUpdate&&p.__h.push(function(){p.componentDidUpdate(d,_,g)})}if(p.context=$,p.props=w,p.__P=n,p.__e=!1,S=l.__r,A=0,"prototype"in T&&T.prototype.render){for(p.state=p.__s,p.__d=!1,S&&S(u),a=p.render(p.props,p.state,p.context),H=0;H<p._sb.length;H++)p.__h.push(p._sb[H]);p._sb=[]}else do{p.__d=!1,S&&S(u),a=p.render(p.props,p.state,p.context),p.state=p.__s}while(p.__d&&++A<25);p.state=p.__s,null!=p.getChildContext&&(i=v(v({},i),p.getChildContext())),y||null==p.getSnapshotBeforeUpdate||(g=p.getSnapshotBeforeUpdate(d,_)),P(n,h(I=null!=a&&a.type===k&&null==a.key?a.props.children:a)?I:[I],u,t,i,o,r,f,e,c,s),p.base=u.__e,u.__h=null,p.__h.length&&f.push(p),m&&(p.__E=p.__=null)}catch(n){u.__v=null,(c||null!=r)&&(u.__e=e,u.__h=!!c,r[r.indexOf(e)]=null),l.__e(n,u,t)}else null==r&&u.__v===t.__v?(u.__k=t.__k,u.__e=t.__e):u.__e=N(t.__e,u,t,i,o,r,f,c,s);(a=l.diffed)&&a(u)}function M(n,u,t){for(var i=0;i<t.length;i++)O(t[i],t[++i],t[++i]);l.__c&&l.__c(u,n),n.some(function(u){try{n=u.__h,u.__h=[],n.some(function(n){n.call(u)})}catch(n){l.__e(n,u.__v)}})}function N(l,u,t,i,o,r,f,e,s){var a,v,y,d=t.props,_=u.props,k=u.type,b=0;if("svg"===k&&(o=!0),null!=r)for(;b<r.length;b++)if((a=r[b])&&"setAttribute"in a==!!k&&(k?a.localName===k:3===a.nodeType)){l=a,r[b]=null;break}if(null==l){if(null===k)return document.createTextNode(_);l=o?document.createElementNS("http://www.w3.org/2000/svg",k):document.createElement(k,_.is&&_),r=null,e=!1}if(null===k)d===_||e&&l.data===_||(l.data=_);else{if(r=r&&n.call(l.childNodes),v=(d=t.props||c).dangerouslySetInnerHTML,y=_.dangerouslySetInnerHTML,!e){if(null!=r)for(d={},b=0;b<l.attributes.length;b++)d[l.attributes[b].name]=l.attributes[b].value;(y||v)&&(y&&(v&&y.__html==v.__html||y.__html===l.innerHTML)||(l.innerHTML=y&&y.__html||""))}if(H(l,_,d,o,e),y)u.__k=[];else if(P(l,h(b=u.props.children)?b:[b],u,t,i,o&&"foreignObject"!==k,r,f,r?r[0]:t.__k&&g(t,0),e,s),null!=r)for(b=r.length;b--;)null!=r[b]&&p(r[b]);e||("value"in _&&void 0!==(b=_.value)&&(b!==l.value||"progress"===k&&!b||"option"===k&&b!==d.value)&&T(l,"value",b,d.value,!1),"checked"in _&&void 0!==(b=_.checked)&&b!==l.checked&&T(l,"checked",b,d.checked,!1))}return l}function O(n,u,t){try{"function"==typeof n?n(u):n.current=u}catch(n){l.__e(n,t)}}function q(n,u,t){var i,o;if(l.unmount&&l.unmount(n),(i=n.ref)&&(i.current&&i.current!==n.__e||O(i,null,u)),null!=(i=n.__c)){if(i.componentWillUnmount)try{i.componentWillUnmount()}catch(n){l.__e(n,u)}i.base=i.__P=null,n.__c=void 0}if(i=n.__k)for(o=0;o<i.length;o++)i[o]&&q(i[o],u,t||"function"!=typeof n.type);t||null==n.__e||p(n.__e),n.__=n.__e=n.__d=void 0}function B(n,l,u){return this.constructor(n,u)}function D(u,t,i){var o,r,f,e;l.__&&l.__(u,t),r=(o="function"==typeof i)?null:i&&i.__k||t.__k,f=[],e=[],L(t,u=(!o&&i||t).__k=y(k,null,[u]),r||c,c,void 0!==t.ownerSVGElement,!o&&i?[i]:r?null:t.firstChild?n.call(t.childNodes):null,f,!o&&i?i:r?r.__e:t.firstChild,o,e),M(f,u,e)}function E(n,l){D(n,l,E)}function F(l,u,t){var i,o,r,f,e=v({},l.props);for(r in l.type&&l.type.defaultProps&&(f=l.type.defaultProps),u)"key"==r?i=u[r]:"ref"==r?o=u[r]:e[r]=void 0===u[r]&&void 0!==f?f[r]:u[r];return arguments.length>2&&(e.children=arguments.length>3?n.call(arguments,2):t),d(l.type,e,i||l.key,o||l.ref,null)}function G(n,l){var u={__c:l="__cC"+e++,__:n,Consumer:function(n,l){return n.children(l)},Provider:function(n){var u,t;return this.getChildContext||(u=[],(t={})[l]=this,this.getChildContext=function(){return t},this.shouldComponentUpdate=function(n){this.props.value!==n.value&&u.some(function(n){n.__e=!0,w(n)})},this.sub=function(n){u.push(n);var l=n.componentWillUnmount;n.componentWillUnmount=function(){u.splice(u.indexOf(n),1),l&&l.call(n)}}),n.children}};return u.Provider.__=u.Consumer.contextType=u}n=s.slice,l={__e:function(n,l,u,t){for(var i,o,r;l=l.__;)if((i=l.__c)&&!i.__)try{if((o=i.constructor)&&null!=o.getDerivedStateFromError&&(i.setState(o.getDerivedStateFromError(n)),r=i.__d),null!=i.componentDidCatch&&(i.componentDidCatch(n,t||{}),r=i.__d),r)return i.__E=i}catch(l){n=l}throw n}},u=0,t=function(n){return null!=n&&void 0===n.constructor},b.prototype.setState=function(n,l){var u;u=null!=this.__s&&this.__s!==this.state?this.__s:this.__s=v({},this.state),"function"==typeof n&&(n=n(v({},u),this.props)),n&&v(u,n),null!=n&&this.__v&&(l&&this._sb.push(l),w(this))},b.prototype.forceUpdate=function(n){this.__v&&(this.__e=!0,n&&this.__h.push(n),w(this))},b.prototype.render=k,i=[],r="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,f=function(n,l){return n.__v.__b-l.__v.__b},x.__r=0,e=0;
//# sourceMappingURL=preact.module.js.map


/***/ }),

/***/ "./node_modules/preact/hooks/dist/hooks.module.js":
/*!********************************************************!*\
  !*** ./node_modules/preact/hooks/dist/hooks.module.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useCallback": () => (/* binding */ T),
/* harmony export */   "useContext": () => (/* binding */ q),
/* harmony export */   "useDebugValue": () => (/* binding */ x),
/* harmony export */   "useEffect": () => (/* binding */ p),
/* harmony export */   "useErrorBoundary": () => (/* binding */ P),
/* harmony export */   "useId": () => (/* binding */ V),
/* harmony export */   "useImperativeHandle": () => (/* binding */ A),
/* harmony export */   "useLayoutEffect": () => (/* binding */ y),
/* harmony export */   "useMemo": () => (/* binding */ F),
/* harmony export */   "useReducer": () => (/* binding */ s),
/* harmony export */   "useRef": () => (/* binding */ _),
/* harmony export */   "useState": () => (/* binding */ h)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
var t,r,u,i,o=0,f=[],c=[],e=preact__WEBPACK_IMPORTED_MODULE_0__.options.__b,a=preact__WEBPACK_IMPORTED_MODULE_0__.options.__r,v=preact__WEBPACK_IMPORTED_MODULE_0__.options.diffed,l=preact__WEBPACK_IMPORTED_MODULE_0__.options.__c,m=preact__WEBPACK_IMPORTED_MODULE_0__.options.unmount;function d(t,u){preact__WEBPACK_IMPORTED_MODULE_0__.options.__h&&preact__WEBPACK_IMPORTED_MODULE_0__.options.__h(r,t,o||u),o=0;var i=r.__H||(r.__H={__:[],__h:[]});return t>=i.__.length&&i.__.push({__V:c}),i.__[t]}function h(n){return o=1,s(B,n)}function s(n,u,i){var o=d(t++,2);if(o.t=n,!o.__c&&(o.__=[i?i(u):B(void 0,u),function(n){var t=o.__N?o.__N[0]:o.__[0],r=o.t(t,n);t!==r&&(o.__N=[r,o.__[1]],o.__c.setState({}))}],o.__c=r,!r.u)){var f=function(n,t,r){if(!o.__c.__H)return!0;var u=o.__c.__H.__.filter(function(n){return n.__c});if(u.every(function(n){return!n.__N}))return!c||c.call(this,n,t,r);var i=!1;return u.forEach(function(n){if(n.__N){var t=n.__[0];n.__=n.__N,n.__N=void 0,t!==n.__[0]&&(i=!0)}}),!(!i&&o.__c.props===n)&&(!c||c.call(this,n,t,r))};r.u=!0;var c=r.shouldComponentUpdate,e=r.componentWillUpdate;r.componentWillUpdate=function(n,t,r){if(this.__e){var u=c;c=void 0,f(n,t,r),c=u}e&&e.call(this,n,t,r)},r.shouldComponentUpdate=f}return o.__N||o.__}function p(u,i){var o=d(t++,3);!preact__WEBPACK_IMPORTED_MODULE_0__.options.__s&&z(o.__H,i)&&(o.__=u,o.i=i,r.__H.__h.push(o))}function y(u,i){var o=d(t++,4);!preact__WEBPACK_IMPORTED_MODULE_0__.options.__s&&z(o.__H,i)&&(o.__=u,o.i=i,r.__h.push(o))}function _(n){return o=5,F(function(){return{current:n}},[])}function A(n,t,r){o=6,y(function(){return"function"==typeof n?(n(t()),function(){return n(null)}):n?(n.current=t(),function(){return n.current=null}):void 0},null==r?r:r.concat(n))}function F(n,r){var u=d(t++,7);return z(u.__H,r)?(u.__V=n(),u.i=r,u.__h=n,u.__V):u.__}function T(n,t){return o=8,F(function(){return n},t)}function q(n){var u=r.context[n.__c],i=d(t++,9);return i.c=n,u?(null==i.__&&(i.__=!0,u.sub(r)),u.props.value):n.__}function x(t,r){preact__WEBPACK_IMPORTED_MODULE_0__.options.useDebugValue&&preact__WEBPACK_IMPORTED_MODULE_0__.options.useDebugValue(r?r(t):t)}function P(n){var u=d(t++,10),i=h();return u.__=n,r.componentDidCatch||(r.componentDidCatch=function(n,t){u.__&&u.__(n,t),i[1](n)}),[i[0],function(){i[1](void 0)}]}function V(){var n=d(t++,11);if(!n.__){for(var u=r.__v;null!==u&&!u.__m&&null!==u.__;)u=u.__;var i=u.__m||(u.__m=[0,0]);n.__="P"+i[0]+"-"+i[1]++}return n.__}function b(){for(var t;t=f.shift();)if(t.__P&&t.__H)try{t.__H.__h.forEach(k),t.__H.__h.forEach(w),t.__H.__h=[]}catch(r){t.__H.__h=[],preact__WEBPACK_IMPORTED_MODULE_0__.options.__e(r,t.__v)}}preact__WEBPACK_IMPORTED_MODULE_0__.options.__b=function(n){r=null,e&&e(n)},preact__WEBPACK_IMPORTED_MODULE_0__.options.__r=function(n){a&&a(n),t=0;var i=(r=n.__c).__H;i&&(u===r?(i.__h=[],r.__h=[],i.__.forEach(function(n){n.__N&&(n.__=n.__N),n.__V=c,n.__N=n.i=void 0})):(i.__h.forEach(k),i.__h.forEach(w),i.__h=[],t=0)),u=r},preact__WEBPACK_IMPORTED_MODULE_0__.options.diffed=function(t){v&&v(t);var o=t.__c;o&&o.__H&&(o.__H.__h.length&&(1!==f.push(o)&&i===preact__WEBPACK_IMPORTED_MODULE_0__.options.requestAnimationFrame||((i=preact__WEBPACK_IMPORTED_MODULE_0__.options.requestAnimationFrame)||j)(b)),o.__H.__.forEach(function(n){n.i&&(n.__H=n.i),n.__V!==c&&(n.__=n.__V),n.i=void 0,n.__V=c})),u=r=null},preact__WEBPACK_IMPORTED_MODULE_0__.options.__c=function(t,r){r.some(function(t){try{t.__h.forEach(k),t.__h=t.__h.filter(function(n){return!n.__||w(n)})}catch(u){r.some(function(n){n.__h&&(n.__h=[])}),r=[],preact__WEBPACK_IMPORTED_MODULE_0__.options.__e(u,t.__v)}}),l&&l(t,r)},preact__WEBPACK_IMPORTED_MODULE_0__.options.unmount=function(t){m&&m(t);var r,u=t.__c;u&&u.__H&&(u.__H.__.forEach(function(n){try{k(n)}catch(n){r=n}}),u.__H=void 0,r&&preact__WEBPACK_IMPORTED_MODULE_0__.options.__e(r,u.__v))};var g="function"==typeof requestAnimationFrame;function j(n){var t,r=function(){clearTimeout(u),g&&cancelAnimationFrame(t),setTimeout(n)},u=setTimeout(r,100);g&&(t=requestAnimationFrame(r))}function k(n){var t=r,u=n.__c;"function"==typeof u&&(n.__c=void 0,u()),r=t}function w(n){var t=r;n.__c=n.__(),r=t}function z(n,t){return!n||n.length!==t.length||t.some(function(t,r){return t!==n[r]})}function B(n,t){return"function"==typeof t?t(n):t}
//# sourceMappingURL=hooks.module.js.map


/***/ }),

/***/ "./node_modules/react-toastify/dist/react-toastify.esm.mjs":
/*!*****************************************************************!*\
  !*** ./node_modules/react-toastify/dist/react-toastify.esm.mjs ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Bounce": () => (/* binding */ R),
/* harmony export */   "Flip": () => (/* binding */ $),
/* harmony export */   "Icons": () => (/* binding */ E),
/* harmony export */   "Slide": () => (/* binding */ w),
/* harmony export */   "ToastContainer": () => (/* binding */ k),
/* harmony export */   "Zoom": () => (/* binding */ x),
/* harmony export */   "collapseToast": () => (/* binding */ g),
/* harmony export */   "cssTransition": () => (/* binding */ h),
/* harmony export */   "toast": () => (/* binding */ Q),
/* harmony export */   "useToast": () => (/* binding */ _),
/* harmony export */   "useToastContainer": () => (/* binding */ C)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.m.js");
'use client';
const u=t=>"number"==typeof t&&!isNaN(t),d=t=>"string"==typeof t,p=t=>"function"==typeof t,m=t=>d(t)||p(t)?t:null,f=t=>(0,react__WEBPACK_IMPORTED_MODULE_0__.isValidElement)(t)||d(t)||p(t)||u(t);function g(t,e,n){void 0===n&&(n=300);const{scrollHeight:o,style:s}=t;requestAnimationFrame(()=>{s.minHeight="initial",s.height=o+"px",s.transition=`all ${n}ms`,requestAnimationFrame(()=>{s.height="0",s.padding="0",s.margin="0",setTimeout(e,n)})})}function h(e){let{enter:a,exit:r,appendPosition:i=!1,collapse:l=!0,collapseDuration:c=300}=e;return function(e){let{children:u,position:d,preventExitTransition:p,done:m,nodeRef:f,isIn:h}=e;const y=i?`${a}--${d}`:a,v=i?`${r}--${d}`:r,T=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(0);return (0,react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect)(()=>{const t=f.current,e=y.split(" "),n=o=>{o.target===f.current&&(t.dispatchEvent(new Event("d")),t.removeEventListener("animationend",n),t.removeEventListener("animationcancel",n),0===T.current&&"animationcancel"!==o.type&&t.classList.remove(...e))};t.classList.add(...e),t.addEventListener("animationend",n),t.addEventListener("animationcancel",n)},[]),(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{const t=f.current,e=()=>{t.removeEventListener("animationend",e),l?g(t,m,c):m()};h||(p?e():(T.current=1,t.className+=` ${v}`,t.addEventListener("animationend",e)))},[h]),react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(react__WEBPACK_IMPORTED_MODULE_0__.default.Fragment,null,u)}}function y(t,e){return null!=t?{content:t.content,containerId:t.props.containerId,id:t.props.toastId,theme:t.props.theme,type:t.props.type,data:t.props.data||{},isLoading:t.props.isLoading,icon:t.props.icon,status:e}:{}}const v={list:new Map,emitQueue:new Map,on(t,e){return this.list.has(t)||this.list.set(t,[]),this.list.get(t).push(e),this},off(t,e){if(e){const n=this.list.get(t).filter(t=>t!==e);return this.list.set(t,n),this}return this.list.delete(t),this},cancelEmit(t){const e=this.emitQueue.get(t);return e&&(e.forEach(clearTimeout),this.emitQueue.delete(t)),this},emit(t){this.list.has(t)&&this.list.get(t).forEach(e=>{const n=setTimeout(()=>{e(...[].slice.call(arguments,1))},0);this.emitQueue.has(t)||this.emitQueue.set(t,[]),this.emitQueue.get(t).push(n)})}},T=e=>{let{theme:n,type:o,...s}=e;return react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("svg",{viewBox:"0 0 24 24",width:"100%",height:"100%",fill:"colored"===n?"currentColor":`var(--toastify-icon-color-${o})`,...s})},E={info:function(e){return react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(T,{...e},react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("path",{d:"M12 0a12 12 0 1012 12A12.013 12.013 0 0012 0zm.25 5a1.5 1.5 0 11-1.5 1.5 1.5 1.5 0 011.5-1.5zm2.25 13.5h-4a1 1 0 010-2h.75a.25.25 0 00.25-.25v-4.5a.25.25 0 00-.25-.25h-.75a1 1 0 010-2h1a2 2 0 012 2v4.75a.25.25 0 00.25.25h.75a1 1 0 110 2z"}))},warning:function(e){return react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(T,{...e},react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("path",{d:"M23.32 17.191L15.438 2.184C14.728.833 13.416 0 11.996 0c-1.42 0-2.733.833-3.443 2.184L.533 17.448a4.744 4.744 0 000 4.368C1.243 23.167 2.555 24 3.975 24h16.05C22.22 24 24 22.044 24 19.632c0-.904-.251-1.746-.68-2.44zm-9.622 1.46c0 1.033-.724 1.823-1.698 1.823s-1.698-.79-1.698-1.822v-.043c0-1.028.724-1.822 1.698-1.822s1.698.79 1.698 1.822v.043zm.039-12.285l-.84 8.06c-.057.581-.408.943-.897.943-.49 0-.84-.367-.896-.942l-.84-8.065c-.057-.624.25-1.095.779-1.095h1.91c.528.005.84.476.784 1.1z"}))},success:function(e){return react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(T,{...e},react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("path",{d:"M12 0a12 12 0 1012 12A12.014 12.014 0 0012 0zm6.927 8.2l-6.845 9.289a1.011 1.011 0 01-1.43.188l-4.888-3.908a1 1 0 111.25-1.562l4.076 3.261 6.227-8.451a1 1 0 111.61 1.183z"}))},error:function(e){return react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(T,{...e},react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("path",{d:"M11.983 0a12.206 12.206 0 00-8.51 3.653A11.8 11.8 0 000 12.207 11.779 11.779 0 0011.8 24h.214A12.111 12.111 0 0024 11.791 11.766 11.766 0 0011.983 0zM10.5 16.542a1.476 1.476 0 011.449-1.53h.027a1.527 1.527 0 011.523 1.47 1.475 1.475 0 01-1.449 1.53h-.027a1.529 1.529 0 01-1.523-1.47zM11 12.5v-6a1 1 0 012 0v6a1 1 0 11-2 0z"}))},spinner:function(){return react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div",{className:"Toastify__spinner"})}};function C(t){const[,o]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useReducer)(t=>t+1,0),[l,c]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),g=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null),h=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(new Map).current,T=t=>-1!==l.indexOf(t),C=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)({toastKey:1,displayedToast:0,count:0,queue:[],props:t,containerId:null,isToastActive:T,getToast:t=>h.get(t)}).current;function b(t){let{containerId:e}=t;const{limit:n}=C.props;!n||e&&C.containerId!==e||(C.count-=C.queue.length,C.queue=[])}function I(t){c(e=>null==t?[]:e.filter(e=>e!==t))}function _(){const{toastContent:t,toastProps:e,staleId:n}=C.queue.shift();O(t,e,n)}function L(t,n){let{delay:s,staleId:r,...i}=n;if(!f(t)||function(t){return!g.current||C.props.enableMultiContainer&&t.containerId!==C.props.containerId||h.has(t.toastId)&&null==t.updateId}(i))return;const{toastId:l,updateId:c,data:T}=i,{props:b}=C,L=()=>I(l),N=null==c;N&&C.count++;const M={...b,style:b.toastStyle,key:C.toastKey++,...Object.fromEntries(Object.entries(i).filter(t=>{let[e,n]=t;return null!=n})),toastId:l,updateId:c,data:T,closeToast:L,isIn:!1,className:m(i.className||b.toastClassName),bodyClassName:m(i.bodyClassName||b.bodyClassName),progressClassName:m(i.progressClassName||b.progressClassName),autoClose:!i.isLoading&&(R=i.autoClose,w=b.autoClose,!1===R||u(R)&&R>0?R:w),deleteToast(){const t=y(h.get(l),"removed");h.delete(l),v.emit(4,t);const e=C.queue.length;if(C.count=null==l?C.count-C.displayedToast:C.count-1,C.count<0&&(C.count=0),e>0){const t=null==l?C.props.limit:1;if(1===e||1===t)C.displayedToast++,_();else{const n=t>e?e:t;C.displayedToast=n;for(let t=0;t<n;t++)_()}}else o()}};var R,w;M.iconOut=function(t){let{theme:n,type:o,isLoading:s,icon:r}=t,i=null;const l={theme:n,type:o};return!1===r||(p(r)?i=r(l):(0,react__WEBPACK_IMPORTED_MODULE_0__.isValidElement)(r)?i=(0,react__WEBPACK_IMPORTED_MODULE_0__.cloneElement)(r,l):d(r)||u(r)?i=r:s?i=E.spinner():(t=>t in E)(o)&&(i=E[o](l))),i}(M),p(i.onOpen)&&(M.onOpen=i.onOpen),p(i.onClose)&&(M.onClose=i.onClose),M.closeButton=b.closeButton,!1===i.closeButton||f(i.closeButton)?M.closeButton=i.closeButton:!0===i.closeButton&&(M.closeButton=!f(b.closeButton)||b.closeButton);let x=t;(0,react__WEBPACK_IMPORTED_MODULE_0__.isValidElement)(t)&&!d(t.type)?x=(0,react__WEBPACK_IMPORTED_MODULE_0__.cloneElement)(t,{closeToast:L,toastProps:M,data:T}):p(t)&&(x=t({closeToast:L,toastProps:M,data:T})),b.limit&&b.limit>0&&C.count>b.limit&&N?C.queue.push({toastContent:x,toastProps:M,staleId:r}):u(s)?setTimeout(()=>{O(x,M,r)},s):O(x,M,r)}function O(t,e,n){const{toastId:o}=e;n&&h.delete(n);const s={content:t,props:e};h.set(o,s),c(t=>[...t,o].filter(t=>t!==n)),v.emit(4,y(s,null==s.props.updateId?"added":"updated"))}return (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>(C.containerId=t.containerId,v.cancelEmit(3).on(0,L).on(1,t=>g.current&&I(t)).on(5,b).emit(2,C),()=>{h.clear(),v.emit(3,C)}),[]),(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{C.props=t,C.isToastActive=T,C.displayedToast=l.length}),{getToastToRender:function(e){const n=new Map,o=Array.from(h.values());return t.newestOnTop&&o.reverse(),o.forEach(t=>{const{position:e}=t.props;n.has(e)||n.set(e,[]),n.get(e).push(t)}),Array.from(n,t=>e(t[0],t[1]))},containerRef:g,isToastActive:T}}function b(t){return t.targetTouches&&t.targetTouches.length>=1?t.targetTouches[0].clientX:t.clientX}function I(t){return t.targetTouches&&t.targetTouches.length>=1?t.targetTouches[0].clientY:t.clientY}function _(t){const[o,a]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1),[r,l]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1),c=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null),u=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)({start:0,x:0,y:0,delta:0,removalDistance:0,canCloseOnClick:!0,canDrag:!1,boundingRect:null,didMove:!1}).current,d=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(t),{autoClose:m,pauseOnHover:f,closeToast:g,onClick:h,closeOnClick:y}=t;function v(e){if(t.draggable){"touchstart"===e.nativeEvent.type&&e.nativeEvent.preventDefault(),u.didMove=!1,document.addEventListener("mousemove",_),document.addEventListener("mouseup",L),document.addEventListener("touchmove",_),document.addEventListener("touchend",L);const n=c.current;u.canCloseOnClick=!0,u.canDrag=!0,u.boundingRect=n.getBoundingClientRect(),n.style.transition="",u.x=b(e.nativeEvent),u.y=I(e.nativeEvent),"x"===t.draggableDirection?(u.start=u.x,u.removalDistance=n.offsetWidth*(t.draggablePercent/100)):(u.start=u.y,u.removalDistance=n.offsetHeight*(80===t.draggablePercent?1.5*t.draggablePercent:t.draggablePercent/100))}}function T(e){if(u.boundingRect){const{top:n,bottom:o,left:s,right:a}=u.boundingRect;"touchend"!==e.nativeEvent.type&&t.pauseOnHover&&u.x>=s&&u.x<=a&&u.y>=n&&u.y<=o?C():E()}}function E(){a(!0)}function C(){a(!1)}function _(e){const n=c.current;u.canDrag&&n&&(u.didMove=!0,o&&C(),u.x=b(e),u.y=I(e),u.delta="x"===t.draggableDirection?u.x-u.start:u.y-u.start,u.start!==u.x&&(u.canCloseOnClick=!1),n.style.transform=`translate${t.draggableDirection}(${u.delta}px)`,n.style.opacity=""+(1-Math.abs(u.delta/u.removalDistance)))}function L(){document.removeEventListener("mousemove",_),document.removeEventListener("mouseup",L),document.removeEventListener("touchmove",_),document.removeEventListener("touchend",L);const e=c.current;if(u.canDrag&&u.didMove&&e){if(u.canDrag=!1,Math.abs(u.delta)>u.removalDistance)return l(!0),void t.closeToast();e.style.transition="transform 0.2s, opacity 0.2s",e.style.transform=`translate${t.draggableDirection}(0)`,e.style.opacity="1"}}(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{d.current=t}),(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>(c.current&&c.current.addEventListener("d",E,{once:!0}),p(t.onOpen)&&t.onOpen((0,react__WEBPACK_IMPORTED_MODULE_0__.isValidElement)(t.children)&&t.children.props),()=>{const t=d.current;p(t.onClose)&&t.onClose((0,react__WEBPACK_IMPORTED_MODULE_0__.isValidElement)(t.children)&&t.children.props)}),[]),(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>(t.pauseOnFocusLoss&&(document.hasFocus()||C(),window.addEventListener("focus",E),window.addEventListener("blur",C)),()=>{t.pauseOnFocusLoss&&(window.removeEventListener("focus",E),window.removeEventListener("blur",C))}),[t.pauseOnFocusLoss]);const O={onMouseDown:v,onTouchStart:v,onMouseUp:T,onTouchEnd:T};return m&&f&&(O.onMouseEnter=C,O.onMouseLeave=E),y&&(O.onClick=t=>{h&&h(t),u.canCloseOnClick&&g()}),{playToast:E,pauseToast:C,isRunning:o,preventExitTransition:r,toastRef:c,eventHandlers:O}}function L(e){let{closeToast:n,theme:o,ariaLabel:s="close"}=e;return react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("button",{className:`Toastify__close-button Toastify__close-button--${o}`,type:"button",onClick:t=>{t.stopPropagation(),n(t)},"aria-label":s},react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("svg",{"aria-hidden":"true",viewBox:"0 0 14 16"},react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("path",{fillRule:"evenodd",d:"M7.71 8.23l3.75 3.75-1.48 1.48-3.75-3.75-3.75 3.75L1 11.98l3.75-3.75L1 4.48 2.48 3l3.75 3.75L9.98 3l1.48 1.48-3.75 3.75z"})))}function O(e){let{delay:n,isRunning:o,closeToast:s,type:a="default",hide:r,className:i,style:l,controlledProgress:u,progress:d,rtl:m,isIn:f,theme:g}=e;const h=r||u&&0===d,y={...l,animationDuration:`${n}ms`,animationPlayState:o?"running":"paused",opacity:h?0:1};u&&(y.transform=`scaleX(${d})`);const v=(0,clsx__WEBPACK_IMPORTED_MODULE_1__.default)("Toastify__progress-bar",u?"Toastify__progress-bar--controlled":"Toastify__progress-bar--animated",`Toastify__progress-bar-theme--${g}`,`Toastify__progress-bar--${a}`,{"Toastify__progress-bar--rtl":m}),T=p(i)?i({rtl:m,type:a,defaultClassName:v}):(0,clsx__WEBPACK_IMPORTED_MODULE_1__.default)(v,i);return react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div",{role:"progressbar","aria-hidden":h?"true":"false","aria-label":"notification timer",className:T,style:y,[u&&d>=1?"onTransitionEnd":"onAnimationEnd"]:u&&d<1?null:()=>{f&&s()}})}const N=n=>{const{isRunning:o,preventExitTransition:s,toastRef:r,eventHandlers:i}=_(n),{closeButton:l,children:u,autoClose:d,onClick:m,type:f,hideProgressBar:g,closeToast:h,transition:y,position:v,className:T,style:E,bodyClassName:C,bodyStyle:b,progressClassName:I,progressStyle:N,updateId:M,role:R,progress:w,rtl:x,toastId:$,deleteToast:k,isIn:P,isLoading:B,iconOut:D,closeOnClick:A,theme:z}=n,F=(0,clsx__WEBPACK_IMPORTED_MODULE_1__.default)("Toastify__toast",`Toastify__toast-theme--${z}`,`Toastify__toast--${f}`,{"Toastify__toast--rtl":x},{"Toastify__toast--close-on-click":A}),H=p(T)?T({rtl:x,position:v,type:f,defaultClassName:F}):(0,clsx__WEBPACK_IMPORTED_MODULE_1__.default)(F,T),S=!!w||!d,q={closeToast:h,type:f,theme:z};let Q=null;return!1===l||(Q=p(l)?l(q):(0,react__WEBPACK_IMPORTED_MODULE_0__.isValidElement)(l)?(0,react__WEBPACK_IMPORTED_MODULE_0__.cloneElement)(l,q):L(q)),react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(y,{isIn:P,done:k,position:v,preventExitTransition:s,nodeRef:r},react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div",{id:$,onClick:m,className:H,...i,style:E,ref:r},react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div",{...P&&{role:R},className:p(C)?C({type:f}):(0,clsx__WEBPACK_IMPORTED_MODULE_1__.default)("Toastify__toast-body",C),style:b},null!=D&&react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div",{className:(0,clsx__WEBPACK_IMPORTED_MODULE_1__.default)("Toastify__toast-icon",{"Toastify--animate-icon Toastify__zoom-enter":!B})},D),react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div",null,u)),Q,react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(O,{...M&&!S?{key:`pb-${M}`}:{},rtl:x,theme:z,delay:d,isRunning:o,isIn:P,closeToast:h,hide:g,type:f,style:N,className:I,controlledProgress:S,progress:w||0})))},M=function(t,e){return void 0===e&&(e=!1),{enter:`Toastify--animate Toastify__${t}-enter`,exit:`Toastify--animate Toastify__${t}-exit`,appendPosition:e}},R=h(M("bounce",!0)),w=h(M("slide",!0)),x=h(M("zoom")),$=h(M("flip")),k=(0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)((e,n)=>{const{getToastToRender:o,containerRef:a,isToastActive:r}=C(e),{className:i,style:l,rtl:u,containerId:d}=e;function f(t){const e=(0,clsx__WEBPACK_IMPORTED_MODULE_1__.default)("Toastify__toast-container",`Toastify__toast-container--${t}`,{"Toastify__toast-container--rtl":u});return p(i)?i({position:t,rtl:u,defaultClassName:e}):(0,clsx__WEBPACK_IMPORTED_MODULE_1__.default)(e,m(i))}return (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{n&&(n.current=a.current)},[]),react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div",{ref:a,className:"Toastify",id:d},o((e,n)=>{const o=n.length?{...l}:{...l,pointerEvents:"none"};return react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div",{className:f(e),style:o,key:`container-${e}`},n.map((e,o)=>{let{content:s,props:a}=e;return react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(N,{...a,isIn:r(a.toastId),style:{...a.style,"--nth":o+1,"--len":n.length},key:`toast-${a.key}`},s)}))}))});k.displayName="ToastContainer",k.defaultProps={position:"top-right",transition:R,autoClose:5e3,closeButton:L,pauseOnHover:!0,pauseOnFocusLoss:!0,closeOnClick:!0,draggable:!0,draggablePercent:80,draggableDirection:"x",role:"alert",theme:"light"};let P,B=new Map,D=[],A=1;function z(){return""+A++}function F(t){return t&&(d(t.toastId)||u(t.toastId))?t.toastId:z()}function H(t,e){return B.size>0?v.emit(0,t,e):D.push({content:t,options:e}),e.toastId}function S(t,e){return{...e,type:e&&e.type||t,toastId:F(e)}}function q(t){return(e,n)=>H(e,S(t,n))}function Q(t,e){return H(t,S("default",e))}Q.loading=(t,e)=>H(t,S("default",{isLoading:!0,autoClose:!1,closeOnClick:!1,closeButton:!1,draggable:!1,...e})),Q.promise=function(t,e,n){let o,{pending:s,error:a,success:r}=e;s&&(o=d(s)?Q.loading(s,n):Q.loading(s.render,{...n,...s}));const i={isLoading:null,autoClose:null,closeOnClick:null,closeButton:null,draggable:null},l=(t,e,s)=>{if(null==e)return void Q.dismiss(o);const a={type:t,...i,...n,data:s},r=d(e)?{render:e}:e;return o?Q.update(o,{...a,...r}):Q(r.render,{...a,...r}),s},c=p(t)?t():t;return c.then(t=>l("success",r,t)).catch(t=>l("error",a,t)),c},Q.success=q("success"),Q.info=q("info"),Q.error=q("error"),Q.warning=q("warning"),Q.warn=Q.warning,Q.dark=(t,e)=>H(t,S("default",{theme:"dark",...e})),Q.dismiss=t=>{B.size>0?v.emit(1,t):D=D.filter(e=>null!=t&&e.options.toastId!==t)},Q.clearWaitingQueue=function(t){return void 0===t&&(t={}),v.emit(5,t)},Q.isActive=t=>{let e=!1;return B.forEach(n=>{n.isToastActive&&n.isToastActive(t)&&(e=!0)}),e},Q.update=function(t,e){void 0===e&&(e={}),setTimeout(()=>{const n=function(t,e){let{containerId:n}=e;const o=B.get(n||P);return o&&o.getToast(t)}(t,e);if(n){const{props:o,content:s}=n,a={delay:100,...o,...e,toastId:e.toastId||t,updateId:z()};a.toastId!==t&&(a.staleId=t);const r=a.render||s;delete a.render,H(r,a)}},0)},Q.done=t=>{Q.update(t,{progress:1})},Q.onChange=t=>(v.on(4,t),()=>{v.off(4,t)}),Q.POSITION={TOP_LEFT:"top-left",TOP_RIGHT:"top-right",TOP_CENTER:"top-center",BOTTOM_LEFT:"bottom-left",BOTTOM_RIGHT:"bottom-right",BOTTOM_CENTER:"bottom-center"},Q.TYPE={INFO:"info",SUCCESS:"success",WARNING:"warning",ERROR:"error",DEFAULT:"default"},v.on(2,t=>{P=t.containerId||t,B.set(P,t),D.forEach(t=>{v.emit(0,t.content,t.options)}),D=[]}).on(3,t=>{B.delete(t.containerId||t),0===B.size&&v.off(0).off(1).off(5)});
//# sourceMappingURL=react-toastify.esm.mjs.map


/***/ }),

/***/ "./node_modules/regenerator-runtime/runtime.js":
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/***/ ((module) => {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   true ? module.exports : 0
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./assets/admin/common/index.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvZGlzdC9icm93c2VyL2F4aW9zLmNqcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvYWRtaW4vY29tbW9uL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9hZG1pbi9jb21wb25lbnRzL1NpbmdsZUxvYWRUb2FzdC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvYWRtaW4vY29tcG9uZW50cy9TdGF0dXNTd2l0Y2hlci9TdGF0dXNTd2l0Y2hlckxpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2FkbWluL2NvbXBvbmVudHMvU3RhdHVzU3dpdGNoZXIvaW5kZXhMaXN0LmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9hZG1pbi9jb21wb25lbnRzL1RvYXN0L1RvYXN0LmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9hZG1pbi9jb21wb25lbnRzL1RvYXN0L2luZGV4LmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9hZG1pbi9jb21wb25lbnRzL1RvYXN0L21lc3NhZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2FkbWluL2xpYi9hcGkvcHJlcGFyZURhdGEuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2FkbWluL2xpYi9hcGkvdXNlQXBpLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9hZG1pbi9tb2R1bGVzL05hdmlnYXRpb24vTmF2aWdhdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvYWRtaW4vbW9kdWxlcy9OYXZpZ2F0aW9uL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jbHN4L2Rpc3QvY2xzeC5tLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hLWZ1bmN0aW9uLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hLXBvc3NpYmxlLXByb3RvdHlwZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYWRkLXRvLXVuc2NvcGFibGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hZHZhbmNlLXN0cmluZy1pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYW4taW5zdGFuY2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2FuLW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYXJyYXktZm9yLWVhY2guanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2FycmF5LWZyb20uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2FycmF5LWluY2x1ZGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hcnJheS1pdGVyYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2FycmF5LW1ldGhvZC1oYXMtc3BlY2llcy1zdXBwb3J0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hcnJheS1tZXRob2QtaXMtc3RyaWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hcnJheS1zcGVjaWVzLWNyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvY2FsbC13aXRoLXNhZmUtaXRlcmF0aW9uLWNsb3NpbmcuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2NoZWNrLWNvcnJlY3RuZXNzLW9mLWl0ZXJhdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvY2xhc3NvZi1yYXcuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2NsYXNzb2YuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2NvcHktY29uc3RydWN0b3ItcHJvcGVydGllcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvY29ycmVjdC1wcm90b3R5cGUtZ2V0dGVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9jcmVhdGUtaXRlcmF0b3ItY29uc3RydWN0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2NyZWF0ZS1ub24tZW51bWVyYWJsZS1wcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvY3JlYXRlLXByb3BlcnR5LWRlc2NyaXB0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2NyZWF0ZS1wcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZGVmaW5lLWl0ZXJhdG9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9kZWZpbmUtd2VsbC1rbm93bi1zeW1ib2wuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2Rlc2NyaXB0b3JzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9kb2N1bWVudC1jcmVhdGUtZWxlbWVudC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZG9tLWl0ZXJhYmxlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZW5naW5lLWlzLWJyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2VuZ2luZS1pcy1pb3MuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2VuZ2luZS1pcy1ub2RlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9lbmdpbmUtaXMtd2Vib3Mtd2Via2l0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9lbmdpbmUtdXNlci1hZ2VudC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZW5naW5lLXY4LXZlcnNpb24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2VudW0tYnVnLWtleXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2V4cG9ydC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZmFpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2ZpeC1yZWdleHAtd2VsbC1rbm93bi1zeW1ib2wtbG9naWMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2Z1bmN0aW9uLWJpbmQtY29udGV4dC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZ2V0LWJ1aWx0LWluLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9nZXQtaXRlcmF0b3ItbWV0aG9kLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2hhcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaGlkZGVuLWtleXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2hvc3QtcmVwb3J0LWVycm9ycy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaHRtbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaWU4LWRvbS1kZWZpbmUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2luZGV4ZWQtb2JqZWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pbnNwZWN0LXNvdXJjZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaW50ZXJuYWwtc3RhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2lzLWFycmF5LWl0ZXJhdG9yLW1ldGhvZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaXMtYXJyYXkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2lzLWZvcmNlZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaXMtb2JqZWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pcy1wdXJlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pcy1yZWdleHAuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2l0ZXJhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2l0ZXJhdG9yLWNsb3NlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pdGVyYXRvcnMtY29yZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaXRlcmF0b3JzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9taWNyb3Rhc2suanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL25hdGl2ZS1wcm9taXNlLWNvbnN0cnVjdG9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9uYXRpdmUtc3ltYm9sLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9uYXRpdmUtd2Vhay1tYXAuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL25ldy1wcm9taXNlLWNhcGFiaWxpdHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydGllcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktZGVzY3JpcHRvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktbmFtZXMtZXh0ZXJuYWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LW5hbWVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1zeW1ib2xzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3QtZ2V0LXByb3RvdHlwZS1vZi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWtleXMtaW50ZXJuYWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1rZXlzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3QtcHJvcGVydHktaXMtZW51bWVyYWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LXNldC1wcm90b3R5cGUtb2YuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC10by1zdHJpbmcuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL293bi1rZXlzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9wYXRoLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9wZXJmb3JtLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9wcm9taXNlLXJlc29sdmUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3JlZGVmaW5lLWFsbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvcmVkZWZpbmUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3JlZ2V4cC1leGVjLWFic3RyYWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9yZWdleHAtZXhlYy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvcmVnZXhwLWZsYWdzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9yZWdleHAtc3RpY2t5LWhlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3JlZ2V4cC11bnN1cHBvcnRlZC1kb3QtYWxsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9yZWdleHAtdW5zdXBwb3J0ZWQtbmNnLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9yZXF1aXJlLW9iamVjdC1jb2VyY2libGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3NldC1nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3NldC1zcGVjaWVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9zZXQtdG8tc3RyaW5nLXRhZy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvc2hhcmVkLWtleS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvc2hhcmVkLXN0b3JlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9zaGFyZWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3NwZWNpZXMtY29uc3RydWN0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3N0cmluZy1tdWx0aWJ5dGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3Rhc2suanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3RvLWFic29sdXRlLWluZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90by1pbmRleGVkLW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdG8taW50ZWdlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdG8tbGVuZ3RoLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90by1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3RvLXByaW1pdGl2ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdG8tc3RyaW5nLXRhZy1zdXBwb3J0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy91aWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3VzZS1zeW1ib2wtYXMtdWlkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbC13cmFwcGVkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLmFycmF5LmNvbmNhdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLmFycmF5LmZvci1lYWNoLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMuYXJyYXkuZnJvbS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLmFycmF5LmlzLWFycmF5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMuYXJyYXkuaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5hcnJheS5tYXAuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5hcnJheS5zbGljZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLmZ1bmN0aW9uLm5hbWUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5vYmplY3Qua2V5cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLm9iamVjdC50by1zdHJpbmcuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5wcm9taXNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMucmVnZXhwLmV4ZWMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5zdHJpbmcuaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5zdHJpbmcuc3BsaXQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5zeW1ib2wuZGVzY3JpcHRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5zeW1ib2wuaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5zeW1ib2wuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy93ZWIuZG9tLWNvbGxlY3Rpb25zLmZvci1lYWNoLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvd2ViLmRvbS1jb2xsZWN0aW9ucy5pdGVyYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL3dlYi50aW1lcnMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LXRvYXN0aWZ5L2Rpc3QvUmVhY3RUb2FzdGlmeS5jc3M/ZjU5YSIsIndlYnBhY2s6Ly8vLi9hc3NldHMvYWRtaW4vY29tbW9uL19wYWdpbmF0aW9uLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2FkbWluL2NvbW1vbi9pbmRleC5zY3NzIiwid2VicGFjazovLy8uL2Fzc2V0cy9hZG1pbi9jb21tb24vdGFibGUuc2NzcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvYWRtaW4vY29tcG9uZW50cy9TdGF0dXNTd2l0Y2hlci9zdGF0dXNTd2l0Y2hlci5zY3NzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcmVhY3QvY29tcGF0L2Rpc3QvY29tcGF0Lm1vZHVsZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJlYWN0L2Rpc3QvcHJlYWN0Lm1vZHVsZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJlYWN0L2hvb2tzL2Rpc3QvaG9va3MubW9kdWxlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC10b2FzdGlmeS9kaXN0L3JlYWN0LXRvYXN0aWZ5LmVzbS5tanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlZ2VuZXJhdG9yLXJ1bnRpbWUvcnVudGltZS5qcyJdLCJuYW1lcyI6WyJoaWRlTG9hZGVyIiwic2V0VGltZW91dCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImNsYXNzTGlzdCIsImFkZCIsIm1hbmVnZU5hdmlnYXRpb24iLCJuYXZpZ2F0aW9uSW5pdCIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsInN1Y2Nlc3MiLCJjb25zb2xlIiwibG9nIiwibWVzc2FnZSIsImVycm9yIiwiU3RhdHVzU3dpdGNoZXJMaXN0IiwidHlwZSIsImlkIiwibGFiZWwiLCJsaXN0VmFsdWVEZWZhdWx0IiwibGlzdFZhbHVlIiwidXNlU3RhdGUiLCJ2YWx1ZSIsInNldFZhbHVlIiwidXNlQXBpIiwiZmV0Y2giLCJvbkNsaWNrIiwidGhlbiIsInJlc3BvbnNlIiwid2lkdGgiLCJjaGVjayIsInVuY2hlY2siLCJlbGVtZW50cyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JFYWNoIiwiZWxlbWVudCIsImRhdGFzZXQiLCJyZW5kZXIiLCJUb2FzdCIsInRleHQiLCJ0b2FzdCIsImhpZGVQcm9ncmVzc0JhciIsImF1dG9DbG9zZSIsInBvc2l0aW9uIiwiQk9UVE9NX0xFRlQiLCJwcmVwYXJlRGF0YSIsImRhdGEiLCJmb3JtRGF0YSIsIkZvcm1EYXRhIiwiT2JqZWN0Iiwia2V5cyIsIm1hcCIsImtleSIsImFwcGVuZCIsImVuZHBvaW50IiwicGF5bG9hZCIsIm1ldGhvZCIsIndpbmRvdyIsImF4aW9zIiwicmVxdWlyZSIsInVybCIsInN0YXR1cyIsIkVycm9yIiwiY29kZSIsInVzZUFwaVN0YXRpYyIsIk5hdmlnYXRpb24iLCJwYWdlIiwic2V0UGFnZSIsInN1YnBhZ2UiLCJzZXRTdWJwYWdlIiwicGFyYW1zIiwic2V0UGFyYW1zIiwiYm9keUNsYXNzbGlzdCIsImJvZHkiLCJ1c2VFZmZlY3QiLCJib2R5Q2xhc3NsaXN0VmFsdWUiLCJzcGxpdCIsIm9uQ2xpY2tDbG9zZSIsInJlbW92ZSIsImNsb3NlSWNvbiIsImhlaWdodCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLE9BQU8sU0FBUztBQUNoQixPQUFPLGVBQWU7O0FBRXRCO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0EsYUFBYSxRQUFRO0FBQ3JCO0FBQ0EsT0FBTyxRQUFROztBQUVmO0FBQ0E7QUFDQTtBQUNBLFdBQVcsRUFBRTtBQUNiO0FBQ0EsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxFQUFFO0FBQ2I7QUFDQSxhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLEVBQUU7QUFDYjtBQUNBLGFBQWEsUUFBUTtBQUNyQjtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLEVBQUU7QUFDYjtBQUNBLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsRUFBRTtBQUNiO0FBQ0EsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxFQUFFO0FBQ2IsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxFQUFFO0FBQ2I7QUFDQSxhQUFhLFFBQVE7QUFDckI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLEVBQUU7QUFDYjtBQUNBLGFBQWEsUUFBUTtBQUNyQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcs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QSxhQUFhLFFBQVE7QUFDckI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVMsT0FBTztBQUNoQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFX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Q0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxTQUFTO0FBQ3RCO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7OztBQUdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFdBQVc7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0EsYUFBYSwyQkFBMkI7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxJQUFJO0FBQ2YsV0FBVyxTQUFTO0FBQ3BCLFdBQVcsU0FBUztBQUNwQjtBQUNBLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0VBQWdFO0FBQ2hFO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHdCQUF3QixnQkFBZ0I7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBLENBQUM7O0FBRUQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDJCQUEyQixtQkFBbUI7QUFDOUM7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFD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QUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBLDBCQUEwQixLQUFLO0FBQy9CO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsNkNBQTZDO0FBQzdDLE9BQU87QUFDUCwyREFBMkQsVUFBVTtBQUNyRTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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UztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsU0FBUztBQUNUO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxvQ0FBb0MsY0FBYztBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpQ0FBaUMsa0JBQWtCO0FBQ25EO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpQkFBaUI7O0FBRWpCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixpQkFBaUI7QUFDekM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxZQUFZO0FBQ1o7QUFDQTs7QUFFQTtBQUNBLFlBQVk7QUFDWjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLDhDQUE4QyxRQUFRO0FBQ3REO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTs7QUFFQSxXQUFXO0FBQ1g7QUFDQTtBQUNBOztBQUVBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7O0FBRUEsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLDhDQUE4QyxRQUFRO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0EsOENBQThDLFFBQVE7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0EsOENBQThDLFFBQVE7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFLEtBQTBCLG9CQUFvQixDQUFFO0FBQ2xEOztBQUVBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhZG1pbi1jb21tb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBBeGlvcyB2MS40LjAgQ29weXJpZ2h0IChjKSAyMDIzIE1hdHQgWmFicmlza2llIGFuZCBjb250cmlidXRvcnNcbid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gYmluZChmbiwgdGhpc0FyZykge1xuICByZXR1cm4gZnVuY3Rpb24gd3JhcCgpIHtcbiAgICByZXR1cm4gZm4uYXBwbHkodGhpc0FyZywgYXJndW1lbnRzKTtcbiAgfTtcbn1cblxuLy8gdXRpbHMgaXMgYSBsaWJyYXJ5IG9mIGdlbmVyaWMgaGVscGVyIGZ1bmN0aW9ucyBub24tc3BlY2lmaWMgdG8gYXhpb3NcblxuY29uc3Qge3RvU3RyaW5nfSA9IE9iamVjdC5wcm90b3R5cGU7XG5jb25zdCB7Z2V0UHJvdG90eXBlT2Z9ID0gT2JqZWN0O1xuXG5jb25zdCBraW5kT2YgPSAoY2FjaGUgPT4gdGhpbmcgPT4ge1xuICAgIGNvbnN0IHN0ciA9IHRvU3RyaW5nLmNhbGwodGhpbmcpO1xuICAgIHJldHVybiBjYWNoZVtzdHJdIHx8IChjYWNoZVtzdHJdID0gc3RyLnNsaWNlKDgsIC0xKS50b0xvd2VyQ2FzZSgpKTtcbn0pKE9iamVjdC5jcmVhdGUobnVsbCkpO1xuXG5jb25zdCBraW5kT2ZUZXN0ID0gKHR5cGUpID0+IHtcbiAgdHlwZSA9IHR5cGUudG9Mb3dlckNhc2UoKTtcbiAgcmV0dXJuICh0aGluZykgPT4ga2luZE9mKHRoaW5nKSA9PT0gdHlwZVxufTtcblxuY29uc3QgdHlwZU9mVGVzdCA9IHR5cGUgPT4gdGhpbmcgPT4gdHlwZW9mIHRoaW5nID09PSB0eXBlO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIEFycmF5XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEFycmF5LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3Qge2lzQXJyYXl9ID0gQXJyYXk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgdW5kZWZpbmVkXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgdW5kZWZpbmVkLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNVbmRlZmluZWQgPSB0eXBlT2ZUZXN0KCd1bmRlZmluZWQnKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEJ1ZmZlclxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0J1ZmZlcih2YWwpIHtcbiAgcmV0dXJuIHZhbCAhPT0gbnVsbCAmJiAhaXNVbmRlZmluZWQodmFsKSAmJiB2YWwuY29uc3RydWN0b3IgIT09IG51bGwgJiYgIWlzVW5kZWZpbmVkKHZhbC5jb25zdHJ1Y3RvcilcbiAgICAmJiBpc0Z1bmN0aW9uKHZhbC5jb25zdHJ1Y3Rvci5pc0J1ZmZlcikgJiYgdmFsLmNvbnN0cnVjdG9yLmlzQnVmZmVyKHZhbCk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gQXJyYXlCdWZmZXJcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEFycmF5QnVmZmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNBcnJheUJ1ZmZlciA9IGtpbmRPZlRlc3QoJ0FycmF5QnVmZmVyJyk7XG5cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIHZpZXcgb24gYW4gQXJyYXlCdWZmZXJcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgdmlldyBvbiBhbiBBcnJheUJ1ZmZlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlCdWZmZXJWaWV3KHZhbCkge1xuICBsZXQgcmVzdWx0O1xuICBpZiAoKHR5cGVvZiBBcnJheUJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcpICYmIChBcnJheUJ1ZmZlci5pc1ZpZXcpKSB7XG4gICAgcmVzdWx0ID0gQXJyYXlCdWZmZXIuaXNWaWV3KHZhbCk7XG4gIH0gZWxzZSB7XG4gICAgcmVzdWx0ID0gKHZhbCkgJiYgKHZhbC5idWZmZXIpICYmIChpc0FycmF5QnVmZmVyKHZhbC5idWZmZXIpKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgU3RyaW5nXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFN0cmluZywgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzU3RyaW5nID0gdHlwZU9mVGVzdCgnc3RyaW5nJyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGdW5jdGlvblxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEZ1bmN0aW9uLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNGdW5jdGlvbiA9IHR5cGVPZlRlc3QoJ2Z1bmN0aW9uJyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBOdW1iZXJcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgTnVtYmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNOdW1iZXIgPSB0eXBlT2ZUZXN0KCdudW1iZXInKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBPYmplY3RcbiAqXG4gKiBAcGFyYW0geyp9IHRoaW5nIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gT2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNPYmplY3QgPSAodGhpbmcpID0+IHRoaW5nICE9PSBudWxsICYmIHR5cGVvZiB0aGluZyA9PT0gJ29iamVjdCc7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBCb29sZWFuXG4gKlxuICogQHBhcmFtIHsqfSB0aGluZyBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBCb29sZWFuLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNCb29sZWFuID0gdGhpbmcgPT4gdGhpbmcgPT09IHRydWUgfHwgdGhpbmcgPT09IGZhbHNlO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgcGxhaW4gT2JqZWN0XG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIHBsYWluIE9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzUGxhaW5PYmplY3QgPSAodmFsKSA9PiB7XG4gIGlmIChraW5kT2YodmFsKSAhPT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBjb25zdCBwcm90b3R5cGUgPSBnZXRQcm90b3R5cGVPZih2YWwpO1xuICByZXR1cm4gKHByb3RvdHlwZSA9PT0gbnVsbCB8fCBwcm90b3R5cGUgPT09IE9iamVjdC5wcm90b3R5cGUgfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKHByb3RvdHlwZSkgPT09IG51bGwpICYmICEoU3ltYm9sLnRvU3RyaW5nVGFnIGluIHZhbCkgJiYgIShTeW1ib2wuaXRlcmF0b3IgaW4gdmFsKTtcbn07XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBEYXRlXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIERhdGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc0RhdGUgPSBraW5kT2ZUZXN0KCdEYXRlJyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGaWxlXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEZpbGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc0ZpbGUgPSBraW5kT2ZUZXN0KCdGaWxlJyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBCbG9iXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEJsb2IsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc0Jsb2IgPSBraW5kT2ZUZXN0KCdCbG9iJyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGaWxlTGlzdFxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBGaWxlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNGaWxlTGlzdCA9IGtpbmRPZlRlc3QoJ0ZpbGVMaXN0Jyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBTdHJlYW1cbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgU3RyZWFtLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNTdHJlYW0gPSAodmFsKSA9PiBpc09iamVjdCh2YWwpICYmIGlzRnVuY3Rpb24odmFsLnBpcGUpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRm9ybURhdGFcbiAqXG4gKiBAcGFyYW0geyp9IHRoaW5nIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gRm9ybURhdGEsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc0Zvcm1EYXRhID0gKHRoaW5nKSA9PiB7XG4gIGxldCBraW5kO1xuICByZXR1cm4gdGhpbmcgJiYgKFxuICAgICh0eXBlb2YgRm9ybURhdGEgPT09ICdmdW5jdGlvbicgJiYgdGhpbmcgaW5zdGFuY2VvZiBGb3JtRGF0YSkgfHwgKFxuICAgICAgaXNGdW5jdGlvbih0aGluZy5hcHBlbmQpICYmIChcbiAgICAgICAgKGtpbmQgPSBraW5kT2YodGhpbmcpKSA9PT0gJ2Zvcm1kYXRhJyB8fFxuICAgICAgICAvLyBkZXRlY3QgZm9ybS1kYXRhIGluc3RhbmNlXG4gICAgICAgIChraW5kID09PSAnb2JqZWN0JyAmJiBpc0Z1bmN0aW9uKHRoaW5nLnRvU3RyaW5nKSAmJiB0aGluZy50b1N0cmluZygpID09PSAnW29iamVjdCBGb3JtRGF0YV0nKVxuICAgICAgKVxuICAgIClcbiAgKVxufTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFVSTFNlYXJjaFBhcmFtcyBvYmplY3RcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgVVJMU2VhcmNoUGFyYW1zIG9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzVVJMU2VhcmNoUGFyYW1zID0ga2luZE9mVGVzdCgnVVJMU2VhcmNoUGFyYW1zJyk7XG5cbi8qKlxuICogVHJpbSBleGNlc3Mgd2hpdGVzcGFjZSBvZmYgdGhlIGJlZ2lubmluZyBhbmQgZW5kIG9mIGEgc3RyaW5nXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0ciBUaGUgU3RyaW5nIHRvIHRyaW1cbiAqXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgU3RyaW5nIGZyZWVkIG9mIGV4Y2VzcyB3aGl0ZXNwYWNlXG4gKi9cbmNvbnN0IHRyaW0gPSAoc3RyKSA9PiBzdHIudHJpbSA/XG4gIHN0ci50cmltKCkgOiBzdHIucmVwbGFjZSgvXltcXHNcXHVGRUZGXFx4QTBdK3xbXFxzXFx1RkVGRlxceEEwXSskL2csICcnKTtcblxuLyoqXG4gKiBJdGVyYXRlIG92ZXIgYW4gQXJyYXkgb3IgYW4gT2JqZWN0IGludm9raW5nIGEgZnVuY3Rpb24gZm9yIGVhY2ggaXRlbS5cbiAqXG4gKiBJZiBgb2JqYCBpcyBhbiBBcnJheSBjYWxsYmFjayB3aWxsIGJlIGNhbGxlZCBwYXNzaW5nXG4gKiB0aGUgdmFsdWUsIGluZGV4LCBhbmQgY29tcGxldGUgYXJyYXkgZm9yIGVhY2ggaXRlbS5cbiAqXG4gKiBJZiAnb2JqJyBpcyBhbiBPYmplY3QgY2FsbGJhY2sgd2lsbCBiZSBjYWxsZWQgcGFzc2luZ1xuICogdGhlIHZhbHVlLCBrZXksIGFuZCBjb21wbGV0ZSBvYmplY3QgZm9yIGVhY2ggcHJvcGVydHkuXG4gKlxuICogQHBhcmFtIHtPYmplY3R8QXJyYXl9IG9iaiBUaGUgb2JqZWN0IHRvIGl0ZXJhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBjYWxsYmFjayB0byBpbnZva2UgZm9yIGVhY2ggaXRlbVxuICpcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW2FsbE93bktleXMgPSBmYWxzZV1cbiAqIEByZXR1cm5zIHthbnl9XG4gKi9cbmZ1bmN0aW9uIGZvckVhY2gob2JqLCBmbiwge2FsbE93bktleXMgPSBmYWxzZX0gPSB7fSkge1xuICAvLyBEb24ndCBib3RoZXIgaWYgbm8gdmFsdWUgcHJvdmlkZWRcbiAgaWYgKG9iaiA9PT0gbnVsbCB8fCB0eXBlb2Ygb2JqID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGxldCBpO1xuICBsZXQgbDtcblxuICAvLyBGb3JjZSBhbiBhcnJheSBpZiBub3QgYWxyZWFkeSBzb21ldGhpbmcgaXRlcmFibGVcbiAgaWYgKHR5cGVvZiBvYmogIT09ICdvYmplY3QnKSB7XG4gICAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gICAgb2JqID0gW29ial07XG4gIH1cblxuICBpZiAoaXNBcnJheShvYmopKSB7XG4gICAgLy8gSXRlcmF0ZSBvdmVyIGFycmF5IHZhbHVlc1xuICAgIGZvciAoaSA9IDAsIGwgPSBvYmoubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBmbi5jYWxsKG51bGwsIG9ialtpXSwgaSwgb2JqKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy8gSXRlcmF0ZSBvdmVyIG9iamVjdCBrZXlzXG4gICAgY29uc3Qga2V5cyA9IGFsbE93bktleXMgPyBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvYmopIDogT2JqZWN0LmtleXMob2JqKTtcbiAgICBjb25zdCBsZW4gPSBrZXlzLmxlbmd0aDtcbiAgICBsZXQga2V5O1xuXG4gICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBrZXkgPSBrZXlzW2ldO1xuICAgICAgZm4uY2FsbChudWxsLCBvYmpba2V5XSwga2V5LCBvYmopO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBmaW5kS2V5KG9iaiwga2V5KSB7XG4gIGtleSA9IGtleS50b0xvd2VyQ2FzZSgpO1xuICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMob2JqKTtcbiAgbGV0IGkgPSBrZXlzLmxlbmd0aDtcbiAgbGV0IF9rZXk7XG4gIHdoaWxlIChpLS0gPiAwKSB7XG4gICAgX2tleSA9IGtleXNbaV07XG4gICAgaWYgKGtleSA9PT0gX2tleS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgICByZXR1cm4gX2tleTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5cbmNvbnN0IF9nbG9iYWwgPSAoKCkgPT4ge1xuICAvKmVzbGludCBuby11bmRlZjowKi9cbiAgaWYgKHR5cGVvZiBnbG9iYWxUaGlzICE9PSBcInVuZGVmaW5lZFwiKSByZXR1cm4gZ2xvYmFsVGhpcztcbiAgcmV0dXJuIHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6ICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IHdpbmRvdyA6IGdsb2JhbClcbn0pKCk7XG5cbmNvbnN0IGlzQ29udGV4dERlZmluZWQgPSAoY29udGV4dCkgPT4gIWlzVW5kZWZpbmVkKGNvbnRleHQpICYmIGNvbnRleHQgIT09IF9nbG9iYWw7XG5cbi8qKlxuICogQWNjZXB0cyB2YXJhcmdzIGV4cGVjdGluZyBlYWNoIGFyZ3VtZW50IHRvIGJlIGFuIG9iamVjdCwgdGhlblxuICogaW1tdXRhYmx5IG1lcmdlcyB0aGUgcHJvcGVydGllcyBvZiBlYWNoIG9iamVjdCBhbmQgcmV0dXJucyByZXN1bHQuXG4gKlxuICogV2hlbiBtdWx0aXBsZSBvYmplY3RzIGNvbnRhaW4gdGhlIHNhbWUga2V5IHRoZSBsYXRlciBvYmplY3QgaW5cbiAqIHRoZSBhcmd1bWVudHMgbGlzdCB3aWxsIHRha2UgcHJlY2VkZW5jZS5cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqIGBgYGpzXG4gKiB2YXIgcmVzdWx0ID0gbWVyZ2Uoe2ZvbzogMTIzfSwge2ZvbzogNDU2fSk7XG4gKiBjb25zb2xlLmxvZyhyZXN1bHQuZm9vKTsgLy8gb3V0cHV0cyA0NTZcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmoxIE9iamVjdCB0byBtZXJnZVxuICpcbiAqIEByZXR1cm5zIHtPYmplY3R9IFJlc3VsdCBvZiBhbGwgbWVyZ2UgcHJvcGVydGllc1xuICovXG5mdW5jdGlvbiBtZXJnZSgvKiBvYmoxLCBvYmoyLCBvYmozLCAuLi4gKi8pIHtcbiAgY29uc3Qge2Nhc2VsZXNzfSA9IGlzQ29udGV4dERlZmluZWQodGhpcykgJiYgdGhpcyB8fCB7fTtcbiAgY29uc3QgcmVzdWx0ID0ge307XG4gIGNvbnN0IGFzc2lnblZhbHVlID0gKHZhbCwga2V5KSA9PiB7XG4gICAgY29uc3QgdGFyZ2V0S2V5ID0gY2FzZWxlc3MgJiYgZmluZEtleShyZXN1bHQsIGtleSkgfHwga2V5O1xuICAgIGlmIChpc1BsYWluT2JqZWN0KHJlc3VsdFt0YXJnZXRLZXldKSAmJiBpc1BsYWluT2JqZWN0KHZhbCkpIHtcbiAgICAgIHJlc3VsdFt0YXJnZXRLZXldID0gbWVyZ2UocmVzdWx0W3RhcmdldEtleV0sIHZhbCk7XG4gICAgfSBlbHNlIGlmIChpc1BsYWluT2JqZWN0KHZhbCkpIHtcbiAgICAgIHJlc3VsdFt0YXJnZXRLZXldID0gbWVyZ2Uoe30sIHZhbCk7XG4gICAgfSBlbHNlIGlmIChpc0FycmF5KHZhbCkpIHtcbiAgICAgIHJlc3VsdFt0YXJnZXRLZXldID0gdmFsLnNsaWNlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdFt0YXJnZXRLZXldID0gdmFsO1xuICAgIH1cbiAgfTtcblxuICBmb3IgKGxldCBpID0gMCwgbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBhcmd1bWVudHNbaV0gJiYgZm9yRWFjaChhcmd1bWVudHNbaV0sIGFzc2lnblZhbHVlKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIEV4dGVuZHMgb2JqZWN0IGEgYnkgbXV0YWJseSBhZGRpbmcgdG8gaXQgdGhlIHByb3BlcnRpZXMgb2Ygb2JqZWN0IGIuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGEgVGhlIG9iamVjdCB0byBiZSBleHRlbmRlZFxuICogQHBhcmFtIHtPYmplY3R9IGIgVGhlIG9iamVjdCB0byBjb3B5IHByb3BlcnRpZXMgZnJvbVxuICogQHBhcmFtIHtPYmplY3R9IHRoaXNBcmcgVGhlIG9iamVjdCB0byBiaW5kIGZ1bmN0aW9uIHRvXG4gKlxuICogQHBhcmFtIHtCb29sZWFufSBbYWxsT3duS2V5c11cbiAqIEByZXR1cm5zIHtPYmplY3R9IFRoZSByZXN1bHRpbmcgdmFsdWUgb2Ygb2JqZWN0IGFcbiAqL1xuY29uc3QgZXh0ZW5kID0gKGEsIGIsIHRoaXNBcmcsIHthbGxPd25LZXlzfT0ge30pID0+IHtcbiAgZm9yRWFjaChiLCAodmFsLCBrZXkpID0+IHtcbiAgICBpZiAodGhpc0FyZyAmJiBpc0Z1bmN0aW9uKHZhbCkpIHtcbiAgICAgIGFba2V5XSA9IGJpbmQodmFsLCB0aGlzQXJnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYVtrZXldID0gdmFsO1xuICAgIH1cbiAgfSwge2FsbE93bktleXN9KTtcbiAgcmV0dXJuIGE7XG59O1xuXG4vKipcbiAqIFJlbW92ZSBieXRlIG9yZGVyIG1hcmtlci4gVGhpcyBjYXRjaGVzIEVGIEJCIEJGICh0aGUgVVRGLTggQk9NKVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBjb250ZW50IHdpdGggQk9NXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gY29udGVudCB2YWx1ZSB3aXRob3V0IEJPTVxuICovXG5jb25zdCBzdHJpcEJPTSA9IChjb250ZW50KSA9PiB7XG4gIGlmIChjb250ZW50LmNoYXJDb2RlQXQoMCkgPT09IDB4RkVGRikge1xuICAgIGNvbnRlbnQgPSBjb250ZW50LnNsaWNlKDEpO1xuICB9XG4gIHJldHVybiBjb250ZW50O1xufTtcblxuLyoqXG4gKiBJbmhlcml0IHRoZSBwcm90b3R5cGUgbWV0aG9kcyBmcm9tIG9uZSBjb25zdHJ1Y3RvciBpbnRvIGFub3RoZXJcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBzdXBlckNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge29iamVjdH0gW3Byb3BzXVxuICogQHBhcmFtIHtvYmplY3R9IFtkZXNjcmlwdG9yc11cbiAqXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuY29uc3QgaW5oZXJpdHMgPSAoY29uc3RydWN0b3IsIHN1cGVyQ29uc3RydWN0b3IsIHByb3BzLCBkZXNjcmlwdG9ycykgPT4ge1xuICBjb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ29uc3RydWN0b3IucHJvdG90eXBlLCBkZXNjcmlwdG9ycyk7XG4gIGNvbnN0cnVjdG9yLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGNvbnN0cnVjdG9yO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29uc3RydWN0b3IsICdzdXBlcicsIHtcbiAgICB2YWx1ZTogc3VwZXJDb25zdHJ1Y3Rvci5wcm90b3R5cGVcbiAgfSk7XG4gIHByb3BzICYmIE9iamVjdC5hc3NpZ24oY29uc3RydWN0b3IucHJvdG90eXBlLCBwcm9wcyk7XG59O1xuXG4vKipcbiAqIFJlc29sdmUgb2JqZWN0IHdpdGggZGVlcCBwcm90b3R5cGUgY2hhaW4gdG8gYSBmbGF0IG9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZU9iaiBzb3VyY2Ugb2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gW2Rlc3RPYmpdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufEJvb2xlYW59IFtmaWx0ZXJdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbcHJvcEZpbHRlcl1cbiAqXG4gKiBAcmV0dXJucyB7T2JqZWN0fVxuICovXG5jb25zdCB0b0ZsYXRPYmplY3QgPSAoc291cmNlT2JqLCBkZXN0T2JqLCBmaWx0ZXIsIHByb3BGaWx0ZXIpID0+IHtcbiAgbGV0IHByb3BzO1xuICBsZXQgaTtcbiAgbGV0IHByb3A7XG4gIGNvbnN0IG1lcmdlZCA9IHt9O1xuXG4gIGRlc3RPYmogPSBkZXN0T2JqIHx8IHt9O1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tZXEtbnVsbCxlcWVxZXFcbiAgaWYgKHNvdXJjZU9iaiA9PSBudWxsKSByZXR1cm4gZGVzdE9iajtcblxuICBkbyB7XG4gICAgcHJvcHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhzb3VyY2VPYmopO1xuICAgIGkgPSBwcm9wcy5sZW5ndGg7XG4gICAgd2hpbGUgKGktLSA+IDApIHtcbiAgICAgIHByb3AgPSBwcm9wc1tpXTtcbiAgICAgIGlmICgoIXByb3BGaWx0ZXIgfHwgcHJvcEZpbHRlcihwcm9wLCBzb3VyY2VPYmosIGRlc3RPYmopKSAmJiAhbWVyZ2VkW3Byb3BdKSB7XG4gICAgICAgIGRlc3RPYmpbcHJvcF0gPSBzb3VyY2VPYmpbcHJvcF07XG4gICAgICAgIG1lcmdlZFtwcm9wXSA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIHNvdXJjZU9iaiA9IGZpbHRlciAhPT0gZmFsc2UgJiYgZ2V0UHJvdG90eXBlT2Yoc291cmNlT2JqKTtcbiAgfSB3aGlsZSAoc291cmNlT2JqICYmICghZmlsdGVyIHx8IGZpbHRlcihzb3VyY2VPYmosIGRlc3RPYmopKSAmJiBzb3VyY2VPYmogIT09IE9iamVjdC5wcm90b3R5cGUpO1xuXG4gIHJldHVybiBkZXN0T2JqO1xufTtcblxuLyoqXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgYSBzdHJpbmcgZW5kcyB3aXRoIHRoZSBjaGFyYWN0ZXJzIG9mIGEgc3BlY2lmaWVkIHN0cmluZ1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBzZWFyY2hTdHJpbmdcbiAqIEBwYXJhbSB7TnVtYmVyfSBbcG9zaXRpb249IDBdXG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmNvbnN0IGVuZHNXaXRoID0gKHN0ciwgc2VhcmNoU3RyaW5nLCBwb3NpdGlvbikgPT4ge1xuICBzdHIgPSBTdHJpbmcoc3RyKTtcbiAgaWYgKHBvc2l0aW9uID09PSB1bmRlZmluZWQgfHwgcG9zaXRpb24gPiBzdHIubGVuZ3RoKSB7XG4gICAgcG9zaXRpb24gPSBzdHIubGVuZ3RoO1xuICB9XG4gIHBvc2l0aW9uIC09IHNlYXJjaFN0cmluZy5sZW5ndGg7XG4gIGNvbnN0IGxhc3RJbmRleCA9IHN0ci5pbmRleE9mKHNlYXJjaFN0cmluZywgcG9zaXRpb24pO1xuICByZXR1cm4gbGFzdEluZGV4ICE9PSAtMSAmJiBsYXN0SW5kZXggPT09IHBvc2l0aW9uO1xufTtcblxuXG4vKipcbiAqIFJldHVybnMgbmV3IGFycmF5IGZyb20gYXJyYXkgbGlrZSBvYmplY3Qgb3IgbnVsbCBpZiBmYWlsZWRcbiAqXG4gKiBAcGFyYW0geyp9IFt0aGluZ11cbiAqXG4gKiBAcmV0dXJucyB7P0FycmF5fVxuICovXG5jb25zdCB0b0FycmF5ID0gKHRoaW5nKSA9PiB7XG4gIGlmICghdGhpbmcpIHJldHVybiBudWxsO1xuICBpZiAoaXNBcnJheSh0aGluZykpIHJldHVybiB0aGluZztcbiAgbGV0IGkgPSB0aGluZy5sZW5ndGg7XG4gIGlmICghaXNOdW1iZXIoaSkpIHJldHVybiBudWxsO1xuICBjb25zdCBhcnIgPSBuZXcgQXJyYXkoaSk7XG4gIHdoaWxlIChpLS0gPiAwKSB7XG4gICAgYXJyW2ldID0gdGhpbmdbaV07XG4gIH1cbiAgcmV0dXJuIGFycjtcbn07XG5cbi8qKlxuICogQ2hlY2tpbmcgaWYgdGhlIFVpbnQ4QXJyYXkgZXhpc3RzIGFuZCBpZiBpdCBkb2VzLCBpdCByZXR1cm5zIGEgZnVuY3Rpb24gdGhhdCBjaGVja3MgaWYgdGhlXG4gKiB0aGluZyBwYXNzZWQgaW4gaXMgYW4gaW5zdGFuY2Ugb2YgVWludDhBcnJheVxuICpcbiAqIEBwYXJhbSB7VHlwZWRBcnJheX1cbiAqXG4gKiBAcmV0dXJucyB7QXJyYXl9XG4gKi9cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG5jb25zdCBpc1R5cGVkQXJyYXkgPSAoVHlwZWRBcnJheSA9PiB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG4gIHJldHVybiB0aGluZyA9PiB7XG4gICAgcmV0dXJuIFR5cGVkQXJyYXkgJiYgdGhpbmcgaW5zdGFuY2VvZiBUeXBlZEFycmF5O1xuICB9O1xufSkodHlwZW9mIFVpbnQ4QXJyYXkgIT09ICd1bmRlZmluZWQnICYmIGdldFByb3RvdHlwZU9mKFVpbnQ4QXJyYXkpKTtcblxuLyoqXG4gKiBGb3IgZWFjaCBlbnRyeSBpbiB0aGUgb2JqZWN0LCBjYWxsIHRoZSBmdW5jdGlvbiB3aXRoIHRoZSBrZXkgYW5kIHZhbHVlLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0PGFueSwgYW55Pn0gb2JqIC0gVGhlIG9iamVjdCB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiAtIFRoZSBmdW5jdGlvbiB0byBjYWxsIGZvciBlYWNoIGVudHJ5LlxuICpcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5jb25zdCBmb3JFYWNoRW50cnkgPSAob2JqLCBmbikgPT4ge1xuICBjb25zdCBnZW5lcmF0b3IgPSBvYmogJiYgb2JqW1N5bWJvbC5pdGVyYXRvcl07XG5cbiAgY29uc3QgaXRlcmF0b3IgPSBnZW5lcmF0b3IuY2FsbChvYmopO1xuXG4gIGxldCByZXN1bHQ7XG5cbiAgd2hpbGUgKChyZXN1bHQgPSBpdGVyYXRvci5uZXh0KCkpICYmICFyZXN1bHQuZG9uZSkge1xuICAgIGNvbnN0IHBhaXIgPSByZXN1bHQudmFsdWU7XG4gICAgZm4uY2FsbChvYmosIHBhaXJbMF0sIHBhaXJbMV0pO1xuICB9XG59O1xuXG4vKipcbiAqIEl0IHRha2VzIGEgcmVndWxhciBleHByZXNzaW9uIGFuZCBhIHN0cmluZywgYW5kIHJldHVybnMgYW4gYXJyYXkgb2YgYWxsIHRoZSBtYXRjaGVzXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHJlZ0V4cCAtIFRoZSByZWd1bGFyIGV4cHJlc3Npb24gdG8gbWF0Y2ggYWdhaW5zdC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHIgLSBUaGUgc3RyaW5nIHRvIHNlYXJjaC5cbiAqXG4gKiBAcmV0dXJucyB7QXJyYXk8Ym9vbGVhbj59XG4gKi9cbmNvbnN0IG1hdGNoQWxsID0gKHJlZ0V4cCwgc3RyKSA9PiB7XG4gIGxldCBtYXRjaGVzO1xuICBjb25zdCBhcnIgPSBbXTtcblxuICB3aGlsZSAoKG1hdGNoZXMgPSByZWdFeHAuZXhlYyhzdHIpKSAhPT0gbnVsbCkge1xuICAgIGFyci5wdXNoKG1hdGNoZXMpO1xuICB9XG5cbiAgcmV0dXJuIGFycjtcbn07XG5cbi8qIENoZWNraW5nIGlmIHRoZSBraW5kT2ZUZXN0IGZ1bmN0aW9uIHJldHVybnMgdHJ1ZSB3aGVuIHBhc3NlZCBhbiBIVE1MRm9ybUVsZW1lbnQuICovXG5jb25zdCBpc0hUTUxGb3JtID0ga2luZE9mVGVzdCgnSFRNTEZvcm1FbGVtZW50Jyk7XG5cbmNvbnN0IHRvQ2FtZWxDYXNlID0gc3RyID0+IHtcbiAgcmV0dXJuIHN0ci50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1stX1xcc10oW2EtelxcZF0pKFxcdyopL2csXG4gICAgZnVuY3Rpb24gcmVwbGFjZXIobSwgcDEsIHAyKSB7XG4gICAgICByZXR1cm4gcDEudG9VcHBlckNhc2UoKSArIHAyO1xuICAgIH1cbiAgKTtcbn07XG5cbi8qIENyZWF0aW5nIGEgZnVuY3Rpb24gdGhhdCB3aWxsIGNoZWNrIGlmIGFuIG9iamVjdCBoYXMgYSBwcm9wZXJ0eS4gKi9cbmNvbnN0IGhhc093blByb3BlcnR5ID0gKCh7aGFzT3duUHJvcGVydHl9KSA9PiAob2JqLCBwcm9wKSA9PiBoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpKE9iamVjdC5wcm90b3R5cGUpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgUmVnRXhwIG9iamVjdFxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBSZWdFeHAgb2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNSZWdFeHAgPSBraW5kT2ZUZXN0KCdSZWdFeHAnKTtcblxuY29uc3QgcmVkdWNlRGVzY3JpcHRvcnMgPSAob2JqLCByZWR1Y2VyKSA9PiB7XG4gIGNvbnN0IGRlc2NyaXB0b3JzID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMob2JqKTtcbiAgY29uc3QgcmVkdWNlZERlc2NyaXB0b3JzID0ge307XG5cbiAgZm9yRWFjaChkZXNjcmlwdG9ycywgKGRlc2NyaXB0b3IsIG5hbWUpID0+IHtcbiAgICBpZiAocmVkdWNlcihkZXNjcmlwdG9yLCBuYW1lLCBvYmopICE9PSBmYWxzZSkge1xuICAgICAgcmVkdWNlZERlc2NyaXB0b3JzW25hbWVdID0gZGVzY3JpcHRvcjtcbiAgICB9XG4gIH0pO1xuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKG9iaiwgcmVkdWNlZERlc2NyaXB0b3JzKTtcbn07XG5cbi8qKlxuICogTWFrZXMgYWxsIG1ldGhvZHMgcmVhZC1vbmx5XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKi9cblxuY29uc3QgZnJlZXplTWV0aG9kcyA9IChvYmopID0+IHtcbiAgcmVkdWNlRGVzY3JpcHRvcnMob2JqLCAoZGVzY3JpcHRvciwgbmFtZSkgPT4ge1xuICAgIC8vIHNraXAgcmVzdHJpY3RlZCBwcm9wcyBpbiBzdHJpY3QgbW9kZVxuICAgIGlmIChpc0Z1bmN0aW9uKG9iaikgJiYgWydhcmd1bWVudHMnLCAnY2FsbGVyJywgJ2NhbGxlZSddLmluZGV4T2YobmFtZSkgIT09IC0xKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgdmFsdWUgPSBvYmpbbmFtZV07XG5cbiAgICBpZiAoIWlzRnVuY3Rpb24odmFsdWUpKSByZXR1cm47XG5cbiAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBmYWxzZTtcblxuICAgIGlmICgnd3JpdGFibGUnIGluIGRlc2NyaXB0b3IpIHtcbiAgICAgIGRlc2NyaXB0b3Iud3JpdGFibGUgPSBmYWxzZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIWRlc2NyaXB0b3Iuc2V0KSB7XG4gICAgICBkZXNjcmlwdG9yLnNldCA9ICgpID0+IHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ0NhbiBub3QgcmV3cml0ZSByZWFkLW9ubHkgbWV0aG9kIFxcJycgKyBuYW1lICsgJ1xcJycpO1xuICAgICAgfTtcbiAgICB9XG4gIH0pO1xufTtcblxuY29uc3QgdG9PYmplY3RTZXQgPSAoYXJyYXlPclN0cmluZywgZGVsaW1pdGVyKSA9PiB7XG4gIGNvbnN0IG9iaiA9IHt9O1xuXG4gIGNvbnN0IGRlZmluZSA9IChhcnIpID0+IHtcbiAgICBhcnIuZm9yRWFjaCh2YWx1ZSA9PiB7XG4gICAgICBvYmpbdmFsdWVdID0gdHJ1ZTtcbiAgICB9KTtcbiAgfTtcblxuICBpc0FycmF5KGFycmF5T3JTdHJpbmcpID8gZGVmaW5lKGFycmF5T3JTdHJpbmcpIDogZGVmaW5lKFN0cmluZyhhcnJheU9yU3RyaW5nKS5zcGxpdChkZWxpbWl0ZXIpKTtcblxuICByZXR1cm4gb2JqO1xufTtcblxuY29uc3Qgbm9vcCA9ICgpID0+IHt9O1xuXG5jb25zdCB0b0Zpbml0ZU51bWJlciA9ICh2YWx1ZSwgZGVmYXVsdFZhbHVlKSA9PiB7XG4gIHZhbHVlID0gK3ZhbHVlO1xuICByZXR1cm4gTnVtYmVyLmlzRmluaXRlKHZhbHVlKSA/IHZhbHVlIDogZGVmYXVsdFZhbHVlO1xufTtcblxuY29uc3QgQUxQSEEgPSAnYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXonO1xuXG5jb25zdCBESUdJVCA9ICcwMTIzNDU2Nzg5JztcblxuY29uc3QgQUxQSEFCRVQgPSB7XG4gIERJR0lULFxuICBBTFBIQSxcbiAgQUxQSEFfRElHSVQ6IEFMUEhBICsgQUxQSEEudG9VcHBlckNhc2UoKSArIERJR0lUXG59O1xuXG5jb25zdCBnZW5lcmF0ZVN0cmluZyA9IChzaXplID0gMTYsIGFscGhhYmV0ID0gQUxQSEFCRVQuQUxQSEFfRElHSVQpID0+IHtcbiAgbGV0IHN0ciA9ICcnO1xuICBjb25zdCB7bGVuZ3RofSA9IGFscGhhYmV0O1xuICB3aGlsZSAoc2l6ZS0tKSB7XG4gICAgc3RyICs9IGFscGhhYmV0W01hdGgucmFuZG9tKCkgKiBsZW5ndGh8MF07XG4gIH1cblxuICByZXR1cm4gc3RyO1xufTtcblxuLyoqXG4gKiBJZiB0aGUgdGhpbmcgaXMgYSBGb3JtRGF0YSBvYmplY3QsIHJldHVybiB0cnVlLCBvdGhlcndpc2UgcmV0dXJuIGZhbHNlLlxuICpcbiAqIEBwYXJhbSB7dW5rbm93bn0gdGhpbmcgLSBUaGUgdGhpbmcgdG8gY2hlY2suXG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGlzU3BlY0NvbXBsaWFudEZvcm0odGhpbmcpIHtcbiAgcmV0dXJuICEhKHRoaW5nICYmIGlzRnVuY3Rpb24odGhpbmcuYXBwZW5kKSAmJiB0aGluZ1tTeW1ib2wudG9TdHJpbmdUYWddID09PSAnRm9ybURhdGEnICYmIHRoaW5nW1N5bWJvbC5pdGVyYXRvcl0pO1xufVxuXG5jb25zdCB0b0pTT05PYmplY3QgPSAob2JqKSA9PiB7XG4gIGNvbnN0IHN0YWNrID0gbmV3IEFycmF5KDEwKTtcblxuICBjb25zdCB2aXNpdCA9IChzb3VyY2UsIGkpID0+IHtcblxuICAgIGlmIChpc09iamVjdChzb3VyY2UpKSB7XG4gICAgICBpZiAoc3RhY2suaW5kZXhPZihzb3VyY2UpID49IDApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZighKCd0b0pTT04nIGluIHNvdXJjZSkpIHtcbiAgICAgICAgc3RhY2tbaV0gPSBzb3VyY2U7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGlzQXJyYXkoc291cmNlKSA/IFtdIDoge307XG5cbiAgICAgICAgZm9yRWFjaChzb3VyY2UsICh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgICAgY29uc3QgcmVkdWNlZFZhbHVlID0gdmlzaXQodmFsdWUsIGkgKyAxKTtcbiAgICAgICAgICAhaXNVbmRlZmluZWQocmVkdWNlZFZhbHVlKSAmJiAodGFyZ2V0W2tleV0gPSByZWR1Y2VkVmFsdWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBzdGFja1tpXSA9IHVuZGVmaW5lZDtcblxuICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBzb3VyY2U7XG4gIH07XG5cbiAgcmV0dXJuIHZpc2l0KG9iaiwgMCk7XG59O1xuXG5jb25zdCBpc0FzeW5jRm4gPSBraW5kT2ZUZXN0KCdBc3luY0Z1bmN0aW9uJyk7XG5cbmNvbnN0IGlzVGhlbmFibGUgPSAodGhpbmcpID0+XG4gIHRoaW5nICYmIChpc09iamVjdCh0aGluZykgfHwgaXNGdW5jdGlvbih0aGluZykpICYmIGlzRnVuY3Rpb24odGhpbmcudGhlbikgJiYgaXNGdW5jdGlvbih0aGluZy5jYXRjaCk7XG5cbnZhciB1dGlscyA9IHtcbiAgaXNBcnJheSxcbiAgaXNBcnJheUJ1ZmZlcixcbiAgaXNCdWZmZXIsXG4gIGlzRm9ybURhdGEsXG4gIGlzQXJyYXlCdWZmZXJWaWV3LFxuICBpc1N0cmluZyxcbiAgaXNOdW1iZXIsXG4gIGlzQm9vbGVhbixcbiAgaXNPYmplY3QsXG4gIGlzUGxhaW5PYmplY3QsXG4gIGlzVW5kZWZpbmVkLFxuICBpc0RhdGUsXG4gIGlzRmlsZSxcbiAgaXNCbG9iLFxuICBpc1JlZ0V4cCxcbiAgaXNGdW5jdGlvbixcbiAgaXNTdHJlYW0sXG4gIGlzVVJMU2VhcmNoUGFyYW1zLFxuICBpc1R5cGVkQXJyYXksXG4gIGlzRmlsZUxpc3QsXG4gIGZvckVhY2gsXG4gIG1lcmdlLFxuICBleHRlbmQsXG4gIHRyaW0sXG4gIHN0cmlwQk9NLFxuICBpbmhlcml0cyxcbiAgdG9GbGF0T2JqZWN0LFxuICBraW5kT2YsXG4gIGtpbmRPZlRlc3QsXG4gIGVuZHNXaXRoLFxuICB0b0FycmF5LFxuICBmb3JFYWNoRW50cnksXG4gIG1hdGNoQWxsLFxuICBpc0hUTUxGb3JtLFxuICBoYXNPd25Qcm9wZXJ0eSxcbiAgaGFzT3duUHJvcDogaGFzT3duUHJvcGVydHksIC8vIGFuIGFsaWFzIHRvIGF2b2lkIEVTTGludCBuby1wcm90b3R5cGUtYnVpbHRpbnMgZGV0ZWN0aW9uXG4gIHJlZHVjZURlc2NyaXB0b3JzLFxuICBmcmVlemVNZXRob2RzLFxuICB0b09iamVjdFNldCxcbiAgdG9DYW1lbENhc2UsXG4gIG5vb3AsXG4gIHRvRmluaXRlTnVtYmVyLFxuICBmaW5kS2V5LFxuICBnbG9iYWw6IF9nbG9iYWwsXG4gIGlzQ29udGV4dERlZmluZWQsXG4gIEFMUEhBQkVULFxuICBnZW5lcmF0ZVN0cmluZyxcbiAgaXNTcGVjQ29tcGxpYW50Rm9ybSxcbiAgdG9KU09OT2JqZWN0LFxuICBpc0FzeW5jRm4sXG4gIGlzVGhlbmFibGVcbn07XG5cbi8qKlxuICogQ3JlYXRlIGFuIEVycm9yIHdpdGggdGhlIHNwZWNpZmllZCBtZXNzYWdlLCBjb25maWcsIGVycm9yIGNvZGUsIHJlcXVlc3QgYW5kIHJlc3BvbnNlLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIFRoZSBlcnJvciBtZXNzYWdlLlxuICogQHBhcmFtIHtzdHJpbmd9IFtjb2RlXSBUaGUgZXJyb3IgY29kZSAoZm9yIGV4YW1wbGUsICdFQ09OTkFCT1JURUQnKS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbY29uZmlnXSBUaGUgY29uZmlnLlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXF1ZXN0XSBUaGUgcmVxdWVzdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVzcG9uc2VdIFRoZSByZXNwb25zZS5cbiAqXG4gKiBAcmV0dXJucyB7RXJyb3J9IFRoZSBjcmVhdGVkIGVycm9yLlxuICovXG5mdW5jdGlvbiBBeGlvc0Vycm9yKG1lc3NhZ2UsIGNvZGUsIGNvbmZpZywgcmVxdWVzdCwgcmVzcG9uc2UpIHtcbiAgRXJyb3IuY2FsbCh0aGlzKTtcblxuICBpZiAoRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UpIHtcbiAgICBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSh0aGlzLCB0aGlzLmNvbnN0cnVjdG9yKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLnN0YWNrID0gKG5ldyBFcnJvcigpKS5zdGFjaztcbiAgfVxuXG4gIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gIHRoaXMubmFtZSA9ICdBeGlvc0Vycm9yJztcbiAgY29kZSAmJiAodGhpcy5jb2RlID0gY29kZSk7XG4gIGNvbmZpZyAmJiAodGhpcy5jb25maWcgPSBjb25maWcpO1xuICByZXF1ZXN0ICYmICh0aGlzLnJlcXVlc3QgPSByZXF1ZXN0KTtcbiAgcmVzcG9uc2UgJiYgKHRoaXMucmVzcG9uc2UgPSByZXNwb25zZSk7XG59XG5cbnV0aWxzLmluaGVyaXRzKEF4aW9zRXJyb3IsIEVycm9yLCB7XG4gIHRvSlNPTjogZnVuY3Rpb24gdG9KU09OKCkge1xuICAgIHJldHVybiB7XG4gICAgICAvLyBTdGFuZGFyZFxuICAgICAgbWVzc2FnZTogdGhpcy5tZXNzYWdlLFxuICAgICAgbmFtZTogdGhpcy5uYW1lLFxuICAgICAgLy8gTWljcm9zb2Z0XG4gICAgICBkZXNjcmlwdGlvbjogdGhpcy5kZXNjcmlwdGlvbixcbiAgICAgIG51bWJlcjogdGhpcy5udW1iZXIsXG4gICAgICAvLyBNb3ppbGxhXG4gICAgICBmaWxlTmFtZTogdGhpcy5maWxlTmFtZSxcbiAgICAgIGxpbmVOdW1iZXI6IHRoaXMubGluZU51bWJlcixcbiAgICAgIGNvbHVtbk51bWJlcjogdGhpcy5jb2x1bW5OdW1iZXIsXG4gICAgICBzdGFjazogdGhpcy5zdGFjayxcbiAgICAgIC8vIEF4aW9zXG4gICAgICBjb25maWc6IHV0aWxzLnRvSlNPTk9iamVjdCh0aGlzLmNvbmZpZyksXG4gICAgICBjb2RlOiB0aGlzLmNvZGUsXG4gICAgICBzdGF0dXM6IHRoaXMucmVzcG9uc2UgJiYgdGhpcy5yZXNwb25zZS5zdGF0dXMgPyB0aGlzLnJlc3BvbnNlLnN0YXR1cyA6IG51bGxcbiAgICB9O1xuICB9XG59KTtcblxuY29uc3QgcHJvdG90eXBlJDEgPSBBeGlvc0Vycm9yLnByb3RvdHlwZTtcbmNvbnN0IGRlc2NyaXB0b3JzID0ge307XG5cbltcbiAgJ0VSUl9CQURfT1BUSU9OX1ZBTFVFJyxcbiAgJ0VSUl9CQURfT1BUSU9OJyxcbiAgJ0VDT05OQUJPUlRFRCcsXG4gICdFVElNRURPVVQnLFxuICAnRVJSX05FVFdPUksnLFxuICAnRVJSX0ZSX1RPT19NQU5ZX1JFRElSRUNUUycsXG4gICdFUlJfREVQUkVDQVRFRCcsXG4gICdFUlJfQkFEX1JFU1BPTlNFJyxcbiAgJ0VSUl9CQURfUkVRVUVTVCcsXG4gICdFUlJfQ0FOQ0VMRUQnLFxuICAnRVJSX05PVF9TVVBQT1JUJyxcbiAgJ0VSUl9JTlZBTElEX1VSTCdcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG5dLmZvckVhY2goY29kZSA9PiB7XG4gIGRlc2NyaXB0b3JzW2NvZGVdID0ge3ZhbHVlOiBjb2RlfTtcbn0pO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyhBeGlvc0Vycm9yLCBkZXNjcmlwdG9ycyk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkocHJvdG90eXBlJDEsICdpc0F4aW9zRXJyb3InLCB7dmFsdWU6IHRydWV9KTtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbkF4aW9zRXJyb3IuZnJvbSA9IChlcnJvciwgY29kZSwgY29uZmlnLCByZXF1ZXN0LCByZXNwb25zZSwgY3VzdG9tUHJvcHMpID0+IHtcbiAgY29uc3QgYXhpb3NFcnJvciA9IE9iamVjdC5jcmVhdGUocHJvdG90eXBlJDEpO1xuXG4gIHV0aWxzLnRvRmxhdE9iamVjdChlcnJvciwgYXhpb3NFcnJvciwgZnVuY3Rpb24gZmlsdGVyKG9iaikge1xuICAgIHJldHVybiBvYmogIT09IEVycm9yLnByb3RvdHlwZTtcbiAgfSwgcHJvcCA9PiB7XG4gICAgcmV0dXJuIHByb3AgIT09ICdpc0F4aW9zRXJyb3InO1xuICB9KTtcblxuICBBeGlvc0Vycm9yLmNhbGwoYXhpb3NFcnJvciwgZXJyb3IubWVzc2FnZSwgY29kZSwgY29uZmlnLCByZXF1ZXN0LCByZXNwb25zZSk7XG5cbiAgYXhpb3NFcnJvci5jYXVzZSA9IGVycm9yO1xuXG4gIGF4aW9zRXJyb3IubmFtZSA9IGVycm9yLm5hbWU7XG5cbiAgY3VzdG9tUHJvcHMgJiYgT2JqZWN0LmFzc2lnbihheGlvc0Vycm9yLCBjdXN0b21Qcm9wcyk7XG5cbiAgcmV0dXJuIGF4aW9zRXJyb3I7XG59O1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgc3RyaWN0XG52YXIgaHR0cEFkYXB0ZXIgPSBudWxsO1xuXG4vKipcbiAqIERldGVybWluZXMgaWYgdGhlIGdpdmVuIHRoaW5nIGlzIGEgYXJyYXkgb3IganMgb2JqZWN0LlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB0aGluZyAtIFRoZSBvYmplY3Qgb3IgYXJyYXkgdG8gYmUgdmlzaXRlZC5cbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gaXNWaXNpdGFibGUodGhpbmcpIHtcbiAgcmV0dXJuIHV0aWxzLmlzUGxhaW5PYmplY3QodGhpbmcpIHx8IHV0aWxzLmlzQXJyYXkodGhpbmcpO1xufVxuXG4vKipcbiAqIEl0IHJlbW92ZXMgdGhlIGJyYWNrZXRzIGZyb20gdGhlIGVuZCBvZiBhIHN0cmluZ1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgLSBUaGUga2V5IG9mIHRoZSBwYXJhbWV0ZXIuXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gdGhlIGtleSB3aXRob3V0IHRoZSBicmFja2V0cy5cbiAqL1xuZnVuY3Rpb24gcmVtb3ZlQnJhY2tldHMoa2V5KSB7XG4gIHJldHVybiB1dGlscy5lbmRzV2l0aChrZXksICdbXScpID8ga2V5LnNsaWNlKDAsIC0yKSA6IGtleTtcbn1cblxuLyoqXG4gKiBJdCB0YWtlcyBhIHBhdGgsIGEga2V5LCBhbmQgYSBib29sZWFuLCBhbmQgcmV0dXJucyBhIHN0cmluZ1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoIC0gVGhlIHBhdGggdG8gdGhlIGN1cnJlbnQga2V5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSAtIFRoZSBrZXkgb2YgdGhlIGN1cnJlbnQgb2JqZWN0IGJlaW5nIGl0ZXJhdGVkIG92ZXIuXG4gKiBAcGFyYW0ge3N0cmluZ30gZG90cyAtIElmIHRydWUsIHRoZSBrZXkgd2lsbCBiZSByZW5kZXJlZCB3aXRoIGRvdHMgaW5zdGVhZCBvZiBicmFja2V0cy5cbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgcGF0aCB0byB0aGUgY3VycmVudCBrZXkuXG4gKi9cbmZ1bmN0aW9uIHJlbmRlcktleShwYXRoLCBrZXksIGRvdHMpIHtcbiAgaWYgKCFwYXRoKSByZXR1cm4ga2V5O1xuICByZXR1cm4gcGF0aC5jb25jYXQoa2V5KS5tYXAoZnVuY3Rpb24gZWFjaCh0b2tlbiwgaSkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgIHRva2VuID0gcmVtb3ZlQnJhY2tldHModG9rZW4pO1xuICAgIHJldHVybiAhZG90cyAmJiBpID8gJ1snICsgdG9rZW4gKyAnXScgOiB0b2tlbjtcbiAgfSkuam9pbihkb3RzID8gJy4nIDogJycpO1xufVxuXG4vKipcbiAqIElmIHRoZSBhcnJheSBpcyBhbiBhcnJheSBhbmQgbm9uZSBvZiBpdHMgZWxlbWVudHMgYXJlIHZpc2l0YWJsZSwgdGhlbiBpdCdzIGEgZmxhdCBhcnJheS5cbiAqXG4gKiBAcGFyYW0ge0FycmF5PGFueT59IGFyciAtIFRoZSBhcnJheSB0byBjaGVja1xuICpcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBpc0ZsYXRBcnJheShhcnIpIHtcbiAgcmV0dXJuIHV0aWxzLmlzQXJyYXkoYXJyKSAmJiAhYXJyLnNvbWUoaXNWaXNpdGFibGUpO1xufVxuXG5jb25zdCBwcmVkaWNhdGVzID0gdXRpbHMudG9GbGF0T2JqZWN0KHV0aWxzLCB7fSwgbnVsbCwgZnVuY3Rpb24gZmlsdGVyKHByb3ApIHtcbiAgcmV0dXJuIC9eaXNbQS1aXS8udGVzdChwcm9wKTtcbn0pO1xuXG4vKipcbiAqIENvbnZlcnQgYSBkYXRhIG9iamVjdCB0byBGb3JtRGF0YVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEBwYXJhbSB7P09iamVjdH0gW2Zvcm1EYXRhXVxuICogQHBhcmFtIHs/T2JqZWN0fSBbb3B0aW9uc11cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRpb25zLnZpc2l0b3JdXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLm1ldGFUb2tlbnMgPSB0cnVlXVxuICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5kb3RzID0gZmFsc2VdXG4gKiBAcGFyYW0gez9Cb29sZWFufSBbb3B0aW9ucy5pbmRleGVzID0gZmFsc2VdXG4gKlxuICogQHJldHVybnMge09iamVjdH1cbiAqKi9cblxuLyoqXG4gKiBJdCBjb252ZXJ0cyBhbiBvYmplY3QgaW50byBhIEZvcm1EYXRhIG9iamVjdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0PGFueSwgYW55Pn0gb2JqIC0gVGhlIG9iamVjdCB0byBjb252ZXJ0IHRvIGZvcm0gZGF0YS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBmb3JtRGF0YSAtIFRoZSBGb3JtRGF0YSBvYmplY3QgdG8gYXBwZW5kIHRvLlxuICogQHBhcmFtIHtPYmplY3Q8c3RyaW5nLCBhbnk+fSBvcHRpb25zXG4gKlxuICogQHJldHVybnNcbiAqL1xuZnVuY3Rpb24gdG9Gb3JtRGF0YShvYmosIGZvcm1EYXRhLCBvcHRpb25zKSB7XG4gIGlmICghdXRpbHMuaXNPYmplY3Qob2JqKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3RhcmdldCBtdXN0IGJlIGFuIG9iamVjdCcpO1xuICB9XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gIGZvcm1EYXRhID0gZm9ybURhdGEgfHwgbmV3IChGb3JtRGF0YSkoKTtcblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgb3B0aW9ucyA9IHV0aWxzLnRvRmxhdE9iamVjdChvcHRpb25zLCB7XG4gICAgbWV0YVRva2VuczogdHJ1ZSxcbiAgICBkb3RzOiBmYWxzZSxcbiAgICBpbmRleGVzOiBmYWxzZVxuICB9LCBmYWxzZSwgZnVuY3Rpb24gZGVmaW5lZChvcHRpb24sIHNvdXJjZSkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1lcS1udWxsLGVxZXFlcVxuICAgIHJldHVybiAhdXRpbHMuaXNVbmRlZmluZWQoc291cmNlW29wdGlvbl0pO1xuICB9KTtcblxuICBjb25zdCBtZXRhVG9rZW5zID0gb3B0aW9ucy5tZXRhVG9rZW5zO1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdXNlLWJlZm9yZS1kZWZpbmVcbiAgY29uc3QgdmlzaXRvciA9IG9wdGlvbnMudmlzaXRvciB8fCBkZWZhdWx0VmlzaXRvcjtcbiAgY29uc3QgZG90cyA9IG9wdGlvbnMuZG90cztcbiAgY29uc3QgaW5kZXhlcyA9IG9wdGlvbnMuaW5kZXhlcztcbiAgY29uc3QgX0Jsb2IgPSBvcHRpb25zLkJsb2IgfHwgdHlwZW9mIEJsb2IgIT09ICd1bmRlZmluZWQnICYmIEJsb2I7XG4gIGNvbnN0IHVzZUJsb2IgPSBfQmxvYiAmJiB1dGlscy5pc1NwZWNDb21wbGlhbnRGb3JtKGZvcm1EYXRhKTtcblxuICBpZiAoIXV0aWxzLmlzRnVuY3Rpb24odmlzaXRvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCd2aXNpdG9yIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuICB9XG5cbiAgZnVuY3Rpb24gY29udmVydFZhbHVlKHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlID09PSBudWxsKSByZXR1cm4gJyc7XG5cbiAgICBpZiAodXRpbHMuaXNEYXRlKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIHZhbHVlLnRvSVNPU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgaWYgKCF1c2VCbG9iICYmIHV0aWxzLmlzQmxvYih2YWx1ZSkpIHtcbiAgICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKCdCbG9iIGlzIG5vdCBzdXBwb3J0ZWQuIFVzZSBhIEJ1ZmZlciBpbnN0ZWFkLicpO1xuICAgIH1cblxuICAgIGlmICh1dGlscy5pc0FycmF5QnVmZmVyKHZhbHVlKSB8fCB1dGlscy5pc1R5cGVkQXJyYXkodmFsdWUpKSB7XG4gICAgICByZXR1cm4gdXNlQmxvYiAmJiB0eXBlb2YgQmxvYiA9PT0gJ2Z1bmN0aW9uJyA/IG5ldyBCbG9iKFt2YWx1ZV0pIDogQnVmZmVyLmZyb20odmFsdWUpO1xuICAgIH1cblxuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWZhdWx0IHZpc2l0b3IuXG4gICAqXG4gICAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAgICogQHBhcmFtIHtTdHJpbmd8TnVtYmVyfSBrZXlcbiAgICogQHBhcmFtIHtBcnJheTxTdHJpbmd8TnVtYmVyPn0gcGF0aFxuICAgKiBAdGhpcyB7Rm9ybURhdGF9XG4gICAqXG4gICAqIEByZXR1cm5zIHtib29sZWFufSByZXR1cm4gdHJ1ZSB0byB2aXNpdCB0aGUgZWFjaCBwcm9wIG9mIHRoZSB2YWx1ZSByZWN1cnNpdmVseVxuICAgKi9cbiAgZnVuY3Rpb24gZGVmYXVsdFZpc2l0b3IodmFsdWUsIGtleSwgcGF0aCkge1xuICAgIGxldCBhcnIgPSB2YWx1ZTtcblxuICAgIGlmICh2YWx1ZSAmJiAhcGF0aCAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgICBpZiAodXRpbHMuZW5kc1dpdGgoa2V5LCAne30nKSkge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgICAga2V5ID0gbWV0YVRva2VucyA/IGtleSA6IGtleS5zbGljZSgwLCAtMik7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgICB2YWx1ZSA9IEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcbiAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICh1dGlscy5pc0FycmF5KHZhbHVlKSAmJiBpc0ZsYXRBcnJheSh2YWx1ZSkpIHx8XG4gICAgICAgICgodXRpbHMuaXNGaWxlTGlzdCh2YWx1ZSkgfHwgdXRpbHMuZW5kc1dpdGgoa2V5LCAnW10nKSkgJiYgKGFyciA9IHV0aWxzLnRvQXJyYXkodmFsdWUpKVxuICAgICAgICApKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgICBrZXkgPSByZW1vdmVCcmFja2V0cyhrZXkpO1xuXG4gICAgICAgIGFyci5mb3JFYWNoKGZ1bmN0aW9uIGVhY2goZWwsIGluZGV4KSB7XG4gICAgICAgICAgISh1dGlscy5pc1VuZGVmaW5lZChlbCkgfHwgZWwgPT09IG51bGwpICYmIGZvcm1EYXRhLmFwcGVuZChcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXN0ZWQtdGVybmFyeVxuICAgICAgICAgICAgaW5kZXhlcyA9PT0gdHJ1ZSA/IHJlbmRlcktleShba2V5XSwgaW5kZXgsIGRvdHMpIDogKGluZGV4ZXMgPT09IG51bGwgPyBrZXkgOiBrZXkgKyAnW10nKSxcbiAgICAgICAgICAgIGNvbnZlcnRWYWx1ZShlbClcbiAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChpc1Zpc2l0YWJsZSh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGZvcm1EYXRhLmFwcGVuZChyZW5kZXJLZXkocGF0aCwga2V5LCBkb3RzKSwgY29udmVydFZhbHVlKHZhbHVlKSk7XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBjb25zdCBzdGFjayA9IFtdO1xuXG4gIGNvbnN0IGV4cG9zZWRIZWxwZXJzID0gT2JqZWN0LmFzc2lnbihwcmVkaWNhdGVzLCB7XG4gICAgZGVmYXVsdFZpc2l0b3IsXG4gICAgY29udmVydFZhbHVlLFxuICAgIGlzVmlzaXRhYmxlXG4gIH0pO1xuXG4gIGZ1bmN0aW9uIGJ1aWxkKHZhbHVlLCBwYXRoKSB7XG4gICAgaWYgKHV0aWxzLmlzVW5kZWZpbmVkKHZhbHVlKSkgcmV0dXJuO1xuXG4gICAgaWYgKHN0YWNrLmluZGV4T2YodmFsdWUpICE9PSAtMSkge1xuICAgICAgdGhyb3cgRXJyb3IoJ0NpcmN1bGFyIHJlZmVyZW5jZSBkZXRlY3RlZCBpbiAnICsgcGF0aC5qb2luKCcuJykpO1xuICAgIH1cblxuICAgIHN0YWNrLnB1c2godmFsdWUpO1xuXG4gICAgdXRpbHMuZm9yRWFjaCh2YWx1ZSwgZnVuY3Rpb24gZWFjaChlbCwga2V5KSB7XG4gICAgICBjb25zdCByZXN1bHQgPSAhKHV0aWxzLmlzVW5kZWZpbmVkKGVsKSB8fCBlbCA9PT0gbnVsbCkgJiYgdmlzaXRvci5jYWxsKFxuICAgICAgICBmb3JtRGF0YSwgZWwsIHV0aWxzLmlzU3RyaW5nKGtleSkgPyBrZXkudHJpbSgpIDoga2V5LCBwYXRoLCBleHBvc2VkSGVscGVyc1xuICAgICAgKTtcblxuICAgICAgaWYgKHJlc3VsdCA9PT0gdHJ1ZSkge1xuICAgICAgICBidWlsZChlbCwgcGF0aCA/IHBhdGguY29uY2F0KGtleSkgOiBba2V5XSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBzdGFjay5wb3AoKTtcbiAgfVxuXG4gIGlmICghdXRpbHMuaXNPYmplY3Qob2JqKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2RhdGEgbXVzdCBiZSBhbiBvYmplY3QnKTtcbiAgfVxuXG4gIGJ1aWxkKG9iaik7XG5cbiAgcmV0dXJuIGZvcm1EYXRhO1xufVxuXG4vKipcbiAqIEl0IGVuY29kZXMgYSBzdHJpbmcgYnkgcmVwbGFjaW5nIGFsbCBjaGFyYWN0ZXJzIHRoYXQgYXJlIG5vdCBpbiB0aGUgdW5yZXNlcnZlZCBzZXQgd2l0aFxuICogdGhlaXIgcGVyY2VudC1lbmNvZGVkIGVxdWl2YWxlbnRzXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHN0ciAtIFRoZSBzdHJpbmcgdG8gZW5jb2RlLlxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBlbmNvZGVkIHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gZW5jb2RlJDEoc3RyKSB7XG4gIGNvbnN0IGNoYXJNYXAgPSB7XG4gICAgJyEnOiAnJTIxJyxcbiAgICBcIidcIjogJyUyNycsXG4gICAgJygnOiAnJTI4JyxcbiAgICAnKSc6ICclMjknLFxuICAgICd+JzogJyU3RScsXG4gICAgJyUyMCc6ICcrJyxcbiAgICAnJTAwJzogJ1xceDAwJ1xuICB9O1xuICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHN0cikucmVwbGFjZSgvWyEnKCl+XXwlMjB8JTAwL2csIGZ1bmN0aW9uIHJlcGxhY2VyKG1hdGNoKSB7XG4gICAgcmV0dXJuIGNoYXJNYXBbbWF0Y2hdO1xuICB9KTtcbn1cblxuLyoqXG4gKiBJdCB0YWtlcyBhIHBhcmFtcyBvYmplY3QgYW5kIGNvbnZlcnRzIGl0IHRvIGEgRm9ybURhdGEgb2JqZWN0XG4gKlxuICogQHBhcmFtIHtPYmplY3Q8c3RyaW5nLCBhbnk+fSBwYXJhbXMgLSBUaGUgcGFyYW1ldGVycyB0byBiZSBjb252ZXJ0ZWQgdG8gYSBGb3JtRGF0YSBvYmplY3QuXG4gKiBAcGFyYW0ge09iamVjdDxzdHJpbmcsIGFueT59IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBvYmplY3QgcGFzc2VkIHRvIHRoZSBBeGlvcyBjb25zdHJ1Y3Rvci5cbiAqXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZnVuY3Rpb24gQXhpb3NVUkxTZWFyY2hQYXJhbXMocGFyYW1zLCBvcHRpb25zKSB7XG4gIHRoaXMuX3BhaXJzID0gW107XG5cbiAgcGFyYW1zICYmIHRvRm9ybURhdGEocGFyYW1zLCB0aGlzLCBvcHRpb25zKTtcbn1cblxuY29uc3QgcHJvdG90eXBlID0gQXhpb3NVUkxTZWFyY2hQYXJhbXMucHJvdG90eXBlO1xuXG5wcm90b3R5cGUuYXBwZW5kID0gZnVuY3Rpb24gYXBwZW5kKG5hbWUsIHZhbHVlKSB7XG4gIHRoaXMuX3BhaXJzLnB1c2goW25hbWUsIHZhbHVlXSk7XG59O1xuXG5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZyhlbmNvZGVyKSB7XG4gIGNvbnN0IF9lbmNvZGUgPSBlbmNvZGVyID8gZnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXR1cm4gZW5jb2Rlci5jYWxsKHRoaXMsIHZhbHVlLCBlbmNvZGUkMSk7XG4gIH0gOiBlbmNvZGUkMTtcblxuICByZXR1cm4gdGhpcy5fcGFpcnMubWFwKGZ1bmN0aW9uIGVhY2gocGFpcikge1xuICAgIHJldHVybiBfZW5jb2RlKHBhaXJbMF0pICsgJz0nICsgX2VuY29kZShwYWlyWzFdKTtcbiAgfSwgJycpLmpvaW4oJyYnKTtcbn07XG5cbi8qKlxuICogSXQgcmVwbGFjZXMgYWxsIGluc3RhbmNlcyBvZiB0aGUgY2hhcmFjdGVycyBgOmAsIGAkYCwgYCxgLCBgK2AsIGBbYCwgYW5kIGBdYCB3aXRoIHRoZWlyXG4gKiBVUkkgZW5jb2RlZCBjb3VudGVycGFydHNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdmFsIFRoZSB2YWx1ZSB0byBiZSBlbmNvZGVkLlxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBlbmNvZGVkIHZhbHVlLlxuICovXG5mdW5jdGlvbiBlbmNvZGUodmFsKSB7XG4gIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQodmFsKS5cbiAgICByZXBsYWNlKC8lM0EvZ2ksICc6JykuXG4gICAgcmVwbGFjZSgvJTI0L2csICckJykuXG4gICAgcmVwbGFjZSgvJTJDL2dpLCAnLCcpLlxuICAgIHJlcGxhY2UoLyUyMC9nLCAnKycpLlxuICAgIHJlcGxhY2UoLyU1Qi9naSwgJ1snKS5cbiAgICByZXBsYWNlKC8lNUQvZ2ksICddJyk7XG59XG5cbi8qKlxuICogQnVpbGQgYSBVUkwgYnkgYXBwZW5kaW5nIHBhcmFtcyB0byB0aGUgZW5kXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgYmFzZSBvZiB0aGUgdXJsIChlLmcuLCBodHRwOi8vd3d3Lmdvb2dsZS5jb20pXG4gKiBAcGFyYW0ge29iamVjdH0gW3BhcmFtc10gVGhlIHBhcmFtcyB0byBiZSBhcHBlbmRlZFxuICogQHBhcmFtIHs/b2JqZWN0fSBvcHRpb25zXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGZvcm1hdHRlZCB1cmxcbiAqL1xuZnVuY3Rpb24gYnVpbGRVUkwodXJsLCBwYXJhbXMsIG9wdGlvbnMpIHtcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIGlmICghcGFyYW1zKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuICBcbiAgY29uc3QgX2VuY29kZSA9IG9wdGlvbnMgJiYgb3B0aW9ucy5lbmNvZGUgfHwgZW5jb2RlO1xuXG4gIGNvbnN0IHNlcmlhbGl6ZUZuID0gb3B0aW9ucyAmJiBvcHRpb25zLnNlcmlhbGl6ZTtcblxuICBsZXQgc2VyaWFsaXplZFBhcmFtcztcblxuICBpZiAoc2VyaWFsaXplRm4pIHtcbiAgICBzZXJpYWxpemVkUGFyYW1zID0gc2VyaWFsaXplRm4ocGFyYW1zLCBvcHRpb25zKTtcbiAgfSBlbHNlIHtcbiAgICBzZXJpYWxpemVkUGFyYW1zID0gdXRpbHMuaXNVUkxTZWFyY2hQYXJhbXMocGFyYW1zKSA/XG4gICAgICBwYXJhbXMudG9TdHJpbmcoKSA6XG4gICAgICBuZXcgQXhpb3NVUkxTZWFyY2hQYXJhbXMocGFyYW1zLCBvcHRpb25zKS50b1N0cmluZyhfZW5jb2RlKTtcbiAgfVxuXG4gIGlmIChzZXJpYWxpemVkUGFyYW1zKSB7XG4gICAgY29uc3QgaGFzaG1hcmtJbmRleCA9IHVybC5pbmRleE9mKFwiI1wiKTtcblxuICAgIGlmIChoYXNobWFya0luZGV4ICE9PSAtMSkge1xuICAgICAgdXJsID0gdXJsLnNsaWNlKDAsIGhhc2htYXJrSW5kZXgpO1xuICAgIH1cbiAgICB1cmwgKz0gKHVybC5pbmRleE9mKCc/JykgPT09IC0xID8gJz8nIDogJyYnKSArIHNlcmlhbGl6ZWRQYXJhbXM7XG4gIH1cblxuICByZXR1cm4gdXJsO1xufVxuXG5jbGFzcyBJbnRlcmNlcHRvck1hbmFnZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmhhbmRsZXJzID0gW107XG4gIH1cblxuICAvKipcbiAgICogQWRkIGEgbmV3IGludGVyY2VwdG9yIHRvIHRoZSBzdGFja1xuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdWxmaWxsZWQgVGhlIGZ1bmN0aW9uIHRvIGhhbmRsZSBgdGhlbmAgZm9yIGEgYFByb21pc2VgXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IHJlamVjdGVkIFRoZSBmdW5jdGlvbiB0byBoYW5kbGUgYHJlamVjdGAgZm9yIGEgYFByb21pc2VgXG4gICAqXG4gICAqIEByZXR1cm4ge051bWJlcn0gQW4gSUQgdXNlZCB0byByZW1vdmUgaW50ZXJjZXB0b3IgbGF0ZXJcbiAgICovXG4gIHVzZShmdWxmaWxsZWQsIHJlamVjdGVkLCBvcHRpb25zKSB7XG4gICAgdGhpcy5oYW5kbGVycy5wdXNoKHtcbiAgICAgIGZ1bGZpbGxlZCxcbiAgICAgIHJlamVjdGVkLFxuICAgICAgc3luY2hyb25vdXM6IG9wdGlvbnMgPyBvcHRpb25zLnN5bmNocm9ub3VzIDogZmFsc2UsXG4gICAgICBydW5XaGVuOiBvcHRpb25zID8gb3B0aW9ucy5ydW5XaGVuIDogbnVsbFxuICAgIH0pO1xuICAgIHJldHVybiB0aGlzLmhhbmRsZXJzLmxlbmd0aCAtIDE7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGFuIGludGVyY2VwdG9yIGZyb20gdGhlIHN0YWNrXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBpZCBUaGUgSUQgdGhhdCB3YXMgcmV0dXJuZWQgYnkgYHVzZWBcbiAgICpcbiAgICogQHJldHVybnMge0Jvb2xlYW59IGB0cnVlYCBpZiB0aGUgaW50ZXJjZXB0b3Igd2FzIHJlbW92ZWQsIGBmYWxzZWAgb3RoZXJ3aXNlXG4gICAqL1xuICBlamVjdChpZCkge1xuICAgIGlmICh0aGlzLmhhbmRsZXJzW2lkXSkge1xuICAgICAgdGhpcy5oYW5kbGVyc1tpZF0gPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhciBhbGwgaW50ZXJjZXB0b3JzIGZyb20gdGhlIHN0YWNrXG4gICAqXG4gICAqIEByZXR1cm5zIHt2b2lkfVxuICAgKi9cbiAgY2xlYXIoKSB7XG4gICAgaWYgKHRoaXMuaGFuZGxlcnMpIHtcbiAgICAgIHRoaXMuaGFuZGxlcnMgPSBbXTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSXRlcmF0ZSBvdmVyIGFsbCB0aGUgcmVnaXN0ZXJlZCBpbnRlcmNlcHRvcnNcbiAgICpcbiAgICogVGhpcyBtZXRob2QgaXMgcGFydGljdWxhcmx5IHVzZWZ1bCBmb3Igc2tpcHBpbmcgb3ZlciBhbnlcbiAgICogaW50ZXJjZXB0b3JzIHRoYXQgbWF5IGhhdmUgYmVjb21lIGBudWxsYCBjYWxsaW5nIGBlamVjdGAuXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBjYWxsIGZvciBlYWNoIGludGVyY2VwdG9yXG4gICAqXG4gICAqIEByZXR1cm5zIHt2b2lkfVxuICAgKi9cbiAgZm9yRWFjaChmbikge1xuICAgIHV0aWxzLmZvckVhY2godGhpcy5oYW5kbGVycywgZnVuY3Rpb24gZm9yRWFjaEhhbmRsZXIoaCkge1xuICAgICAgaWYgKGggIT09IG51bGwpIHtcbiAgICAgICAgZm4oaCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cblxudmFyIEludGVyY2VwdG9yTWFuYWdlciQxID0gSW50ZXJjZXB0b3JNYW5hZ2VyO1xuXG52YXIgdHJhbnNpdGlvbmFsRGVmYXVsdHMgPSB7XG4gIHNpbGVudEpTT05QYXJzaW5nOiB0cnVlLFxuICBmb3JjZWRKU09OUGFyc2luZzogdHJ1ZSxcbiAgY2xhcmlmeVRpbWVvdXRFcnJvcjogZmFsc2Vcbn07XG5cbnZhciBVUkxTZWFyY2hQYXJhbXMkMSA9IHR5cGVvZiBVUkxTZWFyY2hQYXJhbXMgIT09ICd1bmRlZmluZWQnID8gVVJMU2VhcmNoUGFyYW1zIDogQXhpb3NVUkxTZWFyY2hQYXJhbXM7XG5cbnZhciBGb3JtRGF0YSQxID0gdHlwZW9mIEZvcm1EYXRhICE9PSAndW5kZWZpbmVkJyA/IEZvcm1EYXRhIDogbnVsbDtcblxudmFyIEJsb2IkMSA9IHR5cGVvZiBCbG9iICE9PSAndW5kZWZpbmVkJyA/IEJsb2IgOiBudWxsO1xuXG4vKipcbiAqIERldGVybWluZSBpZiB3ZSdyZSBydW5uaW5nIGluIGEgc3RhbmRhcmQgYnJvd3NlciBlbnZpcm9ubWVudFxuICpcbiAqIFRoaXMgYWxsb3dzIGF4aW9zIHRvIHJ1biBpbiBhIHdlYiB3b3JrZXIsIGFuZCByZWFjdC1uYXRpdmUuXG4gKiBCb3RoIGVudmlyb25tZW50cyBzdXBwb3J0IFhNTEh0dHBSZXF1ZXN0LCBidXQgbm90IGZ1bGx5IHN0YW5kYXJkIGdsb2JhbHMuXG4gKlxuICogd2ViIHdvcmtlcnM6XG4gKiAgdHlwZW9mIHdpbmRvdyAtPiB1bmRlZmluZWRcbiAqICB0eXBlb2YgZG9jdW1lbnQgLT4gdW5kZWZpbmVkXG4gKlxuICogcmVhY3QtbmF0aXZlOlxuICogIG5hdmlnYXRvci5wcm9kdWN0IC0+ICdSZWFjdE5hdGl2ZSdcbiAqIG5hdGl2ZXNjcmlwdFxuICogIG5hdmlnYXRvci5wcm9kdWN0IC0+ICdOYXRpdmVTY3JpcHQnIG9yICdOUydcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuY29uc3QgaXNTdGFuZGFyZEJyb3dzZXJFbnYgPSAoKCkgPT4ge1xuICBsZXQgcHJvZHVjdDtcbiAgaWYgKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIChcbiAgICAocHJvZHVjdCA9IG5hdmlnYXRvci5wcm9kdWN0KSA9PT0gJ1JlYWN0TmF0aXZlJyB8fFxuICAgIHByb2R1Y3QgPT09ICdOYXRpdmVTY3JpcHQnIHx8XG4gICAgcHJvZHVjdCA9PT0gJ05TJylcbiAgKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCc7XG59KSgpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiB3ZSdyZSBydW5uaW5nIGluIGEgc3RhbmRhcmQgYnJvd3NlciB3ZWJXb3JrZXIgZW52aXJvbm1lbnRcbiAqXG4gKiBBbHRob3VnaCB0aGUgYGlzU3RhbmRhcmRCcm93c2VyRW52YCBtZXRob2QgaW5kaWNhdGVzIHRoYXRcbiAqIGBhbGxvd3MgYXhpb3MgdG8gcnVuIGluIGEgd2ViIHdvcmtlcmAsIHRoZSBXZWJXb3JrZXIgd2lsbCBzdGlsbCBiZVxuICogZmlsdGVyZWQgb3V0IGR1ZSB0byBpdHMganVkZ21lbnQgc3RhbmRhcmRcbiAqIGB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnYC5cbiAqIFRoaXMgbGVhZHMgdG8gYSBwcm9ibGVtIHdoZW4gYXhpb3MgcG9zdCBgRm9ybURhdGFgIGluIHdlYldvcmtlclxuICovXG4gY29uc3QgaXNTdGFuZGFyZEJyb3dzZXJXZWJXb3JrZXJFbnYgPSAoKCkgPT4ge1xuICByZXR1cm4gKFxuICAgIHR5cGVvZiBXb3JrZXJHbG9iYWxTY29wZSAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcbiAgICBzZWxmIGluc3RhbmNlb2YgV29ya2VyR2xvYmFsU2NvcGUgJiZcbiAgICB0eXBlb2Ygc2VsZi5pbXBvcnRTY3JpcHRzID09PSAnZnVuY3Rpb24nXG4gICk7XG59KSgpO1xuXG5cbnZhciBwbGF0Zm9ybSA9IHtcbiAgaXNCcm93c2VyOiB0cnVlLFxuICBjbGFzc2VzOiB7XG4gICAgVVJMU2VhcmNoUGFyYW1zOiBVUkxTZWFyY2hQYXJhbXMkMSxcbiAgICBGb3JtRGF0YTogRm9ybURhdGEkMSxcbiAgICBCbG9iOiBCbG9iJDFcbiAgfSxcbiAgaXNTdGFuZGFyZEJyb3dzZXJFbnYsXG4gIGlzU3RhbmRhcmRCcm93c2VyV2ViV29ya2VyRW52LFxuICBwcm90b2NvbHM6IFsnaHR0cCcsICdodHRwcycsICdmaWxlJywgJ2Jsb2InLCAndXJsJywgJ2RhdGEnXVxufTtcblxuZnVuY3Rpb24gdG9VUkxFbmNvZGVkRm9ybShkYXRhLCBvcHRpb25zKSB7XG4gIHJldHVybiB0b0Zvcm1EYXRhKGRhdGEsIG5ldyBwbGF0Zm9ybS5jbGFzc2VzLlVSTFNlYXJjaFBhcmFtcygpLCBPYmplY3QuYXNzaWduKHtcbiAgICB2aXNpdG9yOiBmdW5jdGlvbih2YWx1ZSwga2V5LCBwYXRoLCBoZWxwZXJzKSB7XG4gICAgICBpZiAocGxhdGZvcm0uaXNOb2RlICYmIHV0aWxzLmlzQnVmZmVyKHZhbHVlKSkge1xuICAgICAgICB0aGlzLmFwcGVuZChrZXksIHZhbHVlLnRvU3RyaW5nKCdiYXNlNjQnKSk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGhlbHBlcnMuZGVmYXVsdFZpc2l0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9XG4gIH0sIG9wdGlvbnMpKTtcbn1cblxuLyoqXG4gKiBJdCB0YWtlcyBhIHN0cmluZyBsaWtlIGBmb29beF1beV1bel1gIGFuZCByZXR1cm5zIGFuIGFycmF5IGxpa2UgYFsnZm9vJywgJ3gnLCAneScsICd6J11cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKlxuICogQHJldHVybnMgQW4gYXJyYXkgb2Ygc3RyaW5ncy5cbiAqL1xuZnVuY3Rpb24gcGFyc2VQcm9wUGF0aChuYW1lKSB7XG4gIC8vIGZvb1t4XVt5XVt6XVxuICAvLyBmb28ueC55LnpcbiAgLy8gZm9vLXgteS16XG4gIC8vIGZvbyB4IHkgelxuICByZXR1cm4gdXRpbHMubWF0Y2hBbGwoL1xcdyt8XFxbKFxcdyopXS9nLCBuYW1lKS5tYXAobWF0Y2ggPT4ge1xuICAgIHJldHVybiBtYXRjaFswXSA9PT0gJ1tdJyA/ICcnIDogbWF0Y2hbMV0gfHwgbWF0Y2hbMF07XG4gIH0pO1xufVxuXG4vKipcbiAqIENvbnZlcnQgYW4gYXJyYXkgdG8gYW4gb2JqZWN0LlxuICpcbiAqIEBwYXJhbSB7QXJyYXk8YW55Pn0gYXJyIC0gVGhlIGFycmF5IHRvIGNvbnZlcnQgdG8gYW4gb2JqZWN0LlxuICpcbiAqIEByZXR1cm5zIEFuIG9iamVjdCB3aXRoIHRoZSBzYW1lIGtleXMgYW5kIHZhbHVlcyBhcyB0aGUgYXJyYXkuXG4gKi9cbmZ1bmN0aW9uIGFycmF5VG9PYmplY3QoYXJyKSB7XG4gIGNvbnN0IG9iaiA9IHt9O1xuICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoYXJyKTtcbiAgbGV0IGk7XG4gIGNvbnN0IGxlbiA9IGtleXMubGVuZ3RoO1xuICBsZXQga2V5O1xuICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICBrZXkgPSBrZXlzW2ldO1xuICAgIG9ialtrZXldID0gYXJyW2tleV07XG4gIH1cbiAgcmV0dXJuIG9iajtcbn1cblxuLyoqXG4gKiBJdCB0YWtlcyBhIEZvcm1EYXRhIG9iamVjdCBhbmQgcmV0dXJucyBhIEphdmFTY3JpcHQgb2JqZWN0XG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGZvcm1EYXRhIFRoZSBGb3JtRGF0YSBvYmplY3QgdG8gY29udmVydCB0byBKU09OLlxuICpcbiAqIEByZXR1cm5zIHtPYmplY3Q8c3RyaW5nLCBhbnk+IHwgbnVsbH0gVGhlIGNvbnZlcnRlZCBvYmplY3QuXG4gKi9cbmZ1bmN0aW9uIGZvcm1EYXRhVG9KU09OKGZvcm1EYXRhKSB7XG4gIGZ1bmN0aW9uIGJ1aWxkUGF0aChwYXRoLCB2YWx1ZSwgdGFyZ2V0LCBpbmRleCkge1xuICAgIGxldCBuYW1lID0gcGF0aFtpbmRleCsrXTtcbiAgICBjb25zdCBpc051bWVyaWNLZXkgPSBOdW1iZXIuaXNGaW5pdGUoK25hbWUpO1xuICAgIGNvbnN0IGlzTGFzdCA9IGluZGV4ID49IHBhdGgubGVuZ3RoO1xuICAgIG5hbWUgPSAhbmFtZSAmJiB1dGlscy5pc0FycmF5KHRhcmdldCkgPyB0YXJnZXQubGVuZ3RoIDogbmFtZTtcblxuICAgIGlmIChpc0xhc3QpIHtcbiAgICAgIGlmICh1dGlscy5oYXNPd25Qcm9wKHRhcmdldCwgbmFtZSkpIHtcbiAgICAgICAgdGFyZ2V0W25hbWVdID0gW3RhcmdldFtuYW1lXSwgdmFsdWVdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGFyZ2V0W25hbWVdID0gdmFsdWU7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAhaXNOdW1lcmljS2V5O1xuICAgIH1cblxuICAgIGlmICghdGFyZ2V0W25hbWVdIHx8ICF1dGlscy5pc09iamVjdCh0YXJnZXRbbmFtZV0pKSB7XG4gICAgICB0YXJnZXRbbmFtZV0gPSBbXTtcbiAgICB9XG5cbiAgICBjb25zdCByZXN1bHQgPSBidWlsZFBhdGgocGF0aCwgdmFsdWUsIHRhcmdldFtuYW1lXSwgaW5kZXgpO1xuXG4gICAgaWYgKHJlc3VsdCAmJiB1dGlscy5pc0FycmF5KHRhcmdldFtuYW1lXSkpIHtcbiAgICAgIHRhcmdldFtuYW1lXSA9IGFycmF5VG9PYmplY3QodGFyZ2V0W25hbWVdKTtcbiAgICB9XG5cbiAgICByZXR1cm4gIWlzTnVtZXJpY0tleTtcbiAgfVxuXG4gIGlmICh1dGlscy5pc0Zvcm1EYXRhKGZvcm1EYXRhKSAmJiB1dGlscy5pc0Z1bmN0aW9uKGZvcm1EYXRhLmVudHJpZXMpKSB7XG4gICAgY29uc3Qgb2JqID0ge307XG5cbiAgICB1dGlscy5mb3JFYWNoRW50cnkoZm9ybURhdGEsIChuYW1lLCB2YWx1ZSkgPT4ge1xuICAgICAgYnVpbGRQYXRoKHBhcnNlUHJvcFBhdGgobmFtZSksIHZhbHVlLCBvYmosIDApO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIG9iajtcbiAgfVxuXG4gIHJldHVybiBudWxsO1xufVxuXG5jb25zdCBERUZBVUxUX0NPTlRFTlRfVFlQRSA9IHtcbiAgJ0NvbnRlbnQtVHlwZSc6IHVuZGVmaW5lZFxufTtcblxuLyoqXG4gKiBJdCB0YWtlcyBhIHN0cmluZywgdHJpZXMgdG8gcGFyc2UgaXQsIGFuZCBpZiBpdCBmYWlscywgaXQgcmV0dXJucyB0aGUgc3RyaW5naWZpZWQgdmVyc2lvblxuICogb2YgdGhlIGlucHV0XG4gKlxuICogQHBhcmFtIHthbnl9IHJhd1ZhbHVlIC0gVGhlIHZhbHVlIHRvIGJlIHN0cmluZ2lmaWVkLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcGFyc2VyIC0gQSBmdW5jdGlvbiB0aGF0IHBhcnNlcyBhIHN0cmluZyBpbnRvIGEgSmF2YVNjcmlwdCBvYmplY3QuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBlbmNvZGVyIC0gQSBmdW5jdGlvbiB0aGF0IHRha2VzIGEgdmFsdWUgYW5kIHJldHVybnMgYSBzdHJpbmcuXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gQSBzdHJpbmdpZmllZCB2ZXJzaW9uIG9mIHRoZSByYXdWYWx1ZS5cbiAqL1xuZnVuY3Rpb24gc3RyaW5naWZ5U2FmZWx5KHJhd1ZhbHVlLCBwYXJzZXIsIGVuY29kZXIpIHtcbiAgaWYgKHV0aWxzLmlzU3RyaW5nKHJhd1ZhbHVlKSkge1xuICAgIHRyeSB7XG4gICAgICAocGFyc2VyIHx8IEpTT04ucGFyc2UpKHJhd1ZhbHVlKTtcbiAgICAgIHJldHVybiB1dGlscy50cmltKHJhd1ZhbHVlKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBpZiAoZS5uYW1lICE9PSAnU3ludGF4RXJyb3InKSB7XG4gICAgICAgIHRocm93IGU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIChlbmNvZGVyIHx8IEpTT04uc3RyaW5naWZ5KShyYXdWYWx1ZSk7XG59XG5cbmNvbnN0IGRlZmF1bHRzID0ge1xuXG4gIHRyYW5zaXRpb25hbDogdHJhbnNpdGlvbmFsRGVmYXVsdHMsXG5cbiAgYWRhcHRlcjogWyd4aHInLCAnaHR0cCddLFxuXG4gIHRyYW5zZm9ybVJlcXVlc3Q6IFtmdW5jdGlvbiB0cmFuc2Zvcm1SZXF1ZXN0KGRhdGEsIGhlYWRlcnMpIHtcbiAgICBjb25zdCBjb250ZW50VHlwZSA9IGhlYWRlcnMuZ2V0Q29udGVudFR5cGUoKSB8fCAnJztcbiAgICBjb25zdCBoYXNKU09OQ29udGVudFR5cGUgPSBjb250ZW50VHlwZS5pbmRleE9mKCdhcHBsaWNhdGlvbi9qc29uJykgPiAtMTtcbiAgICBjb25zdCBpc09iamVjdFBheWxvYWQgPSB1dGlscy5pc09iamVjdChkYXRhKTtcblxuICAgIGlmIChpc09iamVjdFBheWxvYWQgJiYgdXRpbHMuaXNIVE1MRm9ybShkYXRhKSkge1xuICAgICAgZGF0YSA9IG5ldyBGb3JtRGF0YShkYXRhKTtcbiAgICB9XG5cbiAgICBjb25zdCBpc0Zvcm1EYXRhID0gdXRpbHMuaXNGb3JtRGF0YShkYXRhKTtcblxuICAgIGlmIChpc0Zvcm1EYXRhKSB7XG4gICAgICBpZiAoIWhhc0pTT05Db250ZW50VHlwZSkge1xuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBoYXNKU09OQ29udGVudFR5cGUgPyBKU09OLnN0cmluZ2lmeShmb3JtRGF0YVRvSlNPTihkYXRhKSkgOiBkYXRhO1xuICAgIH1cblxuICAgIGlmICh1dGlscy5pc0FycmF5QnVmZmVyKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0J1ZmZlcihkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNTdHJlYW0oZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzRmlsZShkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNCbG9iKGRhdGEpXG4gICAgKSB7XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG4gICAgaWYgKHV0aWxzLmlzQXJyYXlCdWZmZXJWaWV3KGRhdGEpKSB7XG4gICAgICByZXR1cm4gZGF0YS5idWZmZXI7XG4gICAgfVxuICAgIGlmICh1dGlscy5pc1VSTFNlYXJjaFBhcmFtcyhkYXRhKSkge1xuICAgICAgaGVhZGVycy5zZXRDb250ZW50VHlwZSgnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9dXRmLTgnLCBmYWxzZSk7XG4gICAgICByZXR1cm4gZGF0YS50b1N0cmluZygpO1xuICAgIH1cblxuICAgIGxldCBpc0ZpbGVMaXN0O1xuXG4gICAgaWYgKGlzT2JqZWN0UGF5bG9hZCkge1xuICAgICAgaWYgKGNvbnRlbnRUeXBlLmluZGV4T2YoJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcpID4gLTEpIHtcbiAgICAgICAgcmV0dXJuIHRvVVJMRW5jb2RlZEZvcm0oZGF0YSwgdGhpcy5mb3JtU2VyaWFsaXplcikudG9TdHJpbmcoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKChpc0ZpbGVMaXN0ID0gdXRpbHMuaXNGaWxlTGlzdChkYXRhKSkgfHwgY29udGVudFR5cGUuaW5kZXhPZignbXVsdGlwYXJ0L2Zvcm0tZGF0YScpID4gLTEpIHtcbiAgICAgICAgY29uc3QgX0Zvcm1EYXRhID0gdGhpcy5lbnYgJiYgdGhpcy5lbnYuRm9ybURhdGE7XG5cbiAgICAgICAgcmV0dXJuIHRvRm9ybURhdGEoXG4gICAgICAgICAgaXNGaWxlTGlzdCA/IHsnZmlsZXNbXSc6IGRhdGF9IDogZGF0YSxcbiAgICAgICAgICBfRm9ybURhdGEgJiYgbmV3IF9Gb3JtRGF0YSgpLFxuICAgICAgICAgIHRoaXMuZm9ybVNlcmlhbGl6ZXJcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoaXNPYmplY3RQYXlsb2FkIHx8IGhhc0pTT05Db250ZW50VHlwZSApIHtcbiAgICAgIGhlYWRlcnMuc2V0Q29udGVudFR5cGUoJ2FwcGxpY2F0aW9uL2pzb24nLCBmYWxzZSk7XG4gICAgICByZXR1cm4gc3RyaW5naWZ5U2FmZWx5KGRhdGEpO1xuICAgIH1cblxuICAgIHJldHVybiBkYXRhO1xuICB9XSxcblxuICB0cmFuc2Zvcm1SZXNwb25zZTogW2Z1bmN0aW9uIHRyYW5zZm9ybVJlc3BvbnNlKGRhdGEpIHtcbiAgICBjb25zdCB0cmFuc2l0aW9uYWwgPSB0aGlzLnRyYW5zaXRpb25hbCB8fCBkZWZhdWx0cy50cmFuc2l0aW9uYWw7XG4gICAgY29uc3QgZm9yY2VkSlNPTlBhcnNpbmcgPSB0cmFuc2l0aW9uYWwgJiYgdHJhbnNpdGlvbmFsLmZvcmNlZEpTT05QYXJzaW5nO1xuICAgIGNvbnN0IEpTT05SZXF1ZXN0ZWQgPSB0aGlzLnJlc3BvbnNlVHlwZSA9PT0gJ2pzb24nO1xuXG4gICAgaWYgKGRhdGEgJiYgdXRpbHMuaXNTdHJpbmcoZGF0YSkgJiYgKChmb3JjZWRKU09OUGFyc2luZyAmJiAhdGhpcy5yZXNwb25zZVR5cGUpIHx8IEpTT05SZXF1ZXN0ZWQpKSB7XG4gICAgICBjb25zdCBzaWxlbnRKU09OUGFyc2luZyA9IHRyYW5zaXRpb25hbCAmJiB0cmFuc2l0aW9uYWwuc2lsZW50SlNPTlBhcnNpbmc7XG4gICAgICBjb25zdCBzdHJpY3RKU09OUGFyc2luZyA9ICFzaWxlbnRKU09OUGFyc2luZyAmJiBKU09OUmVxdWVzdGVkO1xuXG4gICAgICB0cnkge1xuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShkYXRhKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgaWYgKHN0cmljdEpTT05QYXJzaW5nKSB7XG4gICAgICAgICAgaWYgKGUubmFtZSA9PT0gJ1N5bnRheEVycm9yJykge1xuICAgICAgICAgICAgdGhyb3cgQXhpb3NFcnJvci5mcm9tKGUsIEF4aW9zRXJyb3IuRVJSX0JBRF9SRVNQT05TRSwgdGhpcywgbnVsbCwgdGhpcy5yZXNwb25zZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRocm93IGU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZGF0YTtcbiAgfV0sXG5cbiAgLyoqXG4gICAqIEEgdGltZW91dCBpbiBtaWxsaXNlY29uZHMgdG8gYWJvcnQgYSByZXF1ZXN0LiBJZiBzZXQgdG8gMCAoZGVmYXVsdCkgYVxuICAgKiB0aW1lb3V0IGlzIG5vdCBjcmVhdGVkLlxuICAgKi9cbiAgdGltZW91dDogMCxcblxuICB4c3JmQ29va2llTmFtZTogJ1hTUkYtVE9LRU4nLFxuICB4c3JmSGVhZGVyTmFtZTogJ1gtWFNSRi1UT0tFTicsXG5cbiAgbWF4Q29udGVudExlbmd0aDogLTEsXG4gIG1heEJvZHlMZW5ndGg6IC0xLFxuXG4gIGVudjoge1xuICAgIEZvcm1EYXRhOiBwbGF0Zm9ybS5jbGFzc2VzLkZvcm1EYXRhLFxuICAgIEJsb2I6IHBsYXRmb3JtLmNsYXNzZXMuQmxvYlxuICB9LFxuXG4gIHZhbGlkYXRlU3RhdHVzOiBmdW5jdGlvbiB2YWxpZGF0ZVN0YXR1cyhzdGF0dXMpIHtcbiAgICByZXR1cm4gc3RhdHVzID49IDIwMCAmJiBzdGF0dXMgPCAzMDA7XG4gIH0sXG5cbiAgaGVhZGVyczoge1xuICAgIGNvbW1vbjoge1xuICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uLCB0ZXh0L3BsYWluLCAqLyonXG4gICAgfVxuICB9XG59O1xuXG51dGlscy5mb3JFYWNoKFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2ROb0RhdGEobWV0aG9kKSB7XG4gIGRlZmF1bHRzLmhlYWRlcnNbbWV0aG9kXSA9IHt9O1xufSk7XG5cbnV0aWxzLmZvckVhY2goWydwb3N0JywgJ3B1dCcsICdwYXRjaCddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kV2l0aERhdGEobWV0aG9kKSB7XG4gIGRlZmF1bHRzLmhlYWRlcnNbbWV0aG9kXSA9IHV0aWxzLm1lcmdlKERFRkFVTFRfQ09OVEVOVF9UWVBFKTtcbn0pO1xuXG52YXIgZGVmYXVsdHMkMSA9IGRlZmF1bHRzO1xuXG4vLyBSYXdBeGlvc0hlYWRlcnMgd2hvc2UgZHVwbGljYXRlcyBhcmUgaWdub3JlZCBieSBub2RlXG4vLyBjLmYuIGh0dHBzOi8vbm9kZWpzLm9yZy9hcGkvaHR0cC5odG1sI2h0dHBfbWVzc2FnZV9oZWFkZXJzXG5jb25zdCBpZ25vcmVEdXBsaWNhdGVPZiA9IHV0aWxzLnRvT2JqZWN0U2V0KFtcbiAgJ2FnZScsICdhdXRob3JpemF0aW9uJywgJ2NvbnRlbnQtbGVuZ3RoJywgJ2NvbnRlbnQtdHlwZScsICdldGFnJyxcbiAgJ2V4cGlyZXMnLCAnZnJvbScsICdob3N0JywgJ2lmLW1vZGlmaWVkLXNpbmNlJywgJ2lmLXVubW9kaWZpZWQtc2luY2UnLFxuICAnbGFzdC1tb2RpZmllZCcsICdsb2NhdGlvbicsICdtYXgtZm9yd2FyZHMnLCAncHJveHktYXV0aG9yaXphdGlvbicsXG4gICdyZWZlcmVyJywgJ3JldHJ5LWFmdGVyJywgJ3VzZXItYWdlbnQnXG5dKTtcblxuLyoqXG4gKiBQYXJzZSBoZWFkZXJzIGludG8gYW4gb2JqZWN0XG4gKlxuICogYGBgXG4gKiBEYXRlOiBXZWQsIDI3IEF1ZyAyMDE0IDA4OjU4OjQ5IEdNVFxuICogQ29udGVudC1UeXBlOiBhcHBsaWNhdGlvbi9qc29uXG4gKiBDb25uZWN0aW9uOiBrZWVwLWFsaXZlXG4gKiBUcmFuc2Zlci1FbmNvZGluZzogY2h1bmtlZFxuICogYGBgXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHJhd0hlYWRlcnMgSGVhZGVycyBuZWVkaW5nIHRvIGJlIHBhcnNlZFxuICpcbiAqIEByZXR1cm5zIHtPYmplY3R9IEhlYWRlcnMgcGFyc2VkIGludG8gYW4gb2JqZWN0XG4gKi9cbnZhciBwYXJzZUhlYWRlcnMgPSByYXdIZWFkZXJzID0+IHtcbiAgY29uc3QgcGFyc2VkID0ge307XG4gIGxldCBrZXk7XG4gIGxldCB2YWw7XG4gIGxldCBpO1xuXG4gIHJhd0hlYWRlcnMgJiYgcmF3SGVhZGVycy5zcGxpdCgnXFxuJykuZm9yRWFjaChmdW5jdGlvbiBwYXJzZXIobGluZSkge1xuICAgIGkgPSBsaW5lLmluZGV4T2YoJzonKTtcbiAgICBrZXkgPSBsaW5lLnN1YnN0cmluZygwLCBpKS50cmltKCkudG9Mb3dlckNhc2UoKTtcbiAgICB2YWwgPSBsaW5lLnN1YnN0cmluZyhpICsgMSkudHJpbSgpO1xuXG4gICAgaWYgKCFrZXkgfHwgKHBhcnNlZFtrZXldICYmIGlnbm9yZUR1cGxpY2F0ZU9mW2tleV0pKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGtleSA9PT0gJ3NldC1jb29raWUnKSB7XG4gICAgICBpZiAocGFyc2VkW2tleV0pIHtcbiAgICAgICAgcGFyc2VkW2tleV0ucHVzaCh2YWwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFyc2VkW2tleV0gPSBbdmFsXTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcGFyc2VkW2tleV0gPSBwYXJzZWRba2V5XSA/IHBhcnNlZFtrZXldICsgJywgJyArIHZhbCA6IHZhbDtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBwYXJzZWQ7XG59O1xuXG5jb25zdCAkaW50ZXJuYWxzID0gU3ltYm9sKCdpbnRlcm5hbHMnKTtcblxuZnVuY3Rpb24gbm9ybWFsaXplSGVhZGVyKGhlYWRlcikge1xuICByZXR1cm4gaGVhZGVyICYmIFN0cmluZyhoZWFkZXIpLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xufVxuXG5mdW5jdGlvbiBub3JtYWxpemVWYWx1ZSh2YWx1ZSkge1xuICBpZiAodmFsdWUgPT09IGZhbHNlIHx8IHZhbHVlID09IG51bGwpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICByZXR1cm4gdXRpbHMuaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZS5tYXAobm9ybWFsaXplVmFsdWUpIDogU3RyaW5nKHZhbHVlKTtcbn1cblxuZnVuY3Rpb24gcGFyc2VUb2tlbnMoc3RyKSB7XG4gIGNvbnN0IHRva2VucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gIGNvbnN0IHRva2Vuc1JFID0gLyhbXlxccyw7PV0rKVxccyooPzo9XFxzKihbXiw7XSspKT8vZztcbiAgbGV0IG1hdGNoO1xuXG4gIHdoaWxlICgobWF0Y2ggPSB0b2tlbnNSRS5leGVjKHN0cikpKSB7XG4gICAgdG9rZW5zW21hdGNoWzFdXSA9IG1hdGNoWzJdO1xuICB9XG5cbiAgcmV0dXJuIHRva2Vucztcbn1cblxuY29uc3QgaXNWYWxpZEhlYWRlck5hbWUgPSAoc3RyKSA9PiAvXlstX2EtekEtWjAtOV5gfH4sISMkJSYnKisuXSskLy50ZXN0KHN0ci50cmltKCkpO1xuXG5mdW5jdGlvbiBtYXRjaEhlYWRlclZhbHVlKGNvbnRleHQsIHZhbHVlLCBoZWFkZXIsIGZpbHRlciwgaXNIZWFkZXJOYW1lRmlsdGVyKSB7XG4gIGlmICh1dGlscy5pc0Z1bmN0aW9uKGZpbHRlcikpIHtcbiAgICByZXR1cm4gZmlsdGVyLmNhbGwodGhpcywgdmFsdWUsIGhlYWRlcik7XG4gIH1cblxuICBpZiAoaXNIZWFkZXJOYW1lRmlsdGVyKSB7XG4gICAgdmFsdWUgPSBoZWFkZXI7XG4gIH1cblxuICBpZiAoIXV0aWxzLmlzU3RyaW5nKHZhbHVlKSkgcmV0dXJuO1xuXG4gIGlmICh1dGlscy5pc1N0cmluZyhmaWx0ZXIpKSB7XG4gICAgcmV0dXJuIHZhbHVlLmluZGV4T2YoZmlsdGVyKSAhPT0gLTE7XG4gIH1cblxuICBpZiAodXRpbHMuaXNSZWdFeHAoZmlsdGVyKSkge1xuICAgIHJldHVybiBmaWx0ZXIudGVzdCh2YWx1ZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZm9ybWF0SGVhZGVyKGhlYWRlcikge1xuICByZXR1cm4gaGVhZGVyLnRyaW0oKVxuICAgIC50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoLyhbYS16XFxkXSkoXFx3KikvZywgKHcsIGNoYXIsIHN0cikgPT4ge1xuICAgICAgcmV0dXJuIGNoYXIudG9VcHBlckNhc2UoKSArIHN0cjtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gYnVpbGRBY2Nlc3NvcnMob2JqLCBoZWFkZXIpIHtcbiAgY29uc3QgYWNjZXNzb3JOYW1lID0gdXRpbHMudG9DYW1lbENhc2UoJyAnICsgaGVhZGVyKTtcblxuICBbJ2dldCcsICdzZXQnLCAnaGFzJ10uZm9yRWFjaChtZXRob2ROYW1lID0+IHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBtZXRob2ROYW1lICsgYWNjZXNzb3JOYW1lLCB7XG4gICAgICB2YWx1ZTogZnVuY3Rpb24oYXJnMSwgYXJnMiwgYXJnMykge1xuICAgICAgICByZXR1cm4gdGhpc1ttZXRob2ROYW1lXS5jYWxsKHRoaXMsIGhlYWRlciwgYXJnMSwgYXJnMiwgYXJnMyk7XG4gICAgICB9LFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gIH0pO1xufVxuXG5jbGFzcyBBeGlvc0hlYWRlcnMge1xuICBjb25zdHJ1Y3RvcihoZWFkZXJzKSB7XG4gICAgaGVhZGVycyAmJiB0aGlzLnNldChoZWFkZXJzKTtcbiAgfVxuXG4gIHNldChoZWFkZXIsIHZhbHVlT3JSZXdyaXRlLCByZXdyaXRlKSB7XG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XG5cbiAgICBmdW5jdGlvbiBzZXRIZWFkZXIoX3ZhbHVlLCBfaGVhZGVyLCBfcmV3cml0ZSkge1xuICAgICAgY29uc3QgbEhlYWRlciA9IG5vcm1hbGl6ZUhlYWRlcihfaGVhZGVyKTtcblxuICAgICAgaWYgKCFsSGVhZGVyKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignaGVhZGVyIG5hbWUgbXVzdCBiZSBhIG5vbi1lbXB0eSBzdHJpbmcnKTtcbiAgICAgIH1cblxuICAgICAgY29uc3Qga2V5ID0gdXRpbHMuZmluZEtleShzZWxmLCBsSGVhZGVyKTtcblxuICAgICAgaWYoIWtleSB8fCBzZWxmW2tleV0gPT09IHVuZGVmaW5lZCB8fCBfcmV3cml0ZSA9PT0gdHJ1ZSB8fCAoX3Jld3JpdGUgPT09IHVuZGVmaW5lZCAmJiBzZWxmW2tleV0gIT09IGZhbHNlKSkge1xuICAgICAgICBzZWxmW2tleSB8fCBfaGVhZGVyXSA9IG5vcm1hbGl6ZVZhbHVlKF92YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3Qgc2V0SGVhZGVycyA9IChoZWFkZXJzLCBfcmV3cml0ZSkgPT5cbiAgICAgIHV0aWxzLmZvckVhY2goaGVhZGVycywgKF92YWx1ZSwgX2hlYWRlcikgPT4gc2V0SGVhZGVyKF92YWx1ZSwgX2hlYWRlciwgX3Jld3JpdGUpKTtcblxuICAgIGlmICh1dGlscy5pc1BsYWluT2JqZWN0KGhlYWRlcikgfHwgaGVhZGVyIGluc3RhbmNlb2YgdGhpcy5jb25zdHJ1Y3Rvcikge1xuICAgICAgc2V0SGVhZGVycyhoZWFkZXIsIHZhbHVlT3JSZXdyaXRlKTtcbiAgICB9IGVsc2UgaWYodXRpbHMuaXNTdHJpbmcoaGVhZGVyKSAmJiAoaGVhZGVyID0gaGVhZGVyLnRyaW0oKSkgJiYgIWlzVmFsaWRIZWFkZXJOYW1lKGhlYWRlcikpIHtcbiAgICAgIHNldEhlYWRlcnMocGFyc2VIZWFkZXJzKGhlYWRlciksIHZhbHVlT3JSZXdyaXRlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaGVhZGVyICE9IG51bGwgJiYgc2V0SGVhZGVyKHZhbHVlT3JSZXdyaXRlLCBoZWFkZXIsIHJld3JpdGUpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZ2V0KGhlYWRlciwgcGFyc2VyKSB7XG4gICAgaGVhZGVyID0gbm9ybWFsaXplSGVhZGVyKGhlYWRlcik7XG5cbiAgICBpZiAoaGVhZGVyKSB7XG4gICAgICBjb25zdCBrZXkgPSB1dGlscy5maW5kS2V5KHRoaXMsIGhlYWRlcik7XG5cbiAgICAgIGlmIChrZXkpIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzW2tleV07XG5cbiAgICAgICAgaWYgKCFwYXJzZXIpIHtcbiAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocGFyc2VyID09PSB0cnVlKSB7XG4gICAgICAgICAgcmV0dXJuIHBhcnNlVG9rZW5zKHZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh1dGlscy5pc0Z1bmN0aW9uKHBhcnNlcikpIHtcbiAgICAgICAgICByZXR1cm4gcGFyc2VyLmNhbGwodGhpcywgdmFsdWUsIGtleSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodXRpbHMuaXNSZWdFeHAocGFyc2VyKSkge1xuICAgICAgICAgIHJldHVybiBwYXJzZXIuZXhlYyh2YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdwYXJzZXIgbXVzdCBiZSBib29sZWFufHJlZ2V4cHxmdW5jdGlvbicpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGhhcyhoZWFkZXIsIG1hdGNoZXIpIHtcbiAgICBoZWFkZXIgPSBub3JtYWxpemVIZWFkZXIoaGVhZGVyKTtcblxuICAgIGlmIChoZWFkZXIpIHtcbiAgICAgIGNvbnN0IGtleSA9IHV0aWxzLmZpbmRLZXkodGhpcywgaGVhZGVyKTtcblxuICAgICAgcmV0dXJuICEhKGtleSAmJiB0aGlzW2tleV0gIT09IHVuZGVmaW5lZCAmJiAoIW1hdGNoZXIgfHwgbWF0Y2hIZWFkZXJWYWx1ZSh0aGlzLCB0aGlzW2tleV0sIGtleSwgbWF0Y2hlcikpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBkZWxldGUoaGVhZGVyLCBtYXRjaGVyKSB7XG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgbGV0IGRlbGV0ZWQgPSBmYWxzZTtcblxuICAgIGZ1bmN0aW9uIGRlbGV0ZUhlYWRlcihfaGVhZGVyKSB7XG4gICAgICBfaGVhZGVyID0gbm9ybWFsaXplSGVhZGVyKF9oZWFkZXIpO1xuXG4gICAgICBpZiAoX2hlYWRlcikge1xuICAgICAgICBjb25zdCBrZXkgPSB1dGlscy5maW5kS2V5KHNlbGYsIF9oZWFkZXIpO1xuXG4gICAgICAgIGlmIChrZXkgJiYgKCFtYXRjaGVyIHx8IG1hdGNoSGVhZGVyVmFsdWUoc2VsZiwgc2VsZltrZXldLCBrZXksIG1hdGNoZXIpKSkge1xuICAgICAgICAgIGRlbGV0ZSBzZWxmW2tleV07XG5cbiAgICAgICAgICBkZWxldGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh1dGlscy5pc0FycmF5KGhlYWRlcikpIHtcbiAgICAgIGhlYWRlci5mb3JFYWNoKGRlbGV0ZUhlYWRlcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlbGV0ZUhlYWRlcihoZWFkZXIpO1xuICAgIH1cblxuICAgIHJldHVybiBkZWxldGVkO1xuICB9XG5cbiAgY2xlYXIobWF0Y2hlcikge1xuICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyh0aGlzKTtcbiAgICBsZXQgaSA9IGtleXMubGVuZ3RoO1xuICAgIGxldCBkZWxldGVkID0gZmFsc2U7XG5cbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICBjb25zdCBrZXkgPSBrZXlzW2ldO1xuICAgICAgaWYoIW1hdGNoZXIgfHwgbWF0Y2hIZWFkZXJWYWx1ZSh0aGlzLCB0aGlzW2tleV0sIGtleSwgbWF0Y2hlciwgdHJ1ZSkpIHtcbiAgICAgICAgZGVsZXRlIHRoaXNba2V5XTtcbiAgICAgICAgZGVsZXRlZCA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGRlbGV0ZWQ7XG4gIH1cblxuICBub3JtYWxpemUoZm9ybWF0KSB7XG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgY29uc3QgaGVhZGVycyA9IHt9O1xuXG4gICAgdXRpbHMuZm9yRWFjaCh0aGlzLCAodmFsdWUsIGhlYWRlcikgPT4ge1xuICAgICAgY29uc3Qga2V5ID0gdXRpbHMuZmluZEtleShoZWFkZXJzLCBoZWFkZXIpO1xuXG4gICAgICBpZiAoa2V5KSB7XG4gICAgICAgIHNlbGZba2V5XSA9IG5vcm1hbGl6ZVZhbHVlKHZhbHVlKTtcbiAgICAgICAgZGVsZXRlIHNlbGZbaGVhZGVyXTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBub3JtYWxpemVkID0gZm9ybWF0ID8gZm9ybWF0SGVhZGVyKGhlYWRlcikgOiBTdHJpbmcoaGVhZGVyKS50cmltKCk7XG5cbiAgICAgIGlmIChub3JtYWxpemVkICE9PSBoZWFkZXIpIHtcbiAgICAgICAgZGVsZXRlIHNlbGZbaGVhZGVyXTtcbiAgICAgIH1cblxuICAgICAgc2VsZltub3JtYWxpemVkXSA9IG5vcm1hbGl6ZVZhbHVlKHZhbHVlKTtcblxuICAgICAgaGVhZGVyc1tub3JtYWxpemVkXSA9IHRydWU7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGNvbmNhdCguLi50YXJnZXRzKSB7XG4gICAgcmV0dXJuIHRoaXMuY29uc3RydWN0b3IuY29uY2F0KHRoaXMsIC4uLnRhcmdldHMpO1xuICB9XG5cbiAgdG9KU09OKGFzU3RyaW5ncykge1xuICAgIGNvbnN0IG9iaiA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cbiAgICB1dGlscy5mb3JFYWNoKHRoaXMsICh2YWx1ZSwgaGVhZGVyKSA9PiB7XG4gICAgICB2YWx1ZSAhPSBudWxsICYmIHZhbHVlICE9PSBmYWxzZSAmJiAob2JqW2hlYWRlcl0gPSBhc1N0cmluZ3MgJiYgdXRpbHMuaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZS5qb2luKCcsICcpIDogdmFsdWUpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIG9iajtcbiAgfVxuXG4gIFtTeW1ib2wuaXRlcmF0b3JdKCkge1xuICAgIHJldHVybiBPYmplY3QuZW50cmllcyh0aGlzLnRvSlNPTigpKVtTeW1ib2wuaXRlcmF0b3JdKCk7XG4gIH1cblxuICB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gT2JqZWN0LmVudHJpZXModGhpcy50b0pTT04oKSkubWFwKChbaGVhZGVyLCB2YWx1ZV0pID0+IGhlYWRlciArICc6ICcgKyB2YWx1ZSkuam9pbignXFxuJyk7XG4gIH1cblxuICBnZXQgW1N5bWJvbC50b1N0cmluZ1RhZ10oKSB7XG4gICAgcmV0dXJuICdBeGlvc0hlYWRlcnMnO1xuICB9XG5cbiAgc3RhdGljIGZyb20odGhpbmcpIHtcbiAgICByZXR1cm4gdGhpbmcgaW5zdGFuY2VvZiB0aGlzID8gdGhpbmcgOiBuZXcgdGhpcyh0aGluZyk7XG4gIH1cblxuICBzdGF0aWMgY29uY2F0KGZpcnN0LCAuLi50YXJnZXRzKSB7XG4gICAgY29uc3QgY29tcHV0ZWQgPSBuZXcgdGhpcyhmaXJzdCk7XG5cbiAgICB0YXJnZXRzLmZvckVhY2goKHRhcmdldCkgPT4gY29tcHV0ZWQuc2V0KHRhcmdldCkpO1xuXG4gICAgcmV0dXJuIGNvbXB1dGVkO1xuICB9XG5cbiAgc3RhdGljIGFjY2Vzc29yKGhlYWRlcikge1xuICAgIGNvbnN0IGludGVybmFscyA9IHRoaXNbJGludGVybmFsc10gPSAodGhpc1skaW50ZXJuYWxzXSA9IHtcbiAgICAgIGFjY2Vzc29yczoge31cbiAgICB9KTtcblxuICAgIGNvbnN0IGFjY2Vzc29ycyA9IGludGVybmFscy5hY2Nlc3NvcnM7XG4gICAgY29uc3QgcHJvdG90eXBlID0gdGhpcy5wcm90b3R5cGU7XG5cbiAgICBmdW5jdGlvbiBkZWZpbmVBY2Nlc3NvcihfaGVhZGVyKSB7XG4gICAgICBjb25zdCBsSGVhZGVyID0gbm9ybWFsaXplSGVhZGVyKF9oZWFkZXIpO1xuXG4gICAgICBpZiAoIWFjY2Vzc29yc1tsSGVhZGVyXSkge1xuICAgICAgICBidWlsZEFjY2Vzc29ycyhwcm90b3R5cGUsIF9oZWFkZXIpO1xuICAgICAgICBhY2Nlc3NvcnNbbEhlYWRlcl0gPSB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHV0aWxzLmlzQXJyYXkoaGVhZGVyKSA/IGhlYWRlci5mb3JFYWNoKGRlZmluZUFjY2Vzc29yKSA6IGRlZmluZUFjY2Vzc29yKGhlYWRlcik7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxufVxuXG5BeGlvc0hlYWRlcnMuYWNjZXNzb3IoWydDb250ZW50LVR5cGUnLCAnQ29udGVudC1MZW5ndGgnLCAnQWNjZXB0JywgJ0FjY2VwdC1FbmNvZGluZycsICdVc2VyLUFnZW50JywgJ0F1dGhvcml6YXRpb24nXSk7XG5cbnV0aWxzLmZyZWV6ZU1ldGhvZHMoQXhpb3NIZWFkZXJzLnByb3RvdHlwZSk7XG51dGlscy5mcmVlemVNZXRob2RzKEF4aW9zSGVhZGVycyk7XG5cbnZhciBBeGlvc0hlYWRlcnMkMSA9IEF4aW9zSGVhZGVycztcblxuLyoqXG4gKiBUcmFuc2Zvcm0gdGhlIGRhdGEgZm9yIGEgcmVxdWVzdCBvciBhIHJlc3BvbnNlXG4gKlxuICogQHBhcmFtIHtBcnJheXxGdW5jdGlvbn0gZm5zIEEgc2luZ2xlIGZ1bmN0aW9uIG9yIEFycmF5IG9mIGZ1bmN0aW9uc1xuICogQHBhcmFtIHs/T2JqZWN0fSByZXNwb25zZSBUaGUgcmVzcG9uc2Ugb2JqZWN0XG4gKlxuICogQHJldHVybnMgeyp9IFRoZSByZXN1bHRpbmcgdHJhbnNmb3JtZWQgZGF0YVxuICovXG5mdW5jdGlvbiB0cmFuc2Zvcm1EYXRhKGZucywgcmVzcG9uc2UpIHtcbiAgY29uc3QgY29uZmlnID0gdGhpcyB8fCBkZWZhdWx0cyQxO1xuICBjb25zdCBjb250ZXh0ID0gcmVzcG9uc2UgfHwgY29uZmlnO1xuICBjb25zdCBoZWFkZXJzID0gQXhpb3NIZWFkZXJzJDEuZnJvbShjb250ZXh0LmhlYWRlcnMpO1xuICBsZXQgZGF0YSA9IGNvbnRleHQuZGF0YTtcblxuICB1dGlscy5mb3JFYWNoKGZucywgZnVuY3Rpb24gdHJhbnNmb3JtKGZuKSB7XG4gICAgZGF0YSA9IGZuLmNhbGwoY29uZmlnLCBkYXRhLCBoZWFkZXJzLm5vcm1hbGl6ZSgpLCByZXNwb25zZSA/IHJlc3BvbnNlLnN0YXR1cyA6IHVuZGVmaW5lZCk7XG4gIH0pO1xuXG4gIGhlYWRlcnMubm9ybWFsaXplKCk7XG5cbiAgcmV0dXJuIGRhdGE7XG59XG5cbmZ1bmN0aW9uIGlzQ2FuY2VsKHZhbHVlKSB7XG4gIHJldHVybiAhISh2YWx1ZSAmJiB2YWx1ZS5fX0NBTkNFTF9fKTtcbn1cblxuLyoqXG4gKiBBIGBDYW5jZWxlZEVycm9yYCBpcyBhbiBvYmplY3QgdGhhdCBpcyB0aHJvd24gd2hlbiBhbiBvcGVyYXRpb24gaXMgY2FuY2VsZWQuXG4gKlxuICogQHBhcmFtIHtzdHJpbmc9fSBtZXNzYWdlIFRoZSBtZXNzYWdlLlxuICogQHBhcmFtIHtPYmplY3Q9fSBjb25maWcgVGhlIGNvbmZpZy5cbiAqIEBwYXJhbSB7T2JqZWN0PX0gcmVxdWVzdCBUaGUgcmVxdWVzdC5cbiAqXG4gKiBAcmV0dXJucyB7Q2FuY2VsZWRFcnJvcn0gVGhlIGNyZWF0ZWQgZXJyb3IuXG4gKi9cbmZ1bmN0aW9uIENhbmNlbGVkRXJyb3IobWVzc2FnZSwgY29uZmlnLCByZXF1ZXN0KSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1lcS1udWxsLGVxZXFlcVxuICBBeGlvc0Vycm9yLmNhbGwodGhpcywgbWVzc2FnZSA9PSBudWxsID8gJ2NhbmNlbGVkJyA6IG1lc3NhZ2UsIEF4aW9zRXJyb3IuRVJSX0NBTkNFTEVELCBjb25maWcsIHJlcXVlc3QpO1xuICB0aGlzLm5hbWUgPSAnQ2FuY2VsZWRFcnJvcic7XG59XG5cbnV0aWxzLmluaGVyaXRzKENhbmNlbGVkRXJyb3IsIEF4aW9zRXJyb3IsIHtcbiAgX19DQU5DRUxfXzogdHJ1ZVxufSk7XG5cbi8qKlxuICogUmVzb2x2ZSBvciByZWplY3QgYSBQcm9taXNlIGJhc2VkIG9uIHJlc3BvbnNlIHN0YXR1cy5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZXNvbHZlIEEgZnVuY3Rpb24gdGhhdCByZXNvbHZlcyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlamVjdCBBIGZ1bmN0aW9uIHRoYXQgcmVqZWN0cyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7b2JqZWN0fSByZXNwb25zZSBUaGUgcmVzcG9uc2UuXG4gKlxuICogQHJldHVybnMge29iamVjdH0gVGhlIHJlc3BvbnNlLlxuICovXG5mdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCByZXNwb25zZSkge1xuICBjb25zdCB2YWxpZGF0ZVN0YXR1cyA9IHJlc3BvbnNlLmNvbmZpZy52YWxpZGF0ZVN0YXR1cztcbiAgaWYgKCFyZXNwb25zZS5zdGF0dXMgfHwgIXZhbGlkYXRlU3RhdHVzIHx8IHZhbGlkYXRlU3RhdHVzKHJlc3BvbnNlLnN0YXR1cykpIHtcbiAgICByZXNvbHZlKHJlc3BvbnNlKTtcbiAgfSBlbHNlIHtcbiAgICByZWplY3QobmV3IEF4aW9zRXJyb3IoXG4gICAgICAnUmVxdWVzdCBmYWlsZWQgd2l0aCBzdGF0dXMgY29kZSAnICsgcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgW0F4aW9zRXJyb3IuRVJSX0JBRF9SRVFVRVNULCBBeGlvc0Vycm9yLkVSUl9CQURfUkVTUE9OU0VdW01hdGguZmxvb3IocmVzcG9uc2Uuc3RhdHVzIC8gMTAwKSAtIDRdLFxuICAgICAgcmVzcG9uc2UuY29uZmlnLFxuICAgICAgcmVzcG9uc2UucmVxdWVzdCxcbiAgICAgIHJlc3BvbnNlXG4gICAgKSk7XG4gIH1cbn1cblxudmFyIGNvb2tpZXMgPSBwbGF0Zm9ybS5pc1N0YW5kYXJkQnJvd3NlckVudiA/XG5cbi8vIFN0YW5kYXJkIGJyb3dzZXIgZW52cyBzdXBwb3J0IGRvY3VtZW50LmNvb2tpZVxuICAoZnVuY3Rpb24gc3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgIHJldHVybiB7XG4gICAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUobmFtZSwgdmFsdWUsIGV4cGlyZXMsIHBhdGgsIGRvbWFpbiwgc2VjdXJlKSB7XG4gICAgICAgIGNvbnN0IGNvb2tpZSA9IFtdO1xuICAgICAgICBjb29raWUucHVzaChuYW1lICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKSk7XG5cbiAgICAgICAgaWYgKHV0aWxzLmlzTnVtYmVyKGV4cGlyZXMpKSB7XG4gICAgICAgICAgY29va2llLnB1c2goJ2V4cGlyZXM9JyArIG5ldyBEYXRlKGV4cGlyZXMpLnRvR01UU3RyaW5nKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHV0aWxzLmlzU3RyaW5nKHBhdGgpKSB7XG4gICAgICAgICAgY29va2llLnB1c2goJ3BhdGg9JyArIHBhdGgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHV0aWxzLmlzU3RyaW5nKGRvbWFpbikpIHtcbiAgICAgICAgICBjb29raWUucHVzaCgnZG9tYWluPScgKyBkb21haW4pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNlY3VyZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGNvb2tpZS5wdXNoKCdzZWN1cmUnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGRvY3VtZW50LmNvb2tpZSA9IGNvb2tpZS5qb2luKCc7ICcpO1xuICAgICAgfSxcblxuICAgICAgcmVhZDogZnVuY3Rpb24gcmVhZChuYW1lKSB7XG4gICAgICAgIGNvbnN0IG1hdGNoID0gZG9jdW1lbnQuY29va2llLm1hdGNoKG5ldyBSZWdFeHAoJyhefDtcXFxccyopKCcgKyBuYW1lICsgJyk9KFteO10qKScpKTtcbiAgICAgICAgcmV0dXJuIChtYXRjaCA/IGRlY29kZVVSSUNvbXBvbmVudChtYXRjaFszXSkgOiBudWxsKTtcbiAgICAgIH0sXG5cbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKG5hbWUpIHtcbiAgICAgICAgdGhpcy53cml0ZShuYW1lLCAnJywgRGF0ZS5ub3coKSAtIDg2NDAwMDAwKTtcbiAgICAgIH1cbiAgICB9O1xuICB9KSgpIDpcblxuLy8gTm9uIHN0YW5kYXJkIGJyb3dzZXIgZW52ICh3ZWIgd29ya2VycywgcmVhY3QtbmF0aXZlKSBsYWNrIG5lZWRlZCBzdXBwb3J0LlxuICAoZnVuY3Rpb24gbm9uU3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgIHJldHVybiB7XG4gICAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUoKSB7fSxcbiAgICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQoKSB7IHJldHVybiBudWxsOyB9LFxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgIH07XG4gIH0pKCk7XG5cbi8qKlxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBzcGVjaWZpZWQgVVJMIGlzIGFic29sdXRlXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgVVJMIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgc3BlY2lmaWVkIFVSTCBpcyBhYnNvbHV0ZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQWJzb2x1dGVVUkwodXJsKSB7XG4gIC8vIEEgVVJMIGlzIGNvbnNpZGVyZWQgYWJzb2x1dGUgaWYgaXQgYmVnaW5zIHdpdGggXCI8c2NoZW1lPjovL1wiIG9yIFwiLy9cIiAocHJvdG9jb2wtcmVsYXRpdmUgVVJMKS5cbiAgLy8gUkZDIDM5ODYgZGVmaW5lcyBzY2hlbWUgbmFtZSBhcyBhIHNlcXVlbmNlIG9mIGNoYXJhY3RlcnMgYmVnaW5uaW5nIHdpdGggYSBsZXR0ZXIgYW5kIGZvbGxvd2VkXG4gIC8vIGJ5IGFueSBjb21iaW5hdGlvbiBvZiBsZXR0ZXJzLCBkaWdpdHMsIHBsdXMsIHBlcmlvZCwgb3IgaHlwaGVuLlxuICByZXR1cm4gL14oW2Etel1bYS16XFxkK1xcLS5dKjopP1xcL1xcLy9pLnRlc3QodXJsKTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IFVSTCBieSBjb21iaW5pbmcgdGhlIHNwZWNpZmllZCBVUkxzXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGJhc2VVUkwgVGhlIGJhc2UgVVJMXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpdmVVUkwgVGhlIHJlbGF0aXZlIFVSTFxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBjb21iaW5lZCBVUkxcbiAqL1xuZnVuY3Rpb24gY29tYmluZVVSTHMoYmFzZVVSTCwgcmVsYXRpdmVVUkwpIHtcbiAgcmV0dXJuIHJlbGF0aXZlVVJMXG4gICAgPyBiYXNlVVJMLnJlcGxhY2UoL1xcLyskLywgJycpICsgJy8nICsgcmVsYXRpdmVVUkwucmVwbGFjZSgvXlxcLysvLCAnJylcbiAgICA6IGJhc2VVUkw7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBVUkwgYnkgY29tYmluaW5nIHRoZSBiYXNlVVJMIHdpdGggdGhlIHJlcXVlc3RlZFVSTCxcbiAqIG9ubHkgd2hlbiB0aGUgcmVxdWVzdGVkVVJMIGlzIG5vdCBhbHJlYWR5IGFuIGFic29sdXRlIFVSTC5cbiAqIElmIHRoZSByZXF1ZXN0VVJMIGlzIGFic29sdXRlLCB0aGlzIGZ1bmN0aW9uIHJldHVybnMgdGhlIHJlcXVlc3RlZFVSTCB1bnRvdWNoZWQuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGJhc2VVUkwgVGhlIGJhc2UgVVJMXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVxdWVzdGVkVVJMIEFic29sdXRlIG9yIHJlbGF0aXZlIFVSTCB0byBjb21iaW5lXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGNvbWJpbmVkIGZ1bGwgcGF0aFxuICovXG5mdW5jdGlvbiBidWlsZEZ1bGxQYXRoKGJhc2VVUkwsIHJlcXVlc3RlZFVSTCkge1xuICBpZiAoYmFzZVVSTCAmJiAhaXNBYnNvbHV0ZVVSTChyZXF1ZXN0ZWRVUkwpKSB7XG4gICAgcmV0dXJuIGNvbWJpbmVVUkxzKGJhc2VVUkwsIHJlcXVlc3RlZFVSTCk7XG4gIH1cbiAgcmV0dXJuIHJlcXVlc3RlZFVSTDtcbn1cblxudmFyIGlzVVJMU2FtZU9yaWdpbiA9IHBsYXRmb3JtLmlzU3RhbmRhcmRCcm93c2VyRW52ID9cblxuLy8gU3RhbmRhcmQgYnJvd3NlciBlbnZzIGhhdmUgZnVsbCBzdXBwb3J0IG9mIHRoZSBBUElzIG5lZWRlZCB0byB0ZXN0XG4vLyB3aGV0aGVyIHRoZSByZXF1ZXN0IFVSTCBpcyBvZiB0aGUgc2FtZSBvcmlnaW4gYXMgY3VycmVudCBsb2NhdGlvbi5cbiAgKGZ1bmN0aW9uIHN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICBjb25zdCBtc2llID0gLyhtc2llfHRyaWRlbnQpL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcbiAgICBjb25zdCB1cmxQYXJzaW5nTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICBsZXQgb3JpZ2luVVJMO1xuXG4gICAgLyoqXG4gICAgKiBQYXJzZSBhIFVSTCB0byBkaXNjb3ZlciBpdCdzIGNvbXBvbmVudHNcbiAgICAqXG4gICAgKiBAcGFyYW0ge1N0cmluZ30gdXJsIFRoZSBVUkwgdG8gYmUgcGFyc2VkXG4gICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgICovXG4gICAgZnVuY3Rpb24gcmVzb2x2ZVVSTCh1cmwpIHtcbiAgICAgIGxldCBocmVmID0gdXJsO1xuXG4gICAgICBpZiAobXNpZSkge1xuICAgICAgICAvLyBJRSBuZWVkcyBhdHRyaWJ1dGUgc2V0IHR3aWNlIHRvIG5vcm1hbGl6ZSBwcm9wZXJ0aWVzXG4gICAgICAgIHVybFBhcnNpbmdOb2RlLnNldEF0dHJpYnV0ZSgnaHJlZicsIGhyZWYpO1xuICAgICAgICBocmVmID0gdXJsUGFyc2luZ05vZGUuaHJlZjtcbiAgICAgIH1cblxuICAgICAgdXJsUGFyc2luZ05vZGUuc2V0QXR0cmlidXRlKCdocmVmJywgaHJlZik7XG5cbiAgICAgIC8vIHVybFBhcnNpbmdOb2RlIHByb3ZpZGVzIHRoZSBVcmxVdGlscyBpbnRlcmZhY2UgLSBodHRwOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jdXJsdXRpbHNcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGhyZWY6IHVybFBhcnNpbmdOb2RlLmhyZWYsXG4gICAgICAgIHByb3RvY29sOiB1cmxQYXJzaW5nTm9kZS5wcm90b2NvbCA/IHVybFBhcnNpbmdOb2RlLnByb3RvY29sLnJlcGxhY2UoLzokLywgJycpIDogJycsXG4gICAgICAgIGhvc3Q6IHVybFBhcnNpbmdOb2RlLmhvc3QsXG4gICAgICAgIHNlYXJjaDogdXJsUGFyc2luZ05vZGUuc2VhcmNoID8gdXJsUGFyc2luZ05vZGUuc2VhcmNoLnJlcGxhY2UoL15cXD8vLCAnJykgOiAnJyxcbiAgICAgICAgaGFzaDogdXJsUGFyc2luZ05vZGUuaGFzaCA/IHVybFBhcnNpbmdOb2RlLmhhc2gucmVwbGFjZSgvXiMvLCAnJykgOiAnJyxcbiAgICAgICAgaG9zdG5hbWU6IHVybFBhcnNpbmdOb2RlLmhvc3RuYW1lLFxuICAgICAgICBwb3J0OiB1cmxQYXJzaW5nTm9kZS5wb3J0LFxuICAgICAgICBwYXRobmFtZTogKHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lLmNoYXJBdCgwKSA9PT0gJy8nKSA/XG4gICAgICAgICAgdXJsUGFyc2luZ05vZGUucGF0aG5hbWUgOlxuICAgICAgICAgICcvJyArIHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lXG4gICAgICB9O1xuICAgIH1cblxuICAgIG9yaWdpblVSTCA9IHJlc29sdmVVUkwod2luZG93LmxvY2F0aW9uLmhyZWYpO1xuXG4gICAgLyoqXG4gICAgKiBEZXRlcm1pbmUgaWYgYSBVUkwgc2hhcmVzIHRoZSBzYW1lIG9yaWdpbiBhcyB0aGUgY3VycmVudCBsb2NhdGlvblxuICAgICpcbiAgICAqIEBwYXJhbSB7U3RyaW5nfSByZXF1ZXN0VVJMIFRoZSBVUkwgdG8gdGVzdFxuICAgICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgVVJMIHNoYXJlcyB0aGUgc2FtZSBvcmlnaW4sIG90aGVyd2lzZSBmYWxzZVxuICAgICovXG4gICAgcmV0dXJuIGZ1bmN0aW9uIGlzVVJMU2FtZU9yaWdpbihyZXF1ZXN0VVJMKSB7XG4gICAgICBjb25zdCBwYXJzZWQgPSAodXRpbHMuaXNTdHJpbmcocmVxdWVzdFVSTCkpID8gcmVzb2x2ZVVSTChyZXF1ZXN0VVJMKSA6IHJlcXVlc3RVUkw7XG4gICAgICByZXR1cm4gKHBhcnNlZC5wcm90b2NvbCA9PT0gb3JpZ2luVVJMLnByb3RvY29sICYmXG4gICAgICAgICAgcGFyc2VkLmhvc3QgPT09IG9yaWdpblVSTC5ob3N0KTtcbiAgICB9O1xuICB9KSgpIDpcblxuICAvLyBOb24gc3RhbmRhcmQgYnJvd3NlciBlbnZzICh3ZWIgd29ya2VycywgcmVhY3QtbmF0aXZlKSBsYWNrIG5lZWRlZCBzdXBwb3J0LlxuICAoZnVuY3Rpb24gbm9uU3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgIHJldHVybiBmdW5jdGlvbiBpc1VSTFNhbWVPcmlnaW4oKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuICB9KSgpO1xuXG5mdW5jdGlvbiBwYXJzZVByb3RvY29sKHVybCkge1xuICBjb25zdCBtYXRjaCA9IC9eKFstK1xcd117MSwyNX0pKDo/XFwvXFwvfDopLy5leGVjKHVybCk7XG4gIHJldHVybiBtYXRjaCAmJiBtYXRjaFsxXSB8fCAnJztcbn1cblxuLyoqXG4gKiBDYWxjdWxhdGUgZGF0YSBtYXhSYXRlXG4gKiBAcGFyYW0ge051bWJlcn0gW3NhbXBsZXNDb3VudD0gMTBdXG4gKiBAcGFyYW0ge051bWJlcn0gW21pbj0gMTAwMF1cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAqL1xuZnVuY3Rpb24gc3BlZWRvbWV0ZXIoc2FtcGxlc0NvdW50LCBtaW4pIHtcbiAgc2FtcGxlc0NvdW50ID0gc2FtcGxlc0NvdW50IHx8IDEwO1xuICBjb25zdCBieXRlcyA9IG5ldyBBcnJheShzYW1wbGVzQ291bnQpO1xuICBjb25zdCB0aW1lc3RhbXBzID0gbmV3IEFycmF5KHNhbXBsZXNDb3VudCk7XG4gIGxldCBoZWFkID0gMDtcbiAgbGV0IHRhaWwgPSAwO1xuICBsZXQgZmlyc3RTYW1wbGVUUztcblxuICBtaW4gPSBtaW4gIT09IHVuZGVmaW5lZCA/IG1pbiA6IDEwMDA7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIHB1c2goY2h1bmtMZW5ndGgpIHtcbiAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuXG4gICAgY29uc3Qgc3RhcnRlZEF0ID0gdGltZXN0YW1wc1t0YWlsXTtcblxuICAgIGlmICghZmlyc3RTYW1wbGVUUykge1xuICAgICAgZmlyc3RTYW1wbGVUUyA9IG5vdztcbiAgICB9XG5cbiAgICBieXRlc1toZWFkXSA9IGNodW5rTGVuZ3RoO1xuICAgIHRpbWVzdGFtcHNbaGVhZF0gPSBub3c7XG5cbiAgICBsZXQgaSA9IHRhaWw7XG4gICAgbGV0IGJ5dGVzQ291bnQgPSAwO1xuXG4gICAgd2hpbGUgKGkgIT09IGhlYWQpIHtcbiAgICAgIGJ5dGVzQ291bnQgKz0gYnl0ZXNbaSsrXTtcbiAgICAgIGkgPSBpICUgc2FtcGxlc0NvdW50O1xuICAgIH1cblxuICAgIGhlYWQgPSAoaGVhZCArIDEpICUgc2FtcGxlc0NvdW50O1xuXG4gICAgaWYgKGhlYWQgPT09IHRhaWwpIHtcbiAgICAgIHRhaWwgPSAodGFpbCArIDEpICUgc2FtcGxlc0NvdW50O1xuICAgIH1cblxuICAgIGlmIChub3cgLSBmaXJzdFNhbXBsZVRTIDwgbWluKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgcGFzc2VkID0gc3RhcnRlZEF0ICYmIG5vdyAtIHN0YXJ0ZWRBdDtcblxuICAgIHJldHVybiBwYXNzZWQgPyBNYXRoLnJvdW5kKGJ5dGVzQ291bnQgKiAxMDAwIC8gcGFzc2VkKSA6IHVuZGVmaW5lZDtcbiAgfTtcbn1cblxuZnVuY3Rpb24gcHJvZ3Jlc3NFdmVudFJlZHVjZXIobGlzdGVuZXIsIGlzRG93bmxvYWRTdHJlYW0pIHtcbiAgbGV0IGJ5dGVzTm90aWZpZWQgPSAwO1xuICBjb25zdCBfc3BlZWRvbWV0ZXIgPSBzcGVlZG9tZXRlcig1MCwgMjUwKTtcblxuICByZXR1cm4gZSA9PiB7XG4gICAgY29uc3QgbG9hZGVkID0gZS5sb2FkZWQ7XG4gICAgY29uc3QgdG90YWwgPSBlLmxlbmd0aENvbXB1dGFibGUgPyBlLnRvdGFsIDogdW5kZWZpbmVkO1xuICAgIGNvbnN0IHByb2dyZXNzQnl0ZXMgPSBsb2FkZWQgLSBieXRlc05vdGlmaWVkO1xuICAgIGNvbnN0IHJhdGUgPSBfc3BlZWRvbWV0ZXIocHJvZ3Jlc3NCeXRlcyk7XG4gICAgY29uc3QgaW5SYW5nZSA9IGxvYWRlZCA8PSB0b3RhbDtcblxuICAgIGJ5dGVzTm90aWZpZWQgPSBsb2FkZWQ7XG5cbiAgICBjb25zdCBkYXRhID0ge1xuICAgICAgbG9hZGVkLFxuICAgICAgdG90YWwsXG4gICAgICBwcm9ncmVzczogdG90YWwgPyAobG9hZGVkIC8gdG90YWwpIDogdW5kZWZpbmVkLFxuICAgICAgYnl0ZXM6IHByb2dyZXNzQnl0ZXMsXG4gICAgICByYXRlOiByYXRlID8gcmF0ZSA6IHVuZGVmaW5lZCxcbiAgICAgIGVzdGltYXRlZDogcmF0ZSAmJiB0b3RhbCAmJiBpblJhbmdlID8gKHRvdGFsIC0gbG9hZGVkKSAvIHJhdGUgOiB1bmRlZmluZWQsXG4gICAgICBldmVudDogZVxuICAgIH07XG5cbiAgICBkYXRhW2lzRG93bmxvYWRTdHJlYW0gPyAnZG93bmxvYWQnIDogJ3VwbG9hZCddID0gdHJ1ZTtcblxuICAgIGxpc3RlbmVyKGRhdGEpO1xuICB9O1xufVxuXG5jb25zdCBpc1hIUkFkYXB0ZXJTdXBwb3J0ZWQgPSB0eXBlb2YgWE1MSHR0cFJlcXVlc3QgIT09ICd1bmRlZmluZWQnO1xuXG52YXIgeGhyQWRhcHRlciA9IGlzWEhSQWRhcHRlclN1cHBvcnRlZCAmJiBmdW5jdGlvbiAoY29uZmlnKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiBkaXNwYXRjaFhoclJlcXVlc3QocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgbGV0IHJlcXVlc3REYXRhID0gY29uZmlnLmRhdGE7XG4gICAgY29uc3QgcmVxdWVzdEhlYWRlcnMgPSBBeGlvc0hlYWRlcnMkMS5mcm9tKGNvbmZpZy5oZWFkZXJzKS5ub3JtYWxpemUoKTtcbiAgICBjb25zdCByZXNwb25zZVR5cGUgPSBjb25maWcucmVzcG9uc2VUeXBlO1xuICAgIGxldCBvbkNhbmNlbGVkO1xuICAgIGZ1bmN0aW9uIGRvbmUoKSB7XG4gICAgICBpZiAoY29uZmlnLmNhbmNlbFRva2VuKSB7XG4gICAgICAgIGNvbmZpZy5jYW5jZWxUb2tlbi51bnN1YnNjcmliZShvbkNhbmNlbGVkKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGNvbmZpZy5zaWduYWwpIHtcbiAgICAgICAgY29uZmlnLnNpZ25hbC5yZW1vdmVFdmVudExpc3RlbmVyKCdhYm9ydCcsIG9uQ2FuY2VsZWQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh1dGlscy5pc0Zvcm1EYXRhKHJlcXVlc3REYXRhKSkge1xuICAgICAgaWYgKHBsYXRmb3JtLmlzU3RhbmRhcmRCcm93c2VyRW52IHx8IHBsYXRmb3JtLmlzU3RhbmRhcmRCcm93c2VyV2ViV29ya2VyRW52KSB7XG4gICAgICAgIHJlcXVlc3RIZWFkZXJzLnNldENvbnRlbnRUeXBlKGZhbHNlKTsgLy8gTGV0IHRoZSBicm93c2VyIHNldCBpdFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVxdWVzdEhlYWRlcnMuc2V0Q29udGVudFR5cGUoJ211bHRpcGFydC9mb3JtLWRhdGE7JywgZmFsc2UpOyAvLyBtb2JpbGUvZGVza3RvcCBhcHAgZnJhbWV3b3Jrc1xuICAgICAgfVxuICAgIH1cblxuICAgIGxldCByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgICAvLyBIVFRQIGJhc2ljIGF1dGhlbnRpY2F0aW9uXG4gICAgaWYgKGNvbmZpZy5hdXRoKSB7XG4gICAgICBjb25zdCB1c2VybmFtZSA9IGNvbmZpZy5hdXRoLnVzZXJuYW1lIHx8ICcnO1xuICAgICAgY29uc3QgcGFzc3dvcmQgPSBjb25maWcuYXV0aC5wYXNzd29yZCA/IHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChjb25maWcuYXV0aC5wYXNzd29yZCkpIDogJyc7XG4gICAgICByZXF1ZXN0SGVhZGVycy5zZXQoJ0F1dGhvcml6YXRpb24nLCAnQmFzaWMgJyArIGJ0b2EodXNlcm5hbWUgKyAnOicgKyBwYXNzd29yZCkpO1xuICAgIH1cblxuICAgIGNvbnN0IGZ1bGxQYXRoID0gYnVpbGRGdWxsUGF0aChjb25maWcuYmFzZVVSTCwgY29uZmlnLnVybCk7XG5cbiAgICByZXF1ZXN0Lm9wZW4oY29uZmlnLm1ldGhvZC50b1VwcGVyQ2FzZSgpLCBidWlsZFVSTChmdWxsUGF0aCwgY29uZmlnLnBhcmFtcywgY29uZmlnLnBhcmFtc1NlcmlhbGl6ZXIpLCB0cnVlKTtcblxuICAgIC8vIFNldCB0aGUgcmVxdWVzdCB0aW1lb3V0IGluIE1TXG4gICAgcmVxdWVzdC50aW1lb3V0ID0gY29uZmlnLnRpbWVvdXQ7XG5cbiAgICBmdW5jdGlvbiBvbmxvYWRlbmQoKSB7XG4gICAgICBpZiAoIXJlcXVlc3QpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgLy8gUHJlcGFyZSB0aGUgcmVzcG9uc2VcbiAgICAgIGNvbnN0IHJlc3BvbnNlSGVhZGVycyA9IEF4aW9zSGVhZGVycyQxLmZyb20oXG4gICAgICAgICdnZXRBbGxSZXNwb25zZUhlYWRlcnMnIGluIHJlcXVlc3QgJiYgcmVxdWVzdC5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKVxuICAgICAgKTtcbiAgICAgIGNvbnN0IHJlc3BvbnNlRGF0YSA9ICFyZXNwb25zZVR5cGUgfHwgcmVzcG9uc2VUeXBlID09PSAndGV4dCcgfHwgcmVzcG9uc2VUeXBlID09PSAnanNvbicgP1xuICAgICAgICByZXF1ZXN0LnJlc3BvbnNlVGV4dCA6IHJlcXVlc3QucmVzcG9uc2U7XG4gICAgICBjb25zdCByZXNwb25zZSA9IHtcbiAgICAgICAgZGF0YTogcmVzcG9uc2VEYXRhLFxuICAgICAgICBzdGF0dXM6IHJlcXVlc3Quc3RhdHVzLFxuICAgICAgICBzdGF0dXNUZXh0OiByZXF1ZXN0LnN0YXR1c1RleHQsXG4gICAgICAgIGhlYWRlcnM6IHJlc3BvbnNlSGVhZGVycyxcbiAgICAgICAgY29uZmlnLFxuICAgICAgICByZXF1ZXN0XG4gICAgICB9O1xuXG4gICAgICBzZXR0bGUoZnVuY3Rpb24gX3Jlc29sdmUodmFsdWUpIHtcbiAgICAgICAgcmVzb2x2ZSh2YWx1ZSk7XG4gICAgICAgIGRvbmUoKTtcbiAgICAgIH0sIGZ1bmN0aW9uIF9yZWplY3QoZXJyKSB7XG4gICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICBkb25lKCk7XG4gICAgICB9LCByZXNwb25zZSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH1cblxuICAgIGlmICgnb25sb2FkZW5kJyBpbiByZXF1ZXN0KSB7XG4gICAgICAvLyBVc2Ugb25sb2FkZW5kIGlmIGF2YWlsYWJsZVxuICAgICAgcmVxdWVzdC5vbmxvYWRlbmQgPSBvbmxvYWRlbmQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIExpc3RlbiBmb3IgcmVhZHkgc3RhdGUgdG8gZW11bGF0ZSBvbmxvYWRlbmRcbiAgICAgIHJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gaGFuZGxlTG9hZCgpIHtcbiAgICAgICAgaWYgKCFyZXF1ZXN0IHx8IHJlcXVlc3QucmVhZHlTdGF0ZSAhPT0gNCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFRoZSByZXF1ZXN0IGVycm9yZWQgb3V0IGFuZCB3ZSBkaWRuJ3QgZ2V0IGEgcmVzcG9uc2UsIHRoaXMgd2lsbCBiZVxuICAgICAgICAvLyBoYW5kbGVkIGJ5IG9uZXJyb3IgaW5zdGVhZFxuICAgICAgICAvLyBXaXRoIG9uZSBleGNlcHRpb246IHJlcXVlc3QgdGhhdCB1c2luZyBmaWxlOiBwcm90b2NvbCwgbW9zdCBicm93c2Vyc1xuICAgICAgICAvLyB3aWxsIHJldHVybiBzdGF0dXMgYXMgMCBldmVuIHRob3VnaCBpdCdzIGEgc3VjY2Vzc2Z1bCByZXF1ZXN0XG4gICAgICAgIGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gMCAmJiAhKHJlcXVlc3QucmVzcG9uc2VVUkwgJiYgcmVxdWVzdC5yZXNwb25zZVVSTC5pbmRleE9mKCdmaWxlOicpID09PSAwKSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyByZWFkeXN0YXRlIGhhbmRsZXIgaXMgY2FsbGluZyBiZWZvcmUgb25lcnJvciBvciBvbnRpbWVvdXQgaGFuZGxlcnMsXG4gICAgICAgIC8vIHNvIHdlIHNob3VsZCBjYWxsIG9ubG9hZGVuZCBvbiB0aGUgbmV4dCAndGljaydcbiAgICAgICAgc2V0VGltZW91dChvbmxvYWRlbmQpO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgYnJvd3NlciByZXF1ZXN0IGNhbmNlbGxhdGlvbiAoYXMgb3Bwb3NlZCB0byBhIG1hbnVhbCBjYW5jZWxsYXRpb24pXG4gICAgcmVxdWVzdC5vbmFib3J0ID0gZnVuY3Rpb24gaGFuZGxlQWJvcnQoKSB7XG4gICAgICBpZiAoIXJlcXVlc3QpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICByZWplY3QobmV3IEF4aW9zRXJyb3IoJ1JlcXVlc3QgYWJvcnRlZCcsIEF4aW9zRXJyb3IuRUNPTk5BQk9SVEVELCBjb25maWcsIHJlcXVlc3QpKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEhhbmRsZSBsb3cgbGV2ZWwgbmV0d29yayBlcnJvcnNcbiAgICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbiBoYW5kbGVFcnJvcigpIHtcbiAgICAgIC8vIFJlYWwgZXJyb3JzIGFyZSBoaWRkZW4gZnJvbSB1cyBieSB0aGUgYnJvd3NlclxuICAgICAgLy8gb25lcnJvciBzaG91bGQgb25seSBmaXJlIGlmIGl0J3MgYSBuZXR3b3JrIGVycm9yXG4gICAgICByZWplY3QobmV3IEF4aW9zRXJyb3IoJ05ldHdvcmsgRXJyb3InLCBBeGlvc0Vycm9yLkVSUl9ORVRXT1JLLCBjb25maWcsIHJlcXVlc3QpKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEhhbmRsZSB0aW1lb3V0XG4gICAgcmVxdWVzdC5vbnRpbWVvdXQgPSBmdW5jdGlvbiBoYW5kbGVUaW1lb3V0KCkge1xuICAgICAgbGV0IHRpbWVvdXRFcnJvck1lc3NhZ2UgPSBjb25maWcudGltZW91dCA/ICd0aW1lb3V0IG9mICcgKyBjb25maWcudGltZW91dCArICdtcyBleGNlZWRlZCcgOiAndGltZW91dCBleGNlZWRlZCc7XG4gICAgICBjb25zdCB0cmFuc2l0aW9uYWwgPSBjb25maWcudHJhbnNpdGlvbmFsIHx8IHRyYW5zaXRpb25hbERlZmF1bHRzO1xuICAgICAgaWYgKGNvbmZpZy50aW1lb3V0RXJyb3JNZXNzYWdlKSB7XG4gICAgICAgIHRpbWVvdXRFcnJvck1lc3NhZ2UgPSBjb25maWcudGltZW91dEVycm9yTWVzc2FnZTtcbiAgICAgIH1cbiAgICAgIHJlamVjdChuZXcgQXhpb3NFcnJvcihcbiAgICAgICAgdGltZW91dEVycm9yTWVzc2FnZSxcbiAgICAgICAgdHJhbnNpdGlvbmFsLmNsYXJpZnlUaW1lb3V0RXJyb3IgPyBBeGlvc0Vycm9yLkVUSU1FRE9VVCA6IEF4aW9zRXJyb3IuRUNPTk5BQk9SVEVELFxuICAgICAgICBjb25maWcsXG4gICAgICAgIHJlcXVlc3QpKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEFkZCB4c3JmIGhlYWRlclxuICAgIC8vIFRoaXMgaXMgb25seSBkb25lIGlmIHJ1bm5pbmcgaW4gYSBzdGFuZGFyZCBicm93c2VyIGVudmlyb25tZW50LlxuICAgIC8vIFNwZWNpZmljYWxseSBub3QgaWYgd2UncmUgaW4gYSB3ZWIgd29ya2VyLCBvciByZWFjdC1uYXRpdmUuXG4gICAgaWYgKHBsYXRmb3JtLmlzU3RhbmRhcmRCcm93c2VyRW52KSB7XG4gICAgICAvLyBBZGQgeHNyZiBoZWFkZXJcbiAgICAgIGNvbnN0IHhzcmZWYWx1ZSA9IChjb25maWcud2l0aENyZWRlbnRpYWxzIHx8IGlzVVJMU2FtZU9yaWdpbihmdWxsUGF0aCkpXG4gICAgICAgICYmIGNvbmZpZy54c3JmQ29va2llTmFtZSAmJiBjb29raWVzLnJlYWQoY29uZmlnLnhzcmZDb29raWVOYW1lKTtcblxuICAgICAgaWYgKHhzcmZWYWx1ZSkge1xuICAgICAgICByZXF1ZXN0SGVhZGVycy5zZXQoY29uZmlnLnhzcmZIZWFkZXJOYW1lLCB4c3JmVmFsdWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJlbW92ZSBDb250ZW50LVR5cGUgaWYgZGF0YSBpcyB1bmRlZmluZWRcbiAgICByZXF1ZXN0RGF0YSA9PT0gdW5kZWZpbmVkICYmIHJlcXVlc3RIZWFkZXJzLnNldENvbnRlbnRUeXBlKG51bGwpO1xuXG4gICAgLy8gQWRkIGhlYWRlcnMgdG8gdGhlIHJlcXVlc3RcbiAgICBpZiAoJ3NldFJlcXVlc3RIZWFkZXInIGluIHJlcXVlc3QpIHtcbiAgICAgIHV0aWxzLmZvckVhY2gocmVxdWVzdEhlYWRlcnMudG9KU09OKCksIGZ1bmN0aW9uIHNldFJlcXVlc3RIZWFkZXIodmFsLCBrZXkpIHtcbiAgICAgICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKGtleSwgdmFsKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIEFkZCB3aXRoQ3JlZGVudGlhbHMgdG8gcmVxdWVzdCBpZiBuZWVkZWRcbiAgICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGNvbmZpZy53aXRoQ3JlZGVudGlhbHMpKSB7XG4gICAgICByZXF1ZXN0LndpdGhDcmVkZW50aWFscyA9ICEhY29uZmlnLndpdGhDcmVkZW50aWFscztcbiAgICB9XG5cbiAgICAvLyBBZGQgcmVzcG9uc2VUeXBlIHRvIHJlcXVlc3QgaWYgbmVlZGVkXG4gICAgaWYgKHJlc3BvbnNlVHlwZSAmJiByZXNwb25zZVR5cGUgIT09ICdqc29uJykge1xuICAgICAgcmVxdWVzdC5yZXNwb25zZVR5cGUgPSBjb25maWcucmVzcG9uc2VUeXBlO1xuICAgIH1cblxuICAgIC8vIEhhbmRsZSBwcm9ncmVzcyBpZiBuZWVkZWRcbiAgICBpZiAodHlwZW9mIGNvbmZpZy5vbkRvd25sb2FkUHJvZ3Jlc3MgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBwcm9ncmVzc0V2ZW50UmVkdWNlcihjb25maWcub25Eb3dubG9hZFByb2dyZXNzLCB0cnVlKSk7XG4gICAgfVxuXG4gICAgLy8gTm90IGFsbCBicm93c2VycyBzdXBwb3J0IHVwbG9hZCBldmVudHNcbiAgICBpZiAodHlwZW9mIGNvbmZpZy5vblVwbG9hZFByb2dyZXNzID09PSAnZnVuY3Rpb24nICYmIHJlcXVlc3QudXBsb2FkKSB7XG4gICAgICByZXF1ZXN0LnVwbG9hZC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIHByb2dyZXNzRXZlbnRSZWR1Y2VyKGNvbmZpZy5vblVwbG9hZFByb2dyZXNzKSk7XG4gICAgfVxuXG4gICAgaWYgKGNvbmZpZy5jYW5jZWxUb2tlbiB8fCBjb25maWcuc2lnbmFsKSB7XG4gICAgICAvLyBIYW5kbGUgY2FuY2VsbGF0aW9uXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuICAgICAgb25DYW5jZWxlZCA9IGNhbmNlbCA9PiB7XG4gICAgICAgIGlmICghcmVxdWVzdCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICByZWplY3QoIWNhbmNlbCB8fCBjYW5jZWwudHlwZSA/IG5ldyBDYW5jZWxlZEVycm9yKG51bGwsIGNvbmZpZywgcmVxdWVzdCkgOiBjYW5jZWwpO1xuICAgICAgICByZXF1ZXN0LmFib3J0KCk7XG4gICAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgICAgfTtcblxuICAgICAgY29uZmlnLmNhbmNlbFRva2VuICYmIGNvbmZpZy5jYW5jZWxUb2tlbi5zdWJzY3JpYmUob25DYW5jZWxlZCk7XG4gICAgICBpZiAoY29uZmlnLnNpZ25hbCkge1xuICAgICAgICBjb25maWcuc2lnbmFsLmFib3J0ZWQgPyBvbkNhbmNlbGVkKCkgOiBjb25maWcuc2lnbmFsLmFkZEV2ZW50TGlzdGVuZXIoJ2Fib3J0Jywgb25DYW5jZWxlZCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgcHJvdG9jb2wgPSBwYXJzZVByb3RvY29sKGZ1bGxQYXRoKTtcblxuICAgIGlmIChwcm90b2NvbCAmJiBwbGF0Zm9ybS5wcm90b2NvbHMuaW5kZXhPZihwcm90b2NvbCkgPT09IC0xKSB7XG4gICAgICByZWplY3QobmV3IEF4aW9zRXJyb3IoJ1Vuc3VwcG9ydGVkIHByb3RvY29sICcgKyBwcm90b2NvbCArICc6JywgQXhpb3NFcnJvci5FUlJfQkFEX1JFUVVFU1QsIGNvbmZpZykpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuXG4gICAgLy8gU2VuZCB0aGUgcmVxdWVzdFxuICAgIHJlcXVlc3Quc2VuZChyZXF1ZXN0RGF0YSB8fCBudWxsKTtcbiAgfSk7XG59O1xuXG5jb25zdCBrbm93bkFkYXB0ZXJzID0ge1xuICBodHRwOiBodHRwQWRhcHRlcixcbiAgeGhyOiB4aHJBZGFwdGVyXG59O1xuXG51dGlscy5mb3JFYWNoKGtub3duQWRhcHRlcnMsIChmbiwgdmFsdWUpID0+IHtcbiAgaWYoZm4pIHtcbiAgICB0cnkge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCAnbmFtZScsIHt2YWx1ZX0pO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1lbXB0eVxuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZm4sICdhZGFwdGVyTmFtZScsIHt2YWx1ZX0pO1xuICB9XG59KTtcblxudmFyIGFkYXB0ZXJzID0ge1xuICBnZXRBZGFwdGVyOiAoYWRhcHRlcnMpID0+IHtcbiAgICBhZGFwdGVycyA9IHV0aWxzLmlzQXJyYXkoYWRhcHRlcnMpID8gYWRhcHRlcnMgOiBbYWRhcHRlcnNdO1xuXG4gICAgY29uc3Qge2xlbmd0aH0gPSBhZGFwdGVycztcbiAgICBsZXQgbmFtZU9yQWRhcHRlcjtcbiAgICBsZXQgYWRhcHRlcjtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIG5hbWVPckFkYXB0ZXIgPSBhZGFwdGVyc1tpXTtcbiAgICAgIGlmKChhZGFwdGVyID0gdXRpbHMuaXNTdHJpbmcobmFtZU9yQWRhcHRlcikgPyBrbm93bkFkYXB0ZXJzW25hbWVPckFkYXB0ZXIudG9Mb3dlckNhc2UoKV0gOiBuYW1lT3JBZGFwdGVyKSkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIWFkYXB0ZXIpIHtcbiAgICAgIGlmIChhZGFwdGVyID09PSBmYWxzZSkge1xuICAgICAgICB0aHJvdyBuZXcgQXhpb3NFcnJvcihcbiAgICAgICAgICBgQWRhcHRlciAke25hbWVPckFkYXB0ZXJ9IGlzIG5vdCBzdXBwb3J0ZWQgYnkgdGhlIGVudmlyb25tZW50YCxcbiAgICAgICAgICAnRVJSX05PVF9TVVBQT1JUJ1xuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIHV0aWxzLmhhc093blByb3Aoa25vd25BZGFwdGVycywgbmFtZU9yQWRhcHRlcikgP1xuICAgICAgICAgIGBBZGFwdGVyICcke25hbWVPckFkYXB0ZXJ9JyBpcyBub3QgYXZhaWxhYmxlIGluIHRoZSBidWlsZGAgOlxuICAgICAgICAgIGBVbmtub3duIGFkYXB0ZXIgJyR7bmFtZU9yQWRhcHRlcn0nYFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAoIXV0aWxzLmlzRnVuY3Rpb24oYWRhcHRlcikpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2FkYXB0ZXIgaXMgbm90IGEgZnVuY3Rpb24nKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYWRhcHRlcjtcbiAgfSxcbiAgYWRhcHRlcnM6IGtub3duQWRhcHRlcnNcbn07XG5cbi8qKlxuICogVGhyb3dzIGEgYENhbmNlbGVkRXJyb3JgIGlmIGNhbmNlbGxhdGlvbiBoYXMgYmVlbiByZXF1ZXN0ZWQuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnIHRoYXQgaXMgdG8gYmUgdXNlZCBmb3IgdGhlIHJlcXVlc3RcbiAqXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZnVuY3Rpb24gdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpIHtcbiAgaWYgKGNvbmZpZy5jYW5jZWxUb2tlbikge1xuICAgIGNvbmZpZy5jYW5jZWxUb2tlbi50aHJvd0lmUmVxdWVzdGVkKCk7XG4gIH1cblxuICBpZiAoY29uZmlnLnNpZ25hbCAmJiBjb25maWcuc2lnbmFsLmFib3J0ZWQpIHtcbiAgICB0aHJvdyBuZXcgQ2FuY2VsZWRFcnJvcihudWxsLCBjb25maWcpO1xuICB9XG59XG5cbi8qKlxuICogRGlzcGF0Y2ggYSByZXF1ZXN0IHRvIHRoZSBzZXJ2ZXIgdXNpbmcgdGhlIGNvbmZpZ3VyZWQgYWRhcHRlci5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gY29uZmlnIFRoZSBjb25maWcgdGhhdCBpcyB0byBiZSB1c2VkIGZvciB0aGUgcmVxdWVzdFxuICpcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBUaGUgUHJvbWlzZSB0byBiZSBmdWxmaWxsZWRcbiAqL1xuZnVuY3Rpb24gZGlzcGF0Y2hSZXF1ZXN0KGNvbmZpZykge1xuICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgY29uZmlnLmhlYWRlcnMgPSBBeGlvc0hlYWRlcnMkMS5mcm9tKGNvbmZpZy5oZWFkZXJzKTtcblxuICAvLyBUcmFuc2Zvcm0gcmVxdWVzdCBkYXRhXG4gIGNvbmZpZy5kYXRhID0gdHJhbnNmb3JtRGF0YS5jYWxsKFxuICAgIGNvbmZpZyxcbiAgICBjb25maWcudHJhbnNmb3JtUmVxdWVzdFxuICApO1xuXG4gIGlmIChbJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJ10uaW5kZXhPZihjb25maWcubWV0aG9kKSAhPT0gLTEpIHtcbiAgICBjb25maWcuaGVhZGVycy5zZXRDb250ZW50VHlwZSgnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJywgZmFsc2UpO1xuICB9XG5cbiAgY29uc3QgYWRhcHRlciA9IGFkYXB0ZXJzLmdldEFkYXB0ZXIoY29uZmlnLmFkYXB0ZXIgfHwgZGVmYXVsdHMkMS5hZGFwdGVyKTtcblxuICByZXR1cm4gYWRhcHRlcihjb25maWcpLnRoZW4oZnVuY3Rpb24gb25BZGFwdGVyUmVzb2x1dGlvbihyZXNwb25zZSkge1xuICAgIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTtcblxuICAgIC8vIFRyYW5zZm9ybSByZXNwb25zZSBkYXRhXG4gICAgcmVzcG9uc2UuZGF0YSA9IHRyYW5zZm9ybURhdGEuY2FsbChcbiAgICAgIGNvbmZpZyxcbiAgICAgIGNvbmZpZy50cmFuc2Zvcm1SZXNwb25zZSxcbiAgICAgIHJlc3BvbnNlXG4gICAgKTtcblxuICAgIHJlc3BvbnNlLmhlYWRlcnMgPSBBeGlvc0hlYWRlcnMkMS5mcm9tKHJlc3BvbnNlLmhlYWRlcnMpO1xuXG4gICAgcmV0dXJuIHJlc3BvbnNlO1xuICB9LCBmdW5jdGlvbiBvbkFkYXB0ZXJSZWplY3Rpb24ocmVhc29uKSB7XG4gICAgaWYgKCFpc0NhbmNlbChyZWFzb24pKSB7XG4gICAgICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgICAgIC8vIFRyYW5zZm9ybSByZXNwb25zZSBkYXRhXG4gICAgICBpZiAocmVhc29uICYmIHJlYXNvbi5yZXNwb25zZSkge1xuICAgICAgICByZWFzb24ucmVzcG9uc2UuZGF0YSA9IHRyYW5zZm9ybURhdGEuY2FsbChcbiAgICAgICAgICBjb25maWcsXG4gICAgICAgICAgY29uZmlnLnRyYW5zZm9ybVJlc3BvbnNlLFxuICAgICAgICAgIHJlYXNvbi5yZXNwb25zZVxuICAgICAgICApO1xuICAgICAgICByZWFzb24ucmVzcG9uc2UuaGVhZGVycyA9IEF4aW9zSGVhZGVycyQxLmZyb20ocmVhc29uLnJlc3BvbnNlLmhlYWRlcnMpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChyZWFzb24pO1xuICB9KTtcbn1cblxuY29uc3QgaGVhZGVyc1RvT2JqZWN0ID0gKHRoaW5nKSA9PiB0aGluZyBpbnN0YW5jZW9mIEF4aW9zSGVhZGVycyQxID8gdGhpbmcudG9KU09OKCkgOiB0aGluZztcblxuLyoqXG4gKiBDb25maWctc3BlY2lmaWMgbWVyZ2UtZnVuY3Rpb24gd2hpY2ggY3JlYXRlcyBhIG5ldyBjb25maWctb2JqZWN0XG4gKiBieSBtZXJnaW5nIHR3byBjb25maWd1cmF0aW9uIG9iamVjdHMgdG9nZXRoZXIuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZzFcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcyXG4gKlxuICogQHJldHVybnMge09iamVjdH0gTmV3IG9iamVjdCByZXN1bHRpbmcgZnJvbSBtZXJnaW5nIGNvbmZpZzIgdG8gY29uZmlnMVxuICovXG5mdW5jdGlvbiBtZXJnZUNvbmZpZyhjb25maWcxLCBjb25maWcyKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICBjb25maWcyID0gY29uZmlnMiB8fCB7fTtcbiAgY29uc3QgY29uZmlnID0ge307XG5cbiAgZnVuY3Rpb24gZ2V0TWVyZ2VkVmFsdWUodGFyZ2V0LCBzb3VyY2UsIGNhc2VsZXNzKSB7XG4gICAgaWYgKHV0aWxzLmlzUGxhaW5PYmplY3QodGFyZ2V0KSAmJiB1dGlscy5pc1BsYWluT2JqZWN0KHNvdXJjZSkpIHtcbiAgICAgIHJldHVybiB1dGlscy5tZXJnZS5jYWxsKHtjYXNlbGVzc30sIHRhcmdldCwgc291cmNlKTtcbiAgICB9IGVsc2UgaWYgKHV0aWxzLmlzUGxhaW5PYmplY3Qoc291cmNlKSkge1xuICAgICAgcmV0dXJuIHV0aWxzLm1lcmdlKHt9LCBzb3VyY2UpO1xuICAgIH0gZWxzZSBpZiAodXRpbHMuaXNBcnJheShzb3VyY2UpKSB7XG4gICAgICByZXR1cm4gc291cmNlLnNsaWNlKCk7XG4gICAgfVxuICAgIHJldHVybiBzb3VyY2U7XG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29uc2lzdGVudC1yZXR1cm5cbiAgZnVuY3Rpb24gbWVyZ2VEZWVwUHJvcGVydGllcyhhLCBiLCBjYXNlbGVzcykge1xuICAgIGlmICghdXRpbHMuaXNVbmRlZmluZWQoYikpIHtcbiAgICAgIHJldHVybiBnZXRNZXJnZWRWYWx1ZShhLCBiLCBjYXNlbGVzcyk7XG4gICAgfSBlbHNlIGlmICghdXRpbHMuaXNVbmRlZmluZWQoYSkpIHtcbiAgICAgIHJldHVybiBnZXRNZXJnZWRWYWx1ZSh1bmRlZmluZWQsIGEsIGNhc2VsZXNzKTtcbiAgICB9XG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29uc2lzdGVudC1yZXR1cm5cbiAgZnVuY3Rpb24gdmFsdWVGcm9tQ29uZmlnMihhLCBiKSB7XG4gICAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChiKSkge1xuICAgICAgcmV0dXJuIGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgYik7XG4gICAgfVxuICB9XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNvbnNpc3RlbnQtcmV0dXJuXG4gIGZ1bmN0aW9uIGRlZmF1bHRUb0NvbmZpZzIoYSwgYikge1xuICAgIGlmICghdXRpbHMuaXNVbmRlZmluZWQoYikpIHtcbiAgICAgIHJldHVybiBnZXRNZXJnZWRWYWx1ZSh1bmRlZmluZWQsIGIpO1xuICAgIH0gZWxzZSBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGEpKSB7XG4gICAgICByZXR1cm4gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBhKTtcbiAgICB9XG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29uc2lzdGVudC1yZXR1cm5cbiAgZnVuY3Rpb24gbWVyZ2VEaXJlY3RLZXlzKGEsIGIsIHByb3ApIHtcbiAgICBpZiAocHJvcCBpbiBjb25maWcyKSB7XG4gICAgICByZXR1cm4gZ2V0TWVyZ2VkVmFsdWUoYSwgYik7XG4gICAgfSBlbHNlIGlmIChwcm9wIGluIGNvbmZpZzEpIHtcbiAgICAgIHJldHVybiBnZXRNZXJnZWRWYWx1ZSh1bmRlZmluZWQsIGEpO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IG1lcmdlTWFwID0ge1xuICAgIHVybDogdmFsdWVGcm9tQ29uZmlnMixcbiAgICBtZXRob2Q6IHZhbHVlRnJvbUNvbmZpZzIsXG4gICAgZGF0YTogdmFsdWVGcm9tQ29uZmlnMixcbiAgICBiYXNlVVJMOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHRyYW5zZm9ybVJlcXVlc3Q6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgdHJhbnNmb3JtUmVzcG9uc2U6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgcGFyYW1zU2VyaWFsaXplcjogZGVmYXVsdFRvQ29uZmlnMixcbiAgICB0aW1lb3V0OiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHRpbWVvdXRNZXNzYWdlOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHdpdGhDcmVkZW50aWFsczogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBhZGFwdGVyOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHJlc3BvbnNlVHlwZTogZGVmYXVsdFRvQ29uZmlnMixcbiAgICB4c3JmQ29va2llTmFtZTogZGVmYXVsdFRvQ29uZmlnMixcbiAgICB4c3JmSGVhZGVyTmFtZTogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBvblVwbG9hZFByb2dyZXNzOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIG9uRG93bmxvYWRQcm9ncmVzczogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBkZWNvbXByZXNzOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIG1heENvbnRlbnRMZW5ndGg6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgbWF4Qm9keUxlbmd0aDogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBiZWZvcmVSZWRpcmVjdDogZGVmYXVsdFRvQ29uZmlnMixcbiAgICB0cmFuc3BvcnQ6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgaHR0cEFnZW50OiBkZWZhdWx0VG9Db25maWcyLFxuICAgIGh0dHBzQWdlbnQ6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgY2FuY2VsVG9rZW46IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgc29ja2V0UGF0aDogZGVmYXVsdFRvQ29uZmlnMixcbiAgICByZXNwb25zZUVuY29kaW5nOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHZhbGlkYXRlU3RhdHVzOiBtZXJnZURpcmVjdEtleXMsXG4gICAgaGVhZGVyczogKGEsIGIpID0+IG1lcmdlRGVlcFByb3BlcnRpZXMoaGVhZGVyc1RvT2JqZWN0KGEpLCBoZWFkZXJzVG9PYmplY3QoYiksIHRydWUpXG4gIH07XG5cbiAgdXRpbHMuZm9yRWFjaChPYmplY3Qua2V5cyhPYmplY3QuYXNzaWduKHt9LCBjb25maWcxLCBjb25maWcyKSksIGZ1bmN0aW9uIGNvbXB1dGVDb25maWdWYWx1ZShwcm9wKSB7XG4gICAgY29uc3QgbWVyZ2UgPSBtZXJnZU1hcFtwcm9wXSB8fCBtZXJnZURlZXBQcm9wZXJ0aWVzO1xuICAgIGNvbnN0IGNvbmZpZ1ZhbHVlID0gbWVyZ2UoY29uZmlnMVtwcm9wXSwgY29uZmlnMltwcm9wXSwgcHJvcCk7XG4gICAgKHV0aWxzLmlzVW5kZWZpbmVkKGNvbmZpZ1ZhbHVlKSAmJiBtZXJnZSAhPT0gbWVyZ2VEaXJlY3RLZXlzKSB8fCAoY29uZmlnW3Byb3BdID0gY29uZmlnVmFsdWUpO1xuICB9KTtcblxuICByZXR1cm4gY29uZmlnO1xufVxuXG5jb25zdCBWRVJTSU9OID0gXCIxLjQuMFwiO1xuXG5jb25zdCB2YWxpZGF0b3JzJDEgPSB7fTtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcblsnb2JqZWN0JywgJ2Jvb2xlYW4nLCAnbnVtYmVyJywgJ2Z1bmN0aW9uJywgJ3N0cmluZycsICdzeW1ib2wnXS5mb3JFYWNoKCh0eXBlLCBpKSA9PiB7XG4gIHZhbGlkYXRvcnMkMVt0eXBlXSA9IGZ1bmN0aW9uIHZhbGlkYXRvcih0aGluZykge1xuICAgIHJldHVybiB0eXBlb2YgdGhpbmcgPT09IHR5cGUgfHwgJ2EnICsgKGkgPCAxID8gJ24gJyA6ICcgJykgKyB0eXBlO1xuICB9O1xufSk7XG5cbmNvbnN0IGRlcHJlY2F0ZWRXYXJuaW5ncyA9IHt9O1xuXG4vKipcbiAqIFRyYW5zaXRpb25hbCBvcHRpb24gdmFsaWRhdG9yXG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbnxib29sZWFuP30gdmFsaWRhdG9yIC0gc2V0IHRvIGZhbHNlIGlmIHRoZSB0cmFuc2l0aW9uYWwgb3B0aW9uIGhhcyBiZWVuIHJlbW92ZWRcbiAqIEBwYXJhbSB7c3RyaW5nP30gdmVyc2lvbiAtIGRlcHJlY2F0ZWQgdmVyc2lvbiAvIHJlbW92ZWQgc2luY2UgdmVyc2lvblxuICogQHBhcmFtIHtzdHJpbmc/fSBtZXNzYWdlIC0gc29tZSBtZXNzYWdlIHdpdGggYWRkaXRpb25hbCBpbmZvXG4gKlxuICogQHJldHVybnMge2Z1bmN0aW9ufVxuICovXG52YWxpZGF0b3JzJDEudHJhbnNpdGlvbmFsID0gZnVuY3Rpb24gdHJhbnNpdGlvbmFsKHZhbGlkYXRvciwgdmVyc2lvbiwgbWVzc2FnZSkge1xuICBmdW5jdGlvbiBmb3JtYXRNZXNzYWdlKG9wdCwgZGVzYykge1xuICAgIHJldHVybiAnW0F4aW9zIHYnICsgVkVSU0lPTiArICddIFRyYW5zaXRpb25hbCBvcHRpb24gXFwnJyArIG9wdCArICdcXCcnICsgZGVzYyArIChtZXNzYWdlID8gJy4gJyArIG1lc3NhZ2UgOiAnJyk7XG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuICByZXR1cm4gKHZhbHVlLCBvcHQsIG9wdHMpID0+IHtcbiAgICBpZiAodmFsaWRhdG9yID09PSBmYWxzZSkge1xuICAgICAgdGhyb3cgbmV3IEF4aW9zRXJyb3IoXG4gICAgICAgIGZvcm1hdE1lc3NhZ2Uob3B0LCAnIGhhcyBiZWVuIHJlbW92ZWQnICsgKHZlcnNpb24gPyAnIGluICcgKyB2ZXJzaW9uIDogJycpKSxcbiAgICAgICAgQXhpb3NFcnJvci5FUlJfREVQUkVDQVRFRFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAodmVyc2lvbiAmJiAhZGVwcmVjYXRlZFdhcm5pbmdzW29wdF0pIHtcbiAgICAgIGRlcHJlY2F0ZWRXYXJuaW5nc1tvcHRdID0gdHJ1ZTtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgIGZvcm1hdE1lc3NhZ2UoXG4gICAgICAgICAgb3B0LFxuICAgICAgICAgICcgaGFzIGJlZW4gZGVwcmVjYXRlZCBzaW5jZSB2JyArIHZlcnNpb24gKyAnIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gdGhlIG5lYXIgZnV0dXJlJ1xuICAgICAgICApXG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiB2YWxpZGF0b3IgPyB2YWxpZGF0b3IodmFsdWUsIG9wdCwgb3B0cykgOiB0cnVlO1xuICB9O1xufTtcblxuLyoqXG4gKiBBc3NlcnQgb2JqZWN0J3MgcHJvcGVydGllcyB0eXBlXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnNcbiAqIEBwYXJhbSB7b2JqZWN0fSBzY2hlbWFcbiAqIEBwYXJhbSB7Ym9vbGVhbj99IGFsbG93VW5rbm93blxuICpcbiAqIEByZXR1cm5zIHtvYmplY3R9XG4gKi9cblxuZnVuY3Rpb24gYXNzZXJ0T3B0aW9ucyhvcHRpb25zLCBzY2hlbWEsIGFsbG93VW5rbm93bikge1xuICBpZiAodHlwZW9mIG9wdGlvbnMgIT09ICdvYmplY3QnKSB7XG4gICAgdGhyb3cgbmV3IEF4aW9zRXJyb3IoJ29wdGlvbnMgbXVzdCBiZSBhbiBvYmplY3QnLCBBeGlvc0Vycm9yLkVSUl9CQURfT1BUSU9OX1ZBTFVFKTtcbiAgfVxuICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMob3B0aW9ucyk7XG4gIGxldCBpID0ga2V5cy5sZW5ndGg7XG4gIHdoaWxlIChpLS0gPiAwKSB7XG4gICAgY29uc3Qgb3B0ID0ga2V5c1tpXTtcbiAgICBjb25zdCB2YWxpZGF0b3IgPSBzY2hlbWFbb3B0XTtcbiAgICBpZiAodmFsaWRhdG9yKSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IG9wdGlvbnNbb3B0XTtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsaWRhdG9yKHZhbHVlLCBvcHQsIG9wdGlvbnMpO1xuICAgICAgaWYgKHJlc3VsdCAhPT0gdHJ1ZSkge1xuICAgICAgICB0aHJvdyBuZXcgQXhpb3NFcnJvcignb3B0aW9uICcgKyBvcHQgKyAnIG11c3QgYmUgJyArIHJlc3VsdCwgQXhpb3NFcnJvci5FUlJfQkFEX09QVElPTl9WQUxVRSk7XG4gICAgICB9XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgaWYgKGFsbG93VW5rbm93biAhPT0gdHJ1ZSkge1xuICAgICAgdGhyb3cgbmV3IEF4aW9zRXJyb3IoJ1Vua25vd24gb3B0aW9uICcgKyBvcHQsIEF4aW9zRXJyb3IuRVJSX0JBRF9PUFRJT04pO1xuICAgIH1cbiAgfVxufVxuXG52YXIgdmFsaWRhdG9yID0ge1xuICBhc3NlcnRPcHRpb25zLFxuICB2YWxpZGF0b3JzOiB2YWxpZGF0b3JzJDFcbn07XG5cbmNvbnN0IHZhbGlkYXRvcnMgPSB2YWxpZGF0b3IudmFsaWRhdG9ycztcblxuLyoqXG4gKiBDcmVhdGUgYSBuZXcgaW5zdGFuY2Ugb2YgQXhpb3NcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VDb25maWcgVGhlIGRlZmF1bHQgY29uZmlnIGZvciB0aGUgaW5zdGFuY2VcbiAqXG4gKiBAcmV0dXJuIHtBeGlvc30gQSBuZXcgaW5zdGFuY2Ugb2YgQXhpb3NcbiAqL1xuY2xhc3MgQXhpb3Mge1xuICBjb25zdHJ1Y3RvcihpbnN0YW5jZUNvbmZpZykge1xuICAgIHRoaXMuZGVmYXVsdHMgPSBpbnN0YW5jZUNvbmZpZztcbiAgICB0aGlzLmludGVyY2VwdG9ycyA9IHtcbiAgICAgIHJlcXVlc3Q6IG5ldyBJbnRlcmNlcHRvck1hbmFnZXIkMSgpLFxuICAgICAgcmVzcG9uc2U6IG5ldyBJbnRlcmNlcHRvck1hbmFnZXIkMSgpXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEaXNwYXRjaCBhIHJlcXVlc3RcbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd8T2JqZWN0fSBjb25maWdPclVybCBUaGUgY29uZmlnIHNwZWNpZmljIGZvciB0aGlzIHJlcXVlc3QgKG1lcmdlZCB3aXRoIHRoaXMuZGVmYXVsdHMpXG4gICAqIEBwYXJhbSB7P09iamVjdH0gY29uZmlnXG4gICAqXG4gICAqIEByZXR1cm5zIHtQcm9taXNlfSBUaGUgUHJvbWlzZSB0byBiZSBmdWxmaWxsZWRcbiAgICovXG4gIHJlcXVlc3QoY29uZmlnT3JVcmwsIGNvbmZpZykge1xuICAgIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICAgIC8vIEFsbG93IGZvciBheGlvcygnZXhhbXBsZS91cmwnWywgY29uZmlnXSkgYSBsYSBmZXRjaCBBUElcbiAgICBpZiAodHlwZW9mIGNvbmZpZ09yVXJsID09PSAnc3RyaW5nJykge1xuICAgICAgY29uZmlnID0gY29uZmlnIHx8IHt9O1xuICAgICAgY29uZmlnLnVybCA9IGNvbmZpZ09yVXJsO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25maWcgPSBjb25maWdPclVybCB8fCB7fTtcbiAgICB9XG5cbiAgICBjb25maWcgPSBtZXJnZUNvbmZpZyh0aGlzLmRlZmF1bHRzLCBjb25maWcpO1xuXG4gICAgY29uc3Qge3RyYW5zaXRpb25hbCwgcGFyYW1zU2VyaWFsaXplciwgaGVhZGVyc30gPSBjb25maWc7XG5cbiAgICBpZiAodHJhbnNpdGlvbmFsICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHZhbGlkYXRvci5hc3NlcnRPcHRpb25zKHRyYW5zaXRpb25hbCwge1xuICAgICAgICBzaWxlbnRKU09OUGFyc2luZzogdmFsaWRhdG9ycy50cmFuc2l0aW9uYWwodmFsaWRhdG9ycy5ib29sZWFuKSxcbiAgICAgICAgZm9yY2VkSlNPTlBhcnNpbmc6IHZhbGlkYXRvcnMudHJhbnNpdGlvbmFsKHZhbGlkYXRvcnMuYm9vbGVhbiksXG4gICAgICAgIGNsYXJpZnlUaW1lb3V0RXJyb3I6IHZhbGlkYXRvcnMudHJhbnNpdGlvbmFsKHZhbGlkYXRvcnMuYm9vbGVhbilcbiAgICAgIH0sIGZhbHNlKTtcbiAgICB9XG5cbiAgICBpZiAocGFyYW1zU2VyaWFsaXplciAhPSBudWxsKSB7XG4gICAgICBpZiAodXRpbHMuaXNGdW5jdGlvbihwYXJhbXNTZXJpYWxpemVyKSkge1xuICAgICAgICBjb25maWcucGFyYW1zU2VyaWFsaXplciA9IHtcbiAgICAgICAgICBzZXJpYWxpemU6IHBhcmFtc1NlcmlhbGl6ZXJcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbGlkYXRvci5hc3NlcnRPcHRpb25zKHBhcmFtc1NlcmlhbGl6ZXIsIHtcbiAgICAgICAgICBlbmNvZGU6IHZhbGlkYXRvcnMuZnVuY3Rpb24sXG4gICAgICAgICAgc2VyaWFsaXplOiB2YWxpZGF0b3JzLmZ1bmN0aW9uXG4gICAgICAgIH0sIHRydWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFNldCBjb25maWcubWV0aG9kXG4gICAgY29uZmlnLm1ldGhvZCA9IChjb25maWcubWV0aG9kIHx8IHRoaXMuZGVmYXVsdHMubWV0aG9kIHx8ICdnZXQnKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgbGV0IGNvbnRleHRIZWFkZXJzO1xuXG4gICAgLy8gRmxhdHRlbiBoZWFkZXJzXG4gICAgY29udGV4dEhlYWRlcnMgPSBoZWFkZXJzICYmIHV0aWxzLm1lcmdlKFxuICAgICAgaGVhZGVycy5jb21tb24sXG4gICAgICBoZWFkZXJzW2NvbmZpZy5tZXRob2RdXG4gICAgKTtcblxuICAgIGNvbnRleHRIZWFkZXJzICYmIHV0aWxzLmZvckVhY2goXG4gICAgICBbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCcsICdwb3N0JywgJ3B1dCcsICdwYXRjaCcsICdjb21tb24nXSxcbiAgICAgIChtZXRob2QpID0+IHtcbiAgICAgICAgZGVsZXRlIGhlYWRlcnNbbWV0aG9kXTtcbiAgICAgIH1cbiAgICApO1xuXG4gICAgY29uZmlnLmhlYWRlcnMgPSBBeGlvc0hlYWRlcnMkMS5jb25jYXQoY29udGV4dEhlYWRlcnMsIGhlYWRlcnMpO1xuXG4gICAgLy8gZmlsdGVyIG91dCBza2lwcGVkIGludGVyY2VwdG9yc1xuICAgIGNvbnN0IHJlcXVlc3RJbnRlcmNlcHRvckNoYWluID0gW107XG4gICAgbGV0IHN5bmNocm9ub3VzUmVxdWVzdEludGVyY2VwdG9ycyA9IHRydWU7XG4gICAgdGhpcy5pbnRlcmNlcHRvcnMucmVxdWVzdC5mb3JFYWNoKGZ1bmN0aW9uIHVuc2hpZnRSZXF1ZXN0SW50ZXJjZXB0b3JzKGludGVyY2VwdG9yKSB7XG4gICAgICBpZiAodHlwZW9mIGludGVyY2VwdG9yLnJ1bldoZW4gPT09ICdmdW5jdGlvbicgJiYgaW50ZXJjZXB0b3IucnVuV2hlbihjb25maWcpID09PSBmYWxzZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHN5bmNocm9ub3VzUmVxdWVzdEludGVyY2VwdG9ycyA9IHN5bmNocm9ub3VzUmVxdWVzdEludGVyY2VwdG9ycyAmJiBpbnRlcmNlcHRvci5zeW5jaHJvbm91cztcblxuICAgICAgcmVxdWVzdEludGVyY2VwdG9yQ2hhaW4udW5zaGlmdChpbnRlcmNlcHRvci5mdWxmaWxsZWQsIGludGVyY2VwdG9yLnJlamVjdGVkKTtcbiAgICB9KTtcblxuICAgIGNvbnN0IHJlc3BvbnNlSW50ZXJjZXB0b3JDaGFpbiA9IFtdO1xuICAgIHRoaXMuaW50ZXJjZXB0b3JzLnJlc3BvbnNlLmZvckVhY2goZnVuY3Rpb24gcHVzaFJlc3BvbnNlSW50ZXJjZXB0b3JzKGludGVyY2VwdG9yKSB7XG4gICAgICByZXNwb25zZUludGVyY2VwdG9yQ2hhaW4ucHVzaChpbnRlcmNlcHRvci5mdWxmaWxsZWQsIGludGVyY2VwdG9yLnJlamVjdGVkKTtcbiAgICB9KTtcblxuICAgIGxldCBwcm9taXNlO1xuICAgIGxldCBpID0gMDtcbiAgICBsZXQgbGVuO1xuXG4gICAgaWYgKCFzeW5jaHJvbm91c1JlcXVlc3RJbnRlcmNlcHRvcnMpIHtcbiAgICAgIGNvbnN0IGNoYWluID0gW2Rpc3BhdGNoUmVxdWVzdC5iaW5kKHRoaXMpLCB1bmRlZmluZWRdO1xuICAgICAgY2hhaW4udW5zaGlmdC5hcHBseShjaGFpbiwgcmVxdWVzdEludGVyY2VwdG9yQ2hhaW4pO1xuICAgICAgY2hhaW4ucHVzaC5hcHBseShjaGFpbiwgcmVzcG9uc2VJbnRlcmNlcHRvckNoYWluKTtcbiAgICAgIGxlbiA9IGNoYWluLmxlbmd0aDtcblxuICAgICAgcHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZShjb25maWcpO1xuXG4gICAgICB3aGlsZSAoaSA8IGxlbikge1xuICAgICAgICBwcm9taXNlID0gcHJvbWlzZS50aGVuKGNoYWluW2krK10sIGNoYWluW2krK10pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICB9XG5cbiAgICBsZW4gPSByZXF1ZXN0SW50ZXJjZXB0b3JDaGFpbi5sZW5ndGg7XG5cbiAgICBsZXQgbmV3Q29uZmlnID0gY29uZmlnO1xuXG4gICAgaSA9IDA7XG5cbiAgICB3aGlsZSAoaSA8IGxlbikge1xuICAgICAgY29uc3Qgb25GdWxmaWxsZWQgPSByZXF1ZXN0SW50ZXJjZXB0b3JDaGFpbltpKytdO1xuICAgICAgY29uc3Qgb25SZWplY3RlZCA9IHJlcXVlc3RJbnRlcmNlcHRvckNoYWluW2krK107XG4gICAgICB0cnkge1xuICAgICAgICBuZXdDb25maWcgPSBvbkZ1bGZpbGxlZChuZXdDb25maWcpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgb25SZWplY3RlZC5jYWxsKHRoaXMsIGVycm9yKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIHByb21pc2UgPSBkaXNwYXRjaFJlcXVlc3QuY2FsbCh0aGlzLCBuZXdDb25maWcpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xuICAgIH1cblxuICAgIGkgPSAwO1xuICAgIGxlbiA9IHJlc3BvbnNlSW50ZXJjZXB0b3JDaGFpbi5sZW5ndGg7XG5cbiAgICB3aGlsZSAoaSA8IGxlbikge1xuICAgICAgcHJvbWlzZSA9IHByb21pc2UudGhlbihyZXNwb25zZUludGVyY2VwdG9yQ2hhaW5baSsrXSwgcmVzcG9uc2VJbnRlcmNlcHRvckNoYWluW2krK10pO1xuICAgIH1cblxuICAgIHJldHVybiBwcm9taXNlO1xuICB9XG5cbiAgZ2V0VXJpKGNvbmZpZykge1xuICAgIGNvbmZpZyA9IG1lcmdlQ29uZmlnKHRoaXMuZGVmYXVsdHMsIGNvbmZpZyk7XG4gICAgY29uc3QgZnVsbFBhdGggPSBidWlsZEZ1bGxQYXRoKGNvbmZpZy5iYXNlVVJMLCBjb25maWcudXJsKTtcbiAgICByZXR1cm4gYnVpbGRVUkwoZnVsbFBhdGgsIGNvbmZpZy5wYXJhbXMsIGNvbmZpZy5wYXJhbXNTZXJpYWxpemVyKTtcbiAgfVxufVxuXG4vLyBQcm92aWRlIGFsaWFzZXMgZm9yIHN1cHBvcnRlZCByZXF1ZXN0IG1ldGhvZHNcbnV0aWxzLmZvckVhY2goWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnLCAnb3B0aW9ucyddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kTm9EYXRhKG1ldGhvZCkge1xuICAvKmVzbGludCBmdW5jLW5hbWVzOjAqL1xuICBBeGlvcy5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKHVybCwgY29uZmlnKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChtZXJnZUNvbmZpZyhjb25maWcgfHwge30sIHtcbiAgICAgIG1ldGhvZCxcbiAgICAgIHVybCxcbiAgICAgIGRhdGE6IChjb25maWcgfHwge30pLmRhdGFcbiAgICB9KSk7XG4gIH07XG59KTtcblxudXRpbHMuZm9yRWFjaChbJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2RXaXRoRGF0YShtZXRob2QpIHtcbiAgLyplc2xpbnQgZnVuYy1uYW1lczowKi9cblxuICBmdW5jdGlvbiBnZW5lcmF0ZUhUVFBNZXRob2QoaXNGb3JtKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIGh0dHBNZXRob2QodXJsLCBkYXRhLCBjb25maWcpIHtcbiAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QobWVyZ2VDb25maWcoY29uZmlnIHx8IHt9LCB7XG4gICAgICAgIG1ldGhvZCxcbiAgICAgICAgaGVhZGVyczogaXNGb3JtID8ge1xuICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnbXVsdGlwYXJ0L2Zvcm0tZGF0YSdcbiAgICAgICAgfSA6IHt9LFxuICAgICAgICB1cmwsXG4gICAgICAgIGRhdGFcbiAgICAgIH0pKTtcbiAgICB9O1xuICB9XG5cbiAgQXhpb3MucHJvdG90eXBlW21ldGhvZF0gPSBnZW5lcmF0ZUhUVFBNZXRob2QoKTtcblxuICBBeGlvcy5wcm90b3R5cGVbbWV0aG9kICsgJ0Zvcm0nXSA9IGdlbmVyYXRlSFRUUE1ldGhvZCh0cnVlKTtcbn0pO1xuXG52YXIgQXhpb3MkMSA9IEF4aW9zO1xuXG4vKipcbiAqIEEgYENhbmNlbFRva2VuYCBpcyBhbiBvYmplY3QgdGhhdCBjYW4gYmUgdXNlZCB0byByZXF1ZXN0IGNhbmNlbGxhdGlvbiBvZiBhbiBvcGVyYXRpb24uXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZXhlY3V0b3IgVGhlIGV4ZWN1dG9yIGZ1bmN0aW9uLlxuICpcbiAqIEByZXR1cm5zIHtDYW5jZWxUb2tlbn1cbiAqL1xuY2xhc3MgQ2FuY2VsVG9rZW4ge1xuICBjb25zdHJ1Y3RvcihleGVjdXRvcikge1xuICAgIGlmICh0eXBlb2YgZXhlY3V0b3IgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2V4ZWN1dG9yIG11c3QgYmUgYSBmdW5jdGlvbi4nKTtcbiAgICB9XG5cbiAgICBsZXQgcmVzb2x2ZVByb21pc2U7XG5cbiAgICB0aGlzLnByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiBwcm9taXNlRXhlY3V0b3IocmVzb2x2ZSkge1xuICAgICAgcmVzb2x2ZVByb21pc2UgPSByZXNvbHZlO1xuICAgIH0pO1xuXG4gICAgY29uc3QgdG9rZW4gPSB0aGlzO1xuXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbiAgICB0aGlzLnByb21pc2UudGhlbihjYW5jZWwgPT4ge1xuICAgICAgaWYgKCF0b2tlbi5fbGlzdGVuZXJzKSByZXR1cm47XG5cbiAgICAgIGxldCBpID0gdG9rZW4uX2xpc3RlbmVycy5sZW5ndGg7XG5cbiAgICAgIHdoaWxlIChpLS0gPiAwKSB7XG4gICAgICAgIHRva2VuLl9saXN0ZW5lcnNbaV0oY2FuY2VsKTtcbiAgICAgIH1cbiAgICAgIHRva2VuLl9saXN0ZW5lcnMgPSBudWxsO1xuICAgIH0pO1xuXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbiAgICB0aGlzLnByb21pc2UudGhlbiA9IG9uZnVsZmlsbGVkID0+IHtcbiAgICAgIGxldCBfcmVzb2x2ZTtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG4gICAgICBjb25zdCBwcm9taXNlID0gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgIHRva2VuLnN1YnNjcmliZShyZXNvbHZlKTtcbiAgICAgICAgX3Jlc29sdmUgPSByZXNvbHZlO1xuICAgICAgfSkudGhlbihvbmZ1bGZpbGxlZCk7XG5cbiAgICAgIHByb21pc2UuY2FuY2VsID0gZnVuY3Rpb24gcmVqZWN0KCkge1xuICAgICAgICB0b2tlbi51bnN1YnNjcmliZShfcmVzb2x2ZSk7XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICB9O1xuXG4gICAgZXhlY3V0b3IoZnVuY3Rpb24gY2FuY2VsKG1lc3NhZ2UsIGNvbmZpZywgcmVxdWVzdCkge1xuICAgICAgaWYgKHRva2VuLnJlYXNvbikge1xuICAgICAgICAvLyBDYW5jZWxsYXRpb24gaGFzIGFscmVhZHkgYmVlbiByZXF1ZXN0ZWRcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0b2tlbi5yZWFzb24gPSBuZXcgQ2FuY2VsZWRFcnJvcihtZXNzYWdlLCBjb25maWcsIHJlcXVlc3QpO1xuICAgICAgcmVzb2x2ZVByb21pc2UodG9rZW4ucmVhc29uKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaHJvd3MgYSBgQ2FuY2VsZWRFcnJvcmAgaWYgY2FuY2VsbGF0aW9uIGhhcyBiZWVuIHJlcXVlc3RlZC5cbiAgICovXG4gIHRocm93SWZSZXF1ZXN0ZWQoKSB7XG4gICAgaWYgKHRoaXMucmVhc29uKSB7XG4gICAgICB0aHJvdyB0aGlzLnJlYXNvbjtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU3Vic2NyaWJlIHRvIHRoZSBjYW5jZWwgc2lnbmFsXG4gICAqL1xuXG4gIHN1YnNjcmliZShsaXN0ZW5lcikge1xuICAgIGlmICh0aGlzLnJlYXNvbikge1xuICAgICAgbGlzdGVuZXIodGhpcy5yZWFzb24pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9saXN0ZW5lcnMpIHtcbiAgICAgIHRoaXMuX2xpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fbGlzdGVuZXJzID0gW2xpc3RlbmVyXTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVW5zdWJzY3JpYmUgZnJvbSB0aGUgY2FuY2VsIHNpZ25hbFxuICAgKi9cblxuICB1bnN1YnNjcmliZShsaXN0ZW5lcikge1xuICAgIGlmICghdGhpcy5fbGlzdGVuZXJzKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5fbGlzdGVuZXJzLmluZGV4T2YobGlzdGVuZXIpO1xuICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgIHRoaXMuX2xpc3RlbmVycy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFuIG9iamVjdCB0aGF0IGNvbnRhaW5zIGEgbmV3IGBDYW5jZWxUb2tlbmAgYW5kIGEgZnVuY3Rpb24gdGhhdCwgd2hlbiBjYWxsZWQsXG4gICAqIGNhbmNlbHMgdGhlIGBDYW5jZWxUb2tlbmAuXG4gICAqL1xuICBzdGF0aWMgc291cmNlKCkge1xuICAgIGxldCBjYW5jZWw7XG4gICAgY29uc3QgdG9rZW4gPSBuZXcgQ2FuY2VsVG9rZW4oZnVuY3Rpb24gZXhlY3V0b3IoYykge1xuICAgICAgY2FuY2VsID0gYztcbiAgICB9KTtcbiAgICByZXR1cm4ge1xuICAgICAgdG9rZW4sXG4gICAgICBjYW5jZWxcbiAgICB9O1xuICB9XG59XG5cbnZhciBDYW5jZWxUb2tlbiQxID0gQ2FuY2VsVG9rZW47XG5cbi8qKlxuICogU3ludGFjdGljIHN1Z2FyIGZvciBpbnZva2luZyBhIGZ1bmN0aW9uIGFuZCBleHBhbmRpbmcgYW4gYXJyYXkgZm9yIGFyZ3VtZW50cy5cbiAqXG4gKiBDb21tb24gdXNlIGNhc2Ugd291bGQgYmUgdG8gdXNlIGBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHlgLlxuICpcbiAqICBgYGBqc1xuICogIGZ1bmN0aW9uIGYoeCwgeSwgeikge31cbiAqICB2YXIgYXJncyA9IFsxLCAyLCAzXTtcbiAqICBmLmFwcGx5KG51bGwsIGFyZ3MpO1xuICogIGBgYFxuICpcbiAqIFdpdGggYHNwcmVhZGAgdGhpcyBleGFtcGxlIGNhbiBiZSByZS13cml0dGVuLlxuICpcbiAqICBgYGBqc1xuICogIHNwcmVhZChmdW5jdGlvbih4LCB5LCB6KSB7fSkoWzEsIDIsIDNdKTtcbiAqICBgYGBcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICpcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAqL1xuZnVuY3Rpb24gc3ByZWFkKGNhbGxiYWNrKSB7XG4gIHJldHVybiBmdW5jdGlvbiB3cmFwKGFycikge1xuICAgIHJldHVybiBjYWxsYmFjay5hcHBseShudWxsLCBhcnIpO1xuICB9O1xufVxuXG4vKipcbiAqIERldGVybWluZXMgd2hldGhlciB0aGUgcGF5bG9hZCBpcyBhbiBlcnJvciB0aHJvd24gYnkgQXhpb3NcbiAqXG4gKiBAcGFyYW0geyp9IHBheWxvYWQgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgcGF5bG9hZCBpcyBhbiBlcnJvciB0aHJvd24gYnkgQXhpb3MsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0F4aW9zRXJyb3IocGF5bG9hZCkge1xuICByZXR1cm4gdXRpbHMuaXNPYmplY3QocGF5bG9hZCkgJiYgKHBheWxvYWQuaXNBeGlvc0Vycm9yID09PSB0cnVlKTtcbn1cblxuY29uc3QgSHR0cFN0YXR1c0NvZGUgPSB7XG4gIENvbnRpbnVlOiAxMDAsXG4gIFN3aXRjaGluZ1Byb3RvY29sczogMTAxLFxuICBQcm9jZXNzaW5nOiAxMDIsXG4gIEVhcmx5SGludHM6IDEwMyxcbiAgT2s6IDIwMCxcbiAgQ3JlYXRlZDogMjAxLFxuICBBY2NlcHRlZDogMjAyLFxuICBOb25BdXRob3JpdGF0aXZlSW5mb3JtYXRpb246IDIwMyxcbiAgTm9Db250ZW50OiAyMDQsXG4gIFJlc2V0Q29udGVudDogMjA1LFxuICBQYXJ0aWFsQ29udGVudDogMjA2LFxuICBNdWx0aVN0YXR1czogMjA3LFxuICBBbHJlYWR5UmVwb3J0ZWQ6IDIwOCxcbiAgSW1Vc2VkOiAyMjYsXG4gIE11bHRpcGxlQ2hvaWNlczogMzAwLFxuICBNb3ZlZFBlcm1hbmVudGx5OiAzMDEsXG4gIEZvdW5kOiAzMDIsXG4gIFNlZU90aGVyOiAzMDMsXG4gIE5vdE1vZGlmaWVkOiAzMDQsXG4gIFVzZVByb3h5OiAzMDUsXG4gIFVudXNlZDogMzA2LFxuICBUZW1wb3JhcnlSZWRpcmVjdDogMzA3LFxuICBQZXJtYW5lbnRSZWRpcmVjdDogMzA4LFxuICBCYWRSZXF1ZXN0OiA0MDAsXG4gIFVuYXV0aG9yaXplZDogNDAxLFxuICBQYXltZW50UmVxdWlyZWQ6IDQwMixcbiAgRm9yYmlkZGVuOiA0MDMsXG4gIE5vdEZvdW5kOiA0MDQsXG4gIE1ldGhvZE5vdEFsbG93ZWQ6IDQwNSxcbiAgTm90QWNjZXB0YWJsZTogNDA2LFxuICBQcm94eUF1dGhlbnRpY2F0aW9uUmVxdWlyZWQ6IDQwNyxcbiAgUmVxdWVzdFRpbWVvdXQ6IDQwOCxcbiAgQ29uZmxpY3Q6IDQwOSxcbiAgR29uZTogNDEwLFxuICBMZW5ndGhSZXF1aXJlZDogNDExLFxuICBQcmVjb25kaXRpb25GYWlsZWQ6IDQxMixcbiAgUGF5bG9hZFRvb0xhcmdlOiA0MTMsXG4gIFVyaVRvb0xvbmc6IDQxNCxcbiAgVW5zdXBwb3J0ZWRNZWRpYVR5cGU6IDQxNSxcbiAgUmFuZ2VOb3RTYXRpc2ZpYWJsZTogNDE2LFxuICBFeHBlY3RhdGlvbkZhaWxlZDogNDE3LFxuICBJbUFUZWFwb3Q6IDQxOCxcbiAgTWlzZGlyZWN0ZWRSZXF1ZXN0OiA0MjEsXG4gIFVucHJvY2Vzc2FibGVFbnRpdHk6IDQyMixcbiAgTG9ja2VkOiA0MjMsXG4gIEZhaWxlZERlcGVuZGVuY3k6IDQyNCxcbiAgVG9vRWFybHk6IDQyNSxcbiAgVXBncmFkZVJlcXVpcmVkOiA0MjYsXG4gIFByZWNvbmRpdGlvblJlcXVpcmVkOiA0MjgsXG4gIFRvb01hbnlSZXF1ZXN0czogNDI5LFxuICBSZXF1ZXN0SGVhZGVyRmllbGRzVG9vTGFyZ2U6IDQzMSxcbiAgVW5hdmFpbGFibGVGb3JMZWdhbFJlYXNvbnM6IDQ1MSxcbiAgSW50ZXJuYWxTZXJ2ZXJFcnJvcjogNTAwLFxuICBOb3RJbXBsZW1lbnRlZDogNTAxLFxuICBCYWRHYXRld2F5OiA1MDIsXG4gIFNlcnZpY2VVbmF2YWlsYWJsZTogNTAzLFxuICBHYXRld2F5VGltZW91dDogNTA0LFxuICBIdHRwVmVyc2lvbk5vdFN1cHBvcnRlZDogNTA1LFxuICBWYXJpYW50QWxzb05lZ290aWF0ZXM6IDUwNixcbiAgSW5zdWZmaWNpZW50U3RvcmFnZTogNTA3LFxuICBMb29wRGV0ZWN0ZWQ6IDUwOCxcbiAgTm90RXh0ZW5kZWQ6IDUxMCxcbiAgTmV0d29ya0F1dGhlbnRpY2F0aW9uUmVxdWlyZWQ6IDUxMSxcbn07XG5cbk9iamVjdC5lbnRyaWVzKEh0dHBTdGF0dXNDb2RlKS5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IHtcbiAgSHR0cFN0YXR1c0NvZGVbdmFsdWVdID0ga2V5O1xufSk7XG5cbnZhciBIdHRwU3RhdHVzQ29kZSQxID0gSHR0cFN0YXR1c0NvZGU7XG5cbi8qKlxuICogQ3JlYXRlIGFuIGluc3RhbmNlIG9mIEF4aW9zXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGRlZmF1bHRDb25maWcgVGhlIGRlZmF1bHQgY29uZmlnIGZvciB0aGUgaW5zdGFuY2VcbiAqXG4gKiBAcmV0dXJucyB7QXhpb3N9IEEgbmV3IGluc3RhbmNlIG9mIEF4aW9zXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUluc3RhbmNlKGRlZmF1bHRDb25maWcpIHtcbiAgY29uc3QgY29udGV4dCA9IG5ldyBBeGlvcyQxKGRlZmF1bHRDb25maWcpO1xuICBjb25zdCBpbnN0YW5jZSA9IGJpbmQoQXhpb3MkMS5wcm90b3R5cGUucmVxdWVzdCwgY29udGV4dCk7XG5cbiAgLy8gQ29weSBheGlvcy5wcm90b3R5cGUgdG8gaW5zdGFuY2VcbiAgdXRpbHMuZXh0ZW5kKGluc3RhbmNlLCBBeGlvcyQxLnByb3RvdHlwZSwgY29udGV4dCwge2FsbE93bktleXM6IHRydWV9KTtcblxuICAvLyBDb3B5IGNvbnRleHQgdG8gaW5zdGFuY2VcbiAgdXRpbHMuZXh0ZW5kKGluc3RhbmNlLCBjb250ZXh0LCBudWxsLCB7YWxsT3duS2V5czogdHJ1ZX0pO1xuXG4gIC8vIEZhY3RvcnkgZm9yIGNyZWF0aW5nIG5ldyBpbnN0YW5jZXNcbiAgaW5zdGFuY2UuY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKGluc3RhbmNlQ29uZmlnKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUluc3RhbmNlKG1lcmdlQ29uZmlnKGRlZmF1bHRDb25maWcsIGluc3RhbmNlQ29uZmlnKSk7XG4gIH07XG5cbiAgcmV0dXJuIGluc3RhbmNlO1xufVxuXG4vLyBDcmVhdGUgdGhlIGRlZmF1bHQgaW5zdGFuY2UgdG8gYmUgZXhwb3J0ZWRcbmNvbnN0IGF4aW9zID0gY3JlYXRlSW5zdGFuY2UoZGVmYXVsdHMkMSk7XG5cbi8vIEV4cG9zZSBBeGlvcyBjbGFzcyB0byBhbGxvdyBjbGFzcyBpbmhlcml0YW5jZVxuYXhpb3MuQXhpb3MgPSBBeGlvcyQxO1xuXG4vLyBFeHBvc2UgQ2FuY2VsICYgQ2FuY2VsVG9rZW5cbmF4aW9zLkNhbmNlbGVkRXJyb3IgPSBDYW5jZWxlZEVycm9yO1xuYXhpb3MuQ2FuY2VsVG9rZW4gPSBDYW5jZWxUb2tlbiQxO1xuYXhpb3MuaXNDYW5jZWwgPSBpc0NhbmNlbDtcbmF4aW9zLlZFUlNJT04gPSBWRVJTSU9OO1xuYXhpb3MudG9Gb3JtRGF0YSA9IHRvRm9ybURhdGE7XG5cbi8vIEV4cG9zZSBBeGlvc0Vycm9yIGNsYXNzXG5heGlvcy5BeGlvc0Vycm9yID0gQXhpb3NFcnJvcjtcblxuLy8gYWxpYXMgZm9yIENhbmNlbGVkRXJyb3IgZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHlcbmF4aW9zLkNhbmNlbCA9IGF4aW9zLkNhbmNlbGVkRXJyb3I7XG5cbi8vIEV4cG9zZSBhbGwvc3ByZWFkXG5heGlvcy5hbGwgPSBmdW5jdGlvbiBhbGwocHJvbWlzZXMpIHtcbiAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbn07XG5cbmF4aW9zLnNwcmVhZCA9IHNwcmVhZDtcblxuLy8gRXhwb3NlIGlzQXhpb3NFcnJvclxuYXhpb3MuaXNBeGlvc0Vycm9yID0gaXNBeGlvc0Vycm9yO1xuXG4vLyBFeHBvc2UgbWVyZ2VDb25maWdcbmF4aW9zLm1lcmdlQ29uZmlnID0gbWVyZ2VDb25maWc7XG5cbmF4aW9zLkF4aW9zSGVhZGVycyA9IEF4aW9zSGVhZGVycyQxO1xuXG5heGlvcy5mb3JtVG9KU09OID0gdGhpbmcgPT4gZm9ybURhdGFUb0pTT04odXRpbHMuaXNIVE1MRm9ybSh0aGluZykgPyBuZXcgRm9ybURhdGEodGhpbmcpIDogdGhpbmcpO1xuXG5heGlvcy5IdHRwU3RhdHVzQ29kZSA9IEh0dHBTdGF0dXNDb2RlJDE7XG5cbmF4aW9zLmRlZmF1bHQgPSBheGlvcztcblxubW9kdWxlLmV4cG9ydHMgPSBheGlvcztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWF4aW9zLmNqcy5tYXBcbiIsImltcG9ydCBcIi4vaW5kZXguc2Nzc1wiO1xuaW1wb3J0IFwiLi9fcGFnaW5hdGlvbi5zY3NzXCI7XG5pbXBvcnQgXCIuL3RhYmxlLnNjc3NcIjtcbmltcG9ydCAgXCIuLy4uL2NvbXBvbmVudHMvVG9hc3RcIlxuaW1wb3J0ICBcIi4vLi4vY29tcG9uZW50cy9TaW5nbGVMb2FkVG9hc3RcIlxuaW1wb3J0IFwiLi8uLi9tb2R1bGVzL05hdmlnYXRpb25cIjtcbmltcG9ydCBcIi4vLi4vY29tcG9uZW50cy9TdGF0dXNTd2l0Y2hlci9pbmRleExpc3RcIjtcblxuXG5jb25zdCBoaWRlTG9hZGVyID0gKCkgPT4ge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JykuY2xhc3NMaXN0LmFkZCgnLWxvYWRlZCcpO1xuICAgIH0sIDUwMCk7XG59XG5cbmNvbnN0IG1hbmVnZU5hdmlnYXRpb24gPSAoKSA9PiB7XG4gICAgY29uc3QgbmF2aWdhdGlvbkluaXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmF2aWdhdGlvblRyaWdnZXInKTtcbiAgICBuYXZpZ2F0aW9uSW5pdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLmNsYXNzTGlzdC5hZGQoJy1uYXZpZ2F0aW9uLW9wZW5lZCcpO1xuICAgIH0pXG59XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoZXZlbnQpID0+IHtcbiAgICBoaWRlTG9hZGVyKCk7XG4gICAgbWFuZWdlTmF2aWdhdGlvbigpO1xufSk7IiwiXG5pbXBvcnQgeyBoLCByZW5kZXIgfSBmcm9tICdwcmVhY3QnO1xuaW1wb3J0IG1lc3NhZ2UgZnJvbSBcIi4vLi4vVG9hc3QvbWVzc2FnZVwiO1xuXG5jb25zdCBzdWNjZXNzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvYXN0LXN1Y2Nlc3MnKTtjb25zb2xlLmxvZyhcInN1Y2Nlc3NcIixzdWNjZXNzKTtcbmlmIChzdWNjZXNzKSB7XG4gICAgbWVzc2FnZS5zdWNjZXNzKCk7XG59XG5cbmNvbnN0IGVycm9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvYXN0LWVycm9yJyk7XG5pZiAoc3VjY2Vzcykge1xuICAgIG1lc3NhZ2UuZXJyb3IoKTtcbn1cblxuIiwiaW1wb3J0IFwiLi9zdGF0dXNTd2l0Y2hlci5zY3NzXCI7XG5pbXBvcnQgeyBoLCByZW5kZXIsIENvbXBvbmVudCB9IGZyb20gJ3ByZWFjdCc7XG5pbXBvcnQgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncHJlYWN0L2hvb2tzJztcbi8vIGltcG9ydCBDaGVja0ljb24gZnJvbSAnQG11aS9pY29ucy1tYXRlcmlhbC9DaGVjayc7XG4vLyBpbXBvcnQgRG9Ob3REaXN0dXJiSWNvbiBmcm9tICdAbXVpL2ljb25zLW1hdGVyaWFsL0RvTm90RGlzdHVyYic7XG5pbXBvcnQgbWVzc2FnZSBmcm9tIFwiLi8uLi8uLi9jb21wb25lbnRzL1RvYXN0L21lc3NhZ2VcIlxuaW1wb3J0IHVzZUFwaSBmcm9tIFwiLi8uLi8uLi9saWIvYXBpL3VzZUFwaVwiO1xuaW1wb3J0IGNoZWNrIGZyb20gXCIuLy4uLy4uL2ltYWdlcy9hZG1pbl9jaGVjay5zdmdcIjtcbmltcG9ydCB1bmNoZWNrIGZyb20gXCIuLy4uLy4uL2ltYWdlcy9hZG1pbl91bmNoZWNrLnN2Z1wiO1xuXG5cbmNvbnN0IFN0YXR1c1N3aXRjaGVyTGlzdCA9ICh7IHR5cGUsIGlkLCBsYWJlbCwgbGlzdFZhbHVlOiBsaXN0VmFsdWVEZWZhdWx0IH0pID0+IHtcblxuICAgIGNvbnN0IFt2YWx1ZSwgc2V0VmFsdWVdID0gdXNlU3RhdGUobGlzdFZhbHVlRGVmYXVsdCk7ICAgICBcbiAgICBjb25zdCBbZmV0Y2hdID0gdXNlQXBpKCk7XG4gICAgY29uc3Qgb25DbGljayA9ICgpID0+IHtcblxuXG4gICAgICAgIGNvbnNvbGUubG9nKCd0eXBlJywgdHlwZSk7XG5cbiAgICAgICAgaWYgKHR5cGUgPT09IFwiZG9jdG9yLWFjdGl2ZVwiKSB7XG4gICAgICAgICAgIFxuICAgICAgICAgICAgZmV0Y2goYC9hZG1pbi9hcGktZG9jdG9yLXRvZ2dsZS1hY3RpdmUvJHtpZH1gLCB7fSwgJ3Bvc3QnKVxuICAgICAgICAgICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLnN1Y2Nlc3MoKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3Jlc3BvbnNlJywgcmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvLyBzZXRUeXBlKCdmYWlsJyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGUgPT09IFwiZG9jdG9yLWhpZ2hsaWdodGVkXCIpIHtcbiAgICAgICAgICAgXG4gICAgICAgICAgICBmZXRjaChgL2FkbWluL2FwaS1kb2N0b3ItdG9nZ2xlLWhpZ2hsaWd0aGVkLyR7aWR9YCwge30sICdwb3N0JylcbiAgICAgICAgICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5zdWNjZXNzKCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdyZXNwb25zZScsIHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gc2V0VHlwZSgnZmFpbCcpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlID09PSBcImNhdGVnb3J5LWFjdGl2ZVwiKSB7XG4gICAgICAgICAgICBmZXRjaChgL2FkbWluL2FwaS1jYXRlZ29yeS10b2dnbGUtYWN0aXZlLyR7aWR9YCwge30sICdwb3N0JylcbiAgICAgICAgICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5zdWNjZXNzKCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdyZXNwb25zZScsIHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gc2V0VHlwZSgnZmFpbCcpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGUgPT09IFwibGFuZ3VlLWFjdGl2ZVwiKSB7XG5cbiAgICAgICAgICAgIGZldGNoKGAvYWRtaW4vYXBpLWxhbmd1ZS10b2dnbGUtYWN0aXZlLyR7aWR9YCwge30sICdwb3N0JylcbiAgICAgICAgICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5zdWNjZXNzKCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdyZXNwb25zZScsIHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gc2V0VHlwZSgnZmFpbCcpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cblxuICAgICAgICBpZiAodHlwZSA9PT0gXCJwcm9tby1hY3RpdmVcIikge1xuXG4gICAgICAgICAgICBmZXRjaChgL2FkbWluL2FwaS1wcm9tby1jb2RlLXRvZ2dsZS1hY3RpdmUvJHtpZH1gLCB7fSwgJ3Bvc3QnKVxuICAgICAgICAgICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLnN1Y2Nlc3MoKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3Jlc3BvbnNlJywgcmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvLyBzZXRUeXBlKCdmYWlsJyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuXG5cbiAgICAgICAgXG4gICAgICAgIC8vIGlmICh0eXBlID09PSBcInVzZXItZG9uYXRlZFwiKSB7XG4gICAgICAgIC8vICAgICBjb25zdCBbZmV0Y2hdID0gdXNlQXBpKCk7XG4gICAgICAgIC8vICAgICBmZXRjaChgL2FkbWluL2FwaS11c2VyLXRvZ2dsZS1kb25hdGVkLyR7aWR9YCwge30sICdwb3N0JylcbiAgICAgICAgLy8gICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgLy8gICAgICAgICAgICAgbWVzc2FnZS5zdWNjZXNzKCk7XG4gICAgICAgIC8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdyZXNwb25zZScsIHJlc3BvbnNlKTtcbiAgICAgICAgLy8gICAgICAgICB9KVxuICAgICAgICAvLyAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgLy8gICAgICAgICAgICAgLy8gc2V0VHlwZSgnZmFpbCcpO1xuICAgICAgICAvLyAgICAgICAgIH0pO1xuICAgICAgICAvLyB9XG4gICAgICAgIC8vIGlmICh0eXBlID09PSBcInJlY29yZGluZy1hY3RpdmVcIikge1xuICAgICAgICAvLyAgICAgY29uc3QgW2ZldGNoXSA9IHVzZUFwaSgpO1xuICAgICAgICAvLyAgICAgZmV0Y2goYC9hZG1pbi9hcGktcmVjb3JkaW5nLXRvZ2dsZS1hY3RpdmUvJHtpZH1gLCB7fSwgJ3Bvc3QnKVxuICAgICAgICAvLyAgICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAvLyAgICAgICAgICAgICBtZXNzYWdlLnN1Y2Nlc3MoKTtcbiAgICAgICAgLy8gICAgICAgICAgICAgY29uc29sZS5sb2coJ3Jlc3BvbnNlJywgcmVzcG9uc2UpO1xuICAgICAgICAvLyAgICAgICAgIH0pXG4gICAgICAgIC8vICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAvLyAgICAgICAgICAgICAvLyBzZXRUeXBlKCdmYWlsJyk7XG4gICAgICAgIC8vICAgICAgICAgfSk7XG4gICAgICAgIC8vIH1cbiAgICAgICAgLy8gaWYgKHR5cGUgPT09IFwicmVjb3JkaW5nLWFjdGl2ZS1hZHZpY2VcIikge1xuICAgICAgICAvLyAgICAgY29uc3QgW2ZldGNoXSA9IHVzZUFwaSgpO1xuICAgICAgICAvLyAgICAgZmV0Y2goYC9hZG1pbi9hcGktcmVjb3JkaW5nLWFkdmljZS10b2dnbGUtYWN0aXZlLyR7aWR9YCwge30sICdwb3N0JylcbiAgICAgICAgLy8gICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgLy8gICAgICAgICAgICAgbWVzc2FnZS5zdWNjZXNzKCk7XG4gICAgICAgIC8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdyZXNwb25zZScsIHJlc3BvbnNlKTtcbiAgICAgICAgLy8gICAgICAgICB9KVxuICAgICAgICAvLyAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgLy8gICAgICAgICAgICAgLy8gc2V0VHlwZSgnZmFpbCcpO1xuICAgICAgICAvLyAgICAgICAgIH0pO1xuICAgICAgICAvLyB9XG4gICAgICAgIC8vIGlmICh0eXBlID09PSBcImVkdWNhdGlvbi1hY3RpdmVcIikge1xuICAgICAgICAvLyAgICAgY29uc3QgW2ZldGNoXSA9IHVzZUFwaSgpO1xuICAgICAgICAvLyAgICAgZmV0Y2goYC9hZG1pbi9hcGktZWR1Y2F0aW9uLXRvZ2dsZS1hY3RpdmUvJHtpZH1gLCB7fSwgJ3Bvc3QnKVxuICAgICAgICAvLyAgICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAvLyAgICAgICAgICAgICBtZXNzYWdlLnN1Y2Nlc3MoKTtcbiAgICAgICAgLy8gICAgICAgICAgICAgY29uc29sZS5sb2coJ3Jlc3BvbnNlJywgcmVzcG9uc2UpO1xuICAgICAgICAvLyAgICAgICAgIH0pXG4gICAgICAgIC8vICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAvLyAgICAgICAgICAgICAvLyBzZXRUeXBlKCdmYWlsJyk7XG4gICAgICAgIC8vICAgICAgICAgfSk7XG4gICAgICAgIC8vIH1cbiAgICAgICAgLy8gaWYgKHR5cGUgPT09IFwiYmxvZy1hY3RpdmVcIikge1xuICAgICAgICAvLyAgICAgY29uc3QgW2ZldGNoXSA9IHVzZUFwaSgpO1xuICAgICAgICAvLyAgICAgZmV0Y2goYC9hZG1pbi9hcGktYmxvZy10b2dnbGUtYWN0aXZlLyR7aWR9YCwge30sICdwb3N0JylcbiAgICAgICAgLy8gICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgLy8gICAgICAgICAgICAgbWVzc2FnZS5zdWNjZXNzKCk7XG4gICAgICAgIC8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdyZXNwb25zZScsIHJlc3BvbnNlKTtcbiAgICAgICAgLy8gICAgICAgICB9KVxuICAgICAgICAvLyAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgLy8gICAgICAgICAgICAgLy8gc2V0VHlwZSgnZmFpbCcpO1xuICAgICAgICAvLyAgICAgICAgIH0pO1xuICAgICAgICAvLyB9XG4gICAgICAgIHNldFZhbHVlKCF2YWx1ZSk7XG4gICAgfVxuXG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdHVzLS1zd2l0Y2hlclwiPlxuICAgICAgICAgICAgey8qIHtsYWJlbCAmJiAoXG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogXCIxNHB4XCIgfX0+e2xhYmVsfTogPC9kaXY+XG4gICAgICAgICAgICApfSAqL31cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdGF0dXMtLWNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IG9uQ2xpY2s9e29uQ2xpY2t9IGNsYXNzPXtgaXRlbSAtYWNjZXB0ICR7dmFsdWUgPyBcIi1hY3RpdmVcIiA6IFwiXCJ9YH0+XG4gICAgICAgICAgICAgICAgICAgIDxpbWcgc3R5bGU9e3sgd2lkdGg6IDI0IH19IHNyYz17Y2hlY2t9IC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBvbkNsaWNrPXtvbkNsaWNrfSBjbGFzcz17YGl0ZW0gLXJlamVjdCAkeyF2YWx1ZSA/IFwiLWFjdGl2ZVwiIDogXCJcIn1gfT5cbiAgICAgICAgICAgICAgICAgICAgPGltZyBzdHlsZT17eyB3aWR0aDogMjQgfX0gc3JjPXt1bmNoZWNrfSAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IFN0YXR1c1N3aXRjaGVyTGlzdDsiLCJcbmltcG9ydCB7IGgsIHJlbmRlciB9IGZyb20gJ3ByZWFjdCc7XG5pbXBvcnQgU3RhdHVzU3dpdGNoZXJMaXN0IGZyb20gXCIuL1N0YXR1c1N3aXRjaGVyTGlzdFwiO1xuXG57LyogPFN0YXR1c1N3aXRjaGVyTGlzdCB0eXBlPVwidGlwXCIgaWQ9e3RpcHNbdGlwS2V5XS5pZH0gbGlzdFZhbHVlPXt0aXBzW3RpcEtleV0uaXNWaXNpYmxlfSAvPnt0aXBzW3RpcEtleV0uaXNWaXNpYmxlfSAqLyB9XG5cbmNvbnN0IGVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnN0YXR1c1N3aXRjaGVyQ29tcG9uZW50Jyk7XG5cbmVsZW1lbnRzLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgY29uc3QgdHlwZSA9IGVsZW1lbnQuZGF0YXNldC50eXBlO1xuICAgIGNvbnN0IGlkID0gZWxlbWVudC5kYXRhc2V0LmlkO1xuICAgIGNvbnN0IHZhbHVlID0gZWxlbWVudC5kYXRhc2V0LnZhbHVlO1xuICAgIGNvbnN0IGxhYmVsID0gZWxlbWVudC5kYXRhc2V0LmxhYmVsO1xuXG4gICAgcmVuZGVyKDxTdGF0dXNTd2l0Y2hlckxpc3QgbGFiZWw9e2xhYmVsfSB0eXBlPXt0eXBlfSBpZD17aWR9IGxpc3RWYWx1ZT17dmFsdWV9IC8+LCBlbGVtZW50KTtcbn0pOyIsImltcG9ydCB7IGgsIHJlbmRlciwgRnJhZ21lbnQgfSBmcm9tICdwcmVhY3QnO1xuaW1wb3J0IHsgVG9hc3RDb250YWluZXIsIHRvYXN0IH0gZnJvbSAncmVhY3QtdG9hc3RpZnknO1xuaW1wb3J0ICdyZWFjdC10b2FzdGlmeS9kaXN0L1JlYWN0VG9hc3RpZnkuY3NzJztcblxuY29uc3QgVG9hc3QgPSAoKSA9PiAoXG4gICAgPFRvYXN0Q29udGFpbmVyIC8+XG4pO1xuXG5leHBvcnQgZGVmYXVsdCBUb2FzdDsiLCJcbmltcG9ydCB7IGgsIHJlbmRlciB9IGZyb20gJ3ByZWFjdCc7XG5pbXBvcnQgVG9hc3QgZnJvbSBcIi4vVG9hc3RcIjtcblxuXG5yZW5kZXIoPFRvYXN0IC8+LCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG9hc3RDb21wb25lbnQnKSk7IiwiaW1wb3J0IHsgdG9hc3QgfSBmcm9tICdyZWFjdC10b2FzdGlmeSc7XG5cblxuY29uc3QgbWVzc2FnZSA9IHtcbiAgICBzdWNjZXNzOiAodGV4dCA9IG51bGwpID0+IHtcbiAgICAgICAgdG9hc3Quc3VjY2Vzcyh0ZXh0ID8gdGV4dCA6IFwiWmFwaXNhbm8gcG9tecWbbG5pZSFcIiwgeyBoaWRlUHJvZ3Jlc3NCYXI6IHRydWUsIGF1dG9DbG9zZTogMzAwMCAscG9zaXRpb246IHRvYXN0LlBPU0lUSU9OLkJPVFRPTV9MRUZUIH0pO1xuICAgIH0sXG4gICAgZXJyb3I6ICh0ZXh0ID0gbnVsbCkgPT4ge1xuICAgICAgICB0b2FzdC5lcnJvcih0ZXh0ID8gdGV4dCA6IFwiQ2/FmyBwb3N6xYJvIG5pZSB0YWshXCIsIHsgYXV0b0Nsb3NlOiAzMDAwLCBoaWRlUHJvZ3Jlc3NCYXI6IHRydWUscG9zaXRpb246IHRvYXN0LlBPU0lUSU9OLkJPVFRPTV9MRUZUIH0pO1xuICAgIH0sXG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgbWVzc2FnZTsiLCJjb25zdCBwcmVwYXJlRGF0YSA9IChkYXRhKSA9PiB7XG4gICAgbGV0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKClcbiAgICBPYmplY3Qua2V5cyhkYXRhKS5tYXAoa2V5ID0+IHtcbiAgICAgICAgZm9ybURhdGEuYXBwZW5kKGtleSwgZGF0YVtrZXldKTtcbiAgICB9KVxuICAgIHJldHVybiBmb3JtRGF0YTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgcHJlcGFyZURhdGE7IiwiaW1wb3J0IHByZXBhcmVEYXRhIGZyb20gXCIuL3ByZXBhcmVEYXRhXCI7XG5cbmNvbnN0IHVzZUFwaSA9ICgpID0+IHtcbiAgICBjb25zdCBmZXRjaCA9IGFzeW5jIChcbiAgICAgICAgZW5kcG9pbnQsXG4gICAgICAgIHBheWxvYWQsXG4gICAgICAgIG1ldGhvZCxcbiAgICApID0+IHtcbiAgICAgICAgaWYgKHR5cGVvZiB3aW5kb3cuYXhpb3MgPT09ICd1bmRlZmluZWQnKSB7XG5cbiAgICAgICAgICAgIHdpbmRvdy5heGlvcyA9IGF3YWl0IHJlcXVpcmUoJ2F4aW9zJykuZGVmYXVsdDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgd2luZG93LmF4aW9zKHtcbiAgICAgICAgICAgIHVybDogZW5kcG9pbnQsXG4gICAgICAgICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgICAgICAgIGRhdGE6IHByZXBhcmVEYXRhKHBheWxvYWQpLFxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoIXJlc3BvbnNlLmRhdGEgfHwgIXJlc3BvbnNlLmRhdGEuc3RhdHVzIHx8IHJlc3BvbnNlLmRhdGEuc3RhdHVzICE9PSAnT0snKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCgke3Jlc3BvbnNlLmRhdGEuY29kZX0pICR7cmVzcG9uc2UuZGF0YS5tZXNzYWdlfWApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7XG4gICAgfTtcblxuICAgIHJldHVybiBbZmV0Y2hdO1xufTtcblxuY29uc3QgdXNlQXBpU3RhdGljID0gYXN5bmMgKGVuZHBvaW50LCBwYXlsb2FkLCBtZXRob2QpID0+IHtcblxuICAgIGlmICh0eXBlb2Ygd2luZG93LmF4aW9zID09PSAndW5kZWZpbmVkJykge1xuXG4gICAgICAgIHdpbmRvdy5heGlvcyA9IGF3YWl0IHJlcXVpcmUoJ2F4aW9zJykuZGVmYXVsdDtcbiAgICB9XG5cbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHdpbmRvdy5heGlvcyh7XG4gICAgICAgIHVybDogZW5kcG9pbnQsXG4gICAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgICBkYXRhOiBwcmVwYXJlRGF0YShwYXlsb2FkKSxcbiAgICB9KTtcbiAgICAvLyBpZiAoIXJlc3BvbnNlLmRhdGEgfHwgIXJlc3BvbnNlLmRhdGEuc3RhdHVzIHx8IHJlc3BvbnNlLmRhdGEuc3RhdHVzICE9PSAnT0snKSB7XG4gICAgLy8gICAgIHRocm93IG5ldyBFcnJvcihgKCR7cmVzcG9uc2UuZGF0YS5jb2RlfSkgJHtyZXNwb25zZS5kYXRhLm1lc3NhZ2V9YCk7XG4gICAgLy8gfVxuICAgIHJldHVybiByZXNwb25zZS5kYXRhO1xufVxuXG5leHBvcnQgZGVmYXVsdCB1c2VBcGk7XG5leHBvcnQgeyB1c2VBcGlTdGF0aWMgfTtcbiIsImltcG9ydCB7IGgsIHJlbmRlciB9IGZyb20gJ3ByZWFjdCc7XG5pbXBvcnQgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncHJlYWN0L2hvb2tzJztcbi8vIGltcG9ydCBsb2dvIGZyb20gXCIuLy4uLy4uL2ltYWdlcy9sb2dvLnN2Z1wiO1xuaW1wb3J0IGNsb3NlSWNvbiBmcm9tIFwiLi8uLi8uLi9pbWFnZXMvYWRtaW5fY2xvc2Uuc3ZnXCI7XG5cbmNvbnN0IE5hdmlnYXRpb24gPSAoKSA9PiB7XG4gICAgY29uc3QgW3BhZ2UsIHNldFBhZ2VdID0gdXNlU3RhdGUoXCJcIik7XG4gICAgY29uc3QgW3N1YnBhZ2UsIHNldFN1YnBhZ2VdID0gdXNlU3RhdGUoXCJcIik7XG4gICAgY29uc3QgW3BhcmFtcywgc2V0UGFyYW1zXSA9IHVzZVN0YXRlKHsgcGFnZTogXCJcIiwgc3VicGFnZTogXCJcIiB9KTtcbiAgICBjb25zdCBib2R5Q2xhc3NsaXN0ID0gZG9jdW1lbnQuYm9keS5jbGFzc0xpc3Q7XG5cbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBjb25zdCBib2R5Q2xhc3NsaXN0VmFsdWUgPSBib2R5Q2xhc3NsaXN0LnZhbHVlO1xuICAgICAgICBpZiAoYm9keUNsYXNzbGlzdFZhbHVlKSB7XG4gICAgICAgICAgICBjb25zdCBwYXJhbXMgPSBib2R5Q2xhc3NsaXN0VmFsdWUuc3BsaXQoJy0nKTtcbiAgICAgICAgICAgIHNldFBhZ2UocGFyYW1zWzBdKTtcbiAgICAgICAgICAgIHNldFN1YnBhZ2UocGFyYW1zWzFdKTtcbiAgICAgICAgfVxuICAgIH0sIFtdKVxuICAgIGNvbnN0IG9uQ2xpY2tDbG9zZSA9ICgpID0+IHtcbiAgICAgICAgYm9keUNsYXNzbGlzdC5yZW1vdmUoJy1uYXZpZ2F0aW9uLW9wZW5lZCcpO1xuICAgIH1cbiAgICBjb25zb2xlLmxvZyhcInBhZ2VcIiwgcGFnZSk7XG5cblxuICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY2xhc3M9XCJuYXZpZ2F0aW9uLS1jb21wb25lbnRcIj5cbiAgICAgICAgICAgIDxhIGhyZWY9XCIvXCIgY2xhc3M9XCJuYXZpZ2F0aW9uLS1oZWFkZXJcIj5cbiAgICAgICAgICAgICAgICB7LyogPGRpdiBjbGFzcz1cImxvZ29cIj48aW1nIHNyYz17bG9nb30gLz48L2Rpdj4gKi99XG4gICAgICAgICAgICAgICAgPGRpdiBvbkNsaWNrPXsoKSA9PiBvbkNsaWNrQ2xvc2UoKX0gY2xhc3M9XCJjbG9zZVwiPlxuICAgICAgICAgICAgICAgICAgICA8aW1nIGNsYXNzPVwiaWNvblwiIHNyYz17Y2xvc2VJY29ufSAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm5hdmlnYXRpb24tLWxpc3RcIj5cblxuICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIvYWRtaW4vd2l6eXR5XCIgY2xhc3M9e2BpdGVtIC1zaW5nbGUgJHtwYWdlID09ICdyZWNvcmRpbmcnID8gJy1hY3RpdmUnIDogJyd9YH0+XG4gICAgICAgICAgICAgICAgICAgIFdpenl0eVxuICAgICAgICAgICAgICAgICAgICB7LyogPEV4cGFuZE1vcmVJY29uIGNsYXNzTmFtZT1cImRyb3BpY29uXCIgLz4gKi99XG4gICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgIHsvKiA8YSBocmVmPVwiL2FkbWluL3BsYXRub3NjaVwiIGNsYXNzPXtgaXRlbSAtc2luZ2xlICR7cGFnZSA9PSAncGF5bWVudCcgPyAnLWFjdGl2ZScgOiAnJ31gfT5cbiAgICAgICAgICAgICAgICAgICAgUMWCYXRub8WbY2lcbiAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgPC9hPiAqL31cblxuICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIvYWRtaW4vamV6eWtpXCIgY2xhc3M9e2BpdGVtIC1zaW5nbGUgJHtwYWdlID09ICdsYW5ndWUnID8gJy1hY3RpdmUnIDogJyd9YH0+XG4gICAgICAgICAgICAgICAgICAgIErEmXp5a2lcbiAgICAgICAgICAgICAgICAgICAgey8qIDxFeHBhbmRNb3JlSWNvbiBjbGFzc05hbWU9XCJkcm9waWNvblwiIC8+ICovfVxuICAgICAgICAgICAgICAgIDwvYT5cblxuICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIvYWRtaW4vc3BlY2phbGlzY2lcIiBjbGFzcz17YGl0ZW0gLXNpbmdsZSAke3BhZ2UgPT0gJ2RvY3RvcicgPyAnLWFjdGl2ZScgOiAnJ31gfT5cbiAgICAgICAgICAgICAgICAgICAgU3BlY2phbGnFm2NpXG4gICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIvYWRtaW4vcGFjamVuY2lcIiBjbGFzcz17YGl0ZW0gLXNpbmdsZSAke3BhZ2UgPT0gJ3BhdGllbnQnID8gJy1hY3RpdmUnIDogJyd9YH0+XG4gICAgICAgICAgICAgICAgICAgIFBhY2plbmNpXG4gICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIvYWRtaW4vY2VubmlrXCIgY2xhc3M9e2BpdGVtIC1zaW5nbGUgJHtwYWdlID09ICdwcmljaW5nJyA/ICctYWN0aXZlJyA6ICcnfWB9PlxuICAgICAgICAgICAgICAgICAgICBDZW5uaWtcbiAgICAgICAgICAgICAgICA8L2E+XG5cbiAgICAgICAgICAgICAgICB7LyogPGEgaHJlZj1cIi9hZG1pbi9rYXRlZ29yaWVcIiBjbGFzcz17YGl0ZW0gLXNpbmdsZSAke3BhZ2UgPT0gJ2thdGVnb3JpZScgPyAnLWFjdGl2ZScgOiAnJ31gfT5cbiAgICAgICAgICAgICAgICAgICAgS2F0ZWdvcmllXG4gICAgICAgICAgICAgICAgPC9hPiAqL31cbiAgICAgICAgICAgICAgICA8YSBocmVmPVwiL2FkbWluL2tvZHktcHJvbW9jeWpuZVwiIGNsYXNzPXtgaXRlbSAtc2luZ2xlICR7cGFnZSA9PSAncHJvbW8nID8gJy1hY3RpdmUnIDogJyd9YH0+XG4gICAgICAgICAgICAgICAgICAgIEtvZHkgcHJvbW9jeWpuZVxuICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICA8YSBocmVmPVwiL2FkbWluL25ld3NsZXR0ZXJcIiBjbGFzcz17YGl0ZW0gLXNpbmdsZSAke3BhZ2UgPT0gJ25ld3NsZXR0ZXInID8gJy1hY3RpdmUnIDogJyd9YH0+XG4gICAgICAgICAgICAgICAgICAgIE5ld3NsZXR0ZXJcbiAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgPGEgaHJlZj1cIi9hZG1pbi9mYXFcIiBjbGFzcz17YGl0ZW0gLXNpbmdsZSAke3BhZ2UgPT0gJ2ZhcScgPyAnLWFjdGl2ZScgOiAnJ31gfT5cbiAgICAgICAgICAgICAgICAgICAgRmFxXG4gICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17e2hlaWdodDoyMCx3aWR0aDpcIjEwMCVcIn19PjwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGEgaHJlZj1cIi9hZG1pbi9zdHJvbmEtZ2xvd25hXCIgY2xhc3M9e2BpdGVtIC1zaW5nbGUgJHtwYWdlID09ICdob21lcGFnZScgPyAnLWFjdGl2ZScgOiAnJ31gfT5cbiAgICAgICAgICAgICAgICAgICAgU3Ryb25hIGfFgsOzd25hXG4gICAgICAgICAgICAgICAgPC9hPlxuXG4gICAgICAgICAgICAgICAgPGEgaHJlZj1cIi9hZG1pbi9wcmFjdWotdS1uYXNcIiBjbGFzcz17YGl0ZW0gLXNpbmdsZSAke3BhZ2UgPT0gJ3ByYWN1aicgPyAnLWFjdGl2ZScgOiAnJ31gfT5cbiAgICAgICAgICAgICAgICAgICAgUHJhY3VqIHUgbmFzXG4gICAgICAgICAgICAgICAgPC9hPlxuXG4gICAgICAgICAgICAgICAgPGEgaHJlZj1cIi9hZG1pbi9kbGEtZmlybVwiIGNsYXNzPXtgaXRlbSAtc2luZ2xlICR7cGFnZSA9PSAnZm9yJyA/ICctYWN0aXZlJyA6ICcnfWB9PlxuICAgICAgICAgICAgICAgICAgICBEbGEgZmlybVxuICAgICAgICAgICAgICAgIDwvYT5cblxuICAgICAgICAgICAgICAgIHsvKiA8YSBocmVmPVwiL2FkbWluL2ZpbG15LWVkdWthY3lqbmVcIiBjbGFzcz17YGl0ZW0gLXNpbmdsZSAke3BhZ2UgPT0gJ2VkdWNhdGlvbicgPyAnLWFjdGl2ZScgOiAnJ31gfT5cbiAgICAgICAgICAgICAgICAgICAgQ21zXG4gICAgICAgICAgICAgICAgPC9hPiAqL31cblxuXG4gICAgICAgICAgICAgICAgey8qIDxkaXYgY2xhc3M9e2BuYXZpZ2F0aW9uLS1saXN0LS1kcm9wZG93biAke3BhZ2UgPT0gJ3VzZXJzJyA/ICctb3BlbicgOiAnJ31gfT5cbiAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cIi9hZG1pbi91enl0a293bmljeS1saXN0YVwiIGNsYXNzPXtgaXRlbSBzdWJpdGVtICR7c3VicGFnZSA9PSAnbGlzdCcgJiYgcGFnZSA9PSAnYXJ0aWNsZScgPyAnLWFjdGl2ZScgOiAnJ31gfT5MaXN0YTwvYT5cbiAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cIi9hZG1pbi91enl0a293bmljeS1ub3d5XCIgY2xhc3M9e2BpdGVtIHN1Yml0ZW0gJHtzdWJwYWdlID09ICduZXcnICYmIHBhZ2UgPT0gJ2FydGljbGUnID8gJy1hY3RpdmUnIDogJyd9YH0+RG9kYWogbm93eTwvYT5cbiAgICAgICAgICAgICAgICA8L2Rpdj4gKi99XG5cbiAgICAgICAgICAgICAgICB7LyogPGRpdiBvbkNsaWNrPXsoKSA9PiBzZXRQYWdlKHBhZ2UgPT0gJ3BhZ2UnID8gJycgOiAncGFnZScpfSBjbGFzcz17YGl0ZW0gJHtwYWdlID09ICdwYWdlJyA/ICctYWN0aXZlJyA6ICcnfWB9PlxuICAgICAgICAgICAgICAgICAgICBTdHJvbnlcbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPXtgbmF2aWdhdGlvbi0tbGlzdC0tZHJvcGRvd24gJHtwYWdlID09ICdwYWdlJyA/ICctb3BlbicgOiAnJ31gfT5cbiAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cIi9hZG1pbi9zdHJvbmEtZ2xvd25hXCIgY2xhc3M9e2BpdGVtIHN1Yml0ZW0gJHtwYWdlID09ICdwYWdlJyAmJiBzdWJwYWdlID09ICdob21lJyA/ICctYWN0aXZlJyA6ICcnfWB9PlN0cm9uYSBnxYLDs3duYTwvYT5cbiAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cIi9hZG1pbi9yZWd1bGFtaW5cIiBjbGFzcz17YGl0ZW0gc3ViaXRlbSAke3BhZ2UgPT0gJ3BhZ2UnICYmIHN1YnBhZ2UgPT0gJ3JlZ3VsYW1pbicgPyAnLWFjdGl2ZScgOiAnJ31gfT5SZWd1bGFtaW48L2E+XG4gICAgICAgICAgICAgICAgPC9kaXY+ICovfVxuXG5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICApXG59XG5leHBvcnQgZGVmYXVsdCBOYXZpZ2F0aW9uO1xuIiwiXG5pbXBvcnQgeyBoLCByZW5kZXIgfSBmcm9tICdwcmVhY3QnO1xuaW1wb3J0IE5hdmlnYXRpb24gZnJvbSBcIi4vTmF2aWdhdGlvblwiO1xuY29uc29sZS5sb2coXCJjb21wb25lbnRzXCIsZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5hdmlnYXRpb25Db21wb25lbnQnKSk7XG5yZW5kZXIoPE5hdmlnYXRpb24gLz4sIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYXZpZ2F0aW9uQ29tcG9uZW50JykpOyIsImZ1bmN0aW9uIHIoZSl7dmFyIHQsZixuPVwiXCI7aWYoXCJzdHJpbmdcIj09dHlwZW9mIGV8fFwibnVtYmVyXCI9PXR5cGVvZiBlKW4rPWU7ZWxzZSBpZihcIm9iamVjdFwiPT10eXBlb2YgZSlpZihBcnJheS5pc0FycmF5KGUpKWZvcih0PTA7dDxlLmxlbmd0aDt0KyspZVt0XSYmKGY9cihlW3RdKSkmJihuJiYobis9XCIgXCIpLG4rPWYpO2Vsc2UgZm9yKHQgaW4gZSllW3RdJiYobiYmKG4rPVwiIFwiKSxuKz10KTtyZXR1cm4gbn1leHBvcnQgZnVuY3Rpb24gY2xzeCgpe2Zvcih2YXIgZSx0LGY9MCxuPVwiXCI7Zjxhcmd1bWVudHMubGVuZ3RoOykoZT1hcmd1bWVudHNbZisrXSkmJih0PXIoZSkpJiYobiYmKG4rPVwiIFwiKSxuKz10KTtyZXR1cm4gbn1leHBvcnQgZGVmYXVsdCBjbHN4OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmICh0eXBlb2YgaXQgIT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IFR5cGVFcnJvcihTdHJpbmcoaXQpICsgJyBpcyBub3QgYSBmdW5jdGlvbicpO1xuICB9IHJldHVybiBpdDtcbn07XG4iLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmICghaXNPYmplY3QoaXQpICYmIGl0ICE9PSBudWxsKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3Qgc2V0IFwiICsgU3RyaW5nKGl0KSArICcgYXMgYSBwcm90b3R5cGUnKTtcbiAgfSByZXR1cm4gaXQ7XG59O1xuIiwidmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xudmFyIGNyZWF0ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtY3JlYXRlJyk7XG52YXIgZGVmaW5lUHJvcGVydHlNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eScpO1xuXG52YXIgVU5TQ09QQUJMRVMgPSB3ZWxsS25vd25TeW1ib2woJ3Vuc2NvcGFibGVzJyk7XG52YXIgQXJyYXlQcm90b3R5cGUgPSBBcnJheS5wcm90b3R5cGU7XG5cbi8vIEFycmF5LnByb3RvdHlwZVtAQHVuc2NvcGFibGVzXVxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUtQEB1bnNjb3BhYmxlc1xuaWYgKEFycmF5UHJvdG90eXBlW1VOU0NPUEFCTEVTXSA9PSB1bmRlZmluZWQpIHtcbiAgZGVmaW5lUHJvcGVydHlNb2R1bGUuZihBcnJheVByb3RvdHlwZSwgVU5TQ09QQUJMRVMsIHtcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgdmFsdWU6IGNyZWF0ZShudWxsKVxuICB9KTtcbn1cblxuLy8gYWRkIGEga2V5IHRvIEFycmF5LnByb3RvdHlwZVtAQHVuc2NvcGFibGVzXVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIEFycmF5UHJvdG90eXBlW1VOU0NPUEFCTEVTXVtrZXldID0gdHJ1ZTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgY2hhckF0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3N0cmluZy1tdWx0aWJ5dGUnKS5jaGFyQXQ7XG5cbi8vIGBBZHZhbmNlU3RyaW5nSW5kZXhgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hZHZhbmNlc3RyaW5naW5kZXhcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKFMsIGluZGV4LCB1bmljb2RlKSB7XG4gIHJldHVybiBpbmRleCArICh1bmljb2RlID8gY2hhckF0KFMsIGluZGV4KS5sZW5ndGggOiAxKTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCwgQ29uc3RydWN0b3IsIG5hbWUpIHtcbiAgaWYgKCEoaXQgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ0luY29ycmVjdCAnICsgKG5hbWUgPyBuYW1lICsgJyAnIDogJycpICsgJ2ludm9jYXRpb24nKTtcbiAgfSByZXR1cm4gaXQ7XG59O1xuIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAoIWlzT2JqZWN0KGl0KSkge1xuICAgIHRocm93IFR5cGVFcnJvcihTdHJpbmcoaXQpICsgJyBpcyBub3QgYW4gb2JqZWN0Jyk7XG4gIH0gcmV0dXJuIGl0O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkZm9yRWFjaCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1pdGVyYXRpb24nKS5mb3JFYWNoO1xudmFyIGFycmF5TWV0aG9kSXNTdHJpY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktbWV0aG9kLWlzLXN0cmljdCcpO1xuXG52YXIgU1RSSUNUX01FVEhPRCA9IGFycmF5TWV0aG9kSXNTdHJpY3QoJ2ZvckVhY2gnKTtcblxuLy8gYEFycmF5LnByb3RvdHlwZS5mb3JFYWNoYCBtZXRob2QgaW1wbGVtZW50YXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmZvcmVhY2hcbm1vZHVsZS5leHBvcnRzID0gIVNUUklDVF9NRVRIT0QgPyBmdW5jdGlvbiBmb3JFYWNoKGNhbGxiYWNrZm4gLyogLCB0aGlzQXJnICovKSB7XG4gIHJldHVybiAkZm9yRWFjaCh0aGlzLCBjYWxsYmFja2ZuLCBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCk7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tYXJyYXktcHJvdG90eXBlLWZvcmVhY2ggLS0gc2FmZVxufSA6IFtdLmZvckVhY2g7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgYmluZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi1iaW5kLWNvbnRleHQnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1vYmplY3QnKTtcbnZhciBjYWxsV2l0aFNhZmVJdGVyYXRpb25DbG9zaW5nID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NhbGwtd2l0aC1zYWZlLWl0ZXJhdGlvbi1jbG9zaW5nJyk7XG52YXIgaXNBcnJheUl0ZXJhdG9yTWV0aG9kID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWFycmF5LWl0ZXJhdG9yLW1ldGhvZCcpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWxlbmd0aCcpO1xudmFyIGNyZWF0ZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1wcm9wZXJ0eScpO1xudmFyIGdldEl0ZXJhdG9yTWV0aG9kID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dldC1pdGVyYXRvci1tZXRob2QnKTtcblxuLy8gYEFycmF5LmZyb21gIG1ldGhvZCBpbXBsZW1lbnRhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5mcm9tXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGZyb20oYXJyYXlMaWtlIC8qICwgbWFwZm4gPSB1bmRlZmluZWQsIHRoaXNBcmcgPSB1bmRlZmluZWQgKi8pIHtcbiAgdmFyIE8gPSB0b09iamVjdChhcnJheUxpa2UpO1xuICB2YXIgQyA9IHR5cGVvZiB0aGlzID09ICdmdW5jdGlvbicgPyB0aGlzIDogQXJyYXk7XG4gIHZhciBhcmd1bWVudHNMZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoO1xuICB2YXIgbWFwZm4gPSBhcmd1bWVudHNMZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkO1xuICB2YXIgbWFwcGluZyA9IG1hcGZuICE9PSB1bmRlZmluZWQ7XG4gIHZhciBpdGVyYXRvck1ldGhvZCA9IGdldEl0ZXJhdG9yTWV0aG9kKE8pO1xuICB2YXIgaW5kZXggPSAwO1xuICB2YXIgbGVuZ3RoLCByZXN1bHQsIHN0ZXAsIGl0ZXJhdG9yLCBuZXh0LCB2YWx1ZTtcbiAgaWYgKG1hcHBpbmcpIG1hcGZuID0gYmluZChtYXBmbiwgYXJndW1lbnRzTGVuZ3RoID4gMiA/IGFyZ3VtZW50c1syXSA6IHVuZGVmaW5lZCwgMik7XG4gIC8vIGlmIHRoZSB0YXJnZXQgaXMgbm90IGl0ZXJhYmxlIG9yIGl0J3MgYW4gYXJyYXkgd2l0aCB0aGUgZGVmYXVsdCBpdGVyYXRvciAtIHVzZSBhIHNpbXBsZSBjYXNlXG4gIGlmIChpdGVyYXRvck1ldGhvZCAhPSB1bmRlZmluZWQgJiYgIShDID09IEFycmF5ICYmIGlzQXJyYXlJdGVyYXRvck1ldGhvZChpdGVyYXRvck1ldGhvZCkpKSB7XG4gICAgaXRlcmF0b3IgPSBpdGVyYXRvck1ldGhvZC5jYWxsKE8pO1xuICAgIG5leHQgPSBpdGVyYXRvci5uZXh0O1xuICAgIHJlc3VsdCA9IG5ldyBDKCk7XG4gICAgZm9yICg7IShzdGVwID0gbmV4dC5jYWxsKGl0ZXJhdG9yKSkuZG9uZTsgaW5kZXgrKykge1xuICAgICAgdmFsdWUgPSBtYXBwaW5nID8gY2FsbFdpdGhTYWZlSXRlcmF0aW9uQ2xvc2luZyhpdGVyYXRvciwgbWFwZm4sIFtzdGVwLnZhbHVlLCBpbmRleF0sIHRydWUpIDogc3RlcC52YWx1ZTtcbiAgICAgIGNyZWF0ZVByb3BlcnR5KHJlc3VsdCwgaW5kZXgsIHZhbHVlKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgbGVuZ3RoID0gdG9MZW5ndGgoTy5sZW5ndGgpO1xuICAgIHJlc3VsdCA9IG5ldyBDKGxlbmd0aCk7XG4gICAgZm9yICg7bGVuZ3RoID4gaW5kZXg7IGluZGV4KyspIHtcbiAgICAgIHZhbHVlID0gbWFwcGluZyA/IG1hcGZuKE9baW5kZXhdLCBpbmRleCkgOiBPW2luZGV4XTtcbiAgICAgIGNyZWF0ZVByb3BlcnR5KHJlc3VsdCwgaW5kZXgsIHZhbHVlKTtcbiAgICB9XG4gIH1cbiAgcmVzdWx0Lmxlbmd0aCA9IGluZGV4O1xuICByZXR1cm4gcmVzdWx0O1xufTtcbiIsInZhciB0b0luZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW5kZXhlZC1vYmplY3QnKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1sZW5ndGgnKTtcbnZhciB0b0Fic29sdXRlSW5kZXggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tYWJzb2x1dGUtaW5kZXgnKTtcblxuLy8gYEFycmF5LnByb3RvdHlwZS57IGluZGV4T2YsIGluY2x1ZGVzIH1gIG1ldGhvZHMgaW1wbGVtZW50YXRpb25cbnZhciBjcmVhdGVNZXRob2QgPSBmdW5jdGlvbiAoSVNfSU5DTFVERVMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgkdGhpcywgZWwsIGZyb21JbmRleCkge1xuICAgIHZhciBPID0gdG9JbmRleGVkT2JqZWN0KCR0aGlzKTtcbiAgICB2YXIgbGVuZ3RoID0gdG9MZW5ndGgoTy5sZW5ndGgpO1xuICAgIHZhciBpbmRleCA9IHRvQWJzb2x1dGVJbmRleChmcm9tSW5kZXgsIGxlbmd0aCk7XG4gICAgdmFyIHZhbHVlO1xuICAgIC8vIEFycmF5I2luY2x1ZGVzIHVzZXMgU2FtZVZhbHVlWmVybyBlcXVhbGl0eSBhbGdvcml0aG1cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VsZi1jb21wYXJlIC0tIE5hTiBjaGVja1xuICAgIGlmIChJU19JTkNMVURFUyAmJiBlbCAhPSBlbCkgd2hpbGUgKGxlbmd0aCA+IGluZGV4KSB7XG4gICAgICB2YWx1ZSA9IE9baW5kZXgrK107XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VsZi1jb21wYXJlIC0tIE5hTiBjaGVja1xuICAgICAgaWYgKHZhbHVlICE9IHZhbHVlKSByZXR1cm4gdHJ1ZTtcbiAgICAvLyBBcnJheSNpbmRleE9mIGlnbm9yZXMgaG9sZXMsIEFycmF5I2luY2x1ZGVzIC0gbm90XG4gICAgfSBlbHNlIGZvciAoO2xlbmd0aCA+IGluZGV4OyBpbmRleCsrKSB7XG4gICAgICBpZiAoKElTX0lOQ0xVREVTIHx8IGluZGV4IGluIE8pICYmIE9baW5kZXhdID09PSBlbCkgcmV0dXJuIElTX0lOQ0xVREVTIHx8IGluZGV4IHx8IDA7XG4gICAgfSByZXR1cm4gIUlTX0lOQ0xVREVTICYmIC0xO1xuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIC8vIGBBcnJheS5wcm90b3R5cGUuaW5jbHVkZXNgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5pbmNsdWRlc1xuICBpbmNsdWRlczogY3JlYXRlTWV0aG9kKHRydWUpLFxuICAvLyBgQXJyYXkucHJvdG90eXBlLmluZGV4T2ZgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5pbmRleG9mXG4gIGluZGV4T2Y6IGNyZWF0ZU1ldGhvZChmYWxzZSlcbn07XG4iLCJ2YXIgYmluZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi1iaW5kLWNvbnRleHQnKTtcbnZhciBJbmRleGVkT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2luZGV4ZWQtb2JqZWN0Jyk7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tb2JqZWN0Jyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tbGVuZ3RoJyk7XG52YXIgYXJyYXlTcGVjaWVzQ3JlYXRlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LXNwZWNpZXMtY3JlYXRlJyk7XG5cbnZhciBwdXNoID0gW10ucHVzaDtcblxuLy8gYEFycmF5LnByb3RvdHlwZS57IGZvckVhY2gsIG1hcCwgZmlsdGVyLCBzb21lLCBldmVyeSwgZmluZCwgZmluZEluZGV4LCBmaWx0ZXJPdXQgfWAgbWV0aG9kcyBpbXBsZW1lbnRhdGlvblxudmFyIGNyZWF0ZU1ldGhvZCA9IGZ1bmN0aW9uIChUWVBFKSB7XG4gIHZhciBJU19NQVAgPSBUWVBFID09IDE7XG4gIHZhciBJU19GSUxURVIgPSBUWVBFID09IDI7XG4gIHZhciBJU19TT01FID0gVFlQRSA9PSAzO1xuICB2YXIgSVNfRVZFUlkgPSBUWVBFID09IDQ7XG4gIHZhciBJU19GSU5EX0lOREVYID0gVFlQRSA9PSA2O1xuICB2YXIgSVNfRklMVEVSX09VVCA9IFRZUEUgPT0gNztcbiAgdmFyIE5PX0hPTEVTID0gVFlQRSA9PSA1IHx8IElTX0ZJTkRfSU5ERVg7XG4gIHJldHVybiBmdW5jdGlvbiAoJHRoaXMsIGNhbGxiYWNrZm4sIHRoYXQsIHNwZWNpZmljQ3JlYXRlKSB7XG4gICAgdmFyIE8gPSB0b09iamVjdCgkdGhpcyk7XG4gICAgdmFyIHNlbGYgPSBJbmRleGVkT2JqZWN0KE8pO1xuICAgIHZhciBib3VuZEZ1bmN0aW9uID0gYmluZChjYWxsYmFja2ZuLCB0aGF0LCAzKTtcbiAgICB2YXIgbGVuZ3RoID0gdG9MZW5ndGgoc2VsZi5sZW5ndGgpO1xuICAgIHZhciBpbmRleCA9IDA7XG4gICAgdmFyIGNyZWF0ZSA9IHNwZWNpZmljQ3JlYXRlIHx8IGFycmF5U3BlY2llc0NyZWF0ZTtcbiAgICB2YXIgdGFyZ2V0ID0gSVNfTUFQID8gY3JlYXRlKCR0aGlzLCBsZW5ndGgpIDogSVNfRklMVEVSIHx8IElTX0ZJTFRFUl9PVVQgPyBjcmVhdGUoJHRoaXMsIDApIDogdW5kZWZpbmVkO1xuICAgIHZhciB2YWx1ZSwgcmVzdWx0O1xuICAgIGZvciAoO2xlbmd0aCA+IGluZGV4OyBpbmRleCsrKSBpZiAoTk9fSE9MRVMgfHwgaW5kZXggaW4gc2VsZikge1xuICAgICAgdmFsdWUgPSBzZWxmW2luZGV4XTtcbiAgICAgIHJlc3VsdCA9IGJvdW5kRnVuY3Rpb24odmFsdWUsIGluZGV4LCBPKTtcbiAgICAgIGlmIChUWVBFKSB7XG4gICAgICAgIGlmIChJU19NQVApIHRhcmdldFtpbmRleF0gPSByZXN1bHQ7IC8vIG1hcFxuICAgICAgICBlbHNlIGlmIChyZXN1bHQpIHN3aXRjaCAoVFlQRSkge1xuICAgICAgICAgIGNhc2UgMzogcmV0dXJuIHRydWU7ICAgICAgICAgICAgICAvLyBzb21lXG4gICAgICAgICAgY2FzZSA1OiByZXR1cm4gdmFsdWU7ICAgICAgICAgICAgIC8vIGZpbmRcbiAgICAgICAgICBjYXNlIDY6IHJldHVybiBpbmRleDsgICAgICAgICAgICAgLy8gZmluZEluZGV4XG4gICAgICAgICAgY2FzZSAyOiBwdXNoLmNhbGwodGFyZ2V0LCB2YWx1ZSk7IC8vIGZpbHRlclxuICAgICAgICB9IGVsc2Ugc3dpdGNoIChUWVBFKSB7XG4gICAgICAgICAgY2FzZSA0OiByZXR1cm4gZmFsc2U7ICAgICAgICAgICAgIC8vIGV2ZXJ5XG4gICAgICAgICAgY2FzZSA3OiBwdXNoLmNhbGwodGFyZ2V0LCB2YWx1ZSk7IC8vIGZpbHRlck91dFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBJU19GSU5EX0lOREVYID8gLTEgOiBJU19TT01FIHx8IElTX0VWRVJZID8gSVNfRVZFUlkgOiB0YXJnZXQ7XG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgLy8gYEFycmF5LnByb3RvdHlwZS5mb3JFYWNoYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuZm9yZWFjaFxuICBmb3JFYWNoOiBjcmVhdGVNZXRob2QoMCksXG4gIC8vIGBBcnJheS5wcm90b3R5cGUubWFwYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUubWFwXG4gIG1hcDogY3JlYXRlTWV0aG9kKDEpLFxuICAvLyBgQXJyYXkucHJvdG90eXBlLmZpbHRlcmAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmZpbHRlclxuICBmaWx0ZXI6IGNyZWF0ZU1ldGhvZCgyKSxcbiAgLy8gYEFycmF5LnByb3RvdHlwZS5zb21lYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuc29tZVxuICBzb21lOiBjcmVhdGVNZXRob2QoMyksXG4gIC8vIGBBcnJheS5wcm90b3R5cGUuZXZlcnlgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5ldmVyeVxuICBldmVyeTogY3JlYXRlTWV0aG9kKDQpLFxuICAvLyBgQXJyYXkucHJvdG90eXBlLmZpbmRgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5maW5kXG4gIGZpbmQ6IGNyZWF0ZU1ldGhvZCg1KSxcbiAgLy8gYEFycmF5LnByb3RvdHlwZS5maW5kSW5kZXhgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5maW5kSW5kZXhcbiAgZmluZEluZGV4OiBjcmVhdGVNZXRob2QoNiksXG4gIC8vIGBBcnJheS5wcm90b3R5cGUuZmlsdGVyT3V0YCBtZXRob2RcbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3RjMzkvcHJvcG9zYWwtYXJyYXktZmlsdGVyaW5nXG4gIGZpbHRlck91dDogY3JlYXRlTWV0aG9kKDcpXG59O1xuIiwidmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG52YXIgVjhfVkVSU0lPTiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbmdpbmUtdjgtdmVyc2lvbicpO1xuXG52YXIgU1BFQ0lFUyA9IHdlbGxLbm93blN5bWJvbCgnc3BlY2llcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChNRVRIT0RfTkFNRSkge1xuICAvLyBXZSBjYW4ndCB1c2UgdGhpcyBmZWF0dXJlIGRldGVjdGlvbiBpbiBWOCBzaW5jZSBpdCBjYXVzZXNcbiAgLy8gZGVvcHRpbWl6YXRpb24gYW5kIHNlcmlvdXMgcGVyZm9ybWFuY2UgZGVncmFkYXRpb25cbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzY3N1xuICByZXR1cm4gVjhfVkVSU0lPTiA+PSA1MSB8fCAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICAgIHZhciBhcnJheSA9IFtdO1xuICAgIHZhciBjb25zdHJ1Y3RvciA9IGFycmF5LmNvbnN0cnVjdG9yID0ge307XG4gICAgY29uc3RydWN0b3JbU1BFQ0lFU10gPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4geyBmb286IDEgfTtcbiAgICB9O1xuICAgIHJldHVybiBhcnJheVtNRVRIT0RfTkFNRV0oQm9vbGVhbikuZm9vICE9PSAxO1xuICB9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoTUVUSE9EX05BTUUsIGFyZ3VtZW50KSB7XG4gIHZhciBtZXRob2QgPSBbXVtNRVRIT0RfTkFNRV07XG4gIHJldHVybiAhIW1ldGhvZCAmJiBmYWlscyhmdW5jdGlvbiAoKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVzZWxlc3MtY2FsbCxuby10aHJvdy1saXRlcmFsIC0tIHJlcXVpcmVkIGZvciB0ZXN0aW5nXG4gICAgbWV0aG9kLmNhbGwobnVsbCwgYXJndW1lbnQgfHwgZnVuY3Rpb24gKCkgeyB0aHJvdyAxOyB9LCAxKTtcbiAgfSk7XG59O1xuIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xudmFyIGlzQXJyYXkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtYXJyYXknKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcblxudmFyIFNQRUNJRVMgPSB3ZWxsS25vd25TeW1ib2woJ3NwZWNpZXMnKTtcblxuLy8gYEFycmF5U3BlY2llc0NyZWF0ZWAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5c3BlY2llc2NyZWF0ZVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob3JpZ2luYWxBcnJheSwgbGVuZ3RoKSB7XG4gIHZhciBDO1xuICBpZiAoaXNBcnJheShvcmlnaW5hbEFycmF5KSkge1xuICAgIEMgPSBvcmlnaW5hbEFycmF5LmNvbnN0cnVjdG9yO1xuICAgIC8vIGNyb3NzLXJlYWxtIGZhbGxiYWNrXG4gICAgaWYgKHR5cGVvZiBDID09ICdmdW5jdGlvbicgJiYgKEMgPT09IEFycmF5IHx8IGlzQXJyYXkoQy5wcm90b3R5cGUpKSkgQyA9IHVuZGVmaW5lZDtcbiAgICBlbHNlIGlmIChpc09iamVjdChDKSkge1xuICAgICAgQyA9IENbU1BFQ0lFU107XG4gICAgICBpZiAoQyA9PT0gbnVsbCkgQyA9IHVuZGVmaW5lZDtcbiAgICB9XG4gIH0gcmV0dXJuIG5ldyAoQyA9PT0gdW5kZWZpbmVkID8gQXJyYXkgOiBDKShsZW5ndGggPT09IDAgPyAwIDogbGVuZ3RoKTtcbn07XG4iLCJ2YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4tb2JqZWN0Jyk7XG52YXIgaXRlcmF0b3JDbG9zZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pdGVyYXRvci1jbG9zZScpO1xuXG4vLyBjYWxsIHNvbWV0aGluZyBvbiBpdGVyYXRvciBzdGVwIHdpdGggc2FmZSBjbG9zaW5nIG9uIGVycm9yXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVyYXRvciwgZm4sIHZhbHVlLCBFTlRSSUVTKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIEVOVFJJRVMgPyBmbihhbk9iamVjdCh2YWx1ZSlbMF0sIHZhbHVlWzFdKSA6IGZuKHZhbHVlKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBpdGVyYXRvckNsb3NlKGl0ZXJhdG9yKTtcbiAgICB0aHJvdyBlcnJvcjtcbiAgfVxufTtcbiIsInZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcblxudmFyIElURVJBVE9SID0gd2VsbEtub3duU3ltYm9sKCdpdGVyYXRvcicpO1xudmFyIFNBRkVfQ0xPU0lORyA9IGZhbHNlO1xuXG50cnkge1xuICB2YXIgY2FsbGVkID0gMDtcbiAgdmFyIGl0ZXJhdG9yV2l0aFJldHVybiA9IHtcbiAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4geyBkb25lOiAhIWNhbGxlZCsrIH07XG4gICAgfSxcbiAgICAncmV0dXJuJzogZnVuY3Rpb24gKCkge1xuICAgICAgU0FGRV9DTE9TSU5HID0gdHJ1ZTtcbiAgICB9XG4gIH07XG4gIGl0ZXJhdG9yV2l0aFJldHVybltJVEVSQVRPUl0gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1hcnJheS1mcm9tLCBuby10aHJvdy1saXRlcmFsIC0tIHJlcXVpcmVkIGZvciB0ZXN0aW5nXG4gIEFycmF5LmZyb20oaXRlcmF0b3JXaXRoUmV0dXJuLCBmdW5jdGlvbiAoKSB7IHRocm93IDI7IH0pO1xufSBjYXRjaCAoZXJyb3IpIHsgLyogZW1wdHkgKi8gfVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChleGVjLCBTS0lQX0NMT1NJTkcpIHtcbiAgaWYgKCFTS0lQX0NMT1NJTkcgJiYgIVNBRkVfQ0xPU0lORykgcmV0dXJuIGZhbHNlO1xuICB2YXIgSVRFUkFUSU9OX1NVUFBPUlQgPSBmYWxzZTtcbiAgdHJ5IHtcbiAgICB2YXIgb2JqZWN0ID0ge307XG4gICAgb2JqZWN0W0lURVJBVE9SXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4geyBkb25lOiBJVEVSQVRJT05fU1VQUE9SVCA9IHRydWUgfTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9O1xuICAgIGV4ZWMob2JqZWN0KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHsgLyogZW1wdHkgKi8gfVxuICByZXR1cm4gSVRFUkFUSU9OX1NVUFBPUlQ7XG59O1xuIiwidmFyIHRvU3RyaW5nID0ge30udG9TdHJpbmc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKGl0KS5zbGljZSg4LCAtMSk7XG59O1xuIiwidmFyIFRPX1NUUklOR19UQUdfU1VQUE9SVCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1zdHJpbmctdGFnLXN1cHBvcnQnKTtcbnZhciBjbGFzc29mUmF3ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NsYXNzb2YtcmF3Jyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG5cbnZhciBUT19TVFJJTkdfVEFHID0gd2VsbEtub3duU3ltYm9sKCd0b1N0cmluZ1RhZycpO1xuLy8gRVMzIHdyb25nIGhlcmVcbnZhciBDT1JSRUNUX0FSR1VNRU5UUyA9IGNsYXNzb2ZSYXcoZnVuY3Rpb24gKCkgeyByZXR1cm4gYXJndW1lbnRzOyB9KCkpID09ICdBcmd1bWVudHMnO1xuXG4vLyBmYWxsYmFjayBmb3IgSUUxMSBTY3JpcHQgQWNjZXNzIERlbmllZCBlcnJvclxudmFyIHRyeUdldCA9IGZ1bmN0aW9uIChpdCwga2V5KSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGl0W2tleV07XG4gIH0gY2F0Y2ggKGVycm9yKSB7IC8qIGVtcHR5ICovIH1cbn07XG5cbi8vIGdldHRpbmcgdGFnIGZyb20gRVM2KyBgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZ2Bcbm1vZHVsZS5leHBvcnRzID0gVE9fU1RSSU5HX1RBR19TVVBQT1JUID8gY2xhc3NvZlJhdyA6IGZ1bmN0aW9uIChpdCkge1xuICB2YXIgTywgdGFnLCByZXN1bHQ7XG4gIHJldHVybiBpdCA9PT0gdW5kZWZpbmVkID8gJ1VuZGVmaW5lZCcgOiBpdCA9PT0gbnVsbCA/ICdOdWxsJ1xuICAgIC8vIEBAdG9TdHJpbmdUYWcgY2FzZVxuICAgIDogdHlwZW9mICh0YWcgPSB0cnlHZXQoTyA9IE9iamVjdChpdCksIFRPX1NUUklOR19UQUcpKSA9PSAnc3RyaW5nJyA/IHRhZ1xuICAgIC8vIGJ1aWx0aW5UYWcgY2FzZVxuICAgIDogQ09SUkVDVF9BUkdVTUVOVFMgPyBjbGFzc29mUmF3KE8pXG4gICAgLy8gRVMzIGFyZ3VtZW50cyBmYWxsYmFja1xuICAgIDogKHJlc3VsdCA9IGNsYXNzb2ZSYXcoTykpID09ICdPYmplY3QnICYmIHR5cGVvZiBPLmNhbGxlZSA9PSAnZnVuY3Rpb24nID8gJ0FyZ3VtZW50cycgOiByZXN1bHQ7XG59O1xuIiwidmFyIGhhcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMnKTtcbnZhciBvd25LZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL293bi1rZXlzJyk7XG52YXIgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3InKTtcbnZhciBkZWZpbmVQcm9wZXJ0eU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHRhcmdldCwgc291cmNlKSB7XG4gIHZhciBrZXlzID0gb3duS2V5cyhzb3VyY2UpO1xuICB2YXIgZGVmaW5lUHJvcGVydHkgPSBkZWZpbmVQcm9wZXJ0eU1vZHVsZS5mO1xuICB2YXIgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yTW9kdWxlLmY7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBrZXkgPSBrZXlzW2ldO1xuICAgIGlmICghaGFzKHRhcmdldCwga2V5KSkgZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihzb3VyY2UsIGtleSkpO1xuICB9XG59O1xuIiwidmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gRigpIHsgLyogZW1wdHkgKi8gfVxuICBGLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IG51bGw7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1vYmplY3QtZ2V0cHJvdG90eXBlb2YgLS0gcmVxdWlyZWQgZm9yIHRlc3RpbmdcbiAgcmV0dXJuIE9iamVjdC5nZXRQcm90b3R5cGVPZihuZXcgRigpKSAhPT0gRi5wcm90b3R5cGU7XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBJdGVyYXRvclByb3RvdHlwZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pdGVyYXRvcnMtY29yZScpLkl0ZXJhdG9yUHJvdG90eXBlO1xudmFyIGNyZWF0ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtY3JlYXRlJyk7XG52YXIgY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1wcm9wZXJ0eS1kZXNjcmlwdG9yJyk7XG52YXIgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2V0LXRvLXN0cmluZy10YWcnKTtcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXRlcmF0b3JzJyk7XG5cbnZhciByZXR1cm5UaGlzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoSXRlcmF0b3JDb25zdHJ1Y3RvciwgTkFNRSwgbmV4dCkge1xuICB2YXIgVE9fU1RSSU5HX1RBRyA9IE5BTUUgKyAnIEl0ZXJhdG9yJztcbiAgSXRlcmF0b3JDb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBjcmVhdGUoSXRlcmF0b3JQcm90b3R5cGUsIHsgbmV4dDogY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yKDEsIG5leHQpIH0pO1xuICBzZXRUb1N0cmluZ1RhZyhJdGVyYXRvckNvbnN0cnVjdG9yLCBUT19TVFJJTkdfVEFHLCBmYWxzZSwgdHJ1ZSk7XG4gIEl0ZXJhdG9yc1tUT19TVFJJTkdfVEFHXSA9IHJldHVyblRoaXM7XG4gIHJldHVybiBJdGVyYXRvckNvbnN0cnVjdG9yO1xufTtcbiIsInZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIGRlZmluZVByb3BlcnR5TW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHknKTtcbnZhciBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLXByb3BlcnR5LWRlc2NyaXB0b3InKTtcblxubW9kdWxlLmV4cG9ydHMgPSBERVNDUklQVE9SUyA/IGZ1bmN0aW9uIChvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgcmV0dXJuIGRlZmluZVByb3BlcnR5TW9kdWxlLmYob2JqZWN0LCBrZXksIGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvcigxLCB2YWx1ZSkpO1xufSA6IGZ1bmN0aW9uIChvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgb2JqZWN0W2tleV0gPSB2YWx1ZTtcbiAgcmV0dXJuIG9iamVjdDtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChiaXRtYXAsIHZhbHVlKSB7XG4gIHJldHVybiB7XG4gICAgZW51bWVyYWJsZTogIShiaXRtYXAgJiAxKSxcbiAgICBjb25maWd1cmFibGU6ICEoYml0bWFwICYgMiksXG4gICAgd3JpdGFibGU6ICEoYml0bWFwICYgNCksXG4gICAgdmFsdWU6IHZhbHVlXG4gIH07XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHRvUHJpbWl0aXZlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLXByaW1pdGl2ZScpO1xudmFyIGRlZmluZVByb3BlcnR5TW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHknKTtcbnZhciBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLXByb3BlcnR5LWRlc2NyaXB0b3InKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIHZhciBwcm9wZXJ0eUtleSA9IHRvUHJpbWl0aXZlKGtleSk7XG4gIGlmIChwcm9wZXJ0eUtleSBpbiBvYmplY3QpIGRlZmluZVByb3BlcnR5TW9kdWxlLmYob2JqZWN0LCBwcm9wZXJ0eUtleSwgY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yKDAsIHZhbHVlKSk7XG4gIGVsc2Ugb2JqZWN0W3Byb3BlcnR5S2V5XSA9IHZhbHVlO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIGNyZWF0ZUl0ZXJhdG9yQ29uc3RydWN0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLWl0ZXJhdG9yLWNvbnN0cnVjdG9yJyk7XG52YXIgZ2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWdldC1wcm90b3R5cGUtb2YnKTtcbnZhciBzZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3Qtc2V0LXByb3RvdHlwZS1vZicpO1xudmFyIHNldFRvU3RyaW5nVGFnID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NldC10by1zdHJpbmctdGFnJyk7XG52YXIgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1ub24tZW51bWVyYWJsZS1wcm9wZXJ0eScpO1xudmFyIHJlZGVmaW5lID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlZGVmaW5lJyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG52YXIgSVNfUFVSRSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1wdXJlJyk7XG52YXIgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2l0ZXJhdG9ycycpO1xudmFyIEl0ZXJhdG9yc0NvcmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXRlcmF0b3JzLWNvcmUnKTtcblxudmFyIEl0ZXJhdG9yUHJvdG90eXBlID0gSXRlcmF0b3JzQ29yZS5JdGVyYXRvclByb3RvdHlwZTtcbnZhciBCVUdHWV9TQUZBUklfSVRFUkFUT1JTID0gSXRlcmF0b3JzQ29yZS5CVUdHWV9TQUZBUklfSVRFUkFUT1JTO1xudmFyIElURVJBVE9SID0gd2VsbEtub3duU3ltYm9sKCdpdGVyYXRvcicpO1xudmFyIEtFWVMgPSAna2V5cyc7XG52YXIgVkFMVUVTID0gJ3ZhbHVlcyc7XG52YXIgRU5UUklFUyA9ICdlbnRyaWVzJztcblxudmFyIHJldHVyblRoaXMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChJdGVyYWJsZSwgTkFNRSwgSXRlcmF0b3JDb25zdHJ1Y3RvciwgbmV4dCwgREVGQVVMVCwgSVNfU0VULCBGT1JDRUQpIHtcbiAgY3JlYXRlSXRlcmF0b3JDb25zdHJ1Y3RvcihJdGVyYXRvckNvbnN0cnVjdG9yLCBOQU1FLCBuZXh0KTtcblxuICB2YXIgZ2V0SXRlcmF0aW9uTWV0aG9kID0gZnVuY3Rpb24gKEtJTkQpIHtcbiAgICBpZiAoS0lORCA9PT0gREVGQVVMVCAmJiBkZWZhdWx0SXRlcmF0b3IpIHJldHVybiBkZWZhdWx0SXRlcmF0b3I7XG4gICAgaWYgKCFCVUdHWV9TQUZBUklfSVRFUkFUT1JTICYmIEtJTkQgaW4gSXRlcmFibGVQcm90b3R5cGUpIHJldHVybiBJdGVyYWJsZVByb3RvdHlwZVtLSU5EXTtcbiAgICBzd2l0Y2ggKEtJTkQpIHtcbiAgICAgIGNhc2UgS0VZUzogcmV0dXJuIGZ1bmN0aW9uIGtleXMoKSB7IHJldHVybiBuZXcgSXRlcmF0b3JDb25zdHJ1Y3Rvcih0aGlzLCBLSU5EKTsgfTtcbiAgICAgIGNhc2UgVkFMVUVTOiByZXR1cm4gZnVuY3Rpb24gdmFsdWVzKCkgeyByZXR1cm4gbmV3IEl0ZXJhdG9yQ29uc3RydWN0b3IodGhpcywgS0lORCk7IH07XG4gICAgICBjYXNlIEVOVFJJRVM6IHJldHVybiBmdW5jdGlvbiBlbnRyaWVzKCkgeyByZXR1cm4gbmV3IEl0ZXJhdG9yQ29uc3RydWN0b3IodGhpcywgS0lORCk7IH07XG4gICAgfSByZXR1cm4gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IEl0ZXJhdG9yQ29uc3RydWN0b3IodGhpcyk7IH07XG4gIH07XG5cbiAgdmFyIFRPX1NUUklOR19UQUcgPSBOQU1FICsgJyBJdGVyYXRvcic7XG4gIHZhciBJTkNPUlJFQ1RfVkFMVUVTX05BTUUgPSBmYWxzZTtcbiAgdmFyIEl0ZXJhYmxlUHJvdG90eXBlID0gSXRlcmFibGUucHJvdG90eXBlO1xuICB2YXIgbmF0aXZlSXRlcmF0b3IgPSBJdGVyYWJsZVByb3RvdHlwZVtJVEVSQVRPUl1cbiAgICB8fCBJdGVyYWJsZVByb3RvdHlwZVsnQEBpdGVyYXRvciddXG4gICAgfHwgREVGQVVMVCAmJiBJdGVyYWJsZVByb3RvdHlwZVtERUZBVUxUXTtcbiAgdmFyIGRlZmF1bHRJdGVyYXRvciA9ICFCVUdHWV9TQUZBUklfSVRFUkFUT1JTICYmIG5hdGl2ZUl0ZXJhdG9yIHx8IGdldEl0ZXJhdGlvbk1ldGhvZChERUZBVUxUKTtcbiAgdmFyIGFueU5hdGl2ZUl0ZXJhdG9yID0gTkFNRSA9PSAnQXJyYXknID8gSXRlcmFibGVQcm90b3R5cGUuZW50cmllcyB8fCBuYXRpdmVJdGVyYXRvciA6IG5hdGl2ZUl0ZXJhdG9yO1xuICB2YXIgQ3VycmVudEl0ZXJhdG9yUHJvdG90eXBlLCBtZXRob2RzLCBLRVk7XG5cbiAgLy8gZml4IG5hdGl2ZVxuICBpZiAoYW55TmF0aXZlSXRlcmF0b3IpIHtcbiAgICBDdXJyZW50SXRlcmF0b3JQcm90b3R5cGUgPSBnZXRQcm90b3R5cGVPZihhbnlOYXRpdmVJdGVyYXRvci5jYWxsKG5ldyBJdGVyYWJsZSgpKSk7XG4gICAgaWYgKEl0ZXJhdG9yUHJvdG90eXBlICE9PSBPYmplY3QucHJvdG90eXBlICYmIEN1cnJlbnRJdGVyYXRvclByb3RvdHlwZS5uZXh0KSB7XG4gICAgICBpZiAoIUlTX1BVUkUgJiYgZ2V0UHJvdG90eXBlT2YoQ3VycmVudEl0ZXJhdG9yUHJvdG90eXBlKSAhPT0gSXRlcmF0b3JQcm90b3R5cGUpIHtcbiAgICAgICAgaWYgKHNldFByb3RvdHlwZU9mKSB7XG4gICAgICAgICAgc2V0UHJvdG90eXBlT2YoQ3VycmVudEl0ZXJhdG9yUHJvdG90eXBlLCBJdGVyYXRvclByb3RvdHlwZSk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIEN1cnJlbnRJdGVyYXRvclByb3RvdHlwZVtJVEVSQVRPUl0gIT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eShDdXJyZW50SXRlcmF0b3JQcm90b3R5cGUsIElURVJBVE9SLCByZXR1cm5UaGlzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLy8gU2V0IEBAdG9TdHJpbmdUYWcgdG8gbmF0aXZlIGl0ZXJhdG9yc1xuICAgICAgc2V0VG9TdHJpbmdUYWcoQ3VycmVudEl0ZXJhdG9yUHJvdG90eXBlLCBUT19TVFJJTkdfVEFHLCB0cnVlLCB0cnVlKTtcbiAgICAgIGlmIChJU19QVVJFKSBJdGVyYXRvcnNbVE9fU1RSSU5HX1RBR10gPSByZXR1cm5UaGlzO1xuICAgIH1cbiAgfVxuXG4gIC8vIGZpeCBBcnJheS5wcm90b3R5cGUueyB2YWx1ZXMsIEBAaXRlcmF0b3IgfS5uYW1lIGluIFY4IC8gRkZcbiAgaWYgKERFRkFVTFQgPT0gVkFMVUVTICYmIG5hdGl2ZUl0ZXJhdG9yICYmIG5hdGl2ZUl0ZXJhdG9yLm5hbWUgIT09IFZBTFVFUykge1xuICAgIElOQ09SUkVDVF9WQUxVRVNfTkFNRSA9IHRydWU7XG4gICAgZGVmYXVsdEl0ZXJhdG9yID0gZnVuY3Rpb24gdmFsdWVzKCkgeyByZXR1cm4gbmF0aXZlSXRlcmF0b3IuY2FsbCh0aGlzKTsgfTtcbiAgfVxuXG4gIC8vIGRlZmluZSBpdGVyYXRvclxuICBpZiAoKCFJU19QVVJFIHx8IEZPUkNFRCkgJiYgSXRlcmFibGVQcm90b3R5cGVbSVRFUkFUT1JdICE9PSBkZWZhdWx0SXRlcmF0b3IpIHtcbiAgICBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkoSXRlcmFibGVQcm90b3R5cGUsIElURVJBVE9SLCBkZWZhdWx0SXRlcmF0b3IpO1xuICB9XG4gIEl0ZXJhdG9yc1tOQU1FXSA9IGRlZmF1bHRJdGVyYXRvcjtcblxuICAvLyBleHBvcnQgYWRkaXRpb25hbCBtZXRob2RzXG4gIGlmIChERUZBVUxUKSB7XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIHZhbHVlczogZ2V0SXRlcmF0aW9uTWV0aG9kKFZBTFVFUyksXG4gICAgICBrZXlzOiBJU19TRVQgPyBkZWZhdWx0SXRlcmF0b3IgOiBnZXRJdGVyYXRpb25NZXRob2QoS0VZUyksXG4gICAgICBlbnRyaWVzOiBnZXRJdGVyYXRpb25NZXRob2QoRU5UUklFUylcbiAgICB9O1xuICAgIGlmIChGT1JDRUQpIGZvciAoS0VZIGluIG1ldGhvZHMpIHtcbiAgICAgIGlmIChCVUdHWV9TQUZBUklfSVRFUkFUT1JTIHx8IElOQ09SUkVDVF9WQUxVRVNfTkFNRSB8fCAhKEtFWSBpbiBJdGVyYWJsZVByb3RvdHlwZSkpIHtcbiAgICAgICAgcmVkZWZpbmUoSXRlcmFibGVQcm90b3R5cGUsIEtFWSwgbWV0aG9kc1tLRVldKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgJCh7IHRhcmdldDogTkFNRSwgcHJvdG86IHRydWUsIGZvcmNlZDogQlVHR1lfU0FGQVJJX0lURVJBVE9SUyB8fCBJTkNPUlJFQ1RfVkFMVUVTX05BTUUgfSwgbWV0aG9kcyk7XG4gIH1cblxuICByZXR1cm4gbWV0aG9kcztcbn07XG4iLCJ2YXIgcGF0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9wYXRoJyk7XG52YXIgaGFzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xudmFyIHdyYXBwZWRXZWxsS25vd25TeW1ib2xNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wtd3JhcHBlZCcpO1xudmFyIGRlZmluZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHknKS5mO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChOQU1FKSB7XG4gIHZhciBTeW1ib2wgPSBwYXRoLlN5bWJvbCB8fCAocGF0aC5TeW1ib2wgPSB7fSk7XG4gIGlmICghaGFzKFN5bWJvbCwgTkFNRSkpIGRlZmluZVByb3BlcnR5KFN5bWJvbCwgTkFNRSwge1xuICAgIHZhbHVlOiB3cmFwcGVkV2VsbEtub3duU3ltYm9sTW9kdWxlLmYoTkFNRSlcbiAgfSk7XG59O1xuIiwidmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG5cbi8vIERldGVjdCBJRTgncyBpbmNvbXBsZXRlIGRlZmluZVByb3BlcnR5IGltcGxlbWVudGF0aW9uXG5tb2R1bGUuZXhwb3J0cyA9ICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1vYmplY3QtZGVmaW5lcHJvcGVydHkgLS0gcmVxdWlyZWQgZm9yIHRlc3RpbmdcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgMSwgeyBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDc7IH0gfSlbMV0gIT0gNztcbn0pO1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcblxudmFyIGRvY3VtZW50ID0gZ2xvYmFsLmRvY3VtZW50O1xuLy8gdHlwZW9mIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgaXMgJ29iamVjdCcgaW4gb2xkIElFXG52YXIgRVhJU1RTID0gaXNPYmplY3QoZG9jdW1lbnQpICYmIGlzT2JqZWN0KGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gRVhJU1RTID8gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChpdCkgOiB7fTtcbn07XG4iLCIvLyBpdGVyYWJsZSBET00gY29sbGVjdGlvbnNcbi8vIGZsYWcgLSBgaXRlcmFibGVgIGludGVyZmFjZSAtICdlbnRyaWVzJywgJ2tleXMnLCAndmFsdWVzJywgJ2ZvckVhY2gnIG1ldGhvZHNcbm1vZHVsZS5leHBvcnRzID0ge1xuICBDU1NSdWxlTGlzdDogMCxcbiAgQ1NTU3R5bGVEZWNsYXJhdGlvbjogMCxcbiAgQ1NTVmFsdWVMaXN0OiAwLFxuICBDbGllbnRSZWN0TGlzdDogMCxcbiAgRE9NUmVjdExpc3Q6IDAsXG4gIERPTVN0cmluZ0xpc3Q6IDAsXG4gIERPTVRva2VuTGlzdDogMSxcbiAgRGF0YVRyYW5zZmVySXRlbUxpc3Q6IDAsXG4gIEZpbGVMaXN0OiAwLFxuICBIVE1MQWxsQ29sbGVjdGlvbjogMCxcbiAgSFRNTENvbGxlY3Rpb246IDAsXG4gIEhUTUxGb3JtRWxlbWVudDogMCxcbiAgSFRNTFNlbGVjdEVsZW1lbnQ6IDAsXG4gIE1lZGlhTGlzdDogMCxcbiAgTWltZVR5cGVBcnJheTogMCxcbiAgTmFtZWROb2RlTWFwOiAwLFxuICBOb2RlTGlzdDogMSxcbiAgUGFpbnRSZXF1ZXN0TGlzdDogMCxcbiAgUGx1Z2luOiAwLFxuICBQbHVnaW5BcnJheTogMCxcbiAgU1ZHTGVuZ3RoTGlzdDogMCxcbiAgU1ZHTnVtYmVyTGlzdDogMCxcbiAgU1ZHUGF0aFNlZ0xpc3Q6IDAsXG4gIFNWR1BvaW50TGlzdDogMCxcbiAgU1ZHU3RyaW5nTGlzdDogMCxcbiAgU1ZHVHJhbnNmb3JtTGlzdDogMCxcbiAgU291cmNlQnVmZmVyTGlzdDogMCxcbiAgU3R5bGVTaGVldExpc3Q6IDAsXG4gIFRleHRUcmFja0N1ZUxpc3Q6IDAsXG4gIFRleHRUcmFja0xpc3Q6IDAsXG4gIFRvdWNoTGlzdDogMFxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gdHlwZW9mIHdpbmRvdyA9PSAnb2JqZWN0JztcbiIsInZhciB1c2VyQWdlbnQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZW5naW5lLXVzZXItYWdlbnQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSAvKD86aXBob25lfGlwb2R8aXBhZCkuKmFwcGxld2Via2l0L2kudGVzdCh1c2VyQWdlbnQpO1xuIiwidmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY2xhc3NvZi1yYXcnKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gY2xhc3NvZihnbG9iYWwucHJvY2VzcykgPT0gJ3Byb2Nlc3MnO1xuIiwidmFyIHVzZXJBZ2VudCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbmdpbmUtdXNlci1hZ2VudCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IC93ZWIwcyg/IS4qY2hyb21lKS9pLnRlc3QodXNlckFnZW50KTtcbiIsInZhciBnZXRCdWlsdEluID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dldC1idWlsdC1pbicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGdldEJ1aWx0SW4oJ25hdmlnYXRvcicsICd1c2VyQWdlbnQnKSB8fCAnJztcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgdXNlckFnZW50ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2VuZ2luZS11c2VyLWFnZW50Jyk7XG5cbnZhciBwcm9jZXNzID0gZ2xvYmFsLnByb2Nlc3M7XG52YXIgdmVyc2lvbnMgPSBwcm9jZXNzICYmIHByb2Nlc3MudmVyc2lvbnM7XG52YXIgdjggPSB2ZXJzaW9ucyAmJiB2ZXJzaW9ucy52ODtcbnZhciBtYXRjaCwgdmVyc2lvbjtcblxuaWYgKHY4KSB7XG4gIG1hdGNoID0gdjguc3BsaXQoJy4nKTtcbiAgdmVyc2lvbiA9IG1hdGNoWzBdIDwgNCA/IDEgOiBtYXRjaFswXSArIG1hdGNoWzFdO1xufSBlbHNlIGlmICh1c2VyQWdlbnQpIHtcbiAgbWF0Y2ggPSB1c2VyQWdlbnQubWF0Y2goL0VkZ2VcXC8oXFxkKykvKTtcbiAgaWYgKCFtYXRjaCB8fCBtYXRjaFsxXSA+PSA3NCkge1xuICAgIG1hdGNoID0gdXNlckFnZW50Lm1hdGNoKC9DaHJvbWVcXC8oXFxkKykvKTtcbiAgICBpZiAobWF0Y2gpIHZlcnNpb24gPSBtYXRjaFsxXTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHZlcnNpb24gJiYgK3ZlcnNpb247XG4iLCIvLyBJRTgtIGRvbid0IGVudW0gYnVnIGtleXNcbm1vZHVsZS5leHBvcnRzID0gW1xuICAnY29uc3RydWN0b3InLFxuICAnaGFzT3duUHJvcGVydHknLFxuICAnaXNQcm90b3R5cGVPZicsXG4gICdwcm9wZXJ0eUlzRW51bWVyYWJsZScsXG4gICd0b0xvY2FsZVN0cmluZycsXG4gICd0b1N0cmluZycsXG4gICd2YWx1ZU9mJ1xuXTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3InKS5mO1xudmFyIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtbm9uLWVudW1lcmFibGUtcHJvcGVydHknKTtcbnZhciByZWRlZmluZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWRlZmluZScpO1xudmFyIHNldEdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zZXQtZ2xvYmFsJyk7XG52YXIgY29weUNvbnN0cnVjdG9yUHJvcGVydGllcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jb3B5LWNvbnN0cnVjdG9yLXByb3BlcnRpZXMnKTtcbnZhciBpc0ZvcmNlZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1mb3JjZWQnKTtcblxuLypcbiAgb3B0aW9ucy50YXJnZXQgICAgICAtIG5hbWUgb2YgdGhlIHRhcmdldCBvYmplY3RcbiAgb3B0aW9ucy5nbG9iYWwgICAgICAtIHRhcmdldCBpcyB0aGUgZ2xvYmFsIG9iamVjdFxuICBvcHRpb25zLnN0YXQgICAgICAgIC0gZXhwb3J0IGFzIHN0YXRpYyBtZXRob2RzIG9mIHRhcmdldFxuICBvcHRpb25zLnByb3RvICAgICAgIC0gZXhwb3J0IGFzIHByb3RvdHlwZSBtZXRob2RzIG9mIHRhcmdldFxuICBvcHRpb25zLnJlYWwgICAgICAgIC0gcmVhbCBwcm90b3R5cGUgbWV0aG9kIGZvciB0aGUgYHB1cmVgIHZlcnNpb25cbiAgb3B0aW9ucy5mb3JjZWQgICAgICAtIGV4cG9ydCBldmVuIGlmIHRoZSBuYXRpdmUgZmVhdHVyZSBpcyBhdmFpbGFibGVcbiAgb3B0aW9ucy5iaW5kICAgICAgICAtIGJpbmQgbWV0aG9kcyB0byB0aGUgdGFyZ2V0LCByZXF1aXJlZCBmb3IgdGhlIGBwdXJlYCB2ZXJzaW9uXG4gIG9wdGlvbnMud3JhcCAgICAgICAgLSB3cmFwIGNvbnN0cnVjdG9ycyB0byBwcmV2ZW50aW5nIGdsb2JhbCBwb2xsdXRpb24sIHJlcXVpcmVkIGZvciB0aGUgYHB1cmVgIHZlcnNpb25cbiAgb3B0aW9ucy51bnNhZmUgICAgICAtIHVzZSB0aGUgc2ltcGxlIGFzc2lnbm1lbnQgb2YgcHJvcGVydHkgaW5zdGVhZCBvZiBkZWxldGUgKyBkZWZpbmVQcm9wZXJ0eVxuICBvcHRpb25zLnNoYW0gICAgICAgIC0gYWRkIGEgZmxhZyB0byBub3QgY29tcGxldGVseSBmdWxsIHBvbHlmaWxsc1xuICBvcHRpb25zLmVudW1lcmFibGUgIC0gZXhwb3J0IGFzIGVudW1lcmFibGUgcHJvcGVydHlcbiAgb3B0aW9ucy5ub1RhcmdldEdldCAtIHByZXZlbnQgY2FsbGluZyBhIGdldHRlciBvbiB0YXJnZXRcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvcHRpb25zLCBzb3VyY2UpIHtcbiAgdmFyIFRBUkdFVCA9IG9wdGlvbnMudGFyZ2V0O1xuICB2YXIgR0xPQkFMID0gb3B0aW9ucy5nbG9iYWw7XG4gIHZhciBTVEFUSUMgPSBvcHRpb25zLnN0YXQ7XG4gIHZhciBGT1JDRUQsIHRhcmdldCwga2V5LCB0YXJnZXRQcm9wZXJ0eSwgc291cmNlUHJvcGVydHksIGRlc2NyaXB0b3I7XG4gIGlmIChHTE9CQUwpIHtcbiAgICB0YXJnZXQgPSBnbG9iYWw7XG4gIH0gZWxzZSBpZiAoU1RBVElDKSB7XG4gICAgdGFyZ2V0ID0gZ2xvYmFsW1RBUkdFVF0gfHwgc2V0R2xvYmFsKFRBUkdFVCwge30pO1xuICB9IGVsc2Uge1xuICAgIHRhcmdldCA9IChnbG9iYWxbVEFSR0VUXSB8fCB7fSkucHJvdG90eXBlO1xuICB9XG4gIGlmICh0YXJnZXQpIGZvciAoa2V5IGluIHNvdXJjZSkge1xuICAgIHNvdXJjZVByb3BlcnR5ID0gc291cmNlW2tleV07XG4gICAgaWYgKG9wdGlvbnMubm9UYXJnZXRHZXQpIHtcbiAgICAgIGRlc2NyaXB0b3IgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpO1xuICAgICAgdGFyZ2V0UHJvcGVydHkgPSBkZXNjcmlwdG9yICYmIGRlc2NyaXB0b3IudmFsdWU7XG4gICAgfSBlbHNlIHRhcmdldFByb3BlcnR5ID0gdGFyZ2V0W2tleV07XG4gICAgRk9SQ0VEID0gaXNGb3JjZWQoR0xPQkFMID8ga2V5IDogVEFSR0VUICsgKFNUQVRJQyA/ICcuJyA6ICcjJykgKyBrZXksIG9wdGlvbnMuZm9yY2VkKTtcbiAgICAvLyBjb250YWluZWQgaW4gdGFyZ2V0XG4gICAgaWYgKCFGT1JDRUQgJiYgdGFyZ2V0UHJvcGVydHkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKHR5cGVvZiBzb3VyY2VQcm9wZXJ0eSA9PT0gdHlwZW9mIHRhcmdldFByb3BlcnR5KSBjb250aW51ZTtcbiAgICAgIGNvcHlDb25zdHJ1Y3RvclByb3BlcnRpZXMoc291cmNlUHJvcGVydHksIHRhcmdldFByb3BlcnR5KTtcbiAgICB9XG4gICAgLy8gYWRkIGEgZmxhZyB0byBub3QgY29tcGxldGVseSBmdWxsIHBvbHlmaWxsc1xuICAgIGlmIChvcHRpb25zLnNoYW0gfHwgKHRhcmdldFByb3BlcnR5ICYmIHRhcmdldFByb3BlcnR5LnNoYW0pKSB7XG4gICAgICBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkoc291cmNlUHJvcGVydHksICdzaGFtJywgdHJ1ZSk7XG4gICAgfVxuICAgIC8vIGV4dGVuZCBnbG9iYWxcbiAgICByZWRlZmluZSh0YXJnZXQsIGtleSwgc291cmNlUHJvcGVydHksIG9wdGlvbnMpO1xuICB9XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZXhlYykge1xuICB0cnkge1xuICAgIHJldHVybiAhIWV4ZWMoKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufTtcbiIsIid1c2Ugc3RyaWN0Jztcbi8vIFRPRE86IFJlbW92ZSBmcm9tIGBjb3JlLWpzQDRgIHNpbmNlIGl0J3MgbW92ZWQgdG8gZW50cnkgcG9pbnRzXG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzLnJlZ2V4cC5leGVjJyk7XG52YXIgcmVkZWZpbmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVkZWZpbmUnKTtcbnZhciByZWdleHBFeGVjID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlZ2V4cC1leGVjJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcbnZhciBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLW5vbi1lbnVtZXJhYmxlLXByb3BlcnR5Jyk7XG5cbnZhciBTUEVDSUVTID0gd2VsbEtub3duU3ltYm9sKCdzcGVjaWVzJyk7XG52YXIgUmVnRXhwUHJvdG90eXBlID0gUmVnRXhwLnByb3RvdHlwZTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoS0VZLCBleGVjLCBGT1JDRUQsIFNIQU0pIHtcbiAgdmFyIFNZTUJPTCA9IHdlbGxLbm93blN5bWJvbChLRVkpO1xuXG4gIHZhciBERUxFR0FURVNfVE9fU1lNQk9MID0gIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgICAvLyBTdHJpbmcgbWV0aG9kcyBjYWxsIHN5bWJvbC1uYW1lZCBSZWdFcCBtZXRob2RzXG4gICAgdmFyIE8gPSB7fTtcbiAgICBPW1NZTUJPTF0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiA3OyB9O1xuICAgIHJldHVybiAnJ1tLRVldKE8pICE9IDc7XG4gIH0pO1xuXG4gIHZhciBERUxFR0FURVNfVE9fRVhFQyA9IERFTEVHQVRFU19UT19TWU1CT0wgJiYgIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgICAvLyBTeW1ib2wtbmFtZWQgUmVnRXhwIG1ldGhvZHMgY2FsbCAuZXhlY1xuICAgIHZhciBleGVjQ2FsbGVkID0gZmFsc2U7XG4gICAgdmFyIHJlID0gL2EvO1xuXG4gICAgaWYgKEtFWSA9PT0gJ3NwbGl0Jykge1xuICAgICAgLy8gV2UgY2FuJ3QgdXNlIHJlYWwgcmVnZXggaGVyZSBzaW5jZSBpdCBjYXVzZXMgZGVvcHRpbWl6YXRpb25cbiAgICAgIC8vIGFuZCBzZXJpb3VzIHBlcmZvcm1hbmNlIGRlZ3JhZGF0aW9uIGluIFY4XG4gICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvMzA2XG4gICAgICByZSA9IHt9O1xuICAgICAgLy8gUmVnRXhwW0BAc3BsaXRdIGRvZXNuJ3QgY2FsbCB0aGUgcmVnZXgncyBleGVjIG1ldGhvZCwgYnV0IGZpcnN0IGNyZWF0ZXNcbiAgICAgIC8vIGEgbmV3IG9uZS4gV2UgbmVlZCB0byByZXR1cm4gdGhlIHBhdGNoZWQgcmVnZXggd2hlbiBjcmVhdGluZyB0aGUgbmV3IG9uZS5cbiAgICAgIHJlLmNvbnN0cnVjdG9yID0ge307XG4gICAgICByZS5jb25zdHJ1Y3RvcltTUEVDSUVTXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHJlOyB9O1xuICAgICAgcmUuZmxhZ3MgPSAnJztcbiAgICAgIHJlW1NZTUJPTF0gPSAvLi9bU1lNQk9MXTtcbiAgICB9XG5cbiAgICByZS5leGVjID0gZnVuY3Rpb24gKCkgeyBleGVjQ2FsbGVkID0gdHJ1ZTsgcmV0dXJuIG51bGw7IH07XG5cbiAgICByZVtTWU1CT0xdKCcnKTtcbiAgICByZXR1cm4gIWV4ZWNDYWxsZWQ7XG4gIH0pO1xuXG4gIGlmIChcbiAgICAhREVMRUdBVEVTX1RPX1NZTUJPTCB8fFxuICAgICFERUxFR0FURVNfVE9fRVhFQyB8fFxuICAgIEZPUkNFRFxuICApIHtcbiAgICB2YXIgbmF0aXZlUmVnRXhwTWV0aG9kID0gLy4vW1NZTUJPTF07XG4gICAgdmFyIG1ldGhvZHMgPSBleGVjKFNZTUJPTCwgJydbS0VZXSwgZnVuY3Rpb24gKG5hdGl2ZU1ldGhvZCwgcmVnZXhwLCBzdHIsIGFyZzIsIGZvcmNlU3RyaW5nTWV0aG9kKSB7XG4gICAgICB2YXIgJGV4ZWMgPSByZWdleHAuZXhlYztcbiAgICAgIGlmICgkZXhlYyA9PT0gcmVnZXhwRXhlYyB8fCAkZXhlYyA9PT0gUmVnRXhwUHJvdG90eXBlLmV4ZWMpIHtcbiAgICAgICAgaWYgKERFTEVHQVRFU19UT19TWU1CT0wgJiYgIWZvcmNlU3RyaW5nTWV0aG9kKSB7XG4gICAgICAgICAgLy8gVGhlIG5hdGl2ZSBTdHJpbmcgbWV0aG9kIGFscmVhZHkgZGVsZWdhdGVzIHRvIEBAbWV0aG9kICh0aGlzXG4gICAgICAgICAgLy8gcG9seWZpbGxlZCBmdW5jdGlvbiksIGxlYXNpbmcgdG8gaW5maW5pdGUgcmVjdXJzaW9uLlxuICAgICAgICAgIC8vIFdlIGF2b2lkIGl0IGJ5IGRpcmVjdGx5IGNhbGxpbmcgdGhlIG5hdGl2ZSBAQG1ldGhvZCBtZXRob2QuXG4gICAgICAgICAgcmV0dXJuIHsgZG9uZTogdHJ1ZSwgdmFsdWU6IG5hdGl2ZVJlZ0V4cE1ldGhvZC5jYWxsKHJlZ2V4cCwgc3RyLCBhcmcyKSB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IGRvbmU6IHRydWUsIHZhbHVlOiBuYXRpdmVNZXRob2QuY2FsbChzdHIsIHJlZ2V4cCwgYXJnMikgfTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB7IGRvbmU6IGZhbHNlIH07XG4gICAgfSk7XG5cbiAgICByZWRlZmluZShTdHJpbmcucHJvdG90eXBlLCBLRVksIG1ldGhvZHNbMF0pO1xuICAgIHJlZGVmaW5lKFJlZ0V4cFByb3RvdHlwZSwgU1lNQk9MLCBtZXRob2RzWzFdKTtcbiAgfVxuXG4gIGlmIChTSEFNKSBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkoUmVnRXhwUHJvdG90eXBlW1NZTUJPTF0sICdzaGFtJywgdHJ1ZSk7XG59O1xuIiwidmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hLWZ1bmN0aW9uJyk7XG5cbi8vIG9wdGlvbmFsIC8gc2ltcGxlIGNvbnRleHQgYmluZGluZ1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZm4sIHRoYXQsIGxlbmd0aCkge1xuICBhRnVuY3Rpb24oZm4pO1xuICBpZiAodGhhdCA9PT0gdW5kZWZpbmVkKSByZXR1cm4gZm47XG4gIHN3aXRjaCAobGVuZ3RoKSB7XG4gICAgY2FzZSAwOiByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCk7XG4gICAgfTtcbiAgICBjYXNlIDE6IHJldHVybiBmdW5jdGlvbiAoYSkge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSk7XG4gICAgfTtcbiAgICBjYXNlIDI6IHJldHVybiBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYik7XG4gICAgfTtcbiAgICBjYXNlIDM6IHJldHVybiBmdW5jdGlvbiAoYSwgYiwgYykge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYiwgYyk7XG4gICAgfTtcbiAgfVxuICByZXR1cm4gZnVuY3Rpb24gKC8qIC4uLmFyZ3MgKi8pIHtcbiAgICByZXR1cm4gZm4uYXBwbHkodGhhdCwgYXJndW1lbnRzKTtcbiAgfTtcbn07XG4iLCJ2YXIgcGF0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9wYXRoJyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xuXG52YXIgYUZ1bmN0aW9uID0gZnVuY3Rpb24gKHZhcmlhYmxlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFyaWFibGUgPT0gJ2Z1bmN0aW9uJyA/IHZhcmlhYmxlIDogdW5kZWZpbmVkO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmFtZXNwYWNlLCBtZXRob2QpIHtcbiAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPCAyID8gYUZ1bmN0aW9uKHBhdGhbbmFtZXNwYWNlXSkgfHwgYUZ1bmN0aW9uKGdsb2JhbFtuYW1lc3BhY2VdKVxuICAgIDogcGF0aFtuYW1lc3BhY2VdICYmIHBhdGhbbmFtZXNwYWNlXVttZXRob2RdIHx8IGdsb2JhbFtuYW1lc3BhY2VdICYmIGdsb2JhbFtuYW1lc3BhY2VdW21ldGhvZF07XG59O1xuIiwidmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY2xhc3NvZicpO1xudmFyIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pdGVyYXRvcnMnKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcblxudmFyIElURVJBVE9SID0gd2VsbEtub3duU3ltYm9sKCdpdGVyYXRvcicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAoaXQgIT0gdW5kZWZpbmVkKSByZXR1cm4gaXRbSVRFUkFUT1JdXG4gICAgfHwgaXRbJ0BAaXRlcmF0b3InXVxuICAgIHx8IEl0ZXJhdG9yc1tjbGFzc29mKGl0KV07XG59O1xuIiwidmFyIGNoZWNrID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpdCAmJiBpdC5NYXRoID09IE1hdGggJiYgaXQ7XG59O1xuXG4vLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvODYjaXNzdWVjb21tZW50LTExNTc1OTAyOFxubW9kdWxlLmV4cG9ydHMgPVxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tZ2xvYmFsLXRoaXMgLS0gc2FmZVxuICBjaGVjayh0eXBlb2YgZ2xvYmFsVGhpcyA9PSAnb2JqZWN0JyAmJiBnbG9iYWxUaGlzKSB8fFxuICBjaGVjayh0eXBlb2Ygd2luZG93ID09ICdvYmplY3QnICYmIHdpbmRvdykgfHxcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtZ2xvYmFscyAtLSBzYWZlXG4gIGNoZWNrKHR5cGVvZiBzZWxmID09ICdvYmplY3QnICYmIHNlbGYpIHx8XG4gIGNoZWNrKHR5cGVvZiBnbG9iYWwgPT0gJ29iamVjdCcgJiYgZ2xvYmFsKSB8fFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbmV3LWZ1bmMgLS0gZmFsbGJhY2tcbiAgKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0pKCkgfHwgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcbiIsInZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1vYmplY3QnKTtcblxudmFyIGhhc093blByb3BlcnR5ID0ge30uaGFzT3duUHJvcGVydHk7XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0Lmhhc093biB8fCBmdW5jdGlvbiBoYXNPd24oaXQsIGtleSkge1xuICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbCh0b09iamVjdChpdCksIGtleSk7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7fTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGEsIGIpIHtcbiAgdmFyIGNvbnNvbGUgPSBnbG9iYWwuY29uc29sZTtcbiAgaWYgKGNvbnNvbGUgJiYgY29uc29sZS5lcnJvcikge1xuICAgIGFyZ3VtZW50cy5sZW5ndGggPT09IDEgPyBjb25zb2xlLmVycm9yKGEpIDogY29uc29sZS5lcnJvcihhLCBiKTtcbiAgfVxufTtcbiIsInZhciBnZXRCdWlsdEluID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dldC1idWlsdC1pbicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGdldEJ1aWx0SW4oJ2RvY3VtZW50JywgJ2RvY3VtZW50RWxlbWVudCcpO1xuIiwidmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciBjcmVhdGVFbGVtZW50ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RvY3VtZW50LWNyZWF0ZS1lbGVtZW50Jyk7XG5cbi8vIFRoYW5rJ3MgSUU4IGZvciBoaXMgZnVubnkgZGVmaW5lUHJvcGVydHlcbm1vZHVsZS5leHBvcnRzID0gIURFU0NSSVBUT1JTICYmICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1vYmplY3QtZGVmaW5lcHJvcGVydHkgLS0gcmVxdWllZCBmb3IgdGVzdGluZ1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KGNyZWF0ZUVsZW1lbnQoJ2RpdicpLCAnYScsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDc7IH1cbiAgfSkuYSAhPSA3O1xufSk7XG4iLCJ2YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciBjbGFzc29mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NsYXNzb2YtcmF3Jyk7XG5cbnZhciBzcGxpdCA9ICcnLnNwbGl0O1xuXG4vLyBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIGFuZCBub24tZW51bWVyYWJsZSBvbGQgVjggc3RyaW5nc1xubW9kdWxlLmV4cG9ydHMgPSBmYWlscyhmdW5jdGlvbiAoKSB7XG4gIC8vIHRocm93cyBhbiBlcnJvciBpbiByaGlubywgc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9tb3ppbGxhL3JoaW5vL2lzc3Vlcy8zNDZcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXByb3RvdHlwZS1idWlsdGlucyAtLSBzYWZlXG4gIHJldHVybiAhT2JqZWN0KCd6JykucHJvcGVydHlJc0VudW1lcmFibGUoMCk7XG59KSA/IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gY2xhc3NvZihpdCkgPT0gJ1N0cmluZycgPyBzcGxpdC5jYWxsKGl0LCAnJykgOiBPYmplY3QoaXQpO1xufSA6IE9iamVjdDtcbiIsInZhciBzdG9yZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQtc3RvcmUnKTtcblxudmFyIGZ1bmN0aW9uVG9TdHJpbmcgPSBGdW5jdGlvbi50b1N0cmluZztcblxuLy8gdGhpcyBoZWxwZXIgYnJva2VuIGluIGBjb3JlLWpzQDMuNC4xLTMuNC40YCwgc28gd2UgY2FuJ3QgdXNlIGBzaGFyZWRgIGhlbHBlclxuaWYgKHR5cGVvZiBzdG9yZS5pbnNwZWN0U291cmNlICE9ICdmdW5jdGlvbicpIHtcbiAgc3RvcmUuaW5zcGVjdFNvdXJjZSA9IGZ1bmN0aW9uIChpdCkge1xuICAgIHJldHVybiBmdW5jdGlvblRvU3RyaW5nLmNhbGwoaXQpO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0b3JlLmluc3BlY3RTb3VyY2U7XG4iLCJ2YXIgTkFUSVZFX1dFQUtfTUFQID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL25hdGl2ZS13ZWFrLW1hcCcpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcbnZhciBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLW5vbi1lbnVtZXJhYmxlLXByb3BlcnR5Jyk7XG52YXIgb2JqZWN0SGFzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xudmFyIHNoYXJlZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQtc3RvcmUnKTtcbnZhciBzaGFyZWRLZXkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkLWtleScpO1xudmFyIGhpZGRlbktleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGlkZGVuLWtleXMnKTtcblxudmFyIE9CSkVDVF9BTFJFQURZX0lOSVRJQUxJWkVEID0gJ09iamVjdCBhbHJlYWR5IGluaXRpYWxpemVkJztcbnZhciBXZWFrTWFwID0gZ2xvYmFsLldlYWtNYXA7XG52YXIgc2V0LCBnZXQsIGhhcztcblxudmFyIGVuZm9yY2UgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGhhcyhpdCkgPyBnZXQoaXQpIDogc2V0KGl0LCB7fSk7XG59O1xuXG52YXIgZ2V0dGVyRm9yID0gZnVuY3Rpb24gKFRZUEUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChpdCkge1xuICAgIHZhciBzdGF0ZTtcbiAgICBpZiAoIWlzT2JqZWN0KGl0KSB8fCAoc3RhdGUgPSBnZXQoaXQpKS50eXBlICE9PSBUWVBFKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoJ0luY29tcGF0aWJsZSByZWNlaXZlciwgJyArIFRZUEUgKyAnIHJlcXVpcmVkJyk7XG4gICAgfSByZXR1cm4gc3RhdGU7XG4gIH07XG59O1xuXG5pZiAoTkFUSVZFX1dFQUtfTUFQIHx8IHNoYXJlZC5zdGF0ZSkge1xuICB2YXIgc3RvcmUgPSBzaGFyZWQuc3RhdGUgfHwgKHNoYXJlZC5zdGF0ZSA9IG5ldyBXZWFrTWFwKCkpO1xuICB2YXIgd21nZXQgPSBzdG9yZS5nZXQ7XG4gIHZhciB3bWhhcyA9IHN0b3JlLmhhcztcbiAgdmFyIHdtc2V0ID0gc3RvcmUuc2V0O1xuICBzZXQgPSBmdW5jdGlvbiAoaXQsIG1ldGFkYXRhKSB7XG4gICAgaWYgKHdtaGFzLmNhbGwoc3RvcmUsIGl0KSkgdGhyb3cgbmV3IFR5cGVFcnJvcihPQkpFQ1RfQUxSRUFEWV9JTklUSUFMSVpFRCk7XG4gICAgbWV0YWRhdGEuZmFjYWRlID0gaXQ7XG4gICAgd21zZXQuY2FsbChzdG9yZSwgaXQsIG1ldGFkYXRhKTtcbiAgICByZXR1cm4gbWV0YWRhdGE7XG4gIH07XG4gIGdldCA9IGZ1bmN0aW9uIChpdCkge1xuICAgIHJldHVybiB3bWdldC5jYWxsKHN0b3JlLCBpdCkgfHwge307XG4gIH07XG4gIGhhcyA9IGZ1bmN0aW9uIChpdCkge1xuICAgIHJldHVybiB3bWhhcy5jYWxsKHN0b3JlLCBpdCk7XG4gIH07XG59IGVsc2Uge1xuICB2YXIgU1RBVEUgPSBzaGFyZWRLZXkoJ3N0YXRlJyk7XG4gIGhpZGRlbktleXNbU1RBVEVdID0gdHJ1ZTtcbiAgc2V0ID0gZnVuY3Rpb24gKGl0LCBtZXRhZGF0YSkge1xuICAgIGlmIChvYmplY3RIYXMoaXQsIFNUQVRFKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihPQkpFQ1RfQUxSRUFEWV9JTklUSUFMSVpFRCk7XG4gICAgbWV0YWRhdGEuZmFjYWRlID0gaXQ7XG4gICAgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KGl0LCBTVEFURSwgbWV0YWRhdGEpO1xuICAgIHJldHVybiBtZXRhZGF0YTtcbiAgfTtcbiAgZ2V0ID0gZnVuY3Rpb24gKGl0KSB7XG4gICAgcmV0dXJuIG9iamVjdEhhcyhpdCwgU1RBVEUpID8gaXRbU1RBVEVdIDoge307XG4gIH07XG4gIGhhcyA9IGZ1bmN0aW9uIChpdCkge1xuICAgIHJldHVybiBvYmplY3RIYXMoaXQsIFNUQVRFKTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNldDogc2V0LFxuICBnZXQ6IGdldCxcbiAgaGFzOiBoYXMsXG4gIGVuZm9yY2U6IGVuZm9yY2UsXG4gIGdldHRlckZvcjogZ2V0dGVyRm9yXG59O1xuIiwidmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xudmFyIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pdGVyYXRvcnMnKTtcblxudmFyIElURVJBVE9SID0gd2VsbEtub3duU3ltYm9sKCdpdGVyYXRvcicpO1xudmFyIEFycmF5UHJvdG90eXBlID0gQXJyYXkucHJvdG90eXBlO1xuXG4vLyBjaGVjayBvbiBkZWZhdWx0IEFycmF5IGl0ZXJhdG9yXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXQgIT09IHVuZGVmaW5lZCAmJiAoSXRlcmF0b3JzLkFycmF5ID09PSBpdCB8fCBBcnJheVByb3RvdHlwZVtJVEVSQVRPUl0gPT09IGl0KTtcbn07XG4iLCJ2YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jbGFzc29mLXJhdycpO1xuXG4vLyBgSXNBcnJheWAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWlzYXJyYXlcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1hcnJheS1pc2FycmF5IC0tIHNhZmVcbm1vZHVsZS5leHBvcnRzID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiBpc0FycmF5KGFyZykge1xuICByZXR1cm4gY2xhc3NvZihhcmcpID09ICdBcnJheSc7XG59O1xuIiwidmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG5cbnZhciByZXBsYWNlbWVudCA9IC8jfFxcLnByb3RvdHlwZVxcLi87XG5cbnZhciBpc0ZvcmNlZCA9IGZ1bmN0aW9uIChmZWF0dXJlLCBkZXRlY3Rpb24pIHtcbiAgdmFyIHZhbHVlID0gZGF0YVtub3JtYWxpemUoZmVhdHVyZSldO1xuICByZXR1cm4gdmFsdWUgPT0gUE9MWUZJTEwgPyB0cnVlXG4gICAgOiB2YWx1ZSA9PSBOQVRJVkUgPyBmYWxzZVxuICAgIDogdHlwZW9mIGRldGVjdGlvbiA9PSAnZnVuY3Rpb24nID8gZmFpbHMoZGV0ZWN0aW9uKVxuICAgIDogISFkZXRlY3Rpb247XG59O1xuXG52YXIgbm9ybWFsaXplID0gaXNGb3JjZWQubm9ybWFsaXplID0gZnVuY3Rpb24gKHN0cmluZykge1xuICByZXR1cm4gU3RyaW5nKHN0cmluZykucmVwbGFjZShyZXBsYWNlbWVudCwgJy4nKS50b0xvd2VyQ2FzZSgpO1xufTtcblxudmFyIGRhdGEgPSBpc0ZvcmNlZC5kYXRhID0ge307XG52YXIgTkFUSVZFID0gaXNGb3JjZWQuTkFUSVZFID0gJ04nO1xudmFyIFBPTFlGSUxMID0gaXNGb3JjZWQuUE9MWUZJTEwgPSAnUCc7XG5cbm1vZHVsZS5leHBvcnRzID0gaXNGb3JjZWQ7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gdHlwZW9mIGl0ID09PSAnb2JqZWN0JyA/IGl0ICE9PSBudWxsIDogdHlwZW9mIGl0ID09PSAnZnVuY3Rpb24nO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZmFsc2U7XG4iLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG52YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jbGFzc29mLXJhdycpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xuXG52YXIgTUFUQ0ggPSB3ZWxsS25vd25TeW1ib2woJ21hdGNoJyk7XG5cbi8vIGBJc1JlZ0V4cGAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWlzcmVnZXhwXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICB2YXIgaXNSZWdFeHA7XG4gIHJldHVybiBpc09iamVjdChpdCkgJiYgKChpc1JlZ0V4cCA9IGl0W01BVENIXSkgIT09IHVuZGVmaW5lZCA/ICEhaXNSZWdFeHAgOiBjbGFzc29mKGl0KSA9PSAnUmVnRXhwJyk7XG59O1xuIiwidmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xudmFyIGlzQXJyYXlJdGVyYXRvck1ldGhvZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1hcnJheS1pdGVyYXRvci1tZXRob2QnKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1sZW5ndGgnKTtcbnZhciBiaW5kID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLWJpbmQtY29udGV4dCcpO1xudmFyIGdldEl0ZXJhdG9yTWV0aG9kID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dldC1pdGVyYXRvci1tZXRob2QnKTtcbnZhciBpdGVyYXRvckNsb3NlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2l0ZXJhdG9yLWNsb3NlJyk7XG5cbnZhciBSZXN1bHQgPSBmdW5jdGlvbiAoc3RvcHBlZCwgcmVzdWx0KSB7XG4gIHRoaXMuc3RvcHBlZCA9IHN0b3BwZWQ7XG4gIHRoaXMucmVzdWx0ID0gcmVzdWx0O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlcmFibGUsIHVuYm91bmRGdW5jdGlvbiwgb3B0aW9ucykge1xuICB2YXIgdGhhdCA9IG9wdGlvbnMgJiYgb3B0aW9ucy50aGF0O1xuICB2YXIgQVNfRU5UUklFUyA9ICEhKG9wdGlvbnMgJiYgb3B0aW9ucy5BU19FTlRSSUVTKTtcbiAgdmFyIElTX0lURVJBVE9SID0gISEob3B0aW9ucyAmJiBvcHRpb25zLklTX0lURVJBVE9SKTtcbiAgdmFyIElOVEVSUlVQVEVEID0gISEob3B0aW9ucyAmJiBvcHRpb25zLklOVEVSUlVQVEVEKTtcbiAgdmFyIGZuID0gYmluZCh1bmJvdW5kRnVuY3Rpb24sIHRoYXQsIDEgKyBBU19FTlRSSUVTICsgSU5URVJSVVBURUQpO1xuICB2YXIgaXRlcmF0b3IsIGl0ZXJGbiwgaW5kZXgsIGxlbmd0aCwgcmVzdWx0LCBuZXh0LCBzdGVwO1xuXG4gIHZhciBzdG9wID0gZnVuY3Rpb24gKGNvbmRpdGlvbikge1xuICAgIGlmIChpdGVyYXRvcikgaXRlcmF0b3JDbG9zZShpdGVyYXRvcik7XG4gICAgcmV0dXJuIG5ldyBSZXN1bHQodHJ1ZSwgY29uZGl0aW9uKTtcbiAgfTtcblxuICB2YXIgY2FsbEZuID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgaWYgKEFTX0VOVFJJRVMpIHtcbiAgICAgIGFuT2JqZWN0KHZhbHVlKTtcbiAgICAgIHJldHVybiBJTlRFUlJVUFRFRCA/IGZuKHZhbHVlWzBdLCB2YWx1ZVsxXSwgc3RvcCkgOiBmbih2YWx1ZVswXSwgdmFsdWVbMV0pO1xuICAgIH0gcmV0dXJuIElOVEVSUlVQVEVEID8gZm4odmFsdWUsIHN0b3ApIDogZm4odmFsdWUpO1xuICB9O1xuXG4gIGlmIChJU19JVEVSQVRPUikge1xuICAgIGl0ZXJhdG9yID0gaXRlcmFibGU7XG4gIH0gZWxzZSB7XG4gICAgaXRlckZuID0gZ2V0SXRlcmF0b3JNZXRob2QoaXRlcmFibGUpO1xuICAgIGlmICh0eXBlb2YgaXRlckZuICE9ICdmdW5jdGlvbicpIHRocm93IFR5cGVFcnJvcignVGFyZ2V0IGlzIG5vdCBpdGVyYWJsZScpO1xuICAgIC8vIG9wdGltaXNhdGlvbiBmb3IgYXJyYXkgaXRlcmF0b3JzXG4gICAgaWYgKGlzQXJyYXlJdGVyYXRvck1ldGhvZChpdGVyRm4pKSB7XG4gICAgICBmb3IgKGluZGV4ID0gMCwgbGVuZ3RoID0gdG9MZW5ndGgoaXRlcmFibGUubGVuZ3RoKTsgbGVuZ3RoID4gaW5kZXg7IGluZGV4KyspIHtcbiAgICAgICAgcmVzdWx0ID0gY2FsbEZuKGl0ZXJhYmxlW2luZGV4XSk7XG4gICAgICAgIGlmIChyZXN1bHQgJiYgcmVzdWx0IGluc3RhbmNlb2YgUmVzdWx0KSByZXR1cm4gcmVzdWx0O1xuICAgICAgfSByZXR1cm4gbmV3IFJlc3VsdChmYWxzZSk7XG4gICAgfVxuICAgIGl0ZXJhdG9yID0gaXRlckZuLmNhbGwoaXRlcmFibGUpO1xuICB9XG5cbiAgbmV4dCA9IGl0ZXJhdG9yLm5leHQ7XG4gIHdoaWxlICghKHN0ZXAgPSBuZXh0LmNhbGwoaXRlcmF0b3IpKS5kb25lKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJlc3VsdCA9IGNhbGxGbihzdGVwLnZhbHVlKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgaXRlcmF0b3JDbG9zZShpdGVyYXRvcik7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiByZXN1bHQgPT0gJ29iamVjdCcgJiYgcmVzdWx0ICYmIHJlc3VsdCBpbnN0YW5jZW9mIFJlc3VsdCkgcmV0dXJuIHJlc3VsdDtcbiAgfSByZXR1cm4gbmV3IFJlc3VsdChmYWxzZSk7XG59O1xuIiwidmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVyYXRvcikge1xuICB2YXIgcmV0dXJuTWV0aG9kID0gaXRlcmF0b3JbJ3JldHVybiddO1xuICBpZiAocmV0dXJuTWV0aG9kICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gYW5PYmplY3QocmV0dXJuTWV0aG9kLmNhbGwoaXRlcmF0b3IpKS52YWx1ZTtcbiAgfVxufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIGdldFByb3RvdHlwZU9mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtcHJvdG90eXBlLW9mJyk7XG52YXIgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1ub24tZW51bWVyYWJsZS1wcm9wZXJ0eScpO1xudmFyIGhhcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMnKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcbnZhciBJU19QVVJFID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLXB1cmUnKTtcblxudmFyIElURVJBVE9SID0gd2VsbEtub3duU3ltYm9sKCdpdGVyYXRvcicpO1xudmFyIEJVR0dZX1NBRkFSSV9JVEVSQVRPUlMgPSBmYWxzZTtcblxudmFyIHJldHVyblRoaXMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9O1xuXG4vLyBgJUl0ZXJhdG9yUHJvdG90eXBlJWAgb2JqZWN0XG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLSVpdGVyYXRvcnByb3RvdHlwZSUtb2JqZWN0XG52YXIgSXRlcmF0b3JQcm90b3R5cGUsIFByb3RvdHlwZU9mQXJyYXlJdGVyYXRvclByb3RvdHlwZSwgYXJyYXlJdGVyYXRvcjtcblxuLyogZXNsaW50LWRpc2FibGUgZXMvbm8tYXJyYXktcHJvdG90eXBlLWtleXMgLS0gc2FmZSAqL1xuaWYgKFtdLmtleXMpIHtcbiAgYXJyYXlJdGVyYXRvciA9IFtdLmtleXMoKTtcbiAgLy8gU2FmYXJpIDggaGFzIGJ1Z2d5IGl0ZXJhdG9ycyB3L28gYG5leHRgXG4gIGlmICghKCduZXh0JyBpbiBhcnJheUl0ZXJhdG9yKSkgQlVHR1lfU0FGQVJJX0lURVJBVE9SUyA9IHRydWU7XG4gIGVsc2Uge1xuICAgIFByb3RvdHlwZU9mQXJyYXlJdGVyYXRvclByb3RvdHlwZSA9IGdldFByb3RvdHlwZU9mKGdldFByb3RvdHlwZU9mKGFycmF5SXRlcmF0b3IpKTtcbiAgICBpZiAoUHJvdG90eXBlT2ZBcnJheUl0ZXJhdG9yUHJvdG90eXBlICE9PSBPYmplY3QucHJvdG90eXBlKSBJdGVyYXRvclByb3RvdHlwZSA9IFByb3RvdHlwZU9mQXJyYXlJdGVyYXRvclByb3RvdHlwZTtcbiAgfVxufVxuXG52YXIgTkVXX0lURVJBVE9SX1BST1RPVFlQRSA9IEl0ZXJhdG9yUHJvdG90eXBlID09IHVuZGVmaW5lZCB8fCBmYWlscyhmdW5jdGlvbiAoKSB7XG4gIHZhciB0ZXN0ID0ge307XG4gIC8vIEZGNDQtIGxlZ2FjeSBpdGVyYXRvcnMgY2FzZVxuICByZXR1cm4gSXRlcmF0b3JQcm90b3R5cGVbSVRFUkFUT1JdLmNhbGwodGVzdCkgIT09IHRlc3Q7XG59KTtcblxuaWYgKE5FV19JVEVSQVRPUl9QUk9UT1RZUEUpIEl0ZXJhdG9yUHJvdG90eXBlID0ge307XG5cbi8vIGAlSXRlcmF0b3JQcm90b3R5cGUlW0BAaXRlcmF0b3JdKClgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy0laXRlcmF0b3Jwcm90b3R5cGUlLUBAaXRlcmF0b3JcbmlmICgoIUlTX1BVUkUgfHwgTkVXX0lURVJBVE9SX1BST1RPVFlQRSkgJiYgIWhhcyhJdGVyYXRvclByb3RvdHlwZSwgSVRFUkFUT1IpKSB7XG4gIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eShJdGVyYXRvclByb3RvdHlwZSwgSVRFUkFUT1IsIHJldHVyblRoaXMpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgSXRlcmF0b3JQcm90b3R5cGU6IEl0ZXJhdG9yUHJvdG90eXBlLFxuICBCVUdHWV9TQUZBUklfSVRFUkFUT1JTOiBCVUdHWV9TQUZBUklfSVRFUkFUT1JTXG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7fTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3InKS5mO1xudmFyIG1hY3JvdGFzayA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90YXNrJykuc2V0O1xudmFyIElTX0lPUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbmdpbmUtaXMtaW9zJyk7XG52YXIgSVNfV0VCT1NfV0VCS0lUID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2VuZ2luZS1pcy13ZWJvcy13ZWJraXQnKTtcbnZhciBJU19OT0RFID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2VuZ2luZS1pcy1ub2RlJyk7XG5cbnZhciBNdXRhdGlvbk9ic2VydmVyID0gZ2xvYmFsLk11dGF0aW9uT2JzZXJ2ZXIgfHwgZ2xvYmFsLldlYktpdE11dGF0aW9uT2JzZXJ2ZXI7XG52YXIgZG9jdW1lbnQgPSBnbG9iYWwuZG9jdW1lbnQ7XG52YXIgcHJvY2VzcyA9IGdsb2JhbC5wcm9jZXNzO1xudmFyIFByb21pc2UgPSBnbG9iYWwuUHJvbWlzZTtcbi8vIE5vZGUuanMgMTEgc2hvd3MgRXhwZXJpbWVudGFsV2FybmluZyBvbiBnZXR0aW5nIGBxdWV1ZU1pY3JvdGFza2BcbnZhciBxdWV1ZU1pY3JvdGFza0Rlc2NyaXB0b3IgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoZ2xvYmFsLCAncXVldWVNaWNyb3Rhc2snKTtcbnZhciBxdWV1ZU1pY3JvdGFzayA9IHF1ZXVlTWljcm90YXNrRGVzY3JpcHRvciAmJiBxdWV1ZU1pY3JvdGFza0Rlc2NyaXB0b3IudmFsdWU7XG5cbnZhciBmbHVzaCwgaGVhZCwgbGFzdCwgbm90aWZ5LCB0b2dnbGUsIG5vZGUsIHByb21pc2UsIHRoZW47XG5cbi8vIG1vZGVybiBlbmdpbmVzIGhhdmUgcXVldWVNaWNyb3Rhc2sgbWV0aG9kXG5pZiAoIXF1ZXVlTWljcm90YXNrKSB7XG4gIGZsdXNoID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBwYXJlbnQsIGZuO1xuICAgIGlmIChJU19OT0RFICYmIChwYXJlbnQgPSBwcm9jZXNzLmRvbWFpbikpIHBhcmVudC5leGl0KCk7XG4gICAgd2hpbGUgKGhlYWQpIHtcbiAgICAgIGZuID0gaGVhZC5mbjtcbiAgICAgIGhlYWQgPSBoZWFkLm5leHQ7XG4gICAgICB0cnkge1xuICAgICAgICBmbigpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgaWYgKGhlYWQpIG5vdGlmeSgpO1xuICAgICAgICBlbHNlIGxhc3QgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRocm93IGVycm9yO1xuICAgICAgfVxuICAgIH0gbGFzdCA9IHVuZGVmaW5lZDtcbiAgICBpZiAocGFyZW50KSBwYXJlbnQuZW50ZXIoKTtcbiAgfTtcblxuICAvLyBicm93c2VycyB3aXRoIE11dGF0aW9uT2JzZXJ2ZXIsIGV4Y2VwdCBpT1MgLSBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvMzM5XG4gIC8vIGFsc28gZXhjZXB0IFdlYk9TIFdlYmtpdCBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvODk4XG4gIGlmICghSVNfSU9TICYmICFJU19OT0RFICYmICFJU19XRUJPU19XRUJLSVQgJiYgTXV0YXRpb25PYnNlcnZlciAmJiBkb2N1bWVudCkge1xuICAgIHRvZ2dsZSA9IHRydWU7XG4gICAgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcnKTtcbiAgICBuZXcgTXV0YXRpb25PYnNlcnZlcihmbHVzaCkub2JzZXJ2ZShub2RlLCB7IGNoYXJhY3RlckRhdGE6IHRydWUgfSk7XG4gICAgbm90aWZ5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgbm9kZS5kYXRhID0gdG9nZ2xlID0gIXRvZ2dsZTtcbiAgICB9O1xuICAvLyBlbnZpcm9ubWVudHMgd2l0aCBtYXliZSBub24tY29tcGxldGVseSBjb3JyZWN0LCBidXQgZXhpc3RlbnQgUHJvbWlzZVxuICB9IGVsc2UgaWYgKFByb21pc2UgJiYgUHJvbWlzZS5yZXNvbHZlKSB7XG4gICAgLy8gUHJvbWlzZS5yZXNvbHZlIHdpdGhvdXQgYW4gYXJndW1lbnQgdGhyb3dzIGFuIGVycm9yIGluIExHIFdlYk9TIDJcbiAgICBwcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKHVuZGVmaW5lZCk7XG4gICAgLy8gd29ya2Fyb3VuZCBvZiBXZWJLaXQgfiBpT1MgU2FmYXJpIDEwLjEgYnVnXG4gICAgcHJvbWlzZS5jb25zdHJ1Y3RvciA9IFByb21pc2U7XG4gICAgdGhlbiA9IHByb21pc2UudGhlbjtcbiAgICBub3RpZnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGVuLmNhbGwocHJvbWlzZSwgZmx1c2gpO1xuICAgIH07XG4gIC8vIE5vZGUuanMgd2l0aG91dCBwcm9taXNlc1xuICB9IGVsc2UgaWYgKElTX05PREUpIHtcbiAgICBub3RpZnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBwcm9jZXNzLm5leHRUaWNrKGZsdXNoKTtcbiAgICB9O1xuICAvLyBmb3Igb3RoZXIgZW52aXJvbm1lbnRzIC0gbWFjcm90YXNrIGJhc2VkIG9uOlxuICAvLyAtIHNldEltbWVkaWF0ZVxuICAvLyAtIE1lc3NhZ2VDaGFubmVsXG4gIC8vIC0gd2luZG93LnBvc3RNZXNzYWdcbiAgLy8gLSBvbnJlYWR5c3RhdGVjaGFuZ2VcbiAgLy8gLSBzZXRUaW1lb3V0XG4gIH0gZWxzZSB7XG4gICAgbm90aWZ5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgLy8gc3RyYW5nZSBJRSArIHdlYnBhY2sgZGV2IHNlcnZlciBidWcgLSB1c2UgLmNhbGwoZ2xvYmFsKVxuICAgICAgbWFjcm90YXNrLmNhbGwoZ2xvYmFsLCBmbHVzaCk7XG4gICAgfTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHF1ZXVlTWljcm90YXNrIHx8IGZ1bmN0aW9uIChmbikge1xuICB2YXIgdGFzayA9IHsgZm46IGZuLCBuZXh0OiB1bmRlZmluZWQgfTtcbiAgaWYgKGxhc3QpIGxhc3QubmV4dCA9IHRhc2s7XG4gIGlmICghaGVhZCkge1xuICAgIGhlYWQgPSB0YXNrO1xuICAgIG5vdGlmeSgpO1xuICB9IGxhc3QgPSB0YXNrO1xufTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZ2xvYmFsLlByb21pc2U7XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBlcy9uby1zeW1ib2wgLS0gcmVxdWlyZWQgZm9yIHRlc3RpbmcgKi9cbnZhciBWOF9WRVJTSU9OID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2VuZ2luZS12OC12ZXJzaW9uJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLW9iamVjdC1nZXRvd25wcm9wZXJ0eXN5bWJvbHMgLS0gcmVxdWlyZWQgZm9yIHRlc3Rpbmdcbm1vZHVsZS5leHBvcnRzID0gISFPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzICYmICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gIHZhciBzeW1ib2wgPSBTeW1ib2woKTtcbiAgLy8gQ2hyb21lIDM4IFN5bWJvbCBoYXMgaW5jb3JyZWN0IHRvU3RyaW5nIGNvbnZlcnNpb25cbiAgLy8gYGdldC1vd24tcHJvcGVydHktc3ltYm9sc2AgcG9seWZpbGwgc3ltYm9scyBjb252ZXJ0ZWQgdG8gb2JqZWN0IGFyZSBub3QgU3ltYm9sIGluc3RhbmNlc1xuICByZXR1cm4gIVN0cmluZyhzeW1ib2wpIHx8ICEoT2JqZWN0KHN5bWJvbCkgaW5zdGFuY2VvZiBTeW1ib2wpIHx8XG4gICAgLy8gQ2hyb21lIDM4LTQwIHN5bWJvbHMgYXJlIG5vdCBpbmhlcml0ZWQgZnJvbSBET00gY29sbGVjdGlvbnMgcHJvdG90eXBlcyB0byBpbnN0YW5jZXNcbiAgICAhU3ltYm9sLnNoYW0gJiYgVjhfVkVSU0lPTiAmJiBWOF9WRVJTSU9OIDwgNDE7XG59KTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgaW5zcGVjdFNvdXJjZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbnNwZWN0LXNvdXJjZScpO1xuXG52YXIgV2Vha01hcCA9IGdsb2JhbC5XZWFrTWFwO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHR5cGVvZiBXZWFrTWFwID09PSAnZnVuY3Rpb24nICYmIC9uYXRpdmUgY29kZS8udGVzdChpbnNwZWN0U291cmNlKFdlYWtNYXApKTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYS1mdW5jdGlvbicpO1xuXG52YXIgUHJvbWlzZUNhcGFiaWxpdHkgPSBmdW5jdGlvbiAoQykge1xuICB2YXIgcmVzb2x2ZSwgcmVqZWN0O1xuICB0aGlzLnByb21pc2UgPSBuZXcgQyhmdW5jdGlvbiAoJCRyZXNvbHZlLCAkJHJlamVjdCkge1xuICAgIGlmIChyZXNvbHZlICE9PSB1bmRlZmluZWQgfHwgcmVqZWN0ICE9PSB1bmRlZmluZWQpIHRocm93IFR5cGVFcnJvcignQmFkIFByb21pc2UgY29uc3RydWN0b3InKTtcbiAgICByZXNvbHZlID0gJCRyZXNvbHZlO1xuICAgIHJlamVjdCA9ICQkcmVqZWN0O1xuICB9KTtcbiAgdGhpcy5yZXNvbHZlID0gYUZ1bmN0aW9uKHJlc29sdmUpO1xuICB0aGlzLnJlamVjdCA9IGFGdW5jdGlvbihyZWplY3QpO1xufTtcblxuLy8gYE5ld1Byb21pc2VDYXBhYmlsaXR5YCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtbmV3cHJvbWlzZWNhcGFiaWxpdHlcbm1vZHVsZS5leHBvcnRzLmYgPSBmdW5jdGlvbiAoQykge1xuICByZXR1cm4gbmV3IFByb21pc2VDYXBhYmlsaXR5KEMpO1xufTtcbiIsInZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1vYmplY3QnKTtcbnZhciBkZWZpbmVQcm9wZXJ0aWVzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydGllcycpO1xudmFyIGVudW1CdWdLZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2VudW0tYnVnLWtleXMnKTtcbnZhciBoaWRkZW5LZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hpZGRlbi1rZXlzJyk7XG52YXIgaHRtbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9odG1sJyk7XG52YXIgZG9jdW1lbnRDcmVhdGVFbGVtZW50ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RvY3VtZW50LWNyZWF0ZS1lbGVtZW50Jyk7XG52YXIgc2hhcmVkS2V5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NoYXJlZC1rZXknKTtcblxudmFyIEdUID0gJz4nO1xudmFyIExUID0gJzwnO1xudmFyIFBST1RPVFlQRSA9ICdwcm90b3R5cGUnO1xudmFyIFNDUklQVCA9ICdzY3JpcHQnO1xudmFyIElFX1BST1RPID0gc2hhcmVkS2V5KCdJRV9QUk9UTycpO1xuXG52YXIgRW1wdHlDb25zdHJ1Y3RvciA9IGZ1bmN0aW9uICgpIHsgLyogZW1wdHkgKi8gfTtcblxudmFyIHNjcmlwdFRhZyA9IGZ1bmN0aW9uIChjb250ZW50KSB7XG4gIHJldHVybiBMVCArIFNDUklQVCArIEdUICsgY29udGVudCArIExUICsgJy8nICsgU0NSSVBUICsgR1Q7XG59O1xuXG4vLyBDcmVhdGUgb2JqZWN0IHdpdGggZmFrZSBgbnVsbGAgcHJvdG90eXBlOiB1c2UgQWN0aXZlWCBPYmplY3Qgd2l0aCBjbGVhcmVkIHByb3RvdHlwZVxudmFyIE51bGxQcm90b09iamVjdFZpYUFjdGl2ZVggPSBmdW5jdGlvbiAoYWN0aXZlWERvY3VtZW50KSB7XG4gIGFjdGl2ZVhEb2N1bWVudC53cml0ZShzY3JpcHRUYWcoJycpKTtcbiAgYWN0aXZlWERvY3VtZW50LmNsb3NlKCk7XG4gIHZhciB0ZW1wID0gYWN0aXZlWERvY3VtZW50LnBhcmVudFdpbmRvdy5PYmplY3Q7XG4gIGFjdGl2ZVhEb2N1bWVudCA9IG51bGw7IC8vIGF2b2lkIG1lbW9yeSBsZWFrXG4gIHJldHVybiB0ZW1wO1xufTtcblxuLy8gQ3JlYXRlIG9iamVjdCB3aXRoIGZha2UgYG51bGxgIHByb3RvdHlwZTogdXNlIGlmcmFtZSBPYmplY3Qgd2l0aCBjbGVhcmVkIHByb3RvdHlwZVxudmFyIE51bGxQcm90b09iamVjdFZpYUlGcmFtZSA9IGZ1bmN0aW9uICgpIHtcbiAgLy8gVGhyYXNoLCB3YXN0ZSBhbmQgc29kb215OiBJRSBHQyBidWdcbiAgdmFyIGlmcmFtZSA9IGRvY3VtZW50Q3JlYXRlRWxlbWVudCgnaWZyYW1lJyk7XG4gIHZhciBKUyA9ICdqYXZhJyArIFNDUklQVCArICc6JztcbiAgdmFyIGlmcmFtZURvY3VtZW50O1xuICBpZnJhbWUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgaHRtbC5hcHBlbmRDaGlsZChpZnJhbWUpO1xuICAvLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvNDc1XG4gIGlmcmFtZS5zcmMgPSBTdHJpbmcoSlMpO1xuICBpZnJhbWVEb2N1bWVudCA9IGlmcmFtZS5jb250ZW50V2luZG93LmRvY3VtZW50O1xuICBpZnJhbWVEb2N1bWVudC5vcGVuKCk7XG4gIGlmcmFtZURvY3VtZW50LndyaXRlKHNjcmlwdFRhZygnZG9jdW1lbnQuRj1PYmplY3QnKSk7XG4gIGlmcmFtZURvY3VtZW50LmNsb3NlKCk7XG4gIHJldHVybiBpZnJhbWVEb2N1bWVudC5GO1xufTtcblxuLy8gQ2hlY2sgZm9yIGRvY3VtZW50LmRvbWFpbiBhbmQgYWN0aXZlIHggc3VwcG9ydFxuLy8gTm8gbmVlZCB0byB1c2UgYWN0aXZlIHggYXBwcm9hY2ggd2hlbiBkb2N1bWVudC5kb21haW4gaXMgbm90IHNldFxuLy8gc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9lcy1zaGltcy9lczUtc2hpbS9pc3N1ZXMvMTUwXG4vLyB2YXJpYXRpb24gb2YgaHR0cHM6Ly9naXRodWIuY29tL2tpdGNhbWJyaWRnZS9lczUtc2hpbS9jb21taXQvNGY3MzhhYzA2NjM0NlxuLy8gYXZvaWQgSUUgR0MgYnVnXG52YXIgYWN0aXZlWERvY3VtZW50O1xudmFyIE51bGxQcm90b09iamVjdCA9IGZ1bmN0aW9uICgpIHtcbiAgdHJ5IHtcbiAgICAvKiBnbG9iYWwgQWN0aXZlWE9iamVjdCAtLSBvbGQgSUUgKi9cbiAgICBhY3RpdmVYRG9jdW1lbnQgPSBkb2N1bWVudC5kb21haW4gJiYgbmV3IEFjdGl2ZVhPYmplY3QoJ2h0bWxmaWxlJyk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7IC8qIGlnbm9yZSAqLyB9XG4gIE51bGxQcm90b09iamVjdCA9IGFjdGl2ZVhEb2N1bWVudCA/IE51bGxQcm90b09iamVjdFZpYUFjdGl2ZVgoYWN0aXZlWERvY3VtZW50KSA6IE51bGxQcm90b09iamVjdFZpYUlGcmFtZSgpO1xuICB2YXIgbGVuZ3RoID0gZW51bUJ1Z0tleXMubGVuZ3RoO1xuICB3aGlsZSAobGVuZ3RoLS0pIGRlbGV0ZSBOdWxsUHJvdG9PYmplY3RbUFJPVE9UWVBFXVtlbnVtQnVnS2V5c1tsZW5ndGhdXTtcbiAgcmV0dXJuIE51bGxQcm90b09iamVjdCgpO1xufTtcblxuaGlkZGVuS2V5c1tJRV9QUk9UT10gPSB0cnVlO1xuXG4vLyBgT2JqZWN0LmNyZWF0ZWAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5jcmVhdGVcbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmNyZWF0ZSB8fCBmdW5jdGlvbiBjcmVhdGUoTywgUHJvcGVydGllcykge1xuICB2YXIgcmVzdWx0O1xuICBpZiAoTyAhPT0gbnVsbCkge1xuICAgIEVtcHR5Q29uc3RydWN0b3JbUFJPVE9UWVBFXSA9IGFuT2JqZWN0KE8pO1xuICAgIHJlc3VsdCA9IG5ldyBFbXB0eUNvbnN0cnVjdG9yKCk7XG4gICAgRW1wdHlDb25zdHJ1Y3RvcltQUk9UT1RZUEVdID0gbnVsbDtcbiAgICAvLyBhZGQgXCJfX3Byb3RvX19cIiBmb3IgT2JqZWN0LmdldFByb3RvdHlwZU9mIHBvbHlmaWxsXG4gICAgcmVzdWx0W0lFX1BST1RPXSA9IE87XG4gIH0gZWxzZSByZXN1bHQgPSBOdWxsUHJvdG9PYmplY3QoKTtcbiAgcmV0dXJuIFByb3BlcnRpZXMgPT09IHVuZGVmaW5lZCA/IHJlc3VsdCA6IGRlZmluZVByb3BlcnRpZXMocmVzdWx0LCBQcm9wZXJ0aWVzKTtcbn07XG4iLCJ2YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBkZWZpbmVQcm9wZXJ0eU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5Jyk7XG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4tb2JqZWN0Jyk7XG52YXIgb2JqZWN0S2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3Qta2V5cycpO1xuXG4vLyBgT2JqZWN0LmRlZmluZVByb3BlcnRpZXNgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3QuZGVmaW5lcHJvcGVydGllc1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLW9iamVjdC1kZWZpbmVwcm9wZXJ0aWVzIC0tIHNhZmVcbm1vZHVsZS5leHBvcnRzID0gREVTQ1JJUFRPUlMgPyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyA6IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXMoTywgUHJvcGVydGllcykge1xuICBhbk9iamVjdChPKTtcbiAgdmFyIGtleXMgPSBvYmplY3RLZXlzKFByb3BlcnRpZXMpO1xuICB2YXIgbGVuZ3RoID0ga2V5cy5sZW5ndGg7XG4gIHZhciBpbmRleCA9IDA7XG4gIHZhciBrZXk7XG4gIHdoaWxlIChsZW5ndGggPiBpbmRleCkgZGVmaW5lUHJvcGVydHlNb2R1bGUuZihPLCBrZXkgPSBrZXlzW2luZGV4KytdLCBQcm9wZXJ0aWVzW2tleV0pO1xuICByZXR1cm4gTztcbn07XG4iLCJ2YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBJRThfRE9NX0RFRklORSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pZTgtZG9tLWRlZmluZScpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xudmFyIHRvUHJpbWl0aXZlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLXByaW1pdGl2ZScpO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tb2JqZWN0LWRlZmluZXByb3BlcnR5IC0tIHNhZmVcbnZhciAkZGVmaW5lUHJvcGVydHkgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG5cbi8vIGBPYmplY3QuZGVmaW5lUHJvcGVydHlgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3QuZGVmaW5lcHJvcGVydHlcbmV4cG9ydHMuZiA9IERFU0NSSVBUT1JTID8gJGRlZmluZVByb3BlcnR5IDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcykge1xuICBhbk9iamVjdChPKTtcbiAgUCA9IHRvUHJpbWl0aXZlKFAsIHRydWUpO1xuICBhbk9iamVjdChBdHRyaWJ1dGVzKTtcbiAgaWYgKElFOF9ET01fREVGSU5FKSB0cnkge1xuICAgIHJldHVybiAkZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcyk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7IC8qIGVtcHR5ICovIH1cbiAgaWYgKCdnZXQnIGluIEF0dHJpYnV0ZXMgfHwgJ3NldCcgaW4gQXR0cmlidXRlcykgdGhyb3cgVHlwZUVycm9yKCdBY2Nlc3NvcnMgbm90IHN1cHBvcnRlZCcpO1xuICBpZiAoJ3ZhbHVlJyBpbiBBdHRyaWJ1dGVzKSBPW1BdID0gQXR0cmlidXRlcy52YWx1ZTtcbiAgcmV0dXJuIE87XG59O1xuIiwidmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgcHJvcGVydHlJc0VudW1lcmFibGVNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LXByb3BlcnR5LWlzLWVudW1lcmFibGUnKTtcbnZhciBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLXByb3BlcnR5LWRlc2NyaXB0b3InKTtcbnZhciB0b0luZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW5kZXhlZC1vYmplY3QnKTtcbnZhciB0b1ByaW1pdGl2ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1wcmltaXRpdmUnKTtcbnZhciBoYXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzJyk7XG52YXIgSUU4X0RPTV9ERUZJTkUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaWU4LWRvbS1kZWZpbmUnKTtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLW9iamVjdC1nZXRvd25wcm9wZXJ0eWRlc2NyaXB0b3IgLS0gc2FmZVxudmFyICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xuXG4vLyBgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcmAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5nZXRvd25wcm9wZXJ0eWRlc2NyaXB0b3JcbmV4cG9ydHMuZiA9IERFU0NSSVBUT1JTID8gJGdldE93blByb3BlcnR5RGVzY3JpcHRvciA6IGZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihPLCBQKSB7XG4gIE8gPSB0b0luZGV4ZWRPYmplY3QoTyk7XG4gIFAgPSB0b1ByaW1pdGl2ZShQLCB0cnVlKTtcbiAgaWYgKElFOF9ET01fREVGSU5FKSB0cnkge1xuICAgIHJldHVybiAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE8sIFApO1xuICB9IGNhdGNoIChlcnJvcikgeyAvKiBlbXB0eSAqLyB9XG4gIGlmIChoYXMoTywgUCkpIHJldHVybiBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IoIXByb3BlcnR5SXNFbnVtZXJhYmxlTW9kdWxlLmYuY2FsbChPLCBQKSwgT1tQXSk7XG59O1xuIiwiLyogZXNsaW50LWRpc2FibGUgZXMvbm8tb2JqZWN0LWdldG93bnByb3BlcnR5bmFtZXMgLS0gc2FmZSAqL1xudmFyIHRvSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbmRleGVkLW9iamVjdCcpO1xudmFyICRnZXRPd25Qcm9wZXJ0eU5hbWVzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LW5hbWVzJykuZjtcblxudmFyIHRvU3RyaW5nID0ge30udG9TdHJpbmc7XG5cbnZhciB3aW5kb3dOYW1lcyA9IHR5cGVvZiB3aW5kb3cgPT0gJ29iamVjdCcgJiYgd2luZG93ICYmIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzXG4gID8gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMod2luZG93KSA6IFtdO1xuXG52YXIgZ2V0V2luZG93TmFtZXMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gJGdldE93blByb3BlcnR5TmFtZXMoaXQpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiB3aW5kb3dOYW1lcy5zbGljZSgpO1xuICB9XG59O1xuXG4vLyBmYWxsYmFjayBmb3IgSUUxMSBidWdneSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyB3aXRoIGlmcmFtZSBhbmQgd2luZG93XG5tb2R1bGUuZXhwb3J0cy5mID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlOYW1lcyhpdCkge1xuICByZXR1cm4gd2luZG93TmFtZXMgJiYgdG9TdHJpbmcuY2FsbChpdCkgPT0gJ1tvYmplY3QgV2luZG93XSdcbiAgICA/IGdldFdpbmRvd05hbWVzKGl0KVxuICAgIDogJGdldE93blByb3BlcnR5TmFtZXModG9JbmRleGVkT2JqZWN0KGl0KSk7XG59O1xuIiwidmFyIGludGVybmFsT2JqZWN0S2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3Qta2V5cy1pbnRlcm5hbCcpO1xudmFyIGVudW1CdWdLZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2VudW0tYnVnLWtleXMnKTtcblxudmFyIGhpZGRlbktleXMgPSBlbnVtQnVnS2V5cy5jb25jYXQoJ2xlbmd0aCcsICdwcm90b3R5cGUnKTtcblxuLy8gYE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LmdldG93bnByb3BlcnR5bmFtZXNcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1vYmplY3QtZ2V0b3ducHJvcGVydHluYW1lcyAtLSBzYWZlXG5leHBvcnRzLmYgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyB8fCBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eU5hbWVzKE8pIHtcbiAgcmV0dXJuIGludGVybmFsT2JqZWN0S2V5cyhPLCBoaWRkZW5LZXlzKTtcbn07XG4iLCIvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tb2JqZWN0LWdldG93bnByb3BlcnR5c3ltYm9scyAtLSBzYWZlXG5leHBvcnRzLmYgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xuIiwidmFyIGhhcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1vYmplY3QnKTtcbnZhciBzaGFyZWRLZXkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkLWtleScpO1xudmFyIENPUlJFQ1RfUFJPVE9UWVBFX0dFVFRFUiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jb3JyZWN0LXByb3RvdHlwZS1nZXR0ZXInKTtcblxudmFyIElFX1BST1RPID0gc2hhcmVkS2V5KCdJRV9QUk9UTycpO1xudmFyIE9iamVjdFByb3RvdHlwZSA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8vIGBPYmplY3QuZ2V0UHJvdG90eXBlT2ZgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3QuZ2V0cHJvdG90eXBlb2Zcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1vYmplY3QtZ2V0cHJvdG90eXBlb2YgLS0gc2FmZVxubW9kdWxlLmV4cG9ydHMgPSBDT1JSRUNUX1BST1RPVFlQRV9HRVRURVIgPyBPYmplY3QuZ2V0UHJvdG90eXBlT2YgOiBmdW5jdGlvbiAoTykge1xuICBPID0gdG9PYmplY3QoTyk7XG4gIGlmIChoYXMoTywgSUVfUFJPVE8pKSByZXR1cm4gT1tJRV9QUk9UT107XG4gIGlmICh0eXBlb2YgTy5jb25zdHJ1Y3RvciA9PSAnZnVuY3Rpb24nICYmIE8gaW5zdGFuY2VvZiBPLmNvbnN0cnVjdG9yKSB7XG4gICAgcmV0dXJuIE8uY29uc3RydWN0b3IucHJvdG90eXBlO1xuICB9IHJldHVybiBPIGluc3RhbmNlb2YgT2JqZWN0ID8gT2JqZWN0UHJvdG90eXBlIDogbnVsbDtcbn07XG4iLCJ2YXIgaGFzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xudmFyIHRvSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbmRleGVkLW9iamVjdCcpO1xudmFyIGluZGV4T2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktaW5jbHVkZXMnKS5pbmRleE9mO1xudmFyIGhpZGRlbktleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGlkZGVuLWtleXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqZWN0LCBuYW1lcykge1xuICB2YXIgTyA9IHRvSW5kZXhlZE9iamVjdChvYmplY3QpO1xuICB2YXIgaSA9IDA7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgdmFyIGtleTtcbiAgZm9yIChrZXkgaW4gTykgIWhhcyhoaWRkZW5LZXlzLCBrZXkpICYmIGhhcyhPLCBrZXkpICYmIHJlc3VsdC5wdXNoKGtleSk7XG4gIC8vIERvbid0IGVudW0gYnVnICYgaGlkZGVuIGtleXNcbiAgd2hpbGUgKG5hbWVzLmxlbmd0aCA+IGkpIGlmIChoYXMoTywga2V5ID0gbmFtZXNbaSsrXSkpIHtcbiAgICB+aW5kZXhPZihyZXN1bHQsIGtleSkgfHwgcmVzdWx0LnB1c2goa2V5KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufTtcbiIsInZhciBpbnRlcm5hbE9iamVjdEtleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWtleXMtaW50ZXJuYWwnKTtcbnZhciBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbnVtLWJ1Zy1rZXlzJyk7XG5cbi8vIGBPYmplY3Qua2V5c2AgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5rZXlzXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tb2JqZWN0LWtleXMgLS0gc2FmZVxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3Qua2V5cyB8fCBmdW5jdGlvbiBrZXlzKE8pIHtcbiAgcmV0dXJuIGludGVybmFsT2JqZWN0S2V5cyhPLCBlbnVtQnVnS2V5cyk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICRwcm9wZXJ0eUlzRW51bWVyYWJsZSA9IHt9LnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLW9iamVjdC1nZXRvd25wcm9wZXJ0eWRlc2NyaXB0b3IgLS0gc2FmZVxudmFyIGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG5cbi8vIE5hc2hvcm4gfiBKREs4IGJ1Z1xudmFyIE5BU0hPUk5fQlVHID0gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yICYmICEkcHJvcGVydHlJc0VudW1lcmFibGUuY2FsbCh7IDE6IDIgfSwgMSk7XG5cbi8vIGBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlYCBtZXRob2QgaW1wbGVtZW50YXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eWlzZW51bWVyYWJsZVxuZXhwb3J0cy5mID0gTkFTSE9STl9CVUcgPyBmdW5jdGlvbiBwcm9wZXJ0eUlzRW51bWVyYWJsZShWKSB7XG4gIHZhciBkZXNjcmlwdG9yID0gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRoaXMsIFYpO1xuICByZXR1cm4gISFkZXNjcmlwdG9yICYmIGRlc2NyaXB0b3IuZW51bWVyYWJsZTtcbn0gOiAkcHJvcGVydHlJc0VudW1lcmFibGU7XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1wcm90byAtLSBzYWZlICovXG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4tb2JqZWN0Jyk7XG52YXIgYVBvc3NpYmxlUHJvdG90eXBlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2EtcG9zc2libGUtcHJvdG90eXBlJyk7XG5cbi8vIGBPYmplY3Quc2V0UHJvdG90eXBlT2ZgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3Quc2V0cHJvdG90eXBlb2Zcbi8vIFdvcmtzIHdpdGggX19wcm90b19fIG9ubHkuIE9sZCB2OCBjYW4ndCB3b3JrIHdpdGggbnVsbCBwcm90byBvYmplY3RzLlxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLW9iamVjdC1zZXRwcm90b3R5cGVvZiAtLSBzYWZlXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fCAoJ19fcHJvdG9fXycgaW4ge30gPyBmdW5jdGlvbiAoKSB7XG4gIHZhciBDT1JSRUNUX1NFVFRFUiA9IGZhbHNlO1xuICB2YXIgdGVzdCA9IHt9O1xuICB2YXIgc2V0dGVyO1xuICB0cnkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1vYmplY3QtZ2V0b3ducHJvcGVydHlkZXNjcmlwdG9yIC0tIHNhZmVcbiAgICBzZXR0ZXIgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE9iamVjdC5wcm90b3R5cGUsICdfX3Byb3RvX18nKS5zZXQ7XG4gICAgc2V0dGVyLmNhbGwodGVzdCwgW10pO1xuICAgIENPUlJFQ1RfU0VUVEVSID0gdGVzdCBpbnN0YW5jZW9mIEFycmF5O1xuICB9IGNhdGNoIChlcnJvcikgeyAvKiBlbXB0eSAqLyB9XG4gIHJldHVybiBmdW5jdGlvbiBzZXRQcm90b3R5cGVPZihPLCBwcm90bykge1xuICAgIGFuT2JqZWN0KE8pO1xuICAgIGFQb3NzaWJsZVByb3RvdHlwZShwcm90byk7XG4gICAgaWYgKENPUlJFQ1RfU0VUVEVSKSBzZXR0ZXIuY2FsbChPLCBwcm90byk7XG4gICAgZWxzZSBPLl9fcHJvdG9fXyA9IHByb3RvO1xuICAgIHJldHVybiBPO1xuICB9O1xufSgpIDogdW5kZWZpbmVkKTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBUT19TVFJJTkdfVEFHX1NVUFBPUlQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tc3RyaW5nLXRhZy1zdXBwb3J0Jyk7XG52YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jbGFzc29mJyk7XG5cbi8vIGBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nYCBtZXRob2QgaW1wbGVtZW50YXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZ1xubW9kdWxlLmV4cG9ydHMgPSBUT19TVFJJTkdfVEFHX1NVUFBPUlQgPyB7fS50b1N0cmluZyA6IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICByZXR1cm4gJ1tvYmplY3QgJyArIGNsYXNzb2YodGhpcykgKyAnXSc7XG59O1xuIiwidmFyIGdldEJ1aWx0SW4gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2V0LWJ1aWx0LWluJyk7XG52YXIgZ2V0T3duUHJvcGVydHlOYW1lc01vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1uYW1lcycpO1xudmFyIGdldE93blByb3BlcnR5U3ltYm9sc01vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1zeW1ib2xzJyk7XG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4tb2JqZWN0Jyk7XG5cbi8vIGFsbCBvYmplY3Qga2V5cywgaW5jbHVkZXMgbm9uLWVudW1lcmFibGUgYW5kIHN5bWJvbHNcbm1vZHVsZS5leHBvcnRzID0gZ2V0QnVpbHRJbignUmVmbGVjdCcsICdvd25LZXlzJykgfHwgZnVuY3Rpb24gb3duS2V5cyhpdCkge1xuICB2YXIga2V5cyA9IGdldE93blByb3BlcnR5TmFtZXNNb2R1bGUuZihhbk9iamVjdChpdCkpO1xuICB2YXIgZ2V0T3duUHJvcGVydHlTeW1ib2xzID0gZ2V0T3duUHJvcGVydHlTeW1ib2xzTW9kdWxlLmY7XG4gIHJldHVybiBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPyBrZXlzLmNvbmNhdChnZXRPd25Qcm9wZXJ0eVN5bWJvbHMoaXQpKSA6IGtleXM7XG59O1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBnbG9iYWw7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChleGVjKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIHsgZXJyb3I6IGZhbHNlLCB2YWx1ZTogZXhlYygpIH07XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHsgZXJyb3I6IHRydWUsIHZhbHVlOiBlcnJvciB9O1xuICB9XG59O1xuIiwidmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xudmFyIG5ld1Byb21pc2VDYXBhYmlsaXR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL25ldy1wcm9taXNlLWNhcGFiaWxpdHknKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoQywgeCkge1xuICBhbk9iamVjdChDKTtcbiAgaWYgKGlzT2JqZWN0KHgpICYmIHguY29uc3RydWN0b3IgPT09IEMpIHJldHVybiB4O1xuICB2YXIgcHJvbWlzZUNhcGFiaWxpdHkgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eS5mKEMpO1xuICB2YXIgcmVzb2x2ZSA9IHByb21pc2VDYXBhYmlsaXR5LnJlc29sdmU7XG4gIHJlc29sdmUoeCk7XG4gIHJldHVybiBwcm9taXNlQ2FwYWJpbGl0eS5wcm9taXNlO1xufTtcbiIsInZhciByZWRlZmluZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWRlZmluZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh0YXJnZXQsIHNyYywgb3B0aW9ucykge1xuICBmb3IgKHZhciBrZXkgaW4gc3JjKSByZWRlZmluZSh0YXJnZXQsIGtleSwgc3JjW2tleV0sIG9wdGlvbnMpO1xuICByZXR1cm4gdGFyZ2V0O1xufTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1ub24tZW51bWVyYWJsZS1wcm9wZXJ0eScpO1xudmFyIGhhcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMnKTtcbnZhciBzZXRHbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2V0LWdsb2JhbCcpO1xudmFyIGluc3BlY3RTb3VyY2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaW5zcGVjdC1zb3VyY2UnKTtcbnZhciBJbnRlcm5hbFN0YXRlTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ludGVybmFsLXN0YXRlJyk7XG5cbnZhciBnZXRJbnRlcm5hbFN0YXRlID0gSW50ZXJuYWxTdGF0ZU1vZHVsZS5nZXQ7XG52YXIgZW5mb3JjZUludGVybmFsU3RhdGUgPSBJbnRlcm5hbFN0YXRlTW9kdWxlLmVuZm9yY2U7XG52YXIgVEVNUExBVEUgPSBTdHJpbmcoU3RyaW5nKS5zcGxpdCgnU3RyaW5nJyk7XG5cbihtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChPLCBrZXksIHZhbHVlLCBvcHRpb25zKSB7XG4gIHZhciB1bnNhZmUgPSBvcHRpb25zID8gISFvcHRpb25zLnVuc2FmZSA6IGZhbHNlO1xuICB2YXIgc2ltcGxlID0gb3B0aW9ucyA/ICEhb3B0aW9ucy5lbnVtZXJhYmxlIDogZmFsc2U7XG4gIHZhciBub1RhcmdldEdldCA9IG9wdGlvbnMgPyAhIW9wdGlvbnMubm9UYXJnZXRHZXQgOiBmYWxzZTtcbiAgdmFyIHN0YXRlO1xuICBpZiAodHlwZW9mIHZhbHVlID09ICdmdW5jdGlvbicpIHtcbiAgICBpZiAodHlwZW9mIGtleSA9PSAnc3RyaW5nJyAmJiAhaGFzKHZhbHVlLCAnbmFtZScpKSB7XG4gICAgICBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkodmFsdWUsICduYW1lJywga2V5KTtcbiAgICB9XG4gICAgc3RhdGUgPSBlbmZvcmNlSW50ZXJuYWxTdGF0ZSh2YWx1ZSk7XG4gICAgaWYgKCFzdGF0ZS5zb3VyY2UpIHtcbiAgICAgIHN0YXRlLnNvdXJjZSA9IFRFTVBMQVRFLmpvaW4odHlwZW9mIGtleSA9PSAnc3RyaW5nJyA/IGtleSA6ICcnKTtcbiAgICB9XG4gIH1cbiAgaWYgKE8gPT09IGdsb2JhbCkge1xuICAgIGlmIChzaW1wbGUpIE9ba2V5XSA9IHZhbHVlO1xuICAgIGVsc2Ugc2V0R2xvYmFsKGtleSwgdmFsdWUpO1xuICAgIHJldHVybjtcbiAgfSBlbHNlIGlmICghdW5zYWZlKSB7XG4gICAgZGVsZXRlIE9ba2V5XTtcbiAgfSBlbHNlIGlmICghbm9UYXJnZXRHZXQgJiYgT1trZXldKSB7XG4gICAgc2ltcGxlID0gdHJ1ZTtcbiAgfVxuICBpZiAoc2ltcGxlKSBPW2tleV0gPSB2YWx1ZTtcbiAgZWxzZSBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkoTywga2V5LCB2YWx1ZSk7XG4vLyBhZGQgZmFrZSBGdW5jdGlvbiN0b1N0cmluZyBmb3IgY29ycmVjdCB3b3JrIHdyYXBwZWQgbWV0aG9kcyAvIGNvbnN0cnVjdG9ycyB3aXRoIG1ldGhvZHMgbGlrZSBMb0Rhc2ggaXNOYXRpdmVcbn0pKEZ1bmN0aW9uLnByb3RvdHlwZSwgJ3RvU3RyaW5nJywgZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gIHJldHVybiB0eXBlb2YgdGhpcyA9PSAnZnVuY3Rpb24nICYmIGdldEludGVybmFsU3RhdGUodGhpcykuc291cmNlIHx8IGluc3BlY3RTb3VyY2UodGhpcyk7XG59KTtcbiIsInZhciBjbGFzc29mID0gcmVxdWlyZSgnLi9jbGFzc29mLXJhdycpO1xudmFyIHJlZ2V4cEV4ZWMgPSByZXF1aXJlKCcuL3JlZ2V4cC1leGVjJyk7XG5cbi8vIGBSZWdFeHBFeGVjYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtcmVnZXhwZXhlY1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoUiwgUykge1xuICB2YXIgZXhlYyA9IFIuZXhlYztcbiAgaWYgKHR5cGVvZiBleGVjID09PSAnZnVuY3Rpb24nKSB7XG4gICAgdmFyIHJlc3VsdCA9IGV4ZWMuY2FsbChSLCBTKTtcbiAgICBpZiAodHlwZW9mIHJlc3VsdCAhPT0gJ29iamVjdCcpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcignUmVnRXhwIGV4ZWMgbWV0aG9kIHJldHVybmVkIHNvbWV0aGluZyBvdGhlciB0aGFuIGFuIE9iamVjdCBvciBudWxsJyk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBpZiAoY2xhc3NvZihSKSAhPT0gJ1JlZ0V4cCcpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ1JlZ0V4cCNleGVjIGNhbGxlZCBvbiBpbmNvbXBhdGlibGUgcmVjZWl2ZXInKTtcbiAgfVxuXG4gIHJldHVybiByZWdleHBFeGVjLmNhbGwoUiwgUyk7XG59O1xuXG4iLCIndXNlIHN0cmljdCc7XG4vKiBlc2xpbnQtZGlzYWJsZSByZWdleHAvbm8tYXNzZXJ0aW9uLWNhcHR1cmluZy1ncm91cCwgcmVnZXhwL25vLWVtcHR5LWdyb3VwLCByZWdleHAvbm8tbGF6eS1lbmRzIC0tIHRlc3RpbmcgKi9cbi8qIGVzbGludC1kaXNhYmxlIHJlZ2V4cC9uby11c2VsZXNzLXF1YW50aWZpZXIgLS0gdGVzdGluZyAqL1xudmFyIHJlZ2V4cEZsYWdzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlZ2V4cC1mbGFncycpO1xudmFyIHN0aWNreUhlbHBlcnMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVnZXhwLXN0aWNreS1oZWxwZXJzJyk7XG52YXIgc2hhcmVkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NoYXJlZCcpO1xudmFyIGNyZWF0ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtY3JlYXRlJyk7XG52YXIgZ2V0SW50ZXJuYWxTdGF0ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbnRlcm5hbC1zdGF0ZScpLmdldDtcbnZhciBVTlNVUFBPUlRFRF9ET1RfQUxMID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlZ2V4cC11bnN1cHBvcnRlZC1kb3QtYWxsJyk7XG52YXIgVU5TVVBQT1JURURfTkNHID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlZ2V4cC11bnN1cHBvcnRlZC1uY2cnKTtcblxudmFyIG5hdGl2ZUV4ZWMgPSBSZWdFeHAucHJvdG90eXBlLmV4ZWM7XG52YXIgbmF0aXZlUmVwbGFjZSA9IHNoYXJlZCgnbmF0aXZlLXN0cmluZy1yZXBsYWNlJywgU3RyaW5nLnByb3RvdHlwZS5yZXBsYWNlKTtcblxudmFyIHBhdGNoZWRFeGVjID0gbmF0aXZlRXhlYztcblxudmFyIFVQREFURVNfTEFTVF9JTkRFWF9XUk9ORyA9IChmdW5jdGlvbiAoKSB7XG4gIHZhciByZTEgPSAvYS87XG4gIHZhciByZTIgPSAvYiovZztcbiAgbmF0aXZlRXhlYy5jYWxsKHJlMSwgJ2EnKTtcbiAgbmF0aXZlRXhlYy5jYWxsKHJlMiwgJ2EnKTtcbiAgcmV0dXJuIHJlMS5sYXN0SW5kZXggIT09IDAgfHwgcmUyLmxhc3RJbmRleCAhPT0gMDtcbn0pKCk7XG5cbnZhciBVTlNVUFBPUlRFRF9ZID0gc3RpY2t5SGVscGVycy5VTlNVUFBPUlRFRF9ZIHx8IHN0aWNreUhlbHBlcnMuQlJPS0VOX0NBUkVUO1xuXG4vLyBub25wYXJ0aWNpcGF0aW5nIGNhcHR1cmluZyBncm91cCwgY29waWVkIGZyb20gZXM1LXNoaW0ncyBTdHJpbmcjc3BsaXQgcGF0Y2guXG52YXIgTlBDR19JTkNMVURFRCA9IC8oKT8/Ly5leGVjKCcnKVsxXSAhPT0gdW5kZWZpbmVkO1xuXG52YXIgUEFUQ0ggPSBVUERBVEVTX0xBU1RfSU5ERVhfV1JPTkcgfHwgTlBDR19JTkNMVURFRCB8fCBVTlNVUFBPUlRFRF9ZIHx8IFVOU1VQUE9SVEVEX0RPVF9BTEwgfHwgVU5TVVBQT1JURURfTkNHO1xuXG5pZiAoUEFUQ0gpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1zdGF0ZW1lbnRzIC0tIFRPRE9cbiAgcGF0Y2hlZEV4ZWMgPSBmdW5jdGlvbiBleGVjKHN0cikge1xuICAgIHZhciByZSA9IHRoaXM7XG4gICAgdmFyIHN0YXRlID0gZ2V0SW50ZXJuYWxTdGF0ZShyZSk7XG4gICAgdmFyIHJhdyA9IHN0YXRlLnJhdztcbiAgICB2YXIgcmVzdWx0LCByZUNvcHksIGxhc3RJbmRleCwgbWF0Y2gsIGksIG9iamVjdCwgZ3JvdXA7XG5cbiAgICBpZiAocmF3KSB7XG4gICAgICByYXcubGFzdEluZGV4ID0gcmUubGFzdEluZGV4O1xuICAgICAgcmVzdWx0ID0gcGF0Y2hlZEV4ZWMuY2FsbChyYXcsIHN0cik7XG4gICAgICByZS5sYXN0SW5kZXggPSByYXcubGFzdEluZGV4O1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICB2YXIgZ3JvdXBzID0gc3RhdGUuZ3JvdXBzO1xuICAgIHZhciBzdGlja3kgPSBVTlNVUFBPUlRFRF9ZICYmIHJlLnN0aWNreTtcbiAgICB2YXIgZmxhZ3MgPSByZWdleHBGbGFncy5jYWxsKHJlKTtcbiAgICB2YXIgc291cmNlID0gcmUuc291cmNlO1xuICAgIHZhciBjaGFyc0FkZGVkID0gMDtcbiAgICB2YXIgc3RyQ29weSA9IHN0cjtcblxuICAgIGlmIChzdGlja3kpIHtcbiAgICAgIGZsYWdzID0gZmxhZ3MucmVwbGFjZSgneScsICcnKTtcbiAgICAgIGlmIChmbGFncy5pbmRleE9mKCdnJykgPT09IC0xKSB7XG4gICAgICAgIGZsYWdzICs9ICdnJztcbiAgICAgIH1cblxuICAgICAgc3RyQ29weSA9IFN0cmluZyhzdHIpLnNsaWNlKHJlLmxhc3RJbmRleCk7XG4gICAgICAvLyBTdXBwb3J0IGFuY2hvcmVkIHN0aWNreSBiZWhhdmlvci5cbiAgICAgIGlmIChyZS5sYXN0SW5kZXggPiAwICYmICghcmUubXVsdGlsaW5lIHx8IHJlLm11bHRpbGluZSAmJiBzdHJbcmUubGFzdEluZGV4IC0gMV0gIT09ICdcXG4nKSkge1xuICAgICAgICBzb3VyY2UgPSAnKD86ICcgKyBzb3VyY2UgKyAnKSc7XG4gICAgICAgIHN0ckNvcHkgPSAnICcgKyBzdHJDb3B5O1xuICAgICAgICBjaGFyc0FkZGVkKys7XG4gICAgICB9XG4gICAgICAvLyBeKD8gKyByeCArICkgaXMgbmVlZGVkLCBpbiBjb21iaW5hdGlvbiB3aXRoIHNvbWUgc3RyIHNsaWNpbmcsIHRvXG4gICAgICAvLyBzaW11bGF0ZSB0aGUgJ3knIGZsYWcuXG4gICAgICByZUNvcHkgPSBuZXcgUmVnRXhwKCdeKD86JyArIHNvdXJjZSArICcpJywgZmxhZ3MpO1xuICAgIH1cblxuICAgIGlmIChOUENHX0lOQ0xVREVEKSB7XG4gICAgICByZUNvcHkgPSBuZXcgUmVnRXhwKCdeJyArIHNvdXJjZSArICckKD8hXFxcXHMpJywgZmxhZ3MpO1xuICAgIH1cbiAgICBpZiAoVVBEQVRFU19MQVNUX0lOREVYX1dST05HKSBsYXN0SW5kZXggPSByZS5sYXN0SW5kZXg7XG5cbiAgICBtYXRjaCA9IG5hdGl2ZUV4ZWMuY2FsbChzdGlja3kgPyByZUNvcHkgOiByZSwgc3RyQ29weSk7XG5cbiAgICBpZiAoc3RpY2t5KSB7XG4gICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgbWF0Y2guaW5wdXQgPSBtYXRjaC5pbnB1dC5zbGljZShjaGFyc0FkZGVkKTtcbiAgICAgICAgbWF0Y2hbMF0gPSBtYXRjaFswXS5zbGljZShjaGFyc0FkZGVkKTtcbiAgICAgICAgbWF0Y2guaW5kZXggPSByZS5sYXN0SW5kZXg7XG4gICAgICAgIHJlLmxhc3RJbmRleCArPSBtYXRjaFswXS5sZW5ndGg7XG4gICAgICB9IGVsc2UgcmUubGFzdEluZGV4ID0gMDtcbiAgICB9IGVsc2UgaWYgKFVQREFURVNfTEFTVF9JTkRFWF9XUk9ORyAmJiBtYXRjaCkge1xuICAgICAgcmUubGFzdEluZGV4ID0gcmUuZ2xvYmFsID8gbWF0Y2guaW5kZXggKyBtYXRjaFswXS5sZW5ndGggOiBsYXN0SW5kZXg7XG4gICAgfVxuICAgIGlmIChOUENHX0lOQ0xVREVEICYmIG1hdGNoICYmIG1hdGNoLmxlbmd0aCA+IDEpIHtcbiAgICAgIC8vIEZpeCBicm93c2VycyB3aG9zZSBgZXhlY2AgbWV0aG9kcyBkb24ndCBjb25zaXN0ZW50bHkgcmV0dXJuIGB1bmRlZmluZWRgXG4gICAgICAvLyBmb3IgTlBDRywgbGlrZSBJRTguIE5PVEU6IFRoaXMgZG9lc24nIHdvcmsgZm9yIC8oLj8pPy9cbiAgICAgIG5hdGl2ZVJlcGxhY2UuY2FsbChtYXRjaFswXSwgcmVDb3B5LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZvciAoaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoIC0gMjsgaSsrKSB7XG4gICAgICAgICAgaWYgKGFyZ3VtZW50c1tpXSA9PT0gdW5kZWZpbmVkKSBtYXRjaFtpXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKG1hdGNoICYmIGdyb3Vwcykge1xuICAgICAgbWF0Y2guZ3JvdXBzID0gb2JqZWN0ID0gY3JlYXRlKG51bGwpO1xuICAgICAgZm9yIChpID0gMDsgaSA8IGdyb3Vwcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBncm91cCA9IGdyb3Vwc1tpXTtcbiAgICAgICAgb2JqZWN0W2dyb3VwWzBdXSA9IG1hdGNoW2dyb3VwWzFdXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbWF0Y2g7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcGF0Y2hlZEV4ZWM7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4tb2JqZWN0Jyk7XG5cbi8vIGBSZWdFeHAucHJvdG90eXBlLmZsYWdzYCBnZXR0ZXIgaW1wbGVtZW50YXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtZ2V0LXJlZ2V4cC5wcm90b3R5cGUuZmxhZ3Ncbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xuICB2YXIgdGhhdCA9IGFuT2JqZWN0KHRoaXMpO1xuICB2YXIgcmVzdWx0ID0gJyc7XG4gIGlmICh0aGF0Lmdsb2JhbCkgcmVzdWx0ICs9ICdnJztcbiAgaWYgKHRoYXQuaWdub3JlQ2FzZSkgcmVzdWx0ICs9ICdpJztcbiAgaWYgKHRoYXQubXVsdGlsaW5lKSByZXN1bHQgKz0gJ20nO1xuICBpZiAodGhhdC5kb3RBbGwpIHJlc3VsdCArPSAncyc7XG4gIGlmICh0aGF0LnVuaWNvZGUpIHJlc3VsdCArPSAndSc7XG4gIGlmICh0aGF0LnN0aWNreSkgcmVzdWx0ICs9ICd5JztcbiAgcmV0dXJuIHJlc3VsdDtcbn07XG4iLCJ2YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcblxuLy8gYmFiZWwtbWluaWZ5IHRyYW5zcGlsZXMgUmVnRXhwKCdhJywgJ3knKSAtPiAvYS95IGFuZCBpdCBjYXVzZXMgU3ludGF4RXJyb3IsXG52YXIgUkUgPSBmdW5jdGlvbiAocywgZikge1xuICByZXR1cm4gUmVnRXhwKHMsIGYpO1xufTtcblxuZXhwb3J0cy5VTlNVUFBPUlRFRF9ZID0gZmFpbHMoZnVuY3Rpb24gKCkge1xuICB2YXIgcmUgPSBSRSgnYScsICd5Jyk7XG4gIHJlLmxhc3RJbmRleCA9IDI7XG4gIHJldHVybiByZS5leGVjKCdhYmNkJykgIT0gbnVsbDtcbn0pO1xuXG5leHBvcnRzLkJST0tFTl9DQVJFVCA9IGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgLy8gaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9NzczNjg3XG4gIHZhciByZSA9IFJFKCdecicsICdneScpO1xuICByZS5sYXN0SW5kZXggPSAyO1xuICByZXR1cm4gcmUuZXhlYygnc3RyJykgIT0gbnVsbDtcbn0pO1xuIiwidmFyIGZhaWxzID0gcmVxdWlyZSgnLi9mYWlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgLy8gYmFiZWwtbWluaWZ5IHRyYW5zcGlsZXMgUmVnRXhwKCcuJywgJ3MnKSAtPiAvLi9zIGFuZCBpdCBjYXVzZXMgU3ludGF4RXJyb3JcbiAgdmFyIHJlID0gUmVnRXhwKCcuJywgKHR5cGVvZiAnJykuY2hhckF0KDApKTtcbiAgcmV0dXJuICEocmUuZG90QWxsICYmIHJlLmV4ZWMoJ1xcbicpICYmIHJlLmZsYWdzID09PSAncycpO1xufSk7XG4iLCJ2YXIgZmFpbHMgPSByZXF1aXJlKCcuL2ZhaWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZmFpbHMoZnVuY3Rpb24gKCkge1xuICAvLyBiYWJlbC1taW5pZnkgdHJhbnNwaWxlcyBSZWdFeHAoJy4nLCAnZycpIC0+IC8uL2cgYW5kIGl0IGNhdXNlcyBTeW50YXhFcnJvclxuICB2YXIgcmUgPSBSZWdFeHAoJyg/PGE+YiknLCAodHlwZW9mICcnKS5jaGFyQXQoNSkpO1xuICByZXR1cm4gcmUuZXhlYygnYicpLmdyb3Vwcy5hICE9PSAnYicgfHxcbiAgICAnYicucmVwbGFjZShyZSwgJyQ8YT5jJykgIT09ICdiYyc7XG59KTtcbiIsIi8vIGBSZXF1aXJlT2JqZWN0Q29lcmNpYmxlYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtcmVxdWlyZW9iamVjdGNvZXJjaWJsZVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKGl0ID09IHVuZGVmaW5lZCkgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY2FsbCBtZXRob2Qgb24gXCIgKyBpdCk7XG4gIHJldHVybiBpdDtcbn07XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtbm9uLWVudW1lcmFibGUtcHJvcGVydHknKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICB0cnkge1xuICAgIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eShnbG9iYWwsIGtleSwgdmFsdWUpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGdsb2JhbFtrZXldID0gdmFsdWU7XG4gIH0gcmV0dXJuIHZhbHVlO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBnZXRCdWlsdEluID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dldC1idWlsdC1pbicpO1xudmFyIGRlZmluZVByb3BlcnR5TW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHknKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcbnZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xuXG52YXIgU1BFQ0lFUyA9IHdlbGxLbm93blN5bWJvbCgnc3BlY2llcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChDT05TVFJVQ1RPUl9OQU1FKSB7XG4gIHZhciBDb25zdHJ1Y3RvciA9IGdldEJ1aWx0SW4oQ09OU1RSVUNUT1JfTkFNRSk7XG4gIHZhciBkZWZpbmVQcm9wZXJ0eSA9IGRlZmluZVByb3BlcnR5TW9kdWxlLmY7XG5cbiAgaWYgKERFU0NSSVBUT1JTICYmIENvbnN0cnVjdG9yICYmICFDb25zdHJ1Y3RvcltTUEVDSUVTXSkge1xuICAgIGRlZmluZVByb3BlcnR5KENvbnN0cnVjdG9yLCBTUEVDSUVTLCB7XG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH1cbiAgICB9KTtcbiAgfVxufTtcbiIsInZhciBkZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5JykuZjtcbnZhciBoYXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzJyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG5cbnZhciBUT19TVFJJTkdfVEFHID0gd2VsbEtub3duU3ltYm9sKCd0b1N0cmluZ1RhZycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCwgVEFHLCBTVEFUSUMpIHtcbiAgaWYgKGl0ICYmICFoYXMoaXQgPSBTVEFUSUMgPyBpdCA6IGl0LnByb3RvdHlwZSwgVE9fU1RSSU5HX1RBRykpIHtcbiAgICBkZWZpbmVQcm9wZXJ0eShpdCwgVE9fU1RSSU5HX1RBRywgeyBjb25maWd1cmFibGU6IHRydWUsIHZhbHVlOiBUQUcgfSk7XG4gIH1cbn07XG4iLCJ2YXIgc2hhcmVkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NoYXJlZCcpO1xudmFyIHVpZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy91aWQnKTtcblxudmFyIGtleXMgPSBzaGFyZWQoJ2tleXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiBrZXlzW2tleV0gfHwgKGtleXNba2V5XSA9IHVpZChrZXkpKTtcbn07XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIHNldEdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zZXQtZ2xvYmFsJyk7XG5cbnZhciBTSEFSRUQgPSAnX19jb3JlLWpzX3NoYXJlZF9fJztcbnZhciBzdG9yZSA9IGdsb2JhbFtTSEFSRURdIHx8IHNldEdsb2JhbChTSEFSRUQsIHt9KTtcblxubW9kdWxlLmV4cG9ydHMgPSBzdG9yZTtcbiIsInZhciBJU19QVVJFID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLXB1cmUnKTtcbnZhciBzdG9yZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQtc3RvcmUnKTtcblxuKG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgcmV0dXJuIHN0b3JlW2tleV0gfHwgKHN0b3JlW2tleV0gPSB2YWx1ZSAhPT0gdW5kZWZpbmVkID8gdmFsdWUgOiB7fSk7XG59KSgndmVyc2lvbnMnLCBbXSkucHVzaCh7XG4gIHZlcnNpb246ICczLjE1LjInLFxuICBtb2RlOiBJU19QVVJFID8gJ3B1cmUnIDogJ2dsb2JhbCcsXG4gIGNvcHlyaWdodDogJ8KpIDIwMjEgRGVuaXMgUHVzaGthcmV2ICh6bG9pcm9jay5ydSknXG59KTtcbiIsInZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1vYmplY3QnKTtcbnZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYS1mdW5jdGlvbicpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xuXG52YXIgU1BFQ0lFUyA9IHdlbGxLbm93blN5bWJvbCgnc3BlY2llcycpO1xuXG4vLyBgU3BlY2llc0NvbnN0cnVjdG9yYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtc3BlY2llc2NvbnN0cnVjdG9yXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChPLCBkZWZhdWx0Q29uc3RydWN0b3IpIHtcbiAgdmFyIEMgPSBhbk9iamVjdChPKS5jb25zdHJ1Y3RvcjtcbiAgdmFyIFM7XG4gIHJldHVybiBDID09PSB1bmRlZmluZWQgfHwgKFMgPSBhbk9iamVjdChDKVtTUEVDSUVTXSkgPT0gdW5kZWZpbmVkID8gZGVmYXVsdENvbnN0cnVjdG9yIDogYUZ1bmN0aW9uKFMpO1xufTtcbiIsInZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW50ZWdlcicpO1xudmFyIHJlcXVpcmVPYmplY3RDb2VyY2libGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVxdWlyZS1vYmplY3QtY29lcmNpYmxlJyk7XG5cbi8vIGBTdHJpbmcucHJvdG90eXBlLnsgY29kZVBvaW50QXQsIGF0IH1gIG1ldGhvZHMgaW1wbGVtZW50YXRpb25cbnZhciBjcmVhdGVNZXRob2QgPSBmdW5jdGlvbiAoQ09OVkVSVF9UT19TVFJJTkcpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgkdGhpcywgcG9zKSB7XG4gICAgdmFyIFMgPSBTdHJpbmcocmVxdWlyZU9iamVjdENvZXJjaWJsZSgkdGhpcykpO1xuICAgIHZhciBwb3NpdGlvbiA9IHRvSW50ZWdlcihwb3MpO1xuICAgIHZhciBzaXplID0gUy5sZW5ndGg7XG4gICAgdmFyIGZpcnN0LCBzZWNvbmQ7XG4gICAgaWYgKHBvc2l0aW9uIDwgMCB8fCBwb3NpdGlvbiA+PSBzaXplKSByZXR1cm4gQ09OVkVSVF9UT19TVFJJTkcgPyAnJyA6IHVuZGVmaW5lZDtcbiAgICBmaXJzdCA9IFMuY2hhckNvZGVBdChwb3NpdGlvbik7XG4gICAgcmV0dXJuIGZpcnN0IDwgMHhEODAwIHx8IGZpcnN0ID4gMHhEQkZGIHx8IHBvc2l0aW9uICsgMSA9PT0gc2l6ZVxuICAgICAgfHwgKHNlY29uZCA9IFMuY2hhckNvZGVBdChwb3NpdGlvbiArIDEpKSA8IDB4REMwMCB8fCBzZWNvbmQgPiAweERGRkZcbiAgICAgICAgPyBDT05WRVJUX1RPX1NUUklORyA/IFMuY2hhckF0KHBvc2l0aW9uKSA6IGZpcnN0XG4gICAgICAgIDogQ09OVkVSVF9UT19TVFJJTkcgPyBTLnNsaWNlKHBvc2l0aW9uLCBwb3NpdGlvbiArIDIpIDogKGZpcnN0IC0gMHhEODAwIDw8IDEwKSArIChzZWNvbmQgLSAweERDMDApICsgMHgxMDAwMDtcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAvLyBgU3RyaW5nLnByb3RvdHlwZS5jb2RlUG9pbnRBdGAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtc3RyaW5nLnByb3RvdHlwZS5jb2RlcG9pbnRhdFxuICBjb2RlQXQ6IGNyZWF0ZU1ldGhvZChmYWxzZSksXG4gIC8vIGBTdHJpbmcucHJvdG90eXBlLmF0YCBtZXRob2RcbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL21hdGhpYXNieW5lbnMvU3RyaW5nLnByb3RvdHlwZS5hdFxuICBjaGFyQXQ6IGNyZWF0ZU1ldGhvZCh0cnVlKVxufTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciBiaW5kID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLWJpbmQtY29udGV4dCcpO1xudmFyIGh0bWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaHRtbCcpO1xudmFyIGNyZWF0ZUVsZW1lbnQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZG9jdW1lbnQtY3JlYXRlLWVsZW1lbnQnKTtcbnZhciBJU19JT1MgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZW5naW5lLWlzLWlvcycpO1xudmFyIElTX05PREUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZW5naW5lLWlzLW5vZGUnKTtcblxudmFyIGxvY2F0aW9uID0gZ2xvYmFsLmxvY2F0aW9uO1xudmFyIHNldCA9IGdsb2JhbC5zZXRJbW1lZGlhdGU7XG52YXIgY2xlYXIgPSBnbG9iYWwuY2xlYXJJbW1lZGlhdGU7XG52YXIgcHJvY2VzcyA9IGdsb2JhbC5wcm9jZXNzO1xudmFyIE1lc3NhZ2VDaGFubmVsID0gZ2xvYmFsLk1lc3NhZ2VDaGFubmVsO1xudmFyIERpc3BhdGNoID0gZ2xvYmFsLkRpc3BhdGNoO1xudmFyIGNvdW50ZXIgPSAwO1xudmFyIHF1ZXVlID0ge307XG52YXIgT05SRUFEWVNUQVRFQ0hBTkdFID0gJ29ucmVhZHlzdGF0ZWNoYW5nZSc7XG52YXIgZGVmZXIsIGNoYW5uZWwsIHBvcnQ7XG5cbnZhciBydW4gPSBmdW5jdGlvbiAoaWQpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXByb3RvdHlwZS1idWlsdGlucyAtLSBzYWZlXG4gIGlmIChxdWV1ZS5oYXNPd25Qcm9wZXJ0eShpZCkpIHtcbiAgICB2YXIgZm4gPSBxdWV1ZVtpZF07XG4gICAgZGVsZXRlIHF1ZXVlW2lkXTtcbiAgICBmbigpO1xuICB9XG59O1xuXG52YXIgcnVubmVyID0gZnVuY3Rpb24gKGlkKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgcnVuKGlkKTtcbiAgfTtcbn07XG5cbnZhciBsaXN0ZW5lciA9IGZ1bmN0aW9uIChldmVudCkge1xuICBydW4oZXZlbnQuZGF0YSk7XG59O1xuXG52YXIgcG9zdCA9IGZ1bmN0aW9uIChpZCkge1xuICAvLyBvbGQgZW5naW5lcyBoYXZlIG5vdCBsb2NhdGlvbi5vcmlnaW5cbiAgZ2xvYmFsLnBvc3RNZXNzYWdlKGlkICsgJycsIGxvY2F0aW9uLnByb3RvY29sICsgJy8vJyArIGxvY2F0aW9uLmhvc3QpO1xufTtcblxuLy8gTm9kZS5qcyAwLjkrICYgSUUxMCsgaGFzIHNldEltbWVkaWF0ZSwgb3RoZXJ3aXNlOlxuaWYgKCFzZXQgfHwgIWNsZWFyKSB7XG4gIHNldCA9IGZ1bmN0aW9uIHNldEltbWVkaWF0ZShmbikge1xuICAgIHZhciBhcmdzID0gW107XG4gICAgdmFyIGkgPSAxO1xuICAgIHdoaWxlIChhcmd1bWVudHMubGVuZ3RoID4gaSkgYXJncy5wdXNoKGFyZ3VtZW50c1tpKytdKTtcbiAgICBxdWV1ZVsrK2NvdW50ZXJdID0gZnVuY3Rpb24gKCkge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5ldy1mdW5jIC0tIHNwZWMgcmVxdWlyZW1lbnRcbiAgICAgICh0eXBlb2YgZm4gPT0gJ2Z1bmN0aW9uJyA/IGZuIDogRnVuY3Rpb24oZm4pKS5hcHBseSh1bmRlZmluZWQsIGFyZ3MpO1xuICAgIH07XG4gICAgZGVmZXIoY291bnRlcik7XG4gICAgcmV0dXJuIGNvdW50ZXI7XG4gIH07XG4gIGNsZWFyID0gZnVuY3Rpb24gY2xlYXJJbW1lZGlhdGUoaWQpIHtcbiAgICBkZWxldGUgcXVldWVbaWRdO1xuICB9O1xuICAvLyBOb2RlLmpzIDAuOC1cbiAgaWYgKElTX05PREUpIHtcbiAgICBkZWZlciA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgcHJvY2Vzcy5uZXh0VGljayhydW5uZXIoaWQpKTtcbiAgICB9O1xuICAvLyBTcGhlcmUgKEpTIGdhbWUgZW5naW5lKSBEaXNwYXRjaCBBUElcbiAgfSBlbHNlIGlmIChEaXNwYXRjaCAmJiBEaXNwYXRjaC5ub3cpIHtcbiAgICBkZWZlciA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgRGlzcGF0Y2gubm93KHJ1bm5lcihpZCkpO1xuICAgIH07XG4gIC8vIEJyb3dzZXJzIHdpdGggTWVzc2FnZUNoYW5uZWwsIGluY2x1ZGVzIFdlYldvcmtlcnNcbiAgLy8gZXhjZXB0IGlPUyAtIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy82MjRcbiAgfSBlbHNlIGlmIChNZXNzYWdlQ2hhbm5lbCAmJiAhSVNfSU9TKSB7XG4gICAgY2hhbm5lbCA9IG5ldyBNZXNzYWdlQ2hhbm5lbCgpO1xuICAgIHBvcnQgPSBjaGFubmVsLnBvcnQyO1xuICAgIGNoYW5uZWwucG9ydDEub25tZXNzYWdlID0gbGlzdGVuZXI7XG4gICAgZGVmZXIgPSBiaW5kKHBvcnQucG9zdE1lc3NhZ2UsIHBvcnQsIDEpO1xuICAvLyBCcm93c2VycyB3aXRoIHBvc3RNZXNzYWdlLCBza2lwIFdlYldvcmtlcnNcbiAgLy8gSUU4IGhhcyBwb3N0TWVzc2FnZSwgYnV0IGl0J3Mgc3luYyAmIHR5cGVvZiBpdHMgcG9zdE1lc3NhZ2UgaXMgJ29iamVjdCdcbiAgfSBlbHNlIGlmIChcbiAgICBnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lciAmJlxuICAgIHR5cGVvZiBwb3N0TWVzc2FnZSA9PSAnZnVuY3Rpb24nICYmXG4gICAgIWdsb2JhbC5pbXBvcnRTY3JpcHRzICYmXG4gICAgbG9jYXRpb24gJiYgbG9jYXRpb24ucHJvdG9jb2wgIT09ICdmaWxlOicgJiZcbiAgICAhZmFpbHMocG9zdClcbiAgKSB7XG4gICAgZGVmZXIgPSBwb3N0O1xuICAgIGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgbGlzdGVuZXIsIGZhbHNlKTtcbiAgLy8gSUU4LVxuICB9IGVsc2UgaWYgKE9OUkVBRFlTVEFURUNIQU5HRSBpbiBjcmVhdGVFbGVtZW50KCdzY3JpcHQnKSkge1xuICAgIGRlZmVyID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICBodG1sLmFwcGVuZENoaWxkKGNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpKVtPTlJFQURZU1RBVEVDSEFOR0VdID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBodG1sLnJlbW92ZUNoaWxkKHRoaXMpO1xuICAgICAgICBydW4oaWQpO1xuICAgICAgfTtcbiAgICB9O1xuICAvLyBSZXN0IG9sZCBicm93c2Vyc1xuICB9IGVsc2Uge1xuICAgIGRlZmVyID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICBzZXRUaW1lb3V0KHJ1bm5lcihpZCksIDApO1xuICAgIH07XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNldDogc2V0LFxuICBjbGVhcjogY2xlYXJcbn07XG4iLCJ2YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWludGVnZXInKTtcblxudmFyIG1heCA9IE1hdGgubWF4O1xudmFyIG1pbiA9IE1hdGgubWluO1xuXG4vLyBIZWxwZXIgZm9yIGEgcG9wdWxhciByZXBlYXRpbmcgY2FzZSBvZiB0aGUgc3BlYzpcbi8vIExldCBpbnRlZ2VyIGJlID8gVG9JbnRlZ2VyKGluZGV4KS5cbi8vIElmIGludGVnZXIgPCAwLCBsZXQgcmVzdWx0IGJlIG1heCgobGVuZ3RoICsgaW50ZWdlciksIDApOyBlbHNlIGxldCByZXN1bHQgYmUgbWluKGludGVnZXIsIGxlbmd0aCkuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpbmRleCwgbGVuZ3RoKSB7XG4gIHZhciBpbnRlZ2VyID0gdG9JbnRlZ2VyKGluZGV4KTtcbiAgcmV0dXJuIGludGVnZXIgPCAwID8gbWF4KGludGVnZXIgKyBsZW5ndGgsIDApIDogbWluKGludGVnZXIsIGxlbmd0aCk7XG59O1xuIiwiLy8gdG9PYmplY3Qgd2l0aCBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIHN0cmluZ3NcbnZhciBJbmRleGVkT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2luZGV4ZWQtb2JqZWN0Jyk7XG52YXIgcmVxdWlyZU9iamVjdENvZXJjaWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZXF1aXJlLW9iamVjdC1jb2VyY2libGUnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIEluZGV4ZWRPYmplY3QocmVxdWlyZU9iamVjdENvZXJjaWJsZShpdCkpO1xufTtcbiIsInZhciBjZWlsID0gTWF0aC5jZWlsO1xudmFyIGZsb29yID0gTWF0aC5mbG9vcjtcblxuLy8gYFRvSW50ZWdlcmAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXRvaW50ZWdlclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYXJndW1lbnQpIHtcbiAgcmV0dXJuIGlzTmFOKGFyZ3VtZW50ID0gK2FyZ3VtZW50KSA/IDAgOiAoYXJndW1lbnQgPiAwID8gZmxvb3IgOiBjZWlsKShhcmd1bWVudCk7XG59O1xuIiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbnRlZ2VyJyk7XG5cbnZhciBtaW4gPSBNYXRoLm1pbjtcblxuLy8gYFRvTGVuZ3RoYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtdG9sZW5ndGhcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFyZ3VtZW50KSB7XG4gIHJldHVybiBhcmd1bWVudCA+IDAgPyBtaW4odG9JbnRlZ2VyKGFyZ3VtZW50KSwgMHgxRkZGRkZGRkZGRkZGRikgOiAwOyAvLyAyICoqIDUzIC0gMSA9PSA5MDA3MTk5MjU0NzQwOTkxXG59O1xuIiwidmFyIHJlcXVpcmVPYmplY3RDb2VyY2libGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVxdWlyZS1vYmplY3QtY29lcmNpYmxlJyk7XG5cbi8vIGBUb09iamVjdGAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXRvb2JqZWN0XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhcmd1bWVudCkge1xuICByZXR1cm4gT2JqZWN0KHJlcXVpcmVPYmplY3RDb2VyY2libGUoYXJndW1lbnQpKTtcbn07XG4iLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG5cbi8vIGBUb1ByaW1pdGl2ZWAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXRvcHJpbWl0aXZlXG4vLyBpbnN0ZWFkIG9mIHRoZSBFUzYgc3BlYyB2ZXJzaW9uLCB3ZSBkaWRuJ3QgaW1wbGVtZW50IEBAdG9QcmltaXRpdmUgY2FzZVxuLy8gYW5kIHRoZSBzZWNvbmQgYXJndW1lbnQgLSBmbGFnIC0gcHJlZmVycmVkIHR5cGUgaXMgYSBzdHJpbmdcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGlucHV0LCBQUkVGRVJSRURfU1RSSU5HKSB7XG4gIGlmICghaXNPYmplY3QoaW5wdXQpKSByZXR1cm4gaW5wdXQ7XG4gIHZhciBmbiwgdmFsO1xuICBpZiAoUFJFRkVSUkVEX1NUUklORyAmJiB0eXBlb2YgKGZuID0gaW5wdXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaW5wdXQpKSkgcmV0dXJuIHZhbDtcbiAgaWYgKHR5cGVvZiAoZm4gPSBpbnB1dC52YWx1ZU9mKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGlucHV0KSkpIHJldHVybiB2YWw7XG4gIGlmICghUFJFRkVSUkVEX1NUUklORyAmJiB0eXBlb2YgKGZuID0gaW5wdXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaW5wdXQpKSkgcmV0dXJuIHZhbDtcbiAgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY29udmVydCBvYmplY3QgdG8gcHJpbWl0aXZlIHZhbHVlXCIpO1xufTtcbiIsInZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcblxudmFyIFRPX1NUUklOR19UQUcgPSB3ZWxsS25vd25TeW1ib2woJ3RvU3RyaW5nVGFnJyk7XG52YXIgdGVzdCA9IHt9O1xuXG50ZXN0W1RPX1NUUklOR19UQUddID0gJ3onO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFN0cmluZyh0ZXN0KSA9PT0gJ1tvYmplY3Qgel0nO1xuIiwidmFyIGlkID0gMDtcbnZhciBwb3N0Zml4ID0gTWF0aC5yYW5kb20oKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiAnU3ltYm9sKCcgKyBTdHJpbmcoa2V5ID09PSB1bmRlZmluZWQgPyAnJyA6IGtleSkgKyAnKV8nICsgKCsraWQgKyBwb3N0Zml4KS50b1N0cmluZygzNik7XG59O1xuIiwiLyogZXNsaW50LWRpc2FibGUgZXMvbm8tc3ltYm9sIC0tIHJlcXVpcmVkIGZvciB0ZXN0aW5nICovXG52YXIgTkFUSVZFX1NZTUJPTCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9uYXRpdmUtc3ltYm9sJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gTkFUSVZFX1NZTUJPTFxuICAmJiAhU3ltYm9sLnNoYW1cbiAgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PSAnc3ltYm9sJztcbiIsInZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcblxuZXhwb3J0cy5mID0gd2VsbEtub3duU3ltYm9sO1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBzaGFyZWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkJyk7XG52YXIgaGFzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xudmFyIHVpZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy91aWQnKTtcbnZhciBOQVRJVkVfU1lNQk9MID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL25hdGl2ZS1zeW1ib2wnKTtcbnZhciBVU0VfU1lNQk9MX0FTX1VJRCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy91c2Utc3ltYm9sLWFzLXVpZCcpO1xuXG52YXIgV2VsbEtub3duU3ltYm9sc1N0b3JlID0gc2hhcmVkKCd3a3MnKTtcbnZhciBTeW1ib2wgPSBnbG9iYWwuU3ltYm9sO1xudmFyIGNyZWF0ZVdlbGxLbm93blN5bWJvbCA9IFVTRV9TWU1CT0xfQVNfVUlEID8gU3ltYm9sIDogU3ltYm9sICYmIFN5bWJvbC53aXRob3V0U2V0dGVyIHx8IHVpZDtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmFtZSkge1xuICBpZiAoIWhhcyhXZWxsS25vd25TeW1ib2xzU3RvcmUsIG5hbWUpIHx8ICEoTkFUSVZFX1NZTUJPTCB8fCB0eXBlb2YgV2VsbEtub3duU3ltYm9sc1N0b3JlW25hbWVdID09ICdzdHJpbmcnKSkge1xuICAgIGlmIChOQVRJVkVfU1lNQk9MICYmIGhhcyhTeW1ib2wsIG5hbWUpKSB7XG4gICAgICBXZWxsS25vd25TeW1ib2xzU3RvcmVbbmFtZV0gPSBTeW1ib2xbbmFtZV07XG4gICAgfSBlbHNlIHtcbiAgICAgIFdlbGxLbm93blN5bWJvbHNTdG9yZVtuYW1lXSA9IGNyZWF0ZVdlbGxLbm93blN5bWJvbCgnU3ltYm9sLicgKyBuYW1lKTtcbiAgICB9XG4gIH0gcmV0dXJuIFdlbGxLbm93blN5bWJvbHNTdG9yZVtuYW1lXTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIGlzQXJyYXkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtYXJyYXknKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1vYmplY3QnKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1sZW5ndGgnKTtcbnZhciBjcmVhdGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtcHJvcGVydHknKTtcbnZhciBhcnJheVNwZWNpZXNDcmVhdGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktc3BlY2llcy1jcmVhdGUnKTtcbnZhciBhcnJheU1ldGhvZEhhc1NwZWNpZXNTdXBwb3J0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LW1ldGhvZC1oYXMtc3BlY2llcy1zdXBwb3J0Jyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG52YXIgVjhfVkVSU0lPTiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbmdpbmUtdjgtdmVyc2lvbicpO1xuXG52YXIgSVNfQ09OQ0FUX1NQUkVBREFCTEUgPSB3ZWxsS25vd25TeW1ib2woJ2lzQ29uY2F0U3ByZWFkYWJsZScpO1xudmFyIE1BWF9TQUZFX0lOVEVHRVIgPSAweDFGRkZGRkZGRkZGRkZGO1xudmFyIE1BWElNVU1fQUxMT1dFRF9JTkRFWF9FWENFRURFRCA9ICdNYXhpbXVtIGFsbG93ZWQgaW5kZXggZXhjZWVkZWQnO1xuXG4vLyBXZSBjYW4ndCB1c2UgdGhpcyBmZWF0dXJlIGRldGVjdGlvbiBpbiBWOCBzaW5jZSBpdCBjYXVzZXNcbi8vIGRlb3B0aW1pemF0aW9uIGFuZCBzZXJpb3VzIHBlcmZvcm1hbmNlIGRlZ3JhZGF0aW9uXG4vLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvNjc5XG52YXIgSVNfQ09OQ0FUX1NQUkVBREFCTEVfU1VQUE9SVCA9IFY4X1ZFUlNJT04gPj0gNTEgfHwgIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgdmFyIGFycmF5ID0gW107XG4gIGFycmF5W0lTX0NPTkNBVF9TUFJFQURBQkxFXSA9IGZhbHNlO1xuICByZXR1cm4gYXJyYXkuY29uY2F0KClbMF0gIT09IGFycmF5O1xufSk7XG5cbnZhciBTUEVDSUVTX1NVUFBPUlQgPSBhcnJheU1ldGhvZEhhc1NwZWNpZXNTdXBwb3J0KCdjb25jYXQnKTtcblxudmFyIGlzQ29uY2F0U3ByZWFkYWJsZSA9IGZ1bmN0aW9uIChPKSB7XG4gIGlmICghaXNPYmplY3QoTykpIHJldHVybiBmYWxzZTtcbiAgdmFyIHNwcmVhZGFibGUgPSBPW0lTX0NPTkNBVF9TUFJFQURBQkxFXTtcbiAgcmV0dXJuIHNwcmVhZGFibGUgIT09IHVuZGVmaW5lZCA/ICEhc3ByZWFkYWJsZSA6IGlzQXJyYXkoTyk7XG59O1xuXG52YXIgRk9SQ0VEID0gIUlTX0NPTkNBVF9TUFJFQURBQkxFX1NVUFBPUlQgfHwgIVNQRUNJRVNfU1VQUE9SVDtcblxuLy8gYEFycmF5LnByb3RvdHlwZS5jb25jYXRgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuY29uY2F0XG4vLyB3aXRoIGFkZGluZyBzdXBwb3J0IG9mIEBAaXNDb25jYXRTcHJlYWRhYmxlIGFuZCBAQHNwZWNpZXNcbiQoeyB0YXJnZXQ6ICdBcnJheScsIHByb3RvOiB0cnVlLCBmb3JjZWQ6IEZPUkNFRCB9LCB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFycyAtLSByZXF1aXJlZCBmb3IgYC5sZW5ndGhgXG4gIGNvbmNhdDogZnVuY3Rpb24gY29uY2F0KGFyZykge1xuICAgIHZhciBPID0gdG9PYmplY3QodGhpcyk7XG4gICAgdmFyIEEgPSBhcnJheVNwZWNpZXNDcmVhdGUoTywgMCk7XG4gICAgdmFyIG4gPSAwO1xuICAgIHZhciBpLCBrLCBsZW5ndGgsIGxlbiwgRTtcbiAgICBmb3IgKGkgPSAtMSwgbGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBFID0gaSA9PT0gLTEgPyBPIDogYXJndW1lbnRzW2ldO1xuICAgICAgaWYgKGlzQ29uY2F0U3ByZWFkYWJsZShFKSkge1xuICAgICAgICBsZW4gPSB0b0xlbmd0aChFLmxlbmd0aCk7XG4gICAgICAgIGlmIChuICsgbGVuID4gTUFYX1NBRkVfSU5URUdFUikgdGhyb3cgVHlwZUVycm9yKE1BWElNVU1fQUxMT1dFRF9JTkRFWF9FWENFRURFRCk7XG4gICAgICAgIGZvciAoayA9IDA7IGsgPCBsZW47IGsrKywgbisrKSBpZiAoayBpbiBFKSBjcmVhdGVQcm9wZXJ0eShBLCBuLCBFW2tdKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChuID49IE1BWF9TQUZFX0lOVEVHRVIpIHRocm93IFR5cGVFcnJvcihNQVhJTVVNX0FMTE9XRURfSU5ERVhfRVhDRUVERUQpO1xuICAgICAgICBjcmVhdGVQcm9wZXJ0eShBLCBuKyssIEUpO1xuICAgICAgfVxuICAgIH1cbiAgICBBLmxlbmd0aCA9IG47XG4gICAgcmV0dXJuIEE7XG4gIH1cbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgZm9yRWFjaCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1mb3ItZWFjaCcpO1xuXG4vLyBgQXJyYXkucHJvdG90eXBlLmZvckVhY2hgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuZm9yZWFjaFxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLWFycmF5LXByb3RvdHlwZS1mb3JlYWNoIC0tIHNhZmVcbiQoeyB0YXJnZXQ6ICdBcnJheScsIHByb3RvOiB0cnVlLCBmb3JjZWQ6IFtdLmZvckVhY2ggIT0gZm9yRWFjaCB9LCB7XG4gIGZvckVhY2g6IGZvckVhY2hcbn0pO1xuIiwidmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgZnJvbSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1mcm9tJyk7XG52YXIgY2hlY2tDb3JyZWN0bmVzc09mSXRlcmF0aW9uID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NoZWNrLWNvcnJlY3RuZXNzLW9mLWl0ZXJhdGlvbicpO1xuXG52YXIgSU5DT1JSRUNUX0lURVJBVElPTiA9ICFjaGVja0NvcnJlY3RuZXNzT2ZJdGVyYXRpb24oZnVuY3Rpb24gKGl0ZXJhYmxlKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1hcnJheS1mcm9tIC0tIHJlcXVpcmVkIGZvciB0ZXN0aW5nXG4gIEFycmF5LmZyb20oaXRlcmFibGUpO1xufSk7XG5cbi8vIGBBcnJheS5mcm9tYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkuZnJvbVxuJCh7IHRhcmdldDogJ0FycmF5Jywgc3RhdDogdHJ1ZSwgZm9yY2VkOiBJTkNPUlJFQ1RfSVRFUkFUSU9OIH0sIHtcbiAgZnJvbTogZnJvbVxufSk7XG4iLCJ2YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBpc0FycmF5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWFycmF5Jyk7XG5cbi8vIGBBcnJheS5pc0FycmF5YCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkuaXNhcnJheVxuJCh7IHRhcmdldDogJ0FycmF5Jywgc3RhdDogdHJ1ZSB9LCB7XG4gIGlzQXJyYXk6IGlzQXJyYXlcbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHRvSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbmRleGVkLW9iamVjdCcpO1xudmFyIGFkZFRvVW5zY29wYWJsZXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYWRkLXRvLXVuc2NvcGFibGVzJyk7XG52YXIgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2l0ZXJhdG9ycycpO1xudmFyIEludGVybmFsU3RhdGVNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaW50ZXJuYWwtc3RhdGUnKTtcbnZhciBkZWZpbmVJdGVyYXRvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZWZpbmUtaXRlcmF0b3InKTtcblxudmFyIEFSUkFZX0lURVJBVE9SID0gJ0FycmF5IEl0ZXJhdG9yJztcbnZhciBzZXRJbnRlcm5hbFN0YXRlID0gSW50ZXJuYWxTdGF0ZU1vZHVsZS5zZXQ7XG52YXIgZ2V0SW50ZXJuYWxTdGF0ZSA9IEludGVybmFsU3RhdGVNb2R1bGUuZ2V0dGVyRm9yKEFSUkFZX0lURVJBVE9SKTtcblxuLy8gYEFycmF5LnByb3RvdHlwZS5lbnRyaWVzYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmVudHJpZXNcbi8vIGBBcnJheS5wcm90b3R5cGUua2V5c2AgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5rZXlzXG4vLyBgQXJyYXkucHJvdG90eXBlLnZhbHVlc2AgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS52YWx1ZXNcbi8vIGBBcnJheS5wcm90b3R5cGVbQEBpdGVyYXRvcl1gIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUtQEBpdGVyYXRvclxuLy8gYENyZWF0ZUFycmF5SXRlcmF0b3JgIGludGVybmFsIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1jcmVhdGVhcnJheWl0ZXJhdG9yXG5tb2R1bGUuZXhwb3J0cyA9IGRlZmluZUl0ZXJhdG9yKEFycmF5LCAnQXJyYXknLCBmdW5jdGlvbiAoaXRlcmF0ZWQsIGtpbmQpIHtcbiAgc2V0SW50ZXJuYWxTdGF0ZSh0aGlzLCB7XG4gICAgdHlwZTogQVJSQVlfSVRFUkFUT1IsXG4gICAgdGFyZ2V0OiB0b0luZGV4ZWRPYmplY3QoaXRlcmF0ZWQpLCAvLyB0YXJnZXRcbiAgICBpbmRleDogMCwgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5leHQgaW5kZXhcbiAgICBraW5kOiBraW5kICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGtpbmRcbiAgfSk7XG4vLyBgJUFycmF5SXRlcmF0b3JQcm90b3R5cGUlLm5leHRgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy0lYXJyYXlpdGVyYXRvcnByb3RvdHlwZSUubmV4dFxufSwgZnVuY3Rpb24gKCkge1xuICB2YXIgc3RhdGUgPSBnZXRJbnRlcm5hbFN0YXRlKHRoaXMpO1xuICB2YXIgdGFyZ2V0ID0gc3RhdGUudGFyZ2V0O1xuICB2YXIga2luZCA9IHN0YXRlLmtpbmQ7XG4gIHZhciBpbmRleCA9IHN0YXRlLmluZGV4Kys7XG4gIGlmICghdGFyZ2V0IHx8IGluZGV4ID49IHRhcmdldC5sZW5ndGgpIHtcbiAgICBzdGF0ZS50YXJnZXQgPSB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIHsgdmFsdWU6IHVuZGVmaW5lZCwgZG9uZTogdHJ1ZSB9O1xuICB9XG4gIGlmIChraW5kID09ICdrZXlzJykgcmV0dXJuIHsgdmFsdWU6IGluZGV4LCBkb25lOiBmYWxzZSB9O1xuICBpZiAoa2luZCA9PSAndmFsdWVzJykgcmV0dXJuIHsgdmFsdWU6IHRhcmdldFtpbmRleF0sIGRvbmU6IGZhbHNlIH07XG4gIHJldHVybiB7IHZhbHVlOiBbaW5kZXgsIHRhcmdldFtpbmRleF1dLCBkb25lOiBmYWxzZSB9O1xufSwgJ3ZhbHVlcycpO1xuXG4vLyBhcmd1bWVudHNMaXN0W0BAaXRlcmF0b3JdIGlzICVBcnJheVByb3RvX3ZhbHVlcyVcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtY3JlYXRldW5tYXBwZWRhcmd1bWVudHNvYmplY3Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtY3JlYXRlbWFwcGVkYXJndW1lbnRzb2JqZWN0XG5JdGVyYXRvcnMuQXJndW1lbnRzID0gSXRlcmF0b3JzLkFycmF5O1xuXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS1AQHVuc2NvcGFibGVzXG5hZGRUb1Vuc2NvcGFibGVzKCdrZXlzJyk7XG5hZGRUb1Vuc2NvcGFibGVzKCd2YWx1ZXMnKTtcbmFkZFRvVW5zY29wYWJsZXMoJ2VudHJpZXMnKTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyICRtYXAgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktaXRlcmF0aW9uJykubWFwO1xudmFyIGFycmF5TWV0aG9kSGFzU3BlY2llc1N1cHBvcnQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktbWV0aG9kLWhhcy1zcGVjaWVzLXN1cHBvcnQnKTtcblxudmFyIEhBU19TUEVDSUVTX1NVUFBPUlQgPSBhcnJheU1ldGhvZEhhc1NwZWNpZXNTdXBwb3J0KCdtYXAnKTtcblxuLy8gYEFycmF5LnByb3RvdHlwZS5tYXBgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUubWFwXG4vLyB3aXRoIGFkZGluZyBzdXBwb3J0IG9mIEBAc3BlY2llc1xuJCh7IHRhcmdldDogJ0FycmF5JywgcHJvdG86IHRydWUsIGZvcmNlZDogIUhBU19TUEVDSUVTX1NVUFBPUlQgfSwge1xuICBtYXA6IGZ1bmN0aW9uIG1hcChjYWxsYmFja2ZuIC8qICwgdGhpc0FyZyAqLykge1xuICAgIHJldHVybiAkbWFwKHRoaXMsIGNhbGxiYWNrZm4sIGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkKTtcbiAgfVxufSk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcbnZhciBpc0FycmF5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWFycmF5Jyk7XG52YXIgdG9BYnNvbHV0ZUluZGV4ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWFic29sdXRlLWluZGV4Jyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tbGVuZ3RoJyk7XG52YXIgdG9JbmRleGVkT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWluZGV4ZWQtb2JqZWN0Jyk7XG52YXIgY3JlYXRlUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLXByb3BlcnR5Jyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG52YXIgYXJyYXlNZXRob2RIYXNTcGVjaWVzU3VwcG9ydCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1tZXRob2QtaGFzLXNwZWNpZXMtc3VwcG9ydCcpO1xuXG52YXIgSEFTX1NQRUNJRVNfU1VQUE9SVCA9IGFycmF5TWV0aG9kSGFzU3BlY2llc1N1cHBvcnQoJ3NsaWNlJyk7XG5cbnZhciBTUEVDSUVTID0gd2VsbEtub3duU3ltYm9sKCdzcGVjaWVzJyk7XG52YXIgbmF0aXZlU2xpY2UgPSBbXS5zbGljZTtcbnZhciBtYXggPSBNYXRoLm1heDtcblxuLy8gYEFycmF5LnByb3RvdHlwZS5zbGljZWAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5zbGljZVxuLy8gZmFsbGJhY2sgZm9yIG5vdCBhcnJheS1saWtlIEVTMyBzdHJpbmdzIGFuZCBET00gb2JqZWN0c1xuJCh7IHRhcmdldDogJ0FycmF5JywgcHJvdG86IHRydWUsIGZvcmNlZDogIUhBU19TUEVDSUVTX1NVUFBPUlQgfSwge1xuICBzbGljZTogZnVuY3Rpb24gc2xpY2Uoc3RhcnQsIGVuZCkge1xuICAgIHZhciBPID0gdG9JbmRleGVkT2JqZWN0KHRoaXMpO1xuICAgIHZhciBsZW5ndGggPSB0b0xlbmd0aChPLmxlbmd0aCk7XG4gICAgdmFyIGsgPSB0b0Fic29sdXRlSW5kZXgoc3RhcnQsIGxlbmd0aCk7XG4gICAgdmFyIGZpbiA9IHRvQWJzb2x1dGVJbmRleChlbmQgPT09IHVuZGVmaW5lZCA/IGxlbmd0aCA6IGVuZCwgbGVuZ3RoKTtcbiAgICAvLyBpbmxpbmUgYEFycmF5U3BlY2llc0NyZWF0ZWAgZm9yIHVzYWdlIG5hdGl2ZSBgQXJyYXkjc2xpY2VgIHdoZXJlIGl0J3MgcG9zc2libGVcbiAgICB2YXIgQ29uc3RydWN0b3IsIHJlc3VsdCwgbjtcbiAgICBpZiAoaXNBcnJheShPKSkge1xuICAgICAgQ29uc3RydWN0b3IgPSBPLmNvbnN0cnVjdG9yO1xuICAgICAgLy8gY3Jvc3MtcmVhbG0gZmFsbGJhY2tcbiAgICAgIGlmICh0eXBlb2YgQ29uc3RydWN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiAoQ29uc3RydWN0b3IgPT09IEFycmF5IHx8IGlzQXJyYXkoQ29uc3RydWN0b3IucHJvdG90eXBlKSkpIHtcbiAgICAgICAgQ29uc3RydWN0b3IgPSB1bmRlZmluZWQ7XG4gICAgICB9IGVsc2UgaWYgKGlzT2JqZWN0KENvbnN0cnVjdG9yKSkge1xuICAgICAgICBDb25zdHJ1Y3RvciA9IENvbnN0cnVjdG9yW1NQRUNJRVNdO1xuICAgICAgICBpZiAoQ29uc3RydWN0b3IgPT09IG51bGwpIENvbnN0cnVjdG9yID0gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgICAgaWYgKENvbnN0cnVjdG9yID09PSBBcnJheSB8fCBDb25zdHJ1Y3RvciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBuYXRpdmVTbGljZS5jYWxsKE8sIGssIGZpbik7XG4gICAgICB9XG4gICAgfVxuICAgIHJlc3VsdCA9IG5ldyAoQ29uc3RydWN0b3IgPT09IHVuZGVmaW5lZCA/IEFycmF5IDogQ29uc3RydWN0b3IpKG1heChmaW4gLSBrLCAwKSk7XG4gICAgZm9yIChuID0gMDsgayA8IGZpbjsgaysrLCBuKyspIGlmIChrIGluIE8pIGNyZWF0ZVByb3BlcnR5KHJlc3VsdCwgbiwgT1trXSk7XG4gICAgcmVzdWx0Lmxlbmd0aCA9IG47XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufSk7XG4iLCJ2YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBkZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5JykuZjtcblxudmFyIEZ1bmN0aW9uUHJvdG90eXBlID0gRnVuY3Rpb24ucHJvdG90eXBlO1xudmFyIEZ1bmN0aW9uUHJvdG90eXBlVG9TdHJpbmcgPSBGdW5jdGlvblByb3RvdHlwZS50b1N0cmluZztcbnZhciBuYW1lUkUgPSAvXlxccypmdW5jdGlvbiAoW14gKF0qKS87XG52YXIgTkFNRSA9ICduYW1lJztcblxuLy8gRnVuY3Rpb24gaW5zdGFuY2VzIGAubmFtZWAgcHJvcGVydHlcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtZnVuY3Rpb24taW5zdGFuY2VzLW5hbWVcbmlmIChERVNDUklQVE9SUyAmJiAhKE5BTUUgaW4gRnVuY3Rpb25Qcm90b3R5cGUpKSB7XG4gIGRlZmluZVByb3BlcnR5KEZ1bmN0aW9uUHJvdG90eXBlLCBOQU1FLCB7XG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIEZ1bmN0aW9uUHJvdG90eXBlVG9TdHJpbmcuY2FsbCh0aGlzKS5tYXRjaChuYW1lUkUpWzFdO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG59XG4iLCJ2YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1vYmplY3QnKTtcbnZhciBuYXRpdmVLZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1rZXlzJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcblxudmFyIEZBSUxTX09OX1BSSU1JVElWRVMgPSBmYWlscyhmdW5jdGlvbiAoKSB7IG5hdGl2ZUtleXMoMSk7IH0pO1xuXG4vLyBgT2JqZWN0LmtleXNgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3Qua2V5c1xuJCh7IHRhcmdldDogJ09iamVjdCcsIHN0YXQ6IHRydWUsIGZvcmNlZDogRkFJTFNfT05fUFJJTUlUSVZFUyB9LCB7XG4gIGtleXM6IGZ1bmN0aW9uIGtleXMoaXQpIHtcbiAgICByZXR1cm4gbmF0aXZlS2V5cyh0b09iamVjdChpdCkpO1xuICB9XG59KTtcbiIsInZhciBUT19TVFJJTkdfVEFHX1NVUFBPUlQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tc3RyaW5nLXRhZy1zdXBwb3J0Jyk7XG52YXIgcmVkZWZpbmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVkZWZpbmUnKTtcbnZhciB0b1N0cmluZyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtdG8tc3RyaW5nJyk7XG5cbi8vIGBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZ1xuaWYgKCFUT19TVFJJTkdfVEFHX1NVUFBPUlQpIHtcbiAgcmVkZWZpbmUoT2JqZWN0LnByb3RvdHlwZSwgJ3RvU3RyaW5nJywgdG9TdHJpbmcsIHsgdW5zYWZlOiB0cnVlIH0pO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgSVNfUFVSRSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1wdXJlJyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIGdldEJ1aWx0SW4gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2V0LWJ1aWx0LWluJyk7XG52YXIgTmF0aXZlUHJvbWlzZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9uYXRpdmUtcHJvbWlzZS1jb25zdHJ1Y3RvcicpO1xudmFyIHJlZGVmaW5lID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlZGVmaW5lJyk7XG52YXIgcmVkZWZpbmVBbGwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVkZWZpbmUtYWxsJyk7XG52YXIgc2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LXNldC1wcm90b3R5cGUtb2YnKTtcbnZhciBzZXRUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zZXQtdG8tc3RyaW5nLXRhZycpO1xudmFyIHNldFNwZWNpZXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2V0LXNwZWNpZXMnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcbnZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYS1mdW5jdGlvbicpO1xudmFyIGFuSW5zdGFuY2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4taW5zdGFuY2UnKTtcbnZhciBpbnNwZWN0U291cmNlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2luc3BlY3Qtc291cmNlJyk7XG52YXIgaXRlcmF0ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pdGVyYXRlJyk7XG52YXIgY2hlY2tDb3JyZWN0bmVzc09mSXRlcmF0aW9uID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NoZWNrLWNvcnJlY3RuZXNzLW9mLWl0ZXJhdGlvbicpO1xudmFyIHNwZWNpZXNDb25zdHJ1Y3RvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zcGVjaWVzLWNvbnN0cnVjdG9yJyk7XG52YXIgdGFzayA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90YXNrJykuc2V0O1xudmFyIG1pY3JvdGFzayA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9taWNyb3Rhc2snKTtcbnZhciBwcm9taXNlUmVzb2x2ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9wcm9taXNlLXJlc29sdmUnKTtcbnZhciBob3N0UmVwb3J0RXJyb3JzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hvc3QtcmVwb3J0LWVycm9ycycpO1xudmFyIG5ld1Byb21pc2VDYXBhYmlsaXR5TW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL25ldy1wcm9taXNlLWNhcGFiaWxpdHknKTtcbnZhciBwZXJmb3JtID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3BlcmZvcm0nKTtcbnZhciBJbnRlcm5hbFN0YXRlTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ludGVybmFsLXN0YXRlJyk7XG52YXIgaXNGb3JjZWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtZm9yY2VkJyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG52YXIgSVNfQlJPV1NFUiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbmdpbmUtaXMtYnJvd3NlcicpO1xudmFyIElTX05PREUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZW5naW5lLWlzLW5vZGUnKTtcbnZhciBWOF9WRVJTSU9OID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2VuZ2luZS12OC12ZXJzaW9uJyk7XG5cbnZhciBTUEVDSUVTID0gd2VsbEtub3duU3ltYm9sKCdzcGVjaWVzJyk7XG52YXIgUFJPTUlTRSA9ICdQcm9taXNlJztcbnZhciBnZXRJbnRlcm5hbFN0YXRlID0gSW50ZXJuYWxTdGF0ZU1vZHVsZS5nZXQ7XG52YXIgc2V0SW50ZXJuYWxTdGF0ZSA9IEludGVybmFsU3RhdGVNb2R1bGUuc2V0O1xudmFyIGdldEludGVybmFsUHJvbWlzZVN0YXRlID0gSW50ZXJuYWxTdGF0ZU1vZHVsZS5nZXR0ZXJGb3IoUFJPTUlTRSk7XG52YXIgTmF0aXZlUHJvbWlzZVByb3RvdHlwZSA9IE5hdGl2ZVByb21pc2UgJiYgTmF0aXZlUHJvbWlzZS5wcm90b3R5cGU7XG52YXIgUHJvbWlzZUNvbnN0cnVjdG9yID0gTmF0aXZlUHJvbWlzZTtcbnZhciBQcm9taXNlQ29uc3RydWN0b3JQcm90b3R5cGUgPSBOYXRpdmVQcm9taXNlUHJvdG90eXBlO1xudmFyIFR5cGVFcnJvciA9IGdsb2JhbC5UeXBlRXJyb3I7XG52YXIgZG9jdW1lbnQgPSBnbG9iYWwuZG9jdW1lbnQ7XG52YXIgcHJvY2VzcyA9IGdsb2JhbC5wcm9jZXNzO1xudmFyIG5ld1Byb21pc2VDYXBhYmlsaXR5ID0gbmV3UHJvbWlzZUNhcGFiaWxpdHlNb2R1bGUuZjtcbnZhciBuZXdHZW5lcmljUHJvbWlzZUNhcGFiaWxpdHkgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eTtcbnZhciBESVNQQVRDSF9FVkVOVCA9ICEhKGRvY3VtZW50ICYmIGRvY3VtZW50LmNyZWF0ZUV2ZW50ICYmIGdsb2JhbC5kaXNwYXRjaEV2ZW50KTtcbnZhciBOQVRJVkVfUkVKRUNUSU9OX0VWRU5UID0gdHlwZW9mIFByb21pc2VSZWplY3Rpb25FdmVudCA9PSAnZnVuY3Rpb24nO1xudmFyIFVOSEFORExFRF9SRUpFQ1RJT04gPSAndW5oYW5kbGVkcmVqZWN0aW9uJztcbnZhciBSRUpFQ1RJT05fSEFORExFRCA9ICdyZWplY3Rpb25oYW5kbGVkJztcbnZhciBQRU5ESU5HID0gMDtcbnZhciBGVUxGSUxMRUQgPSAxO1xudmFyIFJFSkVDVEVEID0gMjtcbnZhciBIQU5ETEVEID0gMTtcbnZhciBVTkhBTkRMRUQgPSAyO1xudmFyIFNVQkNMQVNTSU5HID0gZmFsc2U7XG52YXIgSW50ZXJuYWwsIE93blByb21pc2VDYXBhYmlsaXR5LCBQcm9taXNlV3JhcHBlciwgbmF0aXZlVGhlbjtcblxudmFyIEZPUkNFRCA9IGlzRm9yY2VkKFBST01JU0UsIGZ1bmN0aW9uICgpIHtcbiAgdmFyIFBST01JU0VfQ09OU1RSVUNUT1JfU09VUkNFID0gaW5zcGVjdFNvdXJjZShQcm9taXNlQ29uc3RydWN0b3IpO1xuICB2YXIgR0xPQkFMX0NPUkVfSlNfUFJPTUlTRSA9IFBST01JU0VfQ09OU1RSVUNUT1JfU09VUkNFICE9PSBTdHJpbmcoUHJvbWlzZUNvbnN0cnVjdG9yKTtcbiAgLy8gVjggNi42IChOb2RlIDEwIGFuZCBDaHJvbWUgNjYpIGhhdmUgYSBidWcgd2l0aCByZXNvbHZpbmcgY3VzdG9tIHRoZW5hYmxlc1xuICAvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD04MzA1NjVcbiAgLy8gV2UgY2FuJ3QgZGV0ZWN0IGl0IHN5bmNocm9ub3VzbHksIHNvIGp1c3QgY2hlY2sgdmVyc2lvbnNcbiAgaWYgKCFHTE9CQUxfQ09SRV9KU19QUk9NSVNFICYmIFY4X1ZFUlNJT04gPT09IDY2KSByZXR1cm4gdHJ1ZTtcbiAgLy8gV2UgbmVlZCBQcm9taXNlI2ZpbmFsbHkgaW4gdGhlIHB1cmUgdmVyc2lvbiBmb3IgcHJldmVudGluZyBwcm90b3R5cGUgcG9sbHV0aW9uXG4gIGlmIChJU19QVVJFICYmICFQcm9taXNlQ29uc3RydWN0b3JQcm90b3R5cGVbJ2ZpbmFsbHknXSkgcmV0dXJuIHRydWU7XG4gIC8vIFdlIGNhbid0IHVzZSBAQHNwZWNpZXMgZmVhdHVyZSBkZXRlY3Rpb24gaW4gVjggc2luY2UgaXQgY2F1c2VzXG4gIC8vIGRlb3B0aW1pemF0aW9uIGFuZCBwZXJmb3JtYW5jZSBkZWdyYWRhdGlvblxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvNjc5XG4gIGlmIChWOF9WRVJTSU9OID49IDUxICYmIC9uYXRpdmUgY29kZS8udGVzdChQUk9NSVNFX0NPTlNUUlVDVE9SX1NPVVJDRSkpIHJldHVybiBmYWxzZTtcbiAgLy8gRGV0ZWN0IGNvcnJlY3RuZXNzIG9mIHN1YmNsYXNzaW5nIHdpdGggQEBzcGVjaWVzIHN1cHBvcnRcbiAgdmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZUNvbnN0cnVjdG9yKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUoMSk7IH0pO1xuICB2YXIgRmFrZVByb21pc2UgPSBmdW5jdGlvbiAoZXhlYykge1xuICAgIGV4ZWMoZnVuY3Rpb24gKCkgeyAvKiBlbXB0eSAqLyB9LCBmdW5jdGlvbiAoKSB7IC8qIGVtcHR5ICovIH0pO1xuICB9O1xuICB2YXIgY29uc3RydWN0b3IgPSBwcm9taXNlLmNvbnN0cnVjdG9yID0ge307XG4gIGNvbnN0cnVjdG9yW1NQRUNJRVNdID0gRmFrZVByb21pc2U7XG4gIFNVQkNMQVNTSU5HID0gcHJvbWlzZS50aGVuKGZ1bmN0aW9uICgpIHsgLyogZW1wdHkgKi8gfSkgaW5zdGFuY2VvZiBGYWtlUHJvbWlzZTtcbiAgaWYgKCFTVUJDTEFTU0lORykgcmV0dXJuIHRydWU7XG4gIC8vIFVuaGFuZGxlZCByZWplY3Rpb25zIHRyYWNraW5nIHN1cHBvcnQsIE5vZGVKUyBQcm9taXNlIHdpdGhvdXQgaXQgZmFpbHMgQEBzcGVjaWVzIHRlc3RcbiAgcmV0dXJuICFHTE9CQUxfQ09SRV9KU19QUk9NSVNFICYmIElTX0JST1dTRVIgJiYgIU5BVElWRV9SRUpFQ1RJT05fRVZFTlQ7XG59KTtcblxudmFyIElOQ09SUkVDVF9JVEVSQVRJT04gPSBGT1JDRUQgfHwgIWNoZWNrQ29ycmVjdG5lc3NPZkl0ZXJhdGlvbihmdW5jdGlvbiAoaXRlcmFibGUpIHtcbiAgUHJvbWlzZUNvbnN0cnVjdG9yLmFsbChpdGVyYWJsZSlbJ2NhdGNoJ10oZnVuY3Rpb24gKCkgeyAvKiBlbXB0eSAqLyB9KTtcbn0pO1xuXG4vLyBoZWxwZXJzXG52YXIgaXNUaGVuYWJsZSA9IGZ1bmN0aW9uIChpdCkge1xuICB2YXIgdGhlbjtcbiAgcmV0dXJuIGlzT2JqZWN0KGl0KSAmJiB0eXBlb2YgKHRoZW4gPSBpdC50aGVuKSA9PSAnZnVuY3Rpb24nID8gdGhlbiA6IGZhbHNlO1xufTtcblxudmFyIG5vdGlmeSA9IGZ1bmN0aW9uIChzdGF0ZSwgaXNSZWplY3QpIHtcbiAgaWYgKHN0YXRlLm5vdGlmaWVkKSByZXR1cm47XG4gIHN0YXRlLm5vdGlmaWVkID0gdHJ1ZTtcbiAgdmFyIGNoYWluID0gc3RhdGUucmVhY3Rpb25zO1xuICBtaWNyb3Rhc2soZnVuY3Rpb24gKCkge1xuICAgIHZhciB2YWx1ZSA9IHN0YXRlLnZhbHVlO1xuICAgIHZhciBvayA9IHN0YXRlLnN0YXRlID09IEZVTEZJTExFRDtcbiAgICB2YXIgaW5kZXggPSAwO1xuICAgIC8vIHZhcmlhYmxlIGxlbmd0aCAtIGNhbid0IHVzZSBmb3JFYWNoXG4gICAgd2hpbGUgKGNoYWluLmxlbmd0aCA+IGluZGV4KSB7XG4gICAgICB2YXIgcmVhY3Rpb24gPSBjaGFpbltpbmRleCsrXTtcbiAgICAgIHZhciBoYW5kbGVyID0gb2sgPyByZWFjdGlvbi5vayA6IHJlYWN0aW9uLmZhaWw7XG4gICAgICB2YXIgcmVzb2x2ZSA9IHJlYWN0aW9uLnJlc29sdmU7XG4gICAgICB2YXIgcmVqZWN0ID0gcmVhY3Rpb24ucmVqZWN0O1xuICAgICAgdmFyIGRvbWFpbiA9IHJlYWN0aW9uLmRvbWFpbjtcbiAgICAgIHZhciByZXN1bHQsIHRoZW4sIGV4aXRlZDtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmIChoYW5kbGVyKSB7XG4gICAgICAgICAgaWYgKCFvaykge1xuICAgICAgICAgICAgaWYgKHN0YXRlLnJlamVjdGlvbiA9PT0gVU5IQU5ETEVEKSBvbkhhbmRsZVVuaGFuZGxlZChzdGF0ZSk7XG4gICAgICAgICAgICBzdGF0ZS5yZWplY3Rpb24gPSBIQU5ETEVEO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoaGFuZGxlciA9PT0gdHJ1ZSkgcmVzdWx0ID0gdmFsdWU7XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoZG9tYWluKSBkb21haW4uZW50ZXIoKTtcbiAgICAgICAgICAgIHJlc3VsdCA9IGhhbmRsZXIodmFsdWUpOyAvLyBjYW4gdGhyb3dcbiAgICAgICAgICAgIGlmIChkb21haW4pIHtcbiAgICAgICAgICAgICAgZG9tYWluLmV4aXQoKTtcbiAgICAgICAgICAgICAgZXhpdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHJlc3VsdCA9PT0gcmVhY3Rpb24ucHJvbWlzZSkge1xuICAgICAgICAgICAgcmVqZWN0KFR5cGVFcnJvcignUHJvbWlzZS1jaGFpbiBjeWNsZScpKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHRoZW4gPSBpc1RoZW5hYmxlKHJlc3VsdCkpIHtcbiAgICAgICAgICAgIHRoZW4uY2FsbChyZXN1bHQsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSBlbHNlIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgfSBlbHNlIHJlamVjdCh2YWx1ZSk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBpZiAoZG9tYWluICYmICFleGl0ZWQpIGRvbWFpbi5leGl0KCk7XG4gICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICB9XG4gICAgfVxuICAgIHN0YXRlLnJlYWN0aW9ucyA9IFtdO1xuICAgIHN0YXRlLm5vdGlmaWVkID0gZmFsc2U7XG4gICAgaWYgKGlzUmVqZWN0ICYmICFzdGF0ZS5yZWplY3Rpb24pIG9uVW5oYW5kbGVkKHN0YXRlKTtcbiAgfSk7XG59O1xuXG52YXIgZGlzcGF0Y2hFdmVudCA9IGZ1bmN0aW9uIChuYW1lLCBwcm9taXNlLCByZWFzb24pIHtcbiAgdmFyIGV2ZW50LCBoYW5kbGVyO1xuICBpZiAoRElTUEFUQ0hfRVZFTlQpIHtcbiAgICBldmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdFdmVudCcpO1xuICAgIGV2ZW50LnByb21pc2UgPSBwcm9taXNlO1xuICAgIGV2ZW50LnJlYXNvbiA9IHJlYXNvbjtcbiAgICBldmVudC5pbml0RXZlbnQobmFtZSwgZmFsc2UsIHRydWUpO1xuICAgIGdsb2JhbC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgfSBlbHNlIGV2ZW50ID0geyBwcm9taXNlOiBwcm9taXNlLCByZWFzb246IHJlYXNvbiB9O1xuICBpZiAoIU5BVElWRV9SRUpFQ1RJT05fRVZFTlQgJiYgKGhhbmRsZXIgPSBnbG9iYWxbJ29uJyArIG5hbWVdKSkgaGFuZGxlcihldmVudCk7XG4gIGVsc2UgaWYgKG5hbWUgPT09IFVOSEFORExFRF9SRUpFQ1RJT04pIGhvc3RSZXBvcnRFcnJvcnMoJ1VuaGFuZGxlZCBwcm9taXNlIHJlamVjdGlvbicsIHJlYXNvbik7XG59O1xuXG52YXIgb25VbmhhbmRsZWQgPSBmdW5jdGlvbiAoc3RhdGUpIHtcbiAgdGFzay5jYWxsKGdsb2JhbCwgZnVuY3Rpb24gKCkge1xuICAgIHZhciBwcm9taXNlID0gc3RhdGUuZmFjYWRlO1xuICAgIHZhciB2YWx1ZSA9IHN0YXRlLnZhbHVlO1xuICAgIHZhciBJU19VTkhBTkRMRUQgPSBpc1VuaGFuZGxlZChzdGF0ZSk7XG4gICAgdmFyIHJlc3VsdDtcbiAgICBpZiAoSVNfVU5IQU5ETEVEKSB7XG4gICAgICByZXN1bHQgPSBwZXJmb3JtKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKElTX05PREUpIHtcbiAgICAgICAgICBwcm9jZXNzLmVtaXQoJ3VuaGFuZGxlZFJlamVjdGlvbicsIHZhbHVlLCBwcm9taXNlKTtcbiAgICAgICAgfSBlbHNlIGRpc3BhdGNoRXZlbnQoVU5IQU5ETEVEX1JFSkVDVElPTiwgcHJvbWlzZSwgdmFsdWUpO1xuICAgICAgfSk7XG4gICAgICAvLyBCcm93c2VycyBzaG91bGQgbm90IHRyaWdnZXIgYHJlamVjdGlvbkhhbmRsZWRgIGV2ZW50IGlmIGl0IHdhcyBoYW5kbGVkIGhlcmUsIE5vZGVKUyAtIHNob3VsZFxuICAgICAgc3RhdGUucmVqZWN0aW9uID0gSVNfTk9ERSB8fCBpc1VuaGFuZGxlZChzdGF0ZSkgPyBVTkhBTkRMRUQgOiBIQU5ETEVEO1xuICAgICAgaWYgKHJlc3VsdC5lcnJvcikgdGhyb3cgcmVzdWx0LnZhbHVlO1xuICAgIH1cbiAgfSk7XG59O1xuXG52YXIgaXNVbmhhbmRsZWQgPSBmdW5jdGlvbiAoc3RhdGUpIHtcbiAgcmV0dXJuIHN0YXRlLnJlamVjdGlvbiAhPT0gSEFORExFRCAmJiAhc3RhdGUucGFyZW50O1xufTtcblxudmFyIG9uSGFuZGxlVW5oYW5kbGVkID0gZnVuY3Rpb24gKHN0YXRlKSB7XG4gIHRhc2suY2FsbChnbG9iYWwsIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcHJvbWlzZSA9IHN0YXRlLmZhY2FkZTtcbiAgICBpZiAoSVNfTk9ERSkge1xuICAgICAgcHJvY2Vzcy5lbWl0KCdyZWplY3Rpb25IYW5kbGVkJywgcHJvbWlzZSk7XG4gICAgfSBlbHNlIGRpc3BhdGNoRXZlbnQoUkVKRUNUSU9OX0hBTkRMRUQsIHByb21pc2UsIHN0YXRlLnZhbHVlKTtcbiAgfSk7XG59O1xuXG52YXIgYmluZCA9IGZ1bmN0aW9uIChmbiwgc3RhdGUsIHVud3JhcCkge1xuICByZXR1cm4gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgZm4oc3RhdGUsIHZhbHVlLCB1bndyYXApO1xuICB9O1xufTtcblxudmFyIGludGVybmFsUmVqZWN0ID0gZnVuY3Rpb24gKHN0YXRlLCB2YWx1ZSwgdW53cmFwKSB7XG4gIGlmIChzdGF0ZS5kb25lKSByZXR1cm47XG4gIHN0YXRlLmRvbmUgPSB0cnVlO1xuICBpZiAodW53cmFwKSBzdGF0ZSA9IHVud3JhcDtcbiAgc3RhdGUudmFsdWUgPSB2YWx1ZTtcbiAgc3RhdGUuc3RhdGUgPSBSRUpFQ1RFRDtcbiAgbm90aWZ5KHN0YXRlLCB0cnVlKTtcbn07XG5cbnZhciBpbnRlcm5hbFJlc29sdmUgPSBmdW5jdGlvbiAoc3RhdGUsIHZhbHVlLCB1bndyYXApIHtcbiAgaWYgKHN0YXRlLmRvbmUpIHJldHVybjtcbiAgc3RhdGUuZG9uZSA9IHRydWU7XG4gIGlmICh1bndyYXApIHN0YXRlID0gdW53cmFwO1xuICB0cnkge1xuICAgIGlmIChzdGF0ZS5mYWNhZGUgPT09IHZhbHVlKSB0aHJvdyBUeXBlRXJyb3IoXCJQcm9taXNlIGNhbid0IGJlIHJlc29sdmVkIGl0c2VsZlwiKTtcbiAgICB2YXIgdGhlbiA9IGlzVGhlbmFibGUodmFsdWUpO1xuICAgIGlmICh0aGVuKSB7XG4gICAgICBtaWNyb3Rhc2soZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgd3JhcHBlciA9IHsgZG9uZTogZmFsc2UgfTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICB0aGVuLmNhbGwodmFsdWUsXG4gICAgICAgICAgICBiaW5kKGludGVybmFsUmVzb2x2ZSwgd3JhcHBlciwgc3RhdGUpLFxuICAgICAgICAgICAgYmluZChpbnRlcm5hbFJlamVjdCwgd3JhcHBlciwgc3RhdGUpXG4gICAgICAgICAgKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICBpbnRlcm5hbFJlamVjdCh3cmFwcGVyLCBlcnJvciwgc3RhdGUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RhdGUudmFsdWUgPSB2YWx1ZTtcbiAgICAgIHN0YXRlLnN0YXRlID0gRlVMRklMTEVEO1xuICAgICAgbm90aWZ5KHN0YXRlLCBmYWxzZSk7XG4gICAgfVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGludGVybmFsUmVqZWN0KHsgZG9uZTogZmFsc2UgfSwgZXJyb3IsIHN0YXRlKTtcbiAgfVxufTtcblxuLy8gY29uc3RydWN0b3IgcG9seWZpbGxcbmlmIChGT1JDRUQpIHtcbiAgLy8gMjUuNC4zLjEgUHJvbWlzZShleGVjdXRvcilcbiAgUHJvbWlzZUNvbnN0cnVjdG9yID0gZnVuY3Rpb24gUHJvbWlzZShleGVjdXRvcikge1xuICAgIGFuSW5zdGFuY2UodGhpcywgUHJvbWlzZUNvbnN0cnVjdG9yLCBQUk9NSVNFKTtcbiAgICBhRnVuY3Rpb24oZXhlY3V0b3IpO1xuICAgIEludGVybmFsLmNhbGwodGhpcyk7XG4gICAgdmFyIHN0YXRlID0gZ2V0SW50ZXJuYWxTdGF0ZSh0aGlzKTtcbiAgICB0cnkge1xuICAgICAgZXhlY3V0b3IoYmluZChpbnRlcm5hbFJlc29sdmUsIHN0YXRlKSwgYmluZChpbnRlcm5hbFJlamVjdCwgc3RhdGUpKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgaW50ZXJuYWxSZWplY3Qoc3RhdGUsIGVycm9yKTtcbiAgICB9XG4gIH07XG4gIFByb21pc2VDb25zdHJ1Y3RvclByb3RvdHlwZSA9IFByb21pc2VDb25zdHJ1Y3Rvci5wcm90b3R5cGU7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFycyAtLSByZXF1aXJlZCBmb3IgYC5sZW5ndGhgXG4gIEludGVybmFsID0gZnVuY3Rpb24gUHJvbWlzZShleGVjdXRvcikge1xuICAgIHNldEludGVybmFsU3RhdGUodGhpcywge1xuICAgICAgdHlwZTogUFJPTUlTRSxcbiAgICAgIGRvbmU6IGZhbHNlLFxuICAgICAgbm90aWZpZWQ6IGZhbHNlLFxuICAgICAgcGFyZW50OiBmYWxzZSxcbiAgICAgIHJlYWN0aW9uczogW10sXG4gICAgICByZWplY3Rpb246IGZhbHNlLFxuICAgICAgc3RhdGU6IFBFTkRJTkcsXG4gICAgICB2YWx1ZTogdW5kZWZpbmVkXG4gICAgfSk7XG4gIH07XG4gIEludGVybmFsLnByb3RvdHlwZSA9IHJlZGVmaW5lQWxsKFByb21pc2VDb25zdHJ1Y3RvclByb3RvdHlwZSwge1xuICAgIC8vIGBQcm9taXNlLnByb3RvdHlwZS50aGVuYCBtZXRob2RcbiAgICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXByb21pc2UucHJvdG90eXBlLnRoZW5cbiAgICB0aGVuOiBmdW5jdGlvbiB0aGVuKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKSB7XG4gICAgICB2YXIgc3RhdGUgPSBnZXRJbnRlcm5hbFByb21pc2VTdGF0ZSh0aGlzKTtcbiAgICAgIHZhciByZWFjdGlvbiA9IG5ld1Byb21pc2VDYXBhYmlsaXR5KHNwZWNpZXNDb25zdHJ1Y3Rvcih0aGlzLCBQcm9taXNlQ29uc3RydWN0b3IpKTtcbiAgICAgIHJlYWN0aW9uLm9rID0gdHlwZW9mIG9uRnVsZmlsbGVkID09ICdmdW5jdGlvbicgPyBvbkZ1bGZpbGxlZCA6IHRydWU7XG4gICAgICByZWFjdGlvbi5mYWlsID0gdHlwZW9mIG9uUmVqZWN0ZWQgPT0gJ2Z1bmN0aW9uJyAmJiBvblJlamVjdGVkO1xuICAgICAgcmVhY3Rpb24uZG9tYWluID0gSVNfTk9ERSA/IHByb2Nlc3MuZG9tYWluIDogdW5kZWZpbmVkO1xuICAgICAgc3RhdGUucGFyZW50ID0gdHJ1ZTtcbiAgICAgIHN0YXRlLnJlYWN0aW9ucy5wdXNoKHJlYWN0aW9uKTtcbiAgICAgIGlmIChzdGF0ZS5zdGF0ZSAhPSBQRU5ESU5HKSBub3RpZnkoc3RhdGUsIGZhbHNlKTtcbiAgICAgIHJldHVybiByZWFjdGlvbi5wcm9taXNlO1xuICAgIH0sXG4gICAgLy8gYFByb21pc2UucHJvdG90eXBlLmNhdGNoYCBtZXRob2RcbiAgICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXByb21pc2UucHJvdG90eXBlLmNhdGNoXG4gICAgJ2NhdGNoJzogZnVuY3Rpb24gKG9uUmVqZWN0ZWQpIHtcbiAgICAgIHJldHVybiB0aGlzLnRoZW4odW5kZWZpbmVkLCBvblJlamVjdGVkKTtcbiAgICB9XG4gIH0pO1xuICBPd25Qcm9taXNlQ2FwYWJpbGl0eSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcHJvbWlzZSA9IG5ldyBJbnRlcm5hbCgpO1xuICAgIHZhciBzdGF0ZSA9IGdldEludGVybmFsU3RhdGUocHJvbWlzZSk7XG4gICAgdGhpcy5wcm9taXNlID0gcHJvbWlzZTtcbiAgICB0aGlzLnJlc29sdmUgPSBiaW5kKGludGVybmFsUmVzb2x2ZSwgc3RhdGUpO1xuICAgIHRoaXMucmVqZWN0ID0gYmluZChpbnRlcm5hbFJlamVjdCwgc3RhdGUpO1xuICB9O1xuICBuZXdQcm9taXNlQ2FwYWJpbGl0eU1vZHVsZS5mID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkgPSBmdW5jdGlvbiAoQykge1xuICAgIHJldHVybiBDID09PSBQcm9taXNlQ29uc3RydWN0b3IgfHwgQyA9PT0gUHJvbWlzZVdyYXBwZXJcbiAgICAgID8gbmV3IE93blByb21pc2VDYXBhYmlsaXR5KEMpXG4gICAgICA6IG5ld0dlbmVyaWNQcm9taXNlQ2FwYWJpbGl0eShDKTtcbiAgfTtcblxuICBpZiAoIUlTX1BVUkUgJiYgdHlwZW9mIE5hdGl2ZVByb21pc2UgPT0gJ2Z1bmN0aW9uJyAmJiBOYXRpdmVQcm9taXNlUHJvdG90eXBlICE9PSBPYmplY3QucHJvdG90eXBlKSB7XG4gICAgbmF0aXZlVGhlbiA9IE5hdGl2ZVByb21pc2VQcm90b3R5cGUudGhlbjtcblxuICAgIGlmICghU1VCQ0xBU1NJTkcpIHtcbiAgICAgIC8vIG1ha2UgYFByb21pc2UjdGhlbmAgcmV0dXJuIGEgcG9seWZpbGxlZCBgUHJvbWlzZWAgZm9yIG5hdGl2ZSBwcm9taXNlLWJhc2VkIEFQSXNcbiAgICAgIHJlZGVmaW5lKE5hdGl2ZVByb21pc2VQcm90b3R5cGUsICd0aGVuJywgZnVuY3Rpb24gdGhlbihvbkZ1bGZpbGxlZCwgb25SZWplY3RlZCkge1xuICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZUNvbnN0cnVjdG9yKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICBuYXRpdmVUaGVuLmNhbGwodGhhdCwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSkudGhlbihvbkZ1bGZpbGxlZCwgb25SZWplY3RlZCk7XG4gICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvNjQwXG4gICAgICB9LCB7IHVuc2FmZTogdHJ1ZSB9KTtcblxuICAgICAgLy8gbWFrZXMgc3VyZSB0aGF0IG5hdGl2ZSBwcm9taXNlLWJhc2VkIEFQSXMgYFByb21pc2UjY2F0Y2hgIHByb3Blcmx5IHdvcmtzIHdpdGggcGF0Y2hlZCBgUHJvbWlzZSN0aGVuYFxuICAgICAgcmVkZWZpbmUoTmF0aXZlUHJvbWlzZVByb3RvdHlwZSwgJ2NhdGNoJywgUHJvbWlzZUNvbnN0cnVjdG9yUHJvdG90eXBlWydjYXRjaCddLCB7IHVuc2FmZTogdHJ1ZSB9KTtcbiAgICB9XG5cbiAgICAvLyBtYWtlIGAuY29uc3RydWN0b3IgPT09IFByb21pc2VgIHdvcmsgZm9yIG5hdGl2ZSBwcm9taXNlLWJhc2VkIEFQSXNcbiAgICB0cnkge1xuICAgICAgZGVsZXRlIE5hdGl2ZVByb21pc2VQcm90b3R5cGUuY29uc3RydWN0b3I7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHsgLyogZW1wdHkgKi8gfVxuXG4gICAgLy8gbWFrZSBgaW5zdGFuY2VvZiBQcm9taXNlYCB3b3JrIGZvciBuYXRpdmUgcHJvbWlzZS1iYXNlZCBBUElzXG4gICAgaWYgKHNldFByb3RvdHlwZU9mKSB7XG4gICAgICBzZXRQcm90b3R5cGVPZihOYXRpdmVQcm9taXNlUHJvdG90eXBlLCBQcm9taXNlQ29uc3RydWN0b3JQcm90b3R5cGUpO1xuICAgIH1cbiAgfVxufVxuXG4kKHsgZ2xvYmFsOiB0cnVlLCB3cmFwOiB0cnVlLCBmb3JjZWQ6IEZPUkNFRCB9LCB7XG4gIFByb21pc2U6IFByb21pc2VDb25zdHJ1Y3RvclxufSk7XG5cbnNldFRvU3RyaW5nVGFnKFByb21pc2VDb25zdHJ1Y3RvciwgUFJPTUlTRSwgZmFsc2UsIHRydWUpO1xuc2V0U3BlY2llcyhQUk9NSVNFKTtcblxuUHJvbWlzZVdyYXBwZXIgPSBnZXRCdWlsdEluKFBST01JU0UpO1xuXG4vLyBzdGF0aWNzXG4kKHsgdGFyZ2V0OiBQUk9NSVNFLCBzdGF0OiB0cnVlLCBmb3JjZWQ6IEZPUkNFRCB9LCB7XG4gIC8vIGBQcm9taXNlLnJlamVjdGAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtcHJvbWlzZS5yZWplY3RcbiAgcmVqZWN0OiBmdW5jdGlvbiByZWplY3Qocikge1xuICAgIHZhciBjYXBhYmlsaXR5ID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkodGhpcyk7XG4gICAgY2FwYWJpbGl0eS5yZWplY3QuY2FsbCh1bmRlZmluZWQsIHIpO1xuICAgIHJldHVybiBjYXBhYmlsaXR5LnByb21pc2U7XG4gIH1cbn0pO1xuXG4kKHsgdGFyZ2V0OiBQUk9NSVNFLCBzdGF0OiB0cnVlLCBmb3JjZWQ6IElTX1BVUkUgfHwgRk9SQ0VEIH0sIHtcbiAgLy8gYFByb21pc2UucmVzb2x2ZWAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtcHJvbWlzZS5yZXNvbHZlXG4gIHJlc29sdmU6IGZ1bmN0aW9uIHJlc29sdmUoeCkge1xuICAgIHJldHVybiBwcm9taXNlUmVzb2x2ZShJU19QVVJFICYmIHRoaXMgPT09IFByb21pc2VXcmFwcGVyID8gUHJvbWlzZUNvbnN0cnVjdG9yIDogdGhpcywgeCk7XG4gIH1cbn0pO1xuXG4kKHsgdGFyZ2V0OiBQUk9NSVNFLCBzdGF0OiB0cnVlLCBmb3JjZWQ6IElOQ09SUkVDVF9JVEVSQVRJT04gfSwge1xuICAvLyBgUHJvbWlzZS5hbGxgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXByb21pc2UuYWxsXG4gIGFsbDogZnVuY3Rpb24gYWxsKGl0ZXJhYmxlKSB7XG4gICAgdmFyIEMgPSB0aGlzO1xuICAgIHZhciBjYXBhYmlsaXR5ID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkoQyk7XG4gICAgdmFyIHJlc29sdmUgPSBjYXBhYmlsaXR5LnJlc29sdmU7XG4gICAgdmFyIHJlamVjdCA9IGNhcGFiaWxpdHkucmVqZWN0O1xuICAgIHZhciByZXN1bHQgPSBwZXJmb3JtKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciAkcHJvbWlzZVJlc29sdmUgPSBhRnVuY3Rpb24oQy5yZXNvbHZlKTtcbiAgICAgIHZhciB2YWx1ZXMgPSBbXTtcbiAgICAgIHZhciBjb3VudGVyID0gMDtcbiAgICAgIHZhciByZW1haW5pbmcgPSAxO1xuICAgICAgaXRlcmF0ZShpdGVyYWJsZSwgZnVuY3Rpb24gKHByb21pc2UpIHtcbiAgICAgICAgdmFyIGluZGV4ID0gY291bnRlcisrO1xuICAgICAgICB2YXIgYWxyZWFkeUNhbGxlZCA9IGZhbHNlO1xuICAgICAgICB2YWx1ZXMucHVzaCh1bmRlZmluZWQpO1xuICAgICAgICByZW1haW5pbmcrKztcbiAgICAgICAgJHByb21pc2VSZXNvbHZlLmNhbGwoQywgcHJvbWlzZSkudGhlbihmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICBpZiAoYWxyZWFkeUNhbGxlZCkgcmV0dXJuO1xuICAgICAgICAgIGFscmVhZHlDYWxsZWQgPSB0cnVlO1xuICAgICAgICAgIHZhbHVlc1tpbmRleF0gPSB2YWx1ZTtcbiAgICAgICAgICAtLXJlbWFpbmluZyB8fCByZXNvbHZlKHZhbHVlcyk7XG4gICAgICAgIH0sIHJlamVjdCk7XG4gICAgICB9KTtcbiAgICAgIC0tcmVtYWluaW5nIHx8IHJlc29sdmUodmFsdWVzKTtcbiAgICB9KTtcbiAgICBpZiAocmVzdWx0LmVycm9yKSByZWplY3QocmVzdWx0LnZhbHVlKTtcbiAgICByZXR1cm4gY2FwYWJpbGl0eS5wcm9taXNlO1xuICB9LFxuICAvLyBgUHJvbWlzZS5yYWNlYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1wcm9taXNlLnJhY2VcbiAgcmFjZTogZnVuY3Rpb24gcmFjZShpdGVyYWJsZSkge1xuICAgIHZhciBDID0gdGhpcztcbiAgICB2YXIgY2FwYWJpbGl0eSA9IG5ld1Byb21pc2VDYXBhYmlsaXR5KEMpO1xuICAgIHZhciByZWplY3QgPSBjYXBhYmlsaXR5LnJlamVjdDtcbiAgICB2YXIgcmVzdWx0ID0gcGVyZm9ybShmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgJHByb21pc2VSZXNvbHZlID0gYUZ1bmN0aW9uKEMucmVzb2x2ZSk7XG4gICAgICBpdGVyYXRlKGl0ZXJhYmxlLCBmdW5jdGlvbiAocHJvbWlzZSkge1xuICAgICAgICAkcHJvbWlzZVJlc29sdmUuY2FsbChDLCBwcm9taXNlKS50aGVuKGNhcGFiaWxpdHkucmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIGlmIChyZXN1bHQuZXJyb3IpIHJlamVjdChyZXN1bHQudmFsdWUpO1xuICAgIHJldHVybiBjYXBhYmlsaXR5LnByb21pc2U7XG4gIH1cbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgZXhlYyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWdleHAtZXhlYycpO1xuXG4vLyBgUmVnRXhwLnByb3RvdHlwZS5leGVjYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtcmVnZXhwLnByb3RvdHlwZS5leGVjXG4kKHsgdGFyZ2V0OiAnUmVnRXhwJywgcHJvdG86IHRydWUsIGZvcmNlZDogLy4vLmV4ZWMgIT09IGV4ZWMgfSwge1xuICBleGVjOiBleGVjXG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBjaGFyQXQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc3RyaW5nLW11bHRpYnl0ZScpLmNoYXJBdDtcbnZhciBJbnRlcm5hbFN0YXRlTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ludGVybmFsLXN0YXRlJyk7XG52YXIgZGVmaW5lSXRlcmF0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVmaW5lLWl0ZXJhdG9yJyk7XG5cbnZhciBTVFJJTkdfSVRFUkFUT1IgPSAnU3RyaW5nIEl0ZXJhdG9yJztcbnZhciBzZXRJbnRlcm5hbFN0YXRlID0gSW50ZXJuYWxTdGF0ZU1vZHVsZS5zZXQ7XG52YXIgZ2V0SW50ZXJuYWxTdGF0ZSA9IEludGVybmFsU3RhdGVNb2R1bGUuZ2V0dGVyRm9yKFNUUklOR19JVEVSQVRPUik7XG5cbi8vIGBTdHJpbmcucHJvdG90eXBlW0BAaXRlcmF0b3JdYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtc3RyaW5nLnByb3RvdHlwZS1AQGl0ZXJhdG9yXG5kZWZpbmVJdGVyYXRvcihTdHJpbmcsICdTdHJpbmcnLCBmdW5jdGlvbiAoaXRlcmF0ZWQpIHtcbiAgc2V0SW50ZXJuYWxTdGF0ZSh0aGlzLCB7XG4gICAgdHlwZTogU1RSSU5HX0lURVJBVE9SLFxuICAgIHN0cmluZzogU3RyaW5nKGl0ZXJhdGVkKSxcbiAgICBpbmRleDogMFxuICB9KTtcbi8vIGAlU3RyaW5nSXRlcmF0b3JQcm90b3R5cGUlLm5leHRgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy0lc3RyaW5naXRlcmF0b3Jwcm90b3R5cGUlLm5leHRcbn0sIGZ1bmN0aW9uIG5leHQoKSB7XG4gIHZhciBzdGF0ZSA9IGdldEludGVybmFsU3RhdGUodGhpcyk7XG4gIHZhciBzdHJpbmcgPSBzdGF0ZS5zdHJpbmc7XG4gIHZhciBpbmRleCA9IHN0YXRlLmluZGV4O1xuICB2YXIgcG9pbnQ7XG4gIGlmIChpbmRleCA+PSBzdHJpbmcubGVuZ3RoKSByZXR1cm4geyB2YWx1ZTogdW5kZWZpbmVkLCBkb25lOiB0cnVlIH07XG4gIHBvaW50ID0gY2hhckF0KHN0cmluZywgaW5kZXgpO1xuICBzdGF0ZS5pbmRleCArPSBwb2ludC5sZW5ndGg7XG4gIHJldHVybiB7IHZhbHVlOiBwb2ludCwgZG9uZTogZmFsc2UgfTtcbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGZpeFJlZ0V4cFdlbGxLbm93blN5bWJvbExvZ2ljID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZpeC1yZWdleHAtd2VsbC1rbm93bi1zeW1ib2wtbG9naWMnKTtcbnZhciBpc1JlZ0V4cCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1yZWdleHAnKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1vYmplY3QnKTtcbnZhciByZXF1aXJlT2JqZWN0Q29lcmNpYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlcXVpcmUtb2JqZWN0LWNvZXJjaWJsZScpO1xudmFyIHNwZWNpZXNDb25zdHJ1Y3RvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zcGVjaWVzLWNvbnN0cnVjdG9yJyk7XG52YXIgYWR2YW5jZVN0cmluZ0luZGV4ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FkdmFuY2Utc3RyaW5nLWluZGV4Jyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tbGVuZ3RoJyk7XG52YXIgY2FsbFJlZ0V4cEV4ZWMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVnZXhwLWV4ZWMtYWJzdHJhY3QnKTtcbnZhciByZWdleHBFeGVjID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlZ2V4cC1leGVjJyk7XG52YXIgc3RpY2t5SGVscGVycyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWdleHAtc3RpY2t5LWhlbHBlcnMnKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xuXG52YXIgVU5TVVBQT1JURURfWSA9IHN0aWNreUhlbHBlcnMuVU5TVVBQT1JURURfWTtcbnZhciBhcnJheVB1c2ggPSBbXS5wdXNoO1xudmFyIG1pbiA9IE1hdGgubWluO1xudmFyIE1BWF9VSU5UMzIgPSAweEZGRkZGRkZGO1xuXG4vLyBDaHJvbWUgNTEgaGFzIGEgYnVnZ3kgXCJzcGxpdFwiIGltcGxlbWVudGF0aW9uIHdoZW4gUmVnRXhwI2V4ZWMgIT09IG5hdGl2ZUV4ZWNcbi8vIFdlZXggSlMgaGFzIGZyb3plbiBidWlsdC1pbiBwcm90b3R5cGVzLCBzbyB1c2UgdHJ5IC8gY2F0Y2ggd3JhcHBlclxudmFyIFNQTElUX1dPUktTX1dJVEhfT1ZFUldSSVRURU5fRVhFQyA9ICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWdleHAvbm8tZW1wdHktZ3JvdXAgLS0gcmVxdWlyZWQgZm9yIHRlc3RpbmdcbiAgdmFyIHJlID0gLyg/OikvO1xuICB2YXIgb3JpZ2luYWxFeGVjID0gcmUuZXhlYztcbiAgcmUuZXhlYyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG9yaWdpbmFsRXhlYy5hcHBseSh0aGlzLCBhcmd1bWVudHMpOyB9O1xuICB2YXIgcmVzdWx0ID0gJ2FiJy5zcGxpdChyZSk7XG4gIHJldHVybiByZXN1bHQubGVuZ3RoICE9PSAyIHx8IHJlc3VsdFswXSAhPT0gJ2EnIHx8IHJlc3VsdFsxXSAhPT0gJ2InO1xufSk7XG5cbi8vIEBAc3BsaXQgbG9naWNcbmZpeFJlZ0V4cFdlbGxLbm93blN5bWJvbExvZ2ljKCdzcGxpdCcsIGZ1bmN0aW9uIChTUExJVCwgbmF0aXZlU3BsaXQsIG1heWJlQ2FsbE5hdGl2ZSkge1xuICB2YXIgaW50ZXJuYWxTcGxpdDtcbiAgaWYgKFxuICAgICdhYmJjJy5zcGxpdCgvKGIpKi8pWzFdID09ICdjJyB8fFxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWdleHAvbm8tZW1wdHktZ3JvdXAgLS0gcmVxdWlyZWQgZm9yIHRlc3RpbmdcbiAgICAndGVzdCcuc3BsaXQoLyg/OikvLCAtMSkubGVuZ3RoICE9IDQgfHxcbiAgICAnYWInLnNwbGl0KC8oPzphYikqLykubGVuZ3RoICE9IDIgfHxcbiAgICAnLicuc3BsaXQoLyguPykoLj8pLykubGVuZ3RoICE9IDQgfHxcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVnZXhwL25vLWFzc2VydGlvbi1jYXB0dXJpbmctZ3JvdXAsIHJlZ2V4cC9uby1lbXB0eS1ncm91cCAtLSByZXF1aXJlZCBmb3IgdGVzdGluZ1xuICAgICcuJy5zcGxpdCgvKCkoKS8pLmxlbmd0aCA+IDEgfHxcbiAgICAnJy5zcGxpdCgvLj8vKS5sZW5ndGhcbiAgKSB7XG4gICAgLy8gYmFzZWQgb24gZXM1LXNoaW0gaW1wbGVtZW50YXRpb24sIG5lZWQgdG8gcmV3b3JrIGl0XG4gICAgaW50ZXJuYWxTcGxpdCA9IGZ1bmN0aW9uIChzZXBhcmF0b3IsIGxpbWl0KSB7XG4gICAgICB2YXIgc3RyaW5nID0gU3RyaW5nKHJlcXVpcmVPYmplY3RDb2VyY2libGUodGhpcykpO1xuICAgICAgdmFyIGxpbSA9IGxpbWl0ID09PSB1bmRlZmluZWQgPyBNQVhfVUlOVDMyIDogbGltaXQgPj4+IDA7XG4gICAgICBpZiAobGltID09PSAwKSByZXR1cm4gW107XG4gICAgICBpZiAoc2VwYXJhdG9yID09PSB1bmRlZmluZWQpIHJldHVybiBbc3RyaW5nXTtcbiAgICAgIC8vIElmIGBzZXBhcmF0b3JgIGlzIG5vdCBhIHJlZ2V4LCB1c2UgbmF0aXZlIHNwbGl0XG4gICAgICBpZiAoIWlzUmVnRXhwKHNlcGFyYXRvcikpIHtcbiAgICAgICAgcmV0dXJuIG5hdGl2ZVNwbGl0LmNhbGwoc3RyaW5nLCBzZXBhcmF0b3IsIGxpbSk7XG4gICAgICB9XG4gICAgICB2YXIgb3V0cHV0ID0gW107XG4gICAgICB2YXIgZmxhZ3MgPSAoc2VwYXJhdG9yLmlnbm9yZUNhc2UgPyAnaScgOiAnJykgK1xuICAgICAgICAgICAgICAgICAgKHNlcGFyYXRvci5tdWx0aWxpbmUgPyAnbScgOiAnJykgK1xuICAgICAgICAgICAgICAgICAgKHNlcGFyYXRvci51bmljb2RlID8gJ3UnIDogJycpICtcbiAgICAgICAgICAgICAgICAgIChzZXBhcmF0b3Iuc3RpY2t5ID8gJ3knIDogJycpO1xuICAgICAgdmFyIGxhc3RMYXN0SW5kZXggPSAwO1xuICAgICAgLy8gTWFrZSBgZ2xvYmFsYCBhbmQgYXZvaWQgYGxhc3RJbmRleGAgaXNzdWVzIGJ5IHdvcmtpbmcgd2l0aCBhIGNvcHlcbiAgICAgIHZhciBzZXBhcmF0b3JDb3B5ID0gbmV3IFJlZ0V4cChzZXBhcmF0b3Iuc291cmNlLCBmbGFncyArICdnJyk7XG4gICAgICB2YXIgbWF0Y2gsIGxhc3RJbmRleCwgbGFzdExlbmd0aDtcbiAgICAgIHdoaWxlIChtYXRjaCA9IHJlZ2V4cEV4ZWMuY2FsbChzZXBhcmF0b3JDb3B5LCBzdHJpbmcpKSB7XG4gICAgICAgIGxhc3RJbmRleCA9IHNlcGFyYXRvckNvcHkubGFzdEluZGV4O1xuICAgICAgICBpZiAobGFzdEluZGV4ID4gbGFzdExhc3RJbmRleCkge1xuICAgICAgICAgIG91dHB1dC5wdXNoKHN0cmluZy5zbGljZShsYXN0TGFzdEluZGV4LCBtYXRjaC5pbmRleCkpO1xuICAgICAgICAgIGlmIChtYXRjaC5sZW5ndGggPiAxICYmIG1hdGNoLmluZGV4IDwgc3RyaW5nLmxlbmd0aCkgYXJyYXlQdXNoLmFwcGx5KG91dHB1dCwgbWF0Y2guc2xpY2UoMSkpO1xuICAgICAgICAgIGxhc3RMZW5ndGggPSBtYXRjaFswXS5sZW5ndGg7XG4gICAgICAgICAgbGFzdExhc3RJbmRleCA9IGxhc3RJbmRleDtcbiAgICAgICAgICBpZiAob3V0cHV0Lmxlbmd0aCA+PSBsaW0pIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzZXBhcmF0b3JDb3B5Lmxhc3RJbmRleCA9PT0gbWF0Y2guaW5kZXgpIHNlcGFyYXRvckNvcHkubGFzdEluZGV4Kys7IC8vIEF2b2lkIGFuIGluZmluaXRlIGxvb3BcbiAgICAgIH1cbiAgICAgIGlmIChsYXN0TGFzdEluZGV4ID09PSBzdHJpbmcubGVuZ3RoKSB7XG4gICAgICAgIGlmIChsYXN0TGVuZ3RoIHx8ICFzZXBhcmF0b3JDb3B5LnRlc3QoJycpKSBvdXRwdXQucHVzaCgnJyk7XG4gICAgICB9IGVsc2Ugb3V0cHV0LnB1c2goc3RyaW5nLnNsaWNlKGxhc3RMYXN0SW5kZXgpKTtcbiAgICAgIHJldHVybiBvdXRwdXQubGVuZ3RoID4gbGltID8gb3V0cHV0LnNsaWNlKDAsIGxpbSkgOiBvdXRwdXQ7XG4gICAgfTtcbiAgLy8gQ2hha3JhLCBWOFxuICB9IGVsc2UgaWYgKCcwJy5zcGxpdCh1bmRlZmluZWQsIDApLmxlbmd0aCkge1xuICAgIGludGVybmFsU3BsaXQgPSBmdW5jdGlvbiAoc2VwYXJhdG9yLCBsaW1pdCkge1xuICAgICAgcmV0dXJuIHNlcGFyYXRvciA9PT0gdW5kZWZpbmVkICYmIGxpbWl0ID09PSAwID8gW10gOiBuYXRpdmVTcGxpdC5jYWxsKHRoaXMsIHNlcGFyYXRvciwgbGltaXQpO1xuICAgIH07XG4gIH0gZWxzZSBpbnRlcm5hbFNwbGl0ID0gbmF0aXZlU3BsaXQ7XG5cbiAgcmV0dXJuIFtcbiAgICAvLyBgU3RyaW5nLnByb3RvdHlwZS5zcGxpdGAgbWV0aG9kXG4gICAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1zdHJpbmcucHJvdG90eXBlLnNwbGl0XG4gICAgZnVuY3Rpb24gc3BsaXQoc2VwYXJhdG9yLCBsaW1pdCkge1xuICAgICAgdmFyIE8gPSByZXF1aXJlT2JqZWN0Q29lcmNpYmxlKHRoaXMpO1xuICAgICAgdmFyIHNwbGl0dGVyID0gc2VwYXJhdG9yID09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IHNlcGFyYXRvcltTUExJVF07XG4gICAgICByZXR1cm4gc3BsaXR0ZXIgIT09IHVuZGVmaW5lZFxuICAgICAgICA/IHNwbGl0dGVyLmNhbGwoc2VwYXJhdG9yLCBPLCBsaW1pdClcbiAgICAgICAgOiBpbnRlcm5hbFNwbGl0LmNhbGwoU3RyaW5nKE8pLCBzZXBhcmF0b3IsIGxpbWl0KTtcbiAgICB9LFxuICAgIC8vIGBSZWdFeHAucHJvdG90eXBlW0BAc3BsaXRdYCBtZXRob2RcbiAgICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXJlZ2V4cC5wcm90b3R5cGUtQEBzcGxpdFxuICAgIC8vXG4gICAgLy8gTk9URTogVGhpcyBjYW5ub3QgYmUgcHJvcGVybHkgcG9seWZpbGxlZCBpbiBlbmdpbmVzIHRoYXQgZG9uJ3Qgc3VwcG9ydFxuICAgIC8vIHRoZSAneScgZmxhZy5cbiAgICBmdW5jdGlvbiAoc3RyaW5nLCBsaW1pdCkge1xuICAgICAgdmFyIHJlcyA9IG1heWJlQ2FsbE5hdGl2ZShpbnRlcm5hbFNwbGl0LCB0aGlzLCBzdHJpbmcsIGxpbWl0LCBpbnRlcm5hbFNwbGl0ICE9PSBuYXRpdmVTcGxpdCk7XG4gICAgICBpZiAocmVzLmRvbmUpIHJldHVybiByZXMudmFsdWU7XG5cbiAgICAgIHZhciByeCA9IGFuT2JqZWN0KHRoaXMpO1xuICAgICAgdmFyIFMgPSBTdHJpbmcoc3RyaW5nKTtcbiAgICAgIHZhciBDID0gc3BlY2llc0NvbnN0cnVjdG9yKHJ4LCBSZWdFeHApO1xuXG4gICAgICB2YXIgdW5pY29kZU1hdGNoaW5nID0gcngudW5pY29kZTtcbiAgICAgIHZhciBmbGFncyA9IChyeC5pZ25vcmVDYXNlID8gJ2knIDogJycpICtcbiAgICAgICAgICAgICAgICAgIChyeC5tdWx0aWxpbmUgPyAnbScgOiAnJykgK1xuICAgICAgICAgICAgICAgICAgKHJ4LnVuaWNvZGUgPyAndScgOiAnJykgK1xuICAgICAgICAgICAgICAgICAgKFVOU1VQUE9SVEVEX1kgPyAnZycgOiAneScpO1xuXG4gICAgICAvLyBeKD8gKyByeCArICkgaXMgbmVlZGVkLCBpbiBjb21iaW5hdGlvbiB3aXRoIHNvbWUgUyBzbGljaW5nLCB0b1xuICAgICAgLy8gc2ltdWxhdGUgdGhlICd5JyBmbGFnLlxuICAgICAgdmFyIHNwbGl0dGVyID0gbmV3IEMoVU5TVVBQT1JURURfWSA/ICdeKD86JyArIHJ4LnNvdXJjZSArICcpJyA6IHJ4LCBmbGFncyk7XG4gICAgICB2YXIgbGltID0gbGltaXQgPT09IHVuZGVmaW5lZCA/IE1BWF9VSU5UMzIgOiBsaW1pdCA+Pj4gMDtcbiAgICAgIGlmIChsaW0gPT09IDApIHJldHVybiBbXTtcbiAgICAgIGlmIChTLmxlbmd0aCA9PT0gMCkgcmV0dXJuIGNhbGxSZWdFeHBFeGVjKHNwbGl0dGVyLCBTKSA9PT0gbnVsbCA/IFtTXSA6IFtdO1xuICAgICAgdmFyIHAgPSAwO1xuICAgICAgdmFyIHEgPSAwO1xuICAgICAgdmFyIEEgPSBbXTtcbiAgICAgIHdoaWxlIChxIDwgUy5sZW5ndGgpIHtcbiAgICAgICAgc3BsaXR0ZXIubGFzdEluZGV4ID0gVU5TVVBQT1JURURfWSA/IDAgOiBxO1xuICAgICAgICB2YXIgeiA9IGNhbGxSZWdFeHBFeGVjKHNwbGl0dGVyLCBVTlNVUFBPUlRFRF9ZID8gUy5zbGljZShxKSA6IFMpO1xuICAgICAgICB2YXIgZTtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHogPT09IG51bGwgfHxcbiAgICAgICAgICAoZSA9IG1pbih0b0xlbmd0aChzcGxpdHRlci5sYXN0SW5kZXggKyAoVU5TVVBQT1JURURfWSA/IHEgOiAwKSksIFMubGVuZ3RoKSkgPT09IHBcbiAgICAgICAgKSB7XG4gICAgICAgICAgcSA9IGFkdmFuY2VTdHJpbmdJbmRleChTLCBxLCB1bmljb2RlTWF0Y2hpbmcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIEEucHVzaChTLnNsaWNlKHAsIHEpKTtcbiAgICAgICAgICBpZiAoQS5sZW5ndGggPT09IGxpbSkgcmV0dXJuIEE7XG4gICAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPD0gei5sZW5ndGggLSAxOyBpKyspIHtcbiAgICAgICAgICAgIEEucHVzaCh6W2ldKTtcbiAgICAgICAgICAgIGlmIChBLmxlbmd0aCA9PT0gbGltKSByZXR1cm4gQTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcSA9IHAgPSBlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBBLnB1c2goUy5zbGljZShwKSk7XG4gICAgICByZXR1cm4gQTtcbiAgICB9XG4gIF07XG59LCAhU1BMSVRfV09SS1NfV0lUSF9PVkVSV1JJVFRFTl9FWEVDLCBVTlNVUFBPUlRFRF9ZKTtcbiIsIi8vIGBTeW1ib2wucHJvdG90eXBlLmRlc2NyaXB0aW9uYCBnZXR0ZXJcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtc3ltYm9sLnByb3RvdHlwZS5kZXNjcmlwdGlvblxuJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgaGFzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xudmFyIGRlZmluZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHknKS5mO1xudmFyIGNvcHlDb25zdHJ1Y3RvclByb3BlcnRpZXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY29weS1jb25zdHJ1Y3Rvci1wcm9wZXJ0aWVzJyk7XG5cbnZhciBOYXRpdmVTeW1ib2wgPSBnbG9iYWwuU3ltYm9sO1xuXG5pZiAoREVTQ1JJUFRPUlMgJiYgdHlwZW9mIE5hdGl2ZVN5bWJvbCA9PSAnZnVuY3Rpb24nICYmICghKCdkZXNjcmlwdGlvbicgaW4gTmF0aXZlU3ltYm9sLnByb3RvdHlwZSkgfHxcbiAgLy8gU2FmYXJpIDEyIGJ1Z1xuICBOYXRpdmVTeW1ib2woKS5kZXNjcmlwdGlvbiAhPT0gdW5kZWZpbmVkXG4pKSB7XG4gIHZhciBFbXB0eVN0cmluZ0Rlc2NyaXB0aW9uU3RvcmUgPSB7fTtcbiAgLy8gd3JhcCBTeW1ib2wgY29uc3RydWN0b3IgZm9yIGNvcnJlY3Qgd29yayB3aXRoIHVuZGVmaW5lZCBkZXNjcmlwdGlvblxuICB2YXIgU3ltYm9sV3JhcHBlciA9IGZ1bmN0aW9uIFN5bWJvbCgpIHtcbiAgICB2YXIgZGVzY3JpcHRpb24gPSBhcmd1bWVudHMubGVuZ3RoIDwgMSB8fCBhcmd1bWVudHNbMF0gPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IFN0cmluZyhhcmd1bWVudHNbMF0pO1xuICAgIHZhciByZXN1bHQgPSB0aGlzIGluc3RhbmNlb2YgU3ltYm9sV3JhcHBlclxuICAgICAgPyBuZXcgTmF0aXZlU3ltYm9sKGRlc2NyaXB0aW9uKVxuICAgICAgLy8gaW4gRWRnZSAxMywgU3RyaW5nKFN5bWJvbCh1bmRlZmluZWQpKSA9PT0gJ1N5bWJvbCh1bmRlZmluZWQpJ1xuICAgICAgOiBkZXNjcmlwdGlvbiA9PT0gdW5kZWZpbmVkID8gTmF0aXZlU3ltYm9sKCkgOiBOYXRpdmVTeW1ib2woZGVzY3JpcHRpb24pO1xuICAgIGlmIChkZXNjcmlwdGlvbiA9PT0gJycpIEVtcHR5U3RyaW5nRGVzY3JpcHRpb25TdG9yZVtyZXN1bHRdID0gdHJ1ZTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuICBjb3B5Q29uc3RydWN0b3JQcm9wZXJ0aWVzKFN5bWJvbFdyYXBwZXIsIE5hdGl2ZVN5bWJvbCk7XG4gIHZhciBzeW1ib2xQcm90b3R5cGUgPSBTeW1ib2xXcmFwcGVyLnByb3RvdHlwZSA9IE5hdGl2ZVN5bWJvbC5wcm90b3R5cGU7XG4gIHN5bWJvbFByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFN5bWJvbFdyYXBwZXI7XG5cbiAgdmFyIHN5bWJvbFRvU3RyaW5nID0gc3ltYm9sUHJvdG90eXBlLnRvU3RyaW5nO1xuICB2YXIgbmF0aXZlID0gU3RyaW5nKE5hdGl2ZVN5bWJvbCgndGVzdCcpKSA9PSAnU3ltYm9sKHRlc3QpJztcbiAgdmFyIHJlZ2V4cCA9IC9eU3ltYm9sXFwoKC4qKVxcKVteKV0rJC87XG4gIGRlZmluZVByb3BlcnR5KHN5bWJvbFByb3RvdHlwZSwgJ2Rlc2NyaXB0aW9uJywge1xuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGZ1bmN0aW9uIGRlc2NyaXB0aW9uKCkge1xuICAgICAgdmFyIHN5bWJvbCA9IGlzT2JqZWN0KHRoaXMpID8gdGhpcy52YWx1ZU9mKCkgOiB0aGlzO1xuICAgICAgdmFyIHN0cmluZyA9IHN5bWJvbFRvU3RyaW5nLmNhbGwoc3ltYm9sKTtcbiAgICAgIGlmIChoYXMoRW1wdHlTdHJpbmdEZXNjcmlwdGlvblN0b3JlLCBzeW1ib2wpKSByZXR1cm4gJyc7XG4gICAgICB2YXIgZGVzYyA9IG5hdGl2ZSA/IHN0cmluZy5zbGljZSg3LCAtMSkgOiBzdHJpbmcucmVwbGFjZShyZWdleHAsICckMScpO1xuICAgICAgcmV0dXJuIGRlc2MgPT09ICcnID8gdW5kZWZpbmVkIDogZGVzYztcbiAgICB9XG4gIH0pO1xuXG4gICQoeyBnbG9iYWw6IHRydWUsIGZvcmNlZDogdHJ1ZSB9LCB7XG4gICAgU3ltYm9sOiBTeW1ib2xXcmFwcGVyXG4gIH0pO1xufVxuIiwidmFyIGRlZmluZVdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZWZpbmUtd2VsbC1rbm93bi1zeW1ib2wnKTtcblxuLy8gYFN5bWJvbC5pdGVyYXRvcmAgd2VsbC1rbm93biBzeW1ib2xcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtc3ltYm9sLml0ZXJhdG9yXG5kZWZpbmVXZWxsS25vd25TeW1ib2woJ2l0ZXJhdG9yJyk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgZ2V0QnVpbHRJbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nZXQtYnVpbHQtaW4nKTtcbnZhciBJU19QVVJFID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLXB1cmUnKTtcbnZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIE5BVElWRV9TWU1CT0wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvbmF0aXZlLXN5bWJvbCcpO1xudmFyIFVTRV9TWU1CT0xfQVNfVUlEID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3VzZS1zeW1ib2wtYXMtdWlkJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciBoYXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzJyk7XG52YXIgaXNBcnJheSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1hcnJheScpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLW9iamVjdCcpO1xudmFyIHRvSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbmRleGVkLW9iamVjdCcpO1xudmFyIHRvUHJpbWl0aXZlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLXByaW1pdGl2ZScpO1xudmFyIGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtcHJvcGVydHktZGVzY3JpcHRvcicpO1xudmFyIG5hdGl2ZU9iamVjdENyZWF0ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtY3JlYXRlJyk7XG52YXIgb2JqZWN0S2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3Qta2V5cycpO1xudmFyIGdldE93blByb3BlcnR5TmFtZXNNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktbmFtZXMnKTtcbnZhciBnZXRPd25Qcm9wZXJ0eU5hbWVzRXh0ZXJuYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktbmFtZXMtZXh0ZXJuYWwnKTtcbnZhciBnZXRPd25Qcm9wZXJ0eVN5bWJvbHNNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktc3ltYm9scycpO1xudmFyIGdldE93blByb3BlcnR5RGVzY3JpcHRvck1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9yJyk7XG52YXIgZGVmaW5lUHJvcGVydHlNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eScpO1xudmFyIHByb3BlcnR5SXNFbnVtZXJhYmxlTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1wcm9wZXJ0eS1pcy1lbnVtZXJhYmxlJyk7XG52YXIgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1ub24tZW51bWVyYWJsZS1wcm9wZXJ0eScpO1xudmFyIHJlZGVmaW5lID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlZGVmaW5lJyk7XG52YXIgc2hhcmVkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NoYXJlZCcpO1xudmFyIHNoYXJlZEtleSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQta2V5Jyk7XG52YXIgaGlkZGVuS2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oaWRkZW4ta2V5cycpO1xudmFyIHVpZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy91aWQnKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcbnZhciB3cmFwcGVkV2VsbEtub3duU3ltYm9sTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sLXdyYXBwZWQnKTtcbnZhciBkZWZpbmVXZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVmaW5lLXdlbGwta25vd24tc3ltYm9sJyk7XG52YXIgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2V0LXRvLXN0cmluZy10YWcnKTtcbnZhciBJbnRlcm5hbFN0YXRlTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ludGVybmFsLXN0YXRlJyk7XG52YXIgJGZvckVhY2ggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktaXRlcmF0aW9uJykuZm9yRWFjaDtcblxudmFyIEhJRERFTiA9IHNoYXJlZEtleSgnaGlkZGVuJyk7XG52YXIgU1lNQk9MID0gJ1N5bWJvbCc7XG52YXIgUFJPVE9UWVBFID0gJ3Byb3RvdHlwZSc7XG52YXIgVE9fUFJJTUlUSVZFID0gd2VsbEtub3duU3ltYm9sKCd0b1ByaW1pdGl2ZScpO1xudmFyIHNldEludGVybmFsU3RhdGUgPSBJbnRlcm5hbFN0YXRlTW9kdWxlLnNldDtcbnZhciBnZXRJbnRlcm5hbFN0YXRlID0gSW50ZXJuYWxTdGF0ZU1vZHVsZS5nZXR0ZXJGb3IoU1lNQk9MKTtcbnZhciBPYmplY3RQcm90b3R5cGUgPSBPYmplY3RbUFJPVE9UWVBFXTtcbnZhciAkU3ltYm9sID0gZ2xvYmFsLlN5bWJvbDtcbnZhciAkc3RyaW5naWZ5ID0gZ2V0QnVpbHRJbignSlNPTicsICdzdHJpbmdpZnknKTtcbnZhciBuYXRpdmVHZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JNb2R1bGUuZjtcbnZhciBuYXRpdmVEZWZpbmVQcm9wZXJ0eSA9IGRlZmluZVByb3BlcnR5TW9kdWxlLmY7XG52YXIgbmF0aXZlR2V0T3duUHJvcGVydHlOYW1lcyA9IGdldE93blByb3BlcnR5TmFtZXNFeHRlcm5hbC5mO1xudmFyIG5hdGl2ZVByb3BlcnR5SXNFbnVtZXJhYmxlID0gcHJvcGVydHlJc0VudW1lcmFibGVNb2R1bGUuZjtcbnZhciBBbGxTeW1ib2xzID0gc2hhcmVkKCdzeW1ib2xzJyk7XG52YXIgT2JqZWN0UHJvdG90eXBlU3ltYm9scyA9IHNoYXJlZCgnb3Atc3ltYm9scycpO1xudmFyIFN0cmluZ1RvU3ltYm9sUmVnaXN0cnkgPSBzaGFyZWQoJ3N0cmluZy10by1zeW1ib2wtcmVnaXN0cnknKTtcbnZhciBTeW1ib2xUb1N0cmluZ1JlZ2lzdHJ5ID0gc2hhcmVkKCdzeW1ib2wtdG8tc3RyaW5nLXJlZ2lzdHJ5Jyk7XG52YXIgV2VsbEtub3duU3ltYm9sc1N0b3JlID0gc2hhcmVkKCd3a3MnKTtcbnZhciBRT2JqZWN0ID0gZ2xvYmFsLlFPYmplY3Q7XG4vLyBEb24ndCB1c2Ugc2V0dGVycyBpbiBRdCBTY3JpcHQsIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy8xNzNcbnZhciBVU0VfU0VUVEVSID0gIVFPYmplY3QgfHwgIVFPYmplY3RbUFJPVE9UWVBFXSB8fCAhUU9iamVjdFtQUk9UT1RZUEVdLmZpbmRDaGlsZDtcblxuLy8gZmFsbGJhY2sgZm9yIG9sZCBBbmRyb2lkLCBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9Njg3XG52YXIgc2V0U3ltYm9sRGVzY3JpcHRvciA9IERFU0NSSVBUT1JTICYmIGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIG5hdGl2ZU9iamVjdENyZWF0ZShuYXRpdmVEZWZpbmVQcm9wZXJ0eSh7fSwgJ2EnLCB7XG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBuYXRpdmVEZWZpbmVQcm9wZXJ0eSh0aGlzLCAnYScsIHsgdmFsdWU6IDcgfSkuYTsgfVxuICB9KSkuYSAhPSA3O1xufSkgPyBmdW5jdGlvbiAoTywgUCwgQXR0cmlidXRlcykge1xuICB2YXIgT2JqZWN0UHJvdG90eXBlRGVzY3JpcHRvciA9IG5hdGl2ZUdldE93blByb3BlcnR5RGVzY3JpcHRvcihPYmplY3RQcm90b3R5cGUsIFApO1xuICBpZiAoT2JqZWN0UHJvdG90eXBlRGVzY3JpcHRvcikgZGVsZXRlIE9iamVjdFByb3RvdHlwZVtQXTtcbiAgbmF0aXZlRGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcyk7XG4gIGlmIChPYmplY3RQcm90b3R5cGVEZXNjcmlwdG9yICYmIE8gIT09IE9iamVjdFByb3RvdHlwZSkge1xuICAgIG5hdGl2ZURlZmluZVByb3BlcnR5KE9iamVjdFByb3RvdHlwZSwgUCwgT2JqZWN0UHJvdG90eXBlRGVzY3JpcHRvcik7XG4gIH1cbn0gOiBuYXRpdmVEZWZpbmVQcm9wZXJ0eTtcblxudmFyIHdyYXAgPSBmdW5jdGlvbiAodGFnLCBkZXNjcmlwdGlvbikge1xuICB2YXIgc3ltYm9sID0gQWxsU3ltYm9sc1t0YWddID0gbmF0aXZlT2JqZWN0Q3JlYXRlKCRTeW1ib2xbUFJPVE9UWVBFXSk7XG4gIHNldEludGVybmFsU3RhdGUoc3ltYm9sLCB7XG4gICAgdHlwZTogU1lNQk9MLFxuICAgIHRhZzogdGFnLFxuICAgIGRlc2NyaXB0aW9uOiBkZXNjcmlwdGlvblxuICB9KTtcbiAgaWYgKCFERVNDUklQVE9SUykgc3ltYm9sLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gIHJldHVybiBzeW1ib2w7XG59O1xuXG52YXIgaXNTeW1ib2wgPSBVU0VfU1lNQk9MX0FTX1VJRCA/IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gdHlwZW9mIGl0ID09ICdzeW1ib2wnO1xufSA6IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gT2JqZWN0KGl0KSBpbnN0YW5jZW9mICRTeW1ib2w7XG59O1xuXG52YXIgJGRlZmluZVByb3BlcnR5ID0gZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcykge1xuICBpZiAoTyA9PT0gT2JqZWN0UHJvdG90eXBlKSAkZGVmaW5lUHJvcGVydHkoT2JqZWN0UHJvdG90eXBlU3ltYm9scywgUCwgQXR0cmlidXRlcyk7XG4gIGFuT2JqZWN0KE8pO1xuICB2YXIga2V5ID0gdG9QcmltaXRpdmUoUCwgdHJ1ZSk7XG4gIGFuT2JqZWN0KEF0dHJpYnV0ZXMpO1xuICBpZiAoaGFzKEFsbFN5bWJvbHMsIGtleSkpIHtcbiAgICBpZiAoIUF0dHJpYnV0ZXMuZW51bWVyYWJsZSkge1xuICAgICAgaWYgKCFoYXMoTywgSElEREVOKSkgbmF0aXZlRGVmaW5lUHJvcGVydHkoTywgSElEREVOLCBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IoMSwge30pKTtcbiAgICAgIE9bSElEREVOXVtrZXldID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGhhcyhPLCBISURERU4pICYmIE9bSElEREVOXVtrZXldKSBPW0hJRERFTl1ba2V5XSA9IGZhbHNlO1xuICAgICAgQXR0cmlidXRlcyA9IG5hdGl2ZU9iamVjdENyZWF0ZShBdHRyaWJ1dGVzLCB7IGVudW1lcmFibGU6IGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvcigwLCBmYWxzZSkgfSk7XG4gICAgfSByZXR1cm4gc2V0U3ltYm9sRGVzY3JpcHRvcihPLCBrZXksIEF0dHJpYnV0ZXMpO1xuICB9IHJldHVybiBuYXRpdmVEZWZpbmVQcm9wZXJ0eShPLCBrZXksIEF0dHJpYnV0ZXMpO1xufTtcblxudmFyICRkZWZpbmVQcm9wZXJ0aWVzID0gZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyhPLCBQcm9wZXJ0aWVzKSB7XG4gIGFuT2JqZWN0KE8pO1xuICB2YXIgcHJvcGVydGllcyA9IHRvSW5kZXhlZE9iamVjdChQcm9wZXJ0aWVzKTtcbiAgdmFyIGtleXMgPSBvYmplY3RLZXlzKHByb3BlcnRpZXMpLmNvbmNhdCgkZ2V0T3duUHJvcGVydHlTeW1ib2xzKHByb3BlcnRpZXMpKTtcbiAgJGZvckVhY2goa2V5cywgZnVuY3Rpb24gKGtleSkge1xuICAgIGlmICghREVTQ1JJUFRPUlMgfHwgJHByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocHJvcGVydGllcywga2V5KSkgJGRlZmluZVByb3BlcnR5KE8sIGtleSwgcHJvcGVydGllc1trZXldKTtcbiAgfSk7XG4gIHJldHVybiBPO1xufTtcblxudmFyICRjcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUoTywgUHJvcGVydGllcykge1xuICByZXR1cm4gUHJvcGVydGllcyA9PT0gdW5kZWZpbmVkID8gbmF0aXZlT2JqZWN0Q3JlYXRlKE8pIDogJGRlZmluZVByb3BlcnRpZXMobmF0aXZlT2JqZWN0Q3JlYXRlKE8pLCBQcm9wZXJ0aWVzKTtcbn07XG5cbnZhciAkcHJvcGVydHlJc0VudW1lcmFibGUgPSBmdW5jdGlvbiBwcm9wZXJ0eUlzRW51bWVyYWJsZShWKSB7XG4gIHZhciBQID0gdG9QcmltaXRpdmUoViwgdHJ1ZSk7XG4gIHZhciBlbnVtZXJhYmxlID0gbmF0aXZlUHJvcGVydHlJc0VudW1lcmFibGUuY2FsbCh0aGlzLCBQKTtcbiAgaWYgKHRoaXMgPT09IE9iamVjdFByb3RvdHlwZSAmJiBoYXMoQWxsU3ltYm9scywgUCkgJiYgIWhhcyhPYmplY3RQcm90b3R5cGVTeW1ib2xzLCBQKSkgcmV0dXJuIGZhbHNlO1xuICByZXR1cm4gZW51bWVyYWJsZSB8fCAhaGFzKHRoaXMsIFApIHx8ICFoYXMoQWxsU3ltYm9scywgUCkgfHwgaGFzKHRoaXMsIEhJRERFTikgJiYgdGhpc1tISURERU5dW1BdID8gZW51bWVyYWJsZSA6IHRydWU7XG59O1xuXG52YXIgJGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihPLCBQKSB7XG4gIHZhciBpdCA9IHRvSW5kZXhlZE9iamVjdChPKTtcbiAgdmFyIGtleSA9IHRvUHJpbWl0aXZlKFAsIHRydWUpO1xuICBpZiAoaXQgPT09IE9iamVjdFByb3RvdHlwZSAmJiBoYXMoQWxsU3ltYm9scywga2V5KSAmJiAhaGFzKE9iamVjdFByb3RvdHlwZVN5bWJvbHMsIGtleSkpIHJldHVybjtcbiAgdmFyIGRlc2NyaXB0b3IgPSBuYXRpdmVHZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoaXQsIGtleSk7XG4gIGlmIChkZXNjcmlwdG9yICYmIGhhcyhBbGxTeW1ib2xzLCBrZXkpICYmICEoaGFzKGl0LCBISURERU4pICYmIGl0W0hJRERFTl1ba2V5XSkpIHtcbiAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSB0cnVlO1xuICB9XG4gIHJldHVybiBkZXNjcmlwdG9yO1xufTtcblxudmFyICRnZXRPd25Qcm9wZXJ0eU5hbWVzID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlOYW1lcyhPKSB7XG4gIHZhciBuYW1lcyA9IG5hdGl2ZUdldE93blByb3BlcnR5TmFtZXModG9JbmRleGVkT2JqZWN0KE8pKTtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICAkZm9yRWFjaChuYW1lcywgZnVuY3Rpb24gKGtleSkge1xuICAgIGlmICghaGFzKEFsbFN5bWJvbHMsIGtleSkgJiYgIWhhcyhoaWRkZW5LZXlzLCBrZXkpKSByZXN1bHQucHVzaChrZXkpO1xuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbnZhciAkZ2V0T3duUHJvcGVydHlTeW1ib2xzID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlTeW1ib2xzKE8pIHtcbiAgdmFyIElTX09CSkVDVF9QUk9UT1RZUEUgPSBPID09PSBPYmplY3RQcm90b3R5cGU7XG4gIHZhciBuYW1lcyA9IG5hdGl2ZUdldE93blByb3BlcnR5TmFtZXMoSVNfT0JKRUNUX1BST1RPVFlQRSA/IE9iamVjdFByb3RvdHlwZVN5bWJvbHMgOiB0b0luZGV4ZWRPYmplY3QoTykpO1xuICB2YXIgcmVzdWx0ID0gW107XG4gICRmb3JFYWNoKG5hbWVzLCBmdW5jdGlvbiAoa2V5KSB7XG4gICAgaWYgKGhhcyhBbGxTeW1ib2xzLCBrZXkpICYmICghSVNfT0JKRUNUX1BST1RPVFlQRSB8fCBoYXMoT2JqZWN0UHJvdG90eXBlLCBrZXkpKSkge1xuICAgICAgcmVzdWx0LnB1c2goQWxsU3ltYm9sc1trZXldKTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufTtcblxuLy8gYFN5bWJvbGAgY29uc3RydWN0b3Jcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtc3ltYm9sLWNvbnN0cnVjdG9yXG5pZiAoIU5BVElWRV9TWU1CT0wpIHtcbiAgJFN5bWJvbCA9IGZ1bmN0aW9uIFN5bWJvbCgpIHtcbiAgICBpZiAodGhpcyBpbnN0YW5jZW9mICRTeW1ib2wpIHRocm93IFR5cGVFcnJvcignU3ltYm9sIGlzIG5vdCBhIGNvbnN0cnVjdG9yJyk7XG4gICAgdmFyIGRlc2NyaXB0aW9uID0gIWFyZ3VtZW50cy5sZW5ndGggfHwgYXJndW1lbnRzWzBdID09PSB1bmRlZmluZWQgPyB1bmRlZmluZWQgOiBTdHJpbmcoYXJndW1lbnRzWzBdKTtcbiAgICB2YXIgdGFnID0gdWlkKGRlc2NyaXB0aW9uKTtcbiAgICB2YXIgc2V0dGVyID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICBpZiAodGhpcyA9PT0gT2JqZWN0UHJvdG90eXBlKSBzZXR0ZXIuY2FsbChPYmplY3RQcm90b3R5cGVTeW1ib2xzLCB2YWx1ZSk7XG4gICAgICBpZiAoaGFzKHRoaXMsIEhJRERFTikgJiYgaGFzKHRoaXNbSElEREVOXSwgdGFnKSkgdGhpc1tISURERU5dW3RhZ10gPSBmYWxzZTtcbiAgICAgIHNldFN5bWJvbERlc2NyaXB0b3IodGhpcywgdGFnLCBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IoMSwgdmFsdWUpKTtcbiAgICB9O1xuICAgIGlmIChERVNDUklQVE9SUyAmJiBVU0VfU0VUVEVSKSBzZXRTeW1ib2xEZXNjcmlwdG9yKE9iamVjdFByb3RvdHlwZSwgdGFnLCB7IGNvbmZpZ3VyYWJsZTogdHJ1ZSwgc2V0OiBzZXR0ZXIgfSk7XG4gICAgcmV0dXJuIHdyYXAodGFnLCBkZXNjcmlwdGlvbik7XG4gIH07XG5cbiAgcmVkZWZpbmUoJFN5bWJvbFtQUk9UT1RZUEVdLCAndG9TdHJpbmcnLCBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gZ2V0SW50ZXJuYWxTdGF0ZSh0aGlzKS50YWc7XG4gIH0pO1xuXG4gIHJlZGVmaW5lKCRTeW1ib2wsICd3aXRob3V0U2V0dGVyJywgZnVuY3Rpb24gKGRlc2NyaXB0aW9uKSB7XG4gICAgcmV0dXJuIHdyYXAodWlkKGRlc2NyaXB0aW9uKSwgZGVzY3JpcHRpb24pO1xuICB9KTtcblxuICBwcm9wZXJ0eUlzRW51bWVyYWJsZU1vZHVsZS5mID0gJHByb3BlcnR5SXNFbnVtZXJhYmxlO1xuICBkZWZpbmVQcm9wZXJ0eU1vZHVsZS5mID0gJGRlZmluZVByb3BlcnR5O1xuICBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JNb2R1bGUuZiA9ICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG4gIGdldE93blByb3BlcnR5TmFtZXNNb2R1bGUuZiA9IGdldE93blByb3BlcnR5TmFtZXNFeHRlcm5hbC5mID0gJGdldE93blByb3BlcnR5TmFtZXM7XG4gIGdldE93blByb3BlcnR5U3ltYm9sc01vZHVsZS5mID0gJGdldE93blByb3BlcnR5U3ltYm9scztcblxuICB3cmFwcGVkV2VsbEtub3duU3ltYm9sTW9kdWxlLmYgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHJldHVybiB3cmFwKHdlbGxLbm93blN5bWJvbChuYW1lKSwgbmFtZSk7XG4gIH07XG5cbiAgaWYgKERFU0NSSVBUT1JTKSB7XG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3RjMzkvcHJvcG9zYWwtU3ltYm9sLWRlc2NyaXB0aW9uXG4gICAgbmF0aXZlRGVmaW5lUHJvcGVydHkoJFN5bWJvbFtQUk9UT1RZUEVdLCAnZGVzY3JpcHRpb24nLCB7XG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICBnZXQ6IGZ1bmN0aW9uIGRlc2NyaXB0aW9uKCkge1xuICAgICAgICByZXR1cm4gZ2V0SW50ZXJuYWxTdGF0ZSh0aGlzKS5kZXNjcmlwdGlvbjtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAoIUlTX1BVUkUpIHtcbiAgICAgIHJlZGVmaW5lKE9iamVjdFByb3RvdHlwZSwgJ3Byb3BlcnR5SXNFbnVtZXJhYmxlJywgJHByb3BlcnR5SXNFbnVtZXJhYmxlLCB7IHVuc2FmZTogdHJ1ZSB9KTtcbiAgICB9XG4gIH1cbn1cblxuJCh7IGdsb2JhbDogdHJ1ZSwgd3JhcDogdHJ1ZSwgZm9yY2VkOiAhTkFUSVZFX1NZTUJPTCwgc2hhbTogIU5BVElWRV9TWU1CT0wgfSwge1xuICBTeW1ib2w6ICRTeW1ib2xcbn0pO1xuXG4kZm9yRWFjaChvYmplY3RLZXlzKFdlbGxLbm93blN5bWJvbHNTdG9yZSksIGZ1bmN0aW9uIChuYW1lKSB7XG4gIGRlZmluZVdlbGxLbm93blN5bWJvbChuYW1lKTtcbn0pO1xuXG4kKHsgdGFyZ2V0OiBTWU1CT0wsIHN0YXQ6IHRydWUsIGZvcmNlZDogIU5BVElWRV9TWU1CT0wgfSwge1xuICAvLyBgU3ltYm9sLmZvcmAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtc3ltYm9sLmZvclxuICAnZm9yJzogZnVuY3Rpb24gKGtleSkge1xuICAgIHZhciBzdHJpbmcgPSBTdHJpbmcoa2V5KTtcbiAgICBpZiAoaGFzKFN0cmluZ1RvU3ltYm9sUmVnaXN0cnksIHN0cmluZykpIHJldHVybiBTdHJpbmdUb1N5bWJvbFJlZ2lzdHJ5W3N0cmluZ107XG4gICAgdmFyIHN5bWJvbCA9ICRTeW1ib2woc3RyaW5nKTtcbiAgICBTdHJpbmdUb1N5bWJvbFJlZ2lzdHJ5W3N0cmluZ10gPSBzeW1ib2w7XG4gICAgU3ltYm9sVG9TdHJpbmdSZWdpc3RyeVtzeW1ib2xdID0gc3RyaW5nO1xuICAgIHJldHVybiBzeW1ib2w7XG4gIH0sXG4gIC8vIGBTeW1ib2wua2V5Rm9yYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1zeW1ib2wua2V5Zm9yXG4gIGtleUZvcjogZnVuY3Rpb24ga2V5Rm9yKHN5bSkge1xuICAgIGlmICghaXNTeW1ib2woc3ltKSkgdGhyb3cgVHlwZUVycm9yKHN5bSArICcgaXMgbm90IGEgc3ltYm9sJyk7XG4gICAgaWYgKGhhcyhTeW1ib2xUb1N0cmluZ1JlZ2lzdHJ5LCBzeW0pKSByZXR1cm4gU3ltYm9sVG9TdHJpbmdSZWdpc3RyeVtzeW1dO1xuICB9LFxuICB1c2VTZXR0ZXI6IGZ1bmN0aW9uICgpIHsgVVNFX1NFVFRFUiA9IHRydWU7IH0sXG4gIHVzZVNpbXBsZTogZnVuY3Rpb24gKCkgeyBVU0VfU0VUVEVSID0gZmFsc2U7IH1cbn0pO1xuXG4kKHsgdGFyZ2V0OiAnT2JqZWN0Jywgc3RhdDogdHJ1ZSwgZm9yY2VkOiAhTkFUSVZFX1NZTUJPTCwgc2hhbTogIURFU0NSSVBUT1JTIH0sIHtcbiAgLy8gYE9iamVjdC5jcmVhdGVgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5jcmVhdGVcbiAgY3JlYXRlOiAkY3JlYXRlLFxuICAvLyBgT2JqZWN0LmRlZmluZVByb3BlcnR5YCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3QuZGVmaW5lcHJvcGVydHlcbiAgZGVmaW5lUHJvcGVydHk6ICRkZWZpbmVQcm9wZXJ0eSxcbiAgLy8gYE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3QuZGVmaW5lcHJvcGVydGllc1xuICBkZWZpbmVQcm9wZXJ0aWVzOiAkZGVmaW5lUHJvcGVydGllcyxcbiAgLy8gYE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5nZXRvd25wcm9wZXJ0eWRlc2NyaXB0b3JzXG4gIGdldE93blByb3BlcnR5RGVzY3JpcHRvcjogJGdldE93blByb3BlcnR5RGVzY3JpcHRvclxufSk7XG5cbiQoeyB0YXJnZXQ6ICdPYmplY3QnLCBzdGF0OiB0cnVlLCBmb3JjZWQ6ICFOQVRJVkVfU1lNQk9MIH0sIHtcbiAgLy8gYE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3QuZ2V0b3ducHJvcGVydHluYW1lc1xuICBnZXRPd25Qcm9wZXJ0eU5hbWVzOiAkZ2V0T3duUHJvcGVydHlOYW1lcyxcbiAgLy8gYE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHNgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5nZXRvd25wcm9wZXJ0eXN5bWJvbHNcbiAgZ2V0T3duUHJvcGVydHlTeW1ib2xzOiAkZ2V0T3duUHJvcGVydHlTeW1ib2xzXG59KTtcblxuLy8gQ2hyb21lIDM4IGFuZCAzOSBgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9sc2AgZmFpbHMgb24gcHJpbWl0aXZlc1xuLy8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MzQ0M1xuJCh7IHRhcmdldDogJ09iamVjdCcsIHN0YXQ6IHRydWUsIGZvcmNlZDogZmFpbHMoZnVuY3Rpb24gKCkgeyBnZXRPd25Qcm9wZXJ0eVN5bWJvbHNNb2R1bGUuZigxKTsgfSkgfSwge1xuICBnZXRPd25Qcm9wZXJ0eVN5bWJvbHM6IGZ1bmN0aW9uIGdldE93blByb3BlcnR5U3ltYm9scyhpdCkge1xuICAgIHJldHVybiBnZXRPd25Qcm9wZXJ0eVN5bWJvbHNNb2R1bGUuZih0b09iamVjdChpdCkpO1xuICB9XG59KTtcblxuLy8gYEpTT04uc3RyaW5naWZ5YCBtZXRob2QgYmVoYXZpb3Igd2l0aCBzeW1ib2xzXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWpzb24uc3RyaW5naWZ5XG5pZiAoJHN0cmluZ2lmeSkge1xuICB2YXIgRk9SQ0VEX0pTT05fU1RSSU5HSUZZID0gIU5BVElWRV9TWU1CT0wgfHwgZmFpbHMoZnVuY3Rpb24gKCkge1xuICAgIHZhciBzeW1ib2wgPSAkU3ltYm9sKCk7XG4gICAgLy8gTVMgRWRnZSBjb252ZXJ0cyBzeW1ib2wgdmFsdWVzIHRvIEpTT04gYXMge31cbiAgICByZXR1cm4gJHN0cmluZ2lmeShbc3ltYm9sXSkgIT0gJ1tudWxsXSdcbiAgICAgIC8vIFdlYktpdCBjb252ZXJ0cyBzeW1ib2wgdmFsdWVzIHRvIEpTT04gYXMgbnVsbFxuICAgICAgfHwgJHN0cmluZ2lmeSh7IGE6IHN5bWJvbCB9KSAhPSAne30nXG4gICAgICAvLyBWOCB0aHJvd3Mgb24gYm94ZWQgc3ltYm9sc1xuICAgICAgfHwgJHN0cmluZ2lmeShPYmplY3Qoc3ltYm9sKSkgIT0gJ3t9JztcbiAgfSk7XG5cbiAgJCh7IHRhcmdldDogJ0pTT04nLCBzdGF0OiB0cnVlLCBmb3JjZWQ6IEZPUkNFRF9KU09OX1NUUklOR0lGWSB9LCB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzIC0tIHJlcXVpcmVkIGZvciBgLmxlbmd0aGBcbiAgICBzdHJpbmdpZnk6IGZ1bmN0aW9uIHN0cmluZ2lmeShpdCwgcmVwbGFjZXIsIHNwYWNlKSB7XG4gICAgICB2YXIgYXJncyA9IFtpdF07XG4gICAgICB2YXIgaW5kZXggPSAxO1xuICAgICAgdmFyICRyZXBsYWNlcjtcbiAgICAgIHdoaWxlIChhcmd1bWVudHMubGVuZ3RoID4gaW5kZXgpIGFyZ3MucHVzaChhcmd1bWVudHNbaW5kZXgrK10pO1xuICAgICAgJHJlcGxhY2VyID0gcmVwbGFjZXI7XG4gICAgICBpZiAoIWlzT2JqZWN0KHJlcGxhY2VyKSAmJiBpdCA9PT0gdW5kZWZpbmVkIHx8IGlzU3ltYm9sKGl0KSkgcmV0dXJuOyAvLyBJRTggcmV0dXJucyBzdHJpbmcgb24gdW5kZWZpbmVkXG4gICAgICBpZiAoIWlzQXJyYXkocmVwbGFjZXIpKSByZXBsYWNlciA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgJHJlcGxhY2VyID09ICdmdW5jdGlvbicpIHZhbHVlID0gJHJlcGxhY2VyLmNhbGwodGhpcywga2V5LCB2YWx1ZSk7XG4gICAgICAgIGlmICghaXNTeW1ib2wodmFsdWUpKSByZXR1cm4gdmFsdWU7XG4gICAgICB9O1xuICAgICAgYXJnc1sxXSA9IHJlcGxhY2VyO1xuICAgICAgcmV0dXJuICRzdHJpbmdpZnkuYXBwbHkobnVsbCwgYXJncyk7XG4gICAgfVxuICB9KTtcbn1cblxuLy8gYFN5bWJvbC5wcm90b3R5cGVbQEB0b1ByaW1pdGl2ZV1gIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1zeW1ib2wucHJvdG90eXBlLUBAdG9wcmltaXRpdmVcbmlmICghJFN5bWJvbFtQUk9UT1RZUEVdW1RPX1BSSU1JVElWRV0pIHtcbiAgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KCRTeW1ib2xbUFJPVE9UWVBFXSwgVE9fUFJJTUlUSVZFLCAkU3ltYm9sW1BST1RPVFlQRV0udmFsdWVPZik7XG59XG4vLyBgU3ltYm9sLnByb3RvdHlwZVtAQHRvU3RyaW5nVGFnXWAgcHJvcGVydHlcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtc3ltYm9sLnByb3RvdHlwZS1AQHRvc3RyaW5ndGFnXG5zZXRUb1N0cmluZ1RhZygkU3ltYm9sLCBTWU1CT0wpO1xuXG5oaWRkZW5LZXlzW0hJRERFTl0gPSB0cnVlO1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBET01JdGVyYWJsZXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZG9tLWl0ZXJhYmxlcycpO1xudmFyIGZvckVhY2ggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktZm9yLWVhY2gnKTtcbnZhciBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLW5vbi1lbnVtZXJhYmxlLXByb3BlcnR5Jyk7XG5cbmZvciAodmFyIENPTExFQ1RJT05fTkFNRSBpbiBET01JdGVyYWJsZXMpIHtcbiAgdmFyIENvbGxlY3Rpb24gPSBnbG9iYWxbQ09MTEVDVElPTl9OQU1FXTtcbiAgdmFyIENvbGxlY3Rpb25Qcm90b3R5cGUgPSBDb2xsZWN0aW9uICYmIENvbGxlY3Rpb24ucHJvdG90eXBlO1xuICAvLyBzb21lIENocm9tZSB2ZXJzaW9ucyBoYXZlIG5vbi1jb25maWd1cmFibGUgbWV0aG9kcyBvbiBET01Ub2tlbkxpc3RcbiAgaWYgKENvbGxlY3Rpb25Qcm90b3R5cGUgJiYgQ29sbGVjdGlvblByb3RvdHlwZS5mb3JFYWNoICE9PSBmb3JFYWNoKSB0cnkge1xuICAgIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eShDb2xsZWN0aW9uUHJvdG90eXBlLCAnZm9yRWFjaCcsIGZvckVhY2gpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIENvbGxlY3Rpb25Qcm90b3R5cGUuZm9yRWFjaCA9IGZvckVhY2g7XG4gIH1cbn1cbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgRE9NSXRlcmFibGVzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RvbS1pdGVyYWJsZXMnKTtcbnZhciBBcnJheUl0ZXJhdG9yTWV0aG9kcyA9IHJlcXVpcmUoJy4uL21vZHVsZXMvZXMuYXJyYXkuaXRlcmF0b3InKTtcbnZhciBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLW5vbi1lbnVtZXJhYmxlLXByb3BlcnR5Jyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG5cbnZhciBJVEVSQVRPUiA9IHdlbGxLbm93blN5bWJvbCgnaXRlcmF0b3InKTtcbnZhciBUT19TVFJJTkdfVEFHID0gd2VsbEtub3duU3ltYm9sKCd0b1N0cmluZ1RhZycpO1xudmFyIEFycmF5VmFsdWVzID0gQXJyYXlJdGVyYXRvck1ldGhvZHMudmFsdWVzO1xuXG5mb3IgKHZhciBDT0xMRUNUSU9OX05BTUUgaW4gRE9NSXRlcmFibGVzKSB7XG4gIHZhciBDb2xsZWN0aW9uID0gZ2xvYmFsW0NPTExFQ1RJT05fTkFNRV07XG4gIHZhciBDb2xsZWN0aW9uUHJvdG90eXBlID0gQ29sbGVjdGlvbiAmJiBDb2xsZWN0aW9uLnByb3RvdHlwZTtcbiAgaWYgKENvbGxlY3Rpb25Qcm90b3R5cGUpIHtcbiAgICAvLyBzb21lIENocm9tZSB2ZXJzaW9ucyBoYXZlIG5vbi1jb25maWd1cmFibGUgbWV0aG9kcyBvbiBET01Ub2tlbkxpc3RcbiAgICBpZiAoQ29sbGVjdGlvblByb3RvdHlwZVtJVEVSQVRPUl0gIT09IEFycmF5VmFsdWVzKSB0cnkge1xuICAgICAgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KENvbGxlY3Rpb25Qcm90b3R5cGUsIElURVJBVE9SLCBBcnJheVZhbHVlcyk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIENvbGxlY3Rpb25Qcm90b3R5cGVbSVRFUkFUT1JdID0gQXJyYXlWYWx1ZXM7XG4gICAgfVxuICAgIGlmICghQ29sbGVjdGlvblByb3RvdHlwZVtUT19TVFJJTkdfVEFHXSkge1xuICAgICAgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KENvbGxlY3Rpb25Qcm90b3R5cGUsIFRPX1NUUklOR19UQUcsIENPTExFQ1RJT05fTkFNRSk7XG4gICAgfVxuICAgIGlmIChET01JdGVyYWJsZXNbQ09MTEVDVElPTl9OQU1FXSkgZm9yICh2YXIgTUVUSE9EX05BTUUgaW4gQXJyYXlJdGVyYXRvck1ldGhvZHMpIHtcbiAgICAgIC8vIHNvbWUgQ2hyb21lIHZlcnNpb25zIGhhdmUgbm9uLWNvbmZpZ3VyYWJsZSBtZXRob2RzIG9uIERPTVRva2VuTGlzdFxuICAgICAgaWYgKENvbGxlY3Rpb25Qcm90b3R5cGVbTUVUSE9EX05BTUVdICE9PSBBcnJheUl0ZXJhdG9yTWV0aG9kc1tNRVRIT0RfTkFNRV0pIHRyeSB7XG4gICAgICAgIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eShDb2xsZWN0aW9uUHJvdG90eXBlLCBNRVRIT0RfTkFNRSwgQXJyYXlJdGVyYXRvck1ldGhvZHNbTUVUSE9EX05BTUVdKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIENvbGxlY3Rpb25Qcm90b3R5cGVbTUVUSE9EX05BTUVdID0gQXJyYXlJdGVyYXRvck1ldGhvZHNbTUVUSE9EX05BTUVdO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwidmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIHVzZXJBZ2VudCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbmdpbmUtdXNlci1hZ2VudCcpO1xuXG52YXIgc2xpY2UgPSBbXS5zbGljZTtcbnZhciBNU0lFID0gL01TSUUgLlxcLi8udGVzdCh1c2VyQWdlbnQpOyAvLyA8LSBkaXJ0eSBpZTktIGNoZWNrXG5cbnZhciB3cmFwID0gZnVuY3Rpb24gKHNjaGVkdWxlcikge1xuICByZXR1cm4gZnVuY3Rpb24gKGhhbmRsZXIsIHRpbWVvdXQgLyogLCAuLi5hcmd1bWVudHMgKi8pIHtcbiAgICB2YXIgYm91bmRBcmdzID0gYXJndW1lbnRzLmxlbmd0aCA+IDI7XG4gICAgdmFyIGFyZ3MgPSBib3VuZEFyZ3MgPyBzbGljZS5jYWxsKGFyZ3VtZW50cywgMikgOiB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIHNjaGVkdWxlcihib3VuZEFyZ3MgPyBmdW5jdGlvbiAoKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbmV3LWZ1bmMgLS0gc3BlYyByZXF1aXJlbWVudFxuICAgICAgKHR5cGVvZiBoYW5kbGVyID09ICdmdW5jdGlvbicgPyBoYW5kbGVyIDogRnVuY3Rpb24oaGFuZGxlcikpLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIH0gOiBoYW5kbGVyLCB0aW1lb3V0KTtcbiAgfTtcbn07XG5cbi8vIGllOS0gc2V0VGltZW91dCAmIHNldEludGVydmFsIGFkZGl0aW9uYWwgcGFyYW1ldGVycyBmaXhcbi8vIGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvbXVsdGlwYWdlL3RpbWVycy1hbmQtdXNlci1wcm9tcHRzLmh0bWwjdGltZXJzXG4kKHsgZ2xvYmFsOiB0cnVlLCBiaW5kOiB0cnVlLCBmb3JjZWQ6IE1TSUUgfSwge1xuICAvLyBgc2V0VGltZW91dGAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvbXVsdGlwYWdlL3RpbWVycy1hbmQtdXNlci1wcm9tcHRzLmh0bWwjZG9tLXNldHRpbWVvdXRcbiAgc2V0VGltZW91dDogd3JhcChnbG9iYWwuc2V0VGltZW91dCksXG4gIC8vIGBzZXRJbnRlcnZhbGAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvbXVsdGlwYWdlL3RpbWVycy1hbmQtdXNlci1wcm9tcHRzLmh0bWwjZG9tLXNldGludGVydmFsXG4gIHNldEludGVydmFsOiB3cmFwKGdsb2JhbC5zZXRJbnRlcnZhbClcbn0pO1xuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiaW1wb3J0e0NvbXBvbmVudCBhcyBuLGNyZWF0ZUVsZW1lbnQgYXMgdCxvcHRpb25zIGFzIGUsdG9DaGlsZEFycmF5IGFzIHIsRnJhZ21lbnQgYXMgdSxyZW5kZXIgYXMgbyxoeWRyYXRlIGFzIGksY3JlYXRlQ29udGV4dCBhcyBsLGNyZWF0ZVJlZiBhcyBjLGNsb25lRWxlbWVudCBhcyBmfWZyb21cInByZWFjdFwiO2V4cG9ydHtDb21wb25lbnQsRnJhZ21lbnQsY3JlYXRlQ29udGV4dCxjcmVhdGVFbGVtZW50LGNyZWF0ZVJlZn1mcm9tXCJwcmVhY3RcIjtpbXBvcnR7dXNlU3RhdGUgYXMgYSx1c2VJZCBhcyBzLHVzZVJlZHVjZXIgYXMgaCx1c2VFZmZlY3QgYXMgdix1c2VMYXlvdXRFZmZlY3QgYXMgZCx1c2VSZWYgYXMgcCx1c2VJbXBlcmF0aXZlSGFuZGxlIGFzIG0sdXNlTWVtbyBhcyB5LHVzZUNhbGxiYWNrIGFzIF8sdXNlQ29udGV4dCBhcyBiLHVzZURlYnVnVmFsdWUgYXMgU31mcm9tXCJwcmVhY3QvaG9va3NcIjtleHBvcnQqZnJvbVwicHJlYWN0L2hvb2tzXCI7ZnVuY3Rpb24gZyhuLHQpe2Zvcih2YXIgZSBpbiB0KW5bZV09dFtlXTtyZXR1cm4gbn1mdW5jdGlvbiBDKG4sdCl7Zm9yKHZhciBlIGluIG4paWYoXCJfX3NvdXJjZVwiIT09ZSYmIShlIGluIHQpKXJldHVybiEwO2Zvcih2YXIgciBpbiB0KWlmKFwiX19zb3VyY2VcIiE9PXImJm5bcl0hPT10W3JdKXJldHVybiEwO3JldHVybiExfWZ1bmN0aW9uIEUobix0KXtyZXR1cm4gbj09PXQmJigwIT09bnx8MS9uPT0xL3QpfHxuIT1uJiZ0IT10fWZ1bmN0aW9uIHcobil7dGhpcy5wcm9wcz1ufWZ1bmN0aW9uIHgobixlKXtmdW5jdGlvbiByKG4pe3ZhciB0PXRoaXMucHJvcHMucmVmLHI9dD09bi5yZWY7cmV0dXJuIXImJnQmJih0LmNhbGw/dChudWxsKTp0LmN1cnJlbnQ9bnVsbCksZT8hZSh0aGlzLnByb3BzLG4pfHwhcjpDKHRoaXMucHJvcHMsbil9ZnVuY3Rpb24gdShlKXtyZXR1cm4gdGhpcy5zaG91bGRDb21wb25lbnRVcGRhdGU9cix0KG4sZSl9cmV0dXJuIHUuZGlzcGxheU5hbWU9XCJNZW1vKFwiKyhuLmRpc3BsYXlOYW1lfHxuLm5hbWUpK1wiKVwiLHUucHJvdG90eXBlLmlzUmVhY3RDb21wb25lbnQ9ITAsdS5fX2Y9ITAsdX0ody5wcm90b3R5cGU9bmV3IG4pLmlzUHVyZVJlYWN0Q29tcG9uZW50PSEwLHcucHJvdG90eXBlLnNob3VsZENvbXBvbmVudFVwZGF0ZT1mdW5jdGlvbihuLHQpe3JldHVybiBDKHRoaXMucHJvcHMsbil8fEModGhpcy5zdGF0ZSx0KX07dmFyIFI9ZS5fX2I7ZS5fX2I9ZnVuY3Rpb24obil7bi50eXBlJiZuLnR5cGUuX19mJiZuLnJlZiYmKG4ucHJvcHMucmVmPW4ucmVmLG4ucmVmPW51bGwpLFImJlIobil9O3ZhciBOPVwidW5kZWZpbmVkXCIhPXR5cGVvZiBTeW1ib2wmJlN5bWJvbC5mb3ImJlN5bWJvbC5mb3IoXCJyZWFjdC5mb3J3YXJkX3JlZlwiKXx8MzkxMTtmdW5jdGlvbiBrKG4pe2Z1bmN0aW9uIHQodCl7dmFyIGU9Zyh7fSx0KTtyZXR1cm4gZGVsZXRlIGUucmVmLG4oZSx0LnJlZnx8bnVsbCl9cmV0dXJuIHQuJCR0eXBlb2Y9Tix0LnJlbmRlcj10LHQucHJvdG90eXBlLmlzUmVhY3RDb21wb25lbnQ9dC5fX2Y9ITAsdC5kaXNwbGF5TmFtZT1cIkZvcndhcmRSZWYoXCIrKG4uZGlzcGxheU5hbWV8fG4ubmFtZSkrXCIpXCIsdH12YXIgQT1mdW5jdGlvbihuLHQpe3JldHVybiBudWxsPT1uP251bGw6cihyKG4pLm1hcCh0KSl9LE89e21hcDpBLGZvckVhY2g6QSxjb3VudDpmdW5jdGlvbihuKXtyZXR1cm4gbj9yKG4pLmxlbmd0aDowfSxvbmx5OmZ1bmN0aW9uKG4pe3ZhciB0PXIobik7aWYoMSE9PXQubGVuZ3RoKXRocm93XCJDaGlsZHJlbi5vbmx5XCI7cmV0dXJuIHRbMF19LHRvQXJyYXk6cn0sVD1lLl9fZTtlLl9fZT1mdW5jdGlvbihuLHQsZSxyKXtpZihuLnRoZW4pZm9yKHZhciB1LG89dDtvPW8uX187KWlmKCh1PW8uX19jKSYmdS5fX2MpcmV0dXJuIG51bGw9PXQuX19lJiYodC5fX2U9ZS5fX2UsdC5fX2s9ZS5fX2spLHUuX19jKG4sdCk7VChuLHQsZSxyKX07dmFyIEY9ZS51bm1vdW50O2Z1bmN0aW9uIEkobix0LGUpe3JldHVybiBuJiYobi5fX2MmJm4uX19jLl9fSCYmKG4uX19jLl9fSC5fXy5mb3JFYWNoKGZ1bmN0aW9uKG4pe1wiZnVuY3Rpb25cIj09dHlwZW9mIG4uX19jJiZuLl9fYygpfSksbi5fX2MuX19IPW51bGwpLG51bGwhPShuPWcoe30sbikpLl9fYyYmKG4uX19jLl9fUD09PWUmJihuLl9fYy5fX1A9dCksbi5fX2M9bnVsbCksbi5fX2s9bi5fX2smJm4uX19rLm1hcChmdW5jdGlvbihuKXtyZXR1cm4gSShuLHQsZSl9KSksbn1mdW5jdGlvbiBMKG4sdCxlKXtyZXR1cm4gbiYmKG4uX192PW51bGwsbi5fX2s9bi5fX2smJm4uX19rLm1hcChmdW5jdGlvbihuKXtyZXR1cm4gTChuLHQsZSl9KSxuLl9fYyYmbi5fX2MuX19QPT09dCYmKG4uX19lJiZlLmluc2VydEJlZm9yZShuLl9fZSxuLl9fZCksbi5fX2MuX19lPSEwLG4uX19jLl9fUD1lKSksbn1mdW5jdGlvbiBVKCl7dGhpcy5fX3U9MCx0aGlzLnQ9bnVsbCx0aGlzLl9fYj1udWxsfWZ1bmN0aW9uIEQobil7dmFyIHQ9bi5fXy5fX2M7cmV0dXJuIHQmJnQuX19hJiZ0Ll9fYShuKX1mdW5jdGlvbiBNKG4pe3ZhciBlLHIsdTtmdW5jdGlvbiBvKG8pe2lmKGV8fChlPW4oKSkudGhlbihmdW5jdGlvbihuKXtyPW4uZGVmYXVsdHx8bn0sZnVuY3Rpb24obil7dT1ufSksdSl0aHJvdyB1O2lmKCFyKXRocm93IGU7cmV0dXJuIHQocixvKX1yZXR1cm4gby5kaXNwbGF5TmFtZT1cIkxhenlcIixvLl9fZj0hMCxvfWZ1bmN0aW9uIFYoKXt0aGlzLnU9bnVsbCx0aGlzLm89bnVsbH1lLnVubW91bnQ9ZnVuY3Rpb24obil7dmFyIHQ9bi5fX2M7dCYmdC5fX1ImJnQuX19SKCksdCYmITA9PT1uLl9faCYmKG4udHlwZT1udWxsKSxGJiZGKG4pfSwoVS5wcm90b3R5cGU9bmV3IG4pLl9fYz1mdW5jdGlvbihuLHQpe3ZhciBlPXQuX19jLHI9dGhpcztudWxsPT1yLnQmJihyLnQ9W10pLHIudC5wdXNoKGUpO3ZhciB1PUQoci5fX3YpLG89ITEsaT1mdW5jdGlvbigpe298fChvPSEwLGUuX19SPW51bGwsdT91KGwpOmwoKSl9O2UuX19SPWk7dmFyIGw9ZnVuY3Rpb24oKXtpZighLS1yLl9fdSl7aWYoci5zdGF0ZS5fX2Epe3ZhciBuPXIuc3RhdGUuX19hO3IuX192Ll9fa1swXT1MKG4sbi5fX2MuX19QLG4uX19jLl9fTyl9dmFyIHQ7Zm9yKHIuc2V0U3RhdGUoe19fYTpyLl9fYj1udWxsfSk7dD1yLnQucG9wKCk7KXQuZm9yY2VVcGRhdGUoKX19LGM9ITA9PT10Ll9faDtyLl9fdSsrfHxjfHxyLnNldFN0YXRlKHtfX2E6ci5fX2I9ci5fX3YuX19rWzBdfSksbi50aGVuKGksaSl9LFUucHJvdG90eXBlLmNvbXBvbmVudFdpbGxVbm1vdW50PWZ1bmN0aW9uKCl7dGhpcy50PVtdfSxVLnByb3RvdHlwZS5yZW5kZXI9ZnVuY3Rpb24obixlKXtpZih0aGlzLl9fYil7aWYodGhpcy5fX3YuX19rKXt2YXIgcj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpLG89dGhpcy5fX3YuX19rWzBdLl9fYzt0aGlzLl9fdi5fX2tbMF09SSh0aGlzLl9fYixyLG8uX19PPW8uX19QKX10aGlzLl9fYj1udWxsfXZhciBpPWUuX19hJiZ0KHUsbnVsbCxuLmZhbGxiYWNrKTtyZXR1cm4gaSYmKGkuX19oPW51bGwpLFt0KHUsbnVsbCxlLl9fYT9udWxsOm4uY2hpbGRyZW4pLGldfTt2YXIgVz1mdW5jdGlvbihuLHQsZSl7aWYoKytlWzFdPT09ZVswXSYmbi5vLmRlbGV0ZSh0KSxuLnByb3BzLnJldmVhbE9yZGVyJiYoXCJ0XCIhPT1uLnByb3BzLnJldmVhbE9yZGVyWzBdfHwhbi5vLnNpemUpKWZvcihlPW4udTtlOyl7Zm9yKDtlLmxlbmd0aD4zOyllLnBvcCgpKCk7aWYoZVsxXTxlWzBdKWJyZWFrO24udT1lPWVbMl19fTtmdW5jdGlvbiBQKG4pe3JldHVybiB0aGlzLmdldENoaWxkQ29udGV4dD1mdW5jdGlvbigpe3JldHVybiBuLmNvbnRleHR9LG4uY2hpbGRyZW59ZnVuY3Rpb24gaihuKXt2YXIgZT10aGlzLHI9bi5pO2UuY29tcG9uZW50V2lsbFVubW91bnQ9ZnVuY3Rpb24oKXtvKG51bGwsZS5sKSxlLmw9bnVsbCxlLmk9bnVsbH0sZS5pJiZlLmkhPT1yJiZlLmNvbXBvbmVudFdpbGxVbm1vdW50KCksZS5sfHwoZS5pPXIsZS5sPXtub2RlVHlwZToxLHBhcmVudE5vZGU6cixjaGlsZE5vZGVzOltdLGFwcGVuZENoaWxkOmZ1bmN0aW9uKG4pe3RoaXMuY2hpbGROb2Rlcy5wdXNoKG4pLGUuaS5hcHBlbmRDaGlsZChuKX0saW5zZXJ0QmVmb3JlOmZ1bmN0aW9uKG4sdCl7dGhpcy5jaGlsZE5vZGVzLnB1c2gobiksZS5pLmFwcGVuZENoaWxkKG4pfSxyZW1vdmVDaGlsZDpmdW5jdGlvbihuKXt0aGlzLmNoaWxkTm9kZXMuc3BsaWNlKHRoaXMuY2hpbGROb2Rlcy5pbmRleE9mKG4pPj4+MSwxKSxlLmkucmVtb3ZlQ2hpbGQobil9fSksbyh0KFAse2NvbnRleHQ6ZS5jb250ZXh0fSxuLl9fdiksZS5sKX1mdW5jdGlvbiB6KG4sZSl7dmFyIHI9dChqLHtfX3Y6bixpOmV9KTtyZXR1cm4gci5jb250YWluZXJJbmZvPWUscn0oVi5wcm90b3R5cGU9bmV3IG4pLl9fYT1mdW5jdGlvbihuKXt2YXIgdD10aGlzLGU9RCh0Ll9fdikscj10Lm8uZ2V0KG4pO3JldHVybiByWzBdKyssZnVuY3Rpb24odSl7dmFyIG89ZnVuY3Rpb24oKXt0LnByb3BzLnJldmVhbE9yZGVyPyhyLnB1c2godSksVyh0LG4scikpOnUoKX07ZT9lKG8pOm8oKX19LFYucHJvdG90eXBlLnJlbmRlcj1mdW5jdGlvbihuKXt0aGlzLnU9bnVsbCx0aGlzLm89bmV3IE1hcDt2YXIgdD1yKG4uY2hpbGRyZW4pO24ucmV2ZWFsT3JkZXImJlwiYlwiPT09bi5yZXZlYWxPcmRlclswXSYmdC5yZXZlcnNlKCk7Zm9yKHZhciBlPXQubGVuZ3RoO2UtLTspdGhpcy5vLnNldCh0W2VdLHRoaXMudT1bMSwwLHRoaXMudV0pO3JldHVybiBuLmNoaWxkcmVufSxWLnByb3RvdHlwZS5jb21wb25lbnREaWRVcGRhdGU9Vi5wcm90b3R5cGUuY29tcG9uZW50RGlkTW91bnQ9ZnVuY3Rpb24oKXt2YXIgbj10aGlzO3RoaXMuby5mb3JFYWNoKGZ1bmN0aW9uKHQsZSl7VyhuLGUsdCl9KX07dmFyIEI9XCJ1bmRlZmluZWRcIiE9dHlwZW9mIFN5bWJvbCYmU3ltYm9sLmZvciYmU3ltYm9sLmZvcihcInJlYWN0LmVsZW1lbnRcIil8fDYwMTAzLEg9L14oPzphY2NlbnR8YWxpZ25tZW50fGFyYWJpY3xiYXNlbGluZXxjYXB8Y2xpcCg/IVBhdGhVKXxjb2xvcnxkb21pbmFudHxmaWxsfGZsb29kfGZvbnR8Z2x5cGgoPyFSKXxob3JpenxpbWFnZSghUyl8bGV0dGVyfGxpZ2h0aW5nfG1hcmtlcig/IUh8V3xVKXxvdmVybGluZXxwYWludHxwb2ludGVyfHNoYXBlfHN0b3B8c3RyaWtldGhyb3VnaHxzdHJva2V8dGV4dCg/IUwpfHRyYW5zZm9ybXx1bmRlcmxpbmV8dW5pY29kZXx1bml0c3x2fHZlY3Rvcnx2ZXJ0fHdvcmR8d3JpdGluZ3x4KD8hQykpW0EtWl0vLFo9L15vbihBbml8VHJhfFRvdXxCZWZvcmVJbnB8Q29tcG8pLyxZPS9bQS1aMC05XS9nLCQ9XCJ1bmRlZmluZWRcIiE9dHlwZW9mIGRvY3VtZW50LHE9ZnVuY3Rpb24obil7cmV0dXJuKFwidW5kZWZpbmVkXCIhPXR5cGVvZiBTeW1ib2wmJlwic3ltYm9sXCI9PXR5cGVvZiBTeW1ib2woKT8vZmlsfGNoZXxyYWQvOi9maWx8Y2hlfHJhLykudGVzdChuKX07ZnVuY3Rpb24gRyhuLHQsZSl7cmV0dXJuIG51bGw9PXQuX19rJiYodC50ZXh0Q29udGVudD1cIlwiKSxvKG4sdCksXCJmdW5jdGlvblwiPT10eXBlb2YgZSYmZSgpLG4/bi5fX2M6bnVsbH1mdW5jdGlvbiBKKG4sdCxlKXtyZXR1cm4gaShuLHQpLFwiZnVuY3Rpb25cIj09dHlwZW9mIGUmJmUoKSxuP24uX19jOm51bGx9bi5wcm90b3R5cGUuaXNSZWFjdENvbXBvbmVudD17fSxbXCJjb21wb25lbnRXaWxsTW91bnRcIixcImNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHNcIixcImNvbXBvbmVudFdpbGxVcGRhdGVcIl0uZm9yRWFjaChmdW5jdGlvbih0KXtPYmplY3QuZGVmaW5lUHJvcGVydHkobi5wcm90b3R5cGUsdCx7Y29uZmlndXJhYmxlOiEwLGdldDpmdW5jdGlvbigpe3JldHVybiB0aGlzW1wiVU5TQUZFX1wiK3RdfSxzZXQ6ZnVuY3Rpb24obil7T2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsdCx7Y29uZmlndXJhYmxlOiEwLHdyaXRhYmxlOiEwLHZhbHVlOm59KX19KX0pO3ZhciBLPWUuZXZlbnQ7ZnVuY3Rpb24gUSgpe31mdW5jdGlvbiBYKCl7cmV0dXJuIHRoaXMuY2FuY2VsQnViYmxlfWZ1bmN0aW9uIG5uKCl7cmV0dXJuIHRoaXMuZGVmYXVsdFByZXZlbnRlZH1lLmV2ZW50PWZ1bmN0aW9uKG4pe3JldHVybiBLJiYobj1LKG4pKSxuLnBlcnNpc3Q9USxuLmlzUHJvcGFnYXRpb25TdG9wcGVkPVgsbi5pc0RlZmF1bHRQcmV2ZW50ZWQ9bm4sbi5uYXRpdmVFdmVudD1ufTt2YXIgdG4sZW49e2VudW1lcmFibGU6ITEsY29uZmlndXJhYmxlOiEwLGdldDpmdW5jdGlvbigpe3JldHVybiB0aGlzLmNsYXNzfX0scm49ZS52bm9kZTtlLnZub2RlPWZ1bmN0aW9uKG4pe1wic3RyaW5nXCI9PXR5cGVvZiBuLnR5cGUmJmZ1bmN0aW9uKG4pe3ZhciB0PW4ucHJvcHMsZT1uLnR5cGUsdT17fTtmb3IodmFyIG8gaW4gdCl7dmFyIGk9dFtvXTtpZighKFwidmFsdWVcIj09PW8mJlwiZGVmYXVsdFZhbHVlXCJpbiB0JiZudWxsPT1pfHwkJiZcImNoaWxkcmVuXCI9PT1vJiZcIm5vc2NyaXB0XCI9PT1lfHxcImNsYXNzXCI9PT1vfHxcImNsYXNzTmFtZVwiPT09bykpe3ZhciBsPW8udG9Mb3dlckNhc2UoKTtcImRlZmF1bHRWYWx1ZVwiPT09byYmXCJ2YWx1ZVwiaW4gdCYmbnVsbD09dC52YWx1ZT9vPVwidmFsdWVcIjpcImRvd25sb2FkXCI9PT1vJiYhMD09PWk/aT1cIlwiOlwib25kb3VibGVjbGlja1wiPT09bD9vPVwib25kYmxjbGlja1wiOlwib25jaGFuZ2VcIiE9PWx8fFwiaW5wdXRcIiE9PWUmJlwidGV4dGFyZWFcIiE9PWV8fHEodC50eXBlKT9cIm9uZm9jdXNcIj09PWw/bz1cIm9uZm9jdXNpblwiOlwib25ibHVyXCI9PT1sP289XCJvbmZvY3Vzb3V0XCI6Wi50ZXN0KG8pP289bDotMT09PWUuaW5kZXhPZihcIi1cIikmJkgudGVzdChvKT9vPW8ucmVwbGFjZShZLFwiLSQmXCIpLnRvTG93ZXJDYXNlKCk6bnVsbD09PWkmJihpPXZvaWQgMCk6bD1vPVwib25pbnB1dFwiLFwib25pbnB1dFwiPT09bCYmdVtvPWxdJiYobz1cIm9uaW5wdXRDYXB0dXJlXCIpLHVbb109aX19XCJzZWxlY3RcIj09ZSYmdS5tdWx0aXBsZSYmQXJyYXkuaXNBcnJheSh1LnZhbHVlKSYmKHUudmFsdWU9cih0LmNoaWxkcmVuKS5mb3JFYWNoKGZ1bmN0aW9uKG4pe24ucHJvcHMuc2VsZWN0ZWQ9LTEhPXUudmFsdWUuaW5kZXhPZihuLnByb3BzLnZhbHVlKX0pKSxcInNlbGVjdFwiPT1lJiZudWxsIT11LmRlZmF1bHRWYWx1ZSYmKHUudmFsdWU9cih0LmNoaWxkcmVuKS5mb3JFYWNoKGZ1bmN0aW9uKG4pe24ucHJvcHMuc2VsZWN0ZWQ9dS5tdWx0aXBsZT8tMSE9dS5kZWZhdWx0VmFsdWUuaW5kZXhPZihuLnByb3BzLnZhbHVlKTp1LmRlZmF1bHRWYWx1ZT09bi5wcm9wcy52YWx1ZX0pKSx0LmNsYXNzJiYhdC5jbGFzc05hbWU/KHUuY2xhc3M9dC5jbGFzcyxPYmplY3QuZGVmaW5lUHJvcGVydHkodSxcImNsYXNzTmFtZVwiLGVuKSk6KHQuY2xhc3NOYW1lJiYhdC5jbGFzc3x8dC5jbGFzcyYmdC5jbGFzc05hbWUpJiYodS5jbGFzcz11LmNsYXNzTmFtZT10LmNsYXNzTmFtZSksbi5wcm9wcz11fShuKSxuLiQkdHlwZW9mPUIscm4mJnJuKG4pfTt2YXIgdW49ZS5fX3I7ZS5fX3I9ZnVuY3Rpb24obil7dW4mJnVuKG4pLHRuPW4uX19jfTt2YXIgb249ZS5kaWZmZWQ7ZS5kaWZmZWQ9ZnVuY3Rpb24obil7b24mJm9uKG4pO3ZhciB0PW4ucHJvcHMsZT1uLl9fZTtudWxsIT1lJiZcInRleHRhcmVhXCI9PT1uLnR5cGUmJlwidmFsdWVcImluIHQmJnQudmFsdWUhPT1lLnZhbHVlJiYoZS52YWx1ZT1udWxsPT10LnZhbHVlP1wiXCI6dC52YWx1ZSksdG49bnVsbH07dmFyIGxuPXtSZWFjdEN1cnJlbnREaXNwYXRjaGVyOntjdXJyZW50OntyZWFkQ29udGV4dDpmdW5jdGlvbihuKXtyZXR1cm4gdG4uX19uW24uX19jXS5wcm9wcy52YWx1ZX19fX0sY249XCIxNy4wLjJcIjtmdW5jdGlvbiBmbihuKXtyZXR1cm4gdC5iaW5kKG51bGwsbil9ZnVuY3Rpb24gYW4obil7cmV0dXJuISFuJiZuLiQkdHlwZW9mPT09Qn1mdW5jdGlvbiBzbihuKXtyZXR1cm4gYW4obikmJm4udHlwZT09PXV9ZnVuY3Rpb24gaG4obil7cmV0dXJuIGFuKG4pP2YuYXBwbHkobnVsbCxhcmd1bWVudHMpOm59ZnVuY3Rpb24gdm4obil7cmV0dXJuISFuLl9fayYmKG8obnVsbCxuKSwhMCl9ZnVuY3Rpb24gZG4obil7cmV0dXJuIG4mJihuLmJhc2V8fDE9PT1uLm5vZGVUeXBlJiZuKXx8bnVsbH12YXIgcG49ZnVuY3Rpb24obix0KXtyZXR1cm4gbih0KX0sbW49ZnVuY3Rpb24obix0KXtyZXR1cm4gbih0KX0seW49dTtmdW5jdGlvbiBfbihuKXtuKCl9ZnVuY3Rpb24gYm4obil7cmV0dXJuIG59ZnVuY3Rpb24gU24oKXtyZXR1cm5bITEsX25dfXZhciBnbj1kLENuPWFuO2Z1bmN0aW9uIEVuKG4sdCl7dmFyIGU9dCgpLHI9YSh7aDp7X186ZSx2OnR9fSksdT1yWzBdLmgsbz1yWzFdO3JldHVybiBkKGZ1bmN0aW9uKCl7dS5fXz1lLHUudj10LEUodS5fXyx0KCkpfHxvKHtoOnV9KX0sW24sZSx0XSksdihmdW5jdGlvbigpe3JldHVybiBFKHUuX18sdS52KCkpfHxvKHtoOnV9KSxuKGZ1bmN0aW9uKCl7RSh1Ll9fLHUudigpKXx8byh7aDp1fSl9KX0sW25dKSxlfXZhciB3bj17dXNlU3RhdGU6YSx1c2VJZDpzLHVzZVJlZHVjZXI6aCx1c2VFZmZlY3Q6dix1c2VMYXlvdXRFZmZlY3Q6ZCx1c2VJbnNlcnRpb25FZmZlY3Q6Z24sdXNlVHJhbnNpdGlvbjpTbix1c2VEZWZlcnJlZFZhbHVlOmJuLHVzZVN5bmNFeHRlcm5hbFN0b3JlOkVuLHN0YXJ0VHJhbnNpdGlvbjpfbix1c2VSZWY6cCx1c2VJbXBlcmF0aXZlSGFuZGxlOm0sdXNlTWVtbzp5LHVzZUNhbGxiYWNrOl8sdXNlQ29udGV4dDpiLHVzZURlYnVnVmFsdWU6Uyx2ZXJzaW9uOlwiMTcuMC4yXCIsQ2hpbGRyZW46TyxyZW5kZXI6RyxoeWRyYXRlOkosdW5tb3VudENvbXBvbmVudEF0Tm9kZTp2bixjcmVhdGVQb3J0YWw6eixjcmVhdGVFbGVtZW50OnQsY3JlYXRlQ29udGV4dDpsLGNyZWF0ZUZhY3Rvcnk6Zm4sY2xvbmVFbGVtZW50OmhuLGNyZWF0ZVJlZjpjLEZyYWdtZW50OnUsaXNWYWxpZEVsZW1lbnQ6YW4saXNFbGVtZW50OkNuLGlzRnJhZ21lbnQ6c24sZmluZERPTU5vZGU6ZG4sQ29tcG9uZW50Om4sUHVyZUNvbXBvbmVudDp3LG1lbW86eCxmb3J3YXJkUmVmOmssZmx1c2hTeW5jOm1uLHVuc3RhYmxlX2JhdGNoZWRVcGRhdGVzOnBuLFN0cmljdE1vZGU6eW4sU3VzcGVuc2U6VSxTdXNwZW5zZUxpc3Q6VixsYXp5Ok0sX19TRUNSRVRfSU5URVJOQUxTX0RPX05PVF9VU0VfT1JfWU9VX1dJTExfQkVfRklSRUQ6bG59O2V4cG9ydHtPIGFzIENoaWxkcmVuLHcgYXMgUHVyZUNvbXBvbmVudCx5biBhcyBTdHJpY3RNb2RlLFUgYXMgU3VzcGVuc2UsViBhcyBTdXNwZW5zZUxpc3QsbG4gYXMgX19TRUNSRVRfSU5URVJOQUxTX0RPX05PVF9VU0VfT1JfWU9VX1dJTExfQkVfRklSRUQsaG4gYXMgY2xvbmVFbGVtZW50LGZuIGFzIGNyZWF0ZUZhY3RvcnkseiBhcyBjcmVhdGVQb3J0YWwsd24gYXMgZGVmYXVsdCxkbiBhcyBmaW5kRE9NTm9kZSxtbiBhcyBmbHVzaFN5bmMsayBhcyBmb3J3YXJkUmVmLEogYXMgaHlkcmF0ZSxDbiBhcyBpc0VsZW1lbnQsc24gYXMgaXNGcmFnbWVudCxhbiBhcyBpc1ZhbGlkRWxlbWVudCxNIGFzIGxhenkseCBhcyBtZW1vLEcgYXMgcmVuZGVyLF9uIGFzIHN0YXJ0VHJhbnNpdGlvbix2biBhcyB1bm1vdW50Q29tcG9uZW50QXROb2RlLHBuIGFzIHVuc3RhYmxlX2JhdGNoZWRVcGRhdGVzLGJuIGFzIHVzZURlZmVycmVkVmFsdWUsZ24gYXMgdXNlSW5zZXJ0aW9uRWZmZWN0LEVuIGFzIHVzZVN5bmNFeHRlcm5hbFN0b3JlLFNuIGFzIHVzZVRyYW5zaXRpb24sY24gYXMgdmVyc2lvbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb21wYXQubW9kdWxlLmpzLm1hcFxuIiwidmFyIG4sbCx1LHQsaSxvLHIsZixlLGM9e30scz1bXSxhPS9hY2l0fGV4KD86c3xnfG58cHwkKXxycGh8Z3JpZHxvd3N8bW5jfG50d3xpbmVbY2hdfHpvb3xeb3JkfGl0ZXJhL2ksaD1BcnJheS5pc0FycmF5O2Z1bmN0aW9uIHYobixsKXtmb3IodmFyIHUgaW4gbCluW3VdPWxbdV07cmV0dXJuIG59ZnVuY3Rpb24gcChuKXt2YXIgbD1uLnBhcmVudE5vZGU7bCYmbC5yZW1vdmVDaGlsZChuKX1mdW5jdGlvbiB5KGwsdSx0KXt2YXIgaSxvLHIsZj17fTtmb3IociBpbiB1KVwia2V5XCI9PXI/aT11W3JdOlwicmVmXCI9PXI/bz11W3JdOmZbcl09dVtyXTtpZihhcmd1bWVudHMubGVuZ3RoPjImJihmLmNoaWxkcmVuPWFyZ3VtZW50cy5sZW5ndGg+Mz9uLmNhbGwoYXJndW1lbnRzLDIpOnQpLFwiZnVuY3Rpb25cIj09dHlwZW9mIGwmJm51bGwhPWwuZGVmYXVsdFByb3BzKWZvcihyIGluIGwuZGVmYXVsdFByb3BzKXZvaWQgMD09PWZbcl0mJihmW3JdPWwuZGVmYXVsdFByb3BzW3JdKTtyZXR1cm4gZChsLGYsaSxvLG51bGwpfWZ1bmN0aW9uIGQobix0LGksbyxyKXt2YXIgZj17dHlwZTpuLHByb3BzOnQsa2V5OmkscmVmOm8sX19rOm51bGwsX186bnVsbCxfX2I6MCxfX2U6bnVsbCxfX2Q6dm9pZCAwLF9fYzpudWxsLF9faDpudWxsLGNvbnN0cnVjdG9yOnZvaWQgMCxfX3Y6bnVsbD09cj8rK3U6cn07cmV0dXJuIG51bGw9PXImJm51bGwhPWwudm5vZGUmJmwudm5vZGUoZiksZn1mdW5jdGlvbiBfKCl7cmV0dXJue2N1cnJlbnQ6bnVsbH19ZnVuY3Rpb24gayhuKXtyZXR1cm4gbi5jaGlsZHJlbn1mdW5jdGlvbiBiKG4sbCl7dGhpcy5wcm9wcz1uLHRoaXMuY29udGV4dD1sfWZ1bmN0aW9uIGcobixsKXtpZihudWxsPT1sKXJldHVybiBuLl9fP2cobi5fXyxuLl9fLl9fay5pbmRleE9mKG4pKzEpOm51bGw7Zm9yKHZhciB1O2w8bi5fX2subGVuZ3RoO2wrKylpZihudWxsIT0odT1uLl9fa1tsXSkmJm51bGwhPXUuX19lKXJldHVybiB1Ll9fZTtyZXR1cm5cImZ1bmN0aW9uXCI9PXR5cGVvZiBuLnR5cGU/ZyhuKTpudWxsfWZ1bmN0aW9uIG0obil7dmFyIGwsdTtpZihudWxsIT0obj1uLl9fKSYmbnVsbCE9bi5fX2Mpe2ZvcihuLl9fZT1uLl9fYy5iYXNlPW51bGwsbD0wO2w8bi5fX2subGVuZ3RoO2wrKylpZihudWxsIT0odT1uLl9fa1tsXSkmJm51bGwhPXUuX19lKXtuLl9fZT1uLl9fYy5iYXNlPXUuX19lO2JyZWFrfXJldHVybiBtKG4pfX1mdW5jdGlvbiB3KG4peyghbi5fX2QmJihuLl9fZD0hMCkmJmkucHVzaChuKSYmIXguX19yKyt8fG8hPT1sLmRlYm91bmNlUmVuZGVyaW5nKSYmKChvPWwuZGVib3VuY2VSZW5kZXJpbmcpfHxyKSh4KX1mdW5jdGlvbiB4KCl7dmFyIG4sbCx1LHQsbyxyLGUsYyxzO2ZvcihpLnNvcnQoZik7bj1pLnNoaWZ0KCk7KW4uX19kJiYobD1pLmxlbmd0aCx0PXZvaWQgMCxvPXZvaWQgMCxyPXZvaWQgMCxjPShlPSh1PW4pLl9fdikuX19lLChzPXUuX19QKSYmKHQ9W10sbz1bXSwocj12KHt9LGUpKS5fX3Y9ZS5fX3YrMSxMKHMsZSxyLHUuX19uLHZvaWQgMCE9PXMub3duZXJTVkdFbGVtZW50LG51bGwhPWUuX19oP1tjXTpudWxsLHQsbnVsbD09Yz9nKGUpOmMsZS5fX2gsbyksTSh0LGUsbyksZS5fX2UhPWMmJm0oZSkpLGkubGVuZ3RoPmwmJmkuc29ydChmKSk7eC5fX3I9MH1mdW5jdGlvbiBQKG4sbCx1LHQsaSxvLHIsZixlLGEsdil7dmFyIHAseSxfLGIsbSx3LHgsUCxDLEg9MCxJPXQmJnQuX19rfHxzLFQ9SS5sZW5ndGgsaj1ULHo9bC5sZW5ndGg7Zm9yKHUuX19rPVtdLHA9MDtwPHo7cCsrKW51bGwhPShiPXUuX19rW3BdPW51bGw9PShiPWxbcF0pfHxcImJvb2xlYW5cIj09dHlwZW9mIGJ8fFwiZnVuY3Rpb25cIj09dHlwZW9mIGI/bnVsbDpcInN0cmluZ1wiPT10eXBlb2YgYnx8XCJudW1iZXJcIj09dHlwZW9mIGJ8fFwiYmlnaW50XCI9PXR5cGVvZiBiP2QobnVsbCxiLG51bGwsbnVsbCxiKTpoKGIpP2Qoayx7Y2hpbGRyZW46Yn0sbnVsbCxudWxsLG51bGwpOmIuX19iPjA/ZChiLnR5cGUsYi5wcm9wcyxiLmtleSxiLnJlZj9iLnJlZjpudWxsLGIuX192KTpiKT8oYi5fXz11LGIuX19iPXUuX19iKzEsLTE9PT0oUD1BKGIsSSx4PXArSCxqKSk/Xz1jOihfPUlbUF18fGMsSVtQXT12b2lkIDAsai0tKSxMKG4sYixfLGksbyxyLGYsZSxhLHYpLG09Yi5fX2UsKHk9Yi5yZWYpJiZfLnJlZiE9eSYmKF8ucmVmJiZPKF8ucmVmLG51bGwsYiksdi5wdXNoKHksYi5fX2N8fG0sYikpLG51bGwhPW0mJihudWxsPT13JiYodz1tKSwoQz1fPT09Y3x8bnVsbD09PV8uX192KT8tMT09UCYmSC0tOlAhPT14JiYoUD09PXgrMT9IKys6UD54P2o+ei14P0grPVAteDpILS06SD1QPHgmJlA9PXgtMT9QLXg6MCkseD1wK0gsXCJmdW5jdGlvblwiIT10eXBlb2YgYi50eXBlfHxQPT09eCYmXy5fX2shPT1iLl9faz9cImZ1bmN0aW9uXCI9PXR5cGVvZiBiLnR5cGV8fFA9PT14JiYhQz92b2lkIDAhPT1iLl9fZD8oZT1iLl9fZCxiLl9fZD12b2lkIDApOmU9bS5uZXh0U2libGluZzplPVMobixtLGUpOmU9JChiLGUsbiksXCJmdW5jdGlvblwiPT10eXBlb2YgdS50eXBlJiYodS5fX2Q9ZSkpKTooXz1JW3BdKSYmbnVsbD09Xy5rZXkmJl8uX19lJiYoXy5fX2U9PWUmJihlPWcoXykpLHEoXyxfLCExKSxJW3BdPW51bGwpO2Zvcih1Ll9fZT13LHA9VDtwLS07KW51bGwhPUlbcF0mJihcImZ1bmN0aW9uXCI9PXR5cGVvZiB1LnR5cGUmJm51bGwhPUlbcF0uX19lJiZJW3BdLl9fZT09dS5fX2QmJih1Ll9fZD1JW3BdLl9fZS5uZXh0U2libGluZykscShJW3BdLElbcF0pKX1mdW5jdGlvbiAkKG4sbCx1KXtmb3IodmFyIHQsaT1uLl9fayxvPTA7aSYmbzxpLmxlbmd0aDtvKyspKHQ9aVtvXSkmJih0Ll9fPW4sbD1cImZ1bmN0aW9uXCI9PXR5cGVvZiB0LnR5cGU/JCh0LGwsdSk6Uyh1LHQuX19lLGwpKTtyZXR1cm4gbH1mdW5jdGlvbiBDKG4sbCl7cmV0dXJuIGw9bHx8W10sbnVsbD09bnx8XCJib29sZWFuXCI9PXR5cGVvZiBufHwoaChuKT9uLnNvbWUoZnVuY3Rpb24obil7QyhuLGwpfSk6bC5wdXNoKG4pKSxsfWZ1bmN0aW9uIFMobixsLHUpe3JldHVybiBudWxsPT11fHx1LnBhcmVudE5vZGUhPT1uP24uaW5zZXJ0QmVmb3JlKGwsbnVsbCk6bD09dSYmbnVsbCE9bC5wYXJlbnROb2RlfHxuLmluc2VydEJlZm9yZShsLHUpLGwubmV4dFNpYmxpbmd9ZnVuY3Rpb24gQShuLGwsdSx0KXt2YXIgaT1uLmtleSxvPW4udHlwZSxyPXUtMSxmPXUrMSxlPWxbdV07aWYobnVsbD09PWV8fGUmJmk9PWUua2V5JiZvPT09ZS50eXBlKXJldHVybiB1O2lmKHQ+KG51bGwhPWU/MTowKSlmb3IoO3I+PTB8fGY8bC5sZW5ndGg7KXtpZihyPj0wKXtpZigoZT1sW3JdKSYmaT09ZS5rZXkmJm89PT1lLnR5cGUpcmV0dXJuIHI7ci0tfWlmKGY8bC5sZW5ndGgpe2lmKChlPWxbZl0pJiZpPT1lLmtleSYmbz09PWUudHlwZSlyZXR1cm4gZjtmKyt9fXJldHVybi0xfWZ1bmN0aW9uIEgobixsLHUsdCxpKXt2YXIgbztmb3IobyBpbiB1KVwiY2hpbGRyZW5cIj09PW98fFwia2V5XCI9PT1vfHxvIGluIGx8fFQobixvLG51bGwsdVtvXSx0KTtmb3IobyBpbiBsKWkmJlwiZnVuY3Rpb25cIiE9dHlwZW9mIGxbb118fFwiY2hpbGRyZW5cIj09PW98fFwia2V5XCI9PT1vfHxcInZhbHVlXCI9PT1vfHxcImNoZWNrZWRcIj09PW98fHVbb109PT1sW29dfHxUKG4sbyxsW29dLHVbb10sdCl9ZnVuY3Rpb24gSShuLGwsdSl7XCItXCI9PT1sWzBdP24uc2V0UHJvcGVydHkobCxudWxsPT11P1wiXCI6dSk6bltsXT1udWxsPT11P1wiXCI6XCJudW1iZXJcIiE9dHlwZW9mIHV8fGEudGVzdChsKT91OnUrXCJweFwifWZ1bmN0aW9uIFQobixsLHUsdCxpKXt2YXIgbztuOmlmKFwic3R5bGVcIj09PWwpaWYoXCJzdHJpbmdcIj09dHlwZW9mIHUpbi5zdHlsZS5jc3NUZXh0PXU7ZWxzZXtpZihcInN0cmluZ1wiPT10eXBlb2YgdCYmKG4uc3R5bGUuY3NzVGV4dD10PVwiXCIpLHQpZm9yKGwgaW4gdCl1JiZsIGluIHV8fEkobi5zdHlsZSxsLFwiXCIpO2lmKHUpZm9yKGwgaW4gdSl0JiZ1W2xdPT09dFtsXXx8SShuLnN0eWxlLGwsdVtsXSl9ZWxzZSBpZihcIm9cIj09PWxbMF0mJlwiblwiPT09bFsxXSlvPWwhPT0obD1sLnJlcGxhY2UoLyhQb2ludGVyQ2FwdHVyZSkkfENhcHR1cmUkLyxcIiQxXCIpKSxsPWwudG9Mb3dlckNhc2UoKWluIG4/bC50b0xvd2VyQ2FzZSgpLnNsaWNlKDIpOmwuc2xpY2UoMiksbi5sfHwobi5sPXt9KSxuLmxbbCtvXT11LHU/dHx8bi5hZGRFdmVudExpc3RlbmVyKGwsbz96Omosbyk6bi5yZW1vdmVFdmVudExpc3RlbmVyKGwsbz96Omosbyk7ZWxzZSBpZihcImRhbmdlcm91c2x5U2V0SW5uZXJIVE1MXCIhPT1sKXtpZihpKWw9bC5yZXBsYWNlKC94bGluayhIfDpoKS8sXCJoXCIpLnJlcGxhY2UoL3NOYW1lJC8sXCJzXCIpO2Vsc2UgaWYoXCJ3aWR0aFwiIT09bCYmXCJoZWlnaHRcIiE9PWwmJlwiaHJlZlwiIT09bCYmXCJsaXN0XCIhPT1sJiZcImZvcm1cIiE9PWwmJlwidGFiSW5kZXhcIiE9PWwmJlwiZG93bmxvYWRcIiE9PWwmJlwicm93U3BhblwiIT09bCYmXCJjb2xTcGFuXCIhPT1sJiZsIGluIG4pdHJ5e25bbF09bnVsbD09dT9cIlwiOnU7YnJlYWsgbn1jYXRjaChuKXt9XCJmdW5jdGlvblwiPT10eXBlb2YgdXx8KG51bGw9PXV8fCExPT09dSYmXCItXCIhPT1sWzRdP24ucmVtb3ZlQXR0cmlidXRlKGwpOm4uc2V0QXR0cmlidXRlKGwsdSkpfX1mdW5jdGlvbiBqKG4pe3JldHVybiB0aGlzLmxbbi50eXBlKyExXShsLmV2ZW50P2wuZXZlbnQobik6bil9ZnVuY3Rpb24geihuKXtyZXR1cm4gdGhpcy5sW24udHlwZSshMF0obC5ldmVudD9sLmV2ZW50KG4pOm4pfWZ1bmN0aW9uIEwobix1LHQsaSxvLHIsZixlLGMscyl7dmFyIGEscCx5LGQsXyxnLG0sdyx4LCQsQyxTLEEsSCxJLFQ9dS50eXBlO2lmKHZvaWQgMCE9PXUuY29uc3RydWN0b3IpcmV0dXJuIG51bGw7bnVsbCE9dC5fX2gmJihjPXQuX19oLGU9dS5fX2U9dC5fX2UsdS5fX2g9bnVsbCxyPVtlXSksKGE9bC5fX2IpJiZhKHUpO246aWYoXCJmdW5jdGlvblwiPT10eXBlb2YgVCl0cnl7aWYodz11LnByb3BzLHg9KGE9VC5jb250ZXh0VHlwZSkmJmlbYS5fX2NdLCQ9YT94P3gucHJvcHMudmFsdWU6YS5fXzppLHQuX19jP209KHA9dS5fX2M9dC5fX2MpLl9fPXAuX19FOihcInByb3RvdHlwZVwiaW4gVCYmVC5wcm90b3R5cGUucmVuZGVyP3UuX19jPXA9bmV3IFQodywkKToodS5fX2M9cD1uZXcgYih3LCQpLHAuY29uc3RydWN0b3I9VCxwLnJlbmRlcj1CKSx4JiZ4LnN1YihwKSxwLnByb3BzPXcscC5zdGF0ZXx8KHAuc3RhdGU9e30pLHAuY29udGV4dD0kLHAuX19uPWkseT1wLl9fZD0hMCxwLl9faD1bXSxwLl9zYj1bXSksbnVsbD09cC5fX3MmJihwLl9fcz1wLnN0YXRlKSxudWxsIT1ULmdldERlcml2ZWRTdGF0ZUZyb21Qcm9wcyYmKHAuX19zPT1wLnN0YXRlJiYocC5fX3M9dih7fSxwLl9fcykpLHYocC5fX3MsVC5nZXREZXJpdmVkU3RhdGVGcm9tUHJvcHModyxwLl9fcykpKSxkPXAucHJvcHMsXz1wLnN0YXRlLHAuX192PXUseSludWxsPT1ULmdldERlcml2ZWRTdGF0ZUZyb21Qcm9wcyYmbnVsbCE9cC5jb21wb25lbnRXaWxsTW91bnQmJnAuY29tcG9uZW50V2lsbE1vdW50KCksbnVsbCE9cC5jb21wb25lbnREaWRNb3VudCYmcC5fX2gucHVzaChwLmNvbXBvbmVudERpZE1vdW50KTtlbHNle2lmKG51bGw9PVQuZ2V0RGVyaXZlZFN0YXRlRnJvbVByb3BzJiZ3IT09ZCYmbnVsbCE9cC5jb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzJiZwLmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHModywkKSwhcC5fX2UmJihudWxsIT1wLnNob3VsZENvbXBvbmVudFVwZGF0ZSYmITE9PT1wLnNob3VsZENvbXBvbmVudFVwZGF0ZSh3LHAuX19zLCQpfHx1Ll9fdj09PXQuX192KSl7Zm9yKHUuX192IT09dC5fX3YmJihwLnByb3BzPXcscC5zdGF0ZT1wLl9fcyxwLl9fZD0hMSksdS5fX2U9dC5fX2UsdS5fX2s9dC5fX2ssdS5fX2suZm9yRWFjaChmdW5jdGlvbihuKXtuJiYobi5fXz11KX0pLEM9MDtDPHAuX3NiLmxlbmd0aDtDKyspcC5fX2gucHVzaChwLl9zYltDXSk7cC5fc2I9W10scC5fX2gubGVuZ3RoJiZmLnB1c2gocCk7YnJlYWsgbn1udWxsIT1wLmNvbXBvbmVudFdpbGxVcGRhdGUmJnAuY29tcG9uZW50V2lsbFVwZGF0ZSh3LHAuX19zLCQpLG51bGwhPXAuY29tcG9uZW50RGlkVXBkYXRlJiZwLl9faC5wdXNoKGZ1bmN0aW9uKCl7cC5jb21wb25lbnREaWRVcGRhdGUoZCxfLGcpfSl9aWYocC5jb250ZXh0PSQscC5wcm9wcz13LHAuX19QPW4scC5fX2U9ITEsUz1sLl9fcixBPTAsXCJwcm90b3R5cGVcImluIFQmJlQucHJvdG90eXBlLnJlbmRlcil7Zm9yKHAuc3RhdGU9cC5fX3MscC5fX2Q9ITEsUyYmUyh1KSxhPXAucmVuZGVyKHAucHJvcHMscC5zdGF0ZSxwLmNvbnRleHQpLEg9MDtIPHAuX3NiLmxlbmd0aDtIKyspcC5fX2gucHVzaChwLl9zYltIXSk7cC5fc2I9W119ZWxzZSBkb3twLl9fZD0hMSxTJiZTKHUpLGE9cC5yZW5kZXIocC5wcm9wcyxwLnN0YXRlLHAuY29udGV4dCkscC5zdGF0ZT1wLl9fc313aGlsZShwLl9fZCYmKytBPDI1KTtwLnN0YXRlPXAuX19zLG51bGwhPXAuZ2V0Q2hpbGRDb250ZXh0JiYoaT12KHYoe30saSkscC5nZXRDaGlsZENvbnRleHQoKSkpLHl8fG51bGw9PXAuZ2V0U25hcHNob3RCZWZvcmVVcGRhdGV8fChnPXAuZ2V0U25hcHNob3RCZWZvcmVVcGRhdGUoZCxfKSksUChuLGgoST1udWxsIT1hJiZhLnR5cGU9PT1rJiZudWxsPT1hLmtleT9hLnByb3BzLmNoaWxkcmVuOmEpP0k6W0ldLHUsdCxpLG8scixmLGUsYyxzKSxwLmJhc2U9dS5fX2UsdS5fX2g9bnVsbCxwLl9faC5sZW5ndGgmJmYucHVzaChwKSxtJiYocC5fX0U9cC5fXz1udWxsKX1jYXRjaChuKXt1Ll9fdj1udWxsLChjfHxudWxsIT1yKSYmKHUuX19lPWUsdS5fX2g9ISFjLHJbci5pbmRleE9mKGUpXT1udWxsKSxsLl9fZShuLHUsdCl9ZWxzZSBudWxsPT1yJiZ1Ll9fdj09PXQuX192Pyh1Ll9faz10Ll9fayx1Ll9fZT10Ll9fZSk6dS5fX2U9Tih0Ll9fZSx1LHQsaSxvLHIsZixjLHMpOyhhPWwuZGlmZmVkKSYmYSh1KX1mdW5jdGlvbiBNKG4sdSx0KXtmb3IodmFyIGk9MDtpPHQubGVuZ3RoO2krKylPKHRbaV0sdFsrK2ldLHRbKytpXSk7bC5fX2MmJmwuX19jKHUsbiksbi5zb21lKGZ1bmN0aW9uKHUpe3RyeXtuPXUuX19oLHUuX19oPVtdLG4uc29tZShmdW5jdGlvbihuKXtuLmNhbGwodSl9KX1jYXRjaChuKXtsLl9fZShuLHUuX192KX19KX1mdW5jdGlvbiBOKGwsdSx0LGksbyxyLGYsZSxzKXt2YXIgYSx2LHksZD10LnByb3BzLF89dS5wcm9wcyxrPXUudHlwZSxiPTA7aWYoXCJzdmdcIj09PWsmJihvPSEwKSxudWxsIT1yKWZvcig7YjxyLmxlbmd0aDtiKyspaWYoKGE9cltiXSkmJlwic2V0QXR0cmlidXRlXCJpbiBhPT0hIWsmJihrP2EubG9jYWxOYW1lPT09azozPT09YS5ub2RlVHlwZSkpe2w9YSxyW2JdPW51bGw7YnJlYWt9aWYobnVsbD09bCl7aWYobnVsbD09PWspcmV0dXJuIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKF8pO2w9bz9kb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLGspOmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoayxfLmlzJiZfKSxyPW51bGwsZT0hMX1pZihudWxsPT09aylkPT09X3x8ZSYmbC5kYXRhPT09X3x8KGwuZGF0YT1fKTtlbHNle2lmKHI9ciYmbi5jYWxsKGwuY2hpbGROb2Rlcyksdj0oZD10LnByb3BzfHxjKS5kYW5nZXJvdXNseVNldElubmVySFRNTCx5PV8uZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUwsIWUpe2lmKG51bGwhPXIpZm9yKGQ9e30sYj0wO2I8bC5hdHRyaWJ1dGVzLmxlbmd0aDtiKyspZFtsLmF0dHJpYnV0ZXNbYl0ubmFtZV09bC5hdHRyaWJ1dGVzW2JdLnZhbHVlOyh5fHx2KSYmKHkmJih2JiZ5Ll9faHRtbD09di5fX2h0bWx8fHkuX19odG1sPT09bC5pbm5lckhUTUwpfHwobC5pbm5lckhUTUw9eSYmeS5fX2h0bWx8fFwiXCIpKX1pZihIKGwsXyxkLG8sZSkseSl1Ll9faz1bXTtlbHNlIGlmKFAobCxoKGI9dS5wcm9wcy5jaGlsZHJlbik/YjpbYl0sdSx0LGksbyYmXCJmb3JlaWduT2JqZWN0XCIhPT1rLHIsZixyP3JbMF06dC5fX2smJmcodCwwKSxlLHMpLG51bGwhPXIpZm9yKGI9ci5sZW5ndGg7Yi0tOyludWxsIT1yW2JdJiZwKHJbYl0pO2V8fChcInZhbHVlXCJpbiBfJiZ2b2lkIDAhPT0oYj1fLnZhbHVlKSYmKGIhPT1sLnZhbHVlfHxcInByb2dyZXNzXCI9PT1rJiYhYnx8XCJvcHRpb25cIj09PWsmJmIhPT1kLnZhbHVlKSYmVChsLFwidmFsdWVcIixiLGQudmFsdWUsITEpLFwiY2hlY2tlZFwiaW4gXyYmdm9pZCAwIT09KGI9Xy5jaGVja2VkKSYmYiE9PWwuY2hlY2tlZCYmVChsLFwiY2hlY2tlZFwiLGIsZC5jaGVja2VkLCExKSl9cmV0dXJuIGx9ZnVuY3Rpb24gTyhuLHUsdCl7dHJ5e1wiZnVuY3Rpb25cIj09dHlwZW9mIG4/bih1KTpuLmN1cnJlbnQ9dX1jYXRjaChuKXtsLl9fZShuLHQpfX1mdW5jdGlvbiBxKG4sdSx0KXt2YXIgaSxvO2lmKGwudW5tb3VudCYmbC51bm1vdW50KG4pLChpPW4ucmVmKSYmKGkuY3VycmVudCYmaS5jdXJyZW50IT09bi5fX2V8fE8oaSxudWxsLHUpKSxudWxsIT0oaT1uLl9fYykpe2lmKGkuY29tcG9uZW50V2lsbFVubW91bnQpdHJ5e2kuY29tcG9uZW50V2lsbFVubW91bnQoKX1jYXRjaChuKXtsLl9fZShuLHUpfWkuYmFzZT1pLl9fUD1udWxsLG4uX19jPXZvaWQgMH1pZihpPW4uX19rKWZvcihvPTA7bzxpLmxlbmd0aDtvKyspaVtvXSYmcShpW29dLHUsdHx8XCJmdW5jdGlvblwiIT10eXBlb2Ygbi50eXBlKTt0fHxudWxsPT1uLl9fZXx8cChuLl9fZSksbi5fXz1uLl9fZT1uLl9fZD12b2lkIDB9ZnVuY3Rpb24gQihuLGwsdSl7cmV0dXJuIHRoaXMuY29uc3RydWN0b3Iobix1KX1mdW5jdGlvbiBEKHUsdCxpKXt2YXIgbyxyLGYsZTtsLl9fJiZsLl9fKHUsdCkscj0obz1cImZ1bmN0aW9uXCI9PXR5cGVvZiBpKT9udWxsOmkmJmkuX19rfHx0Ll9fayxmPVtdLGU9W10sTCh0LHU9KCFvJiZpfHx0KS5fX2s9eShrLG51bGwsW3VdKSxyfHxjLGMsdm9pZCAwIT09dC5vd25lclNWR0VsZW1lbnQsIW8mJmk/W2ldOnI/bnVsbDp0LmZpcnN0Q2hpbGQ/bi5jYWxsKHQuY2hpbGROb2Rlcyk6bnVsbCxmLCFvJiZpP2k6cj9yLl9fZTp0LmZpcnN0Q2hpbGQsbyxlKSxNKGYsdSxlKX1mdW5jdGlvbiBFKG4sbCl7RChuLGwsRSl9ZnVuY3Rpb24gRihsLHUsdCl7dmFyIGksbyxyLGYsZT12KHt9LGwucHJvcHMpO2ZvcihyIGluIGwudHlwZSYmbC50eXBlLmRlZmF1bHRQcm9wcyYmKGY9bC50eXBlLmRlZmF1bHRQcm9wcyksdSlcImtleVwiPT1yP2k9dVtyXTpcInJlZlwiPT1yP289dVtyXTplW3JdPXZvaWQgMD09PXVbcl0mJnZvaWQgMCE9PWY/ZltyXTp1W3JdO3JldHVybiBhcmd1bWVudHMubGVuZ3RoPjImJihlLmNoaWxkcmVuPWFyZ3VtZW50cy5sZW5ndGg+Mz9uLmNhbGwoYXJndW1lbnRzLDIpOnQpLGQobC50eXBlLGUsaXx8bC5rZXksb3x8bC5yZWYsbnVsbCl9ZnVuY3Rpb24gRyhuLGwpe3ZhciB1PXtfX2M6bD1cIl9fY0NcIitlKyssX186bixDb25zdW1lcjpmdW5jdGlvbihuLGwpe3JldHVybiBuLmNoaWxkcmVuKGwpfSxQcm92aWRlcjpmdW5jdGlvbihuKXt2YXIgdSx0O3JldHVybiB0aGlzLmdldENoaWxkQ29udGV4dHx8KHU9W10sKHQ9e30pW2xdPXRoaXMsdGhpcy5nZXRDaGlsZENvbnRleHQ9ZnVuY3Rpb24oKXtyZXR1cm4gdH0sdGhpcy5zaG91bGRDb21wb25lbnRVcGRhdGU9ZnVuY3Rpb24obil7dGhpcy5wcm9wcy52YWx1ZSE9PW4udmFsdWUmJnUuc29tZShmdW5jdGlvbihuKXtuLl9fZT0hMCx3KG4pfSl9LHRoaXMuc3ViPWZ1bmN0aW9uKG4pe3UucHVzaChuKTt2YXIgbD1uLmNvbXBvbmVudFdpbGxVbm1vdW50O24uY29tcG9uZW50V2lsbFVubW91bnQ9ZnVuY3Rpb24oKXt1LnNwbGljZSh1LmluZGV4T2YobiksMSksbCYmbC5jYWxsKG4pfX0pLG4uY2hpbGRyZW59fTtyZXR1cm4gdS5Qcm92aWRlci5fXz11LkNvbnN1bWVyLmNvbnRleHRUeXBlPXV9bj1zLnNsaWNlLGw9e19fZTpmdW5jdGlvbihuLGwsdSx0KXtmb3IodmFyIGksbyxyO2w9bC5fXzspaWYoKGk9bC5fX2MpJiYhaS5fXyl0cnl7aWYoKG89aS5jb25zdHJ1Y3RvcikmJm51bGwhPW8uZ2V0RGVyaXZlZFN0YXRlRnJvbUVycm9yJiYoaS5zZXRTdGF0ZShvLmdldERlcml2ZWRTdGF0ZUZyb21FcnJvcihuKSkscj1pLl9fZCksbnVsbCE9aS5jb21wb25lbnREaWRDYXRjaCYmKGkuY29tcG9uZW50RGlkQ2F0Y2gobix0fHx7fSkscj1pLl9fZCkscilyZXR1cm4gaS5fX0U9aX1jYXRjaChsKXtuPWx9dGhyb3cgbn19LHU9MCx0PWZ1bmN0aW9uKG4pe3JldHVybiBudWxsIT1uJiZ2b2lkIDA9PT1uLmNvbnN0cnVjdG9yfSxiLnByb3RvdHlwZS5zZXRTdGF0ZT1mdW5jdGlvbihuLGwpe3ZhciB1O3U9bnVsbCE9dGhpcy5fX3MmJnRoaXMuX19zIT09dGhpcy5zdGF0ZT90aGlzLl9fczp0aGlzLl9fcz12KHt9LHRoaXMuc3RhdGUpLFwiZnVuY3Rpb25cIj09dHlwZW9mIG4mJihuPW4odih7fSx1KSx0aGlzLnByb3BzKSksbiYmdih1LG4pLG51bGwhPW4mJnRoaXMuX192JiYobCYmdGhpcy5fc2IucHVzaChsKSx3KHRoaXMpKX0sYi5wcm90b3R5cGUuZm9yY2VVcGRhdGU9ZnVuY3Rpb24obil7dGhpcy5fX3YmJih0aGlzLl9fZT0hMCxuJiZ0aGlzLl9faC5wdXNoKG4pLHcodGhpcykpfSxiLnByb3RvdHlwZS5yZW5kZXI9ayxpPVtdLHI9XCJmdW5jdGlvblwiPT10eXBlb2YgUHJvbWlzZT9Qcm9taXNlLnByb3RvdHlwZS50aGVuLmJpbmQoUHJvbWlzZS5yZXNvbHZlKCkpOnNldFRpbWVvdXQsZj1mdW5jdGlvbihuLGwpe3JldHVybiBuLl9fdi5fX2ItbC5fX3YuX19ifSx4Ll9fcj0wLGU9MDtleHBvcnR7YiBhcyBDb21wb25lbnQsayBhcyBGcmFnbWVudCxGIGFzIGNsb25lRWxlbWVudCxHIGFzIGNyZWF0ZUNvbnRleHQseSBhcyBjcmVhdGVFbGVtZW50LF8gYXMgY3JlYXRlUmVmLHkgYXMgaCxFIGFzIGh5ZHJhdGUsdCBhcyBpc1ZhbGlkRWxlbWVudCxsIGFzIG9wdGlvbnMsRCBhcyByZW5kZXIsQyBhcyB0b0NoaWxkQXJyYXl9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cHJlYWN0Lm1vZHVsZS5qcy5tYXBcbiIsImltcG9ydHtvcHRpb25zIGFzIG59ZnJvbVwicHJlYWN0XCI7dmFyIHQscix1LGksbz0wLGY9W10sYz1bXSxlPW4uX19iLGE9bi5fX3Isdj1uLmRpZmZlZCxsPW4uX19jLG09bi51bm1vdW50O2Z1bmN0aW9uIGQodCx1KXtuLl9faCYmbi5fX2gocix0LG98fHUpLG89MDt2YXIgaT1yLl9fSHx8KHIuX19IPXtfXzpbXSxfX2g6W119KTtyZXR1cm4gdD49aS5fXy5sZW5ndGgmJmkuX18ucHVzaCh7X19WOmN9KSxpLl9fW3RdfWZ1bmN0aW9uIGgobil7cmV0dXJuIG89MSxzKEIsbil9ZnVuY3Rpb24gcyhuLHUsaSl7dmFyIG89ZCh0KyssMik7aWYoby50PW4sIW8uX19jJiYoby5fXz1baT9pKHUpOkIodm9pZCAwLHUpLGZ1bmN0aW9uKG4pe3ZhciB0PW8uX19OP28uX19OWzBdOm8uX19bMF0scj1vLnQodCxuKTt0IT09ciYmKG8uX19OPVtyLG8uX19bMV1dLG8uX19jLnNldFN0YXRlKHt9KSl9XSxvLl9fYz1yLCFyLnUpKXt2YXIgZj1mdW5jdGlvbihuLHQscil7aWYoIW8uX19jLl9fSClyZXR1cm4hMDt2YXIgdT1vLl9fYy5fX0guX18uZmlsdGVyKGZ1bmN0aW9uKG4pe3JldHVybiBuLl9fY30pO2lmKHUuZXZlcnkoZnVuY3Rpb24obil7cmV0dXJuIW4uX19OfSkpcmV0dXJuIWN8fGMuY2FsbCh0aGlzLG4sdCxyKTt2YXIgaT0hMTtyZXR1cm4gdS5mb3JFYWNoKGZ1bmN0aW9uKG4pe2lmKG4uX19OKXt2YXIgdD1uLl9fWzBdO24uX189bi5fX04sbi5fX049dm9pZCAwLHQhPT1uLl9fWzBdJiYoaT0hMCl9fSksISghaSYmby5fX2MucHJvcHM9PT1uKSYmKCFjfHxjLmNhbGwodGhpcyxuLHQscikpfTtyLnU9ITA7dmFyIGM9ci5zaG91bGRDb21wb25lbnRVcGRhdGUsZT1yLmNvbXBvbmVudFdpbGxVcGRhdGU7ci5jb21wb25lbnRXaWxsVXBkYXRlPWZ1bmN0aW9uKG4sdCxyKXtpZih0aGlzLl9fZSl7dmFyIHU9YztjPXZvaWQgMCxmKG4sdCxyKSxjPXV9ZSYmZS5jYWxsKHRoaXMsbix0LHIpfSxyLnNob3VsZENvbXBvbmVudFVwZGF0ZT1mfXJldHVybiBvLl9fTnx8by5fX31mdW5jdGlvbiBwKHUsaSl7dmFyIG89ZCh0KyssMyk7IW4uX19zJiZ6KG8uX19ILGkpJiYoby5fXz11LG8uaT1pLHIuX19ILl9faC5wdXNoKG8pKX1mdW5jdGlvbiB5KHUsaSl7dmFyIG89ZCh0KyssNCk7IW4uX19zJiZ6KG8uX19ILGkpJiYoby5fXz11LG8uaT1pLHIuX19oLnB1c2gobykpfWZ1bmN0aW9uIF8obil7cmV0dXJuIG89NSxGKGZ1bmN0aW9uKCl7cmV0dXJue2N1cnJlbnQ6bn19LFtdKX1mdW5jdGlvbiBBKG4sdCxyKXtvPTYseShmdW5jdGlvbigpe3JldHVyblwiZnVuY3Rpb25cIj09dHlwZW9mIG4/KG4odCgpKSxmdW5jdGlvbigpe3JldHVybiBuKG51bGwpfSk6bj8obi5jdXJyZW50PXQoKSxmdW5jdGlvbigpe3JldHVybiBuLmN1cnJlbnQ9bnVsbH0pOnZvaWQgMH0sbnVsbD09cj9yOnIuY29uY2F0KG4pKX1mdW5jdGlvbiBGKG4scil7dmFyIHU9ZCh0KyssNyk7cmV0dXJuIHoodS5fX0gscik/KHUuX19WPW4oKSx1Lmk9cix1Ll9faD1uLHUuX19WKTp1Ll9ffWZ1bmN0aW9uIFQobix0KXtyZXR1cm4gbz04LEYoZnVuY3Rpb24oKXtyZXR1cm4gbn0sdCl9ZnVuY3Rpb24gcShuKXt2YXIgdT1yLmNvbnRleHRbbi5fX2NdLGk9ZCh0KyssOSk7cmV0dXJuIGkuYz1uLHU/KG51bGw9PWkuX18mJihpLl9fPSEwLHUuc3ViKHIpKSx1LnByb3BzLnZhbHVlKTpuLl9ffWZ1bmN0aW9uIHgodCxyKXtuLnVzZURlYnVnVmFsdWUmJm4udXNlRGVidWdWYWx1ZShyP3IodCk6dCl9ZnVuY3Rpb24gUChuKXt2YXIgdT1kKHQrKywxMCksaT1oKCk7cmV0dXJuIHUuX189bixyLmNvbXBvbmVudERpZENhdGNofHwoci5jb21wb25lbnREaWRDYXRjaD1mdW5jdGlvbihuLHQpe3UuX18mJnUuX18obix0KSxpWzFdKG4pfSksW2lbMF0sZnVuY3Rpb24oKXtpWzFdKHZvaWQgMCl9XX1mdW5jdGlvbiBWKCl7dmFyIG49ZCh0KyssMTEpO2lmKCFuLl9fKXtmb3IodmFyIHU9ci5fX3Y7bnVsbCE9PXUmJiF1Ll9fbSYmbnVsbCE9PXUuX187KXU9dS5fXzt2YXIgaT11Ll9fbXx8KHUuX19tPVswLDBdKTtuLl9fPVwiUFwiK2lbMF0rXCItXCIraVsxXSsrfXJldHVybiBuLl9ffWZ1bmN0aW9uIGIoKXtmb3IodmFyIHQ7dD1mLnNoaWZ0KCk7KWlmKHQuX19QJiZ0Ll9fSCl0cnl7dC5fX0guX19oLmZvckVhY2goayksdC5fX0guX19oLmZvckVhY2godyksdC5fX0guX19oPVtdfWNhdGNoKHIpe3QuX19ILl9faD1bXSxuLl9fZShyLHQuX192KX19bi5fX2I9ZnVuY3Rpb24obil7cj1udWxsLGUmJmUobil9LG4uX19yPWZ1bmN0aW9uKG4pe2EmJmEobiksdD0wO3ZhciBpPShyPW4uX19jKS5fX0g7aSYmKHU9PT1yPyhpLl9faD1bXSxyLl9faD1bXSxpLl9fLmZvckVhY2goZnVuY3Rpb24obil7bi5fX04mJihuLl9fPW4uX19OKSxuLl9fVj1jLG4uX19OPW4uaT12b2lkIDB9KSk6KGkuX19oLmZvckVhY2goayksaS5fX2guZm9yRWFjaCh3KSxpLl9faD1bXSx0PTApKSx1PXJ9LG4uZGlmZmVkPWZ1bmN0aW9uKHQpe3YmJnYodCk7dmFyIG89dC5fX2M7byYmby5fX0gmJihvLl9fSC5fX2gubGVuZ3RoJiYoMSE9PWYucHVzaChvKSYmaT09PW4ucmVxdWVzdEFuaW1hdGlvbkZyYW1lfHwoKGk9bi5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUpfHxqKShiKSksby5fX0guX18uZm9yRWFjaChmdW5jdGlvbihuKXtuLmkmJihuLl9fSD1uLmkpLG4uX19WIT09YyYmKG4uX189bi5fX1YpLG4uaT12b2lkIDAsbi5fX1Y9Y30pKSx1PXI9bnVsbH0sbi5fX2M9ZnVuY3Rpb24odCxyKXtyLnNvbWUoZnVuY3Rpb24odCl7dHJ5e3QuX19oLmZvckVhY2goayksdC5fX2g9dC5fX2guZmlsdGVyKGZ1bmN0aW9uKG4pe3JldHVybiFuLl9ffHx3KG4pfSl9Y2F0Y2godSl7ci5zb21lKGZ1bmN0aW9uKG4pe24uX19oJiYobi5fX2g9W10pfSkscj1bXSxuLl9fZSh1LHQuX192KX19KSxsJiZsKHQscil9LG4udW5tb3VudD1mdW5jdGlvbih0KXttJiZtKHQpO3ZhciByLHU9dC5fX2M7dSYmdS5fX0gmJih1Ll9fSC5fXy5mb3JFYWNoKGZ1bmN0aW9uKG4pe3RyeXtrKG4pfWNhdGNoKG4pe3I9bn19KSx1Ll9fSD12b2lkIDAsciYmbi5fX2Uocix1Ll9fdikpfTt2YXIgZz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1ZXN0QW5pbWF0aW9uRnJhbWU7ZnVuY3Rpb24gaihuKXt2YXIgdCxyPWZ1bmN0aW9uKCl7Y2xlYXJUaW1lb3V0KHUpLGcmJmNhbmNlbEFuaW1hdGlvbkZyYW1lKHQpLHNldFRpbWVvdXQobil9LHU9c2V0VGltZW91dChyLDEwMCk7ZyYmKHQ9cmVxdWVzdEFuaW1hdGlvbkZyYW1lKHIpKX1mdW5jdGlvbiBrKG4pe3ZhciB0PXIsdT1uLl9fYztcImZ1bmN0aW9uXCI9PXR5cGVvZiB1JiYobi5fX2M9dm9pZCAwLHUoKSkscj10fWZ1bmN0aW9uIHcobil7dmFyIHQ9cjtuLl9fYz1uLl9fKCkscj10fWZ1bmN0aW9uIHoobix0KXtyZXR1cm4hbnx8bi5sZW5ndGghPT10Lmxlbmd0aHx8dC5zb21lKGZ1bmN0aW9uKHQscil7cmV0dXJuIHQhPT1uW3JdfSl9ZnVuY3Rpb24gQihuLHQpe3JldHVyblwiZnVuY3Rpb25cIj09dHlwZW9mIHQ/dChuKTp0fWV4cG9ydHtUIGFzIHVzZUNhbGxiYWNrLHEgYXMgdXNlQ29udGV4dCx4IGFzIHVzZURlYnVnVmFsdWUscCBhcyB1c2VFZmZlY3QsUCBhcyB1c2VFcnJvckJvdW5kYXJ5LFYgYXMgdXNlSWQsQSBhcyB1c2VJbXBlcmF0aXZlSGFuZGxlLHkgYXMgdXNlTGF5b3V0RWZmZWN0LEYgYXMgdXNlTWVtbyxzIGFzIHVzZVJlZHVjZXIsXyBhcyB1c2VSZWYsaCBhcyB1c2VTdGF0ZX07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1ob29rcy5tb2R1bGUuanMubWFwXG4iLCIndXNlIGNsaWVudCc7XG5pbXBvcnQgdCx7aXNWYWxpZEVsZW1lbnQgYXMgZSx1c2VSZWYgYXMgbix1c2VMYXlvdXRFZmZlY3QgYXMgbyx1c2VFZmZlY3QgYXMgcyxjbG9uZUVsZW1lbnQgYXMgYSx1c2VSZWR1Y2VyIGFzIHIsdXNlU3RhdGUgYXMgaSxmb3J3YXJkUmVmIGFzIGx9ZnJvbVwicmVhY3RcIjtpbXBvcnQgYyBmcm9tXCJjbHN4XCI7Y29uc3QgdT10PT5cIm51bWJlclwiPT10eXBlb2YgdCYmIWlzTmFOKHQpLGQ9dD0+XCJzdHJpbmdcIj09dHlwZW9mIHQscD10PT5cImZ1bmN0aW9uXCI9PXR5cGVvZiB0LG09dD0+ZCh0KXx8cCh0KT90Om51bGwsZj10PT5lKHQpfHxkKHQpfHxwKHQpfHx1KHQpO2Z1bmN0aW9uIGcodCxlLG4pe3ZvaWQgMD09PW4mJihuPTMwMCk7Y29uc3R7c2Nyb2xsSGVpZ2h0Om8sc3R5bGU6c309dDtyZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCk9PntzLm1pbkhlaWdodD1cImluaXRpYWxcIixzLmhlaWdodD1vK1wicHhcIixzLnRyYW5zaXRpb249YGFsbCAke259bXNgLHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKT0+e3MuaGVpZ2h0PVwiMFwiLHMucGFkZGluZz1cIjBcIixzLm1hcmdpbj1cIjBcIixzZXRUaW1lb3V0KGUsbil9KX0pfWZ1bmN0aW9uIGgoZSl7bGV0e2VudGVyOmEsZXhpdDpyLGFwcGVuZFBvc2l0aW9uOmk9ITEsY29sbGFwc2U6bD0hMCxjb2xsYXBzZUR1cmF0aW9uOmM9MzAwfT1lO3JldHVybiBmdW5jdGlvbihlKXtsZXR7Y2hpbGRyZW46dSxwb3NpdGlvbjpkLHByZXZlbnRFeGl0VHJhbnNpdGlvbjpwLGRvbmU6bSxub2RlUmVmOmYsaXNJbjpofT1lO2NvbnN0IHk9aT9gJHthfS0tJHtkfWA6YSx2PWk/YCR7cn0tLSR7ZH1gOnIsVD1uKDApO3JldHVybiBvKCgpPT57Y29uc3QgdD1mLmN1cnJlbnQsZT15LnNwbGl0KFwiIFwiKSxuPW89PntvLnRhcmdldD09PWYuY3VycmVudCYmKHQuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoXCJkXCIpKSx0LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJhbmltYXRpb25lbmRcIixuKSx0LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJhbmltYXRpb25jYW5jZWxcIixuKSwwPT09VC5jdXJyZW50JiZcImFuaW1hdGlvbmNhbmNlbFwiIT09by50eXBlJiZ0LmNsYXNzTGlzdC5yZW1vdmUoLi4uZSkpfTt0LmNsYXNzTGlzdC5hZGQoLi4uZSksdC5hZGRFdmVudExpc3RlbmVyKFwiYW5pbWF0aW9uZW5kXCIsbiksdC5hZGRFdmVudExpc3RlbmVyKFwiYW5pbWF0aW9uY2FuY2VsXCIsbil9LFtdKSxzKCgpPT57Y29uc3QgdD1mLmN1cnJlbnQsZT0oKT0+e3QucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImFuaW1hdGlvbmVuZFwiLGUpLGw/Zyh0LG0sYyk6bSgpfTtofHwocD9lKCk6KFQuY3VycmVudD0xLHQuY2xhc3NOYW1lKz1gICR7dn1gLHQuYWRkRXZlbnRMaXN0ZW5lcihcImFuaW1hdGlvbmVuZFwiLGUpKSl9LFtoXSksdC5jcmVhdGVFbGVtZW50KHQuRnJhZ21lbnQsbnVsbCx1KX19ZnVuY3Rpb24geSh0LGUpe3JldHVybiBudWxsIT10P3tjb250ZW50OnQuY29udGVudCxjb250YWluZXJJZDp0LnByb3BzLmNvbnRhaW5lcklkLGlkOnQucHJvcHMudG9hc3RJZCx0aGVtZTp0LnByb3BzLnRoZW1lLHR5cGU6dC5wcm9wcy50eXBlLGRhdGE6dC5wcm9wcy5kYXRhfHx7fSxpc0xvYWRpbmc6dC5wcm9wcy5pc0xvYWRpbmcsaWNvbjp0LnByb3BzLmljb24sc3RhdHVzOmV9Ont9fWNvbnN0IHY9e2xpc3Q6bmV3IE1hcCxlbWl0UXVldWU6bmV3IE1hcCxvbih0LGUpe3JldHVybiB0aGlzLmxpc3QuaGFzKHQpfHx0aGlzLmxpc3Quc2V0KHQsW10pLHRoaXMubGlzdC5nZXQodCkucHVzaChlKSx0aGlzfSxvZmYodCxlKXtpZihlKXtjb25zdCBuPXRoaXMubGlzdC5nZXQodCkuZmlsdGVyKHQ9PnQhPT1lKTtyZXR1cm4gdGhpcy5saXN0LnNldCh0LG4pLHRoaXN9cmV0dXJuIHRoaXMubGlzdC5kZWxldGUodCksdGhpc30sY2FuY2VsRW1pdCh0KXtjb25zdCBlPXRoaXMuZW1pdFF1ZXVlLmdldCh0KTtyZXR1cm4gZSYmKGUuZm9yRWFjaChjbGVhclRpbWVvdXQpLHRoaXMuZW1pdFF1ZXVlLmRlbGV0ZSh0KSksdGhpc30sZW1pdCh0KXt0aGlzLmxpc3QuaGFzKHQpJiZ0aGlzLmxpc3QuZ2V0KHQpLmZvckVhY2goZT0+e2NvbnN0IG49c2V0VGltZW91dCgoKT0+e2UoLi4uW10uc2xpY2UuY2FsbChhcmd1bWVudHMsMSkpfSwwKTt0aGlzLmVtaXRRdWV1ZS5oYXModCl8fHRoaXMuZW1pdFF1ZXVlLnNldCh0LFtdKSx0aGlzLmVtaXRRdWV1ZS5nZXQodCkucHVzaChuKX0pfX0sVD1lPT57bGV0e3RoZW1lOm4sdHlwZTpvLC4uLnN9PWU7cmV0dXJuIHQuY3JlYXRlRWxlbWVudChcInN2Z1wiLHt2aWV3Qm94OlwiMCAwIDI0IDI0XCIsd2lkdGg6XCIxMDAlXCIsaGVpZ2h0OlwiMTAwJVwiLGZpbGw6XCJjb2xvcmVkXCI9PT1uP1wiY3VycmVudENvbG9yXCI6YHZhcigtLXRvYXN0aWZ5LWljb24tY29sb3ItJHtvfSlgLC4uLnN9KX0sRT17aW5mbzpmdW5jdGlvbihlKXtyZXR1cm4gdC5jcmVhdGVFbGVtZW50KFQsey4uLmV9LHQuY3JlYXRlRWxlbWVudChcInBhdGhcIix7ZDpcIk0xMiAwYTEyIDEyIDAgMTAxMiAxMkExMi4wMTMgMTIuMDEzIDAgMDAxMiAwem0uMjUgNWExLjUgMS41IDAgMTEtMS41IDEuNSAxLjUgMS41IDAgMDExLjUtMS41em0yLjI1IDEzLjVoLTRhMSAxIDAgMDEwLTJoLjc1YS4yNS4yNSAwIDAwLjI1LS4yNXYtNC41YS4yNS4yNSAwIDAwLS4yNS0uMjVoLS43NWExIDEgMCAwMTAtMmgxYTIgMiAwIDAxMiAydjQuNzVhLjI1LjI1IDAgMDAuMjUuMjVoLjc1YTEgMSAwIDExMCAyelwifSkpfSx3YXJuaW5nOmZ1bmN0aW9uKGUpe3JldHVybiB0LmNyZWF0ZUVsZW1lbnQoVCx7Li4uZX0sdC5jcmVhdGVFbGVtZW50KFwicGF0aFwiLHtkOlwiTTIzLjMyIDE3LjE5MUwxNS40MzggMi4xODRDMTQuNzI4LjgzMyAxMy40MTYgMCAxMS45OTYgMGMtMS40MiAwLTIuNzMzLjgzMy0zLjQ0MyAyLjE4NEwuNTMzIDE3LjQ0OGE0Ljc0NCA0Ljc0NCAwIDAwMCA0LjM2OEMxLjI0MyAyMy4xNjcgMi41NTUgMjQgMy45NzUgMjRoMTYuMDVDMjIuMjIgMjQgMjQgMjIuMDQ0IDI0IDE5LjYzMmMwLS45MDQtLjI1MS0xLjc0Ni0uNjgtMi40NHptLTkuNjIyIDEuNDZjMCAxLjAzMy0uNzI0IDEuODIzLTEuNjk4IDEuODIzcy0xLjY5OC0uNzktMS42OTgtMS44MjJ2LS4wNDNjMC0xLjAyOC43MjQtMS44MjIgMS42OTgtMS44MjJzMS42OTguNzkgMS42OTggMS44MjJ2LjA0M3ptLjAzOS0xMi4yODVsLS44NCA4LjA2Yy0uMDU3LjU4MS0uNDA4Ljk0My0uODk3Ljk0My0uNDkgMC0uODQtLjM2Ny0uODk2LS45NDJsLS44NC04LjA2NWMtLjA1Ny0uNjI0LjI1LTEuMDk1Ljc3OS0xLjA5NWgxLjkxYy41MjguMDA1Ljg0LjQ3Ni43ODQgMS4xelwifSkpfSxzdWNjZXNzOmZ1bmN0aW9uKGUpe3JldHVybiB0LmNyZWF0ZUVsZW1lbnQoVCx7Li4uZX0sdC5jcmVhdGVFbGVtZW50KFwicGF0aFwiLHtkOlwiTTEyIDBhMTIgMTIgMCAxMDEyIDEyQTEyLjAxNCAxMi4wMTQgMCAwMDEyIDB6bTYuOTI3IDguMmwtNi44NDUgOS4yODlhMS4wMTEgMS4wMTEgMCAwMS0xLjQzLjE4OGwtNC44ODgtMy45MDhhMSAxIDAgMTExLjI1LTEuNTYybDQuMDc2IDMuMjYxIDYuMjI3LTguNDUxYTEgMSAwIDExMS42MSAxLjE4M3pcIn0pKX0sZXJyb3I6ZnVuY3Rpb24oZSl7cmV0dXJuIHQuY3JlYXRlRWxlbWVudChULHsuLi5lfSx0LmNyZWF0ZUVsZW1lbnQoXCJwYXRoXCIse2Q6XCJNMTEuOTgzIDBhMTIuMjA2IDEyLjIwNiAwIDAwLTguNTEgMy42NTNBMTEuOCAxMS44IDAgMDAwIDEyLjIwNyAxMS43NzkgMTEuNzc5IDAgMDAxMS44IDI0aC4yMTRBMTIuMTExIDEyLjExMSAwIDAwMjQgMTEuNzkxIDExLjc2NiAxMS43NjYgMCAwMDExLjk4MyAwek0xMC41IDE2LjU0MmExLjQ3NiAxLjQ3NiAwIDAxMS40NDktMS41M2guMDI3YTEuNTI3IDEuNTI3IDAgMDExLjUyMyAxLjQ3IDEuNDc1IDEuNDc1IDAgMDEtMS40NDkgMS41M2gtLjAyN2ExLjUyOSAxLjUyOSAwIDAxLTEuNTIzLTEuNDd6TTExIDEyLjV2LTZhMSAxIDAgMDEyIDB2NmExIDEgMCAxMS0yIDB6XCJ9KSl9LHNwaW5uZXI6ZnVuY3Rpb24oKXtyZXR1cm4gdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIse2NsYXNzTmFtZTpcIlRvYXN0aWZ5X19zcGlubmVyXCJ9KX19O2Z1bmN0aW9uIEModCl7Y29uc3RbLG9dPXIodD0+dCsxLDApLFtsLGNdPWkoW10pLGc9bihudWxsKSxoPW4obmV3IE1hcCkuY3VycmVudCxUPXQ9Pi0xIT09bC5pbmRleE9mKHQpLEM9bih7dG9hc3RLZXk6MSxkaXNwbGF5ZWRUb2FzdDowLGNvdW50OjAscXVldWU6W10scHJvcHM6dCxjb250YWluZXJJZDpudWxsLGlzVG9hc3RBY3RpdmU6VCxnZXRUb2FzdDp0PT5oLmdldCh0KX0pLmN1cnJlbnQ7ZnVuY3Rpb24gYih0KXtsZXR7Y29udGFpbmVySWQ6ZX09dDtjb25zdHtsaW1pdDpufT1DLnByb3BzOyFufHxlJiZDLmNvbnRhaW5lcklkIT09ZXx8KEMuY291bnQtPUMucXVldWUubGVuZ3RoLEMucXVldWU9W10pfWZ1bmN0aW9uIEkodCl7YyhlPT5udWxsPT10P1tdOmUuZmlsdGVyKGU9PmUhPT10KSl9ZnVuY3Rpb24gXygpe2NvbnN0e3RvYXN0Q29udGVudDp0LHRvYXN0UHJvcHM6ZSxzdGFsZUlkOm59PUMucXVldWUuc2hpZnQoKTtPKHQsZSxuKX1mdW5jdGlvbiBMKHQsbil7bGV0e2RlbGF5OnMsc3RhbGVJZDpyLC4uLml9PW47aWYoIWYodCl8fGZ1bmN0aW9uKHQpe3JldHVybiFnLmN1cnJlbnR8fEMucHJvcHMuZW5hYmxlTXVsdGlDb250YWluZXImJnQuY29udGFpbmVySWQhPT1DLnByb3BzLmNvbnRhaW5lcklkfHxoLmhhcyh0LnRvYXN0SWQpJiZudWxsPT10LnVwZGF0ZUlkfShpKSlyZXR1cm47Y29uc3R7dG9hc3RJZDpsLHVwZGF0ZUlkOmMsZGF0YTpUfT1pLHtwcm9wczpifT1DLEw9KCk9PkkobCksTj1udWxsPT1jO04mJkMuY291bnQrKztjb25zdCBNPXsuLi5iLHN0eWxlOmIudG9hc3RTdHlsZSxrZXk6Qy50b2FzdEtleSsrLC4uLk9iamVjdC5mcm9tRW50cmllcyhPYmplY3QuZW50cmllcyhpKS5maWx0ZXIodD0+e2xldFtlLG5dPXQ7cmV0dXJuIG51bGwhPW59KSksdG9hc3RJZDpsLHVwZGF0ZUlkOmMsZGF0YTpULGNsb3NlVG9hc3Q6TCxpc0luOiExLGNsYXNzTmFtZTptKGkuY2xhc3NOYW1lfHxiLnRvYXN0Q2xhc3NOYW1lKSxib2R5Q2xhc3NOYW1lOm0oaS5ib2R5Q2xhc3NOYW1lfHxiLmJvZHlDbGFzc05hbWUpLHByb2dyZXNzQ2xhc3NOYW1lOm0oaS5wcm9ncmVzc0NsYXNzTmFtZXx8Yi5wcm9ncmVzc0NsYXNzTmFtZSksYXV0b0Nsb3NlOiFpLmlzTG9hZGluZyYmKFI9aS5hdXRvQ2xvc2Usdz1iLmF1dG9DbG9zZSwhMT09PVJ8fHUoUikmJlI+MD9SOncpLGRlbGV0ZVRvYXN0KCl7Y29uc3QgdD15KGguZ2V0KGwpLFwicmVtb3ZlZFwiKTtoLmRlbGV0ZShsKSx2LmVtaXQoNCx0KTtjb25zdCBlPUMucXVldWUubGVuZ3RoO2lmKEMuY291bnQ9bnVsbD09bD9DLmNvdW50LUMuZGlzcGxheWVkVG9hc3Q6Qy5jb3VudC0xLEMuY291bnQ8MCYmKEMuY291bnQ9MCksZT4wKXtjb25zdCB0PW51bGw9PWw/Qy5wcm9wcy5saW1pdDoxO2lmKDE9PT1lfHwxPT09dClDLmRpc3BsYXllZFRvYXN0KyssXygpO2Vsc2V7Y29uc3Qgbj10PmU/ZTp0O0MuZGlzcGxheWVkVG9hc3Q9bjtmb3IobGV0IHQ9MDt0PG47dCsrKV8oKX19ZWxzZSBvKCl9fTt2YXIgUix3O00uaWNvbk91dD1mdW5jdGlvbih0KXtsZXR7dGhlbWU6bix0eXBlOm8saXNMb2FkaW5nOnMsaWNvbjpyfT10LGk9bnVsbDtjb25zdCBsPXt0aGVtZTpuLHR5cGU6b307cmV0dXJuITE9PT1yfHwocChyKT9pPXIobCk6ZShyKT9pPWEocixsKTpkKHIpfHx1KHIpP2k9cjpzP2k9RS5zcGlubmVyKCk6KHQ9PnQgaW4gRSkobykmJihpPUVbb10obCkpKSxpfShNKSxwKGkub25PcGVuKSYmKE0ub25PcGVuPWkub25PcGVuKSxwKGkub25DbG9zZSkmJihNLm9uQ2xvc2U9aS5vbkNsb3NlKSxNLmNsb3NlQnV0dG9uPWIuY2xvc2VCdXR0b24sITE9PT1pLmNsb3NlQnV0dG9ufHxmKGkuY2xvc2VCdXR0b24pP00uY2xvc2VCdXR0b249aS5jbG9zZUJ1dHRvbjohMD09PWkuY2xvc2VCdXR0b24mJihNLmNsb3NlQnV0dG9uPSFmKGIuY2xvc2VCdXR0b24pfHxiLmNsb3NlQnV0dG9uKTtsZXQgeD10O2UodCkmJiFkKHQudHlwZSk/eD1hKHQse2Nsb3NlVG9hc3Q6TCx0b2FzdFByb3BzOk0sZGF0YTpUfSk6cCh0KSYmKHg9dCh7Y2xvc2VUb2FzdDpMLHRvYXN0UHJvcHM6TSxkYXRhOlR9KSksYi5saW1pdCYmYi5saW1pdD4wJiZDLmNvdW50PmIubGltaXQmJk4/Qy5xdWV1ZS5wdXNoKHt0b2FzdENvbnRlbnQ6eCx0b2FzdFByb3BzOk0sc3RhbGVJZDpyfSk6dShzKT9zZXRUaW1lb3V0KCgpPT57Tyh4LE0scil9LHMpOk8oeCxNLHIpfWZ1bmN0aW9uIE8odCxlLG4pe2NvbnN0e3RvYXN0SWQ6b309ZTtuJiZoLmRlbGV0ZShuKTtjb25zdCBzPXtjb250ZW50OnQscHJvcHM6ZX07aC5zZXQobyxzKSxjKHQ9PlsuLi50LG9dLmZpbHRlcih0PT50IT09bikpLHYuZW1pdCg0LHkocyxudWxsPT1zLnByb3BzLnVwZGF0ZUlkP1wiYWRkZWRcIjpcInVwZGF0ZWRcIikpfXJldHVybiBzKCgpPT4oQy5jb250YWluZXJJZD10LmNvbnRhaW5lcklkLHYuY2FuY2VsRW1pdCgzKS5vbigwLEwpLm9uKDEsdD0+Zy5jdXJyZW50JiZJKHQpKS5vbig1LGIpLmVtaXQoMixDKSwoKT0+e2guY2xlYXIoKSx2LmVtaXQoMyxDKX0pLFtdKSxzKCgpPT57Qy5wcm9wcz10LEMuaXNUb2FzdEFjdGl2ZT1ULEMuZGlzcGxheWVkVG9hc3Q9bC5sZW5ndGh9KSx7Z2V0VG9hc3RUb1JlbmRlcjpmdW5jdGlvbihlKXtjb25zdCBuPW5ldyBNYXAsbz1BcnJheS5mcm9tKGgudmFsdWVzKCkpO3JldHVybiB0Lm5ld2VzdE9uVG9wJiZvLnJldmVyc2UoKSxvLmZvckVhY2godD0+e2NvbnN0e3Bvc2l0aW9uOmV9PXQucHJvcHM7bi5oYXMoZSl8fG4uc2V0KGUsW10pLG4uZ2V0KGUpLnB1c2godCl9KSxBcnJheS5mcm9tKG4sdD0+ZSh0WzBdLHRbMV0pKX0sY29udGFpbmVyUmVmOmcsaXNUb2FzdEFjdGl2ZTpUfX1mdW5jdGlvbiBiKHQpe3JldHVybiB0LnRhcmdldFRvdWNoZXMmJnQudGFyZ2V0VG91Y2hlcy5sZW5ndGg+PTE/dC50YXJnZXRUb3VjaGVzWzBdLmNsaWVudFg6dC5jbGllbnRYfWZ1bmN0aW9uIEkodCl7cmV0dXJuIHQudGFyZ2V0VG91Y2hlcyYmdC50YXJnZXRUb3VjaGVzLmxlbmd0aD49MT90LnRhcmdldFRvdWNoZXNbMF0uY2xpZW50WTp0LmNsaWVudFl9ZnVuY3Rpb24gXyh0KXtjb25zdFtvLGFdPWkoITEpLFtyLGxdPWkoITEpLGM9bihudWxsKSx1PW4oe3N0YXJ0OjAseDowLHk6MCxkZWx0YTowLHJlbW92YWxEaXN0YW5jZTowLGNhbkNsb3NlT25DbGljazohMCxjYW5EcmFnOiExLGJvdW5kaW5nUmVjdDpudWxsLGRpZE1vdmU6ITF9KS5jdXJyZW50LGQ9bih0KSx7YXV0b0Nsb3NlOm0scGF1c2VPbkhvdmVyOmYsY2xvc2VUb2FzdDpnLG9uQ2xpY2s6aCxjbG9zZU9uQ2xpY2s6eX09dDtmdW5jdGlvbiB2KGUpe2lmKHQuZHJhZ2dhYmxlKXtcInRvdWNoc3RhcnRcIj09PWUubmF0aXZlRXZlbnQudHlwZSYmZS5uYXRpdmVFdmVudC5wcmV2ZW50RGVmYXVsdCgpLHUuZGlkTW92ZT0hMSxkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsXyksZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIixMKSxkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwidG91Y2htb3ZlXCIsXyksZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsTCk7Y29uc3Qgbj1jLmN1cnJlbnQ7dS5jYW5DbG9zZU9uQ2xpY2s9ITAsdS5jYW5EcmFnPSEwLHUuYm91bmRpbmdSZWN0PW4uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksbi5zdHlsZS50cmFuc2l0aW9uPVwiXCIsdS54PWIoZS5uYXRpdmVFdmVudCksdS55PUkoZS5uYXRpdmVFdmVudCksXCJ4XCI9PT10LmRyYWdnYWJsZURpcmVjdGlvbj8odS5zdGFydD11LngsdS5yZW1vdmFsRGlzdGFuY2U9bi5vZmZzZXRXaWR0aCoodC5kcmFnZ2FibGVQZXJjZW50LzEwMCkpOih1LnN0YXJ0PXUueSx1LnJlbW92YWxEaXN0YW5jZT1uLm9mZnNldEhlaWdodCooODA9PT10LmRyYWdnYWJsZVBlcmNlbnQ/MS41KnQuZHJhZ2dhYmxlUGVyY2VudDp0LmRyYWdnYWJsZVBlcmNlbnQvMTAwKSl9fWZ1bmN0aW9uIFQoZSl7aWYodS5ib3VuZGluZ1JlY3Qpe2NvbnN0e3RvcDpuLGJvdHRvbTpvLGxlZnQ6cyxyaWdodDphfT11LmJvdW5kaW5nUmVjdDtcInRvdWNoZW5kXCIhPT1lLm5hdGl2ZUV2ZW50LnR5cGUmJnQucGF1c2VPbkhvdmVyJiZ1Lng+PXMmJnUueDw9YSYmdS55Pj1uJiZ1Lnk8PW8/QygpOkUoKX19ZnVuY3Rpb24gRSgpe2EoITApfWZ1bmN0aW9uIEMoKXthKCExKX1mdW5jdGlvbiBfKGUpe2NvbnN0IG49Yy5jdXJyZW50O3UuY2FuRHJhZyYmbiYmKHUuZGlkTW92ZT0hMCxvJiZDKCksdS54PWIoZSksdS55PUkoZSksdS5kZWx0YT1cInhcIj09PXQuZHJhZ2dhYmxlRGlyZWN0aW9uP3UueC11LnN0YXJ0OnUueS11LnN0YXJ0LHUuc3RhcnQhPT11LngmJih1LmNhbkNsb3NlT25DbGljaz0hMSksbi5zdHlsZS50cmFuc2Zvcm09YHRyYW5zbGF0ZSR7dC5kcmFnZ2FibGVEaXJlY3Rpb259KCR7dS5kZWx0YX1weClgLG4uc3R5bGUub3BhY2l0eT1cIlwiKygxLU1hdGguYWJzKHUuZGVsdGEvdS5yZW1vdmFsRGlzdGFuY2UpKSl9ZnVuY3Rpb24gTCgpe2RvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIixfKSxkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLEwpLGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaG1vdmVcIixfKSxkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIixMKTtjb25zdCBlPWMuY3VycmVudDtpZih1LmNhbkRyYWcmJnUuZGlkTW92ZSYmZSl7aWYodS5jYW5EcmFnPSExLE1hdGguYWJzKHUuZGVsdGEpPnUucmVtb3ZhbERpc3RhbmNlKXJldHVybiBsKCEwKSx2b2lkIHQuY2xvc2VUb2FzdCgpO2Uuc3R5bGUudHJhbnNpdGlvbj1cInRyYW5zZm9ybSAwLjJzLCBvcGFjaXR5IDAuMnNcIixlLnN0eWxlLnRyYW5zZm9ybT1gdHJhbnNsYXRlJHt0LmRyYWdnYWJsZURpcmVjdGlvbn0oMClgLGUuc3R5bGUub3BhY2l0eT1cIjFcIn19cygoKT0+e2QuY3VycmVudD10fSkscygoKT0+KGMuY3VycmVudCYmYy5jdXJyZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJkXCIsRSx7b25jZTohMH0pLHAodC5vbk9wZW4pJiZ0Lm9uT3BlbihlKHQuY2hpbGRyZW4pJiZ0LmNoaWxkcmVuLnByb3BzKSwoKT0+e2NvbnN0IHQ9ZC5jdXJyZW50O3AodC5vbkNsb3NlKSYmdC5vbkNsb3NlKGUodC5jaGlsZHJlbikmJnQuY2hpbGRyZW4ucHJvcHMpfSksW10pLHMoKCk9Pih0LnBhdXNlT25Gb2N1c0xvc3MmJihkb2N1bWVudC5oYXNGb2N1cygpfHxDKCksd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJmb2N1c1wiLEUpLHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiYmx1clwiLEMpKSwoKT0+e3QucGF1c2VPbkZvY3VzTG9zcyYmKHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwiZm9jdXNcIixFKSx3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImJsdXJcIixDKSl9KSxbdC5wYXVzZU9uRm9jdXNMb3NzXSk7Y29uc3QgTz17b25Nb3VzZURvd246dixvblRvdWNoU3RhcnQ6dixvbk1vdXNlVXA6VCxvblRvdWNoRW5kOlR9O3JldHVybiBtJiZmJiYoTy5vbk1vdXNlRW50ZXI9QyxPLm9uTW91c2VMZWF2ZT1FKSx5JiYoTy5vbkNsaWNrPXQ9PntoJiZoKHQpLHUuY2FuQ2xvc2VPbkNsaWNrJiZnKCl9KSx7cGxheVRvYXN0OkUscGF1c2VUb2FzdDpDLGlzUnVubmluZzpvLHByZXZlbnRFeGl0VHJhbnNpdGlvbjpyLHRvYXN0UmVmOmMsZXZlbnRIYW5kbGVyczpPfX1mdW5jdGlvbiBMKGUpe2xldHtjbG9zZVRvYXN0Om4sdGhlbWU6byxhcmlhTGFiZWw6cz1cImNsb3NlXCJ9PWU7cmV0dXJuIHQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLHtjbGFzc05hbWU6YFRvYXN0aWZ5X19jbG9zZS1idXR0b24gVG9hc3RpZnlfX2Nsb3NlLWJ1dHRvbi0tJHtvfWAsdHlwZTpcImJ1dHRvblwiLG9uQ2xpY2s6dD0+e3Quc3RvcFByb3BhZ2F0aW9uKCksbih0KX0sXCJhcmlhLWxhYmVsXCI6c30sdC5jcmVhdGVFbGVtZW50KFwic3ZnXCIse1wiYXJpYS1oaWRkZW5cIjpcInRydWVcIix2aWV3Qm94OlwiMCAwIDE0IDE2XCJ9LHQuY3JlYXRlRWxlbWVudChcInBhdGhcIix7ZmlsbFJ1bGU6XCJldmVub2RkXCIsZDpcIk03LjcxIDguMjNsMy43NSAzLjc1LTEuNDggMS40OC0zLjc1LTMuNzUtMy43NSAzLjc1TDEgMTEuOThsMy43NS0zLjc1TDEgNC40OCAyLjQ4IDNsMy43NSAzLjc1TDkuOTggM2wxLjQ4IDEuNDgtMy43NSAzLjc1elwifSkpKX1mdW5jdGlvbiBPKGUpe2xldHtkZWxheTpuLGlzUnVubmluZzpvLGNsb3NlVG9hc3Q6cyx0eXBlOmE9XCJkZWZhdWx0XCIsaGlkZTpyLGNsYXNzTmFtZTppLHN0eWxlOmwsY29udHJvbGxlZFByb2dyZXNzOnUscHJvZ3Jlc3M6ZCxydGw6bSxpc0luOmYsdGhlbWU6Z309ZTtjb25zdCBoPXJ8fHUmJjA9PT1kLHk9ey4uLmwsYW5pbWF0aW9uRHVyYXRpb246YCR7bn1tc2AsYW5pbWF0aW9uUGxheVN0YXRlOm8/XCJydW5uaW5nXCI6XCJwYXVzZWRcIixvcGFjaXR5Omg/MDoxfTt1JiYoeS50cmFuc2Zvcm09YHNjYWxlWCgke2R9KWApO2NvbnN0IHY9YyhcIlRvYXN0aWZ5X19wcm9ncmVzcy1iYXJcIix1P1wiVG9hc3RpZnlfX3Byb2dyZXNzLWJhci0tY29udHJvbGxlZFwiOlwiVG9hc3RpZnlfX3Byb2dyZXNzLWJhci0tYW5pbWF0ZWRcIixgVG9hc3RpZnlfX3Byb2dyZXNzLWJhci10aGVtZS0tJHtnfWAsYFRvYXN0aWZ5X19wcm9ncmVzcy1iYXItLSR7YX1gLHtcIlRvYXN0aWZ5X19wcm9ncmVzcy1iYXItLXJ0bFwiOm19KSxUPXAoaSk/aSh7cnRsOm0sdHlwZTphLGRlZmF1bHRDbGFzc05hbWU6dn0pOmModixpKTtyZXR1cm4gdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIse3JvbGU6XCJwcm9ncmVzc2JhclwiLFwiYXJpYS1oaWRkZW5cIjpoP1widHJ1ZVwiOlwiZmFsc2VcIixcImFyaWEtbGFiZWxcIjpcIm5vdGlmaWNhdGlvbiB0aW1lclwiLGNsYXNzTmFtZTpULHN0eWxlOnksW3UmJmQ+PTE/XCJvblRyYW5zaXRpb25FbmRcIjpcIm9uQW5pbWF0aW9uRW5kXCJdOnUmJmQ8MT9udWxsOigpPT57ZiYmcygpfX0pfWNvbnN0IE49bj0+e2NvbnN0e2lzUnVubmluZzpvLHByZXZlbnRFeGl0VHJhbnNpdGlvbjpzLHRvYXN0UmVmOnIsZXZlbnRIYW5kbGVyczppfT1fKG4pLHtjbG9zZUJ1dHRvbjpsLGNoaWxkcmVuOnUsYXV0b0Nsb3NlOmQsb25DbGljazptLHR5cGU6ZixoaWRlUHJvZ3Jlc3NCYXI6ZyxjbG9zZVRvYXN0OmgsdHJhbnNpdGlvbjp5LHBvc2l0aW9uOnYsY2xhc3NOYW1lOlQsc3R5bGU6RSxib2R5Q2xhc3NOYW1lOkMsYm9keVN0eWxlOmIscHJvZ3Jlc3NDbGFzc05hbWU6SSxwcm9ncmVzc1N0eWxlOk4sdXBkYXRlSWQ6TSxyb2xlOlIscHJvZ3Jlc3M6dyxydGw6eCx0b2FzdElkOiQsZGVsZXRlVG9hc3Q6ayxpc0luOlAsaXNMb2FkaW5nOkIsaWNvbk91dDpELGNsb3NlT25DbGljazpBLHRoZW1lOnp9PW4sRj1jKFwiVG9hc3RpZnlfX3RvYXN0XCIsYFRvYXN0aWZ5X190b2FzdC10aGVtZS0tJHt6fWAsYFRvYXN0aWZ5X190b2FzdC0tJHtmfWAse1wiVG9hc3RpZnlfX3RvYXN0LS1ydGxcIjp4fSx7XCJUb2FzdGlmeV9fdG9hc3QtLWNsb3NlLW9uLWNsaWNrXCI6QX0pLEg9cChUKT9UKHtydGw6eCxwb3NpdGlvbjp2LHR5cGU6ZixkZWZhdWx0Q2xhc3NOYW1lOkZ9KTpjKEYsVCksUz0hIXd8fCFkLHE9e2Nsb3NlVG9hc3Q6aCx0eXBlOmYsdGhlbWU6en07bGV0IFE9bnVsbDtyZXR1cm4hMT09PWx8fChRPXAobCk/bChxKTplKGwpP2EobCxxKTpMKHEpKSx0LmNyZWF0ZUVsZW1lbnQoeSx7aXNJbjpQLGRvbmU6ayxwb3NpdGlvbjp2LHByZXZlbnRFeGl0VHJhbnNpdGlvbjpzLG5vZGVSZWY6cn0sdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIse2lkOiQsb25DbGljazptLGNsYXNzTmFtZTpILC4uLmksc3R5bGU6RSxyZWY6cn0sdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsey4uLlAmJntyb2xlOlJ9LGNsYXNzTmFtZTpwKEMpP0Moe3R5cGU6Zn0pOmMoXCJUb2FzdGlmeV9fdG9hc3QtYm9keVwiLEMpLHN0eWxlOmJ9LG51bGwhPUQmJnQuY3JlYXRlRWxlbWVudChcImRpdlwiLHtjbGFzc05hbWU6YyhcIlRvYXN0aWZ5X190b2FzdC1pY29uXCIse1wiVG9hc3RpZnktLWFuaW1hdGUtaWNvbiBUb2FzdGlmeV9fem9vbS1lbnRlclwiOiFCfSl9LEQpLHQuY3JlYXRlRWxlbWVudChcImRpdlwiLG51bGwsdSkpLFEsdC5jcmVhdGVFbGVtZW50KE8sey4uLk0mJiFTP3trZXk6YHBiLSR7TX1gfTp7fSxydGw6eCx0aGVtZTp6LGRlbGF5OmQsaXNSdW5uaW5nOm8saXNJbjpQLGNsb3NlVG9hc3Q6aCxoaWRlOmcsdHlwZTpmLHN0eWxlOk4sY2xhc3NOYW1lOkksY29udHJvbGxlZFByb2dyZXNzOlMscHJvZ3Jlc3M6d3x8MH0pKSl9LE09ZnVuY3Rpb24odCxlKXtyZXR1cm4gdm9pZCAwPT09ZSYmKGU9ITEpLHtlbnRlcjpgVG9hc3RpZnktLWFuaW1hdGUgVG9hc3RpZnlfXyR7dH0tZW50ZXJgLGV4aXQ6YFRvYXN0aWZ5LS1hbmltYXRlIFRvYXN0aWZ5X18ke3R9LWV4aXRgLGFwcGVuZFBvc2l0aW9uOmV9fSxSPWgoTShcImJvdW5jZVwiLCEwKSksdz1oKE0oXCJzbGlkZVwiLCEwKSkseD1oKE0oXCJ6b29tXCIpKSwkPWgoTShcImZsaXBcIikpLGs9bCgoZSxuKT0+e2NvbnN0e2dldFRvYXN0VG9SZW5kZXI6byxjb250YWluZXJSZWY6YSxpc1RvYXN0QWN0aXZlOnJ9PUMoZSkse2NsYXNzTmFtZTppLHN0eWxlOmwscnRsOnUsY29udGFpbmVySWQ6ZH09ZTtmdW5jdGlvbiBmKHQpe2NvbnN0IGU9YyhcIlRvYXN0aWZ5X190b2FzdC1jb250YWluZXJcIixgVG9hc3RpZnlfX3RvYXN0LWNvbnRhaW5lci0tJHt0fWAse1wiVG9hc3RpZnlfX3RvYXN0LWNvbnRhaW5lci0tcnRsXCI6dX0pO3JldHVybiBwKGkpP2koe3Bvc2l0aW9uOnQscnRsOnUsZGVmYXVsdENsYXNzTmFtZTplfSk6YyhlLG0oaSkpfXJldHVybiBzKCgpPT57biYmKG4uY3VycmVudD1hLmN1cnJlbnQpfSxbXSksdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIse3JlZjphLGNsYXNzTmFtZTpcIlRvYXN0aWZ5XCIsaWQ6ZH0sbygoZSxuKT0+e2NvbnN0IG89bi5sZW5ndGg/ey4uLmx9OnsuLi5sLHBvaW50ZXJFdmVudHM6XCJub25lXCJ9O3JldHVybiB0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIix7Y2xhc3NOYW1lOmYoZSksc3R5bGU6byxrZXk6YGNvbnRhaW5lci0ke2V9YH0sbi5tYXAoKGUsbyk9PntsZXR7Y29udGVudDpzLHByb3BzOmF9PWU7cmV0dXJuIHQuY3JlYXRlRWxlbWVudChOLHsuLi5hLGlzSW46cihhLnRvYXN0SWQpLHN0eWxlOnsuLi5hLnN0eWxlLFwiLS1udGhcIjpvKzEsXCItLWxlblwiOm4ubGVuZ3RofSxrZXk6YHRvYXN0LSR7YS5rZXl9YH0scyl9KSl9KSl9KTtrLmRpc3BsYXlOYW1lPVwiVG9hc3RDb250YWluZXJcIixrLmRlZmF1bHRQcm9wcz17cG9zaXRpb246XCJ0b3AtcmlnaHRcIix0cmFuc2l0aW9uOlIsYXV0b0Nsb3NlOjVlMyxjbG9zZUJ1dHRvbjpMLHBhdXNlT25Ib3ZlcjohMCxwYXVzZU9uRm9jdXNMb3NzOiEwLGNsb3NlT25DbGljazohMCxkcmFnZ2FibGU6ITAsZHJhZ2dhYmxlUGVyY2VudDo4MCxkcmFnZ2FibGVEaXJlY3Rpb246XCJ4XCIscm9sZTpcImFsZXJ0XCIsdGhlbWU6XCJsaWdodFwifTtsZXQgUCxCPW5ldyBNYXAsRD1bXSxBPTE7ZnVuY3Rpb24geigpe3JldHVyblwiXCIrQSsrfWZ1bmN0aW9uIEYodCl7cmV0dXJuIHQmJihkKHQudG9hc3RJZCl8fHUodC50b2FzdElkKSk/dC50b2FzdElkOnooKX1mdW5jdGlvbiBIKHQsZSl7cmV0dXJuIEIuc2l6ZT4wP3YuZW1pdCgwLHQsZSk6RC5wdXNoKHtjb250ZW50OnQsb3B0aW9uczplfSksZS50b2FzdElkfWZ1bmN0aW9uIFModCxlKXtyZXR1cm57Li4uZSx0eXBlOmUmJmUudHlwZXx8dCx0b2FzdElkOkYoZSl9fWZ1bmN0aW9uIHEodCl7cmV0dXJuKGUsbik9PkgoZSxTKHQsbikpfWZ1bmN0aW9uIFEodCxlKXtyZXR1cm4gSCh0LFMoXCJkZWZhdWx0XCIsZSkpfVEubG9hZGluZz0odCxlKT0+SCh0LFMoXCJkZWZhdWx0XCIse2lzTG9hZGluZzohMCxhdXRvQ2xvc2U6ITEsY2xvc2VPbkNsaWNrOiExLGNsb3NlQnV0dG9uOiExLGRyYWdnYWJsZTohMSwuLi5lfSkpLFEucHJvbWlzZT1mdW5jdGlvbih0LGUsbil7bGV0IG8se3BlbmRpbmc6cyxlcnJvcjphLHN1Y2Nlc3M6cn09ZTtzJiYobz1kKHMpP1EubG9hZGluZyhzLG4pOlEubG9hZGluZyhzLnJlbmRlcix7Li4ubiwuLi5zfSkpO2NvbnN0IGk9e2lzTG9hZGluZzpudWxsLGF1dG9DbG9zZTpudWxsLGNsb3NlT25DbGljazpudWxsLGNsb3NlQnV0dG9uOm51bGwsZHJhZ2dhYmxlOm51bGx9LGw9KHQsZSxzKT0+e2lmKG51bGw9PWUpcmV0dXJuIHZvaWQgUS5kaXNtaXNzKG8pO2NvbnN0IGE9e3R5cGU6dCwuLi5pLC4uLm4sZGF0YTpzfSxyPWQoZSk/e3JlbmRlcjplfTplO3JldHVybiBvP1EudXBkYXRlKG8sey4uLmEsLi4ucn0pOlEoci5yZW5kZXIsey4uLmEsLi4ucn0pLHN9LGM9cCh0KT90KCk6dDtyZXR1cm4gYy50aGVuKHQ9PmwoXCJzdWNjZXNzXCIscix0KSkuY2F0Y2godD0+bChcImVycm9yXCIsYSx0KSksY30sUS5zdWNjZXNzPXEoXCJzdWNjZXNzXCIpLFEuaW5mbz1xKFwiaW5mb1wiKSxRLmVycm9yPXEoXCJlcnJvclwiKSxRLndhcm5pbmc9cShcIndhcm5pbmdcIiksUS53YXJuPVEud2FybmluZyxRLmRhcms9KHQsZSk9PkgodCxTKFwiZGVmYXVsdFwiLHt0aGVtZTpcImRhcmtcIiwuLi5lfSkpLFEuZGlzbWlzcz10PT57Qi5zaXplPjA/di5lbWl0KDEsdCk6RD1ELmZpbHRlcihlPT5udWxsIT10JiZlLm9wdGlvbnMudG9hc3RJZCE9PXQpfSxRLmNsZWFyV2FpdGluZ1F1ZXVlPWZ1bmN0aW9uKHQpe3JldHVybiB2b2lkIDA9PT10JiYodD17fSksdi5lbWl0KDUsdCl9LFEuaXNBY3RpdmU9dD0+e2xldCBlPSExO3JldHVybiBCLmZvckVhY2gobj0+e24uaXNUb2FzdEFjdGl2ZSYmbi5pc1RvYXN0QWN0aXZlKHQpJiYoZT0hMCl9KSxlfSxRLnVwZGF0ZT1mdW5jdGlvbih0LGUpe3ZvaWQgMD09PWUmJihlPXt9KSxzZXRUaW1lb3V0KCgpPT57Y29uc3Qgbj1mdW5jdGlvbih0LGUpe2xldHtjb250YWluZXJJZDpufT1lO2NvbnN0IG89Qi5nZXQobnx8UCk7cmV0dXJuIG8mJm8uZ2V0VG9hc3QodCl9KHQsZSk7aWYobil7Y29uc3R7cHJvcHM6byxjb250ZW50OnN9PW4sYT17ZGVsYXk6MTAwLC4uLm8sLi4uZSx0b2FzdElkOmUudG9hc3RJZHx8dCx1cGRhdGVJZDp6KCl9O2EudG9hc3RJZCE9PXQmJihhLnN0YWxlSWQ9dCk7Y29uc3Qgcj1hLnJlbmRlcnx8cztkZWxldGUgYS5yZW5kZXIsSChyLGEpfX0sMCl9LFEuZG9uZT10PT57US51cGRhdGUodCx7cHJvZ3Jlc3M6MX0pfSxRLm9uQ2hhbmdlPXQ9Pih2Lm9uKDQsdCksKCk9Pnt2Lm9mZig0LHQpfSksUS5QT1NJVElPTj17VE9QX0xFRlQ6XCJ0b3AtbGVmdFwiLFRPUF9SSUdIVDpcInRvcC1yaWdodFwiLFRPUF9DRU5URVI6XCJ0b3AtY2VudGVyXCIsQk9UVE9NX0xFRlQ6XCJib3R0b20tbGVmdFwiLEJPVFRPTV9SSUdIVDpcImJvdHRvbS1yaWdodFwiLEJPVFRPTV9DRU5URVI6XCJib3R0b20tY2VudGVyXCJ9LFEuVFlQRT17SU5GTzpcImluZm9cIixTVUNDRVNTOlwic3VjY2Vzc1wiLFdBUk5JTkc6XCJ3YXJuaW5nXCIsRVJST1I6XCJlcnJvclwiLERFRkFVTFQ6XCJkZWZhdWx0XCJ9LHYub24oMix0PT57UD10LmNvbnRhaW5lcklkfHx0LEIuc2V0KFAsdCksRC5mb3JFYWNoKHQ9Pnt2LmVtaXQoMCx0LmNvbnRlbnQsdC5vcHRpb25zKX0pLEQ9W119KS5vbigzLHQ9PntCLmRlbGV0ZSh0LmNvbnRhaW5lcklkfHx0KSwwPT09Qi5zaXplJiZ2Lm9mZigwKS5vZmYoMSkub2ZmKDUpfSk7ZXhwb3J0e1IgYXMgQm91bmNlLCQgYXMgRmxpcCxFIGFzIEljb25zLHcgYXMgU2xpZGUsayBhcyBUb2FzdENvbnRhaW5lcix4IGFzIFpvb20sZyBhcyBjb2xsYXBzZVRvYXN0LGggYXMgY3NzVHJhbnNpdGlvbixRIGFzIHRvYXN0LF8gYXMgdXNlVG9hc3QsQyBhcyB1c2VUb2FzdENvbnRhaW5lcn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1yZWFjdC10b2FzdGlmeS5lc20ubWpzLm1hcFxuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG52YXIgcnVudGltZSA9IChmdW5jdGlvbiAoZXhwb3J0cykge1xuICBcInVzZSBzdHJpY3RcIjtcblxuICB2YXIgT3AgPSBPYmplY3QucHJvdG90eXBlO1xuICB2YXIgaGFzT3duID0gT3AuaGFzT3duUHJvcGVydHk7XG4gIHZhciB1bmRlZmluZWQ7IC8vIE1vcmUgY29tcHJlc3NpYmxlIHRoYW4gdm9pZCAwLlxuICB2YXIgJFN5bWJvbCA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiA/IFN5bWJvbCA6IHt9O1xuICB2YXIgaXRlcmF0b3JTeW1ib2wgPSAkU3ltYm9sLml0ZXJhdG9yIHx8IFwiQEBpdGVyYXRvclwiO1xuICB2YXIgYXN5bmNJdGVyYXRvclN5bWJvbCA9ICRTeW1ib2wuYXN5bmNJdGVyYXRvciB8fCBcIkBAYXN5bmNJdGVyYXRvclwiO1xuICB2YXIgdG9TdHJpbmdUYWdTeW1ib2wgPSAkU3ltYm9sLnRvU3RyaW5nVGFnIHx8IFwiQEB0b1N0cmluZ1RhZ1wiO1xuXG4gIGZ1bmN0aW9uIGRlZmluZShvYmosIGtleSwgdmFsdWUpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIHJldHVybiBvYmpba2V5XTtcbiAgfVxuICB0cnkge1xuICAgIC8vIElFIDggaGFzIGEgYnJva2VuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSB0aGF0IG9ubHkgd29ya3Mgb24gRE9NIG9iamVjdHMuXG4gICAgZGVmaW5lKHt9LCBcIlwiKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgZGVmaW5lID0gZnVuY3Rpb24ob2JqLCBrZXksIHZhbHVlKSB7XG4gICAgICByZXR1cm4gb2JqW2tleV0gPSB2YWx1ZTtcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gd3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCkge1xuICAgIC8vIElmIG91dGVyRm4gcHJvdmlkZWQgYW5kIG91dGVyRm4ucHJvdG90eXBlIGlzIGEgR2VuZXJhdG9yLCB0aGVuIG91dGVyRm4ucHJvdG90eXBlIGluc3RhbmNlb2YgR2VuZXJhdG9yLlxuICAgIHZhciBwcm90b0dlbmVyYXRvciA9IG91dGVyRm4gJiYgb3V0ZXJGbi5wcm90b3R5cGUgaW5zdGFuY2VvZiBHZW5lcmF0b3IgPyBvdXRlckZuIDogR2VuZXJhdG9yO1xuICAgIHZhciBnZW5lcmF0b3IgPSBPYmplY3QuY3JlYXRlKHByb3RvR2VuZXJhdG9yLnByb3RvdHlwZSk7XG4gICAgdmFyIGNvbnRleHQgPSBuZXcgQ29udGV4dCh0cnlMb2NzTGlzdCB8fCBbXSk7XG5cbiAgICAvLyBUaGUgLl9pbnZva2UgbWV0aG9kIHVuaWZpZXMgdGhlIGltcGxlbWVudGF0aW9ucyBvZiB0aGUgLm5leHQsXG4gICAgLy8gLnRocm93LCBhbmQgLnJldHVybiBtZXRob2RzLlxuICAgIGdlbmVyYXRvci5faW52b2tlID0gbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KTtcblxuICAgIHJldHVybiBnZW5lcmF0b3I7XG4gIH1cbiAgZXhwb3J0cy53cmFwID0gd3JhcDtcblxuICAvLyBUcnkvY2F0Y2ggaGVscGVyIHRvIG1pbmltaXplIGRlb3B0aW1pemF0aW9ucy4gUmV0dXJucyBhIGNvbXBsZXRpb25cbiAgLy8gcmVjb3JkIGxpa2UgY29udGV4dC50cnlFbnRyaWVzW2ldLmNvbXBsZXRpb24uIFRoaXMgaW50ZXJmYWNlIGNvdWxkXG4gIC8vIGhhdmUgYmVlbiAoYW5kIHdhcyBwcmV2aW91c2x5KSBkZXNpZ25lZCB0byB0YWtlIGEgY2xvc3VyZSB0byBiZVxuICAvLyBpbnZva2VkIHdpdGhvdXQgYXJndW1lbnRzLCBidXQgaW4gYWxsIHRoZSBjYXNlcyB3ZSBjYXJlIGFib3V0IHdlXG4gIC8vIGFscmVhZHkgaGF2ZSBhbiBleGlzdGluZyBtZXRob2Qgd2Ugd2FudCB0byBjYWxsLCBzbyB0aGVyZSdzIG5vIG5lZWRcbiAgLy8gdG8gY3JlYXRlIGEgbmV3IGZ1bmN0aW9uIG9iamVjdC4gV2UgY2FuIGV2ZW4gZ2V0IGF3YXkgd2l0aCBhc3N1bWluZ1xuICAvLyB0aGUgbWV0aG9kIHRha2VzIGV4YWN0bHkgb25lIGFyZ3VtZW50LCBzaW5jZSB0aGF0IGhhcHBlbnMgdG8gYmUgdHJ1ZVxuICAvLyBpbiBldmVyeSBjYXNlLCBzbyB3ZSBkb24ndCBoYXZlIHRvIHRvdWNoIHRoZSBhcmd1bWVudHMgb2JqZWN0LiBUaGVcbiAgLy8gb25seSBhZGRpdGlvbmFsIGFsbG9jYXRpb24gcmVxdWlyZWQgaXMgdGhlIGNvbXBsZXRpb24gcmVjb3JkLCB3aGljaFxuICAvLyBoYXMgYSBzdGFibGUgc2hhcGUgYW5kIHNvIGhvcGVmdWxseSBzaG91bGQgYmUgY2hlYXAgdG8gYWxsb2NhdGUuXG4gIGZ1bmN0aW9uIHRyeUNhdGNoKGZuLCBvYmosIGFyZykge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4geyB0eXBlOiBcIm5vcm1hbFwiLCBhcmc6IGZuLmNhbGwob2JqLCBhcmcpIH07XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4geyB0eXBlOiBcInRocm93XCIsIGFyZzogZXJyIH07XG4gICAgfVxuICB9XG5cbiAgdmFyIEdlblN0YXRlU3VzcGVuZGVkU3RhcnQgPSBcInN1c3BlbmRlZFN0YXJ0XCI7XG4gIHZhciBHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkID0gXCJzdXNwZW5kZWRZaWVsZFwiO1xuICB2YXIgR2VuU3RhdGVFeGVjdXRpbmcgPSBcImV4ZWN1dGluZ1wiO1xuICB2YXIgR2VuU3RhdGVDb21wbGV0ZWQgPSBcImNvbXBsZXRlZFwiO1xuXG4gIC8vIFJldHVybmluZyB0aGlzIG9iamVjdCBmcm9tIHRoZSBpbm5lckZuIGhhcyB0aGUgc2FtZSBlZmZlY3QgYXNcbiAgLy8gYnJlYWtpbmcgb3V0IG9mIHRoZSBkaXNwYXRjaCBzd2l0Y2ggc3RhdGVtZW50LlxuICB2YXIgQ29udGludWVTZW50aW5lbCA9IHt9O1xuXG4gIC8vIER1bW15IGNvbnN0cnVjdG9yIGZ1bmN0aW9ucyB0aGF0IHdlIHVzZSBhcyB0aGUgLmNvbnN0cnVjdG9yIGFuZFxuICAvLyAuY29uc3RydWN0b3IucHJvdG90eXBlIHByb3BlcnRpZXMgZm9yIGZ1bmN0aW9ucyB0aGF0IHJldHVybiBHZW5lcmF0b3JcbiAgLy8gb2JqZWN0cy4gRm9yIGZ1bGwgc3BlYyBjb21wbGlhbmNlLCB5b3UgbWF5IHdpc2ggdG8gY29uZmlndXJlIHlvdXJcbiAgLy8gbWluaWZpZXIgbm90IHRvIG1hbmdsZSB0aGUgbmFtZXMgb2YgdGhlc2UgdHdvIGZ1bmN0aW9ucy5cbiAgZnVuY3Rpb24gR2VuZXJhdG9yKCkge31cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb24oKSB7fVxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSgpIHt9XG5cbiAgLy8gVGhpcyBpcyBhIHBvbHlmaWxsIGZvciAlSXRlcmF0b3JQcm90b3R5cGUlIGZvciBlbnZpcm9ubWVudHMgdGhhdFxuICAvLyBkb24ndCBuYXRpdmVseSBzdXBwb3J0IGl0LlxuICB2YXIgSXRlcmF0b3JQcm90b3R5cGUgPSB7fTtcbiAgSXRlcmF0b3JQcm90b3R5cGVbaXRlcmF0b3JTeW1ib2xdID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIHZhciBnZXRQcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZjtcbiAgdmFyIE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlID0gZ2V0UHJvdG8gJiYgZ2V0UHJvdG8oZ2V0UHJvdG8odmFsdWVzKFtdKSkpO1xuICBpZiAoTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgJiZcbiAgICAgIE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlICE9PSBPcCAmJlxuICAgICAgaGFzT3duLmNhbGwoTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUsIGl0ZXJhdG9yU3ltYm9sKSkge1xuICAgIC8vIFRoaXMgZW52aXJvbm1lbnQgaGFzIGEgbmF0aXZlICVJdGVyYXRvclByb3RvdHlwZSU7IHVzZSBpdCBpbnN0ZWFkXG4gICAgLy8gb2YgdGhlIHBvbHlmaWxsLlxuICAgIEl0ZXJhdG9yUHJvdG90eXBlID0gTmF0aXZlSXRlcmF0b3JQcm90b3R5cGU7XG4gIH1cblxuICB2YXIgR3AgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZS5wcm90b3R5cGUgPVxuICAgIEdlbmVyYXRvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEl0ZXJhdG9yUHJvdG90eXBlKTtcbiAgR2VuZXJhdG9yRnVuY3Rpb24ucHJvdG90eXBlID0gR3AuY29uc3RydWN0b3IgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUuY29uc3RydWN0b3IgPSBHZW5lcmF0b3JGdW5jdGlvbjtcbiAgR2VuZXJhdG9yRnVuY3Rpb24uZGlzcGxheU5hbWUgPSBkZWZpbmUoXG4gICAgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUsXG4gICAgdG9TdHJpbmdUYWdTeW1ib2wsXG4gICAgXCJHZW5lcmF0b3JGdW5jdGlvblwiXG4gICk7XG5cbiAgLy8gSGVscGVyIGZvciBkZWZpbmluZyB0aGUgLm5leHQsIC50aHJvdywgYW5kIC5yZXR1cm4gbWV0aG9kcyBvZiB0aGVcbiAgLy8gSXRlcmF0b3IgaW50ZXJmYWNlIGluIHRlcm1zIG9mIGEgc2luZ2xlIC5faW52b2tlIG1ldGhvZC5cbiAgZnVuY3Rpb24gZGVmaW5lSXRlcmF0b3JNZXRob2RzKHByb3RvdHlwZSkge1xuICAgIFtcIm5leHRcIiwgXCJ0aHJvd1wiLCBcInJldHVyblwiXS5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgICAgZGVmaW5lKHByb3RvdHlwZSwgbWV0aG9kLCBmdW5jdGlvbihhcmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ludm9rZShtZXRob2QsIGFyZyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGV4cG9ydHMuaXNHZW5lcmF0b3JGdW5jdGlvbiA9IGZ1bmN0aW9uKGdlbkZ1bikge1xuICAgIHZhciBjdG9yID0gdHlwZW9mIGdlbkZ1biA9PT0gXCJmdW5jdGlvblwiICYmIGdlbkZ1bi5jb25zdHJ1Y3RvcjtcbiAgICByZXR1cm4gY3RvclxuICAgICAgPyBjdG9yID09PSBHZW5lcmF0b3JGdW5jdGlvbiB8fFxuICAgICAgICAvLyBGb3IgdGhlIG5hdGl2ZSBHZW5lcmF0b3JGdW5jdGlvbiBjb25zdHJ1Y3RvciwgdGhlIGJlc3Qgd2UgY2FuXG4gICAgICAgIC8vIGRvIGlzIHRvIGNoZWNrIGl0cyAubmFtZSBwcm9wZXJ0eS5cbiAgICAgICAgKGN0b3IuZGlzcGxheU5hbWUgfHwgY3Rvci5uYW1lKSA9PT0gXCJHZW5lcmF0b3JGdW5jdGlvblwiXG4gICAgICA6IGZhbHNlO1xuICB9O1xuXG4gIGV4cG9ydHMubWFyayA9IGZ1bmN0aW9uKGdlbkZ1bikge1xuICAgIGlmIChPYmplY3Quc2V0UHJvdG90eXBlT2YpIHtcbiAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZihnZW5GdW4sIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ2VuRnVuLl9fcHJvdG9fXyA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO1xuICAgICAgZGVmaW5lKGdlbkZ1biwgdG9TdHJpbmdUYWdTeW1ib2wsIFwiR2VuZXJhdG9yRnVuY3Rpb25cIik7XG4gICAgfVxuICAgIGdlbkZ1bi5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEdwKTtcbiAgICByZXR1cm4gZ2VuRnVuO1xuICB9O1xuXG4gIC8vIFdpdGhpbiB0aGUgYm9keSBvZiBhbnkgYXN5bmMgZnVuY3Rpb24sIGBhd2FpdCB4YCBpcyB0cmFuc2Zvcm1lZCB0b1xuICAvLyBgeWllbGQgcmVnZW5lcmF0b3JSdW50aW1lLmF3cmFwKHgpYCwgc28gdGhhdCB0aGUgcnVudGltZSBjYW4gdGVzdFxuICAvLyBgaGFzT3duLmNhbGwodmFsdWUsIFwiX19hd2FpdFwiKWAgdG8gZGV0ZXJtaW5lIGlmIHRoZSB5aWVsZGVkIHZhbHVlIGlzXG4gIC8vIG1lYW50IHRvIGJlIGF3YWl0ZWQuXG4gIGV4cG9ydHMuYXdyYXAgPSBmdW5jdGlvbihhcmcpIHtcbiAgICByZXR1cm4geyBfX2F3YWl0OiBhcmcgfTtcbiAgfTtcblxuICBmdW5jdGlvbiBBc3luY0l0ZXJhdG9yKGdlbmVyYXRvciwgUHJvbWlzZUltcGwpIHtcbiAgICBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcsIHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGdlbmVyYXRvclttZXRob2RdLCBnZW5lcmF0b3IsIGFyZyk7XG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICByZWplY3QocmVjb3JkLmFyZyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgcmVzdWx0ID0gcmVjb3JkLmFyZztcbiAgICAgICAgdmFyIHZhbHVlID0gcmVzdWx0LnZhbHVlO1xuICAgICAgICBpZiAodmFsdWUgJiZcbiAgICAgICAgICAgIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJlxuICAgICAgICAgICAgaGFzT3duLmNhbGwodmFsdWUsIFwiX19hd2FpdFwiKSkge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlSW1wbC5yZXNvbHZlKHZhbHVlLl9fYXdhaXQpLnRoZW4oZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgIGludm9rZShcIm5leHRcIiwgdmFsdWUsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICBpbnZva2UoXCJ0aHJvd1wiLCBlcnIsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gUHJvbWlzZUltcGwucmVzb2x2ZSh2YWx1ZSkudGhlbihmdW5jdGlvbih1bndyYXBwZWQpIHtcbiAgICAgICAgICAvLyBXaGVuIGEgeWllbGRlZCBQcm9taXNlIGlzIHJlc29sdmVkLCBpdHMgZmluYWwgdmFsdWUgYmVjb21lc1xuICAgICAgICAgIC8vIHRoZSAudmFsdWUgb2YgdGhlIFByb21pc2U8e3ZhbHVlLGRvbmV9PiByZXN1bHQgZm9yIHRoZVxuICAgICAgICAgIC8vIGN1cnJlbnQgaXRlcmF0aW9uLlxuICAgICAgICAgIHJlc3VsdC52YWx1ZSA9IHVud3JhcHBlZDtcbiAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgICAgLy8gSWYgYSByZWplY3RlZCBQcm9taXNlIHdhcyB5aWVsZGVkLCB0aHJvdyB0aGUgcmVqZWN0aW9uIGJhY2tcbiAgICAgICAgICAvLyBpbnRvIHRoZSBhc3luYyBnZW5lcmF0b3IgZnVuY3Rpb24gc28gaXQgY2FuIGJlIGhhbmRsZWQgdGhlcmUuXG4gICAgICAgICAgcmV0dXJuIGludm9rZShcInRocm93XCIsIGVycm9yLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgcHJldmlvdXNQcm9taXNlO1xuXG4gICAgZnVuY3Rpb24gZW5xdWV1ZShtZXRob2QsIGFyZykge1xuICAgICAgZnVuY3Rpb24gY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZUltcGwoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgaW52b2tlKG1ldGhvZCwgYXJnLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHByZXZpb3VzUHJvbWlzZSA9XG4gICAgICAgIC8vIElmIGVucXVldWUgaGFzIGJlZW4gY2FsbGVkIGJlZm9yZSwgdGhlbiB3ZSB3YW50IHRvIHdhaXQgdW50aWxcbiAgICAgICAgLy8gYWxsIHByZXZpb3VzIFByb21pc2VzIGhhdmUgYmVlbiByZXNvbHZlZCBiZWZvcmUgY2FsbGluZyBpbnZva2UsXG4gICAgICAgIC8vIHNvIHRoYXQgcmVzdWx0cyBhcmUgYWx3YXlzIGRlbGl2ZXJlZCBpbiB0aGUgY29ycmVjdCBvcmRlci4gSWZcbiAgICAgICAgLy8gZW5xdWV1ZSBoYXMgbm90IGJlZW4gY2FsbGVkIGJlZm9yZSwgdGhlbiBpdCBpcyBpbXBvcnRhbnQgdG9cbiAgICAgICAgLy8gY2FsbCBpbnZva2UgaW1tZWRpYXRlbHksIHdpdGhvdXQgd2FpdGluZyBvbiBhIGNhbGxiYWNrIHRvIGZpcmUsXG4gICAgICAgIC8vIHNvIHRoYXQgdGhlIGFzeW5jIGdlbmVyYXRvciBmdW5jdGlvbiBoYXMgdGhlIG9wcG9ydHVuaXR5IHRvIGRvXG4gICAgICAgIC8vIGFueSBuZWNlc3Nhcnkgc2V0dXAgaW4gYSBwcmVkaWN0YWJsZSB3YXkuIFRoaXMgcHJlZGljdGFiaWxpdHlcbiAgICAgICAgLy8gaXMgd2h5IHRoZSBQcm9taXNlIGNvbnN0cnVjdG9yIHN5bmNocm9ub3VzbHkgaW52b2tlcyBpdHNcbiAgICAgICAgLy8gZXhlY3V0b3IgY2FsbGJhY2ssIGFuZCB3aHkgYXN5bmMgZnVuY3Rpb25zIHN5bmNocm9ub3VzbHlcbiAgICAgICAgLy8gZXhlY3V0ZSBjb2RlIGJlZm9yZSB0aGUgZmlyc3QgYXdhaXQuIFNpbmNlIHdlIGltcGxlbWVudCBzaW1wbGVcbiAgICAgICAgLy8gYXN5bmMgZnVuY3Rpb25zIGluIHRlcm1zIG9mIGFzeW5jIGdlbmVyYXRvcnMsIGl0IGlzIGVzcGVjaWFsbHlcbiAgICAgICAgLy8gaW1wb3J0YW50IHRvIGdldCB0aGlzIHJpZ2h0LCBldmVuIHRob3VnaCBpdCByZXF1aXJlcyBjYXJlLlxuICAgICAgICBwcmV2aW91c1Byb21pc2UgPyBwcmV2aW91c1Byb21pc2UudGhlbihcbiAgICAgICAgICBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZyxcbiAgICAgICAgICAvLyBBdm9pZCBwcm9wYWdhdGluZyBmYWlsdXJlcyB0byBQcm9taXNlcyByZXR1cm5lZCBieSBsYXRlclxuICAgICAgICAgIC8vIGludm9jYXRpb25zIG9mIHRoZSBpdGVyYXRvci5cbiAgICAgICAgICBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZ1xuICAgICAgICApIDogY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKTtcbiAgICB9XG5cbiAgICAvLyBEZWZpbmUgdGhlIHVuaWZpZWQgaGVscGVyIG1ldGhvZCB0aGF0IGlzIHVzZWQgdG8gaW1wbGVtZW50IC5uZXh0LFxuICAgIC8vIC50aHJvdywgYW5kIC5yZXR1cm4gKHNlZSBkZWZpbmVJdGVyYXRvck1ldGhvZHMpLlxuICAgIHRoaXMuX2ludm9rZSA9IGVucXVldWU7XG4gIH1cblxuICBkZWZpbmVJdGVyYXRvck1ldGhvZHMoQXN5bmNJdGVyYXRvci5wcm90b3R5cGUpO1xuICBBc3luY0l0ZXJhdG9yLnByb3RvdHlwZVthc3luY0l0ZXJhdG9yU3ltYm9sXSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcbiAgZXhwb3J0cy5Bc3luY0l0ZXJhdG9yID0gQXN5bmNJdGVyYXRvcjtcblxuICAvLyBOb3RlIHRoYXQgc2ltcGxlIGFzeW5jIGZ1bmN0aW9ucyBhcmUgaW1wbGVtZW50ZWQgb24gdG9wIG9mXG4gIC8vIEFzeW5jSXRlcmF0b3Igb2JqZWN0czsgdGhleSBqdXN0IHJldHVybiBhIFByb21pc2UgZm9yIHRoZSB2YWx1ZSBvZlxuICAvLyB0aGUgZmluYWwgcmVzdWx0IHByb2R1Y2VkIGJ5IHRoZSBpdGVyYXRvci5cbiAgZXhwb3J0cy5hc3luYyA9IGZ1bmN0aW9uKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0LCBQcm9taXNlSW1wbCkge1xuICAgIGlmIChQcm9taXNlSW1wbCA9PT0gdm9pZCAwKSBQcm9taXNlSW1wbCA9IFByb21pc2U7XG5cbiAgICB2YXIgaXRlciA9IG5ldyBBc3luY0l0ZXJhdG9yKFxuICAgICAgd3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCksXG4gICAgICBQcm9taXNlSW1wbFxuICAgICk7XG5cbiAgICByZXR1cm4gZXhwb3J0cy5pc0dlbmVyYXRvckZ1bmN0aW9uKG91dGVyRm4pXG4gICAgICA/IGl0ZXIgLy8gSWYgb3V0ZXJGbiBpcyBhIGdlbmVyYXRvciwgcmV0dXJuIHRoZSBmdWxsIGl0ZXJhdG9yLlxuICAgICAgOiBpdGVyLm5leHQoKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgIHJldHVybiByZXN1bHQuZG9uZSA/IHJlc3VsdC52YWx1ZSA6IGl0ZXIubmV4dCgpO1xuICAgICAgICB9KTtcbiAgfTtcblxuICBmdW5jdGlvbiBtYWtlSW52b2tlTWV0aG9kKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpIHtcbiAgICB2YXIgc3RhdGUgPSBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0O1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIGludm9rZShtZXRob2QsIGFyZykge1xuICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZUV4ZWN1dGluZykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBydW5uaW5nXCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlQ29tcGxldGVkKSB7XG4gICAgICAgIGlmIChtZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIHRocm93IGFyZztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEJlIGZvcmdpdmluZywgcGVyIDI1LjMuMy4zLjMgb2YgdGhlIHNwZWM6XG4gICAgICAgIC8vIGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1nZW5lcmF0b3JyZXN1bWVcbiAgICAgICAgcmV0dXJuIGRvbmVSZXN1bHQoKTtcbiAgICAgIH1cblxuICAgICAgY29udGV4dC5tZXRob2QgPSBtZXRob2Q7XG4gICAgICBjb250ZXh0LmFyZyA9IGFyZztcblxuICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgdmFyIGRlbGVnYXRlID0gY29udGV4dC5kZWxlZ2F0ZTtcbiAgICAgICAgaWYgKGRlbGVnYXRlKSB7XG4gICAgICAgICAgdmFyIGRlbGVnYXRlUmVzdWx0ID0gbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCk7XG4gICAgICAgICAgaWYgKGRlbGVnYXRlUmVzdWx0KSB7XG4gICAgICAgICAgICBpZiAoZGVsZWdhdGVSZXN1bHQgPT09IENvbnRpbnVlU2VudGluZWwpIGNvbnRpbnVlO1xuICAgICAgICAgICAgcmV0dXJuIGRlbGVnYXRlUmVzdWx0O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJuZXh0XCIpIHtcbiAgICAgICAgICAvLyBTZXR0aW5nIGNvbnRleHQuX3NlbnQgZm9yIGxlZ2FjeSBzdXBwb3J0IG9mIEJhYmVsJ3NcbiAgICAgICAgICAvLyBmdW5jdGlvbi5zZW50IGltcGxlbWVudGF0aW9uLlxuICAgICAgICAgIGNvbnRleHQuc2VudCA9IGNvbnRleHQuX3NlbnQgPSBjb250ZXh0LmFyZztcblxuICAgICAgICB9IGVsc2UgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlU3VzcGVuZGVkU3RhcnQpIHtcbiAgICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVDb21wbGV0ZWQ7XG4gICAgICAgICAgICB0aHJvdyBjb250ZXh0LmFyZztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGNvbnRleHQuYXJnKTtcblxuICAgICAgICB9IGVsc2UgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInJldHVyblwiKSB7XG4gICAgICAgICAgY29udGV4dC5hYnJ1cHQoXCJyZXR1cm5cIiwgY29udGV4dC5hcmcpO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUV4ZWN1dGluZztcblxuICAgICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goaW5uZXJGbiwgc2VsZiwgY29udGV4dCk7XG4gICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJub3JtYWxcIikge1xuICAgICAgICAgIC8vIElmIGFuIGV4Y2VwdGlvbiBpcyB0aHJvd24gZnJvbSBpbm5lckZuLCB3ZSBsZWF2ZSBzdGF0ZSA9PT1cbiAgICAgICAgICAvLyBHZW5TdGF0ZUV4ZWN1dGluZyBhbmQgbG9vcCBiYWNrIGZvciBhbm90aGVyIGludm9jYXRpb24uXG4gICAgICAgICAgc3RhdGUgPSBjb250ZXh0LmRvbmVcbiAgICAgICAgICAgID8gR2VuU3RhdGVDb21wbGV0ZWRcbiAgICAgICAgICAgIDogR2VuU3RhdGVTdXNwZW5kZWRZaWVsZDtcblxuICAgICAgICAgIGlmIChyZWNvcmQuYXJnID09PSBDb250aW51ZVNlbnRpbmVsKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmFsdWU6IHJlY29yZC5hcmcsXG4gICAgICAgICAgICBkb25lOiBjb250ZXh0LmRvbmVcbiAgICAgICAgICB9O1xuXG4gICAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVDb21wbGV0ZWQ7XG4gICAgICAgICAgLy8gRGlzcGF0Y2ggdGhlIGV4Y2VwdGlvbiBieSBsb29waW5nIGJhY2sgYXJvdW5kIHRvIHRoZVxuICAgICAgICAgIC8vIGNvbnRleHQuZGlzcGF0Y2hFeGNlcHRpb24oY29udGV4dC5hcmcpIGNhbGwgYWJvdmUuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIC8vIENhbGwgZGVsZWdhdGUuaXRlcmF0b3JbY29udGV4dC5tZXRob2RdKGNvbnRleHQuYXJnKSBhbmQgaGFuZGxlIHRoZVxuICAvLyByZXN1bHQsIGVpdGhlciBieSByZXR1cm5pbmcgYSB7IHZhbHVlLCBkb25lIH0gcmVzdWx0IGZyb20gdGhlXG4gIC8vIGRlbGVnYXRlIGl0ZXJhdG9yLCBvciBieSBtb2RpZnlpbmcgY29udGV4dC5tZXRob2QgYW5kIGNvbnRleHQuYXJnLFxuICAvLyBzZXR0aW5nIGNvbnRleHQuZGVsZWdhdGUgdG8gbnVsbCwgYW5kIHJldHVybmluZyB0aGUgQ29udGludWVTZW50aW5lbC5cbiAgZnVuY3Rpb24gbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCkge1xuICAgIHZhciBtZXRob2QgPSBkZWxlZ2F0ZS5pdGVyYXRvcltjb250ZXh0Lm1ldGhvZF07XG4gICAgaWYgKG1ldGhvZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAvLyBBIC50aHJvdyBvciAucmV0dXJuIHdoZW4gdGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGhhcyBubyAudGhyb3dcbiAgICAgIC8vIG1ldGhvZCBhbHdheXMgdGVybWluYXRlcyB0aGUgeWllbGQqIGxvb3AuXG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgLy8gTm90ZTogW1wicmV0dXJuXCJdIG11c3QgYmUgdXNlZCBmb3IgRVMzIHBhcnNpbmcgY29tcGF0aWJpbGl0eS5cbiAgICAgICAgaWYgKGRlbGVnYXRlLml0ZXJhdG9yW1wicmV0dXJuXCJdKSB7XG4gICAgICAgICAgLy8gSWYgdGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGhhcyBhIHJldHVybiBtZXRob2QsIGdpdmUgaXQgYVxuICAgICAgICAgIC8vIGNoYW5jZSB0byBjbGVhbiB1cC5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwicmV0dXJuXCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCk7XG5cbiAgICAgICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgICAgLy8gSWYgbWF5YmVJbnZva2VEZWxlZ2F0ZShjb250ZXh0KSBjaGFuZ2VkIGNvbnRleHQubWV0aG9kIGZyb21cbiAgICAgICAgICAgIC8vIFwicmV0dXJuXCIgdG8gXCJ0aHJvd1wiLCBsZXQgdGhhdCBvdmVycmlkZSB0aGUgVHlwZUVycm9yIGJlbG93LlxuICAgICAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICAgIGNvbnRleHQuYXJnID0gbmV3IFR5cGVFcnJvcihcbiAgICAgICAgICBcIlRoZSBpdGVyYXRvciBkb2VzIG5vdCBwcm92aWRlIGEgJ3Rocm93JyBtZXRob2RcIik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChtZXRob2QsIGRlbGVnYXRlLml0ZXJhdG9yLCBjb250ZXh0LmFyZyk7XG5cbiAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICBjb250ZXh0LmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIHZhciBpbmZvID0gcmVjb3JkLmFyZztcblxuICAgIGlmICghIGluZm8pIHtcbiAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgY29udGV4dC5hcmcgPSBuZXcgVHlwZUVycm9yKFwiaXRlcmF0b3IgcmVzdWx0IGlzIG5vdCBhbiBvYmplY3RcIik7XG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIGlmIChpbmZvLmRvbmUpIHtcbiAgICAgIC8vIEFzc2lnbiB0aGUgcmVzdWx0IG9mIHRoZSBmaW5pc2hlZCBkZWxlZ2F0ZSB0byB0aGUgdGVtcG9yYXJ5XG4gICAgICAvLyB2YXJpYWJsZSBzcGVjaWZpZWQgYnkgZGVsZWdhdGUucmVzdWx0TmFtZSAoc2VlIGRlbGVnYXRlWWllbGQpLlxuICAgICAgY29udGV4dFtkZWxlZ2F0ZS5yZXN1bHROYW1lXSA9IGluZm8udmFsdWU7XG5cbiAgICAgIC8vIFJlc3VtZSBleGVjdXRpb24gYXQgdGhlIGRlc2lyZWQgbG9jYXRpb24gKHNlZSBkZWxlZ2F0ZVlpZWxkKS5cbiAgICAgIGNvbnRleHQubmV4dCA9IGRlbGVnYXRlLm5leHRMb2M7XG5cbiAgICAgIC8vIElmIGNvbnRleHQubWV0aG9kIHdhcyBcInRocm93XCIgYnV0IHRoZSBkZWxlZ2F0ZSBoYW5kbGVkIHRoZVxuICAgICAgLy8gZXhjZXB0aW9uLCBsZXQgdGhlIG91dGVyIGdlbmVyYXRvciBwcm9jZWVkIG5vcm1hbGx5LiBJZlxuICAgICAgLy8gY29udGV4dC5tZXRob2Qgd2FzIFwibmV4dFwiLCBmb3JnZXQgY29udGV4dC5hcmcgc2luY2UgaXQgaGFzIGJlZW5cbiAgICAgIC8vIFwiY29uc3VtZWRcIiBieSB0aGUgZGVsZWdhdGUgaXRlcmF0b3IuIElmIGNvbnRleHQubWV0aG9kIHdhc1xuICAgICAgLy8gXCJyZXR1cm5cIiwgYWxsb3cgdGhlIG9yaWdpbmFsIC5yZXR1cm4gY2FsbCB0byBjb250aW51ZSBpbiB0aGVcbiAgICAgIC8vIG91dGVyIGdlbmVyYXRvci5cbiAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCAhPT0gXCJyZXR1cm5cIikge1xuICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBSZS15aWVsZCB0aGUgcmVzdWx0IHJldHVybmVkIGJ5IHRoZSBkZWxlZ2F0ZSBtZXRob2QuXG4gICAgICByZXR1cm4gaW5mbztcbiAgICB9XG5cbiAgICAvLyBUaGUgZGVsZWdhdGUgaXRlcmF0b3IgaXMgZmluaXNoZWQsIHNvIGZvcmdldCBpdCBhbmQgY29udGludWUgd2l0aFxuICAgIC8vIHRoZSBvdXRlciBnZW5lcmF0b3IuXG4gICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gIH1cblxuICAvLyBEZWZpbmUgR2VuZXJhdG9yLnByb3RvdHlwZS57bmV4dCx0aHJvdyxyZXR1cm59IGluIHRlcm1zIG9mIHRoZVxuICAvLyB1bmlmaWVkIC5faW52b2tlIGhlbHBlciBtZXRob2QuXG4gIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhHcCk7XG5cbiAgZGVmaW5lKEdwLCB0b1N0cmluZ1RhZ1N5bWJvbCwgXCJHZW5lcmF0b3JcIik7XG5cbiAgLy8gQSBHZW5lcmF0b3Igc2hvdWxkIGFsd2F5cyByZXR1cm4gaXRzZWxmIGFzIHRoZSBpdGVyYXRvciBvYmplY3Qgd2hlbiB0aGVcbiAgLy8gQEBpdGVyYXRvciBmdW5jdGlvbiBpcyBjYWxsZWQgb24gaXQuIFNvbWUgYnJvd3NlcnMnIGltcGxlbWVudGF0aW9ucyBvZiB0aGVcbiAgLy8gaXRlcmF0b3IgcHJvdG90eXBlIGNoYWluIGluY29ycmVjdGx5IGltcGxlbWVudCB0aGlzLCBjYXVzaW5nIHRoZSBHZW5lcmF0b3JcbiAgLy8gb2JqZWN0IHRvIG5vdCBiZSByZXR1cm5lZCBmcm9tIHRoaXMgY2FsbC4gVGhpcyBlbnN1cmVzIHRoYXQgZG9lc24ndCBoYXBwZW4uXG4gIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVnZW5lcmF0b3IvaXNzdWVzLzI3NCBmb3IgbW9yZSBkZXRhaWxzLlxuICBHcFtpdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBHcC50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBcIltvYmplY3QgR2VuZXJhdG9yXVwiO1xuICB9O1xuXG4gIGZ1bmN0aW9uIHB1c2hUcnlFbnRyeShsb2NzKSB7XG4gICAgdmFyIGVudHJ5ID0geyB0cnlMb2M6IGxvY3NbMF0gfTtcblxuICAgIGlmICgxIGluIGxvY3MpIHtcbiAgICAgIGVudHJ5LmNhdGNoTG9jID0gbG9jc1sxXTtcbiAgICB9XG5cbiAgICBpZiAoMiBpbiBsb2NzKSB7XG4gICAgICBlbnRyeS5maW5hbGx5TG9jID0gbG9jc1syXTtcbiAgICAgIGVudHJ5LmFmdGVyTG9jID0gbG9jc1szXTtcbiAgICB9XG5cbiAgICB0aGlzLnRyeUVudHJpZXMucHVzaChlbnRyeSk7XG4gIH1cblxuICBmdW5jdGlvbiByZXNldFRyeUVudHJ5KGVudHJ5KSB7XG4gICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb24gfHwge307XG4gICAgcmVjb3JkLnR5cGUgPSBcIm5vcm1hbFwiO1xuICAgIGRlbGV0ZSByZWNvcmQuYXJnO1xuICAgIGVudHJ5LmNvbXBsZXRpb24gPSByZWNvcmQ7XG4gIH1cblxuICBmdW5jdGlvbiBDb250ZXh0KHRyeUxvY3NMaXN0KSB7XG4gICAgLy8gVGhlIHJvb3QgZW50cnkgb2JqZWN0IChlZmZlY3RpdmVseSBhIHRyeSBzdGF0ZW1lbnQgd2l0aG91dCBhIGNhdGNoXG4gICAgLy8gb3IgYSBmaW5hbGx5IGJsb2NrKSBnaXZlcyB1cyBhIHBsYWNlIHRvIHN0b3JlIHZhbHVlcyB0aHJvd24gZnJvbVxuICAgIC8vIGxvY2F0aW9ucyB3aGVyZSB0aGVyZSBpcyBubyBlbmNsb3NpbmcgdHJ5IHN0YXRlbWVudC5cbiAgICB0aGlzLnRyeUVudHJpZXMgPSBbeyB0cnlMb2M6IFwicm9vdFwiIH1dO1xuICAgIHRyeUxvY3NMaXN0LmZvckVhY2gocHVzaFRyeUVudHJ5LCB0aGlzKTtcbiAgICB0aGlzLnJlc2V0KHRydWUpO1xuICB9XG5cbiAgZXhwb3J0cy5rZXlzID0gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgdmFyIGtleXMgPSBbXTtcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqZWN0KSB7XG4gICAgICBrZXlzLnB1c2goa2V5KTtcbiAgICB9XG4gICAga2V5cy5yZXZlcnNlKCk7XG5cbiAgICAvLyBSYXRoZXIgdGhhbiByZXR1cm5pbmcgYW4gb2JqZWN0IHdpdGggYSBuZXh0IG1ldGhvZCwgd2Uga2VlcFxuICAgIC8vIHRoaW5ncyBzaW1wbGUgYW5kIHJldHVybiB0aGUgbmV4dCBmdW5jdGlvbiBpdHNlbGYuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICB3aGlsZSAoa2V5cy5sZW5ndGgpIHtcbiAgICAgICAgdmFyIGtleSA9IGtleXMucG9wKCk7XG4gICAgICAgIGlmIChrZXkgaW4gb2JqZWN0KSB7XG4gICAgICAgICAgbmV4dC52YWx1ZSA9IGtleTtcbiAgICAgICAgICBuZXh0LmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBUbyBhdm9pZCBjcmVhdGluZyBhbiBhZGRpdGlvbmFsIG9iamVjdCwgd2UganVzdCBoYW5nIHRoZSAudmFsdWVcbiAgICAgIC8vIGFuZCAuZG9uZSBwcm9wZXJ0aWVzIG9mZiB0aGUgbmV4dCBmdW5jdGlvbiBvYmplY3QgaXRzZWxmLiBUaGlzXG4gICAgICAvLyBhbHNvIGVuc3VyZXMgdGhhdCB0aGUgbWluaWZpZXIgd2lsbCBub3QgYW5vbnltaXplIHRoZSBmdW5jdGlvbi5cbiAgICAgIG5leHQuZG9uZSA9IHRydWU7XG4gICAgICByZXR1cm4gbmV4dDtcbiAgICB9O1xuICB9O1xuXG4gIGZ1bmN0aW9uIHZhbHVlcyhpdGVyYWJsZSkge1xuICAgIGlmIChpdGVyYWJsZSkge1xuICAgICAgdmFyIGl0ZXJhdG9yTWV0aG9kID0gaXRlcmFibGVbaXRlcmF0b3JTeW1ib2xdO1xuICAgICAgaWYgKGl0ZXJhdG9yTWV0aG9kKSB7XG4gICAgICAgIHJldHVybiBpdGVyYXRvck1ldGhvZC5jYWxsKGl0ZXJhYmxlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBpdGVyYWJsZS5uZXh0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhYmxlO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWlzTmFOKGl0ZXJhYmxlLmxlbmd0aCkpIHtcbiAgICAgICAgdmFyIGkgPSAtMSwgbmV4dCA9IGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICAgICAgd2hpbGUgKCsraSA8IGl0ZXJhYmxlLmxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKGhhc093bi5jYWxsKGl0ZXJhYmxlLCBpKSkge1xuICAgICAgICAgICAgICBuZXh0LnZhbHVlID0gaXRlcmFibGVbaV07XG4gICAgICAgICAgICAgIG5leHQuZG9uZSA9IGZhbHNlO1xuICAgICAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBuZXh0LnZhbHVlID0gdW5kZWZpbmVkO1xuICAgICAgICAgIG5leHQuZG9uZSA9IHRydWU7XG5cbiAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gbmV4dC5uZXh0ID0gbmV4dDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBSZXR1cm4gYW4gaXRlcmF0b3Igd2l0aCBubyB2YWx1ZXMuXG4gICAgcmV0dXJuIHsgbmV4dDogZG9uZVJlc3VsdCB9O1xuICB9XG4gIGV4cG9ydHMudmFsdWVzID0gdmFsdWVzO1xuXG4gIGZ1bmN0aW9uIGRvbmVSZXN1bHQoKSB7XG4gICAgcmV0dXJuIHsgdmFsdWU6IHVuZGVmaW5lZCwgZG9uZTogdHJ1ZSB9O1xuICB9XG5cbiAgQ29udGV4dC5wcm90b3R5cGUgPSB7XG4gICAgY29uc3RydWN0b3I6IENvbnRleHQsXG5cbiAgICByZXNldDogZnVuY3Rpb24oc2tpcFRlbXBSZXNldCkge1xuICAgICAgdGhpcy5wcmV2ID0gMDtcbiAgICAgIHRoaXMubmV4dCA9IDA7XG4gICAgICAvLyBSZXNldHRpbmcgY29udGV4dC5fc2VudCBmb3IgbGVnYWN5IHN1cHBvcnQgb2YgQmFiZWwnc1xuICAgICAgLy8gZnVuY3Rpb24uc2VudCBpbXBsZW1lbnRhdGlvbi5cbiAgICAgIHRoaXMuc2VudCA9IHRoaXMuX3NlbnQgPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLmRvbmUgPSBmYWxzZTtcbiAgICAgIHRoaXMuZGVsZWdhdGUgPSBudWxsO1xuXG4gICAgICB0aGlzLm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgdGhpcy5hcmcgPSB1bmRlZmluZWQ7XG5cbiAgICAgIHRoaXMudHJ5RW50cmllcy5mb3JFYWNoKHJlc2V0VHJ5RW50cnkpO1xuXG4gICAgICBpZiAoIXNraXBUZW1wUmVzZXQpIHtcbiAgICAgICAgZm9yICh2YXIgbmFtZSBpbiB0aGlzKSB7XG4gICAgICAgICAgLy8gTm90IHN1cmUgYWJvdXQgdGhlIG9wdGltYWwgb3JkZXIgb2YgdGhlc2UgY29uZGl0aW9uczpcbiAgICAgICAgICBpZiAobmFtZS5jaGFyQXQoMCkgPT09IFwidFwiICYmXG4gICAgICAgICAgICAgIGhhc093bi5jYWxsKHRoaXMsIG5hbWUpICYmXG4gICAgICAgICAgICAgICFpc05hTigrbmFtZS5zbGljZSgxKSkpIHtcbiAgICAgICAgICAgIHRoaXNbbmFtZV0gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIHN0b3A6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5kb25lID0gdHJ1ZTtcblxuICAgICAgdmFyIHJvb3RFbnRyeSA9IHRoaXMudHJ5RW50cmllc1swXTtcbiAgICAgIHZhciByb290UmVjb3JkID0gcm9vdEVudHJ5LmNvbXBsZXRpb247XG4gICAgICBpZiAocm9vdFJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgdGhyb3cgcm9vdFJlY29yZC5hcmc7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLnJ2YWw7XG4gICAgfSxcblxuICAgIGRpc3BhdGNoRXhjZXB0aW9uOiBmdW5jdGlvbihleGNlcHRpb24pIHtcbiAgICAgIGlmICh0aGlzLmRvbmUpIHtcbiAgICAgICAgdGhyb3cgZXhjZXB0aW9uO1xuICAgICAgfVxuXG4gICAgICB2YXIgY29udGV4dCA9IHRoaXM7XG4gICAgICBmdW5jdGlvbiBoYW5kbGUobG9jLCBjYXVnaHQpIHtcbiAgICAgICAgcmVjb3JkLnR5cGUgPSBcInRocm93XCI7XG4gICAgICAgIHJlY29yZC5hcmcgPSBleGNlcHRpb247XG4gICAgICAgIGNvbnRleHQubmV4dCA9IGxvYztcblxuICAgICAgICBpZiAoY2F1Z2h0KSB7XG4gICAgICAgICAgLy8gSWYgdGhlIGRpc3BhdGNoZWQgZXhjZXB0aW9uIHdhcyBjYXVnaHQgYnkgYSBjYXRjaCBibG9jayxcbiAgICAgICAgICAvLyB0aGVuIGxldCB0aGF0IGNhdGNoIGJsb2NrIGhhbmRsZSB0aGUgZXhjZXB0aW9uIG5vcm1hbGx5LlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gISEgY2F1Z2h0O1xuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb247XG5cbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA9PT0gXCJyb290XCIpIHtcbiAgICAgICAgICAvLyBFeGNlcHRpb24gdGhyb3duIG91dHNpZGUgb2YgYW55IHRyeSBibG9jayB0aGF0IGNvdWxkIGhhbmRsZVxuICAgICAgICAgIC8vIGl0LCBzbyBzZXQgdGhlIGNvbXBsZXRpb24gdmFsdWUgb2YgdGhlIGVudGlyZSBmdW5jdGlvbiB0b1xuICAgICAgICAgIC8vIHRocm93IHRoZSBleGNlcHRpb24uXG4gICAgICAgICAgcmV0dXJuIGhhbmRsZShcImVuZFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPD0gdGhpcy5wcmV2KSB7XG4gICAgICAgICAgdmFyIGhhc0NhdGNoID0gaGFzT3duLmNhbGwoZW50cnksIFwiY2F0Y2hMb2NcIik7XG4gICAgICAgICAgdmFyIGhhc0ZpbmFsbHkgPSBoYXNPd24uY2FsbChlbnRyeSwgXCJmaW5hbGx5TG9jXCIpO1xuXG4gICAgICAgICAgaWYgKGhhc0NhdGNoICYmIGhhc0ZpbmFsbHkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCB0cnVlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIGlmIChoYXNDYXRjaCkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmNhdGNoTG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuY2F0Y2hMb2MsIHRydWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIGlmIChoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInRyeSBzdGF0ZW1lbnQgd2l0aG91dCBjYXRjaCBvciBmaW5hbGx5XCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBhYnJ1cHQ6IGZ1bmN0aW9uKHR5cGUsIGFyZykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPD0gdGhpcy5wcmV2ICYmXG4gICAgICAgICAgICBoYXNPd24uY2FsbChlbnRyeSwgXCJmaW5hbGx5TG9jXCIpICYmXG4gICAgICAgICAgICB0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgdmFyIGZpbmFsbHlFbnRyeSA9IGVudHJ5O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChmaW5hbGx5RW50cnkgJiZcbiAgICAgICAgICAodHlwZSA9PT0gXCJicmVha1wiIHx8XG4gICAgICAgICAgIHR5cGUgPT09IFwiY29udGludWVcIikgJiZcbiAgICAgICAgICBmaW5hbGx5RW50cnkudHJ5TG9jIDw9IGFyZyAmJlxuICAgICAgICAgIGFyZyA8PSBmaW5hbGx5RW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAvLyBJZ25vcmUgdGhlIGZpbmFsbHkgZW50cnkgaWYgY29udHJvbCBpcyBub3QganVtcGluZyB0byBhXG4gICAgICAgIC8vIGxvY2F0aW9uIG91dHNpZGUgdGhlIHRyeS9jYXRjaCBibG9jay5cbiAgICAgICAgZmluYWxseUVudHJ5ID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgdmFyIHJlY29yZCA9IGZpbmFsbHlFbnRyeSA/IGZpbmFsbHlFbnRyeS5jb21wbGV0aW9uIDoge307XG4gICAgICByZWNvcmQudHlwZSA9IHR5cGU7XG4gICAgICByZWNvcmQuYXJnID0gYXJnO1xuXG4gICAgICBpZiAoZmluYWxseUVudHJ5KSB7XG4gICAgICAgIHRoaXMubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgIHRoaXMubmV4dCA9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jO1xuICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuY29tcGxldGUocmVjb3JkKTtcbiAgICB9LFxuXG4gICAgY29tcGxldGU6IGZ1bmN0aW9uKHJlY29yZCwgYWZ0ZXJMb2MpIHtcbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHRocm93IHJlY29yZC5hcmc7XG4gICAgICB9XG5cbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJicmVha1wiIHx8XG4gICAgICAgICAgcmVjb3JkLnR5cGUgPT09IFwiY29udGludWVcIikge1xuICAgICAgICB0aGlzLm5leHQgPSByZWNvcmQuYXJnO1xuICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJyZXR1cm5cIikge1xuICAgICAgICB0aGlzLnJ2YWwgPSB0aGlzLmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICAgIHRoaXMubWV0aG9kID0gXCJyZXR1cm5cIjtcbiAgICAgICAgdGhpcy5uZXh0ID0gXCJlbmRcIjtcbiAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwibm9ybWFsXCIgJiYgYWZ0ZXJMb2MpIHtcbiAgICAgICAgdGhpcy5uZXh0ID0gYWZ0ZXJMb2M7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH0sXG5cbiAgICBmaW5pc2g6IGZ1bmN0aW9uKGZpbmFsbHlMb2MpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkuZmluYWxseUxvYyA9PT0gZmluYWxseUxvYykge1xuICAgICAgICAgIHRoaXMuY29tcGxldGUoZW50cnkuY29tcGxldGlvbiwgZW50cnkuYWZ0ZXJMb2MpO1xuICAgICAgICAgIHJlc2V0VHJ5RW50cnkoZW50cnkpO1xuICAgICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIFwiY2F0Y2hcIjogZnVuY3Rpb24odHJ5TG9jKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA9PT0gdHJ5TG9jKSB7XG4gICAgICAgICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb247XG4gICAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgIHZhciB0aHJvd24gPSByZWNvcmQuYXJnO1xuICAgICAgICAgICAgcmVzZXRUcnlFbnRyeShlbnRyeSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0aHJvd247XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gVGhlIGNvbnRleHQuY2F0Y2ggbWV0aG9kIG11c3Qgb25seSBiZSBjYWxsZWQgd2l0aCBhIGxvY2F0aW9uXG4gICAgICAvLyBhcmd1bWVudCB0aGF0IGNvcnJlc3BvbmRzIHRvIGEga25vd24gY2F0Y2ggYmxvY2suXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpbGxlZ2FsIGNhdGNoIGF0dGVtcHRcIik7XG4gICAgfSxcblxuICAgIGRlbGVnYXRlWWllbGQ6IGZ1bmN0aW9uKGl0ZXJhYmxlLCByZXN1bHROYW1lLCBuZXh0TG9jKSB7XG4gICAgICB0aGlzLmRlbGVnYXRlID0ge1xuICAgICAgICBpdGVyYXRvcjogdmFsdWVzKGl0ZXJhYmxlKSxcbiAgICAgICAgcmVzdWx0TmFtZTogcmVzdWx0TmFtZSxcbiAgICAgICAgbmV4dExvYzogbmV4dExvY1xuICAgICAgfTtcblxuICAgICAgaWYgKHRoaXMubWV0aG9kID09PSBcIm5leHRcIikge1xuICAgICAgICAvLyBEZWxpYmVyYXRlbHkgZm9yZ2V0IHRoZSBsYXN0IHNlbnQgdmFsdWUgc28gdGhhdCB3ZSBkb24ndFxuICAgICAgICAvLyBhY2NpZGVudGFsbHkgcGFzcyBpdCBvbiB0byB0aGUgZGVsZWdhdGUuXG4gICAgICAgIHRoaXMuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG4gIH07XG5cbiAgLy8gUmVnYXJkbGVzcyBvZiB3aGV0aGVyIHRoaXMgc2NyaXB0IGlzIGV4ZWN1dGluZyBhcyBhIENvbW1vbkpTIG1vZHVsZVxuICAvLyBvciBub3QsIHJldHVybiB0aGUgcnVudGltZSBvYmplY3Qgc28gdGhhdCB3ZSBjYW4gZGVjbGFyZSB0aGUgdmFyaWFibGVcbiAgLy8gcmVnZW5lcmF0b3JSdW50aW1lIGluIHRoZSBvdXRlciBzY29wZSwgd2hpY2ggYWxsb3dzIHRoaXMgbW9kdWxlIHRvIGJlXG4gIC8vIGluamVjdGVkIGVhc2lseSBieSBgYmluL3JlZ2VuZXJhdG9yIC0taW5jbHVkZS1ydW50aW1lIHNjcmlwdC5qc2AuXG4gIHJldHVybiBleHBvcnRzO1xuXG59KFxuICAvLyBJZiB0aGlzIHNjcmlwdCBpcyBleGVjdXRpbmcgYXMgYSBDb21tb25KUyBtb2R1bGUsIHVzZSBtb2R1bGUuZXhwb3J0c1xuICAvLyBhcyB0aGUgcmVnZW5lcmF0b3JSdW50aW1lIG5hbWVzcGFjZS4gT3RoZXJ3aXNlIGNyZWF0ZSBhIG5ldyBlbXB0eVxuICAvLyBvYmplY3QuIEVpdGhlciB3YXksIHRoZSByZXN1bHRpbmcgb2JqZWN0IHdpbGwgYmUgdXNlZCB0byBpbml0aWFsaXplXG4gIC8vIHRoZSByZWdlbmVyYXRvclJ1bnRpbWUgdmFyaWFibGUgYXQgdGhlIHRvcCBvZiB0aGlzIGZpbGUuXG4gIHR5cGVvZiBtb2R1bGUgPT09IFwib2JqZWN0XCIgPyBtb2R1bGUuZXhwb3J0cyA6IHt9XG4pKTtcblxudHJ5IHtcbiAgcmVnZW5lcmF0b3JSdW50aW1lID0gcnVudGltZTtcbn0gY2F0Y2ggKGFjY2lkZW50YWxTdHJpY3RNb2RlKSB7XG4gIC8vIFRoaXMgbW9kdWxlIHNob3VsZCBub3QgYmUgcnVubmluZyBpbiBzdHJpY3QgbW9kZSwgc28gdGhlIGFib3ZlXG4gIC8vIGFzc2lnbm1lbnQgc2hvdWxkIGFsd2F5cyB3b3JrIHVubGVzcyBzb21ldGhpbmcgaXMgbWlzY29uZmlndXJlZC4gSnVzdFxuICAvLyBpbiBjYXNlIHJ1bnRpbWUuanMgYWNjaWRlbnRhbGx5IHJ1bnMgaW4gc3RyaWN0IG1vZGUsIHdlIGNhbiBlc2NhcGVcbiAgLy8gc3RyaWN0IG1vZGUgdXNpbmcgYSBnbG9iYWwgRnVuY3Rpb24gY2FsbC4gVGhpcyBjb3VsZCBjb25jZWl2YWJseSBmYWlsXG4gIC8vIGlmIGEgQ29udGVudCBTZWN1cml0eSBQb2xpY3kgZm9yYmlkcyB1c2luZyBGdW5jdGlvbiwgYnV0IGluIHRoYXQgY2FzZVxuICAvLyB0aGUgcHJvcGVyIHNvbHV0aW9uIGlzIHRvIGZpeCB0aGUgYWNjaWRlbnRhbCBzdHJpY3QgbW9kZSBwcm9ibGVtLiBJZlxuICAvLyB5b3UndmUgbWlzY29uZmlndXJlZCB5b3VyIGJ1bmRsZXIgdG8gZm9yY2Ugc3RyaWN0IG1vZGUgYW5kIGFwcGxpZWQgYVxuICAvLyBDU1AgdG8gZm9yYmlkIEZ1bmN0aW9uLCBhbmQgeW91J3JlIG5vdCB3aWxsaW5nIHRvIGZpeCBlaXRoZXIgb2YgdGhvc2VcbiAgLy8gcHJvYmxlbXMsIHBsZWFzZSBkZXRhaWwgeW91ciB1bmlxdWUgcHJlZGljYW1lbnQgaW4gYSBHaXRIdWIgaXNzdWUuXG4gIEZ1bmN0aW9uKFwiclwiLCBcInJlZ2VuZXJhdG9yUnVudGltZSA9IHJcIikocnVudGltZSk7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9