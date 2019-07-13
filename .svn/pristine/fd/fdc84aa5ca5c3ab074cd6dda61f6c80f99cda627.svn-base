(function(global, factory) {
	if (typeof module === "object" && typeof module.exports === "object") module.exports = global.document ? factory(global, true) : function(w) {
		if (!w.document) throw new Error("jQuery requires a window with a document");
		return factory(w)
	};
	else factory(global)
})(typeof window !== "undefined" ? window : this, function(window, noGlobal) {
	var deletedIds = [];
	var slice = deletedIds.slice;
	var concat = deletedIds.concat;
	var push = deletedIds.push;
	var indexOf = deletedIds.indexOf;
	var class2type = {};
	var toString = class2type.toString;
	var hasOwn = class2type.hasOwnProperty;
	var support = {};
	var version = "1.11.1",
		jQuery = function(selector, context) {
			return new jQuery.fn.init(selector, context)
		},
		rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
		rmsPrefix = /^-ms-/,
		rdashAlpha = /-([\da-z])/gi,
		fcamelCase = function(all, letter) {
			return letter.toUpperCase()
		};
	jQuery.fn = jQuery.prototype = {
		jquery: version,
		constructor: jQuery,
		selector: "",
		length: 0,
		toArray: function() {
			return slice.call(this)
		},
		get: function(num) {
			return num != null ? num < 0 ? this[num + this.length] : this[num] : slice.call(this)
		},
		pushStack: function(elems) {
			var ret = jQuery.merge(this.constructor(), elems);
			ret.prevObject = this;
			ret.context = this.context;
			return ret
		},
		each: function(callback, args) {
			return jQuery.each(this, callback, args)
		},
		map: function(callback) {
			return this.pushStack(jQuery.map(this, function(elem, i) {
				return callback.call(elem, i, elem)
			}))
		},
		slice: function() {
			return this.pushStack(slice.apply(this, arguments))
		},
		first: function() {
			return this.eq(0)
		},
		last: function() {
			return this.eq(-1)
		},
		eq: function(i) {
			var len = this.length,
				j = +i + (i < 0 ? len : 0);
			return this.pushStack(j >= 0 && j < len ? [this[j]] : [])
		},
		end: function() {
			return this.prevObject || this.constructor(null)
		},
		push: push,
		sort: deletedIds.sort,
		splice: deletedIds.splice
	};
	jQuery.extend = jQuery.fn.extend = function() {
		var src, copyIsArray, copy, name, options, clone, target = arguments[0] || {},
			i = 1,
			length = arguments.length,
			deep = false;
		if (typeof target === "boolean") {
			deep = target;
			target = arguments[i] || {};
			i++
		}
		if (typeof target !== "object" && !jQuery.isFunction(target)) target = {};
		if (i === length) {
			target = this;
			i--
		}
		for (; i < length; i++) if ((options = arguments[i]) != null) for (name in options) {
			src = target[name];
			copy = options[name];
			if (target === copy) continue;
			if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {
				if (copyIsArray) {
					copyIsArray = false;
					clone = src && jQuery.isArray(src) ? src : []
				} else clone = src && jQuery.isPlainObject(src) ? src : {};
				target[name] = jQuery.extend(deep, clone, copy)
			} else if (copy !== undefined) target[name] = copy
		}
		return target
	};
	jQuery.extend({
		expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),
		isReady: true,
		error: function(msg) {
			throw new Error(msg);
		},
		noop: function() {},
		isFunction: function(obj) {
			return jQuery.type(obj) === "function"
		},
		isArray: Array.isArray ||
		function(obj) {
			return jQuery.type(obj) === "array"
		},
		isWindow: function(obj) {
			return obj != null && obj == obj.window
		},
		isNumeric: function(obj) {
			return !jQuery.isArray(obj) && obj - parseFloat(obj) >= 0
		},
		isEmptyObject: function(obj) {
			var name;
			for (name in obj) return false;
			return true
		},
		isPlainObject: function(obj) {
			var key;
			if (!obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow(obj)) return false;
			try {
				if (obj.constructor && !hasOwn.call(obj, "constructor") && !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) return false
			} catch (e) {
				return false
			}
			if (support.ownLast) for (key in obj) return hasOwn.call(obj, key);
			for (key in obj);
			return key === undefined || hasOwn.call(obj, key)
		},
		type: function(obj) {
			if (obj == null) return obj + "";
			return typeof obj === "object" || typeof obj === "function" ? class2type[toString.call(obj)] || "object" : typeof obj
		},
		globalEval: function(data) {
			if (data && jQuery.trim(data))(window.execScript ||
			function(data) {
				window["eval"].call(window, data)
			})(data)
		},
		camelCase: function(string) {
			return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase)
		},
		nodeName: function(elem, name) {
			return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase()
		},
		each: function(obj, callback, args) {
			var value, i = 0,
				length = obj.length,
				isArray = isArraylike(obj);
			if (args) if (isArray) for (; i < length; i++) {
				value = callback.apply(obj[i], args);
				if (value === false) break
			} else for (i in obj) {
				value = callback.apply(obj[i], args);
				if (value === false) break
			} else if (isArray) for (; i < length; i++) {
				value = callback.call(obj[i], i, obj[i]);
				if (value === false) break
			} else for (i in obj) {
				value = callback.call(obj[i], i, obj[i]);
				if (value === false) break
			}
			return obj
		},
		trim: function(text) {
			return text == null ? "" : (text + "").replace(rtrim, "")
		},
		makeArray: function(arr, results) {
			var ret = results || [];
			if (arr != null) if (isArraylike(Object(arr))) jQuery.merge(ret, typeof arr === "string" ? [arr] : arr);
			else push.call(ret, arr);
			return ret
		},
		inArray: function(elem, arr, i) {
			var len;
			if (arr) {
				if (indexOf) return indexOf.call(arr, elem, i);
				len = arr.length;
				i = i ? i < 0 ? Math.max(0, len + i) : i : 0;
				for (; i < len; i++) if (i in arr && arr[i] === elem) return i
			}
			return -1
		},
		merge: function(first, second) {
			var len = +second.length,
				j = 0,
				i = first.length;
			while (j < len) first[i++] = second[j++];
			if (len !== len) while (second[j] !== undefined) first[i++] = second[j++];
			first.length = i;
			return first
		},
		grep: function(elems, callback, invert) {
			var callbackInverse, matches = [],
				i = 0,
				length = elems.length,
				callbackExpect = !invert;
			for (; i < length; i++) {
				callbackInverse = !callback(elems[i], i);
				if (callbackInverse !== callbackExpect) matches.push(elems[i])
			}
			return matches
		},
		map: function(elems, callback, arg) {
			var value, i = 0,
				length = elems.length,
				isArray = isArraylike(elems),
				ret = [];
			if (isArray) for (; i < length; i++) {
				value = callback(elems[i], i, arg);
				if (value != null) ret.push(value)
			} else for (i in elems) {
				value = callback(elems[i], i, arg);
				if (value != null) ret.push(value)
			}
			return concat.apply([], ret)
		},
		guid: 1,
		proxy: function(fn, context) {
			var args, proxy, tmp;
			if (typeof context === "string") {
				tmp = fn[context];
				context = fn;
				fn = tmp
			}
			if (!jQuery.isFunction(fn)) return undefined;
			args = slice.call(arguments, 2);
			proxy = function() {
				return fn.apply(context || this, args.concat(slice.call(arguments)))
			};
			proxy.guid = fn.guid = fn.guid || jQuery.guid++;
			return proxy
		},
		now: function() {
			return +new Date
		},
		support: support
	});
	jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
		class2type["[object " + name + "]"] = name.toLowerCase()
	});

	function isArraylike(obj) {
		var length = obj.length,
			type = jQuery.type(obj);
		if (type === "function" || jQuery.isWindow(obj)) return false;
		if (obj.nodeType === 1 && length) return true;
		return type === "array" || length === 0 || typeof length === "number" && length > 0 && length - 1 in obj
	}
	var Sizzle = function(window) {
			var i, support, Expr, getText, isXML, tokenize, compile, select, outermostContext, sortInput, hasDuplicate, setDocument, document, docElem, documentIsHTML, rbuggyQSA, rbuggyMatches, matches, contains, expando = "sizzle" + -new Date,
				preferredDoc = window.document,
				dirruns = 0,
				done = 0,
				classCache = createCache(),
				tokenCache = createCache(),
				compilerCache = createCache(),
				sortOrder = function(a, b) {
					if (a === b) hasDuplicate = true;
					return 0
				},
				strundefined = typeof undefined,
				MAX_NEGATIVE = 1 << 31,
				hasOwn = {}.hasOwnProperty,
				arr = [],
				pop = arr.pop,
				push_native = arr.push,
				push = arr.push,
				slice = arr.slice,
				indexOf = arr.indexOf ||
			function(elem) {
				var i = 0,
					len = this.length;
				for (; i < len; i++) if (this[i] === elem) return i;
				return -1
			}, booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", whitespace = "[\\x20\\t\\r\\n\\f]", characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", identifier = characterEncoding.replace("w", "w#"), attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace + "*([*^$|!~]?=)" + whitespace + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace + "*\\]", pseudos = ":(" + characterEncoding + ")(?:\\((" + "('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" + "((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" + ".*" + ")\\)|)", rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"), rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"), rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"), rattributeQuotes = new RegExp("=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g"), rpseudo = new RegExp(pseudos), ridentifier = new RegExp("^" + identifier + "$"), matchExpr = {
				"ID": new RegExp("^#(" + characterEncoding + ")"),
				"CLASS": new RegExp("^\\.(" + characterEncoding + ")"),
				"TAG": new RegExp("^(" + characterEncoding.replace("w", "w*") + ")"),
				"ATTR": new RegExp("^" + attributes),
				"PSEUDO": new RegExp("^" + pseudos),
				"CHILD": new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
				"bool": new RegExp("^(?:" + booleans + ")$", "i"),
				"needsContext": new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
			}, rinputs = /^(?:input|select|textarea|button)$/i, rheader = /^h\d$/i, rnative = /^[^{]+\{\s*\[native \w/, rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, rsibling = /[+~]/, rescape = /'|\\/g, runescape = new RegExp("\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig"), funescape = function(_, escaped, escapedWhitespace) {
				var high = "0x" + escaped - 65536;
				return high !== high || escapedWhitespace ? escaped : high < 0 ? String.fromCharCode(high + 65536) : String.fromCharCode(high >> 10 | 55296, high & 1023 | 56320)
			};
			try {
				push.apply(arr = slice.call(preferredDoc.childNodes), preferredDoc.childNodes);
				arr[preferredDoc.childNodes.length].nodeType
			} catch (e) {
				push = {
					apply: arr.length ?
					function(target, els) {
						push_native.apply(target, slice.call(els))
					} : function(target, els) {
						var j = target.length,
							i = 0;
						while (target[j++] = els[i++]);
						target.length = j - 1
					}
				}
			}
			function Sizzle(selector, context, results, seed) {
				var match, elem, m, nodeType, i, groups, old, nid, newContext, newSelector;
				if ((context ? context.ownerDocument || context : preferredDoc) !== document) setDocument(context);
				context = context || document;
				results = results || [];
				if (!selector || typeof selector !== "string") return results;
				if ((nodeType = context.nodeType) !== 1 && nodeType !== 9) return [];
				if (documentIsHTML && !seed) {
					if (match = rquickExpr.exec(selector)) if (m = match[1]) if (nodeType === 9) {
						elem = context.getElementById(m);
						if (elem && elem.parentNode) {
							if (elem.id === m) {
								results.push(elem);
								return results
							}
						} else return results
					} else {
						if (context.ownerDocument && (elem = context.ownerDocument.getElementById(m)) && contains(context, elem) && elem.id === m) {
							results.push(elem);
							return results
						}
					} else if (match[2]) {
						push.apply(results, context.getElementsByTagName(selector));
						return results
					} else if ((m = match[3]) && support.getElementsByClassName && context.getElementsByClassName) {
						push.apply(results, context.getElementsByClassName(m));
						return results
					}
					if (support.qsa && (!rbuggyQSA || !rbuggyQSA.test(selector))) {
						nid = old = expando;
						newContext = context;
						newSelector = nodeType === 9 && selector;
						if (nodeType === 1 && context.nodeName.toLowerCase() !== "object") {
							groups = tokenize(selector);
							if (old = context.getAttribute("id")) nid = old.replace(rescape, "\\$&");
							else context.setAttribute("id", nid);
							nid = "[id='" + nid + "'] ";
							i = groups.length;
							while (i--) groups[i] = nid + toSelector(groups[i]);
							newContext = rsibling.test(selector) && testContext(context.parentNode) || context;
							newSelector = groups.join(",")
						}
						if (newSelector) try {
							push.apply(results, newContext.querySelectorAll(newSelector));
							return results
						} catch (qsaError) {} finally {
							if (!old) context.removeAttribute("id")
						}
					}
				}
				return select(selector.replace(rtrim, "$1"), context, results, seed)
			}
			function createCache() {
				var keys = [];

				function cache(key, value) {
					if (keys.push(key + " ") > Expr.cacheLength) delete cache[keys.shift()];
					return cache[key + " "] = value
				}
				return cache
			}
			function markFunction(fn) {
				fn[expando] = true;
				return fn
			}
			function assert(fn) {
				var div = document.createElement("div");
				try {
					return !!fn(div)
				} catch (e) {
					return false
				} finally {
					if (div.parentNode) div.parentNode.removeChild(div);
					div = null
				}
			}
			function addHandle(attrs, handler) {
				var arr = attrs.split("|"),
					i = attrs.length;
				while (i--) Expr.attrHandle[arr[i]] = handler
			}
			function siblingCheck(a, b) {
				var cur = b && a,
					diff = cur && a.nodeType === 1 && b.nodeType === 1 && (~b.sourceIndex || MAX_NEGATIVE) - (~a.sourceIndex || MAX_NEGATIVE);
				if (diff) return diff;
				if (cur) while (cur = cur.nextSibling) if (cur === b) return -1;
				return a ? 1 : -1
			}
			function createInputPseudo(type) {
				return function(elem) {
					var name = elem.nodeName.toLowerCase();
					return name === "input" && elem.type === type
				}
			}
			function createButtonPseudo(type) {
				return function(elem) {
					var name = elem.nodeName.toLowerCase();
					return (name === "input" || name === "button") && elem.type === type
				}
			}
			function createPositionalPseudo(fn) {
				return markFunction(function(argument) {
					argument = +argument;
					return markFunction(function(seed, matches) {
						var j, matchIndexes = fn([], seed.length, argument),
							i = matchIndexes.length;
						while (i--) if (seed[j = matchIndexes[i]]) seed[j] = !(matches[j] = seed[j])
					})
				})
			}
			function testContext(context) {
				return context && typeof context.getElementsByTagName !== strundefined && context
			}
			support = Sizzle.support = {};
			isXML = Sizzle.isXML = function(elem) {
				var documentElement = elem && (elem.ownerDocument || elem).documentElement;
				return documentElement ? documentElement.nodeName !== "HTML" : false
			};
			setDocument = Sizzle.setDocument = function(node) {
				var hasCompare, doc = node ? node.ownerDocument || node : preferredDoc,
					parent = doc.defaultView;
				if (doc === document || doc.nodeType !== 9 || !doc.documentElement) return document;
				document = doc;
				docElem = doc.documentElement;
				documentIsHTML = !isXML(doc);
				if (parent && parent !== parent.top) if (parent.addEventListener) parent.addEventListener("unload", function() {
					setDocument()
				}, false);
				else if (parent.attachEvent) parent.attachEvent("onunload", function() {
					setDocument()
				});
				support.attributes = assert(function(div) {
					div.className = "i";
					return !div.getAttribute("className")
				});
				support.getElementsByTagName = assert(function(div) {
					div.appendChild(doc.createComment(""));
					return !div.getElementsByTagName("*").length
				});
				support.getElementsByClassName = rnative.test(doc.getElementsByClassName) && assert(function(div) {
					div.innerHTML = "<div class='a'></div><div class='a i'></div>";
					div.firstChild.className = "i";
					return div.getElementsByClassName("i").length === 2
				});
				support.getById = assert(function(div) {
					docElem.appendChild(div).id = expando;
					return !doc.getElementsByName || !doc.getElementsByName(expando).length
				});
				if (support.getById) {
					Expr.find["ID"] = function(id, context) {
						if (typeof context.getElementById !== strundefined && documentIsHTML) {
							var m = context.getElementById(id);
							return m && m.parentNode ? [m] : []
						}
					};
					Expr.filter["ID"] = function(id) {
						var attrId = id.replace(runescape, funescape);
						return function(elem) {
							return elem.getAttribute("id") === attrId
						}
					}
				} else {
					delete Expr.find["ID"];
					Expr.filter["ID"] = function(id) {
						var attrId = id.replace(runescape, funescape);
						return function(elem) {
							var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
							return node && node.value === attrId
						}
					}
				}
				Expr.find["TAG"] = support.getElementsByTagName ?
				function(tag, context) {
					if (typeof context.getElementsByTagName !== strundefined) return context.getElementsByTagName(tag)
				} : function(tag, context) {
					var elem, tmp = [],
						i = 0,
						results = context.getElementsByTagName(tag);
					if (tag === "*") {
						while (elem = results[i++]) if (elem.nodeType === 1) tmp.push(elem);
						return tmp
					}
					return results
				};
				Expr.find["CLASS"] = support.getElementsByClassName &&
				function(className, context) {
					if (typeof context.getElementsByClassName !== strundefined && documentIsHTML) return context.getElementsByClassName(className)
				};
				rbuggyMatches = [];
				rbuggyQSA = [];
				if (support.qsa = rnative.test(doc.querySelectorAll)) {
					assert(function(div) {
						div.innerHTML = "<select msallowclip=''><option selected=''></option></select>";
						if (div.querySelectorAll("[msallowclip^='']").length) rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")");
						if (!div.querySelectorAll("[selected]").length) rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")");
						if (!div.querySelectorAll(":checked").length) rbuggyQSA.push(":checked")
					});
					assert(function(div) {
						var input = doc.createElement("input");
						input.setAttribute("type", "hidden");
						div.appendChild(input).setAttribute("name", "D");
						if (div.querySelectorAll("[name=d]").length) rbuggyQSA.push("name" + whitespace + "*[*^$|!~]?=");
						if (!div.querySelectorAll(":enabled").length) rbuggyQSA.push(":enabled", ":disabled");
						div.querySelectorAll("*,:x");
						rbuggyQSA.push(",.*:")
					})
				}
				if (support.matchesSelector = rnative.test(matches = docElem.matches || docElem.webkitMatchesSelector || docElem.mozMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)) assert(function(div) {
					support.disconnectedMatch = matches.call(div, "div");
					matches.call(div, "[s!='']:x");
					rbuggyMatches.push("!=", pseudos)
				});
				rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|"));
				rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|"));
				hasCompare = rnative.test(docElem.compareDocumentPosition);
				contains = hasCompare || rnative.test(docElem.contains) ?
				function(a, b) {
					var adown = a.nodeType === 9 ? a.documentElement : a,
						bup = b && b.parentNode;
					return a === bup || !! (bup && bup.nodeType === 1 && (adown.contains ? adown.contains(bup) : a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16))
				} : function(a, b) {
					if (b) while (b = b.parentNode) if (b === a) return true;
					return false
				};
				sortOrder = hasCompare ?
				function(a, b) {
					if (a === b) {
						hasDuplicate = true;
						return 0
					}
					var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
					if (compare) return compare;
					compare = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1;
					if (compare & 1 || !support.sortDetached && b.compareDocumentPosition(a) === compare) {
						if (a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a)) return -1;
						if (b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b)) return 1;
						return sortInput ? indexOf.call(sortInput, a) - indexOf.call(sortInput, b) : 0
					}
					return compare & 4 ? -1 : 1
				} : function(a, b) {
					if (a === b) {
						hasDuplicate = true;
						return 0
					}
					var cur, i = 0,
						aup = a.parentNode,
						bup = b.parentNode,
						ap = [a],
						bp = [b];
					if (!aup || !bup) return a === doc ? -1 : b === doc ? 1 : aup ? -1 : bup ? 1 : sortInput ? indexOf.call(sortInput, a) - indexOf.call(sortInput, b) : 0;
					else if (aup === bup) return siblingCheck(a, b);
					cur = a;
					while (cur = cur.parentNode) ap.unshift(cur);
					cur = b;
					while (cur = cur.parentNode) bp.unshift(cur);
					while (ap[i] === bp[i]) i++;
					return i ? siblingCheck(ap[i], bp[i]) : ap[i] === preferredDoc ? -1 : bp[i] === preferredDoc ? 1 : 0
				};
				return doc
			};
			Sizzle.matches = function(expr, elements) {
				return Sizzle(expr, null, null, elements)
			};
			Sizzle.matchesSelector = function(elem, expr) {
				if ((elem.ownerDocument || elem) !== document) setDocument(elem);
				expr = expr.replace(rattributeQuotes, "='$1']");
				if (support.matchesSelector && documentIsHTML && (!rbuggyMatches || !rbuggyMatches.test(expr)) && (!rbuggyQSA || !rbuggyQSA.test(expr))) try {
					var ret = matches.call(elem, expr);
					if (ret || support.disconnectedMatch || elem.document && elem.document.nodeType !== 11) return ret
				} catch (e) {}
				return Sizzle(expr, document, null, [elem]).length > 0
			};
			Sizzle.contains = function(context, elem) {
				if ((context.ownerDocument || context) !== document) setDocument(context);
				return contains(context, elem)
			};
			Sizzle.attr = function(elem, name) {
				if ((elem.ownerDocument || elem) !== document) setDocument(elem);
				var fn = Expr.attrHandle[name.toLowerCase()],
					val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : undefined;
				return val !== undefined ? val : support.attributes || !documentIsHTML ? elem.getAttribute(name) : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null
			};
			Sizzle.error = function(msg) {
				throw new Error("Syntax error, unrecognized expression: " + msg);
			};
			Sizzle.uniqueSort = function(results) {
				var elem, duplicates = [],
					j = 0,
					i = 0;
				hasDuplicate = !support.detectDuplicates;
				sortInput = !support.sortStable && results.slice(0);
				results.sort(sortOrder);
				if (hasDuplicate) {
					while (elem = results[i++]) if (elem === results[i]) j = duplicates.push(i);
					while (j--) results.splice(duplicates[j], 1)
				}
				sortInput = null;
				return results
			};
			getText = Sizzle.getText = function(elem) {
				var node, ret = "",
					i = 0,
					nodeType = elem.nodeType;
				if (!nodeType) while (node = elem[i++]) ret += getText(node);
				else if (nodeType === 1 || nodeType === 9 || nodeType === 11) if (typeof elem.textContent === "string") return elem.textContent;
				else for (elem = elem.firstChild; elem; elem = elem.nextSibling) ret += getText(elem);
				else if (nodeType === 3 || nodeType === 4) return elem.nodeValue;
				return ret
			};
			Expr = Sizzle.selectors = {
				cacheLength: 50,
				createPseudo: markFunction,
				match: matchExpr,
				attrHandle: {},
				find: {},
				relative: {
					">": {
						dir: "parentNode",
						first: true
					},
					" ": {
						dir: "parentNode"
					},
					"+": {
						dir: "previousSibling",
						first: true
					},
					"~": {
						dir: "previousSibling"
					}
				},
				preFilter: {
					"ATTR": function(match) {
						match[1] = match[1].replace(runescape, funescape);
						match[3] = (match[3] || match[4] || match[5] || "").replace(runescape, funescape);
						if (match[2] === "~=") match[3] = " " + match[3] + " ";
						return match.slice(0, 4)
					},
					"CHILD": function(match) {
						match[1] = match[1].toLowerCase();
						if (match[1].slice(0, 3) === "nth") {
							if (!match[3]) Sizzle.error(match[0]);
							match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * (match[3] === "even" || match[3] === "odd"));
							match[5] = +(match[7] + match[8] || match[3] === "odd")
						} else if (match[3]) Sizzle.error(match[0]);
						return match
					},
					"PSEUDO": function(match) {
						var excess, unquoted = !match[6] && match[2];
						if (matchExpr["CHILD"].test(match[0])) return null;
						if (match[3]) match[2] = match[4] || match[5] || "";
						else if (unquoted && rpseudo.test(unquoted) && (excess = tokenize(unquoted, true)) && (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)) {
							match[0] = match[0].slice(0, excess);
							match[2] = unquoted.slice(0, excess)
						}
						return match.slice(0, 3)
					}
				},
				filter: {
					"TAG": function(nodeNameSelector) {
						var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
						return nodeNameSelector === "*" ?
						function() {
							return true
						} : function(elem) {
							return elem.nodeName && elem.nodeName.toLowerCase() === nodeName
						}
					},
					"CLASS": function(className) {
						var pattern = classCache[className + " "];
						return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(className, function(elem) {
							return pattern.test(typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "")
						})
					},
					"ATTR": function(name, operator, check) {
						return function(elem) {
							var result = Sizzle.attr(elem, name);
							if (result == null) return operator === "!=";
							if (!operator) return true;
							result += "";
							return operator === "=" ? result === check : operator === "!=" ? result !== check : operator === "^=" ? check && result.indexOf(check) === 0 : operator === "*=" ? check && result.indexOf(check) > -1 : operator === "$=" ? check && result.slice(-check.length) === check : operator === "~=" ? (" " + result + " ").indexOf(check) > -1 : operator === "|=" ? result === check || result.slice(0, check.length + 1) === check + "-" : false
						}
					},
					"CHILD": function(type, what, argument, first, last) {
						var simple = type.slice(0, 3) !== "nth",
							forward = type.slice(-4) !== "last",
							ofType = what === "of-type";
						return first === 1 && last === 0 ?
						function(elem) {
							return !!elem.parentNode
						} : function(elem, context, xml) {
							var cache, outerCache, node, diff, nodeIndex, start, dir = simple !== forward ? "nextSibling" : "previousSibling",
								parent = elem.parentNode,
								name = ofType && elem.nodeName.toLowerCase(),
								useCache = !xml && !ofType;
							if (parent) {
								if (simple) {
									while (dir) {
										node = elem;
										while (node = node[dir]) if (ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) return false;
										start = dir = type === "only" && !start && "nextSibling"
									}
									return true
								}
								start = [forward ? parent.firstChild : parent.lastChild];
								if (forward && useCache) {
									outerCache = parent[expando] || (parent[expando] = {});
									cache = outerCache[type] || [];
									nodeIndex = cache[0] === dirruns && cache[1];
									diff = cache[0] === dirruns && cache[2];
									node = nodeIndex && parent.childNodes[nodeIndex];
									while (node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop()) if (node.nodeType === 1 && ++diff && node === elem) {
										outerCache[type] = [dirruns, nodeIndex, diff];
										break
									}
								} else if (useCache && (cache = (elem[expando] || (elem[expando] = {}))[type]) && cache[0] === dirruns) diff = cache[1];
								else while (node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop()) if ((ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) && ++diff) {
									if (useCache)(node[expando] || (node[expando] = {}))[type] = [dirruns, diff];
									if (node === elem) break
								}
								diff -= last;
								return diff === first || diff % first === 0 && diff / first >= 0
							}
						}
					},
					"PSEUDO": function(pseudo, argument) {
						var args, fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error("unsupported pseudo: " + pseudo);
						if (fn[expando]) return fn(argument);
						if (fn.length > 1) {
							args = [pseudo, pseudo, "", argument];
							return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function(seed, matches) {
								var idx, matched = fn(seed, argument),
									i = matched.length;
								while (i--) {
									idx = indexOf.call(seed, matched[i]);
									seed[idx] = !(matches[idx] = matched[i])
								}
							}) : function(elem) {
								return fn(elem, 0, args)
							}
						}
						return fn
					}
				},
				pseudos: {
					"not": markFunction(function(selector) {
						var input = [],
							results = [],
							matcher = compile(selector.replace(rtrim, "$1"));
						return matcher[expando] ? markFunction(function(seed, matches, context, xml) {
							var elem, unmatched = matcher(seed, null, xml, []),
								i = seed.length;
							while (i--) if (elem = unmatched[i]) seed[i] = !(matches[i] = elem)
						}) : function(elem, context, xml) {
							input[0] = elem;
							matcher(input, null, xml, results);
							return !results.pop()
						}
					}),
					"has": markFunction(function(selector) {
						return function(elem) {
							return Sizzle(selector, elem).length > 0
						}
					}),
					"contains": markFunction(function(text) {
						return function(elem) {
							return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1
						}
					}),
					"lang": markFunction(function(lang) {
						if (!ridentifier.test(lang || "")) Sizzle.error("unsupported lang: " + lang);
						lang = lang.replace(runescape, funescape).toLowerCase();
						return function(elem) {
							var elemLang;
							do
							if (elemLang = documentIsHTML ? elem.lang : elem.getAttribute("xml:lang") || elem.getAttribute("lang")) {
								elemLang = elemLang.toLowerCase();
								return elemLang === lang || elemLang.indexOf(lang + "-") === 0
							}
							while ((elem = elem.parentNode) && elem.nodeType === 1);
							return false
						}
					}),
					"target": function(elem) {
						var hash = window.location && window.location.hash;
						return hash && hash.slice(1) === elem.id
					},
					"root": function(elem) {
						return elem === docElem
					},
					"focus": function(elem) {
						return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !! (elem.type || elem.href || ~elem.tabIndex)
					},
					"enabled": function(elem) {
						return elem.disabled === false
					},
					"disabled": function(elem) {
						return elem.disabled === true
					},
					"checked": function(elem) {
						var nodeName = elem.nodeName.toLowerCase();
						return nodeName === "input" && !! elem.checked || nodeName === "option" && !! elem.selected
					},
					"selected": function(elem) {
						if (elem.parentNode) elem.parentNode.selectedIndex;
						return elem.selected === true
					},
					"empty": function(elem) {
						for (elem = elem.firstChild; elem; elem = elem.nextSibling) if (elem.nodeType < 6) return false;
						return true
					},
					"parent": function(elem) {
						return !Expr.pseudos["empty"](elem)
					},
					"header": function(elem) {
						return rheader.test(elem.nodeName)
					},
					"input": function(elem) {
						return rinputs.test(elem.nodeName)
					},
					"button": function(elem) {
						var name = elem.nodeName.toLowerCase();
						return name === "input" && elem.type === "button" || name === "button"
					},
					"text": function(elem) {
						var attr;
						return elem.nodeName.toLowerCase() === "input" && elem.type === "text" && ((attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text")
					},
					"first": createPositionalPseudo(function() {
						return [0]
					}),
					"last": createPositionalPseudo(function(matchIndexes, length) {
						return [length - 1]
					}),
					"eq": createPositionalPseudo(function(matchIndexes, length, argument) {
						return [argument < 0 ? argument + length : argument]
					}),
					"even": createPositionalPseudo(function(matchIndexes, length) {
						var i = 0;
						for (; i < length; i += 2) matchIndexes.push(i);
						return matchIndexes
					}),
					"odd": createPositionalPseudo(function(matchIndexes, length) {
						var i = 1;
						for (; i < length; i += 2) matchIndexes.push(i);
						return matchIndexes
					}),
					"lt": createPositionalPseudo(function(matchIndexes, length, argument) {
						var i = argument < 0 ? argument + length : argument;
						for (; --i >= 0;) matchIndexes.push(i);
						return matchIndexes
					}),
					"gt": createPositionalPseudo(function(matchIndexes, length, argument) {
						var i = argument < 0 ? argument + length : argument;
						for (; ++i < length;) matchIndexes.push(i);
						return matchIndexes
					})
				}
			};
			Expr.pseudos["nth"] = Expr.pseudos["eq"];
			for (i in {
				radio: true,
				checkbox: true,
				file: true,
				password: true,
				image: true
			}) Expr.pseudos[i] = createInputPseudo(i);
			for (i in {
				submit: true,
				reset: true
			}) Expr.pseudos[i] = createButtonPseudo(i);

			function setFilters() {}
			setFilters.prototype = Expr.filters = Expr.pseudos;
			Expr.setFilters = new setFilters;
			tokenize = Sizzle.tokenize = function(selector, parseOnly) {
				var matched, match, tokens, type, soFar, groups, preFilters, cached = tokenCache[selector + " "];
				if (cached) return parseOnly ? 0 : cached.slice(0);
				soFar = selector;
				groups = [];
				preFilters = Expr.preFilter;
				while (soFar) {
					if (!matched || (match = rcomma.exec(soFar))) {
						if (match) soFar = soFar.slice(match[0].length) || soFar;
						groups.push(tokens = [])
					}
					matched = false;
					if (match = rcombinators.exec(soFar)) {
						matched = match.shift();
						tokens.push({
							value: matched,
							type: match[0].replace(rtrim, " ")
						});
						soFar = soFar.slice(matched.length)
					}
					for (type in Expr.filter) if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] || (match = preFilters[type](match)))) {
						matched = match.shift();
						tokens.push({
							value: matched,
							type: type,
							matches: match
						});
						soFar = soFar.slice(matched.length)
					}
					if (!matched) break
				}
				return parseOnly ? soFar.length : soFar ? Sizzle.error(selector) : tokenCache(selector, groups).slice(0)
			};

			function toSelector(tokens) {
				var i = 0,
					len = tokens.length,
					selector = "";
				for (; i < len; i++) selector += tokens[i].value;
				return selector
			}
			function addCombinator(matcher, combinator, base) {
				var dir = combinator.dir,
					checkNonElements = base && dir === "parentNode",
					doneName = done++;
				return combinator.first ?
				function(elem, context, xml) {
					while (elem = elem[dir]) if (elem.nodeType === 1 || checkNonElements) return matcher(elem, context, xml)
				} : function(elem, context, xml) {
					var oldCache, outerCache, newCache = [dirruns, doneName];
					if (xml) while (elem = elem[dir]) {
						if (elem.nodeType === 1 || checkNonElements) if (matcher(elem, context, xml)) return true
					} else while (elem = elem[dir]) if (elem.nodeType === 1 || checkNonElements) {
						outerCache = elem[expando] || (elem[expando] = {});
						if ((oldCache = outerCache[dir]) && oldCache[0] === dirruns && oldCache[1] === doneName) return newCache[2] = oldCache[2];
						else {
							outerCache[dir] = newCache;
							if (newCache[2] = matcher(elem, context, xml)) return true
						}
					}
				}
			}
			function elementMatcher(matchers) {
				return matchers.length > 1 ?
				function(elem, context, xml) {
					var i = matchers.length;
					while (i--) if (!matchers[i](elem, context, xml)) return false;
					return true
				} : matchers[0]
			}
			function multipleContexts(selector, contexts, results) {
				var i = 0,
					len = contexts.length;
				for (; i < len; i++) Sizzle(selector, contexts[i], results);
				return results
			}

			function condense(unmatched, map, filter, context, xml) {
				var elem, newUnmatched = [],
					i = 0,
					len = unmatched.length,
					mapped = map != null;
				for (; i < len; i++) if (elem = unmatched[i]) if (!filter || filter(elem, context, xml)) {
					newUnmatched.push(elem);
					if (mapped) map.push(i)
				}
				return newUnmatched
			}
			function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
				if (postFilter && !postFilter[expando]) postFilter = setMatcher(postFilter);
				if (postFinder && !postFinder[expando]) postFinder = setMatcher(postFinder, postSelector);
				return markFunction(function(seed, results, context, xml) {
					var temp, i, elem, preMap = [],
						postMap = [],
						preexisting = results.length,
						elems = seed || multipleContexts(selector || "*", context.nodeType ? [context] : context, []),
						matcherIn = preFilter && (seed || !selector) ? condense(elems, preMap, preFilter, context, xml) : elems,
						matcherOut = matcher ? postFinder || (seed ? preFilter : preexisting || postFilter) ? [] : results : matcherIn;
					if (matcher) matcher(matcherIn, matcherOut, context, xml);
					if (postFilter) {
						temp = condense(matcherOut, postMap);
						postFilter(temp, [], context, xml);
						i = temp.length;
						while (i--) if (elem = temp[i]) matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem)
					}
					if (seed) {
						if (postFinder || preFilter) {
							if (postFinder) {
								temp = [];
								i = matcherOut.length;
								while (i--) if (elem = matcherOut[i]) temp.push(matcherIn[i] = elem);
								postFinder(null, matcherOut = [], temp, xml)
							}
							i = matcherOut.length;
							while (i--) if ((elem = matcherOut[i]) && (temp = postFinder ? indexOf.call(seed, elem) : preMap[i]) > -1) seed[temp] = !(results[temp] = elem)
						}
					} else {
						matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut);
						if (postFinder) postFinder(null, results, matcherOut, xml);
						else push.apply(results, matcherOut)
					}
				})
			}
			function matcherFromTokens(tokens) {
				var checkContext, matcher, j, len = tokens.length,
					leadingRelative = Expr.relative[tokens[0].type],
					implicitRelative = leadingRelative || Expr.relative[" "],
					i = leadingRelative ? 1 : 0,
					matchContext = addCombinator(function(elem) {
						return elem === checkContext
					}, implicitRelative, true),
					matchAnyContext = addCombinator(function(elem) {
						return indexOf.call(checkContext, elem) > -1
					}, implicitRelative, true),
					matchers = [function(elem, context, xml) {
						return !leadingRelative && (xml || context !== outermostContext) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml))
					}];
				for (; i < len; i++) if (matcher = Expr.relative[tokens[i].type]) matchers = [addCombinator(elementMatcher(matchers), matcher)];
				else {
					matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches);
					if (matcher[expando]) {
						j = ++i;
						for (; j < len; j++) if (Expr.relative[tokens[j].type]) break;
						return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && toSelector(tokens.slice(0, i - 1).concat({
							value: tokens[i - 2].type === " " ? "*" : ""
						})).replace(rtrim, "$1"), matcher, i < j && matcherFromTokens(tokens.slice(i, j)), j < len && matcherFromTokens(tokens = tokens.slice(j)), j < len && toSelector(tokens))
					}
					matchers.push(matcher)
				}
				return elementMatcher(matchers)
			}
			function matcherFromGroupMatchers(elementMatchers, setMatchers) {
				var bySet = setMatchers.length > 0,
					byElement = elementMatchers.length > 0,
					superMatcher = function(seed, context, xml, results, outermost) {
						var elem, j, matcher, matchedCount = 0,
							i = "0",
							unmatched = seed && [],
							setMatched = [],
							contextBackup = outermostContext,
							elems = seed || byElement && Expr.find["TAG"]("*", outermost),
							dirrunsUnique = dirruns += contextBackup == null ? 1 : Math.random() || .1,
							len = elems.length;
						if (outermost) outermostContext = context !== document && context;
						for (; i !== len && (elem = elems[i]) != null; i++) {
							if (byElement && elem) {
								j = 0;
								while (matcher = elementMatchers[j++]) if (matcher(elem, context, xml)) {
									results.push(elem);
									break
								}
								if (outermost) dirruns = dirrunsUnique
							}
							if (bySet) {
								if (elem = !matcher && elem) matchedCount--;
								if (seed) unmatched.push(elem)
							}
						}
						matchedCount += i;
						if (bySet && i !== matchedCount) {
							j = 0;
							while (matcher = setMatchers[j++]) matcher(unmatched, setMatched, context, xml);
							if (seed) {
								if (matchedCount > 0) while (i--) if (!(unmatched[i] || setMatched[i])) setMatched[i] = pop.call(results);
								setMatched = condense(setMatched)
							}
							push.apply(results, setMatched);
							if (outermost && !seed && setMatched.length > 0 && matchedCount + setMatchers.length > 1) Sizzle.uniqueSort(results)
						}
						if (outermost) {
							dirruns = dirrunsUnique;
							outermostContext = contextBackup
						}
						return unmatched
					};
				return bySet ? markFunction(superMatcher) : superMatcher
			}
			compile = Sizzle.compile = function(selector, match) {
				var i, setMatchers = [],
					elementMatchers = [],
					cached = compilerCache[selector + " "];
				if (!cached) {
					if (!match) match = tokenize(selector);
					i = match.length;
					while (i--) {
						cached = matcherFromTokens(match[i]);
						if (cached[expando]) setMatchers.push(cached);
						else elementMatchers.push(cached)
					}
					cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers));
					cached.selector = selector
				}
				return cached
			};
			select = Sizzle.select = function(selector, context, results, seed) {
				var i, tokens, token, type, find, compiled = typeof selector === "function" && selector,
					match = !seed && tokenize(selector = compiled.selector || selector);
				results = results || [];
				if (match.length === 1) {
					tokens = match[0] = match[0].slice(0);
					if (tokens.length > 2 && (token = tokens[0]).type === "ID" && support.getById && context.nodeType === 9 && documentIsHTML && Expr.relative[tokens[1].type]) {
						context = (Expr.find["ID"](token.matches[0].replace(runescape, funescape), context) || [])[0];
						if (!context) return results;
						else if (compiled) context = context.parentNode;
						selector = selector.slice(tokens.shift().value.length)
					}
					i = matchExpr["needsContext"].test(selector) ? 0 : tokens.length;
					while (i--) {
						token = tokens[i];
						if (Expr.relative[type = token.type]) break;
						if (find = Expr.find[type]) if (seed = find(token.matches[0].replace(runescape, funescape), rsibling.test(tokens[0].type) && testContext(context.parentNode) || context)) {
							tokens.splice(i, 1);
							selector = seed.length && toSelector(tokens);
							if (!selector) {
								push.apply(results, seed);
								return results
							}
							break
						}
					}
				}(compiled || compile(selector, match))(seed, context, !documentIsHTML, results, rsibling.test(selector) && testContext(context.parentNode) || context);
				return results
			};
			support.sortStable = expando.split("").sort(sortOrder).join("") === expando;
			support.detectDuplicates = !! hasDuplicate;
			setDocument();
			support.sortDetached = assert(function(div1) {
				return div1.compareDocumentPosition(document.createElement("div")) & 1
			});
			if (!assert(function(div) {
				div.innerHTML = "<a href='#'></a>";
				return div.firstChild.getAttribute("href") === "#"
			})) addHandle("type|href|height|width", function(elem, name, isXML) {
				if (!isXML) return elem.getAttribute(name, name.toLowerCase() === "type" ? 1 : 2)
			});
			if (!support.attributes || !assert(function(div) {
				div.innerHTML = "<input/>";
				div.firstChild.setAttribute("value", "");
				return div.firstChild.getAttribute("value") === ""
			})) addHandle("value", function(elem, name, isXML) {
				if (!isXML && elem.nodeName.toLowerCase() === "input") return elem.defaultValue
			});
			if (!assert(function(div) {
				return div.getAttribute("disabled") == null
			})) addHandle(booleans, function(elem, name, isXML) {
				var val;
				if (!isXML) return elem[name] === true ? name.toLowerCase() : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null
			});
			return Sizzle
		}(window);
	jQuery.find = Sizzle;
	jQuery.expr = Sizzle.selectors;
	jQuery.expr[":"] = jQuery.expr.pseudos;
	jQuery.unique = Sizzle.uniqueSort;
	jQuery.text = Sizzle.getText;
	jQuery.isXMLDoc = Sizzle.isXML;
	jQuery.contains = Sizzle.contains;
	var rneedsContext = jQuery.expr.match.needsContext;
	var rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/;
	var risSimple = /^.[^:#\[\.,]*$/;

	function winnow(elements, qualifier, not) {
		if (jQuery.isFunction(qualifier)) return jQuery.grep(elements, function(elem, i) {
			return !!qualifier.call(elem, i, elem) !== not
		});
		if (qualifier.nodeType) return jQuery.grep(elements, function(elem) {
			return elem === qualifier !== not
		});
		if (typeof qualifier === "string") {
			if (risSimple.test(qualifier)) return jQuery.filter(qualifier, elements, not);
			qualifier = jQuery.filter(qualifier, elements)
		}
		return jQuery.grep(elements, function(elem) {
			return jQuery.inArray(elem, qualifier) >= 0 !== not
		})
	}
	jQuery.filter = function(expr, elems, not) {
		var elem = elems[0];
		if (not) expr = ":not(" + expr + ")";
		return elems.length === 1 && elem.nodeType === 1 ? jQuery.find.matchesSelector(elem, expr) ? [elem] : [] : jQuery.find.matches(expr, jQuery.grep(elems, function(elem) {
			return elem.nodeType === 1
		}))
	};
	jQuery.fn.extend({
		find: function(selector) {
			var i, ret = [],
				self = this,
				len = self.length;
			if (typeof selector !== "string") return this.pushStack(jQuery(selector).filter(function() {
				for (i = 0; i < len; i++) if (jQuery.contains(self[i], this)) return true
			}));
			for (i = 0; i < len; i++) jQuery.find(selector, self[i], ret);
			ret = this.pushStack(len > 1 ? jQuery.unique(ret) : ret);
			ret.selector = this.selector ? this.selector + " " + selector : selector;
			return ret
		},
		filter: function(selector) {
			return this.pushStack(winnow(this, selector || [], false))
		},
		not: function(selector) {
			return this.pushStack(winnow(this, selector || [], true))
		},
		is: function(selector) {
			return !!winnow(this, typeof selector === "string" && rneedsContext.test(selector) ? jQuery(selector) : selector || [], false).length
		}
	});
	var rootjQuery, document = window.document,
		rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
		init = jQuery.fn.init = function(selector, context) {
			var match, elem;
			if (!selector) return this;
			if (typeof selector === "string") {
				if (selector.charAt(0) === "<" && selector.charAt(selector.length - 1) === ">" && selector.length >= 3) match = [null, selector, null];
				else match = rquickExpr.exec(selector);
				if (match && (match[1] || !context)) if (match[1]) {
					context = context instanceof jQuery ? context[0] : context;
					jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, true));
					if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) for (match in context) if (jQuery.isFunction(this[match])) this[match](context[match]);
					else this.attr(match, context[match]);
					return this
				} else {
					elem = document.getElementById(match[2]);
					if (elem && elem.parentNode) {
						if (elem.id !== match[2]) return rootjQuery.find(selector);
						this.length = 1;
						this[0] = elem
					}
					this.context = document;
					this.selector = selector;
					return this
				} else if (!context || context.jquery) return (context || rootjQuery).find(selector);
				else return this.constructor(context).find(selector)
			} else if (selector.nodeType) {
				this.context = this[0] = selector;
				this.length = 1;
				return this
			} else if (jQuery.isFunction(selector)) return typeof rootjQuery.ready !== "undefined" ? rootjQuery.ready(selector) : selector(jQuery);
			if (selector.selector !== undefined) {
				this.selector = selector.selector;
				this.context = selector.context
			}
			return jQuery.makeArray(selector, this)
		};
	init.prototype = jQuery.fn;
	rootjQuery = jQuery(document);
	var rparentsprev = /^(?:parents|prev(?:Until|All))/,
		guaranteedUnique = {
			children: true,
			contents: true,
			next: true,
			prev: true
		};
	jQuery.extend({
		dir: function(elem, dir, until) {
			var matched = [],
				cur = elem[dir];
			while (cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery(cur).is(until))) {
				if (cur.nodeType === 1) matched.push(cur);
				cur = cur[dir]
			}
			return matched
		},
		sibling: function(n, elem) {
			var r = [];
			for (; n; n = n.nextSibling) if (n.nodeType === 1 && n !== elem) r.push(n);
			return r
		}
	});
	jQuery.fn.extend({
		has: function(target) {
			var i, targets = jQuery(target, this),
				len = targets.length;
			return this.filter(function() {
				for (i = 0; i < len; i++) if (jQuery.contains(this, targets[i])) return true
			})
		},
		closest: function(selectors, context) {
			var cur, i = 0,
				l = this.length,
				matched = [],
				pos = rneedsContext.test(selectors) || typeof selectors !== "string" ? jQuery(selectors, context || this.context) : 0;
			for (; i < l; i++) for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) if (cur.nodeType < 11 && (pos ? pos.index(cur) > -1 : cur.nodeType === 1 && jQuery.find.matchesSelector(cur, selectors))) {
				matched.push(cur);
				break
			}
			return this.pushStack(matched.length > 1 ? jQuery.unique(matched) : matched)
		},
		index: function(elem) {
			if (!elem) return this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
			if (typeof elem === "string") return jQuery.inArray(this[0], jQuery(elem));
			return jQuery.inArray(elem.jquery ? elem[0] : elem, this)
		},
		add: function(selector, context) {
			return this.pushStack(jQuery.unique(jQuery.merge(this.get(), jQuery(selector, context))))
		},
		addBack: function(selector) {
			return this.add(selector == null ? this.prevObject : this.prevObject.filter(selector))
		}
	});

	function sibling(cur, dir) {
		do cur = cur[dir];
		while (cur && cur.nodeType !== 1);
		return cur
	}
	jQuery.each({
		parent: function(elem) {
			var parent = elem.parentNode;
			return parent && parent.nodeType !== 11 ? parent : null
		},
		parents: function(elem) {
			return jQuery.dir(elem, "parentNode")
		},
		parentsUntil: function(elem, i, until) {
			return jQuery.dir(elem, "parentNode", until)
		},
		next: function(elem) {
			return sibling(elem, "nextSibling")
		},
		prev: function(elem) {
			return sibling(elem, "previousSibling")
		},
		nextAll: function(elem) {
			return jQuery.dir(elem, "nextSibling")
		},
		prevAll: function(elem) {
			return jQuery.dir(elem, "previousSibling")
		},
		nextUntil: function(elem, i, until) {
			return jQuery.dir(elem, "nextSibling", until)
		},
		prevUntil: function(elem, i, until) {
			return jQuery.dir(elem, "previousSibling", until)
		},
		siblings: function(elem) {
			return jQuery.sibling((elem.parentNode || {}).firstChild, elem)
		},
		children: function(elem) {
			return jQuery.sibling(elem.firstChild)
		},
		contents: function(elem) {
			return jQuery.nodeName(elem, "iframe") ? elem.contentDocument || elem.contentWindow.document : jQuery.merge([], elem.childNodes)
		}
	}, function(name, fn) {
		jQuery.fn[name] = function(until, selector) {
			var ret = jQuery.map(this, fn, until);
			if (name.slice(-5) !== "Until") selector = until;
			if (selector && typeof selector === "string") ret = jQuery.filter(selector, ret);
			if (this.length > 1) {
				if (!guaranteedUnique[name]) ret = jQuery.unique(ret);
				if (rparentsprev.test(name)) ret = ret.reverse()
			}
			return this.pushStack(ret)
		}
	});
	var rnotwhite = /\S+/g;
	var optionsCache = {};

	function createOptions(options) {
		var object = optionsCache[options] = {};
		jQuery.each(options.match(rnotwhite) || [], function(_, flag) {
			object[flag] = true
		});
		return object
	}
	jQuery.Callbacks = function(options) {
		options = typeof options === "string" ? optionsCache[options] || createOptions(options) : jQuery.extend({}, options);
		var firing, memory, fired, firingLength, firingIndex, firingStart, list = [],
			stack = !options.once && [],
			fire = function(data) {
				memory = options.memory && data;
				fired = true;
				firingIndex = firingStart || 0;
				firingStart = 0;
				firingLength = list.length;
				firing = true;
				for (; list && firingIndex < firingLength; firingIndex++) if (list[firingIndex].apply(data[0], data[1]) === false && options.stopOnFalse) {
					memory = false;
					break
				}
				firing = false;
				if (list) if (stack) {
					if (stack.length) fire(stack.shift())
				} else if (memory) list = [];
				else self.disable()
			},
			self = {
				add: function() {
					if (list) {
						var start = list.length;
						(function add(args) {
							jQuery.each(args, function(_, arg) {
								var type = jQuery.type(arg);
								if (type === "function") {
									if (!options.unique || !self.has(arg)) list.push(arg)
								} else if (arg && arg.length && type !== "string") add(arg)
							})
						})(arguments);
						if (firing) firingLength = list.length;
						else if (memory) {
							firingStart = start;
							fire(memory)
						}
					}
					return this
				},
				remove: function() {
					if (list) jQuery.each(arguments, function(_, arg) {
						var index;
						while ((index = jQuery.inArray(arg, list, index)) > -1) {
							list.splice(index, 1);
							if (firing) {
								if (index <= firingLength) firingLength--;
								if (index <= firingIndex) firingIndex--
							}
						}
					});
					return this
				},
				has: function(fn) {
					return fn ? jQuery.inArray(fn, list) > -1 : !! (list && list.length)
				},
				empty: function() {
					list = [];
					firingLength = 0;
					return this
				},
				disable: function() {
					list = stack = memory = undefined;
					return this
				},
				disabled: function() {
					return !list
				},
				lock: function() {
					stack = undefined;
					if (!memory) self.disable();
					return this
				},
				locked: function() {
					return !stack
				},
				fireWith: function(context, args) {
					if (list && (!fired || stack)) {
						args = args || [];
						args = [context, args.slice ? args.slice() : args];
						if (firing) stack.push(args);
						else fire(args)
					}
					return this
				},
				fire: function() {
					self.fireWith(this, arguments);
					return this
				},
				fired: function() {
					return !!fired
				}
			};
		return self
	};
	jQuery.extend({
		Deferred: function(func) {
			var tuples = [
				["resolve", "done", jQuery.Callbacks("once memory"), "resolved"],
				["reject", "fail", jQuery.Callbacks("once memory"), "rejected"],
				["notify", "progress", jQuery.Callbacks("memory")]
			],
				state = "pending",
				promise = {
					state: function() {
						return state
					},
					always: function() {
						deferred.done(arguments).fail(arguments);
						return this
					},
					then: function() {
						var fns = arguments;
						return jQuery.Deferred(function(newDefer) {
							jQuery.each(tuples, function(i, tuple) {
								var fn = jQuery.isFunction(fns[i]) && fns[i];
								deferred[tuple[1]](function() {
									var returned = fn && fn.apply(this, arguments);
									if (returned && jQuery.isFunction(returned.promise)) returned.promise().done(newDefer.resolve).fail(newDefer.reject).progress(newDefer.notify);
									else newDefer[tuple[0] + "With"](this === promise ? newDefer.promise() : this, fn ? [returned] : arguments)
								})
							});
							fns = null
						}).promise()
					},
					promise: function(obj) {
						return obj != null ? jQuery.extend(obj, promise) : promise
					}
				},
				deferred = {};
			promise.pipe = promise.then;
			jQuery.each(tuples, function(i, tuple) {
				var list = tuple[2],
					stateString = tuple[3];
				promise[tuple[1]] = list.add;
				if (stateString) list.add(function() {
					state = stateString
				}, tuples[i ^ 1][2].disable, tuples[2][2].lock);
				deferred[tuple[0]] = function() {
					deferred[tuple[0] + "With"](this === deferred ? promise : this, arguments);
					return this
				};
				deferred[tuple[0] + "With"] = list.fireWith
			});
			promise.promise(deferred);
			if (func) func.call(deferred, deferred);
			return deferred
		},
		when: function(subordinate) {
			var i = 0,
				resolveValues = slice.call(arguments),
				length = resolveValues.length,
				remaining = length !== 1 || subordinate && jQuery.isFunction(subordinate.promise) ? length : 0,
				deferred = remaining === 1 ? subordinate : jQuery.Deferred(),
				updateFunc = function(i, contexts, values) {
					return function(value) {
						contexts[i] = this;
						values[i] = arguments.length > 1 ? slice.call(arguments) : value;
						if (values === progressValues) deferred.notifyWith(contexts, values);
						else if (!--remaining) deferred.resolveWith(contexts, values)
					}
				},
				progressValues, progressContexts, resolveContexts;
			if (length > 1) {
				progressValues = new Array(length);
				progressContexts = new Array(length);
				resolveContexts = new Array(length);
				for (; i < length; i++) if (resolveValues[i] && jQuery.isFunction(resolveValues[i].promise)) resolveValues[i].promise().done(updateFunc(i, resolveContexts, resolveValues)).fail(deferred.reject).progress(updateFunc(i, progressContexts, progressValues));
				else--remaining
			}
			if (!remaining) deferred.resolveWith(resolveContexts, resolveValues);
			return deferred.promise()
		}
	});
	var readyList;
	jQuery.fn.ready = function(fn) {
		jQuery.ready.promise().done(fn);
		return this
	};
	jQuery.extend({
		isReady: false,
		readyWait: 1,
		holdReady: function(hold) {
			if (hold) jQuery.readyWait++;
			else jQuery.ready(true)
		},
		ready: function(wait) {
			if (wait === true ? --jQuery.readyWait : jQuery.isReady) return;
			if (!document.body) return setTimeout(jQuery.ready);
			jQuery.isReady = true;
			if (wait !== true && --jQuery.readyWait > 0) return;
			readyList.resolveWith(document, [jQuery]);
			if (jQuery.fn.triggerHandler) {
				jQuery(document).triggerHandler("ready");
				jQuery(document).off("ready")
			}
		}
	});

	function detach() {
		if (document.addEventListener) {
			document.removeEventListener("DOMContentLoaded", completed, false);
			window.removeEventListener("load", completed, false)
		} else {
			document.detachEvent("onreadystatechange", completed);
			window.detachEvent("onload", completed)
		}
	}
	function completed() {
		if (document.addEventListener || event.type === "load" || document.readyState === "complete") {
			detach();
			jQuery.ready()
		}
	}
	jQuery.ready.promise = function(obj) {
		if (!readyList) {
			readyList = jQuery.Deferred();
			if (document.readyState === "complete") setTimeout(jQuery.ready);
			else if (document.addEventListener) {
				document.addEventListener("DOMContentLoaded", completed, false);
				window.addEventListener("load", completed, false)
			} else {
				document.attachEvent("onreadystatechange", completed);
				window.attachEvent("onload", completed);
				var top = false;
				try {
					top = window.frameElement == null && document.documentElement
				} catch (e) {}
				if (top && top.doScroll)(function doScrollCheck() {
					if (!jQuery.isReady) {
						try {
							top.doScroll("left")
						} catch (e) {
							return setTimeout(doScrollCheck, 50)
						}
						detach();
						jQuery.ready()
					}
				})()
			}
		}
		return readyList.promise(obj)
	};
	var strundefined = typeof undefined;
	var i;
	for (i in jQuery(support)) break;
	support.ownLast = i !== "0";
	support.inlineBlockNeedsLayout = false;
	jQuery(function() {
		var val, div, body, container;
		body = document.getElementsByTagName("body")[0];
		if (!body || !body.style) return;
		div = document.createElement("div");
		container = document.createElement("div");
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild(container).appendChild(div);
		if (typeof div.style.zoom !== strundefined) {
			div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";
			support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
			if (val) body.style.zoom = 1
		}
		body.removeChild(container)
	});
	(function() {
		var div = document.createElement("div");
		if (support.deleteExpando == null) {
			support.deleteExpando = true;
			try {
				delete div.test
			} catch (e) {
				support.deleteExpando = false
			}
		}
		div = null
	})();
	jQuery.acceptData = function(elem) {
		var noData = jQuery.noData[(elem.nodeName + " ").toLowerCase()],
			nodeType = +elem.nodeType || 1;
		return nodeType !== 1 && nodeType !== 9 ? false : !noData || noData !== true && elem.getAttribute("classid") === noData
	};
	var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
		rmultiDash = /([A-Z])/g;

	function dataAttr(elem, key, data) {
		if (data === undefined && elem.nodeType === 1) {
			var name = "data-" + key.replace(rmultiDash, "-$1").toLowerCase();
			data = elem.getAttribute(name);
			if (typeof data === "string") {
				try {
					data = data === "true" ? true : data === "false" ? false : data === "null" ? null : +data + "" === data ? +data : rbrace.test(data) ? jQuery.parseJSON(data) : data
				} catch (e) {}
				jQuery.data(elem, key, data)
			} else data = undefined
		}
		return data
	}
	function isEmptyDataObject(obj) {
		var name;
		for (name in obj) {
			if (name === "data" && jQuery.isEmptyObject(obj[name])) continue;
			if (name !== "toJSON") return false
		}
		return true
	}
	function internalData(elem, name, data, pvt) {
		if (!jQuery.acceptData(elem)) return;
		var ret, thisCache, internalKey = jQuery.expando,
			isNode = elem.nodeType,
			cache = isNode ? jQuery.cache : elem,
			id = isNode ? elem[internalKey] : elem[internalKey] && internalKey;
		if ((!id || !cache[id] || !pvt && !cache[id].data) && data === undefined && typeof name === "string") return;
		if (!id) if (isNode) id = elem[internalKey] = deletedIds.pop() || jQuery.guid++;
		else id = internalKey;
		if (!cache[id]) cache[id] = isNode ? {} : {
			toJSON: jQuery.noop
		};
		if (typeof name === "object" || typeof name === "function") if (pvt) cache[id] = jQuery.extend(cache[id], name);
		else cache[id].data = jQuery.extend(cache[id].data, name);
		thisCache = cache[id];
		if (!pvt) {
			if (!thisCache.data) thisCache.data = {};
			thisCache = thisCache.data
		}
		if (data !== undefined) thisCache[jQuery.camelCase(name)] = data;
		if (typeof name === "string") {
			ret = thisCache[name];
			if (ret == null) ret = thisCache[jQuery.camelCase(name)]
		} else ret = thisCache;
		return ret
	}
	function internalRemoveData(elem, name, pvt) {
		if (!jQuery.acceptData(elem)) return;
		var thisCache, i, isNode = elem.nodeType,
			cache = isNode ? jQuery.cache : elem,
			id = isNode ? elem[jQuery.expando] : jQuery.expando;
		if (!cache[id]) return;
		if (name) {
			thisCache = pvt ? cache[id] : cache[id].data;
			if (thisCache) {
				if (!jQuery.isArray(name)) if (name in thisCache) name = [name];
				else {
					name = jQuery.camelCase(name);
					if (name in thisCache) name = [name];
					else name = name.split(" ")
				} else name = name.concat(jQuery.map(name, jQuery.camelCase));
				i = name.length;
				while (i--) delete thisCache[name[i]];
				if (pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache)) return
			}
		}
		if (!pvt) {
			delete cache[id].data;
			if (!isEmptyDataObject(cache[id])) return
		}
		if (isNode) jQuery.cleanData([elem], true);
		else if (support.deleteExpando || cache != cache.window) delete cache[id];
		else cache[id] = null
	}
	jQuery.extend({
		cache: {},
		noData: {
			"applet ": true,
			"embed ": true,
			"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
		},
		hasData: function(elem) {
			elem = elem.nodeType ? jQuery.cache[elem[jQuery.expando]] : elem[jQuery.expando];
			return !!elem && !isEmptyDataObject(elem)
		},
		data: function(elem, name, data) {
			return internalData(elem, name, data)
		},
		removeData: function(elem, name) {
			return internalRemoveData(elem, name)
		},
		_data: function(elem, name, data) {
			return internalData(elem, name, data, true)
		},
		_removeData: function(elem, name) {
			return internalRemoveData(elem, name, true)
		}
	});
	jQuery.fn.extend({
		data: function(key, value) {
			var i, name, data, elem = this[0],
				attrs = elem && elem.attributes;
			if (key === undefined) {
				if (this.length) {
					data = jQuery.data(elem);
					if (elem.nodeType === 1 && !jQuery._data(elem, "parsedAttrs")) {
						i = attrs.length;
						while (i--) if (attrs[i]) {
							name = attrs[i].name;
							if (name.indexOf("data-") === 0) {
								name = jQuery.camelCase(name.slice(5));
								dataAttr(elem, name, data[name])
							}
						}
						jQuery._data(elem, "parsedAttrs", true)
					}
				}
				return data
			}
			if (typeof key === "object") return this.each(function() {
				jQuery.data(this, key)
			});
			return arguments.length > 1 ? this.each(function() {
				jQuery.data(this, key, value)
			}) : elem ? dataAttr(elem, key, jQuery.data(elem, key)) : undefined
		},
		removeData: function(key) {
			return this.each(function() {
				jQuery.removeData(this, key)
			})
		}
	});
	jQuery.extend({
		queue: function(elem, type, data) {
			var queue;
			if (elem) {
				type = (type || "fx") + "queue";
				queue = jQuery._data(elem, type);
				if (data) if (!queue || jQuery.isArray(data)) queue = jQuery._data(elem, type, jQuery.makeArray(data));
				else queue.push(data);
				return queue || []
			}
		},
		dequeue: function(elem, type) {
			type = type || "fx";
			var queue = jQuery.queue(elem, type),
				startLength = queue.length,
				fn = queue.shift(),
				hooks = jQuery._queueHooks(elem, type),
				next = function() {
					jQuery.dequeue(elem, type)
				};
			if (fn === "inprogress") {
				fn = queue.shift();
				startLength--
			}
			if (fn) {
				if (type === "fx") queue.unshift("inprogress");
				delete hooks.stop;
				fn.call(elem, next, hooks)
			}
			if (!startLength && hooks) hooks.empty.fire()
		},
		_queueHooks: function(elem, type) {
			var key = type + "queueHooks";
			return jQuery._data(elem, key) || jQuery._data(elem, key, {
				empty: jQuery.Callbacks("once memory").add(function() {
					jQuery._removeData(elem, type + "queue");
					jQuery._removeData(elem, key)
				})
			})
		}
	});
	jQuery.fn.extend({
		queue: function(type, data) {
			var setter = 2;
			if (typeof type !== "string") {
				data = type;
				type = "fx";
				setter--
			}
			if (arguments.length < setter) return jQuery.queue(this[0], type);
			return data === undefined ? this : this.each(function() {
				var queue = jQuery.queue(this, type, data);
				jQuery._queueHooks(this, type);
				if (type === "fx" && queue[0] !== "inprogress") jQuery.dequeue(this, type)
			})
		},
		dequeue: function(type) {
			return this.each(function() {
				jQuery.dequeue(this, type)
			})
		},
		clearQueue: function(type) {
			return this.queue(type || "fx", [])
		},
		promise: function(type, obj) {
			var tmp, count = 1,
				defer = jQuery.Deferred(),
				elements = this,
				i = this.length,
				resolve = function() {
					if (!--count) defer.resolveWith(elements, [elements])
				};
			if (typeof type !== "string") {
				obj = type;
				type = undefined
			}
			type = type || "fx";
			while (i--) {
				tmp = jQuery._data(elements[i], type + "queueHooks");
				if (tmp && tmp.empty) {
					count++;
					tmp.empty.add(resolve)
				}
			}
			resolve();
			return defer.promise(obj)
		}
	});
	var pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source;
	var cssExpand = ["Top", "Right", "Bottom", "Left"];
	var isHidden = function(elem, el) {
			elem = el || elem;
			return jQuery.css(elem, "display") === "none" || !jQuery.contains(elem.ownerDocument, elem)
		};
	var access = jQuery.access = function(elems, fn, key, value, chainable, emptyGet, raw) {
			var i = 0,
				length = elems.length,
				bulk = key == null;
			if (jQuery.type(key) === "object") {
				chainable = true;
				for (i in key) jQuery.access(elems, fn, i, key[i], true, emptyGet, raw)
			} else if (value !== undefined) {
				chainable = true;
				if (!jQuery.isFunction(value)) raw = true;
				if (bulk) if (raw) {
					fn.call(elems, value);
					fn = null
				} else {
					bulk = fn;
					fn = function(elem, key, value) {
						return bulk.call(jQuery(elem), value)
					}
				}
				if (fn) for (; i < length; i++) fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)))
			}
			return chainable ? elems : bulk ? fn.call(elems) : length ? fn(elems[0], key) : emptyGet
		};
	var rcheckableType = /^(?:checkbox|radio)$/i;
	(function() {
		var input = document.createElement("input"),
			div = document.createElement("div"),
			fragment = document.createDocumentFragment();
		div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
		support.leadingWhitespace = div.firstChild.nodeType === 3;
		support.tbody = !div.getElementsByTagName("tbody").length;
		support.htmlSerialize = !! div.getElementsByTagName("link").length;
		support.html5Clone = document.createElement("nav").cloneNode(true).outerHTML !== "<:nav></:nav>";
		input.type = "checkbox";
		input.checked = true;
		fragment.appendChild(input);
		support.appendChecked = input.checked;
		div.innerHTML = "<textarea>x</textarea>";
		support.noCloneChecked = !! div.cloneNode(true).lastChild.defaultValue;
		fragment.appendChild(div);
		div.innerHTML = "<input type='radio' checked='checked' name='t'/>";
		support.checkClone = div.cloneNode(true).cloneNode(true).lastChild.checked;
		support.noCloneEvent = true;
		if (div.attachEvent) {
			div.attachEvent("onclick", function() {
				support.noCloneEvent = false
			});
			div.cloneNode(true).click()
		}
		if (support.deleteExpando == null) {
			support.deleteExpando = true;
			try {
				delete div.test
			} catch (e) {
				support.deleteExpando = false
			}
		}
	})();
	(function() {
		var i, eventName, div = document.createElement("div");
		for (i in {
			submit: true,
			change: true,
			focusin: true
		}) {
			eventName = "on" + i;
			if (!(support[i + "Bubbles"] = eventName in window)) {
				div.setAttribute(eventName, "t");
				support[i + "Bubbles"] = div.attributes[eventName].expando === false
			}
		}
		div = null
	})();
	var rformElems = /^(?:input|select|textarea)$/i,
		rkeyEvent = /^key/,
		rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
		rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
		rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

	function returnTrue() {
		return true
	}
	function returnFalse() {
		return false
	}
	function safeActiveElement() {
		try {
			return document.activeElement
		} catch (err) {}
	}
	jQuery.event = {
		global: {},
		add: function(elem, types, handler, data, selector) {
			var tmp, events, t, handleObjIn, special, eventHandle, handleObj, handlers, type, namespaces, origType, elemData = jQuery._data(elem);
			if (!elemData) return;
			if (handler.handler) {
				handleObjIn = handler;
				handler = handleObjIn.handler;
				selector = handleObjIn.selector
			}
			if (!handler.guid) handler.guid = jQuery.guid++;
			if (!(events = elemData.events)) events = elemData.events = {};
			if (!(eventHandle = elemData.handle)) {
				eventHandle = elemData.handle = function(e) {
					return typeof jQuery !== strundefined && (!e || jQuery.event.triggered !== e.type) ? jQuery.event.dispatch.apply(eventHandle.elem, arguments) : undefined
				};
				eventHandle.elem = elem
			}
			types = (types || "").match(rnotwhite) || [""];
			t = types.length;
			while (t--) {
				tmp = rtypenamespace.exec(types[t]) || [];
				type = origType = tmp[1];
				namespaces = (tmp[2] || "").split(".").sort();
				if (!type) continue;
				special = jQuery.event.special[type] || {};
				type = (selector ? special.delegateType : special.bindType) || type;
				special = jQuery.event.special[type] || {};
				handleObj = jQuery.extend({
					type: type,
					origType: origType,
					data: data,
					handler: handler,
					guid: handler.guid,
					selector: selector,
					needsContext: selector && jQuery.expr.match.needsContext.test(selector),
					namespace: namespaces.join(".")
				}, handleObjIn);
				if (!(handlers = events[type])) {
					handlers = events[type] = [];
					handlers.delegateCount = 0;
					if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) if (elem.addEventListener) elem.addEventListener(type, eventHandle, false);
					else if (elem.attachEvent) elem.attachEvent("on" + type, eventHandle)
				}
				if (special.add) {
					special.add.call(elem, handleObj);
					if (!handleObj.handler.guid) handleObj.handler.guid = handler.guid
				}
				if (selector) handlers.splice(handlers.delegateCount++, 0, handleObj);
				else handlers.push(handleObj);
				jQuery.event.global[type] = true
			}
			elem = null
		},
		remove: function(elem, types, handler, selector, mappedTypes) {
			var j, handleObj, tmp, origCount, t, events, special, handlers, type, namespaces, origType, elemData = jQuery.hasData(elem) && jQuery._data(elem);
			if (!elemData || !(events = elemData.events)) return;
			types = (types || "").match(rnotwhite) || [""];
			t = types.length;
			while (t--) {
				tmp = rtypenamespace.exec(types[t]) || [];
				type = origType = tmp[1];
				namespaces = (tmp[2] || "").split(".").sort();
				if (!type) {
					for (type in events) jQuery.event.remove(elem, type + types[t], handler, selector, true);
					continue
				}
				special = jQuery.event.special[type] || {};
				type = (selector ? special.delegateType : special.bindType) || type;
				handlers = events[type] || [];
				tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)");
				origCount = j = handlers.length;
				while (j--) {
					handleObj = handlers[j];
					if ((mappedTypes || origType === handleObj.origType) && (!handler || handler.guid === handleObj.guid) && (!tmp || tmp.test(handleObj.namespace)) && (!selector || selector === handleObj.selector || selector === "**" && handleObj.selector)) {
						handlers.splice(j, 1);
						if (handleObj.selector) handlers.delegateCount--;
						if (special.remove) special.remove.call(elem, handleObj)
					}
				}
				if (origCount && !handlers.length) {
					if (!special.teardown || special.teardown.call(elem, namespaces, elemData.handle) === false) jQuery.removeEvent(elem, type, elemData.handle);
					delete events[type]
				}
			}
			if (jQuery.isEmptyObject(events)) {
				delete elemData.handle;
				jQuery._removeData(elem, "events")
			}
		},
		trigger: function(event, data, elem, onlyHandlers) {
			var handle, ontype, cur, bubbleType, special, tmp, i, eventPath = [elem || document],
				type = hasOwn.call(event, "type") ? event.type : event,
				namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];
			cur = tmp = elem = elem || document;
			if (elem.nodeType === 3 || elem.nodeType === 8) return;
			if (rfocusMorph.test(type + jQuery.event.triggered)) return;
			if (type.indexOf(".") >= 0) {
				namespaces = type.split(".");
				type = namespaces.shift();
				namespaces.sort()
			}
			ontype = type.indexOf(":") < 0 && "on" + type;
			event = event[jQuery.expando] ? event : new jQuery.Event(type, typeof event === "object" && event);
			event.isTrigger = onlyHandlers ? 2 : 3;
			event.namespace = namespaces.join(".");
			event.namespace_re = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
			event.result = undefined;
			if (!event.target) event.target = elem;
			data = data == null ? [event] : jQuery.makeArray(data, [event]);
			special = jQuery.event.special[type] || {};
			if (!onlyHandlers && special.trigger && special.trigger.apply(elem, data) === false) return;
			if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {
				bubbleType = special.delegateType || type;
				if (!rfocusMorph.test(bubbleType + type)) cur = cur.parentNode;
				for (; cur; cur = cur.parentNode) {
					eventPath.push(cur);
					tmp = cur
				}
				if (tmp === (elem.ownerDocument || document)) eventPath.push(tmp.defaultView || tmp.parentWindow || window)
			}
			i = 0;
			while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {
				event.type = i > 1 ? bubbleType : special.bindType || type;
				handle = (jQuery._data(cur, "events") || {})[event.type] && jQuery._data(cur, "handle");
				if (handle) handle.apply(cur, data);
				handle = ontype && cur[ontype];
				if (handle && handle.apply && jQuery.acceptData(cur)) {
					event.result = handle.apply(cur, data);
					if (event.result === false) event.preventDefault()
				}
			}
			event.type = type;
			if (!onlyHandlers && !event.isDefaultPrevented()) if ((!special._default || special._default.apply(eventPath.pop(), data) === false) && jQuery.acceptData(elem)) if (ontype && elem[type] && !jQuery.isWindow(elem)) {
				tmp = elem[ontype];
				if (tmp) elem[ontype] = null;
				jQuery.event.triggered = type;
				try {
					elem[type]()
				} catch (e) {}
				jQuery.event.triggered = undefined;
				if (tmp) elem[ontype] = tmp
			}
			return event.result
		},
		dispatch: function(event) {
			event = jQuery.event.fix(event);
			var i, ret, handleObj, matched, j, handlerQueue = [],
				args = slice.call(arguments),
				handlers = (jQuery._data(this, "events") || {})[event.type] || [],
				special = jQuery.event.special[event.type] || {};
			args[0] = event;
			event.delegateTarget = this;
			if (special.preDispatch && special.preDispatch.call(this, event) === false) return;
			handlerQueue = jQuery.event.handlers.call(this, event, handlers);
			i = 0;
			while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
				event.currentTarget = matched.elem;
				j = 0;
				while ((handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped()) if (!event.namespace_re || event.namespace_re.test(handleObj.namespace)) {
					event.handleObj = handleObj;
					event.data = handleObj.data;
					ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args);
					if (ret !== undefined) if ((event.result = ret) === false) {
						event.preventDefault();
						event.stopPropagation()
					}
				}
			}
			if (special.postDispatch) special.postDispatch.call(this, event);
			return event.result
		},
		handlers: function(event, handlers) {
			var sel, handleObj, matches, i, handlerQueue = [],
				delegateCount = handlers.delegateCount,
				cur = event.target;
			if (delegateCount && cur.nodeType && (!event.button || event.type !== "click")) for (; cur != this; cur = cur.parentNode || this) if (cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click")) {
				matches = [];
				for (i = 0; i < delegateCount; i++) {
					handleObj = handlers[i];
					sel = handleObj.selector + " ";
					if (matches[sel] === undefined) matches[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) >= 0 : jQuery.find(sel, this, null, [cur]).length;
					if (matches[sel]) matches.push(handleObj)
				}
				if (matches.length) handlerQueue.push({
					elem: cur,
					handlers: matches
				})
			}
			if (delegateCount < handlers.length) handlerQueue.push({
				elem: this,
				handlers: handlers.slice(delegateCount)
			});
			return handlerQueue
		},
		fix: function(event) {
			if (event[jQuery.expando]) return event;
			var i, prop, copy, type = event.type,
				originalEvent = event,
				fixHook = this.fixHooks[type];
			if (!fixHook) this.fixHooks[type] = fixHook = rmouseEvent.test(type) ? this.mouseHooks : rkeyEvent.test(type) ? this.keyHooks : {};
			copy = fixHook.props ? this.props.concat(fixHook.props) : this.props;
			event = new jQuery.Event(originalEvent);
			i = copy.length;
			while (i--) {
				prop = copy[i];
				event[prop] = originalEvent[prop]
			}
			if (!event.target) event.target = originalEvent.srcElement || document;
			if (event.target.nodeType === 3) event.target = event.target.parentNode;
			event.metaKey = !! event.metaKey;
			return fixHook.filter ? fixHook.filter(event, originalEvent) : event
		},
		props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
		fixHooks: {},
		keyHooks: {
			props: "char charCode key keyCode".split(" "),
			filter: function(event, original) {
				if (event.which == null) event.which = original.charCode != null ? original.charCode : original.keyCode;
				return event
			}
		},
		mouseHooks: {
			props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
			filter: function(event, original) {
				var body, eventDoc, doc, button = original.button,
					fromElement = original.fromElement;
				if (event.pageX == null && original.clientX != null) {
					eventDoc = event.target.ownerDocument || document;
					doc = eventDoc.documentElement;
					body = eventDoc.body;
					event.pageX = original.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
					event.pageY = original.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0)
				}
				if (!event.relatedTarget && fromElement) event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
				if (!event.which && button !== undefined) event.which = button & 1 ? 1 : button & 2 ? 3 : button & 4 ? 2 : 0;
				return event
			}
		},
		special: {
			load: {
				noBubble: true
			},
			focus: {
				trigger: function() {
					if (this !== safeActiveElement() && this.focus) try {
						this.focus();
						return false
					} catch (e) {}
				},
				delegateType: "focusin"
			},
			blur: {
				trigger: function() {
					if (this === safeActiveElement() && this.blur) {
						this.blur();
						return false
					}
				},
				delegateType: "focusout"
			},
			click: {
				trigger: function() {
					if (jQuery.nodeName(this, "input") && this.type === "checkbox" && this.click) {
						this.click();
						return false
					}
				},
				_default: function(event) {
					return jQuery.nodeName(event.target, "a")
				}
			},
			beforeunload: {
				postDispatch: function(event) {
					if (event.result !== undefined && event.originalEvent) event.originalEvent.returnValue = event.result
				}
			}
		},
		simulate: function(type, elem, event, bubble) {
			var e = jQuery.extend(new jQuery.Event, event, {
				type: type,
				isSimulated: true,
				originalEvent: {}
			});
			if (bubble) jQuery.event.trigger(e, null, elem);
			else jQuery.event.dispatch.call(elem, e);
			if (e.isDefaultPrevented()) event.preventDefault()
		}
	};
	jQuery.removeEvent = document.removeEventListener ?
	function(elem, type, handle) {
		if (elem.removeEventListener) elem.removeEventListener(type, handle, false)
	} : function(elem, type, handle) {
		var name = "on" + type;
		if (elem.detachEvent) {
			if (typeof elem[name] === strundefined) elem[name] = null;
			elem.detachEvent(name, handle)
		}
	};
	jQuery.Event = function(src, props) {
		if (!(this instanceof jQuery.Event)) return new jQuery.Event(src, props);
		if (src && src.type) {
			this.originalEvent = src;
			this.type = src.type;
			this.isDefaultPrevented = src.defaultPrevented || src.defaultPrevented === undefined && src.returnValue === false ? returnTrue : returnFalse
		} else this.type = src;
		if (props) jQuery.extend(this, props);
		this.timeStamp = src && src.timeStamp || jQuery.now();
		this[jQuery.expando] = true
	};
	jQuery.Event.prototype = {
		isDefaultPrevented: returnFalse,
		isPropagationStopped: returnFalse,
		isImmediatePropagationStopped: returnFalse,
		preventDefault: function() {
			var e = this.originalEvent;
			this.isDefaultPrevented = returnTrue;
			if (!e) return;
			if (e.preventDefault) e.preventDefault();
			else e.returnValue = false
		},
		stopPropagation: function() {
			var e = this.originalEvent;
			this.isPropagationStopped = returnTrue;
			if (!e) return;
			if (e.stopPropagation) e.stopPropagation();
			e.cancelBubble = true
		},
		stopImmediatePropagation: function() {
			var e = this.originalEvent;
			this.isImmediatePropagationStopped = returnTrue;
			if (e && e.stopImmediatePropagation) e.stopImmediatePropagation();
			this.stopPropagation()
		}
	};
	jQuery.each({
		mouseenter: "mouseover",
		mouseleave: "mouseout",
		pointerenter: "pointerover",
		pointerleave: "pointerout"
	}, function(orig, fix) {
		jQuery.event.special[orig] = {
			delegateType: fix,
			bindType: fix,
			handle: function(event) {
				var ret, target = this,
					related = event.relatedTarget,
					handleObj = event.handleObj;
				if (!related || related !== target && !jQuery.contains(target, related)) {
					event.type = handleObj.origType;
					ret = handleObj.handler.apply(this, arguments);
					event.type = fix
				}
				return ret
			}
		}
	});
	if (!support.submitBubbles) jQuery.event.special.submit = {
		setup: function() {
			if (jQuery.nodeName(this, "form")) return false;
			jQuery.event.add(this, "click._submit keypress._submit", function(e) {
				var elem = e.target,
					form = jQuery.nodeName(elem, "input") || jQuery.nodeName(elem, "button") ? elem.form : undefined;
				if (form && !jQuery._data(form, "submitBubbles")) {
					jQuery.event.add(form, "submit._submit", function(event) {
						event._submit_bubble = true
					});
					jQuery._data(form, "submitBubbles", true)
				}
			})
		},
		postDispatch: function(event) {
			if (event._submit_bubble) {
				delete event._submit_bubble;
				if (this.parentNode && !event.isTrigger) jQuery.event.simulate("submit", this.parentNode, event, true)
			}
		},
		teardown: function() {
			if (jQuery.nodeName(this, "form")) return false;
			jQuery.event.remove(this, "._submit")
		}
	};
	if (!support.changeBubbles) jQuery.event.special.change = {
		setup: function() {
			if (rformElems.test(this.nodeName)) {
				if (this.type === "checkbox" || this.type === "radio") {
					jQuery.event.add(this, "propertychange._change", function(event) {
						if (event.originalEvent.propertyName === "checked") this._just_changed = true
					});
					jQuery.event.add(this, "click._change", function(event) {
						if (this._just_changed && !event.isTrigger) this._just_changed = false;
						jQuery.event.simulate("change", this, event, true)
					})
				}
				return false
			}
			jQuery.event.add(this, "beforeactivate._change", function(e) {
				var elem = e.target;
				if (rformElems.test(elem.nodeName) && !jQuery._data(elem, "changeBubbles")) {
					jQuery.event.add(elem, "change._change", function(event) {
						if (this.parentNode && !event.isSimulated && !event.isTrigger) jQuery.event.simulate("change", this.parentNode, event, true)
					});
					jQuery._data(elem, "changeBubbles", true)
				}
			})
		},
		handle: function(event) {
			var elem = event.target;
			if (this !== elem || event.isSimulated || event.isTrigger || elem.type !== "radio" && elem.type !== "checkbox") return event.handleObj.handler.apply(this, arguments)
		},
		teardown: function() {
			jQuery.event.remove(this, "._change");
			return !rformElems.test(this.nodeName)
		}
	};
	if (!support.focusinBubbles) jQuery.each({
		focus: "focusin",
		blur: "focusout"
	}, function(orig, fix) {
		var handler = function(event) {
				jQuery.event.simulate(fix, event.target, jQuery.event.fix(event), true)
			};
		jQuery.event.special[fix] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data(doc, fix);
				if (!attaches) doc.addEventListener(orig, handler, true);
				jQuery._data(doc, fix, (attaches || 0) + 1)
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data(doc, fix) - 1;
				if (!attaches) {
					doc.removeEventListener(orig, handler, true);
					jQuery._removeData(doc, fix)
				} else jQuery._data(doc, fix, attaches)
			}
		}
	});
	jQuery.fn.extend({
		on: function(types, selector, data, fn, one) {
			var type, origFn;
			if (typeof types === "object") {
				if (typeof selector !== "string") {
					data = data || selector;
					selector = undefined
				}
				for (type in types) this.on(type, selector, data, types[type], one);
				return this
			}
			if (data == null && fn == null) {
				fn = selector;
				data = selector = undefined
			} else if (fn == null) if (typeof selector === "string") {
				fn = data;
				data = undefined
			} else {
				fn = data;
				data = selector;
				selector = undefined
			}
			if (fn === false) fn = returnFalse;
			else if (!fn) return this;
			if (one === 1) {
				origFn = fn;
				fn = function(event) {
					jQuery().off(event);
					return origFn.apply(this, arguments)
				};
				fn.guid = origFn.guid || (origFn.guid = jQuery.guid++)
			}
			return this.each(function() {
				jQuery.event.add(this, types, fn, data, selector)
			})
		},
		one: function(types, selector, data, fn) {
			return this.on(types, selector, data, fn, 1)
		},
		off: function(types, selector, fn) {
			var handleObj, type;
			if (types && types.preventDefault && types.handleObj) {
				handleObj = types.handleObj;
				jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler);
				return this
			}
			if (typeof types === "object") {
				for (type in types) this.off(type, selector, types[type]);
				return this
			}
			if (selector === false || typeof selector === "function") {
				fn = selector;
				selector = undefined
			}
			if (fn === false) fn = returnFalse;
			return this.each(function() {
				jQuery.event.remove(this, types, fn, selector)
			})
		},
		trigger: function(type, data) {
			return this.each(function() {
				jQuery.event.trigger(type, data, this)
			})
		},
		triggerHandler: function(type, data) {
			var elem = this[0];
			if (elem) return jQuery.event.trigger(type, data, elem, true)
		}
	});

	function createSafeFragment(document) {
		var list = nodeNames.split("|"),
			safeFrag = document.createDocumentFragment();
		if (safeFrag.createElement) while (list.length) safeFrag.createElement(list.pop());
		return safeFrag
	}
	var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" + "header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
		rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
		rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
		rleadingWhitespace = /^\s+/,
		rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
		rtagName = /<([\w:]+)/,
		rtbody = /<tbody/i,
		rhtml = /<|&#?\w+;/,
		rnoInnerhtml = /<(?:script|style|link)/i,
		rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
		rscriptType = /^$|\/(?:java|ecma)script/i,
		rscriptTypeMasked = /^true\/(.*)/,
		rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
		wrapMap = {
			option: [1, "<select multiple='multiple'>", "</select>"],
			legend: [1, "<fieldset>", "</fieldset>"],
			area: [1, "<map>", "</map>"],
			param: [1, "<object>", "</object>"],
			thead: [1, "<table>", "</table>"],
			tr: [2, "<table><tbody>", "</tbody></table>"],
			col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
			td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
			_default: support.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
		},
		safeFragment = createSafeFragment(document),
		fragmentDiv = safeFragment.appendChild(document.createElement("div"));
	wrapMap.optgroup = wrapMap.option;
	wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
	wrapMap.th = wrapMap.td;

	function getAll(context, tag) {
		var elems, elem, i = 0,
			found = typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName(tag || "*") : typeof context.querySelectorAll !== strundefined ? context.querySelectorAll(tag || "*") : undefined;
		if (!found) for (found = [], elems = context.childNodes || context;
		(elem = elems[i]) != null; i++) if (!tag || jQuery.nodeName(elem, tag)) found.push(elem);
		else jQuery.merge(found, getAll(elem, tag));
		return tag === undefined || tag && jQuery.nodeName(context, tag) ? jQuery.merge([context], found) : found
	}
	function fixDefaultChecked(elem) {
		if (rcheckableType.test(elem.type)) elem.defaultChecked = elem.checked
	}
	function manipulationTarget(elem, content) {
		return jQuery.nodeName(elem, "table") && jQuery.nodeName(content.nodeType !== 11 ? content : content.firstChild, "tr") ? elem.getElementsByTagName("tbody")[0] || elem.appendChild(elem.ownerDocument.createElement("tbody")) : elem
	}
	function disableScript(elem) {
		elem.type = (jQuery.find.attr(elem, "type") !== null) + "/" + elem.type;
		return elem
	}
	function restoreScript(elem) {
		var match = rscriptTypeMasked.exec(elem.type);
		if (match) elem.type = match[1];
		else elem.removeAttribute("type");
		return elem
	}
	function setGlobalEval(elems, refElements) {
		var elem, i = 0;
		for (;
		(elem = elems[i]) != null; i++) jQuery._data(elem, "globalEval", !refElements || jQuery._data(refElements[i], "globalEval"))
	}
	function cloneCopyEvent(src, dest) {
		if (dest.nodeType !== 1 || !jQuery.hasData(src)) return;
		var type, i, l, oldData = jQuery._data(src),
			curData = jQuery._data(dest, oldData),
			events = oldData.events;
		if (events) {
			delete curData.handle;
			curData.events = {};
			for (type in events) for (i = 0, l = events[type].length; i < l; i++) jQuery.event.add(dest, type, events[type][i])
		}
		if (curData.data) curData.data = jQuery.extend({}, curData.data)
	}
	function fixCloneNodeIssues(src, dest) {
		var nodeName, e, data;
		if (dest.nodeType !== 1) return;
		nodeName = dest.nodeName.toLowerCase();
		if (!support.noCloneEvent && dest[jQuery.expando]) {
			data = jQuery._data(dest);
			for (e in data.events) jQuery.removeEvent(dest, e, data.handle);
			dest.removeAttribute(jQuery.expando)
		}
		if (nodeName === "script" && dest.text !== src.text) {
			disableScript(dest).text = src.text;
			restoreScript(dest)
		} else if (nodeName === "object") {
			if (dest.parentNode) dest.outerHTML = src.outerHTML;
			if (support.html5Clone && (src.innerHTML && !jQuery.trim(dest.innerHTML))) dest.innerHTML = src.innerHTML
		} else if (nodeName === "input" && rcheckableType.test(src.type)) {
			dest.defaultChecked = dest.checked = src.checked;
			if (dest.value !== src.value) dest.value = src.value
		} else if (nodeName === "option") dest.defaultSelected = dest.selected = src.defaultSelected;
		else if (nodeName === "input" || nodeName === "textarea") dest.defaultValue = src.defaultValue
	}
	jQuery.extend({
		clone: function(elem, dataAndEvents, deepDataAndEvents) {
			var destElements, node, clone, i, srcElements, inPage = jQuery.contains(elem.ownerDocument, elem);
			if (support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test("<" + elem.nodeName + ">")) clone = elem.cloneNode(true);
			else {
				fragmentDiv.innerHTML = elem.outerHTML;
				fragmentDiv.removeChild(clone = fragmentDiv.firstChild)
			}
			if ((!support.noCloneEvent || !support.noCloneChecked) && (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem)) {
				destElements = getAll(clone);
				srcElements = getAll(elem);
				for (i = 0;
				(node = srcElements[i]) != null; ++i) if (destElements[i]) fixCloneNodeIssues(node, destElements[i])
			}
			if (dataAndEvents) if (deepDataAndEvents) {
				srcElements = srcElements || getAll(elem);
				destElements = destElements || getAll(clone);
				for (i = 0;
				(node = srcElements[i]) != null; i++) cloneCopyEvent(node, destElements[i])
			} else cloneCopyEvent(elem, clone);
			destElements = getAll(clone, "script");
			if (destElements.length > 0) setGlobalEval(destElements, !inPage && getAll(elem, "script"));
			destElements = srcElements = node = null;
			return clone
		},
		buildFragment: function(elems, context, scripts, selection) {
			var j, elem, contains, tmp, tag, tbody, wrap, l = elems.length,
				safe = createSafeFragment(context),
				nodes = [],
				i = 0;
			for (; i < l; i++) {
				elem = elems[i];
				if (elem || elem === 0) if (jQuery.type(elem) === "object") jQuery.merge(nodes, elem.nodeType ? [elem] : elem);
				else if (!rhtml.test(elem)) nodes.push(context.createTextNode(elem));
				else {
					tmp = tmp || safe.appendChild(context.createElement("div"));
					tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase();
					wrap = wrapMap[tag] || wrapMap._default;
					tmp.innerHTML = wrap[1] + elem.replace(rxhtmlTag, "<$1><$2>") + wrap[2];
					j = wrap[0];
					while (j--) tmp = tmp.lastChild;
					if (!support.leadingWhitespace && rleadingWhitespace.test(elem)) nodes.push(context.createTextNode(rleadingWhitespace.exec(elem)[0]));
					if (!support.tbody) {
						elem = tag === "table" && !rtbody.test(elem) ? tmp.firstChild : wrap[1] === "<table>" && !rtbody.test(elem) ? tmp : 0;
						j = elem && elem.childNodes.length;
						while (j--) if (jQuery.nodeName(tbody = elem.childNodes[j], "tbody") && !tbody.childNodes.length) elem.removeChild(tbody)
					}
					jQuery.merge(nodes, tmp.childNodes);
					tmp.textContent = "";
					while (tmp.firstChild) tmp.removeChild(tmp.firstChild);
					tmp = safe.lastChild
				}
			}
			if (tmp) safe.removeChild(tmp);
			if (!support.appendChecked) jQuery.grep(getAll(nodes, "input"), fixDefaultChecked);
			i = 0;
			while (elem = nodes[i++]) {
				if (selection && jQuery.inArray(elem, selection) !== -1) continue;
				contains = jQuery.contains(elem.ownerDocument, elem);
				tmp = getAll(safe.appendChild(elem), "script");
				if (contains) setGlobalEval(tmp);
				if (scripts) {
					j = 0;
					while (elem = tmp[j++]) if (rscriptType.test(elem.type || "")) scripts.push(elem)
				}
			}
			tmp = null;
			return safe
		},
		cleanData: function(elems, acceptData) {
			var elem, type, id, data, i = 0,
				internalKey = jQuery.expando,
				cache = jQuery.cache,
				deleteExpando = support.deleteExpando,
				special = jQuery.event.special;
			for (;
			(elem = elems[i]) != null; i++) if (acceptData || jQuery.acceptData(elem)) {
				id = elem[internalKey];
				data = id && cache[id];
				if (data) {
					if (data.events) for (type in data.events) if (special[type]) jQuery.event.remove(elem, type);
					else jQuery.removeEvent(elem, type, data.handle);
					if (cache[id]) {
						delete cache[id];
						if (deleteExpando) delete elem[internalKey];
						else if (typeof elem.removeAttribute !== strundefined) elem.removeAttribute(internalKey);
						else elem[internalKey] = null;
						deletedIds.push(id)
					}
				}
			}
		}
	});
	jQuery.fn.extend({
		text: function(value) {
			return access(this, function(value) {
				return value === undefined ? jQuery.text(this) : this.empty().append((this[0] && this[0].ownerDocument || document).createTextNode(value))
			}, null, value, arguments.length)
		},
		append: function() {
			return this.domManip(arguments, function(elem) {
				if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
					var target = manipulationTarget(this, elem);
					target.appendChild(elem)
				}
			})
		},
		prepend: function() {
			return this.domManip(arguments, function(elem) {
				if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
					var target = manipulationTarget(this, elem);
					target.insertBefore(elem, target.firstChild)
				}
			})
		},
		before: function() {
			return this.domManip(arguments, function(elem) {
				if (this.parentNode) this.parentNode.insertBefore(elem, this)
			})
		},
		after: function() {
			return this.domManip(arguments, function(elem) {
				if (this.parentNode) this.parentNode.insertBefore(elem, this.nextSibling)
			})
		},
		remove: function(selector, keepData) {
			var elem, elems = selector ? jQuery.filter(selector, this) : this,
				i = 0;
			for (;
			(elem = elems[i]) != null; i++) {
				if (!keepData && elem.nodeType === 1) jQuery.cleanData(getAll(elem));
				if (elem.parentNode) {
					if (keepData && jQuery.contains(elem.ownerDocument, elem)) setGlobalEval(getAll(elem, "script"));
					elem.parentNode.removeChild(elem)
				}
			}
			return this
		},
		empty: function() {
			var elem, i = 0;
			for (;
			(elem = this[i]) != null; i++) {
				if (elem.nodeType === 1) jQuery.cleanData(getAll(elem, false));
				while (elem.firstChild) elem.removeChild(elem.firstChild);
				if (elem.options && jQuery.nodeName(elem, "select")) elem.options.length = 0
			}
			return this
		},
		clone: function(dataAndEvents, deepDataAndEvents) {
			dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
			deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
			return this.map(function() {
				return jQuery.clone(this, dataAndEvents, deepDataAndEvents)
			})
		},
		html: function(value) {
			return access(this, function(value) {
				var elem = this[0] || {},
					i = 0,
					l = this.length;
				if (value === undefined) return elem.nodeType === 1 ? elem.innerHTML.replace(rinlinejQuery, "") : undefined;
				if (typeof value === "string" && !rnoInnerhtml.test(value) && (support.htmlSerialize || !rnoshimcache.test(value)) && (support.leadingWhitespace || !rleadingWhitespace.test(value)) && !wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]) {
					value = value.replace(rxhtmlTag, "<$1><$2>");
					try {
						for (; i < l; i++) {
							elem = this[i] || {};
							if (elem.nodeType === 1) {
								jQuery.cleanData(getAll(elem, false));
								elem.innerHTML = value
							}
						}
						elem = 0
					} catch (e) {}
				}
				if (elem) this.empty().append(value)
			}, null, value, arguments.length)
		},
		replaceWith: function() {
			var arg = arguments[0];
			this.domManip(arguments, function(elem) {
				arg = this.parentNode;
				jQuery.cleanData(getAll(this));
				if (arg) arg.replaceChild(elem, this)
			});
			return arg && (arg.length || arg.nodeType) ? this : this.remove()
		},
		detach: function(selector) {
			return this.remove(selector, true)
		},
		domManip: function(args, callback) {
			args = concat.apply([], args);
			var first, node, hasScripts, scripts, doc, fragment, i = 0,
				l = this.length,
				set = this,
				iNoClone = l - 1,
				value = args[0],
				isFunction = jQuery.isFunction(value);
			if (isFunction || l > 1 && typeof value === "string" && !support.checkClone && rchecked.test(value)) return this.each(function(index) {
				var self = set.eq(index);
				if (isFunction) args[0] = value.call(this, index, self.html());
				self.domManip(args, callback)
			});
			if (l) {
				fragment = jQuery.buildFragment(args, this[0].ownerDocument, false, this);
				first = fragment.firstChild;
				if (fragment.childNodes.length === 1) fragment = first;
				if (first) {
					scripts = jQuery.map(getAll(fragment, "script"), disableScript);
					hasScripts = scripts.length;
					for (; i < l; i++) {
						node = fragment;
						if (i !== iNoClone) {
							node = jQuery.clone(node, true, true);
							if (hasScripts) jQuery.merge(scripts, getAll(node, "script"))
						}
						callback.call(this[i], node, i)
					}
					if (hasScripts) {
						doc = scripts[scripts.length - 1].ownerDocument;
						jQuery.map(scripts, restoreScript);
						for (i = 0; i < hasScripts; i++) {
							node = scripts[i];
							if (rscriptType.test(node.type || "") && !jQuery._data(node, "globalEval") && jQuery.contains(doc, node)) if (node.src) {
								if (jQuery._evalUrl) jQuery._evalUrl(node.src)
							} else jQuery.globalEval((node.text || node.textContent || node.innerHTML || "").replace(rcleanScript, ""))
						}
					}
					fragment = first = null
				}
			}
			return this
		}
	});
	jQuery.each({
		appendTo: "append",
		prependTo: "prepend",
		insertBefore: "before",
		insertAfter: "after",
		replaceAll: "replaceWith"
	}, function(name, original) {
		jQuery.fn[name] = function(selector) {
			var elems, i = 0,
				ret = [],
				insert = jQuery(selector),
				last = insert.length - 1;
			for (; i <= last; i++) {
				elems = i === last ? this : this.clone(true);
				jQuery(insert[i])[original](elems);
				push.apply(ret, elems.get())
			}
			return this.pushStack(ret)
		}
	});
	var iframe, elemdisplay = {};

	function actualDisplay(name, doc) {
		var style, elem = jQuery(doc.createElement(name)).appendTo(doc.body),
			display = window.getDefaultComputedStyle && (style = window.getDefaultComputedStyle(elem[0])) ? style.display : jQuery.css(elem[0], "display");
		elem.detach();
		return display
	}
	function defaultDisplay(nodeName) {
		var doc = document,
			display = elemdisplay[nodeName];
		if (!display) {
			display = actualDisplay(nodeName, doc);
			if (display === "none" || !display) {
				iframe = (iframe || jQuery("<iframe frameborder='0' width='0' height='0'/>")).appendTo(doc.documentElement);
				doc = (iframe[0].contentWindow || iframe[0].contentDocument).document;
				doc.write();
				doc.close();
				display = actualDisplay(nodeName, doc);
				iframe.detach()
			}
			elemdisplay[nodeName] = display
		}
		return display
	}(function() {
		var shrinkWrapBlocksVal;
		support.shrinkWrapBlocks = function() {
			if (shrinkWrapBlocksVal != null) return shrinkWrapBlocksVal;
			shrinkWrapBlocksVal = false;
			var div, body, container;
			body = document.getElementsByTagName("body")[0];
			if (!body || !body.style) return;
			div = document.createElement("div");
			container = document.createElement("div");
			container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
			body.appendChild(container).appendChild(div);
			if (typeof div.style.zoom !== strundefined) {
				div.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" + "box-sizing:content-box;display:block;margin:0;border:0;" + "padding:1px;width:1px;zoom:1";
				div.appendChild(document.createElement("div")).style.width = "5px";
				shrinkWrapBlocksVal = div.offsetWidth !== 3
			}
			body.removeChild(container);
			return shrinkWrapBlocksVal
		}
	})();
	var rmargin = /^margin/;
	var rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i");
	var getStyles, curCSS, rposition = /^(top|right|bottom|left)$/;
	if (window.getComputedStyle) {
		getStyles = function(elem) {
			return elem.ownerDocument.defaultView.getComputedStyle(elem, null)
		};
		curCSS = function(elem, name, computed) {
			var width, minWidth, maxWidth, ret, style = elem.style;
			computed = computed || getStyles(elem);
			ret = computed ? computed.getPropertyValue(name) || computed[name] : undefined;
			if (computed) {
				if (ret === "" && !jQuery.contains(elem.ownerDocument, elem)) ret = jQuery.style(elem, name);
				if (rnumnonpx.test(ret) && rmargin.test(name)) {
					width = style.width;
					minWidth = style.minWidth;
					maxWidth = style.maxWidth;
					style.minWidth = style.maxWidth = style.width = ret;
					ret = computed.width;
					style.width = width;
					style.minWidth = minWidth;
					style.maxWidth = maxWidth
				}
			}
			return ret === undefined ? ret : ret + ""
		}
	} else if (document.documentElement.currentStyle) {
		getStyles = function(elem) {
			return elem.currentStyle
		};
		curCSS = function(elem, name, computed) {
			var left, rs, rsLeft, ret, style = elem.style;
			computed = computed || getStyles(elem);
			ret = computed ? computed[name] : undefined;
			if (ret == null && style && style[name]) ret = style[name];
			if (rnumnonpx.test(ret) && !rposition.test(name)) {
				left = style.left;
				rs = elem.runtimeStyle;
				rsLeft = rs && rs.left;
				if (rsLeft) rs.left = elem.currentStyle.left;
				style.left = name === "fontSize" ? "1em" : ret;
				ret = style.pixelLeft + "px";
				style.left = left;
				if (rsLeft) rs.left = rsLeft
			}
			return ret === undefined ? ret : ret + "" || "auto"
		}
	}
	function addGetHookIf(conditionFn, hookFn) {
		return {
			get: function() {
				var condition = conditionFn();
				if (condition == null) return;
				if (condition) {
					delete this.get;
					return
				}
				return (this.get = hookFn).apply(this, arguments)
			}
		}
	}(function() {
		var div, style, a, pixelPositionVal, boxSizingReliableVal, reliableHiddenOffsetsVal, reliableMarginRightVal;
		div = document.createElement("div");
		div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
		a = div.getElementsByTagName("a")[0];
		style = a && a.style;
		if (!style) return;
		style.cssText = "float:left;opacity:.5";
		support.opacity = style.opacity === "0.5";
		support.cssFloat = !! style.cssFloat;
		div.style.backgroundClip = "content-box";
		div.cloneNode(true).style.backgroundClip = "";
		support.clearCloneStyle = div.style.backgroundClip === "content-box";
		support.boxSizing = style.boxSizing === "" || style.MozBoxSizing === "" || style.WebkitBoxSizing === "";
		jQuery.extend(support, {
			reliableHiddenOffsets: function() {
				if (reliableHiddenOffsetsVal == null) computeStyleTests();
				return reliableHiddenOffsetsVal
			},
			boxSizingReliable: function() {
				if (boxSizingReliableVal == null) computeStyleTests();
				return boxSizingReliableVal
			},
			pixelPosition: function() {
				if (pixelPositionVal == null) computeStyleTests();
				return pixelPositionVal
			},
			reliableMarginRight: function() {
				if (reliableMarginRightVal == null) computeStyleTests();
				return reliableMarginRightVal
			}
		});

		function computeStyleTests() {
			var div, body, container, contents;
			body = document.getElementsByTagName("body")[0];
			if (!body || !body.style) return;
			div = document.createElement("div");
			container = document.createElement("div");
			container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
			body.appendChild(container).appendChild(div);
			div.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" + "box-sizing:border-box;display:block;margin-top:1%;top:1%;" + "border:1px;padding:1px;width:4px;position:absolute";
			pixelPositionVal = boxSizingReliableVal = false;
			reliableMarginRightVal = true;
			if (window.getComputedStyle) {
				pixelPositionVal = (window.getComputedStyle(div, null) || {}).top !== "1%";
				boxSizingReliableVal = (window.getComputedStyle(div, null) || {
					width: "4px"
				}).width === "4px";
				contents = div.appendChild(document.createElement("div"));
				contents.style.cssText = div.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" + "box-sizing:content-box;display:block;margin:0;border:0;padding:0";
				contents.style.marginRight = contents.style.width = "0";
				div.style.width = "1px";
				reliableMarginRightVal = !parseFloat((window.getComputedStyle(contents, null) || {}).marginRight)
			}
			div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
			contents = div.getElementsByTagName("td");
			contents[0].style.cssText = "margin:0;border:0;padding:0;display:none";
			reliableHiddenOffsetsVal = contents[0].offsetHeight === 0;
			if (reliableHiddenOffsetsVal) {
				contents[0].style.display = "";
				contents[1].style.display = "none";
				reliableHiddenOffsetsVal = contents[0].offsetHeight === 0
			}
			body.removeChild(container)
		}
	})();
	jQuery.swap = function(elem, options, callback, args) {
		var ret, name, old = {};
		for (name in options) {
			old[name] = elem.style[name];
			elem.style[name] = options[name]
		}
		ret = callback.apply(elem, args || []);
		for (name in options) elem.style[name] = old[name];
		return ret
	};
	var ralpha = /alpha\([^)]*\)/i,
		ropacity = /opacity\s*=\s*([^)]*)/,
		rdisplayswap = /^(none|table(?!-c[ea]).+)/,
		rnumsplit = new RegExp("^(" + pnum + ")(.*)$", "i"),
		rrelNum = new RegExp("^([+-])=(" + pnum + ")", "i"),
		cssShow = {
			position: "absolute",
			visibility: "hidden",
			display: "block"
		},
		cssNormalTransform = {
			letterSpacing: "0",
			fontWeight: "400"
		},
		cssPrefixes = ["Webkit", "O", "Moz", "ms"];

	function vendorPropName(style, name) {
		if (name in style) return name;
		var capName = name.charAt(0).toUpperCase() + name.slice(1),
			origName = name,
			i = cssPrefixes.length;
		while (i--) {
			name = cssPrefixes[i] + capName;
			if (name in style) return name
		}
		return origName
	}
	function showHide(elements, show) {
		var display, elem, hidden, values = [],
			index = 0,
			length = elements.length;
		for (; index < length; index++) {
			elem = elements[index];
			if (!elem.style) continue;
			values[index] = jQuery._data(elem, "olddisplay");
			display = elem.style.display;
			if (show) {
				if (!values[index] && display === "none") elem.style.display = "";
				if (elem.style.display === "" && isHidden(elem)) values[index] = jQuery._data(elem, "olddisplay", defaultDisplay(elem.nodeName))
			} else {
				hidden = isHidden(elem);
				if (display && display !== "none" || !hidden) jQuery._data(elem, "olddisplay", hidden ? display : jQuery.css(elem, "display"))
			}
		}
		for (index = 0; index < length; index++) {
			elem = elements[index];
			if (!elem.style) continue;
			if (!show || elem.style.display === "none" || elem.style.display === "") elem.style.display = show ? values[index] || "" : "none"
		}
		return elements
	}
	function setPositiveNumber(elem, value, subtract) {
		var matches = rnumsplit.exec(value);
		return matches ? Math.max(0, matches[1] - (subtract || 0)) + (matches[2] || "px") : value
	}
	function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) {
		var i = extra === (isBorderBox ? "border" : "content") ? 4 : name === "width" ? 1 : 0,
			val = 0;
		for (; i < 4; i += 2) {
			if (extra === "margin") val += jQuery.css(elem, extra + cssExpand[i], true, styles);
			if (isBorderBox) {
				if (extra === "content") val -= jQuery.css(elem, "padding" + cssExpand[i], true, styles);
				if (extra !== "margin") val -= jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles)
			} else {
				val += jQuery.css(elem, "padding" + cssExpand[i], true, styles);
				if (extra !== "padding") val += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles)
			}
		}
		return val
	}
	function getWidthOrHeight(elem, name, extra) {
		var valueIsBorderBox = true,
			val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
			styles = getStyles(elem),
			isBorderBox = support.boxSizing && jQuery.css(elem, "boxSizing", false, styles) === "border-box";
		if (val <= 0 || val == null) {
			val = curCSS(elem, name, styles);
			if (val < 0 || val == null) val = elem.style[name];
			if (rnumnonpx.test(val)) return val;
			valueIsBorderBox = isBorderBox && (support.boxSizingReliable() || val === elem.style[name]);
			val = parseFloat(val) || 0
		}
		return val + augmentWidthOrHeight(elem, name, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox, styles) + "px"
	}
	jQuery.extend({
		cssHooks: {
			opacity: {
				get: function(elem, computed) {
					if (computed) {
						var ret = curCSS(elem, "opacity");
						return ret === "" ? "1" : ret
					}
				}
			}
		},
		cssNumber: {
			"columnCount": true,
			"fillOpacity": true,
			"flexGrow": true,
			"flexShrink": true,
			"fontWeight": true,
			"lineHeight": true,
			"opacity": true,
			"order": true,
			"orphans": true,
			"widows": true,
			"zIndex": true,
			"zoom": true
		},
		cssProps: {
			"float": support.cssFloat ? "cssFloat" : "styleFloat"
		},
		style: function(elem, name, value, extra) {
			if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) return;
			var ret, type, hooks, origName = jQuery.camelCase(name),
				style = elem.style;
			name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(style, origName));
			hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
			if (value !== undefined) {
				type = typeof value;
				if (type === "string" && (ret = rrelNum.exec(value))) {
					value = (ret[1] + 1) * ret[2] + parseFloat(jQuery.css(elem, name));
					type = "number"
				}
				if (value == null || value !== value) return;
				if (type === "number" && !jQuery.cssNumber[origName]) value += "px";
				if (!support.clearCloneStyle && value === "" && name.indexOf("background") === 0) style[name] = "inherit";
				if (!hooks || !("set" in hooks) || (value = hooks.set(elem, value, extra)) !== undefined) try {
					style[name] = value
				} catch (e) {}
			} else {
				if (hooks && "get" in hooks && (ret = hooks.get(elem, false, extra)) !== undefined) return ret;
				return style[name]
			}
		},
		css: function(elem, name, extra, styles) {
			var num, val, hooks, origName = jQuery.camelCase(name);
			name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(elem.style, origName));
			hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
			if (hooks && "get" in hooks) val = hooks.get(elem, true, extra);
			if (val === undefined) val = curCSS(elem, name, styles);
			if (val === "normal" && name in cssNormalTransform) val = cssNormalTransform[name];
			if (extra === "" || extra) {
				num = parseFloat(val);
				return extra === true || jQuery.isNumeric(num) ? num || 0 : val
			}
			return val
		}
	});
	jQuery.each(["height", "width"], function(i, name) {
		jQuery.cssHooks[name] = {
			get: function(elem, computed, extra) {
				if (computed) return rdisplayswap.test(jQuery.css(elem, "display")) && elem.offsetWidth === 0 ? jQuery.swap(elem, cssShow, function() {
					return getWidthOrHeight(elem, name, extra)
				}) : getWidthOrHeight(elem, name, extra)
			},
			set: function(elem, value, extra) {
				var styles = extra && getStyles(elem);
				return setPositiveNumber(elem, value, extra ? augmentWidthOrHeight(elem, name, extra, support.boxSizing && jQuery.css(elem, "boxSizing", false, styles) === "border-box", styles) : 0)
			}
		}
	});
	if (!support.opacity) jQuery.cssHooks.opacity = {
		get: function(elem, computed) {
			return ropacity.test((computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : computed ? "1" : ""
		},
		set: function(elem, value) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric(value) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";
			style.zoom = 1;
			if ((value >= 1 || value === "") && jQuery.trim(filter.replace(ralpha, "")) === "" && style.removeAttribute) {
				style.removeAttribute("filter");
				if (value === "" || currentStyle && !currentStyle.filter) return
			}
			style.filter = ralpha.test(filter) ? filter.replace(ralpha, opacity) : filter + " " + opacity
		}
	};
	jQuery.cssHooks.marginRight = addGetHookIf(support.reliableMarginRight, function(elem, computed) {
		if (computed) return jQuery.swap(elem, {
			"display": "inline-block"
		}, curCSS, [elem, "marginRight"])
	});
	jQuery.each({
		margin: "",
		padding: "",
		border: "Width"
	}, function(prefix, suffix) {
		jQuery.cssHooks[prefix + suffix] = {
			expand: function(value) {
				var i = 0,
					expanded = {},
					parts = typeof value === "string" ? value.split(" ") : [value];
				for (; i < 4; i++) expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
				return expanded
			}
		};
		if (!rmargin.test(prefix)) jQuery.cssHooks[prefix + suffix].set = setPositiveNumber
	});
	jQuery.fn.extend({
		css: function(name, value) {
			return access(this, function(elem, name, value) {
				var styles, len, map = {},
					i = 0;
				if (jQuery.isArray(name)) {
					styles = getStyles(elem);
					len = name.length;
					for (; i < len; i++) map[name[i]] = jQuery.css(elem, name[i], false, styles);
					return map
				}
				return value !== undefined ? jQuery.style(elem, name, value) : jQuery.css(elem, name)
			}, name, value, arguments.length > 1)
		},
		show: function() {
			return showHide(this, true)
		},
		hide: function() {
			return showHide(this)
		},
		toggle: function(state) {
			if (typeof state === "boolean") return state ? this.show() : this.hide();
			return this.each(function() {
				if (isHidden(this)) jQuery(this).show();
				else jQuery(this).hide()
			})
		}
	});

	function Tween(elem, options, prop, end, easing) {
		return new Tween.prototype.init(elem, options, prop, end, easing)
	}
	jQuery.Tween = Tween;
	Tween.prototype = {
		constructor: Tween,
		init: function(elem, options, prop, end, easing, unit) {
			this.elem = elem;
			this.prop = prop;
			this.easing = easing || "swing";
			this.options = options;
			this.start = this.now = this.cur();
			this.end = end;
			this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px")
		},
		cur: function() {
			var hooks = Tween.propHooks[this.prop];
			return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this)
		},
		run: function(percent) {
			var eased, hooks = Tween.propHooks[this.prop];
			if (this.options.duration) this.pos = eased = jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration);
			else this.pos = eased = percent;
			this.now = (this.end - this.start) * eased + this.start;
			if (this.options.step) this.options.step.call(this.elem, this.now, this);
			if (hooks && hooks.set) hooks.set(this);
			else Tween.propHooks._default.set(this);
			return this
		}
	};
	Tween.prototype.init.prototype = Tween.prototype;
	Tween.propHooks = {
		_default: {
			get: function(tween) {
				var result;
				if (tween.elem[tween.prop] != null && (!tween.elem.style || tween.elem.style[tween.prop] == null)) return tween.elem[tween.prop];
				result = jQuery.css(tween.elem, tween.prop, "");
				return !result || result === "auto" ? 0 : result
			},
			set: function(tween) {
				if (jQuery.fx.step[tween.prop]) jQuery.fx.step[tween.prop](tween);
				else if (tween.elem.style && (tween.elem.style[jQuery.cssProps[tween.prop]] != null || jQuery.cssHooks[tween.prop])) jQuery.style(tween.elem, tween.prop, tween.now + tween.unit);
				else tween.elem[tween.prop] = tween.now
			}
		}
	};
	Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
		set: function(tween) {
			if (tween.elem.nodeType && tween.elem.parentNode) tween.elem[tween.prop] = tween.now
		}
	};
	jQuery.easing = {
		linear: function(p) {
			return p
		},
		swing: function(p) {
			return .5 - Math.cos(p * Math.PI) / 2
		}
	};
	jQuery.fx = Tween.prototype.init;
	jQuery.fx.step = {};
	var fxNow, timerId, rfxtypes = /^(?:toggle|show|hide)$/,
		rfxnum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i"),
		rrun = /queueHooks$/,
		animationPrefilters = [defaultPrefilter],
		tweeners = {
			"*": [function(prop, value) {
				var tween = this.createTween(prop, value),
					target = tween.cur(),
					parts = rfxnum.exec(value),
					unit = parts && parts[3] || (jQuery.cssNumber[prop] ? "" : "px"),
					start = (jQuery.cssNumber[prop] || unit !== "px" && +target) && rfxnum.exec(jQuery.css(tween.elem, prop)),
					scale = 1,
					maxIterations = 20;
				if (start && start[3] !== unit) {
					unit = unit || start[3];
					parts = parts || [];
					start = +target || 1;
					do {
						scale = scale || ".5";
						start = start / scale;
						jQuery.style(tween.elem, prop, start + unit)
					} while (scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations)
				}
				if (parts) {
					start = tween.start = +start || +target || 0;
					tween.unit = unit;
					tween.end = parts[1] ? start + (parts[1] + 1) * parts[2] : +parts[2]
				}
				return tween
			}]
		};

	function createFxNow() {
		setTimeout(function() {
			fxNow = undefined
		});
		return fxNow = jQuery.now()
	}
	function genFx(type, includeWidth) {
		var which, attrs = {
			height: type
		},
			i = 0;
		includeWidth = includeWidth ? 1 : 0;
		for (; i < 4; i += 2 - includeWidth) {
			which = cssExpand[i];
			attrs["margin" + which] = attrs["padding" + which] = type
		}
		if (includeWidth) attrs.opacity = attrs.width = type;
		return attrs
	}
	function createTween(value, prop, animation) {
		var tween, collection = (tweeners[prop] || []).concat(tweeners["*"]),
			index = 0,
			length = collection.length;
		for (; index < length; index++) if (tween = collection[index].call(animation, prop, value)) return tween
	}
	function defaultPrefilter(elem, props, opts) {
		var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay, anim = this,
			orig = {},
			style = elem.style,
			hidden = elem.nodeType && isHidden(elem),
			dataShow = jQuery._data(elem, "fxshow");
		if (!opts.queue) {
			hooks = jQuery._queueHooks(elem, "fx");
			if (hooks.unqueued == null) {
				hooks.unqueued = 0;
				oldfire = hooks.empty.fire;
				hooks.empty.fire = function() {
					if (!hooks.unqueued) oldfire()
				}
			}
			hooks.unqueued++;
			anim.always(function() {
				anim.always(function() {
					hooks.unqueued--;
					if (!jQuery.queue(elem, "fx").length) hooks.empty.fire()
				})
			})
		}
		if (elem.nodeType === 1 && ("height" in props || "width" in props)) {
			opts.overflow = [style.overflow, style.overflowX, style.overflowY];
			display = jQuery.css(elem, "display");
			checkDisplay = display === "none" ? jQuery._data(elem, "olddisplay") || defaultDisplay(elem.nodeName) : display;
			if (checkDisplay === "inline" && jQuery.css(elem, "float") === "none") if (!support.inlineBlockNeedsLayout || defaultDisplay(elem.nodeName) === "inline") style.display = "inline-block";
			else style.zoom = 1
		}
		if (opts.overflow) {
			style.overflow = "hidden";
			if (!support.shrinkWrapBlocks()) anim.always(function() {
				style.overflow = opts.overflow[0];
				style.overflowX = opts.overflow[1];
				style.overflowY = opts.overflow[2]
			})
		}
		for (prop in props) {
			value = props[prop];
			if (rfxtypes.exec(value)) {
				delete props[prop];
				toggle = toggle || value === "toggle";
				if (value === (hidden ? "hide" : "show")) if (value === "show" && dataShow && dataShow[prop] !== undefined) hidden = true;
				else continue;
				orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop)
			} else display = undefined
		}
		if (!jQuery.isEmptyObject(orig)) {
			if (dataShow) {
				if ("hidden" in dataShow) hidden = dataShow.hidden
			} else dataShow = jQuery._data(elem, "fxshow", {});
			if (toggle) dataShow.hidden = !hidden;
			if (hidden) jQuery(elem).show();
			else anim.done(function() {
				jQuery(elem).hide()
			});
			anim.done(function() {
				var prop;
				jQuery._removeData(elem, "fxshow");
				for (prop in orig) jQuery.style(elem, prop, orig[prop])
			});
			for (prop in orig) {
				tween = createTween(hidden ? dataShow[prop] : 0, prop, anim);
				if (!(prop in dataShow)) {
					dataShow[prop] = tween.start;
					if (hidden) {
						tween.end = tween.start;
						tween.start = prop === "width" || prop === "height" ? 1 : 0
					}
				}
			}
		} else if ((display === "none" ? defaultDisplay(elem.nodeName) : display) === "inline") style.display = display
	}
	function propFilter(props, specialEasing) {
		var index, name, easing, value, hooks;
		for (index in props) {
			name = jQuery.camelCase(index);
			easing = specialEasing[name];
			value = props[index];
			if (jQuery.isArray(value)) {
				easing = value[1];
				value = props[index] = value[0]
			}
			if (index !== name) {
				props[name] = value;
				delete props[index]
			}
			hooks = jQuery.cssHooks[name];
			if (hooks && "expand" in hooks) {
				value = hooks.expand(value);
				delete props[name];
				for (index in value) if (!(index in props)) {
					props[index] = value[index];
					specialEasing[index] = easing
				}
			} else specialEasing[name] = easing
		}
	}
	function Animation(elem, properties, options) {
		var result, stopped, index = 0,
			length = animationPrefilters.length,
			deferred = jQuery.Deferred().always(function() {
				delete tick.elem
			}),
			tick = function() {
				if (stopped) return false;
				var currentTime = fxNow || createFxNow(),
					remaining = Math.max(0, animation.startTime + animation.duration - currentTime),
					temp = remaining / animation.duration || 0,
					percent = 1 - temp,
					index = 0,
					length = animation.tweens.length;
				for (; index < length; index++) animation.tweens[index].run(percent);
				deferred.notifyWith(elem, [animation, percent, remaining]);
				if (percent < 1 && length) return remaining;
				else {
					deferred.resolveWith(elem, [animation]);
					return false
				}
			},
			animation = deferred.promise({
				elem: elem,
				props: jQuery.extend({}, properties),
				opts: jQuery.extend(true, {
					specialEasing: {}
				}, options),
				originalProperties: properties,
				originalOptions: options,
				startTime: fxNow || createFxNow(),
				duration: options.duration,
				tweens: [],
				createTween: function(prop, end) {
					var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
					animation.tweens.push(tween);
					return tween
				},
				stop: function(gotoEnd) {
					var index = 0,
						length = gotoEnd ? animation.tweens.length : 0;
					if (stopped) return this;
					stopped = true;
					for (; index < length; index++) animation.tweens[index].run(1);
					if (gotoEnd) deferred.resolveWith(elem, [animation, gotoEnd]);
					else deferred.rejectWith(elem, [animation, gotoEnd]);
					return this
				}
			}),
			props = animation.props;
		propFilter(props, animation.opts.specialEasing);
		for (; index < length; index++) {
			result = animationPrefilters[index].call(animation, elem, props, animation.opts);
			if (result) return result
		}
		jQuery.map(props, createTween, animation);
		if (jQuery.isFunction(animation.opts.start)) animation.opts.start.call(elem, animation);
		jQuery.fx.timer(jQuery.extend(tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		}));
		return animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always)
	}
	jQuery.Animation = jQuery.extend(Animation, {
		tweener: function(props, callback) {
			if (jQuery.isFunction(props)) {
				callback = props;
				props = ["*"]
			} else props = props.split(" ");
			var prop, index = 0,
				length = props.length;
			for (; index < length; index++) {
				prop = props[index];
				tweeners[prop] = tweeners[prop] || [];
				tweeners[prop].unshift(callback)
			}
		},
		prefilter: function(callback, prepend) {
			if (prepend) animationPrefilters.unshift(callback);
			else animationPrefilters.push(callback)
		}
	});
	jQuery.speed = function(speed, easing, fn) {
		var opt = speed && typeof speed === "object" ? jQuery.extend({}, speed) : {
			complete: fn || !fn && easing || jQuery.isFunction(speed) && speed,
			duration: speed,
			easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
		};
		opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration : opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default;
		if (opt.queue == null || opt.queue === true) opt.queue = "fx";
		opt.old = opt.complete;
		opt.complete = function() {
			if (jQuery.isFunction(opt.old)) opt.old.call(this);
			if (opt.queue) jQuery.dequeue(this, opt.queue)
		};
		return opt
	};
	jQuery.fn.extend({
		fadeTo: function(speed, to, easing, callback) {
			return this.filter(isHidden).css("opacity", 0).show().end().animate({
				opacity: to
			}, speed, easing, callback)
		},
		animate: function(prop, speed, easing, callback) {
			var empty = jQuery.isEmptyObject(prop),
				optall = jQuery.speed(speed, easing, callback),
				doAnimation = function() {
					var anim = Animation(this, jQuery.extend({}, prop), optall);
					if (empty || jQuery._data(this, "finish")) anim.stop(true)
				};
			doAnimation.finish = doAnimation;
			return empty || optall.queue === false ? this.each(doAnimation) : this.queue(optall.queue, doAnimation)
		},
		stop: function(type, clearQueue, gotoEnd) {
			var stopQueue = function(hooks) {
					var stop = hooks.stop;
					delete hooks.stop;
					stop(gotoEnd)
				};
			if (typeof type !== "string") {
				gotoEnd = clearQueue;
				clearQueue = type;
				type = undefined
			}
			if (clearQueue && type !== false) this.queue(type || "fx", []);
			return this.each(function() {
				var dequeue = true,
					index = type != null && type + "queueHooks",
					timers = jQuery.timers,
					data = jQuery._data(this);
				if (index) {
					if (data[index] && data[index].stop) stopQueue(data[index])
				} else for (index in data) if (data[index] && data[index].stop && rrun.test(index)) stopQueue(data[index]);
				for (index = timers.length; index--;) if (timers[index].elem === this && (type == null || timers[index].queue === type)) {
					timers[index].anim.stop(gotoEnd);
					dequeue = false;
					timers.splice(index, 1)
				}
				if (dequeue || !gotoEnd) jQuery.dequeue(this, type)
			})
		},
		finish: function(type) {
			if (type !== false) type = type || "fx";
			return this.each(function() {
				var index, data = jQuery._data(this),
					queue = data[type + "queue"],
					hooks = data[type + "queueHooks"],
					timers = jQuery.timers,
					length = queue ? queue.length : 0;
				data.finish = true;
				jQuery.queue(this, type, []);
				if (hooks && hooks.stop) hooks.stop.call(this, true);
				for (index = timers.length; index--;) if (timers[index].elem === this && timers[index].queue === type) {
					timers[index].anim.stop(true);
					timers.splice(index, 1)
				}
				for (index = 0; index < length; index++) if (queue[index] && queue[index].finish) queue[index].finish.call(this);
				delete data.finish
			})
		}
	});
	jQuery.each(["toggle", "show", "hide"], function(i, name) {
		var cssFn = jQuery.fn[name];
		jQuery.fn[name] = function(speed, easing, callback) {
			return speed == null || typeof speed === "boolean" ? cssFn.apply(this, arguments) : this.animate(genFx(name, true), speed, easing, callback)
		}
	});
	jQuery.each({
		slideDown: genFx("show"),
		slideUp: genFx("hide"),
		slideToggle: genFx("toggle"),
		fadeIn: {
			opacity: "show"
		},
		fadeOut: {
			opacity: "hide"
		},
		fadeToggle: {
			opacity: "toggle"
		}
	}, function(name, props) {
		jQuery.fn[name] = function(speed, easing, callback) {
			return this.animate(props, speed, easing, callback)
		}
	});
	jQuery.timers = [];
	jQuery.fx.tick = function() {
		var timer, timers = jQuery.timers,
			i = 0;
		fxNow = jQuery.now();
		for (; i < timers.length; i++) {
			timer = timers[i];
			if (!timer() && timers[i] === timer) timers.splice(i--, 1)
		}
		if (!timers.length) jQuery.fx.stop();
		fxNow = undefined
	};
	jQuery.fx.timer = function(timer) {
		jQuery.timers.push(timer);
		if (timer()) jQuery.fx.start();
		else jQuery.timers.pop()
	};
	jQuery.fx.interval = 13;
	jQuery.fx.start = function() {
		if (!timerId) timerId = setInterval(jQuery.fx.tick, jQuery.fx.interval)
	};
	jQuery.fx.stop = function() {
		clearInterval(timerId);
		timerId = null
	};
	jQuery.fx.speeds = {
		slow: 600,
		fast: 200,
		_default: 400
	};
	jQuery.fn.delay = function(time, type) {
		time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
		type = type || "fx";
		return this.queue(type, function(next, hooks) {
			var timeout = setTimeout(next, time);
			hooks.stop = function() {
				clearTimeout(timeout)
			}
		})
	};
	(function() {
		var input, div, select, a, opt;
		div = document.createElement("div");
		div.setAttribute("className", "t");
		div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
		a = div.getElementsByTagName("a")[0];
		select = document.createElement("select");
		opt = select.appendChild(document.createElement("option"));
		input = div.getElementsByTagName("input")[0];
		a.style.cssText = "top:1px";
		support.getSetAttribute = div.className !== "t";
		support.style = /top/.test(a.getAttribute("style"));
		support.hrefNormalized = a.getAttribute("href") === "/a";
		support.checkOn = !! input.value;
		support.optSelected = opt.selected;
		support.enctype = !! document.createElement("form").enctype;
		select.disabled = true;
		support.optDisabled = !opt.disabled;
		input = document.createElement("input");
		input.setAttribute("value", "");
		support.input = input.getAttribute("value") === "";
		input.value = "t";
		input.setAttribute("type", "radio");
		support.radioValue = input.value === "t"
	})();
	var rreturn = /\r/g;
	jQuery.fn.extend({
		val: function(value) {
			var hooks, ret, isFunction, elem = this[0];
			if (!arguments.length) {
				if (elem) {
					hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()];
					if (hooks && "get" in hooks && (ret = hooks.get(elem, "value")) !== undefined) return ret;
					ret = elem.value;
					return typeof ret === "string" ? ret.replace(rreturn, "") : ret == null ? "" : ret
				}
				return
			}
			isFunction = jQuery.isFunction(value);
			return this.each(function(i) {
				var val;
				if (this.nodeType !== 1) return;
				if (isFunction) val = value.call(this, i, jQuery(this).val());
				else val = value;
				if (val == null) val = "";
				else if (typeof val === "number") val += "";
				else if (jQuery.isArray(val)) val = jQuery.map(val, function(value) {
					return value == null ? "" : value + ""
				});
				hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];
				if (!hooks || !("set" in hooks) || hooks.set(this, val, "value") === undefined) this.value = val
			})
		}
	});
	jQuery.extend({
		valHooks: {
			option: {
				get: function(elem) {
					var val = jQuery.find.attr(elem, "value");
					return val != null ? val : jQuery.trim(jQuery.text(elem))
				}
			},
			select: {
				get: function(elem) {
					var value, option, options = elem.options,
						index = elem.selectedIndex,
						one = elem.type === "select-one" || index < 0,
						values = one ? null : [],
						max = one ? index + 1 : options.length,
						i = index < 0 ? max : one ? index : 0;
					for (; i < max; i++) {
						option = options[i];
						if ((option.selected || i === index) && (support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null) && (!option.parentNode.disabled || !jQuery.nodeName(option.parentNode, "optgroup"))) {
							value = jQuery(option).val();
							if (one) return value;
							values.push(value)
						}
					}
					return values
				},
				set: function(elem, value) {
					var optionSet, option, options = elem.options,
						values = jQuery.makeArray(value),
						i = options.length;
					while (i--) {
						option = options[i];
						if (jQuery.inArray(jQuery.valHooks.option.get(option), values) >= 0) try {
							option.selected = optionSet = true
						} catch (_) {
							option.scrollHeight
						} else option.selected = false
					}
					if (!optionSet) elem.selectedIndex = -1;
					return options
				}
			}
		}
	});
	jQuery.each(["radio", "checkbox"], function() {
		jQuery.valHooks[this] = {
			set: function(elem, value) {
				if (jQuery.isArray(value)) return elem.checked = jQuery.inArray(jQuery(elem).val(), value) >= 0
			}
		};
		if (!support.checkOn) jQuery.valHooks[this].get = function(elem) {
			return elem.getAttribute("value") === null ? "on" : elem.value
		}
	});
	var nodeHook, boolHook, attrHandle = jQuery.expr.attrHandle,
		ruseDefault = /^(?:checked|selected)$/i,
		getSetAttribute = support.getSetAttribute,
		getSetInput = support.input;
	jQuery.fn.extend({
		attr: function(name, value) {
			return access(this, jQuery.attr, name, value, arguments.length > 1)
		},
		removeAttr: function(name) {
			return this.each(function() {
				jQuery.removeAttr(this, name)
			})
		}
	});
	jQuery.extend({
		attr: function(elem, name, value) {
			var hooks, ret, nType = elem.nodeType;
			if (!elem || nType === 3 || nType === 8 || nType === 2) return;
			if (typeof elem.getAttribute === strundefined) return jQuery.prop(elem, name, value);
			if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
				name = name.toLowerCase();
				hooks = jQuery.attrHooks[name] || (jQuery.expr.match.bool.test(name) ? boolHook : nodeHook)
			}
			if (value !== undefined) if (value === null) jQuery.removeAttr(elem, name);
			else if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) return ret;
			else {
				elem.setAttribute(name, value + "");
				return value
			} else if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) return ret;
			else {
				ret = jQuery.find.attr(elem, name);
				return ret == null ? undefined : ret
			}
		},
		removeAttr: function(elem, value) {
			var name, propName, i = 0,
				attrNames = value && value.match(rnotwhite);
			if (attrNames && elem.nodeType === 1) while (name = attrNames[i++]) {
				propName = jQuery.propFix[name] || name;
				if (jQuery.expr.match.bool.test(name)) if (getSetInput && getSetAttribute || !ruseDefault.test(name)) elem[propName] = false;
				else elem[jQuery.camelCase("default-" + name)] = elem[propName] = false;
				else jQuery.attr(elem, name, "");
				elem.removeAttribute(getSetAttribute ? name : propName)
			}
		},
		attrHooks: {
			type: {
				set: function(elem, value) {
					if (!support.radioValue && value === "radio" && jQuery.nodeName(elem, "input")) {
						var val = elem.value;
						elem.setAttribute("type", value);
						if (val) elem.value = val;
						return value
					}
				}
			}
		}
	});
	boolHook = {
		set: function(elem, value, name) {
			if (value === false) jQuery.removeAttr(elem, name);
			else if (getSetInput && getSetAttribute || !ruseDefault.test(name)) elem.setAttribute(!getSetAttribute && jQuery.propFix[name] || name, name);
			else elem[jQuery.camelCase("default-" + name)] = elem[name] = true;
			return name
		}
	};
	jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function(i, name) {
		var getter = attrHandle[name] || jQuery.find.attr;
		attrHandle[name] = getSetInput && getSetAttribute || !ruseDefault.test(name) ?
		function(elem, name, isXML) {
			var ret, handle;
			if (!isXML) {
				handle = attrHandle[name];
				attrHandle[name] = ret;
				ret = getter(elem, name, isXML) != null ? name.toLowerCase() : null;
				attrHandle[name] = handle
			}
			return ret
		} : function(elem, name, isXML) {
			if (!isXML) return elem[jQuery.camelCase("default-" + name)] ? name.toLowerCase() : null
		}
	});
	if (!getSetInput || !getSetAttribute) jQuery.attrHooks.value = {
		set: function(elem, value, name) {
			if (jQuery.nodeName(elem, "input")) elem.defaultValue = value;
			else return nodeHook && nodeHook.set(elem, value, name)
		}
	};
	if (!getSetAttribute) {
		nodeHook = {
			set: function(elem, value, name) {
				var ret = elem.getAttributeNode(name);
				if (!ret) elem.setAttributeNode(ret = elem.ownerDocument.createAttribute(name));
				ret.value = value += "";
				if (name === "value" || value === elem.getAttribute(name)) return value
			}
		};
		attrHandle.id = attrHandle.name = attrHandle.coords = function(elem, name, isXML) {
			var ret;
			if (!isXML) return (ret = elem.getAttributeNode(name)) && ret.value !== "" ? ret.value : null
		};
		jQuery.valHooks.button = {
			get: function(elem, name) {
				var ret = elem.getAttributeNode(name);
				if (ret && ret.specified) return ret.value
			},
			set: nodeHook.set
		};
		jQuery.attrHooks.contenteditable = {
			set: function(elem, value, name) {
				nodeHook.set(elem, value === "" ? false : value, name)
			}
		};
		jQuery.each(["width", "height"], function(i, name) {
			jQuery.attrHooks[name] = {
				set: function(elem, value) {
					if (value === "") {
						elem.setAttribute(name, "auto");
						return value
					}
				}
			}
		})
	}
	if (!support.style) jQuery.attrHooks.style = {
		get: function(elem) {
			return elem.style.cssText || undefined
		},
		set: function(elem, value) {
			return elem.style.cssText = value + ""
		}
	};
	var rfocusable = /^(?:input|select|textarea|button|object)$/i,
		rclickable = /^(?:a|area)$/i;
	jQuery.fn.extend({
		prop: function(name, value) {
			return access(this, jQuery.prop, name, value, arguments.length > 1)
		},
		removeProp: function(name) {
			name = jQuery.propFix[name] || name;
			return this.each(function() {
				try {
					this[name] = undefined;
					delete this[name]
				} catch (e) {}
			})
		}
	});
	jQuery.extend({
		propFix: {
			"for": "htmlFor",
			"class": "className"
		},
		prop: function(elem, name, value) {
			var ret, hooks, notxml, nType = elem.nodeType;
			if (!elem || nType === 3 || nType === 8 || nType === 2) return;
			notxml = nType !== 1 || !jQuery.isXMLDoc(elem);
			if (notxml) {
				name = jQuery.propFix[name] || name;
				hooks = jQuery.propHooks[name]
			}
			if (value !== undefined) return hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined ? ret : elem[name] = value;
			else return hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null ? ret : elem[name]
		},
		propHooks: {
			tabIndex: {
				get: function(elem) {
					var tabindex = jQuery.find.attr(elem, "tabindex");
					return tabindex ? parseInt(tabindex, 10) : rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href ? 0 : -1
				}
			}
		}
	});
	if (!support.hrefNormalized) jQuery.each(["href", "src"], function(i, name) {
		jQuery.propHooks[name] = {
			get: function(elem) {
				return elem.getAttribute(name, 4)
			}
		}
	});
	if (!support.optSelected) jQuery.propHooks.selected = {
		get: function(elem) {
			var parent = elem.parentNode;
			if (parent) {
				parent.selectedIndex;
				if (parent.parentNode) parent.parentNode.selectedIndex
			}
			return null
		}
	};
	jQuery.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
		jQuery.propFix[this.toLowerCase()] = this
	});
	if (!support.enctype) jQuery.propFix.enctype = "encoding";
	var rclass = /[\t\r\n\f]/g;
	jQuery.fn.extend({
		addClass: function(value) {
			var classes, elem, cur, clazz, j, finalValue, i = 0,
				len = this.length,
				proceed = typeof value === "string" && value;
			if (jQuery.isFunction(value)) return this.each(function(j) {
				jQuery(this).addClass(value.call(this, j, this.className))
			});
			if (proceed) {
				classes = (value || "").match(rnotwhite) || [];
				for (; i < len; i++) {
					elem = this[i];
					cur = elem.nodeType === 1 && (elem.className ? (" " + elem.className + " ").replace(rclass, " ") : " ");
					if (cur) {
						j = 0;
						while (clazz = classes[j++]) if (cur.indexOf(" " + clazz + " ") < 0) cur += clazz + " ";
						finalValue = jQuery.trim(cur);
						if (elem.className !== finalValue) elem.className = finalValue
					}
				}
			}
			return this
		},
		removeClass: function(value) {
			var classes, elem, cur, clazz, j, finalValue, i = 0,
				len = this.length,
				proceed = arguments.length === 0 || typeof value === "string" && value;
			if (jQuery.isFunction(value)) return this.each(function(j) {
				jQuery(this).removeClass(value.call(this, j, this.className))
			});
			if (proceed) {
				classes = (value || "").match(rnotwhite) || [];
				for (; i < len; i++) {
					elem = this[i];
					cur = elem.nodeType === 1 && (elem.className ? (" " + elem.className + " ").replace(rclass, " ") : "");
					if (cur) {
						j = 0;
						while (clazz = classes[j++]) while (cur.indexOf(" " + clazz + " ") >= 0) cur = cur.replace(" " + clazz + " ", " ");
						finalValue = value ? jQuery.trim(cur) : "";
						if (elem.className !== finalValue) elem.className = finalValue
					}
				}
			}
			return this
		},
		toggleClass: function(value, stateVal) {
			var type = typeof value;
			if (typeof stateVal === "boolean" && type === "string") return stateVal ? this.addClass(value) : this.removeClass(value);
			if (jQuery.isFunction(value)) return this.each(function(i) {
				jQuery(this).toggleClass(value.call(this, i, this.className, stateVal), stateVal)
			});
			return this.each(function() {
				if (type === "string") {
					var className, i = 0,
						self = jQuery(this),
						classNames = value.match(rnotwhite) || [];
					while (className = classNames[i++]) if (self.hasClass(className)) self.removeClass(className);
					else self.addClass(className)
				} else if (type === strundefined || type === "boolean") {
					if (this.className) jQuery._data(this, "__className__", this.className);
					this.className = this.className || value === false ? "" : jQuery._data(this, "__className__") || ""
				}
			})
		},
		hasClass: function(selector) {
			var className = " " + selector + " ",
				i = 0,
				l = this.length;
			for (; i < l; i++) if (this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf(className) >= 0) return true;
			return false
		}
	});
	jQuery.each(("blur focus focusin focusout load resize scroll unload click dblclick " + "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " + "change select submit keydown keypress keyup error contextmenu").split(" "), function(i, name) {
		jQuery.fn[name] = function(data, fn) {
			return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name)
		}
	});
	jQuery.fn.extend({
		hover: function(fnOver, fnOut) {
			return this.mouseenter(fnOver).mouseleave(fnOut || fnOver)
		},
		bind: function(types, data, fn) {
			return this.on(types, null, data, fn)
		},
		unbind: function(types, fn) {
			return this.off(types, null, fn)
		},
		delegate: function(selector, types, data, fn) {
			return this.on(types, selector, data, fn)
		},
		undelegate: function(selector, types, fn) {
			return arguments.length === 1 ? this.off(selector, "**") : this.off(types, selector || "**", fn)
		}
	});
	var nonce = jQuery.now();
	var rquery = /\?/;
	var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
	jQuery.parseJSON = function(data) {
		if (window.JSON && window.JSON.parse) return window.JSON.parse(data + "");
		var requireNonComma, depth = null,
			str = jQuery.trim(data + "");
		return str && !jQuery.trim(str.replace(rvalidtokens, function(token, comma, open, close) {
			if (requireNonComma && comma) depth = 0;
			if (depth === 0) return token;
			requireNonComma = open || comma;
			depth += !close - !open;
			return ""
		})) ? Function("return " + str)() : jQuery.error("Invalid JSON: " + data)
	};
	jQuery.parseXML = function(data) {
		var xml, tmp;
		if (!data || typeof data !== "string") return null;
		try {
			if (window.DOMParser) {
				tmp = new DOMParser;
				xml = tmp.parseFromString(data, "text/xml")
			} else {
				xml = new ActiveXObject("Microsoft.XMLDOM");
				xml.async = "false";
				xml.loadXML(data)
			}
		} catch (e) {
			xml = undefined
		}
		if (!xml || !xml.documentElement || xml.getElementsByTagName("parsererror").length) jQuery.error("Invalid XML: " + data);
		return xml
	};
	var ajaxLocParts, ajaxLocation, rhash = /#.*$/,
		rts = /([?&])_=[^&]*/,
		rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,
		rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
		rnoContent = /^(?:GET|HEAD)$/,
		rprotocol = /^\/\//,
		rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
		prefilters = {},
		transports = {},
		allTypes = "*/".concat("*");
	try {
		ajaxLocation = location.href
	} catch (e) {
		ajaxLocation = document.createElement("a");
		ajaxLocation.href = "";
		ajaxLocation = ajaxLocation.href
	}
	ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || [];

	function addToPrefiltersOrTransports(structure) {
		return function(dataTypeExpression, func) {
			if (typeof dataTypeExpression !== "string") {
				func = dataTypeExpression;
				dataTypeExpression = "*"
			}
			var dataType, i = 0,
				dataTypes = dataTypeExpression.toLowerCase().match(rnotwhite) || [];
			if (jQuery.isFunction(func)) while (dataType = dataTypes[i++]) if (dataType.charAt(0) === "+") {
				dataType = dataType.slice(1) || "*";
				(structure[dataType] = structure[dataType] || []).unshift(func)
			} else(structure[dataType] = structure[dataType] || []).push(func)
		}
	}
	function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {
		var inspected = {},
			seekingTransport = structure === transports;

		function inspect(dataType) {
			var selected;
			inspected[dataType] = true;
			jQuery.each(structure[dataType] || [], function(_, prefilterOrFactory) {
				var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
				if (typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[dataTypeOrTransport]) {
					options.dataTypes.unshift(dataTypeOrTransport);
					inspect(dataTypeOrTransport);
					return false
				} else if (seekingTransport) return !(selected = dataTypeOrTransport)
			});
			return selected
		}
		return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*")
	}
	function ajaxExtend(target, src) {
		var deep, key, flatOptions = jQuery.ajaxSettings.flatOptions || {};
		for (key in src) if (src[key] !== undefined)(flatOptions[key] ? target : deep || (deep = {}))[key] = src[key];
		if (deep) jQuery.extend(true, target, deep);
		return target
	}
	function ajaxHandleResponses(s, jqXHR, responses) {
		var firstDataType, ct, finalDataType, type, contents = s.contents,
			dataTypes = s.dataTypes;
		while (dataTypes[0] === "*") {
			dataTypes.shift();
			if (ct === undefined) ct = s.mimeType || jqXHR.getResponseHeader("Content-Type")
		}
		if (ct) for (type in contents) if (contents[type] && contents[type].test(ct)) {
			dataTypes.unshift(type);
			break
		}
		if (dataTypes[0] in responses) finalDataType = dataTypes[0];
		else {
			for (type in responses) {
				if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
					finalDataType = type;
					break
				}
				if (!firstDataType) firstDataType = type
			}
			finalDataType = finalDataType || firstDataType
		}
		if (finalDataType) {
			if (finalDataType !== dataTypes[0]) dataTypes.unshift(finalDataType);
			return responses[finalDataType]
		}
	}
	function ajaxConvert(s, response, jqXHR, isSuccess) {
		var conv2, current, conv, tmp, prev, converters = {},
			dataTypes = s.dataTypes.slice();
		if (dataTypes[1]) for (conv in s.converters) converters[conv.toLowerCase()] = s.converters[conv];
		current = dataTypes.shift();
		while (current) {
			if (s.responseFields[current]) jqXHR[s.responseFields[current]] = response;
			if (!prev && isSuccess && s.dataFilter) response = s.dataFilter(response, s.dataType);
			prev = current;
			current = dataTypes.shift();
			if (current) if (current === "*") current = prev;
			else if (prev !== "*" && prev !== current) {
				conv = converters[prev + " " + current] || converters["* " + current];
				if (!conv) for (conv2 in converters) {
					tmp = conv2.split(" ");
					if (tmp[1] === current) {
						conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]];
						if (conv) {
							if (conv === true) conv = converters[conv2];
							else if (converters[conv2] !== true) {
								current = tmp[0];
								dataTypes.unshift(tmp[1])
							}
							break
						}
					}
				}
				if (conv !== true) if (conv && s["throws"]) response = conv(response);
				else try {
					response = conv(response)
				} catch (e) {
					return {
						state: "parsererror",
						error: conv ? e : "No conversion from " + prev + " to " + current
					}
				}
			}
		}
		return {
			state: "success",
			data: response
		}
	}
	jQuery.extend({
		active: 0,
		lastModified: {},
		etag: {},
		ajaxSettings: {
			url: ajaxLocation,
			type: "GET",
			isLocal: rlocalProtocol.test(ajaxLocParts[1]),
			global: true,
			processData: true,
			async: true,
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			accepts: {
				"*": allTypes,
				text: "text/plain",
				html: "text/html",
				xml: "application/xml, text/xml",
				json: "application/json, text/javascript"
			},
			contents: {
				xml: /xml/,
				html: /html/,
				json: /json/
			},
			responseFields: {
				xml: "responseXML",
				text: "responseText",
				json: "responseJSON"
			},
			converters: {
				"* text": String,
				"text html": true,
				"text json": jQuery.parseJSON,
				"text xml": jQuery.parseXML
			},
			flatOptions: {
				url: true,
				context: true
			}
		},
		ajaxSetup: function(target, settings) {
			return settings ? ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) : ajaxExtend(jQuery.ajaxSettings, target)
		},
		ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
		ajaxTransport: addToPrefiltersOrTransports(transports),
		ajax: function(url, options) {
			if (typeof url === "object") {
				options = url;
				url = undefined
			}
			options = options || {};
			var parts, i, cacheURL, responseHeadersString, timeoutTimer, fireGlobals, transport, responseHeaders, s = jQuery.ajaxSetup({}, options),
				callbackContext = s.context || s,
				globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery(callbackContext) : jQuery.event,
				deferred = jQuery.Deferred(),
				completeDeferred = jQuery.Callbacks("once memory"),
				statusCode = s.statusCode || {},
				requestHeaders = {},
				requestHeadersNames = {},
				state = 0,
				strAbort = "canceled",
				jqXHR = {
					readyState: 0,
					getResponseHeader: function(key) {
						var match;
						if (state === 2) {
							if (!responseHeaders) {
								responseHeaders = {};
								while (match = rheaders.exec(responseHeadersString)) responseHeaders[match[1].toLowerCase()] = match[2]
							}
							match = responseHeaders[key.toLowerCase()]
						}
						return match == null ? null : match
					},
					getAllResponseHeaders: function() {
						return state === 2 ? responseHeadersString : null
					},
					setRequestHeader: function(name, value) {
						var lname = name.toLowerCase();
						if (!state) {
							name = requestHeadersNames[lname] = requestHeadersNames[lname] || name;
							requestHeaders[name] = value
						}
						return this
					},
					overrideMimeType: function(type) {
						if (!state) s.mimeType = type;
						return this
					},
					statusCode: function(map) {
						var code;
						if (map) if (state < 2) for (code in map) statusCode[code] = [statusCode[code], map[code]];
						else jqXHR.always(map[jqXHR.status]);
						return this
					},
					abort: function(statusText) {
						var finalText = statusText || strAbort;
						if (transport) transport.abort(finalText);
						done(0, finalText);
						return this
					}
				};
			deferred.promise(jqXHR).complete = completeDeferred.add;
			jqXHR.success = jqXHR.done;
			jqXHR.error = jqXHR.fail;
			s.url = ((url || s.url || ajaxLocation) + "").replace(rhash, "").replace(rprotocol, ajaxLocParts[1] + "//");
			s.type = options.method || options.type || s.method || s.type;
			s.dataTypes = jQuery.trim(s.dataType || "*").toLowerCase().match(rnotwhite) || [""];
			if (s.crossDomain == null) {
				parts = rurl.exec(s.url.toLowerCase());
				s.crossDomain = !! (parts && (parts[1] !== ajaxLocParts[1] || parts[2] !== ajaxLocParts[2] || (parts[3] || (parts[1] === "http:" ? "80" : "443")) !== (ajaxLocParts[3] || (ajaxLocParts[1] === "http:" ? "80" : "443"))))
			}
			if (s.data && s.processData && typeof s.data !== "string") s.data = jQuery.param(s.data, s.traditional);
			inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);
			if (state === 2) return jqXHR;
			fireGlobals = s.global;
			if (fireGlobals && jQuery.active++ === 0) jQuery.event.trigger("ajaxStart");
			s.type = s.type.toUpperCase();
			s.hasContent = !rnoContent.test(s.type);
			cacheURL = s.url;
			if (!s.hasContent) {
				if (s.data) {
					cacheURL = s.url += (rquery.test(cacheURL) ? "&" : "?") + s.data;
					delete s.data
				}
				if (s.cache === false) s.url = rts.test(cacheURL) ? cacheURL.replace(rts, "$1_=" + nonce++) : cacheURL + (rquery.test(cacheURL) ? "&" : "?") + "_=" + nonce++
			}
			if (s.ifModified) {
				if (jQuery.lastModified[cacheURL]) jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]);
				if (jQuery.etag[cacheURL]) jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL])
			}
			if (s.data && s.hasContent && s.contentType !== false || options.contentType) jqXHR.setRequestHeader("Content-Type", s.contentType);
			jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + (s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]);
			for (i in s.headers) jqXHR.setRequestHeader(i, s.headers[i]);
			if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === false || state === 2)) return jqXHR.abort();
			strAbort = "abort";
			for (i in {
				success: 1,
				error: 1,
				complete: 1
			}) jqXHR[i](s[i]);
			transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);
			if (!transport) done(-1, "No Transport");
			else {
				jqXHR.readyState = 1;
				if (fireGlobals) globalEventContext.trigger("ajaxSend", [jqXHR, s]);
				if (s.async && s.timeout > 0) timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout")
				}, s.timeout);
				try {
					state = 1;
					transport.send(requestHeaders, done)
				} catch (e) {
					if (state < 2) done(-1, e);
					else throw e;
				}
			}
			function done(status, nativeStatusText, responses, headers) {
				var isSuccess, success, error, response, modified, statusText = nativeStatusText;
				if (state === 2) return;
				state = 2;
				if (timeoutTimer) clearTimeout(timeoutTimer);
				transport = undefined;
				responseHeadersString = headers || "";
				jqXHR.readyState = status > 0 ? 4 : 0;
				isSuccess = status >= 200 && status < 300 || status === 304;
				if (responses) response = ajaxHandleResponses(s, jqXHR, responses);
				response = ajaxConvert(s, response, jqXHR, isSuccess);
				if (isSuccess) {
					if (s.ifModified) {
						modified = jqXHR.getResponseHeader("Last-Modified");
						if (modified) jQuery.lastModified[cacheURL] = modified;
						modified = jqXHR.getResponseHeader("etag");
						if (modified) jQuery.etag[cacheURL] = modified
					}
					if (status === 204 || s.type === "HEAD") statusText = "nocontent";
					else if (status === 304) statusText = "notmodified";
					else {
						statusText = response.state;
						success = response.data;
						error = response.error;
						isSuccess = !error
					}
				} else {
					error = statusText;
					if (status || !statusText) {
						statusText = "error";
						if (status < 0) status = 0
					}
				}
				jqXHR.status = status;
				jqXHR.statusText = (nativeStatusText || statusText) + "";
				if (isSuccess) deferred.resolveWith(callbackContext, [success, statusText, jqXHR]);
				else deferred.rejectWith(callbackContext, [jqXHR, statusText, error]);
				jqXHR.statusCode(statusCode);
				statusCode = undefined;
				if (fireGlobals) globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [jqXHR, s, isSuccess ? success : error]);
				completeDeferred.fireWith(callbackContext, [jqXHR, statusText]);
				if (fireGlobals) {
					globalEventContext.trigger("ajaxComplete", [jqXHR, s]);
					if (!--jQuery.active) jQuery.event.trigger("ajaxStop")
				}
			}
			return jqXHR
		},
		getJSON: function(url, data, callback) {
			return jQuery.get(url, data, callback, "json")
		},
		getScript: function(url, callback) {
			return jQuery.get(url, undefined, callback, "script")
		}
	});
	jQuery.each(["get", "post"], function(i, method) {
		jQuery[method] = function(url, data, callback, type) {
			if (jQuery.isFunction(data)) {
				type = type || callback;
				callback = data;
				data = undefined
			}
			return jQuery.ajax({
				url: url,
				type: method,
				dataType: type,
				data: data,
				success: callback
			})
		}
	});
	jQuery.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(i, type) {
		jQuery.fn[type] = function(fn) {
			return this.on(type, fn)
		}
	});
	jQuery._evalUrl = function(url) {
		return jQuery.ajax({
			url: url,
			type: "GET",
			dataType: "script",
			async: false,
			global: false,
			"throws": true
		})
	};
	jQuery.fn.extend({
		wrapAll: function(html) {
			if (jQuery.isFunction(html)) return this.each(function(i) {
				jQuery(this).wrapAll(html.call(this, i))
			});
			if (this[0]) {
				var wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);
				if (this[0].parentNode) wrap.insertBefore(this[0]);
				wrap.map(function() {
					var elem = this;
					while (elem.firstChild && elem.firstChild.nodeType === 1) elem = elem.firstChild;
					return elem
				}).append(this)
			}
			return this
		},
		wrapInner: function(html) {
			if (jQuery.isFunction(html)) return this.each(function(i) {
				jQuery(this).wrapInner(html.call(this, i))
			});
			return this.each(function() {
				var self = jQuery(this),
					contents = self.contents();
				if (contents.length) contents.wrapAll(html);
				else self.append(html)
			})
		},
		wrap: function(html) {
			var isFunction = jQuery.isFunction(html);
			return this.each(function(i) {
				jQuery(this).wrapAll(isFunction ? html.call(this, i) : html)
			})
		},
		unwrap: function() {
			return this.parent().each(function() {
				if (!jQuery.nodeName(this, "body")) jQuery(this).replaceWith(this.childNodes)
			}).end()
		}
	});
	jQuery.expr.filters.hidden = function(elem) {
		return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 || !support.reliableHiddenOffsets() && (elem.style && elem.style.display || jQuery.css(elem, "display")) === "none"
	};
	jQuery.expr.filters.visible = function(elem) {
		return !jQuery.expr.filters.hidden(elem)
	};
	var r20 = /%20/g,
		rbracket = /\[\]$/,
		rCRLF = /\r?\n/g,
		rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
		rsubmittable = /^(?:input|select|textarea|keygen)/i;

	function buildParams(prefix, obj, traditional, add) {
		var name;
		if (jQuery.isArray(obj)) jQuery.each(obj, function(i, v) {
			if (traditional || rbracket.test(prefix)) add(prefix, v);
			else buildParams(prefix + "[" + (typeof v === "object" ? i : "") + "]", v, traditional, add)
		});
		else if (!traditional && jQuery.type(obj) === "object") for (name in obj) buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
		else add(prefix, obj)
	}
	jQuery.param = function(a, traditional) {
		var prefix, s = [],
			add = function(key, value) {
				value = jQuery.isFunction(value) ? value() : value == null ? "" : value;
				s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value)
			};
		if (traditional === undefined) traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
		if (jQuery.isArray(a) || a.jquery && !jQuery.isPlainObject(a)) jQuery.each(a, function() {
			add(this.name, this.value)
		});
		else for (prefix in a) buildParams(prefix, a[prefix], traditional, add);
		return s.join("&").replace(r20, "+")
	};
	jQuery.fn.extend({
		serialize: function() {
			return jQuery.param(this.serializeArray())
		},
		serializeArray: function() {
			return this.map(function() {
				var elements = jQuery.prop(this, "elements");
				return elements ? jQuery.makeArray(elements) : this
			}).filter(function() {
				var type = this.type;
				return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !rcheckableType.test(type))
			}).map(function(i, elem) {
				var val = jQuery(this).val();
				return val == null ? null : jQuery.isArray(val) ? jQuery.map(val, function(val) {
					return {
						name: elem.name,
						value: val.replace(rCRLF, "\r\n")
					}
				}) : {
					name: elem.name,
					value: val.replace(rCRLF, "\r\n")
				}
			}).get()
		}
	});
	jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?
	function() {
		return !this.isLocal && /^(get|post|head|put|delete|options)$/i.test(this.type) && createStandardXHR() || createActiveXHR()
	} : createStandardXHR;
	var xhrId = 0,
		xhrCallbacks = {},
		xhrSupported = jQuery.ajaxSettings.xhr();
	if (window.ActiveXObject) jQuery(window).on("unload", function() {
		for (var key in xhrCallbacks) xhrCallbacks[key](undefined, true)
	});
	support.cors = !! xhrSupported && "withCredentials" in xhrSupported;
	xhrSupported = support.ajax = !! xhrSupported;
	if (xhrSupported) jQuery.ajaxTransport(function(options) {
		if (!options.crossDomain || support.cors) {
			var callback;
			return {
				send: function(headers, complete) {
					var i, xhr = options.xhr(),
						id = ++xhrId;
					xhr.open(options.type, options.url, options.async, options.username, options.password);
					if (options.xhrFields) for (i in options.xhrFields) xhr[i] = options.xhrFields[i];
					if (options.mimeType && xhr.overrideMimeType) xhr.overrideMimeType(options.mimeType);
					if (!options.crossDomain && !headers["X-Requested-With"]) headers["X-Requested-With"] = "XMLHttpRequest";
					for (i in headers) if (headers[i] !== undefined) xhr.setRequestHeader(i, headers[i] + "");
					xhr.send(options.hasContent && options.data || null);
					callback = function(_, isAbort) {
						var status, statusText, responses;
						if (callback && (isAbort || xhr.readyState === 4)) {
							delete xhrCallbacks[id];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;
							if (isAbort) {
								if (xhr.readyState !== 4) xhr.abort()
							} else {
								responses = {};
								status = xhr.status;
								if (typeof xhr.responseText === "string") responses.text = xhr.responseText;
								try {
									statusText = xhr.statusText
								} catch (e) {
									statusText = ""
								}
								if (!status && options.isLocal && !options.crossDomain) status = responses.text ? 200 : 404;
								else if (status === 1223) status = 204
							}
						}
						if (responses) complete(status, statusText, responses, xhr.getAllResponseHeaders())
					};
					if (!options.async) callback();
					else if (xhr.readyState === 4) setTimeout(callback);
					else xhr.onreadystatechange = xhrCallbacks[id] = callback
				},
				abort: function() {
					if (callback) callback(undefined, true)
				}
			}
		}
	});

	function createStandardXHR() {
		try {
			return new window.XMLHttpRequest
		} catch (e) {}
	}
	function createActiveXHR() {
		try {
			return new window.ActiveXObject("Microsoft.XMLHTTP")
		} catch (e) {}
	}
	jQuery.ajaxSetup({
		accepts: {
			script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
		},
		contents: {
			script: /(?:java|ecma)script/
		},
		converters: {
			"text script": function(text) {
				jQuery.globalEval(text);
				return text
			}
		}
	});
	jQuery.ajaxPrefilter("script", function(s) {
		if (s.cache === undefined) s.cache = false;
		if (s.crossDomain) {
			s.type = "GET";
			s.global = false
		}
	});
	jQuery.ajaxTransport("script", function(s) {
		if (s.crossDomain) {
			var script, head = document.head || jQuery("head")[0] || document.documentElement;
			return {
				send: function(_, callback) {
					script = document.createElement("script");
					script.async = true;
					if (s.scriptCharset) script.charset = s.scriptCharset;
					script.src = s.url;
					script.onload = script.onreadystatechange = function(_, isAbort) {
						if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
							script.onload = script.onreadystatechange = null;
							if (script.parentNode) script.parentNode.removeChild(script);
							script = null;
							if (!isAbort) callback(200, "success")
						}
					};
					head.insertBefore(script, head.firstChild)
				},
				abort: function() {
					if (script) script.onload(undefined, true)
				}
			}
		}
	});
	var oldCallbacks = [],
		rjsonp = /(=)\?(?=&|$)|\?\?/;
	jQuery.ajaxSetup({
		jsonp: "callback",
		jsonpCallback: function() {
			var callback = oldCallbacks.pop() || jQuery.expando + "_" + nonce++;
			this[callback] = true;
			return callback
		}
	});
	jQuery.ajaxPrefilter("json jsonp", function(s, originalSettings, jqXHR) {
		var callbackName, overwritten, responseContainer, jsonProp = s.jsonp !== false && (rjsonp.test(s.url) ? "url" : typeof s.data === "string" && !(s.contentType || "").indexOf("application/x-www-form-urlencoded") && rjsonp.test(s.data) && "data");
		if (jsonProp || s.dataTypes[0] === "jsonp") {
			callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback;
			if (jsonProp) s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName);
			else if (s.jsonp !== false) s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName;
			s.converters["script json"] = function() {
				if (!responseContainer) jQuery.error(callbackName + " was not called");
				return responseContainer[0]
			};
			s.dataTypes[0] = "json";
			overwritten = window[callbackName];
			window[callbackName] = function() {
				responseContainer = arguments
			};
			jqXHR.always(function() {
				window[callbackName] = overwritten;
				if (s[callbackName]) {
					s.jsonpCallback = originalSettings.jsonpCallback;
					oldCallbacks.push(callbackName)
				}
				if (responseContainer && jQuery.isFunction(overwritten)) overwritten(responseContainer[0]);
				responseContainer = overwritten = undefined
			});
			return "script"
		}
	});
	jQuery.parseHTML = function(data, context, keepScripts) {
		if (!data || typeof data !== "string") return null;
		if (typeof context === "boolean") {
			keepScripts = context;
			context = false
		}
		context = context || document;
		var parsed = rsingleTag.exec(data),
			scripts = !keepScripts && [];
		if (parsed) return [context.createElement(parsed[1])];
		parsed = jQuery.buildFragment([data], context, scripts);
		if (scripts && scripts.length) jQuery(scripts).remove();
		return jQuery.merge([], parsed.childNodes)
	};
	var _load = jQuery.fn.load;
	jQuery.fn.load = function(url, params, callback) {
		if (typeof url !== "string" && _load) return _load.apply(this, arguments);
		var selector, response, type, self = this,
			off = url.indexOf(" ");
		if (off >= 0) {
			selector = jQuery.trim(url.slice(off, url.length));
			url = url.slice(0, off)
		}
		if (jQuery.isFunction(params)) {
			callback = params;
			params = undefined
		} else if (params && typeof params === "object") type = "POST";
		if (self.length > 0) jQuery.ajax({
			url: url,
			type: type,
			dataType: "html",
			data: params
		}).done(function(responseText) {
			response = arguments;
			self.html(selector ? jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) : responseText)
		}).complete(callback &&
		function(jqXHR, status) {
			self.each(callback, response || [jqXHR.responseText, status, jqXHR])
		});
		return this
	};
	jQuery.expr.filters.animated = function(elem) {
		return jQuery.grep(jQuery.timers, function(fn) {
			return elem === fn.elem
		}).length
	};
	var docElem = window.document.documentElement;

	function getWindow(elem) {
		return jQuery.isWindow(elem) ? elem : elem.nodeType === 9 ? elem.defaultView || elem.parentWindow : false
	}
	jQuery.offset = {
		setOffset: function(elem, options, i) {
			var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition, position = jQuery.css(elem, "position"),
				curElem = jQuery(elem),
				props = {};
			if (position === "static") elem.style.position = "relative";
			curOffset = curElem.offset();
			curCSSTop = jQuery.css(elem, "top");
			curCSSLeft = jQuery.css(elem, "left");
			calculatePosition = (position === "absolute" || position === "fixed") && jQuery.inArray("auto", [curCSSTop, curCSSLeft]) > -1;
			if (calculatePosition) {
				curPosition = curElem.position();
				curTop = curPosition.top;
				curLeft = curPosition.left
			} else {
				curTop = parseFloat(curCSSTop) || 0;
				curLeft = parseFloat(curCSSLeft) || 0
			}
			if (jQuery.isFunction(options)) options = options.call(elem, i, curOffset);
			if (options.top != null) props.top = options.top - curOffset.top + curTop;
			if (options.left != null) props.left = options.left - curOffset.left + curLeft;
			if ("using" in options) options.using.call(elem, props);
			else curElem.css(props)
		}
	};
	jQuery.fn.extend({
		offset: function(options) {
			if (arguments.length) return options === undefined ? this : this.each(function(i) {
				jQuery.offset.setOffset(this, options, i)
			});
			var docElem, win, box = {
				top: 0,
				left: 0
			},
				elem = this[0],
				doc = elem && elem.ownerDocument;
			if (!doc) return;
			docElem = doc.documentElement;
			if (!jQuery.contains(docElem, elem)) return box;
			if (typeof elem.getBoundingClientRect !== strundefined) box = elem.getBoundingClientRect();
			win = getWindow(doc);
			return {
				top: box.top + (win.pageYOffset || docElem.scrollTop) - (docElem.clientTop || 0),
				left: box.left + (win.pageXOffset || docElem.scrollLeft) - (docElem.clientLeft || 0)
			}
		},
		position: function() {
			if (!this[0]) return;
			var offsetParent, offset, parentOffset = {
				top: 0,
				left: 0
			},
				elem = this[0];
			if (jQuery.css(elem, "position") === "fixed") offset = elem.getBoundingClientRect();
			else {
				offsetParent = this.offsetParent();
				offset = this.offset();
				if (!jQuery.nodeName(offsetParent[0], "html")) parentOffset = offsetParent.offset();
				parentOffset.top += jQuery.css(offsetParent[0], "borderTopWidth", true);
				parentOffset.left += jQuery.css(offsetParent[0], "borderLeftWidth", true)
			}
			return {
				top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", true),
				left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", true)
			}
		},
		offsetParent: function() {
			return this.map(function() {
				var offsetParent = this.offsetParent || docElem;
				while (offsetParent && (!jQuery.nodeName(offsetParent, "html") && jQuery.css(offsetParent, "position") === "static")) offsetParent = offsetParent.offsetParent;
				return offsetParent || docElem
			})
		}
	});
	jQuery.each({
		scrollLeft: "pageXOffset",
		scrollTop: "pageYOffset"
	}, function(method, prop) {
		var top = /Y/.test(prop);
		jQuery.fn[method] = function(val) {
			return access(this, function(elem, method, val) {
				var win = getWindow(elem);
				if (val === undefined) return win ? prop in win ? win[prop] : win.document.documentElement[method] : elem[method];
				if (win) win.scrollTo(!top ? val : jQuery(win).scrollLeft(), top ? val : jQuery(win).scrollTop());
				else elem[method] = val
			}, method, val, arguments.length, null)
		}
	});
	jQuery.each(["top", "left"], function(i, prop) {
		jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition, function(elem, computed) {
			if (computed) {
				computed = curCSS(elem, prop);
				return rnumnonpx.test(computed) ? jQuery(elem).position()[prop] + "px" : computed
			}
		})
	});
	jQuery.each({
		Height: "height",
		Width: "width"
	}, function(name, type) {
		jQuery.each({
			padding: "inner" + name,
			content: type,
			"": "outer" + name
		}, function(defaultExtra, funcName) {
			jQuery.fn[funcName] = function(margin, value) {
				var chainable = arguments.length && (defaultExtra || typeof margin !== "boolean"),
					extra = defaultExtra || (margin === true || value === true ? "margin" : "border");
				return access(this, function(elem, type, value) {
					var doc;
					if (jQuery.isWindow(elem)) return elem.document.documentElement["client" + name];
					if (elem.nodeType === 9) {
						doc = elem.documentElement;
						return Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name])
					}
					return value === undefined ? jQuery.css(elem, type, extra) : jQuery.style(elem, type, value, extra)
				}, type, chainable ? margin : undefined, chainable, null)
			}
		})
	});
	jQuery.fn.size = function() {
		return this.length
	};
	jQuery.fn.andSelf = jQuery.fn.addBack;
	if (typeof define === "function" && define.amd) define("jquery", [], function() {
		return jQuery
	});
	var _jQuery = window.jQuery,
		_$ = window.$;
	jQuery.noConflict = function(deep) {
		if (window.$ === jQuery) window.$ = _$;
		if (deep && window.jQuery === jQuery) window.jQuery = _jQuery;
		return jQuery
	};
	if (typeof noGlobal === strundefined) window.jQuery = window.$ = jQuery;
	return jQuery
});
var win = window,
	nav = win.navigator,
	navua = nav.userAgent,
	appVersion = nav.appVersion,
	doc = win.document,
	parseRule = _getRules(),
	ieAX = win.ActiveXObject,
	ieMode = doc.documentMode,
	ieVer = _getIeVersion() || ieMode || 0,
	isIe = ieAX || ieMode,
	chromiumType = _getChromiumType(),
	statics = {
		isIe: !! ieVer,
		isIe6: ieAX && ieVer == 6 || ieMode == 6,
		isIe7: ieAX && ieVer == 7 || ieMode == 7,
		isIe8: ieAX && ieVer == 8 || ieMode == 8,
		isIe9: ieAX && ieVer == 9 || ieMode == 9,
		isIe10: ieMode === 10,
		isIe11: ieMode === 11,
		ie: ieVer,
		isChrome: chromiumType === "chrome",
		is360ee: chromiumType === "360ee",
		is360se: chromiumType === "360se",
		isSougou: chromiumType === "sougou",
		isLiebao: chromiumType === "liebao",
		isFirefox: win.scrollMaxX !== undefined,
		isMaxthon: ieVer && /\bmaxthon\b/i.test(appVersion),
		isQQ: !! ieVer && /\bqqbrowser\b/i.test(appVersion)
	},
	i;
$.ua = function(ua) {
	var _ua = new Constructor(ua);
	return _ua._parse()
};
for (i in statics) $.ua[i] = statics[i];

function Constructor(ua) {
	this.ua = (ua || navua || "").toLowerCase();
	this.isWebkit = !1;
	this.isGecko = !1;
	this.isTrident = !1
}
Constructor.prototype = {
	_parse: function() {
		var that = this,
			objPlatform = _parse(parseRule.platforms, that.ua),
			objBrowser = _parse(parseRule.browsers, that.ua, !0),
			objEngine = _parse(parseRule.engines, that.ua);
		that.platform = $.extend({}, objPlatform, {
			os: win.navigator.platform.toLowerCase()
		});
		that.browser = objBrowser;
		that.engine = objEngine;
		that.isWebkit = !! objEngine.isWebkit;
		that.isGecko = !! objEngine.isGecko;
		that.isTrident = !! objEngine.isTrident;
		that.isMobile = objPlatform.isMobile;
		that.isTablet = objPlatform.isTablet;
		that.isDesktop = objPlatform.isDesktop;
		return that
	}
};

function _parse(rule, ua, isBrowser) {
	var item = {},
		name, versionSearch, flags, versionNames, i, is, ic, j, js, jc;
	if (isBrowser && ieVer) return {
		name: "ie",
		ie: !0,
		version: ieVer,
		isIe: !0
	};
	for (i = 0, is = rule.length; i < is; i++) {
		ic = rule[i];
		name = ic.name;
		versionSearch = ic.versionSearch;
		flags = ic.flags;
		versionNames = ic.versionNames;
		if (ua.indexOf(name) !== -1) {
			item.name = name.replace(/\s/g, "");
			if (ic.slugName) item.name = ic.slugName;
			item["is" + _upperCase1st(item.name)] = !0;
			item.version = ("" + ((new RegExp(versionSearch + "(\\d+((\\.|_)\\d+)*)")).exec(ua) || [, 0])[1]).replace(/_/g, ".");
			if (flags) for (j = 0, js = flags.length; j < js; j++) item["is" + _upperCase1st(flags[j])] = !0;
			if (versionNames) for (j = 0, js = versionNames.length; j < js; j++) {
				jc = versionNames[j];
				if (item.version.indexOf(jc.number) === 0) {
					item.fullname = jc.name;
					item["is" + _upperCase1st(item.fullname)] = !0;
					break
				}
			}
			if (rule === parseRule.platforms) {
				item.isMobile = /mobile|phone/.test(ua) || item.isBlackberry;
				item.isMobile = item.isMobile === undefined ? !1 : !0;
				item.isTablet = /tablet/.test(ua) || item.isIpad || item.isAndroid && !/mobile/.test(ua);
				item.isTablet = item.isTablet === undefined ? !1 : !0;
				if (item.isTablet) item.isMobile = !1;
				item.isDesktop = !item.isMobile && !item.isTablet ? !0 : !1;
				if (item.ios) {
					item.fullname = "ios" + parseInt(item.version, 10);
					item["is" + _upperCase1st(item.fullname)] = !0
				}
			}
			break
		}
	}
	if (!item.name) {
		item.isUnknown = !0;
		item.name = "";
		item.version = ""
	}
	return item
}
function _upperCase1st(string) {
	return string.replace(/^(\w)/, function(w) {
		return w.toUpperCase()
	})
}

function _mime(where, value, name, nameReg) {
	var mimeTypes = win.navigator.mimeTypes,
		i;
	for (i in mimeTypes) if (mimeTypes[i][where] == value) if (name !== undefined && nameReg.test(mimeTypes[i][name])) return !0;
	else if (name === undefined) return !0;
	return !1
}

function _getChromiumType() {
	if (isIe || win.scrollMaxX !== undefined) return "";
	var isOriginalChrome = _mime("type", "application/vnd.chromium.remoting-viewer");
	if (isOriginalChrome) return "chrome";
	else if (win.chrome) {
		var _track = "track" in doc.createElement("track"),
			_style = "scoped" in doc.createElement("style"),
			_v8locale = "v8Locale" in win,
			external = win.external;
		if (external && "SEVersion" in external) return "sougou";
		if (external && "LiebaoGetVersion" in external) return "liebao";
		if (_track && !_style && !_v8locale && /Gecko\)\s+Chrome/.test(appVersion)) return "360ee";
		if (_track && _style && _v8locale) return "360se";
		return "other chrome"
	}
	return ""
}
function _getIeVersion() {
	var v = 3,
		p = doc.createElement("p"),
		all = p.getElementsByTagName("i");
	while (p.innerHTML = "\x3c!--[if gt IE " + ++v + "]><i></i><![endif]--\x3e", all[0]);
	return v > 4 ? v : 0
}

function _getRules() {
	return {
		platforms: [{
			name: "windows phone",
			versionSearch: "windows phone os ",
			versionNames: [{
				number: "7.5",
				name: "mango"
			}]
		}, {
			name: "win",
			slugName: "windows",
			versionSearch: "windows(?: nt)? ",
			versionNames: [{
				number: "6.2",
				name: "windows 8"
			}, {
				number: "6.1",
				name: "windows 7"
			}, {
				number: "6.0",
				name: "windows vista"
			}, {
				number: "5.2",
				name: "windows xp"
			}, {
				number: "5.1",
				name: "windows xp"
			}, {
				number: "5.0",
				name: "windows 2000"
			}]
		}, {
			name: "ipad",
			versionSearch: "cpu os ",
			flags: ["ios"]
		}, {
			name: "ipod",
			versionSearch: "iphone os ",
			flags: ["ios"]
		}, {
			name: "iphone",
			versionSearch: "iphone os ",
			flags: ["ios"]
		}, {
			name: "mac",
			versionSearch: "os x ",
			versionNames: [{
				number: "10.8",
				name: "mountainlion"
			}, {
				number: "10.7",
				name: "lion"
			}, {
				number: "10.6",
				name: "snowleopard"
			}, {
				number: "10.5",
				name: "leopard"
			}, {
				number: "10.4",
				name: "tiger"
			}, {
				number: "10.3",
				name: "panther"
			}, {
				number: "10.2",
				name: "jaguar"
			}, {
				number: "10.1",
				name: "puma"
			}, {
				number: "10.0",
				name: "cheetah"
			}]
		}, {
			name: "android",
			versionSearch: "android ",
			versionNames: [{
				number: "4.1",
				name: "jellybean"
			}, {
				number: "4.0",
				name: "icecream sandwich"
			}, {
				number: "3.",
				name: "honey comb"
			}, {
				number: "2.3",
				name: "ginger bread"
			}, {
				number: "2.2",
				name: "froyo"
			}, {
				number: "2.",
				name: "eclair"
			}, {
				number: "1.6",
				name: "donut"
			}, {
				number: "1.5",
				name: "cupcake"
			}]
		}, {
			name: "blackberry",
			versionSearch: "(?:blackberry\\d{4}[a-z]?|version)/"
		}, {
			name: "bb",
			slugName: "blackberry",
			versionSearch: "(?:version)/"
		}, {
			name: "playbook",
			slugName: "blackberry",
			versionSearch: "(?:version)/"
		}, {
			name: "linux"
		}, {
			name: "nokia"
		}],
		browsers: [{
			name: "iemobile",
			versionSearch: "iemobile/"
		}, {
			name: "msie",
			slugName: "ie",
			versionSearch: "msie "
		}, {
			name: "firefox",
			versionSearch: "firefox/"
		}, {
			name: "chrome",
			versionSearch: "chrome/"
		}, {
			name: "safari",
			versionSearch: "(?:browser|version)/"
		}, {
			name: "opera",
			versionSearch: "version/"
		}],
		engines: [{
			name: "trident",
			versionSearch: "trident/"
		}, {
			name: "webkit",
			versionSearch: "webkit/"
		}, {
			name: "gecko",
			versionSearch: "rv:"
		}, {
			name: "presto",
			versionSearch: "presto/"
		}]
	}
}(function() {
	var __modules__ = {};

	function require(id) {
		var mod = __modules__[id];
		var exports = "exports";
		if (typeof mod === "object") return mod;
		if (!mod[exports]) {
			mod[exports] = {};
			mod[exports] = mod.call(mod[exports], require, mod[exports], mod) || mod[exports]
		}
		return mod[exports]
	}
	function define(path, fn) {
		__modules__[path] = fn
	}
	define("jquery", function() {
		return jQuery
	});
	define("popup", function(require) {
		var $ = require("jquery");
		var _count = 0;
		var _isIE6 = !("minWidth" in $("html")[0].style);
		var _isFixed = !_isIE6;

		function Popup() {
			this.destroyed = false;
			this.__popup = $("<div />").attr({
				tabindex: "-1"
			}).css({
				display: "none",
				position: "absolute",
				outline: 0
			}).html(this.innerHTML).appendTo("body");
			this.__backdrop = $("<div />");
			this.node = this.__popup[0];
			this.backdrop = this.__backdrop[0];
			_count++
		}
		$.extend(Popup.prototype, {
			node: null,
			backdrop: null,
			fixed: false,
			destroyed: true,
			open: false,
			returnValue: "",
			autofocus: true,
			align: "bottom left",
			backdropBackground: "#000",
			backdropOpacity: .7,
			innerHTML: "",
			className: "ui-popup",
			show: function(anchor) {
				if (this.destroyed) return this;
				var that = this;
				var popup = this.__popup;
				this.__activeElement = this.__getActive();
				this.open = true;
				this.follow = anchor || this.follow;
				if (!this.__ready) {
					popup.addClass(this.className);
					if (this.modal) this.__lock();
					if (!popup.html()) popup.html(this.innerHTML);
					if (!_isIE6) $(window).on("resize", this.__onresize = function() {
						that.reset()
					});
					this.__ready = true
				}
				popup.addClass(this.className + "-show").attr("role", this.modal ? "alertdialog" : "dialog").css("position", this.fixed ? "fixed" : "absolute").show();
				this.__backdrop.show();
				this.reset().focus();
				this.__dispatchEvent("show");
				return this
			},
			showModal: function() {
				this.modal = true;
				return this.show.apply(this, arguments)
			},
			close: function(result) {
				if (!this.destroyed && this.open) {
					if (result !== undefined) this.returnValue = result;
					this.__popup.hide().removeClass(this.className + "-show");
					this.__backdrop.hide();
					this.open = false;
					this.blur();
					this.__dispatchEvent("close")
				}
				return this
			},
			remove: function() {
				if (this.destroyed) return this;
				this.__dispatchEvent("beforeremove");
				if (Popup.current === this) Popup.current = null;
				this.__unlock();
				this.__popup.remove();
				this.__backdrop.remove();
				if (!_isIE6) $(window).off("resize", this.__onresize);
				this.__dispatchEvent("remove");
				for (var i in this) delete this[i];
				return this
			},
			reset: function() {
				var elem = this.follow;
				if (elem) this.__follow(elem);
				else this.__center();
				this.__dispatchEvent("reset");
				return this
			},
			focus: function() {
				var node = this.node;
				var current = Popup.current;
				if (current && current !== this) current.blur(false);
				if (!$.contains(node, this.__getActive())) {
					var autofocus = this.__popup.find("[autofocus]")[0];
					if (!this._autofocus && autofocus) this._autofocus = true;
					else autofocus = node;
					this.__focus(autofocus)
				}
				Popup.current = this;
				this.__popup.addClass(this.className + "-focus");
				this.__zIndex();
				this.__dispatchEvent("focus");
				return this
			},
			blur: function() {
				var activeElement = this.__activeElement;
				var isBlur = arguments[0];
				if (isBlur !== false) this.__focus(activeElement);
				this._autofocus = false;
				this.__popup.removeClass(this.className + "-focus");
				this.__dispatchEvent("blur");
				return this
			},
			addEventListener: function(type, callback) {
				this.__getEventListener(type).push(callback);
				return this
			},
			removeEventListener: function(type, callback) {
				var listeners = this.__getEventListener(type);
				for (var i = 0; i < listeners.length; i++) if (callback === listeners[i]) listeners.splice(i--, 1);
				return this
			},
			__getEventListener: function(type) {
				var listener = this.__listener;
				if (!listener) listener = this.__listener = {};
				if (!listener[type]) listener[type] = [];
				return listener[type]
			},
			__dispatchEvent: function(type) {
				var listeners = this.__getEventListener(type);
				if (this["on" + type]) this["on" + type]();
				for (var i = 0; i < listeners.length; i++) listeners[i].call(this)
			},
			__focus: function(elem) {
				try {
					if (this.autofocus && !/^iframe$/i.test(elem.nodeName)) elem.focus()
				} catch (e) {}
			},
			__getActive: function() {
				try {
					var activeElement = document.activeElement;
					var contentDocument = activeElement.contentDocument;
					var elem = contentDocument && contentDocument.activeElement || activeElement;
					return elem
				} catch (e) {}
			},
			__zIndex: function() {
				var index = Popup.zIndex++;
				this.__popup.css("zIndex", index);
				this.__backdrop.css("zIndex", index - 1);
				this.zIndex = index
			},
			__center: function() {
				var popup = this.__popup;
				var $window = $(window);
				var $document = $(document);
				var fixed = this.fixed;
				var dl = fixed ? 0 : $document.scrollLeft();
				var dt = fixed ? 0 : $document.scrollTop();
				var ww = $window.width();
				var wh = $window.height();
				var ow = popup.width();
				var oh = popup.height();
				var left = (ww - ow) / 2 + dl;
				var top = (wh - oh) * 382 / 1E3 + dt;
				var style = popup[0].style;
				style.left = Math.max(parseInt(left), dl) + "px";
				style.top = Math.max(parseInt(top), dt) + "px"
			},
			__follow: function(anchor) {
				var $elem = anchor.parentNode && $(anchor);
				var popup = this.__popup;
				if (this.__followSkin) popup.removeClass(this.__followSkin);
				if ($elem) {
					var o = $elem.offset();
					if (o.left * o.top < 0) return this.__center()
				}
				var that = this;
				var fixed = this.fixed;
				var $window = $(window);
				var $document = $(document);
				var winWidth = $window.width();
				var winHeight = $window.height();
				var docLeft = $document.scrollLeft();
				var docTop = $document.scrollTop();
				var popupWidth = popup.width();
				var popupHeight = popup.height();
				var width = $elem ? $elem.outerWidth() : 0;
				var height = $elem ? $elem.outerHeight() : 0;
				var offset = this.__offset(anchor);
				var x = offset.left;
				var y = offset.top;
				var left = fixed ? x - docLeft : x;
				var top = fixed ? y - docTop : y;
				var minLeft = fixed ? 0 : docLeft;
				var minTop = fixed ? 0 : docTop;
				var maxLeft = minLeft + winWidth - popupWidth;
				var maxTop = minTop + winHeight - popupHeight;
				var css = {};
				var align = this.align.split(" ");
				var className = this.className + "-";
				var reverse = {
					top: "bottom",
					bottom: "top",
					left: "right",
					right: "left"
				};
				var name = {
					top: "top",
					bottom: "top",
					left: "left",
					right: "left"
				};
				var temp = [{
					top: top - popupHeight,
					bottom: top + height,
					left: left - popupWidth,
					right: left + width
				}, {
					top: top,
					bottom: top - popupHeight + height,
					left: left,
					right: left - popupWidth + width
				}];
				var center = {
					left: left + width / 2 - popupWidth / 2,
					top: top + height / 2 - popupHeight / 2
				};
				var range = {
					left: [minLeft, maxLeft],
					top: [minTop, maxTop]
				};
				$.each(align, function(i, val) {
					if (temp[i][val] > range[name[val]][1]) val = align[i] = reverse[val];
					if (temp[i][val] < range[name[val]][0]) align[i] = reverse[val]
				});
				if (!align[1]) {
					name[align[1]] = name[align[0]] === "left" ? "top" : "left";
					temp[1][align[1]] = center[name[align[1]]]
				}
				className += align.join("-") + " " + this.className + "-follow";
				that.__followSkin = className;
				if ($elem) popup.addClass(className);
				css[name[align[0]]] = parseInt(temp[0][align[0]]);
				css[name[align[1]]] = parseInt(temp[1][align[1]]);
				popup.css(css)
			},
			__offset: function(anchor) {
				var isNode = anchor.parentNode;
				var offset = isNode ? $(anchor).offset() : {
					left: anchor.pageX,
					top: anchor.pageY
				};
				anchor = isNode ? anchor : anchor.target;
				var ownerDocument = anchor.ownerDocument;
				var defaultView = ownerDocument.defaultView || ownerDocument.parentWindow;
				if (defaultView == window) return offset;
				var frameElement = defaultView.frameElement;
				var $ownerDocument = $(ownerDocument);
				var docLeft = $ownerDocument.scrollLeft();
				var docTop = $ownerDocument.scrollTop();
				var frameOffset = $(frameElement).offset();
				var frameLeft = frameOffset.left;
				var frameTop = frameOffset.top;
				return {
					left: offset.left + frameLeft - docLeft,
					top: offset.top + frameTop - docTop
				}
			},
			__lock: function() {
				var that = this;
				var popup = this.__popup;
				var backdrop = this.__backdrop;
				var backdropCss = {
					position: "fixed",
					left: 0,
					top: 0,
					width: "100%",
					height: "100%",
					overflow: "hidden",
					userSelect: "none",
					opacity: 0,
					background: this.backdropBackground
				};
				popup.addClass(this.className + "-modal");
				Popup.zIndex = Popup.zIndex + 2;
				this.__zIndex();
				if (!_isFixed) $.extend(backdropCss, {
					position: "absolute",
					width: $(window).width() + "px",
					height: $(document).height() + "px"
				});
				backdrop.css(backdropCss).animate({
					opacity: this.backdropOpacity
				}, 150).insertAfter(popup).attr({
					tabindex: "0"
				}).on("focus", function() {
					that.focus()
				})
			},
			__unlock: function() {
				if (this.modal) {
					this.__popup.removeClass(this.className + "-modal");
					this.__backdrop.remove();
					delete this.modal
				}
			}
		});
		Popup.zIndex = 1024;
		Popup.current = null;
		return Popup
	});
	define("dialog-config", {
		content: '<span class="ui-dialog-loading">Loading..</span>',
		title: "",
		statusbar: "",
		button: null,
		ok: null,
		cancel: null,
		okValue: "ok",
		cancelValue: "cancel",
		cancelDisplay: true,
		width: "",
		height: "",
		padding: "",
		skin: "",
		quickClose: false,
		cssUri: "../css/ui-dialog.css",
		innerHTML: '<div i="dialog" class="ui-dialog">' + '<div class="ui-dialog-arrow-a"></div>' + '<div class="ui-dialog-arrow-b"></div>' + '<table class="ui-dialog-grid">' + "<tr>" + '<td i="header" class="ui-dialog-header">' + '<button i="close" class="ui-dialog-close">×</button>' + '<div i="title" class="ui-dialog-title"></div>' + "</td>" + "</tr>" + "<tr>" + '<td i="body" class="ui-dialog-body">' + '<div i="content" class="ui-dialog-content"></div>' + "</td>" + "</tr>" + "<tr>" + '<td i="footer" class="ui-dialog-footer">' + '<div i="statusbar" class="ui-dialog-statusbar"></div>' + '<div i="button" class="ui-dialog-button"></div>' + "</td>" + "</tr>" + "</table>" + "</div>"
	});
	define("dialog", function(require) {
		var $ = require("jquery");
		var Popup = require("popup");
		var defaults = require("dialog-config");
		var css = defaults.cssUri;
		if (css) {
			var fn = require[require.toUrl ? "toUrl" : "resolve"];
			if (fn) {
				css = fn(css);
				css = '<link rel="stylesheet" href="../../' + css + '" />';
				if ($("base")[0]) $("base").before(css);
				else $("head").append(css)
			}
		}
		var _count = 0;
		var _expando = new Date - 0;
		var _isIE6 = !("minWidth" in $("html")[0].style);
		var _isMobile = "createTouch" in document && !("onmousemove" in document) || /(iPhone|iPad|iPod)/i.test(navigator.userAgent);
		var _isFixed = !_isIE6 && !_isMobile;
		var artDialog = function(options, ok, cancel) {
				var originalOptions = options = options || {};
				if (typeof options === "string" || options.nodeType === 1) options = {
					content: options,
					fixed: !_isMobile
				};
				options = $.extend(true, {}, artDialog.defaults, options);
				options._ = originalOptions;
				var id = options.id = options.id || _expando + _count;
				var api = artDialog.get(id);
				if (api) return api.focus();
				if (!_isFixed) options.fixed = false;
				if (options.quickClose) {
					options.modal = true;
					if (!originalOptions.backdropOpacity) options.backdropOpacity = 0
				}
				if (!$.isArray(options.button)) options.button = [];
				if (cancel !== undefined) options.cancel = cancel;
				if (options.cancel) options.button.push({
					id: "cancel",
					value: options.cancelValue,
					callback: options.cancel,
					display: options.cancelDisplay
				});
				if (ok !== undefined) options.ok = ok;
				if (options.ok) options.button.push({
					id: "ok",
					value: options.okValue,
					callback: options.ok,
					autofocus: true
				});
				return artDialog.list[id] = new artDialog.create(options)
			};
		var popup = function() {};
		popup.prototype = Popup.prototype;
		var prototype = artDialog.prototype = new popup;
		artDialog.create = function(options) {
			var that = this;
			$.extend(this, new Popup);
			var $popup = $(this.node).html(options.innerHTML);
			this.options = options;
			this._popup = $popup;
			$.each(options, function(name, value) {
				if (typeof that[name] === "function") that[name](value);
				else that[name] = value
			});
			if (options.zIndex) Popup.zIndex = options.zIndex;
			$popup.attr({
				"aria-labelledby": this._$("title").attr("id", "title:" + this.id).attr("id"),
				"aria-describedby": this._$("content").attr("id", "content:" + this.id).attr("id")
			});
			this._$("close").css("display", this.cancel === false ? "none" : "").attr("title", this.cancelValue).on("click", function(event) {
				that._trigger("cancel");
				event.preventDefault()
			});
			this._$("dialog").addClass(this.skin);
			this._$("body").css("padding", this.padding);
			$popup.on("click", "[data-id]", function(event) {
				var $this = $(this);
				if (!$this.attr("disabled")) that._trigger($this.data("id"));
				event.preventDefault()
			});
			if (options.quickClose) $(this.backdrop).on("onmousedown" in document ? "mousedown" : "click", function() {
				that._trigger("cancel");
				return false
			});
			this._esc = function(event) {
				var target = event.target;
				var nodeName = target.nodeName;
				var rinput = /^input|textarea$/i;
				var isTop = Popup.current === that;
				var keyCode = event.keyCode;
				if (!isTop || rinput.test(nodeName) && target.type !== "button") return
			};
			$(document).on("keydown", this._esc);
			this.addEventListener("remove", function() {
				$(document).off("keydown", this._esc);
				delete artDialog.list[this.id]
			});
			_count++;
			artDialog.oncreate(this);
			return this
		};
		artDialog.create.prototype = prototype;
		$.extend(prototype, {
			content: function(html) {
				this._$("content").empty("")[typeof html === "object" ? "append" : "html"](html);
				return this.reset()
			},
			title: function(text) {
				this._$("title").text(text);
				this._$("header")[text ? "show" : "hide"]();
				return this
			},
			width: function(value) {
				this._$("content").css("width", value);
				return this.reset()
			},
			height: function(value) {
				this._$("content").css("height", value);
				return this.reset()
			},
			button: function(args) {
				args = args || [];
				var that = this;
				var html = "";
				var number = 0;
				this.callbacks = {};
				if (typeof args === "string") html = args;
				else $.each(args, function(i, val) {
					val.id = val.id || val.value;
					that.callbacks[val.id] = val.callback;
					var style = "";
					if (val.display === false) style = ' style="display:none"';
					else number++;
					html += "<button" + ' type="button"' + ' data-id="' + val.id + '"' + style + (val.disabled ? " disabled" : "") + (val.autofocus ? ' autofocus class="ui-dialog-autofocus"' : "") + ">" + val.value + "</button>"
				});
				this._$("footer")[number ? "show" : "hide"]();
				this._$("button").html(html);
				return this
			},
			statusbar: function(html) {
				this._$("statusbar").html(html)[html ? "show" : "hide"]();
				return this
			},
			_$: function(i) {
				return this._popup.find("[i=" + i + "]")
			},
			_trigger: function(id) {
				var fn = this.callbacks[id];
				return typeof fn !== "function" || fn.call(this) !== false ? this.close().remove() : this
			}
		});
		artDialog.oncreate = $.noop;
		artDialog.getCurrent = function() {
			return Popup.current
		};
		artDialog.get = function(id) {
			return id === undefined ? artDialog.list : artDialog.list[id]
		};
		artDialog.list = {};
		artDialog.defaults = defaults;
		return artDialog
	});
	window.dialog = require("dialog")
})();
jQuery.fn.extend({
	everyTime: function(interval, label, fn, times, belay) {
		return this.each(function() {
			jQuery.timer.add(this, interval, label, fn, times, belay)
		})
	},
	oneTime: function(interval, label, fn) {
		return this.each(function() {
			jQuery.timer.add(this, interval, label, fn, 1)
		})
	},
	stopTime: function(label, fn) {
		return this.each(function() {
			jQuery.timer.remove(this, label, fn)
		})
	}
});
jQuery.event.special;
jQuery.extend({
	timer: {
		global: [],
		guid: 1,
		dataKey: "jQuery.timer",
		regex: /^([0-9]+(?:\.[0-9]*)?)\s*(.*s)?$/,
		powers: {
			"ms": 1,
			"cs": 10,
			"ds": 100,
			"s": 1E3,
			"das": 1E4,
			"hs": 1E5,
			"ks": 1E6
		},
		timeParse: function(value) {
			if (value == undefined || value == null) return null;
			var result = this.regex.exec(jQuery.trim(value.toString()));
			if (result[2]) {
				var num = parseFloat(result[1]);
				var mult = this.powers[result[2]] || 1;
				return num * mult
			} else return value
		},
		add: function(element, interval, label, fn, times, belay) {
			var counter = 0;
			if (jQuery.isFunction(label)) {
				if (!times) times = fn;
				fn = label;
				label = interval
			}
			interval = jQuery.timer.timeParse(interval);
			if (typeof interval != "number" || isNaN(interval) || interval <= 0) return;
			if (times && times.constructor != Number) {
				belay = !! times;
				times = 0
			}
			times = times || 0;
			belay = belay || false;
			var timers = jQuery.data(element, this.dataKey) || jQuery.data(element, this.dataKey, {});
			if (!timers[label]) timers[label] = {};
			fn.timerID = fn.timerID || this.guid++;
			var handler = function() {
					if (belay && this.inProgress) return;
					this.inProgress = true;
					if (++counter > times && times !== 0 || fn.call(element, counter) === false) jQuery.timer.remove(element, label, fn);
					this.inProgress = false
				};
			handler.timerID = fn.timerID;
			if (!timers[label][fn.timerID]) timers[label][fn.timerID] = window.setInterval(handler, interval);
			this.global.push(element)
		},
		remove: function(element, label, fn) {
			var timers = jQuery.data(element, this.dataKey),
				ret;
			if (timers) {
				if (!label) for (label in timers) this.remove(element, label, fn);
				else if (timers[label]) {
					if (fn) {
						if (fn.timerID) {
							window.clearInterval(timers[label][fn.timerID]);
							delete timers[label][fn.timerID]
						}
					} else for (var fn in timers[label]) {
						window.clearInterval(timers[label][fn]);
						delete timers[label][fn]
					}
					for (ret in timers[label]) break;
					if (!ret) {
						ret = null;
						delete timers[label]
					}
				}
				for (ret in timers) break;
				if (!ret) jQuery.removeData(element, this.dataKey)
			}
		}
	}
});
jQuery(window).bind("unload", function() {
	jQuery.each(jQuery.timer.global, function(index, item) {
		jQuery.timer.remove(item)
	})
});
(function($) {
	function maybeCall(thing, ctx) {
		return typeof thing == "function" ? thing.call(ctx) : thing
	}
	function isElementInDOM(ele) {
		while (ele = ele.parentNode) if (ele == document) return true;
		return false
	}
	function Tipsy(element, options) {
		this.$element = $(element);
		this.options = options;
		this.enabled = true;
		this.fixTitle()
	}
	Tipsy.prototype = {
		show: function() {
			var title = this.getTitle();
			if (title && this.enabled) {
				var $tip = this.tip();
				$tip.find(".tipsy-inner")[this.options.html ? "html" : "text"](title);
				$tip[0].className = "tipsy";
				$tip.remove().css({
					top: 0,
					left: 0,
					visibility: "hidden",
					display: "block"
				}).prependTo(document.body);
				var pos = $.extend({}, this.$element.offset(), {
					width: this.$element[0].offsetWidth,
					height: this.$element[0].offsetHeight
				});
				var actualWidth = $tip[0].offsetWidth,
					actualHeight = $tip[0].offsetHeight,
					gravity = maybeCall(this.options.gravity, this.$element[0]);
				var tp;
				switch (gravity.charAt(0)) {
				case "n":
					tp = {
						top: pos.top + pos.height + this.options.offset,
						left: pos.left + pos.width / 2 - actualWidth / 2
					};
					break;
				case "s":
					tp = {
						top: pos.top - actualHeight - this.options.offset,
						left: pos.left + pos.width / 2 - actualWidth / 2
					};
					break;
				case "e":
					tp = {
						top: pos.top + pos.height / 2 - actualHeight / 2,
						left: pos.left - actualWidth - this.options.offset
					};
					break;
				case "w":
					tp = {
						top: pos.top + pos.height / 2 - actualHeight / 2,
						left: pos.left + pos.width + this.options.offset
					};
					break
				}
				if (gravity.length == 2) if (gravity.charAt(1) == "w") tp.left = pos.left + pos.width / 2 - 15;
				else tp.left = pos.left + pos.width / 2 - actualWidth + 15;
				$tip.css(tp).addClass("tipsy-" + gravity);
				$tip.find(".tipsy-arrow")[0].className = "tipsy-arrow tipsy-arrow-" + gravity.charAt(0);
				if (this.options.className) $tip.addClass(maybeCall(this.options.className, this.$element[0]));
				if (this.options.fade) $tip.stop().css({
					opacity: 0,
					display: "block",
					visibility: "visible"
				}).animate({
					opacity: this.options.opacity
				});
				else $tip.css({
					visibility: "visible",
					opacity: this.options.opacity
				})
			}
		},
		hide: function() {
			if (this.options.fade) this.tip().stop().fadeOut(function() {
				$(this).remove()
			});
			else this.tip().remove()
		},
		fixTitle: function() {
			var $e = this.$element;
			if ($e.attr("title") || typeof $e.attr("original-title") != "string") $e.attr("original-title", $e.attr("title") || "").removeAttr("title")
		},
		getTitle: function() {
			var title, $e = this.$element,
				o = this.options;
			this.fixTitle();
			var title, o = this.options;
			if (typeof o.title == "string") title = $e.attr(o.title == "title" ? "original-title" : o.title);
			else if (typeof o.title == "function") title = o.title.call($e[0]);
			title = ("" + title).replace(/(^\s*|\s*$)/, "");
			return title || o.fallback
		},
		tip: function() {
			if (!this.$tip) {
				this.$tip = $('<div class="tipsy"></div>').html('<div class="tipsy-arrow"></div><div class="tipsy-inner"></div>');
				this.$tip.data("tipsy-pointee", this.$element[0])
			}
			return this.$tip
		},
		validate: function() {
			if (!this.$element[0].parentNode) {
				this.hide();
				this.$element = null;
				this.options = null
			}
		},
		enable: function() {
			this.enabled = true
		},
		disable: function() {
			this.enabled = false
		},
		toggleEnabled: function() {
			this.enabled = !this.enabled
		}
	};
	$.fn.tipsy = function(options) {
		if (options === true) return this.data("tipsy");
		else if (typeof options == "string") {
			var tipsy = this.data("tipsy");
			if (tipsy) tipsy[options]();
			return this
		}
		options = $.extend({}, $.fn.tipsy.defaults, options);

		function get(ele) {
			var tipsy = $.data(ele, "tipsy");
			if (!tipsy) {
				tipsy = new Tipsy(ele, $.fn.tipsy.elementOptions(ele, options));
				$.data(ele, "tipsy", tipsy)
			}
			return tipsy
		}
		function enter() {
			var tipsy = get(this);
			tipsy.hoverState = "in";
			if (options.delayIn == 0) tipsy.show();
			else {
				tipsy.fixTitle();
				setTimeout(function() {
					if (tipsy.hoverState == "in") tipsy.show()
				}, options.delayIn)
			}
		}
		function leave() {
			var tipsy = get(this);
			tipsy.hoverState = "out";
			if (options.delayOut == 0) tipsy.hide();
			else setTimeout(function() {
				if (tipsy.hoverState == "out") tipsy.hide()
			}, options.delayOut)
		}
		if (!options.live) this.each(function() {
			get(this)
		});
		if (options.trigger != "manual") {
			var binder = options.live ? "live" : "bind",
				eventIn = options.trigger == "hover" ? "mouseenter" : "focus",
				eventOut = options.trigger == "hover" ? "mouseleave" : "blur";
			this[binder](eventIn, enter)[binder](eventOut, leave)
		}
		return this
	};
	$.fn.tipsy.defaults = {
		className: null,
		delayIn: 0,
		delayOut: 0,
		fade: false,
		fallback: "",
		gravity: "n",
		html: false,
		live: false,
		offset: 0,
		opacity: .8,
		title: "title",
		trigger: "hover"
	};
	$.fn.tipsy.revalidate = function() {
		$(".tipsy").each(function() {
			var pointee = $.data(this, "tipsy-pointee");
			if (!pointee || !isElementInDOM(pointee)) $(this).remove()
		})
	};
	$.fn.tipsy.elementOptions = function(ele, options) {
		return $.metadata ? $.extend({}, options, $(ele).metadata()) : options
	};
	$.fn.tipsy.autoNS = function() {
		return $(this).offset().top > $(document).scrollTop() + $(window).height() / 2 ? "s" : "n"
	};
	$.fn.tipsy.autoWE = function() {
		return $(this).offset().left > $(document).scrollLeft() + $(window).width() / 2 ? "e" : "w"
	};
	$.fn.tipsy.autoBounds = function(margin, prefer) {
		return function() {
			var dir = {
				ns: prefer[0],
				ew: prefer.length > 1 ? prefer[1] : false
			},
				boundTop = $(document).scrollTop() + margin,
				boundLeft = $(document).scrollLeft() + margin,
				$this = $(this);
			if ($this.offset().top < boundTop) dir.ns = "n";
			if ($this.offset().left < boundLeft) dir.ew = "w";
			if ($(window).width() + $(document).scrollLeft() - $this.offset().left < margin) dir.ew = "e";
			if ($(window).height() + $(document).scrollTop() - $this.offset().top < margin) dir.ns = "s";
			return dir.ns + (dir.ew ? dir.ew : "")
		}
	}
})(jQuery);
(function(factory) {
	if (typeof define === "function" && define.amd) define(["jquery"], factory);
	else factory(jQuery)
})(function($) {
	$.extend($.fn, {
		validate: function(options) {
			if (!this.length) {
				if (options && options.debug && window.console) console.warn("Nothing selected, can't validate, returning nothing.");
				return
			}
			var validator = $.data(this[0], "validator");
			if (validator) return validator;
			this.attr("novalidate", "novalidate");
			validator = new $.validator(options, this[0]);
			$.data(this[0], "validator", validator);
			if (validator.settings.onsubmit) {
				this.validateDelegate(":submit", "click", function(event) {
					if (validator.settings.submitHandler) validator.submitButton = event.target;
					if ($(event.target).hasClass("cancel")) validator.cancelSubmit = true;
					if ($(event.target).attr("formnovalidate") !== undefined) validator.cancelSubmit = true
				});
				this.submit(function(event) {
					if (validator.settings.debug) event.preventDefault();

					function handle() {
						var hidden;
						if (validator.settings.submitHandler) {
							if (validator.submitButton) hidden = $("<input type='hidden'/>").attr("name", validator.submitButton.name).val($(validator.submitButton).val()).appendTo(validator.currentForm);
							validator.settings.submitHandler.call(validator, validator.currentForm, event);
							if (validator.submitButton) hidden.remove();
							return false
						}
						return true
					}
					if (validator.cancelSubmit) {
						validator.cancelSubmit = false;
						return handle()
					}
					if (validator.form()) {
						if (validator.pendingRequest) {
							validator.formSubmitted = true;
							return false
						}
						return handle()
					} else {
						validator.focusInvalid();
						return false
					}
				})
			}
			return validator
		},
		valid: function() {
			var valid, validator;
			if ($(this[0]).is("form")) valid = this.validate().form();
			else {
				valid = true;
				validator = $(this[0].form).validate();
				this.each(function() {
					valid = validator.element(this) && valid
				})
			}
			return valid
		},
		removeAttrs: function(attributes) {
			var result = {},
				$element = this;
			$.each(attributes.split(/\s/), function(index, value) {
				result[value] = $element.attr(value);
				$element.removeAttr(value)
			});
			return result
		},
		rules: function(command, argument) {
			var element = this[0],
				settings, staticRules, existingRules, data, param, filtered;
			if (command) {
				settings = $.data(element.form, "validator").settings;
				staticRules = settings.rules;
				existingRules = $.validator.staticRules(element);
				switch (command) {
				case "add":
					$.extend(existingRules, $.validator.normalizeRule(argument));
					delete existingRules.messages;
					staticRules[element.name] = existingRules;
					if (argument.messages) settings.messages[element.name] = $.extend(settings.messages[element.name], argument.messages);
					break;
				case "remove":
					if (!argument) {
						delete staticRules[element.name];
						return existingRules
					}
					filtered = {};
					$.each(argument.split(/\s/), function(index, method) {
						filtered[method] = existingRules[method];
						delete existingRules[method];
						if (method === "required") $(element).removeAttr("aria-required")
					});
					return filtered
				}
			}
			data = $.validator.normalizeRules($.extend({}, $.validator.classRules(element), $.validator.attributeRules(element), $.validator.dataRules(element), $.validator.staticRules(element)), element);
			if (data.required) {
				param = data.required;
				delete data.required;
				data = $.extend({
					required: param
				}, data);
				$(element).attr("aria-required", "true")
			}
			if (data.remote) {
				param = data.remote;
				delete data.remote;
				data = $.extend(data, {
					remote: param
				})
			}
			return data
		}
	});
	$.extend($.expr[":"], {
		blank: function(a) {
			return !$.trim("" + $(a).val())
		},
		filled: function(a) {
			return !!$.trim("" + $(a).val())
		},
		unchecked: function(a) {
			return !$(a).prop("checked")
		}
	});
	$.validator = function(options, form) {
		this.settings = $.extend(true, {}, $.validator.defaults, options);
		this.currentForm = form;
		this.init()
	};
	$.validator.format = function(source, params) {
		if (arguments.length === 1) return function() {
			var args = $.makeArray(arguments);
			args.unshift(source);
			return $.validator.format.apply(this, args)
		};
		if (arguments.length > 2 && params.constructor !== Array) params = $.makeArray(arguments).slice(1);
		if (params.constructor !== Array) params = [params];
		$.each(params, function(i, n) {
			source = source.replace(new RegExp("\\{" + i + "\\}", "g"), function() {
				return n
			})
		});
		return source
	};
	$.extend($.validator, {
		defaults: {
			messages: {},
			groups: {},
			rules: {},
			errorClass: "error",
			validClass: "valid",
			errorElement: "label",
			focusInvalid: true,
			errorContainer: $([]),
			errorLabelContainer: $([]),
			onsubmit: true,
			ignore: ":hidden",
			ignoreTitle: false,
			onfocusin: function(element) {
				this.lastActive = element;
				if (this.settings.focusCleanup && !this.blockFocusCleanup) {
					if (this.settings.unhighlight) this.settings.unhighlight.call(this, element, this.settings.errorClass, this.settings.validClass);
					this.hideThese(this.errorsFor(element))
				}
			},
			onfocusout: function(element) {
				if (!this.checkable(element) && (element.name in this.submitted || !this.optional(element))) this.element(element)
			},
			onkeyup: function(element, event) {
				if (event.which === 9 && this.elementValue(element) === "") return;
				else if (element.name in this.submitted || element === this.lastElement) this.element(element)
			},
			onclick: function(element) {
				if (element.name in this.submitted) this.element(element);
				else if (element.parentNode.name in this.submitted) this.element(element.parentNode)
			},
			highlight: function(element, errorClass, validClass) {
				if (element.type === "radio") this.findByName(element.name).addClass(errorClass).removeClass(validClass);
				else $(element).addClass(errorClass).removeClass(validClass)
			},
			unhighlight: function(element, errorClass, validClass) {
				if (element.type === "radio") this.findByName(element.name).removeClass(errorClass).addClass(validClass);
				else $(element).removeClass(errorClass).addClass(validClass)
			}
		},
		setDefaults: function(settings) {
			$.extend($.validator.defaults, settings)
		},
		messages: {
			required: "\u5fc5\u586b",
			remote: "\u8bf7\u4fee\u6b63",
			email: "\u8bf7\u8f93\u5165\u6709\u6548\u7684\u7535\u5b50\u90ae\u4ef6\u5730\u5740",
			url: "\u8bf7\u8f93\u5165\u6709\u6548\u7684\u7f51\u5740",
			date: "\u8bf7\u8f93\u5165\u6709\u6548\u65e5\u671f",
			dateISO: "\u8bf7\u8f93\u5165\u6709\u6548\u65e5\u671f(ISO)",
			number: "\u8bf7\u8f93\u5165\u4e00\u4e2a\u6709\u6548\u7684\u6570\u5b57",
			digits: "\u53ea\u5141\u8bb8\u8f93\u5165\u6570\u5b57",
			creditcard: "\u8bf7\u8f93\u5165\u4e00\u4e2a\u6709\u6548\u7684\u4fe1\u7528\u5361\u53f7\u7801",
			equalTo: "\u8bf7\u518d\u6b21\u8f93\u5165\u76f8\u540c\u7684\u503c",
			maxlength: $.validator.format("\u8bf7\u8f93\u5165\u4e0d\u8d85\u8fc7 {0} \u4e2a\u5b57\u5143"),
			minlength: $.validator.format("\u8bf7\u8f93\u5165\u81f3\u5c11 {0} \u4e2a\u5b57\u5143"),
			rangelength: $.validator.format("\u8bf7\u8f93\u5165 {0} \u81f3 {1} \u4e2a\u5b57\u5143"),
			range: $.validator.format("\u8bf7\u8f93\u5165\u4ecb\u4e8e {0} \u548c {1} \u4e4b\u95f4\u7684\u503c"),
			max: $.validator.format("\u8bf7\u8f93\u5165\u4e00\u4e2a\u5c0f\u4e8e\u6216\u7b49\u4e8e {0} \u7684\u503c"),
			min: $.validator.format("\u8bf7\u8f93\u5165\u4e00\u4e2a\u5927\u4e8e\u6216\u7b49\u4e8e {0} \u7684\u503c")
		},
		autoCreateRanges: false,
		prototype: {
			init: function() {
				this.labelContainer = $(this.settings.errorLabelContainer);
				this.errorContext = this.labelContainer.length && this.labelContainer || $(this.currentForm);
				this.containers = $(this.settings.errorContainer).add(this.settings.errorLabelContainer);
				this.submitted = {};
				this.valueCache = {};
				this.pendingRequest = 0;
				this.pending = {};
				this.invalid = {};
				this.reset();
				var groups = this.groups = {},
					rules;
				$.each(this.settings.groups, function(key, value) {
					if (typeof value === "string") value = value.split(/\s/);
					$.each(value, function(index, name) {
						groups[name] = key
					})
				});
				rules = this.settings.rules;
				$.each(rules, function(key, value) {
					rules[key] = $.validator.normalizeRule(value)
				});

				function delegate(event) {
					var validator = $.data(this[0].form, "validator"),
						eventType = "on" + event.type.replace(/^validate/, ""),
						settings = validator.settings;
					if (settings[eventType] && !this.is(settings.ignore)) settings[eventType].call(validator, this[0], event)
				}
				$(this.currentForm).validateDelegate(":text, [type='password'], [type='file'], select, textarea, " + "[type='number'], [type='search'] ,[type='tel'], [type='url'], " + "[type='email'], [type='datetime'], [type='date'], [type='month'], " + "[type='week'], [type='time'], [type='datetime-local'], " + "[type='range'], [type='color'], [type='radio'], [type='checkbox']", "focusin focusout keyup", delegate).validateDelegate("select, option, [type='radio'], [type='checkbox']", "click", delegate);
				if (this.settings.invalidHandler) $(this.currentForm).bind("invalid-form.validate", this.settings.invalidHandler);
				$(this.currentForm).find("[required], [data-rule-required], .required").attr("aria-required", "true")
			},
			form: function() {
				this.checkForm();
				$.extend(this.submitted, this.errorMap);
				this.invalid = $.extend({}, this.errorMap);
				if (!this.valid()) $(this.currentForm).triggerHandler("invalid-form", [this]);
				this.showErrors();
				return this.valid()
			},
			checkForm: function() {
				this.prepareForm();
				for (var i = 0, elements = this.currentElements = this.elements(); elements[i]; i++) this.check(elements[i]);
				return this.valid()
			},
			element: function(element) {
				var cleanElement = this.clean(element),
					checkElement = this.validationTargetFor(cleanElement),
					result = true;
				this.lastElement = checkElement;
				if (checkElement === undefined) delete this.invalid[cleanElement.name];
				else {
					this.prepareElement(checkElement);
					this.currentElements = $(checkElement);
					result = this.check(checkElement) !== false;
					if (result) delete this.invalid[checkElement.name];
					else this.invalid[checkElement.name] = true
				}
				$(element).attr("aria-invalid", !result);
				if (!this.numberOfInvalids()) this.toHide = this.toHide.add(this.containers);
				this.showErrors();
				return result
			},
			showErrors: function(errors) {
				if (errors) {
					$.extend(this.errorMap, errors);
					this.errorList = [];
					for (var name in errors) this.errorList.push({
						message: errors[name],
						element: this.findByName(name)[0]
					});
					this.successList = $.grep(this.successList, function(element) {
						return !(element.name in errors)
					})
				}
				if (this.settings.showErrors) this.settings.showErrors.call(this, this.errorMap, this.errorList);
				else this.defaultShowErrors()
			},
			resetForm: function() {
				if ($.fn.resetForm) $(this.currentForm).resetForm();
				this.submitted = {};
				this.lastElement = null;
				this.prepareForm();
				this.hideErrors();
				this.elements().removeClass(this.settings.errorClass).removeData("previousValue").removeAttr("aria-invalid")
			},
			numberOfInvalids: function() {
				return this.objectLength(this.invalid)
			},
			objectLength: function(obj) {
				var count = 0,
					i;
				for (i in obj) count++;
				return count
			},
			hideErrors: function() {
				this.hideThese(this.toHide)
			},
			hideThese: function(errors) {
				errors.not(this.containers).text("");
				this.addWrapper(errors).hide()
			},
			valid: function() {
				return this.size() === 0
			},
			size: function() {
				return this.errorList.length
			},
			focusInvalid: function() {
				if (this.settings.focusInvalid) try {
					$(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin")
				} catch (e) {}
			},
			findLastActive: function() {
				var lastActive = this.lastActive;
				return lastActive && $.grep(this.errorList, function(n) {
					return n.element.name === lastActive.name
				}).length === 1 && lastActive
			},
			elements: function() {
				var validator = this,
					rulesCache = {};
				return $(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function() {
					if (!this.name && validator.settings.debug && window.console) console.error("%o has no name assigned", this);
					if (this.name in rulesCache || !validator.objectLength($(this).rules())) return false;
					rulesCache[this.name] = true;
					return true
				})
			},
			clean: function(selector) {
				return $(selector)[0]
			},
			errors: function() {
				var errorClass = this.settings.errorClass.split(" ").join(".");
				return $(this.settings.errorElement + "." + errorClass, this.errorContext)
			},
			reset: function() {
				this.successList = [];
				this.errorList = [];
				this.errorMap = {};
				this.toShow = $([]);
				this.toHide = $([]);
				this.currentElements = $([])
			},
			prepareForm: function() {
				this.reset();
				this.toHide = this.errors().add(this.containers)
			},
			prepareElement: function(element) {
				this.reset();
				this.toHide = this.errorsFor(element)
			},
			elementValue: function(element) {
				var val, $element = $(element),
					type = element.type;
				if (type === "radio" || type === "checkbox") return $("input[name='" + element.name + "']:checked").val();
				else if (type === "number" && typeof element.validity !== "undefined") return element.validity.badInput ? false : $element.val();
				val = $element.val();
				if (typeof val === "string") return val.replace(/\r/g, "");
				return val
			},
			check: function(element) {
				element = this.validationTargetFor(this.clean(element));
				var rules = $(element).rules(),
					rulesCount = $.map(rules, function(n, i) {
						return i
					}).length,
					dependencyMismatch = false,
					val = this.elementValue(element),
					result, method, rule;
				for (method in rules) {
					rule = {
						method: method,
						parameters: rules[method]
					};
					try {
						result = $.validator.methods[method].call(this, val, element, rule.parameters);
						if (result === "dependency-mismatch" && rulesCount === 1) {
							dependencyMismatch = true;
							continue
						}
						dependencyMismatch = false;
						if (result === "pending") {
							this.toHide = this.toHide.not(this.errorsFor(element));
							return
						}
						if (!result) {
							this.formatAndAdd(element, rule);
							return false
						}
					} catch (e) {
						if (this.settings.debug && window.console);
						throw e;
					}
				}
				if (dependencyMismatch) return;
				if (this.objectLength(rules)) this.successList.push(element);
				return true
			},
			customDataMessage: function(element, method) {
				return $(element).data("msg" + method.charAt(0).toUpperCase() + method.substring(1).toLowerCase()) || $(element).data("msg")
			},
			customMessage: function(name, method) {
				var m = this.settings.messages[name];
				return m && (m.constructor === String ? m : m[method])
			},
			findDefined: function() {
				for (var i = 0; i < arguments.length; i++) if (arguments[i] !== undefined) return arguments[i];
				return undefined
			},
			defaultMessage: function(element, method) {
				return this.findDefined(this.customMessage(element.name, method), this.customDataMessage(element, method), !this.settings.ignoreTitle && element.title || undefined, $.validator.messages[method], "<strong>Warning: No message defined for " + element.name + "</strong>")
			},
			formatAndAdd: function(element, rule) {
				var message = this.defaultMessage(element, rule.method),
					theregex = /\$?\{(\d+)\}/g;
				if (typeof message === "function") message = message.call(this, rule.parameters, element);
				else if (theregex.test(message)) message = $.validator.format(message.replace(theregex, "{$1}"), rule.parameters);
				this.errorList.push({
					message: message,
					element: element,
					method: rule.method
				});
				this.errorMap[element.name] = message;
				this.submitted[element.name] = message
			},
			addWrapper: function(toToggle) {
				if (this.settings.wrapper) toToggle = toToggle.add(toToggle.parent(this.settings.wrapper));
				return toToggle
			},
			defaultShowErrors: function() {
				var i, elements, error;
				for (i = 0; this.errorList[i]; i++) {
					error = this.errorList[i];
					if (this.settings.highlight) this.settings.highlight.call(this, error.element, this.settings.errorClass, this.settings.validClass);
					this.showLabel(error.element, error.message)
				}
				if (this.errorList.length) this.toShow = this.toShow.add(this.containers);
				if (this.settings.success) for (i = 0; this.successList[i]; i++) this.showLabel(this.successList[i]);
				if (this.settings.unhighlight) for (i = 0, elements = this.validElements(); elements[i]; i++) this.settings.unhighlight.call(this, elements[i], this.settings.errorClass, this.settings.validClass);
				this.toHide = this.toHide.not(this.toShow);
				this.hideErrors();
				this.addWrapper(this.toShow).show()
			},
			validElements: function() {
				return this.currentElements.not(this.invalidElements())
			},
			invalidElements: function() {
				return $(this.errorList).map(function() {
					return this.element
				})
			},
			showLabel: function(element, message) {
				var place, group, errorID, error = this.errorsFor(element),
					elementID = this.idOrName(element),
					describedBy = $(element).attr("aria-describedby");
				if (error.length) {
					error.removeClass(this.settings.validClass).addClass(this.settings.errorClass);
					error.html(message)
				} else {
					error = $("<" + this.settings.errorElement + ">").attr("id", elementID + "-error").addClass(this.settings.errorClass).html(message || "");
					place = error;
					if (this.settings.wrapper) place = error.hide().show().wrap("<" + this.settings.wrapper + "/>").parent();
					if (this.labelContainer.length) this.labelContainer.append(place);
					else if (this.settings.errorPlacement) this.settings.errorPlacement(place, $(element));
					else place.insertAfter(element);
					if (error.is("label")) error.attr("for", elementID);
					else if (error.parents("label[for='" + elementID + "']").length === 0) {
						errorID = error.attr("id");
						if (!describedBy) describedBy = errorID;
						else if (!describedBy.match(new RegExp("\b" + errorID + "\b"))) describedBy += " " + errorID;
						$(element).attr("aria-describedby", describedBy);
						group = this.groups[element.name];
						if (group) $.each(this.groups, function(name, testgroup) {
							if (testgroup === group) $("[name='" + name + "']", this.currentForm).attr("aria-describedby", error.attr("id"))
						})
					}
				}
				if (!message && this.settings.success) {
					error.text("");
					if (typeof this.settings.success === "string") error.addClass(this.settings.success);
					else this.settings.success(error, element)
				}
				this.toShow = this.toShow.add(error)
			},
			errorsFor: function(element) {
				var name = this.idOrName(element),
					describer = $(element).attr("aria-describedby"),
					selector = "label[for='" + name + "'], label[for='" + name + "'] *";
				if (describer) selector = selector + ", #" + describer.replace(/\s+/g, ", #");
				return this.errors().filter(selector)
			},
			idOrName: function(element) {
				return this.groups[element.name] || (this.checkable(element) ? element.name : element.id || element.name)
			},
			validationTargetFor: function(element) {
				if (this.checkable(element)) element = this.findByName(element.name).not(this.settings.ignore)[0];
				return element
			},
			checkable: function(element) {
				return /radio|checkbox/i.test(element.type)
			},
			findByName: function(name) {
				return $(this.currentForm).find("[name='" + name + "']")
			},
			getLength: function(value, element) {
				switch (element.nodeName.toLowerCase()) {
				case "select":
					return $("option:selected", element).length;
				case "input":
					if (this.checkable(element)) return this.findByName(element.name).filter(":checked").length
				}
				return value.length
			},
			depend: function(param, element) {
				return this.dependTypes[typeof param] ? this.dependTypes[typeof param](param, element) : true
			},
			dependTypes: {
				"boolean": function(param) {
					return param
				},
				"string": function(param, element) {
					return !!$(param, element.form).length
				},
				"function": function(param, element) {
					return param(element)
				}
			},
			optional: function(element) {
				var val = this.elementValue(element);
				return !$.validator.methods.required.call(this, val, element) && "dependency-mismatch"
			},
			startRequest: function(element) {
				if (!this.pending[element.name]) {
					this.pendingRequest++;
					this.pending[element.name] = true
				}
			},
			stopRequest: function(element, valid) {
				this.pendingRequest--;
				if (this.pendingRequest < 0) this.pendingRequest = 0;
				delete this.pending[element.name];
				if (valid && this.pendingRequest === 0 && this.formSubmitted && this.form()) {
					$(this.currentForm).submit();
					this.formSubmitted = false
				} else if (!valid && this.pendingRequest === 0 && this.formSubmitted) {
					$(this.currentForm).triggerHandler("invalid-form", [this]);
					this.formSubmitted = false
				}
			},
			previousValue: function(element) {
				return $.data(element, "previousValue") || $.data(element, "previousValue", {
					old: null,
					valid: true,
					message: this.defaultMessage(element, "remote")
				})
			}
		},
		classRuleSettings: {
			required: {
				required: true
			},
			email: {
				email: true
			},
			url: {
				url: true
			},
			date: {
				date: true
			},
			dateISO: {
				dateISO: true
			},
			number: {
				number: true
			},
			digits: {
				digits: true
			},
			creditcard: {
				creditcard: true
			}
		},
		addClassRules: function(className, rules) {
			if (className.constructor === String) this.classRuleSettings[className] = rules;
			else $.extend(this.classRuleSettings, className)
		},
		classRules: function(element) {
			var rules = {},
				classes = $(element).attr("class");
			if (classes) $.each(classes.split(" "), function() {
				if (this in $.validator.classRuleSettings) $.extend(rules, $.validator.classRuleSettings[this])
			});
			return rules
		},
		attributeRules: function(element) {
			var rules = {},
				$element = $(element),
				type = element.getAttribute("type"),
				method, value;
			for (method in $.validator.methods) {
				if (method === "required") {
					value = element.getAttribute(method);
					if (value === "") value = true;
					value = !! value
				} else value = $element.attr(method);
				if (/min|max/.test(method) && (type === null || /number|range|text/.test(type))) value = Number(value);
				if (value || value === 0) rules[method] = value;
				else if (type === method && type !== "range") rules[method] = true
			}
			if (rules.maxlength && /-1|2147483647|524288/.test(rules.maxlength)) delete rules.maxlength;
			return rules
		},
		dataRules: function(element) {
			var method, value, rules = {},
				$element = $(element);
			for (method in $.validator.methods) {
				value = $element.data("rule" + method.charAt(0).toUpperCase() + method.substring(1).toLowerCase());
				if (value !== undefined) rules[method] = value
			}
			return rules
		},
		staticRules: function(element) {
			var rules = {},
				validator = $.data(element.form, "validator");
			if (validator.settings.rules) rules = $.validator.normalizeRule(validator.settings.rules[element.name]) || {};
			return rules
		},
		normalizeRules: function(rules, element) {
			$.each(rules, function(prop, val) {
				if (val === false) {
					delete rules[prop];
					return
				}
				if (val.param || val.depends) {
					var keepRule = true;
					switch (typeof val.depends) {
					case "string":
						keepRule = !! $(val.depends, element.form).length;
						break;
					case "function":
						keepRule = val.depends.call(element, element);
						break
					}
					if (keepRule) rules[prop] = val.param !== undefined ? val.param : true;
					else delete rules[prop]
				}
			});
			$.each(rules, function(rule, parameter) {
				rules[rule] = $.isFunction(parameter) ? parameter(element) : parameter
			});
			$.each(["minlength", "maxlength"], function() {
				if (rules[this]) rules[this] = Number(rules[this])
			});
			$.each(["rangelength", "range"], function() {
				var parts;
				if (rules[this]) if ($.isArray(rules[this])) rules[this] = [Number(rules[this][0]), Number(rules[this][1])];
				else if (typeof rules[this] === "string") {
					parts = rules[this].replace(/[\[\]]/g, "").split(/[\s,]+/);
					rules[this] = [Number(parts[0]), Number(parts[1])]
				}
			});
			if ($.validator.autoCreateRanges) {
				if (rules.min && rules.max) {
					rules.range = [rules.min, rules.max];
					delete rules.min;
					delete rules.max
				}
				if (rules.minlength && rules.maxlength) {
					rules.rangelength = [rules.minlength, rules.maxlength];
					delete rules.minlength;
					delete rules.maxlength
				}
			}
			return rules
		},
		normalizeRule: function(data) {
			if (typeof data === "string") {
				var transformed = {};
				$.each(data.split(/\s/), function() {
					transformed[this] = true
				});
				data = transformed
			}
			return data
		},
		addMethod: function(name, method, message) {
			$.validator.methods[name] = method;
			$.validator.messages[name] = message !== undefined ? message : $.validator.messages[name];
			if (method.length < 3) $.validator.addClassRules(name, $.validator.normalizeRule(name))
		},
		methods: {
			required: function(value, element, param) {
				if (!this.depend(param, element)) return "dependency-mismatch";
				if (element.nodeName.toLowerCase() === "select") {
					var val = $(element).val();
					return val && val.length > 0
				}
				if (this.checkable(element)) return this.getLength(value, element) > 0;
				return $.trim(value).length > 0
			},
			email: function(value, element) {
				return this.optional(element) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value)
			},
			url: function(value, element) {
				return this.optional(element) || /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value)
			},
			date: function(value, element) {
				return this.optional(element) || !/Invalid|NaN/.test((new Date(value)).toString())
			},
			dateISO: function(value, element) {
				return this.optional(element) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value)
			},
			number: function(value, element) {
				return this.optional(element) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value)
			},
			digits: function(value, element) {
				return this.optional(element) || /^\d+$/.test(value)
			},
			creditcard: function(value, element) {
				if (this.optional(element)) return "dependency-mismatch";
				if (/[^0-9 \-]+/.test(value)) return false;
				var nCheck = 0,
					nDigit = 0,
					bEven = false,
					n, cDigit;
				value = value.replace(/\D/g, "");
				if (value.length < 13 || value.length > 19) return false;
				for (n = value.length - 1; n >= 0; n--) {
					cDigit = value.charAt(n);
					nDigit = parseInt(cDigit, 10);
					if (bEven) if ((nDigit *= 2) > 9) nDigit -= 9;
					nCheck += nDigit;
					bEven = !bEven
				}
				return nCheck % 10 === 0
			},
			minlength: function(value, element, param) {
				var length = $.isArray(value) ? value.length : this.getLength($.trim(value), element);
				return this.optional(element) || length >= param
			},
			maxlength: function(value, element, param) {
				var length = $.isArray(value) ? value.length : this.getLength($.trim(value), element);
				return this.optional(element) || length <= param
			},
			rangelength: function(value, element, param) {
				var length = $.isArray(value) ? value.length : this.getLength($.trim(value), element);
				return this.optional(element) || length >= param[0] && length <= param[1]
			},
			min: function(value, element, param) {
				return this.optional(element) || value >= param
			},
			max: function(value, element, param) {
				return this.optional(element) || value <= param
			},
			range: function(value, element, param) {
				return this.optional(element) || value >= param[0] && value <= param[1]
			},
			equalTo: function(value, element, param) {
				var target = $(param);
				if (this.settings.onfocusout) target.unbind(".validate-equalTo").bind("blur.validate-equalTo", function() {
					$(element).valid()
				});
				return value === target.val()
			},
			remote: function(value, element, param) {
				if (this.optional(element)) return "dependency-mismatch";
				var previous = this.previousValue(element),
					validator, data;
				if (!this.settings.messages[element.name]) this.settings.messages[element.name] = {};
				previous.originalMessage = this.settings.messages[element.name].remote;
				this.settings.messages[element.name].remote = previous.message;
				param = typeof param === "string" && {
					url: param
				} || param;
				if (previous.old === value) return previous.valid;
				previous.old = value;
				validator = this;
				this.startRequest(element);
				data = {};
				data[element.name] = value;
				$.ajax($.extend(true, {
					url: param,
					mode: "abort",
					port: "validate" + element.name,
					dataType: "json",
					data: data,
					context: validator.currentForm,
					success: function(response) {
						var valid = response === true || response === "true",
							errors, message, submitted;
						validator.settings.messages[element.name].remote = previous.originalMessage;
						if (valid) {
							submitted = validator.formSubmitted;
							validator.prepareElement(element);
							validator.formSubmitted = submitted;
							validator.successList.push(element);
							delete validator.invalid[element.name];
							validator.showErrors()
						} else {
							errors = {};
							message = response || validator.defaultMessage(element, "remote");
							errors[element.name] = previous.message = $.isFunction(message) ? message(value) : message;
							validator.invalid[element.name] = true;
							validator.showErrors(errors)
						}
						previous.valid = valid;
						validator.stopRequest(element, valid)
					}
				}, param));
				return "pending"
			}
		}
	});
	$.format = function deprecated() {
		throw "$.format has been deprecated. Please use $.validator.format instead.";
	};
	var pendingRequests = {},
		ajax;
	if ($.ajaxPrefilter) $.ajaxPrefilter(function(settings, _, xhr) {
		var port = settings.port;
		if (settings.mode === "abort") {
			if (pendingRequests[port]) pendingRequests[port].abort();
			pendingRequests[port] = xhr
		}
	});
	else {
		ajax = $.ajax;
		$.ajax = function(settings) {
			var mode = ("mode" in settings ? settings : $.ajaxSettings).mode,
				port = ("port" in settings ? settings : $.ajaxSettings).port;
			if (mode === "abort") {
				if (pendingRequests[port]) pendingRequests[port].abort();
				pendingRequests[port] = ajax.apply(this, arguments);
				return pendingRequests[port]
			}
			return ajax.apply(this, arguments)
		}
	}
	$.extend($.fn, {
		validateDelegate: function(delegate, type, handler) {
			return this.bind(type, function(event) {
				var target = $(event.target);
				if (target.is(delegate)) return handler.apply(target, arguments)
			})
		}
	})
});

function FastClick(layer, options) {
	var oldOnClick;
	options = options || {};
	this.trackingClick = false;
	this.trackingClickStart = 0;
	this.targetElement = null;
	this.touchStartX = 0;
	this.touchStartY = 0;
	this.lastTouchIdentifier = 0;
	this.touchBoundary = options.touchBoundary || 10;
	this.layer = layer;
	this.tapDelay = options.tapDelay || 200;
	if (FastClick.notNeeded(layer)) return;

	function bind(method, context) {
		return function() {
			return method.apply(context, arguments)
		}
	}
	var methods = ["onMouse", "onClick", "onTouchStart", "onTouchMove", "onTouchEnd", "onTouchCancel"];
	var context = this;
	for (var i = 0, l = methods.length; i < l; i++) context[methods[i]] = bind(context[methods[i]], context);
	if (deviceIsAndroid) {
		layer.addEventListener("mouseover", this.onMouse, true);
		layer.addEventListener("mousedown", this.onMouse, true);
		layer.addEventListener("mouseup", this.onMouse, true)
	}
	layer.addEventListener("click", this.onClick, true);
	layer.addEventListener("touchstart", this.onTouchStart, false);
	layer.addEventListener("touchmove", this.onTouchMove, false);
	layer.addEventListener("touchend", this.onTouchEnd, false);
	layer.addEventListener("touchcancel", this.onTouchCancel, false);
	if (!Event.prototype.stopImmediatePropagation) {
		layer.removeEventListener = function(type, callback, capture) {
			var rmv = Node.prototype.removeEventListener;
			if (type === "click") rmv.call(layer, type, callback.hijacked || callback, capture);
			else rmv.call(layer, type, callback, capture)
		};
		layer.addEventListener = function(type, callback, capture) {
			var adv = Node.prototype.addEventListener;
			if (type === "click") adv.call(layer, type, callback.hijacked || (callback.hijacked = function(event) {
				if (!event.propagationStopped) callback(event)
			}), capture);
			else adv.call(layer, type, callback, capture)
		}
	}
	if (typeof layer.onclick === "function") {
		oldOnClick = layer.onclick;
		layer.addEventListener("click", function(event) {
			oldOnClick(event)
		}, false);
		layer.onclick = null
	}
}
var deviceIsAndroid = navigator.userAgent.indexOf("Android") > 0;
var deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent);
var deviceIsIOS4 = deviceIsIOS && /OS 4_\d(_\d)?/.test(navigator.userAgent);
var deviceIsIOSWithBadTarget = deviceIsIOS && /OS ([6-9]|\d{2})_\d/.test(navigator.userAgent);
var deviceIsBlackBerry10 = navigator.userAgent.indexOf("BB10") > 0;
FastClick.prototype.needsClick = function(target) {
	switch (target.nodeName.toLowerCase()) {
	case "button":
	case "select":
	case "textarea":
		if (target.disabled) return true;
		break;
	case "input":
		if (deviceIsIOS && target.type === "file" || target.disabled) return true;
		break;
	case "label":
	case "video":
		return true
	}
	return /\bneedsclick\b/.test(target.className)
};
FastClick.prototype.needsFocus = function(target) {
	switch (target.nodeName.toLowerCase()) {
	case "textarea":
		return true;
	case "select":
		return !deviceIsAndroid;
	case "input":
		switch (target.type) {
		case "button":
		case "checkbox":
		case "file":
		case "image":
		case "radio":
		case "submit":
			return false
		}
		return !target.disabled && !target.readOnly;
	default:
		return /\bneedsfocus\b/.test(target.className)
	}
};
FastClick.prototype.sendClick = function(targetElement, event) {
	var clickEvent, touch;
	if (document.activeElement && document.activeElement !== targetElement) document.activeElement.blur();
	touch = event.changedTouches[0];
	clickEvent = document.createEvent("MouseEvents");
	clickEvent.initMouseEvent(this.determineEventType(targetElement), true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
	clickEvent.forwardedTouchEvent = true;
	targetElement.dispatchEvent(clickEvent)
};
FastClick.prototype.determineEventType = function(targetElement) {
	if (deviceIsAndroid && targetElement.tagName.toLowerCase() === "select") return "mousedown";
	return "click"
};
FastClick.prototype.focus = function(targetElement) {
	var length;
	if (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf("date") !== 0 && targetElement.type !== "time") {
		length = targetElement.value.length;
		targetElement.setSelectionRange(length, length)
	} else targetElement.focus()
};
FastClick.prototype.updateScrollParent = function(targetElement) {
	var scrollParent, parentElement;
	scrollParent = targetElement.fastClickScrollParent;
	if (!scrollParent || !scrollParent.contains(targetElement)) {
		parentElement = targetElement;
		do {
			if (parentElement.scrollHeight > parentElement.offsetHeight) {
				scrollParent = parentElement;
				targetElement.fastClickScrollParent = parentElement;
				break
			}
			parentElement = parentElement.parentElement
		} while (parentElement)
	}
	if (scrollParent) scrollParent.fastClickLastScrollTop = scrollParent.scrollTop
};
FastClick.prototype.getTargetElementFromEventTarget = function(eventTarget) {
	if (eventTarget.nodeType === Node.TEXT_NODE) return eventTarget.parentNode;
	return eventTarget
};
FastClick.prototype.onTouchStart = function(event) {
	var targetElement, touch, selection;
	if (event.targetTouches.length > 1) return true;
	targetElement = this.getTargetElementFromEventTarget(event.target);
	touch = event.targetTouches[0];
	if (deviceIsIOS) {
		selection = window.getSelection();
		if (selection.rangeCount && !selection.isCollapsed) return true;
		if (!deviceIsIOS4) {
			if (touch.identifier && touch.identifier === this.lastTouchIdentifier) {
				event.preventDefault();
				return false
			}
			this.lastTouchIdentifier = touch.identifier;
			this.updateScrollParent(targetElement)
		}
	}
	this.trackingClick = true;
	this.trackingClickStart = event.timeStamp;
	this.targetElement = targetElement;
	this.touchStartX = touch.pageX;
	this.touchStartY = touch.pageY;
	if (event.timeStamp - this.lastClickTime < this.tapDelay) event.preventDefault();
	return true
};
FastClick.prototype.touchHasMoved = function(event) {
	var touch = event.changedTouches[0],
		boundary = this.touchBoundary;
	if (Math.abs(touch.pageX - this.touchStartX) > boundary || Math.abs(touch.pageY - this.touchStartY) > boundary) return true;
	return false
};
FastClick.prototype.onTouchMove = function(event) {
	if (!this.trackingClick) return true;
	if (this.targetElement !== this.getTargetElementFromEventTarget(event.target) || this.touchHasMoved(event)) {
		this.trackingClick = false;
		this.targetElement = null
	}
	return true
};
FastClick.prototype.findControl = function(labelElement) {
	if (labelElement.control !== undefined) return labelElement.control;
	if (labelElement.htmlFor) return document.getElementById(labelElement.htmlFor);
	return labelElement.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")
};
FastClick.prototype.onTouchEnd = function(event) {
	var forElement, trackingClickStart, targetTagName, scrollParent, touch, targetElement = this.targetElement;
	if (!this.trackingClick) return true;
	if (event.timeStamp - this.lastClickTime < this.tapDelay) {
		this.cancelNextClick = true;
		return true
	}
	this.cancelNextClick = false;
	this.lastClickTime = event.timeStamp;
	trackingClickStart = this.trackingClickStart;
	this.trackingClick = false;
	this.trackingClickStart = 0;
	if (deviceIsIOSWithBadTarget) {
		touch = event.changedTouches[0];
		targetElement = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset) || targetElement;
		targetElement.fastClickScrollParent = this.targetElement.fastClickScrollParent
	}
	targetTagName = targetElement.tagName.toLowerCase();
	if (targetTagName === "label") {
		forElement = this.findControl(targetElement);
		if (forElement) {
			this.focus(targetElement);
			if (deviceIsAndroid) return false;
			targetElement = forElement
		}
	} else if (this.needsFocus(targetElement)) {
		if (event.timeStamp - trackingClickStart > 100 || deviceIsIOS && window.top !== window && targetTagName === "input") {
			this.targetElement = null;
			return false
		}
		this.focus(targetElement);
		this.sendClick(targetElement, event);
		if (!deviceIsIOS || targetTagName !== "select") {
			this.targetElement = null;
			event.preventDefault()
		}
		return false
	}
	if (deviceIsIOS && !deviceIsIOS4) {
		scrollParent = targetElement.fastClickScrollParent;
		if (scrollParent && scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop) return true
	}
	if (!this.needsClick(targetElement)) {
		event.preventDefault();
		this.sendClick(targetElement, event)
	}
	return false
};
FastClick.prototype.onTouchCancel = function() {
	this.trackingClick = false;
	this.targetElement = null
};
FastClick.prototype.onMouse = function(event) {
	if (!this.targetElement) return true;
	if (event.forwardedTouchEvent) return true;
	if (!event.cancelable) return true;
	if (!this.needsClick(this.targetElement) || this.cancelNextClick) {
		if (event.stopImmediatePropagation) event.stopImmediatePropagation();
		else event.propagationStopped = true;
		event.stopPropagation();
		event.preventDefault();
		return false
	}
	return true
};
FastClick.prototype.onClick = function(event) {
	var permitted;
	if (this.trackingClick) {
		this.targetElement = null;
		this.trackingClick = false;
		return true
	}
	if (event.target.type === "submit" && event.detail === 0) return true;
	permitted = this.onMouse(event);
	if (!permitted) this.targetElement = null;
	return permitted
};
FastClick.prototype.destroy = function() {
	var layer = this.layer;
	if (deviceIsAndroid) {
		layer.removeEventListener("mouseover", this.onMouse, true);
		layer.removeEventListener("mousedown", this.onMouse, true);
		layer.removeEventListener("mouseup", this.onMouse, true)
	}
	layer.removeEventListener("click", this.onClick, true);
	layer.removeEventListener("touchstart", this.onTouchStart, false);
	layer.removeEventListener("touchmove", this.onTouchMove, false);
	layer.removeEventListener("touchend", this.onTouchEnd, false);
	layer.removeEventListener("touchcancel", this.onTouchCancel, false)
};
FastClick.notNeeded = function(layer) {
	var metaViewport;
	var chromeVersion;
	var blackberryVersion;
	if (typeof window.ontouchstart === "undefined") return true;
	chromeVersion = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1];
	if (chromeVersion) if (deviceIsAndroid) {
		metaViewport = document.querySelector("meta[name=viewport]");
		if (metaViewport) {
			if (metaViewport.content.indexOf("user-scalable=no") !== -1) return true;
			if (chromeVersion > 31 && document.documentElement.scrollWidth <= window.outerWidth) return true
		}
	} else return true;
	if (deviceIsBlackBerry10) {
		blackberryVersion = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/);
		if (blackberryVersion[1] >= 10 && blackberryVersion[2] >= 3) {
			metaViewport = document.querySelector("meta[name=viewport]");
			if (metaViewport) {
				if (metaViewport.content.indexOf("user-scalable=no") !== -1) return true;
				if (document.documentElement.scrollWidth <= window.outerWidth) return true
			}
		}
	}
	if (layer.style.msTouchAction === "none") return true;
	return false
};
FastClick.attach = function(layer, options) {
	return new FastClick(layer, options)
};
if (typeof define == "function" && typeof define.amd == "object" && define.amd) define(function() {
	return FastClick
});
else if (typeof module !== "undefined" && module.exports) {
	module.exports = FastClick.attach;
	module.exports.FastClick = FastClick
} else window.FastClick = FastClick;
var QRCode;
(function() {
	function QR8bitByte(data) {
		this.mode = QRMode.MODE_8BIT_BYTE;
		this.data = data;
		this.parsedData = [];
		for (var i = 0, l = this.data.length; i < l; i++) {
			var byteArray = [];
			var code = this.data.charCodeAt(i);
			if (code > 65536) {
				byteArray[0] = 240 | (code & 1835008) >>> 18;
				byteArray[1] = 128 | (code & 258048) >>> 12;
				byteArray[2] = 128 | (code & 4032) >>> 6;
				byteArray[3] = 128 | code & 63
			} else if (code > 2048) {
				byteArray[0] = 224 | (code & 61440) >>> 12;
				byteArray[1] = 128 | (code & 4032) >>> 6;
				byteArray[2] = 128 | code & 63
			} else if (code > 128) {
				byteArray[0] = 192 | (code & 1984) >>> 6;
				byteArray[1] = 128 | code & 63
			} else byteArray[0] = code;
			this.parsedData.push(byteArray)
		}
		this.parsedData = Array.prototype.concat.apply([], this.parsedData);
		if (this.parsedData.length != this.data.length) {
			this.parsedData.unshift(191);
			this.parsedData.unshift(187);
			this.parsedData.unshift(239)
		}
	}
	QR8bitByte.prototype = {
		getLength: function(buffer) {
			return this.parsedData.length
		},
		write: function(buffer) {
			for (var i = 0, l = this.parsedData.length; i < l; i++) buffer.put(this.parsedData[i], 8)
		}
	};

	function QRCodeModel(typeNumber, errorCorrectLevel) {
		this.typeNumber = typeNumber;
		this.errorCorrectLevel = errorCorrectLevel;
		this.modules = null;
		this.moduleCount = 0;
		this.dataCache = null;
		this.dataList = []
	}
	QRCodeModel.prototype = {
		addData: function(data) {
			var newData = new QR8bitByte(data);
			this.dataList.push(newData);
			this.dataCache = null
		},
		isDark: function(row, col) {
			if (row < 0 || this.moduleCount <= row || col < 0 || this.moduleCount <= col) throw new Error(row + "," + col);
			return this.modules[row][col]
		},
		getModuleCount: function() {
			return this.moduleCount
		},
		make: function() {
			this.makeImpl(false, this.getBestMaskPattern())
		},
		makeImpl: function(test, maskPattern) {
			this.moduleCount = this.typeNumber * 4 + 17;
			this.modules = new Array(this.moduleCount);
			for (var row = 0; row < this.moduleCount; row++) {
				this.modules[row] = new Array(this.moduleCount);
				for (var col = 0; col < this.moduleCount; col++) this.modules[row][col] = null
			}
			this.setupPositionProbePattern(0, 0);
			this.setupPositionProbePattern(this.moduleCount - 7, 0);
			this.setupPositionProbePattern(0, this.moduleCount - 7);
			this.setupPositionAdjustPattern();
			this.setupTimingPattern();
			this.setupTypeInfo(test, maskPattern);
			if (this.typeNumber >= 7) this.setupTypeNumber(test);
			if (this.dataCache == null) this.dataCache = QRCodeModel.createData(this.typeNumber, this.errorCorrectLevel, this.dataList);
			this.mapData(this.dataCache, maskPattern)
		},
		setupPositionProbePattern: function(row, col) {
			for (var r = -1; r <= 7; r++) {
				if (row + r <= -1 || this.moduleCount <= row + r) continue;
				for (var c = -1; c <= 7; c++) {
					if (col + c <= -1 || this.moduleCount <= col + c) continue;
					if (0 <= r && r <= 6 && (c == 0 || c == 6) || 0 <= c && c <= 6 && (r == 0 || r == 6) || 2 <= r && r <= 4 && 2 <= c && c <= 4) this.modules[row + r][col + c] = true;
					else this.modules[row + r][col + c] = false
				}
			}
		},
		getBestMaskPattern: function() {
			var minLostPoint = 0;
			var pattern = 0;
			for (var i = 0; i < 8; i++) {
				this.makeImpl(true, i);
				var lostPoint = QRUtil.getLostPoint(this);
				if (i == 0 || minLostPoint > lostPoint) {
					minLostPoint = lostPoint;
					pattern = i
				}
			}
			return pattern
		},
		createMovieClip: function(target_mc, instance_name, depth) {
			var qr_mc = target_mc.createEmptyMovieClip(instance_name, depth);
			var cs = 1;
			this.make();
			for (var row = 0; row < this.modules.length; row++) {
				var y = row * cs;
				for (var col = 0; col < this.modules[row].length; col++) {
					var x = col * cs;
					var dark = this.modules[row][col];
					if (dark) {
						qr_mc.beginFill(0, 100);
						qr_mc.moveTo(x, y);
						qr_mc.lineTo(x + cs, y);
						qr_mc.lineTo(x + cs, y + cs);
						qr_mc.lineTo(x, y + cs);
						qr_mc.endFill()
					}
				}
			}
			return qr_mc
		},
		setupTimingPattern: function() {
			for (var r = 8; r < this.moduleCount - 8; r++) {
				if (this.modules[r][6] != null) continue;
				this.modules[r][6] = r % 2 == 0
			}
			for (var c = 8; c < this.moduleCount - 8; c++) {
				if (this.modules[6][c] != null) continue;
				this.modules[6][c] = c % 2 == 0
			}
		},
		setupPositionAdjustPattern: function() {
			var pos = QRUtil.getPatternPosition(this.typeNumber);
			for (var i = 0; i < pos.length; i++) for (var j = 0; j < pos.length; j++) {
				var row = pos[i];
				var col = pos[j];
				if (this.modules[row][col] != null) continue;
				for (var r = -2; r <= 2; r++) for (var c = -2; c <= 2; c++) if (r == -2 || r == 2 || c == -2 || c == 2 || r == 0 && c == 0) this.modules[row + r][col + c] = true;
				else this.modules[row + r][col + c] = false
			}
		},
		setupTypeNumber: function(test) {
			var bits = QRUtil.getBCHTypeNumber(this.typeNumber);
			for (var i = 0; i < 18; i++) {
				var mod = !test && (bits >> i & 1) == 1;
				this.modules[Math.floor(i / 3)][i % 3 + this.moduleCount - 8 - 3] = mod
			}
			for (var i = 0; i < 18; i++) {
				var mod = !test && (bits >> i & 1) == 1;
				this.modules[i % 3 + this.moduleCount - 8 - 3][Math.floor(i / 3)] = mod
			}
		},
		setupTypeInfo: function(test, maskPattern) {
			var data = this.errorCorrectLevel << 3 | maskPattern;
			var bits = QRUtil.getBCHTypeInfo(data);
			for (var i = 0; i < 15; i++) {
				var mod = !test && (bits >> i & 1) == 1;
				if (i < 6) this.modules[i][8] = mod;
				else if (i < 8) this.modules[i + 1][8] = mod;
				else this.modules[this.moduleCount - 15 + i][8] = mod
			}
			for (var i = 0; i < 15; i++) {
				var mod = !test && (bits >> i & 1) == 1;
				if (i < 8) this.modules[8][this.moduleCount - i - 1] = mod;
				else if (i < 9) this.modules[8][15 - i - 1 + 1] = mod;
				else this.modules[8][15 - i - 1] = mod
			}
			this.modules[this.moduleCount - 8][8] = !test
		},
		mapData: function(data, maskPattern) {
			var inc = -1;
			var row = this.moduleCount - 1;
			var bitIndex = 7;
			var byteIndex = 0;
			for (var col = this.moduleCount - 1; col > 0; col -= 2) {
				if (col == 6) col--;
				while (true) {
					for (var c = 0; c < 2; c++) if (this.modules[row][col - c] == null) {
						var dark = false;
						if (byteIndex < data.length) dark = (data[byteIndex] >>> bitIndex & 1) == 1;
						var mask = QRUtil.getMask(maskPattern, row, col - c);
						if (mask) dark = !dark;
						this.modules[row][col - c] = dark;
						bitIndex--;
						if (bitIndex == -1) {
							byteIndex++;
							bitIndex = 7
						}
					}
					row += inc;
					if (row < 0 || this.moduleCount <= row) {
						row -= inc;
						inc = -inc;
						break
					}
				}
			}
		}
	};
	QRCodeModel.PAD0 = 236;
	QRCodeModel.PAD1 = 17;
	QRCodeModel.createData = function(typeNumber, errorCorrectLevel, dataList) {
		var rsBlocks = QRRSBlock.getRSBlocks(typeNumber, errorCorrectLevel);
		var buffer = new QRBitBuffer;
		for (var i = 0; i < dataList.length; i++) {
			var data = dataList[i];
			buffer.put(data.mode, 4);
			buffer.put(data.getLength(), QRUtil.getLengthInBits(data.mode, typeNumber));
			data.write(buffer)
		}
		var totalDataCount = 0;
		for (var i = 0; i < rsBlocks.length; i++) totalDataCount += rsBlocks[i].dataCount;
		if (buffer.getLengthInBits() > totalDataCount * 8) throw new Error("code length overflow. (" + buffer.getLengthInBits() + ">" + totalDataCount * 8 + ")");
		if (buffer.getLengthInBits() + 4 <= totalDataCount * 8) buffer.put(0, 4);
		while (buffer.getLengthInBits() % 8 != 0) buffer.putBit(false);
		while (true) {
			if (buffer.getLengthInBits() >= totalDataCount * 8) break;
			buffer.put(QRCodeModel.PAD0, 8);
			if (buffer.getLengthInBits() >= totalDataCount * 8) break;
			buffer.put(QRCodeModel.PAD1, 8)
		}
		return QRCodeModel.createBytes(buffer, rsBlocks)
	};
	QRCodeModel.createBytes = function(buffer, rsBlocks) {
		var offset = 0;
		var maxDcCount = 0;
		var maxEcCount = 0;
		var dcdata = new Array(rsBlocks.length);
		var ecdata = new Array(rsBlocks.length);
		for (var r = 0; r < rsBlocks.length; r++) {
			var dcCount = rsBlocks[r].dataCount;
			var ecCount = rsBlocks[r].totalCount - dcCount;
			maxDcCount = Math.max(maxDcCount, dcCount);
			maxEcCount = Math.max(maxEcCount, ecCount);
			dcdata[r] = new Array(dcCount);
			for (var i = 0; i < dcdata[r].length; i++) dcdata[r][i] = 255 & buffer.buffer[i + offset];
			offset += dcCount;
			var rsPoly = QRUtil.getErrorCorrectPolynomial(ecCount);
			var rawPoly = new QRPolynomial(dcdata[r], rsPoly.getLength() - 1);
			var modPoly = rawPoly.mod(rsPoly);
			ecdata[r] = new Array(rsPoly.getLength() - 1);
			for (var i = 0; i < ecdata[r].length; i++) {
				var modIndex = i + modPoly.getLength() - ecdata[r].length;
				ecdata[r][i] = modIndex >= 0 ? modPoly.get(modIndex) : 0
			}
		}
		var totalCodeCount = 0;
		for (var i = 0; i < rsBlocks.length; i++) totalCodeCount += rsBlocks[i].totalCount;
		var data = new Array(totalCodeCount);
		var index = 0;
		for (var i = 0; i < maxDcCount; i++) for (var r = 0; r < rsBlocks.length; r++) if (i < dcdata[r].length) data[index++] = dcdata[r][i];
		for (var i = 0; i < maxEcCount; i++) for (var r = 0; r < rsBlocks.length; r++) if (i < ecdata[r].length) data[index++] = ecdata[r][i];
		return data
	};
	var QRMode = {
		MODE_NUMBER: 1 << 0,
		MODE_ALPHA_NUM: 1 << 1,
		MODE_8BIT_BYTE: 1 << 2,
		MODE_KANJI: 1 << 3
	};
	var QRErrorCorrectLevel = {
		L: 1,
		M: 0,
		Q: 3,
		H: 2
	};
	var QRMaskPattern = {
		PATTERN000: 0,
		PATTERN001: 1,
		PATTERN010: 2,
		PATTERN011: 3,
		PATTERN100: 4,
		PATTERN101: 5,
		PATTERN110: 6,
		PATTERN111: 7
	};
	var QRUtil = {
		PATTERN_POSITION_TABLE: [
			[],
			[6, 18],
			[6, 22],
			[6, 26],
			[6, 30],
			[6, 34],
			[6, 22, 38],
			[6, 24, 42],
			[6, 26, 46],
			[6, 28, 50],
			[6, 30, 54],
			[6, 32, 58],
			[6, 34, 62],
			[6, 26, 46, 66],
			[6, 26, 48, 70],
			[6, 26, 50, 74],
			[6, 30, 54, 78],
			[6, 30, 56, 82],
			[6, 30, 58, 86],
			[6, 34, 62, 90],
			[6, 28, 50, 72, 94],
			[6, 26, 50, 74, 98],
			[6, 30, 54, 78, 102],
			[6, 28, 54, 80, 106],
			[6, 32, 58, 84, 110],
			[6, 30, 58, 86, 114],
			[6, 34, 62, 90, 118],
			[6, 26, 50, 74, 98, 122],
			[6, 30, 54, 78, 102, 126],
			[6, 26, 52, 78, 104, 130],
			[6, 30, 56, 82, 108, 134],
			[6, 34, 60, 86, 112, 138],
			[6, 30, 58, 86, 114, 142],
			[6, 34, 62, 90, 118, 146],
			[6, 30, 54, 78, 102, 126, 150],
			[6, 24, 50, 76, 102, 128, 154],
			[6, 28, 54, 80, 106, 132, 158],
			[6, 32, 58, 84, 110, 136, 162],
			[6, 26, 54, 82, 110, 138, 166],
			[6, 30, 58, 86, 114, 142, 170]
		],
		G15: 1 << 10 | 1 << 8 | 1 << 5 | 1 << 4 | 1 << 2 | 1 << 1 | 1 << 0,
		G18: 1 << 12 | 1 << 11 | 1 << 10 | 1 << 9 | 1 << 8 | 1 << 5 | 1 << 2 | 1 << 0,
		G15_MASK: 1 << 14 | 1 << 12 | 1 << 10 | 1 << 4 | 1 << 1,
		getBCHTypeInfo: function(data) {
			var d = data << 10;
			while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15) >= 0) d ^= QRUtil.G15 << QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15);
			return (data << 10 | d) ^ QRUtil.G15_MASK
		},
		getBCHTypeNumber: function(data) {
			var d = data << 12;
			while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18) >= 0) d ^= QRUtil.G18 << QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18);
			return data << 12 | d
		},
		getBCHDigit: function(data) {
			var digit = 0;
			while (data != 0) {
				digit++;
				data >>>= 1
			}
			return digit
		},
		getPatternPosition: function(typeNumber) {
			return QRUtil.PATTERN_POSITION_TABLE[typeNumber - 1]
		},
		getMask: function(maskPattern, i, j) {
			switch (maskPattern) {
			case QRMaskPattern.PATTERN000:
				return (i + j) % 2 == 0;
			case QRMaskPattern.PATTERN001:
				return i % 2 == 0;
			case QRMaskPattern.PATTERN010:
				return j % 3 == 0;
			case QRMaskPattern.PATTERN011:
				return (i + j) % 3 == 0;
			case QRMaskPattern.PATTERN100:
				return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 == 0;
			case QRMaskPattern.PATTERN101:
				return i * j % 2 + i * j % 3 == 0;
			case QRMaskPattern.PATTERN110:
				return (i * j % 2 + i * j % 3) % 2 == 0;
			case QRMaskPattern.PATTERN111:
				return (i * j % 3 + (i + j) % 2) % 2 == 0;
			default:
				throw new Error("bad maskPattern:" + maskPattern);
			}
		},
		getErrorCorrectPolynomial: function(errorCorrectLength) {
			var a = new QRPolynomial([1], 0);
			for (var i = 0; i < errorCorrectLength; i++) a = a.multiply(new QRPolynomial([1, QRMath.gexp(i)], 0));
			return a
		},
		getLengthInBits: function(mode, type) {
			if (1 <= type && type < 10) switch (mode) {
			case QRMode.MODE_NUMBER:
				return 10;
			case QRMode.MODE_ALPHA_NUM:
				return 9;
			case QRMode.MODE_8BIT_BYTE:
				return 8;
			case QRMode.MODE_KANJI:
				return 8;
			default:
				throw new Error("mode:" + mode);
			} else if (type < 27) switch (mode) {
			case QRMode.MODE_NUMBER:
				return 12;
			case QRMode.MODE_ALPHA_NUM:
				return 11;
			case QRMode.MODE_8BIT_BYTE:
				return 16;
			case QRMode.MODE_KANJI:
				return 10;
			default:
				throw new Error("mode:" + mode);
			} else if (type < 41) switch (mode) {
			case QRMode.MODE_NUMBER:
				return 14;
			case QRMode.MODE_ALPHA_NUM:
				return 13;
			case QRMode.MODE_8BIT_BYTE:
				return 16;
			case QRMode.MODE_KANJI:
				return 12;
			default:
				throw new Error("mode:" + mode);
			} else throw new Error("type:" + type);
		},
		getLostPoint: function(qrCode) {
			var moduleCount = qrCode.getModuleCount();
			var lostPoint = 0;
			for (var row = 0; row < moduleCount; row++) for (var col = 0; col < moduleCount; col++) {
				var sameCount = 0;
				var dark = qrCode.isDark(row, col);
				for (var r = -1; r <= 1; r++) {
					if (row + r < 0 || moduleCount <= row + r) continue;
					for (var c = -1; c <= 1; c++) {
						if (col + c < 0 || moduleCount <= col + c) continue;
						if (r == 0 && c == 0) continue;
						if (dark == qrCode.isDark(row + r, col + c)) sameCount++
					}
				}
				if (sameCount > 5) lostPoint += 3 + sameCount - 5
			}
			for (var row = 0; row < moduleCount - 1; row++) for (var col = 0; col < moduleCount - 1; col++) {
				var count = 0;
				if (qrCode.isDark(row, col)) count++;
				if (qrCode.isDark(row + 1, col)) count++;
				if (qrCode.isDark(row, col + 1)) count++;
				if (qrCode.isDark(row + 1, col + 1)) count++;
				if (count == 0 || count == 4) lostPoint += 3
			}
			for (var row = 0; row < moduleCount; row++) for (var col = 0; col < moduleCount - 6; col++) if (qrCode.isDark(row, col) && !qrCode.isDark(row, col + 1) && qrCode.isDark(row, col + 2) && qrCode.isDark(row, col + 3) && qrCode.isDark(row, col + 4) && !qrCode.isDark(row, col + 5) && qrCode.isDark(row, col + 6)) lostPoint += 40;
			for (var col = 0; col < moduleCount; col++) for (var row = 0; row < moduleCount - 6; row++) if (qrCode.isDark(row, col) && !qrCode.isDark(row + 1, col) && qrCode.isDark(row + 2, col) && qrCode.isDark(row + 3, col) && qrCode.isDark(row + 4, col) && !qrCode.isDark(row + 5, col) && qrCode.isDark(row + 6, col)) lostPoint += 40;
			var darkCount = 0;
			for (var col = 0; col < moduleCount; col++) for (var row = 0; row < moduleCount; row++) if (qrCode.isDark(row, col)) darkCount++;
			var ratio = Math.abs(100 * darkCount / moduleCount / moduleCount - 50) / 5;
			lostPoint += ratio * 10;
			return lostPoint
		}
	};
	var QRMath = {
		glog: function(n) {
			if (n < 1) throw new Error("glog(" + n + ")");
			return QRMath.LOG_TABLE[n]
		},
		gexp: function(n) {
			while (n < 0) n += 255;
			while (n >= 256) n -= 255;
			return QRMath.EXP_TABLE[n]
		},
		EXP_TABLE: new Array(256),
		LOG_TABLE: new Array(256)
	};
	for (var i = 0; i < 8; i++) QRMath.EXP_TABLE[i] = 1 << i;
	for (var i = 8; i < 256; i++) QRMath.EXP_TABLE[i] = QRMath.EXP_TABLE[i - 4] ^ QRMath.EXP_TABLE[i - 5] ^ QRMath.EXP_TABLE[i - 6] ^ QRMath.EXP_TABLE[i - 8];
	for (var i = 0; i < 255; i++) QRMath.LOG_TABLE[QRMath.EXP_TABLE[i]] = i;

	function QRPolynomial(num, shift) {
		if (num.length == undefined) throw new Error(num.length + "/" + shift);
		var offset = 0;
		while (offset < num.length && num[offset] == 0) offset++;
		this.num = new Array(num.length - offset + shift);
		for (var i = 0; i < num.length - offset; i++) this.num[i] = num[i + offset]
	}
	QRPolynomial.prototype = {
		get: function(index) {
			return this.num[index]
		},
		getLength: function() {
			return this.num.length
		},
		multiply: function(e) {
			var num = new Array(this.getLength() + e.getLength() - 1);
			for (var i = 0; i < this.getLength(); i++) for (var j = 0; j < e.getLength(); j++) num[i + j] ^= QRMath.gexp(QRMath.glog(this.get(i)) + QRMath.glog(e.get(j)));
			return new QRPolynomial(num, 0)
		},
		mod: function(e) {
			if (this.getLength() - e.getLength() < 0) return this;
			var ratio = QRMath.glog(this.get(0)) - QRMath.glog(e.get(0));
			var num = new Array(this.getLength());
			for (var i = 0; i < this.getLength(); i++) num[i] = this.get(i);
			for (var i = 0; i < e.getLength(); i++) num[i] ^= QRMath.gexp(QRMath.glog(e.get(i)) + ratio);
			return (new QRPolynomial(num, 0)).mod(e)
		}
	};

	function QRRSBlock(totalCount, dataCount) {
		this.totalCount = totalCount;
		this.dataCount = dataCount
	}
	QRRSBlock.RS_BLOCK_TABLE = [
		[1, 26, 19],
		[1, 26, 16],
		[1, 26, 13],
		[1, 26, 9],
		[1, 44, 34],
		[1, 44, 28],
		[1, 44, 22],
		[1, 44, 16],
		[1, 70, 55],
		[1, 70, 44],
		[2, 35, 17],
		[2, 35, 13],
		[1, 100, 80],
		[2, 50, 32],
		[2, 50, 24],
		[4, 25, 9],
		[1, 134, 108],
		[2, 67, 43],
		[2, 33, 15, 2, 34, 16],
		[2, 33, 11, 2, 34, 12],
		[2, 86, 68],
		[4, 43, 27],
		[4, 43, 19],
		[4, 43, 15],
		[2, 98, 78],
		[4, 49, 31],
		[2, 32, 14, 4, 33, 15],
		[4, 39, 13, 1, 40, 14],
		[2, 121, 97],
		[2, 60, 38, 2, 61, 39],
		[4, 40, 18, 2, 41, 19],
		[4, 40, 14, 2, 41, 15],
		[2, 146, 116],
		[3, 58, 36, 2, 59, 37],
		[4, 36, 16, 4, 37, 17],
		[4, 36, 12, 4, 37, 13],
		[2, 86, 68, 2, 87, 69],
		[4, 69, 43, 1, 70, 44],
		[6, 43, 19, 2, 44, 20],
		[6, 43, 15, 2, 44, 16],
		[4, 101, 81],
		[1, 80, 50, 4, 81, 51],
		[4, 50, 22, 4, 51, 23],
		[3, 36, 12, 8, 37, 13],
		[2, 116, 92, 2, 117, 93],
		[6, 58, 36, 2, 59, 37],
		[4, 46, 20, 6, 47, 21],
		[7, 42, 14, 4, 43, 15],
		[4, 133, 107],
		[8, 59, 37, 1, 60, 38],
		[8, 44, 20, 4, 45, 21],
		[12, 33, 11, 4, 34, 12],
		[3, 145, 115, 1, 146, 116],
		[4, 64, 40, 5, 65, 41],
		[11, 36, 16, 5, 37, 17],
		[11, 36, 12, 5, 37, 13],
		[5, 109, 87, 1, 110, 88],
		[5, 65, 41, 5, 66, 42],
		[5, 54, 24, 7, 55, 25],
		[11, 36, 12],
		[5, 122, 98, 1, 123, 99],
		[7, 73, 45, 3, 74, 46],
		[15, 43, 19, 2, 44, 20],
		[3, 45, 15, 13, 46, 16],
		[1, 135, 107, 5, 136, 108],
		[10, 74, 46, 1, 75, 47],
		[1, 50, 22, 15, 51, 23],
		[2, 42, 14, 17, 43, 15],
		[5, 150, 120, 1, 151, 121],
		[9, 69, 43, 4, 70, 44],
		[17, 50, 22, 1, 51, 23],
		[2, 42, 14, 19, 43, 15],
		[3, 141, 113, 4, 142, 114],
		[3, 70, 44, 11, 71, 45],
		[17, 47, 21, 4, 48, 22],
		[9, 39, 13, 16, 40, 14],
		[3, 135, 107, 5, 136, 108],
		[3, 67, 41, 13, 68, 42],
		[15, 54, 24, 5, 55, 25],
		[15, 43, 15, 10, 44, 16],
		[4, 144, 116, 4, 145, 117],
		[17, 68, 42],
		[17, 50, 22, 6, 51, 23],
		[19, 46, 16, 6, 47, 17],
		[2, 139, 111, 7, 140, 112],
		[17, 74, 46],
		[7, 54, 24, 16, 55, 25],
		[34, 37, 13],
		[4, 151, 121, 5, 152, 122],
		[4, 75, 47, 14, 76, 48],
		[11, 54, 24, 14, 55, 25],
		[16, 45, 15, 14, 46, 16],
		[6, 147, 117, 4, 148, 118],
		[6, 73, 45, 14, 74, 46],
		[11, 54, 24, 16, 55, 25],
		[30, 46, 16, 2, 47, 17],
		[8, 132, 106, 4, 133, 107],
		[8, 75, 47, 13, 76, 48],
		[7, 54, 24, 22, 55, 25],
		[22, 45, 15, 13, 46, 16],
		[10, 142, 114, 2, 143, 115],
		[19, 74, 46, 4, 75, 47],
		[28, 50, 22, 6, 51, 23],
		[33, 46, 16, 4, 47, 17],
		[8, 152, 122, 4, 153, 123],
		[22, 73, 45, 3, 74, 46],
		[8, 53, 23, 26, 54, 24],
		[12, 45, 15, 28, 46, 16],
		[3, 147, 117, 10, 148, 118],
		[3, 73, 45, 23, 74, 46],
		[4, 54, 24, 31, 55, 25],
		[11, 45, 15, 31, 46, 16],
		[7, 146, 116, 7, 147, 117],
		[21, 73, 45, 7, 74, 46],
		[1, 53, 23, 37, 54, 24],
		[19, 45, 15, 26, 46, 16],
		[5, 145, 115, 10, 146, 116],
		[19, 75, 47, 10, 76, 48],
		[15, 54, 24, 25, 55, 25],
		[23, 45, 15, 25, 46, 16],
		[13, 145, 115, 3, 146, 116],
		[2, 74, 46, 29, 75, 47],
		[42, 54, 24, 1, 55, 25],
		[23, 45, 15, 28, 46, 16],
		[17, 145, 115],
		[10, 74, 46, 23, 75, 47],
		[10, 54, 24, 35, 55, 25],
		[19, 45, 15, 35, 46, 16],
		[17, 145, 115, 1, 146, 116],
		[14, 74, 46, 21, 75, 47],
		[29, 54, 24, 19, 55, 25],
		[11, 45, 15, 46, 46, 16],
		[13, 145, 115, 6, 146, 116],
		[14, 74, 46, 23, 75, 47],
		[44, 54, 24, 7, 55, 25],
		[59, 46, 16, 1, 47, 17],
		[12, 151, 121, 7, 152, 122],
		[12, 75, 47, 26, 76, 48],
		[39, 54, 24, 14, 55, 25],
		[22, 45, 15, 41, 46, 16],
		[6, 151, 121, 14, 152, 122],
		[6, 75, 47, 34, 76, 48],
		[46, 54, 24, 10, 55, 25],
		[2, 45, 15, 64, 46, 16],
		[17, 152, 122, 4, 153, 123],
		[29, 74, 46, 14, 75, 47],
		[49, 54, 24, 10, 55, 25],
		[24, 45, 15, 46, 46, 16],
		[4, 152, 122, 18, 153, 123],
		[13, 74, 46, 32, 75, 47],
		[48, 54, 24, 14, 55, 25],
		[42, 45, 15, 32, 46, 16],
		[20, 147, 117, 4, 148, 118],
		[40, 75, 47, 7, 76, 48],
		[43, 54, 24, 22, 55, 25],
		[10, 45, 15, 67, 46, 16],
		[19, 148, 118, 6, 149, 119],
		[18, 75, 47, 31, 76, 48],
		[34, 54, 24, 34, 55, 25],
		[20, 45, 15, 61, 46, 16]
	];
	QRRSBlock.getRSBlocks = function(typeNumber, errorCorrectLevel) {
		var rsBlock = QRRSBlock.getRsBlockTable(typeNumber, errorCorrectLevel);
		if (rsBlock == undefined) throw new Error("bad rs block @ typeNumber:" + typeNumber + "/errorCorrectLevel:" + errorCorrectLevel);
		var length = rsBlock.length / 3;
		var list = [];
		for (var i = 0; i < length; i++) {
			var count = rsBlock[i * 3 + 0];
			var totalCount = rsBlock[i * 3 + 1];
			var dataCount = rsBlock[i * 3 + 2];
			for (var j = 0; j < count; j++) list.push(new QRRSBlock(totalCount, dataCount))
		}
		return list
	};
	QRRSBlock.getRsBlockTable = function(typeNumber, errorCorrectLevel) {
		switch (errorCorrectLevel) {
		case QRErrorCorrectLevel.L:
			return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 0];
		case QRErrorCorrectLevel.M:
			return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 1];
		case QRErrorCorrectLevel.Q:
			return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 2];
		case QRErrorCorrectLevel.H:
			return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 3];
		default:
			return undefined
		}
	};

	function QRBitBuffer() {
		this.buffer = [];
		this.length = 0
	}
	QRBitBuffer.prototype = {
		get: function(index) {
			var bufIndex = Math.floor(index / 8);
			return (this.buffer[bufIndex] >>> 7 - index % 8 & 1) == 1
		},
		put: function(num, length) {
			for (var i = 0; i < length; i++) this.putBit((num >>> length - i - 1 & 1) == 1)
		},
		getLengthInBits: function() {
			return this.length
		},
		putBit: function(bit) {
			var bufIndex = Math.floor(this.length / 8);
			if (this.buffer.length <= bufIndex) this.buffer.push(0);
			if (bit) this.buffer[bufIndex] |= 128 >>> this.length % 8;
			this.length++
		}
	};
	var QRCodeLimitLength = [
		[17, 14, 11, 7],
		[32, 26, 20, 14],
		[53, 42, 32, 24],
		[78, 62, 46, 34],
		[106, 84, 60, 44],
		[134, 106, 74, 58],
		[154, 122, 86, 64],
		[192, 152, 108, 84],
		[230, 180, 130, 98],
		[271, 213, 151, 119],
		[321, 251, 177, 137],
		[367, 287, 203, 155],
		[425, 331, 241, 177],
		[458, 362, 258, 194],
		[520, 412, 292, 220],
		[586, 450, 322, 250],
		[644, 504, 364, 280],
		[718, 560, 394, 310],
		[792, 624, 442, 338],
		[858, 666, 482, 382],
		[929, 711, 509, 403],
		[1003, 779, 565, 439],
		[1091, 857, 611, 461],
		[1171, 911, 661, 511],
		[1273, 997, 715, 535],
		[1367, 1059, 751, 593],
		[1465, 1125, 805, 625],
		[1528, 1190, 868, 658],
		[1628, 1264, 908, 698],
		[1732, 1370, 982, 742],
		[1840, 1452, 1030, 790],
		[1952, 1538, 1112, 842],
		[2068, 1628, 1168, 898],
		[2188, 1722, 1228, 958],
		[2303, 1809, 1283, 983],
		[2431, 1911, 1351, 1051],
		[2563, 1989, 1423, 1093],
		[2699, 2099, 1499, 1139],
		[2809, 2213, 1579, 1219],
		[2953, 2331, 1663, 1273]
	];

	function _isSupportCanvas() {
		return typeof CanvasRenderingContext2D != "undefined"
	}
	function _getAndroid() {
		var android = false;
		var sAgent = navigator.userAgent;
		if (/android/i.test(sAgent)) {
			android = true;
			var aMat = sAgent.toString().match(/android ([0-9]\.[0-9])/i);
			if (aMat && aMat[1]) android = parseFloat(aMat[1])
		}
		return android
	}
	var svgDrawer = function() {
			var Drawing = function(el, htOption) {
					this._el = el;
					this._htOption = htOption
				};
			Drawing.prototype.draw = function(oQRCode) {
				var _htOption = this._htOption;
				var _el = this._el;
				var nCount = oQRCode.getModuleCount();
				var nWidth = Math.floor(_htOption.width / nCount);
				var nHeight = Math.floor(_htOption.height / nCount);
				this.clear();

				function makeSVG(tag, attrs) {
					var el = document.createElementNS("http://www.w3.org/2000/svg", tag);
					for (var k in attrs) if (attrs.hasOwnProperty(k)) el.setAttribute(k, attrs[k]);
					return el
				}
				var svg = makeSVG("svg", {
					"viewBox": "0 0 " + String(nCount) + " " + String(nCount),
					"width": "100%",
					"height": "100%",
					"fill": _htOption.colorLight
				});
				svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
				_el.appendChild(svg);
				svg.appendChild(makeSVG("rect", {
					"fill": _htOption.colorLight,
					"width": "100%",
					"height": "100%"
				}));
				svg.appendChild(makeSVG("rect", {
					"fill": _htOption.colorDark,
					"width": "1",
					"height": "1",
					"id": "template"
				}));
				for (var row = 0; row < nCount; row++) for (var col = 0; col < nCount; col++) if (oQRCode.isDark(row, col)) {
					var child = makeSVG("use", {
						"x": String(col),
						"y": String(row)
					});
					child.setAttributeNS("http://www.w3.org/1999/xlink", "href", "#template");
					svg.appendChild(child)
				}
			};
			Drawing.prototype.clear = function() {
				while (this._el.hasChildNodes()) this._el.removeChild(this._el.lastChild)
			};
			return Drawing
		}();
	var useSVG = document.documentElement.tagName.toLowerCase() === "svg";
	var Drawing = useSVG ? svgDrawer : !_isSupportCanvas() ?
	function() {
		var Drawing = function(el, htOption) {
				this._el = el;
				this._htOption = htOption
			};
		Drawing.prototype.draw = function(oQRCode) {
			var _htOption = this._htOption;
			var _el = this._el;
			var nCount = oQRCode.getModuleCount();
			var nWidth = Math.floor(_htOption.width / nCount);
			var nHeight = Math.floor(_htOption.height / nCount);
			var aHTML = ['<table style="border:0;border-collapse:collapse;">'];
			for (var row = 0; row < nCount; row++) {
				aHTML.push("<tr>");
				for (var col = 0; col < nCount; col++) aHTML.push('<td style="border:0;border-collapse:collapse;padding:0;margin:0;width:' + nWidth + "px;height:" + nHeight + "px;background-color:" + (oQRCode.isDark(row, col) ? _htOption.colorDark : _htOption.colorLight) + ';"></td>');
				aHTML.push("</tr>")
			}
			aHTML.push("</table>");
			_el.innerHTML = aHTML.join("");
			var elTable = _el.childNodes[0];
			var nLeftMarginTable = (_htOption.width - elTable.offsetWidth) / 2;
			var nTopMarginTable = (_htOption.height - elTable.offsetHeight) / 2;
			if (nLeftMarginTable > 0 && nTopMarginTable > 0) elTable.style.margin = nTopMarginTable + "px " + nLeftMarginTable + "px"
		};
		Drawing.prototype.clear = function() {
			this._el.innerHTML = ""
		};
		return Drawing
	}() : function() {
		function _onMakeImage() {
			this._elImage.src = this._elCanvas.toDataURL("image/png");
			this._elImage.style.display = "block";
			this._elCanvas.style.display = "none"
		}
		if (this._android && this._android <= 2.1) {
			var factor = 1 / window.devicePixelRatio;
			var drawImage = CanvasRenderingContext2D.prototype.drawImage;
			CanvasRenderingContext2D.prototype.drawImage = function(image, sx, sy, sw, sh, dx, dy, dw, dh) {
				if ("nodeName" in image && /img/i.test(image.nodeName)) for (var i = arguments.length - 1; i >= 1; i--) arguments[i] = arguments[i] * factor;
				else if (typeof dw == "undefined") {
					arguments[1] *= factor;
					arguments[2] *= factor;
					arguments[3] *= factor;
					arguments[4] *= factor
				}
				drawImage.apply(this, arguments)
			}
		}
		function _safeSetDataURI(fSuccess, fFail) {
			var self = this;
			self._fFail = fFail;
			self._fSuccess = fSuccess;
			if (self._bSupportDataURI === null) {
				var el = document.createElement("img");
				var fOnError = function() {
						self._bSupportDataURI = false;
						if (self._fFail) self._fFail.call(self)
					};
				var fOnSuccess = function() {
						self._bSupportDataURI = true;
						if (self._fSuccess) self._fSuccess.call(self)
					};
				el.onabort = fOnError;
				el.onerror = fOnError;
				el.onload = fOnSuccess;
				el.src = "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==";
				return
			} else if (self._bSupportDataURI === true && self._fSuccess) self._fSuccess.call(self);
			else if (self._bSupportDataURI === false && self._fFail) self._fFail.call(self)
		}
		var Drawing = function(el, htOption) {
				this._bIsPainted = false;
				this._android = _getAndroid();
				this._htOption = htOption;
				this._elCanvas = document.createElement("canvas");
				this._elCanvas.width = htOption.width;
				this._elCanvas.height = htOption.height;
				el.appendChild(this._elCanvas);
				this._el = el;
				this._oContext = this._elCanvas.getContext("2d");
				this._bIsPainted = false;
				this._elImage = document.createElement("img");
				this._elImage.alt = "Scan me!";
				this._elImage.style.display = "none";
				//this._el.appendChild(this._elImage);
				this._bSupportDataURI = null
			};
		Drawing.prototype.draw = function(oQRCode) {
			var _elImage = this._elImage;
			var _oContext = this._oContext;
			var _htOption = this._htOption;
			var nCount = oQRCode.getModuleCount();
			var nWidth = _htOption.width / nCount;
			var nHeight = _htOption.height / nCount;
			var nRoundedWidth = Math.round(nWidth);
			var nRoundedHeight = Math.round(nHeight);
			_elImage.style.display = "none";
			this.clear();
			for (var row = 0; row < nCount; row++) for (var col = 0; col < nCount; col++) {
				var bIsDark = oQRCode.isDark(row, col);
				var nLeft = col * nWidth;
				var nTop = row * nHeight;
				_oContext.strokeStyle = bIsDark ? _htOption.colorDark : _htOption.colorLight;
				_oContext.lineWidth = 1;
				_oContext.fillStyle = bIsDark ? _htOption.colorDark : _htOption.colorLight;
				_oContext.fillRect(nLeft, nTop, nWidth, nHeight);
				_oContext.strokeRect(Math.floor(nLeft) + .5, Math.floor(nTop) + .5, nRoundedWidth, nRoundedHeight);
				_oContext.strokeRect(Math.ceil(nLeft) - .5, Math.ceil(nTop) - .5, nRoundedWidth, nRoundedHeight)
			}
			this._bIsPainted = true
		};
		Drawing.prototype.makeImage = function() {
			if (this._bIsPainted) _safeSetDataURI.call(this, _onMakeImage)
		};
		Drawing.prototype.isPainted = function() {
			return this._bIsPainted
		};
		Drawing.prototype.clear = function() {
			this._oContext.clearRect(0, 0, this._elCanvas.width, this._elCanvas.height);
			this._bIsPainted = false
		};
		Drawing.prototype.round = function(nNumber) {
			if (!nNumber) return nNumber;
			return Math.floor(nNumber * 1E3) / 1E3
		};
		return Drawing
	}();

	function _getTypeNumber(sText, nCorrectLevel) {
		var nType = 1;
		var length = _getUTF8Length(sText);
		for (var i = 0, len = QRCodeLimitLength.length; i <= len; i++) {
			var nLimit = 0;
			switch (nCorrectLevel) {
			case QRErrorCorrectLevel.L:
				nLimit = QRCodeLimitLength[i][0];
				break;
			case QRErrorCorrectLevel.M:
				nLimit = QRCodeLimitLength[i][1];
				break;
			case QRErrorCorrectLevel.Q:
				nLimit = QRCodeLimitLength[i][2];
				break;
			case QRErrorCorrectLevel.H:
				nLimit = QRCodeLimitLength[i][3];
				break
			}
			if (length <= nLimit) break;
			else nType++
		}
		if (nType > QRCodeLimitLength.length) throw new Error("Too long data");
		return nType
	}
	function _getUTF8Length(sText) {
		var replacedText = encodeURI(sText).toString().replace(/\%[0-9a-fA-F]{2}/g, "a");
		return replacedText.length + (replacedText.length != sText ? 3 : 0)
	}
	QRCode = function(el, vOption) {
		this._htOption = {
			width: 256,
			height: 256,
			typeNumber: 4,
			colorDark: "#000000",
			colorLight: "#ffffff",
			correctLevel: QRErrorCorrectLevel.H
		};
		if (typeof vOption === "string") vOption = {
			text: vOption
		};
		if (vOption) for (var i in vOption) this._htOption[i] = vOption[i];
		if (typeof el == "string") el = document.getElementById(el);
		if (this._htOption.useSVG) Drawing = svgDrawer;
		this._android = _getAndroid();
		this._el = el;
		this._oQRCode = null;
		this._oDrawing = new Drawing(this._el, this._htOption);
		if (this._htOption.text) this.makeCode(this._htOption.text)
	};
	QRCode.prototype.makeCode = function(sText) {
		this._oQRCode = new QRCodeModel(_getTypeNumber(sText, this._htOption.correctLevel), this._htOption.correctLevel);
		this._oQRCode.addData(sText);
		this._oQRCode.make();
		this._el.title = sText;
		this._oDrawing.draw(this._oQRCode);
		this.makeImage()
	};
	QRCode.prototype.makeImage = function() {
		if (typeof this._oDrawing.makeImage == "function" && (!this._android || this._android >= 3)) this._oDrawing.makeImage()
	};
	QRCode.prototype.clear = function() {
		this._oDrawing.clear()
	};
	QRCode.CorrectLevel = QRErrorCorrectLevel
})();
var Login = {
	Strlimit: function(Str, limit) {
		limit = limit || 25;
		var objString = Str;
		var objLength = Str.length;
		if (objLength > limit) objString = objString.substring(0, limit) + "...";
		return objString
	},
	strtolower: function(str) {
		return (str + "").toLowerCase()
	},
	__AjaxFun: function(type, uri, cache, dataType, fun, data) {
		type = type || "get";
		uri = uri || "";
		cache = cache || false;
		dataType = dataType || "text";
		fun = fun || "__Setlayer";
		data = data || "";
		if (uri == "") return false;
		var fn = eval(fun);
		
		$.ajax({
		  type: "POST",
		  url: uri,
		  data: data,
		  cache:false,
		  dataType:"json",
		  async:false,
		  success: function(data){
			console.log('data', data);
			if (data.success) {
				window.location.href = "/#/looteryHead"
				alert("登录成功，即将跳转");
			}
			else {
			  alert(data.message);
			  $('#verifycodeImg').attr('src', "/getVerCode?w=70&h=26&_="+Math.random());
			}
		  }
		});
	},
	__GetAjax: function(uri, type, h3) {
		$.ajax({
			type: "get",
			url: uri,
			cache: false,
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			beforeSend: function(XMLHttpRequest) {},
			success: function(data) {
				switch (type) {
				case "_models":
					Login.__DoAboutTag(data, h3);
					break;
				case "news":
					Login.__DoNewsTag(data);
					break;
				case "marquee":
					Login.__DoMarqueeTag(data);
					break;
				case "joinTxt":
					Login.__DoJoinTxtTag(data);
					break;
				case "carousel":
					Login.__DoCarouselTag(data);
					break;
				case "sale":
					Login.__DoSaleTag(data);
					break;
				case "floatimg":
					Login.__DoFloatimgTag(data);
					break;
				case "logo":
					Login.__DoLogoTag(data);
					break;
				case "homepages":
					Login.__DoHomepages(data);
					break;
				case "server_url":
					Login.__DoServer_url(data);
					break
				}
			},
			complete: function() {},
			error: function(XMLHttpRequest, textStatus, errorThrown) {}
		})
	},
	blockUIFun: function(message, switchClass, Divname) {
		switchClass = switchClass || "Tips";
		message = message || "\u8d44\u6599\u5904\u7406\u4e2d\uff0c\u8bf7\u7a0d\u5019...";
		Divname = Divname || "";
		switch (switchClass) {
		default:
		case "Tips":
			$.blockUI({
				message: '<h5><img src="../../' + tpl_path + 'images/ajax-loader.gif" /> ' + message + "</h5>",
				fadeIn: 700,
				fadeOut: 700,
				baseZ: 2E3,
				css: {
					border: "none",
					padding: "25px",
					backgroundColor: "#000",
					"-webkit-border-radius": "10px",
					"-moz-border-radius": "10px",
					"border-radius": "10px",
					opacity: .9,
					color: "#fff"
				}
			});
			break;
		case "DivTips":
			if (!Divname) return;
			$(Divname).block({
				message: '<h5><img src="../../' + tpl_path + 'images/ajax-loader.gif" /> ' + message + "</h5>",
				fadeIn: 700,
				fadeOut: 700,
				css: {
					border: "none",
					padding: "25px",
					backgroundColor: "#000",
					"-webkit-border-radius": "10px",
					"-moz-border-radius": "10px",
					"border-radius": "10px",
					color: "#fff"
				}
			});
			break;
		case "Growl":
			var pngname = "";
			switch (Divname) {
			case "check":
				pngname = "fa-check-circle";
				break;
			case "info":
				pngname = "fa-info-circle";
				break;
			case "help":
				pngname = "fa-question-circle";
				break;
			case "cancle":
				pngname = "fa-times-circle";
				break;
			default:
				pngname = "fa-ban"
			}
			$.blockUI({
				message: '<div class="growlUI"><i class="fa ' + pngname + ' fa-4x"></i><h4>\u63d0\u793a</h4><p>' + message + "</p></div>",
				fadeIn: 700,
				fadeOut: 700,
				timeout: 5E3,
				showOverlay: false,
				centerY: false,
				baseZ: 2E3,
				css: {
					width: "350px",
					top: "10px",
					left: "",
					right: "10px",
					border: "none",
					padding: "15px",
					background: "#000",
					"-webkit-border-radius": "10px",
					"-moz-border-radius": "10px",
					"border-radius": "10px",
					opacity: .9,
					color: "#fff "
				}
			});
			break;
		case "domMessage":
			$.blockUI({
				message: '<div id="domMessage">' + "<h5>\u4e3a\u4fdd\u969c\u60a8\u7684\u5e10\u6237\u5b89\u5168\uff0c\u79bb\u5f00\u65f6\u52a1\u5fc5\u4f7f\u7528\u5b89\u5168\u9000\u51fa...</h5><br><p>" + '<input id="btnClose" type="button" value="\u662f\u7684\uff0c\u6211\u77e5\u9053\u4e86" /></p></div>',
				fadeIn: 700,
				fadeOut: 700,
				baseZ: 2E3,
				css: {
					border: "none",
					padding: "25px",
					backgroundColor: "#000",
					"-webkit-border-radius": "10px",
					"-moz-border-radius": "10px",
					"border-radius": "10px",
					opacity: .9,
					color: "#fff"
				}
			});
			$("#btnClose").click($.unblockUI);
			break
		}
	},
	InitTimeAjax: function() {
		$("body").everyTime("1440s", "timeoutX", function() {
			Login.__AjaxFun("get", ddom + "Op/Is_timeout", false, "text", "Login.__ActionTimeout")
		}, 0, true)
	},
	__ActionTimeout: function(Type, data) {
		switch (Type) {
		case "beforeSend":
			break;
		case "success":
			if (data != "1") {
				$("body").stopTime();
				dialog({
					title: "\u7cfb\u7edf\u63d0\u793a",
					content: "<h5>\u4e3a\u4fdd\u969c\u60a8\u7684\u5e10\u6237\u5b89\u5168\uff0c\u95f2\u7f6e\u8fc7\u4e45\u7cfb\u7edf\u5c06\u81ea\u52a8\u767b\u51fa\uff0c\u8bf7\u91cd\u65b0\u767b\u5165...</h5>",
					ok: function() {
						this.title("\u8f6c\u8df3\u4e2d\u2026");
						location.reload();
						return false
					},
					okValue: "\u786e\u8ba4"
				}).width(400).showModal()
			}
			break;
		case "complete":
			break;
		case "error":
			break
		}
	},
	showLocale: function() {
		objD = new Date;
		var str, colorhead, colorfoot;
		var yy = objD.getYear();
		if (yy < 1900) yy = yy + 1900;
		var MM = objD.getMonth() + 1;
		if (MM < 10) MM = "0" + MM;
		var dd = objD.getDate();
		if (dd < 10) dd = "0" + dd;
		var hh = objD.getHours();
		if (hh < 10) hh = "0" + hh;
		var mm = objD.getMinutes();
		if (mm < 10) mm = "0" + mm;
		var ss = objD.getSeconds();
		if (ss < 10) ss = "0" + ss;
		var ww = objD.getDay();
		str = yy + "/" + MM + "/" + dd + " " + hh + ":" + mm + ":" + ss + " GMT+08:00 (\u5317\u4eac\u65f6\u95f4)";
		$(".time").html(str);
		window.setTimeout("Login.showLocale()", 1E3)
	},
	__DoNewsTag: function(data) {
		var TempTag = "";
		if (data != "") for (var xx in data) TempTag += '<li><a href="javascript:void(0);" class="My_share_Default" stit="' + data[xx].contentInfo + '" >' + data[xx].subject + "</a></li>";
		$(".announcement ul").html(TempTag)
	},
	__DoMarqueeTag: function(data) {
		var TempTag = "";
		if (data != "") for (var xx in data) TempTag += '<a href="javascript:void(0);" class="My_share_Default" stit="' + data[xx].subject + '" v="axu">' + data[xx].contentInfo + "</a>                      ";
		$("marquee").html(TempTag);
		$("marquee").hover(function() {
			this.stop()
		}, function() {
			this.start()
		})
	},
	__DoJoinTxtTag: function(data) {
		if (data != "") for (var xx in data) switch (data[xx].sorts) {
		case "JM1":
			$("#default_register [name='textarea']").html(data[xx].content);
			break
		}
	},
	__DoLogoTag: function(data) {
		var new_data = new Date;
		var textToInsert = [];
		var i = 0;
		var length = data.length;
		for (var a = 0; a < length; a += 1) {
			var start_data = data[a].dts,
				date = new Date(start_data * 1E3);
			var end_data = data[a].dte,
				date = new Date(end_data * 1E3);
			if (Date.parse(end_data).valueOf() >= new_data.valueOf() && Date.parse(start_data).valueOf() <= new_data.valueOf()) {
				var uli = $(".header img").attr("uli") + "data/images/" + data[a].images + "?t=" + data[a].date;
				$(".header img").attr("src", uli);
				break
			}
		}
	},
	__DoCarouselTag: function(data) {
		var TempTag = "";
		if (data != "") for (var xx in data) TempTag += '<li><a href="javascript:;" xhr="#sale" class="My_models_Default"><img src="../../' + ddom + "public/data/images/" + data[xx].images + "?t=" + data[xx].date + '" alt="' + data[xx].titles + '" ></a></li>';
		$(".banner ul.banner-img").html(TempTag);
		Login.__banner()
	},
	__DoAboutTag: function(data, obj) {
		var pushAgent = false;
		var customModal = '<div class="abgne_tab"><ul class="tabs">';
		var xxi = 0,
			tti = 0;
		for (var xx in data) {
			if (xxi == 0) customModal += '<li class="active"><a href="#tab' + xx + '">' + data[xx].titles + "</a></li>";
			else if (xxi <= 4) customModal += '<li><a href="#tab' + xx + '" >' + data[xx].titles + "</a></li>";
			xxi++
		}
		if ($("#topUser_Balance").length == 0) if (obj.attr("ufrom") == 1) customModal += '<li><a href="#tabu' + data.length + '" >\u4ee3\u7406\u6ce8\u518c</a></li>';
		customModal += "</ul>";
		customModal += '<div class="tab_container">';
		for (var tt in data) if (tti == 0) {
			customModal += '<div id="tab' + tt + '" class="tab_content" style="display: block;">';
			customModal += data[tt].content;
			customModal += "</div>"
		} else if (tti <= 4) {
			customModal += '<div id="tab' + tt + '" class="tab_content" style="display: none;">';
			customModal += data[tt].content;
			customModal += "</div>"
		}
		if ($(".loginbody #topUser_Balance").length == 0) {
			if (obj.attr("ufrom") == 1) customModal += '<div id="tabu' + data.length + '">' + $("#register_dialog").html() + "</div>";
			pushAgent = true
		}
		customModal += "</div></div>";
		var stxt = obj.text();
		$("#default_share h3").text(stxt);
		$("#default_share div.share_info").html(customModal);
		$("ul.etabs a[href='#default_share']").click();
		if (pushAgent) {
			$("div.abgne_tab input[name='regis_acl']").attr("value", 1);
			$("div.abgne_tab #register_form").on("click", "#reg-button", function(e) {
				if (!$("div.abgne_tab form#register_form").valid()) return false;
				else Login.__AjaxFun("post", ddom + "Login/Do_register", false, "json", "Login.__InitRegister", $("div.abgne_tab form#register_form").serialize())
			})
		}
		var _showTab = 0;
		$(".abgne_tab").each(function() {
			var $tab = $(this);
			var $defaultLi = $("ul.tabs li", $tab).eq(_showTab).addClass("active");
			$($defaultLi.find("a").attr("href")).siblings().hide();
			$("ul.tabs li", $tab).click(function() {
				var $this = $(this),
					_clickTab = $this.find("a").attr("href");
				$this.addClass("active").siblings(".active").removeClass("active");
				$(_clickTab).stop(false, true).show().siblings().hide();
				return false
			}).find("a").focus(function() {
				this.blur()
			})
		})
	},
	__DoHomepages: function(data) {
		var TempTag = "";
		var textToInsert = [];
		if (data != "") for (var xx in data) textToInsert.push('<a href="javascript:void(0);" class="My_models" mid="' + data[xx].kindsrot + '" ufrom="' + data[xx].user_from + '" afrom="' + data[xx].agent_login_from + '">' + data[xx].title + "</a>");
		if ($(".footer-links ul a").length > 0) $(".footer-links ul").append(" - " + textToInsert.join(" - "));
		else $(".footer-links ul").append(textToInsert.join(" - "))
	},
	__DoFloatimgTag: function(data) {
		var TempTag = "";
		var leftImg = [],
			rightImg = [];
		if (data != "") {
			for (var xx in data) {
				switch (data[xx].other) {
				case "0":
					TempTag = '<a href="javascript:void(0);" floatclick="' + data[xx].links + '"><div id="__' + data[xx].images + '"><img src="../../' + ddom + "public/data/images/" + data[xx].images + '" alt="' + data[xx].titles + '" ></div></a>';
					break;
				case "1":
					if (Login.strtolower(data[xx].links.substr(0, 4)) == "http" || Login.strtolower(data[xx].links.substr(0, 5)) == "https") TempTag = '<a href="../../' + data[xx].links + '" target="_blank"><div id="__' + data[xx].images + '"><img src="../../' + ddom + "public/data/images/" + data[xx].images + '" alt="' + data[xx].titles + '" ></div></a>';
					else TempTag = '<a href="../../' + data[xx].links + '" ><div id="__' + data[xx].images + '"><img src="../../' + ddom + "public/data/images/" + data[xx].images + '" alt="' + data[xx].titles + '" ></div></a>';
					break;
				case "2":
					TempTag = '<a href="../../' + data[xx].links + '" target="_blank"><div id="__' + data[xx].images + '"><img src="../../' + ddom + "public/data/images/" + data[xx].images + '" alt="' + data[xx].titles + '" ></div></a>';
					break
				}
				switch (data[xx].float) {
				case "left":
					leftImg.push(TempTag);
					break;
				case "right":
					rightImg.push(TempTag);
					break
				}
			}
			if (leftImg.length != 0) $("body").append('<div id="fixedleft-ad">' + leftImg.join("") + "</div>");
			if (rightImg.length != 0) $("body").append('<div id="fixedright-ad">' + rightImg.join("") + "</div>")
		}
	},
	__DoSaleTag: function(data) {
		var TempTag = "";
		var SaleTitleTag = "";
		var mgsCount = 0;
		if (data != "") if ($("ul.slae_group").length > 0) {
			for (var xd in data) {
				TempTag += "<li>" + "<div>" + '<img src="../../' + ddom + "public/data/images/" + data[xd].images + "?t=" + data[xd].date + '" >' + "</div>" + "<div>" + '<img src="../../' + ddom + "public/data/images/" + data[xd].images2 + "?t=" + data[xd].date + '" >' + "</div>" + "</li>";
				if (mgsCount % 3 == 0) SaleTitleTag += '<div class="list-group">';
				SaleTitleTag += '<a href="javascript:;" class="list-group-item--long" style="margin:10px">' + data[xd].titles + "</a>";
				if (mgsCount % 3 == 2) SaleTitleTag += "</div>";
				mgsCount++
			}
			if (mgsCount % 3 < 3) SaleTitleTag += "</div>";
			$("#sale ul.slae_group").empty().html(TempTag);
			$("#saleTitle").prepend(SaleTitleTag);
			$("#saleTitle a").on("click", function() {
				$('.etabs a[href="#sale"]').click()
			});
			this.__salecollapse()
		}
	},
	__DoServer_url: function(data) {
		var $dom = $();
		$(".webonlineservice").each(function() {
			if (($(this).prop("tagName") || "").toUpperCase() == "A") $dom = $(this);
			else $dom = $(this).find("a");
			$dom.attr({
				href: data.url,
				target: "_blank"
			})
		})
	},
	__AppGetBalances: function(Type, data) {
		switch (Type) {
		case "beforeSend":
			break;
		case "success":
			$("#topUser_Balance").html(data.data.balance);
			break;
		case "complete":
			break;
		case "error":
			Login.blockUIFun("\u53d6\u5f97\u989d\u5ea6\u8d44\u6599\u5931\u8d25( " + data.status + " )!!", "Growl");
			break
		}
	},
	__InitLogin: function(Type, data) {
		var TempOutdaAJAXTag = "";
		switch (Type) {
		case "beforeSend":
			Login.blockUIFun();
			break;
		case "success":
			if (data.tips == "SystemCheck") setTimeout(function() {
				$.unblockUI({
					onUnblock: function() {
						$("a[href='#default_SystemCheck']").click()
					}
				})
			}, 1E3);
			else if (data.tips.substr(0, 2) == "Sy") setTimeout(function() {
				$.unblockUI({
					onUnblock: function() {
						Login.blockUIFun(data.tips.substr(2, 200), "Growl")
					}
				})
			}, 1E3);
			else if (data.tips.substr(0, 2) == "60") setTimeout(function() {
				$.unblockUI({
					onUnblock: function() {
						window.location = ddom + "Login/index"
					}
				})
			}, 1E3);
			else if (data.tips != "") setTimeout(function() {
				$.unblockUI({
					onUnblock: function() {
						Login.blockUIFun(data.tips, "Growl")
					}
				});
				var newimg = $('img[src*="/authnum"]').attr("src").replace(/\?\d*/, "") + "?" + Math.floor(Math.random() * 10 + 1);
				$('img[src*="/authnum"]').attr("src", newimg);
				$("#authnum").val("")
			}, 1E3);
			else if (data.hasOwnProperty("loginUrl")) window.location = data.loginUrl;
			else window.location = ddom + "Op";
			break;
		case "complete":
			break;
		case "error":
			Login.blockUIFun("\u767b\u5165\u8f6c\u8df3\u5931\u8d25\uff0c\u8bf7\u5237\u65b0\u9875\u9762( " + data.status + " )!!", "Growl");
			setTimeout(function() {
				$.unblockUI({
					onUnblock: function() {
						window.location = ddom + "Login/index"
					}
				})
			}, 3E3);
			break
		}
	},
	__InitRegister: function(Type, data) {
		var TempOutdaAJAXTag = "";
		switch (Type) {
		case "beforeSend":
			Login.blockUIFun();
			break;
		case "success":
			if (data.tips.substr(0, 2) == "50") setTimeout(function() {
				$.unblockUI({
					onUnblock: function() {
						Login.blockUIFun(data.tips, "Growl")
					}
				})
			}, 1E3);
			else if (data.tips != "") setTimeout(function() {
				$.unblockUI({
					onUnblock: function() {
						Login.blockUIFun(data.tips, "Growl")
					}
				})
			}, 1E3);
			else {
				setTimeout(function() {
					$.unblockUI({
						onUnblock: function() {
							Login.blockUIFun(data.progress, "Growl", "check")
						}
					})
				}, 1E3);
				setTimeout(function() {
					window.location = window.location.href.replace(/\/Register.*/, "") + "/Login/#default_login"
				}, 4E3)
			}
			break;
		case "complete":
			break;
		case "error":
			$.unblockUI();
			Login.blockUIFun("\u6ce8\u518c\u8f6c\u8df3\u5931\u8d25\uff0c\u8bf7\u5237\u65b0\u9875\u9762( " + data.status + " )!!", "Growl");
			break
		}
	},
	__MobileRegister: function(Type, data) {
		var TempOutdaAJAXTag = "";
		switch (Type) {
		case "beforeSend":
			Login.blockUIFun();
			break;
		case "success":
			if (data.tips.substr(0, 2) == "50") setTimeout(function() {
				$.unblockUI({
					onUnblock: function() {
						Login.blockUIFun(data.tips, "Growl")
					}
				})
			}, 1E3);
			else if (data.tips != "") setTimeout(function() {
				$.unblockUI({
					onUnblock: function() {
						Login.blockUIFun(data.tips, "Growl")
					}
				})
			}, 1E3);
			else {
				setTimeout(function() {
					$.unblockUI({
						onUnblock: function() {
							Login.blockUIFun(data.progress, "Growl", "check")
						}
					})
				}, 1E3);
				setTimeout(function() {
					window.location = window.location.href.replace(/\/Register.*/, "") + "/Mobile_Login"
				}, 4E3)
			}
			break;
		case "complete":
			break;
		case "error":
			$.unblockUI();
			Login.blockUIFun("\u6ce8\u518c\u8f6c\u8df3\u5931\u8d25\uff0c\u8bf7\u5237\u65b0\u9875\u9762( " + data.status + " )!!", "Growl");
			break
		}
	},
	__banner: function() {
		var $banner = $(".banner");
		var $banner_ul = $(".banner-img");
		var $btn = $(".banner-btn");
		var $btn_a = $btn.find("a");
		var v_width = $banner.width();
		var page = 1;
		var timer = null;
		var btnClass = null;
		var page_count = $banner_ul.find("li").length;
		var banner_cir = "<li class='selected' href='#'><a></a></li>";
		for (var i = 1; i < page_count; i++) banner_cir += "<li><a href='#'></a></li>";
		$(".banner-circle").append(banner_cir);
		var cirLeft = $(".banner-circle").width() * -.5;
		$(".banner-circle").css({
			"marginLeft": cirLeft
		});
		$banner_ul.width(page_count * v_width);

		function move(obj, classname) {
			if (!$banner_ul.is(":animated")) if (classname == "prevBtn") if (page == 1) {
				$banner_ul.animate({
					left: -v_width * (page_count - 1)
				});
				page = page_count;
				cirMove()
			} else {
				$banner_ul.animate({
					left: "+=" + v_width
				}, "slow");
				page--;
				cirMove()
			} else if (page == page_count) {
				$banner_ul.animate({
					left: 0
				});
				page = 1;
				cirMove()
			} else {
				$banner_ul.animate({
					left: "-=" + v_width
				}, "slow");
				page++;
				cirMove()
			}
		}
		function cirMove() {
			$(".banner-circle li").eq(page - 1).addClass("selected").siblings().removeClass("selected")
		}
		$banner.mouseover(function() {
			$btn.css({
				"display": "block"
			});
			clearInterval(timer)
		}).mouseout(function() {
			$btn.css({
				"display": "none"
			});
			clearInterval(timer);
			timer = setInterval(move, 3E3)
		}).trigger("mouseout");
		$btn_a.mouseover(function() {
			$(this).animate({
				opacity: .6
			}, "fast");
			$btn.css({
				"display": "block"
			});
			return false
		}).mouseleave(function() {
			$(this).animate({
				opacity: .3
			}, "fast");
			$btn.css({
				"display": "none"
			});
			return false
		}).click(function() {
			btnClass = this.className;
			clearInterval(timer);
			timer = setInterval(move, 3E3);
			move($(this), this.className)
		});
		$(".banner-circle li").on("click", function() {
			var index = $(".banner-circle li").index(this);
			$banner_ul.animate({
				left: -v_width * index
			}, "slow");
			page = index + 1;
			cirMove()
		})
	},
	__fqacollapse: function() {
		$("#faqContent ul").addClass("accordionPart").find("li div:nth-child(1)").addClass("faq_title").hover(function() {
			$(this).addClass("faq_title_on")
		}, function() {
			$(this).removeClass("faq_title_on")
		}).click(function() {
			var $qa_content = $(this).next("div.faq_content");
			if (!$qa_content.is(":visible")) $("#faqContent ul li div.faq_content:visible").slideUp();
			$qa_content.slideToggle()
		}).siblings().addClass("faq_content").hide()
	},
	__salecollapse: function() {
		$("#saleContent ul").addClass("accordionPart").find("li div:nth-child(1)").addClass("sale_title").hover(function() {
			$(this).addClass("sale_title_on")
		}, function() {
			$(this).removeClass("sale_title_on")
		}).click(function() {
			var $qa_content = $(this).next("div.sale_content");
			if (!$qa_content.is(":visible")) $("#saleContent ul li div.sale_content:visible").slideUp();
			$qa_content.slideToggle()
		}).siblings().addClass("sale_content").hide()
	},
	__My_shareClick: function() {
		$("body").on("click", ".My_share_Default", function() {
			var shd = $("<div />").text($(this).attr("stit")).html();
			var stxt = $(this).html();
			if ($(this).attr("v") == "axu") {
				$("#default_share h3").text(shd.replace(/\n/g, "<br />"));
				$("#default_share div.share_info").html(stxt)
			} else {
				$("#default_share h3").html(stxt);
				$("#default_share div.share_info").html('<div class="wordwrap">' + shd.replace(/\n/g, "<br />") + "</div>")
			}
			$("ul.etabs a[href='#default_share']").click()
		})
	},
	__My_modelsClick: function() {
		$("body").on("click", ".My_models_Default", function() {
			$("ul.etabs a[href='" + $(this).attr("xhr") + "']").click();
			$("html, body").scrollTop(0)
		});
		$("body").on("click", ".My_models", function() {
			var ids = $(this).attr("mid");
			ids = ids == "question" ? "AT6" : ids;
			Login.__GetAjax(ddom + "Login/Get/" + ids, "_models", $(this));
			$("html, body").scrollTop(0)
		})
	},
	__ADfixedClick: function() {
		$("body").on("click", "#fixedleft-ad a", function() {
			var floatclick = $(this).attr("floatclick");
			switch (floatclick) {
			case "-1":
				$("#fixedleft-ad").hide();
				break;
			default:
				if ($("body").hasClass("Ns")) $("#footer_btn a").each(function(i, obj) {
					var mid = $(this).attr("mid");
					if (mid == floatclick) obj.click()
				});
				else if ($("div.footer-links a[mid='" + floatclick + "']") != "undefined") $("div.footer-links a[mid='" + floatclick + "']").click()
			}
		}).on("click", "#fixedright-ad a", function() {
			var floatclick = $(this).attr("floatclick");
			switch (floatclick) {
			case "-1":
				$("#fixedright-ad").hide();
				break;
			default:
				if ($("body").hasClass("Ns")) $("#footer_btn a").each(function(i, obj) {
					var mid = $(this).attr("mid");
					if (mid == floatclick) obj.click()
				});
				else if ($("div.footer-links a[mid='" + floatclick + "']") != "undefined") $("div.footer-links a[mid='" + floatclick + "']").click()
			}
		})
	},
	showTime: function(t, BonusId) {
		t -= 1;
		Login.showDateNum(t, BonusId);
		if (t == 0) Login.ChkBonusId(BonusId);
		else {
			$("body").stopTime(BonusId + "_showTime");
			$("body").oneTime("1s", BonusId + "_showTime", function() {
				Login.showTime(t, BonusId)
			})
		}
	},
	ChkBonusId: function(BonusId) {
		$.get(ddom + "Op/getCountdown/" + BonusId + "/1", function(data) {
			if (data.IssueNumber == null) {
				$("#issue" + BonusId).html();
				$("#ticket_arr" + BonusId).html('<i class="fa fa-close"></i>');
				return false
			} else if (data.CountDown > 0) {
				$("#issue" + BonusId).html(data.IssueNumber);
				$("#ticket_arr" + BonusId).html('<i class="fa fa-check"></i>');
				var t = data.CountDown;
				Login.showTime(t, BonusId)
			} else $.get(ddom + "Op/getCountdown/" + BonusId + "/2", function(data) {
				if (data.CountDown > 0) {
					$("#issue" + BonusId).html(data.IssueNumber);
					$("#ticket_arr" + BonusId).html('<i class="fa fa-spinner fa-spin"></i>');
					var t = data.CountDown;
					Login.showTime(t, BonusId)
				} else {
					$("#issue" + BonusId).html();
					$("#ticket_arr" + BonusId).html('<i class="fa fa-close"></i>')
				}
			}, "json")
		}, "json")
	},
	showDateNum: function(t, BonusId) {
		var dd = new Date(t * 1E3);
		var sec = dd.getUTCSeconds();
		$("#tenSecond" + BonusId).html(parseInt(sec / 10));
		$("#Second" + BonusId).html(sec % 10);
		var minu = dd.getUTCMinutes();
		$("#tenminute" + BonusId).html(parseInt(minu / 10));
		$("#minute" + BonusId).html(minu % 10);
		var hour = dd.getUTCHours() + (dd.getUTCDate() - 1) * 24;
		$("#tenhour" + BonusId).html(parseInt(hour / 10));
		$("#hour" + BonusId).html(hour % 10);
		var tempta = $("#tenhour" + BonusId).text() + $("#hour" + BonusId).text() + $("#tenminute" + BonusId).text() + $("#minute" + BonusId).text() + $("#tenSecond" + BonusId).text() + $("#Second" + BonusId).text();
		if ($(".ticket").length > 0) switch (tempta) {
		case "000010":
		case "000009":
		case "000008":
		case "000007":
		case "000006":
		case "000005":
		case "000004":
		case "000003":
		case "000002":
		case "000001":
			$("#element-item" + BonusId).addClass("timesup");
			break;
		default:
			$("#element-item" + BonusId).removeClass("timesup")
		}
		if (tempta == "000000") {
			var r_sec = Math.floor(Math.random() * 10 + 5);
			$("body").stopTime(BonusId + "_Countdown");
			$("body").oneTime(r_sec + "s", BonusId + "_Countdown", function() {
				Login.ChkBonusId(BonusId)
			})
		}
	}
};
(function($) {
	$.easytabs = function(container, options) {
		var plugin = this,
			$container = $(container),
			defaults = {
				animate: true,
				panelActiveClass: "active",
				tabActiveClass: "active",
				defaultTab: "li:first-child",
				animationSpeed: "normal",
				tabs: "> ul > li",
				updateHash: true,
				cycle: false,
				collapsible: false,
				collapsedClass: "collapsed",
				collapsedByDefault: true,
				uiTabs: false,
				transitionIn: "fadeIn",
				transitionOut: "fadeOut",
				transitionInEasing: "swing",
				transitionOutEasing: "swing",
				transitionCollapse: "slideUp",
				transitionUncollapse: "slideDown",
				transitionCollapseEasing: "swing",
				transitionUncollapseEasing: "swing",
				containerClass: "",
				tabsClass: "",
				tabClass: "",
				panelClass: "",
				cache: true,
				event: "click",
				panelContext: $container
			},
			$defaultTab, $defaultTabLink, transitions, lastHash, skipUpdateToHash, animationSpeeds = {
				fast: 200,
				normal: 400,
				slow: 600
			},
			settings;
		plugin.init = function() {
			plugin.settings = settings = $.extend({}, defaults, options);
			settings.bind_str = settings.event + ".easytabs";
			if (settings.uiTabs) {
				settings.tabActiveClass = "ui-tabs-selected";
				settings.containerClass = "ui-tabs ui-widget ui-widget-content ui-corner-all";
				settings.tabsClass = "ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all";
				settings.tabClass = "ui-state-default ui-corner-top";
				settings.panelClass = "ui-tabs-panel ui-widget-content ui-corner-bottom"
			}
			if (settings.collapsible && options.defaultTab !== undefined && options.collpasedByDefault === undefined) settings.collapsedByDefault = false;
			if (typeof settings.animationSpeed === "string") settings.animationSpeed = animationSpeeds[settings.animationSpeed];
			$("a.anchor").remove().prependTo("body");
			$container.data("easytabs", {});
			plugin.setTransitions();
			plugin.getTabs();
			addClasses();
			setDefaultTab();
			bindToTabClicks();
			initHashChange();
			initCycle();
			$container.attr("data-easytabs", true)
		};
		plugin.setTransitions = function() {
			transitions = settings.animate ? {
				show: settings.transitionIn,
				hide: settings.transitionOut,
				speed: settings.animationSpeed,
				collapse: settings.transitionCollapse,
				uncollapse: settings.transitionUncollapse,
				halfSpeed: settings.animationSpeed / 2
			} : {
				show: "show",
				hide: "hide",
				speed: 0,
				collapse: "hide",
				uncollapse: "show",
				halfSpeed: 0
			}
		};
		plugin.getTabs = function() {
			var $matchingPanel;
			plugin.tabs = $container.find(settings.tabs), plugin.panels = $(), plugin.tabs.each(function() {
				var $tab = $(this),
					$a = $tab.children("a"),
					targetId = $tab.children("a").data("target");
				$tab.data("easytabs", {});
				if (targetId !== undefined && targetId !== null) $tab.data("easytabs").ajax = $a.attr("href");
				else targetId = $a.attr("href");
				targetId = targetId.match(/#([^\?]+)/)[1];
				$matchingPanel = settings.panelContext.find("#" + targetId);
				if ($matchingPanel.length) {
					$matchingPanel.data("easytabs", {
						position: $matchingPanel.css("position"),
						visibility: $matchingPanel.css("visibility")
					});
					$matchingPanel.not(settings.panelActiveClass).hide();
					plugin.panels = plugin.panels.add($matchingPanel);
					$tab.data("easytabs").panel = $matchingPanel
				} else {
					plugin.tabs = plugin.tabs.not($tab);
					if ("console" in window) console.warn("Warning: tab without matching panel for selector '#" + targetId + "' removed from set")
				}
			})
		};
		plugin.selectTab = function($clicked, callback) {
			var url = window.location,
				hash = url.hash.match(/^[^\?]*/)[0],
				$targetPanel = $clicked.parent().data("easytabs").panel,
				ajaxUrl = $clicked.parent().data("easytabs").ajax;
			if (settings.collapsible && !skipUpdateToHash && ($clicked.hasClass(settings.tabActiveClass) || $clicked.hasClass(settings.collapsedClass))) plugin.toggleTabCollapse($clicked, $targetPanel, ajaxUrl, callback);
			else if (!$clicked.hasClass(settings.tabActiveClass) || !$targetPanel.hasClass(settings.panelActiveClass)) activateTab($clicked, $targetPanel, ajaxUrl, callback);
			else if (!settings.cache) activateTab($clicked, $targetPanel, ajaxUrl, callback)
		};
		plugin.toggleTabCollapse = function($clicked, $targetPanel, ajaxUrl, callback) {
			plugin.panels.stop(true, true);
			if (fire($container, "easytabs:before", [$clicked, $targetPanel, settings])) {
				plugin.tabs.filter("." + settings.tabActiveClass).removeClass(settings.tabActiveClass).children().removeClass(settings.tabActiveClass);
				if ($clicked.hasClass(settings.collapsedClass)) {
					if (ajaxUrl && (!settings.cache || !$clicked.parent().data("easytabs").cached)) {
						$container.trigger("easytabs:ajax:beforeSend", [$clicked, $targetPanel]);
						$targetPanel.load(ajaxUrl, function(response, status, xhr) {
							$clicked.parent().data("easytabs").cached = true;
							$container.trigger("easytabs:ajax:complete", [$clicked, $targetPanel, response, status, xhr])
						})
					}
					$clicked.parent().removeClass(settings.collapsedClass).addClass(settings.tabActiveClass).children().removeClass(settings.collapsedClass).addClass(settings.tabActiveClass);
					$targetPanel.addClass(settings.panelActiveClass)[transitions.uncollapse](transitions.speed, settings.transitionUncollapseEasing, function() {
						$container.trigger("easytabs:midTransition", [$clicked, $targetPanel, settings]);
						if (typeof callback == "function") callback()
					})
				} else {
					$clicked.addClass(settings.collapsedClass).parent().addClass(settings.collapsedClass);
					$targetPanel.removeClass(settings.panelActiveClass)[transitions.collapse](transitions.speed, settings.transitionCollapseEasing, function() {
						$container.trigger("easytabs:midTransition", [$clicked, $targetPanel, settings]);
						if (typeof callback == "function") callback()
					})
				}
			}
		};
		plugin.matchTab = function(hash) {
			return plugin.tabs.find("[href='" + hash + "'],[data-target='" + hash + "']").first()
		};
		plugin.matchInPanel = function(hash) {
			return hash && plugin.validId(hash) ? plugin.panels.filter(":has(" + hash + ")").first() : []
		};
		plugin.validId = function(id) {
			return id.substr(1).match(/^[A-Za-z]+[A-Za-z0-9\-_:\.].$/)
		};
		plugin.selectTabFromHashChange = function() {
			var hash = window.location.hash.match(/^[^\?]*/)[0],
				$tab = plugin.matchTab(hash),
				$panel;
			if (settings.updateHash) if ($tab.length) {
				skipUpdateToHash = true;
				plugin.selectTab($tab)
			} else {
				$panel = plugin.matchInPanel(hash);
				if ($panel.length) {
					hash = "#" + $panel.attr("id");
					$tab = plugin.matchTab(hash);
					skipUpdateToHash = true;
					plugin.selectTab($tab)
				} else if (!$defaultTab.hasClass(settings.tabActiveClass) && !settings.cycle) if (hash === "" || plugin.matchTab(lastHash).length || $container.closest(hash).length) {
					skipUpdateToHash = true;
					plugin.selectTab($defaultTabLink)
				}
			}
		};
		plugin.cycleTabs = function(tabNumber) {
			if (settings.cycle) {
				tabNumber = tabNumber % plugin.tabs.length;
				$tab = $(plugin.tabs[tabNumber]).children("a").first();
				skipUpdateToHash = true;
				plugin.selectTab($tab, function() {
					setTimeout(function() {
						plugin.cycleTabs(tabNumber + 1)
					}, settings.cycle)
				})
			}
		};
		plugin.publicMethods = {
			select: function(tabSelector) {
				var $tab;
				if (($tab = plugin.tabs.filter(tabSelector)).length === 0) {
					if (($tab = plugin.tabs.find("a[href='" + tabSelector + "']")).length === 0) if (($tab = plugin.tabs.find("a" + tabSelector)).length === 0) if (($tab = plugin.tabs.find("[data-target='" + tabSelector + "']")).length === 0) if (($tab = plugin.tabs.find("a[href$='" + tabSelector + "']")).length === 0) $.error("Tab '" + tabSelector + "' does not exist in tab set")
				} else $tab = $tab.children("a").first();
				plugin.selectTab($tab)
			}
		};
		var fire = function(obj, name, data) {
				var event = $.Event(name);
				obj.trigger(event, data);
				return event.result !== false
			};
		var addClasses = function() {
				$container.addClass(settings.containerClass);
				plugin.tabs.parent().addClass(settings.tabsClass);
				plugin.tabs.addClass(settings.tabClass);
				plugin.panels.addClass(settings.panelClass)
			};
		var setDefaultTab = function() {
				var hash = window.location.hash.match(/^[^\?]*/)[0],
					$selectedTab = plugin.matchTab(hash).parent(),
					$panel;
				if ($selectedTab.length === 1) {
					$defaultTab = $selectedTab;
					settings.cycle = false
				} else {
					$panel = plugin.matchInPanel(hash);
					if ($panel.length) {
						hash = "#" + $panel.attr("id");
						$defaultTab = plugin.matchTab(hash).parent()
					} else {
						$defaultTab = plugin.tabs.parent().find(settings.defaultTab);
						if ($defaultTab.length === 0) $.error("The specified default tab ('" + settings.defaultTab + "') could not be found in the tab set ('" + settings.tabs + "') out of " + plugin.tabs.length + " tabs.")
					}
				}
				$defaultTabLink = $defaultTab.children("a").first();
				activateDefaultTab($selectedTab)
			};
		var activateDefaultTab = function($selectedTab) {
				var defaultPanel, defaultAjaxUrl;
				if (settings.collapsible && $selectedTab.length === 0 && settings.collapsedByDefault) $defaultTab.addClass(settings.collapsedClass).children().addClass(settings.collapsedClass);
				else {
					defaultPanel = $($defaultTab.data("easytabs").panel);
					defaultAjaxUrl = $defaultTab.data("easytabs").ajax;
					if (defaultAjaxUrl && (!settings.cache || !$defaultTab.data("easytabs").cached)) {
						$container.trigger("easytabs:ajax:beforeSend", [$defaultTabLink, defaultPanel]);
						defaultPanel.load(defaultAjaxUrl, function(response, status, xhr) {
							$defaultTab.data("easytabs").cached = true;
							$container.trigger("easytabs:ajax:complete", [$defaultTabLink, defaultPanel, response, status, xhr])
						})
					}
					$defaultTab.data("easytabs").panel.show().addClass(settings.panelActiveClass);
					$defaultTab.addClass(settings.tabActiveClass).children().addClass(settings.tabActiveClass)
				}
				$container.trigger("easytabs:initialised", [$defaultTabLink, defaultPanel])
			};
		var bindToTabClicks = function() {
				plugin.tabs.children("a").bind(settings.bind_str, function(e) {
					settings.cycle = false;
					skipUpdateToHash = false;
					plugin.selectTab($(this));
					e.preventDefault ? e.preventDefault() : e.returnValue = false
				})
			};
		var activateTab = function($clicked, $targetPanel, ajaxUrl, callback) {
				plugin.panels.stop(true, true);
				if (fire($container, "easytabs:before", [$clicked, $targetPanel, settings])) {
					var $visiblePanel = plugin.panels.filter(":visible"),
						$panelContainer = $targetPanel.parent(),
						targetHeight, visibleHeight, heightDifference, showPanel, hash = window.location.hash.match(/^[^\?]*/)[0];
					if (settings.animate) {
						targetHeight = getHeightForHidden($targetPanel);
						visibleHeight = $visiblePanel.length ? setAndReturnHeight($visiblePanel) : 0;
						heightDifference = targetHeight - visibleHeight
					}
					lastHash = hash;
					showPanel = function() {
						$container.trigger("easytabs:midTransition", [$clicked, $targetPanel, settings]);
						if (settings.animate && settings.transitionIn == "fadeIn") if (heightDifference < 0) $panelContainer.animate({
							height: $panelContainer.height() + heightDifference
						}, transitions.halfSpeed).css({
							"min-height": ""
						});
						if (settings.updateHash && !skipUpdateToHash) window.location.hash = "#" + $targetPanel.attr("id");
						else skipUpdateToHash = false;
						$targetPanel[transitions.show](transitions.speed, settings.transitionInEasing, function() {
							$panelContainer.css({
								height: "",
								"min-height": ""
							});
							$container.trigger("easytabs:after", [$clicked, $targetPanel, settings]);
							if (typeof callback == "function") callback()
						})
					};
					if (ajaxUrl && (!settings.cache || !$clicked.parent().data("easytabs").cached)) {
						$container.trigger("easytabs:ajax:beforeSend", [$clicked, $targetPanel]);
						$targetPanel.load(ajaxUrl, function(response, status, xhr) {
							$clicked.parent().data("easytabs").cached = true;
							$container.trigger("easytabs:ajax:complete", [$clicked, $targetPanel, response, status, xhr])
						})
					}
					if (settings.animate && settings.transitionOut == "fadeOut") if (heightDifference > 0) $panelContainer.animate({
						height: $panelContainer.height() + heightDifference
					}, transitions.halfSpeed);
					else $panelContainer.css({
						"min-height": $panelContainer.height()
					});
					plugin.tabs.filter("." + settings.tabActiveClass).removeClass(settings.tabActiveClass).children().removeClass(settings.tabActiveClass);
					plugin.tabs.filter("." + settings.collapsedClass).removeClass(settings.collapsedClass).children().removeClass(settings.collapsedClass);
					$clicked.parent().addClass(settings.tabActiveClass).children().addClass(settings.tabActiveClass);
					plugin.panels.filter("." + settings.panelActiveClass).removeClass(settings.panelActiveClass);
					$targetPanel.addClass(settings.panelActiveClass);
					if ($visiblePanel.length) $visiblePanel[transitions.hide](transitions.speed, settings.transitionOutEasing, showPanel);
					else $targetPanel[transitions.uncollapse](transitions.speed, settings.transitionUncollapseEasing, showPanel)
				}
			};
		var getHeightForHidden = function($targetPanel) {
				if ($targetPanel.data("easytabs") && $targetPanel.data("easytabs").lastHeight) return $targetPanel.data("easytabs").lastHeight;
				var display = $targetPanel.css("display"),
					outerCloak, height;
				try {
					outerCloak = $("<div></div>", {
						"position": "absolute",
						"visibility": "hidden",
						"overflow": "hidden"
					})
				} catch (e) {
					outerCloak = $("<div></div>", {
						"visibility": "hidden",
						"overflow": "hidden"
					})
				}
				height = $targetPanel.wrap(outerCloak).css({
					"position": "relative",
					"visibility": "hidden",
					"display": "block"
				}).outerHeight();
				$targetPanel.unwrap();
				$targetPanel.css({
					position: $targetPanel.data("easytabs").position,
					visibility: $targetPanel.data("easytabs").visibility,
					display: display
				});
				$targetPanel.data("easytabs").lastHeight = height;
				return height
			};
		var setAndReturnHeight = function($visiblePanel) {
				var height = $visiblePanel.outerHeight();
				if ($visiblePanel.data("easytabs")) $visiblePanel.data("easytabs").lastHeight = height;
				else $visiblePanel.data("easytabs", {
					lastHeight: height
				});
				return height
			};
		var initHashChange = function() {
				if (typeof $(window).hashchange === "function") $(window).hashchange(function() {
					plugin.selectTabFromHashChange()
				});
				else if ($.address && typeof $.address.change === "function") $.address.change(function() {
					plugin.selectTabFromHashChange()
				})
			};
		var initCycle = function() {
				var tabNumber;
				if (settings.cycle) {
					tabNumber = plugin.tabs.index($defaultTab);
					setTimeout(function() {
						plugin.cycleTabs(tabNumber + 1)
					}, settings.cycle)
				}
			};
		plugin.init()
	};
	$.fn.easytabs = function(options) {
		var args = arguments;
		return this.each(function() {
			var $this = $(this),
				plugin = $this.data("easytabs");
			if (undefined === plugin) {
				plugin = new $.easytabs(this, options);
				$this.data("easytabs", plugin)
			}
			if (plugin.publicMethods[options]) return plugin.publicMethods[options](Array.prototype.slice.call(args, 1))
		})
	}
})(jQuery);
(function() {
	function setup($) {
		$.fn._fadeIn = $.fn.fadeIn;
		var noOp = $.noop ||
		function() {};
		var msie = /MSIE/.test(navigator.userAgent);
		var ie6 = /MSIE 6.0/.test(navigator.userAgent) && !/MSIE 8.0/.test(navigator.userAgent);
		var mode = document.documentMode || 0;
		var setExpr = $.isFunction(document.createElement("div").style.setExpression);
		$.blockUI = function(opts) {
			install(window, opts)
		};
		$.unblockUI = function(opts) {
			remove(window, opts)
		};
		$.growlUI = function(title, message, timeout, onClose) {
			var $m = $('<div class="growlUI"></div>');
			if (title) $m.append("<h1>" + title + "</h1>");
			if (message) $m.append("<h2>" + message + "</h2>");
			if (timeout === undefined) timeout = 3E3;
			var callBlock = function(opts) {
					opts = opts || {};
					$.blockUI({
						message: $m,
						fadeIn: typeof opts.fadeIn !== "undefined" ? opts.fadeIn : 700,
						fadeOut: typeof opts.fadeOut !== "undefined" ? opts.fadeOut : 1E3,
						timeout: typeof opts.timeout !== "undefined" ? opts.timeout : timeout,
						centerY: false,
						showOverlay: false,
						onUnblock: onClose,
						css: $.blockUI.defaults.growlCSS
					})
				};
			callBlock();
			var nonmousedOpacity = $m.css("opacity");
			$m.mouseover(function() {
				callBlock({
					fadeIn: 0,
					timeout: 3E4
				});
				var displayBlock = $(".blockMsg");
				displayBlock.stop();
				displayBlock.fadeTo(300, 1)
			}).mouseout(function() {
				$(".blockMsg").fadeOut(1E3)
			})
		};
		$.fn.block = function(opts) {
			if (this[0] === window) {
				$.blockUI(opts);
				return this
			}
			var fullOpts = $.extend({}, $.blockUI.defaults, opts || {});
			this.each(function() {
				var $el = $(this);
				if (fullOpts.ignoreIfBlocked && $el.data("blockUI.isBlocked")) return;
				$el.unblock({
					fadeOut: 0
				})
			});
			return this.each(function() {
				if ($.css(this, "position") == "static") {
					this.style.position = "relative";
					$(this).data("blockUI.static", true)
				}
				this.style.zoom = 1;
				install(this, opts)
			})
		};
		$.fn.unblock = function(opts) {
			if (this[0] === window) {
				$.unblockUI(opts);
				return this
			}
			return this.each(function() {
				remove(this, opts)
			})
		};
		$.blockUI.version = 2.66;
		$.blockUI.defaults = {
			message: "<h1>Please wait...</h1>",
			title: null,
			draggable: true,
			theme: false,
			css: {
				padding: 0,
				margin: 0,
				width: "30%",
				top: "40%",
				left: "35%",
				textAlign: "center",
				color: "#000",
				border: "3px solid #aaa",
				backgroundColor: "#fff",
				cursor: "wait"
			},
			themedCSS: {
				width: "30%",
				top: "40%",
				left: "35%"
			},
			overlayCSS: {
				backgroundColor: "#000",
				opacity: .6,
				cursor: "wait"
			},
			cursorReset: "default",
			growlCSS: {
				width: "350px",
				top: "10px",
				left: "",
				right: "10px",
				border: "none",
				padding: "5px",
				opacity: .6,
				cursor: "default",
				color: "#fff",
				backgroundColor: "#000",
				"-webkit-border-radius": "10px",
				"-moz-border-radius": "10px",
				"border-radius": "10px"
			},
			iframeSrc: /^https/i.test(window.location.href || "") ? "javascript:false" : "about:blank",
			forceIframe: false,
			baseZ: 1E3,
			centerX: true,
			centerY: true,
			allowBodyStretch: true,
			bindEvents: true,
			constrainTabKey: true,
			fadeIn: 200,
			fadeOut: 400,
			timeout: 0,
			showOverlay: true,
			focusInput: true,
			focusableElements: ":input:enabled:visible",
			onBlock: null,
			onUnblock: null,
			onOverlayClick: null,
			quirksmodeOffsetHack: 4,
			blockMsgClass: "blockMsg",
			ignoreIfBlocked: false
		};
		var pageBlock = null;
		var pageBlockEls = [];

		function install(el, opts) {
			var css, themedCSS;
			var full = el == window;
			var msg = opts && opts.message !== undefined ? opts.message : undefined;
			opts = $.extend({}, $.blockUI.defaults, opts || {});
			if (opts.ignoreIfBlocked && $(el).data("blockUI.isBlocked")) return;
			opts.overlayCSS = $.extend({}, $.blockUI.defaults.overlayCSS, opts.overlayCSS || {});
			css = $.extend({}, $.blockUI.defaults.css, opts.css || {});
			if (opts.onOverlayClick) opts.overlayCSS.cursor = "pointer";
			themedCSS = $.extend({}, $.blockUI.defaults.themedCSS, opts.themedCSS || {});
			msg = msg === undefined ? opts.message : msg;
			if (full && pageBlock) remove(window, {
				fadeOut: 0
			});
			if (msg && typeof msg != "string" && (msg.parentNode || msg.jquery)) {
				var node = msg.jquery ? msg[0] : msg;
				var data = {};
				$(el).data("blockUI.history", data);
				data.el = node;
				data.parent = node.parentNode;
				data.display = node.style.display;
				data.position = node.style.position;
				if (data.parent) data.parent.removeChild(node)
			}
			$(el).data("blockUI.onUnblock", opts.onUnblock);
			var z = opts.baseZ;
			var lyr1, lyr2, lyr3, s;
			if (msie || opts.forceIframe) lyr1 = $('<iframe class="blockUI" style="z-index:' + z+++';display:none;border:none;margin:0;padding:0;position:absolute;width:100%;height:100%;top:0;left:0" src="../../' + opts.iframeSrc + '"></iframe>');
			else lyr1 = $('<div class="blockUI" style="display:none"></div>');
			if (opts.theme) lyr2 = $('<div class="blockUI blockOverlay ui-widget-overlay" style="z-index:' + z+++';display:none"></div>');
			else lyr2 = $('<div class="blockUI blockOverlay" style="z-index:' + z+++';display:none;border:none;margin:0;padding:0;width:100%;height:100%;top:0;left:0"></div>');
			if (opts.theme && full) {
				s = '<div class="blockUI ' + opts.blockMsgClass + ' blockPage ui-dialog ui-widget ui-corner-all" style="z-index:' + (z + 10) + ';display:none;position:fixed">';
				if (opts.title) s += '<div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">' + (opts.title || " ") + "</div>";
				s += '<div class="ui-widget-content ui-dialog-content"></div>';
				s += "</div>"
			} else if (opts.theme) {
				s = '<div class="blockUI ' + opts.blockMsgClass + ' blockElement ui-dialog ui-widget ui-corner-all" style="z-index:' + (z + 10) + ';display:none;position:absolute">';
				if (opts.title) s += '<div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">' + (opts.title || " ") + "</div>";
				s += '<div class="ui-widget-content ui-dialog-content"></div>';
				s += "</div>"
			} else if (full) s = '<div class="blockUI ' + opts.blockMsgClass + ' blockPage" style="z-index:' + (z + 10) + ';display:none;position:fixed"></div>';
			else s = '<div class="blockUI ' + opts.blockMsgClass + ' blockElement" style="z-index:' + (z + 10) + ';display:none;position:absolute"></div>';
			lyr3 = $(s);
			if (msg) if (opts.theme) {
				lyr3.css(themedCSS);
				lyr3.addClass("ui-widget-content")
			} else lyr3.css(css);
			if (!opts.theme) lyr2.css(opts.overlayCSS);
			lyr2.css("position", full ? "fixed" : "absolute");
			if (msie || opts.forceIframe) lyr1.css("opacity", 0);
			var layers = [lyr1, lyr2, lyr3],
				$par = full ? $("body") : $(el);
			$.each(layers, function() {
				this.appendTo($par)
			});
			if (opts.theme && opts.draggable && $.fn.draggable) lyr3.draggable({
				handle: ".ui-dialog-titlebar",
				cancel: "li"
			});
			var expr = setExpr && (!$.support.boxModel || $("object,embed", full ? null : el).length > 0);
			if (ie6 || expr) {
				if (full && opts.allowBodyStretch && $.support.boxModel) $("html,body").css("height", "100%");
				if ((ie6 || !$.support.boxModel) && !full) {
					var t = sz(el, "borderTopWidth"),
						l = sz(el, "borderLeftWidth");
					var fixT = t ? "(0 - " + t + ")" : 0;
					var fixL = l ? "(0 - " + l + ")" : 0
				}
				$.each(layers, function(i, o) {
					var s = o[0].style;
					s.position = "absolute";
					if (i < 2) {
						if (full) s.setExpression("height", "Math.max(document.body.scrollHeight, document.body.offsetHeight) - (jQuery.support.boxModel?0:" + opts.quirksmodeOffsetHack + ') + "px"');
						else s.setExpression("height", 'this.parentNode.offsetHeight + "px"');
						if (full) s.setExpression("width", 'jQuery.support.boxModel && document.documentElement.clientWidth || document.body.clientWidth + "px"');
						else s.setExpression("width", 'this.parentNode.offsetWidth + "px"');
						if (fixL) s.setExpression("left", fixL);
						if (fixT) s.setExpression("top", fixT)
					} else if (opts.centerY) {
						if (full) s.setExpression("top", '(document.documentElement.clientHeight || document.body.clientHeight) / 2 - (this.offsetHeight / 2) + (blah = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"');
						s.marginTop = 0
					} else if (!opts.centerY && full) {
						var top = opts.css && opts.css.top ? parseInt(opts.css.top, 10) : 0;
						var expression = "((document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + " + top + ') + "px"';
						s.setExpression("top", expression)
					}
				})
			}
			if (msg) {
				if (opts.theme) lyr3.find(".ui-widget-content").append(msg);
				else lyr3.append(msg);
				if (msg.jquery || msg.nodeType) $(msg).show()
			}
			if ((msie || opts.forceIframe) && opts.showOverlay) lyr1.show();
			if (opts.fadeIn) {
				var cb = opts.onBlock ? opts.onBlock : noOp;
				var cb1 = opts.showOverlay && !msg ? cb : noOp;
				var cb2 = msg ? cb : noOp;
				if (opts.showOverlay) lyr2._fadeIn(opts.fadeIn, cb1);
				if (msg) lyr3._fadeIn(opts.fadeIn, cb2)
			} else {
				if (opts.showOverlay) lyr2.show();
				if (msg) lyr3.show();
				if (opts.onBlock) opts.onBlock()
			}
			bind(1, el, opts);
			if (full) {
				pageBlock = lyr3[0];
				pageBlockEls = $(opts.focusableElements, pageBlock);
				if (opts.focusInput) setTimeout(focus, 20)
			} else center(lyr3[0], opts.centerX, opts.centerY);
			if (opts.timeout) {
				var to = setTimeout(function() {
					if (full) $.unblockUI(opts);
					else $(el).unblock(opts)
				}, opts.timeout);
				$(el).data("blockUI.timeout", to)
			}
		}
		function remove(el, opts) {
			var count;
			var full = el == window;
			var $el = $(el);
			var data = $el.data("blockUI.history");
			var to = $el.data("blockUI.timeout");
			if (to) {
				clearTimeout(to);
				$el.removeData("blockUI.timeout")
			}
			opts = $.extend({}, $.blockUI.defaults, opts || {});
			bind(0, el, opts);
			if (opts.onUnblock === null) {
				opts.onUnblock = $el.data("blockUI.onUnblock");
				$el.removeData("blockUI.onUnblock")
			}
			var els;
			if (full) els = $("body").children().filter(".blockUI").add("body > .blockUI");
			else els = $el.find(">.blockUI");
			if (opts.cursorReset) {
				if (els.length > 1) els[1].style.cursor = opts.cursorReset;
				if (els.length > 2) els[2].style.cursor = opts.cursorReset
			}
			if (full) pageBlock = pageBlockEls = null;
			if (opts.fadeOut) {
				count = els.length;
				els.stop().fadeOut(opts.fadeOut, function() {
					if (--count === 0) reset(els, data, opts, el)
				})
			} else reset(els, data, opts, el)
		}
		function reset(els, data, opts, el) {
			var $el = $(el);
			if ($el.data("blockUI.isBlocked")) return;
			els.each(function(i, o) {
				if (this.parentNode) this.parentNode.removeChild(this)
			});
			if (data && data.el) {
				data.el.style.display = data.display;
				data.el.style.position = data.position;
				if (data.parent) data.parent.appendChild(data.el);
				$el.removeData("blockUI.history")
			}
			if ($el.data("blockUI.static")) $el.css("position", "static");
			if (typeof opts.onUnblock == "function") opts.onUnblock(el, opts);
			var body = $(document.body),
				w = body.width(),
				cssW = body[0].style.width;
			body.width(w - 1).width(w);
			body[0].style.width = cssW
		}
		function bind(b, el, opts) {
			var full = el == window,
				$el = $(el);
			if (!b && (full && !pageBlock || !full && !$el.data("blockUI.isBlocked"))) return;
			$el.data("blockUI.isBlocked", b);
			if (!full || !opts.bindEvents || b && !opts.showOverlay) return;
			var events = "mousedown mouseup keydown keypress keyup touchstart touchend touchmove";
			if (b) $(document).bind(events, opts, handler);
			else $(document).unbind(events, handler)
		}
		function handler(e) {
			if (e.type === "keydown" && e.keyCode && e.keyCode == 9) if (pageBlock && e.data.constrainTabKey) {
				var els = pageBlockEls;
				var fwd = !e.shiftKey && e.target === els[els.length - 1];
				var back = e.shiftKey && e.target === els[0];
				if (fwd || back) {
					setTimeout(function() {
						focus(back)
					}, 10);
					return false
				}
			}
			var opts = e.data;
			var target = $(e.target);
			if (target.hasClass("blockOverlay") && opts.onOverlayClick) opts.onOverlayClick(e);
			if (target.parents("div." + opts.blockMsgClass).length > 0) return true;
			return target.parents().children().filter("div.blockUI").length === 0
		}
		function focus(back) {
			if (!pageBlockEls) return;
			var e = pageBlockEls[back === true ? pageBlockEls.length - 1 : 0];
			if (e) e.focus()
		}
		function center(el, x, y) {
			var p = el.parentNode,
				s = el.style;
			var l = (p.offsetWidth - el.offsetWidth) / 2 - sz(p, "borderLeftWidth");
			var t = (p.offsetHeight - el.offsetHeight) / 2 - sz(p, "borderTopWidth");
			if (x) s.left = l > 0 ? l + "px" : "0";
			if (y) s.top = t > 0 ? t + "px" : "0"
		}
		function sz(el, p) {
			return parseInt($.css(el, p), 10) || 0
		}
	}
	if (typeof define === "function" && define.amd && define.amd.jQuery) define(["jquery"], setup);
	else setup(jQuery)
})();
$(function() {
	var clientInfo = {
		"win": {
			url: $("#windows").text(),
			name: "PC"
		},
		"ios": {
			url: $("#ios").text(),
			name: "IOS"
		},
		"android": {
			url: $("#android").text(),
			name: "Android"
		}
	};
	var qrCodeUrl = {
		web: window.location.origin + window.location.pathname + "#customer",
		ios: "https://itunes.apple.com/cn/app/qr-code-reader-barcode-scanner/id903799541?mt=8&v0=WWW-GCTW-ITSTOP100-FREEAPPS&l=zh&ign-mpt=uo%3D4",
		android: "http://shouji.baidu.com/software/6364891.html"
	};

	function isWeChat() {
		var ua = navigator.userAgent.toLowerCase();
		return /micromessenger/.test(ua) ? true : false
	}
	function showWeChatNotify() {
		$.blockUI({
			theme: false,
			fadeIn: 200,
			css: {
				"border": "1px dashed #a0b0ad",
				"background-color": "#3c5071",
				"border-radius": "6px",
				"opacity": .8,
				"color": "#fff",
				"padding": "8px"
			},
			message: "" + '<h1 style="color:red; font-weight: bolder; font-size: 22px">' + '\t<i class="fa fa-exclamation-triangle fa-fw" style="color: #FFCA00"></i>' + "\tApp \u65e0\u6cd5\u4e0b\u8f7d" + "</h1>" + "<br />" + '<p style="text-align:left; clear:both; line-height: 18px">' + "\u3000\u3000\u4eb2\uff0c\u60a8\u662f\u4f7f\u7528\u5fae\u4fe1 QR-code \u626b\u63cf\uff0c\u8bf7\u60a8\u70b9\u51fb\u5f53\u524d\u753b\u9762\u53f3\u4e0a\u89d2\u6309\u94ae\uff0c\u5728\u5f39\u8df3\u51fa\u7684\u9009\u5355\u4e2d\uff0c\u70b9\u9009\u5728\u6d4f\u89c8\u5668\u4e2d\u6253\u5f00\uff0c\u518d\u70b9\u51fb\u5b89\u88c5\u5373\u53ef\u5b8c\u6210APP\u5b89\u88c5\u7a0b\u5e8f\u3002" + "</p>" + "<br />",
			centerX: true,
			centerY: true,
			overlayCSS: {
				backgroundColor: "black",
				opacity: .9,
				cursor: "wait"
			}
		})
	}
	$("<style>").text("" + "/**" + " * \u5ba2\u6237\u7aef\u4e0b\u8f7d\u89c6\u7a97" + " */" + "#clientDownload {" + "\twidth: 400px" + "}" + "/* \u5e73\u53f0\u9009\u62e9 */" + "#clientDownload .platform-wrap span {" + " display: inline-block;" + " cursor: pointer;" + " width: 33.33%;" + "}" + "/* \u5e73\u53f0\u9009\u62e9 - \u542f\u52a8 */" + "#clientDownload .platform-wrap > .active {" + "\tcolor: green;" + "}" + "/* \u5e73\u53f0\u9009\u62e9 - \u6ed1\u9f20\u79fb\u8fc7 */" + "#clientDownload .platform-wrap > span:hover {" + "\tcolor: red;" + "}" + "/* QR Code \u5bf9\u534a\u5206 */" + "#clientDownload #clientQrImg > * {" + "\tdisplay: inline-block;" + "\ttext-align: center;" + "\twidth: 100%;" + "}" + "/* QR Code \u5bf9\u9f50\u7f6e\u4e2d */" + "#clientDownload #clientQrImg > div > * {" + "\tmargin: auto;" + "}" + "/* \u5ba2\u6237\u7aef\u4e0b\u8f7d\u8fde\u7ed3 */" + "#clientDownload #clientUrl {" + "  padding: 16px 0 0 0;" + "  text-align: center;" + "  display: block;" + "  font-size: 22px;" + "}").appendTo("head");
	var showDownloadDialog = function() {
			var contentInfo = "" + '<div id="clientDownload">' + '<div class="platform-wrap">' + '<span align="center" valign="middle" data-platform="win">' + '<i style="cursor:pointer;" + class="fa fa-windows fa-3x"></i><br />' + "Windows\u5ba2\u6237\u7aef" + "</span>" + '<span align="center" valign="middle" data-platform="ios">' + '<i style="cursor:pointer;" class="fa fa-apple fa-3x"></i><br />' + "IOS\u4e13\u7528" + "</span>" + '<span align="center" valign="middle" data-platform="android">' + '<i style="cursor:pointer;" class="fa fa-android fa-3x"></i><br />' + "Android\u4e13\u7528" + "</span>" + "</div>" + '<a id="clientUrl">&gt; \u70b9\u51fb\u4e0b\u8f7d<span class="platform-name"></span>\u5ba2\u6237\u7aef &lt;</a><br />' + '<div id="clientQrImg" style="margin-bottom: 4px">'  + '<div id="iosQR">' + "\u63a8\u8350 QR Code \u626b\u63cf\u8f6f\u4ef6 <br /><img src='/images/2.png' width='160px' height='160px'/>" + "</div>" + '<div id="androidQR">' + "\u63a8\u8350 QR Code \u626b\u63cf\u8f6f\u4ef6 <br />" + "<img src='/images/1.png' width='160px' height='160px'/></div>" + "</div>" + "</div>";
			var dlg = dialog({
				title: "\u5ba2\u6237\u7aef\u4e0b\u8f7d",
				content: contentInfo
			}).showModal();
/*			var qrcode = new QRCode($("#webQR")[0], {
				text: qrCodeUrl.web,
				width: 160,
				height: 160,
				colorDark: "#333333",
				colorLight: "#ffffff",
				correctLevel: QRCode.CorrectLevel.M
			});*/
			var iosQR = new QRCode($("#iosQR")[0], {
				text: qrCodeUrl.ios,
				width: 160,
				height: 160,
				colorDark: "#333333",
				colorLight: "#ffffff",
				correctLevel: QRCode.CorrectLevel.M
			});
			var androidQR = new QRCode($("#androidQR")[0], {
				text: qrCodeUrl.android,
				width: 160,
				height: 160,
				colorDark: "#333333",
				colorLight: "#ffffff",
				correctLevel: QRCode.CorrectLevel.M
			});
			var $platformNode = $("#clientDownload .platform-wrap > span");
			$platformNode.on("click", "", function() {
				$(this).addClass("active").siblings().removeClass("active");
				var platform = $(this).attr("data-platform");
				$("#clientQrImg, #qrNotice")[platform == "win" ? "hide" : "show"]();
				$("#clientUrl").attr({
					"href": clientInfo[platform].url,
					"target": "_blank"
				}).children(".platform-name").text(clientInfo[platform].name);
				$("#iosQR, #iosQrNotice")[platform == "ios" ? "show" : "hide"]();
				$("#androidQR, #androidQrNotice")[platform == "android" ? "show" : "hide"]()
			});
			var clickPlatform = "win";
			if ($.ua().platform.isIos) clickPlatform = "ios";
			if ($.ua().platform.isAndroid) clickPlatform = "android";
			$platformNode.filter("[data-platform=" + clickPlatform + "]").click();
			$("#clientUrl").on("click", function() {
				if (isWeChat()) {
					showWeChatNotify();
					dlg.remove();
					return false
				}
			})
		};
	$("body").on("click", "#appDown", showDownloadDialog);
	if (window.location.hash == "#customer") showDownloadDialog()
});
$(function() {
	if ($.ua.isIe && ($.ua.isIe6 || $.ua.isIe7)) {
		var cc = $("body #NoSupport_IE67").removeClass("hide").clone();
		$("body").html(cc);
		return false
	} else {
		$("body").oneTime("3600s", "LoginCapth_Countdown", function() {
			dialog({
				title: "\u7cfb\u7edf\u63d0\u793a",
				content: "\u76ee\u524d\u767b\u5165\u9a8c\u8bc1\u7801\u5df2\u5931\u6548\uff0c\u786e\u8ba4\u540e\u5c06\u81ea\u52a8\u5237\u65b0\u5f53\u524d\u9875\u9762\u3002",
				ok: function() {
					this.title("\u5237\u65b0\u4e2d\u2026");
					window.location.reload();
					return false
				},
				okValue: "\u786e\u8ba4"
			}).width(400).showModal()
		});
		if ($(".webonlineservice").length > 0) Login.__GetAjax(ddom + "Login/Get/server_url", "server_url");
		$("body").on("keydown", "form#login_form input[name='authnum']", function() {
			if (event.keyCode == 13) {
				$("form#login_form #send-button").click();
				if (event.preventDefault) event.preventDefault();
				else event.returnValue = false
			}
		});
		$("#login_form").on("click", "#send-button", function() {
			if (!$("form#login_form").valid()) return false;
			else Login.__AjaxFun("post", ddom + "/api/login", false, "json", "Login.__InitLogin", $("form#login_form").serialize())
		});
		$(".top [title]").tipsy({
			gravity: "n"
		});
		$("[title]").tipsy({
			gravity: "s"
		});
		FastClick.attach(document.body)
	}
});