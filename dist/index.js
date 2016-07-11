module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _promptNode = __webpack_require__(1);

	var _promptNode2 = _interopRequireDefault(_promptNode);

	var _promiseQueue = __webpack_require__(5);

	var _promiseQueue2 = _interopRequireDefault(_promiseQueue);

	var _stripAnsi = __webpack_require__(6);

	var _stripAnsi2 = _interopRequireDefault(_stripAnsi);

	var _indentString = __webpack_require__(7);

	var _indentString2 = _interopRequireDefault(_indentString);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var MultiPrompt = function () {
	  function MultiPrompt() {
	    var prompts = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

	    var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    var _ref$indent = _ref.indent;
	    var indent = _ref$indent === undefined ? 2 : _ref$indent;

	    _classCallCheck(this, MultiPrompt);

	    this.prompts = prompts;
	    this.indent = indent;
	    this.onDone = function () {};
	  }

	  _createClass(MultiPrompt, [{
	    key: 'addPrompt',
	    value: function addPrompt(prompt) {
	      this.prompts.push(prompt);
	    }
	  }, {
	    key: 'on',
	    value: function on(type, fn) {
	      switch (type) {
	        case 'done':
	          this.onDone = fn;
	          break;
	        default:
	      }

	      return this;
	    }
	  }, {
	    key: 'begin',
	    value: function begin() {
	      var instance = this;
	      return new Promise(function (resolve, reject) {
	        var promises = instance.prompts.map(function (question) {
	          return function (results) {
	            return new Promise(function (resolve, reject) {
	              // Helpers =====
	              function isQuestionTrue(results, question) {
	                // TODO: add options for no (false, no, n)
	                return question.dependent.answers.some(function (trueAnswer) {
	                  return results[question.dependent.question].answer === trueAnswer;
	                });
	              }
	              function isDependentOnAnotherQuestion(question) {
	                return question.dependent !== undefined;
	              }

	              if (!isDependentOnAnotherQuestion(question) || isQuestionTrue(results, question)) {
	                // }
	                // prompt(question.prompt)
	                var opts = {};
	                if (question.validation) {
	                  opts.validation = question.validation;
	                }
	                new _promptNode2.default((0, _indentString2.default)(question.prompt, instance.indent), { validation: question.validation }).on('validationError', function (answer) {
	                  if (question.validation && question.onValidationError) {
	                    question.onValidationError(answer);
	                  }
	                }).on('backspace', function () {
	                  if (question.onBackspace) {
	                    question.onBackspace();
	                  }
	                }).on('change', function (oldStr, newStr) {
	                  if (question.onChange) {
	                    question.onChange(oldStr, newStr);
	                  }
	                }).on('done', function (answer) {
	                  var identifier = question.identifier || (0, _stripAnsi2.default)(question.prompt);
	                  var result = void 0;
	                  if (question.onDone) {
	                    result = question.onDone(answer);
	                  }

	                  results[identifier] = {
	                    prompt: (0, _stripAnsi2.default)(question.prompt),
	                    answer: result || answer
	                  };

	                  resolve(results);
	                }).begin();
	              } else {
	                resolve(results);
	              }
	            });
	          };
	        });

	        var promiseQueue = new _promiseQueue2.default(promises);

	        promiseQueue.run().then(function (qa) {
	          instance.onDone(qa);
	          resolve(qa);
	        });
	      });
	    }
	  }]);

	  return MultiPrompt;
	}();

	exports.default = MultiPrompt;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports =
	/******/ (function(modules) { // webpackBootstrap
	/******/ 	// The module cache
	/******/ 	var installedModules = {};

	/******/ 	// The require function
	/******/ 	function __webpack_require__(moduleId) {

	/******/ 		// Check if module is in cache
	/******/ 		if(installedModules[moduleId])
	/******/ 			return installedModules[moduleId].exports;

	/******/ 		// Create a new module (and put it into the cache)
	/******/ 		var module = installedModules[moduleId] = {
	/******/ 			exports: {},
	/******/ 			id: moduleId,
	/******/ 			loaded: false
	/******/ 		};

	/******/ 		// Execute the module function
	/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

	/******/ 		// Flag the module as loaded
	/******/ 		module.loaded = true;

	/******/ 		// Return the exports of the module
	/******/ 		return module.exports;
	/******/ 	}


	/******/ 	// expose the modules object (__webpack_modules__)
	/******/ 	__webpack_require__.m = modules;

	/******/ 	// expose the module cache
	/******/ 	__webpack_require__.c = installedModules;

	/******/ 	// __webpack_public_path__
	/******/ 	__webpack_require__.p = "";

	/******/ 	// Load entry module and return exports
	/******/ 	return __webpack_require__(0);
	/******/ })
	/************************************************************************/
	/******/ ([
	/* 0 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});

		var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

		var _chalk = __webpack_require__(1);

		var _chalk2 = _interopRequireDefault(_chalk);

		var _readline = __webpack_require__(2);

		var _readline2 = _interopRequireDefault(_readline);

		var _stringLength = __webpack_require__(3);

		var _stringLength2 = _interopRequireDefault(_stringLength);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

		var Prompt = function () {
		  function Prompt() {
		    var text = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

		    var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

		    var _ref$hidden = _ref.hidden;
		    var hidden = _ref$hidden === undefined ? false : _ref$hidden;
		    var _ref$required = _ref.required;
		    var required = _ref$required === undefined ? false : _ref$required;
		    var _ref$validation = _ref.validation;
		    var validation = _ref$validation === undefined ? function () {
		      return true;
		    } : _ref$validation;

		    _classCallCheck(this, Prompt);

		    // Set instance properties
		    this.text = text;
		    this.hidden = hidden;
		    this.required = required;
		    this.validation = validation;
		    this.onDone = function () {};
		    this.onChange = function () {};
		    this.onKeypress = function () {};
		    this.onBackspace = function () {};
		    this.onValidationError = function () {};
		  }

		  _createClass(Prompt, [{
		    key: 'on',
		    value: function on(type, fn) {
		      switch (type) {
		        case 'backspace':
		          this.onBackspace = fn;
		          break;
		        case 'keypress':
		          this.onKeypress = fn;
		          break;
		        case 'change':
		          this.onChange = fn;
		          break;
		        case 'done':
		          this.onDone = fn;
		          break;
		        case 'validationError':
		          this.onValidationError = fn;
		          break;
		        default:
		      }

		      return this;
		    }
		  }, {
		    key: 'begin',
		    value: function begin() {
		      var instance = this;
		      _readline2.default.emitKeypressEvents(process.stdin);
		      process.stdin.setRawMode(true);

		      // Variables
		      var answer = '';
		      var answerCursorPos = 0;
		      var readlineInterface = _readline2.default.createInterface({
		        input: process.stdin
		      });

		      // Create event listener functions
		      function onKeypress(str, key) {
		        if (key && key.ctrl && key.name === 'c') {
		          process.emit('SIGINT');
		        } else if (key && key.name === 'left') {
		          answerCursorPos--;
		          process.stdout.cursorTo((0, _stringLength2.default)(instance.text) + 1 + answerCursorPos);
		        } else if (key && key.name === 'right') {
		          if (answerCursorPos !== (0, _stringLength2.default)(answer)) {
		            answerCursorPos++;
		            process.stdout.cursorTo((0, _stringLength2.default)(instance.text) + 1 + answerCursorPos);
		          }
		        } else if (key && key.name === 'up') {
		          // Do something
		        } else if (key && key.name === 'down') {
		          // Do something
		        } else if (key && key.name === 'return') {
		          // Do something
		        } else if (key && key.name === 'backspace') {
		          answerCursorPos--;
		          process.stdout.clearLine();
		          process.stdout.cursorTo(0);
		          answer = answer.slice(0, (0, _stringLength2.default)(answer) - 1);
		          if (instance.hidden) {
		            process.stdout.write(instance.text + ' ' + _chalk2.default.blue(convertStringToHidden(answer)));
		          } else {
		            process.stdout.write(instance.text + ' ' + _chalk2.default.blue(answer));
		          }
		          process.stdout.cursorTo((0, _stringLength2.default)(instance.text) + 1 + answerCursorPos);
		          instance.onBackspace();
		        } else {
		          var oldAnswer = answer;
		          answer = insert(answer, str, answerCursorPos);
		          answerCursorPos++;
		          process.stdout.clearLine();
		          process.stdout.cursorTo(0);
		          if (instance.hidden) {
		            process.stdout.write(instance.text + ' ' + _chalk2.default.blue(convertStringToHidden(answer)));
		          } else {
		            process.stdout.write(instance.text + ' ' + _chalk2.default.blue(answer));
		          }
		          process.stdout.cursorTo((0, _stringLength2.default)(instance.text) + 1 + answerCursorPos);

		          instance.onChange(oldAnswer, answer);
		        }
		        instance.onKeypress(str, key);
		      }

		      function onSigint() {
		        process.exit();
		      }

		      function onEnter() {
		        // Checks if validation fails OR if answer is empty string
		        if (!instance.validation(answer) || instance.required && stringIsEmpty(answer)) {
		          process.stdout.clearLine();
		          process.stdout.cursorTo(0);
		          if (instance.hidden) {
		            process.stdout.write(instance.text + ' ' + _chalk2.default.blue(convertStringToHidden(answer)));
		          } else {
		            process.stdout.write(instance.text + ' ' + _chalk2.default.blue(answer));
		          }
		          process.stdout.cursorTo((0, _stringLength2.default)(instance.text) + 1 + answerCursorPos);
		          instance.onValidationError(answer);
		        } else {
		          process.stdout.write('\n');
		          // clean listeners
		          process.removeListener('SIGINT', onSigint);
		          process.stdin.removeListener('keypress', onKeypress);
		          process.stdin.setRawMode(false);
		          readlineInterface.close();
		          instance.onDone(answer);
		        }
		      }

		      // Attach event listeners
		      process.stdin.on('keypress', onKeypress);
		      process.on('SIGINT', onSigint);
		      readlineInterface.on('line', onEnter);

		      // Create the prompt
		      process.stdout.write(instance.text + ' ');
		    }
		  }]);

		  return Prompt;
		}();

		function insert(str, what, index) {
		  // should we use string-length here, incase the user uses chalk in the answer?
		  if (str.length === 0) {
		    return what;
		  }
		  return index > 0 ? str.replace(new RegExp('.{' + index + '}'), '$&' + what) : what + str;
		}

		function stringIsEmpty(str) {
		  return str.split('').every(function (char) {
		    return char === ' ';
		  });
		}

		function convertStringToHidden(str) {
		  var hiddenChar = arguments.length <= 1 || arguments[1] === undefined ? '*' : arguments[1];

		  return hiddenChar.repeat(str.split('').length);
		}

		exports.default = Prompt;

	/***/ },
	/* 1 */
	/***/ function(module, exports) {

		module.exports = __webpack_require__(2);

	/***/ },
	/* 2 */
	/***/ function(module, exports) {

		module.exports = __webpack_require__(3);

	/***/ },
	/* 3 */
	/***/ function(module, exports) {

		module.exports = __webpack_require__(4);

	/***/ }
	/******/ ]);

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("chalk");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("readline");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("string-length");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports =
	/******/ (function(modules) { // webpackBootstrap
	/******/ 	// The module cache
	/******/ 	var installedModules = {};

	/******/ 	// The require function
	/******/ 	function __webpack_require__(moduleId) {

	/******/ 		// Check if module is in cache
	/******/ 		if(installedModules[moduleId])
	/******/ 			return installedModules[moduleId].exports;

	/******/ 		// Create a new module (and put it into the cache)
	/******/ 		var module = installedModules[moduleId] = {
	/******/ 			exports: {},
	/******/ 			id: moduleId,
	/******/ 			loaded: false
	/******/ 		};

	/******/ 		// Execute the module function
	/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

	/******/ 		// Flag the module as loaded
	/******/ 		module.loaded = true;

	/******/ 		// Return the exports of the module
	/******/ 		return module.exports;
	/******/ 	}


	/******/ 	// expose the modules object (__webpack_modules__)
	/******/ 	__webpack_require__.m = modules;

	/******/ 	// expose the module cache
	/******/ 	__webpack_require__.c = installedModules;

	/******/ 	// __webpack_public_path__
	/******/ 	__webpack_require__.p = "";

	/******/ 	// Load entry module and return exports
	/******/ 	return __webpack_require__(0);
	/******/ })
	/************************************************************************/
	/******/ ([
	/* 0 */
	/***/ function(module, exports) {

		"use strict";

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});

		var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

		function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

		var PromiseQueue = function () {
		  function PromiseQueue(promiseArray) {
		    _classCallCheck(this, PromiseQueue);

		    this.promiseArray = promiseArray;
		  }

		  _createClass(PromiseQueue, [{
		    key: "run",
		    value: function run(startObj) {
		      var _this = this;

		      return new Promise(function (resolve, reject) {
		        var that = _this;
		        var currentIndex = 0;

		        function next(passedVal) {
		          currentIndex++;
		          if (currentIndex >= that.promiseArray.length) {
		            resolve(passedVal);
		          } else {
		            that.promiseArray[currentIndex](passedVal).then(function (passedVal) {
		              next(passedVal);
		            });
		          }
		        }
		        that.promiseArray[currentIndex](startObj || {}).then(function (passedVal) {
		          next(passedVal);
		        });
		      });
		    }
		  }]);

		  return PromiseQueue;
		}();

		exports.default = PromiseQueue;

	/***/ }
	/******/ ]);

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("strip-ansi");

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports =
	/******/ (function(modules) { // webpackBootstrap
	/******/ 	// The module cache
	/******/ 	var installedModules = {};

	/******/ 	// The require function
	/******/ 	function __webpack_require__(moduleId) {

	/******/ 		// Check if module is in cache
	/******/ 		if(installedModules[moduleId])
	/******/ 			return installedModules[moduleId].exports;

	/******/ 		// Create a new module (and put it into the cache)
	/******/ 		var module = installedModules[moduleId] = {
	/******/ 			exports: {},
	/******/ 			id: moduleId,
	/******/ 			loaded: false
	/******/ 		};

	/******/ 		// Execute the module function
	/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

	/******/ 		// Flag the module as loaded
	/******/ 		module.loaded = true;

	/******/ 		// Return the exports of the module
	/******/ 		return module.exports;
	/******/ 	}


	/******/ 	// expose the modules object (__webpack_modules__)
	/******/ 	__webpack_require__.m = modules;

	/******/ 	// expose the module cache
	/******/ 	__webpack_require__.c = installedModules;

	/******/ 	// __webpack_public_path__
	/******/ 	__webpack_require__.p = "";

	/******/ 	// Load entry module and return exports
	/******/ 	return __webpack_require__(0);
	/******/ })
	/************************************************************************/
	/******/ ([
	/* 0 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});

		var _assert = __webpack_require__(1);

		var _assert2 = _interopRequireDefault(_assert);

		var _isEmptyLine = __webpack_require__(2);

		var _isEmptyLine2 = _interopRequireDefault(_isEmptyLine);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		exports.default = function (str) {
		  var count = arguments.length <= 1 || arguments[1] === undefined ? 2 : arguments[1];
		  var character = arguments.length <= 2 || arguments[2] === undefined ? ' ' : arguments[2];

		  _assert2.default.type(str, 'string');
		  _assert2.default.type(character, 'string');

		  return str.split('\n').map(function (line) {
		    if ((0, _isEmptyLine2.default)(line)) return line;
		    return '' + character.repeat(count) + line;
		  }).join('\n');
		};

	/***/ },
	/* 1 */
	/***/ function(module, exports) {

		module.exports =
		/******/ (function(modules) { // webpackBootstrap
		/******/ 	// The module cache
		/******/ 	var installedModules = {};

		/******/ 	// The require function
		/******/ 	function __webpack_require__(moduleId) {

		/******/ 		// Check if module is in cache
		/******/ 		if(installedModules[moduleId])
		/******/ 			return installedModules[moduleId].exports;

		/******/ 		// Create a new module (and put it into the cache)
		/******/ 		var module = installedModules[moduleId] = {
		/******/ 			exports: {},
		/******/ 			id: moduleId,
		/******/ 			loaded: false
		/******/ 		};

		/******/ 		// Execute the module function
		/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

		/******/ 		// Flag the module as loaded
		/******/ 		module.loaded = true;

		/******/ 		// Return the exports of the module
		/******/ 		return module.exports;
		/******/ 	}


		/******/ 	// expose the modules object (__webpack_modules__)
		/******/ 	__webpack_require__.m = modules;

		/******/ 	// expose the module cache
		/******/ 	__webpack_require__.c = installedModules;

		/******/ 	// __webpack_public_path__
		/******/ 	__webpack_require__.p = "";

		/******/ 	// Load entry module and return exports
		/******/ 	return __webpack_require__(0);
		/******/ })
		/************************************************************************/
		/******/ ([
		/* 0 */
		/***/ function(module, exports) {

			"use strict";

			Object.defineProperty(exports, "__esModule", {
			  value: true
			});

			var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

			exports.default = {
			  type: function type(val, _type) {
			    if ((typeof val === "undefined" ? "undefined" : _typeof(val)) !== _type) {
			      throw new TypeError("Expected '" + val + "' to be a '" + _type + "', got '" + (typeof val === "undefined" ? "undefined" : _typeof(val)) + "'");
			    }
			  }
			};

		/***/ }
		/******/ ]);

	/***/ },
	/* 2 */
	/***/ function(module, exports) {

		module.exports =
		/******/ (function(modules) { // webpackBootstrap
		/******/ 	// The module cache
		/******/ 	var installedModules = {};

		/******/ 	// The require function
		/******/ 	function __webpack_require__(moduleId) {

		/******/ 		// Check if module is in cache
		/******/ 		if(installedModules[moduleId])
		/******/ 			return installedModules[moduleId].exports;

		/******/ 		// Create a new module (and put it into the cache)
		/******/ 		var module = installedModules[moduleId] = {
		/******/ 			exports: {},
		/******/ 			id: moduleId,
		/******/ 			loaded: false
		/******/ 		};

		/******/ 		// Execute the module function
		/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

		/******/ 		// Flag the module as loaded
		/******/ 		module.loaded = true;

		/******/ 		// Return the exports of the module
		/******/ 		return module.exports;
		/******/ 	}


		/******/ 	// expose the modules object (__webpack_modules__)
		/******/ 	__webpack_require__.m = modules;

		/******/ 	// expose the module cache
		/******/ 	__webpack_require__.c = installedModules;

		/******/ 	// __webpack_public_path__
		/******/ 	__webpack_require__.p = "";

		/******/ 	// Load entry module and return exports
		/******/ 	return __webpack_require__(0);
		/******/ })
		/************************************************************************/
		/******/ ([
		/* 0 */
		/***/ function(module, exports) {

			'use strict';

			Object.defineProperty(exports, "__esModule", {
			  value: true
			});

			var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

			var assert = {
			  type: function type(val, _type) {
			    if ((typeof val === 'undefined' ? 'undefined' : _typeof(val)) !== _type) {
			      throw new TypeError('Expected \'' + val + '\' to be a \'' + _type + '\', got \'' + (typeof val === 'undefined' ? 'undefined' : _typeof(val)) + '\'');
			    }
			  }
			};

			exports.default = function (str) {
			  assert.type(str, 'string');

			  var emptyCharacters = ['\n', ' '];

			  return str.split('').every(function (ch) {
			    return emptyCharacters.indexOf(ch) !== -1;
			  });
			};

		/***/ }
		/******/ ]);

	/***/ }
	/******/ ]);

/***/ }
/******/ ]);