var AjaxUtil =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _urlSearchParams = __webpack_require__(2);
	
	var _urlSearchParams2 = _interopRequireDefault(_urlSearchParams);
	
	function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : { default: obj };
	}
	
	__webpack_require__(3);
	
	var loading = null;
	module.exports = {
	
	    call: function call(url, param, setting) {
	
	        var self = this;
	
	        var _setting = this.handleSetting(setting);
	
	        var _url = this.handleGetUrl(url, param, _setting);
	
	        var _request = this.buildRequest(_url, param, _setting);
	
	        if (_setting["block"]) {
	            this.show();
	        }
	
	        return new Promise(function (resolve, reject) {
	            return fetch(_request).then(function (response) {
	
	                var _response = self.handleResponse(response, _setting);
	
	                if (_response) {
	                    resolve(_response);
	                } else {
	                    reject(_response);
	                }
	
	                if (_setting["block"]) {
	                    self.hide();
	                }
	            }, function (error) {
	                console.log(error);
	                reject(error);
	            });
	        });
	    },
	
	    show: function show() {
	        var loading = document.getElementById("rloading");
	        var height = document.body.offsetHeight;
	        var screen = window.screen.height;
	        if (screen > height) {
	            height = screen;
	        }
	        loading.style.height = height + 'px';
	        loading.style.display = 'block';
	        document.body.style.overflowX = "hidden";
	        document.body.style.overflowY = "hidden";
	    },
	
	    hide: function hide() {
	        var loading = document.getElementById("rloading");
	        loading.style.display = 'none';
	        document.body.style.overflowX = "auto";
	        document.body.style.overflowY = "auto";
	    },
	
	    handleSetting: function handleSetting(setting) {
	        if (setting == null) {
	            setting = {};
	            setting.method = "GET";
	            setting.block = false;
	            setting.dataType = "json";
	            setting.contentType = "application/json; charset=UTF-8";
	            setting.stringify = true;
	        } else {
	            if (setting["method"] == null) {
	                setting.method = "GET";
	            }
	            if (setting["block"] == null) {
	                setting.block = false;
	            }
	            if (setting["dataType"] == null) {
	                setting.dataType = "json";
	            }
	            if (setting["contentType"] == null) {
	                setting.contentType = "application/json; charset=UTF-8";
	            }
	            if (setting["stringify"] == null) {
	                setting.stringify = true;
	            }
	        }
	        return setting;
	    },
	    handleGetUrl: function handleGetUrl(url, param, setting) {
	
	        if (param != null && setting["method"] == 'GET') {
	            var u = new _urlSearchParams2.default();
	            for (var key in param) {
	                u.append(key, param[key]);
	            }
	            return url + "?" + u;
	        } else {
	            return url;
	        }
	    },
	    checkContentType: function checkContentType(type, _setting) {
	        if (_setting["contentType"].indexOf(type) > 0) {
	            return true;
	        } else {
	            return false;
	        }
	    },
	    buildRequest: function buildRequest(_url, param, _setting) {
	
	        var headers = new Headers();
	        if (this.checkContentType("json", _setting)) {
	            headers.append('Accept', 'application/json');
	            headers.append('Content-Type', 'application/json; charset=UTF-8');
	        } else if (_setting["contentType"]) {
	            headers.append('Content-Type', _setting["contentType"]);
	        }
	
	        var setionToken = sessionStorage.getItem("Authorization");
	        if (setionToken) {
	            headers.append("Authorization", 'Bearer ' + setionToken.substr(13).split("&")[0]);
	        }
	        var headerSetting = _setting['headers'];
	        if (headerSetting) {
	            for (var key in headerSetting) {
	                headers.append(key + "", headerSetting[key] + "");
	            }
	        }
	
	        var request = null;
	        var requestObject = {
	            method: _setting.method,
	            mode: "cors",
	            headers: headers
	        };
	        var requestSetting = _setting['requests'];
	        if (requestSetting) {
	            for (var _key in requestSetting) {
	                requestObject[_key] = requestSetting[_key];
	            }
	        }
	
	        if (param != null && _setting["method"] == 'POST') {
	            requestObject["body"] = JSON.stringify(param);
	        }
	        request = new Request(_url, requestObject);
	
	        return request;
	    },
	    handleResponse: function handleResponse(response, _setting) {
	        if (!response.ok) {
	            if (toastr) {
	                toastr.options = $.extend({}, toastr.options, {
	                    "timeOut": "50000"
	                });
	                try {
	                    response.json().then(function (json) {
	                        if (json.status == 500) {
	                            toastr["error"]('' + json.message, 'Status Code: ' + response.status);
	                        }
	                        if (json.status == 401) {
	                            var config = JSON.parse(sessionStorage.getItem("project_config"));
	                            logout(config);
	                        }
	                    });
	                } catch (error) {
	                    toastr["error"]('Please contact system administrator.', 'Status Code: ' + response.status);
	                }
	            } else if (window.location.href.indexOf("localhost") > -1 || window.location.href.indexOf("127.0.0.1") > -1) {
	                window.location.href = 'http://knowledge.ebaotech.com/static/error/' + response.status + '.html';
	            } else {
	                window.location.href = '/static/error/' + response.status + '.html';
	            }
	            this.hide();
	            return null;
	        } else if ("204" == response.status) {
	            var myJson = new Blob();
	            var init = { "status": 200, "statusText": "no content" };
	            var myResponse = new Response(myJson, init);
	            return myResponse.blob();
	        } else if (this.checkContentType("json", _setting)) {
	            return response.json();
	        } else if (this.checkContentType("text", _setting)) {
	            return response.text();
	        } else {
	            return response;
	        }
	    }
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/*!
	Copyright (C) 2015 by WebReflection
	
	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:
	
	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.
	
	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE.
	
	*/
	'use strict';
	
	function encode(str) {
	  return encodeURIComponent(str).replace(find, replacer);
	}
	
	function decode(str) {
	  return decodeURIComponent(str.replace(plus, ' '));
	}
	
	function URLSearchParams(query) {
	  this[secret] = Object.create(null);
	  if (!query) return;
	  if (query.charAt(0) === '?') {
	    query = query.slice(1);
	  }
	  for (var
	    index, value,
	    pairs = (query || '').split('&'),
	    i = 0,
	    length = pairs.length; i < length; i++
	  ) {
	    value = pairs[i];
	    index = value.indexOf('=');
	    if (-1 < index) {
	      this.append(
	        decode(value.slice(0, index)),
	        decode(value.slice(index + 1))
	      );
	    } else if (value.length){
	      this.append(
	        decode(value),
	        ''
	      );
	    }
	  }
	}
	
	var
	  URLSearchParamsProto = URLSearchParams.prototype,
	  find = /[!'\(\)~]|%20|%00/g,
	  plus = /\+/g,
	  replace = {
	    '!': '%21',
	    "'": '%27',
	    '(': '%28',
	    ')': '%29',
	    '~': '%7E',
	    '%20': '+',
	    '%00': '\x00'
	  },
	  replacer = function (match) {
	    return replace[match];
	  },
	  iterable = isIterable(),
	  secret = '__URLSearchParams__:' + Math.random()
	;
	
	function isIterable() {
	  try {
	    return !!Symbol.iterator;
	  } catch(error) {
	    return false;
	  }
	}
	
	URLSearchParamsProto.append = function append(name, value) {
	  var dict = this[secret];
	  if (name in dict) {
	    dict[name].push('' + value);
	  } else {
	    dict[name] = ['' + value];
	  }
	};
	
	URLSearchParamsProto.delete = function del(name) {
	  delete this[secret][name];
	};
	
	URLSearchParamsProto.get = function get(name) {
	  var dict = this[secret];
	  return name in dict ? dict[name][0] : null;
	};
	
	URLSearchParamsProto.getAll = function getAll(name) {
	  var dict = this[secret];
	  return name in dict ? dict[name].slice(0) : [];
	};
	
	URLSearchParamsProto.has = function has(name) {
	  return name in this[secret];
	};
	
	URLSearchParamsProto.set = function set(name, value) {
	  this[secret][name] = ['' + value];
	};
	
	URLSearchParamsProto.forEach = function forEach(callback, thisArg) {
	  var dict = this[secret];
	  Object.getOwnPropertyNames(dict).forEach(function(name) {
	    dict[name].forEach(function(value) {
	      callback.call(thisArg, value, name, this);
	    }, this);
	  }, this);
	};
	
	URLSearchParamsProto.keys = function keys() {
	  var items = [];
	  this.forEach(function(value, name) { items.push(name); });
	  var iterator = {
	    next: function() {
	      var value = items.shift();
	      return {done: value === undefined, value: value};
	    }
	  };
	
	  if (iterable) {
	    iterator[Symbol.iterator] = function() {
	      return iterator;
	    };
	  }
	
	  return iterator;
	};
	
	URLSearchParamsProto.values = function values() {
	  var items = [];
	  this.forEach(function(value) { items.push(value); });
	  var iterator = {
	    next: function() {
	      var value = items.shift();
	      return {done: value === undefined, value: value};
	    }
	  };
	
	  if (iterable) {
	    iterator[Symbol.iterator] = function() {
	      return iterator;
	    };
	  }
	
	  return iterator;
	};
	
	URLSearchParamsProto.entries = function entries() {
	  var items = [];
	  this.forEach(function(value, name) { items.push([name, value]); });
	  var iterator = {
	    next: function() {
	      var value = items.shift();
	      return {done: value === undefined, value: value};
	    }
	  };
	
	  if (iterable) {
	    iterator[Symbol.iterator] = function() {
	      return iterator;
	    };
	  }
	
	  return iterator;
	};
	
	if (iterable) {
	  URLSearchParamsProto[Symbol.iterator] = URLSearchParamsProto.entries;
	}
	
	/*
	URLSearchParamsProto.toBody = function() {
	  return new Blob(
	    [this.toString()],
	    {type: 'application/x-www-form-urlencoded'}
	  );
	};
	*/
	
	URLSearchParamsProto.toJSON = function toJSON() {
	  return {};
	};
	
	URLSearchParamsProto.toString = function toString() {
	  var dict = this[secret], query = [], i, key, name, value;
	  for (key in dict) {
	    name = encode(key);
	    for (
	      i = 0,
	      value = dict[key];
	      i < value.length; i++
	    ) {
	      query.push(name + '=' + encode(value[i]));
	    }
	  }
	  return query.join('&');
	};
	
	module.exports = global.URLSearchParams || URLSearchParams;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 3 */
/***/ function(module, exports) {

	(function(self) {
	  'use strict';
	
	  if (self.fetch) {
	    return
	  }
	
	  var support = {
	    searchParams: 'URLSearchParams' in self,
	    iterable: 'Symbol' in self && 'iterator' in Symbol,
	    blob: 'FileReader' in self && 'Blob' in self && (function() {
	      try {
	        new Blob()
	        return true
	      } catch(e) {
	        return false
	      }
	    })(),
	    formData: 'FormData' in self,
	    arrayBuffer: 'ArrayBuffer' in self
	  }
	
	  if (support.arrayBuffer) {
	    var viewClasses = [
	      '[object Int8Array]',
	      '[object Uint8Array]',
	      '[object Uint8ClampedArray]',
	      '[object Int16Array]',
	      '[object Uint16Array]',
	      '[object Int32Array]',
	      '[object Uint32Array]',
	      '[object Float32Array]',
	      '[object Float64Array]'
	    ]
	
	    var isDataView = function(obj) {
	      return obj && DataView.prototype.isPrototypeOf(obj)
	    }
	
	    var isArrayBufferView = ArrayBuffer.isView || function(obj) {
	      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
	    }
	  }
	
	  function normalizeName(name) {
	    if (typeof name !== 'string') {
	      name = String(name)
	    }
	    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
	      throw new TypeError('Invalid character in header field name')
	    }
	    return name.toLowerCase()
	  }
	
	  function normalizeValue(value) {
	    if (typeof value !== 'string') {
	      value = String(value)
	    }
	    return value
	  }
	
	  // Build a destructive iterator for the value list
	  function iteratorFor(items) {
	    var iterator = {
	      next: function() {
	        var value = items.shift()
	        return {done: value === undefined, value: value}
	      }
	    }
	
	    if (support.iterable) {
	      iterator[Symbol.iterator] = function() {
	        return iterator
	      }
	    }
	
	    return iterator
	  }
	
	  function Headers(headers) {
	    this.map = {}
	
	    if (headers instanceof Headers) {
	      headers.forEach(function(value, name) {
	        this.append(name, value)
	      }, this)
	
	    } else if (headers) {
	      Object.getOwnPropertyNames(headers).forEach(function(name) {
	        this.append(name, headers[name])
	      }, this)
	    }
	  }
	
	  Headers.prototype.append = function(name, value) {
	    name = normalizeName(name)
	    value = normalizeValue(value)
	    var oldValue = this.map[name]
	    this.map[name] = oldValue ? oldValue+','+value : value
	  }
	
	  Headers.prototype['delete'] = function(name) {
	    delete this.map[normalizeName(name)]
	  }
	
	  Headers.prototype.get = function(name) {
	    name = normalizeName(name)
	    return this.has(name) ? this.map[name] : null
	  }
	
	  Headers.prototype.has = function(name) {
	    return this.map.hasOwnProperty(normalizeName(name))
	  }
	
	  Headers.prototype.set = function(name, value) {
	    this.map[normalizeName(name)] = normalizeValue(value)
	  }
	
	  Headers.prototype.forEach = function(callback, thisArg) {
	    for (var name in this.map) {
	      if (this.map.hasOwnProperty(name)) {
	        callback.call(thisArg, this.map[name], name, this)
	      }
	    }
	  }
	
	  Headers.prototype.keys = function() {
	    var items = []
	    this.forEach(function(value, name) { items.push(name) })
	    return iteratorFor(items)
	  }
	
	  Headers.prototype.values = function() {
	    var items = []
	    this.forEach(function(value) { items.push(value) })
	    return iteratorFor(items)
	  }
	
	  Headers.prototype.entries = function() {
	    var items = []
	    this.forEach(function(value, name) { items.push([name, value]) })
	    return iteratorFor(items)
	  }
	
	  if (support.iterable) {
	    Headers.prototype[Symbol.iterator] = Headers.prototype.entries
	  }
	
	  function consumed(body) {
	    if (body.bodyUsed) {
	      return Promise.reject(new TypeError('Already read'))
	    }
	    body.bodyUsed = true
	  }
	
	  function fileReaderReady(reader) {
	    return new Promise(function(resolve, reject) {
	      reader.onload = function() {
	        resolve(reader.result)
	      }
	      reader.onerror = function() {
	        reject(reader.error)
	      }
	    })
	  }
	
	  function readBlobAsArrayBuffer(blob) {
	    var reader = new FileReader()
	    var promise = fileReaderReady(reader)
	    reader.readAsArrayBuffer(blob)
	    return promise
	  }
	
	  function readBlobAsText(blob) {
	    var reader = new FileReader()
	    var promise = fileReaderReady(reader)
	    reader.readAsText(blob)
	    return promise
	  }
	
	  function readArrayBufferAsText(buf) {
	    var view = new Uint8Array(buf)
	    var chars = new Array(view.length)
	
	    for (var i = 0; i < view.length; i++) {
	      chars[i] = String.fromCharCode(view[i])
	    }
	    return chars.join('')
	  }
	
	  function bufferClone(buf) {
	    if (buf.slice) {
	      return buf.slice(0)
	    } else {
	      var view = new Uint8Array(buf.byteLength)
	      view.set(new Uint8Array(buf))
	      return view.buffer
	    }
	  }
	
	  function Body() {
	    this.bodyUsed = false
	
	    this._initBody = function(body) {
	      this._bodyInit = body
	      if (!body) {
	        this._bodyText = ''
	      } else if (typeof body === 'string') {
	        this._bodyText = body
	      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
	        this._bodyBlob = body
	      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
	        this._bodyFormData = body
	      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
	        this._bodyText = body.toString()
	      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
	        this._bodyArrayBuffer = bufferClone(body.buffer)
	        // IE 10-11 can't handle a DataView body.
	        this._bodyInit = new Blob([this._bodyArrayBuffer])
	      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
	        this._bodyArrayBuffer = bufferClone(body)
	      } else {
	        throw new Error('unsupported BodyInit type')
	      }
	
	      if (!this.headers.get('content-type')) {
	        if (typeof body === 'string') {
	          this.headers.set('content-type', 'text/plain;charset=UTF-8')
	        } else if (this._bodyBlob && this._bodyBlob.type) {
	          this.headers.set('content-type', this._bodyBlob.type)
	        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
	          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
	        }
	      }
	    }
	
	    if (support.blob) {
	      this.blob = function() {
	        var rejected = consumed(this)
	        if (rejected) {
	          return rejected
	        }
	
	        if (this._bodyBlob) {
	          return Promise.resolve(this._bodyBlob)
	        } else if (this._bodyArrayBuffer) {
	          return Promise.resolve(new Blob([this._bodyArrayBuffer]))
	        } else if (this._bodyFormData) {
	          throw new Error('could not read FormData body as blob')
	        } else {
	          return Promise.resolve(new Blob([this._bodyText]))
	        }
	      }
	
	      this.arrayBuffer = function() {
	        if (this._bodyArrayBuffer) {
	          return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
	        } else {
	          return this.blob().then(readBlobAsArrayBuffer)
	        }
	      }
	    }
	
	    this.text = function() {
	      debugger;
	      console.log("in text function...",this);
	      console.log("body text:",this._bodyText);
	      var rejected = consumed(this)
	      if (rejected) {
	        return rejected
	      }
	
	      if (this._bodyBlob) {
	        return readBlobAsText(this._bodyBlob)
	      } else if (this._bodyArrayBuffer) {
	        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
	      } else if (this._bodyFormData) {
	        throw new Error('could not read FormData body as text')
	      } else {
	        return Promise.resolve(this._bodyText)
	      }
	    }
	
	    if (support.formData) {
	      this.formData = function() {
	        return this.text().then(decode)
	      }
	    }
	
	    this.json = function() {
	      debugger;
	      return this.text().then(JSON.parse)
	    }
	
	    return this
	  }
	
	  // HTTP methods whose capitalization should be normalized
	  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']
	
	  function normalizeMethod(method) {
	    var upcased = method.toUpperCase()
	    return (methods.indexOf(upcased) > -1) ? upcased : method
	  }
	
	  function Request(input, options) {
	    options = options || {}
	    var body = options.body
	
	    if (input instanceof Request) {
	      if (input.bodyUsed) {
	        throw new TypeError('Already read')
	      }
	      this.url = input.url
	      this.credentials = input.credentials
	      if (!options.headers) {
	        this.headers = new Headers(input.headers)
	      }
	      this.method = input.method
	      this.mode = input.mode
	      if (!body && input._bodyInit != null) {
	        body = input._bodyInit
	        input.bodyUsed = true
	      }
	    } else {
	      this.url = String(input)
	    }
	
	    this.credentials = options.credentials || this.credentials || 'omit'
	    if (options.headers || !this.headers) {
	      this.headers = new Headers(options.headers)
	    }
	    this.method = normalizeMethod(options.method || this.method || 'GET')
	    this.mode = options.mode || this.mode || null
	    this.referrer = null
	
	    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
	      throw new TypeError('Body not allowed for GET or HEAD requests')
	    }
	    this._initBody(body)
	  }
	
	  Request.prototype.clone = function() {
	    return new Request(this, { body: this._bodyInit })
	  }
	
	  function decode(body) {
	    var form = new FormData()
	    body.trim().split('&').forEach(function(bytes) {
	      if (bytes) {
	        var split = bytes.split('=')
	        var name = split.shift().replace(/\+/g, ' ')
	        var value = split.join('=').replace(/\+/g, ' ')
	        form.append(decodeURIComponent(name), decodeURIComponent(value))
	      }
	    })
	    return form
	  }
	
	  function parseHeaders(rawHeaders) {
	    var headers = new Headers()
	    rawHeaders.split(/\r?\n/).forEach(function(line) {
	      var parts = line.split(':')
	      var key = parts.shift().trim()
	      if (key) {
	        var value = parts.join(':').trim()
	        headers.append(key, value)
	      }
	    })
	    return headers
	  }
	
	  Body.call(Request.prototype)
	
	  function Response(bodyInit, options) {
	    if (!options) {
	      options = {}
	    }
	
	    this.type = 'default'
	    this.status = 'status' in options ? options.status : 200
	    this.ok = this.status >= 200 && this.status < 300
	    this.statusText = 'statusText' in options ? options.statusText : 'OK'
	    this.headers = new Headers(options.headers)
	    this.url = options.url || ''
	    this._initBody(bodyInit)
	  }
	
	  Body.call(Response.prototype)
	
	  Response.prototype.clone = function() {
	    return new Response(this._bodyInit, {
	      status: this.status,
	      statusText: this.statusText,
	      headers: new Headers(this.headers),
	      url: this.url
	    })
	  }
	
	  Response.error = function() {
	    var response = new Response(null, {status: 0, statusText: ''})
	    response.type = 'error'
	    return response
	  }
	
	  var redirectStatuses = [301, 302, 303, 307, 308]
	
	  Response.redirect = function(url, status) {
	    if (redirectStatuses.indexOf(status) === -1) {
	      throw new RangeError('Invalid status code')
	    }
	
	    return new Response(null, {status: status, headers: {location: url}})
	  }
	
	  self.Headers = Headers
	  self.Request = Request
	  self.Response = Response
	
	  self.fetch = function(input, init) {
	    return new Promise(function(resolve, reject) {
	      var request = new Request(input, init)
	      var xhr = new XMLHttpRequest()
	
	      xhr.onload = function() {
	        var options = {
	          status: xhr.status,
	          statusText: xhr.statusText,
	          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
	        }
	        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL')
	        var body = 'response' in xhr ? xhr.response : xhr.responseText
	        resolve(new Response(body, options))
	      }
	
	      xhr.onerror = function() {
	        reject(new TypeError('Network request failed'))
	      }
	
	      xhr.ontimeout = function() {
	        reject(new TypeError('Network request failed'))
	      }
	
	      xhr.open(request.method, request.url, true)
	
	      if (request.credentials === 'include') {
	        xhr.withCredentials = true
	      }
	
	      if ('responseType' in xhr && support.blob) {
	        xhr.responseType = 'blob'
	      }
	
	      request.headers.forEach(function(value, name) {
	        xhr.setRequestHeader(name, value)
	      })
	
	      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
	    })
	  }
	  self.fetch.polyfill = true
	})(typeof self !== 'undefined' ? self : this);


/***/ }
/******/ ]);
//# sourceMappingURL=ajax.js.map