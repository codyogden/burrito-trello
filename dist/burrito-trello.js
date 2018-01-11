var BurritoTrello = (function () {
'use strict';

var bind = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
var isBuffer_1 = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
};

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

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
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

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
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

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
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

var utils = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer_1,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim
};

var normalizeHeaderName = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};

/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
var enhanceError = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }
  error.request = request;
  error.response = response;
  return error;
};

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
var createError = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
var settle = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  // Note: status is not exposed by XDomainRequest
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
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
 * @returns {string} The formatted url
 */
var buildURL = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      }

      if (!utils.isArray(val)) {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

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
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
var parseHeaders = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};

var isURLSameOrigin = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  (function standardBrowserEnv() {
    var msie = /(msie|trident)/i.test(navigator.userAgent);
    var urlParsingNode = document.createElement('a');
    var originURL;

    /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
    function resolveURL(url) {
      var href = url;

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
      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
      return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
    };
  })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  })()
);

// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function E() {
  this.message = 'String contains an invalid character';
}
E.prototype = new Error;
E.prototype.code = 5;
E.prototype.name = 'InvalidCharacterError';

function btoa$1(input) {
  var str = String(input);
  var output = '';
  for (
    // initialize result and counter
    var block, charCode, idx = 0, map = chars;
    // if the next str index does not exist:
    //   change the mapping table to "="
    //   check if d has no fractional digits
    str.charAt(idx | 0) || (map = '=', idx % 1);
    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
  ) {
    charCode = str.charCodeAt(idx += 3 / 4);
    if (charCode > 0xFF) {
      throw new E();
    }
    block = block << 8 | charCode;
  }
  return output;
}

var btoa_1 = btoa$1;

var cookies = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
  (function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path, domain, secure) {
        var cookie = [];
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
        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
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
  })()
);

var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || btoa_1;

var xhr = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();
    var loadEvent = 'onreadystatechange';
    var xDomain = false;

    // For IE 8/9 CORS support
    // Only supports POST and GET calls and doesn't returns the response headers.
    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
    if ("production" !== 'test' &&
        typeof window !== 'undefined' &&
        window.XDomainRequest && !('withCredentials' in request) &&
        !isURLSameOrigin(config.url)) {
      request = new window.XDomainRequest();
      loadEvent = 'onload';
      xDomain = true;
      request.onprogress = function handleProgress() {};
      request.ontimeout = function handleTimeout() {};
    }

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request[loadEvent] = function handleLoad() {
      if (!request || (request.readyState !== 4 && !xDomain)) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        // IE sends 1223 instead of 204 (https://github.com/axios/axios/issues/201)
        status: request.status === 1223 ? 204 : request.status,
        statusText: request.status === 1223 ? 'No Content' : request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies$$1 = cookies;

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
          cookies$$1.read(config.xsrfCookieName) :
          undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = xhr;
  } else if (typeof process !== 'undefined') {
    // For node use HTTP adapter
    adapter = xhr;
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
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
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

var defaults_1 = defaults;

function InterceptorManager() {
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
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

var InterceptorManager_1 = InterceptorManager;

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
var transformData = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};

var isCancel = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};

/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
var isAbsoluteURL = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};

/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
var combineURLs = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
var dispatchRequest = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults_1.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager_1(),
    response: new InterceptorManager_1()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = utils.merge({
      url: arguments[0]
    }, arguments[1]);
  }

  config = utils.merge(defaults_1, this.defaults, { method: 'get' }, config);
  config.method = config.method.toLowerCase();

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

var Axios_1 = Axios;

/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

var Cancel_1 = Cancel;

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel_1(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

var CancelToken_1 = CancelToken;

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
 * @returns {Function}
 */
var spread = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios_1(defaultConfig);
  var instance = bind(Axios_1.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios_1.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios$2 = createInstance(defaults_1);

// Expose Axios class to allow class inheritance
axios$2.Axios = Axios_1;

// Factory for creating new instances
axios$2.create = function create(instanceConfig) {
  return createInstance(utils.merge(defaults_1, instanceConfig));
};

// Expose Cancel & CancelToken
axios$2.Cancel = Cancel_1;
axios$2.CancelToken = CancelToken_1;
axios$2.isCancel = isCancel;

// Expose all/spread
axios$2.all = function all(promises) {
  return Promise.all(promises);
};
axios$2.spread = spread;

var axios_1 = axios$2;

// Allow use of default import syntax in TypeScript
var default_1 = axios$2;

axios_1.default = default_1;

var axios = axios_1;

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();









var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var request = axios.create({
  baseURL: 'https://api.trello.com/1'
});

/**
 * @class Interface
 * @name Interface
 * @classdesc HTTP Request interface with some Trello-specific helper methods.
 */

var Interface = function () {
  function Interface(settingsObj) {
    classCallCheck(this, Interface);

    this.trelloKey = settingsObj.trelloKey || null;
    this.trelloToken = settingsObj.trelloToken || null;
    /**
     * Interface Error Handler
     * @param {any} err Response with error.
     * @return {RequestError}
     */
    /**
     * @typedef {Object} RequestError
     * @property {number} status HTTP Status Code.
     * @property {(string|null)} statusText Text HTTP Status Text.
     * @property {(any|string|null)} data Trello API response.
     */
    this.error = function (err) {
      return {
        error: {
          status: err.response.status,
          statusText: err.response.statusText,
          data: err.response.data
        }
      };
    };
  }

  /**
   * Query Parameters Constructor
   * @param {any} params Object to be included as URL query parameters.
   * @return {string} URL query parameters as string.
   */


  createClass(Interface, [{
    key: 'queryParams',
    value: function queryParams(params) {
      var data = params !== undefined ? params : {};
      data.key = !data.key ? this.trelloKey : data.key;
      data.token = !data.token ? this.trelloToken : data.token;
      if (!data.key) throw Error('Developer key must be set on each request (via parameters) or set upon construction.');
      if (!data.token) throw Error('Authorization token must be set on each request (via parameters) or set upon construction.');
      return '?' + Object.keys(data).map(function (key) {
        return [key, data[key]].map(encodeURIComponent).join('=');
      }).join('&');
    }

    /**
     * URL Constructor
     * @param {string} endpoint Trello API endpoing as string.
     * @param {any} params Object to be included as URL query parameters.
     */

  }, {
    key: 'url',
    value: function url(endpoint, params) {
      return '' + endpoint + this.queryParams(params);
    }

    /**
     * Batch GET Request
     * @param {array} endpoints Array of valid Trello API endpoints.
     */

  }, {
    key: 'batch',
    value: function batch(endpoints) {
      return this.get('/batch', { urls: endpoints.join(',') });
    }

    /**
     * GET Request Handler
     * @param {string} endpoint Trello API endpoing as string.
     * @param {any} params Object to be included as URL query parameters.
     */

  }, {
    key: 'get',
    value: function get$$1(endpoint, params) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        request.get(_this.url(endpoint, params)).then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          return reject(_this.error(error));
        });
      });
    }

    /**
     * POST Request Handler
     * @param {string} endpoint Trello API endpoing as string.
     * @param {any} params Object to be included as URL query parameters.
     * @param {any} dataObj Request body.
     */

  }, {
    key: 'post',
    value: function post(endpoint, params) {
      var _this2 = this;

      var dataObj = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      return new Promise(function (resolve, reject) {
        request.post(_this2.url(endpoint, params), dataObj).then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          return reject(_this2.error(error));
        });
      });
    }

    /**
     * PUT Request Handler
     * @param {string} endpoint Trello API endpoing as string.
     * @param {any} params Object to be included as URL query parameters.
     * @param {any} dataObj Request body.
     */

  }, {
    key: 'put',
    value: function put(endpoint, params) {
      var _this3 = this;

      var dataObj = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      return new Promise(function (resolve, reject) {
        request.put(_this3.url(endpoint, params), dataObj).then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          return reject(_this3.error(error));
        });
      });
    }

    /**
     * DELETE Request Handler
     * @param {string} endpoint Trello API endpoing as string.
     * @param {any} params Object to be included as URL query parameters.
     */

  }, {
    key: 'delete',
    value: function _delete(endpoint, params) {
      var _this4 = this;

      return new Promise(function (resolve, reject) {
        request.delete(_this4.url(endpoint, params)).then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          return reject(_this4.error(error));
        });
      });
    }
  }]);
  return Interface;
}();

var Interface_1 = Interface;

/**
 * @class Trello
 */

var Trello = function (_Interface) {
  inherits(Trello, _Interface);

  function Trello() {
    classCallCheck(this, Trello);
    return possibleConstructorReturn(this, (Trello.__proto__ || Object.getPrototypeOf(Trello)).apply(this, arguments));
  }

  createClass(Trello, [{
    key: 'tokens',

    /**
     * Tokens Handler
     * @param {string} idToken Required. Trello API Token
     * @return {tokens}
     */
    value: function tokens(idToken) {
      var _this2 = this;

      /** @namespace tokens */
      var methods = {
        /**
         * @memberof tokens
         * @method info
         * -- Retrieves information about the token.
         * @return {Promise}
         */
        info: function info() {
          return _this2.get('/tokens/' + idToken);
        },

        /**
         * @memberof tokens
         * @method member
         * -- Retrieves member model of token's owner.
         * @return {Promise}
         */
        member: function member() {
          return _this2.get('/tokens/' + idToken + '/member');
        }
      };

      return methods;
    }

    /**
     * Boards Routes
     * @param {string} idBoard Board ID.
     * @return {boards}
     */

  }, {
    key: 'boards',
    value: function boards(idBoard) {
      var _this3 = this;

      /** @namespace boards */
      var methods = {
        /**
         * @memberof boards
         * @method actions
         * @name actions
         * -- Retrieves a board's actions.
         * @return {Promise}
         */
        actions: function actions() {
          return _this3.get('/boards/' + idBoard + '/actions');
        },

        /**
         * @memberof boards
         * @method cards
         * -- Retrieves all cards on the board.
         * @param {string} [idCardOrFilter = false]
         * -- Card ID or filter: all, closed, none, open, visible.
         * @return {Promise}
         */
        cards: function cards() {
          var idCardOrFilter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
          return _this3.get('/boards/' + idBoard + '/cards' + (idCardOrFilter ? '/' + idCardOrFilter : ''));
        },

        /**
         * @memberof boards
         * @method info
         * -- Retrieves the board information.
         * @param {string} [field = false]
         * -- Choose a specific field.
         * @return {Promise}
         */
        info: function info() {
          var field = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
          return _this3.get('/boards/' + idBoard + (field ? '/' + field : ''));
        },

        /**
         * @memberof boards
         * @method labels
         * -- Retrieves board's labels.
         * @return {Promise}
         */
        labels: function labels() {
          return _this3.get('/boards/' + idBoard + '/labels');
        },

        /**
         * @memberof boards
         * @method lists
         * -- Retrieves board's lists.
         * @param {string} [filter = false]
         * -- One of `all`, `closed`, `none`, `open`.
         * @return {Promise}
         */
        lists: function lists() {
          var filter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
          return _this3.get('/boards/' + idBoard + '/lists' + (filter ? '/' + filter : ''));
        },

        /**
         * @memberof boards
         * @method members
         * -- Retrieves board's members.
         * @return {Promise}
         */
        members: function members() {
          return _this3.get('/boards/' + idBoard + '/members');
        },

        /**
         * @memberof boards
         * @method memberships
         * -- Retrieve's a board's membership information.
         * @param {any} [params = {}] Object to be included as URL query parameters.
         * @return {Promise}
         */
        memberships: function memberships() {
          var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          return _this3.get('/boards/' + idBoard + '/memberships', params);
        }
      };
      return methods;
    }

    /**
     * Lists
     * @param {string} idList Required. List ID.
     */

  }, {
    key: 'lists',
    value: function lists(idList) {
      var _this4 = this;

      /** @namespace lists */
      var methods = {
        /**
         * @memberof lists
         * @method info
         * @name List Information
         * -- Retrieves a list's information
         * @param {string} [field = false]
         * -- Retrieve a single field.
         * @return {Promise}
         */
        info: function info() {
          var field = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
          return _this4.get('/lists/' + idList + (field ? '/' + field : ''));
        },

        /**
         * @memberof lists
         * @method actions
         * @name Actions
         * -- Retrieve list's actions.
         * @return {Promise}
         */
        actions: function actions() {
          return _this4.get('/lists/' + idList + '/actions');
        },

        /**
         * @memberof lists
         * @method boards
         * @name Board Information
         * -- Retrieve list's board information.
         * @return {Promise}
         */
        board: function board() {
          return _this4.get('/lists/' + idList + '/board');
        },

        /**
         * @memberof lists
         * @method cards
         * @name Cards
         * -- Retrieve all cards in the list.
         * @return {Promise}
         */
        cards: function cards() {
          return _this4.get('/lists/' + idList + '/cards');
        }
      };

      return methods;
    }

    /**
     * Cards
     * @param {string} idCard
     */

  }, {
    key: 'cards',
    value: function cards(idCard) {
      var _this5 = this;

      /** @namespace cards */
      var methods = {
        /**
         * @memberof cards
         * @method actions
         * @name Actions
         * -- Retrieves card's actions.
         * @param {any} [params = {}] Object to be included as URL query parameters.
         * -- URL query parameters as string.
         * @return {Promise}
         */
        actions: function actions() {
          var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          return _this5.get('/cards/' + idCard + '/actions', params);
        },

        /**
         * @memberof cards
         * @method attachments
         * @name Attachments
         * -- Retrieves attachment information.
         * @param {string} [idAttachment = false]
         * -- Attachment ID
         * @return {Promise}
         */
        attachments: function attachments() {
          var idAttachment = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
          return _this5.get('/cards/' + idCard + '/attachments' + (idAttachment ? '/' + idAttachment : ''));
        },

        /**
         * @memberof cards
         * @method board
         * @name Board Information
         * -- Retrieves the card's board information.
         * @return {Promise}
         */
        board: function board() {
          return _this5.get('/cards/' + idCard + '/board');
        },

        /**
         * @memberof cards
         * @method info
         * @name Card Information
         * -- Retrieves card information.
         * @param {string} [field = false]
         * -- Retrieve a single field value.
         * @return {Promise}
         */
        info: function info() {
          var field = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
          return _this5.get('/cards/' + idCard + (field ? '/' + field : ''));
        },

        /**
         * @memberof cards
         * @method info
         * @name List Information
         * -- Retrieves card's list information.
         * @return {Promise}
         */
        list: function list() {
          return _this5.get('/cards/' + idCard + '/list');
        },
        /**
         * @memberof cards
         * @method members
         * @name Member Information
         * -- Retrieves mebmers assigned to the card.
         * @return {Promise}
         */
        members: function members() {
          return _this5.get('/cards/' + idCard + '/members');
        },

        /**
         * @memberof cards
         * @method comments
         * @name Comments
         * -- Retrieve card's comments.
         * @return {Promise}
         */
        comments: function comments() {
          return _this5.get('/cards/' + idCard + '/actions', { filter: 'commentCard' });
        },
        /**
         * @memberof cards
         * @method addComment
         * @name Add Comment
         * -- Add a comment to a card.
         * @param {string} comment
         * -- The comment string.
         * @return {Promise}
         */
        addComment: function addComment(comment) {
          return _this5.post('/cards/' + idCard + '/actions/comments', { text: comment });
        },
        /**
         * @memberof cards
         * @method addMember
         * @name Add Member
         * -- Add a member to a card.
         * @param {string} idMember
         * -- A member's ID
         * @return {Promise}
         */
        addMember: function addMember(idMember) {
          return _this5.post('/cards/' + idCard + '/idMembers', { value: idMember });
        },
        /**
         * @memberof cards
         * @method removeMember
         * @name Remove Member
         * -- Remvoe a member from the card.
         * @param {string} idMember
         * -- A member's ID
         * @return {Promise}
         */
        removeMember: function removeMember(idMember) {
          return _this5.delete('/cards/' + idCard + '/idMembers/' + idMember);
        }
      };
      return methods;
    }

    /**
     * Members
     * @param {string} idMember Member ID
     */

  }, {
    key: 'members',
    value: function members(idMember) {
      var _this6 = this;

      /** @namespace members */
      return {
        /**
         * @memberof members
         * @method info
         * @name Member Information
         * -- Retrieve a member's information.
         * @param {any} [params = {}] Object to be included as URL query parameters.
         * @return {Promise}
         */
        info: function info() {
          var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          return _this6.get('/members/' + idMember, params);
        },

        /**
         * @memberof members
         * @method actions
         * @name Member Actions
         * -- Retrieve member's actions.
         * @return {Promise}
         */
        actions: function actions() {
          return _this6.get('/members/' + idMember + '/actions');
        },

        /**
         * @memberof members
         * @method boards
         * @name Member Boards
         * -- Retrieve member's boards.
         * @return {Promise}
         */
        boards: function boards() {
          return _this6.get('/members/' + idMember + '/boards');
        },

        /**
         * @memberof members
         * @method cards
         * @name Member Cards
         * -- Retrieve member's cards.
         * @return {Promise}
         */
        cards: function cards() {
          return _this6.get('/members/' + idMember + '/cards');
        },

        /**
         * @memberof members
         * @method notifications
         * @name Member Notifications
         * -- Retrieve member's notifications.
         * @return {Promise}
         */
        notifications: function notifications() {
          return _this6.get('/members/' + idMember + '/notifications');
        },

        /**
         * @memberof members
         * @method organizations
         * @name Member Organizations
         * -- Retrieve member's organizations.
         * @return {Promise}
         */
        organizations: function organizations() {
          return _this6.get('/members/' + idMember + '/organizations');
        }
      };
    }

    /**
     * Notifications
     * @param {string} [idNotification = ''] Notification ID.
     */

  }, {
    key: 'notifications',
    value: function notifications() {
      var _this7 = this;

      var idNotification = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      /** @namespace notifications */
      var methods = {
        /**
         * @memberof notifications
         * @method info
         * @name Notification Information
         * -- Retrieve notification's actions.
         * @param {string} [field = false]
         * Retrieve only a certain field.
         * @param {any} [params = {}] Object to be included as URL query parameters.
         * @return {Promise}
         */
        info: function info() {
          var field = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
          var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          return _this7.get('/notifications/' + idNotification + (field ? '/' + field : ''), params);
        },

        /**
         * @memberof notifications
         * @method board
         * @name Board Information
         * -- Retrieve notification's board.
         * @param {any} [params = {}] Object to be included as URL query parameters.
         * @return {Promise}
         */
        board: function board() {
          var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          return _this7.get('/notifications/' + idNotification + '/board', params);
        },

        /**
         * @memberof notifications
         * @method list
         * @name List Information
         * -- Retrieve notification's list.
         * @param {any} [params = {}] Object to be included as URL query parameters.
         * @return {Promise}
         */
        list: function list() {
          var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          return _this7.get('/notifications/' + idNotification + '/list', params);
        },

        /**
         * @memberof notifications
         * @method member
         * @name Member Information
         * -- Retrieve notification's member.
         * @param {any} [params = {}] Object to be included as URL query parameters.
         * @return {Promise}
         */
        member: function member() {
          var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          return _this7.get('/notifications/' + idNotification + '/member', params);
        },

        /**
         * @memberof notifications
         * @method memberCreator
         * @name MemberCreator Information
         * -- Retrieve notification's memberCreator.
         * @param {any} [params = {}] Object to be included as URL query parameters.
         * @return {Promise}
         */
        memberCreator: function memberCreator() {
          var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          return _this7.get('/notifications/' + idNotification + '/memberCreator', params);
        },

        /**
         * @memberof notifications
         * @method organization
         * @name Organization Information
         * -- Retrieve notification's organization.
         * @param {any} [params = {}] Object to be included as URL query parameters.
         * @return {Promise}
         */
        organization: function organization() {
          var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          return _this7.get('/notifications/' + idNotification + '/organization', params);
        },

        /**
         * @memberof notifications
         * @method markAllAsRead
         * @name Mark All Notifications Read
         * -- Mark all Trello notifications as read.
         * @return {Promise}
         */
        markAllAsRead: function markAllAsRead() {
          return _this7.post('/notifications/all/read');
        },

        /**
         * @memberof notifications
         * @method markAsRead
         * @name Mark Notification as Read
         * -- Mark single Trello notifications as read.
         * @return {Promise}
         */
        markAsRead: function markAsRead() {
          return _this7.put('/notifications/' + idNotification, { unread: false });
        },

        /**
         * @memberof notifications
         * @method markAsUnread
         * @name Mark a notification as not read.
         * -- Mark all Trello notifications as unread.
         * @return {Promise}
         */
        markAsUnread: function markAsUnread() {
          return _this7.put('/notifications/' + idNotification, { unread: true });
        }
      };
      return methods;
    }

    /**
     * Trello Search
     * @param {*} query Globally searched string or Object with query parameters defined in Trello docs.
     */

  }, {
    key: 'search',
    value: function search(queryInput) {
      var query = queryInput;
      if (typeof query === 'string') {
        query = {
          query: query
        };
      }
      return this.get('/search', query);
    }

    /**
     * Search Members
     * @param {*} query
     */

  }, {
    key: 'searchMembers',
    value: function searchMembers(queryInput) {
      var query = queryInput;
      if (typeof query === 'string') {
        query = {
          query: query
        };
      }
      return this.get('/search/members', query);
    }
  }]);
  return Trello;
}(Interface_1);

var Trello_1 = Trello;

var trello = Trello_1;

return trello;

}());
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVycml0by10cmVsbG8uanMiLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9iaW5kLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2lzLWJ1ZmZlci9pbmRleC5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvdXRpbHMuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvbm9ybWFsaXplSGVhZGVyTmFtZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9lbmhhbmNlRXJyb3IuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvY3JlYXRlRXJyb3IuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvc2V0dGxlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2J1aWxkVVJMLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3BhcnNlSGVhZGVycy5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc1VSTFNhbWVPcmlnaW4uanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYnRvYS5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb29raWVzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9hZGFwdGVycy94aHIuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2RlZmF1bHRzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL0ludGVyY2VwdG9yTWFuYWdlci5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS90cmFuc2Zvcm1EYXRhLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvaXNDYW5jZWwuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvaXNBYnNvbHV0ZVVSTC5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb21iaW5lVVJMcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9kaXNwYXRjaFJlcXVlc3QuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvQXhpb3MuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NhbmNlbC9DYW5jZWwuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NhbmNlbC9DYW5jZWxUb2tlbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9zcHJlYWQuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2F4aW9zLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2luZGV4LmpzIiwiLi4vbGliL0ludGVyZmFjZS5qcyIsIi4uL2xpYi9UcmVsbG8uanMiLCIuLi9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYmluZChmbiwgdGhpc0FyZykge1xuICByZXR1cm4gZnVuY3Rpb24gd3JhcCgpIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGFyZ3NbaV0gPSBhcmd1bWVudHNbaV07XG4gICAgfVxuICAgIHJldHVybiBmbi5hcHBseSh0aGlzQXJnLCBhcmdzKTtcbiAgfTtcbn07XG4iLCIvKiFcbiAqIERldGVybWluZSBpZiBhbiBvYmplY3QgaXMgYSBCdWZmZXJcbiAqXG4gKiBAYXV0aG9yICAgRmVyb3NzIEFib3VraGFkaWplaCA8aHR0cHM6Ly9mZXJvc3Mub3JnPlxuICogQGxpY2Vuc2UgIE1JVFxuICovXG5cbi8vIFRoZSBfaXNCdWZmZXIgY2hlY2sgaXMgZm9yIFNhZmFyaSA1LTcgc3VwcG9ydCwgYmVjYXVzZSBpdCdzIG1pc3Npbmdcbi8vIE9iamVjdC5wcm90b3R5cGUuY29uc3RydWN0b3IuIFJlbW92ZSB0aGlzIGV2ZW50dWFsbHlcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iaikge1xuICByZXR1cm4gb2JqICE9IG51bGwgJiYgKGlzQnVmZmVyKG9iaikgfHwgaXNTbG93QnVmZmVyKG9iaikgfHwgISFvYmouX2lzQnVmZmVyKVxufVxuXG5mdW5jdGlvbiBpc0J1ZmZlciAob2JqKSB7XG4gIHJldHVybiAhIW9iai5jb25zdHJ1Y3RvciAmJiB0eXBlb2Ygb2JqLmNvbnN0cnVjdG9yLmlzQnVmZmVyID09PSAnZnVuY3Rpb24nICYmIG9iai5jb25zdHJ1Y3Rvci5pc0J1ZmZlcihvYmopXG59XG5cbi8vIEZvciBOb2RlIHYwLjEwIHN1cHBvcnQuIFJlbW92ZSB0aGlzIGV2ZW50dWFsbHkuXG5mdW5jdGlvbiBpc1Nsb3dCdWZmZXIgKG9iaikge1xuICByZXR1cm4gdHlwZW9mIG9iai5yZWFkRmxvYXRMRSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2Ygb2JqLnNsaWNlID09PSAnZnVuY3Rpb24nICYmIGlzQnVmZmVyKG9iai5zbGljZSgwLCAwKSlcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGJpbmQgPSByZXF1aXJlKCcuL2hlbHBlcnMvYmluZCcpO1xudmFyIGlzQnVmZmVyID0gcmVxdWlyZSgnaXMtYnVmZmVyJyk7XG5cbi8qZ2xvYmFsIHRvU3RyaW5nOnRydWUqL1xuXG4vLyB1dGlscyBpcyBhIGxpYnJhcnkgb2YgZ2VuZXJpYyBoZWxwZXIgZnVuY3Rpb25zIG5vbi1zcGVjaWZpYyB0byBheGlvc1xuXG52YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIEFycmF5XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gQXJyYXksIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5KHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBBcnJheV0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIEFycmF5QnVmZmVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gQXJyYXlCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5QnVmZmVyKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBBcnJheUJ1ZmZlcl0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRm9ybURhdGFcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBGb3JtRGF0YSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRm9ybURhdGEodmFsKSB7XG4gIHJldHVybiAodHlwZW9mIEZvcm1EYXRhICE9PSAndW5kZWZpbmVkJykgJiYgKHZhbCBpbnN0YW5jZW9mIEZvcm1EYXRhKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIHZpZXcgb24gYW4gQXJyYXlCdWZmZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIHZpZXcgb24gYW4gQXJyYXlCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5QnVmZmVyVmlldyh2YWwpIHtcbiAgdmFyIHJlc3VsdDtcbiAgaWYgKCh0eXBlb2YgQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnKSAmJiAoQXJyYXlCdWZmZXIuaXNWaWV3KSkge1xuICAgIHJlc3VsdCA9IEFycmF5QnVmZmVyLmlzVmlldyh2YWwpO1xuICB9IGVsc2Uge1xuICAgIHJlc3VsdCA9ICh2YWwpICYmICh2YWwuYnVmZmVyKSAmJiAodmFsLmJ1ZmZlciBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgU3RyaW5nXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBTdHJpbmcsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N0cmluZyh2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgTnVtYmVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBOdW1iZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc051bWJlcih2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdudW1iZXInO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIHVuZGVmaW5lZFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSB2YWx1ZSBpcyB1bmRlZmluZWQsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1VuZGVmaW5lZCh2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIE9iamVjdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIE9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbCkge1xuICByZXR1cm4gdmFsICE9PSBudWxsICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRGF0ZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRGF0ZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRGF0ZSh2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgRGF0ZV0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRmlsZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRmlsZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRmlsZSh2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgRmlsZV0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgQmxvYlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgQmxvYiwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQmxvYih2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgQmxvYl0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRnVuY3Rpb25cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEZ1bmN0aW9uLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGdW5jdGlvbih2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFN0cmVhbVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgU3RyZWFtLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNTdHJlYW0odmFsKSB7XG4gIHJldHVybiBpc09iamVjdCh2YWwpICYmIGlzRnVuY3Rpb24odmFsLnBpcGUpO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgVVJMU2VhcmNoUGFyYW1zIG9iamVjdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgVVJMU2VhcmNoUGFyYW1zIG9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzVVJMU2VhcmNoUGFyYW1zKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIFVSTFNlYXJjaFBhcmFtcyAhPT0gJ3VuZGVmaW5lZCcgJiYgdmFsIGluc3RhbmNlb2YgVVJMU2VhcmNoUGFyYW1zO1xufVxuXG4vKipcbiAqIFRyaW0gZXhjZXNzIHdoaXRlc3BhY2Ugb2ZmIHRoZSBiZWdpbm5pbmcgYW5kIGVuZCBvZiBhIHN0cmluZ1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHIgVGhlIFN0cmluZyB0byB0cmltXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgU3RyaW5nIGZyZWVkIG9mIGV4Y2VzcyB3aGl0ZXNwYWNlXG4gKi9cbmZ1bmN0aW9uIHRyaW0oc3RyKSB7XG4gIHJldHVybiBzdHIucmVwbGFjZSgvXlxccyovLCAnJykucmVwbGFjZSgvXFxzKiQvLCAnJyk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIHdlJ3JlIHJ1bm5pbmcgaW4gYSBzdGFuZGFyZCBicm93c2VyIGVudmlyb25tZW50XG4gKlxuICogVGhpcyBhbGxvd3MgYXhpb3MgdG8gcnVuIGluIGEgd2ViIHdvcmtlciwgYW5kIHJlYWN0LW5hdGl2ZS5cbiAqIEJvdGggZW52aXJvbm1lbnRzIHN1cHBvcnQgWE1MSHR0cFJlcXVlc3QsIGJ1dCBub3QgZnVsbHkgc3RhbmRhcmQgZ2xvYmFscy5cbiAqXG4gKiB3ZWIgd29ya2VyczpcbiAqICB0eXBlb2Ygd2luZG93IC0+IHVuZGVmaW5lZFxuICogIHR5cGVvZiBkb2N1bWVudCAtPiB1bmRlZmluZWRcbiAqXG4gKiByZWFjdC1uYXRpdmU6XG4gKiAgbmF2aWdhdG9yLnByb2R1Y3QgLT4gJ1JlYWN0TmF0aXZlJ1xuICovXG5mdW5jdGlvbiBpc1N0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgaWYgKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIG5hdmlnYXRvci5wcm9kdWN0ID09PSAnUmVhY3ROYXRpdmUnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiAoXG4gICAgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnXG4gICk7XG59XG5cbi8qKlxuICogSXRlcmF0ZSBvdmVyIGFuIEFycmF5IG9yIGFuIE9iamVjdCBpbnZva2luZyBhIGZ1bmN0aW9uIGZvciBlYWNoIGl0ZW0uXG4gKlxuICogSWYgYG9iamAgaXMgYW4gQXJyYXkgY2FsbGJhY2sgd2lsbCBiZSBjYWxsZWQgcGFzc2luZ1xuICogdGhlIHZhbHVlLCBpbmRleCwgYW5kIGNvbXBsZXRlIGFycmF5IGZvciBlYWNoIGl0ZW0uXG4gKlxuICogSWYgJ29iaicgaXMgYW4gT2JqZWN0IGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkIHBhc3NpbmdcbiAqIHRoZSB2YWx1ZSwga2V5LCBhbmQgY29tcGxldGUgb2JqZWN0IGZvciBlYWNoIHByb3BlcnR5LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fEFycmF5fSBvYmogVGhlIG9iamVjdCB0byBpdGVyYXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgY2FsbGJhY2sgdG8gaW52b2tlIGZvciBlYWNoIGl0ZW1cbiAqL1xuZnVuY3Rpb24gZm9yRWFjaChvYmosIGZuKSB7XG4gIC8vIERvbid0IGJvdGhlciBpZiBubyB2YWx1ZSBwcm92aWRlZFxuICBpZiAob2JqID09PSBudWxsIHx8IHR5cGVvZiBvYmogPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gRm9yY2UgYW4gYXJyYXkgaWYgbm90IGFscmVhZHkgc29tZXRoaW5nIGl0ZXJhYmxlXG4gIGlmICh0eXBlb2Ygb2JqICE9PSAnb2JqZWN0Jykge1xuICAgIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICAgIG9iaiA9IFtvYmpdO1xuICB9XG5cbiAgaWYgKGlzQXJyYXkob2JqKSkge1xuICAgIC8vIEl0ZXJhdGUgb3ZlciBhcnJheSB2YWx1ZXNcbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IG9iai5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIGZuLmNhbGwobnVsbCwgb2JqW2ldLCBpLCBvYmopO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBJdGVyYXRlIG92ZXIgb2JqZWN0IGtleXNcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkge1xuICAgICAgICBmbi5jYWxsKG51bGwsIG9ialtrZXldLCBrZXksIG9iaik7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogQWNjZXB0cyB2YXJhcmdzIGV4cGVjdGluZyBlYWNoIGFyZ3VtZW50IHRvIGJlIGFuIG9iamVjdCwgdGhlblxuICogaW1tdXRhYmx5IG1lcmdlcyB0aGUgcHJvcGVydGllcyBvZiBlYWNoIG9iamVjdCBhbmQgcmV0dXJucyByZXN1bHQuXG4gKlxuICogV2hlbiBtdWx0aXBsZSBvYmplY3RzIGNvbnRhaW4gdGhlIHNhbWUga2V5IHRoZSBsYXRlciBvYmplY3QgaW5cbiAqIHRoZSBhcmd1bWVudHMgbGlzdCB3aWxsIHRha2UgcHJlY2VkZW5jZS5cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqIGBgYGpzXG4gKiB2YXIgcmVzdWx0ID0gbWVyZ2Uoe2ZvbzogMTIzfSwge2ZvbzogNDU2fSk7XG4gKiBjb25zb2xlLmxvZyhyZXN1bHQuZm9vKTsgLy8gb3V0cHV0cyA0NTZcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmoxIE9iamVjdCB0byBtZXJnZVxuICogQHJldHVybnMge09iamVjdH0gUmVzdWx0IG9mIGFsbCBtZXJnZSBwcm9wZXJ0aWVzXG4gKi9cbmZ1bmN0aW9uIG1lcmdlKC8qIG9iajEsIG9iajIsIG9iajMsIC4uLiAqLykge1xuICB2YXIgcmVzdWx0ID0ge307XG4gIGZ1bmN0aW9uIGFzc2lnblZhbHVlKHZhbCwga2V5KSB7XG4gICAgaWYgKHR5cGVvZiByZXN1bHRba2V5XSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHJlc3VsdFtrZXldID0gbWVyZ2UocmVzdWx0W2tleV0sIHZhbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdFtrZXldID0gdmFsO1xuICAgIH1cbiAgfVxuXG4gIGZvciAodmFyIGkgPSAwLCBsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIGZvckVhY2goYXJndW1lbnRzW2ldLCBhc3NpZ25WYWx1ZSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBFeHRlbmRzIG9iamVjdCBhIGJ5IG11dGFibHkgYWRkaW5nIHRvIGl0IHRoZSBwcm9wZXJ0aWVzIG9mIG9iamVjdCBiLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBhIFRoZSBvYmplY3QgdG8gYmUgZXh0ZW5kZWRcbiAqIEBwYXJhbSB7T2JqZWN0fSBiIFRoZSBvYmplY3QgdG8gY29weSBwcm9wZXJ0aWVzIGZyb21cbiAqIEBwYXJhbSB7T2JqZWN0fSB0aGlzQXJnIFRoZSBvYmplY3QgdG8gYmluZCBmdW5jdGlvbiB0b1xuICogQHJldHVybiB7T2JqZWN0fSBUaGUgcmVzdWx0aW5nIHZhbHVlIG9mIG9iamVjdCBhXG4gKi9cbmZ1bmN0aW9uIGV4dGVuZChhLCBiLCB0aGlzQXJnKSB7XG4gIGZvckVhY2goYiwgZnVuY3Rpb24gYXNzaWduVmFsdWUodmFsLCBrZXkpIHtcbiAgICBpZiAodGhpc0FyZyAmJiB0eXBlb2YgdmFsID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBhW2tleV0gPSBiaW5kKHZhbCwgdGhpc0FyZyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFba2V5XSA9IHZhbDtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gYTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGlzQXJyYXk6IGlzQXJyYXksXG4gIGlzQXJyYXlCdWZmZXI6IGlzQXJyYXlCdWZmZXIsXG4gIGlzQnVmZmVyOiBpc0J1ZmZlcixcbiAgaXNGb3JtRGF0YTogaXNGb3JtRGF0YSxcbiAgaXNBcnJheUJ1ZmZlclZpZXc6IGlzQXJyYXlCdWZmZXJWaWV3LFxuICBpc1N0cmluZzogaXNTdHJpbmcsXG4gIGlzTnVtYmVyOiBpc051bWJlcixcbiAgaXNPYmplY3Q6IGlzT2JqZWN0LFxuICBpc1VuZGVmaW5lZDogaXNVbmRlZmluZWQsXG4gIGlzRGF0ZTogaXNEYXRlLFxuICBpc0ZpbGU6IGlzRmlsZSxcbiAgaXNCbG9iOiBpc0Jsb2IsXG4gIGlzRnVuY3Rpb246IGlzRnVuY3Rpb24sXG4gIGlzU3RyZWFtOiBpc1N0cmVhbSxcbiAgaXNVUkxTZWFyY2hQYXJhbXM6IGlzVVJMU2VhcmNoUGFyYW1zLFxuICBpc1N0YW5kYXJkQnJvd3NlckVudjogaXNTdGFuZGFyZEJyb3dzZXJFbnYsXG4gIGZvckVhY2g6IGZvckVhY2gsXG4gIG1lcmdlOiBtZXJnZSxcbiAgZXh0ZW5kOiBleHRlbmQsXG4gIHRyaW06IHRyaW1cbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbm9ybWFsaXplSGVhZGVyTmFtZShoZWFkZXJzLCBub3JtYWxpemVkTmFtZSkge1xuICB1dGlscy5mb3JFYWNoKGhlYWRlcnMsIGZ1bmN0aW9uIHByb2Nlc3NIZWFkZXIodmFsdWUsIG5hbWUpIHtcbiAgICBpZiAobmFtZSAhPT0gbm9ybWFsaXplZE5hbWUgJiYgbmFtZS50b1VwcGVyQ2FzZSgpID09PSBub3JtYWxpemVkTmFtZS50b1VwcGVyQ2FzZSgpKSB7XG4gICAgICBoZWFkZXJzW25vcm1hbGl6ZWROYW1lXSA9IHZhbHVlO1xuICAgICAgZGVsZXRlIGhlYWRlcnNbbmFtZV07XG4gICAgfVxuICB9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogVXBkYXRlIGFuIEVycm9yIHdpdGggdGhlIHNwZWNpZmllZCBjb25maWcsIGVycm9yIGNvZGUsIGFuZCByZXNwb25zZS5cbiAqXG4gKiBAcGFyYW0ge0Vycm9yfSBlcnJvciBUaGUgZXJyb3IgdG8gdXBkYXRlLlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnLlxuICogQHBhcmFtIHtzdHJpbmd9IFtjb2RlXSBUaGUgZXJyb3IgY29kZSAoZm9yIGV4YW1wbGUsICdFQ09OTkFCT1JURUQnKS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVxdWVzdF0gVGhlIHJlcXVlc3QuXG4gKiBAcGFyYW0ge09iamVjdH0gW3Jlc3BvbnNlXSBUaGUgcmVzcG9uc2UuXG4gKiBAcmV0dXJucyB7RXJyb3J9IFRoZSBlcnJvci5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBlbmhhbmNlRXJyb3IoZXJyb3IsIGNvbmZpZywgY29kZSwgcmVxdWVzdCwgcmVzcG9uc2UpIHtcbiAgZXJyb3IuY29uZmlnID0gY29uZmlnO1xuICBpZiAoY29kZSkge1xuICAgIGVycm9yLmNvZGUgPSBjb2RlO1xuICB9XG4gIGVycm9yLnJlcXVlc3QgPSByZXF1ZXN0O1xuICBlcnJvci5yZXNwb25zZSA9IHJlc3BvbnNlO1xuICByZXR1cm4gZXJyb3I7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZW5oYW5jZUVycm9yID0gcmVxdWlyZSgnLi9lbmhhbmNlRXJyb3InKTtcblxuLyoqXG4gKiBDcmVhdGUgYW4gRXJyb3Igd2l0aCB0aGUgc3BlY2lmaWVkIG1lc3NhZ2UsIGNvbmZpZywgZXJyb3IgY29kZSwgcmVxdWVzdCBhbmQgcmVzcG9uc2UuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgVGhlIGVycm9yIG1lc3NhZ2UuXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIFRoZSBjb25maWcuXG4gKiBAcGFyYW0ge3N0cmluZ30gW2NvZGVdIFRoZSBlcnJvciBjb2RlIChmb3IgZXhhbXBsZSwgJ0VDT05OQUJPUlRFRCcpLlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXF1ZXN0XSBUaGUgcmVxdWVzdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVzcG9uc2VdIFRoZSByZXNwb25zZS5cbiAqIEByZXR1cm5zIHtFcnJvcn0gVGhlIGNyZWF0ZWQgZXJyb3IuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY3JlYXRlRXJyb3IobWVzc2FnZSwgY29uZmlnLCBjb2RlLCByZXF1ZXN0LCByZXNwb25zZSkge1xuICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IobWVzc2FnZSk7XG4gIHJldHVybiBlbmhhbmNlRXJyb3IoZXJyb3IsIGNvbmZpZywgY29kZSwgcmVxdWVzdCwgcmVzcG9uc2UpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGNyZWF0ZUVycm9yID0gcmVxdWlyZSgnLi9jcmVhdGVFcnJvcicpO1xuXG4vKipcbiAqIFJlc29sdmUgb3IgcmVqZWN0IGEgUHJvbWlzZSBiYXNlZCBvbiByZXNwb25zZSBzdGF0dXMuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVzb2x2ZSBBIGZ1bmN0aW9uIHRoYXQgcmVzb2x2ZXMgdGhlIHByb21pc2UuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZWplY3QgQSBmdW5jdGlvbiB0aGF0IHJlamVjdHMgdGhlIHByb21pc2UuXG4gKiBAcGFyYW0ge29iamVjdH0gcmVzcG9uc2UgVGhlIHJlc3BvbnNlLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHJlc3BvbnNlKSB7XG4gIHZhciB2YWxpZGF0ZVN0YXR1cyA9IHJlc3BvbnNlLmNvbmZpZy52YWxpZGF0ZVN0YXR1cztcbiAgLy8gTm90ZTogc3RhdHVzIGlzIG5vdCBleHBvc2VkIGJ5IFhEb21haW5SZXF1ZXN0XG4gIGlmICghcmVzcG9uc2Uuc3RhdHVzIHx8ICF2YWxpZGF0ZVN0YXR1cyB8fCB2YWxpZGF0ZVN0YXR1cyhyZXNwb25zZS5zdGF0dXMpKSB7XG4gICAgcmVzb2x2ZShyZXNwb25zZSk7XG4gIH0gZWxzZSB7XG4gICAgcmVqZWN0KGNyZWF0ZUVycm9yKFxuICAgICAgJ1JlcXVlc3QgZmFpbGVkIHdpdGggc3RhdHVzIGNvZGUgJyArIHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgIHJlc3BvbnNlLmNvbmZpZyxcbiAgICAgIG51bGwsXG4gICAgICByZXNwb25zZS5yZXF1ZXN0LFxuICAgICAgcmVzcG9uc2VcbiAgICApKTtcbiAgfVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5mdW5jdGlvbiBlbmNvZGUodmFsKSB7XG4gIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQodmFsKS5cbiAgICByZXBsYWNlKC8lNDAvZ2ksICdAJykuXG4gICAgcmVwbGFjZSgvJTNBL2dpLCAnOicpLlxuICAgIHJlcGxhY2UoLyUyNC9nLCAnJCcpLlxuICAgIHJlcGxhY2UoLyUyQy9naSwgJywnKS5cbiAgICByZXBsYWNlKC8lMjAvZywgJysnKS5cbiAgICByZXBsYWNlKC8lNUIvZ2ksICdbJykuXG4gICAgcmVwbGFjZSgvJTVEL2dpLCAnXScpO1xufVxuXG4vKipcbiAqIEJ1aWxkIGEgVVJMIGJ5IGFwcGVuZGluZyBwYXJhbXMgdG8gdGhlIGVuZFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIGJhc2Ugb2YgdGhlIHVybCAoZS5nLiwgaHR0cDovL3d3dy5nb29nbGUuY29tKVxuICogQHBhcmFtIHtvYmplY3R9IFtwYXJhbXNdIFRoZSBwYXJhbXMgdG8gYmUgYXBwZW5kZWRcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBmb3JtYXR0ZWQgdXJsXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYnVpbGRVUkwodXJsLCBwYXJhbXMsIHBhcmFtc1NlcmlhbGl6ZXIpIHtcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIGlmICghcGFyYW1zKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuXG4gIHZhciBzZXJpYWxpemVkUGFyYW1zO1xuICBpZiAocGFyYW1zU2VyaWFsaXplcikge1xuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBwYXJhbXNTZXJpYWxpemVyKHBhcmFtcyk7XG4gIH0gZWxzZSBpZiAodXRpbHMuaXNVUkxTZWFyY2hQYXJhbXMocGFyYW1zKSkge1xuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBwYXJhbXMudG9TdHJpbmcoKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgcGFydHMgPSBbXTtcblxuICAgIHV0aWxzLmZvckVhY2gocGFyYW1zLCBmdW5jdGlvbiBzZXJpYWxpemUodmFsLCBrZXkpIHtcbiAgICAgIGlmICh2YWwgPT09IG51bGwgfHwgdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAodXRpbHMuaXNBcnJheSh2YWwpKSB7XG4gICAgICAgIGtleSA9IGtleSArICdbXSc7XG4gICAgICB9XG5cbiAgICAgIGlmICghdXRpbHMuaXNBcnJheSh2YWwpKSB7XG4gICAgICAgIHZhbCA9IFt2YWxdO1xuICAgICAgfVxuXG4gICAgICB1dGlscy5mb3JFYWNoKHZhbCwgZnVuY3Rpb24gcGFyc2VWYWx1ZSh2KSB7XG4gICAgICAgIGlmICh1dGlscy5pc0RhdGUodikpIHtcbiAgICAgICAgICB2ID0gdi50b0lTT1N0cmluZygpO1xuICAgICAgICB9IGVsc2UgaWYgKHV0aWxzLmlzT2JqZWN0KHYpKSB7XG4gICAgICAgICAgdiA9IEpTT04uc3RyaW5naWZ5KHYpO1xuICAgICAgICB9XG4gICAgICAgIHBhcnRzLnB1c2goZW5jb2RlKGtleSkgKyAnPScgKyBlbmNvZGUodikpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBzZXJpYWxpemVkUGFyYW1zID0gcGFydHMuam9pbignJicpO1xuICB9XG5cbiAgaWYgKHNlcmlhbGl6ZWRQYXJhbXMpIHtcbiAgICB1cmwgKz0gKHVybC5pbmRleE9mKCc/JykgPT09IC0xID8gJz8nIDogJyYnKSArIHNlcmlhbGl6ZWRQYXJhbXM7XG4gIH1cblxuICByZXR1cm4gdXJsO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG4vLyBIZWFkZXJzIHdob3NlIGR1cGxpY2F0ZXMgYXJlIGlnbm9yZWQgYnkgbm9kZVxuLy8gYy5mLiBodHRwczovL25vZGVqcy5vcmcvYXBpL2h0dHAuaHRtbCNodHRwX21lc3NhZ2VfaGVhZGVyc1xudmFyIGlnbm9yZUR1cGxpY2F0ZU9mID0gW1xuICAnYWdlJywgJ2F1dGhvcml6YXRpb24nLCAnY29udGVudC1sZW5ndGgnLCAnY29udGVudC10eXBlJywgJ2V0YWcnLFxuICAnZXhwaXJlcycsICdmcm9tJywgJ2hvc3QnLCAnaWYtbW9kaWZpZWQtc2luY2UnLCAnaWYtdW5tb2RpZmllZC1zaW5jZScsXG4gICdsYXN0LW1vZGlmaWVkJywgJ2xvY2F0aW9uJywgJ21heC1mb3J3YXJkcycsICdwcm94eS1hdXRob3JpemF0aW9uJyxcbiAgJ3JlZmVyZXInLCAncmV0cnktYWZ0ZXInLCAndXNlci1hZ2VudCdcbl07XG5cbi8qKlxuICogUGFyc2UgaGVhZGVycyBpbnRvIGFuIG9iamVjdFxuICpcbiAqIGBgYFxuICogRGF0ZTogV2VkLCAyNyBBdWcgMjAxNCAwODo1ODo0OSBHTVRcbiAqIENvbnRlbnQtVHlwZTogYXBwbGljYXRpb24vanNvblxuICogQ29ubmVjdGlvbjoga2VlcC1hbGl2ZVxuICogVHJhbnNmZXItRW5jb2Rpbmc6IGNodW5rZWRcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBoZWFkZXJzIEhlYWRlcnMgbmVlZGluZyB0byBiZSBwYXJzZWRcbiAqIEByZXR1cm5zIHtPYmplY3R9IEhlYWRlcnMgcGFyc2VkIGludG8gYW4gb2JqZWN0XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcGFyc2VIZWFkZXJzKGhlYWRlcnMpIHtcbiAgdmFyIHBhcnNlZCA9IHt9O1xuICB2YXIga2V5O1xuICB2YXIgdmFsO1xuICB2YXIgaTtcblxuICBpZiAoIWhlYWRlcnMpIHsgcmV0dXJuIHBhcnNlZDsgfVxuXG4gIHV0aWxzLmZvckVhY2goaGVhZGVycy5zcGxpdCgnXFxuJyksIGZ1bmN0aW9uIHBhcnNlcihsaW5lKSB7XG4gICAgaSA9IGxpbmUuaW5kZXhPZignOicpO1xuICAgIGtleSA9IHV0aWxzLnRyaW0obGluZS5zdWJzdHIoMCwgaSkpLnRvTG93ZXJDYXNlKCk7XG4gICAgdmFsID0gdXRpbHMudHJpbShsaW5lLnN1YnN0cihpICsgMSkpO1xuXG4gICAgaWYgKGtleSkge1xuICAgICAgaWYgKHBhcnNlZFtrZXldICYmIGlnbm9yZUR1cGxpY2F0ZU9mLmluZGV4T2Yoa2V5KSA+PSAwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmIChrZXkgPT09ICdzZXQtY29va2llJykge1xuICAgICAgICBwYXJzZWRba2V5XSA9IChwYXJzZWRba2V5XSA/IHBhcnNlZFtrZXldIDogW10pLmNvbmNhdChbdmFsXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYXJzZWRba2V5XSA9IHBhcnNlZFtrZXldID8gcGFyc2VkW2tleV0gKyAnLCAnICsgdmFsIDogdmFsO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIHBhcnNlZDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSAoXG4gIHV0aWxzLmlzU3RhbmRhcmRCcm93c2VyRW52KCkgP1xuXG4gIC8vIFN0YW5kYXJkIGJyb3dzZXIgZW52cyBoYXZlIGZ1bGwgc3VwcG9ydCBvZiB0aGUgQVBJcyBuZWVkZWQgdG8gdGVzdFxuICAvLyB3aGV0aGVyIHRoZSByZXF1ZXN0IFVSTCBpcyBvZiB0aGUgc2FtZSBvcmlnaW4gYXMgY3VycmVudCBsb2NhdGlvbi5cbiAgKGZ1bmN0aW9uIHN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICB2YXIgbXNpZSA9IC8obXNpZXx0cmlkZW50KS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG4gICAgdmFyIHVybFBhcnNpbmdOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIHZhciBvcmlnaW5VUkw7XG5cbiAgICAvKipcbiAgICAqIFBhcnNlIGEgVVJMIHRvIGRpc2NvdmVyIGl0J3MgY29tcG9uZW50c1xuICAgICpcbiAgICAqIEBwYXJhbSB7U3RyaW5nfSB1cmwgVGhlIFVSTCB0byBiZSBwYXJzZWRcbiAgICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAgKi9cbiAgICBmdW5jdGlvbiByZXNvbHZlVVJMKHVybCkge1xuICAgICAgdmFyIGhyZWYgPSB1cmw7XG5cbiAgICAgIGlmIChtc2llKSB7XG4gICAgICAgIC8vIElFIG5lZWRzIGF0dHJpYnV0ZSBzZXQgdHdpY2UgdG8gbm9ybWFsaXplIHByb3BlcnRpZXNcbiAgICAgICAgdXJsUGFyc2luZ05vZGUuc2V0QXR0cmlidXRlKCdocmVmJywgaHJlZik7XG4gICAgICAgIGhyZWYgPSB1cmxQYXJzaW5nTm9kZS5ocmVmO1xuICAgICAgfVxuXG4gICAgICB1cmxQYXJzaW5nTm9kZS5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBocmVmKTtcblxuICAgICAgLy8gdXJsUGFyc2luZ05vZGUgcHJvdmlkZXMgdGhlIFVybFV0aWxzIGludGVyZmFjZSAtIGh0dHA6Ly91cmwuc3BlYy53aGF0d2cub3JnLyN1cmx1dGlsc1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaHJlZjogdXJsUGFyc2luZ05vZGUuaHJlZixcbiAgICAgICAgcHJvdG9jb2w6IHVybFBhcnNpbmdOb2RlLnByb3RvY29sID8gdXJsUGFyc2luZ05vZGUucHJvdG9jb2wucmVwbGFjZSgvOiQvLCAnJykgOiAnJyxcbiAgICAgICAgaG9zdDogdXJsUGFyc2luZ05vZGUuaG9zdCxcbiAgICAgICAgc2VhcmNoOiB1cmxQYXJzaW5nTm9kZS5zZWFyY2ggPyB1cmxQYXJzaW5nTm9kZS5zZWFyY2gucmVwbGFjZSgvXlxcPy8sICcnKSA6ICcnLFxuICAgICAgICBoYXNoOiB1cmxQYXJzaW5nTm9kZS5oYXNoID8gdXJsUGFyc2luZ05vZGUuaGFzaC5yZXBsYWNlKC9eIy8sICcnKSA6ICcnLFxuICAgICAgICBob3N0bmFtZTogdXJsUGFyc2luZ05vZGUuaG9zdG5hbWUsXG4gICAgICAgIHBvcnQ6IHVybFBhcnNpbmdOb2RlLnBvcnQsXG4gICAgICAgIHBhdGhuYW1lOiAodXJsUGFyc2luZ05vZGUucGF0aG5hbWUuY2hhckF0KDApID09PSAnLycpID9cbiAgICAgICAgICAgICAgICAgIHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lIDpcbiAgICAgICAgICAgICAgICAgICcvJyArIHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lXG4gICAgICB9O1xuICAgIH1cblxuICAgIG9yaWdpblVSTCA9IHJlc29sdmVVUkwod2luZG93LmxvY2F0aW9uLmhyZWYpO1xuXG4gICAgLyoqXG4gICAgKiBEZXRlcm1pbmUgaWYgYSBVUkwgc2hhcmVzIHRoZSBzYW1lIG9yaWdpbiBhcyB0aGUgY3VycmVudCBsb2NhdGlvblxuICAgICpcbiAgICAqIEBwYXJhbSB7U3RyaW5nfSByZXF1ZXN0VVJMIFRoZSBVUkwgdG8gdGVzdFxuICAgICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgVVJMIHNoYXJlcyB0aGUgc2FtZSBvcmlnaW4sIG90aGVyd2lzZSBmYWxzZVxuICAgICovXG4gICAgcmV0dXJuIGZ1bmN0aW9uIGlzVVJMU2FtZU9yaWdpbihyZXF1ZXN0VVJMKSB7XG4gICAgICB2YXIgcGFyc2VkID0gKHV0aWxzLmlzU3RyaW5nKHJlcXVlc3RVUkwpKSA/IHJlc29sdmVVUkwocmVxdWVzdFVSTCkgOiByZXF1ZXN0VVJMO1xuICAgICAgcmV0dXJuIChwYXJzZWQucHJvdG9jb2wgPT09IG9yaWdpblVSTC5wcm90b2NvbCAmJlxuICAgICAgICAgICAgcGFyc2VkLmhvc3QgPT09IG9yaWdpblVSTC5ob3N0KTtcbiAgICB9O1xuICB9KSgpIDpcblxuICAvLyBOb24gc3RhbmRhcmQgYnJvd3NlciBlbnZzICh3ZWIgd29ya2VycywgcmVhY3QtbmF0aXZlKSBsYWNrIG5lZWRlZCBzdXBwb3J0LlxuICAoZnVuY3Rpb24gbm9uU3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgIHJldHVybiBmdW5jdGlvbiBpc1VSTFNhbWVPcmlnaW4oKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuICB9KSgpXG4pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyBidG9hIHBvbHlmaWxsIGZvciBJRTwxMCBjb3VydGVzeSBodHRwczovL2dpdGh1Yi5jb20vZGF2aWRjaGFtYmVycy9CYXNlNjQuanNcblxudmFyIGNoYXJzID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky89JztcblxuZnVuY3Rpb24gRSgpIHtcbiAgdGhpcy5tZXNzYWdlID0gJ1N0cmluZyBjb250YWlucyBhbiBpbnZhbGlkIGNoYXJhY3Rlcic7XG59XG5FLnByb3RvdHlwZSA9IG5ldyBFcnJvcjtcbkUucHJvdG90eXBlLmNvZGUgPSA1O1xuRS5wcm90b3R5cGUubmFtZSA9ICdJbnZhbGlkQ2hhcmFjdGVyRXJyb3InO1xuXG5mdW5jdGlvbiBidG9hKGlucHV0KSB7XG4gIHZhciBzdHIgPSBTdHJpbmcoaW5wdXQpO1xuICB2YXIgb3V0cHV0ID0gJyc7XG4gIGZvciAoXG4gICAgLy8gaW5pdGlhbGl6ZSByZXN1bHQgYW5kIGNvdW50ZXJcbiAgICB2YXIgYmxvY2ssIGNoYXJDb2RlLCBpZHggPSAwLCBtYXAgPSBjaGFycztcbiAgICAvLyBpZiB0aGUgbmV4dCBzdHIgaW5kZXggZG9lcyBub3QgZXhpc3Q6XG4gICAgLy8gICBjaGFuZ2UgdGhlIG1hcHBpbmcgdGFibGUgdG8gXCI9XCJcbiAgICAvLyAgIGNoZWNrIGlmIGQgaGFzIG5vIGZyYWN0aW9uYWwgZGlnaXRzXG4gICAgc3RyLmNoYXJBdChpZHggfCAwKSB8fCAobWFwID0gJz0nLCBpZHggJSAxKTtcbiAgICAvLyBcIjggLSBpZHggJSAxICogOFwiIGdlbmVyYXRlcyB0aGUgc2VxdWVuY2UgMiwgNCwgNiwgOFxuICAgIG91dHB1dCArPSBtYXAuY2hhckF0KDYzICYgYmxvY2sgPj4gOCAtIGlkeCAlIDEgKiA4KVxuICApIHtcbiAgICBjaGFyQ29kZSA9IHN0ci5jaGFyQ29kZUF0KGlkeCArPSAzIC8gNCk7XG4gICAgaWYgKGNoYXJDb2RlID4gMHhGRikge1xuICAgICAgdGhyb3cgbmV3IEUoKTtcbiAgICB9XG4gICAgYmxvY2sgPSBibG9jayA8PCA4IHwgY2hhckNvZGU7XG4gIH1cbiAgcmV0dXJuIG91dHB1dDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBidG9hO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKFxuICB1dGlscy5pc1N0YW5kYXJkQnJvd3NlckVudigpID9cblxuICAvLyBTdGFuZGFyZCBicm93c2VyIGVudnMgc3VwcG9ydCBkb2N1bWVudC5jb29raWVcbiAgKGZ1bmN0aW9uIHN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgd3JpdGU6IGZ1bmN0aW9uIHdyaXRlKG5hbWUsIHZhbHVlLCBleHBpcmVzLCBwYXRoLCBkb21haW4sIHNlY3VyZSkge1xuICAgICAgICB2YXIgY29va2llID0gW107XG4gICAgICAgIGNvb2tpZS5wdXNoKG5hbWUgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpKTtcblxuICAgICAgICBpZiAodXRpbHMuaXNOdW1iZXIoZXhwaXJlcykpIHtcbiAgICAgICAgICBjb29raWUucHVzaCgnZXhwaXJlcz0nICsgbmV3IERhdGUoZXhwaXJlcykudG9HTVRTdHJpbmcoKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodXRpbHMuaXNTdHJpbmcocGF0aCkpIHtcbiAgICAgICAgICBjb29raWUucHVzaCgncGF0aD0nICsgcGF0aCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodXRpbHMuaXNTdHJpbmcoZG9tYWluKSkge1xuICAgICAgICAgIGNvb2tpZS5wdXNoKCdkb21haW49JyArIGRvbWFpbik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2VjdXJlID09PSB0cnVlKSB7XG4gICAgICAgICAgY29va2llLnB1c2goJ3NlY3VyZScpO1xuICAgICAgICB9XG5cbiAgICAgICAgZG9jdW1lbnQuY29va2llID0gY29va2llLmpvaW4oJzsgJyk7XG4gICAgICB9LFxuXG4gICAgICByZWFkOiBmdW5jdGlvbiByZWFkKG5hbWUpIHtcbiAgICAgICAgdmFyIG1hdGNoID0gZG9jdW1lbnQuY29va2llLm1hdGNoKG5ldyBSZWdFeHAoJyhefDtcXFxccyopKCcgKyBuYW1lICsgJyk9KFteO10qKScpKTtcbiAgICAgICAgcmV0dXJuIChtYXRjaCA/IGRlY29kZVVSSUNvbXBvbmVudChtYXRjaFszXSkgOiBudWxsKTtcbiAgICAgIH0sXG5cbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKG5hbWUpIHtcbiAgICAgICAgdGhpcy53cml0ZShuYW1lLCAnJywgRGF0ZS5ub3coKSAtIDg2NDAwMDAwKTtcbiAgICAgIH1cbiAgICB9O1xuICB9KSgpIDpcblxuICAvLyBOb24gc3RhbmRhcmQgYnJvd3NlciBlbnYgKHdlYiB3b3JrZXJzLCByZWFjdC1uYXRpdmUpIGxhY2sgbmVlZGVkIHN1cHBvcnQuXG4gIChmdW5jdGlvbiBub25TdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHdyaXRlOiBmdW5jdGlvbiB3cml0ZSgpIHt9LFxuICAgICAgcmVhZDogZnVuY3Rpb24gcmVhZCgpIHsgcmV0dXJuIG51bGw7IH0sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfSkoKVxuKTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xudmFyIHNldHRsZSA9IHJlcXVpcmUoJy4vLi4vY29yZS9zZXR0bGUnKTtcbnZhciBidWlsZFVSTCA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9idWlsZFVSTCcpO1xudmFyIHBhcnNlSGVhZGVycyA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9wYXJzZUhlYWRlcnMnKTtcbnZhciBpc1VSTFNhbWVPcmlnaW4gPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvaXNVUkxTYW1lT3JpZ2luJyk7XG52YXIgY3JlYXRlRXJyb3IgPSByZXF1aXJlKCcuLi9jb3JlL2NyZWF0ZUVycm9yJyk7XG52YXIgYnRvYSA9ICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuYnRvYSAmJiB3aW5kb3cuYnRvYS5iaW5kKHdpbmRvdykpIHx8IHJlcXVpcmUoJy4vLi4vaGVscGVycy9idG9hJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24geGhyQWRhcHRlcihjb25maWcpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIGRpc3BhdGNoWGhyUmVxdWVzdChyZXNvbHZlLCByZWplY3QpIHtcbiAgICB2YXIgcmVxdWVzdERhdGEgPSBjb25maWcuZGF0YTtcbiAgICB2YXIgcmVxdWVzdEhlYWRlcnMgPSBjb25maWcuaGVhZGVycztcblxuICAgIGlmICh1dGlscy5pc0Zvcm1EYXRhKHJlcXVlc3REYXRhKSkge1xuICAgICAgZGVsZXRlIHJlcXVlc3RIZWFkZXJzWydDb250ZW50LVR5cGUnXTsgLy8gTGV0IHRoZSBicm93c2VyIHNldCBpdFxuICAgIH1cblxuICAgIHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgdmFyIGxvYWRFdmVudCA9ICdvbnJlYWR5c3RhdGVjaGFuZ2UnO1xuICAgIHZhciB4RG9tYWluID0gZmFsc2U7XG5cbiAgICAvLyBGb3IgSUUgOC85IENPUlMgc3VwcG9ydFxuICAgIC8vIE9ubHkgc3VwcG9ydHMgUE9TVCBhbmQgR0VUIGNhbGxzIGFuZCBkb2Vzbid0IHJldHVybnMgdGhlIHJlc3BvbnNlIGhlYWRlcnMuXG4gICAgLy8gRE9OJ1QgZG8gdGhpcyBmb3IgdGVzdGluZyBiL2MgWE1MSHR0cFJlcXVlc3QgaXMgbW9ja2VkLCBub3QgWERvbWFpblJlcXVlc3QuXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAndGVzdCcgJiZcbiAgICAgICAgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgd2luZG93LlhEb21haW5SZXF1ZXN0ICYmICEoJ3dpdGhDcmVkZW50aWFscycgaW4gcmVxdWVzdCkgJiZcbiAgICAgICAgIWlzVVJMU2FtZU9yaWdpbihjb25maWcudXJsKSkge1xuICAgICAgcmVxdWVzdCA9IG5ldyB3aW5kb3cuWERvbWFpblJlcXVlc3QoKTtcbiAgICAgIGxvYWRFdmVudCA9ICdvbmxvYWQnO1xuICAgICAgeERvbWFpbiA9IHRydWU7XG4gICAgICByZXF1ZXN0Lm9ucHJvZ3Jlc3MgPSBmdW5jdGlvbiBoYW5kbGVQcm9ncmVzcygpIHt9O1xuICAgICAgcmVxdWVzdC5vbnRpbWVvdXQgPSBmdW5jdGlvbiBoYW5kbGVUaW1lb3V0KCkge307XG4gICAgfVxuXG4gICAgLy8gSFRUUCBiYXNpYyBhdXRoZW50aWNhdGlvblxuICAgIGlmIChjb25maWcuYXV0aCkge1xuICAgICAgdmFyIHVzZXJuYW1lID0gY29uZmlnLmF1dGgudXNlcm5hbWUgfHwgJyc7XG4gICAgICB2YXIgcGFzc3dvcmQgPSBjb25maWcuYXV0aC5wYXNzd29yZCB8fCAnJztcbiAgICAgIHJlcXVlc3RIZWFkZXJzLkF1dGhvcml6YXRpb24gPSAnQmFzaWMgJyArIGJ0b2EodXNlcm5hbWUgKyAnOicgKyBwYXNzd29yZCk7XG4gICAgfVxuXG4gICAgcmVxdWVzdC5vcGVuKGNvbmZpZy5tZXRob2QudG9VcHBlckNhc2UoKSwgYnVpbGRVUkwoY29uZmlnLnVybCwgY29uZmlnLnBhcmFtcywgY29uZmlnLnBhcmFtc1NlcmlhbGl6ZXIpLCB0cnVlKTtcblxuICAgIC8vIFNldCB0aGUgcmVxdWVzdCB0aW1lb3V0IGluIE1TXG4gICAgcmVxdWVzdC50aW1lb3V0ID0gY29uZmlnLnRpbWVvdXQ7XG5cbiAgICAvLyBMaXN0ZW4gZm9yIHJlYWR5IHN0YXRlXG4gICAgcmVxdWVzdFtsb2FkRXZlbnRdID0gZnVuY3Rpb24gaGFuZGxlTG9hZCgpIHtcbiAgICAgIGlmICghcmVxdWVzdCB8fCAocmVxdWVzdC5yZWFkeVN0YXRlICE9PSA0ICYmICF4RG9tYWluKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIFRoZSByZXF1ZXN0IGVycm9yZWQgb3V0IGFuZCB3ZSBkaWRuJ3QgZ2V0IGEgcmVzcG9uc2UsIHRoaXMgd2lsbCBiZVxuICAgICAgLy8gaGFuZGxlZCBieSBvbmVycm9yIGluc3RlYWRcbiAgICAgIC8vIFdpdGggb25lIGV4Y2VwdGlvbjogcmVxdWVzdCB0aGF0IHVzaW5nIGZpbGU6IHByb3RvY29sLCBtb3N0IGJyb3dzZXJzXG4gICAgICAvLyB3aWxsIHJldHVybiBzdGF0dXMgYXMgMCBldmVuIHRob3VnaCBpdCdzIGEgc3VjY2Vzc2Z1bCByZXF1ZXN0XG4gICAgICBpZiAocmVxdWVzdC5zdGF0dXMgPT09IDAgJiYgIShyZXF1ZXN0LnJlc3BvbnNlVVJMICYmIHJlcXVlc3QucmVzcG9uc2VVUkwuaW5kZXhPZignZmlsZTonKSA9PT0gMCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBQcmVwYXJlIHRoZSByZXNwb25zZVxuICAgICAgdmFyIHJlc3BvbnNlSGVhZGVycyA9ICdnZXRBbGxSZXNwb25zZUhlYWRlcnMnIGluIHJlcXVlc3QgPyBwYXJzZUhlYWRlcnMocmVxdWVzdC5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKSkgOiBudWxsO1xuICAgICAgdmFyIHJlc3BvbnNlRGF0YSA9ICFjb25maWcucmVzcG9uc2VUeXBlIHx8IGNvbmZpZy5yZXNwb25zZVR5cGUgPT09ICd0ZXh0JyA/IHJlcXVlc3QucmVzcG9uc2VUZXh0IDogcmVxdWVzdC5yZXNwb25zZTtcbiAgICAgIHZhciByZXNwb25zZSA9IHtcbiAgICAgICAgZGF0YTogcmVzcG9uc2VEYXRhLFxuICAgICAgICAvLyBJRSBzZW5kcyAxMjIzIGluc3RlYWQgb2YgMjA0IChodHRwczovL2dpdGh1Yi5jb20vYXhpb3MvYXhpb3MvaXNzdWVzLzIwMSlcbiAgICAgICAgc3RhdHVzOiByZXF1ZXN0LnN0YXR1cyA9PT0gMTIyMyA/IDIwNCA6IHJlcXVlc3Quc3RhdHVzLFxuICAgICAgICBzdGF0dXNUZXh0OiByZXF1ZXN0LnN0YXR1cyA9PT0gMTIyMyA/ICdObyBDb250ZW50JyA6IHJlcXVlc3Quc3RhdHVzVGV4dCxcbiAgICAgICAgaGVhZGVyczogcmVzcG9uc2VIZWFkZXJzLFxuICAgICAgICBjb25maWc6IGNvbmZpZyxcbiAgICAgICAgcmVxdWVzdDogcmVxdWVzdFxuICAgICAgfTtcblxuICAgICAgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgcmVzcG9uc2UpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gSGFuZGxlIGxvdyBsZXZlbCBuZXR3b3JrIGVycm9yc1xuICAgIHJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uIGhhbmRsZUVycm9yKCkge1xuICAgICAgLy8gUmVhbCBlcnJvcnMgYXJlIGhpZGRlbiBmcm9tIHVzIGJ5IHRoZSBicm93c2VyXG4gICAgICAvLyBvbmVycm9yIHNob3VsZCBvbmx5IGZpcmUgaWYgaXQncyBhIG5ldHdvcmsgZXJyb3JcbiAgICAgIHJlamVjdChjcmVhdGVFcnJvcignTmV0d29yayBFcnJvcicsIGNvbmZpZywgbnVsbCwgcmVxdWVzdCkpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gSGFuZGxlIHRpbWVvdXRcbiAgICByZXF1ZXN0Lm9udGltZW91dCA9IGZ1bmN0aW9uIGhhbmRsZVRpbWVvdXQoKSB7XG4gICAgICByZWplY3QoY3JlYXRlRXJyb3IoJ3RpbWVvdXQgb2YgJyArIGNvbmZpZy50aW1lb3V0ICsgJ21zIGV4Y2VlZGVkJywgY29uZmlnLCAnRUNPTk5BQk9SVEVEJyxcbiAgICAgICAgcmVxdWVzdCkpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gQWRkIHhzcmYgaGVhZGVyXG4gICAgLy8gVGhpcyBpcyBvbmx5IGRvbmUgaWYgcnVubmluZyBpbiBhIHN0YW5kYXJkIGJyb3dzZXIgZW52aXJvbm1lbnQuXG4gICAgLy8gU3BlY2lmaWNhbGx5IG5vdCBpZiB3ZSdyZSBpbiBhIHdlYiB3b3JrZXIsIG9yIHJlYWN0LW5hdGl2ZS5cbiAgICBpZiAodXRpbHMuaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSkge1xuICAgICAgdmFyIGNvb2tpZXMgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvY29va2llcycpO1xuXG4gICAgICAvLyBBZGQgeHNyZiBoZWFkZXJcbiAgICAgIHZhciB4c3JmVmFsdWUgPSAoY29uZmlnLndpdGhDcmVkZW50aWFscyB8fCBpc1VSTFNhbWVPcmlnaW4oY29uZmlnLnVybCkpICYmIGNvbmZpZy54c3JmQ29va2llTmFtZSA/XG4gICAgICAgICAgY29va2llcy5yZWFkKGNvbmZpZy54c3JmQ29va2llTmFtZSkgOlxuICAgICAgICAgIHVuZGVmaW5lZDtcblxuICAgICAgaWYgKHhzcmZWYWx1ZSkge1xuICAgICAgICByZXF1ZXN0SGVhZGVyc1tjb25maWcueHNyZkhlYWRlck5hbWVdID0geHNyZlZhbHVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEFkZCBoZWFkZXJzIHRvIHRoZSByZXF1ZXN0XG4gICAgaWYgKCdzZXRSZXF1ZXN0SGVhZGVyJyBpbiByZXF1ZXN0KSB7XG4gICAgICB1dGlscy5mb3JFYWNoKHJlcXVlc3RIZWFkZXJzLCBmdW5jdGlvbiBzZXRSZXF1ZXN0SGVhZGVyKHZhbCwga2V5KSB7XG4gICAgICAgIGlmICh0eXBlb2YgcmVxdWVzdERhdGEgPT09ICd1bmRlZmluZWQnICYmIGtleS50b0xvd2VyQ2FzZSgpID09PSAnY29udGVudC10eXBlJykge1xuICAgICAgICAgIC8vIFJlbW92ZSBDb250ZW50LVR5cGUgaWYgZGF0YSBpcyB1bmRlZmluZWRcbiAgICAgICAgICBkZWxldGUgcmVxdWVzdEhlYWRlcnNba2V5XTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBPdGhlcndpc2UgYWRkIGhlYWRlciB0byB0aGUgcmVxdWVzdFxuICAgICAgICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcihrZXksIHZhbCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIEFkZCB3aXRoQ3JlZGVudGlhbHMgdG8gcmVxdWVzdCBpZiBuZWVkZWRcbiAgICBpZiAoY29uZmlnLndpdGhDcmVkZW50aWFscykge1xuICAgICAgcmVxdWVzdC53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuICAgIH1cblxuICAgIC8vIEFkZCByZXNwb25zZVR5cGUgdG8gcmVxdWVzdCBpZiBuZWVkZWRcbiAgICBpZiAoY29uZmlnLnJlc3BvbnNlVHlwZSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmVxdWVzdC5yZXNwb25zZVR5cGUgPSBjb25maWcucmVzcG9uc2VUeXBlO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBFeHBlY3RlZCBET01FeGNlcHRpb24gdGhyb3duIGJ5IGJyb3dzZXJzIG5vdCBjb21wYXRpYmxlIFhNTEh0dHBSZXF1ZXN0IExldmVsIDIuXG4gICAgICAgIC8vIEJ1dCwgdGhpcyBjYW4gYmUgc3VwcHJlc3NlZCBmb3IgJ2pzb24nIHR5cGUgYXMgaXQgY2FuIGJlIHBhcnNlZCBieSBkZWZhdWx0ICd0cmFuc2Zvcm1SZXNwb25zZScgZnVuY3Rpb24uXG4gICAgICAgIGlmIChjb25maWcucmVzcG9uc2VUeXBlICE9PSAnanNvbicpIHtcbiAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gSGFuZGxlIHByb2dyZXNzIGlmIG5lZWRlZFxuICAgIGlmICh0eXBlb2YgY29uZmlnLm9uRG93bmxvYWRQcm9ncmVzcyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIGNvbmZpZy5vbkRvd25sb2FkUHJvZ3Jlc3MpO1xuICAgIH1cblxuICAgIC8vIE5vdCBhbGwgYnJvd3NlcnMgc3VwcG9ydCB1cGxvYWQgZXZlbnRzXG4gICAgaWYgKHR5cGVvZiBjb25maWcub25VcGxvYWRQcm9ncmVzcyA9PT0gJ2Z1bmN0aW9uJyAmJiByZXF1ZXN0LnVwbG9hZCkge1xuICAgICAgcmVxdWVzdC51cGxvYWQuYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBjb25maWcub25VcGxvYWRQcm9ncmVzcyk7XG4gICAgfVxuXG4gICAgaWYgKGNvbmZpZy5jYW5jZWxUb2tlbikge1xuICAgICAgLy8gSGFuZGxlIGNhbmNlbGxhdGlvblxuICAgICAgY29uZmlnLmNhbmNlbFRva2VuLnByb21pc2UudGhlbihmdW5jdGlvbiBvbkNhbmNlbGVkKGNhbmNlbCkge1xuICAgICAgICBpZiAoIXJlcXVlc3QpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICByZXF1ZXN0LmFib3J0KCk7XG4gICAgICAgIHJlamVjdChjYW5jZWwpO1xuICAgICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHJlcXVlc3REYXRhID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJlcXVlc3REYXRhID0gbnVsbDtcbiAgICB9XG5cbiAgICAvLyBTZW5kIHRoZSByZXF1ZXN0XG4gICAgcmVxdWVzdC5zZW5kKHJlcXVlc3REYXRhKTtcbiAgfSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG52YXIgbm9ybWFsaXplSGVhZGVyTmFtZSA9IHJlcXVpcmUoJy4vaGVscGVycy9ub3JtYWxpemVIZWFkZXJOYW1lJyk7XG5cbnZhciBERUZBVUxUX0NPTlRFTlRfVFlQRSA9IHtcbiAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnXG59O1xuXG5mdW5jdGlvbiBzZXRDb250ZW50VHlwZUlmVW5zZXQoaGVhZGVycywgdmFsdWUpIHtcbiAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChoZWFkZXJzKSAmJiB1dGlscy5pc1VuZGVmaW5lZChoZWFkZXJzWydDb250ZW50LVR5cGUnXSkpIHtcbiAgICBoZWFkZXJzWydDb250ZW50LVR5cGUnXSA9IHZhbHVlO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldERlZmF1bHRBZGFwdGVyKCkge1xuICB2YXIgYWRhcHRlcjtcbiAgaWYgKHR5cGVvZiBYTUxIdHRwUmVxdWVzdCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAvLyBGb3IgYnJvd3NlcnMgdXNlIFhIUiBhZGFwdGVyXG4gICAgYWRhcHRlciA9IHJlcXVpcmUoJy4vYWRhcHRlcnMveGhyJyk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIHByb2Nlc3MgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgLy8gRm9yIG5vZGUgdXNlIEhUVFAgYWRhcHRlclxuICAgIGFkYXB0ZXIgPSByZXF1aXJlKCcuL2FkYXB0ZXJzL2h0dHAnKTtcbiAgfVxuICByZXR1cm4gYWRhcHRlcjtcbn1cblxudmFyIGRlZmF1bHRzID0ge1xuICBhZGFwdGVyOiBnZXREZWZhdWx0QWRhcHRlcigpLFxuXG4gIHRyYW5zZm9ybVJlcXVlc3Q6IFtmdW5jdGlvbiB0cmFuc2Zvcm1SZXF1ZXN0KGRhdGEsIGhlYWRlcnMpIHtcbiAgICBub3JtYWxpemVIZWFkZXJOYW1lKGhlYWRlcnMsICdDb250ZW50LVR5cGUnKTtcbiAgICBpZiAodXRpbHMuaXNGb3JtRGF0YShkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNBcnJheUJ1ZmZlcihkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNCdWZmZXIoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzU3RyZWFtKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0ZpbGUoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzQmxvYihkYXRhKVxuICAgICkge1xuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuICAgIGlmICh1dGlscy5pc0FycmF5QnVmZmVyVmlldyhkYXRhKSkge1xuICAgICAgcmV0dXJuIGRhdGEuYnVmZmVyO1xuICAgIH1cbiAgICBpZiAodXRpbHMuaXNVUkxTZWFyY2hQYXJhbXMoZGF0YSkpIHtcbiAgICAgIHNldENvbnRlbnRUeXBlSWZVbnNldChoZWFkZXJzLCAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9dXRmLTgnKTtcbiAgICAgIHJldHVybiBkYXRhLnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIGlmICh1dGlscy5pc09iamVjdChkYXRhKSkge1xuICAgICAgc2V0Q29udGVudFR5cGVJZlVuc2V0KGhlYWRlcnMsICdhcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTgnKTtcbiAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShkYXRhKTtcbiAgICB9XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1dLFxuXG4gIHRyYW5zZm9ybVJlc3BvbnNlOiBbZnVuY3Rpb24gdHJhbnNmb3JtUmVzcG9uc2UoZGF0YSkge1xuICAgIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGRhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgfSBjYXRjaCAoZSkgeyAvKiBJZ25vcmUgKi8gfVxuICAgIH1cbiAgICByZXR1cm4gZGF0YTtcbiAgfV0sXG5cbiAgdGltZW91dDogMCxcblxuICB4c3JmQ29va2llTmFtZTogJ1hTUkYtVE9LRU4nLFxuICB4c3JmSGVhZGVyTmFtZTogJ1gtWFNSRi1UT0tFTicsXG5cbiAgbWF4Q29udGVudExlbmd0aDogLTEsXG5cbiAgdmFsaWRhdGVTdGF0dXM6IGZ1bmN0aW9uIHZhbGlkYXRlU3RhdHVzKHN0YXR1cykge1xuICAgIHJldHVybiBzdGF0dXMgPj0gMjAwICYmIHN0YXR1cyA8IDMwMDtcbiAgfVxufTtcblxuZGVmYXVsdHMuaGVhZGVycyA9IHtcbiAgY29tbW9uOiB7XG4gICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uLCB0ZXh0L3BsYWluLCAqLyonXG4gIH1cbn07XG5cbnV0aWxzLmZvckVhY2goWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZE5vRGF0YShtZXRob2QpIHtcbiAgZGVmYXVsdHMuaGVhZGVyc1ttZXRob2RdID0ge307XG59KTtcblxudXRpbHMuZm9yRWFjaChbJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2RXaXRoRGF0YShtZXRob2QpIHtcbiAgZGVmYXVsdHMuaGVhZGVyc1ttZXRob2RdID0gdXRpbHMubWVyZ2UoREVGQVVMVF9DT05URU5UX1RZUEUpO1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZGVmYXVsdHM7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuZnVuY3Rpb24gSW50ZXJjZXB0b3JNYW5hZ2VyKCkge1xuICB0aGlzLmhhbmRsZXJzID0gW107XG59XG5cbi8qKlxuICogQWRkIGEgbmV3IGludGVyY2VwdG9yIHRvIHRoZSBzdGFja1xuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bGZpbGxlZCBUaGUgZnVuY3Rpb24gdG8gaGFuZGxlIGB0aGVuYCBmb3IgYSBgUHJvbWlzZWBcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlamVjdGVkIFRoZSBmdW5jdGlvbiB0byBoYW5kbGUgYHJlamVjdGAgZm9yIGEgYFByb21pc2VgXG4gKlxuICogQHJldHVybiB7TnVtYmVyfSBBbiBJRCB1c2VkIHRvIHJlbW92ZSBpbnRlcmNlcHRvciBsYXRlclxuICovXG5JbnRlcmNlcHRvck1hbmFnZXIucHJvdG90eXBlLnVzZSA9IGZ1bmN0aW9uIHVzZShmdWxmaWxsZWQsIHJlamVjdGVkKSB7XG4gIHRoaXMuaGFuZGxlcnMucHVzaCh7XG4gICAgZnVsZmlsbGVkOiBmdWxmaWxsZWQsXG4gICAgcmVqZWN0ZWQ6IHJlamVjdGVkXG4gIH0pO1xuICByZXR1cm4gdGhpcy5oYW5kbGVycy5sZW5ndGggLSAxO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgYW4gaW50ZXJjZXB0b3IgZnJvbSB0aGUgc3RhY2tcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gaWQgVGhlIElEIHRoYXQgd2FzIHJldHVybmVkIGJ5IGB1c2VgXG4gKi9cbkludGVyY2VwdG9yTWFuYWdlci5wcm90b3R5cGUuZWplY3QgPSBmdW5jdGlvbiBlamVjdChpZCkge1xuICBpZiAodGhpcy5oYW5kbGVyc1tpZF0pIHtcbiAgICB0aGlzLmhhbmRsZXJzW2lkXSA9IG51bGw7XG4gIH1cbn07XG5cbi8qKlxuICogSXRlcmF0ZSBvdmVyIGFsbCB0aGUgcmVnaXN0ZXJlZCBpbnRlcmNlcHRvcnNcbiAqXG4gKiBUaGlzIG1ldGhvZCBpcyBwYXJ0aWN1bGFybHkgdXNlZnVsIGZvciBza2lwcGluZyBvdmVyIGFueVxuICogaW50ZXJjZXB0b3JzIHRoYXQgbWF5IGhhdmUgYmVjb21lIGBudWxsYCBjYWxsaW5nIGBlamVjdGAuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGNhbGwgZm9yIGVhY2ggaW50ZXJjZXB0b3JcbiAqL1xuSW50ZXJjZXB0b3JNYW5hZ2VyLnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24gZm9yRWFjaChmbikge1xuICB1dGlscy5mb3JFYWNoKHRoaXMuaGFuZGxlcnMsIGZ1bmN0aW9uIGZvckVhY2hIYW5kbGVyKGgpIHtcbiAgICBpZiAoaCAhPT0gbnVsbCkge1xuICAgICAgZm4oaCk7XG4gICAgfVxuICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gSW50ZXJjZXB0b3JNYW5hZ2VyO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbi8qKlxuICogVHJhbnNmb3JtIHRoZSBkYXRhIGZvciBhIHJlcXVlc3Qgb3IgYSByZXNwb25zZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fFN0cmluZ30gZGF0YSBUaGUgZGF0YSB0byBiZSB0cmFuc2Zvcm1lZFxuICogQHBhcmFtIHtBcnJheX0gaGVhZGVycyBUaGUgaGVhZGVycyBmb3IgdGhlIHJlcXVlc3Qgb3IgcmVzcG9uc2VcbiAqIEBwYXJhbSB7QXJyYXl8RnVuY3Rpb259IGZucyBBIHNpbmdsZSBmdW5jdGlvbiBvciBBcnJheSBvZiBmdW5jdGlvbnNcbiAqIEByZXR1cm5zIHsqfSBUaGUgcmVzdWx0aW5nIHRyYW5zZm9ybWVkIGRhdGFcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0cmFuc2Zvcm1EYXRhKGRhdGEsIGhlYWRlcnMsIGZucykge1xuICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgdXRpbHMuZm9yRWFjaChmbnMsIGZ1bmN0aW9uIHRyYW5zZm9ybShmbikge1xuICAgIGRhdGEgPSBmbihkYXRhLCBoZWFkZXJzKTtcbiAgfSk7XG5cbiAgcmV0dXJuIGRhdGE7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzQ2FuY2VsKHZhbHVlKSB7XG4gIHJldHVybiAhISh2YWx1ZSAmJiB2YWx1ZS5fX0NBTkNFTF9fKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBzcGVjaWZpZWQgVVJMIGlzIGFic29sdXRlXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgVVJMIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBzcGVjaWZpZWQgVVJMIGlzIGFic29sdXRlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0Fic29sdXRlVVJMKHVybCkge1xuICAvLyBBIFVSTCBpcyBjb25zaWRlcmVkIGFic29sdXRlIGlmIGl0IGJlZ2lucyB3aXRoIFwiPHNjaGVtZT46Ly9cIiBvciBcIi8vXCIgKHByb3RvY29sLXJlbGF0aXZlIFVSTCkuXG4gIC8vIFJGQyAzOTg2IGRlZmluZXMgc2NoZW1lIG5hbWUgYXMgYSBzZXF1ZW5jZSBvZiBjaGFyYWN0ZXJzIGJlZ2lubmluZyB3aXRoIGEgbGV0dGVyIGFuZCBmb2xsb3dlZFxuICAvLyBieSBhbnkgY29tYmluYXRpb24gb2YgbGV0dGVycywgZGlnaXRzLCBwbHVzLCBwZXJpb2QsIG9yIGh5cGhlbi5cbiAgcmV0dXJuIC9eKFthLXpdW2EtelxcZFxcK1xcLVxcLl0qOik/XFwvXFwvL2kudGVzdCh1cmwpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IFVSTCBieSBjb21iaW5pbmcgdGhlIHNwZWNpZmllZCBVUkxzXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGJhc2VVUkwgVGhlIGJhc2UgVVJMXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpdmVVUkwgVGhlIHJlbGF0aXZlIFVSTFxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGNvbWJpbmVkIFVSTFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNvbWJpbmVVUkxzKGJhc2VVUkwsIHJlbGF0aXZlVVJMKSB7XG4gIHJldHVybiByZWxhdGl2ZVVSTFxuICAgID8gYmFzZVVSTC5yZXBsYWNlKC9cXC8rJC8sICcnKSArICcvJyArIHJlbGF0aXZlVVJMLnJlcGxhY2UoL15cXC8rLywgJycpXG4gICAgOiBiYXNlVVJMO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xudmFyIHRyYW5zZm9ybURhdGEgPSByZXF1aXJlKCcuL3RyYW5zZm9ybURhdGEnKTtcbnZhciBpc0NhbmNlbCA9IHJlcXVpcmUoJy4uL2NhbmNlbC9pc0NhbmNlbCcpO1xudmFyIGRlZmF1bHRzID0gcmVxdWlyZSgnLi4vZGVmYXVsdHMnKTtcbnZhciBpc0Fic29sdXRlVVJMID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2lzQWJzb2x1dGVVUkwnKTtcbnZhciBjb21iaW5lVVJMcyA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9jb21iaW5lVVJMcycpO1xuXG4vKipcbiAqIFRocm93cyBhIGBDYW5jZWxgIGlmIGNhbmNlbGxhdGlvbiBoYXMgYmVlbiByZXF1ZXN0ZWQuXG4gKi9cbmZ1bmN0aW9uIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKSB7XG4gIGlmIChjb25maWcuY2FuY2VsVG9rZW4pIHtcbiAgICBjb25maWcuY2FuY2VsVG9rZW4udGhyb3dJZlJlcXVlc3RlZCgpO1xuICB9XG59XG5cbi8qKlxuICogRGlzcGF0Y2ggYSByZXF1ZXN0IHRvIHRoZSBzZXJ2ZXIgdXNpbmcgdGhlIGNvbmZpZ3VyZWQgYWRhcHRlci5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gY29uZmlnIFRoZSBjb25maWcgdGhhdCBpcyB0byBiZSB1c2VkIGZvciB0aGUgcmVxdWVzdFxuICogQHJldHVybnMge1Byb21pc2V9IFRoZSBQcm9taXNlIHRvIGJlIGZ1bGZpbGxlZFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGRpc3BhdGNoUmVxdWVzdChjb25maWcpIHtcbiAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gIC8vIFN1cHBvcnQgYmFzZVVSTCBjb25maWdcbiAgaWYgKGNvbmZpZy5iYXNlVVJMICYmICFpc0Fic29sdXRlVVJMKGNvbmZpZy51cmwpKSB7XG4gICAgY29uZmlnLnVybCA9IGNvbWJpbmVVUkxzKGNvbmZpZy5iYXNlVVJMLCBjb25maWcudXJsKTtcbiAgfVxuXG4gIC8vIEVuc3VyZSBoZWFkZXJzIGV4aXN0XG4gIGNvbmZpZy5oZWFkZXJzID0gY29uZmlnLmhlYWRlcnMgfHwge307XG5cbiAgLy8gVHJhbnNmb3JtIHJlcXVlc3QgZGF0YVxuICBjb25maWcuZGF0YSA9IHRyYW5zZm9ybURhdGEoXG4gICAgY29uZmlnLmRhdGEsXG4gICAgY29uZmlnLmhlYWRlcnMsXG4gICAgY29uZmlnLnRyYW5zZm9ybVJlcXVlc3RcbiAgKTtcblxuICAvLyBGbGF0dGVuIGhlYWRlcnNcbiAgY29uZmlnLmhlYWRlcnMgPSB1dGlscy5tZXJnZShcbiAgICBjb25maWcuaGVhZGVycy5jb21tb24gfHwge30sXG4gICAgY29uZmlnLmhlYWRlcnNbY29uZmlnLm1ldGhvZF0gfHwge30sXG4gICAgY29uZmlnLmhlYWRlcnMgfHwge31cbiAgKTtcblxuICB1dGlscy5mb3JFYWNoKFxuICAgIFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJywgJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJywgJ2NvbW1vbiddLFxuICAgIGZ1bmN0aW9uIGNsZWFuSGVhZGVyQ29uZmlnKG1ldGhvZCkge1xuICAgICAgZGVsZXRlIGNvbmZpZy5oZWFkZXJzW21ldGhvZF07XG4gICAgfVxuICApO1xuXG4gIHZhciBhZGFwdGVyID0gY29uZmlnLmFkYXB0ZXIgfHwgZGVmYXVsdHMuYWRhcHRlcjtcblxuICByZXR1cm4gYWRhcHRlcihjb25maWcpLnRoZW4oZnVuY3Rpb24gb25BZGFwdGVyUmVzb2x1dGlvbihyZXNwb25zZSkge1xuICAgIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTtcblxuICAgIC8vIFRyYW5zZm9ybSByZXNwb25zZSBkYXRhXG4gICAgcmVzcG9uc2UuZGF0YSA9IHRyYW5zZm9ybURhdGEoXG4gICAgICByZXNwb25zZS5kYXRhLFxuICAgICAgcmVzcG9uc2UuaGVhZGVycyxcbiAgICAgIGNvbmZpZy50cmFuc2Zvcm1SZXNwb25zZVxuICAgICk7XG5cbiAgICByZXR1cm4gcmVzcG9uc2U7XG4gIH0sIGZ1bmN0aW9uIG9uQWRhcHRlclJlamVjdGlvbihyZWFzb24pIHtcbiAgICBpZiAoIWlzQ2FuY2VsKHJlYXNvbikpIHtcbiAgICAgIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTtcblxuICAgICAgLy8gVHJhbnNmb3JtIHJlc3BvbnNlIGRhdGFcbiAgICAgIGlmIChyZWFzb24gJiYgcmVhc29uLnJlc3BvbnNlKSB7XG4gICAgICAgIHJlYXNvbi5yZXNwb25zZS5kYXRhID0gdHJhbnNmb3JtRGF0YShcbiAgICAgICAgICByZWFzb24ucmVzcG9uc2UuZGF0YSxcbiAgICAgICAgICByZWFzb24ucmVzcG9uc2UuaGVhZGVycyxcbiAgICAgICAgICBjb25maWcudHJhbnNmb3JtUmVzcG9uc2VcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QocmVhc29uKTtcbiAgfSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZGVmYXVsdHMgPSByZXF1aXJlKCcuLy4uL2RlZmF1bHRzJyk7XG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG52YXIgSW50ZXJjZXB0b3JNYW5hZ2VyID0gcmVxdWlyZSgnLi9JbnRlcmNlcHRvck1hbmFnZXInKTtcbnZhciBkaXNwYXRjaFJlcXVlc3QgPSByZXF1aXJlKCcuL2Rpc3BhdGNoUmVxdWVzdCcpO1xuXG4vKipcbiAqIENyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiBBeGlvc1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZUNvbmZpZyBUaGUgZGVmYXVsdCBjb25maWcgZm9yIHRoZSBpbnN0YW5jZVxuICovXG5mdW5jdGlvbiBBeGlvcyhpbnN0YW5jZUNvbmZpZykge1xuICB0aGlzLmRlZmF1bHRzID0gaW5zdGFuY2VDb25maWc7XG4gIHRoaXMuaW50ZXJjZXB0b3JzID0ge1xuICAgIHJlcXVlc3Q6IG5ldyBJbnRlcmNlcHRvck1hbmFnZXIoKSxcbiAgICByZXNwb25zZTogbmV3IEludGVyY2VwdG9yTWFuYWdlcigpXG4gIH07XG59XG5cbi8qKlxuICogRGlzcGF0Y2ggYSByZXF1ZXN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnIHNwZWNpZmljIGZvciB0aGlzIHJlcXVlc3QgKG1lcmdlZCB3aXRoIHRoaXMuZGVmYXVsdHMpXG4gKi9cbkF4aW9zLnByb3RvdHlwZS5yZXF1ZXN0ID0gZnVuY3Rpb24gcmVxdWVzdChjb25maWcpIHtcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIC8vIEFsbG93IGZvciBheGlvcygnZXhhbXBsZS91cmwnWywgY29uZmlnXSkgYSBsYSBmZXRjaCBBUElcbiAgaWYgKHR5cGVvZiBjb25maWcgPT09ICdzdHJpbmcnKSB7XG4gICAgY29uZmlnID0gdXRpbHMubWVyZ2Uoe1xuICAgICAgdXJsOiBhcmd1bWVudHNbMF1cbiAgICB9LCBhcmd1bWVudHNbMV0pO1xuICB9XG5cbiAgY29uZmlnID0gdXRpbHMubWVyZ2UoZGVmYXVsdHMsIHRoaXMuZGVmYXVsdHMsIHsgbWV0aG9kOiAnZ2V0JyB9LCBjb25maWcpO1xuICBjb25maWcubWV0aG9kID0gY29uZmlnLm1ldGhvZC50b0xvd2VyQ2FzZSgpO1xuXG4gIC8vIEhvb2sgdXAgaW50ZXJjZXB0b3JzIG1pZGRsZXdhcmVcbiAgdmFyIGNoYWluID0gW2Rpc3BhdGNoUmVxdWVzdCwgdW5kZWZpbmVkXTtcbiAgdmFyIHByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoY29uZmlnKTtcblxuICB0aGlzLmludGVyY2VwdG9ycy5yZXF1ZXN0LmZvckVhY2goZnVuY3Rpb24gdW5zaGlmdFJlcXVlc3RJbnRlcmNlcHRvcnMoaW50ZXJjZXB0b3IpIHtcbiAgICBjaGFpbi51bnNoaWZ0KGludGVyY2VwdG9yLmZ1bGZpbGxlZCwgaW50ZXJjZXB0b3IucmVqZWN0ZWQpO1xuICB9KTtcblxuICB0aGlzLmludGVyY2VwdG9ycy5yZXNwb25zZS5mb3JFYWNoKGZ1bmN0aW9uIHB1c2hSZXNwb25zZUludGVyY2VwdG9ycyhpbnRlcmNlcHRvcikge1xuICAgIGNoYWluLnB1c2goaW50ZXJjZXB0b3IuZnVsZmlsbGVkLCBpbnRlcmNlcHRvci5yZWplY3RlZCk7XG4gIH0pO1xuXG4gIHdoaWxlIChjaGFpbi5sZW5ndGgpIHtcbiAgICBwcm9taXNlID0gcHJvbWlzZS50aGVuKGNoYWluLnNoaWZ0KCksIGNoYWluLnNoaWZ0KCkpO1xuICB9XG5cbiAgcmV0dXJuIHByb21pc2U7XG59O1xuXG4vLyBQcm92aWRlIGFsaWFzZXMgZm9yIHN1cHBvcnRlZCByZXF1ZXN0IG1ldGhvZHNcbnV0aWxzLmZvckVhY2goWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnLCAnb3B0aW9ucyddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kTm9EYXRhKG1ldGhvZCkge1xuICAvKmVzbGludCBmdW5jLW5hbWVzOjAqL1xuICBBeGlvcy5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKHVybCwgY29uZmlnKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdCh1dGlscy5tZXJnZShjb25maWcgfHwge30sIHtcbiAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgdXJsOiB1cmxcbiAgICB9KSk7XG4gIH07XG59KTtcblxudXRpbHMuZm9yRWFjaChbJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2RXaXRoRGF0YShtZXRob2QpIHtcbiAgLyplc2xpbnQgZnVuYy1uYW1lczowKi9cbiAgQXhpb3MucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbih1cmwsIGRhdGEsIGNvbmZpZykge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QodXRpbHMubWVyZ2UoY29uZmlnIHx8IHt9LCB7XG4gICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgIHVybDogdXJsLFxuICAgICAgZGF0YTogZGF0YVxuICAgIH0pKTtcbiAgfTtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEF4aW9zO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIEEgYENhbmNlbGAgaXMgYW4gb2JqZWN0IHRoYXQgaXMgdGhyb3duIHdoZW4gYW4gb3BlcmF0aW9uIGlzIGNhbmNlbGVkLlxuICpcbiAqIEBjbGFzc1xuICogQHBhcmFtIHtzdHJpbmc9fSBtZXNzYWdlIFRoZSBtZXNzYWdlLlxuICovXG5mdW5jdGlvbiBDYW5jZWwobWVzc2FnZSkge1xuICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xufVxuXG5DYW5jZWwucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gIHJldHVybiAnQ2FuY2VsJyArICh0aGlzLm1lc3NhZ2UgPyAnOiAnICsgdGhpcy5tZXNzYWdlIDogJycpO1xufTtcblxuQ2FuY2VsLnByb3RvdHlwZS5fX0NBTkNFTF9fID0gdHJ1ZTtcblxubW9kdWxlLmV4cG9ydHMgPSBDYW5jZWw7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBDYW5jZWwgPSByZXF1aXJlKCcuL0NhbmNlbCcpO1xuXG4vKipcbiAqIEEgYENhbmNlbFRva2VuYCBpcyBhbiBvYmplY3QgdGhhdCBjYW4gYmUgdXNlZCB0byByZXF1ZXN0IGNhbmNlbGxhdGlvbiBvZiBhbiBvcGVyYXRpb24uXG4gKlxuICogQGNsYXNzXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBleGVjdXRvciBUaGUgZXhlY3V0b3IgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIENhbmNlbFRva2VuKGV4ZWN1dG9yKSB7XG4gIGlmICh0eXBlb2YgZXhlY3V0b3IgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdleGVjdXRvciBtdXN0IGJlIGEgZnVuY3Rpb24uJyk7XG4gIH1cblxuICB2YXIgcmVzb2x2ZVByb21pc2U7XG4gIHRoaXMucHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIHByb21pc2VFeGVjdXRvcihyZXNvbHZlKSB7XG4gICAgcmVzb2x2ZVByb21pc2UgPSByZXNvbHZlO1xuICB9KTtcblxuICB2YXIgdG9rZW4gPSB0aGlzO1xuICBleGVjdXRvcihmdW5jdGlvbiBjYW5jZWwobWVzc2FnZSkge1xuICAgIGlmICh0b2tlbi5yZWFzb24pIHtcbiAgICAgIC8vIENhbmNlbGxhdGlvbiBoYXMgYWxyZWFkeSBiZWVuIHJlcXVlc3RlZFxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRva2VuLnJlYXNvbiA9IG5ldyBDYW5jZWwobWVzc2FnZSk7XG4gICAgcmVzb2x2ZVByb21pc2UodG9rZW4ucmVhc29uKTtcbiAgfSk7XG59XG5cbi8qKlxuICogVGhyb3dzIGEgYENhbmNlbGAgaWYgY2FuY2VsbGF0aW9uIGhhcyBiZWVuIHJlcXVlc3RlZC5cbiAqL1xuQ2FuY2VsVG9rZW4ucHJvdG90eXBlLnRocm93SWZSZXF1ZXN0ZWQgPSBmdW5jdGlvbiB0aHJvd0lmUmVxdWVzdGVkKCkge1xuICBpZiAodGhpcy5yZWFzb24pIHtcbiAgICB0aHJvdyB0aGlzLnJlYXNvbjtcbiAgfVxufTtcblxuLyoqXG4gKiBSZXR1cm5zIGFuIG9iamVjdCB0aGF0IGNvbnRhaW5zIGEgbmV3IGBDYW5jZWxUb2tlbmAgYW5kIGEgZnVuY3Rpb24gdGhhdCwgd2hlbiBjYWxsZWQsXG4gKiBjYW5jZWxzIHRoZSBgQ2FuY2VsVG9rZW5gLlxuICovXG5DYW5jZWxUb2tlbi5zb3VyY2UgPSBmdW5jdGlvbiBzb3VyY2UoKSB7XG4gIHZhciBjYW5jZWw7XG4gIHZhciB0b2tlbiA9IG5ldyBDYW5jZWxUb2tlbihmdW5jdGlvbiBleGVjdXRvcihjKSB7XG4gICAgY2FuY2VsID0gYztcbiAgfSk7XG4gIHJldHVybiB7XG4gICAgdG9rZW46IHRva2VuLFxuICAgIGNhbmNlbDogY2FuY2VsXG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IENhbmNlbFRva2VuO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFN5bnRhY3RpYyBzdWdhciBmb3IgaW52b2tpbmcgYSBmdW5jdGlvbiBhbmQgZXhwYW5kaW5nIGFuIGFycmF5IGZvciBhcmd1bWVudHMuXG4gKlxuICogQ29tbW9uIHVzZSBjYXNlIHdvdWxkIGJlIHRvIHVzZSBgRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5YC5cbiAqXG4gKiAgYGBganNcbiAqICBmdW5jdGlvbiBmKHgsIHksIHopIHt9XG4gKiAgdmFyIGFyZ3MgPSBbMSwgMiwgM107XG4gKiAgZi5hcHBseShudWxsLCBhcmdzKTtcbiAqICBgYGBcbiAqXG4gKiBXaXRoIGBzcHJlYWRgIHRoaXMgZXhhbXBsZSBjYW4gYmUgcmUtd3JpdHRlbi5cbiAqXG4gKiAgYGBganNcbiAqICBzcHJlYWQoZnVuY3Rpb24oeCwgeSwgeikge30pKFsxLCAyLCAzXSk7XG4gKiAgYGBgXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzcHJlYWQoY2FsbGJhY2spIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHdyYXAoYXJyKSB7XG4gICAgcmV0dXJuIGNhbGxiYWNrLmFwcGx5KG51bGwsIGFycik7XG4gIH07XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG52YXIgYmluZCA9IHJlcXVpcmUoJy4vaGVscGVycy9iaW5kJyk7XG52YXIgQXhpb3MgPSByZXF1aXJlKCcuL2NvcmUvQXhpb3MnKTtcbnZhciBkZWZhdWx0cyA9IHJlcXVpcmUoJy4vZGVmYXVsdHMnKTtcblxuLyoqXG4gKiBDcmVhdGUgYW4gaW5zdGFuY2Ugb2YgQXhpb3NcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gZGVmYXVsdENvbmZpZyBUaGUgZGVmYXVsdCBjb25maWcgZm9yIHRoZSBpbnN0YW5jZVxuICogQHJldHVybiB7QXhpb3N9IEEgbmV3IGluc3RhbmNlIG9mIEF4aW9zXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUluc3RhbmNlKGRlZmF1bHRDb25maWcpIHtcbiAgdmFyIGNvbnRleHQgPSBuZXcgQXhpb3MoZGVmYXVsdENvbmZpZyk7XG4gIHZhciBpbnN0YW5jZSA9IGJpbmQoQXhpb3MucHJvdG90eXBlLnJlcXVlc3QsIGNvbnRleHQpO1xuXG4gIC8vIENvcHkgYXhpb3MucHJvdG90eXBlIHRvIGluc3RhbmNlXG4gIHV0aWxzLmV4dGVuZChpbnN0YW5jZSwgQXhpb3MucHJvdG90eXBlLCBjb250ZXh0KTtcblxuICAvLyBDb3B5IGNvbnRleHQgdG8gaW5zdGFuY2VcbiAgdXRpbHMuZXh0ZW5kKGluc3RhbmNlLCBjb250ZXh0KTtcblxuICByZXR1cm4gaW5zdGFuY2U7XG59XG5cbi8vIENyZWF0ZSB0aGUgZGVmYXVsdCBpbnN0YW5jZSB0byBiZSBleHBvcnRlZFxudmFyIGF4aW9zID0gY3JlYXRlSW5zdGFuY2UoZGVmYXVsdHMpO1xuXG4vLyBFeHBvc2UgQXhpb3MgY2xhc3MgdG8gYWxsb3cgY2xhc3MgaW5oZXJpdGFuY2VcbmF4aW9zLkF4aW9zID0gQXhpb3M7XG5cbi8vIEZhY3RvcnkgZm9yIGNyZWF0aW5nIG5ldyBpbnN0YW5jZXNcbmF4aW9zLmNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZShpbnN0YW5jZUNvbmZpZykge1xuICByZXR1cm4gY3JlYXRlSW5zdGFuY2UodXRpbHMubWVyZ2UoZGVmYXVsdHMsIGluc3RhbmNlQ29uZmlnKSk7XG59O1xuXG4vLyBFeHBvc2UgQ2FuY2VsICYgQ2FuY2VsVG9rZW5cbmF4aW9zLkNhbmNlbCA9IHJlcXVpcmUoJy4vY2FuY2VsL0NhbmNlbCcpO1xuYXhpb3MuQ2FuY2VsVG9rZW4gPSByZXF1aXJlKCcuL2NhbmNlbC9DYW5jZWxUb2tlbicpO1xuYXhpb3MuaXNDYW5jZWwgPSByZXF1aXJlKCcuL2NhbmNlbC9pc0NhbmNlbCcpO1xuXG4vLyBFeHBvc2UgYWxsL3NwcmVhZFxuYXhpb3MuYWxsID0gZnVuY3Rpb24gYWxsKHByb21pc2VzKSB7XG4gIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG59O1xuYXhpb3Muc3ByZWFkID0gcmVxdWlyZSgnLi9oZWxwZXJzL3NwcmVhZCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGF4aW9zO1xuXG4vLyBBbGxvdyB1c2Ugb2YgZGVmYXVsdCBpbXBvcnQgc3ludGF4IGluIFR5cGVTY3JpcHRcbm1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBheGlvcztcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9saWIvYXhpb3MnKTsiLCJjb25zdCBheGlvcyA9IHJlcXVpcmUoJ2F4aW9zJyk7XG5cbmNvbnN0IHJlcXVlc3QgPSBheGlvcy5jcmVhdGUoe1xuICBiYXNlVVJMOiAnaHR0cHM6Ly9hcGkudHJlbGxvLmNvbS8xJ1xufSk7XG5cbi8qKlxuICogQGNsYXNzIEludGVyZmFjZVxuICogQG5hbWUgSW50ZXJmYWNlXG4gKiBAY2xhc3NkZXNjIEhUVFAgUmVxdWVzdCBpbnRlcmZhY2Ugd2l0aCBzb21lIFRyZWxsby1zcGVjaWZpYyBoZWxwZXIgbWV0aG9kcy5cbiAqL1xuY2xhc3MgSW50ZXJmYWNlIHtcbiAgY29uc3RydWN0b3Ioc2V0dGluZ3NPYmopIHtcbiAgICB0aGlzLnRyZWxsb0tleSA9IHNldHRpbmdzT2JqLnRyZWxsb0tleSB8fCBudWxsO1xuICAgIHRoaXMudHJlbGxvVG9rZW4gPSBzZXR0aW5nc09iai50cmVsbG9Ub2tlbiB8fCBudWxsO1xuICAgIC8qKlxuICAgICAqIEludGVyZmFjZSBFcnJvciBIYW5kbGVyXG4gICAgICogQHBhcmFtIHthbnl9IGVyciBSZXNwb25zZSB3aXRoIGVycm9yLlxuICAgICAqIEByZXR1cm4ge1JlcXVlc3RFcnJvcn1cbiAgICAgKi9cbiAgICAvKipcbiAgICAgKiBAdHlwZWRlZiB7T2JqZWN0fSBSZXF1ZXN0RXJyb3JcbiAgICAgKiBAcHJvcGVydHkge251bWJlcn0gc3RhdHVzIEhUVFAgU3RhdHVzIENvZGUuXG4gICAgICogQHByb3BlcnR5IHsoc3RyaW5nfG51bGwpfSBzdGF0dXNUZXh0IFRleHQgSFRUUCBTdGF0dXMgVGV4dC5cbiAgICAgKiBAcHJvcGVydHkgeyhhbnl8c3RyaW5nfG51bGwpfSBkYXRhIFRyZWxsbyBBUEkgcmVzcG9uc2UuXG4gICAgICovXG4gICAgdGhpcy5lcnJvciA9IGVyciA9PiAoe1xuICAgICAgZXJyb3I6IHtcbiAgICAgICAgc3RhdHVzOiBlcnIucmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgICBzdGF0dXNUZXh0OiBlcnIucmVzcG9uc2Uuc3RhdHVzVGV4dCxcbiAgICAgICAgZGF0YTogZXJyLnJlc3BvbnNlLmRhdGFcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBRdWVyeSBQYXJhbWV0ZXJzIENvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSB7YW55fSBwYXJhbXMgT2JqZWN0IHRvIGJlIGluY2x1ZGVkIGFzIFVSTCBxdWVyeSBwYXJhbWV0ZXJzLlxuICAgKiBAcmV0dXJuIHtzdHJpbmd9IFVSTCBxdWVyeSBwYXJhbWV0ZXJzIGFzIHN0cmluZy5cbiAgICovXG4gIHF1ZXJ5UGFyYW1zKHBhcmFtcykge1xuICAgIGNvbnN0IGRhdGEgPSBwYXJhbXMgIT09IHVuZGVmaW5lZCA/IHBhcmFtcyA6IHt9O1xuICAgIGRhdGEua2V5ID0gIWRhdGEua2V5ID8gdGhpcy50cmVsbG9LZXkgOiBkYXRhLmtleTtcbiAgICBkYXRhLnRva2VuID0gIWRhdGEudG9rZW4gPyB0aGlzLnRyZWxsb1Rva2VuIDogZGF0YS50b2tlbjtcbiAgICBpZiAoIWRhdGEua2V5KSB0aHJvdyBFcnJvcignRGV2ZWxvcGVyIGtleSBtdXN0IGJlIHNldCBvbiBlYWNoIHJlcXVlc3QgKHZpYSBwYXJhbWV0ZXJzKSBvciBzZXQgdXBvbiBjb25zdHJ1Y3Rpb24uJyk7XG4gICAgaWYgKCFkYXRhLnRva2VuKVxuICAgICAgdGhyb3cgRXJyb3IoJ0F1dGhvcml6YXRpb24gdG9rZW4gbXVzdCBiZSBzZXQgb24gZWFjaCByZXF1ZXN0ICh2aWEgcGFyYW1ldGVycykgb3Igc2V0IHVwb24gY29uc3RydWN0aW9uLicpO1xuICAgIHJldHVybiBgPyR7T2JqZWN0LmtleXMoZGF0YSlcbiAgICAgIC5tYXAoa2V5ID0+IFtrZXksIGRhdGFba2V5XV0ubWFwKGVuY29kZVVSSUNvbXBvbmVudCkuam9pbignPScpKVxuICAgICAgLmpvaW4oJyYnKX1gO1xuICB9XG5cbiAgLyoqXG4gICAqIFVSTCBDb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0ge3N0cmluZ30gZW5kcG9pbnQgVHJlbGxvIEFQSSBlbmRwb2luZyBhcyBzdHJpbmcuXG4gICAqIEBwYXJhbSB7YW55fSBwYXJhbXMgT2JqZWN0IHRvIGJlIGluY2x1ZGVkIGFzIFVSTCBxdWVyeSBwYXJhbWV0ZXJzLlxuICAgKi9cbiAgdXJsKGVuZHBvaW50LCBwYXJhbXMpIHtcbiAgICByZXR1cm4gYCR7ZW5kcG9pbnR9JHt0aGlzLnF1ZXJ5UGFyYW1zKHBhcmFtcyl9YDtcbiAgfVxuXG4gIC8qKlxuICAgKiBCYXRjaCBHRVQgUmVxdWVzdFxuICAgKiBAcGFyYW0ge2FycmF5fSBlbmRwb2ludHMgQXJyYXkgb2YgdmFsaWQgVHJlbGxvIEFQSSBlbmRwb2ludHMuXG4gICAqL1xuICBiYXRjaChlbmRwb2ludHMpIHtcbiAgICByZXR1cm4gdGhpcy5nZXQoJy9iYXRjaCcsIHsgdXJsczogZW5kcG9pbnRzLmpvaW4oJywnKSB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHRVQgUmVxdWVzdCBIYW5kbGVyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBlbmRwb2ludCBUcmVsbG8gQVBJIGVuZHBvaW5nIGFzIHN0cmluZy5cbiAgICogQHBhcmFtIHthbnl9IHBhcmFtcyBPYmplY3QgdG8gYmUgaW5jbHVkZWQgYXMgVVJMIHF1ZXJ5IHBhcmFtZXRlcnMuXG4gICAqL1xuICBnZXQoZW5kcG9pbnQsIHBhcmFtcykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICByZXF1ZXN0XG4gICAgICAgIC5nZXQodGhpcy51cmwoZW5kcG9pbnQsIHBhcmFtcykpXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICByZXNvbHZlKHJlc3BvbnNlLmRhdGEpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4gcmVqZWN0KHRoaXMuZXJyb3IoZXJyb3IpKSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUE9TVCBSZXF1ZXN0IEhhbmRsZXJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGVuZHBvaW50IFRyZWxsbyBBUEkgZW5kcG9pbmcgYXMgc3RyaW5nLlxuICAgKiBAcGFyYW0ge2FueX0gcGFyYW1zIE9iamVjdCB0byBiZSBpbmNsdWRlZCBhcyBVUkwgcXVlcnkgcGFyYW1ldGVycy5cbiAgICogQHBhcmFtIHthbnl9IGRhdGFPYmogUmVxdWVzdCBib2R5LlxuICAgKi9cbiAgcG9zdChlbmRwb2ludCwgcGFyYW1zLCBkYXRhT2JqID0ge30pIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgcmVxdWVzdFxuICAgICAgICAucG9zdCh0aGlzLnVybChlbmRwb2ludCwgcGFyYW1zKSwgZGF0YU9iailcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgIHJlc29sdmUocmVzcG9uc2UuZGF0YSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiByZWplY3QodGhpcy5lcnJvcihlcnJvcikpKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQVVQgUmVxdWVzdCBIYW5kbGVyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBlbmRwb2ludCBUcmVsbG8gQVBJIGVuZHBvaW5nIGFzIHN0cmluZy5cbiAgICogQHBhcmFtIHthbnl9IHBhcmFtcyBPYmplY3QgdG8gYmUgaW5jbHVkZWQgYXMgVVJMIHF1ZXJ5IHBhcmFtZXRlcnMuXG4gICAqIEBwYXJhbSB7YW55fSBkYXRhT2JqIFJlcXVlc3QgYm9keS5cbiAgICovXG4gIHB1dChlbmRwb2ludCwgcGFyYW1zLCBkYXRhT2JqID0ge30pIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgcmVxdWVzdFxuICAgICAgICAucHV0KHRoaXMudXJsKGVuZHBvaW50LCBwYXJhbXMpLCBkYXRhT2JqKVxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgcmVzb2x2ZShyZXNwb25zZS5kYXRhKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHJlamVjdCh0aGlzLmVycm9yKGVycm9yKSkpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIERFTEVURSBSZXF1ZXN0IEhhbmRsZXJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGVuZHBvaW50IFRyZWxsbyBBUEkgZW5kcG9pbmcgYXMgc3RyaW5nLlxuICAgKiBAcGFyYW0ge2FueX0gcGFyYW1zIE9iamVjdCB0byBiZSBpbmNsdWRlZCBhcyBVUkwgcXVlcnkgcGFyYW1ldGVycy5cbiAgICovXG4gIGRlbGV0ZShlbmRwb2ludCwgcGFyYW1zKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHJlcXVlc3RcbiAgICAgICAgLmRlbGV0ZSh0aGlzLnVybChlbmRwb2ludCwgcGFyYW1zKSlcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgIHJlc29sdmUocmVzcG9uc2UuZGF0YSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiByZWplY3QodGhpcy5lcnJvcihlcnJvcikpKTtcbiAgICB9KTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEludGVyZmFjZTtcbiIsImNvbnN0IEludGVyZmFjZSA9IHJlcXVpcmUoJy4vSW50ZXJmYWNlJyk7XG5cbi8qKlxuICogQGNsYXNzIFRyZWxsb1xuICovXG5jbGFzcyBUcmVsbG8gZXh0ZW5kcyBJbnRlcmZhY2Uge1xuICAvKipcbiAgICogVG9rZW5zIEhhbmRsZXJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkVG9rZW4gUmVxdWlyZWQuIFRyZWxsbyBBUEkgVG9rZW5cbiAgICogQHJldHVybiB7dG9rZW5zfVxuICAgKi9cbiAgdG9rZW5zKGlkVG9rZW4pIHtcbiAgICAvKiogQG5hbWVzcGFjZSB0b2tlbnMgKi9cbiAgICBjb25zdCBtZXRob2RzID0ge1xuICAgICAgLyoqXG4gICAgICAgKiBAbWVtYmVyb2YgdG9rZW5zXG4gICAgICAgKiBAbWV0aG9kIGluZm9cbiAgICAgICAqIC0tIFJldHJpZXZlcyBpbmZvcm1hdGlvbiBhYm91dCB0aGUgdG9rZW4uXG4gICAgICAgKiBAcmV0dXJuIHtQcm9taXNlfVxuICAgICAgICovXG4gICAgICBpbmZvOiAoKSA9PiB0aGlzLmdldChgL3Rva2Vucy8ke2lkVG9rZW59YCksXG5cbiAgICAgIC8qKlxuICAgICAgICogQG1lbWJlcm9mIHRva2Vuc1xuICAgICAgICogQG1ldGhvZCBtZW1iZXJcbiAgICAgICAqIC0tIFJldHJpZXZlcyBtZW1iZXIgbW9kZWwgb2YgdG9rZW4ncyBvd25lci5cbiAgICAgICAqIEByZXR1cm4ge1Byb21pc2V9XG4gICAgICAgKi9cbiAgICAgIG1lbWJlcjogKCkgPT4gdGhpcy5nZXQoYC90b2tlbnMvJHtpZFRva2VufS9tZW1iZXJgKVxuICAgIH07XG5cbiAgICByZXR1cm4gbWV0aG9kcztcbiAgfVxuXG4gIC8qKlxuICAgKiBCb2FyZHMgUm91dGVzXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZEJvYXJkIEJvYXJkIElELlxuICAgKiBAcmV0dXJuIHtib2FyZHN9XG4gICAqL1xuICBib2FyZHMoaWRCb2FyZCkge1xuICAgIC8qKiBAbmFtZXNwYWNlIGJvYXJkcyAqL1xuICAgIGNvbnN0IG1ldGhvZHMgPSB7XG4gICAgICAvKipcbiAgICAgICAqIEBtZW1iZXJvZiBib2FyZHNcbiAgICAgICAqIEBtZXRob2QgYWN0aW9uc1xuICAgICAgICogQG5hbWUgYWN0aW9uc1xuICAgICAgICogLS0gUmV0cmlldmVzIGEgYm9hcmQncyBhY3Rpb25zLlxuICAgICAgICogQHJldHVybiB7UHJvbWlzZX1cbiAgICAgICAqL1xuICAgICAgYWN0aW9uczogKCkgPT4gdGhpcy5nZXQoYC9ib2FyZHMvJHtpZEJvYXJkfS9hY3Rpb25zYCksXG5cbiAgICAgIC8qKlxuICAgICAgICogQG1lbWJlcm9mIGJvYXJkc1xuICAgICAgICogQG1ldGhvZCBjYXJkc1xuICAgICAgICogLS0gUmV0cmlldmVzIGFsbCBjYXJkcyBvbiB0aGUgYm9hcmQuXG4gICAgICAgKiBAcGFyYW0ge3N0cmluZ30gW2lkQ2FyZE9yRmlsdGVyID0gZmFsc2VdXG4gICAgICAgKiAtLSBDYXJkIElEIG9yIGZpbHRlcjogYWxsLCBjbG9zZWQsIG5vbmUsIG9wZW4sIHZpc2libGUuXG4gICAgICAgKiBAcmV0dXJuIHtQcm9taXNlfVxuICAgICAgICovXG4gICAgICBjYXJkczogKGlkQ2FyZE9yRmlsdGVyID0gZmFsc2UpID0+XG4gICAgICAgIHRoaXMuZ2V0KGAvYm9hcmRzLyR7aWRCb2FyZH0vY2FyZHMke2lkQ2FyZE9yRmlsdGVyID8gYC8ke2lkQ2FyZE9yRmlsdGVyfWAgOiAnJ31gKSxcblxuICAgICAgLyoqXG4gICAgICAgKiBAbWVtYmVyb2YgYm9hcmRzXG4gICAgICAgKiBAbWV0aG9kIGluZm9cbiAgICAgICAqIC0tIFJldHJpZXZlcyB0aGUgYm9hcmQgaW5mb3JtYXRpb24uXG4gICAgICAgKiBAcGFyYW0ge3N0cmluZ30gW2ZpZWxkID0gZmFsc2VdXG4gICAgICAgKiAtLSBDaG9vc2UgYSBzcGVjaWZpYyBmaWVsZC5cbiAgICAgICAqIEByZXR1cm4ge1Byb21pc2V9XG4gICAgICAgKi9cbiAgICAgIGluZm86IChmaWVsZCA9IGZhbHNlKSA9PiB0aGlzLmdldChgL2JvYXJkcy8ke2lkQm9hcmR9JHtmaWVsZCA/IGAvJHtmaWVsZH1gIDogJyd9YCksXG5cbiAgICAgIC8qKlxuICAgICAgICogQG1lbWJlcm9mIGJvYXJkc1xuICAgICAgICogQG1ldGhvZCBsYWJlbHNcbiAgICAgICAqIC0tIFJldHJpZXZlcyBib2FyZCdzIGxhYmVscy5cbiAgICAgICAqIEByZXR1cm4ge1Byb21pc2V9XG4gICAgICAgKi9cbiAgICAgIGxhYmVsczogKCkgPT4gdGhpcy5nZXQoYC9ib2FyZHMvJHtpZEJvYXJkfS9sYWJlbHNgKSxcblxuICAgICAgLyoqXG4gICAgICAgKiBAbWVtYmVyb2YgYm9hcmRzXG4gICAgICAgKiBAbWV0aG9kIGxpc3RzXG4gICAgICAgKiAtLSBSZXRyaWV2ZXMgYm9hcmQncyBsaXN0cy5cbiAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbZmlsdGVyID0gZmFsc2VdXG4gICAgICAgKiAtLSBPbmUgb2YgYGFsbGAsIGBjbG9zZWRgLCBgbm9uZWAsIGBvcGVuYC5cbiAgICAgICAqIEByZXR1cm4ge1Byb21pc2V9XG4gICAgICAgKi9cbiAgICAgIGxpc3RzOiAoZmlsdGVyID0gZmFsc2UpID0+IHRoaXMuZ2V0KGAvYm9hcmRzLyR7aWRCb2FyZH0vbGlzdHMke2ZpbHRlciA/IGAvJHtmaWx0ZXJ9YCA6ICcnfWApLFxuXG4gICAgICAvKipcbiAgICAgICAqIEBtZW1iZXJvZiBib2FyZHNcbiAgICAgICAqIEBtZXRob2QgbWVtYmVyc1xuICAgICAgICogLS0gUmV0cmlldmVzIGJvYXJkJ3MgbWVtYmVycy5cbiAgICAgICAqIEByZXR1cm4ge1Byb21pc2V9XG4gICAgICAgKi9cbiAgICAgIG1lbWJlcnM6ICgpID0+IHRoaXMuZ2V0KGAvYm9hcmRzLyR7aWRCb2FyZH0vbWVtYmVyc2ApLFxuXG4gICAgICAvKipcbiAgICAgICAqIEBtZW1iZXJvZiBib2FyZHNcbiAgICAgICAqIEBtZXRob2QgbWVtYmVyc2hpcHNcbiAgICAgICAqIC0tIFJldHJpZXZlJ3MgYSBib2FyZCdzIG1lbWJlcnNoaXAgaW5mb3JtYXRpb24uXG4gICAgICAgKiBAcGFyYW0ge2FueX0gW3BhcmFtcyA9IHt9XSBPYmplY3QgdG8gYmUgaW5jbHVkZWQgYXMgVVJMIHF1ZXJ5IHBhcmFtZXRlcnMuXG4gICAgICAgKiBAcmV0dXJuIHtQcm9taXNlfVxuICAgICAgICovXG4gICAgICBtZW1iZXJzaGlwczogKHBhcmFtcyA9IHt9KSA9PiB0aGlzLmdldChgL2JvYXJkcy8ke2lkQm9hcmR9L21lbWJlcnNoaXBzYCwgcGFyYW1zKVxuICAgIH07XG4gICAgcmV0dXJuIG1ldGhvZHM7XG4gIH1cblxuICAvKipcbiAgICogTGlzdHNcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkTGlzdCBSZXF1aXJlZC4gTGlzdCBJRC5cbiAgICovXG4gIGxpc3RzKGlkTGlzdCkge1xuICAgIC8qKiBAbmFtZXNwYWNlIGxpc3RzICovXG4gICAgY29uc3QgbWV0aG9kcyA9IHtcbiAgICAgIC8qKlxuICAgICAgICogQG1lbWJlcm9mIGxpc3RzXG4gICAgICAgKiBAbWV0aG9kIGluZm9cbiAgICAgICAqIEBuYW1lIExpc3QgSW5mb3JtYXRpb25cbiAgICAgICAqIC0tIFJldHJpZXZlcyBhIGxpc3QncyBpbmZvcm1hdGlvblxuICAgICAgICogQHBhcmFtIHtzdHJpbmd9IFtmaWVsZCA9IGZhbHNlXVxuICAgICAgICogLS0gUmV0cmlldmUgYSBzaW5nbGUgZmllbGQuXG4gICAgICAgKiBAcmV0dXJuIHtQcm9taXNlfVxuICAgICAgICovXG4gICAgICBpbmZvOiAoZmllbGQgPSBmYWxzZSkgPT4gdGhpcy5nZXQoYC9saXN0cy8ke2lkTGlzdH0ke2ZpZWxkID8gYC8ke2ZpZWxkfWAgOiAnJ31gKSxcblxuICAgICAgLyoqXG4gICAgICAgKiBAbWVtYmVyb2YgbGlzdHNcbiAgICAgICAqIEBtZXRob2QgYWN0aW9uc1xuICAgICAgICogQG5hbWUgQWN0aW9uc1xuICAgICAgICogLS0gUmV0cmlldmUgbGlzdCdzIGFjdGlvbnMuXG4gICAgICAgKiBAcmV0dXJuIHtQcm9taXNlfVxuICAgICAgICovXG4gICAgICBhY3Rpb25zOiAoKSA9PiB0aGlzLmdldChgL2xpc3RzLyR7aWRMaXN0fS9hY3Rpb25zYCksXG5cbiAgICAgIC8qKlxuICAgICAgICogQG1lbWJlcm9mIGxpc3RzXG4gICAgICAgKiBAbWV0aG9kIGJvYXJkc1xuICAgICAgICogQG5hbWUgQm9hcmQgSW5mb3JtYXRpb25cbiAgICAgICAqIC0tIFJldHJpZXZlIGxpc3QncyBib2FyZCBpbmZvcm1hdGlvbi5cbiAgICAgICAqIEByZXR1cm4ge1Byb21pc2V9XG4gICAgICAgKi9cbiAgICAgIGJvYXJkOiAoKSA9PiB0aGlzLmdldChgL2xpc3RzLyR7aWRMaXN0fS9ib2FyZGApLFxuXG4gICAgICAvKipcbiAgICAgICAqIEBtZW1iZXJvZiBsaXN0c1xuICAgICAgICogQG1ldGhvZCBjYXJkc1xuICAgICAgICogQG5hbWUgQ2FyZHNcbiAgICAgICAqIC0tIFJldHJpZXZlIGFsbCBjYXJkcyBpbiB0aGUgbGlzdC5cbiAgICAgICAqIEByZXR1cm4ge1Byb21pc2V9XG4gICAgICAgKi9cbiAgICAgIGNhcmRzOiAoKSA9PiB0aGlzLmdldChgL2xpc3RzLyR7aWRMaXN0fS9jYXJkc2ApXG4gICAgfTtcblxuICAgIHJldHVybiBtZXRob2RzO1xuICB9XG5cbiAgLyoqXG4gICAqIENhcmRzXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZENhcmRcbiAgICovXG4gIGNhcmRzKGlkQ2FyZCkge1xuICAgIC8qKiBAbmFtZXNwYWNlIGNhcmRzICovXG4gICAgY29uc3QgbWV0aG9kcyA9IHtcbiAgICAgIC8qKlxuICAgICAgICogQG1lbWJlcm9mIGNhcmRzXG4gICAgICAgKiBAbWV0aG9kIGFjdGlvbnNcbiAgICAgICAqIEBuYW1lIEFjdGlvbnNcbiAgICAgICAqIC0tIFJldHJpZXZlcyBjYXJkJ3MgYWN0aW9ucy5cbiAgICAgICAqIEBwYXJhbSB7YW55fSBbcGFyYW1zID0ge31dIE9iamVjdCB0byBiZSBpbmNsdWRlZCBhcyBVUkwgcXVlcnkgcGFyYW1ldGVycy5cbiAgICAgICAqIC0tIFVSTCBxdWVyeSBwYXJhbWV0ZXJzIGFzIHN0cmluZy5cbiAgICAgICAqIEByZXR1cm4ge1Byb21pc2V9XG4gICAgICAgKi9cbiAgICAgIGFjdGlvbnM6IChwYXJhbXMgPSB7fSkgPT4gdGhpcy5nZXQoYC9jYXJkcy8ke2lkQ2FyZH0vYWN0aW9uc2AsIHBhcmFtcyksXG5cbiAgICAgIC8qKlxuICAgICAgICogQG1lbWJlcm9mIGNhcmRzXG4gICAgICAgKiBAbWV0aG9kIGF0dGFjaG1lbnRzXG4gICAgICAgKiBAbmFtZSBBdHRhY2htZW50c1xuICAgICAgICogLS0gUmV0cmlldmVzIGF0dGFjaG1lbnQgaW5mb3JtYXRpb24uXG4gICAgICAgKiBAcGFyYW0ge3N0cmluZ30gW2lkQXR0YWNobWVudCA9IGZhbHNlXVxuICAgICAgICogLS0gQXR0YWNobWVudCBJRFxuICAgICAgICogQHJldHVybiB7UHJvbWlzZX1cbiAgICAgICAqL1xuICAgICAgYXR0YWNobWVudHM6IChpZEF0dGFjaG1lbnQgPSBmYWxzZSkgPT5cbiAgICAgICAgdGhpcy5nZXQoYC9jYXJkcy8ke2lkQ2FyZH0vYXR0YWNobWVudHMke2lkQXR0YWNobWVudCA/IGAvJHtpZEF0dGFjaG1lbnR9YCA6ICcnfWApLFxuXG4gICAgICAvKipcbiAgICAgICAqIEBtZW1iZXJvZiBjYXJkc1xuICAgICAgICogQG1ldGhvZCBib2FyZFxuICAgICAgICogQG5hbWUgQm9hcmQgSW5mb3JtYXRpb25cbiAgICAgICAqIC0tIFJldHJpZXZlcyB0aGUgY2FyZCdzIGJvYXJkIGluZm9ybWF0aW9uLlxuICAgICAgICogQHJldHVybiB7UHJvbWlzZX1cbiAgICAgICAqL1xuICAgICAgYm9hcmQ6ICgpID0+IHRoaXMuZ2V0KGAvY2FyZHMvJHtpZENhcmR9L2JvYXJkYCksXG5cbiAgICAgIC8qKlxuICAgICAgICogQG1lbWJlcm9mIGNhcmRzXG4gICAgICAgKiBAbWV0aG9kIGluZm9cbiAgICAgICAqIEBuYW1lIENhcmQgSW5mb3JtYXRpb25cbiAgICAgICAqIC0tIFJldHJpZXZlcyBjYXJkIGluZm9ybWF0aW9uLlxuICAgICAgICogQHBhcmFtIHtzdHJpbmd9IFtmaWVsZCA9IGZhbHNlXVxuICAgICAgICogLS0gUmV0cmlldmUgYSBzaW5nbGUgZmllbGQgdmFsdWUuXG4gICAgICAgKiBAcmV0dXJuIHtQcm9taXNlfVxuICAgICAgICovXG4gICAgICBpbmZvOiAoZmllbGQgPSBmYWxzZSkgPT4gdGhpcy5nZXQoYC9jYXJkcy8ke2lkQ2FyZH0ke2ZpZWxkID8gYC8ke2ZpZWxkfWAgOiAnJ31gKSxcblxuICAgICAgLyoqXG4gICAgICAgKiBAbWVtYmVyb2YgY2FyZHNcbiAgICAgICAqIEBtZXRob2QgaW5mb1xuICAgICAgICogQG5hbWUgTGlzdCBJbmZvcm1hdGlvblxuICAgICAgICogLS0gUmV0cmlldmVzIGNhcmQncyBsaXN0IGluZm9ybWF0aW9uLlxuICAgICAgICogQHJldHVybiB7UHJvbWlzZX1cbiAgICAgICAqL1xuICAgICAgbGlzdDogKCkgPT4gdGhpcy5nZXQoYC9jYXJkcy8ke2lkQ2FyZH0vbGlzdGApLFxuICAgICAgLyoqXG4gICAgICAgKiBAbWVtYmVyb2YgY2FyZHNcbiAgICAgICAqIEBtZXRob2QgbWVtYmVyc1xuICAgICAgICogQG5hbWUgTWVtYmVyIEluZm9ybWF0aW9uXG4gICAgICAgKiAtLSBSZXRyaWV2ZXMgbWVibWVycyBhc3NpZ25lZCB0byB0aGUgY2FyZC5cbiAgICAgICAqIEByZXR1cm4ge1Byb21pc2V9XG4gICAgICAgKi9cbiAgICAgIG1lbWJlcnM6ICgpID0+IHRoaXMuZ2V0KGAvY2FyZHMvJHtpZENhcmR9L21lbWJlcnNgKSxcblxuICAgICAgLyoqXG4gICAgICAgKiBAbWVtYmVyb2YgY2FyZHNcbiAgICAgICAqIEBtZXRob2QgY29tbWVudHNcbiAgICAgICAqIEBuYW1lIENvbW1lbnRzXG4gICAgICAgKiAtLSBSZXRyaWV2ZSBjYXJkJ3MgY29tbWVudHMuXG4gICAgICAgKiBAcmV0dXJuIHtQcm9taXNlfVxuICAgICAgICovXG4gICAgICBjb21tZW50czogKCkgPT4gdGhpcy5nZXQoYC9jYXJkcy8ke2lkQ2FyZH0vYWN0aW9uc2AsIHsgZmlsdGVyOiAnY29tbWVudENhcmQnIH0pLFxuICAgICAgLyoqXG4gICAgICAgKiBAbWVtYmVyb2YgY2FyZHNcbiAgICAgICAqIEBtZXRob2QgYWRkQ29tbWVudFxuICAgICAgICogQG5hbWUgQWRkIENvbW1lbnRcbiAgICAgICAqIC0tIEFkZCBhIGNvbW1lbnQgdG8gYSBjYXJkLlxuICAgICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbW1lbnRcbiAgICAgICAqIC0tIFRoZSBjb21tZW50IHN0cmluZy5cbiAgICAgICAqIEByZXR1cm4ge1Byb21pc2V9XG4gICAgICAgKi9cbiAgICAgIGFkZENvbW1lbnQ6IGNvbW1lbnQgPT4gdGhpcy5wb3N0KGAvY2FyZHMvJHtpZENhcmR9L2FjdGlvbnMvY29tbWVudHNgLCB7IHRleHQ6IGNvbW1lbnQgfSksXG4gICAgICAvKipcbiAgICAgICAqIEBtZW1iZXJvZiBjYXJkc1xuICAgICAgICogQG1ldGhvZCBhZGRNZW1iZXJcbiAgICAgICAqIEBuYW1lIEFkZCBNZW1iZXJcbiAgICAgICAqIC0tIEFkZCBhIG1lbWJlciB0byBhIGNhcmQuXG4gICAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWRNZW1iZXJcbiAgICAgICAqIC0tIEEgbWVtYmVyJ3MgSURcbiAgICAgICAqIEByZXR1cm4ge1Byb21pc2V9XG4gICAgICAgKi9cbiAgICAgIGFkZE1lbWJlcjogaWRNZW1iZXIgPT4gdGhpcy5wb3N0KGAvY2FyZHMvJHtpZENhcmR9L2lkTWVtYmVyc2AsIHsgdmFsdWU6IGlkTWVtYmVyIH0pLFxuICAgICAgLyoqXG4gICAgICAgKiBAbWVtYmVyb2YgY2FyZHNcbiAgICAgICAqIEBtZXRob2QgcmVtb3ZlTWVtYmVyXG4gICAgICAgKiBAbmFtZSBSZW1vdmUgTWVtYmVyXG4gICAgICAgKiAtLSBSZW12b2UgYSBtZW1iZXIgZnJvbSB0aGUgY2FyZC5cbiAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZE1lbWJlclxuICAgICAgICogLS0gQSBtZW1iZXIncyBJRFxuICAgICAgICogQHJldHVybiB7UHJvbWlzZX1cbiAgICAgICAqL1xuICAgICAgcmVtb3ZlTWVtYmVyOiBpZE1lbWJlciA9PiB0aGlzLmRlbGV0ZShgL2NhcmRzLyR7aWRDYXJkfS9pZE1lbWJlcnMvJHtpZE1lbWJlcn1gKVxuICAgIH07XG4gICAgcmV0dXJuIG1ldGhvZHM7XG4gIH1cblxuICAvKipcbiAgICogTWVtYmVyc1xuICAgKiBAcGFyYW0ge3N0cmluZ30gaWRNZW1iZXIgTWVtYmVyIElEXG4gICAqL1xuICBtZW1iZXJzKGlkTWVtYmVyKSB7XG4gICAgLyoqIEBuYW1lc3BhY2UgbWVtYmVycyAqL1xuICAgIHJldHVybiB7XG4gICAgICAvKipcbiAgICAgICAqIEBtZW1iZXJvZiBtZW1iZXJzXG4gICAgICAgKiBAbWV0aG9kIGluZm9cbiAgICAgICAqIEBuYW1lIE1lbWJlciBJbmZvcm1hdGlvblxuICAgICAgICogLS0gUmV0cmlldmUgYSBtZW1iZXIncyBpbmZvcm1hdGlvbi5cbiAgICAgICAqIEBwYXJhbSB7YW55fSBbcGFyYW1zID0ge31dIE9iamVjdCB0byBiZSBpbmNsdWRlZCBhcyBVUkwgcXVlcnkgcGFyYW1ldGVycy5cbiAgICAgICAqIEByZXR1cm4ge1Byb21pc2V9XG4gICAgICAgKi9cbiAgICAgIGluZm86IChwYXJhbXMgPSB7fSkgPT4gdGhpcy5nZXQoYC9tZW1iZXJzLyR7aWRNZW1iZXJ9YCwgcGFyYW1zKSxcblxuICAgICAgLyoqXG4gICAgICAgKiBAbWVtYmVyb2YgbWVtYmVyc1xuICAgICAgICogQG1ldGhvZCBhY3Rpb25zXG4gICAgICAgKiBAbmFtZSBNZW1iZXIgQWN0aW9uc1xuICAgICAgICogLS0gUmV0cmlldmUgbWVtYmVyJ3MgYWN0aW9ucy5cbiAgICAgICAqIEByZXR1cm4ge1Byb21pc2V9XG4gICAgICAgKi9cbiAgICAgIGFjdGlvbnM6ICgpID0+IHRoaXMuZ2V0KGAvbWVtYmVycy8ke2lkTWVtYmVyfS9hY3Rpb25zYCksXG5cbiAgICAgIC8qKlxuICAgICAgICogQG1lbWJlcm9mIG1lbWJlcnNcbiAgICAgICAqIEBtZXRob2QgYm9hcmRzXG4gICAgICAgKiBAbmFtZSBNZW1iZXIgQm9hcmRzXG4gICAgICAgKiAtLSBSZXRyaWV2ZSBtZW1iZXIncyBib2FyZHMuXG4gICAgICAgKiBAcmV0dXJuIHtQcm9taXNlfVxuICAgICAgICovXG4gICAgICBib2FyZHM6ICgpID0+IHRoaXMuZ2V0KGAvbWVtYmVycy8ke2lkTWVtYmVyfS9ib2FyZHNgKSxcblxuICAgICAgLyoqXG4gICAgICAgKiBAbWVtYmVyb2YgbWVtYmVyc1xuICAgICAgICogQG1ldGhvZCBjYXJkc1xuICAgICAgICogQG5hbWUgTWVtYmVyIENhcmRzXG4gICAgICAgKiAtLSBSZXRyaWV2ZSBtZW1iZXIncyBjYXJkcy5cbiAgICAgICAqIEByZXR1cm4ge1Byb21pc2V9XG4gICAgICAgKi9cbiAgICAgIGNhcmRzOiAoKSA9PiB0aGlzLmdldChgL21lbWJlcnMvJHtpZE1lbWJlcn0vY2FyZHNgKSxcblxuICAgICAgLyoqXG4gICAgICAgKiBAbWVtYmVyb2YgbWVtYmVyc1xuICAgICAgICogQG1ldGhvZCBub3RpZmljYXRpb25zXG4gICAgICAgKiBAbmFtZSBNZW1iZXIgTm90aWZpY2F0aW9uc1xuICAgICAgICogLS0gUmV0cmlldmUgbWVtYmVyJ3Mgbm90aWZpY2F0aW9ucy5cbiAgICAgICAqIEByZXR1cm4ge1Byb21pc2V9XG4gICAgICAgKi9cbiAgICAgIG5vdGlmaWNhdGlvbnM6ICgpID0+IHRoaXMuZ2V0KGAvbWVtYmVycy8ke2lkTWVtYmVyfS9ub3RpZmljYXRpb25zYCksXG5cbiAgICAgIC8qKlxuICAgICAgICogQG1lbWJlcm9mIG1lbWJlcnNcbiAgICAgICAqIEBtZXRob2Qgb3JnYW5pemF0aW9uc1xuICAgICAgICogQG5hbWUgTWVtYmVyIE9yZ2FuaXphdGlvbnNcbiAgICAgICAqIC0tIFJldHJpZXZlIG1lbWJlcidzIG9yZ2FuaXphdGlvbnMuXG4gICAgICAgKiBAcmV0dXJuIHtQcm9taXNlfVxuICAgICAgICovXG4gICAgICBvcmdhbml6YXRpb25zOiAoKSA9PiB0aGlzLmdldChgL21lbWJlcnMvJHtpZE1lbWJlcn0vb3JnYW5pemF0aW9uc2ApXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBOb3RpZmljYXRpb25zXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbaWROb3RpZmljYXRpb24gPSAnJ10gTm90aWZpY2F0aW9uIElELlxuICAgKi9cbiAgbm90aWZpY2F0aW9ucyhpZE5vdGlmaWNhdGlvbiA9ICcnKSB7XG4gICAgLyoqIEBuYW1lc3BhY2Ugbm90aWZpY2F0aW9ucyAqL1xuICAgIGNvbnN0IG1ldGhvZHMgPSB7XG4gICAgICAvKipcbiAgICAgICAqIEBtZW1iZXJvZiBub3RpZmljYXRpb25zXG4gICAgICAgKiBAbWV0aG9kIGluZm9cbiAgICAgICAqIEBuYW1lIE5vdGlmaWNhdGlvbiBJbmZvcm1hdGlvblxuICAgICAgICogLS0gUmV0cmlldmUgbm90aWZpY2F0aW9uJ3MgYWN0aW9ucy5cbiAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbZmllbGQgPSBmYWxzZV1cbiAgICAgICAqIFJldHJpZXZlIG9ubHkgYSBjZXJ0YWluIGZpZWxkLlxuICAgICAgICogQHBhcmFtIHthbnl9IFtwYXJhbXMgPSB7fV0gT2JqZWN0IHRvIGJlIGluY2x1ZGVkIGFzIFVSTCBxdWVyeSBwYXJhbWV0ZXJzLlxuICAgICAgICogQHJldHVybiB7UHJvbWlzZX1cbiAgICAgICAqL1xuICAgICAgaW5mbzogKGZpZWxkID0gZmFsc2UsIHBhcmFtcyA9IHt9KSA9PlxuICAgICAgICB0aGlzLmdldChgL25vdGlmaWNhdGlvbnMvJHtpZE5vdGlmaWNhdGlvbn0ke2ZpZWxkID8gYC8ke2ZpZWxkfWAgOiAnJ31gLCBwYXJhbXMpLFxuXG4gICAgICAvKipcbiAgICAgICAqIEBtZW1iZXJvZiBub3RpZmljYXRpb25zXG4gICAgICAgKiBAbWV0aG9kIGJvYXJkXG4gICAgICAgKiBAbmFtZSBCb2FyZCBJbmZvcm1hdGlvblxuICAgICAgICogLS0gUmV0cmlldmUgbm90aWZpY2F0aW9uJ3MgYm9hcmQuXG4gICAgICAgKiBAcGFyYW0ge2FueX0gW3BhcmFtcyA9IHt9XSBPYmplY3QgdG8gYmUgaW5jbHVkZWQgYXMgVVJMIHF1ZXJ5IHBhcmFtZXRlcnMuXG4gICAgICAgKiBAcmV0dXJuIHtQcm9taXNlfVxuICAgICAgICovXG4gICAgICBib2FyZDogKHBhcmFtcyA9IHt9KSA9PiB0aGlzLmdldChgL25vdGlmaWNhdGlvbnMvJHtpZE5vdGlmaWNhdGlvbn0vYm9hcmRgLCBwYXJhbXMpLFxuXG4gICAgICAvKipcbiAgICAgICAqIEBtZW1iZXJvZiBub3RpZmljYXRpb25zXG4gICAgICAgKiBAbWV0aG9kIGxpc3RcbiAgICAgICAqIEBuYW1lIExpc3QgSW5mb3JtYXRpb25cbiAgICAgICAqIC0tIFJldHJpZXZlIG5vdGlmaWNhdGlvbidzIGxpc3QuXG4gICAgICAgKiBAcGFyYW0ge2FueX0gW3BhcmFtcyA9IHt9XSBPYmplY3QgdG8gYmUgaW5jbHVkZWQgYXMgVVJMIHF1ZXJ5IHBhcmFtZXRlcnMuXG4gICAgICAgKiBAcmV0dXJuIHtQcm9taXNlfVxuICAgICAgICovXG4gICAgICBsaXN0OiAocGFyYW1zID0ge30pID0+IHRoaXMuZ2V0KGAvbm90aWZpY2F0aW9ucy8ke2lkTm90aWZpY2F0aW9ufS9saXN0YCwgcGFyYW1zKSxcblxuICAgICAgLyoqXG4gICAgICAgKiBAbWVtYmVyb2Ygbm90aWZpY2F0aW9uc1xuICAgICAgICogQG1ldGhvZCBtZW1iZXJcbiAgICAgICAqIEBuYW1lIE1lbWJlciBJbmZvcm1hdGlvblxuICAgICAgICogLS0gUmV0cmlldmUgbm90aWZpY2F0aW9uJ3MgbWVtYmVyLlxuICAgICAgICogQHBhcmFtIHthbnl9IFtwYXJhbXMgPSB7fV0gT2JqZWN0IHRvIGJlIGluY2x1ZGVkIGFzIFVSTCBxdWVyeSBwYXJhbWV0ZXJzLlxuICAgICAgICogQHJldHVybiB7UHJvbWlzZX1cbiAgICAgICAqL1xuICAgICAgbWVtYmVyOiAocGFyYW1zID0ge30pID0+IHRoaXMuZ2V0KGAvbm90aWZpY2F0aW9ucy8ke2lkTm90aWZpY2F0aW9ufS9tZW1iZXJgLCBwYXJhbXMpLFxuXG4gICAgICAvKipcbiAgICAgICAqIEBtZW1iZXJvZiBub3RpZmljYXRpb25zXG4gICAgICAgKiBAbWV0aG9kIG1lbWJlckNyZWF0b3JcbiAgICAgICAqIEBuYW1lIE1lbWJlckNyZWF0b3IgSW5mb3JtYXRpb25cbiAgICAgICAqIC0tIFJldHJpZXZlIG5vdGlmaWNhdGlvbidzIG1lbWJlckNyZWF0b3IuXG4gICAgICAgKiBAcGFyYW0ge2FueX0gW3BhcmFtcyA9IHt9XSBPYmplY3QgdG8gYmUgaW5jbHVkZWQgYXMgVVJMIHF1ZXJ5IHBhcmFtZXRlcnMuXG4gICAgICAgKiBAcmV0dXJuIHtQcm9taXNlfVxuICAgICAgICovXG4gICAgICBtZW1iZXJDcmVhdG9yOiAocGFyYW1zID0ge30pID0+IHRoaXMuZ2V0KGAvbm90aWZpY2F0aW9ucy8ke2lkTm90aWZpY2F0aW9ufS9tZW1iZXJDcmVhdG9yYCwgcGFyYW1zKSxcblxuICAgICAgLyoqXG4gICAgICAgKiBAbWVtYmVyb2Ygbm90aWZpY2F0aW9uc1xuICAgICAgICogQG1ldGhvZCBvcmdhbml6YXRpb25cbiAgICAgICAqIEBuYW1lIE9yZ2FuaXphdGlvbiBJbmZvcm1hdGlvblxuICAgICAgICogLS0gUmV0cmlldmUgbm90aWZpY2F0aW9uJ3Mgb3JnYW5pemF0aW9uLlxuICAgICAgICogQHBhcmFtIHthbnl9IFtwYXJhbXMgPSB7fV0gT2JqZWN0IHRvIGJlIGluY2x1ZGVkIGFzIFVSTCBxdWVyeSBwYXJhbWV0ZXJzLlxuICAgICAgICogQHJldHVybiB7UHJvbWlzZX1cbiAgICAgICAqL1xuICAgICAgb3JnYW5pemF0aW9uOiAocGFyYW1zID0ge30pID0+IHRoaXMuZ2V0KGAvbm90aWZpY2F0aW9ucy8ke2lkTm90aWZpY2F0aW9ufS9vcmdhbml6YXRpb25gLCBwYXJhbXMpLFxuXG4gICAgICAvKipcbiAgICAgICAqIEBtZW1iZXJvZiBub3RpZmljYXRpb25zXG4gICAgICAgKiBAbWV0aG9kIG1hcmtBbGxBc1JlYWRcbiAgICAgICAqIEBuYW1lIE1hcmsgQWxsIE5vdGlmaWNhdGlvbnMgUmVhZFxuICAgICAgICogLS0gTWFyayBhbGwgVHJlbGxvIG5vdGlmaWNhdGlvbnMgYXMgcmVhZC5cbiAgICAgICAqIEByZXR1cm4ge1Byb21pc2V9XG4gICAgICAgKi9cbiAgICAgIG1hcmtBbGxBc1JlYWQ6ICgpID0+IHRoaXMucG9zdChgL25vdGlmaWNhdGlvbnMvYWxsL3JlYWRgKSxcblxuICAgICAgLyoqXG4gICAgICAgKiBAbWVtYmVyb2Ygbm90aWZpY2F0aW9uc1xuICAgICAgICogQG1ldGhvZCBtYXJrQXNSZWFkXG4gICAgICAgKiBAbmFtZSBNYXJrIE5vdGlmaWNhdGlvbiBhcyBSZWFkXG4gICAgICAgKiAtLSBNYXJrIHNpbmdsZSBUcmVsbG8gbm90aWZpY2F0aW9ucyBhcyByZWFkLlxuICAgICAgICogQHJldHVybiB7UHJvbWlzZX1cbiAgICAgICAqL1xuICAgICAgbWFya0FzUmVhZDogKCkgPT4gdGhpcy5wdXQoYC9ub3RpZmljYXRpb25zLyR7aWROb3RpZmljYXRpb259YCwgeyB1bnJlYWQ6IGZhbHNlIH0pLFxuXG4gICAgICAvKipcbiAgICAgICAqIEBtZW1iZXJvZiBub3RpZmljYXRpb25zXG4gICAgICAgKiBAbWV0aG9kIG1hcmtBc1VucmVhZFxuICAgICAgICogQG5hbWUgTWFyayBhIG5vdGlmaWNhdGlvbiBhcyBub3QgcmVhZC5cbiAgICAgICAqIC0tIE1hcmsgYWxsIFRyZWxsbyBub3RpZmljYXRpb25zIGFzIHVucmVhZC5cbiAgICAgICAqIEByZXR1cm4ge1Byb21pc2V9XG4gICAgICAgKi9cbiAgICAgIG1hcmtBc1VucmVhZDogKCkgPT4gdGhpcy5wdXQoYC9ub3RpZmljYXRpb25zLyR7aWROb3RpZmljYXRpb259YCwgeyB1bnJlYWQ6IHRydWUgfSlcbiAgICB9O1xuICAgIHJldHVybiBtZXRob2RzO1xuICB9XG5cbiAgLyoqXG4gICAqIFRyZWxsbyBTZWFyY2hcbiAgICogQHBhcmFtIHsqfSBxdWVyeSBHbG9iYWxseSBzZWFyY2hlZCBzdHJpbmcgb3IgT2JqZWN0IHdpdGggcXVlcnkgcGFyYW1ldGVycyBkZWZpbmVkIGluIFRyZWxsbyBkb2NzLlxuICAgKi9cbiAgc2VhcmNoKHF1ZXJ5SW5wdXQpIHtcbiAgICBsZXQgcXVlcnkgPSBxdWVyeUlucHV0O1xuICAgIGlmICh0eXBlb2YgcXVlcnkgPT09ICdzdHJpbmcnKSB7XG4gICAgICBxdWVyeSA9IHtcbiAgICAgICAgcXVlcnlcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmdldChgL3NlYXJjaGAsIHF1ZXJ5KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZWFyY2ggTWVtYmVyc1xuICAgKiBAcGFyYW0geyp9IHF1ZXJ5XG4gICAqL1xuICBzZWFyY2hNZW1iZXJzKHF1ZXJ5SW5wdXQpIHtcbiAgICBsZXQgcXVlcnkgPSBxdWVyeUlucHV0O1xuICAgIGlmICh0eXBlb2YgcXVlcnkgPT09ICdzdHJpbmcnKSB7XG4gICAgICBxdWVyeSA9IHtcbiAgICAgICAgcXVlcnlcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmdldChgL3NlYXJjaC9tZW1iZXJzYCwgcXVlcnkpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gVHJlbGxvO1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2xpYi9UcmVsbG8nKTsiXSwibmFtZXMiOlsiaXNCdWZmZXIiLCJidG9hIiwicmVxdWlyZSQkMCIsImNvb2tpZXMiLCJyZXF1aXJlJCQxIiwiZGVmYXVsdHMiLCJJbnRlcmNlcHRvck1hbmFnZXIiLCJDYW5jZWwiLCJBeGlvcyIsImF4aW9zIiwicmVxdWlyZSQkMiIsInJlcXVpcmUkJDMiLCJyZXF1ZXN0IiwiY3JlYXRlIiwiSW50ZXJmYWNlIiwic2V0dGluZ3NPYmoiLCJ0cmVsbG9LZXkiLCJ0cmVsbG9Ub2tlbiIsImVycm9yIiwiZXJyIiwicmVzcG9uc2UiLCJzdGF0dXMiLCJzdGF0dXNUZXh0IiwiZGF0YSIsInBhcmFtcyIsInVuZGVmaW5lZCIsImtleSIsInRva2VuIiwiRXJyb3IiLCJPYmplY3QiLCJrZXlzIiwibWFwIiwiZW5jb2RlVVJJQ29tcG9uZW50Iiwiam9pbiIsImVuZHBvaW50IiwicXVlcnlQYXJhbXMiLCJlbmRwb2ludHMiLCJnZXQiLCJ1cmxzIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJ1cmwiLCJ0aGVuIiwiY2F0Y2giLCJkYXRhT2JqIiwicG9zdCIsInB1dCIsImRlbGV0ZSIsIlRyZWxsbyIsImlkVG9rZW4iLCJtZXRob2RzIiwiaWRCb2FyZCIsImlkQ2FyZE9yRmlsdGVyIiwiZmllbGQiLCJmaWx0ZXIiLCJpZExpc3QiLCJpZENhcmQiLCJpZEF0dGFjaG1lbnQiLCJ0ZXh0IiwiY29tbWVudCIsInZhbHVlIiwiaWRNZW1iZXIiLCJpZE5vdGlmaWNhdGlvbiIsInVucmVhZCIsInF1ZXJ5SW5wdXQiLCJxdWVyeSJdLCJtYXBwaW5ncyI6Ijs7O0FBRUEsUUFBYyxHQUFHLFNBQVMsSUFBSSxDQUFDLEVBQUUsRUFBRSxPQUFPLEVBQUU7RUFDMUMsT0FBTyxTQUFTLElBQUksR0FBRztJQUNyQixJQUFJLElBQUksR0FBRyxJQUFJLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdkMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7TUFDcEMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUN4QjtJQUNELE9BQU8sRUFBRSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7R0FDaEMsQ0FBQztDQUNIOztBQ1ZEOzs7Ozs7Ozs7QUFTQSxjQUFjLEdBQUcsVUFBVSxHQUFHLEVBQUU7RUFDOUIsT0FBTyxHQUFHLElBQUksSUFBSSxLQUFLLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxZQUFZLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUM7RUFDOUU7O0FBRUQsU0FBUyxRQUFRLEVBQUUsR0FBRyxFQUFFO0VBQ3RCLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxXQUFXLElBQUksT0FBTyxHQUFHLENBQUMsV0FBVyxDQUFDLFFBQVEsS0FBSyxVQUFVLElBQUks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
