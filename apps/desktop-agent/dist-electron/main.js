import { createRequire as e } from "node:module";
import { BrowserWindow as t, app as n, ipcMain as r } from "electron";
import { fileURLToPath as i } from "node:url";
import a from "node:path";
import o from "util";
import s, { Readable as c } from "stream";
import { resolve as l } from "path";
import u from "http";
import d from "https";
import f from "url";
import p from "fs";
import m from "crypto";
import h from "node:process";
import g from "node:os";
import _ from "node:tty";
import { EventEmitter as ee } from "events";
import v from "http2";
import y from "zlib";
import { exec as b } from "child_process";
//#region \0rolldown/runtime.js
var x = Object.create, S = Object.defineProperty, C = Object.getOwnPropertyDescriptor, w = Object.getOwnPropertyNames, te = Object.getPrototypeOf, T = Object.prototype.hasOwnProperty, E = (e, t, n) => () => {
	if (n) throw n[0];
	try {
		return e && (t = e(e = 0)), t;
	} catch (e) {
		throw n = [e], e;
	}
}, D = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), O = (e, t) => {
	let n = {};
	for (var r in e) S(n, r, {
		get: e[r],
		enumerable: !0
	});
	return t || S(n, Symbol.toStringTag, { value: "Module" }), n;
}, k = (e, t, n, r) => {
	if (t && typeof t == "object" || typeof t == "function") for (var i = w(t), a = 0, o = i.length, s; a < o; a++) s = i[a], !T.call(e, s) && s !== n && S(e, s, {
		get: ((e) => t[e]).bind(null, s),
		enumerable: !(r = C(t, s)) || r.enumerable
	});
	return e;
}, A = (e, t, n) => (n = e == null ? {} : x(te(e)), k(t || !e || !e.__esModule || !T.call(e, "default") ? S(n, "default", {
	value: e,
	enumerable: !0
}) : n, e)), j = (e) => T.call(e, "module.exports") ? e["module.exports"] : k(S({}, "__esModule", { value: !0 }), e), M = /* @__PURE__ */ e(import.meta.url);
//#endregion
//#region node_modules/axios/lib/helpers/bind.js
function N(e, t) {
	return function() {
		return e.apply(t, arguments);
	};
}
//#endregion
//#region node_modules/axios/lib/utils.js
var { toString: P } = Object.prototype, { getPrototypeOf: F } = Object, { iterator: I, toStringTag: L } = Symbol, R = (({ hasOwnProperty: e }) => (t, n) => e.call(t, n))(Object.prototype), ne = (e) => typeof e == "string" && (e === "__proto__" || e === "constructor" || e === "prototype"), z = (e, t, n) => e === Object.prototype || !n && t === null, B = (e) => {
	if (!Object.isExtensible(e)) return !1;
	let t = Object.getOwnPropertyNames(e);
	return Object.getOwnPropertySymbols && t.push(...Object.getOwnPropertySymbols(e)), t.every((t) => {
		if (ne(t)) return !1;
		let n = Object.getOwnPropertyDescriptor(e, t);
		return !!n && n.configurable && n.writable === !0;
	});
}, V = (e, t) => {
	let n = e, r = [];
	for (; n != null;) {
		if (r.indexOf(n) !== -1) return !1;
		r.push(n);
		let i = F(n);
		if (z(n, i, n === e)) return !1;
		if (R(n, t)) return !0;
		n = i;
	}
	return !1;
}, re = (e, t) => e != null && V(e, t) ? e[t] : void 0, ie = (e) => {
	if (e == null || typeof e != "object" && typeof e != "function") return e;
	let t = F(e);
	if (t === null && B(e)) return e;
	let n = Object.create(null), r = Object.create(null), i = [], a = e;
	for (; a != null && i.indexOf(a) === -1;) {
		i.push(a);
		let o = a === e ? t : F(a);
		if (z(a, o, a === e)) break;
		let s = Object.getOwnPropertyNames(a);
		Object.getOwnPropertySymbols && s.push(...Object.getOwnPropertySymbols(a));
		for (let t of s) ne(t) || R(r, t) || (n[t] = e[t], r[t] = !0);
		a = o;
	}
	return n;
}, ae = ((e) => (t) => {
	let n = P.call(t);
	return e[n] || (e[n] = n.slice(8, -1).toLowerCase());
})(Object.create(null)), H = (e) => (e = e.toLowerCase(), (t) => ae(t) === e), oe = (e) => (t) => typeof t === e, { isArray: se } = Array, U = oe("undefined");
function ce(e) {
	return e !== null && !U(e) && e.constructor !== null && !U(e.constructor) && G(e.constructor.isBuffer) && e.constructor.isBuffer(e);
}
var le = H("ArrayBuffer");
function W(e) {
	let t;
	return t = typeof ArrayBuffer < "u" && ArrayBuffer.isView ? ArrayBuffer.isView(e) : e && e.buffer && le(e.buffer), t;
}
var ue = oe("string"), G = oe("function"), de = oe("number"), fe = (e) => typeof e == "object" && !!e, pe = (e) => e === !0 || e === !1, me = (e) => {
	if (!fe(e)) return !1;
	let t = F(e);
	return (t === null || t === Object.prototype || F(t) === null) && !V(e, L) && !V(e, I);
}, he = (e) => {
	if (!fe(e) || ce(e)) return !1;
	try {
		return Object.keys(e).length === 0 && Object.getPrototypeOf(e) === Object.prototype;
	} catch {
		return !1;
	}
}, ge = H("Date"), _e = H("File"), ve = (e) => !!(e && e.uri !== void 0), ye = (e) => e && e.getParts !== void 0, be = H("Blob"), xe = H("FileList"), Se = H("Set"), Ce = (e) => fe(e) && G(e.pipe);
function we() {
	return typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {};
}
var Te = we(), Ee = Te.FormData === void 0 ? void 0 : Te.FormData, De = (e) => {
	if (!e) return !1;
	if (Ee && e instanceof Ee) return !0;
	let t = F(e);
	if (!t || t === Object.prototype || !G(e.append)) return !1;
	let n = ae(e);
	return n === "formdata" || n === "object" && G(e.toString) && e.toString() === "[object FormData]";
}, Oe = H("URLSearchParams"), [ke, Ae, je, Me] = [
	"ReadableStream",
	"Request",
	"Response",
	"Headers"
].map(H), Ne = (e) => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function Pe(e, t, { allOwnKeys: n = !1 } = {}) {
	if (e == null) return;
	let r, i;
	if (typeof e != "object" && (e = [e]), se(e)) for (r = 0, i = e.length; r < i; r++) t.call(null, e[r], r, e);
	else {
		if (ce(e)) return;
		let i = n ? Object.getOwnPropertyNames(e) : Object.keys(e), a = i.length, o;
		for (r = 0; r < a; r++) o = i[r], t.call(null, e[o], o, e);
	}
}
function Fe(e, t) {
	if (ce(e)) return null;
	t = t.toLowerCase();
	let n = Object.keys(e), r = n.length, i;
	for (; r-- > 0;) if (i = n[r], t === i.toLowerCase()) return i;
	return null;
}
var Ie = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global, Le = (e) => !U(e) && e !== Ie;
function Re(...e) {
	let { caseless: t, skipUndefined: n } = Le(this) && this || {}, r = {}, i = (e, i) => {
		if (i === "__proto__" || i === "constructor" || i === "prototype") return;
		let a = t && typeof i == "string" && Fe(r, i) || i, o = R(r, a) ? r[a] : void 0;
		me(o) && me(e) ? r[a] = Re(o, e) : me(e) ? r[a] = Re({}, e) : se(e) ? r[a] = e.slice() : (!n || !U(e)) && (r[a] = e);
	};
	for (let t = 0, n = e.length; t < n; t++) {
		let n = e[t];
		if (!n || ce(n) || (Pe(n, i), typeof n != "object" || se(n))) continue;
		let r = Object.getOwnPropertySymbols(n);
		for (let e = 0; e < r.length; e++) {
			let t = r[e];
			Xe.call(n, t) && i(n[t], t);
		}
	}
	return r;
}
var ze = (e, t, n, { allOwnKeys: r } = {}) => (Pe(t, (t, r) => {
	n && G(t) ? Object.defineProperty(e, r, {
		__proto__: null,
		value: N(t, n),
		writable: !0,
		enumerable: !0,
		configurable: !0
	}) : Object.defineProperty(e, r, {
		__proto__: null,
		value: t,
		writable: !0,
		enumerable: !0,
		configurable: !0
	});
}, { allOwnKeys: r }), e), Be = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e), Ve = (e, t, n, r) => {
	e.prototype = Object.create(t.prototype, r), Object.defineProperty(e.prototype, "constructor", {
		__proto__: null,
		value: e,
		writable: !0,
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(e, "super", {
		__proto__: null,
		value: t.prototype
	}), n && Object.assign(e.prototype, n);
}, He = (e, t, n, r) => {
	let i, a, o, s = {};
	if (t ||= {}, e == null) return t;
	do {
		for (i = Object.getOwnPropertyNames(e), a = i.length; a-- > 0;) o = i[a], (!r || r(o, e, t)) && !s[o] && (t[o] = e[o], s[o] = !0);
		e = n !== !1 && F(e);
	} while (e && (!n || n(e, t)) && e !== Object.prototype);
	return t;
}, Ue = (e, t, n) => {
	e = String(e), (n === void 0 || n > e.length) && (n = e.length), n -= t.length;
	let r = e.indexOf(t, n);
	return r !== -1 && r === n;
}, We = (e) => {
	if (!e) return null;
	if (se(e)) return e;
	let t = e.length;
	if (!de(t)) return null;
	let n = Array(t);
	for (; t-- > 0;) n[t] = e[t];
	return n;
}, Ge = ((e) => (t) => e && t instanceof e)(typeof Uint8Array < "u" && F(Uint8Array)), Ke = (e, t) => {
	let n = (e && e[I]).call(e), r;
	for (; (r = n.next()) && !r.done;) {
		let n = r.value;
		t.call(e, n[0], n[1]);
	}
}, qe = (e, t) => {
	let n, r = [];
	for (; (n = e.exec(t)) !== null;) r.push(n);
	return r;
}, Je = H("HTMLFormElement"), Ye = (e) => e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function(e, t, n) {
	return t.toUpperCase() + n;
}), { propertyIsEnumerable: Xe } = Object.prototype, Ze = H("RegExp"), Qe = (e, t) => {
	let n = Object.getOwnPropertyDescriptors(e), r = {};
	Pe(n, (n, i) => {
		let a;
		(a = t(n, i, e)) !== !1 && (r[i] = a || n);
	}), Object.defineProperties(e, r);
}, $e = (e) => {
	Qe(e, (t, n) => {
		if (G(e) && [
			"arguments",
			"caller",
			"callee"
		].includes(n)) return !1;
		let r = e[n];
		if (G(r)) {
			if (t.enumerable = !1, "writable" in t) {
				t.writable = !1;
				return;
			}
			t.set ||= () => {
				throw Error("Can not rewrite read-only method '" + n + "'");
			};
		}
	});
}, et = (e, t) => {
	let n = {}, r = (e) => {
		e.forEach((e) => {
			n[e] = !0;
		});
	};
	return se(e) ? r(e) : r(String(e).split(t)), n;
}, tt = () => {}, nt = (e, t) => e != null && Number.isFinite(e = +e) ? e : t;
function rt(e) {
	return !!(e && G(e.append) && e[L] === "FormData" && e[I]);
}
var it = (e) => {
	let t = /* @__PURE__ */ new WeakSet(), n = (e) => {
		if (fe(e)) {
			if (t.has(e)) return;
			if (ce(e)) return e;
			if (!("toJSON" in e)) {
				t.add(e);
				let r;
				if (Se(e)) {
					r = [];
					for (let t of e) {
						let e = n(t);
						!U(e) && r.push(e);
					}
				} else r = se(e) ? [] : {}, Pe(e, (e, t) => {
					let i = n(e);
					!U(i) && (r[t] = i);
				});
				return t.delete(e), r;
			}
		}
		return e;
	};
	return n(e);
}, at = H("AsyncFunction"), ot = (e) => e && (fe(e) || G(e)) && G(e.then) && G(e.catch), st = ((e, t) => e ? setImmediate : t ? ((e, t) => (Ie.addEventListener("message", ({ source: n, data: r }) => {
	n === Ie && r === e && t.length && t.shift()();
}, !1), (n) => {
	t.push(n), Ie.postMessage(e, "*");
}))(`axios@${Math.random()}`, []) : (e) => setTimeout(e))(typeof setImmediate == "function", G(Ie.postMessage)), ct = typeof queueMicrotask < "u" ? queueMicrotask.bind(Ie) : typeof process < "u" && process.nextTick || st, lt = (e) => e != null && G(e[I]), K = {
	isArray: se,
	isArrayBuffer: le,
	isBuffer: ce,
	isFormData: De,
	isArrayBufferView: W,
	isString: ue,
	isNumber: de,
	isBoolean: pe,
	isObject: fe,
	isPlainObject: me,
	isEmptyObject: he,
	isReadableStream: ke,
	isRequest: Ae,
	isResponse: je,
	isHeaders: Me,
	isUndefined: U,
	isDate: ge,
	isFile: _e,
	isReactNativeBlob: ve,
	isReactNative: ye,
	isBlob: be,
	isRegExp: Ze,
	isFunction: G,
	isStream: Ce,
	isURLSearchParams: Oe,
	isTypedArray: Ge,
	isFileList: xe,
	forEach: Pe,
	merge: Re,
	extend: ze,
	trim: Ne,
	stripBOM: Be,
	inherits: Ve,
	toFlatObject: He,
	kindOf: ae,
	kindOfTest: H,
	endsWith: Ue,
	toArray: We,
	forEachEntry: Ke,
	matchAll: qe,
	isHTMLForm: Je,
	hasOwnProperty: R,
	hasOwnProp: R,
	hasOwnInPrototypeChain: V,
	getSafeProp: re,
	toSafeFlatObject: ie,
	reduceDescriptors: Qe,
	freezeMethods: $e,
	toObjectSet: et,
	toCamelCase: Ye,
	noop: tt,
	toFiniteNumber: nt,
	findKey: Fe,
	global: Ie,
	isContextDefined: Le,
	isSpecCompliantForm: rt,
	toJSONObject: it,
	isAsyncFn: at,
	isThenable: ot,
	setImmediate: st,
	asap: ct,
	isIterable: lt,
	isSafeIterable: (e) => e != null && V(e, I) && lt(e)
}, ut = K.toObjectSet([
	"age",
	"authorization",
	"content-length",
	"content-type",
	"etag",
	"expires",
	"from",
	"host",
	"if-modified-since",
	"if-unmodified-since",
	"last-modified",
	"location",
	"max-forwards",
	"proxy-authorization",
	"referer",
	"retry-after",
	"user-agent"
]), dt = (e) => {
	let t = {}, n, r, i;
	return e && e.split("\n").forEach(function(e) {
		i = e.indexOf(":"), n = e.substring(0, i).trim().toLowerCase(), r = e.substring(i + 1).trim();
		let a = K.hasOwnProp(t, n);
		!n || a && K.hasOwnProp(ut, n) || (n === "set-cookie" ? a ? t[n].push(r) : t[n] = [r] : t[n] = a ? t[n] + ", " + r : r);
	}), t;
};
//#endregion
//#region node_modules/axios/lib/helpers/sanitizeHeaderValue.js
function ft(e) {
	let t = 0, n = e.length;
	for (; t < n;) {
		let n = e.charCodeAt(t);
		if (n !== 9 && n !== 32) break;
		t += 1;
	}
	for (; n > t;) {
		let t = e.charCodeAt(n - 1);
		if (t !== 9 && t !== 32) break;
		--n;
	}
	return t === 0 && n === e.length ? e : e.slice(t, n);
}
var pt = /* @__PURE__ */ RegExp("[\\u0000-\\u0008\\u000a-\\u001f\\u007f]+", "g"), mt = /* @__PURE__ */ RegExp("[^\\u0009\\u0020-\\u007e\\u0080-\\u00ff]+", "g");
function ht(e, t) {
	return K.isArray(e) ? e.map((e) => ht(e, t)) : ft(String(e).replace(t, ""));
}
var gt = (e) => ht(e, pt), _t = (e) => ht(e, mt);
function vt(e) {
	let t = Object.create(null);
	return K.forEach(e.toJSON(), (e, n) => {
		t[n] = _t(e);
	}), t;
}
//#endregion
//#region node_modules/axios/lib/core/AxiosHeaders.js
var yt = Symbol("internals");
function bt(e) {
	return e && String(e).trim().toLowerCase();
}
function xt(e) {
	return e === !1 || e == null ? e : K.isArray(e) ? e.map(xt) : gt(String(e));
}
function St(e) {
	let t = Object.create(null), n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g, r;
	for (; r = n.exec(e);) t[r[1]] = r[2];
	return t;
}
var Ct = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/;
function wt(e) {
	let t = 0, n = e.length;
	for (; t < n;) {
		let n = e.charCodeAt(t);
		if (n !== 9 && n !== 32) break;
		t += 1;
	}
	for (; n > t;) {
		let t = e.charCodeAt(n - 1);
		if (t !== 9 && t !== 32) break;
		--n;
	}
	return t === 0 && n === e.length ? e : e.slice(t, n);
}
function Tt(e) {
	let t = e.length - 1;
	if (t < 1 || e.charCodeAt(0) !== 34 || e.charCodeAt(t) !== 34) return e;
	let n = "";
	for (let r = 1; r < t; r++) {
		let i = e.charCodeAt(r);
		if (i === 34 || i === 92 && (r += 1, r >= t)) return e;
		n += e[r];
	}
	return n;
}
function Et(e) {
	let t = Object.create(null), n = String(e), r = 0, i = !1, a = !1;
	function o(e) {
		let i = wt(n.slice(r, e)), a = i.indexOf("=");
		if (a < 1) return;
		let o = wt(i.slice(0, a));
		if (!Ct.test(o)) return;
		let s = o.toLowerCase();
		if (s === "__proto__" || s === "constructor" || s === "prototype") return;
		let c = wt(i.slice(a + 1));
		t[s] = Tt(c);
	}
	for (let e = 0; e < n.length; e++) {
		let t = n.charCodeAt(e);
		i ? a ? a = !1 : t === 92 ? a = !0 : t === 34 && (i = !1) : t === 34 ? i = !0 : (t === 44 || t === 59) && (o(e), r = e + 1);
	}
	return o(n.length), t;
}
var Dt = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function Ot(e, t, n, r, i) {
	if (K.isFunction(r)) return r.call(this, t, n);
	if (i && (t = n), K.isString(t)) {
		if (K.isString(r)) return t.indexOf(r) !== -1;
		if (K.isRegExp(r)) return r.test(t);
	}
}
function kt(e) {
	return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (e, t, n) => t.toUpperCase() + n);
}
function At(e, t) {
	let n = K.toCamelCase(" " + t);
	[
		"get",
		"set",
		"has"
	].forEach((r) => {
		Object.defineProperty(e, r + n, {
			__proto__: null,
			value: function(e, n, i) {
				return this[r].call(this, t, e, n, i);
			},
			configurable: !0
		});
	});
}
var q = class {
	constructor(e) {
		e && this.set(e);
	}
	set(e, t, n) {
		let r = this;
		function i(e, t, n) {
			let i = bt(t);
			if (!i) return;
			let a = K.findKey(r, i);
			(!a || r[a] === void 0 || n === !0 || n === void 0 && r[a] !== !1) && (r[a || t] = xt(e));
		}
		let a = (e, t) => K.forEach(e, (e, n) => i(e, n, t));
		if (K.isPlainObject(e) || e instanceof this.constructor) a(e, t);
		else if (K.isString(e) && (e = e.trim()) && !Dt(e)) a(dt(e), t);
		else if (K.isObject(e) && K.isSafeIterable(e)) {
			let n = Object.create(null), r, i;
			for (let t of e) {
				if (!K.isArray(t)) throw TypeError("Object iterator must return a key-value pair");
				i = t[0], K.hasOwnProp(n, i) ? (r = n[i], n[i] = K.isArray(r) ? [...r, t[1]] : [r, t[1]]) : n[i] = t[1];
			}
			a(n, t);
		} else e != null && i(t, e, n);
		return this;
	}
	get(e, t) {
		if (e = bt(e), e) {
			let n = K.findKey(this, e);
			if (n) {
				let e = this[n];
				if (!t) return e;
				if (t === !0) return St(e);
				if (K.isFunction(t)) return t.call(this, e, n);
				if (K.isRegExp(t)) return t.exec(e);
				throw TypeError("parser must be boolean|regexp|function");
			}
		}
	}
	has(e, t) {
		if (e = bt(e), e) {
			let n = K.findKey(this, e);
			return !(!n || this[n] === void 0 || t && !Ot(this, this[n], n, t));
		}
		return !1;
	}
	delete(e, t) {
		let n = this, r = !1;
		function i(e) {
			if (e = bt(e), e) {
				let i = K.findKey(n, e);
				i && (!t || Ot(n, n[i], i, t)) && (delete n[i], r = !0);
			}
		}
		return K.isArray(e) ? e.forEach(i) : i(e), r;
	}
	clear(e) {
		let t = Object.keys(this), n = t.length, r = !1;
		for (; n--;) {
			let i = t[n];
			(!e || Ot(this, this[i], i, e, !0)) && (delete this[i], r = !0);
		}
		return r;
	}
	normalize(e) {
		let t = this, n = {};
		return K.forEach(this, (r, i) => {
			let a = K.findKey(n, i);
			if (a) {
				t[a] = xt(r), delete t[i];
				return;
			}
			let o = e ? kt(i) : String(i).trim();
			o !== i && delete t[i], t[o] = xt(r), n[o] = !0;
		}), this;
	}
	concat(...e) {
		return this.constructor.concat(this, ...e);
	}
	toJSON(e) {
		let t = Object.create(null);
		return K.forEach(this, (n, r) => {
			n != null && n !== !1 && (t[r] = e && K.isArray(n) ? n.join(", ") : n);
		}), t;
	}
	[Symbol.iterator]() {
		return Object.entries(this.toJSON())[Symbol.iterator]();
	}
	toString() {
		return Object.entries(this.toJSON()).map(([e, t]) => e + ": " + t).join("\n");
	}
	getSetCookie() {
		let e = this.get("set-cookie");
		return K.isArray(e) ? e : e == null || e === !1 ? [] : [e];
	}
	get [Symbol.toStringTag]() {
		return "AxiosHeaders";
	}
	static from(e) {
		return e instanceof this ? e : new this(e);
	}
	static parseParameters(e) {
		return Et(e);
	}
	static concat(e, ...t) {
		let n = new this(e);
		return t.forEach((e) => n.set(e)), n;
	}
	static accessor(e) {
		let t = (this[yt] = this[yt] = { accessors: {} }).accessors, n = this.prototype;
		function r(e) {
			let r = bt(e);
			t[r] || (At(n, e), t[r] = !0);
		}
		return K.isArray(e) ? e.forEach(r) : r(e), this;
	}
};
q.accessor([
	"Content-Type",
	"Content-Length",
	"Accept",
	"Accept-Encoding",
	"User-Agent",
	"Authorization"
]), K.reduceDescriptors(q.prototype, ({ value: e }, t) => {
	let n = t[0].toUpperCase() + t.slice(1);
	return {
		get: () => e,
		set(e) {
			this[n] = e;
		}
	};
}), K.freezeMethods(q);
//#endregion
//#region node_modules/axios/lib/core/AxiosError.js
var jt = "[REDACTED ****]";
function Mt(e) {
	if (K.hasOwnProp(e, "toJSON")) return !0;
	let t = Object.getPrototypeOf(e);
	for (; t && t !== Object.prototype;) {
		if (K.hasOwnProp(t, "toJSON")) return !0;
		t = Object.getPrototypeOf(t);
	}
	return !1;
}
function Nt(e, t) {
	let n = new Set(t.map((e) => String(e).toLowerCase())), r = [], i = (e) => {
		if (typeof e != "object" || !e || K.isBuffer(e)) return e;
		if (r.indexOf(e) !== -1) return;
		e instanceof q && (e = e.toJSON()), r.push(e);
		let t;
		if (K.isArray(e)) t = [], e.forEach((e, n) => {
			let r = i(e);
			K.isUndefined(r) || (t[n] = r);
		});
		else {
			if (!K.isPlainObject(e) && Mt(e)) return r.pop(), e;
			t = Object.create(null);
			for (let [r, a] of Object.entries(e)) {
				let e = n.has(r.toLowerCase()) ? jt : i(a);
				K.isUndefined(e) || (t[r] = e);
			}
		}
		return r.pop(), t;
	};
	return i(e);
}
function Pt(e) {
	try {
		return String(e);
	} catch {
		return "";
	}
}
function Ft(e) {
	return e.errors.map((e) => {
		try {
			return e && e.message ? Pt(e.message) : Pt(e);
		} catch {
			return "";
		}
	}).filter(Boolean).join("; ") || e.name || "AggregateError";
}
var J = class e extends Error {
	static from(t, n, r, i, a, o) {
		let s = t.message;
		!s && K.isArray(t.errors) && t.errors.length && (s = Ft(t));
		let c = new e(s, n || t.code, r, i, a);
		return Object.defineProperty(c, "cause", {
			__proto__: null,
			value: t,
			writable: !0,
			enumerable: !1,
			configurable: !0
		}), c.name = t.name, t.status != null && c.status == null && (c.status = t.status), o && Object.assign(c, o), c;
	}
	constructor(e, t, n, r, i) {
		super(e), Object.defineProperty(this, "message", {
			__proto__: null,
			value: e,
			enumerable: !0,
			writable: !0,
			configurable: !0
		}), this.name = "AxiosError", this.isAxiosError = !0, t && (this.code = t), n && (this.config = n), r && (this.request = r), i && (this.response = i, this.status = i.status);
	}
	toJSON() {
		let e = this.config, t = e && K.hasOwnProp(e, "redact") ? e.redact : void 0, n = K.isArray(t) && t.length > 0 ? Nt(e, t) : K.toJSONObject(e);
		return {
			message: this.message,
			name: this.name,
			description: this.description,
			number: this.number,
			fileName: this.fileName,
			lineNumber: this.lineNumber,
			columnNumber: this.columnNumber,
			stack: this.stack,
			config: n,
			code: this.code,
			status: this.status
		};
	}
};
J.ERR_BAD_OPTION_VALUE = "ERR_BAD_OPTION_VALUE", J.ERR_BAD_OPTION = "ERR_BAD_OPTION", J.ECONNABORTED = "ECONNABORTED", J.ETIMEDOUT = "ETIMEDOUT", J.ECONNREFUSED = "ECONNREFUSED", J.ERR_NETWORK = "ERR_NETWORK", J.ERR_FR_TOO_MANY_REDIRECTS = "ERR_FR_TOO_MANY_REDIRECTS", J.ERR_DEPRECATED = "ERR_DEPRECATED", J.ERR_BAD_RESPONSE = "ERR_BAD_RESPONSE", J.ERR_BAD_REQUEST = "ERR_BAD_REQUEST", J.ERR_CANCELED = "ERR_CANCELED", J.ERR_NOT_SUPPORT = "ERR_NOT_SUPPORT", J.ERR_INVALID_URL = "ERR_INVALID_URL", J.ERR_FORM_DATA_DEPTH_EXCEEDED = "ERR_FORM_DATA_DEPTH_EXCEEDED";
//#endregion
//#region node_modules/delayed-stream/lib/delayed_stream.js
var It = /* @__PURE__ */ D(((e, t) => {
	var n = M("stream").Stream, r = M("util");
	t.exports = i;
	function i() {
		this.source = null, this.dataSize = 0, this.maxDataSize = 1048576, this.pauseStream = !0, this._maxDataSizeExceeded = !1, this._released = !1, this._bufferedEvents = [];
	}
	r.inherits(i, n), i.create = function(e, t) {
		var n = new this();
		for (var r in t ||= {}, t) n[r] = t[r];
		n.source = e;
		var i = e.emit;
		return e.emit = function() {
			return n._handleEmit(arguments), i.apply(e, arguments);
		}, e.on("error", function() {}), n.pauseStream && e.pause(), n;
	}, Object.defineProperty(i.prototype, "readable", {
		configurable: !0,
		enumerable: !0,
		get: function() {
			return this.source.readable;
		}
	}), i.prototype.setEncoding = function() {
		return this.source.setEncoding.apply(this.source, arguments);
	}, i.prototype.resume = function() {
		this._released || this.release(), this.source.resume();
	}, i.prototype.pause = function() {
		this.source.pause();
	}, i.prototype.release = function() {
		this._released = !0, this._bufferedEvents.forEach(function(e) {
			this.emit.apply(this, e);
		}.bind(this)), this._bufferedEvents = [];
	}, i.prototype.pipe = function() {
		var e = n.prototype.pipe.apply(this, arguments);
		return this.resume(), e;
	}, i.prototype._handleEmit = function(e) {
		if (this._released) {
			this.emit.apply(this, e);
			return;
		}
		e[0] === "data" && (this.dataSize += e[1].length, this._checkIfMaxDataSizeExceeded()), this._bufferedEvents.push(e);
	}, i.prototype._checkIfMaxDataSizeExceeded = function() {
		if (!this._maxDataSizeExceeded && !(this.dataSize <= this.maxDataSize)) {
			this._maxDataSizeExceeded = !0;
			var e = "DelayedStream#maxDataSize of " + this.maxDataSize + " bytes exceeded.";
			this.emit("error", Error(e));
		}
	};
})), Lt = /* @__PURE__ */ D(((e, t) => {
	var n = M("util"), r = M("stream").Stream, i = It();
	t.exports = a;
	function a() {
		this.writable = !1, this.readable = !0, this.dataSize = 0, this.maxDataSize = 2097152, this.pauseStreams = !0, this._released = !1, this._streams = [], this._currentStream = null, this._insideLoop = !1, this._pendingNext = !1;
	}
	n.inherits(a, r), a.create = function(e) {
		var t = new this();
		for (var n in e ||= {}, e) t[n] = e[n];
		return t;
	}, a.isStreamLike = function(e) {
		return typeof e != "function" && typeof e != "string" && typeof e != "boolean" && typeof e != "number" && !Buffer.isBuffer(e);
	}, a.prototype.append = function(e) {
		if (a.isStreamLike(e)) {
			if (!(e instanceof i)) {
				var t = i.create(e, {
					maxDataSize: Infinity,
					pauseStream: this.pauseStreams
				});
				e.on("data", this._checkDataSize.bind(this)), e = t;
			}
			this._handleErrors(e), this.pauseStreams && e.pause();
		}
		return this._streams.push(e), this;
	}, a.prototype.pipe = function(e, t) {
		return r.prototype.pipe.call(this, e, t), this.resume(), e;
	}, a.prototype._getNext = function() {
		if (this._currentStream = null, this._insideLoop) {
			this._pendingNext = !0;
			return;
		}
		this._insideLoop = !0;
		try {
			do
				this._pendingNext = !1, this._realGetNext();
			while (this._pendingNext);
		} finally {
			this._insideLoop = !1;
		}
	}, a.prototype._realGetNext = function() {
		var e = this._streams.shift();
		if (e === void 0) {
			this.end();
			return;
		}
		if (typeof e != "function") {
			this._pipeNext(e);
			return;
		}
		e(function(e) {
			a.isStreamLike(e) && (e.on("data", this._checkDataSize.bind(this)), this._handleErrors(e)), this._pipeNext(e);
		}.bind(this));
	}, a.prototype._pipeNext = function(e) {
		if (this._currentStream = e, a.isStreamLike(e)) {
			e.on("end", this._getNext.bind(this)), e.pipe(this, { end: !1 });
			return;
		}
		var t = e;
		this.write(t), this._getNext();
	}, a.prototype._handleErrors = function(e) {
		var t = this;
		e.on("error", function(e) {
			t._emitError(e);
		});
	}, a.prototype.write = function(e) {
		this.emit("data", e);
	}, a.prototype.pause = function() {
		this.pauseStreams && (this.pauseStreams && this._currentStream && typeof this._currentStream.pause == "function" && this._currentStream.pause(), this.emit("pause"));
	}, a.prototype.resume = function() {
		this._released || (this._released = !0, this.writable = !0, this._getNext()), this.pauseStreams && this._currentStream && typeof this._currentStream.resume == "function" && this._currentStream.resume(), this.emit("resume");
	}, a.prototype.end = function() {
		this._reset(), this.emit("end");
	}, a.prototype.destroy = function() {
		this._reset(), this.emit("close");
	}, a.prototype._reset = function() {
		this.writable = !1, this._streams = [], this._currentStream = null;
	}, a.prototype._checkDataSize = function() {
		if (this._updateDataSize(), !(this.dataSize <= this.maxDataSize)) {
			var e = "DelayedStream#maxDataSize of " + this.maxDataSize + " bytes exceeded.";
			this._emitError(Error(e));
		}
	}, a.prototype._updateDataSize = function() {
		this.dataSize = 0;
		var e = this;
		this._streams.forEach(function(t) {
			t.dataSize && (e.dataSize += t.dataSize);
		}), this._currentStream && this._currentStream.dataSize && (this.dataSize += this._currentStream.dataSize);
	}, a.prototype._emitError = function(e) {
		this._reset(), this.emit("error", e);
	};
})), Rt = /* @__PURE__ */ O({ default: () => zt }), zt, Bt = E((() => {
	zt = {
		"application/1d-interleaved-parityfec": { source: "iana" },
		"application/3gpdash-qoe-report+xml": {
			source: "iana",
			charset: "UTF-8",
			compressible: !0
		},
		"application/3gpp-ims+xml": {
			source: "iana",
			compressible: !0
		},
		"application/3gpphal+json": {
			source: "iana",
			compressible: !0
		},
		"application/3gpphalforms+json": {
			source: "iana",
			compressible: !0
		},
		"application/a2l": { source: "iana" },
		"application/ace+cbor": { source: "iana" },
		"application/activemessage": { source: "iana" },
		"application/activity+json": {
			source: "iana",
			compressible: !0
		},
		"application/alto-costmap+json": {
			source: "iana",
			compressible: !0
		},
		"application/alto-costmapfilter+json": {
			source: "iana",
			compressible: !0
		},
		"application/alto-directory+json": {
			source: "iana",
			compressible: !0
		},
		"application/alto-endpointcost+json": {
			source: "iana",
			compressible: !0
		},
		"application/alto-endpointcostparams+json": {
			source: "iana",
			compressible: !0
		},
		"application/alto-endpointprop+json": {
			source: "iana",
			compressible: !0
		},
		"application/alto-endpointpropparams+json": {
			source: "iana",
			compressible: !0
		},
		"application/alto-error+json": {
			source: "iana",
			compressible: !0
		},
		"application/alto-networkmap+json": {
			source: "iana",
			compressible: !0
		},
		"application/alto-networkmapfilter+json": {
			source: "iana",
			compressible: !0
		},
		"application/alto-updatestreamcontrol+json": {
			source: "iana",
			compressible: !0
		},
		"application/alto-updatestreamparams+json": {
			source: "iana",
			compressible: !0
		},
		"application/aml": { source: "iana" },
		"application/andrew-inset": {
			source: "iana",
			extensions: ["ez"]
		},
		"application/applefile": { source: "iana" },
		"application/applixware": {
			source: "apache",
			extensions: ["aw"]
		},
		"application/at+jwt": { source: "iana" },
		"application/atf": { source: "iana" },
		"application/atfx": { source: "iana" },
		"application/atom+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["atom"]
		},
		"application/atomcat+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["atomcat"]
		},
		"application/atomdeleted+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["atomdeleted"]
		},
		"application/atomicmail": { source: "iana" },
		"application/atomsvc+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["atomsvc"]
		},
		"application/atsc-dwd+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["dwd"]
		},
		"application/atsc-dynamic-event-message": { source: "iana" },
		"application/atsc-held+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["held"]
		},
		"application/atsc-rdt+json": {
			source: "iana",
			compressible: !0
		},
		"application/atsc-rsat+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["rsat"]
		},
		"application/atxml": { source: "iana" },
		"application/auth-policy+xml": {
			source: "iana",
			compressible: !0
		},
		"application/bacnet-xdd+zip": {
			source: "iana",
			compressible: !1
		},
		"application/batch-smtp": { source: "iana" },
		"application/bdoc": {
			compressible: !1,
			extensions: ["bdoc"]
		},
		"application/beep+xml": {
			source: "iana",
			charset: "UTF-8",
			compressible: !0
		},
		"application/calendar+json": {
			source: "iana",
			compressible: !0
		},
		"application/calendar+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["xcs"]
		},
		"application/call-completion": { source: "iana" },
		"application/cals-1840": { source: "iana" },
		"application/captive+json": {
			source: "iana",
			compressible: !0
		},
		"application/cbor": { source: "iana" },
		"application/cbor-seq": { source: "iana" },
		"application/cccex": { source: "iana" },
		"application/ccmp+xml": {
			source: "iana",
			compressible: !0
		},
		"application/ccxml+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["ccxml"]
		},
		"application/cdfx+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["cdfx"]
		},
		"application/cdmi-capability": {
			source: "iana",
			extensions: ["cdmia"]
		},
		"application/cdmi-container": {
			source: "iana",
			extensions: ["cdmic"]
		},
		"application/cdmi-domain": {
			source: "iana",
			extensions: ["cdmid"]
		},
		"application/cdmi-object": {
			source: "iana",
			extensions: ["cdmio"]
		},
		"application/cdmi-queue": {
			source: "iana",
			extensions: ["cdmiq"]
		},
		"application/cdni": { source: "iana" },
		"application/cea": { source: "iana" },
		"application/cea-2018+xml": {
			source: "iana",
			compressible: !0
		},
		"application/cellml+xml": {
			source: "iana",
			compressible: !0
		},
		"application/cfw": { source: "iana" },
		"application/city+json": {
			source: "iana",
			compressible: !0
		},
		"application/clr": { source: "iana" },
		"application/clue+xml": {
			source: "iana",
			compressible: !0
		},
		"application/clue_info+xml": {
			source: "iana",
			compressible: !0
		},
		"application/cms": { source: "iana" },
		"application/cnrp+xml": {
			source: "iana",
			compressible: !0
		},
		"application/coap-group+json": {
			source: "iana",
			compressible: !0
		},
		"application/coap-payload": { source: "iana" },
		"application/commonground": { source: "iana" },
		"application/conference-info+xml": {
			source: "iana",
			compressible: !0
		},
		"application/cose": { source: "iana" },
		"application/cose-key": { source: "iana" },
		"application/cose-key-set": { source: "iana" },
		"application/cpl+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["cpl"]
		},
		"application/csrattrs": { source: "iana" },
		"application/csta+xml": {
			source: "iana",
			compressible: !0
		},
		"application/cstadata+xml": {
			source: "iana",
			compressible: !0
		},
		"application/csvm+json": {
			source: "iana",
			compressible: !0
		},
		"application/cu-seeme": {
			source: "apache",
			extensions: ["cu"]
		},
		"application/cwt": { source: "iana" },
		"application/cybercash": { source: "iana" },
		"application/dart": { compressible: !0 },
		"application/dash+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["mpd"]
		},
		"application/dash-patch+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["mpp"]
		},
		"application/dashdelta": { source: "iana" },
		"application/davmount+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["davmount"]
		},
		"application/dca-rft": { source: "iana" },
		"application/dcd": { source: "iana" },
		"application/dec-dx": { source: "iana" },
		"application/dialog-info+xml": {
			source: "iana",
			compressible: !0
		},
		"application/dicom": { source: "iana" },
		"application/dicom+json": {
			source: "iana",
			compressible: !0
		},
		"application/dicom+xml": {
			source: "iana",
			compressible: !0
		},
		"application/dii": { source: "iana" },
		"application/dit": { source: "iana" },
		"application/dns": { source: "iana" },
		"application/dns+json": {
			source: "iana",
			compressible: !0
		},
		"application/dns-message": { source: "iana" },
		"application/docbook+xml": {
			source: "apache",
			compressible: !0,
			extensions: ["dbk"]
		},
		"application/dots+cbor": { source: "iana" },
		"application/dskpp+xml": {
			source: "iana",
			compressible: !0
		},
		"application/dssc+der": {
			source: "iana",
			extensions: ["dssc"]
		},
		"application/dssc+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["xdssc"]
		},
		"application/dvcs": { source: "iana" },
		"application/ecmascript": {
			source: "iana",
			compressible: !0,
			extensions: ["es", "ecma"]
		},
		"application/edi-consent": { source: "iana" },
		"application/edi-x12": {
			source: "iana",
			compressible: !1
		},
		"application/edifact": {
			source: "iana",
			compressible: !1
		},
		"application/efi": { source: "iana" },
		"application/elm+json": {
			source: "iana",
			charset: "UTF-8",
			compressible: !0
		},
		"application/elm+xml": {
			source: "iana",
			compressible: !0
		},
		"application/emergencycalldata.cap+xml": {
			source: "iana",
			charset: "UTF-8",
			compressible: !0
		},
		"application/emergencycalldata.comment+xml": {
			source: "iana",
			compressible: !0
		},
		"application/emergencycalldata.control+xml": {
			source: "iana",
			compressible: !0
		},
		"application/emergencycalldata.deviceinfo+xml": {
			source: "iana",
			compressible: !0
		},
		"application/emergencycalldata.ecall.msd": { source: "iana" },
		"application/emergencycalldata.providerinfo+xml": {
			source: "iana",
			compressible: !0
		},
		"application/emergencycalldata.serviceinfo+xml": {
			source: "iana",
			compressible: !0
		},
		"application/emergencycalldata.subscriberinfo+xml": {
			source: "iana",
			compressible: !0
		},
		"application/emergencycalldata.veds+xml": {
			source: "iana",
			compressible: !0
		},
		"application/emma+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["emma"]
		},
		"application/emotionml+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["emotionml"]
		},
		"application/encaprtp": { source: "iana" },
		"application/epp+xml": {
			source: "iana",
			compressible: !0
		},
		"application/epub+zip": {
			source: "iana",
			compressible: !1,
			extensions: ["epub"]
		},
		"application/eshop": { source: "iana" },
		"application/exi": {
			source: "iana",
			extensions: ["exi"]
		},
		"application/expect-ct-report+json": {
			source: "iana",
			compressible: !0
		},
		"application/express": {
			source: "iana",
			extensions: ["exp"]
		},
		"application/fastinfoset": { source: "iana" },
		"application/fastsoap": { source: "iana" },
		"application/fdt+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["fdt"]
		},
		"application/fhir+json": {
			source: "iana",
			charset: "UTF-8",
			compressible: !0
		},
		"application/fhir+xml": {
			source: "iana",
			charset: "UTF-8",
			compressible: !0
		},
		"application/fido.trusted-apps+json": { compressible: !0 },
		"application/fits": { source: "iana" },
		"application/flexfec": { source: "iana" },
		"application/font-sfnt": { source: "iana" },
		"application/font-tdpfr": {
			source: "iana",
			extensions: ["pfr"]
		},
		"application/font-woff": {
			source: "iana",
			compressible: !1
		},
		"application/framework-attributes+xml": {
			source: "iana",
			compressible: !0
		},
		"application/geo+json": {
			source: "iana",
			compressible: !0,
			extensions: ["geojson"]
		},
		"application/geo+json-seq": { source: "iana" },
		"application/geopackage+sqlite3": { source: "iana" },
		"application/geoxacml+xml": {
			source: "iana",
			compressible: !0
		},
		"application/gltf-buffer": { source: "iana" },
		"application/gml+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["gml"]
		},
		"application/gpx+xml": {
			source: "apache",
			compressible: !0,
			extensions: ["gpx"]
		},
		"application/gxf": {
			source: "apache",
			extensions: ["gxf"]
		},
		"application/gzip": {
			source: "iana",
			compressible: !1,
			extensions: ["gz"]
		},
		"application/h224": { source: "iana" },
		"application/held+xml": {
			source: "iana",
			compressible: !0
		},
		"application/hjson": { extensions: ["hjson"] },
		"application/http": { source: "iana" },
		"application/hyperstudio": {
			source: "iana",
			extensions: ["stk"]
		},
		"application/ibe-key-request+xml": {
			source: "iana",
			compressible: !0
		},
		"application/ibe-pkg-reply+xml": {
			source: "iana",
			compressible: !0
		},
		"application/ibe-pp-data": { source: "iana" },
		"application/iges": { source: "iana" },
		"application/im-iscomposing+xml": {
			source: "iana",
			charset: "UTF-8",
			compressible: !0
		},
		"application/index": { source: "iana" },
		"application/index.cmd": { source: "iana" },
		"application/index.obj": { source: "iana" },
		"application/index.response": { source: "iana" },
		"application/index.vnd": { source: "iana" },
		"application/inkml+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["ink", "inkml"]
		},
		"application/iotp": { source: "iana" },
		"application/ipfix": {
			source: "iana",
			extensions: ["ipfix"]
		},
		"application/ipp": { source: "iana" },
		"application/isup": { source: "iana" },
		"application/its+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["its"]
		},
		"application/java-archive": {
			source: "apache",
			compressible: !1,
			extensions: [
				"jar",
				"war",
				"ear"
			]
		},
		"application/java-serialized-object": {
			source: "apache",
			compressible: !1,
			extensions: ["ser"]
		},
		"application/java-vm": {
			source: "apache",
			compressible: !1,
			extensions: ["class"]
		},
		"application/javascript": {
			source: "iana",
			charset: "UTF-8",
			compressible: !0,
			extensions: ["js", "mjs"]
		},
		"application/jf2feed+json": {
			source: "iana",
			compressible: !0
		},
		"application/jose": { source: "iana" },
		"application/jose+json": {
			source: "iana",
			compressible: !0
		},
		"application/jrd+json": {
			source: "iana",
			compressible: !0
		},
		"application/jscalendar+json": {
			source: "iana",
			compressible: !0
		},
		"application/json": {
			source: "iana",
			charset: "UTF-8",
			compressible: !0,
			extensions: ["json", "map"]
		},
		"application/json-patch+json": {
			source: "iana",
			compressible: !0
		},
		"application/json-seq": { source: "iana" },
		"application/json5": { extensions: ["json5"] },
		"application/jsonml+json": {
			source: "apache",
			compressible: !0,
			extensions: ["jsonml"]
		},
		"application/jwk+json": {
			source: "iana",
			compressible: !0
		},
		"application/jwk-set+json": {
			source: "iana",
			compressible: !0
		},
		"application/jwt": { source: "iana" },
		"application/kpml-request+xml": {
			source: "iana",
			compressible: !0
		},
		"application/kpml-response+xml": {
			source: "iana",
			compressible: !0
		},
		"application/ld+json": {
			source: "iana",
			compressible: !0,
			extensions: ["jsonld"]
		},
		"application/lgr+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["lgr"]
		},
		"application/link-format": { source: "iana" },
		"application/load-control+xml": {
			source: "iana",
			compressible: !0
		},
		"application/lost+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["lostxml"]
		},
		"application/lostsync+xml": {
			source: "iana",
			compressible: !0
		},
		"application/lpf+zip": {
			source: "iana",
			compressible: !1
		},
		"application/lxf": { source: "iana" },
		"application/mac-binhex40": {
			source: "iana",
			extensions: ["hqx"]
		},
		"application/mac-compactpro": {
			source: "apache",
			extensions: ["cpt"]
		},
		"application/macwriteii": { source: "iana" },
		"application/mads+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["mads"]
		},
		"application/manifest+json": {
			source: "iana",
			charset: "UTF-8",
			compressible: !0,
			extensions: ["webmanifest"]
		},
		"application/marc": {
			source: "iana",
			extensions: ["mrc"]
		},
		"application/marcxml+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["mrcx"]
		},
		"application/mathematica": {
			source: "iana",
			extensions: [
				"ma",
				"nb",
				"mb"
			]
		},
		"application/mathml+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["mathml"]
		},
		"application/mathml-content+xml": {
			source: "iana",
			compressible: !0
		},
		"application/mathml-presentation+xml": {
			source: "iana",
			compressible: !0
		},
		"application/mbms-associated-procedure-description+xml": {
			source: "iana",
			compressible: !0
		},
		"application/mbms-deregister+xml": {
			source: "iana",
			compressible: !0
		},
		"application/mbms-envelope+xml": {
			source: "iana",
			compressible: !0
		},
		"application/mbms-msk+xml": {
			source: "iana",
			compressible: !0
		},
		"application/mbms-msk-response+xml": {
			source: "iana",
			compressible: !0
		},
		"application/mbms-protection-description+xml": {
			source: "iana",
			compressible: !0
		},
		"application/mbms-reception-report+xml": {
			source: "iana",
			compressible: !0
		},
		"application/mbms-register+xml": {
			source: "iana",
			compressible: !0
		},
		"application/mbms-register-response+xml": {
			source: "iana",
			compressible: !0
		},
		"application/mbms-schedule+xml": {
			source: "iana",
			compressible: !0
		},
		"application/mbms-user-service-description+xml": {
			source: "iana",
			compressible: !0
		},
		"application/mbox": {
			source: "iana",
			extensions: ["mbox"]
		},
		"application/media-policy-dataset+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["mpf"]
		},
		"application/media_control+xml": {
			source: "iana",
			compressible: !0
		},
		"application/mediaservercontrol+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["mscml"]
		},
		"application/merge-patch+json": {
			source: "iana",
			compressible: !0
		},
		"application/metalink+xml": {
			source: "apache",
			compressible: !0,
			extensions: ["metalink"]
		},
		"application/metalink4+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["meta4"]
		},
		"application/mets+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["mets"]
		},
		"application/mf4": { source: "iana" },
		"application/mikey": { source: "iana" },
		"application/mipc": { source: "iana" },
		"application/missing-blocks+cbor-seq": { source: "iana" },
		"application/mmt-aei+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["maei"]
		},
		"application/mmt-usd+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["musd"]
		},
		"application/mods+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["mods"]
		},
		"application/moss-keys": { source: "iana" },
		"application/moss-signature": { source: "iana" },
		"application/mosskey-data": { source: "iana" },
		"application/mosskey-request": { source: "iana" },
		"application/mp21": {
			source: "iana",
			extensions: ["m21", "mp21"]
		},
		"application/mp4": {
			source: "iana",
			extensions: ["mp4s", "m4p"]
		},
		"application/mpeg4-generic": { source: "iana" },
		"application/mpeg4-iod": { source: "iana" },
		"application/mpeg4-iod-xmt": { source: "iana" },
		"application/mrb-consumer+xml": {
			source: "iana",
			compressible: !0
		},
		"application/mrb-publish+xml": {
			source: "iana",
			compressible: !0
		},
		"application/msc-ivr+xml": {
			source: "iana",
			charset: "UTF-8",
			compressible: !0
		},
		"application/msc-mixer+xml": {
			source: "iana",
			charset: "UTF-8",
			compressible: !0
		},
		"application/msword": {
			source: "iana",
			compressible: !1,
			extensions: ["doc", "dot"]
		},
		"application/mud+json": {
			source: "iana",
			compressible: !0
		},
		"application/multipart-core": { source: "iana" },
		"application/mxf": {
			source: "iana",
			extensions: ["mxf"]
		},
		"application/n-quads": {
			source: "iana",
			extensions: ["nq"]
		},
		"application/n-triples": {
			source: "iana",
			extensions: ["nt"]
		},
		"application/nasdata": { source: "iana" },
		"application/news-checkgroups": {
			source: "iana",
			charset: "US-ASCII"
		},
		"application/news-groupinfo": {
			source: "iana",
			charset: "US-ASCII"
		},
		"application/news-transmission": { source: "iana" },
		"application/nlsml+xml": {
			source: "iana",
			compressible: !0
		},
		"application/node": {
			source: "iana",
			extensions: ["cjs"]
		},
		"application/nss": { source: "iana" },
		"application/oauth-authz-req+jwt": { source: "iana" },
		"application/oblivious-dns-message": { source: "iana" },
		"application/ocsp-request": { source: "iana" },
		"application/ocsp-response": { source: "iana" },
		"application/octet-stream": {
			source: "iana",
			compressible: !1,
			extensions: [
				"bin",
				"dms",
				"lrf",
				"mar",
				"so",
				"dist",
				"distz",
				"pkg",
				"bpk",
				"dump",
				"elc",
				"deploy",
				"exe",
				"dll",
				"deb",
				"dmg",
				"iso",
				"img",
				"msi",
				"msp",
				"msm",
				"buffer"
			]
		},
		"application/oda": {
			source: "iana",
			extensions: ["oda"]
		},
		"application/odm+xml": {
			source: "iana",
			compressible: !0
		},
		"application/odx": { source: "iana" },
		"application/oebps-package+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["opf"]
		},
		"application/ogg": {
			source: "iana",
			compressible: !1,
			extensions: ["ogx"]
		},
		"application/omdoc+xml": {
			source: "apache",
			compressible: !0,
			extensions: ["omdoc"]
		},
		"application/onenote": {
			source: "apache",
			extensions: [
				"onetoc",
				"onetoc2",
				"onetmp",
				"onepkg"
			]
		},
		"application/opc-nodeset+xml": {
			source: "iana",
			compressible: !0
		},
		"application/oscore": { source: "iana" },
		"application/oxps": {
			source: "iana",
			extensions: ["oxps"]
		},
		"application/p21": { source: "iana" },
		"application/p21+zip": {
			source: "iana",
			compressible: !1
		},
		"application/p2p-overlay+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["relo"]
		},
		"application/parityfec": { source: "iana" },
		"application/passport": { source: "iana" },
		"application/patch-ops-error+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["xer"]
		},
		"application/pdf": {
			source: "iana",
			compressible: !1,
			extensions: ["pdf"]
		},
		"application/pdx": { source: "iana" },
		"application/pem-certificate-chain": { source: "iana" },
		"application/pgp-encrypted": {
			source: "iana",
			compressible: !1,
			extensions: ["pgp"]
		},
		"application/pgp-keys": {
			source: "iana",
			extensions: ["asc"]
		},
		"application/pgp-signature": {
			source: "iana",
			extensions: ["asc", "sig"]
		},
		"application/pics-rules": {
			source: "apache",
			extensions: ["prf"]
		},
		"application/pidf+xml": {
			source: "iana",
			charset: "UTF-8",
			compressible: !0
		},
		"application/pidf-diff+xml": {
			source: "iana",
			charset: "UTF-8",
			compressible: !0
		},
		"application/pkcs10": {
			source: "iana",
			extensions: ["p10"]
		},
		"application/pkcs12": { source: "iana" },
		"application/pkcs7-mime": {
			source: "iana",
			extensions: ["p7m", "p7c"]
		},
		"application/pkcs7-signature": {
			source: "iana",
			extensions: ["p7s"]
		},
		"application/pkcs8": {
			source: "iana",
			extensions: ["p8"]
		},
		"application/pkcs8-encrypted": { source: "iana" },
		"application/pkix-attr-cert": {
			source: "iana",
			extensions: ["ac"]
		},
		"application/pkix-cert": {
			source: "iana",
			extensions: ["cer"]
		},
		"application/pkix-crl": {
			source: "iana",
			extensions: ["crl"]
		},
		"application/pkix-pkipath": {
			source: "iana",
			extensions: ["pkipath"]
		},
		"application/pkixcmp": {
			source: "iana",
			extensions: ["pki"]
		},
		"application/pls+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["pls"]
		},
		"application/poc-settings+xml": {
			source: "iana",
			charset: "UTF-8",
			compressible: !0
		},
		"application/postscript": {
			source: "iana",
			compressible: !0,
			extensions: [
				"ai",
				"eps",
				"ps"
			]
		},
		"application/ppsp-tracker+json": {
			source: "iana",
			compressible: !0
		},
		"application/problem+json": {
			source: "iana",
			compressible: !0
		},
		"application/problem+xml": {
			source: "iana",
			compressible: !0
		},
		"application/provenance+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["provx"]
		},
		"application/prs.alvestrand.titrax-sheet": { source: "iana" },
		"application/prs.cww": {
			source: "iana",
			extensions: ["cww"]
		},
		"application/prs.cyn": {
			source: "iana",
			charset: "7-BIT"
		},
		"application/prs.hpub+zip": {
			source: "iana",
			compressible: !1
		},
		"application/prs.nprend": { source: "iana" },
		"application/prs.plucker": { source: "iana" },
		"application/prs.rdf-xml-crypt": { source: "iana" },
		"application/prs.xsf+xml": {
			source: "iana",
			compressible: !0
		},
		"application/pskc+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["pskcxml"]
		},
		"application/pvd+json": {
			source: "iana",
			compressible: !0
		},
		"application/qsig": { source: "iana" },
		"application/raml+yaml": {
			compressible: !0,
			extensions: ["raml"]
		},
		"application/raptorfec": { source: "iana" },
		"application/rdap+json": {
			source: "iana",
			compressible: !0
		},
		"application/rdf+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["rdf", "owl"]
		},
		"application/reginfo+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["rif"]
		},
		"application/relax-ng-compact-syntax": {
			source: "iana",
			extensions: ["rnc"]
		},
		"application/remote-printing": { source: "iana" },
		"application/reputon+json": {
			source: "iana",
			compressible: !0
		},
		"application/resource-lists+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["rl"]
		},
		"application/resource-lists-diff+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["rld"]
		},
		"application/rfc+xml": {
			source: "iana",
			compressible: !0
		},
		"application/riscos": { source: "iana" },
		"application/rlmi+xml": {
			source: "iana",
			compressible: !0
		},
		"application/rls-services+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["rs"]
		},
		"application/route-apd+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["rapd"]
		},
		"application/route-s-tsid+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["sls"]
		},
		"application/route-usd+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["rusd"]
		},
		"application/rpki-ghostbusters": {
			source: "iana",
			extensions: ["gbr"]
		},
		"application/rpki-manifest": {
			source: "iana",
			extensions: ["mft"]
		},
		"application/rpki-publication": { source: "iana" },
		"application/rpki-roa": {
			source: "iana",
			extensions: ["roa"]
		},
		"application/rpki-updown": { source: "iana" },
		"application/rsd+xml": {
			source: "apache",
			compressible: !0,
			extensions: ["rsd"]
		},
		"application/rss+xml": {
			source: "apache",
			compressible: !0,
			extensions: ["rss"]
		},
		"application/rtf": {
			source: "iana",
			compressible: !0,
			extensions: ["rtf"]
		},
		"application/rtploopback": { source: "iana" },
		"application/rtx": { source: "iana" },
		"application/samlassertion+xml": {
			source: "iana",
			compressible: !0
		},
		"application/samlmetadata+xml": {
			source: "iana",
			compressible: !0
		},
		"application/sarif+json": {
			source: "iana",
			compressible: !0
		},
		"application/sarif-external-properties+json": {
			source: "iana",
			compressible: !0
		},
		"application/sbe": { source: "iana" },
		"application/sbml+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["sbml"]
		},
		"application/scaip+xml": {
			source: "iana",
			compressible: !0
		},
		"application/scim+json": {
			source: "iana",
			compressible: !0
		},
		"application/scvp-cv-request": {
			source: "iana",
			extensions: ["scq"]
		},
		"application/scvp-cv-response": {
			source: "iana",
			extensions: ["scs"]
		},
		"application/scvp-vp-request": {
			source: "iana",
			extensions: ["spq"]
		},
		"application/scvp-vp-response": {
			source: "iana",
			extensions: ["spp"]
		},
		"application/sdp": {
			source: "iana",
			extensions: ["sdp"]
		},
		"application/secevent+jwt": { source: "iana" },
		"application/senml+cbor": { source: "iana" },
		"application/senml+json": {
			source: "iana",
			compressible: !0
		},
		"application/senml+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["senmlx"]
		},
		"application/senml-etch+cbor": { source: "iana" },
		"application/senml-etch+json": {
			source: "iana",
			compressible: !0
		},
		"application/senml-exi": { source: "iana" },
		"application/sensml+cbor": { source: "iana" },
		"application/sensml+json": {
			source: "iana",
			compressible: !0
		},
		"application/sensml+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["sensmlx"]
		},
		"application/sensml-exi": { source: "iana" },
		"application/sep+xml": {
			source: "iana",
			compressible: !0
		},
		"application/sep-exi": { source: "iana" },
		"application/session-info": { source: "iana" },
		"application/set-payment": { source: "iana" },
		"application/set-payment-initiation": {
			source: "iana",
			extensions: ["setpay"]
		},
		"application/set-registration": { source: "iana" },
		"application/set-registration-initiation": {
			source: "iana",
			extensions: ["setreg"]
		},
		"application/sgml": { source: "iana" },
		"application/sgml-open-catalog": { source: "iana" },
		"application/shf+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["shf"]
		},
		"application/sieve": {
			source: "iana",
			extensions: ["siv", "sieve"]
		},
		"application/simple-filter+xml": {
			source: "iana",
			compressible: !0
		},
		"application/simple-message-summary": { source: "iana" },
		"application/simplesymbolcontainer": { source: "iana" },
		"application/sipc": { source: "iana" },
		"application/slate": { source: "iana" },
		"application/smil": { source: "iana" },
		"application/smil+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["smi", "smil"]
		},
		"application/smpte336m": { source: "iana" },
		"application/soap+fastinfoset": { source: "iana" },
		"application/soap+xml": {
			source: "iana",
			compressible: !0
		},
		"application/sparql-query": {
			source: "iana",
			extensions: ["rq"]
		},
		"application/sparql-results+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["srx"]
		},
		"application/spdx+json": {
			source: "iana",
			compressible: !0
		},
		"application/spirits-event+xml": {
			source: "iana",
			compressible: !0
		},
		"application/sql": { source: "iana" },
		"application/srgs": {
			source: "iana",
			extensions: ["gram"]
		},
		"application/srgs+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["grxml"]
		},
		"application/sru+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["sru"]
		},
		"application/ssdl+xml": {
			source: "apache",
			compressible: !0,
			extensions: ["ssdl"]
		},
		"application/ssml+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["ssml"]
		},
		"application/stix+json": {
			source: "iana",
			compressible: !0
		},
		"application/swid+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["swidtag"]
		},
		"application/tamp-apex-update": { source: "iana" },
		"application/tamp-apex-update-confirm": { source: "iana" },
		"application/tamp-community-update": { source: "iana" },
		"application/tamp-community-update-confirm": { source: "iana" },
		"application/tamp-error": { source: "iana" },
		"application/tamp-sequence-adjust": { source: "iana" },
		"application/tamp-sequence-adjust-confirm": { source: "iana" },
		"application/tamp-status-query": { source: "iana" },
		"application/tamp-status-response": { source: "iana" },
		"application/tamp-update": { source: "iana" },
		"application/tamp-update-confirm": { source: "iana" },
		"application/tar": { compressible: !0 },
		"application/taxii+json": {
			source: "iana",
			compressible: !0
		},
		"application/td+json": {
			source: "iana",
			compressible: !0
		},
		"application/tei+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["tei", "teicorpus"]
		},
		"application/tetra_isi": { source: "iana" },
		"application/thraud+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["tfi"]
		},
		"application/timestamp-query": { source: "iana" },
		"application/timestamp-reply": { source: "iana" },
		"application/timestamped-data": {
			source: "iana",
			extensions: ["tsd"]
		},
		"application/tlsrpt+gzip": { source: "iana" },
		"application/tlsrpt+json": {
			source: "iana",
			compressible: !0
		},
		"application/tnauthlist": { source: "iana" },
		"application/token-introspection+jwt": { source: "iana" },
		"application/toml": {
			compressible: !0,
			extensions: ["toml"]
		},
		"application/trickle-ice-sdpfrag": { source: "iana" },
		"application/trig": {
			source: "iana",
			extensions: ["trig"]
		},
		"application/ttml+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["ttml"]
		},
		"application/tve-trigger": { source: "iana" },
		"application/tzif": { source: "iana" },
		"application/tzif-leap": { source: "iana" },
		"application/ubjson": {
			compressible: !1,
			extensions: ["ubj"]
		},
		"application/ulpfec": { source: "iana" },
		"application/urc-grpsheet+xml": {
			source: "iana",
			compressible: !0
		},
		"application/urc-ressheet+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["rsheet"]
		},
		"application/urc-targetdesc+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["td"]
		},
		"application/urc-uisocketdesc+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vcard+json": {
			source: "iana",
			compressible: !0
		},
		"application/vcard+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vemmi": { source: "iana" },
		"application/vividence.scriptfile": { source: "apache" },
		"application/vnd.1000minds.decision-model+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["1km"]
		},
		"application/vnd.3gpp-prose+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.3gpp-prose-pc3ch+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.3gpp-v2x-local-service-information": { source: "iana" },
		"application/vnd.3gpp.5gnas": { source: "iana" },
		"application/vnd.3gpp.access-transfer-events+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.3gpp.bsf+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.3gpp.gmop+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.3gpp.gtpc": { source: "iana" },
		"application/vnd.3gpp.interworking-data": { source: "iana" },
		"application/vnd.3gpp.lpp": { source: "iana" },
		"application/vnd.3gpp.mc-signalling-ear": { source: "iana" },
		"application/vnd.3gpp.mcdata-affiliation-command+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.3gpp.mcdata-info+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.3gpp.mcdata-payload": { source: "iana" },
		"application/vnd.3gpp.mcdata-service-config+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.3gpp.mcdata-signalling": { source: "iana" },
		"application/vnd.3gpp.mcdata-ue-config+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.3gpp.mcdata-user-profile+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.3gpp.mcptt-affiliation-command+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.3gpp.mcptt-floor-request+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.3gpp.mcptt-info+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.3gpp.mcptt-location-info+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.3gpp.mcptt-mbms-usage-info+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.3gpp.mcptt-service-config+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.3gpp.mcptt-signed+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.3gpp.mcptt-ue-config+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.3gpp.mcptt-ue-init-config+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.3gpp.mcptt-user-profile+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.3gpp.mcvideo-affiliation-command+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.3gpp.mcvideo-affiliation-info+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.3gpp.mcvideo-info+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.3gpp.mcvideo-location-info+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.3gpp.mcvideo-mbms-usage-info+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.3gpp.mcvideo-service-config+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.3gpp.mcvideo-transmission-request+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.3gpp.mcvideo-ue-config+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.3gpp.mcvideo-user-profile+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.3gpp.mid-call+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.3gpp.ngap": { source: "iana" },
		"application/vnd.3gpp.pfcp": { source: "iana" },
		"application/vnd.3gpp.pic-bw-large": {
			source: "iana",
			extensions: ["plb"]
		},
		"application/vnd.3gpp.pic-bw-small": {
			source: "iana",
			extensions: ["psb"]
		},
		"application/vnd.3gpp.pic-bw-var": {
			source: "iana",
			extensions: ["pvb"]
		},
		"application/vnd.3gpp.s1ap": { source: "iana" },
		"application/vnd.3gpp.sms": { source: "iana" },
		"application/vnd.3gpp.sms+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.3gpp.srvcc-ext+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.3gpp.srvcc-info+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.3gpp.state-and-event-info+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.3gpp.ussd+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.3gpp2.bcmcsinfo+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.3gpp2.sms": { source: "iana" },
		"application/vnd.3gpp2.tcap": {
			source: "iana",
			extensions: ["tcap"]
		},
		"application/vnd.3lightssoftware.imagescal": { source: "iana" },
		"application/vnd.3m.post-it-notes": {
			source: "iana",
			extensions: ["pwn"]
		},
		"application/vnd.accpac.simply.aso": {
			source: "iana",
			extensions: ["aso"]
		},
		"application/vnd.accpac.simply.imp": {
			source: "iana",
			extensions: ["imp"]
		},
		"application/vnd.acucobol": {
			source: "iana",
			extensions: ["acu"]
		},
		"application/vnd.acucorp": {
			source: "iana",
			extensions: ["atc", "acutc"]
		},
		"application/vnd.adobe.air-application-installer-package+zip": {
			source: "apache",
			compressible: !1,
			extensions: ["air"]
		},
		"application/vnd.adobe.flash.movie": { source: "iana" },
		"application/vnd.adobe.formscentral.fcdt": {
			source: "iana",
			extensions: ["fcdt"]
		},
		"application/vnd.adobe.fxp": {
			source: "iana",
			extensions: ["fxp", "fxpl"]
		},
		"application/vnd.adobe.partial-upload": { source: "iana" },
		"application/vnd.adobe.xdp+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["xdp"]
		},
		"application/vnd.adobe.xfdf": {
			source: "iana",
			extensions: ["xfdf"]
		},
		"application/vnd.aether.imp": { source: "iana" },
		"application/vnd.afpc.afplinedata": { source: "iana" },
		"application/vnd.afpc.afplinedata-pagedef": { source: "iana" },
		"application/vnd.afpc.cmoca-cmresource": { source: "iana" },
		"application/vnd.afpc.foca-charset": { source: "iana" },
		"application/vnd.afpc.foca-codedfont": { source: "iana" },
		"application/vnd.afpc.foca-codepage": { source: "iana" },
		"application/vnd.afpc.modca": { source: "iana" },
		"application/vnd.afpc.modca-cmtable": { source: "iana" },
		"application/vnd.afpc.modca-formdef": { source: "iana" },
		"application/vnd.afpc.modca-mediummap": { source: "iana" },
		"application/vnd.afpc.modca-objectcontainer": { source: "iana" },
		"application/vnd.afpc.modca-overlay": { source: "iana" },
		"application/vnd.afpc.modca-pagesegment": { source: "iana" },
		"application/vnd.age": {
			source: "iana",
			extensions: ["age"]
		},
		"application/vnd.ah-barcode": { source: "iana" },
		"application/vnd.ahead.space": {
			source: "iana",
			extensions: ["ahead"]
		},
		"application/vnd.airzip.filesecure.azf": {
			source: "iana",
			extensions: ["azf"]
		},
		"application/vnd.airzip.filesecure.azs": {
			source: "iana",
			extensions: ["azs"]
		},
		"application/vnd.amadeus+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.amazon.ebook": {
			source: "apache",
			extensions: ["azw"]
		},
		"application/vnd.amazon.mobi8-ebook": { source: "iana" },
		"application/vnd.americandynamics.acc": {
			source: "iana",
			extensions: ["acc"]
		},
		"application/vnd.amiga.ami": {
			source: "iana",
			extensions: ["ami"]
		},
		"application/vnd.amundsen.maze+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.android.ota": { source: "iana" },
		"application/vnd.android.package-archive": {
			source: "apache",
			compressible: !1,
			extensions: ["apk"]
		},
		"application/vnd.anki": { source: "iana" },
		"application/vnd.anser-web-certificate-issue-initiation": {
			source: "iana",
			extensions: ["cii"]
		},
		"application/vnd.anser-web-funds-transfer-initiation": {
			source: "apache",
			extensions: ["fti"]
		},
		"application/vnd.antix.game-component": {
			source: "iana",
			extensions: ["atx"]
		},
		"application/vnd.apache.arrow.file": { source: "iana" },
		"application/vnd.apache.arrow.stream": { source: "iana" },
		"application/vnd.apache.thrift.binary": { source: "iana" },
		"application/vnd.apache.thrift.compact": { source: "iana" },
		"application/vnd.apache.thrift.json": { source: "iana" },
		"application/vnd.api+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.aplextor.warrp+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.apothekende.reservation+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.apple.installer+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["mpkg"]
		},
		"application/vnd.apple.keynote": {
			source: "iana",
			extensions: ["key"]
		},
		"application/vnd.apple.mpegurl": {
			source: "iana",
			extensions: ["m3u8"]
		},
		"application/vnd.apple.numbers": {
			source: "iana",
			extensions: ["numbers"]
		},
		"application/vnd.apple.pages": {
			source: "iana",
			extensions: ["pages"]
		},
		"application/vnd.apple.pkpass": {
			compressible: !1,
			extensions: ["pkpass"]
		},
		"application/vnd.arastra.swi": { source: "iana" },
		"application/vnd.aristanetworks.swi": {
			source: "iana",
			extensions: ["swi"]
		},
		"application/vnd.artisan+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.artsquare": { source: "iana" },
		"application/vnd.astraea-software.iota": {
			source: "iana",
			extensions: ["iota"]
		},
		"application/vnd.audiograph": {
			source: "iana",
			extensions: ["aep"]
		},
		"application/vnd.autopackage": { source: "iana" },
		"application/vnd.avalon+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.avistar+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.balsamiq.bmml+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["bmml"]
		},
		"application/vnd.balsamiq.bmpr": { source: "iana" },
		"application/vnd.banana-accounting": { source: "iana" },
		"application/vnd.bbf.usp.error": { source: "iana" },
		"application/vnd.bbf.usp.msg": { source: "iana" },
		"application/vnd.bbf.usp.msg+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.bekitzur-stech+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.bint.med-content": { source: "iana" },
		"application/vnd.biopax.rdf+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.blink-idb-value-wrapper": { source: "iana" },
		"application/vnd.blueice.multipass": {
			source: "iana",
			extensions: ["mpm"]
		},
		"application/vnd.bluetooth.ep.oob": { source: "iana" },
		"application/vnd.bluetooth.le.oob": { source: "iana" },
		"application/vnd.bmi": {
			source: "iana",
			extensions: ["bmi"]
		},
		"application/vnd.bpf": { source: "iana" },
		"application/vnd.bpf3": { source: "iana" },
		"application/vnd.businessobjects": {
			source: "iana",
			extensions: ["rep"]
		},
		"application/vnd.byu.uapi+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.cab-jscript": { source: "iana" },
		"application/vnd.canon-cpdl": { source: "iana" },
		"application/vnd.canon-lips": { source: "iana" },
		"application/vnd.capasystems-pg+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.cendio.thinlinc.clientconf": { source: "iana" },
		"application/vnd.century-systems.tcp_stream": { source: "iana" },
		"application/vnd.chemdraw+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["cdxml"]
		},
		"application/vnd.chess-pgn": { source: "iana" },
		"application/vnd.chipnuts.karaoke-mmd": {
			source: "iana",
			extensions: ["mmd"]
		},
		"application/vnd.ciedi": { source: "iana" },
		"application/vnd.cinderella": {
			source: "iana",
			extensions: ["cdy"]
		},
		"application/vnd.cirpack.isdn-ext": { source: "iana" },
		"application/vnd.citationstyles.style+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["csl"]
		},
		"application/vnd.claymore": {
			source: "iana",
			extensions: ["cla"]
		},
		"application/vnd.cloanto.rp9": {
			source: "iana",
			extensions: ["rp9"]
		},
		"application/vnd.clonk.c4group": {
			source: "iana",
			extensions: [
				"c4g",
				"c4d",
				"c4f",
				"c4p",
				"c4u"
			]
		},
		"application/vnd.cluetrust.cartomobile-config": {
			source: "iana",
			extensions: ["c11amc"]
		},
		"application/vnd.cluetrust.cartomobile-config-pkg": {
			source: "iana",
			extensions: ["c11amz"]
		},
		"application/vnd.coffeescript": { source: "iana" },
		"application/vnd.collabio.xodocuments.document": { source: "iana" },
		"application/vnd.collabio.xodocuments.document-template": { source: "iana" },
		"application/vnd.collabio.xodocuments.presentation": { source: "iana" },
		"application/vnd.collabio.xodocuments.presentation-template": { source: "iana" },
		"application/vnd.collabio.xodocuments.spreadsheet": { source: "iana" },
		"application/vnd.collabio.xodocuments.spreadsheet-template": { source: "iana" },
		"application/vnd.collection+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.collection.doc+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.collection.next+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.comicbook+zip": {
			source: "iana",
			compressible: !1
		},
		"application/vnd.comicbook-rar": { source: "iana" },
		"application/vnd.commerce-battelle": { source: "iana" },
		"application/vnd.commonspace": {
			source: "iana",
			extensions: ["csp"]
		},
		"application/vnd.contact.cmsg": {
			source: "iana",
			extensions: ["cdbcmsg"]
		},
		"application/vnd.coreos.ignition+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.cosmocaller": {
			source: "iana",
			extensions: ["cmc"]
		},
		"application/vnd.crick.clicker": {
			source: "iana",
			extensions: ["clkx"]
		},
		"application/vnd.crick.clicker.keyboard": {
			source: "iana",
			extensions: ["clkk"]
		},
		"application/vnd.crick.clicker.palette": {
			source: "iana",
			extensions: ["clkp"]
		},
		"application/vnd.crick.clicker.template": {
			source: "iana",
			extensions: ["clkt"]
		},
		"application/vnd.crick.clicker.wordbank": {
			source: "iana",
			extensions: ["clkw"]
		},
		"application/vnd.criticaltools.wbs+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["wbs"]
		},
		"application/vnd.cryptii.pipe+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.crypto-shade-file": { source: "iana" },
		"application/vnd.cryptomator.encrypted": { source: "iana" },
		"application/vnd.cryptomator.vault": { source: "iana" },
		"application/vnd.ctc-posml": {
			source: "iana",
			extensions: ["pml"]
		},
		"application/vnd.ctct.ws+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.cups-pdf": { source: "iana" },
		"application/vnd.cups-postscript": { source: "iana" },
		"application/vnd.cups-ppd": {
			source: "iana",
			extensions: ["ppd"]
		},
		"application/vnd.cups-raster": { source: "iana" },
		"application/vnd.cups-raw": { source: "iana" },
		"application/vnd.curl": { source: "iana" },
		"application/vnd.curl.car": {
			source: "apache",
			extensions: ["car"]
		},
		"application/vnd.curl.pcurl": {
			source: "apache",
			extensions: ["pcurl"]
		},
		"application/vnd.cyan.dean.root+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.cybank": { source: "iana" },
		"application/vnd.cyclonedx+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.cyclonedx+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.d2l.coursepackage1p0+zip": {
			source: "iana",
			compressible: !1
		},
		"application/vnd.d3m-dataset": { source: "iana" },
		"application/vnd.d3m-problem": { source: "iana" },
		"application/vnd.dart": {
			source: "iana",
			compressible: !0,
			extensions: ["dart"]
		},
		"application/vnd.data-vision.rdz": {
			source: "iana",
			extensions: ["rdz"]
		},
		"application/vnd.datapackage+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.dataresource+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.dbf": {
			source: "iana",
			extensions: ["dbf"]
		},
		"application/vnd.debian.binary-package": { source: "iana" },
		"application/vnd.dece.data": {
			source: "iana",
			extensions: [
				"uvf",
				"uvvf",
				"uvd",
				"uvvd"
			]
		},
		"application/vnd.dece.ttml+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["uvt", "uvvt"]
		},
		"application/vnd.dece.unspecified": {
			source: "iana",
			extensions: ["uvx", "uvvx"]
		},
		"application/vnd.dece.zip": {
			source: "iana",
			extensions: ["uvz", "uvvz"]
		},
		"application/vnd.denovo.fcselayout-link": {
			source: "iana",
			extensions: ["fe_launch"]
		},
		"application/vnd.desmume.movie": { source: "iana" },
		"application/vnd.dir-bi.plate-dl-nosuffix": { source: "iana" },
		"application/vnd.dm.delegation+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.dna": {
			source: "iana",
			extensions: ["dna"]
		},
		"application/vnd.document+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.dolby.mlp": {
			source: "apache",
			extensions: ["mlp"]
		},
		"application/vnd.dolby.mobile.1": { source: "iana" },
		"application/vnd.dolby.mobile.2": { source: "iana" },
		"application/vnd.doremir.scorecloud-binary-document": { source: "iana" },
		"application/vnd.dpgraph": {
			source: "iana",
			extensions: ["dpg"]
		},
		"application/vnd.dreamfactory": {
			source: "iana",
			extensions: ["dfac"]
		},
		"application/vnd.drive+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.ds-keypoint": {
			source: "apache",
			extensions: ["kpxx"]
		},
		"application/vnd.dtg.local": { source: "iana" },
		"application/vnd.dtg.local.flash": { source: "iana" },
		"application/vnd.dtg.local.html": { source: "iana" },
		"application/vnd.dvb.ait": {
			source: "iana",
			extensions: ["ait"]
		},
		"application/vnd.dvb.dvbisl+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.dvb.dvbj": { source: "iana" },
		"application/vnd.dvb.esgcontainer": { source: "iana" },
		"application/vnd.dvb.ipdcdftnotifaccess": { source: "iana" },
		"application/vnd.dvb.ipdcesgaccess": { source: "iana" },
		"application/vnd.dvb.ipdcesgaccess2": { source: "iana" },
		"application/vnd.dvb.ipdcesgpdd": { source: "iana" },
		"application/vnd.dvb.ipdcroaming": { source: "iana" },
		"application/vnd.dvb.iptv.alfec-base": { source: "iana" },
		"application/vnd.dvb.iptv.alfec-enhancement": { source: "iana" },
		"application/vnd.dvb.notif-aggregate-root+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.dvb.notif-container+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.dvb.notif-generic+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.dvb.notif-ia-msglist+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.dvb.notif-ia-registration-request+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.dvb.notif-ia-registration-response+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.dvb.notif-init+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.dvb.pfr": { source: "iana" },
		"application/vnd.dvb.service": {
			source: "iana",
			extensions: ["svc"]
		},
		"application/vnd.dxr": { source: "iana" },
		"application/vnd.dynageo": {
			source: "iana",
			extensions: ["geo"]
		},
		"application/vnd.dzr": { source: "iana" },
		"application/vnd.easykaraoke.cdgdownload": { source: "iana" },
		"application/vnd.ecdis-update": { source: "iana" },
		"application/vnd.ecip.rlp": { source: "iana" },
		"application/vnd.eclipse.ditto+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.ecowin.chart": {
			source: "iana",
			extensions: ["mag"]
		},
		"application/vnd.ecowin.filerequest": { source: "iana" },
		"application/vnd.ecowin.fileupdate": { source: "iana" },
		"application/vnd.ecowin.series": { source: "iana" },
		"application/vnd.ecowin.seriesrequest": { source: "iana" },
		"application/vnd.ecowin.seriesupdate": { source: "iana" },
		"application/vnd.efi.img": { source: "iana" },
		"application/vnd.efi.iso": { source: "iana" },
		"application/vnd.emclient.accessrequest+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.enliven": {
			source: "iana",
			extensions: ["nml"]
		},
		"application/vnd.enphase.envoy": { source: "iana" },
		"application/vnd.eprints.data+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.epson.esf": {
			source: "iana",
			extensions: ["esf"]
		},
		"application/vnd.epson.msf": {
			source: "iana",
			extensions: ["msf"]
		},
		"application/vnd.epson.quickanime": {
			source: "iana",
			extensions: ["qam"]
		},
		"application/vnd.epson.salt": {
			source: "iana",
			extensions: ["slt"]
		},
		"application/vnd.epson.ssf": {
			source: "iana",
			extensions: ["ssf"]
		},
		"application/vnd.ericsson.quickcall": { source: "iana" },
		"application/vnd.espass-espass+zip": {
			source: "iana",
			compressible: !1
		},
		"application/vnd.eszigno3+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["es3", "et3"]
		},
		"application/vnd.etsi.aoc+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.etsi.asic-e+zip": {
			source: "iana",
			compressible: !1
		},
		"application/vnd.etsi.asic-s+zip": {
			source: "iana",
			compressible: !1
		},
		"application/vnd.etsi.cug+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.etsi.iptvcommand+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.etsi.iptvdiscovery+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.etsi.iptvprofile+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.etsi.iptvsad-bc+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.etsi.iptvsad-cod+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.etsi.iptvsad-npvr+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.etsi.iptvservice+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.etsi.iptvsync+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.etsi.iptvueprofile+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.etsi.mcid+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.etsi.mheg5": { source: "iana" },
		"application/vnd.etsi.overload-control-policy-dataset+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.etsi.pstn+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.etsi.sci+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.etsi.simservs+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.etsi.timestamp-token": { source: "iana" },
		"application/vnd.etsi.tsl+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.etsi.tsl.der": { source: "iana" },
		"application/vnd.eu.kasparian.car+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.eudora.data": { source: "iana" },
		"application/vnd.evolv.ecig.profile": { source: "iana" },
		"application/vnd.evolv.ecig.settings": { source: "iana" },
		"application/vnd.evolv.ecig.theme": { source: "iana" },
		"application/vnd.exstream-empower+zip": {
			source: "iana",
			compressible: !1
		},
		"application/vnd.exstream-package": { source: "iana" },
		"application/vnd.ezpix-album": {
			source: "iana",
			extensions: ["ez2"]
		},
		"application/vnd.ezpix-package": {
			source: "iana",
			extensions: ["ez3"]
		},
		"application/vnd.f-secure.mobile": { source: "iana" },
		"application/vnd.familysearch.gedcom+zip": {
			source: "iana",
			compressible: !1
		},
		"application/vnd.fastcopy-disk-image": { source: "iana" },
		"application/vnd.fdf": {
			source: "iana",
			extensions: ["fdf"]
		},
		"application/vnd.fdsn.mseed": {
			source: "iana",
			extensions: ["mseed"]
		},
		"application/vnd.fdsn.seed": {
			source: "iana",
			extensions: ["seed", "dataless"]
		},
		"application/vnd.ffsns": { source: "iana" },
		"application/vnd.ficlab.flb+zip": {
			source: "iana",
			compressible: !1
		},
		"application/vnd.filmit.zfc": { source: "iana" },
		"application/vnd.fints": { source: "iana" },
		"application/vnd.firemonkeys.cloudcell": { source: "iana" },
		"application/vnd.flographit": {
			source: "iana",
			extensions: ["gph"]
		},
		"application/vnd.fluxtime.clip": {
			source: "iana",
			extensions: ["ftc"]
		},
		"application/vnd.font-fontforge-sfd": { source: "iana" },
		"application/vnd.framemaker": {
			source: "iana",
			extensions: [
				"fm",
				"frame",
				"maker",
				"book"
			]
		},
		"application/vnd.frogans.fnc": {
			source: "iana",
			extensions: ["fnc"]
		},
		"application/vnd.frogans.ltf": {
			source: "iana",
			extensions: ["ltf"]
		},
		"application/vnd.fsc.weblaunch": {
			source: "iana",
			extensions: ["fsc"]
		},
		"application/vnd.fujifilm.fb.docuworks": { source: "iana" },
		"application/vnd.fujifilm.fb.docuworks.binder": { source: "iana" },
		"application/vnd.fujifilm.fb.docuworks.container": { source: "iana" },
		"application/vnd.fujifilm.fb.jfi+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.fujitsu.oasys": {
			source: "iana",
			extensions: ["oas"]
		},
		"application/vnd.fujitsu.oasys2": {
			source: "iana",
			extensions: ["oa2"]
		},
		"application/vnd.fujitsu.oasys3": {
			source: "iana",
			extensions: ["oa3"]
		},
		"application/vnd.fujitsu.oasysgp": {
			source: "iana",
			extensions: ["fg5"]
		},
		"application/vnd.fujitsu.oasysprs": {
			source: "iana",
			extensions: ["bh2"]
		},
		"application/vnd.fujixerox.art-ex": { source: "iana" },
		"application/vnd.fujixerox.art4": { source: "iana" },
		"application/vnd.fujixerox.ddd": {
			source: "iana",
			extensions: ["ddd"]
		},
		"application/vnd.fujixerox.docuworks": {
			source: "iana",
			extensions: ["xdw"]
		},
		"application/vnd.fujixerox.docuworks.binder": {
			source: "iana",
			extensions: ["xbd"]
		},
		"application/vnd.fujixerox.docuworks.container": { source: "iana" },
		"application/vnd.fujixerox.hbpl": { source: "iana" },
		"application/vnd.fut-misnet": { source: "iana" },
		"application/vnd.futoin+cbor": { source: "iana" },
		"application/vnd.futoin+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.fuzzysheet": {
			source: "iana",
			extensions: ["fzs"]
		},
		"application/vnd.genomatix.tuxedo": {
			source: "iana",
			extensions: ["txd"]
		},
		"application/vnd.gentics.grd+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.geo+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.geocube+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.geogebra.file": {
			source: "iana",
			extensions: ["ggb"]
		},
		"application/vnd.geogebra.slides": { source: "iana" },
		"application/vnd.geogebra.tool": {
			source: "iana",
			extensions: ["ggt"]
		},
		"application/vnd.geometry-explorer": {
			source: "iana",
			extensions: ["gex", "gre"]
		},
		"application/vnd.geonext": {
			source: "iana",
			extensions: ["gxt"]
		},
		"application/vnd.geoplan": {
			source: "iana",
			extensions: ["g2w"]
		},
		"application/vnd.geospace": {
			source: "iana",
			extensions: ["g3w"]
		},
		"application/vnd.gerber": { source: "iana" },
		"application/vnd.globalplatform.card-content-mgt": { source: "iana" },
		"application/vnd.globalplatform.card-content-mgt-response": { source: "iana" },
		"application/vnd.gmx": {
			source: "iana",
			extensions: ["gmx"]
		},
		"application/vnd.google-apps.document": {
			compressible: !1,
			extensions: ["gdoc"]
		},
		"application/vnd.google-apps.presentation": {
			compressible: !1,
			extensions: ["gslides"]
		},
		"application/vnd.google-apps.spreadsheet": {
			compressible: !1,
			extensions: ["gsheet"]
		},
		"application/vnd.google-earth.kml+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["kml"]
		},
		"application/vnd.google-earth.kmz": {
			source: "iana",
			compressible: !1,
			extensions: ["kmz"]
		},
		"application/vnd.gov.sk.e-form+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.gov.sk.e-form+zip": {
			source: "iana",
			compressible: !1
		},
		"application/vnd.gov.sk.xmldatacontainer+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.grafeq": {
			source: "iana",
			extensions: ["gqf", "gqs"]
		},
		"application/vnd.gridmp": { source: "iana" },
		"application/vnd.groove-account": {
			source: "iana",
			extensions: ["gac"]
		},
		"application/vnd.groove-help": {
			source: "iana",
			extensions: ["ghf"]
		},
		"application/vnd.groove-identity-message": {
			source: "iana",
			extensions: ["gim"]
		},
		"application/vnd.groove-injector": {
			source: "iana",
			extensions: ["grv"]
		},
		"application/vnd.groove-tool-message": {
			source: "iana",
			extensions: ["gtm"]
		},
		"application/vnd.groove-tool-template": {
			source: "iana",
			extensions: ["tpl"]
		},
		"application/vnd.groove-vcard": {
			source: "iana",
			extensions: ["vcg"]
		},
		"application/vnd.hal+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.hal+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["hal"]
		},
		"application/vnd.handheld-entertainment+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["zmm"]
		},
		"application/vnd.hbci": {
			source: "iana",
			extensions: ["hbci"]
		},
		"application/vnd.hc+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.hcl-bireports": { source: "iana" },
		"application/vnd.hdt": { source: "iana" },
		"application/vnd.heroku+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.hhe.lesson-player": {
			source: "iana",
			extensions: ["les"]
		},
		"application/vnd.hl7cda+xml": {
			source: "iana",
			charset: "UTF-8",
			compressible: !0
		},
		"application/vnd.hl7v2+xml": {
			source: "iana",
			charset: "UTF-8",
			compressible: !0
		},
		"application/vnd.hp-hpgl": {
			source: "iana",
			extensions: ["hpgl"]
		},
		"application/vnd.hp-hpid": {
			source: "iana",
			extensions: ["hpid"]
		},
		"application/vnd.hp-hps": {
			source: "iana",
			extensions: ["hps"]
		},
		"application/vnd.hp-jlyt": {
			source: "iana",
			extensions: ["jlt"]
		},
		"application/vnd.hp-pcl": {
			source: "iana",
			extensions: ["pcl"]
		},
		"application/vnd.hp-pclxl": {
			source: "iana",
			extensions: ["pclxl"]
		},
		"application/vnd.httphone": { source: "iana" },
		"application/vnd.hydrostatix.sof-data": {
			source: "iana",
			extensions: ["sfd-hdstx"]
		},
		"application/vnd.hyper+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.hyper-item+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.hyperdrive+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.hzn-3d-crossword": { source: "iana" },
		"application/vnd.ibm.afplinedata": { source: "iana" },
		"application/vnd.ibm.electronic-media": { source: "iana" },
		"application/vnd.ibm.minipay": {
			source: "iana",
			extensions: ["mpy"]
		},
		"application/vnd.ibm.modcap": {
			source: "iana",
			extensions: [
				"afp",
				"listafp",
				"list3820"
			]
		},
		"application/vnd.ibm.rights-management": {
			source: "iana",
			extensions: ["irm"]
		},
		"application/vnd.ibm.secure-container": {
			source: "iana",
			extensions: ["sc"]
		},
		"application/vnd.iccprofile": {
			source: "iana",
			extensions: ["icc", "icm"]
		},
		"application/vnd.ieee.1905": { source: "iana" },
		"application/vnd.igloader": {
			source: "iana",
			extensions: ["igl"]
		},
		"application/vnd.imagemeter.folder+zip": {
			source: "iana",
			compressible: !1
		},
		"application/vnd.imagemeter.image+zip": {
			source: "iana",
			compressible: !1
		},
		"application/vnd.immervision-ivp": {
			source: "iana",
			extensions: ["ivp"]
		},
		"application/vnd.immervision-ivu": {
			source: "iana",
			extensions: ["ivu"]
		},
		"application/vnd.ims.imsccv1p1": { source: "iana" },
		"application/vnd.ims.imsccv1p2": { source: "iana" },
		"application/vnd.ims.imsccv1p3": { source: "iana" },
		"application/vnd.ims.lis.v2.result+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.ims.lti.v2.toolconsumerprofile+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.ims.lti.v2.toolproxy+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.ims.lti.v2.toolproxy.id+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.ims.lti.v2.toolsettings+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.ims.lti.v2.toolsettings.simple+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.informedcontrol.rms+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.informix-visionary": { source: "iana" },
		"application/vnd.infotech.project": { source: "iana" },
		"application/vnd.infotech.project+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.innopath.wamp.notification": { source: "iana" },
		"application/vnd.insors.igm": {
			source: "iana",
			extensions: ["igm"]
		},
		"application/vnd.intercon.formnet": {
			source: "iana",
			extensions: ["xpw", "xpx"]
		},
		"application/vnd.intergeo": {
			source: "iana",
			extensions: ["i2g"]
		},
		"application/vnd.intertrust.digibox": { source: "iana" },
		"application/vnd.intertrust.nncp": { source: "iana" },
		"application/vnd.intu.qbo": {
			source: "iana",
			extensions: ["qbo"]
		},
		"application/vnd.intu.qfx": {
			source: "iana",
			extensions: ["qfx"]
		},
		"application/vnd.iptc.g2.catalogitem+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.iptc.g2.conceptitem+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.iptc.g2.knowledgeitem+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.iptc.g2.newsitem+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.iptc.g2.newsmessage+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.iptc.g2.packageitem+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.iptc.g2.planningitem+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.ipunplugged.rcprofile": {
			source: "iana",
			extensions: ["rcprofile"]
		},
		"application/vnd.irepository.package+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["irp"]
		},
		"application/vnd.is-xpr": {
			source: "iana",
			extensions: ["xpr"]
		},
		"application/vnd.isac.fcs": {
			source: "iana",
			extensions: ["fcs"]
		},
		"application/vnd.iso11783-10+zip": {
			source: "iana",
			compressible: !1
		},
		"application/vnd.jam": {
			source: "iana",
			extensions: ["jam"]
		},
		"application/vnd.japannet-directory-service": { source: "iana" },
		"application/vnd.japannet-jpnstore-wakeup": { source: "iana" },
		"application/vnd.japannet-payment-wakeup": { source: "iana" },
		"application/vnd.japannet-registration": { source: "iana" },
		"application/vnd.japannet-registration-wakeup": { source: "iana" },
		"application/vnd.japannet-setstore-wakeup": { source: "iana" },
		"application/vnd.japannet-verification": { source: "iana" },
		"application/vnd.japannet-verification-wakeup": { source: "iana" },
		"application/vnd.jcp.javame.midlet-rms": {
			source: "iana",
			extensions: ["rms"]
		},
		"application/vnd.jisp": {
			source: "iana",
			extensions: ["jisp"]
		},
		"application/vnd.joost.joda-archive": {
			source: "iana",
			extensions: ["joda"]
		},
		"application/vnd.jsk.isdn-ngn": { source: "iana" },
		"application/vnd.kahootz": {
			source: "iana",
			extensions: ["ktz", "ktr"]
		},
		"application/vnd.kde.karbon": {
			source: "iana",
			extensions: ["karbon"]
		},
		"application/vnd.kde.kchart": {
			source: "iana",
			extensions: ["chrt"]
		},
		"application/vnd.kde.kformula": {
			source: "iana",
			extensions: ["kfo"]
		},
		"application/vnd.kde.kivio": {
			source: "iana",
			extensions: ["flw"]
		},
		"application/vnd.kde.kontour": {
			source: "iana",
			extensions: ["kon"]
		},
		"application/vnd.kde.kpresenter": {
			source: "iana",
			extensions: ["kpr", "kpt"]
		},
		"application/vnd.kde.kspread": {
			source: "iana",
			extensions: ["ksp"]
		},
		"application/vnd.kde.kword": {
			source: "iana",
			extensions: ["kwd", "kwt"]
		},
		"application/vnd.kenameaapp": {
			source: "iana",
			extensions: ["htke"]
		},
		"application/vnd.kidspiration": {
			source: "iana",
			extensions: ["kia"]
		},
		"application/vnd.kinar": {
			source: "iana",
			extensions: ["kne", "knp"]
		},
		"application/vnd.koan": {
			source: "iana",
			extensions: [
				"skp",
				"skd",
				"skt",
				"skm"
			]
		},
		"application/vnd.kodak-descriptor": {
			source: "iana",
			extensions: ["sse"]
		},
		"application/vnd.las": { source: "iana" },
		"application/vnd.las.las+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.las.las+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["lasxml"]
		},
		"application/vnd.laszip": { source: "iana" },
		"application/vnd.leap+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.liberty-request+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.llamagraphics.life-balance.desktop": {
			source: "iana",
			extensions: ["lbd"]
		},
		"application/vnd.llamagraphics.life-balance.exchange+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["lbe"]
		},
		"application/vnd.logipipe.circuit+zip": {
			source: "iana",
			compressible: !1
		},
		"application/vnd.loom": { source: "iana" },
		"application/vnd.lotus-1-2-3": {
			source: "iana",
			extensions: ["123"]
		},
		"application/vnd.lotus-approach": {
			source: "iana",
			extensions: ["apr"]
		},
		"application/vnd.lotus-freelance": {
			source: "iana",
			extensions: ["pre"]
		},
		"application/vnd.lotus-notes": {
			source: "iana",
			extensions: ["nsf"]
		},
		"application/vnd.lotus-organizer": {
			source: "iana",
			extensions: ["org"]
		},
		"application/vnd.lotus-screencam": {
			source: "iana",
			extensions: ["scm"]
		},
		"application/vnd.lotus-wordpro": {
			source: "iana",
			extensions: ["lwp"]
		},
		"application/vnd.macports.portpkg": {
			source: "iana",
			extensions: ["portpkg"]
		},
		"application/vnd.mapbox-vector-tile": {
			source: "iana",
			extensions: ["mvt"]
		},
		"application/vnd.marlin.drm.actiontoken+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.marlin.drm.conftoken+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.marlin.drm.license+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.marlin.drm.mdcf": { source: "iana" },
		"application/vnd.mason+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.maxar.archive.3tz+zip": {
			source: "iana",
			compressible: !1
		},
		"application/vnd.maxmind.maxmind-db": { source: "iana" },
		"application/vnd.mcd": {
			source: "iana",
			extensions: ["mcd"]
		},
		"application/vnd.medcalcdata": {
			source: "iana",
			extensions: ["mc1"]
		},
		"application/vnd.mediastation.cdkey": {
			source: "iana",
			extensions: ["cdkey"]
		},
		"application/vnd.meridian-slingshot": { source: "iana" },
		"application/vnd.mfer": {
			source: "iana",
			extensions: ["mwf"]
		},
		"application/vnd.mfmp": {
			source: "iana",
			extensions: ["mfm"]
		},
		"application/vnd.micro+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.micrografx.flo": {
			source: "iana",
			extensions: ["flo"]
		},
		"application/vnd.micrografx.igx": {
			source: "iana",
			extensions: ["igx"]
		},
		"application/vnd.microsoft.portable-executable": { source: "iana" },
		"application/vnd.microsoft.windows.thumbnail-cache": { source: "iana" },
		"application/vnd.miele+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.mif": {
			source: "iana",
			extensions: ["mif"]
		},
		"application/vnd.minisoft-hp3000-save": { source: "iana" },
		"application/vnd.mitsubishi.misty-guard.trustweb": { source: "iana" },
		"application/vnd.mobius.daf": {
			source: "iana",
			extensions: ["daf"]
		},
		"application/vnd.mobius.dis": {
			source: "iana",
			extensions: ["dis"]
		},
		"application/vnd.mobius.mbk": {
			source: "iana",
			extensions: ["mbk"]
		},
		"application/vnd.mobius.mqy": {
			source: "iana",
			extensions: ["mqy"]
		},
		"application/vnd.mobius.msl": {
			source: "iana",
			extensions: ["msl"]
		},
		"application/vnd.mobius.plc": {
			source: "iana",
			extensions: ["plc"]
		},
		"application/vnd.mobius.txf": {
			source: "iana",
			extensions: ["txf"]
		},
		"application/vnd.mophun.application": {
			source: "iana",
			extensions: ["mpn"]
		},
		"application/vnd.mophun.certificate": {
			source: "iana",
			extensions: ["mpc"]
		},
		"application/vnd.motorola.flexsuite": { source: "iana" },
		"application/vnd.motorola.flexsuite.adsi": { source: "iana" },
		"application/vnd.motorola.flexsuite.fis": { source: "iana" },
		"application/vnd.motorola.flexsuite.gotap": { source: "iana" },
		"application/vnd.motorola.flexsuite.kmr": { source: "iana" },
		"application/vnd.motorola.flexsuite.ttc": { source: "iana" },
		"application/vnd.motorola.flexsuite.wem": { source: "iana" },
		"application/vnd.motorola.iprm": { source: "iana" },
		"application/vnd.mozilla.xul+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["xul"]
		},
		"application/vnd.ms-3mfdocument": { source: "iana" },
		"application/vnd.ms-artgalry": {
			source: "iana",
			extensions: ["cil"]
		},
		"application/vnd.ms-asf": { source: "iana" },
		"application/vnd.ms-cab-compressed": {
			source: "iana",
			extensions: ["cab"]
		},
		"application/vnd.ms-color.iccprofile": { source: "apache" },
		"application/vnd.ms-excel": {
			source: "iana",
			compressible: !1,
			extensions: [
				"xls",
				"xlm",
				"xla",
				"xlc",
				"xlt",
				"xlw"
			]
		},
		"application/vnd.ms-excel.addin.macroenabled.12": {
			source: "iana",
			extensions: ["xlam"]
		},
		"application/vnd.ms-excel.sheet.binary.macroenabled.12": {
			source: "iana",
			extensions: ["xlsb"]
		},
		"application/vnd.ms-excel.sheet.macroenabled.12": {
			source: "iana",
			extensions: ["xlsm"]
		},
		"application/vnd.ms-excel.template.macroenabled.12": {
			source: "iana",
			extensions: ["xltm"]
		},
		"application/vnd.ms-fontobject": {
			source: "iana",
			compressible: !0,
			extensions: ["eot"]
		},
		"application/vnd.ms-htmlhelp": {
			source: "iana",
			extensions: ["chm"]
		},
		"application/vnd.ms-ims": {
			source: "iana",
			extensions: ["ims"]
		},
		"application/vnd.ms-lrm": {
			source: "iana",
			extensions: ["lrm"]
		},
		"application/vnd.ms-office.activex+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.ms-officetheme": {
			source: "iana",
			extensions: ["thmx"]
		},
		"application/vnd.ms-opentype": {
			source: "apache",
			compressible: !0
		},
		"application/vnd.ms-outlook": {
			compressible: !1,
			extensions: ["msg"]
		},
		"application/vnd.ms-package.obfuscated-opentype": { source: "apache" },
		"application/vnd.ms-pki.seccat": {
			source: "apache",
			extensions: ["cat"]
		},
		"application/vnd.ms-pki.stl": {
			source: "apache",
			extensions: ["stl"]
		},
		"application/vnd.ms-playready.initiator+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.ms-powerpoint": {
			source: "iana",
			compressible: !1,
			extensions: [
				"ppt",
				"pps",
				"pot"
			]
		},
		"application/vnd.ms-powerpoint.addin.macroenabled.12": {
			source: "iana",
			extensions: ["ppam"]
		},
		"application/vnd.ms-powerpoint.presentation.macroenabled.12": {
			source: "iana",
			extensions: ["pptm"]
		},
		"application/vnd.ms-powerpoint.slide.macroenabled.12": {
			source: "iana",
			extensions: ["sldm"]
		},
		"application/vnd.ms-powerpoint.slideshow.macroenabled.12": {
			source: "iana",
			extensions: ["ppsm"]
		},
		"application/vnd.ms-powerpoint.template.macroenabled.12": {
			source: "iana",
			extensions: ["potm"]
		},
		"application/vnd.ms-printdevicecapabilities+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.ms-printing.printticket+xml": {
			source: "apache",
			compressible: !0
		},
		"application/vnd.ms-printschematicket+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.ms-project": {
			source: "iana",
			extensions: ["mpp", "mpt"]
		},
		"application/vnd.ms-tnef": { source: "iana" },
		"application/vnd.ms-windows.devicepairing": { source: "iana" },
		"application/vnd.ms-windows.nwprinting.oob": { source: "iana" },
		"application/vnd.ms-windows.printerpairing": { source: "iana" },
		"application/vnd.ms-windows.wsd.oob": { source: "iana" },
		"application/vnd.ms-wmdrm.lic-chlg-req": { source: "iana" },
		"application/vnd.ms-wmdrm.lic-resp": { source: "iana" },
		"application/vnd.ms-wmdrm.meter-chlg-req": { source: "iana" },
		"application/vnd.ms-wmdrm.meter-resp": { source: "iana" },
		"application/vnd.ms-word.document.macroenabled.12": {
			source: "iana",
			extensions: ["docm"]
		},
		"application/vnd.ms-word.template.macroenabled.12": {
			source: "iana",
			extensions: ["dotm"]
		},
		"application/vnd.ms-works": {
			source: "iana",
			extensions: [
				"wps",
				"wks",
				"wcm",
				"wdb"
			]
		},
		"application/vnd.ms-wpl": {
			source: "iana",
			extensions: ["wpl"]
		},
		"application/vnd.ms-xpsdocument": {
			source: "iana",
			compressible: !1,
			extensions: ["xps"]
		},
		"application/vnd.msa-disk-image": { source: "iana" },
		"application/vnd.mseq": {
			source: "iana",
			extensions: ["mseq"]
		},
		"application/vnd.msign": { source: "iana" },
		"application/vnd.multiad.creator": { source: "iana" },
		"application/vnd.multiad.creator.cif": { source: "iana" },
		"application/vnd.music-niff": { source: "iana" },
		"application/vnd.musician": {
			source: "iana",
			extensions: ["mus"]
		},
		"application/vnd.muvee.style": {
			source: "iana",
			extensions: ["msty"]
		},
		"application/vnd.mynfc": {
			source: "iana",
			extensions: ["taglet"]
		},
		"application/vnd.nacamar.ybrid+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.ncd.control": { source: "iana" },
		"application/vnd.ncd.reference": { source: "iana" },
		"application/vnd.nearst.inv+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.nebumind.line": { source: "iana" },
		"application/vnd.nervana": { source: "iana" },
		"application/vnd.netfpx": { source: "iana" },
		"application/vnd.neurolanguage.nlu": {
			source: "iana",
			extensions: ["nlu"]
		},
		"application/vnd.nimn": { source: "iana" },
		"application/vnd.nintendo.nitro.rom": { source: "iana" },
		"application/vnd.nintendo.snes.rom": { source: "iana" },
		"application/vnd.nitf": {
			source: "iana",
			extensions: ["ntf", "nitf"]
		},
		"application/vnd.noblenet-directory": {
			source: "iana",
			extensions: ["nnd"]
		},
		"application/vnd.noblenet-sealer": {
			source: "iana",
			extensions: ["nns"]
		},
		"application/vnd.noblenet-web": {
			source: "iana",
			extensions: ["nnw"]
		},
		"application/vnd.nokia.catalogs": { source: "iana" },
		"application/vnd.nokia.conml+wbxml": { source: "iana" },
		"application/vnd.nokia.conml+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.nokia.iptv.config+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.nokia.isds-radio-presets": { source: "iana" },
		"application/vnd.nokia.landmark+wbxml": { source: "iana" },
		"application/vnd.nokia.landmark+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.nokia.landmarkcollection+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.nokia.n-gage.ac+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["ac"]
		},
		"application/vnd.nokia.n-gage.data": {
			source: "iana",
			extensions: ["ngdat"]
		},
		"application/vnd.nokia.n-gage.symbian.install": {
			source: "iana",
			extensions: ["n-gage"]
		},
		"application/vnd.nokia.ncd": { source: "iana" },
		"application/vnd.nokia.pcd+wbxml": { source: "iana" },
		"application/vnd.nokia.pcd+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.nokia.radio-preset": {
			source: "iana",
			extensions: ["rpst"]
		},
		"application/vnd.nokia.radio-presets": {
			source: "iana",
			extensions: ["rpss"]
		},
		"application/vnd.novadigm.edm": {
			source: "iana",
			extensions: ["edm"]
		},
		"application/vnd.novadigm.edx": {
			source: "iana",
			extensions: ["edx"]
		},
		"application/vnd.novadigm.ext": {
			source: "iana",
			extensions: ["ext"]
		},
		"application/vnd.ntt-local.content-share": { source: "iana" },
		"application/vnd.ntt-local.file-transfer": { source: "iana" },
		"application/vnd.ntt-local.ogw_remote-access": { source: "iana" },
		"application/vnd.ntt-local.sip-ta_remote": { source: "iana" },
		"application/vnd.ntt-local.sip-ta_tcp_stream": { source: "iana" },
		"application/vnd.oasis.opendocument.chart": {
			source: "iana",
			extensions: ["odc"]
		},
		"application/vnd.oasis.opendocument.chart-template": {
			source: "iana",
			extensions: ["otc"]
		},
		"application/vnd.oasis.opendocument.database": {
			source: "iana",
			extensions: ["odb"]
		},
		"application/vnd.oasis.opendocument.formula": {
			source: "iana",
			extensions: ["odf"]
		},
		"application/vnd.oasis.opendocument.formula-template": {
			source: "iana",
			extensions: ["odft"]
		},
		"application/vnd.oasis.opendocument.graphics": {
			source: "iana",
			compressible: !1,
			extensions: ["odg"]
		},
		"application/vnd.oasis.opendocument.graphics-template": {
			source: "iana",
			extensions: ["otg"]
		},
		"application/vnd.oasis.opendocument.image": {
			source: "iana",
			extensions: ["odi"]
		},
		"application/vnd.oasis.opendocument.image-template": {
			source: "iana",
			extensions: ["oti"]
		},
		"application/vnd.oasis.opendocument.presentation": {
			source: "iana",
			compressible: !1,
			extensions: ["odp"]
		},
		"application/vnd.oasis.opendocument.presentation-template": {
			source: "iana",
			extensions: ["otp"]
		},
		"application/vnd.oasis.opendocument.spreadsheet": {
			source: "iana",
			compressible: !1,
			extensions: ["ods"]
		},
		"application/vnd.oasis.opendocument.spreadsheet-template": {
			source: "iana",
			extensions: ["ots"]
		},
		"application/vnd.oasis.opendocument.text": {
			source: "iana",
			compressible: !1,
			extensions: ["odt"]
		},
		"application/vnd.oasis.opendocument.text-master": {
			source: "iana",
			extensions: ["odm"]
		},
		"application/vnd.oasis.opendocument.text-template": {
			source: "iana",
			extensions: ["ott"]
		},
		"application/vnd.oasis.opendocument.text-web": {
			source: "iana",
			extensions: ["oth"]
		},
		"application/vnd.obn": { source: "iana" },
		"application/vnd.ocf+cbor": { source: "iana" },
		"application/vnd.oci.image.manifest.v1+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.oftn.l10n+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.oipf.contentaccessdownload+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.oipf.contentaccessstreaming+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.oipf.cspg-hexbinary": { source: "iana" },
		"application/vnd.oipf.dae.svg+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.oipf.dae.xhtml+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.oipf.mippvcontrolmessage+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.oipf.pae.gem": { source: "iana" },
		"application/vnd.oipf.spdiscovery+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.oipf.spdlist+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.oipf.ueprofile+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.oipf.userprofile+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.olpc-sugar": {
			source: "iana",
			extensions: ["xo"]
		},
		"application/vnd.oma-scws-config": { source: "iana" },
		"application/vnd.oma-scws-http-request": { source: "iana" },
		"application/vnd.oma-scws-http-response": { source: "iana" },
		"application/vnd.oma.bcast.associated-procedure-parameter+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.oma.bcast.drm-trigger+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.oma.bcast.imd+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.oma.bcast.ltkm": { source: "iana" },
		"application/vnd.oma.bcast.notification+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.oma.bcast.provisioningtrigger": { source: "iana" },
		"application/vnd.oma.bcast.sgboot": { source: "iana" },
		"application/vnd.oma.bcast.sgdd+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.oma.bcast.sgdu": { source: "iana" },
		"application/vnd.oma.bcast.simple-symbol-container": { source: "iana" },
		"application/vnd.oma.bcast.smartcard-trigger+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.oma.bcast.sprov+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.oma.bcast.stkm": { source: "iana" },
		"application/vnd.oma.cab-address-book+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.oma.cab-feature-handler+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.oma.cab-pcc+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.oma.cab-subs-invite+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.oma.cab-user-prefs+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.oma.dcd": { source: "iana" },
		"application/vnd.oma.dcdc": { source: "iana" },
		"application/vnd.oma.dd2+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["dd2"]
		},
		"application/vnd.oma.drm.risd+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.oma.group-usage-list+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.oma.lwm2m+cbor": { source: "iana" },
		"application/vnd.oma.lwm2m+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.oma.lwm2m+tlv": { source: "iana" },
		"application/vnd.oma.pal+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.oma.poc.detailed-progress-report+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.oma.poc.final-report+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.oma.poc.groups+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.oma.poc.invocation-descriptor+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.oma.poc.optimized-progress-report+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.oma.push": { source: "iana" },
		"application/vnd.oma.scidm.messages+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.oma.xcap-directory+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.omads-email+xml": {
			source: "iana",
			charset: "UTF-8",
			compressible: !0
		},
		"application/vnd.omads-file+xml": {
			source: "iana",
			charset: "UTF-8",
			compressible: !0
		},
		"application/vnd.omads-folder+xml": {
			source: "iana",
			charset: "UTF-8",
			compressible: !0
		},
		"application/vnd.omaloc-supl-init": { source: "iana" },
		"application/vnd.onepager": { source: "iana" },
		"application/vnd.onepagertamp": { source: "iana" },
		"application/vnd.onepagertamx": { source: "iana" },
		"application/vnd.onepagertat": { source: "iana" },
		"application/vnd.onepagertatp": { source: "iana" },
		"application/vnd.onepagertatx": { source: "iana" },
		"application/vnd.openblox.game+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["obgx"]
		},
		"application/vnd.openblox.game-binary": { source: "iana" },
		"application/vnd.openeye.oeb": { source: "iana" },
		"application/vnd.openofficeorg.extension": {
			source: "apache",
			extensions: ["oxt"]
		},
		"application/vnd.openstreetmap.data+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["osm"]
		},
		"application/vnd.opentimestamps.ots": { source: "iana" },
		"application/vnd.openxmlformats-officedocument.custom-properties+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.customxmlproperties+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.drawing+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.drawingml.chart+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.drawingml.diagramcolors+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.drawingml.diagramdata+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.drawingml.diagramlayout+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.drawingml.diagramstyle+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.extended-properties+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.presentationml.commentauthors+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.presentationml.comments+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.presentationml.handoutmaster+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.presentationml.notesmaster+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.presentationml.notesslide+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.presentationml.presentation": {
			source: "iana",
			compressible: !1,
			extensions: ["pptx"]
		},
		"application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.presentationml.presprops+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.presentationml.slide": {
			source: "iana",
			extensions: ["sldx"]
		},
		"application/vnd.openxmlformats-officedocument.presentationml.slide+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.presentationml.slidelayout+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.presentationml.slidemaster+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.presentationml.slideshow": {
			source: "iana",
			extensions: ["ppsx"]
		},
		"application/vnd.openxmlformats-officedocument.presentationml.slideshow.main+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.presentationml.slideupdateinfo+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.presentationml.tablestyles+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.presentationml.tags+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.presentationml.template": {
			source: "iana",
			extensions: ["potx"]
		},
		"application/vnd.openxmlformats-officedocument.presentationml.template.main+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.presentationml.viewprops+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.calcchain+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.externallink+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcachedefinition+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcacherecords+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.pivottable+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.querytable+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.revisionheaders+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.revisionlog+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sharedstrings+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
			source: "iana",
			compressible: !1,
			extensions: ["xlsx"]
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheetmetadata+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.tablesinglecells+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.template": {
			source: "iana",
			extensions: ["xltx"]
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.usernames+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.volatiledependencies+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.theme+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.themeoverride+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.vmldrawing": { source: "iana" },
		"application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
			source: "iana",
			compressible: !1,
			extensions: ["docx"]
		},
		"application/vnd.openxmlformats-officedocument.wordprocessingml.document.glossary+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.wordprocessingml.endnotes+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.wordprocessingml.fonttable+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.wordprocessingml.template": {
			source: "iana",
			extensions: ["dotx"]
		},
		"application/vnd.openxmlformats-officedocument.wordprocessingml.template.main+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.wordprocessingml.websettings+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-package.core-properties+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-package.digital-signature-xmlsignature+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-package.relationships+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.oracle.resource+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.orange.indata": { source: "iana" },
		"application/vnd.osa.netdeploy": { source: "iana" },
		"application/vnd.osgeo.mapguide.package": {
			source: "iana",
			extensions: ["mgp"]
		},
		"application/vnd.osgi.bundle": { source: "iana" },
		"application/vnd.osgi.dp": {
			source: "iana",
			extensions: ["dp"]
		},
		"application/vnd.osgi.subsystem": {
			source: "iana",
			extensions: ["esa"]
		},
		"application/vnd.otps.ct-kip+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.oxli.countgraph": { source: "iana" },
		"application/vnd.pagerduty+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.palm": {
			source: "iana",
			extensions: [
				"pdb",
				"pqa",
				"oprc"
			]
		},
		"application/vnd.panoply": { source: "iana" },
		"application/vnd.paos.xml": { source: "iana" },
		"application/vnd.patentdive": { source: "iana" },
		"application/vnd.patientecommsdoc": { source: "iana" },
		"application/vnd.pawaafile": {
			source: "iana",
			extensions: ["paw"]
		},
		"application/vnd.pcos": { source: "iana" },
		"application/vnd.pg.format": {
			source: "iana",
			extensions: ["str"]
		},
		"application/vnd.pg.osasli": {
			source: "iana",
			extensions: ["ei6"]
		},
		"application/vnd.piaccess.application-licence": { source: "iana" },
		"application/vnd.picsel": {
			source: "iana",
			extensions: ["efif"]
		},
		"application/vnd.pmi.widget": {
			source: "iana",
			extensions: ["wg"]
		},
		"application/vnd.poc.group-advertisement+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.pocketlearn": {
			source: "iana",
			extensions: ["plf"]
		},
		"application/vnd.powerbuilder6": {
			source: "iana",
			extensions: ["pbd"]
		},
		"application/vnd.powerbuilder6-s": { source: "iana" },
		"application/vnd.powerbuilder7": { source: "iana" },
		"application/vnd.powerbuilder7-s": { source: "iana" },
		"application/vnd.powerbuilder75": { source: "iana" },
		"application/vnd.powerbuilder75-s": { source: "iana" },
		"application/vnd.preminet": { source: "iana" },
		"application/vnd.previewsystems.box": {
			source: "iana",
			extensions: ["box"]
		},
		"application/vnd.proteus.magazine": {
			source: "iana",
			extensions: ["mgz"]
		},
		"application/vnd.psfs": { source: "iana" },
		"application/vnd.publishare-delta-tree": {
			source: "iana",
			extensions: ["qps"]
		},
		"application/vnd.pvi.ptid1": {
			source: "iana",
			extensions: ["ptid"]
		},
		"application/vnd.pwg-multiplexed": { source: "iana" },
		"application/vnd.pwg-xhtml-print+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.qualcomm.brew-app-res": { source: "iana" },
		"application/vnd.quarantainenet": { source: "iana" },
		"application/vnd.quark.quarkxpress": {
			source: "iana",
			extensions: [
				"qxd",
				"qxt",
				"qwd",
				"qwt",
				"qxl",
				"qxb"
			]
		},
		"application/vnd.quobject-quoxdocument": { source: "iana" },
		"application/vnd.radisys.moml+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.radisys.msml+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.radisys.msml-audit+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.radisys.msml-audit-conf+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.radisys.msml-audit-conn+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.radisys.msml-audit-dialog+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.radisys.msml-audit-stream+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.radisys.msml-conf+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.radisys.msml-dialog+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.radisys.msml-dialog-base+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.radisys.msml-dialog-fax-detect+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.radisys.msml-dialog-fax-sendrecv+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.radisys.msml-dialog-group+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.radisys.msml-dialog-speech+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.radisys.msml-dialog-transform+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.rainstor.data": { source: "iana" },
		"application/vnd.rapid": { source: "iana" },
		"application/vnd.rar": {
			source: "iana",
			extensions: ["rar"]
		},
		"application/vnd.realvnc.bed": {
			source: "iana",
			extensions: ["bed"]
		},
		"application/vnd.recordare.musicxml": {
			source: "iana",
			extensions: ["mxl"]
		},
		"application/vnd.recordare.musicxml+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["musicxml"]
		},
		"application/vnd.renlearn.rlprint": { source: "iana" },
		"application/vnd.resilient.logic": { source: "iana" },
		"application/vnd.restful+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.rig.cryptonote": {
			source: "iana",
			extensions: ["cryptonote"]
		},
		"application/vnd.rim.cod": {
			source: "apache",
			extensions: ["cod"]
		},
		"application/vnd.rn-realmedia": {
			source: "apache",
			extensions: ["rm"]
		},
		"application/vnd.rn-realmedia-vbr": {
			source: "apache",
			extensions: ["rmvb"]
		},
		"application/vnd.route66.link66+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["link66"]
		},
		"application/vnd.rs-274x": { source: "iana" },
		"application/vnd.ruckus.download": { source: "iana" },
		"application/vnd.s3sms": { source: "iana" },
		"application/vnd.sailingtracker.track": {
			source: "iana",
			extensions: ["st"]
		},
		"application/vnd.sar": { source: "iana" },
		"application/vnd.sbm.cid": { source: "iana" },
		"application/vnd.sbm.mid2": { source: "iana" },
		"application/vnd.scribus": { source: "iana" },
		"application/vnd.sealed.3df": { source: "iana" },
		"application/vnd.sealed.csf": { source: "iana" },
		"application/vnd.sealed.doc": { source: "iana" },
		"application/vnd.sealed.eml": { source: "iana" },
		"application/vnd.sealed.mht": { source: "iana" },
		"application/vnd.sealed.net": { source: "iana" },
		"application/vnd.sealed.ppt": { source: "iana" },
		"application/vnd.sealed.tiff": { source: "iana" },
		"application/vnd.sealed.xls": { source: "iana" },
		"application/vnd.sealedmedia.softseal.html": { source: "iana" },
		"application/vnd.sealedmedia.softseal.pdf": { source: "iana" },
		"application/vnd.seemail": {
			source: "iana",
			extensions: ["see"]
		},
		"application/vnd.seis+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.sema": {
			source: "iana",
			extensions: ["sema"]
		},
		"application/vnd.semd": {
			source: "iana",
			extensions: ["semd"]
		},
		"application/vnd.semf": {
			source: "iana",
			extensions: ["semf"]
		},
		"application/vnd.shade-save-file": { source: "iana" },
		"application/vnd.shana.informed.formdata": {
			source: "iana",
			extensions: ["ifm"]
		},
		"application/vnd.shana.informed.formtemplate": {
			source: "iana",
			extensions: ["itp"]
		},
		"application/vnd.shana.informed.interchange": {
			source: "iana",
			extensions: ["iif"]
		},
		"application/vnd.shana.informed.package": {
			source: "iana",
			extensions: ["ipk"]
		},
		"application/vnd.shootproof+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.shopkick+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.shp": { source: "iana" },
		"application/vnd.shx": { source: "iana" },
		"application/vnd.sigrok.session": { source: "iana" },
		"application/vnd.simtech-mindmapper": {
			source: "iana",
			extensions: ["twd", "twds"]
		},
		"application/vnd.siren+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.smaf": {
			source: "iana",
			extensions: ["mmf"]
		},
		"application/vnd.smart.notebook": { source: "iana" },
		"application/vnd.smart.teacher": {
			source: "iana",
			extensions: ["teacher"]
		},
		"application/vnd.snesdev-page-table": { source: "iana" },
		"application/vnd.software602.filler.form+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["fo"]
		},
		"application/vnd.software602.filler.form-xml-zip": { source: "iana" },
		"application/vnd.solent.sdkm+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["sdkm", "sdkd"]
		},
		"application/vnd.spotfire.dxp": {
			source: "iana",
			extensions: ["dxp"]
		},
		"application/vnd.spotfire.sfs": {
			source: "iana",
			extensions: ["sfs"]
		},
		"application/vnd.sqlite3": { source: "iana" },
		"application/vnd.sss-cod": { source: "iana" },
		"application/vnd.sss-dtf": { source: "iana" },
		"application/vnd.sss-ntf": { source: "iana" },
		"application/vnd.stardivision.calc": {
			source: "apache",
			extensions: ["sdc"]
		},
		"application/vnd.stardivision.draw": {
			source: "apache",
			extensions: ["sda"]
		},
		"application/vnd.stardivision.impress": {
			source: "apache",
			extensions: ["sdd"]
		},
		"application/vnd.stardivision.math": {
			source: "apache",
			extensions: ["smf"]
		},
		"application/vnd.stardivision.writer": {
			source: "apache",
			extensions: ["sdw", "vor"]
		},
		"application/vnd.stardivision.writer-global": {
			source: "apache",
			extensions: ["sgl"]
		},
		"application/vnd.stepmania.package": {
			source: "iana",
			extensions: ["smzip"]
		},
		"application/vnd.stepmania.stepchart": {
			source: "iana",
			extensions: ["sm"]
		},
		"application/vnd.street-stream": { source: "iana" },
		"application/vnd.sun.wadl+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["wadl"]
		},
		"application/vnd.sun.xml.calc": {
			source: "apache",
			extensions: ["sxc"]
		},
		"application/vnd.sun.xml.calc.template": {
			source: "apache",
			extensions: ["stc"]
		},
		"application/vnd.sun.xml.draw": {
			source: "apache",
			extensions: ["sxd"]
		},
		"application/vnd.sun.xml.draw.template": {
			source: "apache",
			extensions: ["std"]
		},
		"application/vnd.sun.xml.impress": {
			source: "apache",
			extensions: ["sxi"]
		},
		"application/vnd.sun.xml.impress.template": {
			source: "apache",
			extensions: ["sti"]
		},
		"application/vnd.sun.xml.math": {
			source: "apache",
			extensions: ["sxm"]
		},
		"application/vnd.sun.xml.writer": {
			source: "apache",
			extensions: ["sxw"]
		},
		"application/vnd.sun.xml.writer.global": {
			source: "apache",
			extensions: ["sxg"]
		},
		"application/vnd.sun.xml.writer.template": {
			source: "apache",
			extensions: ["stw"]
		},
		"application/vnd.sus-calendar": {
			source: "iana",
			extensions: ["sus", "susp"]
		},
		"application/vnd.svd": {
			source: "iana",
			extensions: ["svd"]
		},
		"application/vnd.swiftview-ics": { source: "iana" },
		"application/vnd.sycle+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.syft+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.symbian.install": {
			source: "apache",
			extensions: ["sis", "sisx"]
		},
		"application/vnd.syncml+xml": {
			source: "iana",
			charset: "UTF-8",
			compressible: !0,
			extensions: ["xsm"]
		},
		"application/vnd.syncml.dm+wbxml": {
			source: "iana",
			charset: "UTF-8",
			extensions: ["bdm"]
		},
		"application/vnd.syncml.dm+xml": {
			source: "iana",
			charset: "UTF-8",
			compressible: !0,
			extensions: ["xdm"]
		},
		"application/vnd.syncml.dm.notification": { source: "iana" },
		"application/vnd.syncml.dmddf+wbxml": { source: "iana" },
		"application/vnd.syncml.dmddf+xml": {
			source: "iana",
			charset: "UTF-8",
			compressible: !0,
			extensions: ["ddf"]
		},
		"application/vnd.syncml.dmtnds+wbxml": { source: "iana" },
		"application/vnd.syncml.dmtnds+xml": {
			source: "iana",
			charset: "UTF-8",
			compressible: !0
		},
		"application/vnd.syncml.ds.notification": { source: "iana" },
		"application/vnd.tableschema+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.tao.intent-module-archive": {
			source: "iana",
			extensions: ["tao"]
		},
		"application/vnd.tcpdump.pcap": {
			source: "iana",
			extensions: [
				"pcap",
				"cap",
				"dmp"
			]
		},
		"application/vnd.think-cell.ppttc+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.tmd.mediaflex.api+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.tml": { source: "iana" },
		"application/vnd.tmobile-livetv": {
			source: "iana",
			extensions: ["tmo"]
		},
		"application/vnd.tri.onesource": { source: "iana" },
		"application/vnd.trid.tpt": {
			source: "iana",
			extensions: ["tpt"]
		},
		"application/vnd.triscape.mxs": {
			source: "iana",
			extensions: ["mxs"]
		},
		"application/vnd.trueapp": {
			source: "iana",
			extensions: ["tra"]
		},
		"application/vnd.truedoc": { source: "iana" },
		"application/vnd.ubisoft.webplayer": { source: "iana" },
		"application/vnd.ufdl": {
			source: "iana",
			extensions: ["ufd", "ufdl"]
		},
		"application/vnd.uiq.theme": {
			source: "iana",
			extensions: ["utz"]
		},
		"application/vnd.umajin": {
			source: "iana",
			extensions: ["umj"]
		},
		"application/vnd.unity": {
			source: "iana",
			extensions: ["unityweb"]
		},
		"application/vnd.uoml+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["uoml"]
		},
		"application/vnd.uplanet.alert": { source: "iana" },
		"application/vnd.uplanet.alert-wbxml": { source: "iana" },
		"application/vnd.uplanet.bearer-choice": { source: "iana" },
		"application/vnd.uplanet.bearer-choice-wbxml": { source: "iana" },
		"application/vnd.uplanet.cacheop": { source: "iana" },
		"application/vnd.uplanet.cacheop-wbxml": { source: "iana" },
		"application/vnd.uplanet.channel": { source: "iana" },
		"application/vnd.uplanet.channel-wbxml": { source: "iana" },
		"application/vnd.uplanet.list": { source: "iana" },
		"application/vnd.uplanet.list-wbxml": { source: "iana" },
		"application/vnd.uplanet.listcmd": { source: "iana" },
		"application/vnd.uplanet.listcmd-wbxml": { source: "iana" },
		"application/vnd.uplanet.signal": { source: "iana" },
		"application/vnd.uri-map": { source: "iana" },
		"application/vnd.valve.source.material": { source: "iana" },
		"application/vnd.vcx": {
			source: "iana",
			extensions: ["vcx"]
		},
		"application/vnd.vd-study": { source: "iana" },
		"application/vnd.vectorworks": { source: "iana" },
		"application/vnd.vel+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.verimatrix.vcas": { source: "iana" },
		"application/vnd.veritone.aion+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.veryant.thin": { source: "iana" },
		"application/vnd.ves.encrypted": { source: "iana" },
		"application/vnd.vidsoft.vidconference": { source: "iana" },
		"application/vnd.visio": {
			source: "iana",
			extensions: [
				"vsd",
				"vst",
				"vss",
				"vsw"
			]
		},
		"application/vnd.visionary": {
			source: "iana",
			extensions: ["vis"]
		},
		"application/vnd.vividence.scriptfile": { source: "iana" },
		"application/vnd.vsf": {
			source: "iana",
			extensions: ["vsf"]
		},
		"application/vnd.wap.sic": { source: "iana" },
		"application/vnd.wap.slc": { source: "iana" },
		"application/vnd.wap.wbxml": {
			source: "iana",
			charset: "UTF-8",
			extensions: ["wbxml"]
		},
		"application/vnd.wap.wmlc": {
			source: "iana",
			extensions: ["wmlc"]
		},
		"application/vnd.wap.wmlscriptc": {
			source: "iana",
			extensions: ["wmlsc"]
		},
		"application/vnd.webturbo": {
			source: "iana",
			extensions: ["wtb"]
		},
		"application/vnd.wfa.dpp": { source: "iana" },
		"application/vnd.wfa.p2p": { source: "iana" },
		"application/vnd.wfa.wsc": { source: "iana" },
		"application/vnd.windows.devicepairing": { source: "iana" },
		"application/vnd.wmc": { source: "iana" },
		"application/vnd.wmf.bootstrap": { source: "iana" },
		"application/vnd.wolfram.mathematica": { source: "iana" },
		"application/vnd.wolfram.mathematica.package": { source: "iana" },
		"application/vnd.wolfram.player": {
			source: "iana",
			extensions: ["nbp"]
		},
		"application/vnd.wordperfect": {
			source: "iana",
			extensions: ["wpd"]
		},
		"application/vnd.wqd": {
			source: "iana",
			extensions: ["wqd"]
		},
		"application/vnd.wrq-hp3000-labelled": { source: "iana" },
		"application/vnd.wt.stf": {
			source: "iana",
			extensions: ["stf"]
		},
		"application/vnd.wv.csp+wbxml": { source: "iana" },
		"application/vnd.wv.csp+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.wv.ssp+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.xacml+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.xara": {
			source: "iana",
			extensions: ["xar"]
		},
		"application/vnd.xfdl": {
			source: "iana",
			extensions: ["xfdl"]
		},
		"application/vnd.xfdl.webform": { source: "iana" },
		"application/vnd.xmi+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.xmpie.cpkg": { source: "iana" },
		"application/vnd.xmpie.dpkg": { source: "iana" },
		"application/vnd.xmpie.plan": { source: "iana" },
		"application/vnd.xmpie.ppkg": { source: "iana" },
		"application/vnd.xmpie.xlim": { source: "iana" },
		"application/vnd.yamaha.hv-dic": {
			source: "iana",
			extensions: ["hvd"]
		},
		"application/vnd.yamaha.hv-script": {
			source: "iana",
			extensions: ["hvs"]
		},
		"application/vnd.yamaha.hv-voice": {
			source: "iana",
			extensions: ["hvp"]
		},
		"application/vnd.yamaha.openscoreformat": {
			source: "iana",
			extensions: ["osf"]
		},
		"application/vnd.yamaha.openscoreformat.osfpvg+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["osfpvg"]
		},
		"application/vnd.yamaha.remote-setup": { source: "iana" },
		"application/vnd.yamaha.smaf-audio": {
			source: "iana",
			extensions: ["saf"]
		},
		"application/vnd.yamaha.smaf-phrase": {
			source: "iana",
			extensions: ["spf"]
		},
		"application/vnd.yamaha.through-ngn": { source: "iana" },
		"application/vnd.yamaha.tunnel-udpencap": { source: "iana" },
		"application/vnd.yaoweme": { source: "iana" },
		"application/vnd.yellowriver-custom-menu": {
			source: "iana",
			extensions: ["cmp"]
		},
		"application/vnd.youtube.yt": { source: "iana" },
		"application/vnd.zul": {
			source: "iana",
			extensions: ["zir", "zirz"]
		},
		"application/vnd.zzazz.deck+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["zaz"]
		},
		"application/voicexml+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["vxml"]
		},
		"application/voucher-cms+json": {
			source: "iana",
			compressible: !0
		},
		"application/vq-rtcpxr": { source: "iana" },
		"application/wasm": {
			source: "iana",
			compressible: !0,
			extensions: ["wasm"]
		},
		"application/watcherinfo+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["wif"]
		},
		"application/webpush-options+json": {
			source: "iana",
			compressible: !0
		},
		"application/whoispp-query": { source: "iana" },
		"application/whoispp-response": { source: "iana" },
		"application/widget": {
			source: "iana",
			extensions: ["wgt"]
		},
		"application/winhlp": {
			source: "apache",
			extensions: ["hlp"]
		},
		"application/wita": { source: "iana" },
		"application/wordperfect5.1": { source: "iana" },
		"application/wsdl+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["wsdl"]
		},
		"application/wspolicy+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["wspolicy"]
		},
		"application/x-7z-compressed": {
			source: "apache",
			compressible: !1,
			extensions: ["7z"]
		},
		"application/x-abiword": {
			source: "apache",
			extensions: ["abw"]
		},
		"application/x-ace-compressed": {
			source: "apache",
			extensions: ["ace"]
		},
		"application/x-amf": { source: "apache" },
		"application/x-apple-diskimage": {
			source: "apache",
			extensions: ["dmg"]
		},
		"application/x-arj": {
			compressible: !1,
			extensions: ["arj"]
		},
		"application/x-authorware-bin": {
			source: "apache",
			extensions: [
				"aab",
				"x32",
				"u32",
				"vox"
			]
		},
		"application/x-authorware-map": {
			source: "apache",
			extensions: ["aam"]
		},
		"application/x-authorware-seg": {
			source: "apache",
			extensions: ["aas"]
		},
		"application/x-bcpio": {
			source: "apache",
			extensions: ["bcpio"]
		},
		"application/x-bdoc": {
			compressible: !1,
			extensions: ["bdoc"]
		},
		"application/x-bittorrent": {
			source: "apache",
			extensions: ["torrent"]
		},
		"application/x-blorb": {
			source: "apache",
			extensions: ["blb", "blorb"]
		},
		"application/x-bzip": {
			source: "apache",
			compressible: !1,
			extensions: ["bz"]
		},
		"application/x-bzip2": {
			source: "apache",
			compressible: !1,
			extensions: ["bz2", "boz"]
		},
		"application/x-cbr": {
			source: "apache",
			extensions: [
				"cbr",
				"cba",
				"cbt",
				"cbz",
				"cb7"
			]
		},
		"application/x-cdlink": {
			source: "apache",
			extensions: ["vcd"]
		},
		"application/x-cfs-compressed": {
			source: "apache",
			extensions: ["cfs"]
		},
		"application/x-chat": {
			source: "apache",
			extensions: ["chat"]
		},
		"application/x-chess-pgn": {
			source: "apache",
			extensions: ["pgn"]
		},
		"application/x-chrome-extension": { extensions: ["crx"] },
		"application/x-cocoa": {
			source: "nginx",
			extensions: ["cco"]
		},
		"application/x-compress": { source: "apache" },
		"application/x-conference": {
			source: "apache",
			extensions: ["nsc"]
		},
		"application/x-cpio": {
			source: "apache",
			extensions: ["cpio"]
		},
		"application/x-csh": {
			source: "apache",
			extensions: ["csh"]
		},
		"application/x-deb": { compressible: !1 },
		"application/x-debian-package": {
			source: "apache",
			extensions: ["deb", "udeb"]
		},
		"application/x-dgc-compressed": {
			source: "apache",
			extensions: ["dgc"]
		},
		"application/x-director": {
			source: "apache",
			extensions: [
				"dir",
				"dcr",
				"dxr",
				"cst",
				"cct",
				"cxt",
				"w3d",
				"fgd",
				"swa"
			]
		},
		"application/x-doom": {
			source: "apache",
			extensions: ["wad"]
		},
		"application/x-dtbncx+xml": {
			source: "apache",
			compressible: !0,
			extensions: ["ncx"]
		},
		"application/x-dtbook+xml": {
			source: "apache",
			compressible: !0,
			extensions: ["dtb"]
		},
		"application/x-dtbresource+xml": {
			source: "apache",
			compressible: !0,
			extensions: ["res"]
		},
		"application/x-dvi": {
			source: "apache",
			compressible: !1,
			extensions: ["dvi"]
		},
		"application/x-envoy": {
			source: "apache",
			extensions: ["evy"]
		},
		"application/x-eva": {
			source: "apache",
			extensions: ["eva"]
		},
		"application/x-font-bdf": {
			source: "apache",
			extensions: ["bdf"]
		},
		"application/x-font-dos": { source: "apache" },
		"application/x-font-framemaker": { source: "apache" },
		"application/x-font-ghostscript": {
			source: "apache",
			extensions: ["gsf"]
		},
		"application/x-font-libgrx": { source: "apache" },
		"application/x-font-linux-psf": {
			source: "apache",
			extensions: ["psf"]
		},
		"application/x-font-pcf": {
			source: "apache",
			extensions: ["pcf"]
		},
		"application/x-font-snf": {
			source: "apache",
			extensions: ["snf"]
		},
		"application/x-font-speedo": { source: "apache" },
		"application/x-font-sunos-news": { source: "apache" },
		"application/x-font-type1": {
			source: "apache",
			extensions: [
				"pfa",
				"pfb",
				"pfm",
				"afm"
			]
		},
		"application/x-font-vfont": { source: "apache" },
		"application/x-freearc": {
			source: "apache",
			extensions: ["arc"]
		},
		"application/x-futuresplash": {
			source: "apache",
			extensions: ["spl"]
		},
		"application/x-gca-compressed": {
			source: "apache",
			extensions: ["gca"]
		},
		"application/x-glulx": {
			source: "apache",
			extensions: ["ulx"]
		},
		"application/x-gnumeric": {
			source: "apache",
			extensions: ["gnumeric"]
		},
		"application/x-gramps-xml": {
			source: "apache",
			extensions: ["gramps"]
		},
		"application/x-gtar": {
			source: "apache",
			extensions: ["gtar"]
		},
		"application/x-gzip": { source: "apache" },
		"application/x-hdf": {
			source: "apache",
			extensions: ["hdf"]
		},
		"application/x-httpd-php": {
			compressible: !0,
			extensions: ["php"]
		},
		"application/x-install-instructions": {
			source: "apache",
			extensions: ["install"]
		},
		"application/x-iso9660-image": {
			source: "apache",
			extensions: ["iso"]
		},
		"application/x-iwork-keynote-sffkey": { extensions: ["key"] },
		"application/x-iwork-numbers-sffnumbers": { extensions: ["numbers"] },
		"application/x-iwork-pages-sffpages": { extensions: ["pages"] },
		"application/x-java-archive-diff": {
			source: "nginx",
			extensions: ["jardiff"]
		},
		"application/x-java-jnlp-file": {
			source: "apache",
			compressible: !1,
			extensions: ["jnlp"]
		},
		"application/x-javascript": { compressible: !0 },
		"application/x-keepass2": { extensions: ["kdbx"] },
		"application/x-latex": {
			source: "apache",
			compressible: !1,
			extensions: ["latex"]
		},
		"application/x-lua-bytecode": { extensions: ["luac"] },
		"application/x-lzh-compressed": {
			source: "apache",
			extensions: ["lzh", "lha"]
		},
		"application/x-makeself": {
			source: "nginx",
			extensions: ["run"]
		},
		"application/x-mie": {
			source: "apache",
			extensions: ["mie"]
		},
		"application/x-mobipocket-ebook": {
			source: "apache",
			extensions: ["prc", "mobi"]
		},
		"application/x-mpegurl": { compressible: !1 },
		"application/x-ms-application": {
			source: "apache",
			extensions: ["application"]
		},
		"application/x-ms-shortcut": {
			source: "apache",
			extensions: ["lnk"]
		},
		"application/x-ms-wmd": {
			source: "apache",
			extensions: ["wmd"]
		},
		"application/x-ms-wmz": {
			source: "apache",
			extensions: ["wmz"]
		},
		"application/x-ms-xbap": {
			source: "apache",
			extensions: ["xbap"]
		},
		"application/x-msaccess": {
			source: "apache",
			extensions: ["mdb"]
		},
		"application/x-msbinder": {
			source: "apache",
			extensions: ["obd"]
		},
		"application/x-mscardfile": {
			source: "apache",
			extensions: ["crd"]
		},
		"application/x-msclip": {
			source: "apache",
			extensions: ["clp"]
		},
		"application/x-msdos-program": { extensions: ["exe"] },
		"application/x-msdownload": {
			source: "apache",
			extensions: [
				"exe",
				"dll",
				"com",
				"bat",
				"msi"
			]
		},
		"application/x-msmediaview": {
			source: "apache",
			extensions: [
				"mvb",
				"m13",
				"m14"
			]
		},
		"application/x-msmetafile": {
			source: "apache",
			extensions: [
				"wmf",
				"wmz",
				"emf",
				"emz"
			]
		},
		"application/x-msmoney": {
			source: "apache",
			extensions: ["mny"]
		},
		"application/x-mspublisher": {
			source: "apache",
			extensions: ["pub"]
		},
		"application/x-msschedule": {
			source: "apache",
			extensions: ["scd"]
		},
		"application/x-msterminal": {
			source: "apache",
			extensions: ["trm"]
		},
		"application/x-mswrite": {
			source: "apache",
			extensions: ["wri"]
		},
		"application/x-netcdf": {
			source: "apache",
			extensions: ["nc", "cdf"]
		},
		"application/x-ns-proxy-autoconfig": {
			compressible: !0,
			extensions: ["pac"]
		},
		"application/x-nzb": {
			source: "apache",
			extensions: ["nzb"]
		},
		"application/x-perl": {
			source: "nginx",
			extensions: ["pl", "pm"]
		},
		"application/x-pilot": {
			source: "nginx",
			extensions: ["prc", "pdb"]
		},
		"application/x-pkcs12": {
			source: "apache",
			compressible: !1,
			extensions: ["p12", "pfx"]
		},
		"application/x-pkcs7-certificates": {
			source: "apache",
			extensions: ["p7b", "spc"]
		},
		"application/x-pkcs7-certreqresp": {
			source: "apache",
			extensions: ["p7r"]
		},
		"application/x-pki-message": { source: "iana" },
		"application/x-rar-compressed": {
			source: "apache",
			compressible: !1,
			extensions: ["rar"]
		},
		"application/x-redhat-package-manager": {
			source: "nginx",
			extensions: ["rpm"]
		},
		"application/x-research-info-systems": {
			source: "apache",
			extensions: ["ris"]
		},
		"application/x-sea": {
			source: "nginx",
			extensions: ["sea"]
		},
		"application/x-sh": {
			source: "apache",
			compressible: !0,
			extensions: ["sh"]
		},
		"application/x-shar": {
			source: "apache",
			extensions: ["shar"]
		},
		"application/x-shockwave-flash": {
			source: "apache",
			compressible: !1,
			extensions: ["swf"]
		},
		"application/x-silverlight-app": {
			source: "apache",
			extensions: ["xap"]
		},
		"application/x-sql": {
			source: "apache",
			extensions: ["sql"]
		},
		"application/x-stuffit": {
			source: "apache",
			compressible: !1,
			extensions: ["sit"]
		},
		"application/x-stuffitx": {
			source: "apache",
			extensions: ["sitx"]
		},
		"application/x-subrip": {
			source: "apache",
			extensions: ["srt"]
		},
		"application/x-sv4cpio": {
			source: "apache",
			extensions: ["sv4cpio"]
		},
		"application/x-sv4crc": {
			source: "apache",
			extensions: ["sv4crc"]
		},
		"application/x-t3vm-image": {
			source: "apache",
			extensions: ["t3"]
		},
		"application/x-tads": {
			source: "apache",
			extensions: ["gam"]
		},
		"application/x-tar": {
			source: "apache",
			compressible: !0,
			extensions: ["tar"]
		},
		"application/x-tcl": {
			source: "apache",
			extensions: ["tcl", "tk"]
		},
		"application/x-tex": {
			source: "apache",
			extensions: ["tex"]
		},
		"application/x-tex-tfm": {
			source: "apache",
			extensions: ["tfm"]
		},
		"application/x-texinfo": {
			source: "apache",
			extensions: ["texinfo", "texi"]
		},
		"application/x-tgif": {
			source: "apache",
			extensions: ["obj"]
		},
		"application/x-ustar": {
			source: "apache",
			extensions: ["ustar"]
		},
		"application/x-virtualbox-hdd": {
			compressible: !0,
			extensions: ["hdd"]
		},
		"application/x-virtualbox-ova": {
			compressible: !0,
			extensions: ["ova"]
		},
		"application/x-virtualbox-ovf": {
			compressible: !0,
			extensions: ["ovf"]
		},
		"application/x-virtualbox-vbox": {
			compressible: !0,
			extensions: ["vbox"]
		},
		"application/x-virtualbox-vbox-extpack": {
			compressible: !1,
			extensions: ["vbox-extpack"]
		},
		"application/x-virtualbox-vdi": {
			compressible: !0,
			extensions: ["vdi"]
		},
		"application/x-virtualbox-vhd": {
			compressible: !0,
			extensions: ["vhd"]
		},
		"application/x-virtualbox-vmdk": {
			compressible: !0,
			extensions: ["vmdk"]
		},
		"application/x-wais-source": {
			source: "apache",
			extensions: ["src"]
		},
		"application/x-web-app-manifest+json": {
			compressible: !0,
			extensions: ["webapp"]
		},
		"application/x-www-form-urlencoded": {
			source: "iana",
			compressible: !0
		},
		"application/x-x509-ca-cert": {
			source: "iana",
			extensions: [
				"der",
				"crt",
				"pem"
			]
		},
		"application/x-x509-ca-ra-cert": { source: "iana" },
		"application/x-x509-next-ca-cert": { source: "iana" },
		"application/x-xfig": {
			source: "apache",
			extensions: ["fig"]
		},
		"application/x-xliff+xml": {
			source: "apache",
			compressible: !0,
			extensions: ["xlf"]
		},
		"application/x-xpinstall": {
			source: "apache",
			compressible: !1,
			extensions: ["xpi"]
		},
		"application/x-xz": {
			source: "apache",
			extensions: ["xz"]
		},
		"application/x-zmachine": {
			source: "apache",
			extensions: [
				"z1",
				"z2",
				"z3",
				"z4",
				"z5",
				"z6",
				"z7",
				"z8"
			]
		},
		"application/x400-bp": { source: "iana" },
		"application/xacml+xml": {
			source: "iana",
			compressible: !0
		},
		"application/xaml+xml": {
			source: "apache",
			compressible: !0,
			extensions: ["xaml"]
		},
		"application/xcap-att+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["xav"]
		},
		"application/xcap-caps+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["xca"]
		},
		"application/xcap-diff+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["xdf"]
		},
		"application/xcap-el+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["xel"]
		},
		"application/xcap-error+xml": {
			source: "iana",
			compressible: !0
		},
		"application/xcap-ns+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["xns"]
		},
		"application/xcon-conference-info+xml": {
			source: "iana",
			compressible: !0
		},
		"application/xcon-conference-info-diff+xml": {
			source: "iana",
			compressible: !0
		},
		"application/xenc+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["xenc"]
		},
		"application/xhtml+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["xhtml", "xht"]
		},
		"application/xhtml-voice+xml": {
			source: "apache",
			compressible: !0
		},
		"application/xliff+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["xlf"]
		},
		"application/xml": {
			source: "iana",
			compressible: !0,
			extensions: [
				"xml",
				"xsl",
				"xsd",
				"rng"
			]
		},
		"application/xml-dtd": {
			source: "iana",
			compressible: !0,
			extensions: ["dtd"]
		},
		"application/xml-external-parsed-entity": { source: "iana" },
		"application/xml-patch+xml": {
			source: "iana",
			compressible: !0
		},
		"application/xmpp+xml": {
			source: "iana",
			compressible: !0
		},
		"application/xop+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["xop"]
		},
		"application/xproc+xml": {
			source: "apache",
			compressible: !0,
			extensions: ["xpl"]
		},
		"application/xslt+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["xsl", "xslt"]
		},
		"application/xspf+xml": {
			source: "apache",
			compressible: !0,
			extensions: ["xspf"]
		},
		"application/xv+xml": {
			source: "iana",
			compressible: !0,
			extensions: [
				"mxml",
				"xhvml",
				"xvml",
				"xvm"
			]
		},
		"application/yang": {
			source: "iana",
			extensions: ["yang"]
		},
		"application/yang-data+json": {
			source: "iana",
			compressible: !0
		},
		"application/yang-data+xml": {
			source: "iana",
			compressible: !0
		},
		"application/yang-patch+json": {
			source: "iana",
			compressible: !0
		},
		"application/yang-patch+xml": {
			source: "iana",
			compressible: !0
		},
		"application/yin+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["yin"]
		},
		"application/zip": {
			source: "iana",
			compressible: !1,
			extensions: ["zip"]
		},
		"application/zlib": { source: "iana" },
		"application/zstd": { source: "iana" },
		"audio/1d-interleaved-parityfec": { source: "iana" },
		"audio/32kadpcm": { source: "iana" },
		"audio/3gpp": {
			source: "iana",
			compressible: !1,
			extensions: ["3gpp"]
		},
		"audio/3gpp2": { source: "iana" },
		"audio/aac": { source: "iana" },
		"audio/ac3": { source: "iana" },
		"audio/adpcm": {
			source: "apache",
			extensions: ["adp"]
		},
		"audio/amr": {
			source: "iana",
			extensions: ["amr"]
		},
		"audio/amr-wb": { source: "iana" },
		"audio/amr-wb+": { source: "iana" },
		"audio/aptx": { source: "iana" },
		"audio/asc": { source: "iana" },
		"audio/atrac-advanced-lossless": { source: "iana" },
		"audio/atrac-x": { source: "iana" },
		"audio/atrac3": { source: "iana" },
		"audio/basic": {
			source: "iana",
			compressible: !1,
			extensions: ["au", "snd"]
		},
		"audio/bv16": { source: "iana" },
		"audio/bv32": { source: "iana" },
		"audio/clearmode": { source: "iana" },
		"audio/cn": { source: "iana" },
		"audio/dat12": { source: "iana" },
		"audio/dls": { source: "iana" },
		"audio/dsr-es201108": { source: "iana" },
		"audio/dsr-es202050": { source: "iana" },
		"audio/dsr-es202211": { source: "iana" },
		"audio/dsr-es202212": { source: "iana" },
		"audio/dv": { source: "iana" },
		"audio/dvi4": { source: "iana" },
		"audio/eac3": { source: "iana" },
		"audio/encaprtp": { source: "iana" },
		"audio/evrc": { source: "iana" },
		"audio/evrc-qcp": { source: "iana" },
		"audio/evrc0": { source: "iana" },
		"audio/evrc1": { source: "iana" },
		"audio/evrcb": { source: "iana" },
		"audio/evrcb0": { source: "iana" },
		"audio/evrcb1": { source: "iana" },
		"audio/evrcnw": { source: "iana" },
		"audio/evrcnw0": { source: "iana" },
		"audio/evrcnw1": { source: "iana" },
		"audio/evrcwb": { source: "iana" },
		"audio/evrcwb0": { source: "iana" },
		"audio/evrcwb1": { source: "iana" },
		"audio/evs": { source: "iana" },
		"audio/flexfec": { source: "iana" },
		"audio/fwdred": { source: "iana" },
		"audio/g711-0": { source: "iana" },
		"audio/g719": { source: "iana" },
		"audio/g722": { source: "iana" },
		"audio/g7221": { source: "iana" },
		"audio/g723": { source: "iana" },
		"audio/g726-16": { source: "iana" },
		"audio/g726-24": { source: "iana" },
		"audio/g726-32": { source: "iana" },
		"audio/g726-40": { source: "iana" },
		"audio/g728": { source: "iana" },
		"audio/g729": { source: "iana" },
		"audio/g7291": { source: "iana" },
		"audio/g729d": { source: "iana" },
		"audio/g729e": { source: "iana" },
		"audio/gsm": { source: "iana" },
		"audio/gsm-efr": { source: "iana" },
		"audio/gsm-hr-08": { source: "iana" },
		"audio/ilbc": { source: "iana" },
		"audio/ip-mr_v2.5": { source: "iana" },
		"audio/isac": { source: "apache" },
		"audio/l16": { source: "iana" },
		"audio/l20": { source: "iana" },
		"audio/l24": {
			source: "iana",
			compressible: !1
		},
		"audio/l8": { source: "iana" },
		"audio/lpc": { source: "iana" },
		"audio/melp": { source: "iana" },
		"audio/melp1200": { source: "iana" },
		"audio/melp2400": { source: "iana" },
		"audio/melp600": { source: "iana" },
		"audio/mhas": { source: "iana" },
		"audio/midi": {
			source: "apache",
			extensions: [
				"mid",
				"midi",
				"kar",
				"rmi"
			]
		},
		"audio/mobile-xmf": {
			source: "iana",
			extensions: ["mxmf"]
		},
		"audio/mp3": {
			compressible: !1,
			extensions: ["mp3"]
		},
		"audio/mp4": {
			source: "iana",
			compressible: !1,
			extensions: ["m4a", "mp4a"]
		},
		"audio/mp4a-latm": { source: "iana" },
		"audio/mpa": { source: "iana" },
		"audio/mpa-robust": { source: "iana" },
		"audio/mpeg": {
			source: "iana",
			compressible: !1,
			extensions: [
				"mpga",
				"mp2",
				"mp2a",
				"mp3",
				"m2a",
				"m3a"
			]
		},
		"audio/mpeg4-generic": { source: "iana" },
		"audio/musepack": { source: "apache" },
		"audio/ogg": {
			source: "iana",
			compressible: !1,
			extensions: [
				"oga",
				"ogg",
				"spx",
				"opus"
			]
		},
		"audio/opus": { source: "iana" },
		"audio/parityfec": { source: "iana" },
		"audio/pcma": { source: "iana" },
		"audio/pcma-wb": { source: "iana" },
		"audio/pcmu": { source: "iana" },
		"audio/pcmu-wb": { source: "iana" },
		"audio/prs.sid": { source: "iana" },
		"audio/qcelp": { source: "iana" },
		"audio/raptorfec": { source: "iana" },
		"audio/red": { source: "iana" },
		"audio/rtp-enc-aescm128": { source: "iana" },
		"audio/rtp-midi": { source: "iana" },
		"audio/rtploopback": { source: "iana" },
		"audio/rtx": { source: "iana" },
		"audio/s3m": {
			source: "apache",
			extensions: ["s3m"]
		},
		"audio/scip": { source: "iana" },
		"audio/silk": {
			source: "apache",
			extensions: ["sil"]
		},
		"audio/smv": { source: "iana" },
		"audio/smv-qcp": { source: "iana" },
		"audio/smv0": { source: "iana" },
		"audio/sofa": { source: "iana" },
		"audio/sp-midi": { source: "iana" },
		"audio/speex": { source: "iana" },
		"audio/t140c": { source: "iana" },
		"audio/t38": { source: "iana" },
		"audio/telephone-event": { source: "iana" },
		"audio/tetra_acelp": { source: "iana" },
		"audio/tetra_acelp_bb": { source: "iana" },
		"audio/tone": { source: "iana" },
		"audio/tsvcis": { source: "iana" },
		"audio/uemclip": { source: "iana" },
		"audio/ulpfec": { source: "iana" },
		"audio/usac": { source: "iana" },
		"audio/vdvi": { source: "iana" },
		"audio/vmr-wb": { source: "iana" },
		"audio/vnd.3gpp.iufp": { source: "iana" },
		"audio/vnd.4sb": { source: "iana" },
		"audio/vnd.audiokoz": { source: "iana" },
		"audio/vnd.celp": { source: "iana" },
		"audio/vnd.cisco.nse": { source: "iana" },
		"audio/vnd.cmles.radio-events": { source: "iana" },
		"audio/vnd.cns.anp1": { source: "iana" },
		"audio/vnd.cns.inf1": { source: "iana" },
		"audio/vnd.dece.audio": {
			source: "iana",
			extensions: ["uva", "uvva"]
		},
		"audio/vnd.digital-winds": {
			source: "iana",
			extensions: ["eol"]
		},
		"audio/vnd.dlna.adts": { source: "iana" },
		"audio/vnd.dolby.heaac.1": { source: "iana" },
		"audio/vnd.dolby.heaac.2": { source: "iana" },
		"audio/vnd.dolby.mlp": { source: "iana" },
		"audio/vnd.dolby.mps": { source: "iana" },
		"audio/vnd.dolby.pl2": { source: "iana" },
		"audio/vnd.dolby.pl2x": { source: "iana" },
		"audio/vnd.dolby.pl2z": { source: "iana" },
		"audio/vnd.dolby.pulse.1": { source: "iana" },
		"audio/vnd.dra": {
			source: "iana",
			extensions: ["dra"]
		},
		"audio/vnd.dts": {
			source: "iana",
			extensions: ["dts"]
		},
		"audio/vnd.dts.hd": {
			source: "iana",
			extensions: ["dtshd"]
		},
		"audio/vnd.dts.uhd": { source: "iana" },
		"audio/vnd.dvb.file": { source: "iana" },
		"audio/vnd.everad.plj": { source: "iana" },
		"audio/vnd.hns.audio": { source: "iana" },
		"audio/vnd.lucent.voice": {
			source: "iana",
			extensions: ["lvp"]
		},
		"audio/vnd.ms-playready.media.pya": {
			source: "iana",
			extensions: ["pya"]
		},
		"audio/vnd.nokia.mobile-xmf": { source: "iana" },
		"audio/vnd.nortel.vbk": { source: "iana" },
		"audio/vnd.nuera.ecelp4800": {
			source: "iana",
			extensions: ["ecelp4800"]
		},
		"audio/vnd.nuera.ecelp7470": {
			source: "iana",
			extensions: ["ecelp7470"]
		},
		"audio/vnd.nuera.ecelp9600": {
			source: "iana",
			extensions: ["ecelp9600"]
		},
		"audio/vnd.octel.sbc": { source: "iana" },
		"audio/vnd.presonus.multitrack": { source: "iana" },
		"audio/vnd.qcelp": { source: "iana" },
		"audio/vnd.rhetorex.32kadpcm": { source: "iana" },
		"audio/vnd.rip": {
			source: "iana",
			extensions: ["rip"]
		},
		"audio/vnd.rn-realaudio": { compressible: !1 },
		"audio/vnd.sealedmedia.softseal.mpeg": { source: "iana" },
		"audio/vnd.vmx.cvsd": { source: "iana" },
		"audio/vnd.wave": { compressible: !1 },
		"audio/vorbis": {
			source: "iana",
			compressible: !1
		},
		"audio/vorbis-config": { source: "iana" },
		"audio/wav": {
			compressible: !1,
			extensions: ["wav"]
		},
		"audio/wave": {
			compressible: !1,
			extensions: ["wav"]
		},
		"audio/webm": {
			source: "apache",
			compressible: !1,
			extensions: ["weba"]
		},
		"audio/x-aac": {
			source: "apache",
			compressible: !1,
			extensions: ["aac"]
		},
		"audio/x-aiff": {
			source: "apache",
			extensions: [
				"aif",
				"aiff",
				"aifc"
			]
		},
		"audio/x-caf": {
			source: "apache",
			compressible: !1,
			extensions: ["caf"]
		},
		"audio/x-flac": {
			source: "apache",
			extensions: ["flac"]
		},
		"audio/x-m4a": {
			source: "nginx",
			extensions: ["m4a"]
		},
		"audio/x-matroska": {
			source: "apache",
			extensions: ["mka"]
		},
		"audio/x-mpegurl": {
			source: "apache",
			extensions: ["m3u"]
		},
		"audio/x-ms-wax": {
			source: "apache",
			extensions: ["wax"]
		},
		"audio/x-ms-wma": {
			source: "apache",
			extensions: ["wma"]
		},
		"audio/x-pn-realaudio": {
			source: "apache",
			extensions: ["ram", "ra"]
		},
		"audio/x-pn-realaudio-plugin": {
			source: "apache",
			extensions: ["rmp"]
		},
		"audio/x-realaudio": {
			source: "nginx",
			extensions: ["ra"]
		},
		"audio/x-tta": { source: "apache" },
		"audio/x-wav": {
			source: "apache",
			extensions: ["wav"]
		},
		"audio/xm": {
			source: "apache",
			extensions: ["xm"]
		},
		"chemical/x-cdx": {
			source: "apache",
			extensions: ["cdx"]
		},
		"chemical/x-cif": {
			source: "apache",
			extensions: ["cif"]
		},
		"chemical/x-cmdf": {
			source: "apache",
			extensions: ["cmdf"]
		},
		"chemical/x-cml": {
			source: "apache",
			extensions: ["cml"]
		},
		"chemical/x-csml": {
			source: "apache",
			extensions: ["csml"]
		},
		"chemical/x-pdb": { source: "apache" },
		"chemical/x-xyz": {
			source: "apache",
			extensions: ["xyz"]
		},
		"font/collection": {
			source: "iana",
			extensions: ["ttc"]
		},
		"font/otf": {
			source: "iana",
			compressible: !0,
			extensions: ["otf"]
		},
		"font/sfnt": { source: "iana" },
		"font/ttf": {
			source: "iana",
			compressible: !0,
			extensions: ["ttf"]
		},
		"font/woff": {
			source: "iana",
			extensions: ["woff"]
		},
		"font/woff2": {
			source: "iana",
			extensions: ["woff2"]
		},
		"image/aces": {
			source: "iana",
			extensions: ["exr"]
		},
		"image/apng": {
			compressible: !1,
			extensions: ["apng"]
		},
		"image/avci": {
			source: "iana",
			extensions: ["avci"]
		},
		"image/avcs": {
			source: "iana",
			extensions: ["avcs"]
		},
		"image/avif": {
			source: "iana",
			compressible: !1,
			extensions: ["avif"]
		},
		"image/bmp": {
			source: "iana",
			compressible: !0,
			extensions: ["bmp"]
		},
		"image/cgm": {
			source: "iana",
			extensions: ["cgm"]
		},
		"image/dicom-rle": {
			source: "iana",
			extensions: ["drle"]
		},
		"image/emf": {
			source: "iana",
			extensions: ["emf"]
		},
		"image/fits": {
			source: "iana",
			extensions: ["fits"]
		},
		"image/g3fax": {
			source: "iana",
			extensions: ["g3"]
		},
		"image/gif": {
			source: "iana",
			compressible: !1,
			extensions: ["gif"]
		},
		"image/heic": {
			source: "iana",
			extensions: ["heic"]
		},
		"image/heic-sequence": {
			source: "iana",
			extensions: ["heics"]
		},
		"image/heif": {
			source: "iana",
			extensions: ["heif"]
		},
		"image/heif-sequence": {
			source: "iana",
			extensions: ["heifs"]
		},
		"image/hej2k": {
			source: "iana",
			extensions: ["hej2"]
		},
		"image/hsj2": {
			source: "iana",
			extensions: ["hsj2"]
		},
		"image/ief": {
			source: "iana",
			extensions: ["ief"]
		},
		"image/jls": {
			source: "iana",
			extensions: ["jls"]
		},
		"image/jp2": {
			source: "iana",
			compressible: !1,
			extensions: ["jp2", "jpg2"]
		},
		"image/jpeg": {
			source: "iana",
			compressible: !1,
			extensions: [
				"jpeg",
				"jpg",
				"jpe"
			]
		},
		"image/jph": {
			source: "iana",
			extensions: ["jph"]
		},
		"image/jphc": {
			source: "iana",
			extensions: ["jhc"]
		},
		"image/jpm": {
			source: "iana",
			compressible: !1,
			extensions: ["jpm"]
		},
		"image/jpx": {
			source: "iana",
			compressible: !1,
			extensions: ["jpx", "jpf"]
		},
		"image/jxr": {
			source: "iana",
			extensions: ["jxr"]
		},
		"image/jxra": {
			source: "iana",
			extensions: ["jxra"]
		},
		"image/jxrs": {
			source: "iana",
			extensions: ["jxrs"]
		},
		"image/jxs": {
			source: "iana",
			extensions: ["jxs"]
		},
		"image/jxsc": {
			source: "iana",
			extensions: ["jxsc"]
		},
		"image/jxsi": {
			source: "iana",
			extensions: ["jxsi"]
		},
		"image/jxss": {
			source: "iana",
			extensions: ["jxss"]
		},
		"image/ktx": {
			source: "iana",
			extensions: ["ktx"]
		},
		"image/ktx2": {
			source: "iana",
			extensions: ["ktx2"]
		},
		"image/naplps": { source: "iana" },
		"image/pjpeg": { compressible: !1 },
		"image/png": {
			source: "iana",
			compressible: !1,
			extensions: ["png"]
		},
		"image/prs.btif": {
			source: "iana",
			extensions: ["btif"]
		},
		"image/prs.pti": {
			source: "iana",
			extensions: ["pti"]
		},
		"image/pwg-raster": { source: "iana" },
		"image/sgi": {
			source: "apache",
			extensions: ["sgi"]
		},
		"image/svg+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["svg", "svgz"]
		},
		"image/t38": {
			source: "iana",
			extensions: ["t38"]
		},
		"image/tiff": {
			source: "iana",
			compressible: !1,
			extensions: ["tif", "tiff"]
		},
		"image/tiff-fx": {
			source: "iana",
			extensions: ["tfx"]
		},
		"image/vnd.adobe.photoshop": {
			source: "iana",
			compressible: !0,
			extensions: ["psd"]
		},
		"image/vnd.airzip.accelerator.azv": {
			source: "iana",
			extensions: ["azv"]
		},
		"image/vnd.cns.inf2": { source: "iana" },
		"image/vnd.dece.graphic": {
			source: "iana",
			extensions: [
				"uvi",
				"uvvi",
				"uvg",
				"uvvg"
			]
		},
		"image/vnd.djvu": {
			source: "iana",
			extensions: ["djvu", "djv"]
		},
		"image/vnd.dvb.subtitle": {
			source: "iana",
			extensions: ["sub"]
		},
		"image/vnd.dwg": {
			source: "iana",
			extensions: ["dwg"]
		},
		"image/vnd.dxf": {
			source: "iana",
			extensions: ["dxf"]
		},
		"image/vnd.fastbidsheet": {
			source: "iana",
			extensions: ["fbs"]
		},
		"image/vnd.fpx": {
			source: "iana",
			extensions: ["fpx"]
		},
		"image/vnd.fst": {
			source: "iana",
			extensions: ["fst"]
		},
		"image/vnd.fujixerox.edmics-mmr": {
			source: "iana",
			extensions: ["mmr"]
		},
		"image/vnd.fujixerox.edmics-rlc": {
			source: "iana",
			extensions: ["rlc"]
		},
		"image/vnd.globalgraphics.pgb": { source: "iana" },
		"image/vnd.microsoft.icon": {
			source: "iana",
			compressible: !0,
			extensions: ["ico"]
		},
		"image/vnd.mix": { source: "iana" },
		"image/vnd.mozilla.apng": { source: "iana" },
		"image/vnd.ms-dds": {
			compressible: !0,
			extensions: ["dds"]
		},
		"image/vnd.ms-modi": {
			source: "iana",
			extensions: ["mdi"]
		},
		"image/vnd.ms-photo": {
			source: "apache",
			extensions: ["wdp"]
		},
		"image/vnd.net-fpx": {
			source: "iana",
			extensions: ["npx"]
		},
		"image/vnd.pco.b16": {
			source: "iana",
			extensions: ["b16"]
		},
		"image/vnd.radiance": { source: "iana" },
		"image/vnd.sealed.png": { source: "iana" },
		"image/vnd.sealedmedia.softseal.gif": { source: "iana" },
		"image/vnd.sealedmedia.softseal.jpg": { source: "iana" },
		"image/vnd.svf": { source: "iana" },
		"image/vnd.tencent.tap": {
			source: "iana",
			extensions: ["tap"]
		},
		"image/vnd.valve.source.texture": {
			source: "iana",
			extensions: ["vtf"]
		},
		"image/vnd.wap.wbmp": {
			source: "iana",
			extensions: ["wbmp"]
		},
		"image/vnd.xiff": {
			source: "iana",
			extensions: ["xif"]
		},
		"image/vnd.zbrush.pcx": {
			source: "iana",
			extensions: ["pcx"]
		},
		"image/webp": {
			source: "apache",
			extensions: ["webp"]
		},
		"image/wmf": {
			source: "iana",
			extensions: ["wmf"]
		},
		"image/x-3ds": {
			source: "apache",
			extensions: ["3ds"]
		},
		"image/x-cmu-raster": {
			source: "apache",
			extensions: ["ras"]
		},
		"image/x-cmx": {
			source: "apache",
			extensions: ["cmx"]
		},
		"image/x-freehand": {
			source: "apache",
			extensions: [
				"fh",
				"fhc",
				"fh4",
				"fh5",
				"fh7"
			]
		},
		"image/x-icon": {
			source: "apache",
			compressible: !0,
			extensions: ["ico"]
		},
		"image/x-jng": {
			source: "nginx",
			extensions: ["jng"]
		},
		"image/x-mrsid-image": {
			source: "apache",
			extensions: ["sid"]
		},
		"image/x-ms-bmp": {
			source: "nginx",
			compressible: !0,
			extensions: ["bmp"]
		},
		"image/x-pcx": {
			source: "apache",
			extensions: ["pcx"]
		},
		"image/x-pict": {
			source: "apache",
			extensions: ["pic", "pct"]
		},
		"image/x-portable-anymap": {
			source: "apache",
			extensions: ["pnm"]
		},
		"image/x-portable-bitmap": {
			source: "apache",
			extensions: ["pbm"]
		},
		"image/x-portable-graymap": {
			source: "apache",
			extensions: ["pgm"]
		},
		"image/x-portable-pixmap": {
			source: "apache",
			extensions: ["ppm"]
		},
		"image/x-rgb": {
			source: "apache",
			extensions: ["rgb"]
		},
		"image/x-tga": {
			source: "apache",
			extensions: ["tga"]
		},
		"image/x-xbitmap": {
			source: "apache",
			extensions: ["xbm"]
		},
		"image/x-xcf": { compressible: !1 },
		"image/x-xpixmap": {
			source: "apache",
			extensions: ["xpm"]
		},
		"image/x-xwindowdump": {
			source: "apache",
			extensions: ["xwd"]
		},
		"message/cpim": { source: "iana" },
		"message/delivery-status": { source: "iana" },
		"message/disposition-notification": {
			source: "iana",
			extensions: ["disposition-notification"]
		},
		"message/external-body": { source: "iana" },
		"message/feedback-report": { source: "iana" },
		"message/global": {
			source: "iana",
			extensions: ["u8msg"]
		},
		"message/global-delivery-status": {
			source: "iana",
			extensions: ["u8dsn"]
		},
		"message/global-disposition-notification": {
			source: "iana",
			extensions: ["u8mdn"]
		},
		"message/global-headers": {
			source: "iana",
			extensions: ["u8hdr"]
		},
		"message/http": {
			source: "iana",
			compressible: !1
		},
		"message/imdn+xml": {
			source: "iana",
			compressible: !0
		},
		"message/news": { source: "iana" },
		"message/partial": {
			source: "iana",
			compressible: !1
		},
		"message/rfc822": {
			source: "iana",
			compressible: !0,
			extensions: ["eml", "mime"]
		},
		"message/s-http": { source: "iana" },
		"message/sip": { source: "iana" },
		"message/sipfrag": { source: "iana" },
		"message/tracking-status": { source: "iana" },
		"message/vnd.si.simp": { source: "iana" },
		"message/vnd.wfa.wsc": {
			source: "iana",
			extensions: ["wsc"]
		},
		"model/3mf": {
			source: "iana",
			extensions: ["3mf"]
		},
		"model/e57": { source: "iana" },
		"model/gltf+json": {
			source: "iana",
			compressible: !0,
			extensions: ["gltf"]
		},
		"model/gltf-binary": {
			source: "iana",
			compressible: !0,
			extensions: ["glb"]
		},
		"model/iges": {
			source: "iana",
			compressible: !1,
			extensions: ["igs", "iges"]
		},
		"model/mesh": {
			source: "iana",
			compressible: !1,
			extensions: [
				"msh",
				"mesh",
				"silo"
			]
		},
		"model/mtl": {
			source: "iana",
			extensions: ["mtl"]
		},
		"model/obj": {
			source: "iana",
			extensions: ["obj"]
		},
		"model/step": { source: "iana" },
		"model/step+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["stpx"]
		},
		"model/step+zip": {
			source: "iana",
			compressible: !1,
			extensions: ["stpz"]
		},
		"model/step-xml+zip": {
			source: "iana",
			compressible: !1,
			extensions: ["stpxz"]
		},
		"model/stl": {
			source: "iana",
			extensions: ["stl"]
		},
		"model/vnd.collada+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["dae"]
		},
		"model/vnd.dwf": {
			source: "iana",
			extensions: ["dwf"]
		},
		"model/vnd.flatland.3dml": { source: "iana" },
		"model/vnd.gdl": {
			source: "iana",
			extensions: ["gdl"]
		},
		"model/vnd.gs-gdl": { source: "apache" },
		"model/vnd.gs.gdl": { source: "iana" },
		"model/vnd.gtw": {
			source: "iana",
			extensions: ["gtw"]
		},
		"model/vnd.moml+xml": {
			source: "iana",
			compressible: !0
		},
		"model/vnd.mts": {
			source: "iana",
			extensions: ["mts"]
		},
		"model/vnd.opengex": {
			source: "iana",
			extensions: ["ogex"]
		},
		"model/vnd.parasolid.transmit.binary": {
			source: "iana",
			extensions: ["x_b"]
		},
		"model/vnd.parasolid.transmit.text": {
			source: "iana",
			extensions: ["x_t"]
		},
		"model/vnd.pytha.pyox": { source: "iana" },
		"model/vnd.rosette.annotated-data-model": { source: "iana" },
		"model/vnd.sap.vds": {
			source: "iana",
			extensions: ["vds"]
		},
		"model/vnd.usdz+zip": {
			source: "iana",
			compressible: !1,
			extensions: ["usdz"]
		},
		"model/vnd.valve.source.compiled-map": {
			source: "iana",
			extensions: ["bsp"]
		},
		"model/vnd.vtu": {
			source: "iana",
			extensions: ["vtu"]
		},
		"model/vrml": {
			source: "iana",
			compressible: !1,
			extensions: ["wrl", "vrml"]
		},
		"model/x3d+binary": {
			source: "apache",
			compressible: !1,
			extensions: ["x3db", "x3dbz"]
		},
		"model/x3d+fastinfoset": {
			source: "iana",
			extensions: ["x3db"]
		},
		"model/x3d+vrml": {
			source: "apache",
			compressible: !1,
			extensions: ["x3dv", "x3dvz"]
		},
		"model/x3d+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["x3d", "x3dz"]
		},
		"model/x3d-vrml": {
			source: "iana",
			extensions: ["x3dv"]
		},
		"multipart/alternative": {
			source: "iana",
			compressible: !1
		},
		"multipart/appledouble": { source: "iana" },
		"multipart/byteranges": { source: "iana" },
		"multipart/digest": { source: "iana" },
		"multipart/encrypted": {
			source: "iana",
			compressible: !1
		},
		"multipart/form-data": {
			source: "iana",
			compressible: !1
		},
		"multipart/header-set": { source: "iana" },
		"multipart/mixed": { source: "iana" },
		"multipart/multilingual": { source: "iana" },
		"multipart/parallel": { source: "iana" },
		"multipart/related": {
			source: "iana",
			compressible: !1
		},
		"multipart/report": { source: "iana" },
		"multipart/signed": {
			source: "iana",
			compressible: !1
		},
		"multipart/vnd.bint.med-plus": { source: "iana" },
		"multipart/voice-message": { source: "iana" },
		"multipart/x-mixed-replace": { source: "iana" },
		"text/1d-interleaved-parityfec": { source: "iana" },
		"text/cache-manifest": {
			source: "iana",
			compressible: !0,
			extensions: ["appcache", "manifest"]
		},
		"text/calendar": {
			source: "iana",
			extensions: ["ics", "ifb"]
		},
		"text/calender": { compressible: !0 },
		"text/cmd": { compressible: !0 },
		"text/coffeescript": { extensions: ["coffee", "litcoffee"] },
		"text/cql": { source: "iana" },
		"text/cql-expression": { source: "iana" },
		"text/cql-identifier": { source: "iana" },
		"text/css": {
			source: "iana",
			charset: "UTF-8",
			compressible: !0,
			extensions: ["css"]
		},
		"text/csv": {
			source: "iana",
			compressible: !0,
			extensions: ["csv"]
		},
		"text/csv-schema": { source: "iana" },
		"text/directory": { source: "iana" },
		"text/dns": { source: "iana" },
		"text/ecmascript": { source: "iana" },
		"text/encaprtp": { source: "iana" },
		"text/enriched": { source: "iana" },
		"text/fhirpath": { source: "iana" },
		"text/flexfec": { source: "iana" },
		"text/fwdred": { source: "iana" },
		"text/gff3": { source: "iana" },
		"text/grammar-ref-list": { source: "iana" },
		"text/html": {
			source: "iana",
			compressible: !0,
			extensions: [
				"html",
				"htm",
				"shtml"
			]
		},
		"text/jade": { extensions: ["jade"] },
		"text/javascript": {
			source: "iana",
			compressible: !0
		},
		"text/jcr-cnd": { source: "iana" },
		"text/jsx": {
			compressible: !0,
			extensions: ["jsx"]
		},
		"text/less": {
			compressible: !0,
			extensions: ["less"]
		},
		"text/markdown": {
			source: "iana",
			compressible: !0,
			extensions: ["markdown", "md"]
		},
		"text/mathml": {
			source: "nginx",
			extensions: ["mml"]
		},
		"text/mdx": {
			compressible: !0,
			extensions: ["mdx"]
		},
		"text/mizar": { source: "iana" },
		"text/n3": {
			source: "iana",
			charset: "UTF-8",
			compressible: !0,
			extensions: ["n3"]
		},
		"text/parameters": {
			source: "iana",
			charset: "UTF-8"
		},
		"text/parityfec": { source: "iana" },
		"text/plain": {
			source: "iana",
			compressible: !0,
			extensions: [
				"txt",
				"text",
				"conf",
				"def",
				"list",
				"log",
				"in",
				"ini"
			]
		},
		"text/provenance-notation": {
			source: "iana",
			charset: "UTF-8"
		},
		"text/prs.fallenstein.rst": { source: "iana" },
		"text/prs.lines.tag": {
			source: "iana",
			extensions: ["dsc"]
		},
		"text/prs.prop.logic": { source: "iana" },
		"text/raptorfec": { source: "iana" },
		"text/red": { source: "iana" },
		"text/rfc822-headers": { source: "iana" },
		"text/richtext": {
			source: "iana",
			compressible: !0,
			extensions: ["rtx"]
		},
		"text/rtf": {
			source: "iana",
			compressible: !0,
			extensions: ["rtf"]
		},
		"text/rtp-enc-aescm128": { source: "iana" },
		"text/rtploopback": { source: "iana" },
		"text/rtx": { source: "iana" },
		"text/sgml": {
			source: "iana",
			extensions: ["sgml", "sgm"]
		},
		"text/shaclc": { source: "iana" },
		"text/shex": {
			source: "iana",
			extensions: ["shex"]
		},
		"text/slim": { extensions: ["slim", "slm"] },
		"text/spdx": {
			source: "iana",
			extensions: ["spdx"]
		},
		"text/strings": { source: "iana" },
		"text/stylus": { extensions: ["stylus", "styl"] },
		"text/t140": { source: "iana" },
		"text/tab-separated-values": {
			source: "iana",
			compressible: !0,
			extensions: ["tsv"]
		},
		"text/troff": {
			source: "iana",
			extensions: [
				"t",
				"tr",
				"roff",
				"man",
				"me",
				"ms"
			]
		},
		"text/turtle": {
			source: "iana",
			charset: "UTF-8",
			extensions: ["ttl"]
		},
		"text/ulpfec": { source: "iana" },
		"text/uri-list": {
			source: "iana",
			compressible: !0,
			extensions: [
				"uri",
				"uris",
				"urls"
			]
		},
		"text/vcard": {
			source: "iana",
			compressible: !0,
			extensions: ["vcard"]
		},
		"text/vnd.a": { source: "iana" },
		"text/vnd.abc": { source: "iana" },
		"text/vnd.ascii-art": { source: "iana" },
		"text/vnd.curl": {
			source: "iana",
			extensions: ["curl"]
		},
		"text/vnd.curl.dcurl": {
			source: "apache",
			extensions: ["dcurl"]
		},
		"text/vnd.curl.mcurl": {
			source: "apache",
			extensions: ["mcurl"]
		},
		"text/vnd.curl.scurl": {
			source: "apache",
			extensions: ["scurl"]
		},
		"text/vnd.debian.copyright": {
			source: "iana",
			charset: "UTF-8"
		},
		"text/vnd.dmclientscript": { source: "iana" },
		"text/vnd.dvb.subtitle": {
			source: "iana",
			extensions: ["sub"]
		},
		"text/vnd.esmertec.theme-descriptor": {
			source: "iana",
			charset: "UTF-8"
		},
		"text/vnd.familysearch.gedcom": {
			source: "iana",
			extensions: ["ged"]
		},
		"text/vnd.ficlab.flt": { source: "iana" },
		"text/vnd.fly": {
			source: "iana",
			extensions: ["fly"]
		},
		"text/vnd.fmi.flexstor": {
			source: "iana",
			extensions: ["flx"]
		},
		"text/vnd.gml": { source: "iana" },
		"text/vnd.graphviz": {
			source: "iana",
			extensions: ["gv"]
		},
		"text/vnd.hans": { source: "iana" },
		"text/vnd.hgl": { source: "iana" },
		"text/vnd.in3d.3dml": {
			source: "iana",
			extensions: ["3dml"]
		},
		"text/vnd.in3d.spot": {
			source: "iana",
			extensions: ["spot"]
		},
		"text/vnd.iptc.newsml": { source: "iana" },
		"text/vnd.iptc.nitf": { source: "iana" },
		"text/vnd.latex-z": { source: "iana" },
		"text/vnd.motorola.reflex": { source: "iana" },
		"text/vnd.ms-mediapackage": { source: "iana" },
		"text/vnd.net2phone.commcenter.command": { source: "iana" },
		"text/vnd.radisys.msml-basic-layout": { source: "iana" },
		"text/vnd.senx.warpscript": { source: "iana" },
		"text/vnd.si.uricatalogue": { source: "iana" },
		"text/vnd.sosi": { source: "iana" },
		"text/vnd.sun.j2me.app-descriptor": {
			source: "iana",
			charset: "UTF-8",
			extensions: ["jad"]
		},
		"text/vnd.trolltech.linguist": {
			source: "iana",
			charset: "UTF-8"
		},
		"text/vnd.wap.si": { source: "iana" },
		"text/vnd.wap.sl": { source: "iana" },
		"text/vnd.wap.wml": {
			source: "iana",
			extensions: ["wml"]
		},
		"text/vnd.wap.wmlscript": {
			source: "iana",
			extensions: ["wmls"]
		},
		"text/vtt": {
			source: "iana",
			charset: "UTF-8",
			compressible: !0,
			extensions: ["vtt"]
		},
		"text/x-asm": {
			source: "apache",
			extensions: ["s", "asm"]
		},
		"text/x-c": {
			source: "apache",
			extensions: [
				"c",
				"cc",
				"cxx",
				"cpp",
				"h",
				"hh",
				"dic"
			]
		},
		"text/x-component": {
			source: "nginx",
			extensions: ["htc"]
		},
		"text/x-fortran": {
			source: "apache",
			extensions: [
				"f",
				"for",
				"f77",
				"f90"
			]
		},
		"text/x-gwt-rpc": { compressible: !0 },
		"text/x-handlebars-template": { extensions: ["hbs"] },
		"text/x-java-source": {
			source: "apache",
			extensions: ["java"]
		},
		"text/x-jquery-tmpl": { compressible: !0 },
		"text/x-lua": { extensions: ["lua"] },
		"text/x-markdown": {
			compressible: !0,
			extensions: ["mkd"]
		},
		"text/x-nfo": {
			source: "apache",
			extensions: ["nfo"]
		},
		"text/x-opml": {
			source: "apache",
			extensions: ["opml"]
		},
		"text/x-org": {
			compressible: !0,
			extensions: ["org"]
		},
		"text/x-pascal": {
			source: "apache",
			extensions: ["p", "pas"]
		},
		"text/x-processing": {
			compressible: !0,
			extensions: ["pde"]
		},
		"text/x-sass": { extensions: ["sass"] },
		"text/x-scss": { extensions: ["scss"] },
		"text/x-setext": {
			source: "apache",
			extensions: ["etx"]
		},
		"text/x-sfv": {
			source: "apache",
			extensions: ["sfv"]
		},
		"text/x-suse-ymp": {
			compressible: !0,
			extensions: ["ymp"]
		},
		"text/x-uuencode": {
			source: "apache",
			extensions: ["uu"]
		},
		"text/x-vcalendar": {
			source: "apache",
			extensions: ["vcs"]
		},
		"text/x-vcard": {
			source: "apache",
			extensions: ["vcf"]
		},
		"text/xml": {
			source: "iana",
			compressible: !0,
			extensions: ["xml"]
		},
		"text/xml-external-parsed-entity": { source: "iana" },
		"text/yaml": {
			compressible: !0,
			extensions: ["yaml", "yml"]
		},
		"video/1d-interleaved-parityfec": { source: "iana" },
		"video/3gpp": {
			source: "iana",
			extensions: ["3gp", "3gpp"]
		},
		"video/3gpp-tt": { source: "iana" },
		"video/3gpp2": {
			source: "iana",
			extensions: ["3g2"]
		},
		"video/av1": { source: "iana" },
		"video/bmpeg": { source: "iana" },
		"video/bt656": { source: "iana" },
		"video/celb": { source: "iana" },
		"video/dv": { source: "iana" },
		"video/encaprtp": { source: "iana" },
		"video/ffv1": { source: "iana" },
		"video/flexfec": { source: "iana" },
		"video/h261": {
			source: "iana",
			extensions: ["h261"]
		},
		"video/h263": {
			source: "iana",
			extensions: ["h263"]
		},
		"video/h263-1998": { source: "iana" },
		"video/h263-2000": { source: "iana" },
		"video/h264": {
			source: "iana",
			extensions: ["h264"]
		},
		"video/h264-rcdo": { source: "iana" },
		"video/h264-svc": { source: "iana" },
		"video/h265": { source: "iana" },
		"video/iso.segment": {
			source: "iana",
			extensions: ["m4s"]
		},
		"video/jpeg": {
			source: "iana",
			extensions: ["jpgv"]
		},
		"video/jpeg2000": { source: "iana" },
		"video/jpm": {
			source: "apache",
			extensions: ["jpm", "jpgm"]
		},
		"video/jxsv": { source: "iana" },
		"video/mj2": {
			source: "iana",
			extensions: ["mj2", "mjp2"]
		},
		"video/mp1s": { source: "iana" },
		"video/mp2p": { source: "iana" },
		"video/mp2t": {
			source: "iana",
			extensions: ["ts"]
		},
		"video/mp4": {
			source: "iana",
			compressible: !1,
			extensions: [
				"mp4",
				"mp4v",
				"mpg4"
			]
		},
		"video/mp4v-es": { source: "iana" },
		"video/mpeg": {
			source: "iana",
			compressible: !1,
			extensions: [
				"mpeg",
				"mpg",
				"mpe",
				"m1v",
				"m2v"
			]
		},
		"video/mpeg4-generic": { source: "iana" },
		"video/mpv": { source: "iana" },
		"video/nv": { source: "iana" },
		"video/ogg": {
			source: "iana",
			compressible: !1,
			extensions: ["ogv"]
		},
		"video/parityfec": { source: "iana" },
		"video/pointer": { source: "iana" },
		"video/quicktime": {
			source: "iana",
			compressible: !1,
			extensions: ["qt", "mov"]
		},
		"video/raptorfec": { source: "iana" },
		"video/raw": { source: "iana" },
		"video/rtp-enc-aescm128": { source: "iana" },
		"video/rtploopback": { source: "iana" },
		"video/rtx": { source: "iana" },
		"video/scip": { source: "iana" },
		"video/smpte291": { source: "iana" },
		"video/smpte292m": { source: "iana" },
		"video/ulpfec": { source: "iana" },
		"video/vc1": { source: "iana" },
		"video/vc2": { source: "iana" },
		"video/vnd.cctv": { source: "iana" },
		"video/vnd.dece.hd": {
			source: "iana",
			extensions: ["uvh", "uvvh"]
		},
		"video/vnd.dece.mobile": {
			source: "iana",
			extensions: ["uvm", "uvvm"]
		},
		"video/vnd.dece.mp4": { source: "iana" },
		"video/vnd.dece.pd": {
			source: "iana",
			extensions: ["uvp", "uvvp"]
		},
		"video/vnd.dece.sd": {
			source: "iana",
			extensions: ["uvs", "uvvs"]
		},
		"video/vnd.dece.video": {
			source: "iana",
			extensions: ["uvv", "uvvv"]
		},
		"video/vnd.directv.mpeg": { source: "iana" },
		"video/vnd.directv.mpeg-tts": { source: "iana" },
		"video/vnd.dlna.mpeg-tts": { source: "iana" },
		"video/vnd.dvb.file": {
			source: "iana",
			extensions: ["dvb"]
		},
		"video/vnd.fvt": {
			source: "iana",
			extensions: ["fvt"]
		},
		"video/vnd.hns.video": { source: "iana" },
		"video/vnd.iptvforum.1dparityfec-1010": { source: "iana" },
		"video/vnd.iptvforum.1dparityfec-2005": { source: "iana" },
		"video/vnd.iptvforum.2dparityfec-1010": { source: "iana" },
		"video/vnd.iptvforum.2dparityfec-2005": { source: "iana" },
		"video/vnd.iptvforum.ttsavc": { source: "iana" },
		"video/vnd.iptvforum.ttsmpeg2": { source: "iana" },
		"video/vnd.motorola.video": { source: "iana" },
		"video/vnd.motorola.videop": { source: "iana" },
		"video/vnd.mpegurl": {
			source: "iana",
			extensions: ["mxu", "m4u"]
		},
		"video/vnd.ms-playready.media.pyv": {
			source: "iana",
			extensions: ["pyv"]
		},
		"video/vnd.nokia.interleaved-multimedia": { source: "iana" },
		"video/vnd.nokia.mp4vr": { source: "iana" },
		"video/vnd.nokia.videovoip": { source: "iana" },
		"video/vnd.objectvideo": { source: "iana" },
		"video/vnd.radgamettools.bink": { source: "iana" },
		"video/vnd.radgamettools.smacker": { source: "iana" },
		"video/vnd.sealed.mpeg1": { source: "iana" },
		"video/vnd.sealed.mpeg4": { source: "iana" },
		"video/vnd.sealed.swf": { source: "iana" },
		"video/vnd.sealedmedia.softseal.mov": { source: "iana" },
		"video/vnd.uvvu.mp4": {
			source: "iana",
			extensions: ["uvu", "uvvu"]
		},
		"video/vnd.vivo": {
			source: "iana",
			extensions: ["viv"]
		},
		"video/vnd.youtube.yt": { source: "iana" },
		"video/vp8": { source: "iana" },
		"video/vp9": { source: "iana" },
		"video/webm": {
			source: "apache",
			compressible: !1,
			extensions: ["webm"]
		},
		"video/x-f4v": {
			source: "apache",
			extensions: ["f4v"]
		},
		"video/x-fli": {
			source: "apache",
			extensions: ["fli"]
		},
		"video/x-flv": {
			source: "apache",
			compressible: !1,
			extensions: ["flv"]
		},
		"video/x-m4v": {
			source: "apache",
			extensions: ["m4v"]
		},
		"video/x-matroska": {
			source: "apache",
			compressible: !1,
			extensions: [
				"mkv",
				"mk3d",
				"mks"
			]
		},
		"video/x-mng": {
			source: "apache",
			extensions: ["mng"]
		},
		"video/x-ms-asf": {
			source: "apache",
			extensions: ["asf", "asx"]
		},
		"video/x-ms-vob": {
			source: "apache",
			extensions: ["vob"]
		},
		"video/x-ms-wm": {
			source: "apache",
			extensions: ["wm"]
		},
		"video/x-ms-wmv": {
			source: "apache",
			compressible: !1,
			extensions: ["wmv"]
		},
		"video/x-ms-wmx": {
			source: "apache",
			extensions: ["wmx"]
		},
		"video/x-ms-wvx": {
			source: "apache",
			extensions: ["wvx"]
		},
		"video/x-msvideo": {
			source: "apache",
			extensions: ["avi"]
		},
		"video/x-sgi-movie": {
			source: "apache",
			extensions: ["movie"]
		},
		"video/x-smv": {
			source: "apache",
			extensions: ["smv"]
		},
		"x-conference/x-cooltalk": {
			source: "apache",
			extensions: ["ice"]
		},
		"x-shader/x-fragment": { compressible: !0 },
		"x-shader/x-vertex": { compressible: !0 }
	};
})), Vt = /* @__PURE__ */ D(((e, t) => {
	t.exports = (Bt(), j(Rt).default);
})), Ht = /* @__PURE__ */ D(((e) => {
	var t = Vt(), n = M("path").extname, r = /^\s*([^;\s]*)(?:;|\s|$)/, i = /^text\//i;
	e.charset = a, e.charsets = { lookup: a }, e.contentType = o, e.extension = s, e.extensions = Object.create(null), e.lookup = c, e.types = Object.create(null), l(e.extensions, e.types);
	function a(e) {
		if (!e || typeof e != "string") return !1;
		var n = r.exec(e), a = n && t[n[1].toLowerCase()];
		return a && a.charset ? a.charset : n && i.test(n[1]) ? "UTF-8" : !1;
	}
	function o(t) {
		if (!t || typeof t != "string") return !1;
		var n = t.indexOf("/") === -1 ? e.lookup(t) : t;
		if (!n) return !1;
		if (n.indexOf("charset") === -1) {
			var r = e.charset(n);
			r && (n += "; charset=" + r.toLowerCase());
		}
		return n;
	}
	function s(t) {
		if (!t || typeof t != "string") return !1;
		var n = r.exec(t), i = n && e.extensions[n[1].toLowerCase()];
		return !i || !i.length ? !1 : i[0];
	}
	function c(t) {
		if (!t || typeof t != "string") return !1;
		var r = n("x." + t).toLowerCase().substr(1);
		return r && e.types[r] || !1;
	}
	function l(e, n) {
		var r = [
			"nginx",
			"apache",
			void 0,
			"iana"
		];
		Object.keys(t).forEach(function(i) {
			var a = t[i], o = a.extensions;
			if (o && o.length) {
				e[i] = o;
				for (var s = 0; s < o.length; s++) {
					var c = o[s];
					if (n[c]) {
						var l = r.indexOf(t[n[c]].source), u = r.indexOf(a.source);
						if (n[c] !== "application/octet-stream" && (l > u || l === u && n[c].substr(0, 12) === "application/")) continue;
					}
					n[c] = i;
				}
			}
		});
	}
})), Ut = /* @__PURE__ */ D(((e, t) => {
	t.exports = n;
	function n(e) {
		var t = typeof setImmediate == "function" ? setImmediate : typeof process == "object" && typeof process.nextTick == "function" ? process.nextTick : null;
		t ? t(e) : setTimeout(e, 0);
	}
})), Wt = /* @__PURE__ */ D(((e, t) => {
	var n = Ut();
	t.exports = r;
	function r(e) {
		var t = !1;
		return n(function() {
			t = !0;
		}), function(r, i) {
			t ? e(r, i) : n(function() {
				e(r, i);
			});
		};
	}
})), Gt = /* @__PURE__ */ D(((e, t) => {
	t.exports = n;
	function n(e) {
		Object.keys(e.jobs).forEach(r.bind(e)), e.jobs = {};
	}
	function r(e) {
		typeof this.jobs[e] == "function" && this.jobs[e]();
	}
})), Kt = /* @__PURE__ */ D(((e, t) => {
	var n = Wt(), r = Gt();
	t.exports = i;
	function i(e, t, n, i) {
		var o = n.keyedList ? n.keyedList[n.index] : n.index;
		n.jobs[o] = a(t, o, e[o], function(e, t) {
			o in n.jobs && (delete n.jobs[o], e ? r(n) : n.results[o] = t, i(e, n.results));
		});
	}
	function a(e, t, r, i) {
		return e.length == 2 ? e(r, n(i)) : e(r, t, n(i));
	}
})), qt = /* @__PURE__ */ D(((e, t) => {
	t.exports = n;
	function n(e, t) {
		var n = !Array.isArray(e), r = {
			index: 0,
			keyedList: n || t ? Object.keys(e) : null,
			jobs: {},
			results: n ? {} : [],
			size: n ? Object.keys(e).length : e.length
		};
		return t && r.keyedList.sort(n ? t : function(n, r) {
			return t(e[n], e[r]);
		}), r;
	}
})), Jt = /* @__PURE__ */ D(((e, t) => {
	var n = Gt(), r = Wt();
	t.exports = i;
	function i(e) {
		Object.keys(this.jobs).length && (this.index = this.size, n(this), r(e)(null, this.results));
	}
})), Yt = /* @__PURE__ */ D(((e, t) => {
	var n = Kt(), r = qt(), i = Jt();
	t.exports = a;
	function a(e, t, a) {
		for (var o = r(e); o.index < (o.keyedList || e).length;) n(e, t, o, function(e, t) {
			if (e) {
				a(e, t);
				return;
			}
			if (Object.keys(o.jobs).length === 0) {
				a(null, o.results);
				return;
			}
		}), o.index++;
		return i.bind(o, a);
	}
})), Xt = /* @__PURE__ */ D(((e, t) => {
	var n = Kt(), r = qt(), i = Jt();
	t.exports = a, t.exports.ascending = o, t.exports.descending = s;
	function a(e, t, a, o) {
		var s = r(e, a);
		return n(e, t, s, function r(i, a) {
			if (i) {
				o(i, a);
				return;
			}
			if (s.index++, s.index < (s.keyedList || e).length) {
				n(e, t, s, r);
				return;
			}
			o(null, s.results);
		}), i.bind(s, o);
	}
	function o(e, t) {
		return e < t ? -1 : +(e > t);
	}
	function s(e, t) {
		return -1 * o(e, t);
	}
})), Zt = /* @__PURE__ */ D(((e, t) => {
	var n = Xt();
	t.exports = r;
	function r(e, t, r) {
		return n(e, t, null, r);
	}
})), Qt = /* @__PURE__ */ D(((e, t) => {
	t.exports = {
		parallel: Yt(),
		serial: Zt(),
		serialOrdered: Xt()
	};
})), $t = /* @__PURE__ */ D(((e, t) => {
	t.exports = Object;
})), en = /* @__PURE__ */ D(((e, t) => {
	t.exports = Error;
})), tn = /* @__PURE__ */ D(((e, t) => {
	t.exports = EvalError;
})), nn = /* @__PURE__ */ D(((e, t) => {
	t.exports = RangeError;
})), rn = /* @__PURE__ */ D(((e, t) => {
	t.exports = ReferenceError;
})), an = /* @__PURE__ */ D(((e, t) => {
	t.exports = SyntaxError;
})), on = /* @__PURE__ */ D(((e, t) => {
	t.exports = TypeError;
})), sn = /* @__PURE__ */ D(((e, t) => {
	t.exports = URIError;
})), cn = /* @__PURE__ */ D(((e, t) => {
	t.exports = Math.abs;
})), ln = /* @__PURE__ */ D(((e, t) => {
	t.exports = Math.floor;
})), un = /* @__PURE__ */ D(((e, t) => {
	t.exports = Math.max;
})), dn = /* @__PURE__ */ D(((e, t) => {
	t.exports = Math.min;
})), fn = /* @__PURE__ */ D(((e, t) => {
	t.exports = Math.pow;
})), pn = /* @__PURE__ */ D(((e, t) => {
	t.exports = Math.round;
})), mn = /* @__PURE__ */ D(((e, t) => {
	t.exports = Number.isNaN || function(e) {
		return e !== e;
	};
})), hn = /* @__PURE__ */ D(((e, t) => {
	var n = mn();
	t.exports = function(e) {
		return n(e) || e === 0 ? e : e < 0 ? -1 : 1;
	};
})), gn = /* @__PURE__ */ D(((e, t) => {
	t.exports = Object.getOwnPropertyDescriptor;
})), _n = /* @__PURE__ */ D(((e, t) => {
	var n = gn();
	if (n) try {
		n([], "length");
	} catch {
		n = null;
	}
	t.exports = n;
})), vn = /* @__PURE__ */ D(((e, t) => {
	var n = Object.defineProperty || !1;
	if (n) try {
		n({}, "a", { value: 1 });
	} catch {
		n = !1;
	}
	t.exports = n;
})), yn = /* @__PURE__ */ D(((e, t) => {
	t.exports = function() {
		if (typeof Symbol != "function" || typeof Object.getOwnPropertySymbols != "function") return !1;
		if (typeof Symbol.iterator == "symbol") return !0;
		var e = {}, t = Symbol("test"), n = Object(t);
		if (typeof t == "string" || Object.prototype.toString.call(t) !== "[object Symbol]" || Object.prototype.toString.call(n) !== "[object Symbol]") return !1;
		var r = 42;
		for (var i in e[t] = r, e) return !1;
		if (typeof Object.keys == "function" && Object.keys(e).length !== 0 || typeof Object.getOwnPropertyNames == "function" && Object.getOwnPropertyNames(e).length !== 0) return !1;
		var a = Object.getOwnPropertySymbols(e);
		if (a.length !== 1 || a[0] !== t || !Object.prototype.propertyIsEnumerable.call(e, t)) return !1;
		if (typeof Object.getOwnPropertyDescriptor == "function") {
			var o = Object.getOwnPropertyDescriptor(e, t);
			if (o.value !== r || o.enumerable !== !0) return !1;
		}
		return !0;
	};
})), bn = /* @__PURE__ */ D(((e, t) => {
	var n = typeof Symbol < "u" && Symbol, r = yn();
	t.exports = function() {
		return typeof n != "function" || typeof Symbol != "function" || typeof n("foo") != "symbol" || typeof Symbol("bar") != "symbol" ? !1 : r();
	};
})), xn = /* @__PURE__ */ D(((e, t) => {
	t.exports = typeof Reflect < "u" && Reflect.getPrototypeOf || null;
})), Sn = /* @__PURE__ */ D(((e, t) => {
	t.exports = $t().getPrototypeOf || null;
})), Cn = /* @__PURE__ */ D(((e, t) => {
	var n = Object.prototype.toString, r = Math.max, i = "[object Function]", a = function(e, t) {
		for (var n = [], r = 0; r < e.length; r += 1) n[r] = e[r];
		for (var i = 0; i < t.length; i += 1) n[i + e.length] = t[i];
		return n;
	}, o = function(e, t) {
		for (var n = [], r = t || 0, i = 0; r < e.length; r += 1, i += 1) n[i] = e[r];
		return n;
	}, s = function(e, t) {
		for (var n = "", r = 0; r < e.length; r += 1) n += e[r], r + 1 < e.length && (n += t);
		return n;
	};
	t.exports = function(e) {
		var t = this;
		if (typeof t != "function" || n.apply(t) !== i) throw TypeError("Function.prototype.bind called on incompatible " + t);
		for (var c = o(arguments, 1), l, u = function() {
			if (this instanceof l) {
				var n = t.apply(this, a(c, arguments));
				return Object(n) === n ? n : this;
			}
			return t.apply(e, a(c, arguments));
		}, d = r(0, t.length - c.length), f = [], p = 0; p < d; p++) f[p] = "$" + p;
		if (l = Function("binder", "return function (" + s(f, ",") + "){ return binder.apply(this,arguments); }")(u), t.prototype) {
			var m = function() {};
			m.prototype = t.prototype, l.prototype = new m(), m.prototype = null;
		}
		return l;
	};
})), wn = /* @__PURE__ */ D(((e, t) => {
	var n = Cn();
	t.exports = Function.prototype.bind || n;
})), Tn = /* @__PURE__ */ D(((e, t) => {
	t.exports = Function.prototype.call;
})), En = /* @__PURE__ */ D(((e, t) => {
	t.exports = Function.prototype.apply;
})), Dn = /* @__PURE__ */ D(((e, t) => {
	t.exports = typeof Reflect < "u" && Reflect && Reflect.apply;
})), On = /* @__PURE__ */ D(((e, t) => {
	var n = wn(), r = En(), i = Tn();
	t.exports = Dn() || n.call(i, r);
})), kn = /* @__PURE__ */ D(((e, t) => {
	var n = wn(), r = on(), i = Tn(), a = On();
	t.exports = function(e) {
		if (e.length < 1 || typeof e[0] != "function") throw new r("a function is required");
		return a(n, i, e);
	};
})), An = /* @__PURE__ */ D(((e, t) => {
	var n = kn(), r = _n(), i;
	try {
		i = [].__proto__ === Array.prototype;
	} catch (e) {
		if (!e || typeof e != "object" || !("code" in e) || e.code !== "ERR_PROTO_ACCESS") throw e;
	}
	var a = !!i && r && r(Object.prototype, "__proto__"), o = Object, s = o.getPrototypeOf;
	t.exports = a && typeof a.get == "function" ? n([a.get]) : typeof s == "function" && function(e) {
		return s(e == null ? e : o(e));
	};
})), jn = /* @__PURE__ */ D(((e, t) => {
	var n = xn(), r = Sn(), i = An();
	t.exports = n ? function(e) {
		return n(e);
	} : r ? function(e) {
		if (!e || typeof e != "object" && typeof e != "function") throw TypeError("getProto: not an object");
		return r(e);
	} : i ? function(e) {
		return i(e);
	} : null;
})), Mn = /* @__PURE__ */ D(((e, t) => {
	var n = Function.prototype.call, r = Object.prototype.hasOwnProperty;
	t.exports = wn().call(n, r);
})), Nn = /* @__PURE__ */ D(((e, t) => {
	var n, r = $t(), i = en(), a = tn(), o = nn(), s = rn(), c = an(), l = on(), u = sn(), d = cn(), f = ln(), p = un(), m = dn(), h = fn(), g = pn(), _ = hn(), ee = Function, v = function(e) {
		try {
			return ee("\"use strict\"; return (" + e + ").constructor;")();
		} catch {}
	}, y = _n(), b = vn(), x = function() {
		throw new l();
	}, S = y ? function() {
		try {
			return arguments.callee, x;
		} catch {
			try {
				return y(arguments, "callee").get;
			} catch {
				return x;
			}
		}
	}() : x, C = bn()(), w = jn(), te = Sn(), T = xn(), E = En(), D = Tn(), O = {}, k = typeof Uint8Array > "u" || !w ? n : w(Uint8Array), A = {
		__proto__: null,
		"%AggregateError%": typeof AggregateError > "u" ? n : AggregateError,
		"%Array%": Array,
		"%ArrayBuffer%": typeof ArrayBuffer > "u" ? n : ArrayBuffer,
		"%ArrayIteratorPrototype%": C && w ? w([][Symbol.iterator]()) : n,
		"%AsyncFromSyncIteratorPrototype%": n,
		"%AsyncFunction%": O,
		"%AsyncGenerator%": O,
		"%AsyncGeneratorFunction%": O,
		"%AsyncIteratorPrototype%": O,
		"%Atomics%": typeof Atomics > "u" ? n : Atomics,
		"%BigInt%": typeof BigInt > "u" ? n : BigInt,
		"%BigInt64Array%": typeof BigInt64Array > "u" ? n : BigInt64Array,
		"%BigUint64Array%": typeof BigUint64Array > "u" ? n : BigUint64Array,
		"%Boolean%": Boolean,
		"%DataView%": typeof DataView > "u" ? n : DataView,
		"%Date%": Date,
		"%decodeURI%": decodeURI,
		"%decodeURIComponent%": decodeURIComponent,
		"%encodeURI%": encodeURI,
		"%encodeURIComponent%": encodeURIComponent,
		"%Error%": i,
		"%eval%": eval,
		"%EvalError%": a,
		"%Float16Array%": typeof Float16Array > "u" ? n : Float16Array,
		"%Float32Array%": typeof Float32Array > "u" ? n : Float32Array,
		"%Float64Array%": typeof Float64Array > "u" ? n : Float64Array,
		"%FinalizationRegistry%": typeof FinalizationRegistry > "u" ? n : FinalizationRegistry,
		"%Function%": ee,
		"%GeneratorFunction%": O,
		"%Int8Array%": typeof Int8Array > "u" ? n : Int8Array,
		"%Int16Array%": typeof Int16Array > "u" ? n : Int16Array,
		"%Int32Array%": typeof Int32Array > "u" ? n : Int32Array,
		"%isFinite%": isFinite,
		"%isNaN%": isNaN,
		"%IteratorPrototype%": C && w ? w(w([][Symbol.iterator]())) : n,
		"%JSON%": typeof JSON == "object" ? JSON : n,
		"%Map%": typeof Map > "u" ? n : Map,
		"%MapIteratorPrototype%": typeof Map > "u" || !C || !w ? n : w((/* @__PURE__ */ new Map())[Symbol.iterator]()),
		"%Math%": Math,
		"%Number%": Number,
		"%Object%": r,
		"%Object.getOwnPropertyDescriptor%": y,
		"%parseFloat%": parseFloat,
		"%parseInt%": parseInt,
		"%Promise%": typeof Promise > "u" ? n : Promise,
		"%Proxy%": typeof Proxy > "u" ? n : Proxy,
		"%RangeError%": o,
		"%ReferenceError%": s,
		"%Reflect%": typeof Reflect > "u" ? n : Reflect,
		"%RegExp%": RegExp,
		"%Set%": typeof Set > "u" ? n : Set,
		"%SetIteratorPrototype%": typeof Set > "u" || !C || !w ? n : w((/* @__PURE__ */ new Set())[Symbol.iterator]()),
		"%SharedArrayBuffer%": typeof SharedArrayBuffer > "u" ? n : SharedArrayBuffer,
		"%String%": String,
		"%StringIteratorPrototype%": C && w ? w(""[Symbol.iterator]()) : n,
		"%Symbol%": C ? Symbol : n,
		"%SyntaxError%": c,
		"%ThrowTypeError%": S,
		"%TypedArray%": k,
		"%TypeError%": l,
		"%Uint8Array%": typeof Uint8Array > "u" ? n : Uint8Array,
		"%Uint8ClampedArray%": typeof Uint8ClampedArray > "u" ? n : Uint8ClampedArray,
		"%Uint16Array%": typeof Uint16Array > "u" ? n : Uint16Array,
		"%Uint32Array%": typeof Uint32Array > "u" ? n : Uint32Array,
		"%URIError%": u,
		"%WeakMap%": typeof WeakMap > "u" ? n : WeakMap,
		"%WeakRef%": typeof WeakRef > "u" ? n : WeakRef,
		"%WeakSet%": typeof WeakSet > "u" ? n : WeakSet,
		"%Function.prototype.call%": D,
		"%Function.prototype.apply%": E,
		"%Object.defineProperty%": b,
		"%Object.getPrototypeOf%": te,
		"%Math.abs%": d,
		"%Math.floor%": f,
		"%Math.max%": p,
		"%Math.min%": m,
		"%Math.pow%": h,
		"%Math.round%": g,
		"%Math.sign%": _,
		"%Reflect.getPrototypeOf%": T
	};
	if (w) try {
		null.error;
	} catch (e) {
		A["%Error.prototype%"] = w(w(e));
	}
	var j = function e(t) {
		var n;
		if (t === "%AsyncFunction%") n = v("async function () {}");
		else if (t === "%GeneratorFunction%") n = v("function* () {}");
		else if (t === "%AsyncGeneratorFunction%") n = v("async function* () {}");
		else if (t === "%AsyncGenerator%") {
			var r = e("%AsyncGeneratorFunction%");
			r && (n = r.prototype);
		} else if (t === "%AsyncIteratorPrototype%") {
			var i = e("%AsyncGenerator%");
			i && w && (n = w(i.prototype));
		}
		return A[t] = n, n;
	}, M = {
		__proto__: null,
		"%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
		"%ArrayPrototype%": ["Array", "prototype"],
		"%ArrayProto_entries%": [
			"Array",
			"prototype",
			"entries"
		],
		"%ArrayProto_forEach%": [
			"Array",
			"prototype",
			"forEach"
		],
		"%ArrayProto_keys%": [
			"Array",
			"prototype",
			"keys"
		],
		"%ArrayProto_values%": [
			"Array",
			"prototype",
			"values"
		],
		"%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
		"%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
		"%AsyncGeneratorPrototype%": [
			"AsyncGeneratorFunction",
			"prototype",
			"prototype"
		],
		"%BooleanPrototype%": ["Boolean", "prototype"],
		"%DataViewPrototype%": ["DataView", "prototype"],
		"%DatePrototype%": ["Date", "prototype"],
		"%ErrorPrototype%": ["Error", "prototype"],
		"%EvalErrorPrototype%": ["EvalError", "prototype"],
		"%Float32ArrayPrototype%": ["Float32Array", "prototype"],
		"%Float64ArrayPrototype%": ["Float64Array", "prototype"],
		"%FunctionPrototype%": ["Function", "prototype"],
		"%Generator%": ["GeneratorFunction", "prototype"],
		"%GeneratorPrototype%": [
			"GeneratorFunction",
			"prototype",
			"prototype"
		],
		"%Int8ArrayPrototype%": ["Int8Array", "prototype"],
		"%Int16ArrayPrototype%": ["Int16Array", "prototype"],
		"%Int32ArrayPrototype%": ["Int32Array", "prototype"],
		"%JSONParse%": ["JSON", "parse"],
		"%JSONStringify%": ["JSON", "stringify"],
		"%MapPrototype%": ["Map", "prototype"],
		"%NumberPrototype%": ["Number", "prototype"],
		"%ObjectPrototype%": ["Object", "prototype"],
		"%ObjProto_toString%": [
			"Object",
			"prototype",
			"toString"
		],
		"%ObjProto_valueOf%": [
			"Object",
			"prototype",
			"valueOf"
		],
		"%PromisePrototype%": ["Promise", "prototype"],
		"%PromiseProto_then%": [
			"Promise",
			"prototype",
			"then"
		],
		"%Promise_all%": ["Promise", "all"],
		"%Promise_reject%": ["Promise", "reject"],
		"%Promise_resolve%": ["Promise", "resolve"],
		"%RangeErrorPrototype%": ["RangeError", "prototype"],
		"%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
		"%RegExpPrototype%": ["RegExp", "prototype"],
		"%SetPrototype%": ["Set", "prototype"],
		"%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
		"%StringPrototype%": ["String", "prototype"],
		"%SymbolPrototype%": ["Symbol", "prototype"],
		"%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
		"%TypedArrayPrototype%": ["TypedArray", "prototype"],
		"%TypeErrorPrototype%": ["TypeError", "prototype"],
		"%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
		"%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
		"%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
		"%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
		"%URIErrorPrototype%": ["URIError", "prototype"],
		"%WeakMapPrototype%": ["WeakMap", "prototype"],
		"%WeakSetPrototype%": ["WeakSet", "prototype"]
	}, N = wn(), P = Mn(), F = N.call(D, Array.prototype.concat), I = N.call(E, Array.prototype.splice), L = N.call(D, String.prototype.replace), R = N.call(D, String.prototype.slice), ne = N.call(D, RegExp.prototype.exec), z = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, B = /\\(\\)?/g, V = function(e) {
		var t = R(e, 0, 1), n = R(e, -1);
		if (t === "%" && n !== "%") throw new c("invalid intrinsic syntax, expected closing `%`");
		if (n === "%" && t !== "%") throw new c("invalid intrinsic syntax, expected opening `%`");
		var r = [];
		return L(e, z, function(e, t, n, i) {
			r[r.length] = n ? L(i, B, "$1") : t || e;
		}), r;
	}, re = function(e, t) {
		var n = e, r;
		if (P(M, n) && (r = M[n], n = "%" + r[0] + "%"), P(A, n)) {
			var i = A[n];
			if (i === O && (i = j(n)), i === void 0 && !t) throw new l("intrinsic " + e + " exists, but is not available. Please file an issue!");
			return {
				alias: r,
				name: n,
				value: i
			};
		}
		throw new c("intrinsic " + e + " does not exist!");
	};
	t.exports = function(e, t) {
		if (typeof e != "string" || e.length === 0) throw new l("intrinsic name must be a non-empty string");
		if (arguments.length > 1 && typeof t != "boolean") throw new l("\"allowMissing\" argument must be a boolean");
		if (ne(/^%?[^%]*%?$/, e) === null) throw new c("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
		var n = V(e), r = n.length > 0 ? n[0] : "", i = re("%" + r + "%", t), a = i.name, o = i.value, s = !1, u = i.alias;
		u && (r = u[0], I(n, F([0, 1], u)));
		for (var d = 1, f = !0; d < n.length; d += 1) {
			var p = n[d], m = R(p, 0, 1), h = R(p, -1);
			if ((m === "\"" || m === "'" || m === "`" || h === "\"" || h === "'" || h === "`") && m !== h) throw new c("property names with quotes must have matching quotes");
			if ((p === "constructor" || !f) && (s = !0), r += "." + p, a = "%" + r + "%", P(A, a)) o = A[a];
			else if (o != null) {
				if (!(p in o)) {
					if (!t) throw new l("base intrinsic for " + e + " exists, but the property is not available.");
					return;
				}
				if (y && d + 1 >= n.length) {
					var g = y(o, p);
					f = !!g, o = f && "get" in g && !("originalValue" in g.get) ? g.get : o[p];
				} else f = P(o, p), o = o[p];
				f && !s && (A[a] = o);
			}
		}
		return o;
	};
})), Pn = /* @__PURE__ */ D(((e, t) => {
	var n = yn();
	t.exports = function() {
		return n() && !!Symbol.toStringTag;
	};
})), Fn = /* @__PURE__ */ D(((e, t) => {
	var n = Nn()("%Object.defineProperty%", !0), r = Pn()(), i = Mn(), a = on(), o = r ? Symbol.toStringTag : null;
	t.exports = function(e, t) {
		var r = arguments.length > 2 && !!arguments[2] && arguments[2].force, s = arguments.length > 2 && !!arguments[2] && arguments[2].nonConfigurable;
		if (r !== void 0 && typeof r != "boolean" || s !== void 0 && typeof s != "boolean") throw new a("if provided, the `overrideIfSet` and `nonConfigurable` options must be booleans");
		o && (r || !i(e, o)) && (n ? n(e, o, {
			configurable: !s,
			enumerable: !1,
			value: t,
			writable: !1
		}) : e[o] = t);
	};
})), In = /* @__PURE__ */ D(((e, t) => {
	t.exports = function(e, t) {
		return Object.keys(t).forEach(function(n) {
			e[n] = e[n] || t[n];
		}), e;
	};
})), Ln = (/* @__PURE__ */ A((/* @__PURE__ */ D(((e, t) => {
	var n = Lt(), r = M("util"), i = M("path"), a = M("http"), o = M("https"), s = M("url").parse, c = M("fs"), l = M("stream").Stream, u = M("crypto"), d = Ht(), f = Qt(), p = Fn(), m = Mn(), h = In();
	function g(e) {
		return String(e).replace(/\r/g, "%0D").replace(/\n/g, "%0A").replace(/"/g, "%22");
	}
	function _(e) {
		if (!(this instanceof _)) return new _(e);
		for (var t in this._overheadLength = 0, this._valueLength = 0, this._valuesToMeasure = [], n.call(this), e ||= {}, e) this[t] = e[t];
	}
	r.inherits(_, n), _.LINE_BREAK = "\r\n", _.DEFAULT_CONTENT_TYPE = "application/octet-stream", _.prototype.append = function(e, t, r) {
		r ||= {}, typeof r == "string" && (r = { filename: r });
		var i = n.prototype.append.bind(this);
		if ((typeof t == "number" || t == null) && (t = String(t)), Array.isArray(t)) {
			this._error(/* @__PURE__ */ Error("Arrays are not supported."));
			return;
		}
		var a = this._multiPartHeader(e, t, r), o = this._multiPartFooter();
		i(a), i(t), i(o), this._trackLength(a, t, r);
	}, _.prototype._trackLength = function(e, t, n) {
		var r = 0;
		n.knownLength == null ? Buffer.isBuffer(t) ? r = t.length : typeof t == "string" && (r = Buffer.byteLength(t)) : r += Number(n.knownLength), this._valueLength += r, this._overheadLength += Buffer.byteLength(e) + _.LINE_BREAK.length, t && (t.path || t.readable && m(t, "httpVersion") || t instanceof l) && (n.knownLength || this._valuesToMeasure.push(t));
	}, _.prototype._lengthRetriever = function(e, t) {
		m(e, "fd") ? e.end != null && e.end != Infinity && e.start != null ? t(null, e.end + 1 - (e.start ? e.start : 0)) : c.stat(e.path, function(n, r) {
			if (n) {
				t(n);
				return;
			}
			t(null, r.size - (e.start ? e.start : 0));
		}) : m(e, "httpVersion") ? t(null, Number(e.headers["content-length"])) : m(e, "httpModule") ? (e.on("response", function(n) {
			e.pause(), t(null, Number(n.headers["content-length"]));
		}), e.resume()) : t("Unknown stream");
	}, _.prototype._multiPartHeader = function(e, t, n) {
		if (typeof n.header == "string") return n.header;
		var r = this._getContentDisposition(t, n), i = this._getContentType(t, n), a = "", o = {
			"Content-Disposition": ["form-data", "name=\"" + g(e) + "\""].concat(r || []),
			"Content-Type": [].concat(i || [])
		};
		typeof n.header == "object" && h(o, n.header);
		var s;
		for (var c in o) if (m(o, c)) {
			if (s = o[c], s == null) continue;
			Array.isArray(s) || (s = [s]), s.length && (a += c + ": " + s.join("; ") + _.LINE_BREAK);
		}
		return "--" + this.getBoundary() + _.LINE_BREAK + a + _.LINE_BREAK;
	}, _.prototype._getContentDisposition = function(e, t) {
		var n;
		if (typeof t.filepath == "string" ? n = i.normalize(t.filepath).replace(/\\/g, "/") : t.filename || e && (e.name || e.path) ? n = i.basename(t.filename || e && (e.name || e.path)) : e && e.readable && m(e, "httpVersion") && (n = i.basename(e.client._httpMessage.path || "")), n) return "filename=\"" + g(n) + "\"";
	}, _.prototype._getContentType = function(e, t) {
		var n = t.contentType;
		return !n && e && e.name && (n = d.lookup(e.name)), !n && e && e.path && (n = d.lookup(e.path)), !n && e && e.readable && m(e, "httpVersion") && (n = e.headers["content-type"]), !n && (t.filepath || t.filename) && (n = d.lookup(t.filepath || t.filename)), !n && e && typeof e == "object" && (n = _.DEFAULT_CONTENT_TYPE), n;
	}, _.prototype._multiPartFooter = function() {
		return function(e) {
			var t = _.LINE_BREAK;
			this._streams.length === 0 && (t += this._lastBoundary()), e(t);
		}.bind(this);
	}, _.prototype._lastBoundary = function() {
		return "--" + this.getBoundary() + "--" + _.LINE_BREAK;
	}, _.prototype.getHeaders = function(e) {
		var t, n = { "content-type": "multipart/form-data; boundary=" + this.getBoundary() };
		for (t in e) m(e, t) && (n[t.toLowerCase()] = e[t]);
		return n;
	}, _.prototype.setBoundary = function(e) {
		if (typeof e != "string") throw TypeError("FormData boundary must be a string");
		this._boundary = e;
	}, _.prototype.getBoundary = function() {
		return this._boundary || this._generateBoundary(), this._boundary;
	}, _.prototype.getBuffer = function() {
		for (var e = new Buffer.alloc(0), t = this.getBoundary(), n = 0, r = this._streams.length; n < r; n++) typeof this._streams[n] != "function" && (e = Buffer.isBuffer(this._streams[n]) ? Buffer.concat([e, this._streams[n]]) : Buffer.concat([e, Buffer.from(this._streams[n])]), (typeof this._streams[n] != "string" || this._streams[n].substring(2, t.length + 2) !== t) && (e = Buffer.concat([e, Buffer.from(_.LINE_BREAK)])));
		return Buffer.concat([e, Buffer.from(this._lastBoundary())]);
	}, _.prototype._generateBoundary = function() {
		this._boundary = "--------------------------" + u.randomBytes(12).toString("hex");
	}, _.prototype.getLengthSync = function() {
		var e = this._overheadLength + this._valueLength;
		return this._streams.length && (e += this._lastBoundary().length), this.hasKnownLength() || this._error(/* @__PURE__ */ Error("Cannot calculate proper length in synchronous way.")), e;
	}, _.prototype.hasKnownLength = function() {
		var e = !0;
		return this._valuesToMeasure.length && (e = !1), e;
	}, _.prototype.getLength = function(e) {
		var t = this._overheadLength + this._valueLength;
		if (this._streams.length && (t += this._lastBoundary().length), !this._valuesToMeasure.length) {
			process.nextTick(e.bind(this, null, t));
			return;
		}
		f.parallel(this._valuesToMeasure, this._lengthRetriever, function(n, r) {
			if (n) {
				e(n);
				return;
			}
			r.forEach(function(e) {
				t += e;
			}), e(null, t);
		});
	}, _.prototype.submit = function(e, t) {
		var n, r, i = { method: "post" };
		return typeof e == "string" ? (e = s(e), r = h({
			port: e.port,
			path: e.pathname,
			host: e.hostname,
			protocol: e.protocol
		}, i)) : (r = h(e, i), r.port || (r.port = r.protocol === "https:" ? 443 : 80)), r.headers = this.getHeaders(e.headers), n = r.protocol === "https:" ? o.request(r) : a.request(r), this.getLength(function(e, r) {
			if (e && e !== "Unknown stream") {
				this._error(e);
				return;
			}
			if (r && n.setHeader("Content-Length", r), this.pipe(n), t) {
				var i, a = function(e, r) {
					return n.removeListener("error", a), n.removeListener("response", i), t.call(this, e, r);
				};
				i = a.bind(this, null), n.on("error", a), n.on("response", i);
			}
		}.bind(this)), n;
	}, _.prototype._error = function(e) {
		this.error || (this.error = e, this.pause(), this.emit("error", e));
	}, _.prototype.toString = function() {
		return "[object FormData]";
	}, p(_.prototype, "FormData"), t.exports = _;
})))(), 1)).default, Rn = {
	isBufferAvailable() {
		return typeof Buffer < "u";
	},
	from(e) {
		return Buffer.from(e);
	}
};
function zn(e) {
	return K.isPlainObject(e) || K.isArray(e);
}
function Bn(e) {
	return K.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function Vn(e, t, n) {
	return e ? e.concat(t).map(function(e, t) {
		return e = Bn(e), !n && t ? "[" + e + "]" : e;
	}).join(n ? "." : "") : t;
}
function Hn(e) {
	return K.isArray(e) && !e.some(zn);
}
var Un = K.toFlatObject(K, {}, null, function(e) {
	return /^is[A-Z]/.test(e);
});
function Wn(e, t, n) {
	if (!K.isObject(e)) throw TypeError("target must be an object");
	t ||= new (Ln || FormData)();
	let r = (e, t) => {
		let r = K.getSafeProp(n, e);
		return K.isUndefined(r) ? t : r;
	}, i = r("metaTokens", !0), a = r("visitor") || h, o = r("dots", !1), s = r("indexes", !1), c = r("Blob") || typeof Blob < "u" && Blob, l = r("maxDepth", 100), u = c && K.isSpecCompliantForm(t), d = [];
	if (!K.isFunction(a)) throw TypeError("visitor must be a function");
	function f(e) {
		if (e === null) return "";
		if (K.isDate(e)) return e.toISOString();
		if (K.isBoolean(e)) return e.toString();
		if (!u && K.isBlob(e)) throw new J("Blob is not supported. Use a Buffer instead.");
		if (K.isArrayBuffer(e) || K.isTypedArray(e)) {
			if (u && typeof c == "function") return new c([e]);
			if (Rn && Rn.isBufferAvailable()) return Rn.from(e);
			throw new J("Blob is not supported. Use a Buffer instead.", J.ERR_NOT_SUPPORT);
		}
		return e;
	}
	function p(e) {
		if (e > l) throw new J("Object is too deeply nested (" + e + " levels). Max depth: " + l, J.ERR_FORM_DATA_DEPTH_EXCEEDED);
	}
	function m(e, t) {
		if (l === Infinity) return JSON.stringify(e);
		let n = [];
		return JSON.stringify(e, function(e, r) {
			if (!K.isObject(r)) return r;
			for (; n.length && n[n.length - 1] !== this;) n.pop();
			return n.push(r), p(t + n.length - 1), r;
		});
	}
	function h(e, n, r) {
		let a = e;
		if (K.isReactNative(t) && K.isReactNativeBlob(e)) return t.append(Vn(r, n, o), f(e)), !1;
		if (e && !r && typeof e == "object") {
			if (K.endsWith(n, "{}")) n = i ? n : n.slice(0, -2), e = m(e, 1);
			else if (K.isArray(e) && Hn(e) || (K.isFileList(e) || K.endsWith(n, "[]")) && (a = K.toArray(e))) return n = Bn(n), a.forEach(function(e, r) {
				!(K.isUndefined(e) || e === null) && t.append(s === !0 ? Vn([n], r, o) : s === null ? n : n + "[]", f(e));
			}), !1;
		}
		return zn(e) ? !0 : (t.append(Vn(r, n, o), f(e)), !1);
	}
	let g = Object.assign(Un, {
		defaultVisitor: h,
		convertValue: f,
		isVisitable: zn
	});
	function _(e, n, r = 0) {
		if (!K.isUndefined(e)) {
			if (p(r), d.indexOf(e) !== -1) throw Error("Circular reference detected in " + n.join("."));
			d.push(e), K.forEach(e, function(e, i) {
				(!(K.isUndefined(e) || e === null) && a.call(t, e, K.isString(i) ? i.trim() : i, n, g)) === !0 && _(e, n ? n.concat(i) : [i], r + 1);
			}), d.pop();
		}
	}
	if (!K.isObject(e)) throw TypeError("data must be an object");
	return _(e), t;
}
//#endregion
//#region node_modules/axios/lib/helpers/AxiosURLSearchParams.js
function Gn(e) {
	let t = {
		"!": "%21",
		"'": "%27",
		"(": "%28",
		")": "%29",
		"~": "%7E",
		"%20": "+"
	};
	return encodeURIComponent(e).replace(/[!'()~]|%20/g, function(e) {
		return t[e];
	});
}
function Kn(e, t) {
	this._pairs = [], e && Wn(e, this, t);
}
var qn = Kn.prototype;
qn.append = function(e, t) {
	this._pairs.push([e, t]);
}, qn.toString = function(e) {
	let t = e ? (t) => e.call(this, t, Gn) : Gn;
	return this._pairs.map(function(e) {
		return t(e[0]) + "=" + t(e[1]);
	}, "").join("&");
};
//#endregion
//#region node_modules/axios/lib/helpers/buildURL.js
function Jn(e) {
	return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+");
}
function Yn(e, t, n) {
	if (!t) return e;
	e ||= "";
	let r = K.isFunction(n) ? { serialize: n } : n, i = K.getSafeProp(r, "encode") || Jn, a = K.getSafeProp(r, "serialize"), o;
	if (o = a ? a(t, r) : K.isURLSearchParams(t) ? t.toString() : new Kn(t, r).toString(i), o) {
		let t = e.indexOf("#");
		t !== -1 && (e = e.slice(0, t)), e += (e.indexOf("?") === -1 ? "?" : "&") + o;
	}
	return e;
}
//#endregion
//#region node_modules/axios/lib/core/InterceptorManager.js
var Xn = Symbol("internals");
function Zn(e) {
	return e ? e.length : 0;
}
function Qn(e) {
	if (e) for (; e.length && e[e.length - 1] === null;) e.pop();
}
function $n(e, t) {
	let n = e.handlers, r = Zn(n);
	n === t.handlersRef ? r !== t.handlersLength && (r ? t.handlerEntries.forEach(function(e, r) {
		n[e.index] !== e.handler && t.handlerEntries.delete(r);
	}) : t.handlerEntries.clear()) : (t.handlersRef = n, t.handlerEntries.clear()), t.handlersLength = r;
}
var er = class {
	constructor() {
		this.handlers = [], this[Xn] = {
			handlersRef: this.handlers,
			handlersLength: this.handlers.length,
			handlerEntries: /* @__PURE__ */ new Map(),
			iterationDepth: 0,
			nextId: 0
		};
	}
	use(e, t, n) {
		let r = {
			fulfilled: e,
			rejected: t,
			synchronous: n ? n.synchronous : !1,
			runWhen: n ? n.runWhen : null
		}, i = this[Xn];
		this.handlers ??= [], $n(this, i);
		let a = i.nextId++;
		return this.handlers.push(r), i.handlerEntries.set(a, {
			handler: r,
			index: this.handlers.length - 1
		}), i.handlersLength = this.handlers.length, a;
	}
	eject(e) {
		let t = this[Xn];
		$n(this, t);
		let n = t.handlerEntries.get(e);
		if (n) {
			if (t.handlerEntries.delete(e), this.handlers[n.index] !== n.handler) return;
			this.handlers[n.index] = null, t.iterationDepth || (Qn(this.handlers), t.handlersLength = this.handlers.length);
		}
	}
	clear() {
		this.handlers && (this.handlers = [], $n(this, this[Xn]));
	}
	forEach(e) {
		let t = this[Xn];
		$n(this, t), t.iterationDepth++;
		try {
			K.forEach(this.handlers, function(t) {
				t !== null && e(t);
			});
		} finally {
			--t.iterationDepth || ($n(this, t), Qn(this.handlers), t.handlersLength = Zn(this.handlers));
		}
	}
}, tr = {
	silentJSONParsing: !0,
	forcedJSONParsing: !0,
	clarifyTimeoutError: !1,
	legacyInterceptorReqResOrdering: !0,
	advertiseZstdAcceptEncoding: !1,
	validateStatusUndefinedResolves: !0
}, nr = f.URLSearchParams, rr = "abcdefghijklmnopqrstuvwxyz", ir = "0123456789", ar = {
	DIGIT: ir,
	ALPHA: rr,
	ALPHA_DIGIT: rr + rr.toUpperCase() + ir
}, or = {
	isNode: !0,
	classes: {
		URLSearchParams: nr,
		FormData: Ln,
		Blob: typeof Blob < "u" && Blob || null
	},
	ALPHABET: ar,
	generateString: (e = 16, t = ar.ALPHA_DIGIT) => {
		let n = "", { length: r } = t, i = new Uint32Array(e);
		m.randomFillSync(i);
		for (let a = 0; a < e; a++) n += t[i[a] % r];
		return n;
	},
	protocols: [
		"http",
		"https",
		"file",
		"data"
	]
}, sr = /* @__PURE__ */ O({
	hasBrowserEnv: () => cr,
	hasStandardBrowserEnv: () => ur,
	hasStandardBrowserWebWorkerEnv: () => dr,
	navigator: () => lr,
	origin: () => fr
}), cr = typeof window < "u" && typeof document < "u", lr = typeof navigator == "object" && navigator || void 0, ur = cr && (!lr || [
	"ReactNative",
	"NativeScript",
	"NS"
].indexOf(lr.product) < 0), dr = typeof WorkerGlobalScope < "u" && self instanceof WorkerGlobalScope && typeof self.importScripts == "function", fr = cr && window.location.href || "http://localhost", Y = {
	...sr,
	...or
};
//#endregion
//#region node_modules/axios/lib/helpers/toURLEncodedForm.js
function pr(e, t) {
	return Wn(e, new Y.classes.URLSearchParams(), {
		visitor: function(e, t, n, r) {
			return Y.isNode && K.isBuffer(e) ? (this.append(t, e.toString("base64")), !1) : r.defaultVisitor.apply(this, arguments);
		},
		...t
	});
}
//#endregion
//#region node_modules/axios/lib/helpers/formDataToJSON.js
var mr = 100;
function hr(e) {
	if (e > mr) throw new J("FormData field is too deeply nested (" + e + " levels). Max depth: " + mr, J.ERR_FORM_DATA_DEPTH_EXCEEDED);
}
function gr(e) {
	let t = [], n = /[^.[\]]+|\[([^.[\]]*)]/g, r;
	for (; (r = n.exec(e)) !== null;) hr(t.length), t.push(r[0] === "[]" ? "" : r[1] || r[0]);
	return t;
}
function _r(e) {
	let t = {}, n = Object.keys(e), r, i = n.length, a;
	for (r = 0; r < i; r++) a = n[r], t[a] = e[a];
	return t;
}
function vr(e) {
	function t(e, n, r, i) {
		hr(i);
		let a = e[i++];
		if (a === "__proto__") return !0;
		let o = Number.isFinite(+a), s = i >= e.length;
		return a = !a && K.isArray(r) ? r.length : a, s ? (K.hasOwnProp(r, a) ? r[a] = K.isArray(r[a]) ? r[a].concat(n) : [r[a], n] : r[a] = n, !o) : ((!K.hasOwnProp(r, a) || !K.isObject(r[a])) && (r[a] = []), t(e, n, r[a], i) && K.isArray(r[a]) && (r[a] = _r(r[a])), !o);
	}
	if (K.isFormData(e) && K.isFunction(e.entries)) {
		let n = {};
		return K.forEachEntry(e, (e, r) => {
			t(gr(e), r, n, 0);
		}), n;
	}
	return null;
}
//#endregion
//#region node_modules/axios/lib/core/methodList.js
var yr = Object.freeze([
	"get",
	"delete",
	"head",
	"options",
	"post",
	"put",
	"patch",
	"purge",
	"link",
	"unlink",
	"query"
]), br = (e, t) => e != null && K.hasOwnProp(e, t) ? e[t] : void 0;
function xr(e, t, n) {
	if (K.isString(e)) try {
		return (t || JSON.parse)(e), K.trim(e);
	} catch (e) {
		if (e.name !== "SyntaxError") throw e;
	}
	return (n || JSON.stringify)(e);
}
var Sr = {
	transitional: tr,
	adapter: [
		"xhr",
		"http",
		"fetch"
	],
	transformRequest: [function(e, t) {
		let n = t.getContentType() || "", r = n.indexOf("application/json") > -1, i = K.isObject(e);
		if (i && K.isHTMLForm(e) && (e = new FormData(e)), K.isFormData(e)) return r ? JSON.stringify(vr(e)) : e;
		if (K.isArrayBuffer(e) || K.isBuffer(e) || K.isStream(e) || K.isFile(e) || K.isBlob(e) || K.isReadableStream(e)) return e;
		if (K.isArrayBufferView(e)) return e.buffer;
		if (K.isURLSearchParams(e)) return t.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), e.toString();
		let a;
		if (i) {
			let t = br(this, "formSerializer");
			if (n.indexOf("application/x-www-form-urlencoded") > -1) return pr(e, t).toString();
			if ((a = K.isFileList(e)) || n.indexOf("multipart/form-data") > -1) {
				let n = br(this, "env"), r = n && n.FormData;
				return Wn(a ? { "files[]": e } : e, r && new r(), t);
			}
		}
		return i || r ? (t.setContentType("application/json", !1), xr(e)) : e;
	}],
	transformResponse: [function(e) {
		let t = br(this, "transitional") || Sr.transitional, n = t && t.forcedJSONParsing, r = br(this, "responseType"), i = r === "json";
		if (K.isResponse(e) || K.isReadableStream(e)) return e;
		if (e && K.isString(e) && (n && !r || i)) {
			let n = !(t && t.silentJSONParsing) && i;
			try {
				return JSON.parse(e, br(this, "parseReviver"));
			} catch (e) {
				if (n) throw e.name === "SyntaxError" ? J.from(e, J.ERR_BAD_RESPONSE, this, null, br(this, "response")) : e;
			}
		}
		return e;
	}],
	timeout: 0,
	xsrfCookieName: "XSRF-TOKEN",
	xsrfHeaderName: "X-XSRF-TOKEN",
	maxContentLength: -1,
	maxBodyLength: -1,
	env: {
		FormData: Y.classes.FormData,
		Blob: Y.classes.Blob
	},
	validateStatus: function(e) {
		return e >= 200 && e < 300;
	},
	headers: { common: {
		Accept: "application/json, text/plain, */*",
		"Content-Type": void 0
	} }
};
K.forEach(yr, (e) => {
	Sr.headers[e] = {};
});
//#endregion
//#region node_modules/axios/lib/core/transformData.js
function Cr(e, t) {
	let n = this || Sr, r = t || n, i = q.from(r.headers), a = r.data;
	return K.forEach(e, function(e) {
		a = e.call(n, a, i.normalize(), t ? t.status : void 0);
	}), i.normalize(), a;
}
//#endregion
//#region node_modules/axios/lib/cancel/isCancel.js
function wr(e) {
	return !!(e && e.__CANCEL__);
}
//#endregion
//#region node_modules/axios/lib/cancel/CanceledError.js
var Tr = class extends J {
	constructor(e, t, n) {
		super(e ?? "canceled", J.ERR_CANCELED, t, n), this.name = "CanceledError", this.__CANCEL__ = !0;
	}
};
//#endregion
//#region node_modules/axios/lib/core/settle.js
function Er(e, t, n) {
	let r = n.config.validateStatus;
	!n.status || !r || r(n.status) ? e(n) : t(new J("Request failed with status code " + n.status, n.status >= 400 && n.status < 500 ? J.ERR_BAD_REQUEST : J.ERR_BAD_RESPONSE, n.config, n.request, n));
}
//#endregion
//#region node_modules/axios/lib/helpers/isAbsoluteURL.js
function Dr(e) {
	return typeof e == "string" && /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
//#endregion
//#region node_modules/axios/lib/helpers/combineURLs.js
function Or(e, t) {
	if (!t) return e;
	let n = e.length;
	for (; n > 0 && e.charCodeAt(n - 1) === 47;) n--;
	return e.slice(0, n) + "/" + t.replace(/^\/+/, "");
}
//#endregion
//#region node_modules/axios/lib/helpers/normalizeURLForProtocolCheck.js
var kr = /[\t\n\r]/g;
function Ar(e) {
	if (typeof e != "string") return e;
	let t = 0;
	for (; t < e.length && e.charCodeAt(t) <= 32;) t++;
	return e.slice(t).replace(kr, "");
}
//#endregion
//#region node_modules/axios/lib/core/buildFullPath.js
var jr = /^https?:(?!\/\/)/i;
function Mr(e) {
	return e && e.replace(/(^|&)([^=&]*=)?[^&]+/g, (e, t, n = "") => `${t}${n}${jt}`);
}
function Nr(e) {
	let t = e.replace(/^(https?:\/{0,2})[^/?#]*@/i, `$1${jt}@`), n = t.indexOf("#"), r = (n === -1 ? t : t.slice(0, n)).replace(/([?&][^=&#]*=)[^&#]*/g, `$1${jt}`);
	return n === -1 ? r : `${r}#${Mr(t.slice(n + 1))}`;
}
function Pr(e, t) {
	if (typeof e == "string") {
		let n = Ar(e);
		if (jr.test(n)) throw new J(`Invalid URL ${JSON.stringify(Nr(n))}: missing "//" after protocol`, J.ERR_INVALID_URL, t);
	}
}
function Fr(e, t, n, r) {
	Pr(t, r);
	let i = !Dr(t);
	return e && (i || n === !1) ? (Pr(e, r), Or(e, t)) : t;
}
//#endregion
//#region node_modules/proxy-from-env/index.js
var Ir = {
	ftp: 21,
	gopher: 70,
	http: 80,
	https: 443,
	ws: 80,
	wss: 443
};
function Lr(e) {
	try {
		return new URL(e);
	} catch {
		return null;
	}
}
function Rr(e) {
	var t = (typeof e == "string" ? Lr(e) : e) || {}, n = t.protocol, r = t.host, i = t.port;
	if (typeof r != "string" || !r || typeof n != "string" || (n = n.split(":", 1)[0], r = r.replace(/:\d*$/, ""), i = parseInt(i) || Ir[n] || 0, !zr(r, i))) return "";
	var a = Br(n + "_proxy") || Br("all_proxy");
	return a && a.indexOf("://") === -1 && (a = n + "://" + a), a;
}
function zr(e, t) {
	var n = Br("no_proxy").toLowerCase();
	return !n || n !== "*" && n.split(/[,\s]/).every(function(n) {
		if (!n) return !0;
		var r = n.match(/^(.+):(\d+)$/), i = r ? r[1] : n, a = r ? parseInt(r[2]) : 0;
		return a && a !== t ? !0 : /^[.*]/.test(i) ? (i.charAt(0) === "*" && (i = i.slice(1)), !e.endsWith(i)) : e !== i;
	});
}
function Br(e) {
	return process.env[e.toLowerCase()] || process.env[e.toUpperCase()] || "";
}
//#endregion
//#region node_modules/ms/index.js
var Vr = /* @__PURE__ */ D(((e, t) => {
	var n = 1e3, r = n * 60, i = r * 60, a = i * 24, o = a * 7, s = a * 365.25;
	t.exports = function(e, t) {
		t ||= {};
		var n = typeof e;
		if (n === "string" && e.length > 0) return c(e);
		if (n === "number" && isFinite(e)) return t.long ? u(e) : l(e);
		throw Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(e));
	};
	function c(e) {
		if (e = String(e), !(e.length > 100)) {
			var t = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);
			if (t) {
				var c = parseFloat(t[1]);
				switch ((t[2] || "ms").toLowerCase()) {
					case "years":
					case "year":
					case "yrs":
					case "yr":
					case "y": return c * s;
					case "weeks":
					case "week":
					case "w": return c * o;
					case "days":
					case "day":
					case "d": return c * a;
					case "hours":
					case "hour":
					case "hrs":
					case "hr":
					case "h": return c * i;
					case "minutes":
					case "minute":
					case "mins":
					case "min":
					case "m": return c * r;
					case "seconds":
					case "second":
					case "secs":
					case "sec":
					case "s": return c * n;
					case "milliseconds":
					case "millisecond":
					case "msecs":
					case "msec":
					case "ms": return c;
					default: return;
				}
			}
		}
	}
	function l(e) {
		var t = Math.abs(e);
		return t >= a ? Math.round(e / a) + "d" : t >= i ? Math.round(e / i) + "h" : t >= r ? Math.round(e / r) + "m" : t >= n ? Math.round(e / n) + "s" : e + "ms";
	}
	function u(e) {
		var t = Math.abs(e);
		return t >= a ? d(e, t, a, "day") : t >= i ? d(e, t, i, "hour") : t >= r ? d(e, t, r, "minute") : t >= n ? d(e, t, n, "second") : e + " ms";
	}
	function d(e, t, n, r) {
		var i = t >= n * 1.5;
		return Math.round(e / n) + " " + r + (i ? "s" : "");
	}
})), Hr = /* @__PURE__ */ D(((e, t) => {
	function n(e) {
		n.debug = n, n.default = n, n.coerce = c, n.disable = o, n.enable = i, n.enabled = s, n.humanize = Vr(), n.destroy = l, Object.keys(e).forEach((t) => {
			n[t] = e[t];
		}), n.names = [], n.skips = [], n.formatters = {};
		function t(e) {
			let t = 0;
			for (let n = 0; n < e.length; n++) t = (t << 5) - t + e.charCodeAt(n), t |= 0;
			return n.colors[Math.abs(t) % n.colors.length];
		}
		n.selectColor = t;
		function n(e) {
			let t, i = null, a, o;
			function s(...e) {
				if (!s.enabled) return;
				let r = s, i = Number(/* @__PURE__ */ new Date());
				r.diff = i - (t || i), r.prev = t, r.curr = i, t = i, e[0] = n.coerce(e[0]), typeof e[0] != "string" && e.unshift("%O");
				let a = 0;
				e[0] = e[0].replace(/%([a-zA-Z%])/g, (t, i) => {
					if (t === "%%") return "%";
					a++;
					let o = n.formatters[i];
					if (typeof o == "function") {
						let n = e[a];
						t = o.call(r, n), e.splice(a, 1), a--;
					}
					return t;
				}), n.formatArgs.call(r, e), (r.log || n.log).apply(r, e);
			}
			return s.namespace = e, s.useColors = n.useColors(), s.color = n.selectColor(e), s.extend = r, s.destroy = n.destroy, Object.defineProperty(s, "enabled", {
				enumerable: !0,
				configurable: !1,
				get: () => i === null ? (a !== n.namespaces && (a = n.namespaces, o = n.enabled(e)), o) : i,
				set: (e) => {
					i = e;
				}
			}), typeof n.init == "function" && n.init(s), s;
		}
		function r(e, t) {
			let r = n(this.namespace + (t === void 0 ? ":" : t) + e);
			return r.log = this.log, r;
		}
		function i(e) {
			n.save(e), n.namespaces = e, n.names = [], n.skips = [];
			let t = (typeof e == "string" ? e : "").trim().replace(/\s+/g, ",").split(",").filter(Boolean);
			for (let e of t) e[0] === "-" ? n.skips.push(e.slice(1)) : n.names.push(e);
		}
		function a(e, t) {
			let n = 0, r = 0, i = -1, a = 0;
			for (; n < e.length;) if (r < t.length && (t[r] === e[n] || t[r] === "*")) t[r] === "*" ? (i = r, a = n, r++) : (n++, r++);
			else if (i !== -1) r = i + 1, a++, n = a;
			else return !1;
			for (; r < t.length && t[r] === "*";) r++;
			return r === t.length;
		}
		function o() {
			let e = [...n.names, ...n.skips.map((e) => "-" + e)].join(",");
			return n.enable(""), e;
		}
		function s(e) {
			for (let t of n.skips) if (a(e, t)) return !1;
			for (let t of n.names) if (a(e, t)) return !0;
			return !1;
		}
		function c(e) {
			return e instanceof Error ? e.stack || e.message : e;
		}
		function l() {
			console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
		}
		return n.enable(n.load()), n;
	}
	t.exports = n;
})), Ur = /* @__PURE__ */ D(((e, t) => {
	e.formatArgs = r, e.save = i, e.load = a, e.useColors = n, e.storage = o(), e.destroy = (() => {
		let e = !1;
		return () => {
			e || (e = !0, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
		};
	})(), e.colors = /* @__PURE__ */ "#0000CC.#0000FF.#0033CC.#0033FF.#0066CC.#0066FF.#0099CC.#0099FF.#00CC00.#00CC33.#00CC66.#00CC99.#00CCCC.#00CCFF.#3300CC.#3300FF.#3333CC.#3333FF.#3366CC.#3366FF.#3399CC.#3399FF.#33CC00.#33CC33.#33CC66.#33CC99.#33CCCC.#33CCFF.#6600CC.#6600FF.#6633CC.#6633FF.#66CC00.#66CC33.#9900CC.#9900FF.#9933CC.#9933FF.#99CC00.#99CC33.#CC0000.#CC0033.#CC0066.#CC0099.#CC00CC.#CC00FF.#CC3300.#CC3333.#CC3366.#CC3399.#CC33CC.#CC33FF.#CC6600.#CC6633.#CC9900.#CC9933.#CCCC00.#CCCC33.#FF0000.#FF0033.#FF0066.#FF0099.#FF00CC.#FF00FF.#FF3300.#FF3333.#FF3366.#FF3399.#FF33CC.#FF33FF.#FF6600.#FF6633.#FF9900.#FF9933.#FFCC00.#FFCC33".split(".");
	function n() {
		if (typeof window < "u" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) return !0;
		if (typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) return !1;
		let e;
		return typeof document < "u" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || typeof window < "u" && window.console && (window.console.firebug || window.console.exception && window.console.table) || typeof navigator < "u" && navigator.userAgent && (e = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(e[1], 10) >= 31 || typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
	}
	function r(e) {
		if (e[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + e[0] + (this.useColors ? "%c " : " ") + "+" + t.exports.humanize(this.diff), !this.useColors) return;
		let n = "color: " + this.color;
		e.splice(1, 0, n, "color: inherit");
		let r = 0, i = 0;
		e[0].replace(/%[a-zA-Z%]/g, (e) => {
			e !== "%%" && (r++, e === "%c" && (i = r));
		}), e.splice(i, 0, n);
	}
	e.log = console.debug || console.log || (() => {});
	function i(t) {
		try {
			t ? e.storage.setItem("debug", t) : e.storage.removeItem("debug");
		} catch {}
	}
	function a() {
		let t;
		try {
			t = e.storage.getItem("debug") || e.storage.getItem("DEBUG");
		} catch {}
		return !t && typeof process < "u" && "env" in process && (t = process.env.DEBUG), t;
	}
	function o() {
		try {
			return localStorage;
		} catch {}
	}
	t.exports = Hr()(e);
	var { formatters: s } = t.exports;
	s.j = function(e) {
		try {
			return JSON.stringify(e);
		} catch (e) {
			return "[UnexpectedJSONParseError]: " + e.message;
		}
	};
})), Wr = /* @__PURE__ */ O({
	createSupportsColor: () => Yr,
	default: () => Zr
});
function Gr(e, t = globalThis.Deno ? globalThis.Deno.args : h.argv) {
	let n = e.startsWith("-") ? "" : e.length === 1 ? "-" : "--", r = t.indexOf(n + e), i = t.indexOf("--");
	return r !== -1 && (i === -1 || r < i);
}
function Kr() {
	if (!("FORCE_COLOR" in X)) return;
	if (X.FORCE_COLOR === "true") return 1;
	if (X.FORCE_COLOR === "false") return 0;
	if (X.FORCE_COLOR.length === 0) return 1;
	let e = Math.min(Number.parseInt(X.FORCE_COLOR, 10), 3);
	if ([
		0,
		1,
		2,
		3
	].includes(e)) return e;
}
function qr(e) {
	return e !== 0 && {
		level: e,
		hasBasic: !0,
		has256: e >= 2,
		has16m: e >= 3
	};
}
function Jr(e, { streamIsTTY: t, sniffFlags: n = !0 } = {}) {
	let r = Kr();
	r !== void 0 && (Xr = r);
	let i = n ? Xr : r;
	if (i === 0) return 0;
	if (n) {
		if (Gr("color=16m") || Gr("color=full") || Gr("color=truecolor")) return 3;
		if (Gr("color=256")) return 2;
	}
	if ("TF_BUILD" in X && "AGENT_NAME" in X) return 1;
	if (e && !t && i === void 0) return 0;
	let a = i || 0;
	if (X.TERM === "dumb") return a;
	if (h.platform === "win32") {
		let e = g.release().split(".");
		return Number(e[0]) >= 10 && Number(e[2]) >= 10586 ? Number(e[2]) >= 14931 ? 3 : 2 : 1;
	}
	if ("CI" in X) return [
		"GITHUB_ACTIONS",
		"GITEA_ACTIONS",
		"CIRCLECI"
	].some((e) => e in X) ? 3 : [
		"TRAVIS",
		"APPVEYOR",
		"GITLAB_CI",
		"BUILDKITE",
		"DRONE"
	].some((e) => e in X) || X.CI_NAME === "codeship" ? 1 : a;
	if ("TEAMCITY_VERSION" in X) return +!!/^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(X.TEAMCITY_VERSION);
	if (X.COLORTERM === "truecolor" || X.TERM === "xterm-kitty" || X.TERM === "xterm-ghostty" || X.TERM === "wezterm") return 3;
	if ("TERM_PROGRAM" in X) {
		let e = Number.parseInt((X.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
		switch (X.TERM_PROGRAM) {
			case "iTerm.app": return e >= 3 ? 3 : 2;
			case "Apple_Terminal": return 2;
		}
	}
	return /-256(color)?$/i.test(X.TERM) ? 2 : /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(X.TERM) || "COLORTERM" in X ? 1 : a;
}
function Yr(e, t = {}) {
	return qr(Jr(e, {
		streamIsTTY: e && e.isTTY,
		...t
	}));
}
var X, Xr, Zr, Qr = E((() => {
	({env: X} = h), Gr("no-color") || Gr("no-colors") || Gr("color=false") || Gr("color=never") ? Xr = 0 : (Gr("color") || Gr("colors") || Gr("color=true") || Gr("color=always")) && (Xr = 1), Zr = {
		stdout: Yr({ isTTY: _.isatty(1) }),
		stderr: Yr({ isTTY: _.isatty(2) })
	};
})), $r = /* @__PURE__ */ D(((e, t) => {
	var n = M("tty"), r = M("util");
	e.init = u, e.log = s, e.formatArgs = a, e.save = c, e.load = l, e.useColors = i, e.destroy = r.deprecate(() => {}, "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."), e.colors = [
		6,
		2,
		3,
		4,
		5,
		1
	];
	try {
		let t = (Qr(), j(Wr));
		t && (t.stderr || t).level >= 2 && (e.colors = [
			20,
			21,
			26,
			27,
			32,
			33,
			38,
			39,
			40,
			41,
			42,
			43,
			44,
			45,
			56,
			57,
			62,
			63,
			68,
			69,
			74,
			75,
			76,
			77,
			78,
			79,
			80,
			81,
			92,
			93,
			98,
			99,
			112,
			113,
			128,
			129,
			134,
			135,
			148,
			149,
			160,
			161,
			162,
			163,
			164,
			165,
			166,
			167,
			168,
			169,
			170,
			171,
			172,
			173,
			178,
			179,
			184,
			185,
			196,
			197,
			198,
			199,
			200,
			201,
			202,
			203,
			204,
			205,
			206,
			207,
			208,
			209,
			214,
			215,
			220,
			221
		]);
	} catch {}
	e.inspectOpts = Object.keys(process.env).filter((e) => /^debug_/i.test(e)).reduce((e, t) => {
		let n = t.substring(6).toLowerCase().replace(/_([a-z])/g, (e, t) => t.toUpperCase()), r = process.env[t];
		return r = /^(yes|on|true|enabled)$/i.test(r) ? !0 : /^(no|off|false|disabled)$/i.test(r) ? !1 : r === "null" ? null : Number(r), e[n] = r, e;
	}, {});
	function i() {
		return "colors" in e.inspectOpts ? !!e.inspectOpts.colors : n.isatty(process.stderr.fd);
	}
	function a(e) {
		let { namespace: n, useColors: r } = this;
		if (r) {
			let r = this.color, i = "\x1B[3" + (r < 8 ? r : "8;5;" + r), a = `  ${i};1m${n} \u001B[0m`;
			e[0] = a + e[0].split("\n").join("\n" + a), e.push(i + "m+" + t.exports.humanize(this.diff) + "\x1B[0m");
		} else e[0] = o() + n + " " + e[0];
	}
	function o() {
		return e.inspectOpts.hideDate ? "" : (/* @__PURE__ */ new Date()).toISOString() + " ";
	}
	function s(...t) {
		return process.stderr.write(r.formatWithOptions(e.inspectOpts, ...t) + "\n");
	}
	function c(e) {
		e ? process.env.DEBUG = e : delete process.env.DEBUG;
	}
	function l() {
		return process.env.DEBUG;
	}
	function u(t) {
		t.inspectOpts = {};
		let n = Object.keys(e.inspectOpts);
		for (let r = 0; r < n.length; r++) t.inspectOpts[n[r]] = e.inspectOpts[n[r]];
	}
	t.exports = Hr()(e);
	var { formatters: d } = t.exports;
	d.o = function(e) {
		return this.inspectOpts.colors = this.useColors, r.inspect(e, this.inspectOpts).split("\n").map((e) => e.trim()).join(" ");
	}, d.O = function(e) {
		return this.inspectOpts.colors = this.useColors, r.inspect(e, this.inspectOpts);
	};
})), ei = /* @__PURE__ */ D(((e, t) => {
	t.exports = typeof process > "u" || process.type === "renderer" || process.browser === !0 || process.__nwjs ? Ur() : $r();
})), ti = /* @__PURE__ */ D(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 });
	function t(e) {
		return function(t, n) {
			return new Promise((r, i) => {
				e.call(this, t, n, (e, t) => {
					e ? i(e) : r(t);
				});
			});
		};
	}
	e.default = t;
})), ni = /* @__PURE__ */ D(((e, t) => {
	var n = e && e.__importDefault || function(e) {
		return e && e.__esModule ? e : { default: e };
	}, r = M("events"), i = n(ei()), a = n(ti()), o = i.default("agent-base");
	function s(e) {
		return !!e && typeof e.addRequest == "function";
	}
	function c() {
		let { stack: e } = /* @__PURE__ */ Error();
		return typeof e == "string" && e.split("\n").some((e) => e.indexOf("(https.js:") !== -1 || e.indexOf("node:https:") !== -1);
	}
	function l(e, t) {
		return new l.Agent(e, t);
	}
	(function(e) {
		class t extends r.EventEmitter {
			constructor(e, t) {
				super();
				let n = t;
				typeof e == "function" ? this.callback = e : e && (n = e), this.timeout = null, n && typeof n.timeout == "number" && (this.timeout = n.timeout), this.maxFreeSockets = 1, this.maxSockets = 1, this.maxTotalSockets = Infinity, this.sockets = {}, this.freeSockets = {}, this.requests = {}, this.options = {};
			}
			get defaultPort() {
				return typeof this.explicitDefaultPort == "number" ? this.explicitDefaultPort : c() ? 443 : 80;
			}
			set defaultPort(e) {
				this.explicitDefaultPort = e;
			}
			get protocol() {
				return typeof this.explicitProtocol == "string" ? this.explicitProtocol : c() ? "https:" : "http:";
			}
			set protocol(e) {
				this.explicitProtocol = e;
			}
			callback(e, t, n) {
				throw Error("\"agent-base\" has no default implementation, you must subclass and override `callback()`");
			}
			addRequest(e, t) {
				let n = Object.assign({}, t);
				typeof n.secureEndpoint != "boolean" && (n.secureEndpoint = c()), n.host ??= "localhost", n.port ??= n.secureEndpoint ? 443 : 80, n.protocol ??= n.secureEndpoint ? "https:" : "http:", n.host && n.path && delete n.path, delete n.agent, delete n.hostname, delete n._defaultAgent, delete n.defaultPort, delete n.createConnection, e._last = !0, e.shouldKeepAlive = !1;
				let r = !1, i = null, l = n.timeout || this.timeout, u = (t) => {
					e._hadError ||= (e.emit("error", t), !0);
				}, d = () => {
					i = null, r = !0;
					let e = /* @__PURE__ */ Error(`A "socket" was not created for HTTP request before ${l}ms`);
					e.code = "ETIMEOUT", u(e);
				}, f = (e) => {
					r || (i !== null && (clearTimeout(i), i = null), u(e));
				}, p = (t) => {
					if (r) return;
					if (i != null && (clearTimeout(i), i = null), s(t)) {
						o("Callback returned another Agent instance %o", t.constructor.name), t.addRequest(e, n);
						return;
					}
					if (t) {
						t.once("free", () => {
							this.freeSocket(t, n);
						}), e.onSocket(t);
						return;
					}
					let a = /* @__PURE__ */ Error(`no Duplex stream was returned to agent-base for \`${e.method} ${e.path}\``);
					u(a);
				};
				if (typeof this.callback != "function") {
					u(/* @__PURE__ */ Error("`callback` is not defined"));
					return;
				}
				this.promisifiedCallback || (this.callback.length >= 3 ? (o("Converting legacy callback function to promise"), this.promisifiedCallback = a.default(this.callback)) : this.promisifiedCallback = this.callback), typeof l == "number" && l > 0 && (i = setTimeout(d, l)), "port" in n && typeof n.port != "number" && (n.port = Number(n.port));
				try {
					o("Resolving socket for %o request: %o", n.protocol, `${e.method} ${e.path}`), Promise.resolve(this.promisifiedCallback(e, n)).then(p, f);
				} catch (e) {
					Promise.reject(e).catch(f);
				}
			}
			freeSocket(e, t) {
				o("Freeing socket %o %o", e.constructor.name, t), e.destroy();
			}
			destroy() {
				o("Destroying agent %o", this.constructor.name);
			}
		}
		e.Agent = t, e.prototype = e.Agent.prototype;
	})(l ||= {}), t.exports = l;
})), ri = /* @__PURE__ */ D(((e) => {
	var t = e && e.__importDefault || function(e) {
		return e && e.__esModule ? e : { default: e };
	};
	Object.defineProperty(e, "__esModule", { value: !0 });
	var n = t(ei()).default("https-proxy-agent:parse-proxy-response");
	function r(e) {
		return new Promise((t, r) => {
			let i = 0, a = [];
			function o() {
				let t = e.read();
				t ? d(t) : e.once("readable", o);
			}
			function s() {
				e.removeListener("end", l), e.removeListener("error", u), e.removeListener("close", c), e.removeListener("readable", o);
			}
			function c(e) {
				n("onclose had error %o", e);
			}
			function l() {
				n("onend");
			}
			function u(e) {
				s(), n("onerror %o", e), r(e);
			}
			function d(e) {
				a.push(e), i += e.length;
				let r = Buffer.concat(a, i);
				if (r.indexOf("\r\n\r\n") === -1) {
					n("have not received end of HTTP headers yet..."), o();
					return;
				}
				let s = r.toString("ascii", 0, r.indexOf("\r\n")), c = +s.split(" ")[1];
				n("got proxy server response: %o", s), t({
					statusCode: c,
					buffered: r
				});
			}
			e.on("error", u), e.on("close", c), e.on("end", l), o();
		});
	}
	e.default = r;
})), ii = /* @__PURE__ */ D(((e) => {
	var t = e && e.__awaiter || function(e, t, n, r) {
		function i(e) {
			return e instanceof n ? e : new n(function(t) {
				t(e);
			});
		}
		return new (n ||= Promise)(function(n, a) {
			function o(e) {
				try {
					c(r.next(e));
				} catch (e) {
					a(e);
				}
			}
			function s(e) {
				try {
					c(r.throw(e));
				} catch (e) {
					a(e);
				}
			}
			function c(e) {
				e.done ? n(e.value) : i(e.value).then(o, s);
			}
			c((r = r.apply(e, t || [])).next());
		});
	}, n = e && e.__importDefault || function(e) {
		return e && e.__esModule ? e : { default: e };
	};
	Object.defineProperty(e, "__esModule", { value: !0 });
	var r = n(M("net")), i = n(M("tls")), a = n(M("url")), o = n(M("assert")), s = n(ei()), c = ni(), l = n(ri()), u = s.default("https-proxy-agent:agent");
	e.default = class extends c.Agent {
		constructor(e) {
			let t;
			if (t = typeof e == "string" ? a.default.parse(e) : e, !t) throw Error("an HTTP(S) proxy server `host` and `port` must be specified!");
			u("creating new HttpsProxyAgent instance: %o", t), super(t);
			let n = Object.assign({}, t);
			this.secureProxy = t.secureProxy || p(n.protocol), n.host = n.hostname || n.host, typeof n.port == "string" && (n.port = parseInt(n.port, 10)), !n.port && n.host && (n.port = this.secureProxy ? 443 : 80), this.secureProxy && !("ALPNProtocols" in n) && (n.ALPNProtocols = ["http 1.1"]), n.host && n.path && (delete n.path, delete n.pathname), this.proxy = n;
		}
		callback(e, n) {
			return t(this, void 0, void 0, function* () {
				let { proxy: t, secureProxy: a } = this, s;
				a ? (u("Creating `tls.Socket`: %o", t), s = i.default.connect(t)) : (u("Creating `net.Socket`: %o", t), s = r.default.connect(t));
				let c = Object.assign({}, t.headers), p = `CONNECT ${`${n.host}:${n.port}`} HTTP/1.1\r\n`;
				t.auth && (c["Proxy-Authorization"] = `Basic ${Buffer.from(t.auth).toString("base64")}`);
				let { host: h, port: g, secureEndpoint: _ } = n;
				f(g, _) || (h += `:${g}`), c.Host = h, c.Connection = "close";
				for (let e of Object.keys(c)) p += `${e}: ${c[e]}\r\n`;
				let ee = l.default(s);
				s.write(`${p}\r\n`);
				let { statusCode: v, buffered: y } = yield ee;
				if (v === 200) {
					if (e.once("socket", d), n.secureEndpoint) {
						u("Upgrading socket connection to TLS");
						let e = n.servername || n.host;
						return i.default.connect(Object.assign(Object.assign({}, m(n, "host", "hostname", "path", "port")), {
							socket: s,
							servername: e
						}));
					}
					return s;
				}
				s.destroy();
				let b = new r.default.Socket({ writable: !1 });
				return b.readable = !0, e.once("socket", (e) => {
					u("replaying proxy buffer for failed request"), o.default(e.listenerCount("data") > 0), e.push(y), e.push(null);
				}), b;
			});
		}
	};
	function d(e) {
		e.resume();
	}
	function f(e, t) {
		return !!(!t && e === 80 || t && e === 443);
	}
	function p(e) {
		return typeof e == "string" && /^https:?$/i.test(e);
	}
	function m(e, ...t) {
		let n = {}, r;
		for (r in e) t.includes(r) || (n[r] = e[r]);
		return n;
	}
})), ai = /* @__PURE__ */ D(((e, t) => {
	var n = (e && e.__importDefault || function(e) {
		return e && e.__esModule ? e : { default: e };
	})(ii());
	function r(e) {
		return new n.default(e);
	}
	(function(e) {
		e.HttpsProxyAgent = n.default, e.prototype = n.default.prototype;
	})(r ||= {}), t.exports = r;
})), oi = /* @__PURE__ */ D(((e, t) => {
	var n;
	t.exports = function() {
		if (!n) {
			try {
				n = ei()("follow-redirects");
			} catch {}
			typeof n != "function" && (n = function() {});
		}
		n.apply(null, arguments);
	};
})), si = /* @__PURE__ */ D(((e, t) => {
	var n = M("url"), r = n.URL, i = M("http"), a = M("https"), o = M("stream").Writable, s = M("assert"), c = oi();
	// istanbul ignore next
	(function() {
		var e = typeof process < "u", t = typeof window < "u" && typeof document < "u", n = j(Error.captureStackTrace);
		!e && (t || !n) && console.warn("The follow-redirects package should be excluded from browser builds.");
	})();
	var l = !1;
	try {
		s(new r(""));
	} catch (e) {
		l = e.code === "ERR_INVALID_URL";
	}
	var u = [
		"Authorization",
		"Proxy-Authorization",
		"Cookie"
	], d = [
		"auth",
		"host",
		"hostname",
		"href",
		"path",
		"pathname",
		"port",
		"protocol",
		"query",
		"search",
		"hash"
	], f = [
		"abort",
		"aborted",
		"connect",
		"error",
		"socket",
		"timeout"
	], p = Object.create(null);
	f.forEach(function(e) {
		p[e] = function(t, n, r) {
			this._redirectable.emit(e, t, n, r);
		};
	});
	var m = E("ERR_INVALID_URL", "Invalid URL", TypeError), h = E("ERR_FR_REDIRECTION_FAILURE", "Redirected request failed"), g = E("ERR_FR_TOO_MANY_REDIRECTS", "Maximum number of redirects exceeded", h), _ = E("ERR_FR_MAX_BODY_LENGTH_EXCEEDED", "Request body larger than maxBodyLength limit"), ee = E("ERR_STREAM_WRITE_AFTER_END", "write after end"), v = o.prototype.destroy || x;
	function y(e, t) {
		o.call(this), this._sanitizeOptions(e), this._options = e, this._ended = !1, this._ending = !1, this._redirectCount = 0, this._redirects = [], this._requestBodyLength = 0, this._requestBodyBuffers = [], t && this.on("response", t);
		var n = this;
		this._onNativeResponse = function(e) {
			try {
				n._processResponse(e);
			} catch (e) {
				n.emit("error", e instanceof h ? e : new h({ cause: e }));
			}
		}, this._headerFilter = RegExp("^(?:" + u.concat(e.sensitiveHeaders).map(F).join("|") + ")$", "i"), this._performRequest();
	}
	y.prototype = Object.create(o.prototype), y.prototype.abort = function() {
		D(this._currentRequest), this._currentRequest.abort(), this.emit("abort");
	}, y.prototype.destroy = function(e) {
		return D(this._currentRequest, e), v.call(this, e), this;
	}, y.prototype.write = function(e, t, n) {
		if (this._ending) throw new ee();
		if (!A(e) && !N(e)) throw TypeError("data should be a string, Buffer or Uint8Array");
		if (j(t) && (n = t, t = null), e.length === 0) {
			n && n();
			return;
		}
		this._requestBodyLength + e.length <= this._options.maxBodyLength ? (this._requestBodyLength += e.length, this._requestBodyBuffers.push({
			data: e,
			encoding: t
		}), this._currentRequest.write(e, t, n)) : (this.emit("error", new _()), this.abort());
	}, y.prototype.end = function(e, t, n) {
		if (j(e) ? (n = e, e = t = null) : j(t) && (n = t, t = null), !e) this._ended = this._ending = !0, this._currentRequest.end(null, null, n);
		else {
			var r = this, i = this._currentRequest;
			this.write(e, t, function() {
				r._ended = !0, i.end(null, null, n);
			}), this._ending = !0;
		}
	}, y.prototype.setHeader = function(e, t) {
		this._options.headers[e] = t, this._currentRequest.setHeader(e, t);
	}, y.prototype.removeHeader = function(e) {
		delete this._options.headers[e], this._currentRequest.removeHeader(e);
	}, y.prototype.setTimeout = function(e, t) {
		var n = this;
		function r(t) {
			t.setTimeout(e), t.removeListener("timeout", t.destroy), t.addListener("timeout", t.destroy);
		}
		function i(t) {
			n._timeout && clearTimeout(n._timeout), n._timeout = setTimeout(function() {
				n.emit("timeout"), a();
			}, e), r(t);
		}
		function a() {
			n._timeout &&= (clearTimeout(n._timeout), null), n.removeListener("abort", a), n.removeListener("error", a), n.removeListener("response", a), n.removeListener("close", a), t && n.removeListener("timeout", t), n.socket || n._currentRequest.removeListener("socket", i);
		}
		return t && this.on("timeout", t), this.socket ? i(this.socket) : this._currentRequest.once("socket", i), this.on("socket", r), this.on("abort", a), this.on("error", a), this.on("response", a), this.on("close", a), this;
	}, [
		"flushHeaders",
		"getHeader",
		"setNoDelay",
		"setSocketKeepAlive"
	].forEach(function(e) {
		y.prototype[e] = function(t, n) {
			return this._currentRequest[e](t, n);
		};
	}), [
		"aborted",
		"connection",
		"socket"
	].forEach(function(e) {
		Object.defineProperty(y.prototype, e, { get: function() {
			return this._currentRequest[e];
		} });
	}), y.prototype._sanitizeOptions = function(e) {
		if (e.headers ||= {}, k(e.sensitiveHeaders) || (e.sensitiveHeaders = []), e.host && (e.hostname ||= e.host, delete e.host), !e.pathname && e.path) {
			var t = e.path.indexOf("?");
			t < 0 ? e.pathname = e.path : (e.pathname = e.path.substring(0, t), e.search = e.path.substring(t));
		}
	}, y.prototype._performRequest = function() {
		var e = this._options.protocol, t = this._options.nativeProtocols[e];
		if (!t) throw TypeError("Unsupported protocol " + e);
		if (this._options.agents) {
			var r = e.slice(0, -1);
			this._options.agent = this._options.agents[r];
		}
		var i = this._currentRequest = t.request(this._options, this._onNativeResponse);
		i._redirectable = this;
		for (var a of f) i.on(a, p[a]);
		if (this._currentUrl = /^\//.test(this._options.path) ? n.format(this._options) : this._options.path, this._isRedirect) {
			var o = 0, s = this, c = this._requestBodyBuffers;
			(function e(t) {
				// istanbul ignore else
				if (i === s._currentRequest) {
					// istanbul ignore if
					if (t) s.emit("error", t);
					else if (o < c.length) {
						var n = c[o++];
						// istanbul ignore else
						i.finished || i.write(n.data, n.encoding, e);
					} else s._ended && i.end();
				}
			})();
		}
	}, y.prototype._processResponse = function(e) {
		var t = e.statusCode;
		this._options.trackRedirects && this._redirects.push({
			url: this._currentUrl,
			headers: e.headers,
			statusCode: t
		});
		var r = e.headers.location;
		if (!r || this._options.followRedirects === !1 || t < 300 || t >= 400) {
			e.responseUrl = this._currentUrl, e.redirects = this._redirects, this.emit("response", e), this._requestBodyBuffers = [];
			return;
		}
		if (D(this._currentRequest), e.destroy(), ++this._redirectCount > this._options.maxRedirects) throw new g();
		var i, a = this._options.beforeRedirect;
		a && (i = Object.assign({ Host: e.req.getHeader("host") }, this._options.headers));
		var o = this._options.method;
		((t === 301 || t === 302) && this._options.method === "POST" || t === 303 && !/^(?:GET|HEAD)$/.test(this._options.method)) && (this._options.method = "GET", this._requestBodyBuffers = [], T(/^content-/i, this._options.headers));
		var s = T(/^host$/i, this._options.headers), l = S(this._currentUrl), u = s || l.host, d = /^\w+:/.test(r) ? this._currentUrl : n.format(Object.assign(l, { host: u })), f = C(r, d);
		if (c("redirecting to", f.href), this._isRedirect = !0, te(f, this._options), (f.protocol !== l.protocol && f.protocol !== "https:" || f.host !== u && !O(f.host, u)) && T(this._headerFilter, this._options.headers), j(a)) {
			var p = {
				headers: e.headers,
				statusCode: t
			}, m = {
				url: d,
				method: o,
				headers: i
			};
			a(this._options, p, m), this._sanitizeOptions(this._options);
		}
		this._performRequest();
	};
	function b(e) {
		var t = {
			maxRedirects: 21,
			maxBodyLength: 10485760
		}, n = {};
		return Object.keys(e).forEach(function(r) {
			var i = r + ":", a = n[i] = e[r], o = t[r] = Object.create(a);
			function l(e, r, a) {
				return P(e) ? e = te(e) : A(e) ? e = te(S(e)) : (a = r, r = w(e), e = { protocol: i }), j(r) && (a = r, r = null), r = Object.assign({
					maxRedirects: t.maxRedirects,
					maxBodyLength: t.maxBodyLength
				}, e, r), r.nativeProtocols = n, !A(r.host) && !A(r.hostname) && (r.hostname = "::1"), s.equal(r.protocol, i, "protocol mismatch"), c("options", r), new y(r, a);
			}
			function u(e, t, n) {
				var r = o.request(e, t, n);
				return r.end(), r;
			}
			Object.defineProperties(o, {
				request: {
					value: l,
					configurable: !0,
					enumerable: !0,
					writable: !0
				},
				get: {
					value: u,
					configurable: !0,
					enumerable: !0,
					writable: !0
				}
			});
		}), t;
	}
	function x() {}
	function S(e) {
		var t;
		// istanbul ignore else
		if (l) t = new r(e);
		else if (t = w(n.parse(e)), !A(t.protocol)) throw new m({ input: e });
		return t;
	}
	function C(e, t) {
		// istanbul ignore next
		return l ? new r(e, t) : S(n.resolve(t, e));
	}
	function w(e) {
		if (/^\[/.test(e.hostname) && !/^\[[:0-9a-f]+\]$/i.test(e.hostname) || /^\[/.test(e.host) && !/^\[[:0-9a-f]+\](:\d+)?$/i.test(e.host)) throw new m({ input: e.href || e });
		return e;
	}
	function te(e, t) {
		var n = t || {};
		for (var r of d) n[r] = e[r];
		return n.hostname.startsWith("[") && (n.hostname = n.hostname.slice(1, -1)), n.port !== "" && (n.port = Number(n.port)), n.path = n.search ? n.pathname + n.search : n.pathname, n;
	}
	function T(e, t) {
		var n;
		for (var r in t) e.test(r) && (n = t[r], delete t[r]);
		return n == null ? void 0 : String(n).trim();
	}
	function E(e, t, n) {
		function r(n) {
			j(Error.captureStackTrace) && Error.captureStackTrace(this, this.constructor), Object.assign(this, n || {}), this.code = e, this.message = this.cause ? t + ": " + this.cause.message : t;
		}
		return r.prototype = new (n || Error)(), Object.defineProperties(r.prototype, {
			constructor: {
				value: r,
				enumerable: !1
			},
			name: {
				value: "Error [" + e + "]",
				enumerable: !1
			}
		}), r;
	}
	function D(e, t) {
		for (var n of f) e.removeListener(n, p[n]);
		e.on("error", x), e.destroy(t);
	}
	function O(e, t) {
		s(A(e) && A(t));
		var n = e.length - t.length - 1;
		return n > 0 && e[n] === "." && e.endsWith(t);
	}
	function k(e) {
		return e instanceof Array;
	}
	function A(e) {
		return typeof e == "string" || e instanceof String;
	}
	function j(e) {
		return typeof e == "function";
	}
	function N(e) {
		return typeof e == "object" && "length" in e;
	}
	function P(e) {
		return r && e instanceof r;
	}
	function F(e) {
		return e.replace(/[\]\\/()*+?.$]/g, "\\$&");
	}
	t.exports = b({
		http: i,
		https: a
	}), t.exports.wrap = b;
})), ci = "1.20.0";
//#endregion
//#region node_modules/axios/lib/helpers/parseProtocol.js
function li(e) {
	let t = /^([-+\w]{1,25}):(?:\/\/)?/.exec(e);
	return t && t[1] || "";
}
//#endregion
//#region node_modules/axios/lib/helpers/fromDataURI.js
var ui = /^([^,;/]+\/[^,;/]+)?((?:;[^,;=]+=[^,;]+)*)(;base64)?,([\s\S]*)$/;
function di(e, t, n) {
	let r = n && n.Blob || Y.classes.Blob, i = li(e);
	if (t === void 0 && r && (t = !0), i === "data") {
		e = i.length ? e.slice(i.length + 1) : e;
		let n = ui.exec(e);
		if (!n) throw new J("Invalid URL", J.ERR_INVALID_URL);
		let a = n[1], o = n[2], s = n[3] ? "base64" : "utf8", c = n[4], l = "";
		a ? l = o ? a + o : a : o && (l = "text/plain" + o);
		let u = s === "base64" ? Buffer.from(c, "base64") : Buffer.from(decodeURIComponent(c), s);
		if (t) {
			if (!r) throw new J("Blob is not supported", J.ERR_NOT_SUPPORT);
			return new r([u], { type: l });
		}
		return u;
	}
	throw new J("Unsupported protocol " + i, J.ERR_NOT_SUPPORT);
}
//#endregion
//#region node_modules/axios/lib/core/setFormDataHeaders.js
var fi = ["content-type", "content-length"];
function pi(e, t, n) {
	if (n !== "content-only") {
		e.set(t);
		return;
	}
	Object.entries(t || {}).forEach(([t, n]) => {
		fi.includes(t.toLowerCase()) && e.set(t, n);
	});
}
//#endregion
//#region node_modules/axios/lib/helpers/AxiosTransformStream.js
var mi = Symbol("internals"), hi = class extends s.Transform {
	constructor(e) {
		e = K.toFlatObject(e, {
			maxRate: 0,
			chunkSize: 65536,
			minChunkSize: 100,
			timeWindow: 500,
			ticksRate: 2,
			samplesCount: 15
		}, null, (e, t) => !K.isUndefined(t[e])), super({ readableHighWaterMark: e.chunkSize });
		let t = this[mi] = {
			timeWindow: e.timeWindow,
			chunkSize: e.chunkSize,
			maxRate: e.maxRate,
			minChunkSize: e.minChunkSize,
			bytesSeen: 0,
			isCaptured: !1,
			notifiedBytesLoaded: 0,
			ts: Date.now(),
			bytes: 0,
			onReadCallback: null
		};
		this.on("newListener", (e) => {
			e === "progress" && (t.isCaptured ||= !0);
		});
	}
	_read(e) {
		let t = this[mi];
		return t.onReadCallback && t.onReadCallback(), super._read(e);
	}
	_transform(e, t, n) {
		let r = this[mi], i = r.maxRate, a = this.readableHighWaterMark, o = r.timeWindow, s = i / (1e3 / o), c = r.minChunkSize === !1 ? 0 : Math.max(r.minChunkSize, s * .01), l = (e, t) => {
			let n = Buffer.byteLength(e);
			r.bytesSeen += n, r.bytes += n, r.isCaptured && this.emit("progress", r.bytesSeen), this.push(e) ? process.nextTick(t) : r.onReadCallback = () => {
				r.onReadCallback = null, process.nextTick(t);
			};
		}, u = (e, t) => {
			let n = Buffer.byteLength(e), u = null, d = a, f, p = 0;
			if (i) {
				let e = Date.now();
				(!r.ts || (p = e - r.ts) >= o) && (r.ts = e, f = s - r.bytes, r.bytes = f < 0 ? -f : 0, p = 0), f = s - r.bytes;
			}
			if (i) {
				if (f <= 0) return setTimeout(() => {
					t(null, e);
				}, o - p);
				f < d && (d = f);
			}
			d && n > d && n - d > c && (u = e.subarray(d), e = e.subarray(0, d)), l(e, u ? () => {
				process.nextTick(t, null, u);
			} : t);
		};
		u(e, function e(t, r) {
			if (t) return n(t);
			r ? u(r, e) : n(null);
		});
	}
}, { asyncIterator: gi } = Symbol, _i = async function* (e) {
	e.stream ? yield* e.stream() : e.arrayBuffer ? yield await e.arrayBuffer() : e[gi] ? yield* e[gi]() : yield e;
}, vi = Y.ALPHABET.ALPHA_DIGIT + "-_", yi = typeof TextEncoder == "function" ? new TextEncoder() : new o.TextEncoder(), bi = "\r\n", xi = yi.encode(bi), Si = 2, Ci = class {
	constructor(e, t) {
		let { escapeName: n } = this.constructor, r = K.isString(t), i = `Content-Disposition: form-data; name="${n(e)}"${!r && t.name ? `; filename="${n(t.name)}"` : ""}${bi}`;
		if (r) t = yi.encode(String(t).replace(/\r?\n|\r\n?/g, bi));
		else {
			let e = String(t.type || "application/octet-stream").replace(/[\r\n]/g, "");
			i += `Content-Type: ${e}${bi}`;
		}
		this.headers = yi.encode(i + bi), this.contentLength = r ? t.byteLength : t.size, this.size = this.headers.byteLength + this.contentLength + Si, this.name = e, this.value = t;
	}
	async *encode() {
		yield this.headers;
		let { value: e } = this;
		K.isTypedArray(e) ? yield e : yield* _i(e), yield xi;
	}
	static escapeName(e) {
		return String(e).replace(/[\r\n"]/g, (e) => ({
			"\r": "%0D",
			"\n": "%0A",
			"\"": "%22"
		})[e]);
	}
}, wi = (e, t, n) => {
	let { tag: r = "form-data-boundary", size: i = 25, boundary: a = r + "-" + Y.generateString(i, vi) } = n || {};
	if (!K.isFormData(e)) throw TypeError("FormData instance required");
	if (a.length < 1 || a.length > 70) throw Error("boundary must be 1-70 characters long");
	let o = yi.encode("--" + a + bi), s = yi.encode("--" + a + "--\r\n"), l = s.byteLength, u = Array.from(e.entries()).map(([e, t]) => {
		let n = new Ci(e, t);
		return l += n.size, n;
	});
	l += o.byteLength * u.length, l = K.toFiniteNumber(l);
	let d = { "Content-Type": `multipart/form-data; boundary=${a}` };
	return Number.isFinite(l) && (d["Content-Length"] = l), t && t(d), c.from((async function* () {
		for (let e of u) yield o, yield* e.encode();
		yield s;
	})());
}, Ti = class extends s.Transform {
	__transform(e, t, n) {
		this.push(e), n();
	}
	_transform(e, t, n) {
		if (e.length !== 0 && (this._transform = this.__transform, e[0] !== 120)) {
			let e = Buffer.alloc(2);
			e[0] = 120, e[1] = 156, this.push(e, t);
		}
		this.__transform(e, t, n);
	}
}, Ei = class {
	constructor() {
		this.sessions = Object.create(null);
	}
	getSession(e, t) {
		t = Object.assign(Object.create(null), { sessionTimeout: 1e3 }, t);
		let n = this.sessions[e];
		if (n) {
			let e = n.length;
			for (let r = 0; r < e; r++) {
				let [e, i] = n[r];
				if (!e.destroyed && !e.closed && o.isDeepStrictEqual(i, t)) return e;
			}
		}
		let r = v.connect(e, t), i, a, s = () => {
			if (i) return;
			i = !0, a &&= (clearTimeout(a), null);
			let t = n, o = t.length, s = o;
			for (; s--;) if (t[s][0] === r) {
				o === 1 ? delete this.sessions[e] : t.splice(s, 1), r.closed || r.close();
				return;
			}
		}, c = r.request, { sessionTimeout: l } = t;
		if (l != null) {
			let e = 0;
			r.request = function() {
				let t = c.apply(this, arguments);
				return e++, a &&= (clearTimeout(a), null), t.once("close", () => {
					--e || (a = setTimeout(() => {
						a = null, s();
					}, l));
				}), t;
			};
		}
		r.once("close", s), r.once("error", s);
		let u = [r, t];
		return n ? n.push(u) : n = this.sessions[e] = [u], r;
	}
}, Di = (e, t) => K.isAsyncFn(e) ? function(...n) {
	let r = n.pop();
	e.apply(this, n).then((e) => {
		try {
			t ? r(null, ...t(e)) : r(null, e);
		} catch (e) {
			r(e);
		}
	}, r);
} : e, Oi = /* @__PURE__ */ new Set(["localhost", "0.0.0.0"]), ki = (e) => {
	let t = e.length;
	for (; t && e.charCodeAt(t - 1) === 46;) t--;
	return t === e.length ? e : e.slice(0, t);
}, Ai = (e) => {
	let t = e.split(".");
	return t.length !== 4 || t[0] !== "127" ? !1 : t.every((e) => /^\d+$/.test(e) && Number(e) >= 0 && Number(e) <= 255);
}, ji = (e) => {
	if (/^0[xX][0-9a-fA-F]+$/.test(e)) {
		let t = parseInt(e.slice(2), 16);
		return Number.isFinite(t) ? t : null;
	}
	if (e.length > 1 && /^0[0-7]+$/.test(e)) {
		let t = parseInt(e, 8);
		return Number.isFinite(t) ? t : null;
	}
	if (e.length > 1 && /^0[0-9]+$/.test(e)) return null;
	if (/^[0-9]+$/.test(e)) {
		let t = parseInt(e, 10);
		return Number.isFinite(t) ? t : null;
	}
	return null;
}, Mi = (e) => {
	if (typeof e != "string" || !e || e.indexOf(":") !== -1) return e;
	let t = e;
	if (t.charAt(0) === "[" && t.charAt(t.length - 1) === "]" && (t = t.slice(1, -1)), t = ki(t), !/^[0-9.xXa-fA-F]+$/.test(t)) return e;
	let n = t.split(".");
	if (n.some((e) => e === "")) return e;
	if (n.length === 4) {
		let t = n.map(ji);
		return t.some((e) => e === null || e < 0 || e > 255) ? e : t.join(".");
	}
	if (n.length > 4 || n.length === 1) return e;
	let r = n.slice(0, -1), i = n[n.length - 1], a = 4 - r.length, o = ji(i);
	if (o === null) return e;
	let s = (1 << 8 * a) - 1;
	if (o < 0 || o > s) return e;
	let c = Array(a).fill(0);
	for (let e = a - 1, t = o; e >= 0; e--, t >>= 8) c[e] = t & 255;
	let l = r.map(ji);
	return l.some((e) => e === null || e < 0 || e > 255) ? e : [...l, ...c].join(".");
}, Ni = (e) => /^0{1,4}$/.test(e), Pi = (e) => {
	if (e === "::") return !0;
	let t = e.indexOf("::");
	if (t !== -1) {
		if (t !== e.lastIndexOf("::")) return !1;
		let n = e.slice(0, t), r = e.slice(t + 2), i = n ? n.split(":") : [], a = r ? r.split(":") : [];
		return i.length + a.length < 8 && i.every(Ni) && a.every(Ni);
	}
	let n = e.split(":");
	return n.length === 8 && n.every(Ni);
}, Fi = (e) => {
	if (e === "::1") return !0;
	let t = e.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/i);
	if (t) return Ai(t[1]);
	let n = e.match(/^::ffff:([0-9a-f]{1,4}):([0-9a-f]{1,4})$/i);
	if (n) {
		let e = parseInt(n[1], 16);
		return e >= 32512 && e <= 32767;
	}
	let r = e.split(":");
	if (r.length === 8) {
		for (let e = 0; e < 7; e++) if (!/^0+$/.test(r[e])) return !1;
		return /^0*1$/.test(r[7]);
	}
	return !1;
}, Ii = (e) => e ? Oi.has(e) || Ai(e) || Pi(e) ? !0 : Fi(e) : !1, Li = {
	http: 80,
	https: 443,
	ws: 80,
	wss: 443,
	ftp: 21
}, Ri = (e) => {
	let t = e, n = 0;
	if (t.charAt(0) === "[") {
		let e = t.indexOf("]");
		if (e !== -1) {
			let r = t.slice(1, e), i = t.slice(e + 1);
			return i.charAt(0) === ":" && /^\d+$/.test(i.slice(1)) && (n = Number.parseInt(i.slice(1), 10)), [r, n];
		}
	}
	let r = t.indexOf(":"), i = t.lastIndexOf(":");
	return r !== -1 && r === i && /^\d+$/.test(t.slice(i + 1)) && (n = Number.parseInt(t.slice(i + 1), 10), t = t.slice(0, i)), [t, n];
}, zi = /^(?:::|(?:0{1,4}:){1,4}:|(?:0{1,4}:){5})ffff:(\d+\.\d+\.\d+\.\d+)$/i, Bi = /^(?:::|(?:0{1,4}:){1,4}:|(?:0{1,4}:){5})ffff:([0-9a-f]{1,4}):([0-9a-f]{1,4})$/i, Vi = (e) => {
	if (typeof e != "string" || e.indexOf(":") === -1) return e;
	let t = e.match(zi);
	if (t) return t[1];
	let n = e.match(Bi);
	if (n) {
		let e = parseInt(n[1], 16), t = parseInt(n[2], 16);
		return `${e >> 8}.${e & 255}.${t >> 8}.${t & 255}`;
	}
	return e;
}, Hi = /^(?:0|[1-9]\d{0,2})$/, Ui = (e) => {
	let t = e.split(".");
	return t.length === 4 && t.every((e) => Hi.test(e) && Number(e) <= 255) ? t.map(Number) : null;
}, Wi = /^[0-9a-f]{1,4}$/i, Gi = (e) => {
	let t = e.split("::");
	if (t.length > 2) return null;
	let n = t[0] ? t[0].split(":") : [];
	if (t.length === 2) {
		let e = t[1] ? t[1].split(":") : [], r = 8 - n.length - e.length;
		if (r < 1) return null;
		n.push(...Array(r).fill("0"), ...e);
	}
	return n.length !== 8 || n.some((e) => !Wi.test(e)) ? null : n.flatMap((e) => {
		let t = Number.parseInt(e, 16);
		return [t >> 8 & 255, t & 255];
	});
}, Ki = (e) => typeof e != "string" || !e ? null : e.indexOf(":") === -1 ? Ui(e) : Gi(e), qi = (e) => {
	if (!e) return e;
	e.charAt(0) === "[" && e.charAt(e.length - 1) === "]" && (e = e.slice(1, -1));
	let t = ki(e), n = Mi(t);
	return n === t ? Vi(t) : n;
}, Ji = (e) => {
	let t = e, n = t.charAt(0) === "[", r = t.charAt(t.length - 1) === "]", i = t.includes("[") || t.includes("]");
	if (n || r) {
		if (!n || !r || (t = t.slice(1, -1), t.indexOf(":") === -1 || t.includes("[") || t.includes("]"))) return null;
	} else if (i) return null;
	if (!t || t.charAt(t.length - 1) === ".") return null;
	let a = t.indexOf(":") !== -1;
	if (a) try {
		t = new URL(`http://[${t}]/`).hostname.slice(1, -1);
	} catch {
		return null;
	}
	else if (t = Mi(t), !Ui(t)) return null;
	return {
		normalized: Vi(t),
		wasIPv6: a
	};
}, Yi = /^(.+)\/(0|[1-9]\d{0,2})$/, Xi = (e) => {
	if (e.indexOf("/") === -1) return;
	let t = Yi.exec(e);
	if (!t) return null;
	let n = Number(t[2]), r = Ji(t[1]);
	if (!r) return null;
	let { normalized: i, wasIPv6: a } = r;
	if (a && i.indexOf(":") === -1) {
		if (n < 96) return null;
		n -= 96;
	}
	let o = Ki(i);
	return !o || n > o.length * 8 ? null : {
		bytes: o,
		prefix: n
	};
}, Zi = (e, t, n) => {
	let r = n >> 3;
	for (let n = 0; n < r; n++) if (e[n] !== t[n]) return !1;
	let i = n & 7;
	if (i) {
		let n = 255 << 8 - i & 255;
		if ((e[r] & n) !== (t[r] & n)) return !1;
	}
	return !0;
};
function Qi(e) {
	let t;
	try {
		t = new URL(e);
	} catch {
		return !1;
	}
	let n = (process.env.no_proxy || process.env.NO_PROXY || "").toLowerCase();
	if (!n) return !1;
	if (n === "*") return !0;
	let r = Number.parseInt(t.port, 10) || Li[t.protocol.split(":", 1)[0]] || 0, i = qi(t.hostname.toLowerCase()), a = Ki(i);
	return n.split(/[\s,]+/).some((e) => {
		if (!e) return !1;
		if (e === "*") return !0;
		let t = Xi(e);
		if (t !== void 0) return t !== null && !!a && a.length === t.bytes.length && Zi(a, t.bytes, t.prefix);
		let [n, o] = Ri(e);
		return n = qi(n), !n || o && o !== r ? !1 : (n.charAt(0) === "*" && (n = n.slice(1)), n.charAt(0) === "." ? i.endsWith(n) : i === n || Ii(i) && Ii(n));
	});
}
//#endregion
//#region node_modules/axios/lib/helpers/speedometer.js
function $i(e, t) {
	e ||= 10;
	let n = Array(e), r = Array(e), i = 0, a = 0, o;
	return t = t === void 0 ? 1e3 : t, function(s) {
		let c = Date.now(), l = r[a];
		o ||= c, n[i] = s, r[i] = c;
		let u = a, d = 0;
		for (; u !== i;) d += n[u++], u %= e;
		if (i = (i + 1) % e, i === a && (a = (a + 1) % e), c - o < t) return;
		let f = l && c - l;
		return f ? Math.round(d * 1e3 / f) : void 0;
	};
}
//#endregion
//#region node_modules/axios/lib/helpers/throttle.js
function ea(e, t) {
	let n = 0, r = 1e3 / t, i, a, o = (t, r = Date.now()) => {
		n = r, i = null, a &&= (clearTimeout(a), null), e(...t);
	};
	return [
		(...e) => {
			let t = Date.now(), s = t - n;
			s >= r ? o(e, t) : (i = e, a ||= setTimeout(() => {
				a = null, o(i);
			}, r - s));
		},
		() => i && o(i),
		(...e) => o(e)
	];
}
//#endregion
//#region node_modules/axios/lib/helpers/progressEventReducer.js
var ta = (e, t, n = 3) => {
	let r = 0, i = $i(50, 250);
	return ea((n) => {
		if (!n || !K.isNumber(n.loaded)) return;
		let a = n.loaded, o = n.lengthComputable ? n.total : void 0, s = Math.max(0, o == null ? a : Math.min(a, o)), c = Math.max(0, s - r), l = i(c);
		r = Math.max(r, s), e({
			loaded: s,
			total: o,
			progress: o ? s / o : void 0,
			bytes: c,
			rate: l || void 0,
			estimated: l && o ? (o - s) / l : void 0,
			event: n,
			lengthComputable: o != null,
			[t ? "download" : "upload"]: !0
		});
	}, n);
}, na = (e, t) => {
	let n = e != null;
	return [(r) => t[0]({
		lengthComputable: n,
		total: e,
		loaded: r
	}), t[1]];
}, ra = (e, t = K.asap) => (...n) => t(() => e(...n)), ia = (e) => e >= 48 && e <= 57 || e >= 65 && e <= 70 || e >= 97 && e <= 102, aa = (e, t, n) => t + 2 < n && ia(e.charCodeAt(t + 1)) && ia(e.charCodeAt(t + 2)), oa = (e) => e <= 57 ? e - 48 : (e & 223) - 55, sa = (e) => e >= 65 && e <= 90 || e >= 97 && e <= 122 || e >= 48 && e <= 57 || e === 43 || e === 47 || e === 45 || e === 95, ca = (e) => e === 9 || e === 10 || e === 12 || e === 13 || e === 32, la = (e) => {
	let t = Math.floor(e / 4), n = e % 4;
	return t * 3 + (n === 2 ? 1 : n === 3 ? 2 : 0);
}, ua = (e) => {
	let t = e.length, n = 0;
	return t > 0 && e.charCodeAt(t - 1) === 61 && (n++, t > 1 && e.charCodeAt(t - 2) === 61 && n++), Math.floor((t - n) * 3 / 4);
}, da = (e) => {
	let t = e.length, n = 0, r = 0, i = !1;
	for (let a = 0; a < t; a++) {
		let o = e.charCodeAt(a);
		if (o === 37 && aa(e, a, t) && (o = oa(e.charCodeAt(a + 1)) * 16 + oa(e.charCodeAt(a + 2)), a += 2), !ca(o)) {
			if (o === 61) {
				r++;
				continue;
			}
			if (!sa(o) || r > 0) {
				i = !0;
				continue;
			}
			n++;
		}
	}
	return i || r > 2 || r > 0 && (n + r) % 4 != 0 || n % 4 == 1 ? ua(e) : la(n);
}, fa = (e, t) => {
	if (!e || typeof e != "string" || !e.startsWith("data:")) return 0;
	let n = e.indexOf(",");
	if (n < 0) return 0;
	let r = e.slice(5, n), i = e.slice(n + 1);
	if (/;base64/i.test(r)) return t(i);
	let a = 0;
	for (let e = 0, t = i.length; e < t; e++) {
		let n = i.charCodeAt(e);
		if (n === 37 && aa(i, e, t)) a += 1, e += 2;
		else if (n < 128) a += 1;
		else if (n < 2048) a += 2;
		else if (n >= 55296 && n <= 56319 && e + 1 < t) {
			let t = i.charCodeAt(e + 1);
			t >= 56320 && t <= 57343 ? (a += 4, e++) : a += 3;
		} else a += 3;
	}
	return a;
};
function pa(e) {
	let t = typeof e == "string" ? e.indexOf("#") : -1;
	return fa(t === -1 ? e : e.slice(0, t), da);
}
function ma(e) {
	return fa(e, ua);
}
//#endregion
//#region node_modules/axios/lib/adapters/http.js
var ha = /* @__PURE__ */ A(ai(), 1), ga = /* @__PURE__ */ A(si(), 1), _a = {
	flush: y.constants.Z_SYNC_FLUSH,
	finishFlush: y.constants.Z_SYNC_FLUSH
}, va = {
	flush: y.constants.BROTLI_OPERATION_FLUSH,
	finishFlush: y.constants.BROTLI_OPERATION_FLUSH
}, ya = {
	flush: y.constants.ZSTD_e_flush,
	finishFlush: y.constants.ZSTD_e_flush
}, ba = K.isFunction(y.createBrotliDecompress), xa = K.isFunction(y.createZstdDecompress), Sa = "gzip, compress, deflate" + (ba ? ", br" : ""), Ca = Sa + (xa ? ", zstd" : ""), wa = typeof process < "u" && process.nextTick ? process.nextTick.bind(process) : K.asap, { http: Ta, https: Ea } = ga.default, Da = /https:?/, Oa = Symbol("axios.http.socketListener"), ka = Symbol("axios.http.currentReq");
function Aa(e) {
	let t = this[ka];
	t && !t.destroyed && t.destroy(e);
}
var ja = Symbol("axios.http.installedTunnel"), Ma = /* @__PURE__ */ new Map(), Na = /* @__PURE__ */ new WeakMap(), Pa = {
	22: 21,
	24: 5
};
function Fa(e = process.versions && process.versions.node) {
	if (!e) return !1;
	let [t, n] = e.split(".").map((e) => Number(e));
	return !Number.isInteger(t) || !Number.isInteger(n) ? !1 : t > 24 || Pa[t] != null && n >= Pa[t];
}
function Ia(e, t = process.versions && process.versions.node) {
	if (!Fa(t)) return !1;
	let n = e && e.options;
	return !!(n && K.hasOwnProp(n, "proxyEnv") && n.proxyEnv != null);
}
function La(e, t, n) {
	return Da.test(e.protocol) ? n || d.globalAgent : t || u.globalAgent;
}
function Ra(e, t) {
	let n = e.protocol + "//" + e.hostname + ":" + (e.port || "") + "#" + (e.auth || ""), r = t ? Na.get(t) || Na.set(t, /* @__PURE__ */ new Map()).get(t) : Ma, i = r.get(n);
	if (i) return i;
	let a = t && t.options ? {
		...t.options,
		...e
	} : e;
	if (i = new ha.default(a), t && t.options) {
		let e = { ...t.options }, n = i.callback;
		i.callback = function(t, r) {
			return n.call(this, t, {
				...e,
				...r
			});
		};
	}
	return i[ja] = !0, r.set(n, i), i;
}
var za = Y.protocols.map((e) => e + ":"), Ba = (e) => {
	if (!K.isString(e)) return e;
	try {
		return decodeURIComponent(e);
	} catch {
		return e;
	}
}, Va = (e, [t, n]) => (e.on("end", n).on("error", n), t), Ha = new Ei();
function Ua(e, t, n) {
	e.beforeRedirects.proxy && e.beforeRedirects.proxy(e), e.beforeRedirects.auth && e.beforeRedirects.auth(e), e.beforeRedirects.sensitiveHeaders && e.beforeRedirects.sensitiveHeaders(e, n), e.beforeRedirects.config && e.beforeRedirects.config(e, t, n);
}
function Wa(e, t) {
	e && Object.keys(e).forEach((n) => {
		t.has(n.toLowerCase()) && delete e[n];
	});
}
function Ga(e, t) {
	if (!t) return !1;
	try {
		return new URL(t.url).origin === new URL(e.href).origin;
	} catch {
		return !1;
	}
}
function Ka(e, t, n, r, i, a, o = !0) {
	let s = t, c = La(e, a, i);
	if (!s && s !== !1 && o && !Ia(c)) {
		let e = Rr(n);
		e && (Qi(n) || (s = new URL(e)));
	}
	if (r && e.headers) for (let t of Object.keys(e.headers)) t.toLowerCase() === "proxy-authorization" && delete e.headers[t];
	if (r && e.agent && e.agent[ja] && (e.agent = void 0), s) {
		let t = s instanceof URL, r = (e) => t || K.hasOwnProp(s, e) ? s[e] : void 0, a = r("username"), o = r("password"), c = K.hasOwnProp(s, "auth") ? s.auth : void 0;
		if (a && (c = (a || "") + ":" + (o || "")), c) {
			let e = typeof c == "object", t = e && K.hasOwnProp(c, "username") ? c.username : void 0, n = e && K.hasOwnProp(c, "password") ? c.password : void 0;
			if (t || n) c = (t || "") + ":" + (n || "");
			else if (e) throw new J("Invalid proxy authorization", J.ERR_BAD_OPTION, { proxy: s });
		}
		if (Da.test(e.protocol)) {
			if (!(i instanceof ha.default)) {
				let t = r("hostname") || r("host"), n = r("port"), a = r("protocol"), o = a ? a.includes(":") ? a : `${a}:` : "http:", s = t && t.includes(":") && !t.startsWith("[") ? `[${t}]` : t, l = new URL(`${o}//${s}${n ? ":" + n : ""}`), u = {
					protocol: l.protocol,
					hostname: l.hostname.replace(/^\[|\]$/g, ""),
					port: l.port,
					auth: c && typeof c == "string" ? c : void 0
				};
				l.protocol === "https:" && (u.ALPNProtocols = ["http/1.1"]);
				let d = Ra(u, i);
				e.agent = d, e.agents && (e.agents.https = d);
			}
		} else {
			if (c) {
				let t = Buffer.from(c, "utf8").toString("base64");
				e.headers["Proxy-Authorization"] = "Basic " + t;
			}
			let t = !1;
			for (let n of Object.keys(e.headers)) if (n.toLowerCase() === "host") {
				t = !0;
				break;
			}
			t || (e.headers.host = e.hostname + (e.port ? ":" + e.port : ""));
			let i = r("hostname") || r("host");
			e.hostname = i, e.host = i, e.port = r("port"), e.path = n;
			let a = r("protocol");
			a && (e.protocol = a.includes(":") ? a : `${a}:`);
		}
	}
	return e.beforeRedirects.proxy = function(e) {
		Ka(e, t, e.href, !0, i, a, o);
	}, !!(s || t !== !1 && o && Ia(c));
}
var qa = typeof process < "u" && K.kindOf(process) === "process", Ja = (e) => new Promise((t, n) => {
	let r, i, a = (e, t) => {
		i || (i = !0, r && r(e, t));
	}, o = (e) => {
		a(e), t(e);
	}, s = (e) => {
		a(e, !0), n(e);
	};
	e(o, s, (e) => r = e).catch(s);
}), Ya = ({ address: e, family: t }) => {
	if (!K.isString(e)) throw new J("address must be a string", J.ERR_BAD_OPTION_VALUE);
	return {
		address: e,
		family: t || (e.indexOf(".") < 0 ? 6 : 4)
	};
}, Xa = (e, t) => Ya(K.isObject(e) ? e : {
	address: e,
	family: t
}), Za = /* @__PURE__ */ new WeakMap(), Qa = (e) => {
	let t = Za.get(e);
	if (t) return t;
	let n = Di(e, (e) => K.isArray(e) ? e : [e]);
	return t = (e, t, r) => {
		n(e, t, (e, n, i) => {
			if (e) return r(e);
			let a;
			try {
				a = K.isArray(n) ? n.map((e) => Xa(e)) : [Xa(n, i)];
			} catch (e) {
				return r(e);
			}
			t.all ? r(e, a) : r(e, a[0].address, a[0].family);
		});
	}, Za.set(e, t), t;
}, $a = { request(e, t) {
	let n = e.protocol + "//" + e.hostname + ":" + (e.port || (e.protocol === "https:" ? 443 : 80)), { http2Options: r, headers: i } = e, a = Ha.getSession(n, r), { HTTP2_HEADER_SCHEME: o, HTTP2_HEADER_METHOD: s, HTTP2_HEADER_PATH: c, HTTP2_HEADER_STATUS: l } = v.constants, u = {
		[o]: e.protocol.replace(":", ""),
		[s]: e.method,
		[c]: e.path
	};
	K.forEach(i, (e, t) => {
		t.charAt(0) !== ":" && (u[t] = e);
	});
	let d = a.request(u);
	return d.once("response", (e) => {
		let n = d;
		e = Object.assign({}, e);
		let r = e[l];
		delete e[l], n.headers = e, n.statusCode = +r, t(n);
	}), d;
} }, eo = qa && function(e) {
	return Ja(async function(t, n, r) {
		let i = (t) => K.getSafeProp(e, t), a = i("transitional") || tr, c = i("data"), f = i("lookup"), p = i("family"), m = i("httpVersion");
		m === void 0 && (m = 1);
		let h = m, g = i("http2Options"), _ = i("httpAgent"), v = i("httpsAgent"), b = i("proxy"), x = i("responseType"), S = i("responseEncoding"), C = i("socketPath"), w = i("method").toUpperCase(), te = i("maxRedirects"), T = i("maxBodyLength"), E = i("maxContentLength"), D = i("decompress"), O, k = !1, A, j;
		try {
			m = +m;
		} catch {
			throw new J("Invalid protocol version: value is not a number", J.ERR_BAD_OPTION_VALUE, e);
		}
		if (Number.isNaN(m)) throw new J(`Invalid protocol version: '${h}' is not a number`, J.ERR_BAD_OPTION_VALUE, e);
		if (m !== 1 && m !== 2) throw new J(`Unsupported protocol version '${m}'`, J.ERR_BAD_OPTION_VALUE, e);
		let M = m === 2;
		f &&= Qa(f);
		let N = new ee();
		function P(t) {
			try {
				N.emit("abort", !t || t.type ? new Tr(null, e, A) : t);
			} catch {}
		}
		function F() {
			j &&= (clearTimeout(j), null);
		}
		function I() {
			let t = i("timeout"), n = t ? "timeout of " + t + "ms exceeded" : "timeout exceeded", r = i("timeoutErrorMessage");
			return r && (n = r), new J(n, a.clarifyTimeoutError ? J.ETIMEDOUT : J.ECONNABORTED, e, A);
		}
		N.once("abort", n);
		let L = () => {
			F(), e.cancelToken && e.cancelToken.unsubscribe(P), e.signal && e.signal.removeEventListener("abort", P), N.removeAllListeners();
		};
		(e.cancelToken || e.signal) && (e.cancelToken && e.cancelToken.subscribe(P), e.signal && (e.signal.aborted ? P() : e.signal.addEventListener("abort", P))), r((e, t) => {
			if (O = !0, F(), t) {
				k = !0, L();
				return;
			}
			let { data: n } = e;
			if (n instanceof s.Readable || n instanceof s.Duplex) {
				let e = s.finished(n, () => {
					e(), L();
				});
			} else L();
		});
		let R = Fr(i("baseURL"), i("url"), i("allowAbsoluteUrls"), e), ne = C ? "http://localhost" : Y.hasBrowserEnv ? Y.origin : void 0, z = new URL(R, ne), B = z.protocol || za[0];
		if (B === "data:") {
			if (E > -1 && ma(String(i("url") || R || "")) > E) return n(new J("maxContentLength size of " + E + " exceeded", J.ERR_BAD_RESPONSE, e));
			let r;
			if (w !== "GET") return Er(t, n, {
				status: 405,
				statusText: "method not allowed",
				headers: {},
				config: e
			});
			try {
				r = di(i("url"), x === "blob", { Blob: e.env && e.env.Blob });
			} catch (t) {
				throw J.from(t, J.ERR_BAD_REQUEST, e);
			}
			return x === "text" ? (r = r.toString(S), (!S || S === "utf8") && (r = K.stripBOM(r))) : x === "stream" && (r = s.Readable.from(r)), Er(t, n, {
				data: r,
				status: 200,
				statusText: "OK",
				headers: new q(),
				config: e
			});
		}
		if (za.indexOf(B) === -1) return n(new J("Unsupported protocol " + B, J.ERR_BAD_REQUEST, e));
		let V = q.from(e.headers).normalize();
		V.set("User-Agent", "axios/1.20.0", !1);
		let { onUploadProgress: re, onDownloadProgress: ie } = e, ae = e.maxRate, H, oe;
		if (K.isSpecCompliantForm(c)) {
			let e = V.getContentType(/boundary=([-_\w\d]{10,70})/i);
			c = wi(c, (e) => {
				V.set(e);
			}, {
				tag: "axios-1.20.0-boundary",
				boundary: e && e[1] || void 0
			});
		} else if (K.isFormData(c) && K.isFunction(c.getHeaders) && c.getHeaders !== Object.prototype.getHeaders) {
			if (pi(V, c.getHeaders(), i("formDataHeaderPolicy")), !V.hasContentLength()) try {
				let e = await o.promisify(c.getLength).call(c);
				Number.isFinite(e) && e >= 0 && V.setContentLength(e);
			} catch {}
		} else if (K.isBlob(c) || K.isFile(c)) c.size && V.setContentType(c.type || "application/octet-stream"), V.setContentLength(c.size || 0), c = s.Readable.from(_i(c));
		else if (c && !K.isStream(c)) {
			if (!Buffer.isBuffer(c)) {
				if (K.isArrayBuffer(c)) c = Buffer.from(new Uint8Array(c));
				else if (K.isString(c)) c = Buffer.from(c, "utf-8");
				else return n(new J("Data after transformation must be a string, an ArrayBuffer, a Buffer, or a Stream", J.ERR_BAD_REQUEST, e));
			}
			if (V.setContentLength(c.length, !1), T > -1 && c.length > T) return n(new J("Request body larger than maxBodyLength limit", J.ERR_BAD_REQUEST, e));
		}
		let se = K.toFiniteNumber(V.getContentLength());
		K.isArray(ae) ? (H = ae[0], oe = ae[1]) : H = oe = ae, c && (re || H) && (K.isStream(c) || (c = s.Readable.from(c, { objectMode: !1 })), c = s.pipeline([c, new hi({ maxRate: K.toFiniteNumber(H) })], K.noop), re && c.on("progress", Va(c, na(se, ta(ra(re, wa), !1, 3)))));
		let U, ce = i("auth");
		if (ce) {
			let e = K.getSafeProp(ce, "username") || "", t = K.getSafeProp(ce, "password") || "";
			U = e + ":" + t;
		}
		if (!U && (z.username || z.password)) {
			let e = Ba(z.username), t = Ba(z.password);
			U = e + ":" + t;
		}
		U && V.delete("authorization");
		let le;
		try {
			le = Yn(z.pathname + z.search, i("params"), i("paramsSerializer")).replace(/^\?/, "");
		} catch (t) {
			return n(J.from(t, J.ERR_BAD_REQUEST, e, null, null, {
				url: i("url"),
				exists: !0
			}));
		}
		V.set("Accept-Encoding", K.hasOwnProp(a, "advertiseZstdAcceptEncoding") && a.advertiseZstdAcceptEncoding === !0 ? Ca : Sa, !1), M && f && (g = Object.assign(Object.create(null), g, { lookup: f }));
		let W = Object.assign(Object.create(null), {
			path: le,
			method: w,
			headers: vt(V),
			agents: {
				http: _,
				https: v
			},
			auth: U,
			protocol: B,
			family: p,
			beforeRedirect: Ua,
			beforeRedirects: Object.create(null),
			http2Options: g,
			createConnection: void 0
		});
		!K.isUndefined(f) && (W.lookup = f);
		let ue = !1;
		if (C) {
			if (typeof C != "string") return n(new J("socketPath must be a string", J.ERR_BAD_OPTION_VALUE, e));
			let t = i("allowedSocketPaths");
			if (t != null) {
				let r = Array.isArray(t) ? t : [t], i = l(C);
				if (!r.some((e) => typeof e == "string" && l(e) === i)) return n(new J(`socketPath "${C}" is not permitted by allowedSocketPaths`, J.ERR_BAD_OPTION_VALUE, e));
			}
			W.socketPath = C;
		} else W.hostname = z.hostname.startsWith("[") ? z.hostname.slice(1, -1) : z.hostname, W.port = z.port, ue = Ka(W, b, B + "//" + z.hostname + (z.port ? ":" + z.port : "") + W.path, !1, v, _, !M);
		let G, de = !1, fe = !1, pe = Da.test(W.protocol);
		if (W.agent ??= pe ? v : _, M) {
			if (ue) return n(new J("HTTP/2 requests with a proxy are not supported", J.ERR_NOT_SUPPORT, e));
			G = $a;
		} else {
			let t = i("transport");
			if (t) G = t;
			else if (te === 0) G = pe ? d : u, de = !0;
			else {
				fe = !0, W.sensitiveHeaders = [], te && (W.maxRedirects = te);
				let t = i("beforeRedirect");
				if (t && (W.beforeRedirects.config = t), U) {
					let e = z.origin, t = U;
					W.beforeRedirects.auth = function(n) {
						try {
							new URL(n.href).origin === e && (n.auth = t);
						} catch {}
					};
				}
				let r = i("sensitiveHeaders");
				if (r != null) {
					if (!K.isArray(r)) return n(new J("sensitiveHeaders must be an array of strings", J.ERR_BAD_OPTION_VALUE, e));
					let t = /* @__PURE__ */ new Set();
					for (let i of r) {
						if (!K.isString(i)) return n(new J("sensitiveHeaders must be an array of strings", J.ERR_BAD_OPTION_VALUE, e));
						t.add(i.toLowerCase());
					}
					t.size && (W.sensitiveHeaders = Array.from(t), W.beforeRedirects.sensitiveHeaders = function(e, n) {
						Ga(e, n) || Wa(e.headers, t);
					});
				}
				G = pe ? Ea : Ta;
			}
		}
		W.maxBodyLength = T > -1 ? T : Infinity, W.insecureHTTPParser = !!i("insecureHTTPParser"), A = G.request(W, function(r) {
			if (F(), A.destroyed) return;
			let i = [r], a = K.toFiniteNumber(r.headers["content-length"]);
			if (ie || oe) {
				let e = new hi({ maxRate: K.toFiniteNumber(oe) });
				ie && e.on("progress", Va(e, na(a, ta(ra(ie, wa), !0, 3)))), i.push(e);
			}
			let o = r, c = r.req || A;
			if (D !== !1 && r.headers["content-encoding"]) switch ((w === "HEAD" || r.statusCode === 204) && delete r.headers["content-encoding"], (r.headers["content-encoding"] || "").toLowerCase()) {
				case "gzip":
				case "x-gzip":
				case "compress":
				case "x-compress":
					i.push(y.createUnzip(_a)), delete r.headers["content-encoding"];
					break;
				case "deflate":
					i.push(new Ti()), i.push(y.createUnzip(_a)), delete r.headers["content-encoding"];
					break;
				case "br":
					ba && (i.push(y.createBrotliDecompress(va)), delete r.headers["content-encoding"]);
					break;
				case "zstd": xa && (i.push(y.createZstdDecompress(ya)), delete r.headers["content-encoding"]);
			}
			o = i.length > 1 ? s.pipeline(i, K.noop) : i[0];
			let l = {
				status: r.statusCode,
				statusText: r.statusMessage,
				headers: new q(r.headers),
				config: e,
				request: c
			};
			if (x === "stream") {
				if (E > -1) {
					let t = E, n = o;
					async function* r() {
						let r = 0;
						for await (let i of n) {
							if (r += i.length, r > t) throw new J("maxContentLength size of " + t + " exceeded", J.ERR_BAD_RESPONSE, e, c);
							yield i;
						}
					}
					o = s.Readable.from(r(), { objectMode: !1 });
				}
				l.data = o, Er(t, n, l);
			} else {
				let r = [], i = 0;
				o.on("data", function(t) {
					r.push(t), i += t.length, E > -1 && i > E && (k = !0, o.destroy(), P(new J("maxContentLength size of " + E + " exceeded", J.ERR_BAD_RESPONSE, e, c)));
				}), o.on("aborted", function() {
					if (k) return;
					let t = new J("stream has been aborted", J.ERR_BAD_RESPONSE, e, c, l);
					o.destroy(t), n(t);
				}), o.on("error", function(t) {
					k || n(J.from(t, null, e, c, l));
				}), o.on("end", function() {
					try {
						let e = r.length === 1 ? r[0] : Buffer.concat(r);
						x !== "arraybuffer" && (e = e.toString(S), (!S || S === "utf8") && (e = K.stripBOM(e))), l.data = e;
					} catch (t) {
						return n(J.from(t, null, e, l.request, l));
					}
					Er(t, n, l);
				});
			}
			N.once("abort", (e) => {
				o.destroyed || (o.emit("error", e), o.destroy());
			});
		}), N.once("abort", (e) => {
			A.close ? A.close() : A.destroy(e);
		}), A.on("error", function(t) {
			n(J.from(t, null, e, A));
		});
		let me = /* @__PURE__ */ new Set();
		if (A.on("socket", function(e) {
			typeof e.setKeepAlive == "function" && e.setKeepAlive(!0, 6e4), e[Oa] || (e.on("error", Aa), e[Oa] = !0), e[ka] = A, me.add(e);
		}), A.once("close", function() {
			F();
			for (let e of me) e[ka] === A && (e[ka] = null);
			me.clear();
		}), i("timeout")) {
			let t = parseInt(i("timeout"), 10);
			if (Number.isNaN(t)) {
				P(new J("error trying to parse `config.timeout` to int", J.ERR_BAD_OPTION_VALUE, e, A));
				return;
			}
			let n = function() {
				O || P(I());
			};
			de && t > 0 && (j = setTimeout(n, t)), A.setTimeout(t, n);
		} else A.setTimeout(0);
		if (K.isStream(c)) {
			let t = !1, n = !1;
			c.on("end", () => {
				t = !0;
			}), c.once("error", (e) => {
				n = !0, A.destroy(e);
			}), c.on("close", () => {
				!t && !n && P(new Tr("Request stream has been aborted", e, A));
			});
			let r = c;
			if (T > -1 && !fe) {
				let t = T, n = 0;
				r = s.pipeline([c, new s.Transform({ transform(r, i, a) {
					if (n += r.length, n > t) return a(new J("Request body larger than maxBodyLength limit", J.ERR_BAD_REQUEST, e, A));
					a(null, r);
				} })], K.noop), r.on("error", (e) => {
					A.destroyed || A.destroy(e);
				});
			}
			r.pipe(A);
		} else c && A.write(c), A.end();
	});
}, to = Y.hasStandardBrowserEnv ? ((e, t) => (n) => (n = new URL(n, Y.origin), e.protocol === n.protocol && e.host === n.host && (t || e.port === n.port)))(new URL(Y.origin), Y.navigator && /(msie|trident)/i.test(Y.navigator.userAgent)) : () => !0, no = Y.hasStandardBrowserEnv ? {
	write(e, t, n, r, i, a, o) {
		if (typeof document > "u") return;
		let s = [`${e}=${encodeURIComponent(t)}`];
		K.isNumber(n) && s.push(`expires=${new Date(n).toUTCString()}`), K.isString(r) && s.push(`path=${r}`), K.isString(i) && s.push(`domain=${i}`), a === !0 && s.push("secure"), K.isString(o) && s.push(`SameSite=${o}`), document.cookie = s.join("; ");
	},
	read(e) {
		if (typeof document > "u") return null;
		let t = document.cookie.split(";");
		for (let n = 0; n < t.length; n++) {
			let r = t[n].replace(/^\s+/, ""), i = r.indexOf("=");
			if (i !== -1 && r.slice(0, i) === e) try {
				return decodeURIComponent(r.slice(i + 1));
			} catch {
				return r.slice(i + 1);
			}
		}
		return null;
	},
	remove(e) {
		this.write(e, "", Date.now() - 864e5, "/");
	}
} : {
	write() {},
	read() {
		return null;
	},
	remove() {}
}, ro = (e) => e instanceof q ? { ...e } : e, io = (e) => Object.getOwnPropertySymbols && Object.getOwnPropertyDescriptor ? Object.keys(e).concat(Object.getOwnPropertySymbols(e).filter((t) => Object.getOwnPropertyDescriptor(e, t).enumerable)) : Object.keys(e);
function ao(e, t) {
	e ||= {}, t ||= {};
	let n = Object.create(null);
	Object.defineProperty(n, "hasOwnProperty", {
		__proto__: null,
		value: Object.prototype.hasOwnProperty,
		enumerable: !1,
		writable: !0,
		configurable: !0
	});
	function r(e, t, n, r) {
		return K.isPlainObject(e) && K.isPlainObject(t) ? K.merge.call({ caseless: r }, e, t) : K.isPlainObject(t) ? K.merge({}, t) : K.isArray(t) ? t.slice() : t;
	}
	function i(e, t, n, i) {
		if (!K.isUndefined(t)) return r(e, t, n, i);
		if (!K.isUndefined(e)) return r(void 0, e, n, i);
	}
	function a(e, t) {
		if (!K.isUndefined(t)) return r(void 0, t);
	}
	function o(e, t) {
		if (!K.isUndefined(t)) return r(void 0, t);
		if (!K.isUndefined(e)) return r(void 0, e);
	}
	function s(n) {
		let r = K.hasOwnProp(t, "transitional") ? t.transitional : void 0;
		if (!K.isUndefined(r)) {
			if (K.isPlainObject(r)) {
				if (K.hasOwnProp(r, n)) return r[n];
			} else return;
		}
		let i = K.hasOwnProp(e, "transitional") ? e.transitional : void 0;
		if (K.isPlainObject(i) && K.hasOwnProp(i, n)) return i[n];
	}
	function c(n, i, a) {
		if (K.hasOwnProp(t, a)) return r(n, i);
		if (K.hasOwnProp(e, a)) return r(void 0, n);
	}
	let l = {
		url: a,
		method: a,
		data: a,
		baseURL: o,
		transformRequest: o,
		transformResponse: o,
		paramsSerializer: o,
		timeout: o,
		timeoutErrorMessage: o,
		withCredentials: o,
		withXSRFToken: o,
		adapter: o,
		responseType: o,
		xsrfCookieName: o,
		xsrfHeaderName: o,
		onUploadProgress: o,
		onDownloadProgress: o,
		decompress: o,
		maxContentLength: o,
		maxBodyLength: o,
		beforeRedirect: o,
		transport: o,
		httpAgent: o,
		httpsAgent: o,
		cancelToken: o,
		socketPath: o,
		allowedSocketPaths: o,
		responseEncoding: o,
		validateStatus: c,
		headers: (e, t, n) => i(ro(e), ro(t), n, !0)
	};
	return K.forEach(io({
		...e,
		...t
	}), function(r) {
		if (r === "__proto__" || r === "constructor" || r === "prototype") return;
		let a = K.hasOwnProp(l, r) ? l[r] : i, o = a(K.hasOwnProp(e, r) ? e[r] : void 0, K.hasOwnProp(t, r) ? t[r] : void 0, r);
		K.isUndefined(o) && a !== c || (n[r] = o);
	}), K.hasOwnProp(t, "validateStatus") && K.isUndefined(t.validateStatus) && s("validateStatusUndefinedResolves") === !1 && (K.hasOwnProp(e, "validateStatus") ? n.validateStatus = r(void 0, e.validateStatus) : delete n.validateStatus), n;
}
//#endregion
//#region node_modules/axios/lib/helpers/resolveConfig.js
var oo = (e) => encodeURIComponent(e).replace(/%([0-9A-F]{2})/gi, (e, t) => String.fromCharCode(parseInt(t, 16)));
function so(e) {
	let t = ao({}, e), n = (e) => K.hasOwnProp(t, e) ? t[e] : void 0, r = n("data"), i = n("withXSRFToken"), a = n("xsrfHeaderName"), o = n("xsrfCookieName"), s = n("headers"), c = n("auth"), l = n("baseURL"), u = n("allowAbsoluteUrls"), d = n("url");
	if (t.headers = s = q.from(s), t.url = Yn(Fr(l, d, u, t), n("params"), n("paramsSerializer")), c) {
		let t = K.getSafeProp(c, "username") || "", n = K.getSafeProp(c, "password") || "";
		try {
			s.set("Authorization", "Basic " + btoa(t + ":" + (n ? oo(n) : "")));
		} catch (t) {
			throw J.from(t, J.ERR_BAD_OPTION_VALUE, e);
		}
	}
	if (K.isFormData(r)) {
		let e = K.getSafeProp(r, "getHeaders");
		Y.hasStandardBrowserEnv || Y.hasStandardBrowserWebWorkerEnv || K.isReactNative(r) ? s.setContentType(void 0) : K.isFunction(e) && pi(s, e.call(r), n("formDataHeaderPolicy"));
	}
	if (Y.hasStandardBrowserEnv && (K.isFunction(i) && (i = i(t)), i === !0 || i == null && to(t.url))) {
		let e = a && o && no.read(o);
		e && s.set(a, e);
	}
	return t;
}
var co = typeof XMLHttpRequest < "u" && function(e) {
	return new Promise(function(t, n) {
		let r = so(e), i = r.data, a = q.from(r.headers).normalize(), { responseType: o, onUploadProgress: s, onDownloadProgress: c } = r, l, u, d, f, p, m;
		function h() {
			f && f(), p && p(), r.cancelToken && r.cancelToken.unsubscribe(l), r.signal && r.signal.removeEventListener("abort", l);
		}
		let g = new XMLHttpRequest();
		g.open(r.method.toUpperCase(), r.url, !0), g.timeout = r.timeout;
		function _(i) {
			if (!g) return;
			if (g.status === 0 && (li(Ar(r.url)) || li(Y.origin)) !== "file" && !(g.responseURL && g.responseURL.startsWith("file:"))) {
				n(new J("Request aborted", J.ECONNABORTED, e, g)), h(), g = null;
				return;
			}
			try {
				i ? m && m(i) : p && p();
			} catch (e) {
				setTimeout(() => {
					throw e;
				});
			}
			if (!g) return;
			let a = q.from("getAllResponseHeaders" in g && g.getAllResponseHeaders());
			Er(function(e) {
				t(e), h();
			}, function(e) {
				n(e), h();
			}, {
				data: !o || o === "text" || o === "json" ? g.responseText : g.response,
				status: g.status,
				statusText: g.statusText,
				headers: a,
				config: e,
				request: g
			}), g = null;
		}
		"onloadend" in g ? g.onloadend = _ : g.onreadystatechange = function() {
			g && g.readyState === 4 && (g.status !== 0 || g.responseURL && g.responseURL.startsWith("file:")) && setTimeout(_);
		}, g.onabort = function() {
			g &&= (n(new J("Request aborted", J.ECONNABORTED, e, g)), h(), null);
		}, g.onerror = function(t) {
			let r = new J(t && t.message ? t.message : "Network Error", J.ERR_NETWORK, e, g);
			r.event = t || null, n(r), h(), g = null;
		}, g.ontimeout = function() {
			let t = r.timeout ? "timeout of " + r.timeout + "ms exceeded" : "timeout exceeded", i = r.transitional || tr;
			r.timeoutErrorMessage && (t = r.timeoutErrorMessage), n(new J(t, i.clarifyTimeoutError ? J.ETIMEDOUT : J.ECONNABORTED, e, g)), h(), g = null;
		}, i === void 0 && a.setContentType(null), "setRequestHeader" in g && K.forEach(vt(a), function(e, t) {
			g.setRequestHeader(t, e);
		}), K.isUndefined(r.withCredentials) || (g.withCredentials = !!r.withCredentials), o && o !== "json" && (g.responseType = r.responseType), c && ([d, p, m] = ta(c, !0), g.addEventListener("progress", d)), s && g.upload && ([u, f] = ta(s), g.upload.addEventListener("progress", u), g.upload.addEventListener("loadend", f)), (r.cancelToken || r.signal) && (l = (t) => {
			g &&= (n(!t || t.type ? new Tr(null, e, g) : t), g.abort(), h(), null);
		}, r.cancelToken && r.cancelToken.subscribe(l), r.signal && (r.signal.aborted ? l() : r.signal.addEventListener("abort", l)));
		let ee = li(r.url);
		if (ee && !Y.protocols.includes(ee)) {
			n(new J("Unsupported protocol " + ee + ":", J.ERR_BAD_REQUEST, e)), h();
			return;
		}
		g.send(i || null);
	});
}, lo = (e, t) => {
	if (e = e ? e.filter(Boolean) : [], !t && !e.length) return;
	let n = new AbortController(), r = !1, i = function(e) {
		if (!r) {
			r = !0, o();
			let t = e instanceof Error ? e : this.reason;
			n.abort(t instanceof J ? t : new Tr(t instanceof Error ? t.message : t));
		}
	}, a = t && setTimeout(() => {
		a = null, i(new J(`timeout of ${t}ms exceeded`, J.ETIMEDOUT));
	}, t), o = () => {
		e &&= (a && clearTimeout(a), a = null, e.forEach((e) => {
			e.unsubscribe ? e.unsubscribe(i) : e.removeEventListener("abort", i);
		}), null);
	};
	e.forEach((e) => {
		if (!r) {
			if (e.aborted) {
				i.call(e);
				return;
			}
			e.addEventListener("abort", i, { once: !0 });
		}
	});
	let { signal: s } = n;
	return s.unsubscribe = () => K.asap(o), s;
}, uo = function* (e, t) {
	let n = e.byteLength;
	if (!t || n < t) {
		yield e;
		return;
	}
	let r = 0, i;
	for (; r < n;) i = r + t, yield e.slice(r, i), r = i;
}, fo = async function* (e, t) {
	for await (let n of po(e)) yield* uo(n, t);
}, po = async function* (e) {
	if (e[Symbol.asyncIterator]) {
		yield* e;
		return;
	}
	let t = e.getReader();
	try {
		for (;;) {
			let { done: e, value: n } = await t.read();
			if (e) break;
			yield n;
		}
	} finally {
		await t.cancel();
	}
}, mo = (e, t, n, r) => {
	let i = fo(e, t), a = 0, o, s = (e) => {
		o || (o = !0, r && r(e));
	};
	return new ReadableStream({
		async pull(e) {
			try {
				let { done: t, value: r } = await i.next();
				if (t) {
					s(), e.close();
					return;
				}
				let o = r.byteLength;
				n && n(a += o), e.enqueue(new Uint8Array(r));
			} catch (e) {
				throw s(e), e;
			}
		},
		cancel(e) {
			return s(e), i.return();
		}
	}, { highWaterMark: 2 });
}, ho = 65536, go = {
	cache: "default",
	redirect: "follow",
	referrer: "about:client",
	referrerPolicy: "",
	mode: "cors",
	integrity: "",
	keepalive: !1,
	priority: "auto",
	window: null
}, { isFunction: _o } = K, vo = (e) => encodeURIComponent(e).replace(/%([0-9A-F]{2})/gi, (e, t) => String.fromCharCode(parseInt(t, 16))), yo = (e) => {
	if (!K.isString(e)) return e;
	try {
		return decodeURIComponent(e);
	} catch {
		return e;
	}
}, bo = (e, ...t) => {
	try {
		return !!e(...t);
	} catch {
		return !1;
	}
}, xo = (e) => {
	let t = e.indexOf("://"), n = e;
	return t !== -1 && (n = n.slice(t + 3)), n.includes("@") || n.includes(":");
}, So = (e) => {
	let t = K.global !== void 0 && K.global !== null ? K.global : globalThis, { ReadableStream: n, TextEncoder: r } = t;
	e = K.merge.call({ skipUndefined: !0 }, {
		Request: t.Request,
		Response: t.Response
	}, e);
	let { fetch: i, Request: a, Response: o } = e, s = i ? _o(i) : typeof fetch == "function", c = _o(a), l = _o(o);
	if (!s) return !1;
	let u = s && _o(n), d = s && (typeof r == "function" ? ((e) => (t) => e.encode(t))(new r()) : async (e) => new Uint8Array(await new a(e).arrayBuffer())), f = c && u && bo(() => {
		let e = !1, t = new a(Y.origin, {
			body: new n(),
			method: "POST",
			get duplex() {
				return e = !0, "half";
			}
		}), r = t.headers.has("Content-Type");
		return t.body != null && t.body.cancel(), e && !r;
	}), p = l && u && bo(() => K.isReadableStream(new o("").body)), m = { stream: p && ((e) => e.body) };
	s && [
		"text",
		"arrayBuffer",
		"blob",
		"formData",
		"stream"
	].forEach((e) => {
		!m[e] && (m[e] = (t, n) => {
			let r = t && t[e];
			if (r) return r.call(t);
			throw new J(`Response type '${e}' is not supported`, J.ERR_NOT_SUPPORT, n);
		});
	});
	let h = async (e) => {
		if (e == null) return 0;
		if (K.isBlob(e)) return e.size;
		if (K.isSpecCompliantForm(e)) return (await new a(Y.origin, {
			method: "POST",
			body: e
		}).arrayBuffer()).byteLength;
		if (K.isArrayBufferView(e) || K.isArrayBuffer(e)) return e.byteLength;
		if (K.isURLSearchParams(e) && (e += ""), K.isString(e)) return (await d(e)).byteLength;
	}, g = async (e, t) => K.toFiniteNumber(e.getContentLength()) ?? h(t);
	return async (e) => {
		let { url: t, method: n, data: s, signal: l, cancelToken: d, timeout: _, onDownloadProgress: ee, onUploadProgress: v, responseType: y, headers: b, withCredentials: x = "same-origin", fetchOptions: S, maxContentLength: C, maxBodyLength: w, maxRedirects: te } = so(e), T = K.isNumber(C) && C > -1, E = K.isNumber(w) && w > -1, D = (t) => K.hasOwnProp(e, t) ? e[t] : void 0, O = i || fetch;
		y = y ? (y + "").toLowerCase() : "text";
		let k = lo([l, d && d.toAbortSignal()], _), A = null, j = k && k.unsubscribe && (() => {
			k.unsubscribe();
		}), M, N = null, P = () => new J("Request body larger than maxBodyLength limit", J.ERR_BAD_REQUEST, e, A);
		try {
			let i, l = D("auth");
			if (l && (i = {
				username: K.getSafeProp(l, "username") || "",
				password: K.getSafeProp(l, "password") || ""
			}), xo(t)) {
				let e = new URL(t, Y.origin);
				!i && (e.username || e.password) && (i = {
					username: yo(e.username),
					password: yo(e.password)
				}), (e.username || e.password) && (e.username = "", e.password = "", t = e.href);
			}
			if (i && (b.delete("authorization"), b.set("Authorization", "Basic " + btoa(vo((i.username || "") + ":" + (i.password || ""))))), T && typeof t == "string" && t.startsWith("data:") && pa(t) > C) throw new J("maxContentLength size of " + C + " exceeded", J.ERR_BAD_RESPONSE, e, A);
			if (E && n !== "get" && n !== "head") {
				let e = await h(s);
				if (typeof e == "number" && isFinite(e) && (M = e, e > w)) throw P();
			}
			let d = E && (K.isReadableStream(s) || K.isStream(s)), _ = (e, t, n) => mo(e, ho, (e) => {
				if (E && e > w) throw N = P();
				t && t(e);
			}, n);
			if (f && n !== "get" && n !== "head" && (v || d)) {
				if (M ??= await g(b, s), M !== 0 || d) {
					let e = new a(t, {
						method: "POST",
						body: s,
						duplex: "half"
					}), n;
					if (K.isFormData(s) && (n = e.headers.get("content-type")) && b.setContentType(n), e.body) {
						let [t, n] = v && na(M, ta(ra(v))) || [];
						s = _(e.body, t, n);
					}
				}
			} else if (d && !c && u && n !== "get" && n !== "head") s = _(s);
			else if (d && c && !f && n !== "get" && n !== "head") throw new J("Stream request bodies are not supported by the current fetch implementation", J.ERR_NOT_SUPPORT, e, A);
			K.isString(x) || (x = x ? "include" : "omit");
			let F = c && "credentials" in a.prototype;
			if (K.isFormData(s)) {
				let e = b.getContentType();
				e && /^multipart\/form-data/i.test(e) && !/boundary=/i.test(e) && b.delete("content-type");
			}
			b.set("User-Agent", "axios/" + ci, !1);
			let I = S == null ? S : Object.assign(Object.create(null), S);
			I && (delete I.body, delete I.headers, delete I.method, delete I.signal, delete I.duplex, delete I.credentials);
			let L = Object.assign(Object.create(null), I, {
				signal: k,
				method: n.toUpperCase(),
				headers: vt(b.normalize()),
				body: s,
				duplex: "half",
				credentials: F ? x : void 0
			});
			c && (K.forEach(go, (e, t) => {
				L[t] === void 0 && (L[t] = e);
			}), L.signal === void 0 && (L.signal = null), L.body === void 0 && (L.body = null)), te === 0 && (L.redirect = "manual", I && (I.redirect = "manual")), A = c && new a(t, L);
			let R = await (c ? O(A, I) : O(t, L)), ne = q.from(R.headers);
			if (T) {
				let t = K.toFiniteNumber(ne.getContentLength());
				if (t != null && t > C) throw new J("maxContentLength size of " + C + " exceeded", J.ERR_BAD_RESPONSE, e, A);
			}
			let z = p && (y === "stream" || y === "response");
			if (p && R.body && (ee || T || z && j)) {
				let t = {};
				[
					"status",
					"statusText",
					"headers"
				].forEach((e) => {
					t[e] = R[e];
				});
				let n = K.toFiniteNumber(ne.getContentLength()), [r, i] = ee && na(n, ta(ra(ee), !0)) || [], a = 0;
				R = new o(mo(R.body, ho, (t) => {
					if (T && (a = t, a > C)) throw new J("maxContentLength size of " + C + " exceeded", J.ERR_BAD_RESPONSE, e, A);
					r && r(t);
				}, () => {
					i && i(), j && j();
				}), t);
			}
			y ||= "text";
			let B = await m[K.findKey(m, y) || "text"](R, e);
			if (T && !p && !z) {
				let t;
				if (B != null && (typeof B.byteLength == "number" ? t = B.byteLength : typeof B.size == "number" ? t = B.size : typeof B == "string" && (t = typeof r == "function" ? new r().encode(B).byteLength : B.length)), typeof t == "number" && t > C) throw new J("maxContentLength size of " + C + " exceeded", J.ERR_BAD_RESPONSE, e, A);
			}
			return !z && j && j(), await new Promise((t, n) => {
				Er(t, n, {
					data: B,
					headers: q.from(R.headers),
					status: R.status,
					statusText: R.statusText,
					config: e,
					request: A
				});
			});
		} catch (t) {
			if (j && j(), k && k.aborted && k.reason instanceof J) {
				let n = k.reason;
				throw n.config = e, A && (n.request = A), t !== n && Object.defineProperty(n, "cause", {
					__proto__: null,
					value: t,
					writable: !0,
					enumerable: !1,
					configurable: !0
				}), n;
			}
			if (N) throw A && !N.request && (N.request = A), N;
			if (t instanceof J) throw A && !t.request && (t.request = A), t;
			if (t && t.name === "TypeError" && /Load failed|fetch/i.test(t.message)) {
				let n = new J("Network Error", J.ERR_NETWORK, e, A, t && t.response);
				throw Object.defineProperty(n, "cause", {
					__proto__: null,
					value: t.cause || t,
					writable: !0,
					enumerable: !1,
					configurable: !0
				}), n;
			}
			throw J.from(t, t && t.code, e, A, t && t.response);
		}
	};
}, Co = /* @__PURE__ */ new Map(), wo = (e) => {
	let t = e && e.env || {}, { fetch: n, Request: r, Response: i } = t, a = [
		r,
		i,
		n
	], o = a.length, s, c, l = Co;
	for (; o--;) s = a[o], c = l.get(s), c === void 0 && l.set(s, c = o ? /* @__PURE__ */ new Map() : So(t)), l = c;
	return c;
};
wo();
//#endregion
//#region node_modules/axios/lib/adapters/adapters.js
var To = {
	http: eo,
	xhr: co,
	fetch: { get: wo }
};
K.forEach(To, (e, t) => {
	if (e) {
		try {
			Object.defineProperty(e, "name", {
				__proto__: null,
				value: t
			});
		} catch {}
		Object.defineProperty(e, "adapterName", {
			__proto__: null,
			value: t
		});
	}
});
var Eo = (e) => `- ${e}`, Do = (e) => K.isFunction(e) || e === null || e === !1;
function Oo(e, t) {
	e = K.isArray(e) ? e : [e];
	let { length: n } = e, r, i, a = {};
	for (let o = 0; o < n; o++) {
		r = e[o];
		let n;
		if (i = r, !Do(r) && (i = To[(n = String(r)).toLowerCase()], i === void 0)) throw new J(`Unknown adapter '${n}'`);
		if (i && (K.isFunction(i) || (i = i.get(t)))) break;
		a[n || "#" + o] = i;
	}
	if (!i) {
		let e = Object.entries(a).map(([e, t]) => `adapter ${e} ` + (t === !1 ? "is not supported by the environment" : "is not available in the build"));
		throw new J("There is no suitable adapter to dispatch the request " + (n ? e.length > 1 ? "since :\n" + e.map(Eo).join("\n") : " " + Eo(e[0]) : "as no adapter specified"), J.ERR_NOT_SUPPORT);
	}
	return i;
}
var ko = {
	getAdapter: Oo,
	adapters: To
};
//#endregion
//#region node_modules/axios/lib/core/dispatchRequest.js
function Ao(e) {
	if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted) throw new Tr(null, e);
}
function jo(e) {
	let t = K.toSafeFlatObject(e);
	return Ao(t), t.headers = q.from(K.getSafeProp(t, "headers")), t.data = Cr.call(t, t.transformRequest), [
		"post",
		"put",
		"patch"
	].indexOf(t.method) !== -1 && t.headers.setContentType("application/x-www-form-urlencoded", !1), ko.getAdapter(t.adapter || Sr.adapter, t)(t).then(function(e) {
		Ao(t), t.response = e;
		try {
			e.data = Cr.call(t, t.transformResponse, e);
		} finally {
			delete t.response;
		}
		return e.headers = q.from(e.headers), e;
	}, function(e) {
		if (!wr(e) && (Ao(t), e && e.response)) {
			t.response = e.response;
			try {
				e.response.data = Cr.call(t, t.transformResponse, e.response);
			} finally {
				delete t.response;
			}
			e.response.headers = q.from(e.response.headers);
		}
		return Promise.reject(e);
	});
}
//#endregion
//#region node_modules/axios/lib/helpers/validator.js
var Mo = {};
[
	"object",
	"boolean",
	"number",
	"function",
	"string",
	"symbol"
].forEach((e, t) => {
	Mo[e] = function(n) {
		return typeof n === e || "a" + (t < 1 ? "n " : " ") + e;
	};
});
var No = {};
Mo.transitional = function(e, t, n) {
	function r(e, t) {
		return "[Axios v" + ci + "] Transitional option '" + e + "'" + t + (n ? ". " + n : "");
	}
	return (n, i, a) => {
		if (e === !1) throw new J(r(i, " has been removed" + (t ? " in " + t : "")), J.ERR_DEPRECATED);
		return t && !No[i] && (No[i] = !0, console.warn(r(i, " has been deprecated since v" + t + " and will be removed in the near future"))), !e || e(n, i, a);
	};
}, Mo.spelling = function(e) {
	return (t, n) => (console.warn(`${n} is likely a misspelling of ${e}`), !0);
};
function Po(e, t, n) {
	if (typeof e != "object" || !e) throw new J("options must be an object", J.ERR_BAD_OPTION_VALUE);
	let r = Object.keys(e), i = r.length;
	for (; i-- > 0;) {
		let a = r[i], o = Object.prototype.hasOwnProperty.call(t, a) ? t[a] : void 0;
		if (o) {
			let t = e[a], n = t === void 0 || o(t, a, e);
			if (n !== !0) throw new J("option " + a + " must be " + n, J.ERR_BAD_OPTION_VALUE);
			continue;
		}
		if (n !== !0) throw new J("Unknown option " + a, J.ERR_BAD_OPTION);
	}
}
var Fo = {
	assertOptions: Po,
	validators: Mo
}, Z = Fo.validators, Io = class {
	constructor(e) {
		this.defaults = e || {}, this.interceptors = {
			request: new er(),
			response: new er()
		};
	}
	async request(e, t) {
		try {
			return await this._request(e, t);
		} catch (e) {
			if (e instanceof Error) try {
				let t = {};
				Error.captureStackTrace ? Error.captureStackTrace(t) : t = /* @__PURE__ */ Error();
				let n = t.stack, r = "";
				if (typeof n == "string") {
					let e = n.indexOf("\n");
					r = e === -1 ? "" : n.slice(e + 1);
				}
				if (!e.stack) e.stack = r;
				else if (r) {
					let t = r.indexOf("\n"), n = t === -1 ? -1 : r.indexOf("\n", t + 1), i = n === -1 ? "" : r.slice(n + 1);
					String(e.stack).endsWith(i) || (e.stack += "\n" + r);
				}
			} catch {}
			throw e;
		}
	}
	_request(e, t) {
		typeof e == "string" ? (t ||= {}, t.url = e) : t = e || {}, t = ao(this.defaults, t);
		let { transitional: n, paramsSerializer: r, headers: i } = t;
		n !== void 0 && Fo.assertOptions(n, {
			silentJSONParsing: Z.transitional(Z.boolean),
			forcedJSONParsing: Z.transitional(Z.boolean),
			clarifyTimeoutError: Z.transitional(Z.boolean),
			legacyInterceptorReqResOrdering: Z.transitional(Z.boolean),
			advertiseZstdAcceptEncoding: Z.transitional(Z.boolean),
			validateStatusUndefinedResolves: Z.transitional(Z.boolean)
		}, !1), r != null && (K.isFunction(r) ? t.paramsSerializer = { serialize: r } : Fo.assertOptions(r, {
			encode: Z.function,
			serialize: Z.function
		}, !0)), t.allowAbsoluteUrls !== void 0 || (this.defaults.allowAbsoluteUrls === void 0 ? t.allowAbsoluteUrls = !0 : t.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls), Fo.assertOptions(t, {
			baseUrl: Z.spelling("baseURL"),
			withXsrfToken: Z.spelling("withXSRFToken")
		}, !0), t.method = (K.getSafeProp(t, "method") || K.getSafeProp(this.defaults, "method") || "get").toLowerCase();
		let a = i && K.merge(i.common, i[t.method]);
		i && K.forEach(yr.concat("common"), (e) => {
			delete i[e];
		}), t.headers = q.concat(a, i);
		let o = [], s = !0;
		this.interceptors.request.forEach(function(e) {
			if (typeof e.runWhen == "function" && e.runWhen(t) === !1) return;
			s &&= e.synchronous;
			let n = t.transitional || tr;
			n && n.legacyInterceptorReqResOrdering ? o.unshift(e.fulfilled, e.rejected) : o.push(e.fulfilled, e.rejected);
		});
		let c = [];
		this.interceptors.response.forEach(function(e) {
			c.push(e.fulfilled, e.rejected);
		});
		let l, u = 0, d;
		if (!s) {
			let e = [jo.bind(this), void 0];
			for (e.unshift(...o), e.push(...c), d = e.length, l = Promise.resolve(t); u < d;) l = l.then(e[u++], e[u++]);
			return l;
		}
		d = o.length;
		let f = t;
		for (; u < d;) {
			let e = o[u++], t = o[u++];
			try {
				f = e ? e(f) : f;
			} catch (e) {
				if (!t) {
					l = Promise.reject(e);
					break;
				}
				try {
					let n = t.call(this, e);
					K.isThenable(n) && (l = Promise.resolve(n).then(() => jo.call(this, f)));
				} catch (e) {
					l = Promise.reject(e);
				}
				break;
			}
		}
		if (!l) try {
			l = jo.call(this, f);
		} catch (e) {
			l = Promise.reject(e);
		}
		for (u = 0, d = c.length; u < d;) l = l.then(c[u++], c[u++]);
		return l;
	}
	getUri(e) {
		return e = ao(this.defaults, e), Yn(Fr(e.baseURL, e.url, e.allowAbsoluteUrls, e), e.params, e.paramsSerializer);
	}
};
K.forEach([
	"delete",
	"get",
	"head",
	"options"
], function(e) {
	Io.prototype[e] = function(t, n) {
		return this.request(ao(n || {}, {
			method: e,
			url: t,
			data: n && K.hasOwnProp(n, "data") ? n.data : void 0
		}));
	};
}), K.forEach([
	"post",
	"put",
	"patch",
	"query"
], function(e) {
	function t(t) {
		return function(n, r, i) {
			return this.request(ao(i || {}, {
				method: e,
				headers: t ? { "Content-Type": "multipart/form-data" } : {},
				url: n,
				data: r
			}));
		};
	}
	Io.prototype[e] = t(), e !== "query" && (Io.prototype[e + "Form"] = t(!0));
});
//#endregion
//#region node_modules/axios/lib/cancel/CancelToken.js
var Lo = class e {
	constructor(e) {
		if (typeof e != "function") throw TypeError("executor must be a function.");
		let t;
		this.promise = new Promise(function(e) {
			t = e;
		});
		let n = this;
		this.promise.then((e) => {
			if (!n._listeners) return;
			let t = n._listeners.length;
			for (; t-- > 0;) n._listeners[t](e);
			n._listeners = null;
		}), this.promise.then = (e) => {
			let t, r = new Promise((e) => {
				n.subscribe(e), t = e;
			}).then(e);
			return r.cancel = function() {
				n.unsubscribe(t);
			}, r;
		}, e(function(e, r, i) {
			n.reason || (n.reason = new Tr(e, r, i), t(n.reason));
		});
	}
	throwIfRequested() {
		if (this.reason) throw this.reason;
	}
	subscribe(e) {
		if (this.reason) {
			e(this.reason);
			return;
		}
		this._listeners ? this._listeners.push(e) : this._listeners = [e];
	}
	unsubscribe(e) {
		if (!this._listeners) return;
		let t = this._listeners.indexOf(e);
		t !== -1 && this._listeners.splice(t, 1);
	}
	toAbortSignal() {
		let e = new AbortController(), t = (t) => {
			e.abort(t);
		};
		return this.subscribe(t), e.signal.unsubscribe = () => this.unsubscribe(t), e.signal;
	}
	static source() {
		let t;
		return {
			token: new e(function(e) {
				t = e;
			}),
			cancel: t
		};
	}
};
//#endregion
//#region node_modules/axios/lib/helpers/spread.js
function Ro(e) {
	return function(t) {
		return e.apply(null, t);
	};
}
//#endregion
//#region node_modules/axios/lib/helpers/isAxiosError.js
function zo(e) {
	return K.isObject(e) && e.isAxiosError === !0;
}
//#endregion
//#region node_modules/axios/lib/helpers/HttpStatusCode.js
var Bo = {
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
	ContentTooLarge: 413,
	UriTooLong: 414,
	UnsupportedMediaType: 415,
	RangeNotSatisfiable: 416,
	ExpectationFailed: 417,
	ImATeapot: 418,
	MisdirectedRequest: 421,
	UnprocessableEntity: 422,
	UnprocessableContent: 422,
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
	WebServerReturnsAnUnknownError: 520,
	WebServerIsDown: 521,
	ConnectionTimedOut: 522,
	OriginIsUnreachable: 523,
	TimeoutOccurred: 524,
	SslHandshakeFailed: 525,
	InvalidSslCertificate: 526
};
Object.entries(Bo).forEach(([e, t]) => {
	Bo[t] === void 0 && (Bo[t] = e);
});
//#endregion
//#region node_modules/axios/lib/axios.js
function Vo(e) {
	let t = new Io(e), n = N(Io.prototype.request, t);
	return K.extend(n, Io.prototype, t, { allOwnKeys: !0 }), K.extend(n, t, null, { allOwnKeys: !0 }), n.create = function(t) {
		return Vo(ao(e, t));
	}, n;
}
var Q = Vo(Sr);
//#endregion
//#region electron/main.ts
Q.Axios = Io, Q.CanceledError = Tr, Q.CancelToken = Lo, Q.isCancel = wr, Q.VERSION = ci, Q.toFormData = Wn, Q.AxiosError = J, Q.Cancel = Q.CanceledError, Q.all = function(e) {
	return Promise.all(e);
}, Q.spread = Ro, Q.isAxiosError = zo, Q.mergeConfig = ao, Q.AxiosHeaders = q, Q.formToJSON = (e) => vr(K.isHTMLForm(e) ? new FormData(e) : e), Q.getAdapter = ko.getAdapter, Q.HttpStatusCode = Bo, Q.default = Q, e(import.meta.url);
var Ho = a.dirname(i(import.meta.url));
process.env.APP_ROOT = a.join(Ho, "..");
var Uo = process.env.VITE_DEV_SERVER_URL, Wo = a.join(process.env.APP_ROOT, "dist-electron"), Go = a.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = Uo ? a.join(process.env.APP_ROOT, "public") : Go;
var Ko, qo = null, Jo = !1, Yo = null, Xo = "http://localhost:3001", Zo = 5e3, Qo = a.join(n.getPath("userData"), "temp-prints");
p.existsSync(Qo) || p.mkdirSync(Qo, { recursive: !0 });
function $(e) {
	console.log(e), Ko?.webContents.send("agent-log", e);
}
async function $o(e, t) {
	try {
		await Q.patch(`${Xo}/orders/${e}/status`, { status: t }), $(`[Status] Order ${e} updated to ${t}`);
	} catch (n) {
		$(`[Error] Failed to update order ${e} to ${t}: ${n.message}`);
	}
}
async function es(e) {
	let { id: t } = e;
	$(`[Agent ${qo}] Found ready order: ${t}`);
	let n = a.join(Qo, `order-${t}.pdf`);
	$(`[Agent ${qo}] Downloading PDF for order ${t}...`);
	try {
		let e = await Q({
			method: "GET",
			url: `${Xo}/orders/${t}/download`,
			responseType: "stream"
		}), r = p.createWriteStream(n);
		e.data.pipe(r), await new Promise((e, t) => {
			r.on("finish", e), r.on("error", t);
		}), $(`[Agent ${qo}] Download complete: ${n}`);
	} catch (e) {
		$(`[Error] Failed to download PDF for order ${t}: ${e.message}`);
		return;
	}
	await $o(t, "PRINTING"), $(`[Print Spooler] Sending job to Windows Print Spooler: ${n}`);
	let r = `powershell.exe -Command "Start-Process -FilePath '${n}' -Verb Print -PassThru | %{sleep 30;$_} | kill"`;
	await new Promise((e, t) => {
		b(r, (r, i, a) => {
			if (r) return $(`[Error] Failed to print document ${n}: ${r.message}`), t(r);
			e();
		});
	}), await $o(t, "READY_TO_PICKUP");
	try {
		p.unlinkSync(n), $(`[Agent ${qo}] Cleaned up temporary file`);
	} catch (e) {
		$(`[Error] Failed to delete file ${n}: ${e.message}`);
	}
	$(`[Agent ${qo}] Finished processing order: ${t}`);
}
async function ts() {
	if (Jo && qo) try {
		let e = (await Q.get(`${Xo}/orders/ready-to-print?storeId=${qo}`)).data;
		e ? await es(e) : $(`[Agent ${qo}] No orders ready to print. Waiting...`);
	} catch (e) {
		$(`[Error] Polling failed: ${e.message}`);
	} finally {
		Jo && (Yo = setTimeout(ts, Zo));
	}
}
r.handle("set-store-id", (e, t) => (qo = t, $(`[System] Store ID set to: ${qo}`), !0)), r.handle("start-polling", (e) => qo ? Jo ? {
	success: !0,
	message: "Already polling"
} : (Jo = !0, $(`[System] Started polling for Store: ${qo}`), ts(), { success: !0 }) : {
	success: !1,
	error: "Store ID not set"
}), r.handle("stop-polling", (e) => (Jo = !1, Yo && clearTimeout(Yo), $("[System] Stopped polling."), { success: !0 }));
function ns() {
	Ko = new t({
		width: 1024,
		height: 768,
		icon: a.join(process.env.VITE_PUBLIC, "vite.svg"),
		webPreferences: { preload: a.join(Ho, "preload.mjs") }
	}), Ko.webContents.on("did-finish-load", () => {
		Ko?.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
	}), Uo ? (Ko.loadURL(Uo), Ko.webContents.openDevTools()) : Ko.loadFile(a.join(Go, "index.html"));
}
n.on("window-all-closed", () => {
	process.platform !== "darwin" && (n.quit(), Ko = null);
}), n.on("activate", () => {
	t.getAllWindows().length === 0 && ns();
}), n.whenReady().then(ns);
//#endregion
export { Wo as MAIN_DIST, Go as RENDERER_DIST, Uo as VITE_DEV_SERVER_URL };
