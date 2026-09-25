import { createRequire as e } from "node:module";
import { BrowserWindow as t, app as n, ipcMain as r } from "electron";
import i from "fs";
import a, { Readable as o } from "stream";
import s from "util";
import { resolve as c } from "path";
import { exec as l } from "child_process";
import { EventEmitter as u } from "events";
import d from "crypto";
import f from "node:process";
import p from "node:os";
import m from "node:tty";
import h from "url";
import g from "zlib";
import _ from "http";
import { fileURLToPath as v } from "node:url";
import y from "node:path";
import b from "https";
import x from "http2";
//#region \0rolldown/runtime.js
var S = Object.create, C = Object.defineProperty, w = Object.getOwnPropertyDescriptor, T = Object.getOwnPropertyNames, E = Object.getPrototypeOf, D = Object.prototype.hasOwnProperty, O = (e, t, n) => () => {
	if (n) throw n[0];
	try {
		return e && (t = e(e = 0)), t;
	} catch (e) {
		throw n = [e], e;
	}
}, k = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), A = (e, t) => {
	let n = {};
	for (var r in e) C(n, r, {
		get: e[r],
		enumerable: !0
	});
	return t || C(n, Symbol.toStringTag, { value: "Module" }), n;
}, j = (e, t, n, r) => {
	if (t && typeof t == "object" || typeof t == "function") for (var i = T(t), a = 0, o = i.length, s; a < o; a++) s = i[a], !D.call(e, s) && s !== n && C(e, s, {
		get: ((e) => t[e]).bind(null, s),
		enumerable: !(r = w(t, s)) || r.enumerable
	});
	return e;
}, M = (e, t, n) => (n = e == null ? {} : S(E(e)), j(t || !e || !e.__esModule || !D.call(e, "default") ? C(n, "default", {
	value: e,
	enumerable: !0
}) : n, e)), N = (e) => D.call(e, "module.exports") ? e["module.exports"] : j(C({}, "__esModule", { value: !0 }), e), P = /* @__PURE__ */ e(import.meta.url), F = /* @__PURE__ */ k(((e) => {
	e.fromCallback = function(e) {
		return Object.defineProperty(function(...t) {
			if (typeof t[t.length - 1] == "function") e.apply(this, t);
			else return new Promise((n, r) => {
				t.push((e, t) => e == null ? n(t) : r(e)), e.apply(this, t);
			});
		}, "name", { value: e.name });
	}, e.fromPromise = function(e) {
		return Object.defineProperty(function(...t) {
			let n = t[t.length - 1];
			if (typeof n != "function") return e.apply(this, t);
			t.pop(), e.apply(this, t).then((e) => n(null, e), n);
		}, "name", { value: e.name });
	};
})), I = /* @__PURE__ */ k(((e, t) => {
	var n = P("constants"), r = process.cwd, i = null, a = process.env.GRACEFUL_FS_PLATFORM || process.platform;
	process.cwd = function() {
		return i ||= r.call(process), i;
	};
	try {
		process.cwd();
	} catch {}
	if (typeof process.chdir == "function") {
		var o = process.chdir;
		process.chdir = function(e) {
			i = null, o.call(process, e);
		}, Object.setPrototypeOf && Object.setPrototypeOf(process.chdir, o);
	}
	t.exports = s;
	function s(e) {
		n.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./) && t(e), e.lutimes || r(e), e.chown = s(e.chown), e.fchown = s(e.fchown), e.lchown = s(e.lchown), e.chmod = i(e.chmod), e.fchmod = i(e.fchmod), e.lchmod = i(e.lchmod), e.chownSync = c(e.chownSync), e.fchownSync = c(e.fchownSync), e.lchownSync = c(e.lchownSync), e.chmodSync = o(e.chmodSync), e.fchmodSync = o(e.fchmodSync), e.lchmodSync = o(e.lchmodSync), e.stat = l(e.stat), e.fstat = l(e.fstat), e.lstat = l(e.lstat), e.statSync = u(e.statSync), e.fstatSync = u(e.fstatSync), e.lstatSync = u(e.lstatSync), e.chmod && !e.lchmod && (e.lchmod = function(e, t, n) {
			n && process.nextTick(n);
		}, e.lchmodSync = function() {}), e.chown && !e.lchown && (e.lchown = function(e, t, n, r) {
			r && process.nextTick(r);
		}, e.lchownSync = function() {}), a === "win32" && (e.rename = typeof e.rename == "function" ? (function(t) {
			function n(n, r, i) {
				var a = Date.now(), o = 0;
				t(n, r, function s(c) {
					if (c && (c.code === "EACCES" || c.code === "EPERM" || c.code === "EBUSY") && Date.now() - a < 6e4) {
						setTimeout(function() {
							e.stat(r, function(e, a) {
								e && e.code === "ENOENT" ? t(n, r, s) : i(c);
							});
						}, o), o < 100 && (o += 10);
						return;
					}
					i && i(c);
				});
			}
			return Object.setPrototypeOf && Object.setPrototypeOf(n, t), n;
		})(e.rename) : e.rename), e.read = typeof e.read == "function" ? (function(t) {
			function n(n, r, i, a, o, s) {
				var c;
				if (s && typeof s == "function") {
					var l = 0;
					c = function(u, d, f) {
						if (u && u.code === "EAGAIN" && l < 10) return l++, t.call(e, n, r, i, a, o, c);
						s.apply(this, arguments);
					};
				}
				return t.call(e, n, r, i, a, o, c);
			}
			return Object.setPrototypeOf && Object.setPrototypeOf(n, t), n;
		})(e.read) : e.read, e.readSync = typeof e.readSync == "function" ? (function(t) {
			return function(n, r, i, a, o) {
				for (var s = 0;;) try {
					return t.call(e, n, r, i, a, o);
				} catch (e) {
					if (e.code === "EAGAIN" && s < 10) {
						s++;
						continue;
					}
					throw e;
				}
			};
		})(e.readSync) : e.readSync;
		function t(e) {
			e.lchmod = function(t, r, i) {
				e.open(t, n.O_WRONLY | n.O_SYMLINK, r, function(t, n) {
					if (t) {
						i && i(t);
						return;
					}
					e.fchmod(n, r, function(t) {
						e.close(n, function(e) {
							i && i(t || e);
						});
					});
				});
			}, e.lchmodSync = function(t, r) {
				var i = e.openSync(t, n.O_WRONLY | n.O_SYMLINK, r), a = !0, o;
				try {
					o = e.fchmodSync(i, r), a = !1;
				} finally {
					if (a) try {
						e.closeSync(i);
					} catch {}
					else e.closeSync(i);
				}
				return o;
			};
		}
		function r(e) {
			n.hasOwnProperty("O_SYMLINK") && e.futimes ? (e.lutimes = function(t, r, i, a) {
				e.open(t, n.O_SYMLINK, function(t, n) {
					if (t) {
						a && a(t);
						return;
					}
					e.futimes(n, r, i, function(t) {
						e.close(n, function(e) {
							a && a(t || e);
						});
					});
				});
			}, e.lutimesSync = function(t, r, i) {
				var a = e.openSync(t, n.O_SYMLINK), o, s = !0;
				try {
					o = e.futimesSync(a, r, i), s = !1;
				} finally {
					if (s) try {
						e.closeSync(a);
					} catch {}
					else e.closeSync(a);
				}
				return o;
			}) : e.futimes && (e.lutimes = function(e, t, n, r) {
				r && process.nextTick(r);
			}, e.lutimesSync = function() {});
		}
		function i(t) {
			return t && function(n, r, i) {
				return t.call(e, n, r, function(e) {
					d(e) && (e = null), i && i.apply(this, arguments);
				});
			};
		}
		function o(t) {
			return t && function(n, r) {
				try {
					return t.call(e, n, r);
				} catch (e) {
					if (!d(e)) throw e;
				}
			};
		}
		function s(t) {
			return t && function(n, r, i, a) {
				return t.call(e, n, r, i, function(e) {
					d(e) && (e = null), a && a.apply(this, arguments);
				});
			};
		}
		function c(t) {
			return t && function(n, r, i) {
				try {
					return t.call(e, n, r, i);
				} catch (e) {
					if (!d(e)) throw e;
				}
			};
		}
		function l(t) {
			return t && function(n, r, i) {
				typeof r == "function" && (i = r, r = null);
				function a(e, t) {
					t && (t.uid < 0 && (t.uid += 4294967296), t.gid < 0 && (t.gid += 4294967296)), i && i.apply(this, arguments);
				}
				return r ? t.call(e, n, r, a) : t.call(e, n, a);
			};
		}
		function u(t) {
			return t && function(n, r) {
				var i = r ? t.call(e, n, r) : t.call(e, n);
				return i && (i.uid < 0 && (i.uid += 4294967296), i.gid < 0 && (i.gid += 4294967296)), i;
			};
		}
		function d(e) {
			return !(e && e.code !== "ENOSYS" && (process.getuid && process.getuid() === 0 || e.code !== "EINVAL" && e.code !== "EPERM"));
		}
	}
})), ee = /* @__PURE__ */ k(((e, t) => {
	var n = P("stream").Stream;
	t.exports = r;
	function r(e) {
		return {
			ReadStream: t,
			WriteStream: r
		};
		function t(r, i) {
			if (!(this instanceof t)) return new t(r, i);
			n.call(this);
			var a = this;
			this.path = r, this.fd = null, this.readable = !0, this.paused = !1, this.flags = "r", this.mode = 438, this.bufferSize = 65536, i ||= {};
			for (var o = Object.keys(i), s = 0, c = o.length; s < c; s++) {
				var l = o[s];
				this[l] = i[l];
			}
			if (this.encoding && this.setEncoding(this.encoding), this.start !== void 0) {
				if (typeof this.start != "number") throw TypeError("start must be a Number");
				if (this.end === void 0) this.end = Infinity;
				else if (typeof this.end != "number") throw TypeError("end must be a Number");
				if (this.start > this.end) throw Error("start must be <= end");
				this.pos = this.start;
			}
			if (this.fd !== null) {
				process.nextTick(function() {
					a._read();
				});
				return;
			}
			e.open(this.path, this.flags, this.mode, function(e, t) {
				if (e) {
					a.emit("error", e), a.readable = !1;
					return;
				}
				a.fd = t, a.emit("open", t), a._read();
			});
		}
		function r(t, i) {
			if (!(this instanceof r)) return new r(t, i);
			n.call(this), this.path = t, this.fd = null, this.writable = !0, this.flags = "w", this.encoding = "binary", this.mode = 438, this.bytesWritten = 0, i ||= {};
			for (var a = Object.keys(i), o = 0, s = a.length; o < s; o++) {
				var c = a[o];
				this[c] = i[c];
			}
			if (this.start !== void 0) {
				if (typeof this.start != "number") throw TypeError("start must be a Number");
				if (this.start < 0) throw Error("start must be >= zero");
				this.pos = this.start;
			}
			this.busy = !1, this._queue = [], this.fd === null && (this._open = e.open, this._queue.push([
				this._open,
				this.path,
				this.flags,
				this.mode,
				void 0
			]), this.flush());
		}
	}
})), L = /* @__PURE__ */ k(((e, t) => {
	t.exports = r;
	var n = Object.getPrototypeOf || function(e) {
		return e.__proto__;
	};
	function r(e) {
		if (typeof e != "object" || !e) return e;
		if (e instanceof Object) var t = { __proto__: n(e) };
		else var t = Object.create(null);
		return Object.getOwnPropertyNames(e).forEach(function(n) {
			Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(e, n));
		}), t;
	}
})), R = /* @__PURE__ */ k(((e, t) => {
	var n = P("fs"), r = I(), i = ee(), a = L(), o = P("util"), s, c;
	/* istanbul ignore else - node 0.x polyfill */
	typeof Symbol == "function" && typeof Symbol.for == "function" ? (s = Symbol.for("graceful-fs.queue"), c = Symbol.for("graceful-fs.previous")) : (s = "___graceful-fs.queue", c = "___graceful-fs.previous");
	function l() {}
	function u(e, t) {
		Object.defineProperty(e, s, { get: function() {
			return t;
		} });
	}
	var d = l;
	o.debuglog ? d = o.debuglog("gfs4") : /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && (d = function() {
		var e = o.format.apply(o, arguments);
		e = "GFS4: " + e.split(/\n/).join("\nGFS4: "), console.error(e);
	}), n[s] || (u(n, global[s] || []), n.close = (function(e) {
		function t(t, r) {
			return e.call(n, t, function(e) {
				e || h(), typeof r == "function" && r.apply(this, arguments);
			});
		}
		return Object.defineProperty(t, c, { value: e }), t;
	})(n.close), n.closeSync = (function(e) {
		function t(t) {
			e.apply(n, arguments), h();
		}
		return Object.defineProperty(t, c, { value: e }), t;
	})(n.closeSync), /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && process.on("exit", function() {
		d(n[s]), P("assert").equal(n[s].length, 0);
	})), global[s] || u(global, n[s]), t.exports = f(a(n)), process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !n.__patched && (t.exports = f(n), n.__patched = !0);
	function f(e) {
		r(e), e.gracefulify = f, e.createReadStream = T, e.createWriteStream = E;
		var t = e.readFile;
		e.readFile = n;
		function n(e, n, r) {
			return typeof n == "function" && (r = n, n = null), i(e, n, r);
			function i(e, n, r, a) {
				return t(e, n, function(t) {
					t && (t.code === "EMFILE" || t.code === "ENFILE") ? p([
						i,
						[
							e,
							n,
							r
						],
						t,
						a || Date.now(),
						Date.now()
					]) : typeof r == "function" && r.apply(this, arguments);
				});
			}
		}
		var a = e.writeFile;
		e.writeFile = o;
		function o(e, t, n, r) {
			return typeof n == "function" && (r = n, n = null), i(e, t, n, r);
			function i(e, t, n, r, o) {
				return a(e, t, n, function(a) {
					a && (a.code === "EMFILE" || a.code === "ENFILE") ? p([
						i,
						[
							e,
							t,
							n,
							r
						],
						a,
						o || Date.now(),
						Date.now()
					]) : typeof r == "function" && r.apply(this, arguments);
				});
			}
		}
		var s = e.appendFile;
		s && (e.appendFile = c);
		function c(e, t, n, r) {
			return typeof n == "function" && (r = n, n = null), i(e, t, n, r);
			function i(e, t, n, r, a) {
				return s(e, t, n, function(o) {
					o && (o.code === "EMFILE" || o.code === "ENFILE") ? p([
						i,
						[
							e,
							t,
							n,
							r
						],
						o,
						a || Date.now(),
						Date.now()
					]) : typeof r == "function" && r.apply(this, arguments);
				});
			}
		}
		var l = e.copyFile;
		l && (e.copyFile = u);
		function u(e, t, n, r) {
			return typeof n == "function" && (r = n, n = 0), i(e, t, n, r);
			function i(e, t, n, r, a) {
				return l(e, t, n, function(o) {
					o && (o.code === "EMFILE" || o.code === "ENFILE") ? p([
						i,
						[
							e,
							t,
							n,
							r
						],
						o,
						a || Date.now(),
						Date.now()
					]) : typeof r == "function" && r.apply(this, arguments);
				});
			}
		}
		var d = e.readdir;
		e.readdir = h;
		var m = /^v[0-5]\./;
		function h(e, t, n) {
			typeof t == "function" && (n = t, t = null);
			var r = m.test(process.version) ? function(e, t, n, r) {
				return d(e, i(e, t, n, r));
			} : function(e, t, n, r) {
				return d(e, t, i(e, t, n, r));
			};
			return r(e, t, n);
			function i(e, t, n, i) {
				return function(a, o) {
					a && (a.code === "EMFILE" || a.code === "ENFILE") ? p([
						r,
						[
							e,
							t,
							n
						],
						a,
						i || Date.now(),
						Date.now()
					]) : (o && o.sort && o.sort(), typeof n == "function" && n.call(this, a, o));
				};
			}
		}
		if (process.version.substr(0, 4) === "v0.8") {
			var g = i(e);
			x = g.ReadStream, C = g.WriteStream;
		}
		var _ = e.ReadStream;
		_ && (x.prototype = Object.create(_.prototype), x.prototype.open = S);
		var v = e.WriteStream;
		v && (C.prototype = Object.create(v.prototype), C.prototype.open = w), Object.defineProperty(e, "ReadStream", {
			get: function() {
				return x;
			},
			set: function(e) {
				x = e;
			},
			enumerable: !0,
			configurable: !0
		}), Object.defineProperty(e, "WriteStream", {
			get: function() {
				return C;
			},
			set: function(e) {
				C = e;
			},
			enumerable: !0,
			configurable: !0
		});
		var y = x;
		Object.defineProperty(e, "FileReadStream", {
			get: function() {
				return y;
			},
			set: function(e) {
				y = e;
			},
			enumerable: !0,
			configurable: !0
		});
		var b = C;
		Object.defineProperty(e, "FileWriteStream", {
			get: function() {
				return b;
			},
			set: function(e) {
				b = e;
			},
			enumerable: !0,
			configurable: !0
		});
		function x(e, t) {
			return this instanceof x ? (_.apply(this, arguments), this) : x.apply(Object.create(x.prototype), arguments);
		}
		function S() {
			var e = this;
			O(e.path, e.flags, e.mode, function(t, n) {
				t ? (e.autoClose && e.destroy(), e.emit("error", t)) : (e.fd = n, e.emit("open", n), e.read());
			});
		}
		function C(e, t) {
			return this instanceof C ? (v.apply(this, arguments), this) : C.apply(Object.create(C.prototype), arguments);
		}
		function w() {
			var e = this;
			O(e.path, e.flags, e.mode, function(t, n) {
				t ? (e.destroy(), e.emit("error", t)) : (e.fd = n, e.emit("open", n));
			});
		}
		function T(t, n) {
			return new e.ReadStream(t, n);
		}
		function E(t, n) {
			return new e.WriteStream(t, n);
		}
		var D = e.open;
		e.open = O;
		function O(e, t, n, r) {
			return typeof n == "function" && (r = n, n = null), i(e, t, n, r);
			function i(e, t, n, r, a) {
				return D(e, t, n, function(o, s) {
					o && (o.code === "EMFILE" || o.code === "ENFILE") ? p([
						i,
						[
							e,
							t,
							n,
							r
						],
						o,
						a || Date.now(),
						Date.now()
					]) : typeof r == "function" && r.apply(this, arguments);
				});
			}
		}
		return e;
	}
	function p(e) {
		d("ENQUEUE", e[0].name, e[1]), n[s].push(e), g();
	}
	var m;
	function h() {
		for (var e = Date.now(), t = 0; t < n[s].length; ++t) n[s][t].length > 2 && (n[s][t][3] = e, n[s][t][4] = e);
		g();
	}
	function g() {
		if (clearTimeout(m), m = void 0, n[s].length !== 0) {
			var e = n[s].shift(), t = e[0], r = e[1], i = e[2], a = e[3], o = e[4];
			if (a === void 0) d("RETRY", t.name, r), t.apply(null, r);
			else if (Date.now() - a >= 6e4) {
				d("TIMEOUT", t.name, r);
				var c = r.pop();
				typeof c == "function" && c.call(null, i);
			} else {
				var l = Date.now() - o, u = Math.max(o - a, 1);
				l >= Math.min(u * 1.2, 100) ? (d("RETRY", t.name, r), t.apply(null, r.concat([a]))) : n[s].push(e);
			}
			m === void 0 && (m = setTimeout(g, 0));
		}
	}
})), z = /* @__PURE__ */ k(((e) => {
	var t = F().fromCallback, n = R(), r = (/* @__PURE__ */ "access.appendFile.chmod.chown.close.copyFile.fchmod.fchown.fdatasync.fstat.fsync.ftruncate.futimes.lchmod.lchown.link.lstat.mkdir.mkdtemp.open.opendir.readdir.readFile.readlink.realpath.rename.rm.rmdir.stat.symlink.truncate.unlink.utimes.writeFile".split(".")).filter((e) => typeof n[e] == "function");
	Object.assign(e, n), r.forEach((r) => {
		e[r] = t(n[r]);
	}), e.exists = function(e, t) {
		return typeof t == "function" ? n.exists(e, t) : new Promise((t) => n.exists(e, t));
	}, e.read = function(e, t, r, i, a, o) {
		return typeof o == "function" ? n.read(e, t, r, i, a, o) : new Promise((o, s) => {
			n.read(e, t, r, i, a, (e, t, n) => {
				if (e) return s(e);
				o({
					bytesRead: t,
					buffer: n
				});
			});
		});
	}, e.write = function(e, t, ...r) {
		return typeof r[r.length - 1] == "function" ? n.write(e, t, ...r) : new Promise((i, a) => {
			n.write(e, t, ...r, (e, t, n) => {
				if (e) return a(e);
				i({
					bytesWritten: t,
					buffer: n
				});
			});
		});
	}, typeof n.writev == "function" && (e.writev = function(e, t, ...r) {
		return typeof r[r.length - 1] == "function" ? n.writev(e, t, ...r) : new Promise((i, a) => {
			n.writev(e, t, ...r, (e, t, n) => {
				if (e) return a(e);
				i({
					bytesWritten: t,
					buffers: n
				});
			});
		});
	}), typeof n.realpath.native == "function" ? e.realpath.native = t(n.realpath.native) : process.emitWarning("fs.realpath.native is not a function. Is fs being monkey-patched?", "Warning", "fs-extra-WARN0003");
})), te = /* @__PURE__ */ k(((e, t) => {
	var n = P("path");
	t.exports.checkPath = function(e) {
		if (process.platform === "win32" && /[<>:"|?*]/.test(e.replace(n.parse(e).root, ""))) {
			let t = /* @__PURE__ */ Error(`Path contains invalid characters: ${e}`);
			throw t.code = "EINVAL", t;
		}
	};
})), B = /* @__PURE__ */ k(((e, t) => {
	var n = z(), { checkPath: r } = te(), i = (e) => typeof e == "number" ? e : {
		mode: 511,
		...e
	}.mode;
	t.exports.makeDir = async (e, t) => (r(e), n.mkdir(e, {
		mode: i(t),
		recursive: !0
	})), t.exports.makeDirSync = (e, t) => (r(e), n.mkdirSync(e, {
		mode: i(t),
		recursive: !0
	}));
})), V = /* @__PURE__ */ k(((e, t) => {
	var n = F().fromPromise, { makeDir: r, makeDirSync: i } = B(), a = n(r);
	t.exports = {
		mkdirs: a,
		mkdirsSync: i,
		mkdirp: a,
		mkdirpSync: i,
		ensureDir: a,
		ensureDirSync: i
	};
})), H = /* @__PURE__ */ k(((e, t) => {
	var n = F().fromPromise, r = z();
	function i(e) {
		return r.access(e).then(() => !0).catch(() => !1);
	}
	t.exports = {
		pathExists: n(i),
		pathExistsSync: r.existsSync
	};
})), ne = /* @__PURE__ */ k(((e, t) => {
	var n = R();
	function r(e, t, r, i) {
		n.open(e, "r+", (e, a) => {
			if (e) return i(e);
			n.futimes(a, t, r, (e) => {
				n.close(a, (t) => {
					i && i(e || t);
				});
			});
		});
	}
	function i(e, t, r) {
		let i = n.openSync(e, "r+");
		return n.futimesSync(i, t, r), n.closeSync(i);
	}
	t.exports = {
		utimesMillis: r,
		utimesMillisSync: i
	};
})), U = /* @__PURE__ */ k(((e, t) => {
	var n = z(), r = P("path"), i = P("util");
	function a(e, t, r) {
		let i = r.dereference ? (e) => n.stat(e, { bigint: !0 }) : (e) => n.lstat(e, { bigint: !0 });
		return Promise.all([i(e), i(t).catch((e) => {
			if (e.code === "ENOENT") return null;
			throw e;
		})]).then(([e, t]) => ({
			srcStat: e,
			destStat: t
		}));
	}
	function o(e, t, r) {
		let i, a = r.dereference ? (e) => n.statSync(e, { bigint: !0 }) : (e) => n.lstatSync(e, { bigint: !0 }), o = a(e);
		try {
			i = a(t);
		} catch (e) {
			if (e.code === "ENOENT") return {
				srcStat: o,
				destStat: null
			};
			throw e;
		}
		return {
			srcStat: o,
			destStat: i
		};
	}
	function s(e, t, n, o, s) {
		i.callbackify(a)(e, t, o, (i, a) => {
			if (i) return s(i);
			let { srcStat: o, destStat: c } = a;
			if (c) {
				if (d(o, c)) {
					let i = r.basename(e), a = r.basename(t);
					return n === "move" && i !== a && i.toLowerCase() === a.toLowerCase() ? s(null, {
						srcStat: o,
						destStat: c,
						isChangingCase: !0
					}) : s(/* @__PURE__ */ Error("Source and destination must not be the same."));
				}
				if (o.isDirectory() && !c.isDirectory()) return s(/* @__PURE__ */ Error(`Cannot overwrite non-directory '${t}' with directory '${e}'.`));
				if (!o.isDirectory() && c.isDirectory()) return s(/* @__PURE__ */ Error(`Cannot overwrite directory '${t}' with non-directory '${e}'.`));
			}
			return o.isDirectory() && f(e, t) ? s(Error(p(e, t, n))) : s(null, {
				srcStat: o,
				destStat: c
			});
		});
	}
	function c(e, t, n, i) {
		let { srcStat: a, destStat: s } = o(e, t, i);
		if (s) {
			if (d(a, s)) {
				let i = r.basename(e), o = r.basename(t);
				if (n === "move" && i !== o && i.toLowerCase() === o.toLowerCase()) return {
					srcStat: a,
					destStat: s,
					isChangingCase: !0
				};
				throw Error("Source and destination must not be the same.");
			}
			if (a.isDirectory() && !s.isDirectory()) throw Error(`Cannot overwrite non-directory '${t}' with directory '${e}'.`);
			if (!a.isDirectory() && s.isDirectory()) throw Error(`Cannot overwrite directory '${t}' with non-directory '${e}'.`);
		}
		if (a.isDirectory() && f(e, t)) throw Error(p(e, t, n));
		return {
			srcStat: a,
			destStat: s
		};
	}
	function l(e, t, i, a, o) {
		let s = r.resolve(r.dirname(e)), c = r.resolve(r.dirname(i));
		if (c === s || c === r.parse(c).root) return o();
		n.stat(c, { bigint: !0 }, (n, r) => n ? n.code === "ENOENT" ? o() : o(n) : d(t, r) ? o(Error(p(e, i, a))) : l(e, t, c, a, o));
	}
	function u(e, t, i, a) {
		let o = r.resolve(r.dirname(e)), s = r.resolve(r.dirname(i));
		if (s === o || s === r.parse(s).root) return;
		let c;
		try {
			c = n.statSync(s, { bigint: !0 });
		} catch (e) {
			if (e.code === "ENOENT") return;
			throw e;
		}
		if (d(t, c)) throw Error(p(e, i, a));
		return u(e, t, s, a);
	}
	function d(e, t) {
		return t.ino && t.dev && t.ino === e.ino && t.dev === e.dev;
	}
	function f(e, t) {
		let n = r.resolve(e).split(r.sep).filter((e) => e), i = r.resolve(t).split(r.sep).filter((e) => e);
		return n.reduce((e, t, n) => e && i[n] === t, !0);
	}
	function p(e, t, n) {
		return `Cannot ${n} '${e}' to a subdirectory of itself, '${t}'.`;
	}
	t.exports = {
		checkPaths: s,
		checkPathsSync: c,
		checkParentPaths: l,
		checkParentPathsSync: u,
		isSrcSubdir: f,
		areIdentical: d
	};
})), re = /* @__PURE__ */ k(((e, t) => {
	var n = R(), r = P("path"), i = V().mkdirs, a = H().pathExists, o = ne().utimesMillis, s = U();
	function c(e, t, n, r) {
		typeof n == "function" && !r ? (r = n, n = {}) : typeof n == "function" && (n = { filter: n }), r ||= function() {}, n ||= {}, n.clobber = "clobber" in n ? !!n.clobber : !0, n.overwrite = "overwrite" in n ? !!n.overwrite : n.clobber, n.preserveTimestamps && process.arch === "ia32" && process.emitWarning("Using the preserveTimestamps option in 32-bit node is not recommended;\n\n	see https://github.com/jprichardson/node-fs-extra/issues/269", "Warning", "fs-extra-WARN0001"), s.checkPaths(e, t, "copy", n, (i, a) => {
			if (i) return r(i);
			let { srcStat: o, destStat: c } = a;
			s.checkParentPaths(e, o, t, "copy", (i) => i ? r(i) : n.filter ? u(l, c, e, t, n, r) : l(c, e, t, n, r));
		});
	}
	function l(e, t, n, o, s) {
		let c = r.dirname(n);
		a(c, (r, a) => {
			if (r) return s(r);
			if (a) return f(e, t, n, o, s);
			i(c, (r) => r ? s(r) : f(e, t, n, o, s));
		});
	}
	function u(e, t, n, r, i, a) {
		Promise.resolve(i.filter(n, r)).then((o) => o ? e(t, n, r, i, a) : a(), (e) => a(e));
	}
	function d(e, t, n, r, i) {
		return r.filter ? u(f, e, t, n, r, i) : f(e, t, n, r, i);
	}
	function f(e, t, r, i, a) {
		(i.dereference ? n.stat : n.lstat)(t, (n, o) => n ? a(n) : o.isDirectory() ? S(o, e, t, r, i, a) : o.isFile() || o.isCharacterDevice() || o.isBlockDevice() ? p(o, e, t, r, i, a) : o.isSymbolicLink() ? D(e, t, r, i, a) : o.isSocket() ? a(/* @__PURE__ */ Error(`Cannot copy a socket file: ${t}`)) : o.isFIFO() ? a(/* @__PURE__ */ Error(`Cannot copy a FIFO pipe: ${t}`)) : a(/* @__PURE__ */ Error(`Unknown file: ${t}`)));
	}
	function p(e, t, n, r, i, a) {
		return t ? m(e, n, r, i, a) : h(e, n, r, i, a);
	}
	function m(e, t, r, i, a) {
		if (i.overwrite) n.unlink(r, (n) => n ? a(n) : h(e, t, r, i, a));
		else if (i.errorOnExist) return a(/* @__PURE__ */ Error(`'${r}' already exists`));
		else return a();
	}
	function h(e, t, r, i, a) {
		n.copyFile(t, r, (n) => n ? a(n) : i.preserveTimestamps ? g(e.mode, t, r, a) : b(r, e.mode, a));
	}
	function g(e, t, n, r) {
		return _(e) ? v(n, e, (i) => i ? r(i) : y(e, t, n, r)) : y(e, t, n, r);
	}
	function _(e) {
		return !(e & 128);
	}
	function v(e, t, n) {
		return b(e, t | 128, n);
	}
	function y(e, t, n, r) {
		x(t, n, (t) => t ? r(t) : b(n, e, r));
	}
	function b(e, t, r) {
		return n.chmod(e, t, r);
	}
	function x(e, t, r) {
		n.stat(e, (e, n) => e ? r(e) : o(t, n.atime, n.mtime, r));
	}
	function S(e, t, n, r, i, a) {
		return t ? w(n, r, i, a) : C(e.mode, n, r, i, a);
	}
	function C(e, t, r, i, a) {
		n.mkdir(r, (n) => {
			if (n) return a(n);
			w(t, r, i, (t) => t ? a(t) : b(r, e, a));
		});
	}
	function w(e, t, r, i) {
		n.readdir(e, (n, a) => n ? i(n) : T(a, e, t, r, i));
	}
	function T(e, t, n, r, i) {
		let a = e.pop();
		return a ? E(e, a, t, n, r, i) : i();
	}
	function E(e, t, n, i, a, o) {
		let c = r.join(n, t), l = r.join(i, t);
		s.checkPaths(c, l, "copy", a, (t, r) => {
			if (t) return o(t);
			let { destStat: s } = r;
			d(s, c, l, a, (t) => t ? o(t) : T(e, n, i, a, o));
		});
	}
	function D(e, t, i, a, o) {
		n.readlink(t, (t, c) => {
			if (t) return o(t);
			if (a.dereference && (c = r.resolve(process.cwd(), c)), e) n.readlink(i, (t, l) => t ? t.code === "EINVAL" || t.code === "UNKNOWN" ? n.symlink(c, i, o) : o(t) : (a.dereference && (l = r.resolve(process.cwd(), l)), s.isSrcSubdir(c, l) ? o(/* @__PURE__ */ Error(`Cannot copy '${c}' to a subdirectory of itself, '${l}'.`)) : e.isDirectory() && s.isSrcSubdir(l, c) ? o(/* @__PURE__ */ Error(`Cannot overwrite '${l}' with '${c}'.`)) : O(c, i, o)));
			else return n.symlink(c, i, o);
		});
	}
	function O(e, t, r) {
		n.unlink(t, (i) => i ? r(i) : n.symlink(e, t, r));
	}
	t.exports = c;
})), W = /* @__PURE__ */ k(((e, t) => {
	var n = R(), r = P("path"), i = V().mkdirsSync, a = ne().utimesMillisSync, o = U();
	function s(e, t, n) {
		typeof n == "function" && (n = { filter: n }), n ||= {}, n.clobber = "clobber" in n ? !!n.clobber : !0, n.overwrite = "overwrite" in n ? !!n.overwrite : n.clobber, n.preserveTimestamps && process.arch === "ia32" && process.emitWarning("Using the preserveTimestamps option in 32-bit node is not recommended;\n\n	see https://github.com/jprichardson/node-fs-extra/issues/269", "Warning", "fs-extra-WARN0002");
		let { srcStat: r, destStat: i } = o.checkPathsSync(e, t, "copy", n);
		return o.checkParentPathsSync(e, r, t, "copy"), c(i, e, t, n);
	}
	function c(e, t, a, o) {
		if (o.filter && !o.filter(t, a)) return;
		let s = r.dirname(a);
		return n.existsSync(s) || i(s), u(e, t, a, o);
	}
	function l(e, t, n, r) {
		if (!r.filter || r.filter(t, n)) return u(e, t, n, r);
	}
	function u(e, t, r, i) {
		let a = (i.dereference ? n.statSync : n.lstatSync)(t);
		if (a.isDirectory()) return y(a, e, t, r, i);
		if (a.isFile() || a.isCharacterDevice() || a.isBlockDevice()) return d(a, e, t, r, i);
		if (a.isSymbolicLink()) return C(e, t, r, i);
		throw a.isSocket() ? Error(`Cannot copy a socket file: ${t}`) : a.isFIFO() ? Error(`Cannot copy a FIFO pipe: ${t}`) : Error(`Unknown file: ${t}`);
	}
	function d(e, t, n, r, i) {
		return t ? f(e, n, r, i) : p(e, n, r, i);
	}
	function f(e, t, r, i) {
		if (i.overwrite) return n.unlinkSync(r), p(e, t, r, i);
		if (i.errorOnExist) throw Error(`'${r}' already exists`);
	}
	function p(e, t, r, i) {
		return n.copyFileSync(t, r), i.preserveTimestamps && m(e.mode, t, r), _(r, e.mode);
	}
	function m(e, t, n) {
		return h(e) && g(n, e), v(t, n);
	}
	function h(e) {
		return !(e & 128);
	}
	function g(e, t) {
		return _(e, t | 128);
	}
	function _(e, t) {
		return n.chmodSync(e, t);
	}
	function v(e, t) {
		let r = n.statSync(e);
		return a(t, r.atime, r.mtime);
	}
	function y(e, t, n, r, i) {
		return t ? x(n, r, i) : b(e.mode, n, r, i);
	}
	function b(e, t, r, i) {
		return n.mkdirSync(r), x(t, r, i), _(r, e);
	}
	function x(e, t, r) {
		n.readdirSync(e).forEach((n) => S(n, e, t, r));
	}
	function S(e, t, n, i) {
		let a = r.join(t, e), s = r.join(n, e), { destStat: c } = o.checkPathsSync(a, s, "copy", i);
		return l(c, a, s, i);
	}
	function C(e, t, i, a) {
		let s = n.readlinkSync(t);
		if (a.dereference && (s = r.resolve(process.cwd(), s)), e) {
			let e;
			try {
				e = n.readlinkSync(i);
			} catch (e) {
				if (e.code === "EINVAL" || e.code === "UNKNOWN") return n.symlinkSync(s, i);
				throw e;
			}
			if (a.dereference && (e = r.resolve(process.cwd(), e)), o.isSrcSubdir(s, e)) throw Error(`Cannot copy '${s}' to a subdirectory of itself, '${e}'.`);
			if (n.statSync(i).isDirectory() && o.isSrcSubdir(e, s)) throw Error(`Cannot overwrite '${e}' with '${s}'.`);
			return w(s, i);
		}
		return n.symlinkSync(s, i);
	}
	function w(e, t) {
		return n.unlinkSync(t), n.symlinkSync(e, t);
	}
	t.exports = s;
})), ie = /* @__PURE__ */ k(((e, t) => {
	var n = F().fromCallback;
	t.exports = {
		copy: n(re()),
		copySync: W()
	};
})), ae = /* @__PURE__ */ k(((e, t) => {
	var n = R(), r = P("path"), i = P("assert"), a = process.platform === "win32";
	function o(e) {
		[
			"unlink",
			"chmod",
			"stat",
			"lstat",
			"rmdir",
			"readdir"
		].forEach((t) => {
			e[t] = e[t] || n[t], t += "Sync", e[t] = e[t] || n[t];
		}), e.maxBusyTries = e.maxBusyTries || 3;
	}
	function s(e, t, n) {
		let r = 0;
		typeof t == "function" && (n = t, t = {}), i(e, "rimraf: missing path"), i.strictEqual(typeof e, "string", "rimraf: path should be a string"), i.strictEqual(typeof n, "function", "rimraf: callback function required"), i(t, "rimraf: invalid options argument provided"), i.strictEqual(typeof t, "object", "rimraf: options should be object"), o(t), c(e, t, function i(a) {
			if (a) {
				if ((a.code === "EBUSY" || a.code === "ENOTEMPTY" || a.code === "EPERM") && r < t.maxBusyTries) {
					r++;
					let n = r * 100;
					return setTimeout(() => c(e, t, i), n);
				}
				a.code === "ENOENT" && (a = null);
			}
			n(a);
		});
	}
	function c(e, t, n) {
		i(e), i(t), i(typeof n == "function"), t.lstat(e, (r, i) => {
			if (r && r.code === "ENOENT") return n(null);
			if (r && r.code === "EPERM" && a) return l(e, t, r, n);
			if (i && i.isDirectory()) return d(e, t, r, n);
			t.unlink(e, (r) => {
				if (r) {
					if (r.code === "ENOENT") return n(null);
					if (r.code === "EPERM") return a ? l(e, t, r, n) : d(e, t, r, n);
					if (r.code === "EISDIR") return d(e, t, r, n);
				}
				return n(r);
			});
		});
	}
	function l(e, t, n, r) {
		i(e), i(t), i(typeof r == "function"), t.chmod(e, 438, (i) => {
			i ? r(i.code === "ENOENT" ? null : n) : t.stat(e, (i, a) => {
				i ? r(i.code === "ENOENT" ? null : n) : a.isDirectory() ? d(e, t, n, r) : t.unlink(e, r);
			});
		});
	}
	function u(e, t, n) {
		let r;
		i(e), i(t);
		try {
			t.chmodSync(e, 438);
		} catch (e) {
			if (e.code === "ENOENT") return;
			throw n;
		}
		try {
			r = t.statSync(e);
		} catch (e) {
			if (e.code === "ENOENT") return;
			throw n;
		}
		r.isDirectory() ? m(e, t, n) : t.unlinkSync(e);
	}
	function d(e, t, n, r) {
		i(e), i(t), i(typeof r == "function"), t.rmdir(e, (i) => {
			i && (i.code === "ENOTEMPTY" || i.code === "EEXIST" || i.code === "EPERM") ? f(e, t, r) : i && i.code === "ENOTDIR" ? r(n) : r(i);
		});
	}
	function f(e, t, n) {
		i(e), i(t), i(typeof n == "function"), t.readdir(e, (i, a) => {
			if (i) return n(i);
			let o = a.length, c;
			if (o === 0) return t.rmdir(e, n);
			a.forEach((i) => {
				s(r.join(e, i), t, (r) => {
					if (!c) {
						if (r) return n(c = r);
						--o === 0 && t.rmdir(e, n);
					}
				});
			});
		});
	}
	function p(e, t) {
		let n;
		t ||= {}, o(t), i(e, "rimraf: missing path"), i.strictEqual(typeof e, "string", "rimraf: path should be a string"), i(t, "rimraf: missing options"), i.strictEqual(typeof t, "object", "rimraf: options should be object");
		try {
			n = t.lstatSync(e);
		} catch (n) {
			if (n.code === "ENOENT") return;
			n.code === "EPERM" && a && u(e, t, n);
		}
		try {
			n && n.isDirectory() ? m(e, t, null) : t.unlinkSync(e);
		} catch (n) {
			if (n.code === "ENOENT") return;
			if (n.code === "EPERM") return a ? u(e, t, n) : m(e, t, n);
			if (n.code !== "EISDIR") throw n;
			m(e, t, n);
		}
	}
	function m(e, t, n) {
		i(e), i(t);
		try {
			t.rmdirSync(e);
		} catch (r) {
			if (r.code === "ENOTDIR") throw n;
			if (r.code === "ENOTEMPTY" || r.code === "EEXIST" || r.code === "EPERM") h(e, t);
			else if (r.code !== "ENOENT") throw r;
		}
	}
	function h(e, t) {
		if (i(e), i(t), t.readdirSync(e).forEach((n) => p(r.join(e, n), t)), a) {
			let n = Date.now();
			do
				try {
					return t.rmdirSync(e, t);
				} catch {}
			while (Date.now() - n < 500);
		} else return t.rmdirSync(e, t);
	}
	t.exports = s, s.sync = p;
})), oe = /* @__PURE__ */ k(((e, t) => {
	var n = R(), r = F().fromCallback, i = ae();
	function a(e, t) {
		if (n.rm) return n.rm(e, {
			recursive: !0,
			force: !0
		}, t);
		i(e, t);
	}
	function o(e) {
		if (n.rmSync) return n.rmSync(e, {
			recursive: !0,
			force: !0
		});
		i.sync(e);
	}
	t.exports = {
		remove: r(a),
		removeSync: o
	};
})), se = /* @__PURE__ */ k(((e, t) => {
	var n = F().fromPromise, r = z(), i = P("path"), a = V(), o = oe(), s = n(async function(e) {
		let t;
		try {
			t = await r.readdir(e);
		} catch {
			return a.mkdirs(e);
		}
		return Promise.all(t.map((t) => o.remove(i.join(e, t))));
	});
	function c(e) {
		let t;
		try {
			t = r.readdirSync(e);
		} catch {
			return a.mkdirsSync(e);
		}
		t.forEach((t) => {
			t = i.join(e, t), o.removeSync(t);
		});
	}
	t.exports = {
		emptyDirSync: c,
		emptydirSync: c,
		emptyDir: s,
		emptydir: s
	};
})), ce = /* @__PURE__ */ k(((e, t) => {
	var n = F().fromCallback, r = P("path"), i = R(), a = V();
	function o(e, t) {
		function n() {
			i.writeFile(e, "", (e) => {
				if (e) return t(e);
				t();
			});
		}
		i.stat(e, (o, s) => {
			if (!o && s.isFile()) return t();
			let c = r.dirname(e);
			i.stat(c, (e, r) => {
				if (e) return e.code === "ENOENT" ? a.mkdirs(c, (e) => {
					if (e) return t(e);
					n();
				}) : t(e);
				r.isDirectory() ? n() : i.readdir(c, (e) => {
					if (e) return t(e);
				});
			});
		});
	}
	function s(e) {
		let t;
		try {
			t = i.statSync(e);
		} catch {}
		if (t && t.isFile()) return;
		let n = r.dirname(e);
		try {
			i.statSync(n).isDirectory() || i.readdirSync(n);
		} catch (e) {
			if (e && e.code === "ENOENT") a.mkdirsSync(n);
			else throw e;
		}
		i.writeFileSync(e, "");
	}
	t.exports = {
		createFile: n(o),
		createFileSync: s
	};
})), G = /* @__PURE__ */ k(((e, t) => {
	var n = F().fromCallback, r = P("path"), i = R(), a = V(), o = H().pathExists, { areIdentical: s } = U();
	function c(e, t, n) {
		function c(e, t) {
			i.link(e, t, (e) => {
				if (e) return n(e);
				n(null);
			});
		}
		i.lstat(t, (l, u) => {
			i.lstat(e, (i, l) => {
				if (i) return i.message = i.message.replace("lstat", "ensureLink"), n(i);
				if (u && s(l, u)) return n(null);
				let d = r.dirname(t);
				o(d, (r, i) => {
					if (r) return n(r);
					if (i) return c(e, t);
					a.mkdirs(d, (r) => {
						if (r) return n(r);
						c(e, t);
					});
				});
			});
		});
	}
	function l(e, t) {
		let n;
		try {
			n = i.lstatSync(t);
		} catch {}
		try {
			let t = i.lstatSync(e);
			if (n && s(t, n)) return;
		} catch (e) {
			throw e.message = e.message.replace("lstat", "ensureLink"), e;
		}
		let o = r.dirname(t);
		return i.existsSync(o) || a.mkdirsSync(o), i.linkSync(e, t);
	}
	t.exports = {
		createLink: n(c),
		createLinkSync: l
	};
})), le = /* @__PURE__ */ k(((e, t) => {
	var n = P("path"), r = R(), i = H().pathExists;
	function a(e, t, a) {
		if (n.isAbsolute(e)) return r.lstat(e, (t) => t ? (t.message = t.message.replace("lstat", "ensureSymlink"), a(t)) : a(null, {
			toCwd: e,
			toDst: e
		}));
		{
			let o = n.dirname(t), s = n.join(o, e);
			return i(s, (t, i) => t ? a(t) : i ? a(null, {
				toCwd: s,
				toDst: e
			}) : r.lstat(e, (t) => t ? (t.message = t.message.replace("lstat", "ensureSymlink"), a(t)) : a(null, {
				toCwd: e,
				toDst: n.relative(o, e)
			})));
		}
	}
	function o(e, t) {
		let i;
		if (n.isAbsolute(e)) {
			if (i = r.existsSync(e), !i) throw Error("absolute srcpath does not exist");
			return {
				toCwd: e,
				toDst: e
			};
		}
		{
			let a = n.dirname(t), o = n.join(a, e);
			if (i = r.existsSync(o), i) return {
				toCwd: o,
				toDst: e
			};
			if (i = r.existsSync(e), !i) throw Error("relative srcpath does not exist");
			return {
				toCwd: e,
				toDst: n.relative(a, e)
			};
		}
	}
	t.exports = {
		symlinkPaths: a,
		symlinkPathsSync: o
	};
})), ue = /* @__PURE__ */ k(((e, t) => {
	var n = R();
	function r(e, t, r) {
		if (r = typeof t == "function" ? t : r, t = typeof t != "function" && t, t) return r(null, t);
		n.lstat(e, (e, n) => {
			if (e) return r(null, "file");
			t = n && n.isDirectory() ? "dir" : "file", r(null, t);
		});
	}
	function i(e, t) {
		let r;
		if (t) return t;
		try {
			r = n.lstatSync(e);
		} catch {
			return "file";
		}
		return r && r.isDirectory() ? "dir" : "file";
	}
	t.exports = {
		symlinkType: r,
		symlinkTypeSync: i
	};
})), de = /* @__PURE__ */ k(((e, t) => {
	var n = F().fromCallback, r = P("path"), i = z(), a = V(), o = a.mkdirs, s = a.mkdirsSync, c = le(), l = c.symlinkPaths, u = c.symlinkPathsSync, d = ue(), f = d.symlinkType, p = d.symlinkTypeSync, m = H().pathExists, { areIdentical: h } = U();
	function g(e, t, n, r) {
		r = typeof n == "function" ? n : r, n = typeof n != "function" && n, i.lstat(t, (a, o) => {
			!a && o.isSymbolicLink() ? Promise.all([i.stat(e), i.stat(t)]).then(([i, a]) => {
				if (h(i, a)) return r(null);
				_(e, t, n, r);
			}) : _(e, t, n, r);
		});
	}
	function _(e, t, n, a) {
		l(e, t, (s, c) => {
			if (s) return a(s);
			e = c.toDst, f(c.toCwd, n, (n, s) => {
				if (n) return a(n);
				let c = r.dirname(t);
				m(c, (n, r) => {
					if (n) return a(n);
					if (r) return i.symlink(e, t, s, a);
					o(c, (n) => {
						if (n) return a(n);
						i.symlink(e, t, s, a);
					});
				});
			});
		});
	}
	function v(e, t, n) {
		let a;
		try {
			a = i.lstatSync(t);
		} catch {}
		if (a && a.isSymbolicLink() && h(i.statSync(e), i.statSync(t))) return;
		let o = u(e, t);
		e = o.toDst, n = p(o.toCwd, n);
		let c = r.dirname(t);
		return i.existsSync(c) || s(c), i.symlinkSync(e, t, n);
	}
	t.exports = {
		createSymlink: n(g),
		createSymlinkSync: v
	};
})), fe = /* @__PURE__ */ k(((e, t) => {
	var { createFile: n, createFileSync: r } = ce(), { createLink: i, createLinkSync: a } = G(), { createSymlink: o, createSymlinkSync: s } = de();
	t.exports = {
		createFile: n,
		createFileSync: r,
		ensureFile: n,
		ensureFileSync: r,
		createLink: i,
		createLinkSync: a,
		ensureLink: i,
		ensureLinkSync: a,
		createSymlink: o,
		createSymlinkSync: s,
		ensureSymlink: o,
		ensureSymlinkSync: s
	};
})), pe = /* @__PURE__ */ k(((e, t) => {
	function n(e, { EOL: t = "\n", finalEOL: n = !0, replacer: r = null, spaces: i } = {}) {
		let a = n ? t : "", o = JSON.stringify(e, r, i);
		if (o === void 0) throw TypeError(`Converting ${typeof e} value to JSON is not supported`);
		return o.replace(/\n/g, t) + a;
	}
	function r(e) {
		return Buffer.isBuffer(e) && (e = e.toString("utf8")), e.replace(/^\uFEFF/, "");
	}
	t.exports = {
		stringify: n,
		stripBom: r
	};
})), me = /* @__PURE__ */ k(((e, t) => {
	var n;
	try {
		n = R();
	} catch {
		n = P("fs");
	}
	var r = F(), { stringify: i, stripBom: a } = pe();
	async function o(e, t = {}) {
		typeof t == "string" && (t = { encoding: t });
		let i = t.fs || n, o = "throws" in t ? t.throws : !0, s = await r.fromCallback(i.readFile)(e, t);
		s = a(s);
		let c;
		try {
			c = JSON.parse(s, t ? t.reviver : null);
		} catch (t) {
			if (o) throw t.message = `${e}: ${t.message}`, t;
			return null;
		}
		return c;
	}
	var s = r.fromPromise(o);
	function c(e, t = {}) {
		typeof t == "string" && (t = { encoding: t });
		let r = t.fs || n, i = "throws" in t ? t.throws : !0;
		try {
			let n = r.readFileSync(e, t);
			return n = a(n), JSON.parse(n, t.reviver);
		} catch (t) {
			if (i) throw t.message = `${e}: ${t.message}`, t;
			return null;
		}
	}
	async function l(e, t, a = {}) {
		let o = a.fs || n, s = i(t, a);
		await r.fromCallback(o.writeFile)(e, s, a);
	}
	var u = r.fromPromise(l);
	function d(e, t, r = {}) {
		let a = r.fs || n, o = i(t, r);
		return a.writeFileSync(e, o, r);
	}
	t.exports = {
		readFile: s,
		readFileSync: c,
		writeFile: u,
		writeFileSync: d
	};
})), he = /* @__PURE__ */ k(((e, t) => {
	var n = me();
	t.exports = {
		readJson: n.readFile,
		readJsonSync: n.readFileSync,
		writeJson: n.writeFile,
		writeJsonSync: n.writeFileSync
	};
})), ge = /* @__PURE__ */ k(((e, t) => {
	var n = F().fromCallback, r = R(), i = P("path"), a = V(), o = H().pathExists;
	function s(e, t, n, s) {
		typeof n == "function" && (s = n, n = "utf8");
		let c = i.dirname(e);
		o(c, (i, o) => {
			if (i) return s(i);
			if (o) return r.writeFile(e, t, n, s);
			a.mkdirs(c, (i) => {
				if (i) return s(i);
				r.writeFile(e, t, n, s);
			});
		});
	}
	function c(e, ...t) {
		let n = i.dirname(e);
		if (r.existsSync(n)) return r.writeFileSync(e, ...t);
		a.mkdirsSync(n), r.writeFileSync(e, ...t);
	}
	t.exports = {
		outputFile: n(s),
		outputFileSync: c
	};
})), _e = /* @__PURE__ */ k(((e, t) => {
	var { stringify: n } = pe(), { outputFile: r } = ge();
	async function i(e, t, i = {}) {
		await r(e, n(t, i), i);
	}
	t.exports = i;
})), ve = /* @__PURE__ */ k(((e, t) => {
	var { stringify: n } = pe(), { outputFileSync: r } = ge();
	function i(e, t, i) {
		r(e, n(t, i), i);
	}
	t.exports = i;
})), ye = /* @__PURE__ */ k(((e, t) => {
	var n = F().fromPromise, r = he();
	r.outputJson = n(_e()), r.outputJsonSync = ve(), r.outputJSON = r.outputJson, r.outputJSONSync = r.outputJsonSync, r.writeJSON = r.writeJson, r.writeJSONSync = r.writeJsonSync, r.readJSON = r.readJson, r.readJSONSync = r.readJsonSync, t.exports = r;
})), be = /* @__PURE__ */ k(((e, t) => {
	var n = R(), r = P("path"), i = ie().copy, a = oe().remove, o = V().mkdirp, s = H().pathExists, c = U();
	function l(e, t, n, i) {
		typeof n == "function" && (i = n, n = {}), n ||= {};
		let a = n.overwrite || n.clobber || !1;
		c.checkPaths(e, t, "move", n, (n, s) => {
			if (n) return i(n);
			let { srcStat: l, isChangingCase: f = !1 } = s;
			c.checkParentPaths(e, l, t, "move", (n) => {
				if (n) return i(n);
				if (u(t)) return d(e, t, a, f, i);
				o(r.dirname(t), (n) => n ? i(n) : d(e, t, a, f, i));
			});
		});
	}
	function u(e) {
		let t = r.dirname(e);
		return r.parse(t).root === t;
	}
	function d(e, t, n, r, i) {
		if (r) return f(e, t, n, i);
		if (n) return a(t, (r) => r ? i(r) : f(e, t, n, i));
		s(t, (r, a) => r ? i(r) : a ? i(/* @__PURE__ */ Error("dest already exists.")) : f(e, t, n, i));
	}
	function f(e, t, r, i) {
		n.rename(e, t, (n) => n ? n.code === "EXDEV" ? p(e, t, r, i) : i(n) : i());
	}
	function p(e, t, n, r) {
		i(e, t, {
			overwrite: n,
			errorOnExist: !0
		}, (t) => t ? r(t) : a(e, r));
	}
	t.exports = l;
})), xe = /* @__PURE__ */ k(((e, t) => {
	var n = R(), r = P("path"), i = ie().copySync, a = oe().removeSync, o = V().mkdirpSync, s = U();
	function c(e, t, n) {
		n ||= {};
		let i = n.overwrite || n.clobber || !1, { srcStat: a, isChangingCase: c = !1 } = s.checkPathsSync(e, t, "move", n);
		return s.checkParentPathsSync(e, a, t, "move"), l(t) || o(r.dirname(t)), u(e, t, i, c);
	}
	function l(e) {
		let t = r.dirname(e);
		return r.parse(t).root === t;
	}
	function u(e, t, r, i) {
		if (i) return d(e, t, r);
		if (r) return a(t), d(e, t, r);
		if (n.existsSync(t)) throw Error("dest already exists.");
		return d(e, t, r);
	}
	function d(e, t, r) {
		try {
			n.renameSync(e, t);
		} catch (n) {
			if (n.code !== "EXDEV") throw n;
			return f(e, t, r);
		}
	}
	function f(e, t, n) {
		return i(e, t, {
			overwrite: n,
			errorOnExist: !0
		}), a(e);
	}
	t.exports = c;
})), Se = /* @__PURE__ */ k(((e, t) => {
	var n = F().fromCallback;
	t.exports = {
		move: n(be()),
		moveSync: xe()
	};
})), Ce = /* @__PURE__ */ k(((e, t) => {
	t.exports = {
		...z(),
		...ie(),
		...se(),
		...fe(),
		...ye(),
		...V(),
		...Se(),
		...ge(),
		...H(),
		...oe()
	};
})), we = /* @__PURE__ */ k(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.CancellationError = e.CancellationToken = void 0;
	var t = P("events");
	e.CancellationToken = class extends t.EventEmitter {
		get cancelled() {
			return this._cancelled || this._parent != null && this._parent.cancelled;
		}
		set parent(e) {
			this.removeParentCancelHandler(), this._parent = e, this.parentCancelHandler = () => this.cancel(), this._parent.onCancel(this.parentCancelHandler);
		}
		constructor(e) {
			super(), this.parentCancelHandler = null, this._parent = null, this._cancelled = !1, e != null && (this.parent = e);
		}
		cancel() {
			this._cancelled = !0, this.emit("cancel");
		}
		onCancel(e) {
			this.cancelled ? e() : this.once("cancel", e);
		}
		createPromise(e) {
			if (this.cancelled) return Promise.reject(new n());
			let t = () => {
				if (r != null) try {
					this.removeListener("cancel", r), r = null;
				} catch {}
			}, r = null;
			return new Promise((t, i) => {
				let a = null;
				if (r = () => {
					try {
						a != null && (a(), a = null);
					} finally {
						i(new n());
					}
				}, this.cancelled) {
					r();
					return;
				}
				this.onCancel(r), e(t, i, (e) => {
					a = e;
				});
			}).then((e) => (t(), e)).catch((e) => {
				throw t(), e;
			});
		}
		removeParentCancelHandler() {
			let e = this._parent;
			e != null && this.parentCancelHandler != null && (e.removeListener("cancel", this.parentCancelHandler), this.parentCancelHandler = null);
		}
		dispose() {
			try {
				this.removeParentCancelHandler();
			} finally {
				this.removeAllListeners(), this._parent = null;
			}
		}
	};
	var n = class extends Error {
		constructor() {
			super("cancelled");
		}
	};
	e.CancellationError = n;
})), Te = /* @__PURE__ */ k(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.newError = t;
	function t(e, t) {
		let n = Error(e);
		return n.code = t, n;
	}
})), Ee = /* @__PURE__ */ k(((e, t) => {
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
})), De = /* @__PURE__ */ k(((e, t) => {
	function n(e) {
		n.debug = n, n.default = n, n.coerce = c, n.disable = o, n.enable = i, n.enabled = s, n.humanize = Ee(), n.destroy = l, Object.keys(e).forEach((t) => {
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
})), Oe = /* @__PURE__ */ k(((e, t) => {
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
	t.exports = De()(e);
	var { formatters: s } = t.exports;
	s.j = function(e) {
		try {
			return JSON.stringify(e);
		} catch (e) {
			return "[UnexpectedJSONParseError]: " + e.message;
		}
	};
})), ke = /* @__PURE__ */ A({
	createSupportsColor: () => Pe,
	default: () => Ie
});
function Ae(e, t = globalThis.Deno ? globalThis.Deno.args : f.argv) {
	let n = e.startsWith("-") ? "" : e.length === 1 ? "-" : "--", r = t.indexOf(n + e), i = t.indexOf("--");
	return r !== -1 && (i === -1 || r < i);
}
function je() {
	if (!("FORCE_COLOR" in K)) return;
	if (K.FORCE_COLOR === "true") return 1;
	if (K.FORCE_COLOR === "false") return 0;
	if (K.FORCE_COLOR.length === 0) return 1;
	let e = Math.min(Number.parseInt(K.FORCE_COLOR, 10), 3);
	if ([
		0,
		1,
		2,
		3
	].includes(e)) return e;
}
function Me(e) {
	return e !== 0 && {
		level: e,
		hasBasic: !0,
		has256: e >= 2,
		has16m: e >= 3
	};
}
function Ne(e, { streamIsTTY: t, sniffFlags: n = !0 } = {}) {
	let r = je();
	r !== void 0 && (Fe = r);
	let i = n ? Fe : r;
	if (i === 0) return 0;
	if (n) {
		if (Ae("color=16m") || Ae("color=full") || Ae("color=truecolor")) return 3;
		if (Ae("color=256")) return 2;
	}
	if ("TF_BUILD" in K && "AGENT_NAME" in K) return 1;
	if (e && !t && i === void 0) return 0;
	let a = i || 0;
	if (K.TERM === "dumb") return a;
	if (f.platform === "win32") {
		let e = p.release().split(".");
		return Number(e[0]) >= 10 && Number(e[2]) >= 10586 ? Number(e[2]) >= 14931 ? 3 : 2 : 1;
	}
	if ("CI" in K) return [
		"GITHUB_ACTIONS",
		"GITEA_ACTIONS",
		"CIRCLECI"
	].some((e) => e in K) ? 3 : [
		"TRAVIS",
		"APPVEYOR",
		"GITLAB_CI",
		"BUILDKITE",
		"DRONE"
	].some((e) => e in K) || K.CI_NAME === "codeship" ? 1 : a;
	if ("TEAMCITY_VERSION" in K) return +!!/^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(K.TEAMCITY_VERSION);
	if (K.COLORTERM === "truecolor" || K.TERM === "xterm-kitty" || K.TERM === "xterm-ghostty" || K.TERM === "wezterm") return 3;
	if ("TERM_PROGRAM" in K) {
		let e = Number.parseInt((K.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
		switch (K.TERM_PROGRAM) {
			case "iTerm.app": return e >= 3 ? 3 : 2;
			case "Apple_Terminal": return 2;
		}
	}
	return /-256(color)?$/i.test(K.TERM) ? 2 : /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(K.TERM) || "COLORTERM" in K ? 1 : a;
}
function Pe(e, t = {}) {
	return Me(Ne(e, {
		streamIsTTY: e && e.isTTY,
		...t
	}));
}
var K, Fe, Ie, Le = O((() => {
	({env: K} = f), Ae("no-color") || Ae("no-colors") || Ae("color=false") || Ae("color=never") ? Fe = 0 : (Ae("color") || Ae("colors") || Ae("color=true") || Ae("color=always")) && (Fe = 1), Ie = {
		stdout: Pe({ isTTY: m.isatty(1) }),
		stderr: Pe({ isTTY: m.isatty(2) })
	};
})), Re = /* @__PURE__ */ k(((e, t) => {
	var n = P("tty"), r = P("util");
	e.init = u, e.log = s, e.formatArgs = a, e.save = c, e.load = l, e.useColors = i, e.destroy = r.deprecate(() => {}, "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."), e.colors = [
		6,
		2,
		3,
		4,
		5,
		1
	];
	try {
		let t = (Le(), N(ke));
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
	t.exports = De()(e);
	var { formatters: d } = t.exports;
	d.o = function(e) {
		return this.inspectOpts.colors = this.useColors, r.inspect(e, this.inspectOpts).split("\n").map((e) => e.trim()).join(" ");
	}, d.O = function(e) {
		return this.inspectOpts.colors = this.useColors, r.inspect(e, this.inspectOpts);
	};
})), ze = /* @__PURE__ */ k(((e, t) => {
	t.exports = typeof process > "u" || process.type === "renderer" || process.browser === !0 || process.__nwjs ? Oe() : Re();
})), Be = /* @__PURE__ */ k(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.ProgressCallbackTransform = void 0;
	var t = P("stream");
	e.ProgressCallbackTransform = class extends t.Transform {
		constructor(e, t, n) {
			super(), this.total = e, this.cancellationToken = t, this.onProgress = n, this.start = Date.now(), this.transferred = 0, this.delta = 0, this.nextUpdate = this.start + 1e3;
		}
		_transform(e, t, n) {
			if (this.cancellationToken.cancelled) {
				n(/* @__PURE__ */ Error("cancelled"), null);
				return;
			}
			this.transferred += e.length, this.delta += e.length;
			let r = Date.now();
			r >= this.nextUpdate && this.transferred !== this.total && (this.nextUpdate = r + 1e3, this.onProgress({
				total: this.total,
				delta: this.delta,
				transferred: this.transferred,
				percent: this.transferred / this.total * 100,
				bytesPerSecond: Math.round(this.transferred / ((r - this.start) / 1e3))
			}), this.delta = 0), n(null, e);
		}
		_flush(e) {
			if (this.cancellationToken.cancelled) {
				e(/* @__PURE__ */ Error("cancelled"));
				return;
			}
			this.onProgress({
				total: this.total,
				delta: this.delta,
				transferred: this.total,
				percent: 100,
				bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
			}), this.delta = 0, e(null);
		}
	};
})), Ve = /* @__PURE__ */ k(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.DigestTransform = e.HttpExecutor = e.HttpError = void 0, e.addSensitiveRedirectHeader = m, e.addSensitiveFieldPattern = h, e.createHttpError = g, e.parseJson = y, e.configureRequestOptionsFromUrl = x, e.configureRequestUrl = S, e.safeGetHeader = T, e.configureRequestOptions = D, e.isSensitiveFieldName = O, e.hashSensitiveValue = k, e.safeStringifyJson = A;
	var t = P("crypto"), n = ze(), r = P("fs"), i = P("stream"), a = P("url"), o = we(), s = Te(), c = Be(), l = (0, n.default)("electron-builder"), u = (e) => e.toLowerCase().replace(/[-_]/g, ""), d = /* @__PURE__ */ new Set([
		"authorization",
		"proxyauthorization",
		"privatetoken",
		"xapikey",
		"xauthtoken",
		"xaccesstoken",
		"xgitlabtoken",
		"cookie",
		"xcsrftoken"
	]), f = [
		"token",
		"password",
		"secret",
		"authorization",
		"credential",
		"apikey",
		"passphrase",
		"auth"
	], p = ["key"];
	function m(e) {
		d.add(u(e));
	}
	function h(e) {
		f.push(e.toLowerCase().replace(/[-_]/g, ""));
	}
	function g(e, t = null) {
		return new v(e.statusCode || -1, `${e.statusCode} ${e.statusMessage}` + (t == null ? "" : "\n" + JSON.stringify(t, null, "  ")) + "\nHeaders: " + A(e.headers), t);
	}
	var _ = /* @__PURE__ */ new Map([
		[429, "Too many requests"],
		[400, "Bad request"],
		[403, "Forbidden"],
		[404, "Not found"],
		[405, "Method not allowed"],
		[406, "Not acceptable"],
		[408, "Request timeout"],
		[413, "Request entity too large"],
		[500, "Internal server error"],
		[502, "Bad gateway"],
		[503, "Service unavailable"],
		[504, "Gateway timeout"],
		[505, "HTTP version not supported"]
	]), v = class extends Error {
		constructor(e, t = `HTTP error: ${_.get(e) || e}`, n = null) {
			super(t), this.statusCode = e, this.description = n, this.name = "HttpError", this.code = `HTTP_ERROR_${e}`;
		}
		isServerError() {
			return this.statusCode >= 500 && this.statusCode <= 599;
		}
	};
	e.HttpError = v;
	function y(e) {
		return e.then((e) => e == null || e.length === 0 ? null : JSON.parse(e));
	}
	e.HttpExecutor = class e {
		constructor() {
			this.maxRedirects = 10;
		}
		request(e, t = new o.CancellationToken(), n) {
			D(e);
			let r = n == null ? void 0 : JSON.stringify(n), i = r ? Buffer.from(r) : void 0;
			if (i != null) {
				l.enabled && l(A(n));
				let { headers: t, ...r } = e;
				e = {
					method: "post",
					headers: {
						"Content-Type": "application/json",
						"Content-Length": i.length,
						...t
					},
					...r
				};
			}
			return this.doApiRequest(e, t, (e) => e.end(i));
		}
		doApiRequest(e, t, n, r = 0) {
			if (l.enabled) {
				let { headers: t, auth: n, ...r } = e;
				l(`Request: ${A(r)}`);
			}
			return t.createPromise((i, a, o) => {
				let s = this.createRequest(e, (o) => {
					try {
						this.handleResponse(o, e, t, i, a, r, n);
					} catch (e) {
						a(e);
					}
				});
				this.addErrorAndTimeoutHandlers(s, a, e.timeout), this.addRedirectHandlers(s, e, a, r, (e) => {
					this.doApiRequest(e, t, n, r).then(i).catch(a);
				}), n(s, a), o(() => s.abort());
			});
		}
		addRedirectHandlers(e, t, n, r, i) {}
		addErrorAndTimeoutHandlers(e, t, n = 6e4) {
			this.addTimeOutHandler(e, t, n), e.on("error", t), e.on("aborted", () => {
				t(/* @__PURE__ */ Error("Request has been aborted by the server"));
			});
		}
		handleResponse(t, n, r, i, a, o, s) {
			if (l.enabled) {
				let { headers: e, auth: r, ...i } = n;
				l(`Response: ${t.statusCode} ${t.statusMessage}, request options: ${A(i)}`);
			}
			if (t.statusCode === 404) {
				a(g(t, `method: ${n.method || "GET"} url: ${n.protocol || "https:"}//${n.hostname}${n.port ? `:${n.port}` : ""}${n.path}

Please double check that your authentication token is correct. Due to security reasons, actual status maybe not reported, but 404.
`));
				return;
			}
			if (t.statusCode === 204) {
				i();
				return;
			}
			let c = t.statusCode ?? 0, u = c >= 300 && c < 400, d = T(t, "location");
			if (u && d != null) {
				if (o > this.maxRedirects) {
					a(this.createMaxRedirectError());
					return;
				}
				this.doApiRequest(e.prepareRedirectUrlOptions(d, n), r, s, o).then(i).catch(a);
				return;
			}
			t.setEncoding("utf8");
			let f = "";
			t.on("error", a), t.on("data", (e) => f += e), t.on("end", () => {
				try {
					if (t.statusCode != null && t.statusCode >= 400) {
						let e = T(t, "content-type"), r = e != null && (Array.isArray(e) ? e.find((e) => e.includes("json")) != null : e.includes("json"));
						a(g(t, `method: ${n.method || "GET"} url: ${n.protocol || "https:"}//${n.hostname}${n.port ? `:${n.port}` : ""}${n.path}

          Data:
          ${r ? A(JSON.parse(f)) : f}
          `));
					} else i(f.length === 0 ? null : f);
				} catch (e) {
					a(e);
				}
			});
		}
		async downloadToBuffer(e, t) {
			return await t.cancellationToken.createPromise((n, r, i) => {
				let a = [], o = {
					headers: t.headers || void 0,
					redirect: "manual"
				};
				S(e, o), D(o), this.doDownload(o, {
					destination: null,
					options: t,
					onCancel: i,
					callback: (e) => {
						e == null ? n(Buffer.concat(a)) : r(e);
					},
					responseHandler: (e, t) => {
						let n = 0;
						e.on("data", (e) => {
							if (n += e.length, n > 524288e3) {
								t(/* @__PURE__ */ Error("Maximum allowed size is 500 MB"));
								return;
							}
							a.push(e);
						}), e.on("end", () => {
							t(null);
						});
					}
				}, 0);
			});
		}
		doDownload(t, n, r) {
			let i = this.createRequest(t, (i) => {
				if (i.statusCode >= 400) {
					n.callback(/* @__PURE__ */ Error(`Cannot download "${t.protocol || "https:"}//${t.hostname}${t.path}", status ${i.statusCode}: ${i.statusMessage}`));
					return;
				}
				i.on("error", n.callback);
				let a = T(i, "location");
				if (a != null) {
					r < this.maxRedirects ? this.doDownload(e.prepareRedirectUrlOptions(a, t), n, r++) : n.callback(this.createMaxRedirectError());
					return;
				}
				n.responseHandler == null ? E(n, i) : n.responseHandler(i, n.callback);
			});
			this.addErrorAndTimeoutHandlers(i, n.callback, t.timeout), this.addRedirectHandlers(i, t, n.callback, r, (e) => {
				this.doDownload(e, n, r++);
			}), i.end();
		}
		createMaxRedirectError() {
			return /* @__PURE__ */ Error(`Too many redirects (> ${this.maxRedirects})`);
		}
		addTimeOutHandler(e, t, n) {
			e.on("socket", (r) => {
				r.setTimeout(n, () => {
					e.abort(), t(/* @__PURE__ */ Error("Request timed out"));
				});
			});
		}
		static prepareRedirectUrlOptions(t, n) {
			let r = x(t, { ...n }), i = r.headers;
			if (i == null) return r;
			let a = e.reconstructOriginalUrl(n), o = b(t, n);
			if (e.isCrossOriginRedirect(a, o)) {
				l.enabled && l(`Cross-origin redirect (${a.host} → ${o.host}): stripping sensitive headers`);
				for (let e of Object.keys(i)) d.has(u(e)) && delete i[e];
			}
			return r;
		}
		static reconstructOriginalUrl(e) {
			let t = e.protocol || "https:";
			if (!e.hostname) throw Error("Missing hostname in request options");
			let n = e.hostname, r = e.port ? `:${e.port}` : "", i = e.path || "/";
			return new a.URL(`${t}//${n}${r}${i}`);
		}
		static isCrossOriginRedirect(e, t) {
			return e.hostname.toLowerCase() === t.hostname.toLowerCase() ? e.protocol === "http:" && ["80", ""].includes(e.port) && t.protocol === "https:" && ["443", ""].includes(t.port) ? !1 : e.protocol !== t.protocol || e.port !== t.port : !0;
		}
		static async retryOnServerError(e, t = 3) {
			for (let n = 0;; n++) try {
				return await e();
			} catch (e) {
				if (n < t && (e instanceof v && e.isServerError() || e.code === "EPIPE")) {
					await new Promise((e) => setTimeout(e, 1e3 * (n + 1)));
					continue;
				}
				throw e;
			}
		}
	};
	function b(e, t) {
		try {
			return new a.URL(e);
		} catch {
			let n = t.hostname, r = `${t.protocol || "https:"}//${n}${t.port ? `:${t.port}` : ""}`;
			return new a.URL(e, r);
		}
	}
	function x(e, t) {
		let n = D(t);
		return S(b(e, t), n), n;
	}
	function S(e, t) {
		t.protocol = e.protocol, t.hostname = e.hostname, e.port ? t.port = e.port : t.port && delete t.port, t.path = e.pathname + e.search;
	}
	var C = class extends i.Transform {
		get actual() {
			return this._actual;
		}
		constructor(e, n = "sha512", r = "base64") {
			super(), this.expected = e, this.algorithm = n, this.encoding = r, this._actual = null, this.isValidateOnEnd = !0, this.digester = (0, t.createHash)(n);
		}
		_transform(e, t, n) {
			this.digester.update(e), n(null, e);
		}
		_flush(e) {
			if (this._actual = this.digester.digest(this.encoding), this.isValidateOnEnd) try {
				this.validate();
			} catch (t) {
				e(t);
				return;
			}
			e(null);
		}
		validate() {
			if (this._actual == null) throw (0, s.newError)("Not finished yet", "ERR_STREAM_NOT_FINISHED");
			if (this._actual !== this.expected) throw (0, s.newError)(`${this.algorithm} checksum mismatch, expected ${this.expected}, got ${this._actual}`, "ERR_CHECKSUM_MISMATCH");
			return null;
		}
	};
	e.DigestTransform = C;
	function w(e, t, n) {
		return e != null && t != null && e !== t ? (n(/* @__PURE__ */ Error(`checksum mismatch: expected ${t} but got ${e} (X-Checksum-Sha2 header)`)), !1) : !0;
	}
	function T(e, t) {
		let n = e.headers[t];
		return n == null ? null : Array.isArray(n) ? n.length === 0 ? null : n[n.length - 1] : n;
	}
	function E(e, t) {
		if (!w(T(t, "X-Checksum-Sha2"), e.options.sha2, e.callback)) return;
		let n = [];
		if (e.options.onProgress != null) {
			let r = T(t, "content-length");
			r != null && n.push(new c.ProgressCallbackTransform(parseInt(r, 10), e.options.cancellationToken, e.options.onProgress));
		}
		let i = e.options.sha512;
		i == null ? e.options.sha2 != null && n.push(new C(e.options.sha2, "sha256", "hex")) : n.push(new C(i, "sha512", i.length === 128 && !i.includes("+") && !i.includes("Z") && !i.includes("=") ? "hex" : "base64"));
		let a = (0, r.createWriteStream)(e.destination);
		n.push(a);
		let o = t;
		for (let t of n) t.on("error", (t) => {
			a.close(), e.options.cancellationToken.cancelled || e.callback(t);
		}), o = o.pipe(t);
		a.on("finish", () => {
			a.close(e.callback);
		});
	}
	function D(e, t, n) {
		n != null && (e.method = n), e.headers = { ...e.headers };
		let r = e.headers;
		return t != null && (r.authorization = t.startsWith("Basic") || t.startsWith("Bearer") ? t : `token ${t}`), r["User-Agent"] ??= "electron-builder", (n == null || n === "GET" || r["Cache-Control"] == null) && (r["Cache-Control"] = "no-cache"), e.protocol == null && process.versions.electron != null && (e.protocol = "https:"), e;
	}
	function O(e) {
		let t = u(e);
		return f.some((e) => t.includes(e)) || p.some((e) => t.endsWith(e));
	}
	function k(e) {
		return `${(0, t.createHash)("sha256").update(e).digest("hex")} (sha256 hash)`;
	}
	function A(e, t) {
		return JSON.stringify(e, (e, n) => O(e) || t != null && t.has(e) ? typeof n == "string" ? k(n) : "<stripped sensitive data>" : n, 2);
	}
})), He = /* @__PURE__ */ k(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.MemoLazy = void 0, e.MemoLazy = class {
		constructor(e, t) {
			this.selector = e, this.creator = t, this.selected = void 0, this._value = void 0;
		}
		get hasValue() {
			return this._value !== void 0;
		}
		get value() {
			let e = this.selector();
			if (this._value !== void 0 && t(this.selected, e)) return this._value;
			this.selected = e;
			let n = this.creator(e);
			return this.value = n, n;
		}
		set value(e) {
			this._value = e;
		}
	};
	function t(e, n) {
		if (typeof e == "object" && e && typeof n == "object" && n) {
			let r = Object.keys(e), i = Object.keys(n);
			return r.length === i.length && r.every((r) => t(e[r], n[r]));
		}
		return e === n;
	}
})), Ue = /* @__PURE__ */ k(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.githubUrl = t, e.githubTagPrefix = n, e.getS3LikeProviderBaseUrl = r;
	function t(e, t = "github.com") {
		return `${e.protocol || "https"}://${e.host || t}`;
	}
	function n(e) {
		return e.tagNamePrefix ? e.tagNamePrefix : e.vPrefixedTagName ?? !0 ? "v" : "";
	}
	function r(e) {
		let t = e.provider;
		if (t === "s3") return i(e);
		if (t === "spaces") return o(e);
		throw Error(`Not supported provider: ${t}`);
	}
	function i(e) {
		let t;
		if (e.accelerate == 1) t = `https://${e.bucket}.s3-accelerate.amazonaws.com`;
		else if (e.endpoint != null) t = `${e.endpoint}/${e.bucket}`;
		else if (e.bucket.includes(".")) {
			if (e.region == null) throw Error(`Bucket name "${e.bucket}" includes a dot, but S3 region is missing`);
			t = e.region === "us-east-1" ? `https://s3.amazonaws.com/${e.bucket}` : `https://s3-${e.region}.amazonaws.com/${e.bucket}`;
		} else t = e.region === "cn-north-1" ? `https://${e.bucket}.s3.${e.region}.amazonaws.com.cn` : `https://${e.bucket}.s3.amazonaws.com`;
		return a(t, e.path);
	}
	function a(e, t) {
		return t != null && t.length > 0 && (t.startsWith("/") || (e += "/"), e += t), e;
	}
	function o(e) {
		if (e.name == null) throw Error("name is missing");
		if (e.region == null) throw Error("region is missing");
		return a(`https://${e.name}.${e.region}.digitaloceanspaces.com`, e.path);
	}
})), We = /* @__PURE__ */ k(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.retry = n;
	var t = we();
	async function n(e, r) {
		let { retries: i, interval: a, backoff: o = 0, attempt: s = 0, shouldRetry: c, cancellationToken: l = new t.CancellationToken() } = r;
		try {
			return await e();
		} catch (t) {
			if (await Promise.resolve(c?.(t) ?? !0) && i > 0 && !l.cancelled) return await new Promise((e) => setTimeout(e, a + o * s)), await n(e, {
				...r,
				retries: i - 1,
				attempt: s + 1
			});
			throw t;
		}
	}
})), Ge = /* @__PURE__ */ k(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.parseDn = t;
	function t(e) {
		let t = !1, n = null, r = "", i = 0;
		e = e.trim();
		let a = /* @__PURE__ */ new Map();
		for (let o = 0; o <= e.length; o++) {
			if (o === e.length) {
				n !== null && a.set(n, r);
				break;
			}
			let s = e[o];
			if (t) {
				if (s === "\"") {
					t = !1;
					continue;
				}
			} else {
				if (s === "\"") {
					t = !0;
					continue;
				}
				if (s === "\\") {
					o++;
					let t = parseInt(e.slice(o, o + 2), 16);
					Number.isNaN(t) ? r += e[o] : (o++, r += String.fromCharCode(t));
					continue;
				}
				if (n === null && s === "=") {
					n = r, r = "";
					continue;
				}
				if (s === "," || s === ";" || s === "+") {
					n !== null && a.set(n, r), n = null, r = "";
					continue;
				}
			}
			if (s === " " && !t) {
				if (r.length === 0) continue;
				if (o > i) {
					let t = o;
					for (; e[t] === " ";) t++;
					i = t;
				}
				if (i >= e.length || e[i] === "," || e[i] === ";" || n === null && e[i] === "=" || n !== null && e[i] === "+") {
					o = i - 1;
					continue;
				}
			}
			r += s;
		}
		return a;
	}
})), Ke = /* @__PURE__ */ k(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.nil = e.UUID = void 0;
	var t = P("crypto"), n = Te(), r = "options.name must be either a string or a Buffer", i = (0, t.randomBytes)(16);
	i[0] |= 1;
	var a = {}, o = [];
	for (let e = 0; e < 256; e++) {
		let t = (e + 256).toString(16).substr(1);
		a[t] = e, o[e] = t;
	}
	var s = class e {
		constructor(t) {
			this.ascii = null, this.binary = null;
			let n = e.check(t);
			if (!n) throw Error("not a UUID");
			this.version = n.version, n.format === "ascii" ? this.ascii = t : this.binary = t;
		}
		static v5(e, t) {
			return u(e, "sha1", 80, t);
		}
		toString() {
			return this.ascii ??= d(this.binary), this.ascii;
		}
		inspect() {
			return `UUID v${this.version} ${this.toString()}`;
		}
		static check(e, t = 0) {
			if (typeof e == "string") return e = e.toLowerCase(), /^[a-f0-9]{8}(-[a-f0-9]{4}){3}-([a-f0-9]{12})$/.test(e) ? e === "00000000-0000-0000-0000-000000000000" ? {
				version: void 0,
				variant: "nil",
				format: "ascii"
			} : {
				version: (a[e[14] + e[15]] & 240) >> 4,
				variant: c((a[e[19] + e[20]] & 224) >> 5),
				format: "ascii"
			} : !1;
			if (Buffer.isBuffer(e)) {
				if (e.length < t + 16) return !1;
				let n = 0;
				for (; n < 16 && e[t + n] === 0; n++);
				return n === 16 ? {
					version: void 0,
					variant: "nil",
					format: "binary"
				} : {
					version: (e[t + 6] & 240) >> 4,
					variant: c((e[t + 8] & 224) >> 5),
					format: "binary"
				};
			}
			throw (0, n.newError)("Unknown type of uuid", "ERR_UNKNOWN_UUID_TYPE");
		}
		static parse(e) {
			let t = Buffer.allocUnsafe(16), n = 0;
			for (let r = 0; r < 16; r++) t[r] = a[e[n++] + e[n++]], (r === 3 || r === 5 || r === 7 || r === 9) && (n += 1);
			return t;
		}
	};
	e.UUID = s, s.OID = s.parse("6ba7b812-9dad-11d1-80b4-00c04fd430c8");
	function c(e) {
		switch (e) {
			case 0:
			case 1:
			case 3: return "ncs";
			case 4:
			case 5: return "rfc4122";
			case 6: return "microsoft";
			default: return "future";
		}
	}
	var l;
	(function(e) {
		e[e.ASCII = 0] = "ASCII", e[e.BINARY = 1] = "BINARY", e[e.OBJECT = 2] = "OBJECT";
	})(l ||= {});
	function u(e, i, a, c, u = l.ASCII) {
		let d = (0, t.createHash)(i);
		if (typeof e != "string" && !Buffer.isBuffer(e)) throw (0, n.newError)(r, "ERR_INVALID_UUID_NAME");
		d.update(c), d.update(e);
		let f = d.digest(), p;
		switch (u) {
			case l.BINARY:
				f[6] = f[6] & 15 | a, f[8] = f[8] & 63 | 128, p = f;
				break;
			case l.OBJECT:
				f[6] = f[6] & 15 | a, f[8] = f[8] & 63 | 128, p = new s(f);
				break;
			default: p = o[f[0]] + o[f[1]] + o[f[2]] + o[f[3]] + "-" + o[f[4]] + o[f[5]] + "-" + o[f[6] & 15 | a] + o[f[7]] + "-" + o[f[8] & 63 | 128] + o[f[9]] + "-" + o[f[10]] + o[f[11]] + o[f[12]] + o[f[13]] + o[f[14]] + o[f[15]];
		}
		return p;
	}
	function d(e) {
		return o[e[0]] + o[e[1]] + o[e[2]] + o[e[3]] + "-" + o[e[4]] + o[e[5]] + "-" + o[e[6]] + o[e[7]] + "-" + o[e[8]] + o[e[9]] + "-" + o[e[10]] + o[e[11]] + o[e[12]] + o[e[13]] + o[e[14]] + o[e[15]];
	}
	e.nil = new s("00000000-0000-0000-0000-000000000000");
})), qe = /* @__PURE__ */ k(((e) => {
	(function(e) {
		e.parser = function(e, t) {
			return new n(e, t);
		}, e.SAXParser = n, e.SAXStream = u, e.createStream = c, e.MAX_BUFFER_LENGTH = 65536;
		var t = [
			"comment",
			"sgmlDecl",
			"textNode",
			"tagName",
			"doctype",
			"procInstName",
			"procInstBody",
			"entity",
			"attribName",
			"attribValue",
			"cdata",
			"script"
		];
		e.EVENTS = [
			"text",
			"processinginstruction",
			"sgmldeclaration",
			"doctype",
			"comment",
			"opentagstart",
			"attribute",
			"opentag",
			"closetag",
			"opencdata",
			"cdata",
			"closecdata",
			"error",
			"end",
			"ready",
			"script",
			"opennamespace",
			"closenamespace"
		];
		function n(t, r) {
			if (!(this instanceof n)) return new n(t, r);
			var a = this;
			i(a), a.q = a.c = "", a.bufferCheckPosition = e.MAX_BUFFER_LENGTH, a.encoding = null, a.opt = r || {}, a.opt.lowercase = a.opt.lowercase || a.opt.lowercasetags, a.looseCase = a.opt.lowercase ? "toLowerCase" : "toUpperCase", a.opt.maxEntityCount = a.opt.maxEntityCount || 512, a.opt.maxEntityDepth = a.opt.maxEntityDepth || 4, a.entityCount = a.entityDepth = 0, a.tags = [], a.closed = a.closedRoot = a.sawRoot = !1, a.tag = a.error = null, a.strict = !!t, a.noscript = !!(t || a.opt.noscript), a.state = T.BEGIN, a.strictEntities = a.opt.strictEntities, a.ENTITIES = a.strictEntities ? Object.create(e.XML_ENTITIES) : Object.create(e.ENTITIES), a.attribList = [], a.opt.xmlns && (a.ns = Object.create(h)), a.opt.unquotedAttributeValues === void 0 && (a.opt.unquotedAttributeValues = !t), a.trackPosition = a.opt.position !== !1, a.trackPosition && (a.position = a.line = a.column = 0), D(a, "onready");
		}
		Object.create || (Object.create = function(e) {
			function t() {}
			return t.prototype = e, new t();
		}), Object.keys || (Object.keys = function(e) {
			var t = [];
			for (var n in e) e.hasOwnProperty(n) && t.push(n);
			return t;
		});
		function r(n) {
			for (var r = Math.max(e.MAX_BUFFER_LENGTH, 10), i = 0, a = 0, o = t.length; a < o; a++) {
				var s = n[t[a]].length;
				if (s > r) switch (t[a]) {
					case "textNode":
						N(n);
						break;
					case "cdata":
						M(n, "oncdata", n.cdata), n.cdata = "";
						break;
					case "script":
						M(n, "onscript", n.script), n.script = "";
						break;
					default: I(n, "Max buffer length exceeded: " + t[a]);
				}
				i = Math.max(i, s);
			}
			n.bufferCheckPosition = e.MAX_BUFFER_LENGTH - i + n.position;
		}
		function i(e) {
			for (var n = 0, r = t.length; n < r; n++) e[t[n]] = "";
		}
		function a(e) {
			N(e), e.cdata !== "" && (M(e, "oncdata", e.cdata), e.cdata = ""), e.script !== "" && (M(e, "onscript", e.script), e.script = "");
		}
		n.prototype = {
			end: function() {
				ee(this);
			},
			write: W,
			resume: function() {
				return this.error = null, this;
			},
			close: function() {
				return this.write(null);
			},
			flush: function() {
				a(this);
			}
		};
		var o;
		try {
			o = P("stream").Stream;
		} catch {
			o = function() {};
		}
		o ||= function() {};
		var s = e.EVENTS.filter(function(e) {
			return e !== "error" && e !== "end";
		});
		function c(e, t) {
			return new u(e, t);
		}
		function l(e, t) {
			if (e.length >= 2) {
				if (e[0] === 255 && e[1] === 254) return "utf-16le";
				if (e[0] === 254 && e[1] === 255) return "utf-16be";
			}
			return e.length >= 3 && e[0] === 239 && e[1] === 187 && e[2] === 191 ? "utf8" : e.length >= 4 ? e[0] === 60 && e[1] === 0 && e[2] === 63 && e[3] === 0 ? "utf-16le" : e[0] === 0 && e[1] === 60 && e[2] === 0 && e[3] === 63 ? "utf-16be" : "utf8" : t ? "utf8" : null;
		}
		function u(e, t) {
			if (!(this instanceof u)) return new u(e, t);
			o.apply(this), this._parser = new n(e, t), this.writable = !0, this.readable = !0;
			var r = this;
			this._parser.onend = function() {
				r.emit("end");
			}, this._parser.onerror = function(e) {
				r.emit("error", e), r._parser.error = null;
			}, this._decoder = null, this._decoderBuffer = null, s.forEach(function(e) {
				Object.defineProperty(r, "on" + e, {
					get: function() {
						return r._parser["on" + e];
					},
					set: function(t) {
						if (!t) return r.removeAllListeners(e), r._parser["on" + e] = t, t;
						r.on(e, t);
					},
					enumerable: !0,
					configurable: !1
				});
			});
		}
		u.prototype = Object.create(o.prototype, { constructor: { value: u } }), u.prototype._decodeBuffer = function(e, t) {
			if (this._decoderBuffer &&= (e = Buffer.concat([this._decoderBuffer, e]), null), !this._decoder) {
				var n = l(e, t);
				if (!n) return this._decoderBuffer = e, "";
				this._parser.encoding = n, this._decoder = new TextDecoder(n);
			}
			return this._decoder.decode(e, { stream: !t });
		}, u.prototype.write = function(e) {
			if (typeof Buffer == "function" && typeof Buffer.isBuffer == "function" && Buffer.isBuffer(e)) e = this._decodeBuffer(e, !1);
			else if (this._decoderBuffer) {
				var t = this._decodeBuffer(Buffer.alloc(0), !0);
				t && (this._parser.write(t), this.emit("data", t));
			}
			return this._parser.write(e.toString()), this.emit("data", e), !0;
		}, u.prototype.end = function(e) {
			if (e && e.length && this.write(e), this._decoderBuffer) {
				var t = this._decodeBuffer(Buffer.alloc(0), !0);
				t && (this._parser.write(t), this.emit("data", t));
			} else if (this._decoder) {
				var n = this._decoder.decode();
				n && (this._parser.write(n), this.emit("data", n));
			}
			return this._parser.end(), !0;
		}, u.prototype.on = function(e, t) {
			var n = this;
			return !n._parser["on" + e] && s.indexOf(e) !== -1 && (n._parser["on" + e] = function() {
				var t = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);
				t.splice(0, 0, e), n.emit.apply(n, t);
			}), o.prototype.on.call(n, e, t);
		};
		var d = /^\[CDATA\[$/i, f = /^DOCTYPE$/i, p = "http://www.w3.org/XML/1998/namespace", m = "http://www.w3.org/2000/xmlns/", h = {
			xml: p,
			xmlns: m
		}, g = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, _ = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/, v = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, y = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;
		function b(e) {
			return e === " " || e === "\n" || e === "\r" || e === "	";
		}
		function x(e) {
			return e === "\"" || e === "'";
		}
		function S(e) {
			return e === ">" || b(e);
		}
		function C(e, t) {
			return e.test(t);
		}
		function w(e, t) {
			return !C(e, t);
		}
		var T = 0;
		for (var E in e.STATE = {
			BEGIN: T++,
			BEGIN_WHITESPACE: T++,
			TEXT: T++,
			TEXT_ENTITY: T++,
			OPEN_WAKA: T++,
			SGML_DECL: T++,
			SGML_DECL_QUOTED: T++,
			DOCTYPE: T++,
			DOCTYPE_QUOTED: T++,
			DOCTYPE_DTD: T++,
			DOCTYPE_DTD_QUOTED: T++,
			COMMENT_STARTING: T++,
			COMMENT: T++,
			COMMENT_ENDING: T++,
			COMMENT_ENDED: T++,
			CDATA: T++,
			CDATA_ENDING: T++,
			CDATA_ENDING_2: T++,
			PROC_INST: T++,
			PROC_INST_BODY: T++,
			PROC_INST_ENDING: T++,
			OPEN_TAG: T++,
			OPEN_TAG_SLASH: T++,
			ATTRIB: T++,
			ATTRIB_NAME: T++,
			ATTRIB_NAME_SAW_WHITE: T++,
			ATTRIB_VALUE: T++,
			ATTRIB_VALUE_QUOTED: T++,
			ATTRIB_VALUE_CLOSED: T++,
			ATTRIB_VALUE_UNQUOTED: T++,
			ATTRIB_VALUE_ENTITY_Q: T++,
			ATTRIB_VALUE_ENTITY_U: T++,
			CLOSE_TAG: T++,
			CLOSE_TAG_SAW_WHITE: T++,
			SCRIPT: T++,
			SCRIPT_ENDING: T++
		}, e.XML_ENTITIES = Object.assign(Object.create(null), {
			amp: "&",
			gt: ">",
			lt: "<",
			quot: "\"",
			apos: "'"
		}), e.ENTITIES = Object.assign(Object.create(null), {
			amp: "&",
			gt: ">",
			lt: "<",
			quot: "\"",
			apos: "'",
			AElig: 198,
			Aacute: 193,
			Acirc: 194,
			Agrave: 192,
			Aring: 197,
			Atilde: 195,
			Auml: 196,
			Ccedil: 199,
			ETH: 208,
			Eacute: 201,
			Ecirc: 202,
			Egrave: 200,
			Euml: 203,
			Iacute: 205,
			Icirc: 206,
			Igrave: 204,
			Iuml: 207,
			Ntilde: 209,
			Oacute: 211,
			Ocirc: 212,
			Ograve: 210,
			Oslash: 216,
			Otilde: 213,
			Ouml: 214,
			THORN: 222,
			Uacute: 218,
			Ucirc: 219,
			Ugrave: 217,
			Uuml: 220,
			Yacute: 221,
			aacute: 225,
			acirc: 226,
			aelig: 230,
			agrave: 224,
			aring: 229,
			atilde: 227,
			auml: 228,
			ccedil: 231,
			eacute: 233,
			ecirc: 234,
			egrave: 232,
			eth: 240,
			euml: 235,
			iacute: 237,
			icirc: 238,
			igrave: 236,
			iuml: 239,
			ntilde: 241,
			oacute: 243,
			ocirc: 244,
			ograve: 242,
			oslash: 248,
			otilde: 245,
			ouml: 246,
			szlig: 223,
			thorn: 254,
			uacute: 250,
			ucirc: 251,
			ugrave: 249,
			uuml: 252,
			yacute: 253,
			yuml: 255,
			copy: 169,
			reg: 174,
			nbsp: 160,
			iexcl: 161,
			cent: 162,
			pound: 163,
			curren: 164,
			yen: 165,
			brvbar: 166,
			sect: 167,
			uml: 168,
			ordf: 170,
			laquo: 171,
			not: 172,
			shy: 173,
			macr: 175,
			deg: 176,
			plusmn: 177,
			sup1: 185,
			sup2: 178,
			sup3: 179,
			acute: 180,
			micro: 181,
			para: 182,
			middot: 183,
			cedil: 184,
			ordm: 186,
			raquo: 187,
			frac14: 188,
			frac12: 189,
			frac34: 190,
			iquest: 191,
			times: 215,
			divide: 247,
			OElig: 338,
			oelig: 339,
			Scaron: 352,
			scaron: 353,
			Yuml: 376,
			fnof: 402,
			circ: 710,
			tilde: 732,
			Alpha: 913,
			Beta: 914,
			Gamma: 915,
			Delta: 916,
			Epsilon: 917,
			Zeta: 918,
			Eta: 919,
			Theta: 920,
			Iota: 921,
			Kappa: 922,
			Lambda: 923,
			Mu: 924,
			Nu: 925,
			Xi: 926,
			Omicron: 927,
			Pi: 928,
			Rho: 929,
			Sigma: 931,
			Tau: 932,
			Upsilon: 933,
			Phi: 934,
			Chi: 935,
			Psi: 936,
			Omega: 937,
			alpha: 945,
			beta: 946,
			gamma: 947,
			delta: 948,
			epsilon: 949,
			zeta: 950,
			eta: 951,
			theta: 952,
			iota: 953,
			kappa: 954,
			lambda: 955,
			mu: 956,
			nu: 957,
			xi: 958,
			omicron: 959,
			pi: 960,
			rho: 961,
			sigmaf: 962,
			sigma: 963,
			tau: 964,
			upsilon: 965,
			phi: 966,
			chi: 967,
			psi: 968,
			omega: 969,
			thetasym: 977,
			upsih: 978,
			piv: 982,
			ensp: 8194,
			emsp: 8195,
			thinsp: 8201,
			zwnj: 8204,
			zwj: 8205,
			lrm: 8206,
			rlm: 8207,
			ndash: 8211,
			mdash: 8212,
			lsquo: 8216,
			rsquo: 8217,
			sbquo: 8218,
			ldquo: 8220,
			rdquo: 8221,
			bdquo: 8222,
			dagger: 8224,
			Dagger: 8225,
			bull: 8226,
			hellip: 8230,
			permil: 8240,
			prime: 8242,
			Prime: 8243,
			lsaquo: 8249,
			rsaquo: 8250,
			oline: 8254,
			frasl: 8260,
			euro: 8364,
			image: 8465,
			weierp: 8472,
			real: 8476,
			trade: 8482,
			alefsym: 8501,
			larr: 8592,
			uarr: 8593,
			rarr: 8594,
			darr: 8595,
			harr: 8596,
			crarr: 8629,
			lArr: 8656,
			uArr: 8657,
			rArr: 8658,
			dArr: 8659,
			hArr: 8660,
			forall: 8704,
			part: 8706,
			exist: 8707,
			empty: 8709,
			nabla: 8711,
			isin: 8712,
			notin: 8713,
			ni: 8715,
			prod: 8719,
			sum: 8721,
			minus: 8722,
			lowast: 8727,
			radic: 8730,
			prop: 8733,
			infin: 8734,
			ang: 8736,
			and: 8743,
			or: 8744,
			cap: 8745,
			cup: 8746,
			int: 8747,
			there4: 8756,
			sim: 8764,
			cong: 8773,
			asymp: 8776,
			ne: 8800,
			equiv: 8801,
			le: 8804,
			ge: 8805,
			sub: 8834,
			sup: 8835,
			nsub: 8836,
			sube: 8838,
			supe: 8839,
			oplus: 8853,
			otimes: 8855,
			perp: 8869,
			sdot: 8901,
			lceil: 8968,
			rceil: 8969,
			lfloor: 8970,
			rfloor: 8971,
			lang: 9001,
			rang: 9002,
			loz: 9674,
			spades: 9824,
			clubs: 9827,
			hearts: 9829,
			diams: 9830
		}), Object.keys(e.ENTITIES).forEach(function(t) {
			var n = e.ENTITIES[t], r = typeof n == "number" ? String.fromCharCode(n) : n;
			e.ENTITIES[t] = r;
		}), e.STATE) e.STATE[e.STATE[E]] = E;
		T = e.STATE;
		function D(e, t, n) {
			e[t] && e[t](n);
		}
		function O(e) {
			var t = e && e.match(/(?:^|\s)encoding\s*=\s*(['"])([^'"]+)\1/i);
			return t ? t[2] : null;
		}
		function k(e) {
			return e ? e.toLowerCase().replace(/[^a-z0-9]/g, "") : null;
		}
		function A(e, t) {
			let n = k(e), r = k(t);
			return !n || !r ? !0 : r === "utf16" ? n === "utf16le" || n === "utf16be" : n === r;
		}
		function j(e, t) {
			if (e.strict && e.encoding && t && t.name === "xml") {
				var n = O(t.body);
				n && !A(e.encoding, n) && L(e, "XML declaration encoding " + n + " does not match detected stream encoding " + e.encoding.toUpperCase());
			}
		}
		function M(e, t, n) {
			e.textNode && N(e), D(e, t, n);
		}
		function N(e) {
			e.textNode = F(e.opt, e.textNode), e.textNode && D(e, "ontext", e.textNode), e.textNode = "";
		}
		function F(e, t) {
			return e.trim && (t = t.trim()), e.normalize && (t = t.replace(/\s+/g, " ")), t;
		}
		function I(e, t) {
			return N(e), e.trackPosition && (t += "\nLine: " + e.line + "\nColumn: " + e.column + "\nChar: " + e.c), t = Error(t), e.error = t, D(e, "onerror", t), e;
		}
		function ee(e) {
			return e.sawRoot && !e.closedRoot && L(e, "Unclosed root tag"), e.state !== T.BEGIN && e.state !== T.BEGIN_WHITESPACE && e.state !== T.TEXT && I(e, "Unexpected end"), N(e), e.c = "", e.closed = !0, D(e, "onend"), n.call(e, e.strict, e.opt), e;
		}
		function L(e, t) {
			if (typeof e != "object" || !(e instanceof n)) throw Error("bad call to strictFail");
			e.strict && I(e, t);
		}
		function R(e) {
			e.strict || (e.tagName = e.tagName[e.looseCase]());
			var t = e.tags[e.tags.length - 1] || e, n = e.tag = {
				name: e.tagName,
				attributes: {}
			};
			e.opt.xmlns && (n.ns = t.ns), e.attribList.length = 0, M(e, "onopentagstart", n);
		}
		function z(e, t) {
			var n = e.indexOf(":") < 0 ? ["", e] : e.split(":"), r = n[0], i = n[1];
			return t && e === "xmlns" && (r = "xmlns", i = ""), {
				prefix: r,
				local: i
			};
		}
		function te(e) {
			if (e.strict || (e.attribName = e.attribName[e.looseCase]()), e.attribList.indexOf(e.attribName) !== -1 || e.tag.attributes.hasOwnProperty(e.attribName)) {
				e.attribName = e.attribValue = "";
				return;
			}
			if (e.opt.xmlns) {
				var t = z(e.attribName, !0), n = t.prefix, r = t.local;
				if (n === "xmlns") {
					if (r === "xml" && e.attribValue !== p) L(e, "xml: prefix must be bound to " + p + "\nActual: " + e.attribValue);
					else if (r === "xmlns" && e.attribValue !== m) L(e, "xmlns: prefix must be bound to " + m + "\nActual: " + e.attribValue);
					else {
						var i = e.tag, a = e.tags[e.tags.length - 1] || e;
						i.ns === a.ns && (i.ns = Object.create(a.ns)), i.ns[r] = e.attribValue;
					}
				}
				e.attribList.push([e.attribName, e.attribValue]);
			} else e.tag.attributes[e.attribName] = e.attribValue, M(e, "onattribute", {
				name: e.attribName,
				value: e.attribValue
			});
			e.attribName = e.attribValue = "";
		}
		function B(e, t) {
			if (e.opt.xmlns) {
				var n = e.tag, r = z(e.tagName);
				n.prefix = r.prefix, n.local = r.local, n.uri = n.ns[r.prefix] || "", n.prefix && !n.uri && (L(e, "Unbound namespace prefix: " + JSON.stringify(e.tagName)), n.uri = r.prefix);
				var i = e.tags[e.tags.length - 1] || e;
				n.ns && i.ns !== n.ns && Object.keys(n.ns).forEach(function(t) {
					M(e, "onopennamespace", {
						prefix: t,
						uri: n.ns[t]
					});
				});
				for (var a = 0, o = e.attribList.length; a < o; a++) {
					var s = e.attribList[a], c = s[0], l = s[1], u = z(c, !0), d = u.prefix, f = u.local, p = d === "" ? "" : n.ns[d] || "", m = {
						name: c,
						value: l,
						prefix: d,
						local: f,
						uri: p
					};
					d && d !== "xmlns" && !p && (L(e, "Unbound namespace prefix: " + JSON.stringify(d)), m.uri = d), e.tag.attributes[c] = m, M(e, "onattribute", m);
				}
				e.attribList.length = 0;
			}
			e.tag.isSelfClosing = !!t, e.sawRoot = !0, e.tags.push(e.tag), M(e, "onopentag", e.tag), t || (e.state = !e.noscript && e.tagName.toLowerCase() === "script" ? T.SCRIPT : T.TEXT, e.tag = null, e.tagName = ""), e.attribName = e.attribValue = "", e.attribList.length = 0;
		}
		function V(e) {
			if (!e.tagName) {
				L(e, "Weird empty close tag."), e.textNode += "</>", e.state = T.TEXT;
				return;
			}
			if (e.script) {
				if (e.tagName !== "script") {
					e.script += "</" + e.tagName + ">", e.tagName = "", e.state = T.SCRIPT;
					return;
				}
				M(e, "onscript", e.script), e.script = "";
			}
			var t = e.tags.length, n = e.tagName;
			e.strict || (n = n[e.looseCase]());
			for (var r = n; t-- && e.tags[t].name !== r;) L(e, "Unexpected close tag");
			if (t < 0) {
				L(e, "Unmatched closing tag: " + e.tagName), e.textNode += "</" + e.tagName + ">", e.state = T.TEXT;
				return;
			}
			e.tagName = n;
			for (var i = e.tags.length; i-- > t;) {
				var a = e.tag = e.tags.pop();
				e.tagName = e.tag.name, M(e, "onclosetag", e.tagName);
				var o = {};
				for (var s in a.ns) o[s] = a.ns[s];
				var c = e.tags[e.tags.length - 1] || e;
				e.opt.xmlns && a.ns !== c.ns && Object.keys(a.ns).forEach(function(t) {
					var n = a.ns[t];
					M(e, "onclosenamespace", {
						prefix: t,
						uri: n
					});
				});
			}
			t === 0 && (e.closedRoot = !0), e.tagName = e.attribValue = e.attribName = "", e.attribList.length = 0, e.state = T.TEXT;
		}
		function H(e) {
			var t = e.entity, n = t.toLowerCase(), r, i = "";
			return e.ENTITIES[t] ? e.ENTITIES[t] : e.ENTITIES[n] ? e.ENTITIES[n] : (t = n, t.charAt(0) === "#" && (t.charAt(1) === "x" ? (t = t.slice(2), r = parseInt(t, 16), i = r.toString(16)) : (t = t.slice(1), r = parseInt(t, 10), i = r.toString(10))), t = t.replace(/^0+/, ""), isNaN(r) || i.toLowerCase() !== t || r < 0 || r > 1114111 || !ne(r) ? (L(e, "Invalid character entity"), "&" + e.entity + ";") : String.fromCodePoint(r));
		}
		function ne(e) {
			return e === 9 || e === 10 || e === 13 || e >= 32 && e <= 55295 || e >= 57344 && e <= 65533 || e >= 65536 && e <= 1114111;
		}
		function U(e, t) {
			t === "<" ? (e.state = T.OPEN_WAKA, e.startTagPosition = e.position) : b(t) || (L(e, "Non-whitespace before first tag."), e.textNode = t, e.state = T.TEXT);
		}
		function re(e, t) {
			var n = "";
			return t < e.length && (n = e.charAt(t)), n;
		}
		function W(t) {
			var n = this;
			if (this.error) throw this.error;
			if (n.closed) return I(n, "Cannot write after close. Assign an onready handler.");
			if (t === null) return ee(n);
			typeof t == "object" && (t = t.toString());
			for (var i = 0, a = ""; a = re(t, i++), n.c = a, a;) switch (n.trackPosition && (n.position++, a === "\n" ? (n.line++, n.column = 0) : n.column++), n.state) {
				case T.BEGIN:
					if (n.state = T.BEGIN_WHITESPACE, a === "﻿") continue;
					U(n, a);
					continue;
				case T.BEGIN_WHITESPACE:
					U(n, a);
					continue;
				case T.TEXT:
					if (n.sawRoot && !n.closedRoot) {
						for (var o = i - 1; a && a !== "<" && a !== "&";) a = re(t, i++), a && n.trackPosition && (n.position++, a === "\n" ? (n.line++, n.column = 0) : n.column++);
						n.textNode += t.substring(o, i - 1);
					}
					a === "<" && !(n.sawRoot && n.closedRoot && !n.strict) ? (n.state = T.OPEN_WAKA, n.startTagPosition = n.position) : (!b(a) && (!n.sawRoot || n.closedRoot) && L(n, "Text data outside of root node."), a === "&" ? n.state = T.TEXT_ENTITY : n.textNode += a);
					continue;
				case T.SCRIPT:
					a === "<" ? n.state = T.SCRIPT_ENDING : n.script += a;
					continue;
				case T.SCRIPT_ENDING:
					a === "/" ? n.state = T.CLOSE_TAG : (n.script += "<" + a, n.state = T.SCRIPT);
					continue;
				case T.OPEN_WAKA:
					if (a === "!") n.state = T.SGML_DECL, n.sgmlDecl = "";
					else if (!b(a)) {
						if (C(g, a)) n.state = T.OPEN_TAG, n.tagName = a;
						else if (a === "/") n.state = T.CLOSE_TAG, n.tagName = "";
						else if (a === "?") n.state = T.PROC_INST, n.procInstName = n.procInstBody = "";
						else {
							if (L(n, "Unencoded <"), n.startTagPosition + 1 < n.position) {
								var s = n.position - n.startTagPosition;
								a = Array(s).join(" ") + a;
							}
							n.textNode += "<" + a, n.state = T.TEXT;
						}
					}
					continue;
				case T.SGML_DECL:
					if (n.sgmlDecl + a === "--") {
						n.state = T.COMMENT, n.comment = "", n.sgmlDecl = "";
						continue;
					}
					n.doctype && n.doctype !== !0 && n.sgmlDecl ? (n.state = T.DOCTYPE_DTD, n.doctype += "<!" + n.sgmlDecl + a, n.sgmlDecl = "") : d.test(n.sgmlDecl + a) ? (M(n, "onopencdata"), n.state = T.CDATA, n.sgmlDecl = "", n.cdata = "") : f.test(n.sgmlDecl + a) ? (n.state = T.DOCTYPE, (n.doctype || n.sawRoot) && L(n, "Inappropriately located doctype declaration"), n.doctype = "", n.sgmlDecl = "") : a === ">" ? (M(n, "onsgmldeclaration", n.sgmlDecl), n.sgmlDecl = "", n.state = T.TEXT) : (x(a) && (n.state = T.SGML_DECL_QUOTED), n.sgmlDecl += a);
					continue;
				case T.SGML_DECL_QUOTED:
					a === n.q && (n.state = T.SGML_DECL, n.q = ""), n.sgmlDecl += a;
					continue;
				case T.DOCTYPE:
					a === ">" ? (n.state = T.TEXT, M(n, "ondoctype", n.doctype), n.doctype = !0) : (n.doctype += a, a === "[" ? n.state = T.DOCTYPE_DTD : x(a) && (n.state = T.DOCTYPE_QUOTED, n.q = a));
					continue;
				case T.DOCTYPE_QUOTED:
					n.doctype += a, a === n.q && (n.q = "", n.state = T.DOCTYPE);
					continue;
				case T.DOCTYPE_DTD:
					a === "]" ? (n.doctype += a, n.state = T.DOCTYPE) : a === "<" ? (n.state = T.OPEN_WAKA, n.startTagPosition = n.position) : x(a) ? (n.doctype += a, n.state = T.DOCTYPE_DTD_QUOTED, n.q = a) : n.doctype += a;
					continue;
				case T.DOCTYPE_DTD_QUOTED:
					n.doctype += a, a === n.q && (n.state = T.DOCTYPE_DTD, n.q = "");
					continue;
				case T.COMMENT:
					a === "-" ? n.state = T.COMMENT_ENDING : n.comment += a;
					continue;
				case T.COMMENT_ENDING:
					a === "-" ? (n.state = T.COMMENT_ENDED, n.comment = F(n.opt, n.comment), n.comment && M(n, "oncomment", n.comment), n.comment = "") : (n.comment += "-" + a, n.state = T.COMMENT);
					continue;
				case T.COMMENT_ENDED:
					a === ">" ? n.state = n.doctype && n.doctype !== !0 ? T.DOCTYPE_DTD : T.TEXT : (L(n, "Malformed comment"), n.comment += "--" + a, n.state = T.COMMENT);
					continue;
				case T.CDATA:
					for (var o = i - 1; a && a !== "]";) a = re(t, i++), a && n.trackPosition && (n.position++, a === "\n" ? (n.line++, n.column = 0) : n.column++);
					n.cdata += t.substring(o, i - 1), a === "]" && (n.state = T.CDATA_ENDING);
					continue;
				case T.CDATA_ENDING:
					a === "]" ? n.state = T.CDATA_ENDING_2 : (n.cdata += "]" + a, n.state = T.CDATA);
					continue;
				case T.CDATA_ENDING_2:
					a === ">" ? (n.cdata && M(n, "oncdata", n.cdata), M(n, "onclosecdata"), n.cdata = "", n.state = T.TEXT) : a === "]" ? n.cdata += "]" : (n.cdata += "]]" + a, n.state = T.CDATA);
					continue;
				case T.PROC_INST:
					a === "?" ? n.state = T.PROC_INST_ENDING : b(a) ? n.state = T.PROC_INST_BODY : n.procInstName += a;
					continue;
				case T.PROC_INST_BODY:
					if (!n.procInstBody && b(a)) continue;
					a === "?" ? n.state = T.PROC_INST_ENDING : n.procInstBody += a;
					continue;
				case T.PROC_INST_ENDING:
					if (a === ">") {
						let e = {
							name: n.procInstName,
							body: n.procInstBody
						};
						j(n, e), M(n, "onprocessinginstruction", e), n.procInstName = n.procInstBody = "", n.state = T.TEXT;
					} else n.procInstBody += "?" + a, n.state = T.PROC_INST_BODY;
					continue;
				case T.OPEN_TAG:
					C(_, a) ? n.tagName += a : (R(n), a === ">" ? B(n) : a === "/" ? n.state = T.OPEN_TAG_SLASH : (b(a) || L(n, "Invalid character in tag name"), n.state = T.ATTRIB));
					continue;
				case T.OPEN_TAG_SLASH:
					a === ">" ? (B(n, !0), V(n)) : (L(n, "Forward-slash in opening tag not followed by >"), n.state = T.ATTRIB);
					continue;
				case T.ATTRIB:
					if (b(a)) continue;
					a === ">" ? B(n) : a === "/" ? n.state = T.OPEN_TAG_SLASH : C(g, a) ? (n.attribName = a, n.attribValue = "", n.state = T.ATTRIB_NAME) : L(n, "Invalid attribute name");
					continue;
				case T.ATTRIB_NAME:
					a === "=" ? n.state = T.ATTRIB_VALUE : a === ">" ? (L(n, "Attribute without value"), n.attribValue = n.attribName, te(n), B(n)) : b(a) ? n.state = T.ATTRIB_NAME_SAW_WHITE : C(_, a) ? n.attribName += a : L(n, "Invalid attribute name");
					continue;
				case T.ATTRIB_NAME_SAW_WHITE:
					if (a === "=") n.state = T.ATTRIB_VALUE;
					else if (b(a)) continue;
					else L(n, "Attribute without value"), n.tag.attributes[n.attribName] = "", n.attribValue = "", M(n, "onattribute", {
						name: n.attribName,
						value: ""
					}), n.attribName = "", a === ">" ? B(n) : C(g, a) ? (n.attribName = a, n.state = T.ATTRIB_NAME) : (L(n, "Invalid attribute name"), n.state = T.ATTRIB);
					continue;
				case T.ATTRIB_VALUE:
					if (b(a)) continue;
					x(a) ? (n.q = a, n.state = T.ATTRIB_VALUE_QUOTED) : (n.opt.unquotedAttributeValues || I(n, "Unquoted attribute value"), n.state = T.ATTRIB_VALUE_UNQUOTED, n.attribValue = a);
					continue;
				case T.ATTRIB_VALUE_QUOTED:
					if (a !== n.q) {
						a === "&" ? n.state = T.ATTRIB_VALUE_ENTITY_Q : n.attribValue += a;
						continue;
					}
					te(n), n.q = "", n.state = T.ATTRIB_VALUE_CLOSED;
					continue;
				case T.ATTRIB_VALUE_CLOSED:
					b(a) ? n.state = T.ATTRIB : a === ">" ? B(n) : a === "/" ? n.state = T.OPEN_TAG_SLASH : C(g, a) ? (L(n, "No whitespace between attributes"), n.attribName = a, n.attribValue = "", n.state = T.ATTRIB_NAME) : L(n, "Invalid attribute name");
					continue;
				case T.ATTRIB_VALUE_UNQUOTED:
					if (!S(a)) {
						a === "&" ? n.state = T.ATTRIB_VALUE_ENTITY_U : n.attribValue += a;
						continue;
					}
					te(n), a === ">" ? B(n) : n.state = T.ATTRIB;
					continue;
				case T.CLOSE_TAG:
					if (n.tagName) a === ">" ? V(n) : C(_, a) ? n.tagName += a : n.script ? (n.script += "</" + n.tagName + a, n.tagName = "", n.state = T.SCRIPT) : (b(a) || L(n, "Invalid tagname in closing tag"), n.state = T.CLOSE_TAG_SAW_WHITE);
					else {
						if (b(a)) continue;
						w(g, a) ? n.script ? (n.script += "</" + a, n.state = T.SCRIPT) : L(n, "Invalid tagname in closing tag.") : n.tagName = a;
					}
					continue;
				case T.CLOSE_TAG_SAW_WHITE:
					if (b(a)) continue;
					a === ">" ? V(n) : L(n, "Invalid characters in closing tag");
					continue;
				case T.TEXT_ENTITY:
				case T.ATTRIB_VALUE_ENTITY_Q:
				case T.ATTRIB_VALUE_ENTITY_U:
					var c, l;
					switch (n.state) {
						case T.TEXT_ENTITY:
							c = T.TEXT, l = "textNode";
							break;
						case T.ATTRIB_VALUE_ENTITY_Q:
							c = T.ATTRIB_VALUE_QUOTED, l = "attribValue";
							break;
						case T.ATTRIB_VALUE_ENTITY_U: c = T.ATTRIB_VALUE_UNQUOTED, l = "attribValue";
					}
					if (a === ";") {
						var u = H(n);
						n.opt.unparsedEntities && !Object.values(e.XML_ENTITIES).includes(u) ? ((n.entityCount += 1) > n.opt.maxEntityCount && I(n, "Parsed entity count exceeds max entity count"), (n.entityDepth += 1) > n.opt.maxEntityDepth && I(n, "Parsed entity depth exceeds max entity depth"), n.entity = "", n.state = c, n.write(u), --n.entityDepth) : (n[l] += u, n.entity = "", n.state = c);
					} else C(n.entity.length ? y : v, a) ? n.entity += a : (L(n, "Invalid character in entity name"), n[l] += "&" + n.entity + a, n.entity = "", n.state = c);
					continue;
				default: throw Error(n, "Unknown state: " + n.state);
			}
			return n.position >= n.bufferCheckPosition && r(n), n;
		}
		/* istanbul ignore next */
		String.fromCodePoint || (function() {
			var e = String.fromCharCode, t = Math.floor, n = function() {
				var n = 16384, r = [], i, a, o = -1, s = arguments.length;
				if (!s) return "";
				for (var c = ""; ++o < s;) {
					var l = Number(arguments[o]);
					if (!isFinite(l) || l < 0 || l > 1114111 || t(l) !== l) throw RangeError("Invalid code point: " + l);
					l <= 65535 ? r.push(l) : (l -= 65536, i = (l >> 10) + 55296, a = l % 1024 + 56320, r.push(i, a)), (o + 1 === s || r.length > n) && (c += e.apply(null, r), r.length = 0);
				}
				return c;
			};
			/* istanbul ignore next */
			Object.defineProperty ? Object.defineProperty(String, "fromCodePoint", {
				value: n,
				configurable: !0,
				writable: !0
			}) : String.fromCodePoint = n;
		})();
	})(e === void 0 ? e.sax = {} : e);
})), Je = /* @__PURE__ */ k(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.XElement = void 0, e.parseXml = s;
	var t = qe(), n = Te(), r = class {
		constructor(e) {
			if (this.name = e, this.value = "", this.attributes = null, this.isCData = !1, this.elements = null, !e) throw (0, n.newError)("Element name cannot be empty", "ERR_XML_ELEMENT_NAME_EMPTY");
			if (!a(e)) throw (0, n.newError)(`Invalid element name: ${e}`, "ERR_XML_ELEMENT_INVALID_NAME");
		}
		attribute(e) {
			let t = this.attributes === null ? null : this.attributes[e];
			if (t == null) throw (0, n.newError)(`No attribute "${e}"`, "ERR_XML_MISSED_ATTRIBUTE");
			return t;
		}
		removeAttribute(e) {
			this.attributes !== null && delete this.attributes[e];
		}
		element(e, t = !1, r = null) {
			let i = this.elementOrNull(e, t);
			if (i === null) throw (0, n.newError)(r || `No element "${e}"`, "ERR_XML_MISSED_ELEMENT");
			return i;
		}
		elementOrNull(e, t = !1) {
			if (this.elements === null) return null;
			for (let n of this.elements) if (o(n, e, t)) return n;
			return null;
		}
		getElements(e, t = !1) {
			return this.elements === null ? [] : this.elements.filter((n) => o(n, e, t));
		}
		elementValueOrEmpty(e, t = !1) {
			let n = this.elementOrNull(e, t);
			return n === null ? "" : n.value;
		}
	};
	e.XElement = r;
	var i = /* @__PURE__ */ new RegExp(/^[A-Za-z_][:A-Za-z0-9_-]*$/i);
	function a(e) {
		return i.test(e);
	}
	function o(e, t, n) {
		let r = e.name;
		return r === t || n === !0 && r.length === t.length && r.toLowerCase() === t.toLowerCase();
	}
	function s(e) {
		let n = null, i = t.parser(!0, {}), a = [];
		return i.onopentag = (e) => {
			let t = new r(e.name);
			if (t.attributes = e.attributes, n === null) n = t;
			else {
				let e = a[a.length - 1];
				e.elements ??= [], e.elements.push(t);
			}
			a.push(t);
		}, i.onclosetag = () => {
			a.pop();
		}, i.ontext = (e) => {
			a.length > 0 && (a[a.length - 1].value = e);
		}, i.oncdata = (e) => {
			let t = a[a.length - 1];
			t.value = e, t.isCData = !0;
		}, i.onerror = (e) => {
			throw e;
		}, i.write(e), n;
	}
})), Ye = /* @__PURE__ */ k(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.mapToObject = t, e.isValidKey = n, e.asArray = r, e.deepAssign = s, e.objectToArgs = u;
	function t(e) {
		let r = {};
		for (let [i, a] of e) n(i) && (r[i] = a instanceof Map ? t(a) : a);
		return r;
	}
	function n(e) {
		return [
			"__proto__",
			"prototype",
			"constructor"
		].includes(e) ? !1 : [
			"string",
			"number",
			"symbol",
			"boolean"
		].includes(typeof e) || e === null;
	}
	function r(e) {
		return e == null ? [] : Array.isArray(e) ? e : [e];
	}
	function i(e) {
		if (Array.isArray(e)) return !1;
		let t = typeof e;
		return t === "object" || t === "function";
	}
	function a(e, t, n) {
		let r = t[n];
		if (r === void 0) return;
		let a = e[n];
		e[n] = a == null || r == null || !i(a) || !i(r) ? Array.isArray(a) && Array.isArray(r) ? Array.from(new Set(a.concat(r))) : r : o(a, r);
	}
	function o(e, t) {
		if (e !== t) for (let r of Object.getOwnPropertyNames(t)) n(r) && a(e, t, r);
		return e;
	}
	function s(e, ...t) {
		for (let n of t) n != null && o(e, n);
		return e;
	}
	var c = /^[a-zA-Z][a-zA-Z0-9-]*$/, l = /[\0\r\n]/;
	function u(e) {
		let t = Object.entries(e).reduce((e, [t, r]) => {
			if (!n(t) || r == null) return e;
			if (!c.test(t)) throw Error(`objectToArgs: unsafe flag name rejected: ${JSON.stringify(t)}`);
			if (l.test(r)) throw Error(`objectToArgs: value for --${t} contains a null byte or newline`);
			return e.concat([`--${t}`, r]);
		}, []);
		return Object.freeze(t);
	}
})), Xe = /* @__PURE__ */ k(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.CURRENT_APP_PACKAGE_FILE_NAME = e.CURRENT_APP_INSTALLER_FILE_NAME = e.objectToArgs = e.deepAssign = e.asArray = e.mapToObject = e.isValidKey = e.XElement = e.parseXml = e.UUID = e.parseDn = e.retry = e.githubTagPrefix = e.githubUrl = e.getS3LikeProviderBaseUrl = e.ProgressCallbackTransform = e.MemoLazy = e.safeStringifyJson = e.safeGetHeader = e.parseJson = e.isSensitiveFieldName = e.HttpExecutor = e.hashSensitiveValue = e.HttpError = e.DigestTransform = e.createHttpError = e.configureRequestUrl = e.configureRequestOptionsFromUrl = e.configureRequestOptions = e.newError = e.CancellationToken = e.CancellationError = void 0;
	var t = we();
	Object.defineProperty(e, "CancellationError", {
		enumerable: !0,
		get: function() {
			return t.CancellationError;
		}
	}), Object.defineProperty(e, "CancellationToken", {
		enumerable: !0,
		get: function() {
			return t.CancellationToken;
		}
	});
	var n = Te();
	Object.defineProperty(e, "newError", {
		enumerable: !0,
		get: function() {
			return n.newError;
		}
	});
	var r = Ve();
	Object.defineProperty(e, "configureRequestOptions", {
		enumerable: !0,
		get: function() {
			return r.configureRequestOptions;
		}
	}), Object.defineProperty(e, "configureRequestOptionsFromUrl", {
		enumerable: !0,
		get: function() {
			return r.configureRequestOptionsFromUrl;
		}
	}), Object.defineProperty(e, "configureRequestUrl", {
		enumerable: !0,
		get: function() {
			return r.configureRequestUrl;
		}
	}), Object.defineProperty(e, "createHttpError", {
		enumerable: !0,
		get: function() {
			return r.createHttpError;
		}
	}), Object.defineProperty(e, "DigestTransform", {
		enumerable: !0,
		get: function() {
			return r.DigestTransform;
		}
	}), Object.defineProperty(e, "HttpError", {
		enumerable: !0,
		get: function() {
			return r.HttpError;
		}
	}), Object.defineProperty(e, "hashSensitiveValue", {
		enumerable: !0,
		get: function() {
			return r.hashSensitiveValue;
		}
	}), Object.defineProperty(e, "HttpExecutor", {
		enumerable: !0,
		get: function() {
			return r.HttpExecutor;
		}
	}), Object.defineProperty(e, "isSensitiveFieldName", {
		enumerable: !0,
		get: function() {
			return r.isSensitiveFieldName;
		}
	}), Object.defineProperty(e, "parseJson", {
		enumerable: !0,
		get: function() {
			return r.parseJson;
		}
	}), Object.defineProperty(e, "safeGetHeader", {
		enumerable: !0,
		get: function() {
			return r.safeGetHeader;
		}
	}), Object.defineProperty(e, "safeStringifyJson", {
		enumerable: !0,
		get: function() {
			return r.safeStringifyJson;
		}
	});
	var i = He();
	Object.defineProperty(e, "MemoLazy", {
		enumerable: !0,
		get: function() {
			return i.MemoLazy;
		}
	});
	var a = Be();
	Object.defineProperty(e, "ProgressCallbackTransform", {
		enumerable: !0,
		get: function() {
			return a.ProgressCallbackTransform;
		}
	});
	var o = Ue();
	Object.defineProperty(e, "getS3LikeProviderBaseUrl", {
		enumerable: !0,
		get: function() {
			return o.getS3LikeProviderBaseUrl;
		}
	}), Object.defineProperty(e, "githubUrl", {
		enumerable: !0,
		get: function() {
			return o.githubUrl;
		}
	}), Object.defineProperty(e, "githubTagPrefix", {
		enumerable: !0,
		get: function() {
			return o.githubTagPrefix;
		}
	});
	var s = We();
	Object.defineProperty(e, "retry", {
		enumerable: !0,
		get: function() {
			return s.retry;
		}
	});
	var c = Ge();
	Object.defineProperty(e, "parseDn", {
		enumerable: !0,
		get: function() {
			return c.parseDn;
		}
	});
	var l = Ke();
	Object.defineProperty(e, "UUID", {
		enumerable: !0,
		get: function() {
			return l.UUID;
		}
	});
	var u = Je();
	Object.defineProperty(e, "parseXml", {
		enumerable: !0,
		get: function() {
			return u.parseXml;
		}
	}), Object.defineProperty(e, "XElement", {
		enumerable: !0,
		get: function() {
			return u.XElement;
		}
	});
	var d = Ye();
	Object.defineProperty(e, "isValidKey", {
		enumerable: !0,
		get: function() {
			return d.isValidKey;
		}
	}), Object.defineProperty(e, "mapToObject", {
		enumerable: !0,
		get: function() {
			return d.mapToObject;
		}
	}), Object.defineProperty(e, "asArray", {
		enumerable: !0,
		get: function() {
			return d.asArray;
		}
	}), Object.defineProperty(e, "deepAssign", {
		enumerable: !0,
		get: function() {
			return d.deepAssign;
		}
	}), Object.defineProperty(e, "objectToArgs", {
		enumerable: !0,
		get: function() {
			return d.objectToArgs;
		}
	}), e.CURRENT_APP_INSTALLER_FILE_NAME = "installer.exe", e.CURRENT_APP_PACKAGE_FILE_NAME = "package.7z";
})), Ze = /* @__PURE__ */ k(((e, t) => {
	function n(e) {
		return e == null;
	}
	function r(e) {
		return typeof e == "object" && !!e;
	}
	function i(e) {
		return Array.isArray(e) ? e : n(e) ? [] : [e];
	}
	function a(e, t) {
		if (t) {
			let n = Object.keys(t);
			for (let r = 0, i = n.length; r < i; r += 1) {
				let i = n[r];
				e[i] = t[i];
			}
		}
		return e;
	}
	function o(e, t) {
		let n = "";
		for (let r = 0; r < t; r += 1) n += e;
		return n;
	}
	function s(e) {
		return e === 0 && 1 / e == -Infinity;
	}
	t.exports.isNothing = n, t.exports.isObject = r, t.exports.toArray = i, t.exports.repeat = o, t.exports.isNegativeZero = s, t.exports.extend = a;
})), Qe = /* @__PURE__ */ k(((e, t) => {
	function n(e, t) {
		let n = "", r = e.reason || "(unknown reason)";
		return e.mark ? (e.mark.name && (n += "in \"" + e.mark.name + "\" "), n += "(" + (e.mark.line + 1) + ":" + (e.mark.column + 1) + ")", !t && e.mark.snippet && (n += "\n\n" + e.mark.snippet), r + " " + n) : r;
	}
	function r(e, t) {
		Error.call(this), this.name = "YAMLException", this.reason = e, this.mark = t, this.message = n(this, !1), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = (/* @__PURE__ */ Error()).stack || "";
	}
	r.prototype = Object.create(Error.prototype), r.prototype.constructor = r, r.prototype.toString = function(e) {
		return this.name + ": " + n(this, e);
	}, t.exports = r;
})), $e = /* @__PURE__ */ k(((e, t) => {
	var n = Ze();
	function r(e, t, n, r, i) {
		let a = "", o = "", s = Math.floor(i / 2) - 1;
		return r - t > s && (a = " ... ", t = r - s + a.length), n - r > s && (o = " ...", n = r + s - o.length), {
			str: a + e.slice(t, n).replace(/\t/g, "→") + o,
			pos: r - t + a.length
		};
	}
	function i(e, t) {
		return n.repeat(" ", t - e.length) + e;
	}
	function a(e, t) {
		if (t = Object.create(t || null), !e.buffer) return null;
		t.maxLength || (t.maxLength = 79), typeof t.indent != "number" && (t.indent = 1), typeof t.linesBefore != "number" && (t.linesBefore = 3), typeof t.linesAfter != "number" && (t.linesAfter = 2);
		let a = /\r?\n|\r|\0/g, o = [0], s = [], c, l = -1;
		for (; c = a.exec(e.buffer);) s.push(c.index), o.push(c.index + c[0].length), e.position <= c.index && l < 0 && (l = o.length - 2);
		l < 0 && (l = o.length - 1);
		let u = "", d = Math.min(e.line + t.linesAfter, s.length).toString().length, f = t.maxLength - (t.indent + d + 3);
		for (let a = 1; a <= t.linesBefore && !(l - a < 0); a++) {
			let c = r(e.buffer, o[l - a], s[l - a], e.position - (o[l] - o[l - a]), f);
			u = n.repeat(" ", t.indent) + i((e.line - a + 1).toString(), d) + " | " + c.str + "\n" + u;
		}
		let p = r(e.buffer, o[l], s[l], e.position, f);
		u += n.repeat(" ", t.indent) + i((e.line + 1).toString(), d) + " | " + p.str + "\n", u += n.repeat("-", t.indent + d + 3 + p.pos) + "^\n";
		for (let a = 1; a <= t.linesAfter && !(l + a >= s.length); a++) {
			let c = r(e.buffer, o[l + a], s[l + a], e.position - (o[l] - o[l + a]), f);
			u += n.repeat(" ", t.indent) + i((e.line + a + 1).toString(), d) + " | " + c.str + "\n";
		}
		return u.replace(/\n$/, "");
	}
	t.exports = a;
})), q = /* @__PURE__ */ k(((e, t) => {
	var n = Qe(), r = [
		"kind",
		"multi",
		"resolve",
		"construct",
		"instanceOf",
		"predicate",
		"represent",
		"representName",
		"defaultStyle",
		"styleAliases"
	], i = [
		"scalar",
		"sequence",
		"mapping"
	];
	function a(e) {
		let t = {};
		return e !== null && Object.keys(e).forEach(function(n) {
			e[n].forEach(function(e) {
				t[String(e)] = n;
			});
		}), t;
	}
	function o(e, t) {
		if (t ||= {}, Object.keys(t).forEach(function(t) {
			if (r.indexOf(t) === -1) throw new n("Unknown option \"" + t + "\" is met in definition of \"" + e + "\" YAML type.");
		}), this.options = t, this.tag = e, this.kind = t.kind || null, this.resolve = t.resolve || function() {
			return !0;
		}, this.construct = t.construct || function(e) {
			return e;
		}, this.instanceOf = t.instanceOf || null, this.predicate = t.predicate || null, this.represent = t.represent || null, this.representName = t.representName || null, this.defaultStyle = t.defaultStyle || null, this.multi = t.multi || !1, this.styleAliases = a(t.styleAliases || null), i.indexOf(this.kind) === -1) throw new n("Unknown kind \"" + this.kind + "\" is specified for \"" + e + "\" YAML type.");
	}
	t.exports = o;
})), et = /* @__PURE__ */ k(((e, t) => {
	var n = Qe(), r = q();
	function i(e, t) {
		let n = [];
		return e[t].forEach(function(e) {
			let t = n.length;
			n.forEach(function(n, r) {
				n.tag === e.tag && n.kind === e.kind && n.multi === e.multi && (t = r);
			}), n[t] = e;
		}), n;
	}
	function a() {
		let e = {
			scalar: {},
			sequence: {},
			mapping: {},
			fallback: {},
			multi: {
				scalar: [],
				sequence: [],
				mapping: [],
				fallback: []
			}
		};
		function t(t) {
			t.multi ? (e.multi[t.kind].push(t), e.multi.fallback.push(t)) : e[t.kind][t.tag] = e.fallback[t.tag] = t;
		}
		for (let e = 0, n = arguments.length; e < n; e += 1) arguments[e].forEach(t);
		return e;
	}
	function o(e) {
		return this.extend(e);
	}
	o.prototype.extend = function(e) {
		let t = [], s = [];
		if (e instanceof r) s.push(e);
		else if (Array.isArray(e)) s = s.concat(e);
		else if (e && (Array.isArray(e.implicit) || Array.isArray(e.explicit))) e.implicit && (t = t.concat(e.implicit)), e.explicit && (s = s.concat(e.explicit));
		else throw new n("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");
		t.forEach(function(e) {
			if (!(e instanceof r)) throw new n("Specified list of YAML types (or a single Type object) contains a non-Type object.");
			if (e.loadKind && e.loadKind !== "scalar") throw new n("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
			if (e.multi) throw new n("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.");
		}), s.forEach(function(e) {
			if (!(e instanceof r)) throw new n("Specified list of YAML types (or a single Type object) contains a non-Type object.");
		});
		let c = Object.create(o.prototype);
		return c.implicit = (this.implicit || []).concat(t), c.explicit = (this.explicit || []).concat(s), c.compiledImplicit = i(c, "implicit"), c.compiledExplicit = i(c, "explicit"), c.compiledTypeMap = a(c.compiledImplicit, c.compiledExplicit), c;
	}, t.exports = o;
})), tt = /* @__PURE__ */ k(((e, t) => {
	t.exports = new (q())("tag:yaml.org,2002:str", {
		kind: "scalar",
		construct: function(e) {
			return e === null ? "" : e;
		}
	});
})), nt = /* @__PURE__ */ k(((e, t) => {
	t.exports = new (q())("tag:yaml.org,2002:seq", {
		kind: "sequence",
		construct: function(e) {
			return e === null ? [] : e;
		}
	});
})), rt = /* @__PURE__ */ k(((e, t) => {
	t.exports = new (q())("tag:yaml.org,2002:map", {
		kind: "mapping",
		construct: function(e) {
			return e === null ? {} : e;
		}
	});
})), it = /* @__PURE__ */ k(((e, t) => {
	t.exports = new (et())({ explicit: [
		tt(),
		nt(),
		rt()
	] });
})), at = /* @__PURE__ */ k(((e, t) => {
	var n = q();
	function r(e) {
		if (e === null) return !0;
		let t = e.length;
		return t === 1 && e === "~" || t === 4 && (e === "null" || e === "Null" || e === "NULL");
	}
	function i() {
		return null;
	}
	function a(e) {
		return e === null;
	}
	t.exports = new n("tag:yaml.org,2002:null", {
		kind: "scalar",
		resolve: r,
		construct: i,
		predicate: a,
		represent: {
			canonical: function() {
				return "~";
			},
			lowercase: function() {
				return "null";
			},
			uppercase: function() {
				return "NULL";
			},
			camelcase: function() {
				return "Null";
			},
			empty: function() {
				return "";
			}
		},
		defaultStyle: "lowercase"
	});
})), ot = /* @__PURE__ */ k(((e, t) => {
	var n = q();
	function r(e) {
		if (e === null) return !1;
		let t = e.length;
		return t === 4 && (e === "true" || e === "True" || e === "TRUE") || t === 5 && (e === "false" || e === "False" || e === "FALSE");
	}
	function i(e) {
		return e === "true" || e === "True" || e === "TRUE";
	}
	function a(e) {
		return Object.prototype.toString.call(e) === "[object Boolean]";
	}
	t.exports = new n("tag:yaml.org,2002:bool", {
		kind: "scalar",
		resolve: r,
		construct: i,
		predicate: a,
		represent: {
			lowercase: function(e) {
				return e ? "true" : "false";
			},
			uppercase: function(e) {
				return e ? "TRUE" : "FALSE";
			},
			camelcase: function(e) {
				return e ? "True" : "False";
			}
		},
		defaultStyle: "lowercase"
	});
})), st = /* @__PURE__ */ k(((e, t) => {
	var n = Ze(), r = q();
	function i(e) {
		return e >= 48 && e <= 57 || e >= 65 && e <= 70 || e >= 97 && e <= 102;
	}
	function a(e) {
		return e >= 48 && e <= 55;
	}
	function o(e) {
		return e >= 48 && e <= 57;
	}
	function s(e) {
		if (e === null) return !1;
		let t = e.length, n = 0, r = !1;
		if (!t) return !1;
		let s = e[n];
		if ((s === "-" || s === "+") && (s = e[++n]), s === "0") {
			if (n + 1 === t) return !0;
			if (s = e[++n], s === "b") {
				for (n++; n < t; n++) {
					if (s = e[n], s !== "0" && s !== "1") return !1;
					r = !0;
				}
				return r && isFinite(c(e));
			}
			if (s === "x") {
				for (n++; n < t; n++) {
					if (!i(e.charCodeAt(n))) return !1;
					r = !0;
				}
				return r && isFinite(c(e));
			}
			if (s === "o") {
				for (n++; n < t; n++) {
					if (!a(e.charCodeAt(n))) return !1;
					r = !0;
				}
				return r && isFinite(c(e));
			}
		}
		for (; n < t; n++) {
			if (!o(e.charCodeAt(n))) return !1;
			r = !0;
		}
		return r ? isFinite(c(e)) : !1;
	}
	function c(e) {
		let t = e, n = 1, r = t[0];
		if ((r === "-" || r === "+") && (r === "-" && (n = -1), t = t.slice(1), r = t[0]), t === "0") return 0;
		if (r === "0") {
			if (t[1] === "b") return n * parseInt(t.slice(2), 2);
			if (t[1] === "x") return n * parseInt(t.slice(2), 16);
			if (t[1] === "o") return n * parseInt(t.slice(2), 8);
		}
		return n * parseInt(t, 10);
	}
	function l(e) {
		return c(e);
	}
	function u(e) {
		return Object.prototype.toString.call(e) === "[object Number]" && e % 1 == 0 && !n.isNegativeZero(e);
	}
	t.exports = new r("tag:yaml.org,2002:int", {
		kind: "scalar",
		resolve: s,
		construct: l,
		predicate: u,
		represent: {
			binary: function(e) {
				return e >= 0 ? "0b" + e.toString(2) : "-0b" + e.toString(2).slice(1);
			},
			octal: function(e) {
				return e >= 0 ? "0o" + e.toString(8) : "-0o" + e.toString(8).slice(1);
			},
			decimal: function(e) {
				return e.toString(10);
			},
			hexadecimal: function(e) {
				return e >= 0 ? "0x" + e.toString(16).toUpperCase() : "-0x" + e.toString(16).toUpperCase().slice(1);
			}
		},
		defaultStyle: "decimal",
		styleAliases: {
			binary: [2, "bin"],
			octal: [8, "oct"],
			decimal: [10, "dec"],
			hexadecimal: [16, "hex"]
		}
	});
})), ct = /* @__PURE__ */ k(((e, t) => {
	var n = Ze(), r = q(), i = /* @__PURE__ */ RegExp("^(?:[-+]?(?:[0-9]+)(?:\\.[0-9]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"), a = /* @__PURE__ */ RegExp("^(?:[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");
	function o(e) {
		return e === null || !i.test(e) ? !1 : isFinite(parseFloat(e, 10)) ? !0 : a.test(e);
	}
	function s(e) {
		let t = e.toLowerCase(), n = t[0] === "-" ? -1 : 1;
		return "+-".indexOf(t[0]) >= 0 && (t = t.slice(1)), t === ".inf" ? n === 1 ? Infinity : -Infinity : t === ".nan" ? NaN : n * parseFloat(t, 10);
	}
	var c = /^[-+]?[0-9]+e/;
	function l(e, t) {
		if (isNaN(e)) switch (t) {
			case "lowercase": return ".nan";
			case "uppercase": return ".NAN";
			case "camelcase": return ".NaN";
		}
		else if (e === Infinity) switch (t) {
			case "lowercase": return ".inf";
			case "uppercase": return ".INF";
			case "camelcase": return ".Inf";
		}
		else if (e === -Infinity) switch (t) {
			case "lowercase": return "-.inf";
			case "uppercase": return "-.INF";
			case "camelcase": return "-.Inf";
		}
		else if (n.isNegativeZero(e)) return "-0.0";
		let r = e.toString(10);
		return c.test(r) ? r.replace("e", ".e") : r;
	}
	function u(e) {
		return Object.prototype.toString.call(e) === "[object Number]" && (e % 1 != 0 || n.isNegativeZero(e));
	}
	t.exports = new r("tag:yaml.org,2002:float", {
		kind: "scalar",
		resolve: o,
		construct: s,
		predicate: u,
		represent: l,
		defaultStyle: "lowercase"
	});
})), lt = /* @__PURE__ */ k(((e, t) => {
	t.exports = it().extend({ implicit: [
		at(),
		ot(),
		st(),
		ct()
	] });
})), ut = /* @__PURE__ */ k(((e, t) => {
	t.exports = lt();
})), dt = /* @__PURE__ */ k(((e, t) => {
	var n = q(), r = /* @__PURE__ */ RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"), i = /* @__PURE__ */ RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$");
	function a(e) {
		return e === null ? !1 : r.exec(e) !== null || i.exec(e) !== null;
	}
	function o(e) {
		let t = 0, n = null, a = r.exec(e);
		if (a === null && (a = i.exec(e)), a === null) throw Error("Date resolve error");
		let o = +a[1], s = a[2] - 1, c = +a[3];
		if (!a[4]) return new Date(Date.UTC(o, s, c));
		let l = +a[4], u = +a[5], d = +a[6];
		if (a[7]) {
			for (t = a[7].slice(0, 3); t.length < 3;) t += "0";
			t = +t;
		}
		if (a[9]) {
			let e = +a[10], t = +(a[11] || 0);
			n = (e * 60 + t) * 6e4, a[9] === "-" && (n = -n);
		}
		let f = new Date(Date.UTC(o, s, c, l, u, d, t));
		return n && f.setTime(f.getTime() - n), f;
	}
	function s(e) {
		return e.toISOString();
	}
	t.exports = new n("tag:yaml.org,2002:timestamp", {
		kind: "scalar",
		resolve: a,
		construct: o,
		instanceOf: Date,
		represent: s
	});
})), ft = /* @__PURE__ */ k(((e, t) => {
	var n = q();
	function r(e) {
		return e === "<<" || e === null;
	}
	t.exports = new n("tag:yaml.org,2002:merge", {
		kind: "scalar",
		resolve: r
	});
})), pt = /* @__PURE__ */ k(((e, t) => {
	var n = q(), r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\n\r";
	function i(e) {
		if (e === null) return !1;
		let t = 0, n = e.length, i = r;
		for (let r = 0; r < n; r++) {
			let n = i.indexOf(e.charAt(r));
			if (!(n > 64)) {
				if (n < 0) return !1;
				t += 6;
			}
		}
		return t % 8 == 0;
	}
	function a(e) {
		let t = e.replace(/[\r\n=]/g, ""), n = t.length, i = r, a = 0, o = [];
		for (let e = 0; e < n; e++) e % 4 == 0 && e && (o.push(a >> 16 & 255), o.push(a >> 8 & 255), o.push(a & 255)), a = a << 6 | i.indexOf(t.charAt(e));
		let s = n % 4 * 6;
		return s === 0 ? (o.push(a >> 16 & 255), o.push(a >> 8 & 255), o.push(a & 255)) : s === 18 ? (o.push(a >> 10 & 255), o.push(a >> 2 & 255)) : s === 12 && o.push(a >> 4 & 255), new Uint8Array(o);
	}
	function o(e) {
		let t = "", n = 0, i = e.length, a = r;
		for (let r = 0; r < i; r++) r % 3 == 0 && r && (t += a[n >> 18 & 63], t += a[n >> 12 & 63], t += a[n >> 6 & 63], t += a[n & 63]), n = (n << 8) + e[r];
		let o = i % 3;
		return o === 0 ? (t += a[n >> 18 & 63], t += a[n >> 12 & 63], t += a[n >> 6 & 63], t += a[n & 63]) : o === 2 ? (t += a[n >> 10 & 63], t += a[n >> 4 & 63], t += a[n << 2 & 63], t += a[64]) : o === 1 && (t += a[n >> 2 & 63], t += a[n << 4 & 63], t += a[64], t += a[64]), t;
	}
	function s(e) {
		return Object.prototype.toString.call(e) === "[object Uint8Array]";
	}
	t.exports = new n("tag:yaml.org,2002:binary", {
		kind: "scalar",
		resolve: i,
		construct: a,
		predicate: s,
		represent: o
	});
})), mt = /* @__PURE__ */ k(((e, t) => {
	var n = q(), r = Object.prototype.hasOwnProperty, i = Object.prototype.toString;
	function a(e) {
		if (e === null) return !0;
		let t = {}, n = e;
		for (let e = 0, a = n.length; e < a; e += 1) {
			let a = n[e], o = !1;
			if (i.call(a) !== "[object Object]") return !1;
			let s;
			for (s in a) if (r.call(a, s)) {
				if (!o) o = !0;
				else return !1;
			}
			if (!o || r.call(t, s)) return !1;
			Object.defineProperty(t, s, { value: !0 });
		}
		return !0;
	}
	function o(e) {
		return e === null ? [] : e;
	}
	t.exports = new n("tag:yaml.org,2002:omap", {
		kind: "sequence",
		resolve: a,
		construct: o
	});
})), ht = /* @__PURE__ */ k(((e, t) => {
	var n = q(), r = Object.prototype.toString;
	function i(e) {
		if (e === null) return !0;
		let t = e, n = Array(t.length);
		for (let e = 0, i = t.length; e < i; e += 1) {
			let i = t[e];
			if (r.call(i) !== "[object Object]") return !1;
			let a = Object.keys(i);
			if (a.length !== 1) return !1;
			n[e] = [a[0], i[a[0]]];
		}
		return !0;
	}
	function a(e) {
		if (e === null) return [];
		let t = e, n = Array(t.length);
		for (let e = 0, r = t.length; e < r; e += 1) {
			let r = t[e], i = Object.keys(r);
			n[e] = [i[0], r[i[0]]];
		}
		return n;
	}
	t.exports = new n("tag:yaml.org,2002:pairs", {
		kind: "sequence",
		resolve: i,
		construct: a
	});
})), gt = /* @__PURE__ */ k(((e, t) => {
	var n = q(), r = Object.prototype.hasOwnProperty;
	function i(e) {
		if (e === null) return !0;
		let t = e;
		for (let e in t) if (r.call(t, e) && t[e] !== null) return !1;
		return !0;
	}
	function a(e) {
		return e === null ? {} : e;
	}
	t.exports = new n("tag:yaml.org,2002:set", {
		kind: "mapping",
		resolve: i,
		construct: a
	});
})), _t = /* @__PURE__ */ k(((e, t) => {
	t.exports = ut().extend({
		implicit: [dt(), ft()],
		explicit: [
			pt(),
			mt(),
			ht(),
			gt()
		]
	});
})), vt = /* @__PURE__ */ k(((e, t) => {
	var n = Ze(), r = Qe(), i = $e(), a = _t(), o = Object.prototype.hasOwnProperty, s = 1, c = 2, l = 3, u = 4, d = 1, f = 2, p = 3, m = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/, h = /[\x85\u2028\u2029]/, g = /[,\[\]{}]/, _ = /^(?:!|!!|![0-9A-Za-z-]+!)$/, v = /^(?:!|[^,\[\]{}])(?:%[0-9a-f]{2}|[0-9a-z\-#;/?:@&=+$,_.!~*'()\[\]])*$/i;
	function y(e) {
		return Object.prototype.toString.call(e);
	}
	function b(e) {
		return e === 10 || e === 13;
	}
	function x(e) {
		return e === 9 || e === 32;
	}
	function S(e) {
		return e === 9 || e === 32 || e === 10 || e === 13;
	}
	function C(e) {
		return e === 44 || e === 91 || e === 93 || e === 123 || e === 125;
	}
	function w(e) {
		if (e >= 48 && e <= 57) return e - 48;
		let t = e | 32;
		return t >= 97 && t <= 102 ? t - 97 + 10 : -1;
	}
	function T(e) {
		return e === 120 ? 2 : e === 117 ? 4 : e === 85 ? 8 : 0;
	}
	function E(e) {
		return e >= 48 && e <= 57 ? e - 48 : -1;
	}
	function D(e) {
		switch (e) {
			case 48: return "\0";
			case 97: return "\x07";
			case 98: return "\b";
			case 116: return "	";
			case 9: return "	";
			case 110: return "\n";
			case 118: return "\v";
			case 102: return "\f";
			case 114: return "\r";
			case 101: return "\x1B";
			case 32: return " ";
			case 34: return "\"";
			case 47: return "/";
			case 92: return "\\";
			case 78: return "";
			case 95: return "\xA0";
			case 76: return "\u2028";
			case 80: return "\u2029";
			default: return "";
		}
	}
	function O(e) {
		return e <= 65535 ? String.fromCharCode(e) : String.fromCharCode((e - 65536 >> 10) + 55296, (e - 65536 & 1023) + 56320);
	}
	function k(e, t, n) {
		t === "__proto__" ? Object.defineProperty(e, t, {
			configurable: !0,
			enumerable: !0,
			writable: !0,
			value: n
		}) : e[t] = n;
	}
	var A = Array(256), j = Array(256);
	for (let e = 0; e < 256; e++) A[e] = +!!D(e), j[e] = D(e);
	function M(e, t) {
		this.input = e, this.filename = t.filename || null, this.schema = t.schema || a, this.onWarning = t.onWarning || null, this.legacy = t.legacy || !1, this.json = t.json || !1, this.listener = t.listener || null, this.maxDepth = typeof t.maxDepth == "number" ? t.maxDepth : 100, this.maxTotalMergeKeys = typeof t.maxTotalMergeKeys == "number" ? t.maxTotalMergeKeys : 1e4, this.implicitTypes = this.schema.compiledImplicit, this.typeMap = this.schema.compiledTypeMap, this.length = e.length, this.position = 0, this.line = 0, this.lineStart = 0, this.lineIndent = 0, this.depth = 0, this.totalMergeKeys = 0, this.firstTabInLine = -1, this.documents = [], this.anchorMapTransactions = [];
	}
	function N(e, t) {
		let n = {
			name: e.filename,
			buffer: e.input.slice(0, -1),
			position: e.position,
			line: e.line,
			column: e.position - e.lineStart
		};
		return n.snippet = i(n), new r(t, n);
	}
	function P(e, t) {
		throw N(e, t);
	}
	function F(e, t) {
		e.onWarning && e.onWarning.call(null, N(e, t));
	}
	function I(e, t, n) {
		let r = e.anchorMapTransactions;
		if (r.length !== 0) {
			let n = r[r.length - 1];
			o.call(n, t) || (n[t] = {
				existed: o.call(e.anchorMap, t),
				value: e.anchorMap[t]
			});
		}
		e.anchorMap[t] = n;
	}
	function ee(e) {
		e.anchorMapTransactions.push(Object.create(null));
	}
	function L(e) {
		let t = e.anchorMapTransactions.pop(), n = e.anchorMapTransactions;
		if (n.length === 0) return;
		let r = n[n.length - 1], i = Object.keys(t);
		for (let e = 0, n = i.length; e < n; e += 1) {
			let n = i[e];
			o.call(r, n) || (r[n] = t[n]);
		}
	}
	function R(e) {
		let t = e.anchorMapTransactions.pop(), n = Object.keys(t);
		for (let r = n.length - 1; r >= 0; --r) {
			let i = t[n[r]];
			i.existed ? e.anchorMap[n[r]] = i.value : delete e.anchorMap[n[r]];
		}
	}
	function z(e) {
		return {
			position: e.position,
			line: e.line,
			lineStart: e.lineStart,
			lineIndent: e.lineIndent,
			firstTabInLine: e.firstTabInLine,
			tag: e.tag,
			anchor: e.anchor,
			kind: e.kind,
			result: e.result
		};
	}
	function te(e, t) {
		e.position = t.position, e.line = t.line, e.lineStart = t.lineStart, e.lineIndent = t.lineIndent, e.firstTabInLine = t.firstTabInLine, e.tag = t.tag, e.anchor = t.anchor, e.kind = t.kind, e.result = t.result;
	}
	var B = {
		YAML: function(e, t, n) {
			e.version !== null && P(e, "duplication of %YAML directive"), n.length !== 1 && P(e, "YAML directive accepts exactly one argument");
			let r = /^([0-9]+)\.([0-9]+)$/.exec(n[0]);
			r === null && P(e, "ill-formed argument of the YAML directive");
			let i = parseInt(r[1], 10), a = parseInt(r[2], 10);
			i !== 1 && P(e, "unacceptable YAML version of the document"), e.version = n[0], e.checkLineBreaks = a < 2, a !== 1 && a !== 2 && F(e, "unsupported YAML version of the document");
		},
		TAG: function(e, t, n) {
			let r;
			n.length !== 2 && P(e, "TAG directive accepts exactly two arguments");
			let i = n[0];
			r = n[1], _.test(i) || P(e, "ill-formed tag handle (first argument) of the TAG directive"), o.call(e.tagMap, i) && P(e, "there is a previously declared suffix for \"" + i + "\" tag handle"), v.test(r) || P(e, "ill-formed tag prefix (second argument) of the TAG directive");
			try {
				r = decodeURIComponent(r);
			} catch {
				P(e, "tag prefix is malformed: " + r);
			}
			e.tagMap[i] = r;
		}
	};
	function V(e, t, n, r) {
		if (t < n) {
			let i = e.input.slice(t, n);
			if (r) for (let t = 0, n = i.length; t < n; t += 1) {
				let n = i.charCodeAt(t);
				n === 9 || n >= 32 && n <= 1114111 || P(e, "expected valid JSON character");
			}
			else m.test(i) && P(e, "the stream contains non-printable characters");
			e.result += i;
		}
	}
	function H(e) {
		e.totalMergeKeys++, e.maxTotalMergeKeys !== -1 && e.totalMergeKeys > e.maxTotalMergeKeys && P(e, "merge keys exceeded maxTotalMergeKeys (" + e.maxTotalMergeKeys + ")");
	}
	function ne(e, t, r, i) {
		n.isObject(r) || P(e, "cannot merge mappings; the provided source object is unacceptable"), H(e);
		let a = Object.keys(r);
		for (let n = 0, s = a.length; n < s; n += 1) {
			let s = a[n];
			H(e), o.call(t, s) || (k(t, s, r[s]), i[s] = !0);
		}
	}
	function U(e, t, n, r, i, a, s, c, l) {
		if (Array.isArray(i)) {
			i = Array.prototype.slice.call(i);
			for (let t = 0, n = i.length; t < n; t += 1) Array.isArray(i[t]) && P(e, "nested arrays are not supported inside keys"), typeof i == "object" && y(i[t]) === "[object Object]" && (i[t] = "[object Object]");
		}
		if (typeof i == "object" && y(i) === "[object Object]" && (i = "[object Object]"), i = String(i), t === null && (t = {}), r === "tag:yaml.org,2002:merge") {
			if (Array.isArray(a)) {
				a.length > 100 && P(e, "abnormal merge sequence size");
				for (let r = 0, i = a.length; r < i; r += 1) ne(e, t, a[r], n);
			} else ne(e, t, a, n);
		} else !e.json && !o.call(n, i) && o.call(t, i) && (e.line = s || e.line, e.lineStart = c || e.lineStart, e.position = l || e.position, P(e, "duplicated mapping key")), k(t, i, a), delete n[i];
		return t;
	}
	function re(e) {
		let t = e.input.charCodeAt(e.position);
		t === 10 ? e.position++ : t === 13 ? (e.position++, e.input.charCodeAt(e.position) === 10 && e.position++) : P(e, "a line break is expected"), e.line += 1, e.lineStart = e.position, e.firstTabInLine = -1;
	}
	function W(e, t, n) {
		let r = 0, i = e.input.charCodeAt(e.position);
		for (; i !== 0;) {
			for (; x(i);) i === 9 && e.firstTabInLine === -1 && (e.firstTabInLine = e.position), i = e.input.charCodeAt(++e.position);
			if (t && i === 35) do
				i = e.input.charCodeAt(++e.position);
			while (i !== 10 && i !== 13 && i !== 0);
			if (b(i)) for (re(e), i = e.input.charCodeAt(e.position), r++, e.lineIndent = 0; i === 32;) e.lineIndent++, i = e.input.charCodeAt(++e.position);
			else break;
		}
		return n !== -1 && r !== 0 && e.lineIndent < n && F(e, "deficient indentation"), r;
	}
	function ie(e) {
		let t = e.position, n = e.input.charCodeAt(t);
		return !!((n === 45 || n === 46) && n === e.input.charCodeAt(t + 1) && n === e.input.charCodeAt(t + 2) && (t += 3, n = e.input.charCodeAt(t), n === 0 || S(n)));
	}
	function ae(e, t) {
		t === 1 ? e.result += " " : t > 1 && (e.result += n.repeat("\n", t - 1));
	}
	function oe(e, t, n) {
		let r, i, a, o, s, c, l = e.kind, u = e.result, d = e.input.charCodeAt(e.position);
		if (S(d) || C(d) || d === 35 || d === 38 || d === 42 || d === 33 || d === 124 || d === 62 || d === 39 || d === 34 || d === 37 || d === 64 || d === 96) return !1;
		if (d === 63 || d === 45) {
			let t = e.input.charCodeAt(e.position + 1);
			if (S(t) || n && C(t)) return !1;
		}
		for (e.kind = "scalar", e.result = "", r = i = e.position, a = !1; d !== 0;) {
			if (d === 58) {
				let t = e.input.charCodeAt(e.position + 1);
				if (S(t) || n && C(t)) break;
			} else if (d === 35) {
				if (S(e.input.charCodeAt(e.position - 1))) break;
			} else if (e.position === e.lineStart && ie(e) || n && C(d)) break;
			else if (b(d)) {
				if (o = e.line, s = e.lineStart, c = e.lineIndent, W(e, !1, -1), e.lineIndent >= t) {
					a = !0, d = e.input.charCodeAt(e.position);
					continue;
				}
				e.position = i, e.line = o, e.lineStart = s, e.lineIndent = c;
				break;
			}
			a &&= (V(e, r, i, !1), ae(e, e.line - o), r = i = e.position, !1), x(d) || (i = e.position + 1), d = e.input.charCodeAt(++e.position);
		}
		return V(e, r, i, !1), e.result ? !0 : (e.kind = l, e.result = u, !1);
	}
	function se(e, t) {
		let n, r, i = e.input.charCodeAt(e.position);
		if (i !== 39) return !1;
		for (e.kind = "scalar", e.result = "", e.position++, n = r = e.position; (i = e.input.charCodeAt(e.position)) !== 0;) if (i === 39) {
			if (V(e, n, e.position, !0), i = e.input.charCodeAt(++e.position), i === 39) n = e.position, e.position++, r = e.position;
			else return !0;
		} else b(i) ? (V(e, n, r, !0), ae(e, W(e, !1, t)), n = r = e.position) : e.position === e.lineStart && ie(e) ? P(e, "unexpected end of the document within a single quoted scalar") : (e.position++, x(i) || (r = e.position));
		P(e, "unexpected end of the stream within a single quoted scalar");
	}
	function ce(e, t) {
		let n, r, i, a = e.input.charCodeAt(e.position);
		if (a !== 34) return !1;
		for (e.kind = "scalar", e.result = "", e.position++, n = r = e.position; (a = e.input.charCodeAt(e.position)) !== 0;) if (a === 34) return V(e, n, e.position, !0), e.position++, !0;
		else if (a === 92) {
			if (V(e, n, e.position, !0), a = e.input.charCodeAt(++e.position), b(a)) W(e, !1, t);
			else if (a < 256 && A[a]) e.result += j[a], e.position++;
			else if ((i = T(a)) > 0) {
				let t = i, n = 0;
				for (; t > 0; t--) a = e.input.charCodeAt(++e.position), (i = w(a)) >= 0 ? n = (n << 4) + i : P(e, "expected hexadecimal character");
				e.result += O(n), e.position++;
			} else P(e, "unknown escape sequence");
			n = r = e.position;
		} else b(a) ? (V(e, n, r, !0), ae(e, W(e, !1, t)), n = r = e.position) : e.position === e.lineStart && ie(e) ? P(e, "unexpected end of the document within a double quoted scalar") : (e.position++, x(a) || (r = e.position));
		P(e, "unexpected end of the stream within a double quoted scalar");
	}
	function G(e, t) {
		let n = !0, r, i, a, o = e.tag, c, l = e.anchor, u, d, f, p, m = Object.create(null), h, g, _, v = e.input.charCodeAt(e.position);
		if (v === 91) u = 93, p = !1, c = [];
		else if (v === 123) u = 125, p = !0, c = {};
		else return !1;
		for (e.anchor !== null && I(e, e.anchor, c), v = e.input.charCodeAt(++e.position); v !== 0;) {
			if (W(e, !0, t), v = e.input.charCodeAt(e.position), v === u) return e.position++, e.tag = o, e.anchor = l, e.kind = p ? "mapping" : "sequence", e.result = c, !0;
			n ? v === 44 && P(e, "expected the node content, but found ','") : P(e, "missed comma between flow collection entries"), g = h = _ = null, d = f = !1, v === 63 && S(e.input.charCodeAt(e.position + 1)) && (d = f = !0, e.position++, W(e, !0, t)), r = e.line, i = e.lineStart, a = e.position, ge(e, t, s, !1, !0), g = e.tag, h = e.result, W(e, !0, t), v = e.input.charCodeAt(e.position), (f || e.line === r) && v === 58 && (d = !0, v = e.input.charCodeAt(++e.position), W(e, !0, t), ge(e, t, s, !1, !0), _ = e.result), p ? U(e, c, m, g, h, _, r, i, a) : d ? c.push(U(e, null, m, g, h, _, r, i, a)) : c.push(h), W(e, !0, t), v = e.input.charCodeAt(e.position), v === 44 ? (n = !0, v = e.input.charCodeAt(++e.position)) : n = !1;
		}
		P(e, "unexpected end of the stream within a flow collection");
	}
	function le(e, t) {
		let r, i = d, a = !1, o = !1, s = t, c = 0, l = !1, u, m = e.input.charCodeAt(e.position);
		if (m === 124) r = !1;
		else if (m === 62) r = !0;
		else return !1;
		for (e.kind = "scalar", e.result = ""; m !== 0;) if (m = e.input.charCodeAt(++e.position), m === 43 || m === 45) d === i ? i = m === 43 ? p : f : P(e, "repeat of a chomping mode identifier");
		else if ((u = E(m)) >= 0) u === 0 ? P(e, "bad explicit indentation width of a block scalar; it cannot be less than one") : o ? P(e, "repeat of an indentation width identifier") : (s = t + u - 1, o = !0);
		else break;
		if (x(m)) {
			do
				m = e.input.charCodeAt(++e.position);
			while (x(m));
			if (m === 35) do
				m = e.input.charCodeAt(++e.position);
			while (!b(m) && m !== 0);
		}
		for (; m !== 0;) {
			for (re(e), e.lineIndent = 0, m = e.input.charCodeAt(e.position); (!o || e.lineIndent < s) && m === 32;) e.lineIndent++, m = e.input.charCodeAt(++e.position);
			if (!o && e.lineIndent > s && (s = e.lineIndent), b(m)) {
				c++;
				continue;
			}
			if (!o && s === 0 && P(e, "missing indentation for block scalar"), e.lineIndent < s) {
				i === p ? e.result += n.repeat("\n", a ? 1 + c : c) : i === d && a && (e.result += "\n");
				break;
			}
			r ? x(m) ? (l = !0, e.result += n.repeat("\n", a ? 1 + c : c)) : l ? (l = !1, e.result += n.repeat("\n", c + 1)) : c === 0 ? a && (e.result += " ") : e.result += n.repeat("\n", c) : e.result += n.repeat("\n", a ? 1 + c : c), a = !0, o = !0, c = 0;
			let t = e.position;
			for (; !b(m) && m !== 0;) m = e.input.charCodeAt(++e.position);
			V(e, t, e.position, !1);
		}
		return !0;
	}
	function ue(e, t) {
		let n = e.tag, r = e.anchor, i = [], a = !1;
		if (e.firstTabInLine !== -1) return !1;
		e.anchor !== null && I(e, e.anchor, i);
		let o = e.input.charCodeAt(e.position);
		for (; o !== 0 && (e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, P(e, "tab characters must not be used in indentation")), o === 45 && S(e.input.charCodeAt(e.position + 1)));) {
			if (a = !0, e.position++, W(e, !0, -1) && e.lineIndent <= t) {
				i.push(null), o = e.input.charCodeAt(e.position);
				continue;
			}
			let n = e.line;
			if (ge(e, t, l, !1, !0), i.push(e.result), W(e, !0, -1), o = e.input.charCodeAt(e.position), (e.line === n || e.lineIndent > t) && o !== 0) P(e, "bad indentation of a sequence entry");
			else if (e.lineIndent < t) break;
		}
		return a ? (e.tag = n, e.anchor = r, e.kind = "sequence", e.result = i, !0) : !1;
	}
	function de(e, t, n) {
		let r, i, a, o, s = e.tag, l = e.anchor, d = {}, f = Object.create(null), p = null, m = null, h = null, g = !1, _ = !1;
		if (e.firstTabInLine !== -1) return !1;
		e.anchor !== null && I(e, e.anchor, d);
		let v = e.input.charCodeAt(e.position);
		for (; v !== 0;) {
			!g && e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, P(e, "tab characters must not be used in indentation"));
			let y = e.input.charCodeAt(e.position + 1), b = e.line;
			if ((v === 63 || v === 58) && S(y)) v === 63 ? (g && (U(e, d, f, p, m, null, i, a, o), p = m = h = null), _ = !0, g = !0, r = !0) : g ? (g = !1, r = !0) : P(e, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"), e.position += 1, v = y;
			else {
				if (i = e.line, a = e.lineStart, o = e.position, !ge(e, n, c, !1, !0)) break;
				if (e.line === b) {
					for (v = e.input.charCodeAt(e.position); x(v);) v = e.input.charCodeAt(++e.position);
					if (v === 58) v = e.input.charCodeAt(++e.position), S(v) || P(e, "a whitespace character is expected after the key-value separator within a block mapping"), g && (U(e, d, f, p, m, null, i, a, o), p = m = h = null), _ = !0, g = !1, r = !1, p = e.tag, m = e.result;
					else if (_) P(e, "can not read an implicit mapping pair; a colon is missed");
					else return e.tag = s, e.anchor = l, !0;
				} else if (_) P(e, "can not read a block mapping entry; a multiline key may not be an implicit key");
				else return e.tag = s, e.anchor = l, !0;
			}
			if ((e.line === b || e.lineIndent > t) && (g && (i = e.line, a = e.lineStart, o = e.position), ge(e, t, u, !0, r) && (g ? m = e.result : h = e.result), g || (U(e, d, f, p, m, h, i, a, o), p = m = h = null), W(e, !0, -1), v = e.input.charCodeAt(e.position)), (e.line === b || e.lineIndent > t) && v !== 0) P(e, "bad indentation of a mapping entry");
			else if (e.lineIndent < t) break;
		}
		return g && U(e, d, f, p, m, null, i, a, o), _ && (e.tag = s, e.anchor = l, e.kind = "mapping", e.result = d), _;
	}
	function fe(e) {
		let t = !1, n = !1, r, i, a = e.input.charCodeAt(e.position);
		if (a !== 33) return !1;
		e.tag !== null && P(e, "duplication of a tag property"), a = e.input.charCodeAt(++e.position), a === 60 ? (t = !0, a = e.input.charCodeAt(++e.position)) : a === 33 ? (n = !0, r = "!!", a = e.input.charCodeAt(++e.position)) : r = "!";
		let s = e.position;
		if (t) {
			do
				a = e.input.charCodeAt(++e.position);
			while (a !== 0 && a !== 62);
			e.position < e.length ? (i = e.input.slice(s, e.position), a = e.input.charCodeAt(++e.position)) : P(e, "unexpected end of the stream within a verbatim tag");
		} else {
			for (; a !== 0 && !S(a);) a === 33 && (n ? P(e, "tag suffix cannot contain exclamation marks") : (r = e.input.slice(s - 1, e.position + 1), _.test(r) || P(e, "named tag handle cannot contain such characters"), n = !0, s = e.position + 1)), a = e.input.charCodeAt(++e.position);
			i = e.input.slice(s, e.position), g.test(i) && P(e, "tag suffix cannot contain flow indicator characters");
		}
		i && !v.test(i) && P(e, "tag name cannot contain such characters: " + i);
		try {
			i = decodeURIComponent(i);
		} catch {
			P(e, "tag name is malformed: " + i);
		}
		return t ? e.tag = i : o.call(e.tagMap, r) ? e.tag = e.tagMap[r] + i : r === "!" ? e.tag = "!" + i : r === "!!" ? e.tag = "tag:yaml.org,2002:" + i : P(e, "undeclared tag handle \"" + r + "\""), !0;
	}
	function pe(e) {
		let t = e.input.charCodeAt(e.position);
		if (t !== 38) return !1;
		e.anchor !== null && P(e, "duplication of an anchor property"), t = e.input.charCodeAt(++e.position);
		let n = e.position;
		for (; t !== 0 && !S(t) && !C(t);) t = e.input.charCodeAt(++e.position);
		return e.position === n && P(e, "name of an anchor node must contain at least one character"), e.anchor = e.input.slice(n, e.position), !0;
	}
	function me(e) {
		let t = e.input.charCodeAt(e.position);
		if (t !== 42) return !1;
		t = e.input.charCodeAt(++e.position);
		let n = e.position;
		for (; t !== 0 && !S(t) && !C(t);) t = e.input.charCodeAt(++e.position);
		e.position === n && P(e, "name of an alias node must contain at least one character");
		let r = e.input.slice(n, e.position);
		return o.call(e.anchorMap, r) || P(e, "unidentified alias \"" + r + "\""), e.result = e.anchorMap[r], W(e, !0, -1), !0;
	}
	function he(e, t, n, r) {
		let i = z(e);
		return ee(e), te(e, t), e.tag = null, e.anchor = null, e.kind = null, e.result = null, de(e, n, r) && e.kind === "mapping" ? (L(e), !0) : (R(e), te(e, i), !1);
	}
	function ge(e, t, n, r, i) {
		let a, d, f = 1, p = !1, m = !1, h = null, g, _, v;
		e.depth >= e.maxDepth && P(e, "nesting exceeded maxDepth (" + e.maxDepth + ")"), e.depth += 1, e.listener !== null && e.listener("open", e), e.tag = null, e.anchor = null, e.kind = null, e.result = null;
		let y = a = d = u === n || l === n;
		if (r && W(e, !0, -1) && (p = !0, e.lineIndent > t ? f = 1 : e.lineIndent === t ? f = 0 : e.lineIndent < t && (f = -1)), f === 1) for (;;) {
			let n = e.input.charCodeAt(e.position), r = z(e);
			if (p && (n === 33 && e.tag !== null || n === 38 && e.anchor !== null) || !fe(e) && !pe(e)) break;
			h === null && (h = r), W(e, !0, -1) ? (p = !0, d = y, e.lineIndent > t ? f = 1 : e.lineIndent === t ? f = 0 : e.lineIndent < t && (f = -1)) : d = !1;
		}
		if (d &&= p || i, f === 1 || u === n) {
			if (_ = s === n || c === n ? t : t + 1, v = e.position - e.lineStart, f === 1) {
				if (d && (ue(e, v) || de(e, v, _)) || G(e, _)) m = !0;
				else {
					let t = e.input.charCodeAt(e.position);
					h !== null && y && !d && t !== 124 && t !== 62 && he(e, h, h.position - h.lineStart, _) || a && le(e, _) || se(e, _) || ce(e, _) ? m = !0 : me(e) ? (m = !0, (e.tag !== null || e.anchor !== null) && P(e, "alias node should not have any properties")) : oe(e, _, s === n) && (m = !0, e.tag === null && (e.tag = "?")), e.anchor !== null && I(e, e.anchor, e.result);
				}
			} else f === 0 && (m = d && ue(e, v));
		}
		if (e.tag === null) e.anchor !== null && I(e, e.anchor, e.result);
		else if (e.tag === "?") {
			e.result !== null && e.kind !== "scalar" && P(e, "unacceptable node kind for !<?> tag; it should be \"scalar\", not \"" + e.kind + "\"");
			for (let t = 0, n = e.implicitTypes.length; t < n; t += 1) if (g = e.implicitTypes[t], g.resolve(e.result)) {
				e.result = g.construct(e.result), e.tag = g.tag, e.anchor !== null && I(e, e.anchor, e.result);
				break;
			}
		} else if (e.tag !== "!") {
			if (o.call(e.typeMap[e.kind || "fallback"], e.tag)) g = e.typeMap[e.kind || "fallback"][e.tag];
			else {
				g = null;
				let t = e.typeMap.multi[e.kind || "fallback"];
				for (let n = 0, r = t.length; n < r; n += 1) if (e.tag.slice(0, t[n].tag.length) === t[n].tag) {
					g = t[n];
					break;
				}
			}
			g || P(e, "unknown tag !<" + e.tag + ">"), e.result !== null && g.kind !== e.kind && P(e, "unacceptable node kind for !<" + e.tag + "> tag; it should be \"" + g.kind + "\", not \"" + e.kind + "\""), g.resolve(e.result, e.tag) ? (e.result = g.construct(e.result, e.tag), e.anchor !== null && I(e, e.anchor, e.result)) : P(e, "cannot resolve a node with !<" + e.tag + "> explicit tag");
		}
		return e.listener !== null && e.listener("close", e), --e.depth, e.tag !== null || e.anchor !== null || m;
	}
	function _e(e) {
		let t = e.position, n = !1, r;
		for (e.version = null, e.checkLineBreaks = e.legacy, e.tagMap = Object.create(null), e.anchorMap = Object.create(null); (r = e.input.charCodeAt(e.position)) !== 0 && (W(e, !0, -1), r = e.input.charCodeAt(e.position), !(e.lineIndent > 0 || r !== 37));) {
			n = !0, r = e.input.charCodeAt(++e.position);
			let t = e.position;
			for (; r !== 0 && !S(r);) r = e.input.charCodeAt(++e.position);
			let i = e.input.slice(t, e.position), a = [];
			for (i.length < 1 && P(e, "directive name must not be less than one character in length"); r !== 0;) {
				for (; x(r);) r = e.input.charCodeAt(++e.position);
				if (r === 35) {
					do
						r = e.input.charCodeAt(++e.position);
					while (r !== 0 && !b(r));
					break;
				}
				if (b(r)) break;
				for (t = e.position; r !== 0 && !S(r);) r = e.input.charCodeAt(++e.position);
				a.push(e.input.slice(t, e.position));
			}
			r !== 0 && re(e), o.call(B, i) ? B[i](e, i, a) : F(e, "unknown document directive \"" + i + "\"");
		}
		if (W(e, !0, -1), e.lineIndent === 0 && e.input.charCodeAt(e.position) === 45 && e.input.charCodeAt(e.position + 1) === 45 && e.input.charCodeAt(e.position + 2) === 45 ? (e.position += 3, W(e, !0, -1)) : n && P(e, "directives end mark is expected"), ge(e, e.lineIndent - 1, u, !1, !0), W(e, !0, -1), e.checkLineBreaks && h.test(e.input.slice(t, e.position)) && F(e, "non-ASCII line breaks are interpreted as content"), e.documents.push(e.result), e.position === e.lineStart && ie(e)) {
			e.input.charCodeAt(e.position) === 46 && (e.position += 3, W(e, !0, -1));
			return;
		}
		e.position < e.length - 1 && P(e, "end of the stream or a document separator is expected");
	}
	function ve(e, t) {
		e = String(e), t ||= {}, e.length !== 0 && (e.charCodeAt(e.length - 1) !== 10 && e.charCodeAt(e.length - 1) !== 13 && (e += "\n"), e.charCodeAt(0) === 65279 && (e = e.slice(1)));
		let n = new M(e, t), r = e.indexOf("\0");
		for (r !== -1 && (n.position = r, P(n, "null byte is not allowed in input")), n.input += "\0"; n.input.charCodeAt(n.position) === 32;) n.lineIndent += 1, n.position += 1;
		for (; n.position < n.length - 1;) _e(n);
		return n.documents;
	}
	function ye(e, t, n) {
		typeof t == "object" && t && n === void 0 && (n = t, t = null);
		let r = ve(e, n);
		if (typeof t != "function") return r;
		for (let e = 0, n = r.length; e < n; e += 1) t(r[e]);
	}
	function be(e, t) {
		let n = ve(e, t);
		if (n.length !== 0) {
			if (n.length === 1) return n[0];
			throw new r("expected a single document in the stream, but found more");
		}
	}
	t.exports.loadAll = ye, t.exports.load = be;
})), yt = /* @__PURE__ */ k(((e, t) => {
	var n = Ze(), r = Qe(), i = _t(), a = Object.prototype.toString, o = Object.prototype.hasOwnProperty, s = 65279, c = 9, l = 10, u = 13, d = 32, f = 33, p = 34, m = 35, h = 37, g = 38, _ = 39, v = 42, y = 44, b = 45, x = 58, S = 61, C = 62, w = 63, T = 64, E = 91, D = 93, O = 96, k = 123, A = 124, j = 125, M = {};
	M[0] = "\\0", M[7] = "\\a", M[8] = "\\b", M[9] = "\\t", M[10] = "\\n", M[11] = "\\v", M[12] = "\\f", M[13] = "\\r", M[27] = "\\e", M[34] = "\\\"", M[92] = "\\\\", M[133] = "\\N", M[160] = "\\_", M[8232] = "\\L", M[8233] = "\\P";
	var N = [
		"y",
		"Y",
		"yes",
		"Yes",
		"YES",
		"on",
		"On",
		"ON",
		"n",
		"N",
		"no",
		"No",
		"NO",
		"off",
		"Off",
		"OFF"
	], P = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
	function F(e, t) {
		if (t === null) return {};
		let n = {}, r = Object.keys(t);
		for (let i = 0, a = r.length; i < a; i += 1) {
			let a = r[i], s = String(t[a]);
			a.slice(0, 2) === "!!" && (a = "tag:yaml.org,2002:" + a.slice(2));
			let c = e.compiledTypeMap.fallback[a];
			c && o.call(c.styleAliases, s) && (s = c.styleAliases[s]), n[a] = s;
		}
		return n;
	}
	function I(e) {
		let t, i, a = e.toString(16).toUpperCase();
		if (e <= 255) t = "x", i = 2;
		else if (e <= 65535) t = "u", i = 4;
		else if (e <= 4294967295) t = "U", i = 8;
		else throw new r("code point within a string may not be greater than 0xFFFFFFFF");
		return "\\" + t + n.repeat("0", i - a.length) + a;
	}
	var ee = 1, L = 2;
	function R(e) {
		this.schema = e.schema || i, this.indent = Math.max(1, e.indent || 2), this.noArrayIndent = e.noArrayIndent || !1, this.skipInvalid = e.skipInvalid || !1, this.flowLevel = n.isNothing(e.flowLevel) ? -1 : e.flowLevel, this.styleMap = F(this.schema, e.styles || null), this.sortKeys = e.sortKeys || !1, this.lineWidth = e.lineWidth || 80, this.noRefs = e.noRefs || !1, this.noCompatMode = e.noCompatMode || !1, this.condenseFlow = e.condenseFlow || !1, this.quotingType = e.quotingType === "\"" ? L : ee, this.forceQuotes = e.forceQuotes || !1, this.replacer = typeof e.replacer == "function" ? e.replacer : null, this.implicitTypes = this.schema.compiledImplicit, this.explicitTypes = this.schema.compiledExplicit, this.tag = null, this.result = "", this.duplicates = [], this.usedDuplicates = null;
	}
	function z(e, t) {
		let r = n.repeat(" ", t), i = 0, a = "", o = e.length;
		for (; i < o;) {
			let t, n = e.indexOf("\n", i);
			n === -1 ? (t = e.slice(i), i = o) : (t = e.slice(i, n + 1), i = n + 1), t.length && t !== "\n" && (a += r), a += t;
		}
		return a;
	}
	function te(e, t) {
		return "\n" + n.repeat(" ", e.indent * t);
	}
	function B(e, t) {
		for (let n = 0, r = e.implicitTypes.length; n < r; n += 1) if (e.implicitTypes[n].resolve(t)) return !0;
		return !1;
	}
	function V(e) {
		return e === d || e === c;
	}
	function H(e) {
		return e >= 32 && e <= 126 || e >= 161 && e <= 55295 && e !== 8232 && e !== 8233 || e >= 57344 && e <= 65533 && e !== s || e >= 65536 && e <= 1114111;
	}
	function ne(e) {
		return H(e) && e !== s && e !== u && e !== l;
	}
	function U(e, t, n) {
		let r = ne(e), i = r && !V(e);
		return (n ? r : r && e !== y && e !== E && e !== D && e !== k && e !== j) && e !== m && !(t === x && !i) || ne(t) && !V(t) && e === m || t === x && i;
	}
	function re(e) {
		return H(e) && e !== s && !V(e) && e !== b && e !== w && e !== x && e !== y && e !== E && e !== D && e !== k && e !== j && e !== m && e !== g && e !== v && e !== f && e !== A && e !== S && e !== C && e !== _ && e !== p && e !== h && e !== T && e !== O;
	}
	function W(e) {
		return !V(e) && e !== x;
	}
	function ie(e, t) {
		let n = e.charCodeAt(t), r;
		return n >= 55296 && n <= 56319 && t + 1 < e.length && (r = e.charCodeAt(t + 1), r >= 56320 && r <= 57343) ? (n - 55296) * 1024 + r - 56320 + 65536 : n;
	}
	function ae(e) {
		return /^\n* /.test(e);
	}
	var oe = 1, se = 2, ce = 3, G = 4, le = 5;
	function ue(e, t, n, r, i, a, o, s) {
		let c, u = 0, d = null, f = !1, p = !1, m = r !== -1, h = -1, g = re(ie(e, 0)) && W(ie(e, e.length - 1));
		if (t || o) for (c = 0; c < e.length; u >= 65536 ? c += 2 : c++) {
			if (u = ie(e, c), !H(u)) return le;
			g &&= U(u, d, s), d = u;
		}
		else {
			for (c = 0; c < e.length; u >= 65536 ? c += 2 : c++) {
				if (u = ie(e, c), u === l) f = !0, m && (p ||= c - h - 1 > r && e[h + 1] !== " ", h = c);
				else if (!H(u)) return le;
				g &&= U(u, d, s), d = u;
			}
			p ||= m && c - h - 1 > r && e[h + 1] !== " ";
		}
		return !f && !p ? g && !o && !i(e) ? oe : a === L ? le : se : n > 9 && ae(e) ? le : o ? a === L ? le : se : p ? G : ce;
	}
	function de(e, t, n, i, a) {
		e.dump = function() {
			if (t.length === 0) return e.quotingType === L ? "\"\"" : "''";
			if (!e.noCompatMode && (N.indexOf(t) !== -1 || P.test(t))) return e.quotingType === L ? "\"" + t + "\"" : "'" + t + "'";
			let o = e.indent * Math.max(1, n), s = e.lineWidth === -1 ? -1 : Math.max(Math.min(e.lineWidth, 40), e.lineWidth - o), c = i || e.flowLevel > -1 && n >= e.flowLevel;
			function l(t) {
				return B(e, t);
			}
			switch (ue(t, c, e.indent, s, l, e.quotingType, e.forceQuotes && !i, a)) {
				case oe: return t;
				case se: return "'" + t.replace(/'/g, "''") + "'";
				case ce: return "|" + fe(t, e.indent) + pe(z(t, o));
				case G: return ">" + fe(t, e.indent) + pe(z(me(t, s), o));
				case le: return "\"" + ge(t, s) + "\"";
				default: throw new r("impossible error: invalid scalar style");
			}
		}();
	}
	function fe(e, t) {
		let n = ae(e) ? String(t) : "", r = e[e.length - 1] === "\n";
		return n + (r && (e[e.length - 2] === "\n" || e === "\n") ? "+" : r ? "" : "-") + "\n";
	}
	function pe(e) {
		return e[e.length - 1] === "\n" ? e.slice(0, -1) : e;
	}
	function me(e, t) {
		let n = /(\n+)([^\n]*)/g, r = function() {
			let r = e.indexOf("\n");
			return r = r === -1 ? e.length : r, n.lastIndex = r, he(e.slice(0, r), t);
		}(), i = e[0] === "\n" || e[0] === " ", a, o;
		for (; o = n.exec(e);) {
			let e = o[1], n = o[2];
			a = n[0] === " ", r += e + (!i && !a && n !== "" ? "\n" : "") + he(n, t), i = a;
		}
		return r;
	}
	function he(e, t) {
		if (e === "" || e[0] === " ") return e;
		let n = / [^ ]/g, r, i = 0, a, o = 0, s = 0, c = "";
		for (; r = n.exec(e);) s = r.index, s - i > t && (a = o > i ? o : s, c += "\n" + e.slice(i, a), i = a + 1), o = s;
		return c += "\n", e.length - i > t && o > i ? c += e.slice(i, o) + "\n" + e.slice(o + 1) : c += e.slice(i), c.slice(1);
	}
	function ge(e) {
		let t = "", n = 0;
		for (let r = 0; r < e.length; n >= 65536 ? r += 2 : r++) {
			n = ie(e, r);
			let i = M[n];
			!i && H(n) ? (t += e[r], n >= 65536 && (t += e[r + 1])) : t += i || I(n);
		}
		return t;
	}
	function _e(e, t, n) {
		let r = "", i = e.tag;
		for (let i = 0, a = n.length; i < a; i += 1) {
			let a = n[i];
			e.replacer && (a = e.replacer.call(n, String(i), a)), (Se(e, t, a, !1, !1) || a === void 0 && Se(e, t, null, !1, !1)) && (r !== "" && (r += "," + (e.condenseFlow ? "" : " ")), r += e.dump);
		}
		e.tag = i, e.dump = "[" + r + "]";
	}
	function ve(e, t, n, r) {
		let i = "", a = e.tag;
		for (let a = 0, o = n.length; a < o; a += 1) {
			let o = n[a];
			e.replacer && (o = e.replacer.call(n, String(a), o)), (Se(e, t + 1, o, !0, !0, !1, !0) || o === void 0 && Se(e, t + 1, null, !0, !0, !1, !0)) && ((!r || i !== "") && (i += te(e, t)), e.dump && l === e.dump.charCodeAt(0) ? i += "-" : i += "- ", i += e.dump);
		}
		e.tag = a, e.dump = i || "[]";
	}
	function ye(e, t, n) {
		let r = "", i = e.tag, a = Object.keys(n);
		for (let i = 0, o = a.length; i < o; i += 1) {
			let o = "";
			r !== "" && (o += ", "), e.condenseFlow && (o += "\"");
			let s = a[i], c = n[s];
			e.replacer && (c = e.replacer.call(n, s, c)), Se(e, t, s, !1, !1) && (e.dump.length > 1024 && (o += "? "), o += e.dump + (e.condenseFlow ? "\"" : "") + ":" + (e.condenseFlow ? "" : " "), Se(e, t, c, !1, !1) && (o += e.dump, r += o));
		}
		e.tag = i, e.dump = "{" + r + "}";
	}
	function be(e, t, n, i) {
		let a = "", o = e.tag, s = Object.keys(n);
		if (e.sortKeys === !0) s.sort();
		else if (typeof e.sortKeys == "function") s.sort(e.sortKeys);
		else if (e.sortKeys) throw new r("sortKeys must be a boolean or a function");
		for (let r = 0, o = s.length; r < o; r += 1) {
			let o = "";
			(!i || a !== "") && (o += te(e, t));
			let c = s[r], u = n[c];
			if (e.replacer && (u = e.replacer.call(n, c, u)), !Se(e, t + 1, c, !0, !0, !0)) continue;
			let d = e.tag !== null && e.tag !== "?" || e.dump && e.dump.length > 1024;
			d && (e.dump && l === e.dump.charCodeAt(0) ? o += "?" : o += "? "), o += e.dump, d && (o += te(e, t)), Se(e, t + 1, u, !0, d) && (e.dump && l === e.dump.charCodeAt(0) ? o += ":" : o += ": ", o += e.dump, a += o);
		}
		e.tag = o, e.dump = a || "{}";
	}
	function xe(e, t, n) {
		let i = n ? e.explicitTypes : e.implicitTypes;
		for (let s = 0, c = i.length; s < c; s += 1) {
			let c = i[s];
			if ((c.instanceOf || c.predicate) && (!c.instanceOf || typeof t == "object" && t instanceof c.instanceOf) && (!c.predicate || c.predicate(t))) {
				if (e.tag = n ? c.multi && c.representName ? c.representName(t) : c.tag : "?", c.represent) {
					let n = e.styleMap[c.tag] || c.defaultStyle, i;
					if (a.call(c.represent) === "[object Function]") i = c.represent(t, n);
					else if (o.call(c.represent, n)) i = c.represent[n](t, n);
					else throw new r("!<" + c.tag + "> tag resolver accepts not \"" + n + "\" style");
					e.dump = i;
				}
				return !0;
			}
		}
		return !1;
	}
	function Se(e, t, n, i, o, s, c) {
		e.tag = null, e.dump = n, xe(e, n, !1) || xe(e, n, !0);
		let l = a.call(e.dump), u = i;
		i &&= e.flowLevel < 0 || e.flowLevel > t;
		let d = l === "[object Object]" || l === "[object Array]", f, p;
		if (d && (f = e.duplicates.indexOf(n), p = f !== -1), (e.tag !== null && e.tag !== "?" || p || e.indent !== 2 && t > 0) && (o = !1), p && e.usedDuplicates[f]) e.dump = "*ref_" + f;
		else {
			if (d && p && !e.usedDuplicates[f] && (e.usedDuplicates[f] = !0), l === "[object Object]") i && Object.keys(e.dump).length !== 0 ? (be(e, t, e.dump, o), p && (e.dump = "&ref_" + f + e.dump)) : (ye(e, t, e.dump), p && (e.dump = "&ref_" + f + " " + e.dump));
			else if (l === "[object Array]") i && e.dump.length !== 0 ? (e.noArrayIndent && !c && t > 0 ? ve(e, t - 1, e.dump, o) : ve(e, t, e.dump, o), p && (e.dump = "&ref_" + f + e.dump)) : (_e(e, t, e.dump), p && (e.dump = "&ref_" + f + " " + e.dump));
			else if (l === "[object String]") e.tag !== "?" && de(e, e.dump, t, s, u);
			else if (l === "[object Undefined]") return !1;
			else {
				if (e.skipInvalid) return !1;
				throw new r("unacceptable kind of an object to dump " + l);
			}
			if (e.tag !== null && e.tag !== "?") {
				let t = encodeURI(e.tag[0] === "!" ? e.tag.slice(1) : e.tag).replace(/!/g, "%21");
				t = e.tag[0] === "!" ? "!" + t : t.slice(0, 18) === "tag:yaml.org,2002:" ? "!!" + t.slice(18) : "!<" + t + ">", e.dump = t + " " + e.dump;
			}
		}
		return !0;
	}
	function Ce(e, t) {
		let n = [], r = [];
		we(e, n, r);
		let i = r.length;
		for (let e = 0; e < i; e += 1) t.duplicates.push(n[r[e]]);
		t.usedDuplicates = Array(i);
	}
	function we(e, t, n) {
		if (typeof e == "object" && e) {
			let r = t.indexOf(e);
			if (r !== -1) n.indexOf(r) === -1 && n.push(r);
			else if (t.push(e), Array.isArray(e)) for (let r = 0, i = e.length; r < i; r += 1) we(e[r], t, n);
			else {
				let r = Object.keys(e);
				for (let i = 0, a = r.length; i < a; i += 1) we(e[r[i]], t, n);
			}
		}
	}
	function Te(e, t) {
		t ||= {};
		let n = new R(t);
		n.noRefs || Ce(e, n);
		let r = e;
		return n.replacer && (r = n.replacer.call({ "": r }, "", r)), Se(n, 0, r, !0, !0) ? n.dump + "\n" : "";
	}
	t.exports.dump = Te;
})), bt = /* @__PURE__ */ k(((e, t) => {
	var n = vt(), r = yt();
	function i(e, t) {
		return function() {
			throw Error("Function yaml." + e + " is removed in js-yaml 4. Use yaml." + t + " instead, which is now safe by default.");
		};
	}
	t.exports.Type = q(), t.exports.Schema = et(), t.exports.FAILSAFE_SCHEMA = it(), t.exports.JSON_SCHEMA = lt(), t.exports.CORE_SCHEMA = ut(), t.exports.DEFAULT_SCHEMA = _t(), t.exports.load = n.load, t.exports.loadAll = n.loadAll, t.exports.dump = r.dump, t.exports.YAMLException = Qe(), t.exports.types = {
		binary: pt(),
		float: ct(),
		map: rt(),
		null: at(),
		pairs: ht(),
		set: gt(),
		timestamp: dt(),
		bool: ot(),
		int: st(),
		merge: ft(),
		omap: mt(),
		seq: nt(),
		str: tt()
	}, t.exports.safeLoad = i("safeLoad", "load"), t.exports.safeLoadAll = i("safeLoadAll", "loadAll"), t.exports.safeDump = i("safeDump", "dump");
})), xt = /* @__PURE__ */ k(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.Lazy = void 0, e.Lazy = class {
		constructor(e) {
			this._value = null, this.creator = e;
		}
		get hasValue() {
			return this.creator == null;
		}
		get value() {
			if (this.creator == null) return this._value;
			let e = this.creator();
			return this.value = e, e;
		}
		set value(e) {
			this._value = e, this.creator = null;
		}
	};
})), St = /* @__PURE__ */ k(((e, t) => {
	t.exports = {
		MAX_LENGTH: 256,
		MAX_SAFE_COMPONENT_LENGTH: 16,
		MAX_SAFE_BUILD_LENGTH: 250,
		MAX_SAFE_INTEGER: 2 ** 53 - 1 || 
		/* istanbul ignore next */ 9007199254740991,
		RELEASE_TYPES: [
			"major",
			"premajor",
			"minor",
			"preminor",
			"patch",
			"prepatch",
			"prerelease"
		],
		SEMVER_SPEC_VERSION: "2.0.0",
		FLAG_INCLUDE_PRERELEASE: 1,
		FLAG_LOOSE: 2
	};
})), Ct = /* @__PURE__ */ k(((e, t) => {
	t.exports = typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...e) => console.error("SEMVER", ...e) : () => {};
})), wt = /* @__PURE__ */ k(((e, t) => {
	var { MAX_SAFE_COMPONENT_LENGTH: n, MAX_SAFE_BUILD_LENGTH: r, MAX_LENGTH: i } = St(), a = Ct();
	e = t.exports = {};
	var o = e.re = [], s = e.safeRe = [], c = e.src = [], l = e.safeSrc = [], u = e.t = {}, d = 0, f = "[a-zA-Z0-9-]", p = [
		["\\s", 1],
		["\\d", i],
		[f, r]
	], m = (e) => {
		for (let [t, n] of p) e = e.split(`${t}*`).join(`${t}{0,${n}}`).split(`${t}+`).join(`${t}{1,${n}}`);
		return e;
	}, h = (e, t, n) => {
		let r = m(t), i = d++;
		a(e, i, t), u[e] = i, c[i] = t, l[i] = r, o[i] = new RegExp(t, n ? "g" : void 0), s[i] = new RegExp(r, n ? "g" : void 0);
	};
	h("NUMERICIDENTIFIER", "0|[1-9]\\d*"), h("NUMERICIDENTIFIERLOOSE", "\\d+"), h("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${f}*`), h("MAINVERSION", `(${c[u.NUMERICIDENTIFIER]})\\.(${c[u.NUMERICIDENTIFIER]})\\.(${c[u.NUMERICIDENTIFIER]})`), h("MAINVERSIONLOOSE", `(${c[u.NUMERICIDENTIFIERLOOSE]})\\.(${c[u.NUMERICIDENTIFIERLOOSE]})\\.(${c[u.NUMERICIDENTIFIERLOOSE]})`), h("PRERELEASEIDENTIFIER", `(?:${c[u.NONNUMERICIDENTIFIER]}|${c[u.NUMERICIDENTIFIER]})`), h("PRERELEASEIDENTIFIERLOOSE", `(?:${c[u.NONNUMERICIDENTIFIER]}|${c[u.NUMERICIDENTIFIERLOOSE]})`), h("PRERELEASE", `(?:-(${c[u.PRERELEASEIDENTIFIER]}(?:\\.${c[u.PRERELEASEIDENTIFIER]})*))`), h("PRERELEASELOOSE", `(?:-?(${c[u.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${c[u.PRERELEASEIDENTIFIERLOOSE]})*))`), h("BUILDIDENTIFIER", `${f}+`), h("BUILD", `(?:\\+(${c[u.BUILDIDENTIFIER]}(?:\\.${c[u.BUILDIDENTIFIER]})*))`), h("FULLPLAIN", `v?${c[u.MAINVERSION]}${c[u.PRERELEASE]}?${c[u.BUILD]}?`), h("FULL", `^${c[u.FULLPLAIN]}$`), h("LOOSEPLAIN", `[v=\\s]*${c[u.MAINVERSIONLOOSE]}${c[u.PRERELEASELOOSE]}?${c[u.BUILD]}?`), h("LOOSE", `^${c[u.LOOSEPLAIN]}$`), h("GTLT", "((?:<|>)?=?)"), h("XRANGEIDENTIFIERLOOSE", `${c[u.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), h("XRANGEIDENTIFIER", `${c[u.NUMERICIDENTIFIER]}|x|X|\\*`), h("XRANGEPLAIN", `[v=\\s]*(${c[u.XRANGEIDENTIFIER]})(?:\\.(${c[u.XRANGEIDENTIFIER]})(?:\\.(${c[u.XRANGEIDENTIFIER]})(?:${c[u.PRERELEASE]})?${c[u.BUILD]}?)?)?`), h("XRANGEPLAINLOOSE", `[v=\\s]*(${c[u.XRANGEIDENTIFIERLOOSE]})(?:\\.(${c[u.XRANGEIDENTIFIERLOOSE]})(?:\\.(${c[u.XRANGEIDENTIFIERLOOSE]})(?:${c[u.PRERELEASELOOSE]})?${c[u.BUILD]}?)?)?`), h("XRANGE", `^${c[u.GTLT]}\\s*${c[u.XRANGEPLAIN]}$`), h("XRANGELOOSE", `^${c[u.GTLT]}\\s*${c[u.XRANGEPLAINLOOSE]}$`), h("COERCEPLAIN", `(^|[^\\d])(\\d{1,${n}})(?:\\.(\\d{1,${n}}))?(?:\\.(\\d{1,${n}}))?`), h("COERCE", `${c[u.COERCEPLAIN]}(?:$|[^\\d])`), h("COERCEFULL", c[u.COERCEPLAIN] + `(?:${c[u.PRERELEASE]})?(?:${c[u.BUILD]})?(?:$|[^\\d])`), h("COERCERTL", c[u.COERCE], !0), h("COERCERTLFULL", c[u.COERCEFULL], !0), h("LONETILDE", "(?:~>?)"), h("TILDETRIM", `(\\s*)${c[u.LONETILDE]}\\s+`, !0), e.tildeTrimReplace = "$1~", h("TILDE", `^${c[u.LONETILDE]}${c[u.XRANGEPLAIN]}$`), h("TILDELOOSE", `^${c[u.LONETILDE]}${c[u.XRANGEPLAINLOOSE]}$`), h("LONECARET", "(?:\\^)"), h("CARETTRIM", `(\\s*)${c[u.LONECARET]}\\s+`, !0), e.caretTrimReplace = "$1^", h("CARET", `^${c[u.LONECARET]}${c[u.XRANGEPLAIN]}$`), h("CARETLOOSE", `^${c[u.LONECARET]}${c[u.XRANGEPLAINLOOSE]}$`), h("COMPARATORLOOSE", `^${c[u.GTLT]}\\s*(${c[u.LOOSEPLAIN]})$|^$`), h("COMPARATOR", `^${c[u.GTLT]}\\s*(${c[u.FULLPLAIN]})$|^$`), h("COMPARATORTRIM", `(\\s*)${c[u.GTLT]}\\s*(${c[u.LOOSEPLAIN]}|${c[u.XRANGEPLAIN]})`, !0), e.comparatorTrimReplace = "$1$2$3", h("HYPHENRANGE", `^\\s*(${c[u.XRANGEPLAIN]})\\s+-\\s+(${c[u.XRANGEPLAIN]})\\s*$`), h("HYPHENRANGELOOSE", `^\\s*(${c[u.XRANGEPLAINLOOSE]})\\s+-\\s+(${c[u.XRANGEPLAINLOOSE]})\\s*$`), h("STAR", "(<|>)?=?\\s*\\*"), h("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), h("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
})), Tt = /* @__PURE__ */ k(((e, t) => {
	var n = Object.freeze({ loose: !0 }), r = Object.freeze({});
	t.exports = (e) => e ? typeof e == "object" ? e : n : r;
})), Et = /* @__PURE__ */ k(((e, t) => {
	var n = /^[0-9]+$/, r = (e, t) => {
		if (typeof e == "number" && typeof t == "number") return e === t ? 0 : e < t ? -1 : 1;
		let r = n.test(e), i = n.test(t);
		return r && i && (e = +e, t = +t), e === t ? 0 : r && !i ? -1 : i && !r ? 1 : e < t ? -1 : 1;
	};
	t.exports = {
		compareIdentifiers: r,
		rcompareIdentifiers: (e, t) => r(t, e)
	};
})), Dt = /* @__PURE__ */ k(((e, t) => {
	var n = Ct(), { MAX_LENGTH: r, MAX_SAFE_INTEGER: i } = St(), { safeRe: a, t: o } = wt(), s = Tt(), { compareIdentifiers: c } = Et();
	t.exports = class e {
		constructor(t, c) {
			if (c = s(c), t instanceof e) {
				if (t.loose === !!c.loose && t.includePrerelease === !!c.includePrerelease) return t;
				t = t.version;
			} else if (typeof t != "string") throw TypeError(`Invalid version. Must be a string. Got type "${typeof t}".`);
			if (t.length > r) throw TypeError(`version is longer than ${r} characters`);
			n("SemVer", t, c), this.options = c, this.loose = !!c.loose, this.includePrerelease = !!c.includePrerelease;
			let l = t.trim().match(c.loose ? a[o.LOOSE] : a[o.FULL]);
			if (!l) throw TypeError(`Invalid Version: ${t}`);
			if (this.raw = t, this.major = +l[1], this.minor = +l[2], this.patch = +l[3], this.major > i || this.major < 0) throw TypeError("Invalid major version");
			if (this.minor > i || this.minor < 0) throw TypeError("Invalid minor version");
			if (this.patch > i || this.patch < 0) throw TypeError("Invalid patch version");
			this.prerelease = l[4] ? l[4].split(".").map((e) => {
				if (/^[0-9]+$/.test(e)) {
					let t = +e;
					if (t >= 0 && t < i) return t;
				}
				return e;
			}) : [], this.build = l[5] ? l[5].split(".") : [], this.format();
		}
		format() {
			return this.version = `${this.major}.${this.minor}.${this.patch}`, this.prerelease.length && (this.version += `-${this.prerelease.join(".")}`), this.version;
		}
		toString() {
			return this.version;
		}
		compare(t) {
			if (n("SemVer.compare", this.version, this.options, t), !(t instanceof e)) {
				if (typeof t == "string" && t === this.version) return 0;
				t = new e(t, this.options);
			}
			return t.version === this.version ? 0 : this.compareMain(t) || this.comparePre(t);
		}
		compareMain(t) {
			return t instanceof e || (t = new e(t, this.options)), this.major < t.major ? -1 : this.major > t.major ? 1 : this.minor < t.minor ? -1 : this.minor > t.minor ? 1 : this.patch < t.patch ? -1 : +(this.patch > t.patch);
		}
		comparePre(t) {
			if (t instanceof e || (t = new e(t, this.options)), this.prerelease.length && !t.prerelease.length) return -1;
			if (!this.prerelease.length && t.prerelease.length) return 1;
			if (!this.prerelease.length && !t.prerelease.length) return 0;
			let r = 0;
			do {
				let e = this.prerelease[r], i = t.prerelease[r];
				if (n("prerelease compare", r, e, i), e === void 0 && i === void 0) return 0;
				if (i === void 0) return 1;
				if (e === void 0) return -1;
				if (e !== i) return c(e, i);
			} while (++r);
		}
		compareBuild(t) {
			t instanceof e || (t = new e(t, this.options));
			let r = 0;
			do {
				let e = this.build[r], i = t.build[r];
				if (n("build compare", r, e, i), e === void 0 && i === void 0) return 0;
				if (i === void 0) return 1;
				if (e === void 0) return -1;
				if (e !== i) return c(e, i);
			} while (++r);
		}
		inc(e, t, n) {
			if (e.startsWith("pre")) {
				if (!t && n === !1) throw Error("invalid increment argument: identifier is empty");
				if (t) {
					let e = `-${t}`.match(this.options.loose ? a[o.PRERELEASELOOSE] : a[o.PRERELEASE]);
					if (!e || e[1] !== t) throw Error(`invalid identifier: ${t}`);
				}
			}
			switch (e) {
				case "premajor":
					this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc("pre", t, n);
					break;
				case "preminor":
					this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc("pre", t, n);
					break;
				case "prepatch":
					this.prerelease.length = 0, this.inc("patch", t, n), this.inc("pre", t, n);
					break;
				case "prerelease":
					this.prerelease.length === 0 && this.inc("patch", t, n), this.inc("pre", t, n);
					break;
				case "release":
					if (this.prerelease.length === 0) throw Error(`version ${this.raw} is not a prerelease`);
					this.prerelease.length = 0;
					break;
				case "major":
					(this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) && this.major++, this.minor = 0, this.patch = 0, this.prerelease = [];
					break;
				case "minor":
					(this.patch !== 0 || this.prerelease.length === 0) && this.minor++, this.patch = 0, this.prerelease = [];
					break;
				case "patch":
					this.prerelease.length === 0 && this.patch++, this.prerelease = [];
					break;
				case "pre": {
					let e = +!!Number(n);
					if (this.prerelease.length === 0) this.prerelease = [e];
					else {
						let r = this.prerelease.length;
						for (; --r >= 0;) typeof this.prerelease[r] == "number" && (this.prerelease[r]++, r = -2);
						if (r === -1) {
							if (t === this.prerelease.join(".") && n === !1) throw Error("invalid increment argument: identifier already exists");
							this.prerelease.push(e);
						}
					}
					if (t) {
						let r = [t, e];
						n === !1 && (r = [t]), c(this.prerelease[0], t) === 0 ? isNaN(this.prerelease[1]) && (this.prerelease = r) : this.prerelease = r;
					}
					break;
				}
				default: throw Error(`invalid increment argument: ${e}`);
			}
			return this.raw = this.format(), this.build.length && (this.raw += `+${this.build.join(".")}`), this;
		}
	};
})), Ot = /* @__PURE__ */ k(((e, t) => {
	var n = Dt();
	t.exports = (e, t, r = !1) => {
		if (e instanceof n) return e;
		try {
			return new n(e, t);
		} catch (e) {
			if (!r) return null;
			throw e;
		}
	};
})), kt = /* @__PURE__ */ k(((e, t) => {
	var n = Ot();
	t.exports = (e, t) => {
		let r = n(e, t);
		return r ? r.version : null;
	};
})), At = /* @__PURE__ */ k(((e, t) => {
	var n = Ot();
	t.exports = (e, t) => {
		let r = n(e.trim().replace(/^[=v]+/, ""), t);
		return r ? r.version : null;
	};
})), jt = /* @__PURE__ */ k(((e, t) => {
	var n = Dt();
	t.exports = (e, t, r, i, a) => {
		typeof r == "string" && (a = i, i = r, r = void 0);
		try {
			return new n(e instanceof n ? e.version : e, r).inc(t, i, a).version;
		} catch {
			return null;
		}
	};
})), Mt = /* @__PURE__ */ k(((e, t) => {
	var n = Ot();
	t.exports = (e, t) => {
		let r = n(e, null, !0), i = n(t, null, !0), a = r.compare(i);
		if (a === 0) return null;
		let o = a > 0, s = o ? r : i, c = o ? i : r, l = !!s.prerelease.length;
		if (c.prerelease.length && !l) {
			if (!c.patch && !c.minor) return "major";
			if (c.compareMain(s) === 0) return c.minor && !c.patch ? "minor" : "patch";
		}
		let u = l ? "pre" : "";
		return r.major === i.major ? r.minor === i.minor ? r.patch === i.patch ? "prerelease" : u + "patch" : u + "minor" : u + "major";
	};
})), Nt = /* @__PURE__ */ k(((e, t) => {
	var n = Dt();
	t.exports = (e, t) => new n(e, t).major;
})), Pt = /* @__PURE__ */ k(((e, t) => {
	var n = Dt();
	t.exports = (e, t) => new n(e, t).minor;
})), Ft = /* @__PURE__ */ k(((e, t) => {
	var n = Dt();
	t.exports = (e, t) => new n(e, t).patch;
})), It = /* @__PURE__ */ k(((e, t) => {
	var n = Ot();
	t.exports = (e, t) => {
		let r = n(e, t);
		return r && r.prerelease.length ? r.prerelease : null;
	};
})), Lt = /* @__PURE__ */ k(((e, t) => {
	var n = Dt();
	t.exports = (e, t, r) => new n(e, r).compare(new n(t, r));
})), Rt = /* @__PURE__ */ k(((e, t) => {
	var n = Lt();
	t.exports = (e, t, r) => n(t, e, r);
})), zt = /* @__PURE__ */ k(((e, t) => {
	var n = Lt();
	t.exports = (e, t) => n(e, t, !0);
})), Bt = /* @__PURE__ */ k(((e, t) => {
	var n = Dt();
	t.exports = (e, t, r) => {
		let i = new n(e, r), a = new n(t, r);
		return i.compare(a) || i.compareBuild(a);
	};
})), Vt = /* @__PURE__ */ k(((e, t) => {
	var n = Bt();
	t.exports = (e, t) => e.sort((e, r) => n(e, r, t));
})), Ht = /* @__PURE__ */ k(((e, t) => {
	var n = Bt();
	t.exports = (e, t) => e.sort((e, r) => n(r, e, t));
})), Ut = /* @__PURE__ */ k(((e, t) => {
	var n = Lt();
	t.exports = (e, t, r) => n(e, t, r) > 0;
})), Wt = /* @__PURE__ */ k(((e, t) => {
	var n = Lt();
	t.exports = (e, t, r) => n(e, t, r) < 0;
})), Gt = /* @__PURE__ */ k(((e, t) => {
	var n = Lt();
	t.exports = (e, t, r) => n(e, t, r) === 0;
})), Kt = /* @__PURE__ */ k(((e, t) => {
	var n = Lt();
	t.exports = (e, t, r) => n(e, t, r) !== 0;
})), qt = /* @__PURE__ */ k(((e, t) => {
	var n = Lt();
	t.exports = (e, t, r) => n(e, t, r) >= 0;
})), Jt = /* @__PURE__ */ k(((e, t) => {
	var n = Lt();
	t.exports = (e, t, r) => n(e, t, r) <= 0;
})), Yt = /* @__PURE__ */ k(((e, t) => {
	var n = Gt(), r = Kt(), i = Ut(), a = qt(), o = Wt(), s = Jt();
	t.exports = (e, t, c, l) => {
		switch (t) {
			case "===": return typeof e == "object" && (e = e.version), typeof c == "object" && (c = c.version), e === c;
			case "!==": return typeof e == "object" && (e = e.version), typeof c == "object" && (c = c.version), e !== c;
			case "":
			case "=":
			case "==": return n(e, c, l);
			case "!=": return r(e, c, l);
			case ">": return i(e, c, l);
			case ">=": return a(e, c, l);
			case "<": return o(e, c, l);
			case "<=": return s(e, c, l);
			default: throw TypeError(`Invalid operator: ${t}`);
		}
	};
})), Xt = /* @__PURE__ */ k(((e, t) => {
	var n = Dt(), r = Ot(), { safeRe: i, t: a } = wt();
	t.exports = (e, t) => {
		if (e instanceof n) return e;
		if (typeof e == "number" && (e = String(e)), typeof e != "string") return null;
		t ||= {};
		let o = null;
		if (!t.rtl) o = e.match(t.includePrerelease ? i[a.COERCEFULL] : i[a.COERCE]);
		else {
			let n = t.includePrerelease ? i[a.COERCERTLFULL] : i[a.COERCERTL], r;
			for (; (r = n.exec(e)) && (!o || o.index + o[0].length !== e.length);) (!o || r.index + r[0].length !== o.index + o[0].length) && (o = r), n.lastIndex = r.index + r[1].length + r[2].length;
			n.lastIndex = -1;
		}
		if (o === null) return null;
		let s = o[2];
		return r(`${s}.${o[3] || "0"}.${o[4] || "0"}${t.includePrerelease && o[5] ? `-${o[5]}` : ""}${t.includePrerelease && o[6] ? `+${o[6]}` : ""}`, t);
	};
})), Zt = /* @__PURE__ */ k(((e, t) => {
	t.exports = class {
		constructor() {
			this.max = 1e3, this.map = /* @__PURE__ */ new Map();
		}
		get(e) {
			let t = this.map.get(e);
			if (t !== void 0) return this.map.delete(e), this.map.set(e, t), t;
		}
		delete(e) {
			return this.map.delete(e);
		}
		set(e, t) {
			if (!this.delete(e) && t !== void 0) {
				if (this.map.size >= this.max) {
					let e = this.map.keys().next().value;
					this.delete(e);
				}
				this.map.set(e, t);
			}
			return this;
		}
	};
})), Qt = /* @__PURE__ */ k(((e, t) => {
	var n = /\s+/g;
	t.exports = class e {
		constructor(t, r) {
			if (r = i(r), t instanceof e) return t.loose === !!r.loose && t.includePrerelease === !!r.includePrerelease ? t : new e(t.raw, r);
			if (t instanceof a) return this.raw = t.value, this.set = [[t]], this.formatted = void 0, this;
			if (this.options = r, this.loose = !!r.loose, this.includePrerelease = !!r.includePrerelease, this.raw = t.trim().replace(n, " "), this.set = this.raw.split("||").map((e) => this.parseRange(e.trim())).filter((e) => e.length), !this.set.length) throw TypeError(`Invalid SemVer Range: ${this.raw}`);
			if (this.set.length > 1) {
				let e = this.set[0];
				if (this.set = this.set.filter((e) => !h(e[0])), this.set.length === 0) this.set = [e];
				else if (this.set.length > 1) {
					for (let e of this.set) if (e.length === 1 && g(e[0])) {
						this.set = [e];
						break;
					}
				}
			}
			this.formatted = void 0;
		}
		get range() {
			if (this.formatted === void 0) {
				this.formatted = "";
				for (let e = 0; e < this.set.length; e++) {
					e > 0 && (this.formatted += "||");
					let t = this.set[e];
					for (let e = 0; e < t.length; e++) e > 0 && (this.formatted += " "), this.formatted += t[e].toString().trim();
				}
			}
			return this.formatted;
		}
		format() {
			return this.range;
		}
		toString() {
			return this.range;
		}
		parseRange(e) {
			let t = ((this.options.includePrerelease && p) | (this.options.loose && m)) + ":" + e, n = r.get(t);
			if (n) return n;
			let i = this.options.loose, s = i ? c[l.HYPHENRANGELOOSE] : c[l.HYPHENRANGE];
			e = e.replace(s, O(this.options.includePrerelease)), o("hyphen replace", e), e = e.replace(c[l.COMPARATORTRIM], u), o("comparator trim", e), e = e.replace(c[l.TILDETRIM], d), o("tilde trim", e), e = e.replace(c[l.CARETTRIM], f), o("caret trim", e);
			let g = e.split(" ").map((e) => v(e, this.options)).join(" ").split(/\s+/).map((e) => D(e, this.options));
			i && (g = g.filter((e) => (o("loose invalid filter", e, this.options), !!e.match(c[l.COMPARATORLOOSE])))), o("range list", g);
			let _ = /* @__PURE__ */ new Map(), y = g.map((e) => new a(e, this.options));
			for (let e of y) {
				if (h(e)) return [e];
				_.set(e.value, e);
			}
			_.size > 1 && _.has("") && _.delete("");
			let b = [..._.values()];
			return r.set(t, b), b;
		}
		intersects(t, n) {
			if (!(t instanceof e)) throw TypeError("a Range is required");
			return this.set.some((e) => _(e, n) && t.set.some((t) => _(t, n) && e.every((e) => t.every((t) => e.intersects(t, n)))));
		}
		test(e) {
			if (!e) return !1;
			if (typeof e == "string") try {
				e = new s(e, this.options);
			} catch {
				return !1;
			}
			for (let t = 0; t < this.set.length; t++) if (k(this.set[t], e, this.options)) return !0;
			return !1;
		}
	};
	var r = new (Zt())(), i = Tt(), a = $t(), o = Ct(), s = Dt(), { safeRe: c, t: l, comparatorTrimReplace: u, tildeTrimReplace: d, caretTrimReplace: f } = wt(), { FLAG_INCLUDE_PRERELEASE: p, FLAG_LOOSE: m } = St(), h = (e) => e.value === "<0.0.0-0", g = (e) => e.value === "", _ = (e, t) => {
		let n = !0, r = e.slice(), i = r.pop();
		for (; n && r.length;) n = r.every((e) => i.intersects(e, t)), i = r.pop();
		return n;
	}, v = (e, t) => (e = e.replace(c[l.BUILD], ""), o("comp", e, t), e = S(e, t), o("caret", e), e = b(e, t), o("tildes", e), e = w(e, t), o("xrange", e), e = E(e, t), o("stars", e), e), y = (e) => !e || e.toLowerCase() === "x" || e === "*", b = (e, t) => e.trim().split(/\s+/).map((e) => x(e, t)).join(" "), x = (e, t) => {
		let n = t.loose ? c[l.TILDELOOSE] : c[l.TILDE];
		return e.replace(n, (t, n, r, i, a) => {
			o("tilde", e, t, n, r, i, a);
			let s;
			return y(n) ? s = "" : y(r) ? s = `>=${n}.0.0 <${+n + 1}.0.0-0` : y(i) ? s = `>=${n}.${r}.0 <${n}.${+r + 1}.0-0` : a ? (o("replaceTilde pr", a), s = `>=${n}.${r}.${i}-${a} <${n}.${+r + 1}.0-0`) : s = `>=${n}.${r}.${i} <${n}.${+r + 1}.0-0`, o("tilde return", s), s;
		});
	}, S = (e, t) => e.trim().split(/\s+/).map((e) => C(e, t)).join(" "), C = (e, t) => {
		o("caret", e, t);
		let n = t.loose ? c[l.CARETLOOSE] : c[l.CARET], r = t.includePrerelease ? "-0" : "";
		return e.replace(n, (t, n, i, a, s) => {
			o("caret", e, t, n, i, a, s);
			let c;
			return y(n) ? c = "" : y(i) ? c = `>=${n}.0.0${r} <${+n + 1}.0.0-0` : y(a) ? c = n === "0" ? `>=${n}.${i}.0${r} <${n}.${+i + 1}.0-0` : `>=${n}.${i}.0${r} <${+n + 1}.0.0-0` : s ? (o("replaceCaret pr", s), c = n === "0" ? i === "0" ? `>=${n}.${i}.${a}-${s} <${n}.${i}.${+a + 1}-0` : `>=${n}.${i}.${a}-${s} <${n}.${+i + 1}.0-0` : `>=${n}.${i}.${a}-${s} <${+n + 1}.0.0-0`) : (o("no pr"), c = n === "0" ? i === "0" ? `>=${n}.${i}.${a}${r} <${n}.${i}.${+a + 1}-0` : `>=${n}.${i}.${a}${r} <${n}.${+i + 1}.0-0` : `>=${n}.${i}.${a} <${+n + 1}.0.0-0`), o("caret return", c), c;
		});
	}, w = (e, t) => (o("replaceXRanges", e, t), e.split(/\s+/).map((e) => T(e, t)).join(" ")), T = (e, t) => {
		e = e.trim();
		let n = t.loose ? c[l.XRANGELOOSE] : c[l.XRANGE];
		return e.replace(n, (n, r, i, a, s, c) => {
			o("xRange", e, n, r, i, a, s, c);
			let l = y(i), u = l || y(a), d = u || y(s), f = d;
			return r === "=" && f && (r = ""), c = t.includePrerelease ? "-0" : "", l ? n = r === ">" || r === "<" ? "<0.0.0-0" : "*" : r && f ? (u && (a = 0), s = 0, r === ">" ? (r = ">=", u ? (i = +i + 1, a = 0, s = 0) : (a = +a + 1, s = 0)) : r === "<=" && (r = "<", u ? i = +i + 1 : a = +a + 1), r === "<" && (c = "-0"), n = `${r + i}.${a}.${s}${c}`) : u ? n = `>=${i}.0.0${c} <${+i + 1}.0.0-0` : d && (n = `>=${i}.${a}.0${c} <${i}.${+a + 1}.0-0`), o("xRange return", n), n;
		});
	}, E = (e, t) => (o("replaceStars", e, t), e.trim().replace(c[l.STAR], "")), D = (e, t) => (o("replaceGTE0", e, t), e.trim().replace(c[t.includePrerelease ? l.GTE0PRE : l.GTE0], "")), O = (e) => (t, n, r, i, a, o, s, c, l, u, d, f) => (n = y(r) ? "" : y(i) ? `>=${r}.0.0${e ? "-0" : ""}` : y(a) ? `>=${r}.${i}.0${e ? "-0" : ""}` : o ? `>=${n}` : `>=${n}${e ? "-0" : ""}`, c = y(l) ? "" : y(u) ? `<${+l + 1}.0.0-0` : y(d) ? `<${l}.${+u + 1}.0-0` : f ? `<=${l}.${u}.${d}-${f}` : e ? `<${l}.${u}.${+d + 1}-0` : `<=${c}`, `${n} ${c}`.trim()), k = (e, t, n) => {
		for (let n = 0; n < e.length; n++) if (!e[n].test(t)) return !1;
		if (t.prerelease.length && !n.includePrerelease) {
			for (let n = 0; n < e.length; n++) if (o(e[n].semver), e[n].semver !== a.ANY && e[n].semver.prerelease.length > 0) {
				let r = e[n].semver;
				if (r.major === t.major && r.minor === t.minor && r.patch === t.patch) return !0;
			}
			return !1;
		}
		return !0;
	};
})), $t = /* @__PURE__ */ k(((e, t) => {
	var n = Symbol("SemVer ANY");
	t.exports = class e {
		static get ANY() {
			return n;
		}
		constructor(t, i) {
			if (i = r(i), t instanceof e) {
				if (t.loose === !!i.loose) return t;
				t = t.value;
			}
			t = t.trim().split(/\s+/).join(" "), s("comparator", t, i), this.options = i, this.loose = !!i.loose, this.parse(t), this.value = this.semver === n ? "" : this.operator + this.semver.version, s("comp", this);
		}
		parse(e) {
			let t = this.options.loose ? i[a.COMPARATORLOOSE] : i[a.COMPARATOR], r = e.match(t);
			if (!r) throw TypeError(`Invalid comparator: ${e}`);
			this.operator = r[1] === void 0 ? "" : r[1], this.operator === "=" && (this.operator = ""), this.semver = r[2] ? new c(r[2], this.options.loose) : n;
		}
		toString() {
			return this.value;
		}
		test(e) {
			if (s("Comparator.test", e, this.options.loose), this.semver === n || e === n) return !0;
			if (typeof e == "string") try {
				e = new c(e, this.options);
			} catch {
				return !1;
			}
			return o(e, this.operator, this.semver, this.options);
		}
		intersects(t, n) {
			if (!(t instanceof e)) throw TypeError("a Comparator is required");
			return this.operator === "" ? this.value === "" || new l(t.value, n).test(this.value) : t.operator === "" ? t.value === "" || new l(this.value, n).test(t.semver) : (n = r(n), n.includePrerelease && (this.value === "<0.0.0-0" || t.value === "<0.0.0-0") || !n.includePrerelease && (this.value.startsWith("<0.0.0") || t.value.startsWith("<0.0.0")) ? !1 : !!(this.operator.startsWith(">") && t.operator.startsWith(">") || this.operator.startsWith("<") && t.operator.startsWith("<") || this.semver.version === t.semver.version && this.operator.includes("=") && t.operator.includes("=") || o(this.semver, "<", t.semver, n) && this.operator.startsWith(">") && t.operator.startsWith("<") || o(this.semver, ">", t.semver, n) && this.operator.startsWith("<") && t.operator.startsWith(">")));
		}
	};
	var r = Tt(), { safeRe: i, t: a } = wt(), o = Yt(), s = Ct(), c = Dt(), l = Qt();
})), en = /* @__PURE__ */ k(((e, t) => {
	var n = Qt();
	t.exports = (e, t, r) => {
		try {
			t = new n(t, r);
		} catch {
			return !1;
		}
		return t.test(e);
	};
})), tn = /* @__PURE__ */ k(((e, t) => {
	var n = Qt();
	t.exports = (e, t) => new n(e, t).set.map((e) => e.map((e) => e.value).join(" ").trim().split(" "));
})), nn = /* @__PURE__ */ k(((e, t) => {
	var n = Dt(), r = Qt();
	t.exports = (e, t, i) => {
		let a = null, o = null, s = null;
		try {
			s = new r(t, i);
		} catch {
			return null;
		}
		return e.forEach((e) => {
			s.test(e) && (!a || o.compare(e) === -1) && (a = e, o = new n(a, i));
		}), a;
	};
})), rn = /* @__PURE__ */ k(((e, t) => {
	var n = Dt(), r = Qt();
	t.exports = (e, t, i) => {
		let a = null, o = null, s = null;
		try {
			s = new r(t, i);
		} catch {
			return null;
		}
		return e.forEach((e) => {
			s.test(e) && (!a || o.compare(e) === 1) && (a = e, o = new n(a, i));
		}), a;
	};
})), an = /* @__PURE__ */ k(((e, t) => {
	var n = Dt(), r = Qt(), i = Ut();
	t.exports = (e, t) => {
		e = new r(e, t);
		let a = new n("0.0.0");
		if (e.test(a) || (a = new n("0.0.0-0"), e.test(a))) return a;
		a = null;
		for (let t = 0; t < e.set.length; ++t) {
			let r = e.set[t], o = null;
			r.forEach((e) => {
				let t = new n(e.semver.version);
				switch (e.operator) {
					case ">": t.prerelease.length === 0 ? t.patch++ : t.prerelease.push(0), t.raw = t.format();
					case "":
					case ">=":
						(!o || i(t, o)) && (o = t);
						break;
					case "<":
					case "<=": break;
					/* istanbul ignore next */
					default: throw Error(`Unexpected operation: ${e.operator}`);
				}
			}), o && (!a || i(a, o)) && (a = o);
		}
		return a && e.test(a) ? a : null;
	};
})), on = /* @__PURE__ */ k(((e, t) => {
	var n = Qt();
	t.exports = (e, t) => {
		try {
			return new n(e, t).range || "*";
		} catch {
			return null;
		}
	};
})), sn = /* @__PURE__ */ k(((e, t) => {
	var n = Dt(), r = $t(), { ANY: i } = r, a = Qt(), o = en(), s = Ut(), c = Wt(), l = Jt(), u = qt();
	t.exports = (e, t, d, f) => {
		e = new n(e, f), t = new a(t, f);
		let p, m, h, g, _;
		switch (d) {
			case ">":
				p = s, m = l, h = c, g = ">", _ = ">=";
				break;
			case "<":
				p = c, m = u, h = s, g = "<", _ = "<=";
				break;
			default: throw TypeError("Must provide a hilo val of \"<\" or \">\"");
		}
		if (o(e, t, f)) return !1;
		for (let n = 0; n < t.set.length; ++n) {
			let a = t.set[n], o = null, s = null;
			if (a.forEach((e) => {
				e.semver === i && (e = new r(">=0.0.0")), o ||= e, s ||= e, p(e.semver, o.semver, f) ? o = e : h(e.semver, s.semver, f) && (s = e);
			}), o.operator === g || o.operator === _ || (!s.operator || s.operator === g) && m(e, s.semver) || s.operator === _ && h(e, s.semver)) return !1;
		}
		return !0;
	};
})), cn = /* @__PURE__ */ k(((e, t) => {
	var n = sn();
	t.exports = (e, t, r) => n(e, t, ">", r);
})), ln = /* @__PURE__ */ k(((e, t) => {
	var n = sn();
	t.exports = (e, t, r) => n(e, t, "<", r);
})), un = /* @__PURE__ */ k(((e, t) => {
	var n = Qt();
	t.exports = (e, t, r) => (e = new n(e, r), t = new n(t, r), e.intersects(t, r));
})), dn = /* @__PURE__ */ k(((e, t) => {
	var n = en(), r = Lt();
	t.exports = (e, t, i) => {
		let a = [], o = null, s = null, c = e.sort((e, t) => r(e, t, i));
		for (let e of c) n(e, t, i) ? (s = e, o ||= e) : (s && a.push([o, s]), s = null, o = null);
		o && a.push([o, null]);
		let l = [];
		for (let [e, t] of a) e === t ? l.push(e) : !t && e === c[0] ? l.push("*") : t ? e === c[0] ? l.push(`<=${t}`) : l.push(`${e} - ${t}`) : l.push(`>=${e}`);
		let u = l.join(" || "), d = typeof t.raw == "string" ? t.raw : String(t);
		return u.length < d.length ? u : t;
	};
})), fn = /* @__PURE__ */ k(((e, t) => {
	var n = Qt(), r = $t(), { ANY: i } = r, a = en(), o = Lt(), s = (e, t, r = {}) => {
		if (e === t) return !0;
		e = new n(e, r), t = new n(t, r);
		let i = !1;
		OUTER: for (let n of e.set) {
			for (let e of t.set) {
				let t = u(n, e, r);
				if (i ||= t !== null, t) continue OUTER;
			}
			if (i) return !1;
		}
		return !0;
	}, c = [new r(">=0.0.0-0")], l = [new r(">=0.0.0")], u = (e, t, n) => {
		if (e === t) return !0;
		if (e.length === 1 && e[0].semver === i) {
			if (t.length === 1 && t[0].semver === i) return !0;
			e = n.includePrerelease ? c : l;
		}
		if (t.length === 1 && t[0].semver === i) {
			if (n.includePrerelease) return !0;
			t = l;
		}
		let r = /* @__PURE__ */ new Set(), s, u;
		for (let t of e) t.operator === ">" || t.operator === ">=" ? s = d(s, t, n) : t.operator === "<" || t.operator === "<=" ? u = f(u, t, n) : r.add(t.semver);
		if (r.size > 1) return null;
		let p;
		if (s && u && (p = o(s.semver, u.semver, n), p > 0 || p === 0 && (s.operator !== ">=" || u.operator !== "<="))) return null;
		for (let e of r) {
			if (s && !a(e, String(s), n) || u && !a(e, String(u), n)) return null;
			for (let r of t) if (!a(e, String(r), n)) return !1;
			return !0;
		}
		let m, h, g, _, v = u && !n.includePrerelease && u.semver.prerelease.length ? u.semver : !1, y = s && !n.includePrerelease && s.semver.prerelease.length ? s.semver : !1;
		v && v.prerelease.length === 1 && u.operator === "<" && v.prerelease[0] === 0 && (v = !1);
		for (let e of t) {
			if (_ = _ || e.operator === ">" || e.operator === ">=", g = g || e.operator === "<" || e.operator === "<=", s) {
				if (y && e.semver.prerelease && e.semver.prerelease.length && e.semver.major === y.major && e.semver.minor === y.minor && e.semver.patch === y.patch && (y = !1), e.operator === ">" || e.operator === ">=") {
					if (m = d(s, e, n), m === e && m !== s) return !1;
				} else if (s.operator === ">=" && !a(s.semver, String(e), n)) return !1;
			}
			if (u) {
				if (v && e.semver.prerelease && e.semver.prerelease.length && e.semver.major === v.major && e.semver.minor === v.minor && e.semver.patch === v.patch && (v = !1), e.operator === "<" || e.operator === "<=") {
					if (h = f(u, e, n), h === e && h !== u) return !1;
				} else if (u.operator === "<=" && !a(u.semver, String(e), n)) return !1;
			}
			if (!e.operator && (u || s) && p !== 0) return !1;
		}
		return !(s && g && !u && p !== 0 || u && _ && !s && p !== 0 || y || v);
	}, d = (e, t, n) => {
		if (!e) return t;
		let r = o(e.semver, t.semver, n);
		return r > 0 ? e : r < 0 || t.operator === ">" && e.operator === ">=" ? t : e;
	}, f = (e, t, n) => {
		if (!e) return t;
		let r = o(e.semver, t.semver, n);
		return r < 0 ? e : r > 0 || t.operator === "<" && e.operator === "<=" ? t : e;
	};
	t.exports = s;
})), pn = /* @__PURE__ */ k(((e, t) => {
	var n = wt(), r = St(), i = Dt(), a = Et();
	t.exports = {
		parse: Ot(),
		valid: kt(),
		clean: At(),
		inc: jt(),
		diff: Mt(),
		major: Nt(),
		minor: Pt(),
		patch: Ft(),
		prerelease: It(),
		compare: Lt(),
		rcompare: Rt(),
		compareLoose: zt(),
		compareBuild: Bt(),
		sort: Vt(),
		rsort: Ht(),
		gt: Ut(),
		lt: Wt(),
		eq: Gt(),
		neq: Kt(),
		gte: qt(),
		lte: Jt(),
		cmp: Yt(),
		coerce: Xt(),
		Comparator: $t(),
		Range: Qt(),
		satisfies: en(),
		toComparators: tn(),
		maxSatisfying: nn(),
		minSatisfying: rn(),
		minVersion: an(),
		validRange: on(),
		outside: sn(),
		gtr: cn(),
		ltr: ln(),
		intersects: un(),
		simplifyRange: dn(),
		subset: fn(),
		SemVer: i,
		re: n.re,
		src: n.src,
		tokens: n.t,
		SEMVER_SPEC_VERSION: r.SEMVER_SPEC_VERSION,
		RELEASE_TYPES: r.RELEASE_TYPES,
		compareIdentifiers: a.compareIdentifiers,
		rcompareIdentifiers: a.rcompareIdentifiers
	};
})), mn = /* @__PURE__ */ k(((e, t) => {
	var n = "__lodash_hash_undefined__", r = 9007199254740991, i = "[object Arguments]", a = "[object Array]", o = "[object Boolean]", s = "[object Date]", c = "[object Error]", l = "[object Function]", u = "[object Map]", d = "[object Number]", f = "[object Object]", p = "[object Promise]", m = "[object RegExp]", h = "[object Set]", g = "[object String]", _ = "[object WeakMap]", v = "[object ArrayBuffer]", y = "[object DataView]", b = "[object Float32Array]", x = "[object Float64Array]", S = "[object Int8Array]", C = "[object Int16Array]", w = "[object Int32Array]", T = "[object Uint8Array]", E = "[object Uint8ClampedArray]", D = "[object Uint16Array]", O = "[object Uint32Array]", k = /[\\^$.*+?()[\]{}|]/g, A = /^\[object .+?Constructor\]$/, j = /^(?:0|[1-9]\d*)$/, M = {};
	M[b] = M[x] = M[S] = M[C] = M[w] = M[T] = M[E] = M[D] = M[O] = !0, M[i] = M[a] = M[v] = M[o] = M[y] = M[s] = M[c] = M[l] = M[u] = M[d] = M[f] = M[m] = M[h] = M[g] = M[_] = !1;
	var N = typeof global == "object" && global && global.Object === Object && global, P = typeof self == "object" && self && self.Object === Object && self, F = N || P || Function("return this")(), I = typeof e == "object" && e && !e.nodeType && e, ee = I && typeof t == "object" && t && !t.nodeType && t, L = ee && ee.exports === I, R = L && N.process, z = function() {
		try {
			return R && R.binding && R.binding("util");
		} catch {}
	}(), te = z && z.isTypedArray;
	function B(e, t) {
		for (var n = -1, r = e == null ? 0 : e.length, i = 0, a = []; ++n < r;) {
			var o = e[n];
			t(o, n, e) && (a[i++] = o);
		}
		return a;
	}
	function V(e, t) {
		for (var n = -1, r = t.length, i = e.length; ++n < r;) e[i + n] = t[n];
		return e;
	}
	function H(e, t) {
		for (var n = -1, r = e == null ? 0 : e.length; ++n < r;) if (t(e[n], n, e)) return !0;
		return !1;
	}
	function ne(e, t) {
		for (var n = -1, r = Array(e); ++n < e;) r[n] = t(n);
		return r;
	}
	function U(e) {
		return function(t) {
			return e(t);
		};
	}
	function re(e, t) {
		return e.has(t);
	}
	function W(e, t) {
		return e?.[t];
	}
	function ie(e) {
		var t = -1, n = Array(e.size);
		return e.forEach(function(e, r) {
			n[++t] = [r, e];
		}), n;
	}
	function ae(e, t) {
		return function(n) {
			return e(t(n));
		};
	}
	function oe(e) {
		var t = -1, n = Array(e.size);
		return e.forEach(function(e) {
			n[++t] = e;
		}), n;
	}
	var se = Array.prototype, ce = Function.prototype, G = Object.prototype, le = F["__core-js_shared__"], ue = ce.toString, de = G.hasOwnProperty, fe = function() {
		var e = /[^.]+$/.exec(le && le.keys && le.keys.IE_PROTO || "");
		return e ? "Symbol(src)_1." + e : "";
	}(), pe = G.toString, me = RegExp("^" + ue.call(de).replace(k, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"), he = L ? F.Buffer : void 0, ge = F.Symbol, _e = F.Uint8Array, ve = G.propertyIsEnumerable, ye = se.splice, be = ge ? ge.toStringTag : void 0, xe = Object.getOwnPropertySymbols, Se = he ? he.isBuffer : void 0, Ce = ae(Object.keys, Object), we = Ct(F, "DataView"), Te = Ct(F, "Map"), Ee = Ct(F, "Promise"), De = Ct(F, "Set"), Oe = Ct(F, "WeakMap"), ke = Ct(Object, "create"), Ae = Mt(we), je = Mt(Te), Me = Mt(Ee), Ne = Mt(De), Pe = Mt(Oe), K = ge ? ge.prototype : void 0, Fe = K ? K.valueOf : void 0;
	function Ie(e) {
		var t = -1, n = e == null ? 0 : e.length;
		for (this.clear(); ++t < n;) {
			var r = e[t];
			this.set(r[0], r[1]);
		}
	}
	function Le() {
		this.__data__ = ke ? ke(null) : {}, this.size = 0;
	}
	function Re(e) {
		var t = this.has(e) && delete this.__data__[e];
		return this.size -= +!!t, t;
	}
	function ze(e) {
		var t = this.__data__;
		if (ke) {
			var r = t[e];
			return r === n ? void 0 : r;
		}
		return de.call(t, e) ? t[e] : void 0;
	}
	function Be(e) {
		var t = this.__data__;
		return ke ? t[e] !== void 0 : de.call(t, e);
	}
	function Ve(e, t) {
		var r = this.__data__;
		return this.size += +!this.has(e), r[e] = ke && t === void 0 ? n : t, this;
	}
	Ie.prototype.clear = Le, Ie.prototype.delete = Re, Ie.prototype.get = ze, Ie.prototype.has = Be, Ie.prototype.set = Ve;
	function He(e) {
		var t = -1, n = e == null ? 0 : e.length;
		for (this.clear(); ++t < n;) {
			var r = e[t];
			this.set(r[0], r[1]);
		}
	}
	function Ue() {
		this.__data__ = [], this.size = 0;
	}
	function We(e) {
		var t = this.__data__, n = lt(t, e);
		return n < 0 ? !1 : (n == t.length - 1 ? t.pop() : ye.call(t, n, 1), --this.size, !0);
	}
	function Ge(e) {
		var t = this.__data__, n = lt(t, e);
		return n < 0 ? void 0 : t[n][1];
	}
	function Ke(e) {
		return lt(this.__data__, e) > -1;
	}
	function qe(e, t) {
		var n = this.__data__, r = lt(n, e);
		return r < 0 ? (++this.size, n.push([e, t])) : n[r][1] = t, this;
	}
	He.prototype.clear = Ue, He.prototype.delete = We, He.prototype.get = Ge, He.prototype.has = Ke, He.prototype.set = qe;
	function Je(e) {
		var t = -1, n = e == null ? 0 : e.length;
		for (this.clear(); ++t < n;) {
			var r = e[t];
			this.set(r[0], r[1]);
		}
	}
	function Ye() {
		this.size = 0, this.__data__ = {
			hash: new Ie(),
			map: new (Te || He)(),
			string: new Ie()
		};
	}
	function Xe(e) {
		var t = St(this, e).delete(e);
		return this.size -= +!!t, t;
	}
	function Ze(e) {
		return St(this, e).get(e);
	}
	function Qe(e) {
		return St(this, e).has(e);
	}
	function $e(e, t) {
		var n = St(this, e), r = n.size;
		return n.set(e, t), this.size += n.size == r ? 0 : 1, this;
	}
	Je.prototype.clear = Ye, Je.prototype.delete = Xe, Je.prototype.get = Ze, Je.prototype.has = Qe, Je.prototype.set = $e;
	function q(e) {
		var t = -1, n = e == null ? 0 : e.length;
		for (this.__data__ = new Je(); ++t < n;) this.add(e[t]);
	}
	function et(e) {
		return this.__data__.set(e, n), this;
	}
	function tt(e) {
		return this.__data__.has(e);
	}
	q.prototype.add = q.prototype.push = et, q.prototype.has = tt;
	function nt(e) {
		var t = this.__data__ = new He(e);
		this.size = t.size;
	}
	function rt() {
		this.__data__ = new He(), this.size = 0;
	}
	function it(e) {
		var t = this.__data__, n = t.delete(e);
		return this.size = t.size, n;
	}
	function at(e) {
		return this.__data__.get(e);
	}
	function ot(e) {
		return this.__data__.has(e);
	}
	function st(e, t) {
		var n = this.__data__;
		if (n instanceof He) {
			var r = n.__data__;
			if (!Te || r.length < 199) return r.push([e, t]), this.size = ++n.size, this;
			n = this.__data__ = new Je(r);
		}
		return n.set(e, t), this.size = n.size, this;
	}
	nt.prototype.clear = rt, nt.prototype.delete = it, nt.prototype.get = at, nt.prototype.has = ot, nt.prototype.set = st;
	function ct(e, t) {
		var n = Ft(e), r = !n && Pt(e), i = !n && !r && Lt(e), a = !n && !r && !i && Ut(e), o = n || r || i || a, s = o ? ne(e.length, String) : [], c = s.length;
		for (var l in e) (t || de.call(e, l)) && !(o && (l == "length" || i && (l == "offset" || l == "parent") || a && (l == "buffer" || l == "byteLength" || l == "byteOffset") || Dt(l, c))) && s.push(l);
		return s;
	}
	function lt(e, t) {
		for (var n = e.length; n--;) if (Nt(e[n][0], t)) return n;
		return -1;
	}
	function ut(e, t, n) {
		var r = t(e);
		return Ft(e) ? r : V(r, n(e));
	}
	function dt(e) {
		return e == null ? e === void 0 ? "[object Undefined]" : "[object Null]" : be && be in Object(e) ? wt(e) : jt(e);
	}
	function ft(e) {
		return Ht(e) && dt(e) == i;
	}
	function pt(e, t, n, r, i) {
		return e === t ? !0 : e == null || t == null || !Ht(e) && !Ht(t) ? e !== e && t !== t : mt(e, t, n, r, pt, i);
	}
	function mt(e, t, n, r, o, s) {
		var c = Ft(e), l = Ft(t), u = c ? a : Et(e), d = l ? a : Et(t);
		u = u == i ? f : u, d = d == i ? f : d;
		var p = u == f, m = d == f, h = u == d;
		if (h && Lt(e)) {
			if (!Lt(t)) return !1;
			c = !0, p = !1;
		}
		if (h && !p) return s ||= new nt(), c || Ut(e) ? vt(e, t, n, r, o, s) : yt(e, t, u, n, r, o, s);
		if (!(n & 1)) {
			var g = p && de.call(e, "__wrapped__"), _ = m && de.call(t, "__wrapped__");
			if (g || _) {
				var v = g ? e.value() : e, y = _ ? t.value() : t;
				return s ||= new nt(), o(v, y, n, r, s);
			}
		}
		return h ? (s ||= new nt(), bt(e, t, n, r, o, s)) : !1;
	}
	function ht(e) {
		return !Vt(e) || kt(e) ? !1 : (zt(e) ? me : A).test(Mt(e));
	}
	function gt(e) {
		return Ht(e) && Bt(e.length) && !!M[dt(e)];
	}
	function _t(e) {
		if (!At(e)) return Ce(e);
		var t = [];
		for (var n in Object(e)) de.call(e, n) && n != "constructor" && t.push(n);
		return t;
	}
	function vt(e, t, n, r, i, a) {
		var o = n & 1, s = e.length, c = t.length;
		if (s != c && !(o && c > s)) return !1;
		var l = a.get(e);
		if (l && a.get(t)) return l == t;
		var u = -1, d = !0, f = n & 2 ? new q() : void 0;
		for (a.set(e, t), a.set(t, e); ++u < s;) {
			var p = e[u], m = t[u];
			if (r) var h = o ? r(m, p, u, t, e, a) : r(p, m, u, e, t, a);
			if (h !== void 0) {
				if (h) continue;
				d = !1;
				break;
			}
			if (f) {
				if (!H(t, function(e, t) {
					if (!re(f, t) && (p === e || i(p, e, n, r, a))) return f.push(t);
				})) {
					d = !1;
					break;
				}
			} else if (!(p === m || i(p, m, n, r, a))) {
				d = !1;
				break;
			}
		}
		return a.delete(e), a.delete(t), d;
	}
	function yt(e, t, n, r, i, a, l) {
		switch (n) {
			case y:
				if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset) return !1;
				e = e.buffer, t = t.buffer;
			case v: return !(e.byteLength != t.byteLength || !a(new _e(e), new _e(t)));
			case o:
			case s:
			case d: return Nt(+e, +t);
			case c: return e.name == t.name && e.message == t.message;
			case m:
			case g: return e == t + "";
			case u: var f = ie;
			case h:
				var p = r & 1;
				if (f ||= oe, e.size != t.size && !p) return !1;
				var _ = l.get(e);
				if (_) return _ == t;
				r |= 2, l.set(e, t);
				var b = vt(f(e), f(t), r, i, a, l);
				return l.delete(e), b;
			case "[object Symbol]": if (Fe) return Fe.call(e) == Fe.call(t);
		}
		return !1;
	}
	function bt(e, t, n, r, i, a) {
		var o = n & 1, s = xt(e), c = s.length;
		if (c != xt(t).length && !o) return !1;
		for (var l = c; l--;) {
			var u = s[l];
			if (!(o ? u in t : de.call(t, u))) return !1;
		}
		var d = a.get(e);
		if (d && a.get(t)) return d == t;
		var f = !0;
		a.set(e, t), a.set(t, e);
		for (var p = o; ++l < c;) {
			u = s[l];
			var m = e[u], h = t[u];
			if (r) var g = o ? r(h, m, u, t, e, a) : r(m, h, u, e, t, a);
			if (!(g === void 0 ? m === h || i(m, h, n, r, a) : g)) {
				f = !1;
				break;
			}
			p ||= u == "constructor";
		}
		if (f && !p) {
			var _ = e.constructor, v = t.constructor;
			_ != v && "constructor" in e && "constructor" in t && !(typeof _ == "function" && _ instanceof _ && typeof v == "function" && v instanceof v) && (f = !1);
		}
		return a.delete(e), a.delete(t), f;
	}
	function xt(e) {
		return ut(e, Wt, Tt);
	}
	function St(e, t) {
		var n = e.__data__;
		return Ot(t) ? n[typeof t == "string" ? "string" : "hash"] : n.map;
	}
	function Ct(e, t) {
		var n = W(e, t);
		return ht(n) ? n : void 0;
	}
	function wt(e) {
		var t = de.call(e, be), n = e[be];
		try {
			e[be] = void 0;
			var r = !0;
		} catch {}
		var i = pe.call(e);
		return r && (t ? e[be] = n : delete e[be]), i;
	}
	var Tt = xe ? function(e) {
		return e == null ? [] : (e = Object(e), B(xe(e), function(t) {
			return ve.call(e, t);
		}));
	} : Gt, Et = dt;
	(we && Et(new we(/* @__PURE__ */ new ArrayBuffer(1))) != y || Te && Et(new Te()) != u || Ee && Et(Ee.resolve()) != p || De && Et(new De()) != h || Oe && Et(new Oe()) != _) && (Et = function(e) {
		var t = dt(e), n = t == f ? e.constructor : void 0, r = n ? Mt(n) : "";
		if (r) switch (r) {
			case Ae: return y;
			case je: return u;
			case Me: return p;
			case Ne: return h;
			case Pe: return _;
		}
		return t;
	});
	function Dt(e, t) {
		return t ??= r, !!t && (typeof e == "number" || j.test(e)) && e > -1 && e % 1 == 0 && e < t;
	}
	function Ot(e) {
		var t = typeof e;
		return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
	}
	function kt(e) {
		return !!fe && fe in e;
	}
	function At(e) {
		var t = e && e.constructor;
		return e === (typeof t == "function" && t.prototype || G);
	}
	function jt(e) {
		return pe.call(e);
	}
	function Mt(e) {
		if (e != null) {
			try {
				return ue.call(e);
			} catch {}
			try {
				return e + "";
			} catch {}
		}
		return "";
	}
	function Nt(e, t) {
		return e === t || e !== e && t !== t;
	}
	var Pt = ft(function() {
		return arguments;
	}()) ? ft : function(e) {
		return Ht(e) && de.call(e, "callee") && !ve.call(e, "callee");
	}, Ft = Array.isArray;
	function It(e) {
		return e != null && Bt(e.length) && !zt(e);
	}
	var Lt = Se || Kt;
	function Rt(e, t) {
		return pt(e, t);
	}
	function zt(e) {
		if (!Vt(e)) return !1;
		var t = dt(e);
		return t == l || t == "[object GeneratorFunction]" || t == "[object AsyncFunction]" || t == "[object Proxy]";
	}
	function Bt(e) {
		return typeof e == "number" && e > -1 && e % 1 == 0 && e <= r;
	}
	function Vt(e) {
		var t = typeof e;
		return e != null && (t == "object" || t == "function");
	}
	function Ht(e) {
		return typeof e == "object" && !!e;
	}
	var Ut = te ? U(te) : gt;
	function Wt(e) {
		return It(e) ? ct(e) : _t(e);
	}
	function Gt() {
		return [];
	}
	function Kt() {
		return !1;
	}
	t.exports = Rt;
})), hn = /* @__PURE__ */ k(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.DownloadedUpdateHelper = void 0, e.createTempUpdateFile = s;
	var t = P("crypto"), n = P("fs"), r = mn(), i = Ce(), a = P("path");
	e.DownloadedUpdateHelper = class {
		constructor(e) {
			this.cacheDir = e, this._file = null, this._packageFile = null, this.versionInfo = null, this.fileInfo = null, this._downloadedFileInfo = null;
		}
		get downloadedFileInfo() {
			return this._downloadedFileInfo;
		}
		get file() {
			return this._file;
		}
		get packageFile() {
			return this._packageFile;
		}
		get cacheDirForPendingUpdate() {
			return a.join(this.cacheDir, "pending");
		}
		async validateDownloadedPath(e, t, n, a) {
			if (this.versionInfo != null && this.file === e && this.fileInfo != null) return r(this.versionInfo, t) && r(this.fileInfo.info, n.info) && await (0, i.pathExists)(e) ? e : null;
			let o = await this.getValidCachedUpdateFile(n, a);
			return o === null ? null : (a.info(`Update has already been downloaded to ${e}).`), this._file = o, o);
		}
		async setDownloadedFile(e, t, n, r, a, o) {
			this._file = e, this._packageFile = t, this.versionInfo = n, this.fileInfo = r, this._downloadedFileInfo = {
				fileName: a,
				sha512: r.info.sha512,
				isAdminRightsRequired: r.info.isAdminRightsRequired === !0
			}, o && await (0, i.outputJson)(this.getUpdateInfoFile(), this._downloadedFileInfo);
		}
		async clear() {
			this._file = null, this._packageFile = null, this.versionInfo = null, this.fileInfo = null, await this.cleanCacheDirForPendingUpdate();
		}
		async cleanCacheDirForPendingUpdate() {
			try {
				await (0, i.emptyDir)(this.cacheDirForPendingUpdate);
			} catch {}
		}
		async getValidCachedUpdateFile(e, t) {
			let n = this.getUpdateInfoFile();
			if (!await (0, i.pathExists)(n)) return null;
			let r;
			try {
				r = await (0, i.readJson)(n);
			} catch (e) {
				let n = "No cached update info available";
				return e.code !== "ENOENT" && (await this.cleanCacheDirForPendingUpdate(), n += ` (error on read: ${e.message})`), t.info(n), null;
			}
			if (r?.fileName === null) return t.warn("Cached update info is corrupted: no fileName, directory for cached update will be cleaned"), await this.cleanCacheDirForPendingUpdate(), null;
			if (e.info.sha512 !== r.sha512) return t.info(`Cached update sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: ${r.sha512}, expected: ${e.info.sha512}. Directory for cached update will be cleaned`), await this.cleanCacheDirForPendingUpdate(), null;
			let s = a.join(this.cacheDirForPendingUpdate, r.fileName);
			if (!await (0, i.pathExists)(s)) return t.info("Cached update file doesn't exist"), null;
			let c = await o(s);
			return e.info.sha512 === c ? (this._downloadedFileInfo = r, s) : (t.warn(`Sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: ${c}, expected: ${e.info.sha512}`), await this.cleanCacheDirForPendingUpdate(), null);
		}
		getUpdateInfoFile() {
			return a.join(this.cacheDirForPendingUpdate, "update-info.json");
		}
	};
	function o(e, r = "sha512", i = "base64", a) {
		return new Promise((o, s) => {
			let c = (0, t.createHash)(r);
			c.on("error", s).setEncoding(i), (0, n.createReadStream)(e, {
				...a,
				highWaterMark: 1048576
			}).on("error", s).on("end", () => {
				c.end(), o(c.read());
			}).pipe(c, { end: !1 });
		});
	}
	async function s(e, t, n) {
		let r = 0, o = a.join(t, e);
		for (let s = 0; s < 3; s++) try {
			return await (0, i.unlink)(o), o;
		} catch (i) {
			if (i.code === "ENOENT") return o;
			n.warn(`Error on remove temp update file: ${i}`), o = a.join(t, `${r++}-${e}`);
		}
		return o;
	}
})), gn = /* @__PURE__ */ k(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.getAppCacheDir = r;
	var t = P("path"), n = P("os");
	function r() {
		let e = (0, n.homedir)(), r;
		return r = process.platform === "win32" ? process.env.LOCALAPPDATA || t.join(e, "AppData", "Local") : process.platform === "darwin" ? t.join(e, "Library", "Caches") : process.env.XDG_CACHE_HOME || t.join(e, ".cache"), r;
	}
})), _n = /* @__PURE__ */ k(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.ElectronAppAdapter = void 0;
	var t = P("path"), n = gn();
	e.ElectronAppAdapter = class {
		constructor(e = P("electron").app) {
			this.app = e;
		}
		whenReady() {
			return this.app.whenReady();
		}
		get version() {
			return this.app.getVersion();
		}
		get name() {
			return this.app.getName();
		}
		get isPackaged() {
			return this.app.isPackaged === !0;
		}
		get appUpdateConfigPath() {
			return this.isPackaged ? t.join(process.resourcesPath, "app-update.yml") : t.join(this.app.getAppPath(), "dev-app-update.yml");
		}
		get userDataPath() {
			return this.app.getPath("userData");
		}
		get baseCachePath() {
			return (0, n.getAppCacheDir)();
		}
		quit() {
			this.app.quit();
		}
		relaunch() {
			this.app.relaunch();
		}
		onQuit(e) {
			this.app.once("quit", (t, n) => e(n));
		}
	};
})), vn = /* @__PURE__ */ k(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.ElectronHttpExecutor = e.NET_SESSION_NAME = void 0, e.getNetSession = n;
	var t = Xe();
	e.NET_SESSION_NAME = "electron-updater";
	function n() {
		return P("electron").session.fromPartition(e.NET_SESSION_NAME, { cache: !1 });
	}
	e.ElectronHttpExecutor = class extends t.HttpExecutor {
		constructor(e) {
			super(), this.proxyLoginCallback = e, this.cachedSession = null;
		}
		async download(e, n, r) {
			return await r.cancellationToken.createPromise((i, a, o) => {
				let s = {
					headers: r.headers || void 0,
					redirect: "manual"
				};
				(0, t.configureRequestUrl)(e, s), (0, t.configureRequestOptions)(s), this.doDownload(s, {
					destination: n,
					options: r,
					onCancel: o,
					callback: (e) => {
						e == null ? i(n) : a(e);
					},
					responseHandler: null
				}, 0);
			});
		}
		createRequest(e, t) {
			e.headers && e.headers.Host && (e.host = e.headers.Host, delete e.headers.Host), this.cachedSession ??= n();
			let r = P("electron").net.request({
				...e,
				session: this.cachedSession
			});
			return r.on("response", t), this.proxyLoginCallback != null && r.on("login", this.proxyLoginCallback), r;
		}
		addRedirectHandlers(e, n, r, i, a) {
			e.on("redirect", (o, s, c) => {
				e.abort(), i > this.maxRedirects ? r(this.createMaxRedirectError()) : a(t.HttpExecutor.prepareRedirectUrlOptions(c, n));
			});
		}
	};
})), yn = /* @__PURE__ */ k(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.newBaseUrl = n, e.newUrlFromBase = r, e.getChannelFilename = i;
	var t = P("url");
	function n(e) {
		let n = new t.URL(e);
		return n.pathname.endsWith("/") || (n.pathname += "/"), n;
	}
	function r(e, n, r = !1) {
		let i = new t.URL(e, n), a = n.search;
		return a != null && a.length !== 0 ? i.search = a : r && (i.search = `noCache=${Date.now().toString(32)}`), i;
	}
	function i(e) {
		return `${e}.yml`;
	}
})), bn = /* @__PURE__ */ k(((e, t) => {
	var n = /[\\^$.*+?()[\]{}|]/g, r = RegExp(n.source), i = typeof global == "object" && global && global.Object === Object && global, a = typeof self == "object" && self && self.Object === Object && self, o = i || a || Function("return this")(), s = Object.prototype.toString, c = o.Symbol, l = c ? c.prototype : void 0, u = l ? l.toString : void 0;
	function d(e) {
		if (typeof e == "string") return e;
		if (p(e)) return u ? u.call(e) : "";
		var t = e + "";
		return t == "0" && 1 / e == -Infinity ? "-0" : t;
	}
	function f(e) {
		return !!e && typeof e == "object";
	}
	function p(e) {
		return typeof e == "symbol" || f(e) && s.call(e) == "[object Symbol]";
	}
	function m(e) {
		return e == null ? "" : d(e);
	}
	function h(e) {
		return e = m(e), e && r.test(e) ? e.replace(n, "\\$&") : e;
	}
	t.exports = h;
})), xn = /* @__PURE__ */ k(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.Provider = void 0, e.findFile = o, e.parseUpdateInfo = s, e.getFileList = c, e.resolveFiles = l;
	var t = Xe(), n = bt(), r = P("url"), i = yn(), a = bn();
	e.Provider = class {
		constructor(e) {
			this.runtimeOptions = e, this.requestHeaders = null, this.executor = e.executor;
		}
		getBlockMapFiles(e, t, n, o = null) {
			let s = (0, i.newUrlFromBase)(`${e.pathname}.blockmap`, e);
			return [(0, i.newUrlFromBase)(`${e.pathname.replace(new RegExp(a(n), "g"), t)}.blockmap`, o ? new r.URL(o) : e), s];
		}
		get isUseMultipleRangeRequest() {
			return this.runtimeOptions.isUseMultipleRangeRequest !== !1;
		}
		getChannelFilePrefix() {
			if (this.runtimeOptions.platform === "linux") {
				let e = process.env.TEST_UPDATER_ARCH || process.arch;
				return "-linux" + (e === "x64" ? "" : `-${e}`);
			}
			return this.runtimeOptions.platform === "darwin" ? "-mac" : "";
		}
		getDefaultChannelName() {
			return this.getCustomChannelName("latest");
		}
		getCustomChannelName(e) {
			return `${e}${this.getChannelFilePrefix()}`;
		}
		get fileExtraDownloadHeaders() {
			return null;
		}
		setRequestHeaders(e) {
			this.requestHeaders = e;
		}
		httpRequest(e, t, n) {
			return this.executor.request(this.createRequestOptions(e, t), n);
		}
		createRequestOptions(e, n) {
			let r = {};
			return this.requestHeaders == null ? n != null && (r.headers = n) : r.headers = n == null ? this.requestHeaders : {
				...this.requestHeaders,
				...n
			}, (0, t.configureRequestUrl)(e, r), r;
		}
	};
	function o(e, n, r) {
		if (e.length === 0) throw (0, t.newError)("No files provided", "ERR_UPDATER_NO_FILES_PROVIDED");
		let i = e.filter((e) => e.url.pathname.toLowerCase().endsWith(`.${n.toLowerCase()}`));
		return (i.find((e) => [e.url.pathname, e.info.url].some((e) => e.includes(process.arch))) ?? i.shift()) || (r == null ? e[0] : e.find((e) => !r.some((t) => e.url.pathname.toLowerCase().endsWith(`.${t.toLowerCase()}`))));
	}
	function s(e, r, i) {
		if (e == null) throw (0, t.newError)(`Cannot parse update info from ${r} in the latest release artifacts (${i}): rawData: null`, "ERR_UPDATER_INVALID_UPDATE_INFO");
		let a;
		try {
			a = (0, n.load)(e);
		} catch (n) {
			throw (0, t.newError)(`Cannot parse update info from ${r} in the latest release artifacts (${i}): ${n.stack || n.message}, rawData: ${e}`, "ERR_UPDATER_INVALID_UPDATE_INFO");
		}
		return a;
	}
	function c(e) {
		let n = e.files;
		if (n != null && n.length > 0) return n;
		if (e.path != null) return [{
			url: e.path,
			sha2: e.sha2,
			sha512: e.sha512
		}];
		throw (0, t.newError)(`No files provided: ${(0, t.safeStringifyJson)(e)}`, "ERR_UPDATER_NO_FILES_PROVIDED");
	}
	function l(e, n, r = (e) => e) {
		let a = c(e).map((e) => {
			if (e.sha2 == null && e.sha512 == null) throw (0, t.newError)(`Update info doesn't contain nor sha256 neither sha512 checksum: ${(0, t.safeStringifyJson)(e)}`, "ERR_UPDATER_NO_CHECKSUM");
			return {
				url: (0, i.newUrlFromBase)(r(e.url), n),
				info: e
			};
		}), o = e.packages, s = o == null ? null : o[process.arch] || o.ia32;
		return s != null && (a[0].packageInfo = {
			...s,
			path: (0, i.newUrlFromBase)(r(s.path), n).href
		}), a;
	}
})), Sn = /* @__PURE__ */ k(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.GenericProvider = void 0;
	var t = Xe(), n = yn(), r = xn();
	e.GenericProvider = class extends r.Provider {
		constructor(e, t, r) {
			super(r), this.configuration = e, this.updater = t, this.baseUrl = (0, n.newBaseUrl)(this.configuration.url);
		}
		get channel() {
			let e = this.updater.channel || this.configuration.channel;
			return e == null ? this.getDefaultChannelName() : this.getCustomChannelName(e);
		}
		async getLatestVersion() {
			let e = (0, n.getChannelFilename)(this.channel), i = (0, n.newUrlFromBase)(e, this.baseUrl, this.updater.isAddNoCacheQuery);
			for (let n = 0;; n++) try {
				return (0, r.parseUpdateInfo)(await this.httpRequest(i), e, i);
			} catch (r) {
				if (r instanceof t.HttpError && r.statusCode === 404) throw (0, t.newError)(`Cannot find channel "${e}" update info: ${r.stack || r.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
				if (r.code === "ECONNREFUSED" && n < 3) {
					await new Promise((e, t) => {
						try {
							setTimeout(e, 1e3 * n);
						} catch (e) {
							t(e);
						}
					});
					continue;
				}
				throw r;
			}
		}
		resolveFiles(e) {
			return (0, r.resolveFiles)(e, this.baseUrl);
		}
	};
})), Cn = /* @__PURE__ */ k(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.BitbucketProvider = void 0;
	var t = Xe(), n = yn(), r = xn();
	e.BitbucketProvider = class extends r.Provider {
		constructor(e, t, r) {
			super({
				...r,
				isUseMultipleRangeRequest: !1
			}), this.configuration = e, this.updater = t;
			let { owner: i, slug: a } = e;
			this.baseUrl = (0, n.newBaseUrl)(`https://api.bitbucket.org/2.0/repositories/${i}/${a}/downloads`);
		}
		get channel() {
			return this.updater.channel || this.configuration.channel || "latest";
		}
		async getLatestVersion() {
			let e = new t.CancellationToken(), i = (0, n.getChannelFilename)(this.getCustomChannelName(this.channel)), a = (0, n.newUrlFromBase)(i, this.baseUrl, this.updater.isAddNoCacheQuery);
			try {
				let t = await this.httpRequest(a, void 0, e);
				return (0, r.parseUpdateInfo)(t, i, a);
			} catch (e) {
				throw (0, t.newError)(`Unable to find latest version on ${this.toString()}, please ensure release exists: ${e.stack || e.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
			}
		}
		resolveFiles(e) {
			return (0, r.resolveFiles)(e, this.baseUrl);
		}
		toString() {
			let { owner: e, slug: t } = this.configuration;
			return `Bitbucket (owner: ${e}, slug: ${t}, channel: ${this.channel})`;
		}
	};
})), wn = /* @__PURE__ */ k(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.GitHubProvider = e.BaseGitHubProvider = void 0, e.computeReleaseNotes = l;
	var t = Xe(), n = pn(), r = P("url"), i = yn(), a = xn(), o = /\/tag\/(v?[^/]+)$/, s = class extends a.Provider {
		constructor(e, n, r) {
			super({
				...r,
				isUseMultipleRangeRequest: !1
			}), this.options = e, this.baseUrl = (0, i.newBaseUrl)((0, t.githubUrl)(e, n));
			let a = n === "github.com" ? "api.github.com" : n;
			this.baseApiUrl = (0, i.newBaseUrl)((0, t.githubUrl)(e, a));
		}
		computeGithubBasePath(e) {
			let t = this.options.host;
			return t && !["github.com", "api.github.com"].includes(t) ? `/api/v3${e}` : e;
		}
	};
	e.BaseGitHubProvider = s, e.GitHubProvider = class extends s {
		constructor(e, t, n) {
			super(e, "github.com", n), this.options = e, this.updater = t;
		}
		get channel() {
			let e = this.updater.channel || this.options.channel;
			return e == null ? this.getDefaultChannelName() : this.getCustomChannelName(e);
		}
		async getLatestVersion() {
			let e = new t.CancellationToken(), r = await this.httpRequest((0, i.newUrlFromBase)(`${this.basePath}.atom`, this.baseUrl), { accept: "application/xml, application/atom+xml, text/xml, */*" }, e), s = (0, t.parseXml)(r), c = s.element("entry", !1, "No published versions on GitHub"), u = null;
			try {
				if (this.updater.allowPrerelease) {
					let e = this.updater?.channel || n.prerelease(this.updater.currentVersion)?.[0] || null;
					if (e === null) u = o.exec(c.element("link").attribute("href"))[1];
					else for (let t of s.getElements("entry")) {
						let r = o.exec(t.element("link").attribute("href"));
						if (r === null) continue;
						let i = r[1];
						if (!n.valid(i)) continue;
						let a = n.prerelease(i)?.[0] || null, s = !e || ["alpha", "beta"].includes(e), l = a !== null && !["alpha", "beta"].includes(String(a));
						if (s && !l && (e !== "beta" || a !== "alpha")) {
							u = i, c = t;
							break;
						}
						if (a && a === e) {
							u = i, c = t;
							break;
						}
					}
				} else {
					u = await this.getLatestTagName(e);
					for (let e of s.getElements("entry")) {
						let t = o.exec(e.element("link").attribute("href"));
						if (t != null && t[1] === u) {
							c = e;
							break;
						}
					}
				}
			} catch (e) {
				throw (0, t.newError)(`Cannot parse releases feed: ${e.stack || e.message},\nXML:\n${r}`, "ERR_UPDATER_INVALID_RELEASE_FEED");
			}
			if (u == null) throw (0, t.newError)("No published versions on GitHub", "ERR_UPDATER_NO_PUBLISHED_VERSIONS");
			let d, f = "", p = "", m = async (n) => {
				f = (0, i.getChannelFilename)(n), p = (0, i.newUrlFromBase)(this.getBaseDownloadPath(String(u), f), this.baseUrl);
				let r = this.createRequestOptions(p);
				try {
					return await this.executor.request(r, e);
				} catch (e) {
					throw e instanceof t.HttpError && e.statusCode === 404 ? (0, t.newError)(`Cannot find ${f} in the latest release artifacts (${p}): ${e.stack || e.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : e;
				}
			};
			try {
				let e = this.channel;
				this.updater.allowPrerelease && n.prerelease(u)?.[0] && (e = this.getCustomChannelName(String(n.prerelease(u)?.[0]))), d = await m(e);
			} catch (e) {
				if (this.updater.allowPrerelease) d = await m(this.getDefaultChannelName());
				else throw e;
			}
			let h = (0, a.parseUpdateInfo)(d, f, p);
			return h.releaseName ??= c.elementValueOrEmpty("title"), h.releaseNotes ??= l(this.updater.currentVersion, this.updater.fullChangelog, s, c), {
				tag: u,
				...h
			};
		}
		async getLatestTagName(e) {
			let n = this.options, a = n.host == null || n.host === "github.com" ? (0, i.newUrlFromBase)(`${this.basePath}/latest`, this.baseUrl) : new r.URL(`${this.computeGithubBasePath(`/repos/${n.owner}/${n.repo}/releases`)}/latest`, this.baseApiUrl);
			try {
				let t = await this.httpRequest(a, { Accept: "application/json" }, e);
				return t == null ? null : JSON.parse(t).tag_name;
			} catch (e) {
				throw (0, t.newError)(`Unable to find latest version on GitHub (${a}), please ensure a production release exists: ${e.stack || e.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
			}
		}
		get basePath() {
			return `/${this.options.owner}/${this.options.repo}/releases`;
		}
		resolveFiles(e) {
			return (0, a.resolveFiles)(e, this.baseUrl, (t) => this.getBaseDownloadPath(e.tag, t.replace(/ /g, "-")));
		}
		getBaseDownloadPath(e, t) {
			return `${this.basePath}/download/${e}/${t}`;
		}
	};
	function c(e) {
		let t = e.elementValueOrEmpty("content");
		return t === "No content." ? "" : t;
	}
	function l(e, t, r, i) {
		if (!t) return c(i);
		let a = /\/tag\/v?([^/]+)$/, o;
		try {
			o = a.exec(i.element("link").attribute("href"))[1], o = n.valid(o) ? o : void 0;
		} catch {}
		if (o == null) return null;
		let s = [];
		for (let t of r.getElements("entry")) {
			let r;
			try {
				let e = a.exec(t.element("link").attribute("href"));
				if (!e) continue;
				r = e[1];
			} catch {
				continue;
			}
			if (!n.valid(r)) continue;
			let i = n.gt(r, e.raw), l = n.lte(r, o);
			i && l && s.push({
				version: r,
				note: c(t)
			});
		}
		return s.sort((e, t) => n.rcompare(e.version, t.version));
	}
})), Tn = /* @__PURE__ */ k(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.GitLabProvider = void 0;
	var t = Xe(), n = P("url"), r = bn(), i = yn(), a = xn();
	e.GitLabProvider = class extends a.Provider {
		normalizeFilename(e) {
			return e.replace(/ |_/g, "-");
		}
		constructor(e, t, n) {
			super({
				...n,
				isUseMultipleRangeRequest: !1
			}), this.options = e, this.updater = t, this.cachedLatestVersion = null;
			let r = e.host || "gitlab.com";
			this.baseApiUrl = (0, i.newBaseUrl)(`https://${r}/api/v4`);
		}
		createRequestOptions(e, t) {
			let n = super.createRequestOptions(e, t);
			return n.redirect = "manual", n;
		}
		get channel() {
			let e = this.updater.channel || this.options.channel;
			return e == null ? this.getDefaultChannelName() : this.getCustomChannelName(e);
		}
		async getLatestVersion() {
			let e = new t.CancellationToken(), r = (0, i.newUrlFromBase)(`projects/${this.options.projectId}/releases/permalink/latest`, this.baseApiUrl), o = {
				Accept: "application/json",
				...this.setAuthHeaderForToken(this.options.token || null)
			}, s;
			try {
				s = await this.httpRequest(r, o, e);
			} catch (e) {
				throw (0, t.newError)(`Unable to find latest release on GitLab (${r}): ${e.stack || e.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
			}
			if (!s) throw (0, t.newError)("No published releases on GitLab", "ERR_UPDATER_NO_PUBLISHED_VERSIONS");
			let c;
			try {
				c = JSON.parse(s);
			} catch (e) {
				throw (0, t.newError)(`Unable to parse latest release response from GitLab (${r}): response was not valid JSON: ${e.stack || e.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
			}
			if (c.upcoming_release) throw (0, t.newError)("Latest GitLab release is scheduled but not yet published", "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
			let l = c.tag_name, u = null, d = "", f = null, p = async (r) => {
				d = (0, i.getChannelFilename)(r);
				let a = c.assets.links.find((e) => e.name === d);
				if (!a) throw (0, t.newError)(`Cannot find ${d} in the latest release assets`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
				f = new n.URL(a.direct_asset_url);
				let o = this.setAuthHeaderForToken(this.options.token || null), s = Object.keys(o).length ? o : void 0;
				try {
					let n = await this.httpRequest(f, s, e);
					if (!n) throw (0, t.newError)(`Empty response from ${f}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
					return n;
				} catch (e) {
					throw e instanceof t.HttpError && e.statusCode === 404 ? (0, t.newError)(`Cannot find ${d} in the latest release artifacts (${f}): ${e.stack || e.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : e;
				}
			};
			try {
				u = await p(this.channel);
			} catch (e) {
				if (this.channel !== this.getDefaultChannelName()) u = await p(this.getDefaultChannelName());
				else throw e;
			}
			if (!u) throw (0, t.newError)(`Unable to parse channel data from ${d}`, "ERR_UPDATER_INVALID_UPDATE_INFO");
			let m = (0, a.parseUpdateInfo)(u, d, f);
			m.releaseName ??= c.name, m.releaseNotes ??= c.description || null;
			let h = {
				tag: l,
				assets: this.convertAssetsToMap(c.assets),
				...m
			};
			return this.cachedLatestVersion = h, h;
		}
		convertAssetsToMap(e) {
			let t = /* @__PURE__ */ new Map();
			for (let n of e.links) t.set(this.normalizeFilename(n.name), n.direct_asset_url);
			return t;
		}
		findBlockMapInAssets(e, t) {
			let r = [`${t}.blockmap`, `${this.normalizeFilename(t)}.blockmap`];
			for (let t of r) {
				let r = e.get(t);
				if (r) return new n.URL(r);
			}
			return null;
		}
		async fetchReleaseInfoByVersion(e) {
			let n = new t.CancellationToken(), r = [`v${e}`, e];
			for (let e of r) {
				let r = (0, i.newUrlFromBase)(`projects/${this.options.projectId}/releases/${encodeURIComponent(e)}`, this.baseApiUrl);
				try {
					let e = {
						Accept: "application/json",
						...this.setAuthHeaderForToken(this.options.token || null)
					}, t = await this.httpRequest(r, e, n);
					if (t) return JSON.parse(t);
				} catch (n) {
					if (n instanceof t.HttpError && n.statusCode === 404) continue;
					throw (0, t.newError)(`Unable to find release ${e} on GitLab (${r}): ${n.stack || n.message}`, "ERR_UPDATER_RELEASE_NOT_FOUND");
				}
			}
			throw (0, t.newError)(`Unable to find release with version ${e} (tried: ${r.join(", ")}) on GitLab`, "ERR_UPDATER_RELEASE_NOT_FOUND");
		}
		setAuthHeaderForToken(e) {
			let t = {};
			return e != null && (e.startsWith("Bearer") ? t.authorization = e : t["PRIVATE-TOKEN"] = e), t;
		}
		async getVersionInfoForBlockMap(e) {
			if (this.cachedLatestVersion && this.cachedLatestVersion.version === e) return this.cachedLatestVersion.assets;
			let t = await this.fetchReleaseInfoByVersion(e);
			return t && t.assets ? this.convertAssetsToMap(t.assets) : null;
		}
		async findBlockMapUrlsFromAssets(e, t, n) {
			let i = null, a = null, o = await this.getVersionInfoForBlockMap(t);
			o && (i = this.findBlockMapInAssets(o, n));
			let s = await this.getVersionInfoForBlockMap(e);
			if (s) {
				let i = n.replace(new RegExp(r(t), "g"), e);
				a = this.findBlockMapInAssets(s, i);
			}
			return [a, i];
		}
		async getBlockMapFiles(e, n, r, i = null) {
			if (this.options.uploadTarget === "project_upload") {
				let i = e.pathname.split("/").pop() || "", [a, o] = await this.findBlockMapUrlsFromAssets(n, r, i);
				if (!o) throw (0, t.newError)(`Cannot find blockmap file for ${r} in GitLab assets`, "ERR_UPDATER_BLOCKMAP_FILE_NOT_FOUND");
				if (!a) throw (0, t.newError)(`Cannot find blockmap file for ${n} in GitLab assets`, "ERR_UPDATER_BLOCKMAP_FILE_NOT_FOUND");
				return [a, o];
			}
			return super.getBlockMapFiles(e, n, r, i);
		}
		resolveFiles(e) {
			return (0, a.getFileList)(e).map((r) => {
				let i = [r.url, this.normalizeFilename(r.url)].find((t) => e.assets.has(t)), a = i ? e.assets.get(i) : void 0;
				if (!a) throw (0, t.newError)(`Cannot find asset "${r.url}" in GitLab release assets. Available assets: ${Array.from(e.assets.keys()).join(", ")}`, "ERR_UPDATER_ASSET_NOT_FOUND");
				return {
					url: new n.URL(a),
					info: r
				};
			});
		}
		toString() {
			return `GitLab (projectId: ${this.options.projectId}, channel: ${this.channel})`;
		}
	};
})), En = /* @__PURE__ */ k(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.KeygenProvider = void 0;
	var t = Xe(), n = yn(), r = xn();
	e.KeygenProvider = class extends r.Provider {
		constructor(e, t, r) {
			super({
				...r,
				isUseMultipleRangeRequest: !1
			}), this.configuration = e, this.updater = t, this.defaultHostname = "api.keygen.sh";
			let i = this.configuration.host || this.defaultHostname;
			this.baseUrl = (0, n.newBaseUrl)(`https://${i}/v1/accounts/${this.configuration.account}/artifacts?product=${this.configuration.product}`);
		}
		get channel() {
			return this.updater.channel || this.configuration.channel || "stable";
		}
		async getLatestVersion() {
			let e = new t.CancellationToken(), i = (0, n.getChannelFilename)(this.getCustomChannelName(this.channel)), a = (0, n.newUrlFromBase)(i, this.baseUrl, this.updater.isAddNoCacheQuery);
			try {
				let t = await this.httpRequest(a, {
					Accept: "application/vnd.api+json",
					"Keygen-Version": "1.1"
				}, e);
				return (0, r.parseUpdateInfo)(t, i, a);
			} catch (e) {
				throw (0, t.newError)(`Unable to find latest version on ${this.toString()}, please ensure release exists: ${e.stack || e.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
			}
		}
		resolveFiles(e) {
			return (0, r.resolveFiles)(e, this.baseUrl);
		}
		toString() {
			let { account: e, product: t, platform: n } = this.configuration;
			return `Keygen (account: ${e}, product: ${t}, platform: ${n}, channel: ${this.channel})`;
		}
	};
})), Dn = /* @__PURE__ */ k(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.PrivateGitHubProvider = void 0;
	var t = Xe(), n = bt(), r = P("path"), i = P("url"), a = yn(), o = wn(), s = xn();
	e.PrivateGitHubProvider = class extends o.BaseGitHubProvider {
		constructor(e, t, n, r) {
			super(e, "api.github.com", r), this.updater = t, this.token = n;
		}
		createRequestOptions(e, t) {
			let n = super.createRequestOptions(e, t);
			return n.redirect = "manual", n;
		}
		async getLatestVersion() {
			let e = new t.CancellationToken(), r = (0, a.getChannelFilename)(this.getDefaultChannelName()), o = await this.getLatestVersionInfo(e), s = o.assets.find((e) => e.name === r);
			if (s == null) throw (0, t.newError)(`Cannot find ${r} in the release ${o.html_url || o.name}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
			let c = new i.URL(s.url), l;
			try {
				l = (0, n.load)(await this.httpRequest(c, this.configureHeaders("application/octet-stream"), e));
			} catch (e) {
				throw e instanceof t.HttpError && e.statusCode === 404 ? (0, t.newError)(`Cannot find ${r} in the latest release artifacts (${c}): ${e.stack || e.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : e;
			}
			return l.assets = o.assets, l;
		}
		get fileExtraDownloadHeaders() {
			return this.configureHeaders("application/octet-stream");
		}
		configureHeaders(e) {
			return {
				accept: e,
				authorization: `token ${this.token}`
			};
		}
		async getLatestVersionInfo(e) {
			let n = this.updater.allowPrerelease, r = this.basePath;
			n || (r = `${r}/latest`);
			let i = (0, a.newUrlFromBase)(r, this.baseUrl);
			try {
				let t = JSON.parse(await this.httpRequest(i, this.configureHeaders("application/vnd.github.v3+json"), e));
				if (n) {
					let e = t.filter((e) => !e.draft);
					return e.find((e) => e.prerelease) || e[0];
				}
				return t;
			} catch (e) {
				throw (0, t.newError)(`Unable to find latest version on GitHub (${i}), please ensure a production release exists: ${e.stack || e.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
			}
		}
		get basePath() {
			return this.computeGithubBasePath(`/repos/${this.options.owner}/${this.options.repo}/releases`);
		}
		resolveFiles(e) {
			return (0, s.getFileList)(e).map((n) => {
				let a = r.posix.basename(n.url).replace(/ /g, "-"), o = e.assets.find((e) => e != null && e.name === a);
				if (o == null) throw (0, t.newError)(`Cannot find asset "${a}" in: ${JSON.stringify(e.assets, null, 2)}`, "ERR_UPDATER_ASSET_NOT_FOUND");
				return {
					url: new i.URL(o.url),
					info: n
				};
			});
		}
	};
})), On = /* @__PURE__ */ k(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.isUrlProbablySupportMultiRangeRequests = c, e.createClient = l;
	var t = Xe(), n = Cn(), r = Sn(), i = wn(), a = Tn(), o = En(), s = Dn();
	function c(e) {
		return !e.includes("s3.amazonaws.com");
	}
	function l(e, l, u) {
		if (typeof e == "string") throw (0, t.newError)("Please pass PublishConfiguration object", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
		let d = e.provider;
		switch (d) {
			case "github": {
				let t = e, n = (t.private ? process.env.GH_TOKEN || process.env.GITHUB_TOKEN : null) || t.token;
				return n == null ? new i.GitHubProvider(t, l, u) : new s.PrivateGitHubProvider(t, l, n, u);
			}
			case "bitbucket": return new n.BitbucketProvider(e, l, u);
			case "gitlab": return new a.GitLabProvider(e, l, u);
			case "keygen": return new o.KeygenProvider(e, l, u);
			case "s3":
			case "spaces": return new r.GenericProvider({
				provider: "generic",
				url: (0, t.getS3LikeProviderBaseUrl)(e),
				channel: e.channel || null
			}, l, {
				...u,
				isUseMultipleRangeRequest: !1
			});
			case "generic": {
				let t = e;
				return new r.GenericProvider(t, l, {
					...u,
					isUseMultipleRangeRequest: t.useMultipleRangeRequest !== !1 && c(t.url)
				});
			}
			case "custom": {
				let n = e, r = n.updateProvider;
				if (!r) throw (0, t.newError)("Custom provider not specified", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
				return new r(n, l, u);
			}
			default: throw (0, t.newError)(`Unsupported provider: ${d}`, "ERR_UPDATER_UNSUPPORTED_PROVIDER");
		}
	}
})), kn = /* @__PURE__ */ k(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.OperationKind = void 0, e.computeOperations = n;
	var t;
	(function(e) {
		e[e.COPY = 0] = "COPY", e[e.DOWNLOAD = 1] = "DOWNLOAD";
	})(t || (e.OperationKind = t = {}));
	function n(e, n, r) {
		let s = o(e.files), c = o(n.files), l = null, u = n.files[0], d = [], f = u.name, p = s.get(f);
		if (p == null) throw Error(`no file ${f} in old blockmap`);
		let m = c.get(f), h = 0, { checksumToOffset: g, checksumToOldSize: _ } = a(s.get(f), p.offset, r), v = u.offset;
		for (let e = 0; e < m.checksums.length; v += m.sizes[e], e++) {
			let n = m.sizes[e], a = m.checksums[e], o = g.get(a);
			o != null && _.get(a) !== n && (r.warn(`Checksum ("${a}") matches, but size differs (old: ${_.get(a)}, new: ${n})`), o = void 0), o === void 0 ? (h++, l != null && l.kind === t.DOWNLOAD && l.end === v ? l.end += n : (l = {
				kind: t.DOWNLOAD,
				start: v,
				end: v + n
			}, i(l, d, a, e))) : l != null && l.kind === t.COPY && l.end === o ? l.end += n : (l = {
				kind: t.COPY,
				start: o,
				end: o + n
			}, i(l, d, a, e));
		}
		return h > 0 && r.info(`File${u.name === "file" ? "" : " " + u.name} has ${h} changed blocks`), d;
	}
	var r = process.env.DIFFERENTIAL_DOWNLOAD_PLAN_BUILDER_VALIDATE_RANGES === "true";
	function i(e, n, i, a) {
		if (r && n.length !== 0) {
			let r = n[n.length - 1];
			if (r.kind === e.kind && e.start < r.end && e.start > r.start) {
				let n = [
					r.start,
					r.end,
					e.start,
					e.end
				].reduce((e, t) => e < t ? e : t);
				throw Error(`operation (block index: ${a}, checksum: ${i}, kind: ${t[e.kind]}) overlaps previous operation (checksum: ${i}):\nabs: ${r.start} until ${r.end} and ${e.start} until ${e.end}\nrel: ${r.start - n} until ${r.end - n} and ${e.start - n} until ${e.end - n}`);
			}
		}
		n.push(e);
	}
	function a(e, t, n) {
		let r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), a = t;
		for (let t = 0; t < e.checksums.length; t++) {
			let o = e.checksums[t], s = e.sizes[t], c = i.get(o);
			if (c === void 0) r.set(o, a), i.set(o, s);
			else if (n.debug != null) {
				let e = c === s ? "(same size)" : `(size: ${c}, this size: ${s})`;
				n.debug(`${o} duplicated in blockmap ${e}, it doesn't lead to broken differential downloader, just corresponding block will be skipped)`);
			}
			a += s;
		}
		return {
			checksumToOffset: r,
			checksumToOldSize: i
		};
	}
	function o(e) {
		let t = /* @__PURE__ */ new Map();
		for (let n of e) t.set(n.name, n);
		return t;
	}
})), An = /* @__PURE__ */ k(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.DataSplitter = void 0, e.copyData = s;
	var t = Xe(), n = P("fs"), r = P("stream"), i = kn(), a = Buffer.from("\r\n\r\n"), o;
	(function(e) {
		e[e.INIT = 0] = "INIT", e[e.HEADER = 1] = "HEADER", e[e.BODY = 2] = "BODY";
	})(o ||= {});
	function s(e, t, r, i, a) {
		let o = (0, n.createReadStream)("", {
			fd: r,
			autoClose: !1,
			start: e.start,
			end: e.end - 1
		});
		o.on("error", i), o.once("end", a), o.pipe(t, { end: !1 });
	}
	e.DataSplitter = class extends r.Writable {
		constructor(e, t, n, r, i, a, s, c) {
			super(), this.out = e, this.options = t, this.partIndexToTaskIndex = n, this.partIndexToLength = i, this.finishHandler = a, this.grandTotalBytes = s, this.onProgress = c, this.start = Date.now(), this.nextUpdate = this.start + 1e3, this.transferred = 0, this.delta = 0, this.partIndex = -1, this.headerListBuffer = null, this.readState = o.INIT, this.ignoreByteCount = 0, this.remainingPartDataCount = 0, this.actualPartLength = 0, this.boundaryLength = r.length + 4, this.ignoreByteCount = this.boundaryLength - 2;
		}
		get isFinished() {
			return this.partIndex === this.partIndexToLength.length;
		}
		_write(e, t, n) {
			if (this.isFinished) {
				console.error(`Trailing ignored data: ${e.length} bytes`);
				return;
			}
			this.handleData(e).then(() => {
				if (this.onProgress) {
					let e = Date.now();
					(e >= this.nextUpdate || this.transferred === this.grandTotalBytes) && this.grandTotalBytes && (e - this.start) / 1e3 && (this.nextUpdate = e + 1e3, this.onProgress({
						total: this.grandTotalBytes,
						delta: this.delta,
						transferred: this.transferred,
						percent: this.transferred / this.grandTotalBytes * 100,
						bytesPerSecond: Math.round(this.transferred / ((e - this.start) / 1e3))
					}), this.delta = 0);
				}
				n();
			}).catch(n);
		}
		async handleData(e) {
			let n = 0;
			if (this.ignoreByteCount !== 0 && this.remainingPartDataCount !== 0) throw (0, t.newError)("Internal error", "ERR_DATA_SPLITTER_BYTE_COUNT_MISMATCH");
			if (this.ignoreByteCount > 0) {
				let t = Math.min(this.ignoreByteCount, e.length);
				this.ignoreByteCount -= t, n = t;
			} else if (this.remainingPartDataCount > 0) {
				let t = Math.min(this.remainingPartDataCount, e.length);
				this.remainingPartDataCount -= t, await this.processPartData(e, 0, t), n = t;
			}
			if (n !== e.length) {
				if (this.readState === o.HEADER) {
					let t = this.searchHeaderListEnd(e, n);
					if (t === -1) return;
					n = t, this.readState = o.BODY, this.headerListBuffer = null;
				}
				for (;;) {
					if (this.readState === o.BODY) this.readState = o.INIT;
					else {
						this.partIndex++;
						let r = this.partIndexToTaskIndex.get(this.partIndex);
						if (r == null) {
							if (this.isFinished) r = this.options.end;
							else throw (0, t.newError)("taskIndex is null", "ERR_DATA_SPLITTER_TASK_INDEX_IS_NULL");
						}
						let i = this.partIndex === 0 ? this.options.start : this.partIndexToTaskIndex.get(this.partIndex - 1) + 1;
						if (i < r) await this.copyExistingData(i, r);
						else if (i > r) throw (0, t.newError)("prevTaskIndex must be < taskIndex", "ERR_DATA_SPLITTER_TASK_INDEX_ASSERT_FAILED");
						if (this.isFinished) {
							this.onPartEnd(), this.finishHandler();
							return;
						}
						if (n = this.searchHeaderListEnd(e, n), n === -1) {
							this.readState = o.HEADER;
							return;
						}
					}
					let r = this.partIndexToLength[this.partIndex], i = n + r, a = Math.min(i, e.length);
					if (await this.processPartStarted(e, n, a), this.remainingPartDataCount = r - (a - n), this.remainingPartDataCount > 0) return;
					if (n = i + this.boundaryLength, n >= e.length) {
						this.ignoreByteCount = this.boundaryLength - (e.length - i);
						return;
					}
				}
			}
		}
		copyExistingData(e, t) {
			return new Promise((n, r) => {
				let a = () => {
					if (e === t) {
						n();
						return;
					}
					let o = this.options.tasks[e];
					if (o.kind !== i.OperationKind.COPY) {
						r(/* @__PURE__ */ Error("Task kind must be COPY"));
						return;
					}
					s(o, this.out, this.options.oldFileFd, r, () => {
						e++, a();
					});
				};
				a();
			});
		}
		searchHeaderListEnd(e, t) {
			let n = e.indexOf(a, t);
			if (n !== -1) return n + a.length;
			let r = t === 0 ? e : e.slice(t);
			return this.headerListBuffer = this.headerListBuffer == null ? r : Buffer.concat([this.headerListBuffer, r]), -1;
		}
		onPartEnd() {
			let e = this.partIndexToLength[this.partIndex - 1];
			if (this.actualPartLength !== e) throw (0, t.newError)(`Expected length: ${e} differs from actual: ${this.actualPartLength}`, "ERR_DATA_SPLITTER_LENGTH_MISMATCH");
			this.actualPartLength = 0;
		}
		processPartStarted(e, t, n) {
			return this.partIndex !== 0 && this.onPartEnd(), this.processPartData(e, t, n);
		}
		processPartData(e, t, n) {
			this.actualPartLength += n - t, this.transferred += n - t, this.delta += n - t;
			let r = this.out;
			return r.write(t === 0 && e.length === n ? e : e.slice(t, n)) ? Promise.resolve() : new Promise((e, t) => {
				r.on("error", t), r.once("drain", () => {
					r.removeListener("error", t), e();
				});
			});
		}
	};
})), jn = /* @__PURE__ */ k(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.executeTasksUsingMultipleRangeRequests = i, e.checkIsRangesSupported = o;
	var t = Xe(), n = An(), r = kn();
	function i(e, t, n, r, i) {
		let o = (s) => {
			if (s >= t.length) {
				e.fileMetadataBuffer != null && n.write(e.fileMetadataBuffer), n.end();
				return;
			}
			let c = s + 1e3;
			a(e, {
				tasks: t,
				start: s,
				end: Math.min(t.length, c),
				oldFileFd: r
			}, n, () => o(c), i);
		};
		return o;
	}
	function a(e, i, a, s, c) {
		let l = "bytes=", u = 0, d = 0, f = /* @__PURE__ */ new Map(), p = [];
		for (let e = i.start; e < i.end; e++) {
			let t = i.tasks[e];
			t.kind === r.OperationKind.DOWNLOAD && (l += `${t.start}-${t.end - 1}, `, f.set(u, e), u++, p.push(t.end - t.start), d += t.end - t.start);
		}
		if (u <= 1) {
			let t = (l) => {
				if (l >= i.end) {
					s();
					return;
				}
				let u = i.tasks[l++];
				if (u.kind === r.OperationKind.COPY) (0, n.copyData)(u, a, i.oldFileFd, c, () => t(l));
				else {
					let n = e.createRequestOptions();
					n.headers.Range = `bytes=${u.start}-${u.end - 1}`;
					let r = e.httpExecutor.createRequest(n, (e) => {
						e.on("error", c), o(e, c) && (e.pipe(a, { end: !1 }), e.once("end", () => t(l)));
					});
					e.httpExecutor.addErrorAndTimeoutHandlers(r, c), r.end();
				}
			};
			t(i.start);
			return;
		}
		let m = e.createRequestOptions();
		m.headers.Range = l.substring(0, l.length - 2);
		let h = e.httpExecutor.createRequest(m, (r) => {
			if (!o(r, c)) return;
			let l = (0, t.safeGetHeader)(r, "content-type"), u = /^multipart\/.+?\s*;\s*boundary=(?:"([^"]+)"|([^\s";]+))\s*$/i.exec(l);
			if (u == null) {
				c(/* @__PURE__ */ Error(`Content-Type "multipart/byteranges" is expected, but got "${l}"`));
				return;
			}
			let m = new n.DataSplitter(a, i, f, u[1] || u[2], p, s, d, e.options.onProgress);
			m.on("error", c), r.pipe(m), r.on("end", () => {
				setTimeout(() => {
					h.abort(), c(/* @__PURE__ */ Error("Response ends without calling any handlers"));
				}, 1e4);
			});
		});
		e.httpExecutor.addErrorAndTimeoutHandlers(h, c), h.end();
	}
	function o(e, n) {
		if (e.statusCode >= 400) return n((0, t.createHttpError)(e)), !1;
		if (e.statusCode !== 206) {
			let r = (0, t.safeGetHeader)(e, "accept-ranges");
			if (r == null || r === "none") return n(/* @__PURE__ */ Error(`Server doesn't support Accept-Ranges (response code ${e.statusCode})`)), !1;
		}
		return !0;
	}
})), Mn = /* @__PURE__ */ k(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.ProgressDifferentialDownloadCallbackTransform = void 0;
	var t = P("stream"), n;
	(function(e) {
		e[e.COPY = 0] = "COPY", e[e.DOWNLOAD = 1] = "DOWNLOAD";
	})(n ||= {}), e.ProgressDifferentialDownloadCallbackTransform = class extends t.Transform {
		constructor(e, t, r) {
			super(), this.progressDifferentialDownloadInfo = e, this.cancellationToken = t, this.onProgress = r, this.start = Date.now(), this.transferred = 0, this.delta = 0, this.expectedBytes = 0, this.index = 0, this.operationType = n.COPY, this.nextUpdate = this.start + 1e3;
		}
		_transform(e, t, r) {
			if (this.cancellationToken.cancelled) {
				r(/* @__PURE__ */ Error("cancelled"), null);
				return;
			}
			if (this.operationType == n.COPY) {
				r(null, e);
				return;
			}
			this.transferred += e.length, this.delta += e.length;
			let i = Date.now();
			i >= this.nextUpdate && this.transferred !== this.expectedBytes && this.transferred !== this.progressDifferentialDownloadInfo.grandTotal && (this.nextUpdate = i + 1e3, this.onProgress({
				total: this.progressDifferentialDownloadInfo.grandTotal,
				delta: this.delta,
				transferred: this.transferred,
				percent: this.transferred / this.progressDifferentialDownloadInfo.grandTotal * 100,
				bytesPerSecond: Math.round(this.transferred / ((i - this.start) / 1e3))
			}), this.delta = 0), r(null, e);
		}
		beginFileCopy() {
			this.operationType = n.COPY;
		}
		beginRangeDownload() {
			this.operationType = n.DOWNLOAD, this.expectedBytes += this.progressDifferentialDownloadInfo.expectedByteCounts[this.index++];
		}
		endRangeDownload() {
			this.transferred !== this.progressDifferentialDownloadInfo.grandTotal && this.onProgress({
				total: this.progressDifferentialDownloadInfo.grandTotal,
				delta: this.delta,
				transferred: this.transferred,
				percent: this.transferred / this.progressDifferentialDownloadInfo.grandTotal * 100,
				bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
			});
		}
		_flush(e) {
			if (this.cancellationToken.cancelled) {
				e(/* @__PURE__ */ Error("cancelled"));
				return;
			}
			this.onProgress({
				total: this.progressDifferentialDownloadInfo.grandTotal,
				delta: this.delta,
				transferred: this.transferred,
				percent: 100,
				bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
			}), this.delta = 0, this.transferred = 0, e(null);
		}
	};
})), Nn = /* @__PURE__ */ k(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.DifferentialDownloader = void 0;
	var t = Xe(), n = Ce(), r = P("fs"), i = An(), a = P("url"), o = kn(), s = jn(), c = Mn();
	e.DifferentialDownloader = class {
		constructor(e, t, n) {
			this.blockAwareFileInfo = e, this.httpExecutor = t, this.options = n, this.fileMetadataBuffer = null, this.logger = n.logger;
		}
		createRequestOptions() {
			let e = { headers: {
				...this.options.requestHeaders,
				accept: "*/*"
			} };
			return (0, t.configureRequestUrl)(this.options.newUrl, e), (0, t.configureRequestOptions)(e), e;
		}
		doDownload(e, t) {
			if (e.version !== t.version) throw Error(`version is different (${e.version} - ${t.version}), full download is required`);
			let n = this.logger, r = (0, o.computeOperations)(e, t, n);
			n.debug != null && n.debug(JSON.stringify(r, null, 2));
			let i = 0, a = 0;
			for (let e of r) {
				let t = e.end - e.start;
				e.kind === o.OperationKind.DOWNLOAD ? i += t : a += t;
			}
			let s = this.blockAwareFileInfo.size;
			if (i + a + (this.fileMetadataBuffer == null ? 0 : this.fileMetadataBuffer.length) !== s) throw Error(`Internal error, size mismatch: downloadSize: ${i}, copySize: ${a}, newSize: ${s}`);
			return n.info(`Full: ${l(s)}, To download: ${l(i)} (${Math.round(i / (s / 100))}%)`), this.downloadFile(r);
		}
		downloadFile(e) {
			let t = [], r = () => Promise.all(t.map((e) => (0, n.close)(e.descriptor).catch((t) => {
				this.logger.error(`cannot close file "${e.path}": ${t}`);
			})));
			return this.doDownloadFile(e, t).then(r).catch((e) => r().catch((t) => {
				try {
					this.logger.error(`cannot close files: ${t}`);
				} catch (e) {
					try {
						console.error(e);
					} catch {}
				}
				throw e;
			}).then(() => {
				throw e;
			}));
		}
		async doDownloadFile(e, l) {
			let d = await (0, n.open)(this.options.oldFile, "r");
			l.push({
				descriptor: d,
				path: this.options.oldFile
			});
			let f = await (0, n.open)(this.options.newFile, "w");
			l.push({
				descriptor: f,
				path: this.options.newFile
			});
			let p = (0, r.createWriteStream)(this.options.newFile, { fd: f });
			await new Promise((n, r) => {
				let f = [], m;
				if (!this.options.isUseMultipleRangeRequest && this.options.onProgress) {
					let t = [], n = 0;
					for (let r of e) r.kind === o.OperationKind.DOWNLOAD && (t.push(r.end - r.start), n += r.end - r.start);
					let r = {
						expectedByteCounts: t,
						grandTotal: n
					};
					m = new c.ProgressDifferentialDownloadCallbackTransform(r, this.options.cancellationToken, this.options.onProgress), f.push(m);
				}
				let h = new t.DigestTransform(this.blockAwareFileInfo.sha512);
				h.isValidateOnEnd = !1, f.push(h), p.on("finish", () => {
					p.close(() => {
						l.splice(1, 1);
						try {
							h.validate();
						} catch (e) {
							r(e);
							return;
						}
						n(void 0);
					});
				}), f.push(p);
				let g = null;
				for (let e of f) e.on("error", r), g = g == null ? e : g.pipe(e);
				let _ = f[0], v;
				if (this.options.isUseMultipleRangeRequest) {
					v = (0, s.executeTasksUsingMultipleRangeRequests)(this, e, _, d, r), v(0);
					return;
				}
				let y = 0, b = null;
				this.logger.info(`Differential download: ${this.options.newUrl}`);
				let x = this.createRequestOptions();
				x.redirect = "manual", v = (n) => {
					var s, c;
					if (n >= e.length) {
						this.fileMetadataBuffer != null && _.write(this.fileMetadataBuffer), _.end();
						return;
					}
					let l = e[n++];
					if (l.kind === o.OperationKind.COPY) {
						m && m.beginFileCopy(), (0, i.copyData)(l, _, d, r, () => v(n));
						return;
					}
					let f = `bytes=${l.start}-${l.end - 1}`;
					x.headers.range = f, (c = (s = this.logger)?.debug) == null || c.call(s, `download range: ${f}`), m && m.beginRangeDownload();
					let p = this.httpExecutor.createRequest(x, (e) => {
						e.on("error", r), e.on("aborted", () => {
							r(/* @__PURE__ */ Error("response has been aborted by the server"));
						}), e.statusCode >= 400 && r((0, t.createHttpError)(e)), e.pipe(_, { end: !1 }), e.once("end", () => {
							m && m.endRangeDownload(), ++y === 100 ? (y = 0, setTimeout(() => v(n), 1e3)) : v(n);
						});
					});
					p.on("redirect", (e, n, r) => {
						this.logger.info(`Redirect to ${u(r)}`), b = r, (0, t.configureRequestUrl)(new a.URL(b), x), p.followRedirect();
					}), this.httpExecutor.addErrorAndTimeoutHandlers(p, r), p.end();
				}, v(0);
			});
		}
		async readRemoteBytes(e, t) {
			let n = Buffer.allocUnsafe(t + 1 - e), r = this.createRequestOptions();
			r.headers.range = `bytes=${e}-${t}`;
			let i = 0;
			if (await this.request(r, (e) => {
				e.copy(n, i), i += e.length;
			}), i !== n.length) throw Error(`Received data length ${i} is not equal to expected ${n.length}`);
			return n;
		}
		request(e, t) {
			return new Promise((n, r) => {
				let i = this.httpExecutor.createRequest(e, (e) => {
					(0, s.checkIsRangesSupported)(e, r) && (e.on("error", r), e.on("aborted", () => {
						r(/* @__PURE__ */ Error("response has been aborted by the server"));
					}), e.on("data", t), e.on("end", () => n()));
				});
				this.httpExecutor.addErrorAndTimeoutHandlers(i, r), i.end();
			});
		}
	};
	function l(e, t = " KB") {
		return new Intl.NumberFormat("en").format((e / 1024).toFixed(2)) + t;
	}
	function u(e) {
		let t = e.indexOf("?");
		return t < 0 ? e : e.substring(0, t);
	}
})), Pn = /* @__PURE__ */ k(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.GenericDifferentialDownloader = void 0;
	var t = Nn();
	e.GenericDifferentialDownloader = class extends t.DifferentialDownloader {
		download(e, t) {
			return this.doDownload(e, t);
		}
	};
})), Fn = /* @__PURE__ */ k(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.UpdaterSignal = e.UPDATE_DOWNLOADED = e.DOWNLOAD_PROGRESS = e.CancellationToken = void 0, e.addHandler = n;
	var t = Xe();
	Object.defineProperty(e, "CancellationToken", {
		enumerable: !0,
		get: function() {
			return t.CancellationToken;
		}
	}), e.DOWNLOAD_PROGRESS = "download-progress", e.UPDATE_DOWNLOADED = "update-downloaded", e.UpdaterSignal = class {
		constructor(e) {
			this.emitter = e;
		}
		login(e) {
			n(this.emitter, "login", e);
		}
		progress(t) {
			n(this.emitter, e.DOWNLOAD_PROGRESS, t);
		}
		updateDownloaded(t) {
			n(this.emitter, e.UPDATE_DOWNLOADED, t);
		}
		updateCancelled(e) {
			n(this.emitter, "update-cancelled", e);
		}
	};
	function n(e, t, n) {
		e.on(t, n);
	}
})), In = /* @__PURE__ */ k(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.NoOpLogger = e.AppUpdater = void 0;
	var t = Xe(), n = P("crypto"), r = P("os"), i = P("events"), a = Ce(), o = bt(), s = xt(), c = P("path"), l = pn(), u = hn(), d = _n(), f = vn(), p = Sn(), m = On(), h = P("zlib"), g = Pn(), _ = Fn();
	e.AppUpdater = class e extends i.EventEmitter {
		get channel() {
			return this._channel;
		}
		set channel(e) {
			if (this._channel != null) {
				if (typeof e != "string") throw (0, t.newError)(`Channel must be a string, but got: ${e}`, "ERR_UPDATER_INVALID_CHANNEL");
				if (e.length === 0) throw (0, t.newError)("Channel must be not an empty string", "ERR_UPDATER_INVALID_CHANNEL");
			}
			this._channel = e, this.allowDowngrade = !0;
		}
		addAuthHeader(e) {
			this.requestHeaders = Object.assign({}, this.requestHeaders, { authorization: e });
		}
		get netSession() {
			return (0, f.getNetSession)();
		}
		get logger() {
			return this._logger;
		}
		set logger(e) {
			this._logger = e ?? new y();
		}
		set updateConfigPath(e) {
			this.clientPromise = null, this._appUpdateConfigPath = e, this.configOnDisk = new s.Lazy(() => this.loadUpdateConfig());
		}
		get isUpdateSupported() {
			return this._isUpdateSupported;
		}
		set isUpdateSupported(e) {
			e && (this._isUpdateSupported = e);
		}
		get isUserWithinRollout() {
			return this._isUserWithinRollout;
		}
		set isUserWithinRollout(e) {
			e && (this._isUserWithinRollout = e);
		}
		constructor(e, n) {
			super(), this.autoDownload = !0, this.autoInstallOnAppQuit = !0, this.autoRunAppAfterInstall = !0, this.allowPrerelease = !1, this.fullChangelog = !1, this.allowDowngrade = !1, this.disableWebInstaller = !1, this.disableDifferentialDownload = !1, this.forceDevUpdateConfig = !1, this.previousBlockmapBaseUrlOverride = null, this._channel = null, this.downloadedUpdateHelper = null, this.requestHeaders = null, this._logger = console, this.signals = new _.UpdaterSignal(this), this._appUpdateConfigPath = null, this._isUpdateSupported = (e) => this.checkIfUpdateSupported(e), this._isUserWithinRollout = (e) => this.isStagingMatch(e), this.clientPromise = null, this.stagingUserIdPromise = new s.Lazy(() => this.getOrCreateStagingUserId()), this.configOnDisk = new s.Lazy(() => this.loadUpdateConfig()), this.checkForUpdatesPromise = null, this.downloadPromise = null, this.updateInfoAndProvider = null, this._testOnlyOptions = null, this.on("error", (e) => {
				this._logger.error(`Error: ${e.stack || e.message}`);
			}), n == null ? (this.app = new d.ElectronAppAdapter(), this.httpExecutor = new f.ElectronHttpExecutor((e, t) => this.emit("login", e, t))) : (this.app = n, this.httpExecutor = null);
			let r = this.app.version, i = (0, l.parse)(r);
			if (i == null) throw (0, t.newError)(`App version is not a valid semver version: "${r}"`, "ERR_UPDATER_INVALID_VERSION");
			this.currentVersion = i, this.allowPrerelease = v(i), e != null && (this.setFeedURL(e), typeof e != "string" && e.requestHeaders && (this.requestHeaders = e.requestHeaders));
		}
		getFeedURL() {
			return "Deprecated. Do not use it.";
		}
		setFeedURL(e) {
			let t = this.createProviderRuntimeOptions(), n;
			n = typeof e == "string" ? new p.GenericProvider({
				provider: "generic",
				url: e
			}, this, {
				...t,
				isUseMultipleRangeRequest: (0, m.isUrlProbablySupportMultiRangeRequests)(e)
			}) : (0, m.createClient)(e, this, t), this.clientPromise = Promise.resolve(n);
		}
		checkForUpdates() {
			if (!this.isUpdaterActive()) return Promise.resolve(null);
			let e = this.checkForUpdatesPromise;
			if (e != null) return this._logger.info("Checking for update (already in progress)"), e;
			let t = () => this.checkForUpdatesPromise = null;
			return this._logger.info("Checking for update"), e = this.doCheckForUpdates().then((e) => (t(), e)).catch((e) => {
				throw t(), this.emit("error", e, `Cannot check for updates: ${(e.stack || e).toString()}`), e;
			}), this.checkForUpdatesPromise = e, e;
		}
		isUpdaterActive() {
			return this.app.isPackaged || this.forceDevUpdateConfig ? !0 : (this._logger.info("Skip checkForUpdates because application is not packed and dev update config is not forced"), !1);
		}
		checkForUpdatesAndNotify(t) {
			return this.checkForUpdates().then((n) => n?.downloadPromise ? (n.downloadPromise.then(() => {
				let r = e.formatDownloadNotification(n.updateInfo.version, this.app.name, t);
				new (P("electron")).Notification(r).show();
			}), n) : (this._logger.debug != null && this._logger.debug("checkForUpdatesAndNotify called, downloadPromise is null"), n));
		}
		static formatDownloadNotification(e, t, n) {
			return n ??= {
				title: "A new update is ready to install",
				body: "{appName} version {version} has been downloaded and will be automatically installed on exit"
			}, n = {
				title: n.title.replace("{appName}", t).replace("{version}", e),
				body: n.body.replace("{appName}", t).replace("{version}", e)
			}, n;
		}
		async isStagingMatch(e) {
			let n = e.stagingPercentage, r = n;
			if (r == null) return !0;
			if (r = parseInt(r, 10), isNaN(r)) return this._logger.warn(`Staging percentage is NaN: ${n}`), !0;
			r /= 100;
			let i = await this.stagingUserIdPromise.value, a = t.UUID.parse(i).readUInt32BE(12) / 4294967295;
			return this._logger.info(`Staging percentage: ${r}, percentage: ${a}, user id: ${i}`), a < r;
		}
		computeFinalHeaders(e) {
			return this.requestHeaders != null && Object.assign(e, this.requestHeaders), e;
		}
		async isUpdateAvailable(e) {
			let n = (0, l.parse)(e.version);
			if (n == null) throw (0, t.newError)(`This file could not be downloaded, or the latest version (from update server) does not have a valid semver version: "${e.version}"`, "ERR_UPDATER_INVALID_VERSION");
			let r = this.currentVersion;
			if ((0, l.eq)(n, r) || !await Promise.resolve(this.isUpdateSupported(e)) || !await Promise.resolve(this.isUserWithinRollout(e))) return !1;
			let i = (0, l.gt)(n, r), a = (0, l.lt)(n, r);
			return i ? !0 : this.allowDowngrade && a;
		}
		checkIfUpdateSupported(e) {
			let t = e?.minimumSystemVersion, n = (0, r.release)();
			if (t) try {
				if ((0, l.lt)(n, t)) return this._logger.info(`Current OS version ${n} is less than the minimum OS version required ${t} for version ${n}`), !1;
			} catch (e) {
				this._logger.warn(`Failed to compare current OS version(${n}) with minimum OS version(${t}): ${(e.message || e).toString()}`);
			}
			return !0;
		}
		async getUpdateInfoAndProvider() {
			await this.app.whenReady(), this.clientPromise ??= this.configOnDisk.value.then((e) => (0, m.createClient)(e, this, this.createProviderRuntimeOptions()));
			let e = await this.clientPromise, t = await this.stagingUserIdPromise.value;
			return e.setRequestHeaders(this.computeFinalHeaders({ "x-user-staging-id": t })), {
				info: await e.getLatestVersion(),
				provider: e
			};
		}
		createProviderRuntimeOptions() {
			return {
				isUseMultipleRangeRequest: !0,
				platform: this._testOnlyOptions == null ? process.platform : this._testOnlyOptions.platform,
				executor: this.httpExecutor
			};
		}
		async doCheckForUpdates() {
			this.emit("checking-for-update");
			let e = await this.getUpdateInfoAndProvider(), n = e.info;
			if (!await this.isUpdateAvailable(n)) return this._logger.info(`Update for version ${this.currentVersion.format()} is not available (latest version: ${n.version}, downgrade is ${this.allowDowngrade ? "allowed" : "disallowed"}).`), this.emit("update-not-available", n), {
				isUpdateAvailable: !1,
				versionInfo: n,
				updateInfo: n
			};
			this.updateInfoAndProvider = e, this.onUpdateAvailable(n);
			let r = new t.CancellationToken();
			return {
				isUpdateAvailable: !0,
				versionInfo: n,
				updateInfo: n,
				cancellationToken: r,
				downloadPromise: this.autoDownload ? this.downloadUpdate(r) : null
			};
		}
		onUpdateAvailable(e) {
			this._logger.info(`Found version ${e.version} (url: ${(0, t.asArray)(e.files).map((e) => e.url).join(", ")})`), this.emit("update-available", e);
		}
		downloadUpdate(e = new t.CancellationToken()) {
			let n = this.updateInfoAndProvider;
			if (n == null) {
				let e = /* @__PURE__ */ Error("Please check update first");
				return this.dispatchError(e), Promise.reject(e);
			}
			if (this.downloadPromise != null) return this._logger.info("Downloading update (already in progress)"), this.downloadPromise;
			this._logger.info(`Downloading update from ${(0, t.asArray)(n.info.files).map((e) => e.url).join(", ")}`);
			let r = (e) => {
				if (!(e instanceof t.CancellationError)) try {
					this.dispatchError(e);
				} catch (e) {
					this._logger.warn(`Cannot dispatch error event: ${e.stack || e}`);
				}
				return e;
			};
			return this.downloadPromise = this.doDownloadUpdate({
				updateInfoAndProvider: n,
				requestHeaders: this.computeRequestHeaders(n.provider),
				cancellationToken: e,
				disableWebInstaller: this.disableWebInstaller,
				disableDifferentialDownload: this.disableDifferentialDownload
			}).catch((e) => {
				throw r(e);
			}).finally(() => {
				this.downloadPromise = null;
			}), this.downloadPromise;
		}
		dispatchError(e) {
			this.emit("error", e, (e.stack || e).toString());
		}
		dispatchUpdateDownloaded(e) {
			this.emit(_.UPDATE_DOWNLOADED, e);
		}
		async loadUpdateConfig() {
			return this._appUpdateConfigPath ??= this.app.appUpdateConfigPath, (0, o.load)(await (0, a.readFile)(this._appUpdateConfigPath, "utf-8"));
		}
		computeRequestHeaders(e) {
			let t = e.fileExtraDownloadHeaders;
			if (t != null) {
				let e = this.requestHeaders;
				return e == null ? t : {
					...t,
					...e
				};
			}
			return this.computeFinalHeaders({ accept: "*/*" });
		}
		async getOrCreateStagingUserId() {
			let e = c.join(this.app.userDataPath, ".updaterId");
			try {
				let n = await (0, a.readFile)(e, "utf-8");
				if (t.UUID.check(n)) return n;
				this._logger.warn(`Staging user id file exists, but content was invalid: ${n}`);
			} catch (e) {
				e.code !== "ENOENT" && this._logger.warn(`Couldn't read staging user ID, creating a blank one: ${e}`);
			}
			let r = t.UUID.v5((0, n.randomBytes)(4096), t.UUID.OID);
			this._logger.info(`Generated new staging user ID: ${r}`);
			try {
				await (0, a.outputFile)(e, r);
			} catch (e) {
				this._logger.warn(`Couldn't write out staging user ID: ${e}`);
			}
			return r;
		}
		get isAddNoCacheQuery() {
			let e = this.requestHeaders;
			if (e == null) return !0;
			for (let t of Object.keys(e)) {
				let e = t.toLowerCase();
				if (e === "authorization" || e === "private-token") return !1;
			}
			return !0;
		}
		async getOrCreateDownloadHelper() {
			let e = this.downloadedUpdateHelper;
			if (e == null) {
				let t = (await this.configOnDisk.value).updaterCacheDirName, n = this._logger;
				t ?? n.error("updaterCacheDirName is not specified in app-update.yml Was app build using at least electron-builder 20.34.0?");
				let r = c.join(this.app.baseCachePath, t || this.app.name);
				n.debug != null && n.debug(`updater cache dir: ${r}`), e = new u.DownloadedUpdateHelper(r), this.downloadedUpdateHelper = e;
			}
			return e;
		}
		async executeDownload(e) {
			let n = e.fileInfo, r = {
				headers: e.downloadUpdateOptions.requestHeaders,
				cancellationToken: e.downloadUpdateOptions.cancellationToken,
				sha2: n.info.sha2,
				sha512: n.info.sha512
			};
			this.listenerCount(_.DOWNLOAD_PROGRESS) > 0 && (r.onProgress = (e) => this.emit(_.DOWNLOAD_PROGRESS, e));
			let i = e.downloadUpdateOptions.updateInfoAndProvider.info, o = i.version, s = n.packageInfo;
			function l() {
				let t = decodeURIComponent(e.fileInfo.url.pathname);
				return t.toLowerCase().endsWith(`.${e.fileExtension.toLowerCase()}`) ? c.basename(t) : c.basename(e.fileInfo.info.url);
			}
			let d = await this.getOrCreateDownloadHelper(), f = d.cacheDirForPendingUpdate;
			await (0, a.mkdir)(f, { recursive: !0 });
			let p = l(), m = c.join(f, p), h = s == null ? null : c.join(f, `package-${o}${c.extname(s.path) || ".7z"}`), g = async (t) => {
				await d.setDownloadedFile(m, h, i, n, p, t), await e.done({
					...i,
					downloadedFile: m
				});
				let r = c.join(f, "current.blockmap");
				return await (0, a.pathExists)(r) && await (0, a.copyFile)(r, c.join(d.cacheDir, "current.blockmap")), h == null ? [m] : [m, h];
			}, v = this._logger, y = await d.validateDownloadedPath(m, i, n, v);
			if (y != null) return m = y, await g(!1);
			let b = async () => (await d.clear().catch(() => {}), await (0, a.unlink)(m).catch(() => {})), x = await (0, u.createTempUpdateFile)(`temp-${p}`, f, v);
			try {
				await e.task(x, r, h, b), await (0, t.retry)(() => (0, a.rename)(x, m), {
					retries: 60,
					interval: 500,
					shouldRetry: (e) => e instanceof Error && /^EBUSY:/.test(e.message) ? !0 : (v.warn(`Cannot rename temp file to final file: ${e.message || e.stack}`), !1)
				});
			} catch (e) {
				throw await b(), e instanceof t.CancellationError && (v.info("cancelled"), this.emit("update-cancelled", i)), e;
			}
			return v.info(`New version ${o} has been downloaded to ${m}`), await g(!0);
		}
		async differentialDownloadInstaller(e, t, n, r, i) {
			try {
				if (this._testOnlyOptions != null && !this._testOnlyOptions.isUseDifferentialDownload) return !0;
				let r = t.updateInfoAndProvider.provider, o = await r.getBlockMapFiles(e.url, this.app.version, t.updateInfoAndProvider.info.version, this.previousBlockmapBaseUrlOverride);
				this._logger.info(`Download block maps (old: "${o[0]}", new: ${o[1]})`);
				let s = async (e) => {
					let n = await this.httpExecutor.downloadToBuffer(e, {
						headers: t.requestHeaders,
						cancellationToken: t.cancellationToken
					});
					if (n == null || n.length === 0) throw Error(`Blockmap "${e.href}" is empty`);
					try {
						return JSON.parse((0, h.gunzipSync)(n).toString());
					} catch (t) {
						throw Error(`Cannot parse blockmap "${e.href}", error: ${t}`);
					}
				}, l = {
					newUrl: e.url,
					oldFile: c.join(this.downloadedUpdateHelper.cacheDir, i),
					logger: this._logger,
					newFile: n,
					isUseMultipleRangeRequest: r.isUseMultipleRangeRequest,
					requestHeaders: t.requestHeaders,
					cancellationToken: t.cancellationToken
				};
				this.listenerCount(_.DOWNLOAD_PROGRESS) > 0 && (l.onProgress = (e) => this.emit(_.DOWNLOAD_PROGRESS, e));
				let u = async (e, t) => {
					let n = c.join(t, "current.blockmap");
					await (0, a.outputFile)(n, (0, h.gzipSync)(JSON.stringify(e)));
				}, d = async (e) => {
					let t = c.join(e, "current.blockmap");
					try {
						if (await (0, a.pathExists)(t)) return JSON.parse((0, h.gunzipSync)(await (0, a.readFile)(t)).toString());
					} catch (e) {
						this._logger.warn(`Cannot parse blockmap "${t}", error: ${e}`);
					}
					return null;
				}, f = await s(o[1]);
				await u(f, this.downloadedUpdateHelper.cacheDirForPendingUpdate);
				let p = await d(this.downloadedUpdateHelper.cacheDir);
				return p ??= await s(o[0]), await new g.GenericDifferentialDownloader(e.info, this.httpExecutor, l).download(p, f), !1;
			} catch (e) {
				if (this._logger.error(`Cannot download differentially, fallback to full download: ${e.stack || e}`), this._testOnlyOptions != null) throw e;
				return !0;
			}
		}
	};
	function v(e) {
		let t = (0, l.prerelease)(e);
		return t != null && t.length > 0;
	}
	var y = class {
		info(e) {}
		warn(e) {}
		error(e) {}
	};
	e.NoOpLogger = y;
})), Ln = /* @__PURE__ */ k(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.BaseUpdater = void 0;
	var t = P("child_process"), n = P("path"), r = In();
	e.BaseUpdater = class extends r.AppUpdater {
		constructor(e, t) {
			super(e, t), this.quitAndInstallCalled = !1, this.quitHandlerAdded = !1;
		}
		quitAndInstall(e = !1, t = !1) {
			this._logger.info("Install on explicit quitAndInstall"), this.install(e, e ? t : this.autoRunAppAfterInstall) ? setImmediate(() => {
				P("electron").autoUpdater.emit("before-quit-for-update"), this.app.quit();
			}) : this.quitAndInstallCalled = !1;
		}
		executeDownload(e) {
			return super.executeDownload({
				...e,
				done: (e) => (this.dispatchUpdateDownloaded(e), this.addQuitHandler(), Promise.resolve())
			});
		}
		get installerPath() {
			return this.downloadedUpdateHelper == null ? null : this.downloadedUpdateHelper.file;
		}
		install(e = !1, t = !1) {
			if (this.quitAndInstallCalled) return this._logger.warn("install call ignored: quitAndInstallCalled is set to true"), !1;
			let n = this.downloadedUpdateHelper, r = this.installerPath, i = n == null ? null : n.downloadedFileInfo;
			if (r == null || i == null) return this.dispatchError(/* @__PURE__ */ Error("No update filepath provided, can't quit and install")), !1;
			this.quitAndInstallCalled = !0;
			try {
				return this._logger.info(`Install: isSilent: ${e}, isForceRunAfter: ${t}`), this.doInstall({
					isSilent: e,
					isForceRunAfter: t,
					isAdminRightsRequired: i.isAdminRightsRequired
				});
			} catch (e) {
				return this.dispatchError(e), !1;
			}
		}
		addQuitHandler() {
			!this.quitHandlerAdded && this.autoInstallOnAppQuit && (this.quitHandlerAdded = !0, this.app.onQuit((e) => {
				if (this.quitAndInstallCalled) {
					this._logger.info("Update installer has already been triggered. Quitting application.");
					return;
				}
				if (!this.autoInstallOnAppQuit) {
					this._logger.info("Update will not be installed on quit because autoInstallOnAppQuit is set to false.");
					return;
				}
				if (e !== 0) {
					this._logger.info(`Update will be not installed on quit because application is quitting with exit code ${e}`);
					return;
				}
				this._logger.info("Auto install update on quit"), this.install(!0, !1);
			}));
		}
		sanitizeEnvPath(e) {
			return e.split(n.delimiter).filter((e) => n.isAbsolute(e)).join(n.delimiter);
		}
		spawnSyncLog(e, n = [], r = {}) {
			this._logger.info(`Executing: ${e} with args: ${n}`);
			let i = {
				...process.env,
				...r
			}, { error: a, status: o, stdout: s, stderr: c } = (0, t.spawnSync)(e, n, {
				env: {
					...i,
					PATH: this.sanitizeEnvPath(i.PATH ?? "")
				},
				encoding: "utf-8",
				shell: !0
			});
			if (a != null) throw this._logger.error(c), a;
			if (o != null && o !== 0) throw this._logger.error(c), Error(`Command ${e} exited with code ${o}`);
			return s.trim();
		}
		async spawnLog(e, n = [], r = void 0, i = "ignore") {
			return this._logger.info(`Executing: ${e} with args: ${n}`), new Promise((a, o) => {
				try {
					let s = {
						stdio: i,
						env: r,
						detached: !0
					}, c = (0, t.spawn)(e, n, s);
					c.on("error", (e) => {
						o(e);
					}), c.unref(), c.pid !== void 0 && a(!0);
				} catch (e) {
					o(e);
				}
			});
		}
	};
})), Rn = /* @__PURE__ */ k(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.FileWithEmbeddedBlockMapDifferentialDownloader = void 0;
	var t = Ce(), n = Nn(), r = P("zlib");
	e.FileWithEmbeddedBlockMapDifferentialDownloader = class extends n.DifferentialDownloader {
		async download() {
			let e = this.blockAwareFileInfo, t = e.size, n = t - (e.blockMapSize + 4);
			this.fileMetadataBuffer = await this.readRemoteBytes(n, t - 1);
			let r = i(this.fileMetadataBuffer.slice(0, this.fileMetadataBuffer.length - 4));
			await this.doDownload(await a(this.options.oldFile), r);
		}
	};
	function i(e) {
		return JSON.parse((0, r.inflateRawSync)(e).toString());
	}
	async function a(e) {
		let n = await (0, t.open)(e, "r");
		try {
			let e = (await (0, t.fstat)(n)).size, r = Buffer.allocUnsafe(4);
			await (0, t.read)(n, r, 0, r.length, e - r.length);
			let a = Buffer.allocUnsafe(r.readUInt32BE(0));
			return await (0, t.read)(n, a, 0, a.length, e - r.length - a.length), await (0, t.close)(n), i(a);
		} catch (e) {
			throw await (0, t.close)(n), e;
		}
	}
})), zn = /* @__PURE__ */ k(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.AppImageUpdater = void 0;
	var t = Xe(), n = P("child_process"), r = Ce(), i = P("fs"), a = P("path"), o = Ln(), s = Rn(), c = xn(), l = Fn();
	e.AppImageUpdater = class extends o.BaseUpdater {
		constructor(e, t) {
			super(e, t);
		}
		isUpdaterActive() {
			return process.env.APPIMAGE == null && !this.forceDevUpdateConfig ? (process.env.SNAP == null ? this._logger.warn("APPIMAGE env is not defined, current application is not an AppImage") : this._logger.info("SNAP env is defined, updater is disabled"), !1) : super.isUpdaterActive();
		}
		doDownloadUpdate(e) {
			let n = e.updateInfoAndProvider.provider, i = (0, c.findFile)(n.resolveFiles(e.updateInfoAndProvider.info), "AppImage", [
				"rpm",
				"deb",
				"pacman"
			]);
			return this.executeDownload({
				fileExtension: "AppImage",
				fileInfo: i,
				downloadUpdateOptions: e,
				task: async (a, o) => {
					let s = process.env.APPIMAGE;
					if (s == null) throw (0, t.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
					(e.disableDifferentialDownload || await this.downloadDifferential(i, s, a, n, e)) && await this.httpExecutor.download(i.url, a, o), await (0, r.chmod)(a, 493);
				}
			});
		}
		async downloadDifferential(e, t, n, r, i) {
			try {
				let a = {
					newUrl: e.url,
					oldFile: t,
					logger: this._logger,
					newFile: n,
					isUseMultipleRangeRequest: r.isUseMultipleRangeRequest,
					requestHeaders: i.requestHeaders,
					cancellationToken: i.cancellationToken
				};
				return this.listenerCount(l.DOWNLOAD_PROGRESS) > 0 && (a.onProgress = (e) => this.emit(l.DOWNLOAD_PROGRESS, e)), await new s.FileWithEmbeddedBlockMapDifferentialDownloader(e.info, this.httpExecutor, a).download(), !1;
			} catch (e) {
				return this._logger.error(`Cannot download differentially, fallback to full download: ${e.stack || e}`), process.platform === "linux";
			}
		}
		doInstall(e) {
			let r = process.env.APPIMAGE;
			if (r == null) throw (0, t.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
			if (!a.isAbsolute(r) || r.includes("\0")) throw (0, t.newError)(`APPIMAGE env is not a valid absolute path: "${r}"`, "ERR_UPDATER_OLD_FILE_NOT_FOUND");
			(0, i.unlinkSync)(r);
			let o, s = a.basename(r), c = this.installerPath;
			if (c == null) return this.dispatchError(/* @__PURE__ */ Error("No update filepath provided, can't quit and install")), !1;
			o = a.basename(c) === s || !/\d+\.\d+\.\d+/.test(s) ? r : a.join(a.dirname(r), a.basename(c)), (0, n.execFileSync)("mv", [
				"-f",
				c,
				o
			]), o !== r && this.emit("appimage-filename-updated", o);
			let l = {
				...process.env,
				APPIMAGE_SILENT_INSTALL: "true"
			};
			return e.isForceRunAfter ? this.spawnLog(o, [], l) : (l.APPIMAGE_EXIT_AFTER_INSTALL = "true", (0, n.execFileSync)(o, [], { env: l })), !0;
		}
	};
})), Bn = /* @__PURE__ */ k(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.LinuxUpdater = void 0;
	var t = Ln(), n = /^[a-zA-Z0-9_-]+$/;
	e.LinuxUpdater = class extends t.BaseUpdater {
		constructor(e, t) {
			super(e, t);
		}
		isRunningAsRoot() {
			return process.getuid?.call(process) === 0;
		}
		get installerPath() {
			let e = super.installerPath;
			return e == null ? null : e.replace(/\\/g, "\\\\").replace(/([`$!" ;|&()<>])/g, "\\$1").replace(/[\n\r]/g, "");
		}
		runCommandWithSudoIfNeeded(e) {
			if (this.isRunningAsRoot()) return this._logger.info("Running as root, no need to use sudo"), this.spawnSyncLog(e[0], e.slice(1));
			let { name: t } = this.app, n = `"${t.replace(/["`$\\!\n\r;|&<>(){}*?[\]#~]/g, "")} would like to update"`, r = this.sudoWithArgs(n);
			this._logger.info(`Running as non-root user, using sudo to install: ${r}`);
			let i = "\"";
			return (/pkexec/i.test(r[0]) || r[0] === "sudo") && (i = ""), this.spawnSyncLog(r[0], [
				...r.length > 1 ? r.slice(1) : [],
				`${i}/bin/bash`,
				"-c",
				`'${e.join(" ")}'${i}`
			]);
		}
		sudoWithArgs(e) {
			let t = this.determineSudoCommand(), n = [t];
			return /kdesudo/i.test(t) ? (n.push("--comment", e), n.push("-c")) : /gksudo/i.test(t) ? n.push("--message", e) : /pkexec/i.test(t) && n.push("--disable-internal-agent"), n;
		}
		hasCommand(e) {
			try {
				return this.spawnSyncLog("command", ["-v", e]), !0;
			} catch {
				return !1;
			}
		}
		determineSudoCommand() {
			for (let e of [
				"gksudo",
				"kdesudo",
				"pkexec",
				"beesu"
			]) if (this.hasCommand(e)) return e;
			return "sudo";
		}
		detectPackageManager(e) {
			let t = e, r = process.env.ELECTRON_BUILDER_LINUX_PACKAGE_MANAGER?.trim();
			r && (n.test(r) ? t = [r] : this._logger.warn(`ELECTRON_BUILDER_LINUX_PACKAGE_MANAGER "${r}" contains unsafe characters. Ignoring override.`));
			for (let e of t) if (this.hasCommand(e)) return e;
			let i = r ? `ELECTRON_BUILDER_LINUX_PACKAGE_MANAGER override "${r}", ` : "", a = e[0];
			return this._logger.warn(`No package manager found in the list: ${i}${e.join(", ")}. Utilizing default: ${a}`), a;
		}
	};
})), Vn = /* @__PURE__ */ k(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.DebUpdater = void 0;
	var t = xn(), n = Fn(), r = Bn();
	e.DebUpdater = class e extends r.LinuxUpdater {
		constructor(e, t) {
			super(e, t);
		}
		doDownloadUpdate(e) {
			let r = e.updateInfoAndProvider.provider, i = (0, t.findFile)(r.resolveFiles(e.updateInfoAndProvider.info), "deb", [
				"AppImage",
				"rpm",
				"pacman"
			]);
			return this.executeDownload({
				fileExtension: "deb",
				fileInfo: i,
				downloadUpdateOptions: e,
				task: async (e, t) => {
					this.listenerCount(n.DOWNLOAD_PROGRESS) > 0 && (t.onProgress = (e) => this.emit(n.DOWNLOAD_PROGRESS, e)), await this.httpExecutor.download(i.url, e, t);
				}
			});
		}
		doInstall(t) {
			let n = this.installerPath;
			if (n == null) return this.dispatchError(/* @__PURE__ */ Error("No update filepath provided, can't quit and install")), !1;
			if (!this.hasCommand("dpkg") && !this.hasCommand("apt")) return this.dispatchError(/* @__PURE__ */ Error("Neither dpkg nor apt command found. Cannot install .deb package.")), !1;
			let r = this.detectPackageManager(["dpkg", "apt"]);
			try {
				e.installWithCommandRunner(r, n, this.runCommandWithSudoIfNeeded.bind(this), this._logger);
			} catch (e) {
				return this.dispatchError(e), !1;
			}
			return t.isForceRunAfter && this.app.relaunch(), !0;
		}
		static installWithCommandRunner(e, t, n, r) {
			if (e === "dpkg") try {
				n([
					"dpkg",
					"-i",
					t
				]);
			} catch (e) {
				r.warn(e.message ?? e), r.warn("dpkg installation failed, trying to fix broken dependencies with apt-get"), n([
					"apt-get",
					"install",
					"-f",
					"-y"
				]);
			}
			else if (e === "apt") r.warn("Using apt to install a local .deb. This may fail for unsigned packages unless properly configured."), n([
				"apt",
				"install",
				"-y",
				"--allow-unauthenticated",
				"--allow-downgrades",
				"--allow-change-held-packages",
				t
			]);
			else throw Error(`Package manager ${e} not supported`);
		}
	};
})), Hn = /* @__PURE__ */ k(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.PacmanUpdater = void 0;
	var t = Fn(), n = xn(), r = Bn();
	e.PacmanUpdater = class e extends r.LinuxUpdater {
		constructor(e, t) {
			super(e, t);
		}
		doDownloadUpdate(e) {
			let r = e.updateInfoAndProvider.provider, i = (0, n.findFile)(r.resolveFiles(e.updateInfoAndProvider.info), "pacman", [
				"AppImage",
				"deb",
				"rpm"
			]);
			return this.executeDownload({
				fileExtension: "pacman",
				fileInfo: i,
				downloadUpdateOptions: e,
				task: async (e, n) => {
					this.listenerCount(t.DOWNLOAD_PROGRESS) > 0 && (n.onProgress = (e) => this.emit(t.DOWNLOAD_PROGRESS, e)), await this.httpExecutor.download(i.url, e, n);
				}
			});
		}
		doInstall(t) {
			let n = this.installerPath;
			if (n == null) return this.dispatchError(/* @__PURE__ */ Error("No update filepath provided, can't quit and install")), !1;
			try {
				e.installWithCommandRunner(n, this.runCommandWithSudoIfNeeded.bind(this), this._logger);
			} catch (e) {
				return this.dispatchError(e), !1;
			}
			return t.isForceRunAfter && this.app.relaunch(), !0;
		}
		static installWithCommandRunner(e, t, n) {
			try {
				t([
					"pacman",
					"-U",
					"--noconfirm",
					e
				]);
			} catch (r) {
				n.warn(r.message ?? r), n.warn("pacman installation failed, attempting to update package database and retry");
				try {
					t([
						"pacman",
						"-Sy",
						"--noconfirm"
					]), t([
						"pacman",
						"-U",
						"--noconfirm",
						e
					]);
				} catch (e) {
					throw n.error("Retry after pacman -Sy failed"), e;
				}
			}
		}
	};
})), Un = /* @__PURE__ */ k(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.RpmUpdater = void 0;
	var t = Fn(), n = xn(), r = Bn();
	e.RpmUpdater = class e extends r.LinuxUpdater {
		constructor(e, t) {
			super(e, t);
		}
		doDownloadUpdate(e) {
			let r = e.updateInfoAndProvider.provider, i = (0, n.findFile)(r.resolveFiles(e.updateInfoAndProvider.info), "rpm", [
				"AppImage",
				"deb",
				"pacman"
			]);
			return this.executeDownload({
				fileExtension: "rpm",
				fileInfo: i,
				downloadUpdateOptions: e,
				task: async (e, n) => {
					this.listenerCount(t.DOWNLOAD_PROGRESS) > 0 && (n.onProgress = (e) => this.emit(t.DOWNLOAD_PROGRESS, e)), await this.httpExecutor.download(i.url, e, n);
				}
			});
		}
		doInstall(t) {
			let n = this.installerPath;
			if (n == null) return this.dispatchError(/* @__PURE__ */ Error("No update filepath provided, can't quit and install")), !1;
			let r = this.detectPackageManager([
				"zypper",
				"dnf",
				"yum",
				"rpm"
			]);
			try {
				e.installWithCommandRunner(r, n, this.runCommandWithSudoIfNeeded.bind(this), this._logger);
			} catch (e) {
				return this.dispatchError(e), !1;
			}
			return t.isForceRunAfter && this.app.relaunch(), !0;
		}
		static installWithCommandRunner(e, t, n, r) {
			if (e === "zypper") return n([
				"zypper",
				"--non-interactive",
				"--no-refresh",
				"install",
				"--allow-unsigned-rpm",
				"-f",
				t
			]);
			if (e === "dnf") return n([
				"dnf",
				"install",
				"--nogpgcheck",
				"-y",
				t
			]);
			if (e === "yum") return n([
				"yum",
				"install",
				"--nogpgcheck",
				"-y",
				t
			]);
			if (e === "rpm") return r.warn("Installing with rpm only (no dependency resolution)."), n([
				"rpm",
				"-Uvh",
				"--replacepkgs",
				"--replacefiles",
				"--nodeps",
				t
			]);
			throw Error(`Package manager ${e} not supported`);
		}
	};
})), Wn = /* @__PURE__ */ k(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.MacUpdater = void 0;
	var t = Xe(), n = Ce(), r = P("fs"), i = P("path"), a = P("http"), o = In(), s = xn(), c = P("child_process"), l = P("crypto");
	e.MacUpdater = class e extends o.AppUpdater {
		constructor(e, t) {
			super(e, t), this.nativeUpdater = P("electron").autoUpdater, this.squirrelDownloadedUpdate = !1, this.nativeUpdater.on("error", (e) => {
				this._logger.warn(e), this.emit("error", e);
			}), this.nativeUpdater.on("update-downloaded", () => {
				this.squirrelDownloadedUpdate = !0, this.debug("nativeUpdater.update-downloaded");
			});
		}
		static filterFilesForArch(e, t) {
			let n = (e) => e.url.pathname.includes("arm64") || e.info.url?.includes("arm64");
			return t && e.some(n) ? e.filter((e) => t === n(e)) : e.filter((e) => !n(e));
		}
		debug(e) {
			this._logger.debug != null && this._logger.debug(e);
		}
		closeServerIfExists() {
			this.server && (this.debug("Closing proxy server"), this.server.close((e) => {
				e && this.debug("proxy server wasn't already open, probably attempted closing again as a safety check before quit");
			}));
		}
		async doDownloadUpdate(r) {
			let a = r.updateInfoAndProvider.provider.resolveFiles(r.updateInfoAndProvider.info), o = this._logger, l = "sysctl.proc_translated", u = !1;
			try {
				this.debug("Checking for macOS Rosetta environment"), u = (0, c.execFileSync)("sysctl", [l], { encoding: "utf8" }).includes(`${l}: 1`), o.info(`Checked for macOS Rosetta environment (isRosetta=${u})`);
			} catch (e) {
				o.warn(`sysctl shell command to check for macOS Rosetta environment failed: ${e}`);
			}
			let d = !1;
			try {
				this.debug("Checking for arm64 in uname");
				let e = (0, c.execFileSync)("uname", ["-a"], { encoding: "utf8" }).includes("ARM");
				o.info(`Checked 'uname -a': arm64=${e}`), d ||= e;
			} catch (e) {
				o.warn(`uname shell command to check for arm64 failed: ${e}`);
			}
			d = d || process.arch === "arm64" || u, a = e.filterFilesForArch(a, d);
			let f = (0, s.findFile)(a, "zip", ["pkg", "dmg"]);
			if (f == null) throw (0, t.newError)(`ZIP file not provided: ${(0, t.safeStringifyJson)(a)}`, "ERR_UPDATER_ZIP_FILE_NOT_FOUND");
			let p = r.updateInfoAndProvider.provider, m = "update.zip";
			return this.executeDownload({
				fileExtension: "zip",
				fileInfo: f,
				downloadUpdateOptions: r,
				task: async (e, t) => {
					let a = i.join(this.downloadedUpdateHelper.cacheDir, m), s = () => (0, n.pathExistsSync)(a) ? !r.disableDifferentialDownload : (o.info("Unable to locate previous update.zip for differential download (is this first install?), falling back to full download"), !1), c = !0;
					s() && (c = await this.differentialDownloadInstaller(f, r, e, p, m)), c && await this.httpExecutor.download(f.url, e, t);
				},
				done: async (e) => {
					if (!r.disableDifferentialDownload) try {
						let t = i.join(this.downloadedUpdateHelper.cacheDir, m);
						await (0, n.copyFile)(e.downloadedFile, t);
					} catch (e) {
						this._logger.warn(`Unable to copy file for caching for future differential downloads: ${e.message}`);
					}
					return this.updateDownloaded(f, e);
				}
			});
		}
		async updateDownloaded(e, t) {
			let i = t.downloadedFile, o = e.info.size ?? (await (0, n.stat)(i)).size, s = this._logger, c = `fileToProxy=${e.url.href}`;
			this.closeServerIfExists(), this.debug(`Creating proxy server for native Squirrel.Mac (${c})`), this.server = (0, a.createServer)(), this.debug(`Proxy server for native Squirrel.Mac is created (${c})`), this.server.on("close", () => {
				s.info(`Proxy server for native Squirrel.Mac is closed (${c})`);
			});
			let u = (e) => {
				let t = e.address();
				return typeof t == "string" ? t : `http://127.0.0.1:${t?.port}`;
			};
			return await new Promise((e, n) => {
				let a = (0, l.randomBytes)(64).toString("base64").replace(/\//g, "_").replace(/\+/g, "-"), d = Buffer.from(`autoupdater:${a}`, "ascii"), f = `/${(0, l.randomBytes)(64).toString("hex")}.zip`;
				this.server.on("request", (t, c) => {
					let l = t.url;
					if (s.info(`${l} requested`), l === "/") {
						if (!t.headers.authorization || t.headers.authorization.indexOf("Basic ") === -1) {
							c.statusCode = 401, c.statusMessage = "Invalid Authentication Credentials", c.end(), s.warn("No authenthication info");
							return;
						}
						let e = t.headers.authorization.split(" ")[1], [n, r] = Buffer.from(e, "base64").toString("ascii").split(":");
						if (n !== "autoupdater" || r !== a) {
							c.statusCode = 401, c.statusMessage = "Invalid Authentication Credentials", c.end(), s.warn("Invalid authenthication credentials");
							return;
						}
						let i = Buffer.from(`{ "url": "${u(this.server)}${f}" }`);
						c.writeHead(200, {
							"Content-Type": "application/json",
							"Content-Length": i.length
						}), c.end(i);
						return;
					}
					if (!l.startsWith(f)) {
						s.warn(`${l} requested, but not supported`), c.writeHead(404), c.end();
						return;
					}
					s.info(`${f} requested by Squirrel.Mac, pipe ${i}`);
					let d = !1;
					c.on("finish", () => {
						d || (this.nativeUpdater.removeListener("error", n), e([]));
					});
					let p = (0, r.createReadStream)(i);
					p.on("error", (e) => {
						try {
							c.end();
						} catch (e) {
							s.warn(`cannot end response: ${e}`);
						}
						d = !0, this.nativeUpdater.removeListener("error", n), n(/* @__PURE__ */ Error(`Cannot pipe "${i}": ${e}`));
					}), c.writeHead(200, {
						"Content-Type": "application/zip",
						"Content-Length": o
					}), p.pipe(c);
				}), this.debug(`Proxy server for native Squirrel.Mac is starting to listen (${c})`), this.server.listen(0, "127.0.0.1", () => {
					this.debug(`Proxy server for native Squirrel.Mac is listening (address=${u(this.server)}, ${c})`), this.nativeUpdater.setFeedURL({
						url: u(this.server),
						headers: {
							"Cache-Control": "no-cache",
							Authorization: `Basic ${d.toString("base64")}`
						}
					}), this.dispatchUpdateDownloaded(t), this.autoInstallOnAppQuit ? (this.nativeUpdater.once("error", n), this.nativeUpdater.checkForUpdates()) : e([]);
				});
			});
		}
		handleUpdateDownloaded() {
			this.autoRunAppAfterInstall ? this.nativeUpdater.quitAndInstall() : this.app.quit(), this.closeServerIfExists();
		}
		quitAndInstall() {
			this.squirrelDownloadedUpdate ? this.handleUpdateDownloaded() : (this.nativeUpdater.on("update-downloaded", () => this.handleUpdateDownloaded()), this.autoInstallOnAppQuit || this.nativeUpdater.checkForUpdates());
		}
	};
})), Gn = /* @__PURE__ */ k(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.verifySignature = o;
	var t = Xe(), n = P("child_process"), r = P("os"), i = P("path");
	function a(e, t) {
		return [
			"set \"PSModulePath=\" & chcp 65001 >NUL & powershell.exe",
			[
				"-NoProfile",
				"-NonInteractive",
				"-InputFormat",
				"None",
				"-Command",
				e
			],
			{
				shell: !0,
				timeout: t
			}
		];
	}
	function o(e, r, o) {
		return new Promise((l, u) => {
			let d = r.replace(/'/g, "''");
			o.info(`Verifying signature ${d}`), (0, n.execFile)(...a(`"Get-AuthenticodeSignature -LiteralPath '${d}' | ConvertTo-Json -Compress"`, 2e4), (n, a, d) => {
				try {
					if (n != null || d) {
						c(o, n, d, u), l(null);
						return;
					}
					let f = s(a);
					if (f.Status === 0) {
						try {
							let e = i.normalize(f.Path), t = i.normalize(r);
							if (o.info(`LiteralPath: ${e}. Update Path: ${t}`), e !== t) {
								c(o, /* @__PURE__ */ Error(`LiteralPath of ${e} is different than ${t}`), d, u), l(null);
								return;
							}
						} catch (e) {
							o.warn(`Unable to verify LiteralPath of update asset due to missing data.Path. Skipping this step of validation. Message: ${e.message ?? e.stack}`);
						}
						let n = (0, t.parseDn)(f.SignerCertificate.Subject), a = !1;
						for (let r of e) {
							let e = (0, t.parseDn)(r);
							if (e.size ? a = Array.from(e.keys()).every((t) => e.get(t) === n.get(t)) : r === n.get("CN") && (o.warn(`Signature validated using only CN ${r}. Please add your full Distinguished Name (DN) to publisherNames configuration`), a = !0), a) {
								l(null);
								return;
							}
						}
					}
					let p = `publisherNames: ${e.join(" | ")}, raw info: ` + JSON.stringify(f, (e, t) => e === "RawData" ? void 0 : t, 2);
					o.warn(`Sign verification failed, installer signed with incorrect certificate: ${p}`), l(p);
				} catch (e) {
					c(o, e, null, u), l(null);
					return;
				}
			});
		});
	}
	function s(e) {
		let t = JSON.parse(e);
		delete t.PrivateKey, delete t.IsOSBinary, delete t.SignatureType;
		let n = t.SignerCertificate;
		return n != null && (delete n.Archived, delete n.Extensions, delete n.Handle, delete n.HasPrivateKey, delete n.SubjectName), t;
	}
	function c(e, t, r, i) {
		if (l()) {
			e.warn(`Cannot execute Get-AuthenticodeSignature: ${t || r}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
			return;
		}
		try {
			(0, n.execFileSync)(...a("ConvertTo-Json test", 1e4));
		} catch (t) {
			e.warn(`Cannot execute ConvertTo-Json: ${t.message}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
			return;
		}
		t != null && i(t), r && i(/* @__PURE__ */ Error(`Cannot execute Get-AuthenticodeSignature, stderr: ${r}. Failing signature validation due to unknown stderr.`));
	}
	function l() {
		let e = r.release();
		return e.startsWith("6.") && !e.startsWith("6.3");
	}
})), Kn = /* @__PURE__ */ k(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.NsisUpdater = void 0;
	var t = Xe(), n = P("path"), r = Ln(), i = Rn(), a = Fn(), o = xn(), s = Ce(), c = Gn(), l = P("url");
	e.NsisUpdater = class extends r.BaseUpdater {
		constructor(e, t) {
			super(e, t), this._verifyUpdateCodeSignature = (e, t) => (0, c.verifySignature)(e, t, this._logger);
		}
		get verifyUpdateCodeSignature() {
			return this._verifyUpdateCodeSignature;
		}
		set verifyUpdateCodeSignature(e) {
			e && (this._verifyUpdateCodeSignature = e);
		}
		doDownloadUpdate(e) {
			let n = e.updateInfoAndProvider.provider, r = (0, o.findFile)(n.resolveFiles(e.updateInfoAndProvider.info), "exe");
			return this.executeDownload({
				fileExtension: "exe",
				downloadUpdateOptions: e,
				fileInfo: r,
				task: async (i, a, o, c) => {
					let u = r.packageInfo, d = u != null && o != null;
					if (d && e.disableWebInstaller) throw (0, t.newError)(`Unable to download new version ${e.updateInfoAndProvider.info.version}. Web Installers are disabled`, "ERR_UPDATER_WEB_INSTALLER_DISABLED");
					!d && !e.disableWebInstaller && this._logger.warn("disableWebInstaller is set to false, you should set it to true if you do not plan on using a web installer. This will default to true in a future version."), (d || e.disableDifferentialDownload || await this.differentialDownloadInstaller(r, e, i, n, t.CURRENT_APP_INSTALLER_FILE_NAME)) && await this.httpExecutor.download(r.url, i, a);
					let f = await this.verifySignature(i);
					if (f != null) throw await c(), (0, t.newError)(`New version ${e.updateInfoAndProvider.info.version} is not signed by the application owner: ${f}`, "ERR_UPDATER_INVALID_SIGNATURE");
					if (d && await this.differentialDownloadWebPackage(e, u, o, n)) try {
						await this.httpExecutor.download(new l.URL(u.path), o, {
							headers: e.requestHeaders,
							cancellationToken: e.cancellationToken,
							sha512: u.sha512
						});
					} catch (e) {
						try {
							await (0, s.unlink)(o);
						} catch {}
						throw e;
					}
				}
			});
		}
		async verifySignature(e) {
			let t;
			try {
				if (t = (await this.configOnDisk.value).publisherName, t == null) return null;
			} catch (e) {
				if (e.code === "ENOENT") return null;
				throw e;
			}
			return await this._verifyUpdateCodeSignature(Array.isArray(t) ? t : [t], e);
		}
		doInstall(e) {
			let t = this.installerPath;
			if (t == null) return this.dispatchError(/* @__PURE__ */ Error("No update filepath provided, can't quit and install")), !1;
			let r = ["--updated"];
			e.isSilent && r.push("/S"), e.isForceRunAfter && r.push("--force-run"), this.installDirectory && r.push(`/D=${this.installDirectory}`);
			let i = this.downloadedUpdateHelper == null ? null : this.downloadedUpdateHelper.packageFile;
			i != null && r.push(`--package-file=${i}`);
			let a = () => {
				this.spawnLog(n.join(process.resourcesPath, "elevate.exe"), [t].concat(r)).catch((e) => this.dispatchError(e));
			};
			return e.isAdminRightsRequired ? (this._logger.info("isAdminRightsRequired is set to true, run installer using elevate.exe"), a(), !0) : (this.spawnLog(t, r).catch((e) => {
				let n = e.code;
				this._logger.info(`Cannot run installer: error code: ${n}, error message: "${e.message}", will be executed again using elevate if EACCES, and will try to use electron.shell.openItem if ENOENT`), n === "UNKNOWN" || n === "EACCES" ? a() : n === "ENOENT" ? P("electron").shell.openPath(t).catch((e) => this.dispatchError(e)) : this.dispatchError(e);
			}), !0);
		}
		async differentialDownloadWebPackage(e, r, o, s) {
			if (r.blockMapSize == null) return !0;
			try {
				let c = {
					newUrl: new l.URL(r.path),
					oldFile: n.join(this.downloadedUpdateHelper.cacheDir, t.CURRENT_APP_PACKAGE_FILE_NAME),
					logger: this._logger,
					newFile: o,
					requestHeaders: this.requestHeaders,
					isUseMultipleRangeRequest: s.isUseMultipleRangeRequest,
					cancellationToken: e.cancellationToken
				};
				this.listenerCount(a.DOWNLOAD_PROGRESS) > 0 && (c.onProgress = (e) => this.emit(a.DOWNLOAD_PROGRESS, e)), await new i.FileWithEmbeddedBlockMapDifferentialDownloader(r, this.httpExecutor, c).download();
			} catch (e) {
				return this._logger.error(`Cannot download differentially, fallback to full download: ${e.stack || e}`), process.platform === "win32";
			}
			return !1;
		}
	};
})), qn = /* @__PURE__ */ k(((e) => {
	var t = e && e.__createBinding || (Object.create ? (function(e, t, n, r) {
		r === void 0 && (r = n);
		var i = Object.getOwnPropertyDescriptor(t, n);
		(!i || ("get" in i ? !t.__esModule : i.writable || i.configurable)) && (i = {
			enumerable: !0,
			get: function() {
				return t[n];
			}
		}), Object.defineProperty(e, r, i);
	}) : (function(e, t, n, r) {
		r === void 0 && (r = n), e[r] = t[n];
	})), n = e && e.__exportStar || function(e, n) {
		for (var r in e) r !== "default" && !Object.prototype.hasOwnProperty.call(n, r) && t(n, e, r);
	};
	Object.defineProperty(e, "__esModule", { value: !0 }), e.NsisUpdater = e.MacUpdater = e.RpmUpdater = e.PacmanUpdater = e.DebUpdater = e.AppImageUpdater = e.Provider = e.NoOpLogger = e.AppUpdater = e.BaseUpdater = void 0;
	var r = Ce(), i = P("path"), a = Ln();
	Object.defineProperty(e, "BaseUpdater", {
		enumerable: !0,
		get: function() {
			return a.BaseUpdater;
		}
	});
	var o = In();
	Object.defineProperty(e, "AppUpdater", {
		enumerable: !0,
		get: function() {
			return o.AppUpdater;
		}
	}), Object.defineProperty(e, "NoOpLogger", {
		enumerable: !0,
		get: function() {
			return o.NoOpLogger;
		}
	});
	var s = xn();
	Object.defineProperty(e, "Provider", {
		enumerable: !0,
		get: function() {
			return s.Provider;
		}
	});
	var c = zn();
	Object.defineProperty(e, "AppImageUpdater", {
		enumerable: !0,
		get: function() {
			return c.AppImageUpdater;
		}
	});
	var l = Vn();
	Object.defineProperty(e, "DebUpdater", {
		enumerable: !0,
		get: function() {
			return l.DebUpdater;
		}
	});
	var u = Hn();
	Object.defineProperty(e, "PacmanUpdater", {
		enumerable: !0,
		get: function() {
			return u.PacmanUpdater;
		}
	});
	var d = Un();
	Object.defineProperty(e, "RpmUpdater", {
		enumerable: !0,
		get: function() {
			return d.RpmUpdater;
		}
	});
	var f = Wn();
	Object.defineProperty(e, "MacUpdater", {
		enumerable: !0,
		get: function() {
			return f.MacUpdater;
		}
	});
	var p = Kn();
	Object.defineProperty(e, "NsisUpdater", {
		enumerable: !0,
		get: function() {
			return p.NsisUpdater;
		}
	}), n(Fn(), e);
	var m;
	function h() {
		if (process.platform === "win32") m = new (Kn()).NsisUpdater();
		else if (process.platform === "darwin") m = new (Wn()).MacUpdater();
		else {
			m = new (zn()).AppImageUpdater();
			try {
				let e = i.join(process.resourcesPath, "package-type");
				if (!(0, r.existsSync)(e)) return m;
				switch ((0, r.readFileSync)(e).toString().trim()) {
					case "deb":
						m = new (Vn()).DebUpdater();
						break;
					case "rpm":
						m = new (Un()).RpmUpdater();
						break;
					case "pacman": m = new (Hn()).PacmanUpdater();
				}
			} catch (e) {
				console.warn("Unable to detect 'package-type' for autoUpdater (rpm/deb/pacman support). If you'd like to expand support, please consider contributing to electron-builder", e.message);
			}
		}
		return m;
	}
	Object.defineProperty(e, "autoUpdater", {
		enumerable: !0,
		get: () => m || h()
	});
}));
//#endregion
//#region node_modules/axios/lib/helpers/bind.js
function Jn(e, t) {
	return function() {
		return e.apply(t, arguments);
	};
}
//#endregion
//#region node_modules/axios/lib/utils.js
var { toString: Yn } = Object.prototype, { getPrototypeOf: Xn } = Object, { iterator: Zn, toStringTag: Qn } = Symbol, $n = (({ hasOwnProperty: e }) => (t, n) => e.call(t, n))(Object.prototype), er = (e) => typeof e == "string" && (e === "__proto__" || e === "constructor" || e === "prototype"), tr = (e, t, n) => e === Object.prototype || !n && t === null, nr = (e) => {
	if (!Object.isExtensible(e)) return !1;
	let t = Object.getOwnPropertyNames(e);
	return Object.getOwnPropertySymbols && t.push(...Object.getOwnPropertySymbols(e)), t.every((t) => {
		if (er(t)) return !1;
		let n = Object.getOwnPropertyDescriptor(e, t);
		return !!n && n.configurable && n.writable === !0;
	});
}, rr = (e, t) => {
	let n = e, r = [];
	for (; n != null;) {
		if (r.indexOf(n) !== -1) return !1;
		r.push(n);
		let i = Xn(n);
		if (tr(n, i, n === e)) return !1;
		if ($n(n, t)) return !0;
		n = i;
	}
	return !1;
}, ir = (e, t) => e != null && rr(e, t) ? e[t] : void 0, ar = (e) => {
	if (e == null || typeof e != "object" && typeof e != "function") return e;
	let t = Xn(e);
	if (t === null && nr(e)) return e;
	let n = Object.create(null), r = Object.create(null), i = [], a = e;
	for (; a != null && i.indexOf(a) === -1;) {
		i.push(a);
		let o = a === e ? t : Xn(a);
		if (tr(a, o, a === e)) break;
		let s = Object.getOwnPropertyNames(a);
		Object.getOwnPropertySymbols && s.push(...Object.getOwnPropertySymbols(a));
		for (let t of s) er(t) || $n(r, t) || (n[t] = e[t], r[t] = !0);
		a = o;
	}
	return n;
}, or = ((e) => (t) => {
	let n = Yn.call(t);
	return e[n] || (e[n] = n.slice(8, -1).toLowerCase());
})(Object.create(null)), sr = (e) => (e = e.toLowerCase(), (t) => or(t) === e), cr = (e) => (t) => typeof t === e, { isArray: lr } = Array, ur = cr("undefined");
function dr(e) {
	return e !== null && !ur(e) && e.constructor !== null && !ur(e.constructor) && hr(e.constructor.isBuffer) && e.constructor.isBuffer(e);
}
var fr = sr("ArrayBuffer");
function pr(e) {
	let t;
	return t = typeof ArrayBuffer < "u" && ArrayBuffer.isView ? ArrayBuffer.isView(e) : e && e.buffer && fr(e.buffer), t;
}
var mr = cr("string"), hr = cr("function"), gr = cr("number"), _r = (e) => typeof e == "object" && !!e, vr = (e) => e === !0 || e === !1, yr = (e) => {
	if (!_r(e)) return !1;
	let t = Xn(e);
	return (t === null || t === Object.prototype || Xn(t) === null) && !rr(e, Qn) && !rr(e, Zn);
}, br = (e) => {
	if (!_r(e) || dr(e)) return !1;
	try {
		return Object.keys(e).length === 0 && Object.getPrototypeOf(e) === Object.prototype;
	} catch {
		return !1;
	}
}, xr = sr("Date"), Sr = sr("File"), Cr = (e) => !!(e && e.uri !== void 0), wr = (e) => e && e.getParts !== void 0, Tr = sr("Blob"), Er = sr("FileList"), Dr = sr("Set"), Or = (e) => _r(e) && hr(e.pipe);
function kr() {
	return typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {};
}
var Ar = kr(), jr = Ar.FormData === void 0 ? void 0 : Ar.FormData, Mr = (e) => {
	if (!e) return !1;
	if (jr && e instanceof jr) return !0;
	let t = Xn(e);
	if (!t || t === Object.prototype || !hr(e.append)) return !1;
	let n = or(e);
	return n === "formdata" || n === "object" && hr(e.toString) && e.toString() === "[object FormData]";
}, Nr = sr("URLSearchParams"), [Pr, Fr, Ir, Lr] = [
	"ReadableStream",
	"Request",
	"Response",
	"Headers"
].map(sr), Rr = (e) => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function zr(e, t, { allOwnKeys: n = !1 } = {}) {
	if (e == null) return;
	let r, i;
	if (typeof e != "object" && (e = [e]), lr(e)) for (r = 0, i = e.length; r < i; r++) t.call(null, e[r], r, e);
	else {
		if (dr(e)) return;
		let i = n ? Object.getOwnPropertyNames(e) : Object.keys(e), a = i.length, o;
		for (r = 0; r < a; r++) o = i[r], t.call(null, e[o], o, e);
	}
}
function Br(e, t) {
	if (dr(e)) return null;
	t = t.toLowerCase();
	let n = Object.keys(e), r = n.length, i;
	for (; r-- > 0;) if (i = n[r], t === i.toLowerCase()) return i;
	return null;
}
var Vr = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global, Hr = (e) => !ur(e) && e !== Vr;
function Ur(...e) {
	let { caseless: t, skipUndefined: n } = Hr(this) && this || {}, r = {}, i = (e, i) => {
		if (i === "__proto__" || i === "constructor" || i === "prototype") return;
		let a = t && typeof i == "string" && Br(r, i) || i, o = $n(r, a) ? r[a] : void 0;
		yr(o) && yr(e) ? r[a] = Ur(o, e) : yr(e) ? r[a] = Ur({}, e) : lr(e) ? r[a] = e.slice() : (!n || !ur(e)) && (r[a] = e);
	};
	for (let t = 0, n = e.length; t < n; t++) {
		let n = e[t];
		if (!n || dr(n) || (zr(n, i), typeof n != "object" || lr(n))) continue;
		let r = Object.getOwnPropertySymbols(n);
		for (let e = 0; e < r.length; e++) {
			let t = r[e];
			ti.call(n, t) && i(n[t], t);
		}
	}
	return r;
}
var Wr = (e, t, n, { allOwnKeys: r } = {}) => (zr(t, (t, r) => {
	n && hr(t) ? Object.defineProperty(e, r, {
		__proto__: null,
		value: Jn(t, n),
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
}, { allOwnKeys: r }), e), Gr = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e), Kr = (e, t, n, r) => {
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
}, qr = (e, t, n, r) => {
	let i, a, o, s = {};
	if (t ||= {}, e == null) return t;
	do {
		for (i = Object.getOwnPropertyNames(e), a = i.length; a-- > 0;) o = i[a], (!r || r(o, e, t)) && !s[o] && (t[o] = e[o], s[o] = !0);
		e = n !== !1 && Xn(e);
	} while (e && (!n || n(e, t)) && e !== Object.prototype);
	return t;
}, Jr = (e, t, n) => {
	e = String(e), (n === void 0 || n > e.length) && (n = e.length), n -= t.length;
	let r = e.indexOf(t, n);
	return r !== -1 && r === n;
}, Yr = (e) => {
	if (!e) return null;
	if (lr(e)) return e;
	let t = e.length;
	if (!gr(t)) return null;
	let n = Array(t);
	for (; t-- > 0;) n[t] = e[t];
	return n;
}, Xr = ((e) => (t) => e && t instanceof e)(typeof Uint8Array < "u" && Xn(Uint8Array)), Zr = (e, t) => {
	let n = (e && e[Zn]).call(e), r;
	for (; (r = n.next()) && !r.done;) {
		let n = r.value;
		t.call(e, n[0], n[1]);
	}
}, Qr = (e, t) => {
	let n, r = [];
	for (; (n = e.exec(t)) !== null;) r.push(n);
	return r;
}, $r = sr("HTMLFormElement"), ei = (e) => e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function(e, t, n) {
	return t.toUpperCase() + n;
}), { propertyIsEnumerable: ti } = Object.prototype, ni = sr("RegExp"), ri = (e, t) => {
	let n = Object.getOwnPropertyDescriptors(e), r = {};
	zr(n, (n, i) => {
		let a;
		(a = t(n, i, e)) !== !1 && (r[i] = a || n);
	}), Object.defineProperties(e, r);
}, ii = (e) => {
	ri(e, (t, n) => {
		if (hr(e) && [
			"arguments",
			"caller",
			"callee"
		].includes(n)) return !1;
		let r = e[n];
		if (hr(r)) {
			if (t.enumerable = !1, "writable" in t) {
				t.writable = !1;
				return;
			}
			t.set ||= () => {
				throw Error("Can not rewrite read-only method '" + n + "'");
			};
		}
	});
}, ai = (e, t) => {
	let n = {}, r = (e) => {
		e.forEach((e) => {
			n[e] = !0;
		});
	};
	return lr(e) ? r(e) : r(String(e).split(t)), n;
}, oi = () => {}, si = (e, t) => e != null && Number.isFinite(e = +e) ? e : t;
function ci(e) {
	return !!(e && hr(e.append) && e[Qn] === "FormData" && e[Zn]);
}
var li = (e) => {
	let t = /* @__PURE__ */ new WeakSet(), n = (e) => {
		if (_r(e)) {
			if (t.has(e)) return;
			if (dr(e)) return e;
			if (!("toJSON" in e)) {
				t.add(e);
				let r;
				if (Dr(e)) {
					r = [];
					for (let t of e) {
						let e = n(t);
						!ur(e) && r.push(e);
					}
				} else r = lr(e) ? [] : {}, zr(e, (e, t) => {
					let i = n(e);
					!ur(i) && (r[t] = i);
				});
				return t.delete(e), r;
			}
		}
		return e;
	};
	return n(e);
}, ui = sr("AsyncFunction"), di = (e) => e && (_r(e) || hr(e)) && hr(e.then) && hr(e.catch), fi = ((e, t) => e ? setImmediate : t ? ((e, t) => (Vr.addEventListener("message", ({ source: n, data: r }) => {
	n === Vr && r === e && t.length && t.shift()();
}, !1), (n) => {
	t.push(n), Vr.postMessage(e, "*");
}))(`axios@${Math.random()}`, []) : (e) => setTimeout(e))(typeof setImmediate == "function", hr(Vr.postMessage)), pi = typeof queueMicrotask < "u" ? queueMicrotask.bind(Vr) : typeof process < "u" && process.nextTick || fi, mi = (e) => e != null && hr(e[Zn]), J = {
	isArray: lr,
	isArrayBuffer: fr,
	isBuffer: dr,
	isFormData: Mr,
	isArrayBufferView: pr,
	isString: mr,
	isNumber: gr,
	isBoolean: vr,
	isObject: _r,
	isPlainObject: yr,
	isEmptyObject: br,
	isReadableStream: Pr,
	isRequest: Fr,
	isResponse: Ir,
	isHeaders: Lr,
	isUndefined: ur,
	isDate: xr,
	isFile: Sr,
	isReactNativeBlob: Cr,
	isReactNative: wr,
	isBlob: Tr,
	isRegExp: ni,
	isFunction: hr,
	isStream: Or,
	isURLSearchParams: Nr,
	isTypedArray: Xr,
	isFileList: Er,
	forEach: zr,
	merge: Ur,
	extend: Wr,
	trim: Rr,
	stripBOM: Gr,
	inherits: Kr,
	toFlatObject: qr,
	kindOf: or,
	kindOfTest: sr,
	endsWith: Jr,
	toArray: Yr,
	forEachEntry: Zr,
	matchAll: Qr,
	isHTMLForm: $r,
	hasOwnProperty: $n,
	hasOwnProp: $n,
	hasOwnInPrototypeChain: rr,
	getSafeProp: ir,
	toSafeFlatObject: ar,
	reduceDescriptors: ri,
	freezeMethods: ii,
	toObjectSet: ai,
	toCamelCase: ei,
	noop: oi,
	toFiniteNumber: si,
	findKey: Br,
	global: Vr,
	isContextDefined: Hr,
	isSpecCompliantForm: ci,
	toJSONObject: li,
	isAsyncFn: ui,
	isThenable: di,
	setImmediate: fi,
	asap: pi,
	isIterable: mi,
	isSafeIterable: (e) => e != null && rr(e, Zn) && mi(e)
}, hi = J.toObjectSet([
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
]), gi = (e) => {
	let t = {}, n, r, i;
	return e && e.split("\n").forEach(function(e) {
		i = e.indexOf(":"), n = e.substring(0, i).trim().toLowerCase(), r = e.substring(i + 1).trim();
		let a = J.hasOwnProp(t, n);
		!n || a && J.hasOwnProp(hi, n) || (n === "set-cookie" ? a ? t[n].push(r) : t[n] = [r] : t[n] = a ? t[n] + ", " + r : r);
	}), t;
};
//#endregion
//#region node_modules/axios/lib/helpers/sanitizeHeaderValue.js
function _i(e) {
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
var vi = /* @__PURE__ */ RegExp("[\\u0000-\\u0008\\u000a-\\u001f\\u007f]+", "g"), yi = /* @__PURE__ */ RegExp("[^\\u0009\\u0020-\\u007e\\u0080-\\u00ff]+", "g");
function bi(e, t) {
	return J.isArray(e) ? e.map((e) => bi(e, t)) : _i(String(e).replace(t, ""));
}
var xi = (e) => bi(e, vi), Si = (e) => bi(e, yi);
function Ci(e) {
	let t = Object.create(null);
	return J.forEach(e.toJSON(), (e, n) => {
		t[n] = Si(e);
	}), t;
}
//#endregion
//#region node_modules/axios/lib/core/AxiosHeaders.js
var wi = Symbol("internals");
function Ti(e) {
	return e && String(e).trim().toLowerCase();
}
function Ei(e) {
	return e === !1 || e == null ? e : J.isArray(e) ? e.map(Ei) : xi(String(e));
}
function Di(e) {
	let t = Object.create(null), n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g, r;
	for (; r = n.exec(e);) t[r[1]] = r[2];
	return t;
}
var Oi = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/;
function ki(e) {
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
function Ai(e) {
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
function ji(e) {
	let t = Object.create(null), n = String(e), r = 0, i = !1, a = !1;
	function o(e) {
		let i = ki(n.slice(r, e)), a = i.indexOf("=");
		if (a < 1) return;
		let o = ki(i.slice(0, a));
		if (!Oi.test(o)) return;
		let s = o.toLowerCase();
		if (s === "__proto__" || s === "constructor" || s === "prototype") return;
		let c = ki(i.slice(a + 1));
		t[s] = Ai(c);
	}
	for (let e = 0; e < n.length; e++) {
		let t = n.charCodeAt(e);
		i ? a ? a = !1 : t === 92 ? a = !0 : t === 34 && (i = !1) : t === 34 ? i = !0 : (t === 44 || t === 59) && (o(e), r = e + 1);
	}
	return o(n.length), t;
}
var Mi = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function Ni(e, t, n, r, i) {
	if (J.isFunction(r)) return r.call(this, t, n);
	if (i && (t = n), J.isString(t)) {
		if (J.isString(r)) return t.indexOf(r) !== -1;
		if (J.isRegExp(r)) return r.test(t);
	}
}
function Pi(e) {
	return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (e, t, n) => t.toUpperCase() + n);
}
function Fi(e, t) {
	let n = J.toCamelCase(" " + t);
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
var Y = class {
	constructor(e) {
		e && this.set(e);
	}
	set(e, t, n) {
		let r = this;
		function i(e, t, n) {
			let i = Ti(t);
			if (!i) return;
			let a = J.findKey(r, i);
			(!a || r[a] === void 0 || n === !0 || n === void 0 && r[a] !== !1) && (r[a || t] = Ei(e));
		}
		let a = (e, t) => J.forEach(e, (e, n) => i(e, n, t));
		if (J.isPlainObject(e) || e instanceof this.constructor) a(e, t);
		else if (J.isString(e) && (e = e.trim()) && !Mi(e)) a(gi(e), t);
		else if (J.isObject(e) && J.isSafeIterable(e)) {
			let n = Object.create(null), r, i;
			for (let t of e) {
				if (!J.isArray(t)) throw TypeError("Object iterator must return a key-value pair");
				i = t[0], J.hasOwnProp(n, i) ? (r = n[i], n[i] = J.isArray(r) ? [...r, t[1]] : [r, t[1]]) : n[i] = t[1];
			}
			a(n, t);
		} else e != null && i(t, e, n);
		return this;
	}
	get(e, t) {
		if (e = Ti(e), e) {
			let n = J.findKey(this, e);
			if (n) {
				let e = this[n];
				if (!t) return e;
				if (t === !0) return Di(e);
				if (J.isFunction(t)) return t.call(this, e, n);
				if (J.isRegExp(t)) return t.exec(e);
				throw TypeError("parser must be boolean|regexp|function");
			}
		}
	}
	has(e, t) {
		if (e = Ti(e), e) {
			let n = J.findKey(this, e);
			return !(!n || this[n] === void 0 || t && !Ni(this, this[n], n, t));
		}
		return !1;
	}
	delete(e, t) {
		let n = this, r = !1;
		function i(e) {
			if (e = Ti(e), e) {
				let i = J.findKey(n, e);
				i && (!t || Ni(n, n[i], i, t)) && (delete n[i], r = !0);
			}
		}
		return J.isArray(e) ? e.forEach(i) : i(e), r;
	}
	clear(e) {
		let t = Object.keys(this), n = t.length, r = !1;
		for (; n--;) {
			let i = t[n];
			(!e || Ni(this, this[i], i, e, !0)) && (delete this[i], r = !0);
		}
		return r;
	}
	normalize(e) {
		let t = this, n = {};
		return J.forEach(this, (r, i) => {
			let a = J.findKey(n, i);
			if (a) {
				t[a] = Ei(r), delete t[i];
				return;
			}
			let o = e ? Pi(i) : String(i).trim();
			o !== i && delete t[i], t[o] = Ei(r), n[o] = !0;
		}), this;
	}
	concat(...e) {
		return this.constructor.concat(this, ...e);
	}
	toJSON(e) {
		let t = Object.create(null);
		return J.forEach(this, (n, r) => {
			n != null && n !== !1 && (t[r] = e && J.isArray(n) ? n.join(", ") : n);
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
		return J.isArray(e) ? e : e == null || e === !1 ? [] : [e];
	}
	get [Symbol.toStringTag]() {
		return "AxiosHeaders";
	}
	static from(e) {
		return e instanceof this ? e : new this(e);
	}
	static parseParameters(e) {
		return ji(e);
	}
	static concat(e, ...t) {
		let n = new this(e);
		return t.forEach((e) => n.set(e)), n;
	}
	static accessor(e) {
		let t = (this[wi] = this[wi] = { accessors: {} }).accessors, n = this.prototype;
		function r(e) {
			let r = Ti(e);
			t[r] || (Fi(n, e), t[r] = !0);
		}
		return J.isArray(e) ? e.forEach(r) : r(e), this;
	}
};
Y.accessor([
	"Content-Type",
	"Content-Length",
	"Accept",
	"Accept-Encoding",
	"User-Agent",
	"Authorization"
]), J.reduceDescriptors(Y.prototype, ({ value: e }, t) => {
	let n = t[0].toUpperCase() + t.slice(1);
	return {
		get: () => e,
		set(e) {
			this[n] = e;
		}
	};
}), J.freezeMethods(Y);
//#endregion
//#region node_modules/axios/lib/core/AxiosError.js
var Ii = "[REDACTED ****]";
function Li(e) {
	if (J.hasOwnProp(e, "toJSON")) return !0;
	let t = Object.getPrototypeOf(e);
	for (; t && t !== Object.prototype;) {
		if (J.hasOwnProp(t, "toJSON")) return !0;
		t = Object.getPrototypeOf(t);
	}
	return !1;
}
function Ri(e, t) {
	let n = new Set(t.map((e) => String(e).toLowerCase())), r = [], i = (e) => {
		if (typeof e != "object" || !e || J.isBuffer(e)) return e;
		if (r.indexOf(e) !== -1) return;
		e instanceof Y && (e = e.toJSON()), r.push(e);
		let t;
		if (J.isArray(e)) t = [], e.forEach((e, n) => {
			let r = i(e);
			J.isUndefined(r) || (t[n] = r);
		});
		else {
			if (!J.isPlainObject(e) && Li(e)) return r.pop(), e;
			t = Object.create(null);
			for (let [r, a] of Object.entries(e)) {
				let e = n.has(r.toLowerCase()) ? Ii : i(a);
				J.isUndefined(e) || (t[r] = e);
			}
		}
		return r.pop(), t;
	};
	return i(e);
}
function zi(e) {
	try {
		return String(e);
	} catch {
		return "";
	}
}
function Bi(e) {
	return e.errors.map((e) => {
		try {
			return e && e.message ? zi(e.message) : zi(e);
		} catch {
			return "";
		}
	}).filter(Boolean).join("; ") || e.name || "AggregateError";
}
var X = class e extends Error {
	static from(t, n, r, i, a, o) {
		let s = t.message;
		!s && J.isArray(t.errors) && t.errors.length && (s = Bi(t));
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
		let e = this.config, t = e && J.hasOwnProp(e, "redact") ? e.redact : void 0, n = J.isArray(t) && t.length > 0 ? Ri(e, t) : J.toJSONObject(e);
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
X.ERR_BAD_OPTION_VALUE = "ERR_BAD_OPTION_VALUE", X.ERR_BAD_OPTION = "ERR_BAD_OPTION", X.ECONNABORTED = "ECONNABORTED", X.ETIMEDOUT = "ETIMEDOUT", X.ECONNREFUSED = "ECONNREFUSED", X.ERR_NETWORK = "ERR_NETWORK", X.ERR_FR_TOO_MANY_REDIRECTS = "ERR_FR_TOO_MANY_REDIRECTS", X.ERR_DEPRECATED = "ERR_DEPRECATED", X.ERR_BAD_RESPONSE = "ERR_BAD_RESPONSE", X.ERR_BAD_REQUEST = "ERR_BAD_REQUEST", X.ERR_CANCELED = "ERR_CANCELED", X.ERR_NOT_SUPPORT = "ERR_NOT_SUPPORT", X.ERR_INVALID_URL = "ERR_INVALID_URL", X.ERR_FORM_DATA_DEPTH_EXCEEDED = "ERR_FORM_DATA_DEPTH_EXCEEDED";
//#endregion
//#region node_modules/delayed-stream/lib/delayed_stream.js
var Vi = /* @__PURE__ */ k(((e, t) => {
	var n = P("stream").Stream, r = P("util");
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
})), Hi = /* @__PURE__ */ k(((e, t) => {
	var n = P("util"), r = P("stream").Stream, i = Vi();
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
})), Ui = /* @__PURE__ */ A({ default: () => Wi }), Wi, Gi = O((() => {
	Wi = {
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
})), Ki = /* @__PURE__ */ k(((e, t) => {
	t.exports = (Gi(), N(Ui).default);
})), qi = /* @__PURE__ */ k(((e) => {
	var t = Ki(), n = P("path").extname, r = /^\s*([^;\s]*)(?:;|\s|$)/, i = /^text\//i;
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
})), Ji = /* @__PURE__ */ k(((e, t) => {
	t.exports = n;
	function n(e) {
		var t = typeof setImmediate == "function" ? setImmediate : typeof process == "object" && typeof process.nextTick == "function" ? process.nextTick : null;
		t ? t(e) : setTimeout(e, 0);
	}
})), Yi = /* @__PURE__ */ k(((e, t) => {
	var n = Ji();
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
})), Xi = /* @__PURE__ */ k(((e, t) => {
	t.exports = n;
	function n(e) {
		Object.keys(e.jobs).forEach(r.bind(e)), e.jobs = {};
	}
	function r(e) {
		typeof this.jobs[e] == "function" && this.jobs[e]();
	}
})), Zi = /* @__PURE__ */ k(((e, t) => {
	var n = Yi(), r = Xi();
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
})), Qi = /* @__PURE__ */ k(((e, t) => {
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
})), $i = /* @__PURE__ */ k(((e, t) => {
	var n = Xi(), r = Yi();
	t.exports = i;
	function i(e) {
		Object.keys(this.jobs).length && (this.index = this.size, n(this), r(e)(null, this.results));
	}
})), ea = /* @__PURE__ */ k(((e, t) => {
	var n = Zi(), r = Qi(), i = $i();
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
})), ta = /* @__PURE__ */ k(((e, t) => {
	var n = Zi(), r = Qi(), i = $i();
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
})), na = /* @__PURE__ */ k(((e, t) => {
	var n = ta();
	t.exports = r;
	function r(e, t, r) {
		return n(e, t, null, r);
	}
})), ra = /* @__PURE__ */ k(((e, t) => {
	t.exports = {
		parallel: ea(),
		serial: na(),
		serialOrdered: ta()
	};
})), ia = /* @__PURE__ */ k(((e, t) => {
	t.exports = Object;
})), aa = /* @__PURE__ */ k(((e, t) => {
	t.exports = Error;
})), oa = /* @__PURE__ */ k(((e, t) => {
	t.exports = EvalError;
})), sa = /* @__PURE__ */ k(((e, t) => {
	t.exports = RangeError;
})), ca = /* @__PURE__ */ k(((e, t) => {
	t.exports = ReferenceError;
})), la = /* @__PURE__ */ k(((e, t) => {
	t.exports = SyntaxError;
})), ua = /* @__PURE__ */ k(((e, t) => {
	t.exports = TypeError;
})), da = /* @__PURE__ */ k(((e, t) => {
	t.exports = URIError;
})), fa = /* @__PURE__ */ k(((e, t) => {
	t.exports = Math.abs;
})), pa = /* @__PURE__ */ k(((e, t) => {
	t.exports = Math.floor;
})), ma = /* @__PURE__ */ k(((e, t) => {
	t.exports = Math.max;
})), ha = /* @__PURE__ */ k(((e, t) => {
	t.exports = Math.min;
})), ga = /* @__PURE__ */ k(((e, t) => {
	t.exports = Math.pow;
})), _a = /* @__PURE__ */ k(((e, t) => {
	t.exports = Math.round;
})), va = /* @__PURE__ */ k(((e, t) => {
	t.exports = Number.isNaN || function(e) {
		return e !== e;
	};
})), ya = /* @__PURE__ */ k(((e, t) => {
	var n = va();
	t.exports = function(e) {
		return n(e) || e === 0 ? e : e < 0 ? -1 : 1;
	};
})), ba = /* @__PURE__ */ k(((e, t) => {
	t.exports = Object.getOwnPropertyDescriptor;
})), xa = /* @__PURE__ */ k(((e, t) => {
	var n = ba();
	if (n) try {
		n([], "length");
	} catch {
		n = null;
	}
	t.exports = n;
})), Sa = /* @__PURE__ */ k(((e, t) => {
	var n = Object.defineProperty || !1;
	if (n) try {
		n({}, "a", { value: 1 });
	} catch {
		n = !1;
	}
	t.exports = n;
})), Ca = /* @__PURE__ */ k(((e, t) => {
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
})), wa = /* @__PURE__ */ k(((e, t) => {
	var n = typeof Symbol < "u" && Symbol, r = Ca();
	t.exports = function() {
		return typeof n != "function" || typeof Symbol != "function" || typeof n("foo") != "symbol" || typeof Symbol("bar") != "symbol" ? !1 : r();
	};
})), Ta = /* @__PURE__ */ k(((e, t) => {
	t.exports = typeof Reflect < "u" && Reflect.getPrototypeOf || null;
})), Ea = /* @__PURE__ */ k(((e, t) => {
	t.exports = ia().getPrototypeOf || null;
})), Da = /* @__PURE__ */ k(((e, t) => {
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
})), Oa = /* @__PURE__ */ k(((e, t) => {
	var n = Da();
	t.exports = Function.prototype.bind || n;
})), ka = /* @__PURE__ */ k(((e, t) => {
	t.exports = Function.prototype.call;
})), Aa = /* @__PURE__ */ k(((e, t) => {
	t.exports = Function.prototype.apply;
})), ja = /* @__PURE__ */ k(((e, t) => {
	t.exports = typeof Reflect < "u" && Reflect && Reflect.apply;
})), Ma = /* @__PURE__ */ k(((e, t) => {
	var n = Oa(), r = Aa(), i = ka();
	t.exports = ja() || n.call(i, r);
})), Na = /* @__PURE__ */ k(((e, t) => {
	var n = Oa(), r = ua(), i = ka(), a = Ma();
	t.exports = function(e) {
		if (e.length < 1 || typeof e[0] != "function") throw new r("a function is required");
		return a(n, i, e);
	};
})), Pa = /* @__PURE__ */ k(((e, t) => {
	var n = Na(), r = xa(), i;
	try {
		i = [].__proto__ === Array.prototype;
	} catch (e) {
		if (!e || typeof e != "object" || !("code" in e) || e.code !== "ERR_PROTO_ACCESS") throw e;
	}
	var a = !!i && r && r(Object.prototype, "__proto__"), o = Object, s = o.getPrototypeOf;
	t.exports = a && typeof a.get == "function" ? n([a.get]) : typeof s == "function" && function(e) {
		return s(e == null ? e : o(e));
	};
})), Fa = /* @__PURE__ */ k(((e, t) => {
	var n = Ta(), r = Ea(), i = Pa();
	t.exports = n ? function(e) {
		return n(e);
	} : r ? function(e) {
		if (!e || typeof e != "object" && typeof e != "function") throw TypeError("getProto: not an object");
		return r(e);
	} : i ? function(e) {
		return i(e);
	} : null;
})), Ia = /* @__PURE__ */ k(((e, t) => {
	var n = Function.prototype.call, r = Object.prototype.hasOwnProperty;
	t.exports = Oa().call(n, r);
})), La = /* @__PURE__ */ k(((e, t) => {
	var n, r = ia(), i = aa(), a = oa(), o = sa(), s = ca(), c = la(), l = ua(), u = da(), d = fa(), f = pa(), p = ma(), m = ha(), h = ga(), g = _a(), _ = ya(), v = Function, y = function(e) {
		try {
			return v("\"use strict\"; return (" + e + ").constructor;")();
		} catch {}
	}, b = xa(), x = Sa(), S = function() {
		throw new l();
	}, C = b ? function() {
		try {
			return arguments.callee, S;
		} catch {
			try {
				return b(arguments, "callee").get;
			} catch {
				return S;
			}
		}
	}() : S, w = wa()(), T = Fa(), E = Ea(), D = Ta(), O = Aa(), k = ka(), A = {}, j = typeof Uint8Array > "u" || !T ? n : T(Uint8Array), M = {
		__proto__: null,
		"%AggregateError%": typeof AggregateError > "u" ? n : AggregateError,
		"%Array%": Array,
		"%ArrayBuffer%": typeof ArrayBuffer > "u" ? n : ArrayBuffer,
		"%ArrayIteratorPrototype%": w && T ? T([][Symbol.iterator]()) : n,
		"%AsyncFromSyncIteratorPrototype%": n,
		"%AsyncFunction%": A,
		"%AsyncGenerator%": A,
		"%AsyncGeneratorFunction%": A,
		"%AsyncIteratorPrototype%": A,
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
		"%Function%": v,
		"%GeneratorFunction%": A,
		"%Int8Array%": typeof Int8Array > "u" ? n : Int8Array,
		"%Int16Array%": typeof Int16Array > "u" ? n : Int16Array,
		"%Int32Array%": typeof Int32Array > "u" ? n : Int32Array,
		"%isFinite%": isFinite,
		"%isNaN%": isNaN,
		"%IteratorPrototype%": w && T ? T(T([][Symbol.iterator]())) : n,
		"%JSON%": typeof JSON == "object" ? JSON : n,
		"%Map%": typeof Map > "u" ? n : Map,
		"%MapIteratorPrototype%": typeof Map > "u" || !w || !T ? n : T((/* @__PURE__ */ new Map())[Symbol.iterator]()),
		"%Math%": Math,
		"%Number%": Number,
		"%Object%": r,
		"%Object.getOwnPropertyDescriptor%": b,
		"%parseFloat%": parseFloat,
		"%parseInt%": parseInt,
		"%Promise%": typeof Promise > "u" ? n : Promise,
		"%Proxy%": typeof Proxy > "u" ? n : Proxy,
		"%RangeError%": o,
		"%ReferenceError%": s,
		"%Reflect%": typeof Reflect > "u" ? n : Reflect,
		"%RegExp%": RegExp,
		"%Set%": typeof Set > "u" ? n : Set,
		"%SetIteratorPrototype%": typeof Set > "u" || !w || !T ? n : T((/* @__PURE__ */ new Set())[Symbol.iterator]()),
		"%SharedArrayBuffer%": typeof SharedArrayBuffer > "u" ? n : SharedArrayBuffer,
		"%String%": String,
		"%StringIteratorPrototype%": w && T ? T(""[Symbol.iterator]()) : n,
		"%Symbol%": w ? Symbol : n,
		"%SyntaxError%": c,
		"%ThrowTypeError%": C,
		"%TypedArray%": j,
		"%TypeError%": l,
		"%Uint8Array%": typeof Uint8Array > "u" ? n : Uint8Array,
		"%Uint8ClampedArray%": typeof Uint8ClampedArray > "u" ? n : Uint8ClampedArray,
		"%Uint16Array%": typeof Uint16Array > "u" ? n : Uint16Array,
		"%Uint32Array%": typeof Uint32Array > "u" ? n : Uint32Array,
		"%URIError%": u,
		"%WeakMap%": typeof WeakMap > "u" ? n : WeakMap,
		"%WeakRef%": typeof WeakRef > "u" ? n : WeakRef,
		"%WeakSet%": typeof WeakSet > "u" ? n : WeakSet,
		"%Function.prototype.call%": k,
		"%Function.prototype.apply%": O,
		"%Object.defineProperty%": x,
		"%Object.getPrototypeOf%": E,
		"%Math.abs%": d,
		"%Math.floor%": f,
		"%Math.max%": p,
		"%Math.min%": m,
		"%Math.pow%": h,
		"%Math.round%": g,
		"%Math.sign%": _,
		"%Reflect.getPrototypeOf%": D
	};
	if (T) try {
		null.error;
	} catch (e) {
		M["%Error.prototype%"] = T(T(e));
	}
	var N = function e(t) {
		var n;
		if (t === "%AsyncFunction%") n = y("async function () {}");
		else if (t === "%GeneratorFunction%") n = y("function* () {}");
		else if (t === "%AsyncGeneratorFunction%") n = y("async function* () {}");
		else if (t === "%AsyncGenerator%") {
			var r = e("%AsyncGeneratorFunction%");
			r && (n = r.prototype);
		} else if (t === "%AsyncIteratorPrototype%") {
			var i = e("%AsyncGenerator%");
			i && T && (n = T(i.prototype));
		}
		return M[t] = n, n;
	}, P = {
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
	}, F = Oa(), I = Ia(), ee = F.call(k, Array.prototype.concat), L = F.call(O, Array.prototype.splice), R = F.call(k, String.prototype.replace), z = F.call(k, String.prototype.slice), te = F.call(k, RegExp.prototype.exec), B = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, V = /\\(\\)?/g, H = function(e) {
		var t = z(e, 0, 1), n = z(e, -1);
		if (t === "%" && n !== "%") throw new c("invalid intrinsic syntax, expected closing `%`");
		if (n === "%" && t !== "%") throw new c("invalid intrinsic syntax, expected opening `%`");
		var r = [];
		return R(e, B, function(e, t, n, i) {
			r[r.length] = n ? R(i, V, "$1") : t || e;
		}), r;
	}, ne = function(e, t) {
		var n = e, r;
		if (I(P, n) && (r = P[n], n = "%" + r[0] + "%"), I(M, n)) {
			var i = M[n];
			if (i === A && (i = N(n)), i === void 0 && !t) throw new l("intrinsic " + e + " exists, but is not available. Please file an issue!");
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
		if (te(/^%?[^%]*%?$/, e) === null) throw new c("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
		var n = H(e), r = n.length > 0 ? n[0] : "", i = ne("%" + r + "%", t), a = i.name, o = i.value, s = !1, u = i.alias;
		u && (r = u[0], L(n, ee([0, 1], u)));
		for (var d = 1, f = !0; d < n.length; d += 1) {
			var p = n[d], m = z(p, 0, 1), h = z(p, -1);
			if ((m === "\"" || m === "'" || m === "`" || h === "\"" || h === "'" || h === "`") && m !== h) throw new c("property names with quotes must have matching quotes");
			if ((p === "constructor" || !f) && (s = !0), r += "." + p, a = "%" + r + "%", I(M, a)) o = M[a];
			else if (o != null) {
				if (!(p in o)) {
					if (!t) throw new l("base intrinsic for " + e + " exists, but the property is not available.");
					return;
				}
				if (b && d + 1 >= n.length) {
					var g = b(o, p);
					f = !!g, o = f && "get" in g && !("originalValue" in g.get) ? g.get : o[p];
				} else f = I(o, p), o = o[p];
				f && !s && (M[a] = o);
			}
		}
		return o;
	};
})), Ra = /* @__PURE__ */ k(((e, t) => {
	var n = Ca();
	t.exports = function() {
		return n() && !!Symbol.toStringTag;
	};
})), za = /* @__PURE__ */ k(((e, t) => {
	var n = La()("%Object.defineProperty%", !0), r = Ra()(), i = Ia(), a = ua(), o = r ? Symbol.toStringTag : null;
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
})), Ba = /* @__PURE__ */ k(((e, t) => {
	t.exports = function(e, t) {
		return Object.keys(t).forEach(function(n) {
			e[n] = e[n] || t[n];
		}), e;
	};
})), Va = (/* @__PURE__ */ M((/* @__PURE__ */ k(((e, t) => {
	var n = Hi(), r = P("util"), i = P("path"), a = P("http"), o = P("https"), s = P("url").parse, c = P("fs"), l = P("stream").Stream, u = P("crypto"), d = qi(), f = ra(), p = za(), m = Ia(), h = Ba();
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
})))(), 1)).default, Ha = {
	isBufferAvailable() {
		return typeof Buffer < "u";
	},
	from(e) {
		return Buffer.from(e);
	}
};
function Ua(e) {
	return J.isPlainObject(e) || J.isArray(e);
}
function Wa(e) {
	return J.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function Ga(e, t, n) {
	return e ? e.concat(t).map(function(e, t) {
		return e = Wa(e), !n && t ? "[" + e + "]" : e;
	}).join(n ? "." : "") : t;
}
function Ka(e) {
	return J.isArray(e) && !e.some(Ua);
}
var qa = J.toFlatObject(J, {}, null, function(e) {
	return /^is[A-Z]/.test(e);
});
function Ja(e, t, n) {
	if (!J.isObject(e)) throw TypeError("target must be an object");
	t ||= new (Va || FormData)();
	let r = (e, t) => {
		let r = J.getSafeProp(n, e);
		return J.isUndefined(r) ? t : r;
	}, i = r("metaTokens", !0), a = r("visitor") || h, o = r("dots", !1), s = r("indexes", !1), c = r("Blob") || typeof Blob < "u" && Blob, l = r("maxDepth", 100), u = c && J.isSpecCompliantForm(t), d = [];
	if (!J.isFunction(a)) throw TypeError("visitor must be a function");
	function f(e) {
		if (e === null) return "";
		if (J.isDate(e)) return e.toISOString();
		if (J.isBoolean(e)) return e.toString();
		if (!u && J.isBlob(e)) throw new X("Blob is not supported. Use a Buffer instead.");
		if (J.isArrayBuffer(e) || J.isTypedArray(e)) {
			if (u && typeof c == "function") return new c([e]);
			if (Ha && Ha.isBufferAvailable()) return Ha.from(e);
			throw new X("Blob is not supported. Use a Buffer instead.", X.ERR_NOT_SUPPORT);
		}
		return e;
	}
	function p(e) {
		if (e > l) throw new X("Object is too deeply nested (" + e + " levels). Max depth: " + l, X.ERR_FORM_DATA_DEPTH_EXCEEDED);
	}
	function m(e, t) {
		if (l === Infinity) return JSON.stringify(e);
		let n = [];
		return JSON.stringify(e, function(e, r) {
			if (!J.isObject(r)) return r;
			for (; n.length && n[n.length - 1] !== this;) n.pop();
			return n.push(r), p(t + n.length - 1), r;
		});
	}
	function h(e, n, r) {
		let a = e;
		if (J.isReactNative(t) && J.isReactNativeBlob(e)) return t.append(Ga(r, n, o), f(e)), !1;
		if (e && !r && typeof e == "object") {
			if (J.endsWith(n, "{}")) n = i ? n : n.slice(0, -2), e = m(e, 1);
			else if (J.isArray(e) && Ka(e) || (J.isFileList(e) || J.endsWith(n, "[]")) && (a = J.toArray(e))) return n = Wa(n), a.forEach(function(e, r) {
				!(J.isUndefined(e) || e === null) && t.append(s === !0 ? Ga([n], r, o) : s === null ? n : n + "[]", f(e));
			}), !1;
		}
		return Ua(e) ? !0 : (t.append(Ga(r, n, o), f(e)), !1);
	}
	let g = Object.assign(qa, {
		defaultVisitor: h,
		convertValue: f,
		isVisitable: Ua
	});
	function _(e, n, r = 0) {
		if (!J.isUndefined(e)) {
			if (p(r), d.indexOf(e) !== -1) throw Error("Circular reference detected in " + n.join("."));
			d.push(e), J.forEach(e, function(e, i) {
				(!(J.isUndefined(e) || e === null) && a.call(t, e, J.isString(i) ? i.trim() : i, n, g)) === !0 && _(e, n ? n.concat(i) : [i], r + 1);
			}), d.pop();
		}
	}
	if (!J.isObject(e)) throw TypeError("data must be an object");
	return _(e), t;
}
//#endregion
//#region node_modules/axios/lib/helpers/AxiosURLSearchParams.js
function Ya(e) {
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
function Xa(e, t) {
	this._pairs = [], e && Ja(e, this, t);
}
var Za = Xa.prototype;
Za.append = function(e, t) {
	this._pairs.push([e, t]);
}, Za.toString = function(e) {
	let t = e ? (t) => e.call(this, t, Ya) : Ya;
	return this._pairs.map(function(e) {
		return t(e[0]) + "=" + t(e[1]);
	}, "").join("&");
};
//#endregion
//#region node_modules/axios/lib/helpers/buildURL.js
function Qa(e) {
	return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+");
}
function $a(e, t, n) {
	if (!t) return e;
	e ||= "";
	let r = J.isFunction(n) ? { serialize: n } : n, i = J.getSafeProp(r, "encode") || Qa, a = J.getSafeProp(r, "serialize"), o;
	if (o = a ? a(t, r) : J.isURLSearchParams(t) ? t.toString() : new Xa(t, r).toString(i), o) {
		let t = e.indexOf("#");
		t !== -1 && (e = e.slice(0, t)), e += (e.indexOf("?") === -1 ? "?" : "&") + o;
	}
	return e;
}
//#endregion
//#region node_modules/axios/lib/core/InterceptorManager.js
var eo = Symbol("internals");
function to(e) {
	return e ? e.length : 0;
}
function no(e) {
	if (e) for (; e.length && e[e.length - 1] === null;) e.pop();
}
function ro(e, t) {
	let n = e.handlers, r = to(n);
	n === t.handlersRef ? r !== t.handlersLength && (r ? t.handlerEntries.forEach(function(e, r) {
		n[e.index] !== e.handler && t.handlerEntries.delete(r);
	}) : t.handlerEntries.clear()) : (t.handlersRef = n, t.handlerEntries.clear()), t.handlersLength = r;
}
var io = class {
	constructor() {
		this.handlers = [], this[eo] = {
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
		}, i = this[eo];
		this.handlers ??= [], ro(this, i);
		let a = i.nextId++;
		return this.handlers.push(r), i.handlerEntries.set(a, {
			handler: r,
			index: this.handlers.length - 1
		}), i.handlersLength = this.handlers.length, a;
	}
	eject(e) {
		let t = this[eo];
		ro(this, t);
		let n = t.handlerEntries.get(e);
		if (n) {
			if (t.handlerEntries.delete(e), this.handlers[n.index] !== n.handler) return;
			this.handlers[n.index] = null, t.iterationDepth || (no(this.handlers), t.handlersLength = this.handlers.length);
		}
	}
	clear() {
		this.handlers && (this.handlers = [], ro(this, this[eo]));
	}
	forEach(e) {
		let t = this[eo];
		ro(this, t), t.iterationDepth++;
		try {
			J.forEach(this.handlers, function(t) {
				t !== null && e(t);
			});
		} finally {
			--t.iterationDepth || (ro(this, t), no(this.handlers), t.handlersLength = to(this.handlers));
		}
	}
}, ao = {
	silentJSONParsing: !0,
	forcedJSONParsing: !0,
	clarifyTimeoutError: !1,
	legacyInterceptorReqResOrdering: !0,
	advertiseZstdAcceptEncoding: !1,
	validateStatusUndefinedResolves: !0
}, oo = h.URLSearchParams, so = "abcdefghijklmnopqrstuvwxyz", co = "0123456789", lo = {
	DIGIT: co,
	ALPHA: so,
	ALPHA_DIGIT: so + so.toUpperCase() + co
}, uo = {
	isNode: !0,
	classes: {
		URLSearchParams: oo,
		FormData: Va,
		Blob: typeof Blob < "u" && Blob || null
	},
	ALPHABET: lo,
	generateString: (e = 16, t = lo.ALPHA_DIGIT) => {
		let n = "", { length: r } = t, i = new Uint32Array(e);
		d.randomFillSync(i);
		for (let a = 0; a < e; a++) n += t[i[a] % r];
		return n;
	},
	protocols: [
		"http",
		"https",
		"file",
		"data"
	]
}, fo = /* @__PURE__ */ A({
	hasBrowserEnv: () => po,
	hasStandardBrowserEnv: () => ho,
	hasStandardBrowserWebWorkerEnv: () => go,
	navigator: () => mo,
	origin: () => _o
}), po = typeof window < "u" && typeof document < "u", mo = typeof navigator == "object" && navigator || void 0, ho = po && (!mo || [
	"ReactNative",
	"NativeScript",
	"NS"
].indexOf(mo.product) < 0), go = typeof WorkerGlobalScope < "u" && self instanceof WorkerGlobalScope && typeof self.importScripts == "function", _o = po && window.location.href || "http://localhost", Z = {
	...fo,
	...uo
};
//#endregion
//#region node_modules/axios/lib/helpers/toURLEncodedForm.js
function vo(e, t) {
	return Ja(e, new Z.classes.URLSearchParams(), {
		visitor: function(e, t, n, r) {
			return Z.isNode && J.isBuffer(e) ? (this.append(t, e.toString("base64")), !1) : r.defaultVisitor.apply(this, arguments);
		},
		...t
	});
}
//#endregion
//#region node_modules/axios/lib/helpers/formDataToJSON.js
var yo = 100;
function bo(e) {
	if (e > yo) throw new X("FormData field is too deeply nested (" + e + " levels). Max depth: " + yo, X.ERR_FORM_DATA_DEPTH_EXCEEDED);
}
function xo(e) {
	let t = [], n = /[^.[\]]+|\[([^.[\]]*)]/g, r;
	for (; (r = n.exec(e)) !== null;) bo(t.length), t.push(r[0] === "[]" ? "" : r[1] || r[0]);
	return t;
}
function So(e) {
	let t = {}, n = Object.keys(e), r, i = n.length, a;
	for (r = 0; r < i; r++) a = n[r], t[a] = e[a];
	return t;
}
function Co(e) {
	function t(e, n, r, i) {
		bo(i);
		let a = e[i++];
		if (a === "__proto__") return !0;
		let o = Number.isFinite(+a), s = i >= e.length;
		return a = !a && J.isArray(r) ? r.length : a, s ? (J.hasOwnProp(r, a) ? r[a] = J.isArray(r[a]) ? r[a].concat(n) : [r[a], n] : r[a] = n, !o) : ((!J.hasOwnProp(r, a) || !J.isObject(r[a])) && (r[a] = []), t(e, n, r[a], i) && J.isArray(r[a]) && (r[a] = So(r[a])), !o);
	}
	if (J.isFormData(e) && J.isFunction(e.entries)) {
		let n = {};
		return J.forEachEntry(e, (e, r) => {
			t(xo(e), r, n, 0);
		}), n;
	}
	return null;
}
//#endregion
//#region node_modules/axios/lib/core/methodList.js
var wo = Object.freeze([
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
]), To = (e, t) => e != null && J.hasOwnProp(e, t) ? e[t] : void 0;
function Eo(e, t, n) {
	if (J.isString(e)) try {
		return (t || JSON.parse)(e), J.trim(e);
	} catch (e) {
		if (e.name !== "SyntaxError") throw e;
	}
	return (n || JSON.stringify)(e);
}
var Do = {
	transitional: ao,
	adapter: [
		"xhr",
		"http",
		"fetch"
	],
	transformRequest: [function(e, t) {
		let n = t.getContentType() || "", r = n.indexOf("application/json") > -1, i = J.isObject(e);
		if (i && J.isHTMLForm(e) && (e = new FormData(e)), J.isFormData(e)) return r ? JSON.stringify(Co(e)) : e;
		if (J.isArrayBuffer(e) || J.isBuffer(e) || J.isStream(e) || J.isFile(e) || J.isBlob(e) || J.isReadableStream(e)) return e;
		if (J.isArrayBufferView(e)) return e.buffer;
		if (J.isURLSearchParams(e)) return t.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), e.toString();
		let a;
		if (i) {
			let t = To(this, "formSerializer");
			if (n.indexOf("application/x-www-form-urlencoded") > -1) return vo(e, t).toString();
			if ((a = J.isFileList(e)) || n.indexOf("multipart/form-data") > -1) {
				let n = To(this, "env"), r = n && n.FormData;
				return Ja(a ? { "files[]": e } : e, r && new r(), t);
			}
		}
		return i || r ? (t.setContentType("application/json", !1), Eo(e)) : e;
	}],
	transformResponse: [function(e) {
		let t = To(this, "transitional") || Do.transitional, n = t && t.forcedJSONParsing, r = To(this, "responseType"), i = r === "json";
		if (J.isResponse(e) || J.isReadableStream(e)) return e;
		if (e && J.isString(e) && (n && !r || i)) {
			let n = !(t && t.silentJSONParsing) && i;
			try {
				return JSON.parse(e, To(this, "parseReviver"));
			} catch (e) {
				if (n) throw e.name === "SyntaxError" ? X.from(e, X.ERR_BAD_RESPONSE, this, null, To(this, "response")) : e;
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
		FormData: Z.classes.FormData,
		Blob: Z.classes.Blob
	},
	validateStatus: function(e) {
		return e >= 200 && e < 300;
	},
	headers: { common: {
		Accept: "application/json, text/plain, */*",
		"Content-Type": void 0
	} }
};
J.forEach(wo, (e) => {
	Do.headers[e] = {};
});
//#endregion
//#region node_modules/axios/lib/core/transformData.js
function Oo(e, t) {
	let n = this || Do, r = t || n, i = Y.from(r.headers), a = r.data;
	return J.forEach(e, function(e) {
		a = e.call(n, a, i.normalize(), t ? t.status : void 0);
	}), i.normalize(), a;
}
//#endregion
//#region node_modules/axios/lib/cancel/isCancel.js
function ko(e) {
	return !!(e && e.__CANCEL__);
}
//#endregion
//#region node_modules/axios/lib/cancel/CanceledError.js
var Ao = class extends X {
	constructor(e, t, n) {
		super(e ?? "canceled", X.ERR_CANCELED, t, n), this.name = "CanceledError", this.__CANCEL__ = !0;
	}
};
//#endregion
//#region node_modules/axios/lib/core/settle.js
function jo(e, t, n) {
	let r = n.config.validateStatus;
	!n.status || !r || r(n.status) ? e(n) : t(new X("Request failed with status code " + n.status, n.status >= 400 && n.status < 500 ? X.ERR_BAD_REQUEST : X.ERR_BAD_RESPONSE, n.config, n.request, n));
}
//#endregion
//#region node_modules/axios/lib/helpers/isAbsoluteURL.js
function Mo(e) {
	return typeof e == "string" && /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
//#endregion
//#region node_modules/axios/lib/helpers/combineURLs.js
function No(e, t) {
	if (!t) return e;
	let n = e.length;
	for (; n > 0 && e.charCodeAt(n - 1) === 47;) n--;
	return e.slice(0, n) + "/" + t.replace(/^\/+/, "");
}
//#endregion
//#region node_modules/axios/lib/helpers/normalizeURLForProtocolCheck.js
var Po = /[\t\n\r]/g;
function Fo(e) {
	if (typeof e != "string") return e;
	let t = 0;
	for (; t < e.length && e.charCodeAt(t) <= 32;) t++;
	return e.slice(t).replace(Po, "");
}
//#endregion
//#region node_modules/axios/lib/core/buildFullPath.js
var Io = /^https?:(?!\/\/)/i;
function Lo(e) {
	return e && e.replace(/(^|&)([^=&]*=)?[^&]+/g, (e, t, n = "") => `${t}${n}${Ii}`);
}
function Ro(e) {
	let t = e.replace(/^(https?:\/{0,2})[^/?#]*@/i, `$1${Ii}@`), n = t.indexOf("#"), r = (n === -1 ? t : t.slice(0, n)).replace(/([?&][^=&#]*=)[^&#]*/g, `$1${Ii}`);
	return n === -1 ? r : `${r}#${Lo(t.slice(n + 1))}`;
}
function zo(e, t) {
	if (typeof e == "string") {
		let n = Fo(e);
		if (Io.test(n)) throw new X(`Invalid URL ${JSON.stringify(Ro(n))}: missing "//" after protocol`, X.ERR_INVALID_URL, t);
	}
}
function Bo(e, t, n, r) {
	zo(t, r);
	let i = !Mo(t);
	return e && (i || n === !1) ? (zo(e, r), No(e, t)) : t;
}
//#endregion
//#region node_modules/proxy-from-env/index.js
var Vo = {
	ftp: 21,
	gopher: 70,
	http: 80,
	https: 443,
	ws: 80,
	wss: 443
};
function Ho(e) {
	try {
		return new URL(e);
	} catch {
		return null;
	}
}
function Uo(e) {
	var t = (typeof e == "string" ? Ho(e) : e) || {}, n = t.protocol, r = t.host, i = t.port;
	if (typeof r != "string" || !r || typeof n != "string" || (n = n.split(":", 1)[0], r = r.replace(/:\d*$/, ""), i = parseInt(i) || Vo[n] || 0, !Wo(r, i))) return "";
	var a = Go(n + "_proxy") || Go("all_proxy");
	return a && a.indexOf("://") === -1 && (a = n + "://" + a), a;
}
function Wo(e, t) {
	var n = Go("no_proxy").toLowerCase();
	return !n || n !== "*" && n.split(/[,\s]/).every(function(n) {
		if (!n) return !0;
		var r = n.match(/^(.+):(\d+)$/), i = r ? r[1] : n, a = r ? parseInt(r[2]) : 0;
		return a && a !== t ? !0 : /^[.*]/.test(i) ? (i.charAt(0) === "*" && (i = i.slice(1)), !e.endsWith(i)) : e !== i;
	});
}
function Go(e) {
	return process.env[e.toLowerCase()] || process.env[e.toUpperCase()] || "";
}
//#endregion
//#region node_modules/axios/node_modules/agent-base/dist/src/promisify.js
var Ko = /* @__PURE__ */ k(((e) => {
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
})), qo = /* @__PURE__ */ k(((e, t) => {
	var n = e && e.__importDefault || function(e) {
		return e && e.__esModule ? e : { default: e };
	}, r = P("events"), i = n(ze()), a = n(Ko()), o = i.default("agent-base");
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
})), Jo = /* @__PURE__ */ k(((e) => {
	var t = e && e.__importDefault || function(e) {
		return e && e.__esModule ? e : { default: e };
	};
	Object.defineProperty(e, "__esModule", { value: !0 });
	var n = t(ze()).default("https-proxy-agent:parse-proxy-response");
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
})), Yo = /* @__PURE__ */ k(((e) => {
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
	var r = n(P("net")), i = n(P("tls")), a = n(P("url")), o = n(P("assert")), s = n(ze()), c = qo(), l = n(Jo()), u = s.default("https-proxy-agent:agent");
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
				let v = l.default(s);
				s.write(`${p}\r\n`);
				let { statusCode: y, buffered: b } = yield v;
				if (y === 200) {
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
				let x = new r.default.Socket({ writable: !1 });
				return x.readable = !0, e.once("socket", (e) => {
					u("replaying proxy buffer for failed request"), o.default(e.listenerCount("data") > 0), e.push(b), e.push(null);
				}), x;
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
})), Xo = /* @__PURE__ */ k(((e, t) => {
	var n = (e && e.__importDefault || function(e) {
		return e && e.__esModule ? e : { default: e };
	})(Yo());
	function r(e) {
		return new n.default(e);
	}
	(function(e) {
		e.HttpsProxyAgent = n.default, e.prototype = n.default.prototype;
	})(r ||= {}), t.exports = r;
})), Zo = /* @__PURE__ */ k(((e, t) => {
	var n;
	t.exports = function() {
		if (!n) {
			try {
				n = ze()("follow-redirects");
			} catch {}
			typeof n != "function" && (n = function() {});
		}
		n.apply(null, arguments);
	};
})), Qo = /* @__PURE__ */ k(((e, t) => {
	var n = P("url"), r = n.URL, i = P("http"), a = P("https"), o = P("stream").Writable, s = P("assert"), c = Zo();
	// istanbul ignore next
	(function() {
		var e = typeof process < "u", t = typeof window < "u" && typeof document < "u", n = N(Error.captureStackTrace);
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
	var m = O("ERR_INVALID_URL", "Invalid URL", TypeError), h = O("ERR_FR_REDIRECTION_FAILURE", "Redirected request failed"), g = O("ERR_FR_TOO_MANY_REDIRECTS", "Maximum number of redirects exceeded", h), _ = O("ERR_FR_MAX_BODY_LENGTH_EXCEEDED", "Request body larger than maxBodyLength limit"), v = O("ERR_STREAM_WRITE_AFTER_END", "write after end"), y = o.prototype.destroy || S;
	function b(e, t) {
		o.call(this), this._sanitizeOptions(e), this._options = e, this._ended = !1, this._ending = !1, this._redirectCount = 0, this._redirects = [], this._requestBodyLength = 0, this._requestBodyBuffers = [], t && this.on("response", t);
		var n = this;
		this._onNativeResponse = function(e) {
			try {
				n._processResponse(e);
			} catch (e) {
				n.emit("error", e instanceof h ? e : new h({ cause: e }));
			}
		}, this._headerFilter = RegExp("^(?:" + u.concat(e.sensitiveHeaders).map(ee).join("|") + ")$", "i"), this._performRequest();
	}
	b.prototype = Object.create(o.prototype), b.prototype.abort = function() {
		k(this._currentRequest), this._currentRequest.abort(), this.emit("abort");
	}, b.prototype.destroy = function(e) {
		return k(this._currentRequest, e), y.call(this, e), this;
	}, b.prototype.write = function(e, t, n) {
		if (this._ending) throw new v();
		if (!M(e) && !F(e)) throw TypeError("data should be a string, Buffer or Uint8Array");
		if (N(t) && (n = t, t = null), e.length === 0) {
			n && n();
			return;
		}
		this._requestBodyLength + e.length <= this._options.maxBodyLength ? (this._requestBodyLength += e.length, this._requestBodyBuffers.push({
			data: e,
			encoding: t
		}), this._currentRequest.write(e, t, n)) : (this.emit("error", new _()), this.abort());
	}, b.prototype.end = function(e, t, n) {
		if (N(e) ? (n = e, e = t = null) : N(t) && (n = t, t = null), !e) this._ended = this._ending = !0, this._currentRequest.end(null, null, n);
		else {
			var r = this, i = this._currentRequest;
			this.write(e, t, function() {
				r._ended = !0, i.end(null, null, n);
			}), this._ending = !0;
		}
	}, b.prototype.setHeader = function(e, t) {
		this._options.headers[e] = t, this._currentRequest.setHeader(e, t);
	}, b.prototype.removeHeader = function(e) {
		delete this._options.headers[e], this._currentRequest.removeHeader(e);
	}, b.prototype.setTimeout = function(e, t) {
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
		b.prototype[e] = function(t, n) {
			return this._currentRequest[e](t, n);
		};
	}), [
		"aborted",
		"connection",
		"socket"
	].forEach(function(e) {
		Object.defineProperty(b.prototype, e, { get: function() {
			return this._currentRequest[e];
		} });
	}), b.prototype._sanitizeOptions = function(e) {
		if (e.headers ||= {}, j(e.sensitiveHeaders) || (e.sensitiveHeaders = []), e.host && (e.hostname ||= e.host, delete e.host), !e.pathname && e.path) {
			var t = e.path.indexOf("?");
			t < 0 ? e.pathname = e.path : (e.pathname = e.path.substring(0, t), e.search = e.path.substring(t));
		}
	}, b.prototype._performRequest = function() {
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
	}, b.prototype._processResponse = function(e) {
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
		if (k(this._currentRequest), e.destroy(), ++this._redirectCount > this._options.maxRedirects) throw new g();
		var i, a = this._options.beforeRedirect;
		a && (i = Object.assign({ Host: e.req.getHeader("host") }, this._options.headers));
		var o = this._options.method;
		((t === 301 || t === 302) && this._options.method === "POST" || t === 303 && !/^(?:GET|HEAD)$/.test(this._options.method)) && (this._options.method = "GET", this._requestBodyBuffers = [], D(/^content-/i, this._options.headers));
		var s = D(/^host$/i, this._options.headers), l = C(this._currentUrl), u = s || l.host, d = /^\w+:/.test(r) ? this._currentUrl : n.format(Object.assign(l, { host: u })), f = w(r, d);
		if (c("redirecting to", f.href), this._isRedirect = !0, E(f, this._options), (f.protocol !== l.protocol && f.protocol !== "https:" || f.host !== u && !A(f.host, u)) && D(this._headerFilter, this._options.headers), N(a)) {
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
	function x(e) {
		var t = {
			maxRedirects: 21,
			maxBodyLength: 10485760
		}, n = {};
		return Object.keys(e).forEach(function(r) {
			var i = r + ":", a = n[i] = e[r], o = t[r] = Object.create(a);
			function l(e, r, a) {
				return I(e) ? e = E(e) : M(e) ? e = E(C(e)) : (a = r, r = T(e), e = { protocol: i }), N(r) && (a = r, r = null), r = Object.assign({
					maxRedirects: t.maxRedirects,
					maxBodyLength: t.maxBodyLength
				}, e, r), r.nativeProtocols = n, !M(r.host) && !M(r.hostname) && (r.hostname = "::1"), s.equal(r.protocol, i, "protocol mismatch"), c("options", r), new b(r, a);
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
	function S() {}
	function C(e) {
		var t;
		// istanbul ignore else
		if (l) t = new r(e);
		else if (t = T(n.parse(e)), !M(t.protocol)) throw new m({ input: e });
		return t;
	}
	function w(e, t) {
		// istanbul ignore next
		return l ? new r(e, t) : C(n.resolve(t, e));
	}
	function T(e) {
		if (/^\[/.test(e.hostname) && !/^\[[:0-9a-f]+\]$/i.test(e.hostname) || /^\[/.test(e.host) && !/^\[[:0-9a-f]+\](:\d+)?$/i.test(e.host)) throw new m({ input: e.href || e });
		return e;
	}
	function E(e, t) {
		var n = t || {};
		for (var r of d) n[r] = e[r];
		return n.hostname.startsWith("[") && (n.hostname = n.hostname.slice(1, -1)), n.port !== "" && (n.port = Number(n.port)), n.path = n.search ? n.pathname + n.search : n.pathname, n;
	}
	function D(e, t) {
		var n;
		for (var r in t) e.test(r) && (n = t[r], delete t[r]);
		return n == null ? void 0 : String(n).trim();
	}
	function O(e, t, n) {
		function r(n) {
			N(Error.captureStackTrace) && Error.captureStackTrace(this, this.constructor), Object.assign(this, n || {}), this.code = e, this.message = this.cause ? t + ": " + this.cause.message : t;
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
	function k(e, t) {
		for (var n of f) e.removeListener(n, p[n]);
		e.on("error", S), e.destroy(t);
	}
	function A(e, t) {
		s(M(e) && M(t));
		var n = e.length - t.length - 1;
		return n > 0 && e[n] === "." && e.endsWith(t);
	}
	function j(e) {
		return e instanceof Array;
	}
	function M(e) {
		return typeof e == "string" || e instanceof String;
	}
	function N(e) {
		return typeof e == "function";
	}
	function F(e) {
		return typeof e == "object" && "length" in e;
	}
	function I(e) {
		return r && e instanceof r;
	}
	function ee(e) {
		return e.replace(/[\]\\/()*+?.$]/g, "\\$&");
	}
	t.exports = x({
		http: i,
		https: a
	}), t.exports.wrap = x;
})), $o = "1.20.0";
//#endregion
//#region node_modules/axios/lib/helpers/parseProtocol.js
function es(e) {
	let t = /^([-+\w]{1,25}):(?:\/\/)?/.exec(e);
	return t && t[1] || "";
}
//#endregion
//#region node_modules/axios/lib/helpers/fromDataURI.js
var ts = /^([^,;/]+\/[^,;/]+)?((?:;[^,;=]+=[^,;]+)*)(;base64)?,([\s\S]*)$/;
function ns(e, t, n) {
	let r = n && n.Blob || Z.classes.Blob, i = es(e);
	if (t === void 0 && r && (t = !0), i === "data") {
		e = i.length ? e.slice(i.length + 1) : e;
		let n = ts.exec(e);
		if (!n) throw new X("Invalid URL", X.ERR_INVALID_URL);
		let a = n[1], o = n[2], s = n[3] ? "base64" : "utf8", c = n[4], l = "";
		a ? l = o ? a + o : a : o && (l = "text/plain" + o);
		let u = s === "base64" ? Buffer.from(c, "base64") : Buffer.from(decodeURIComponent(c), s);
		if (t) {
			if (!r) throw new X("Blob is not supported", X.ERR_NOT_SUPPORT);
			return new r([u], { type: l });
		}
		return u;
	}
	throw new X("Unsupported protocol " + i, X.ERR_NOT_SUPPORT);
}
//#endregion
//#region node_modules/axios/lib/core/setFormDataHeaders.js
var rs = ["content-type", "content-length"];
function is(e, t, n) {
	if (n !== "content-only") {
		e.set(t);
		return;
	}
	Object.entries(t || {}).forEach(([t, n]) => {
		rs.includes(t.toLowerCase()) && e.set(t, n);
	});
}
//#endregion
//#region node_modules/axios/lib/helpers/AxiosTransformStream.js
var as = Symbol("internals"), os = class extends a.Transform {
	constructor(e) {
		e = J.toFlatObject(e, {
			maxRate: 0,
			chunkSize: 65536,
			minChunkSize: 100,
			timeWindow: 500,
			ticksRate: 2,
			samplesCount: 15
		}, null, (e, t) => !J.isUndefined(t[e])), super({ readableHighWaterMark: e.chunkSize });
		let t = this[as] = {
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
		let t = this[as];
		return t.onReadCallback && t.onReadCallback(), super._read(e);
	}
	_transform(e, t, n) {
		let r = this[as], i = r.maxRate, a = this.readableHighWaterMark, o = r.timeWindow, s = i / (1e3 / o), c = r.minChunkSize === !1 ? 0 : Math.max(r.minChunkSize, s * .01), l = (e, t) => {
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
}, { asyncIterator: ss } = Symbol, cs = async function* (e) {
	e.stream ? yield* e.stream() : e.arrayBuffer ? yield await e.arrayBuffer() : e[ss] ? yield* e[ss]() : yield e;
}, ls = Z.ALPHABET.ALPHA_DIGIT + "-_", us = typeof TextEncoder == "function" ? new TextEncoder() : new s.TextEncoder(), ds = "\r\n", fs = us.encode(ds), ps = 2, ms = class {
	constructor(e, t) {
		let { escapeName: n } = this.constructor, r = J.isString(t), i = `Content-Disposition: form-data; name="${n(e)}"${!r && t.name ? `; filename="${n(t.name)}"` : ""}${ds}`;
		if (r) t = us.encode(String(t).replace(/\r?\n|\r\n?/g, ds));
		else {
			let e = String(t.type || "application/octet-stream").replace(/[\r\n]/g, "");
			i += `Content-Type: ${e}${ds}`;
		}
		this.headers = us.encode(i + ds), this.contentLength = r ? t.byteLength : t.size, this.size = this.headers.byteLength + this.contentLength + ps, this.name = e, this.value = t;
	}
	async *encode() {
		yield this.headers;
		let { value: e } = this;
		J.isTypedArray(e) ? yield e : yield* cs(e), yield fs;
	}
	static escapeName(e) {
		return String(e).replace(/[\r\n"]/g, (e) => ({
			"\r": "%0D",
			"\n": "%0A",
			"\"": "%22"
		})[e]);
	}
}, hs = (e, t, n) => {
	let { tag: r = "form-data-boundary", size: i = 25, boundary: a = r + "-" + Z.generateString(i, ls) } = n || {};
	if (!J.isFormData(e)) throw TypeError("FormData instance required");
	if (a.length < 1 || a.length > 70) throw Error("boundary must be 1-70 characters long");
	let s = us.encode("--" + a + ds), c = us.encode("--" + a + "--\r\n"), l = c.byteLength, u = Array.from(e.entries()).map(([e, t]) => {
		let n = new ms(e, t);
		return l += n.size, n;
	});
	l += s.byteLength * u.length, l = J.toFiniteNumber(l);
	let d = { "Content-Type": `multipart/form-data; boundary=${a}` };
	return Number.isFinite(l) && (d["Content-Length"] = l), t && t(d), o.from((async function* () {
		for (let e of u) yield s, yield* e.encode();
		yield c;
	})());
}, gs = class extends a.Transform {
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
}, _s = class {
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
				if (!e.destroyed && !e.closed && s.isDeepStrictEqual(i, t)) return e;
			}
		}
		let r = x.connect(e, t), i, a, o = () => {
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
						a = null, o();
					}, l));
				}), t;
			};
		}
		r.once("close", o), r.once("error", o);
		let u = [r, t];
		return n ? n.push(u) : n = this.sessions[e] = [u], r;
	}
}, vs = (e, t) => J.isAsyncFn(e) ? function(...n) {
	let r = n.pop();
	e.apply(this, n).then((e) => {
		try {
			t ? r(null, ...t(e)) : r(null, e);
		} catch (e) {
			r(e);
		}
	}, r);
} : e, ys = /* @__PURE__ */ new Set(["localhost", "0.0.0.0"]), bs = (e) => {
	let t = e.length;
	for (; t && e.charCodeAt(t - 1) === 46;) t--;
	return t === e.length ? e : e.slice(0, t);
}, xs = (e) => {
	let t = e.split(".");
	return t.length !== 4 || t[0] !== "127" ? !1 : t.every((e) => /^\d+$/.test(e) && Number(e) >= 0 && Number(e) <= 255);
}, Ss = (e) => {
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
}, Cs = (e) => {
	if (typeof e != "string" || !e || e.indexOf(":") !== -1) return e;
	let t = e;
	if (t.charAt(0) === "[" && t.charAt(t.length - 1) === "]" && (t = t.slice(1, -1)), t = bs(t), !/^[0-9.xXa-fA-F]+$/.test(t)) return e;
	let n = t.split(".");
	if (n.some((e) => e === "")) return e;
	if (n.length === 4) {
		let t = n.map(Ss);
		return t.some((e) => e === null || e < 0 || e > 255) ? e : t.join(".");
	}
	if (n.length > 4 || n.length === 1) return e;
	let r = n.slice(0, -1), i = n[n.length - 1], a = 4 - r.length, o = Ss(i);
	if (o === null) return e;
	let s = (1 << 8 * a) - 1;
	if (o < 0 || o > s) return e;
	let c = Array(a).fill(0);
	for (let e = a - 1, t = o; e >= 0; e--, t >>= 8) c[e] = t & 255;
	let l = r.map(Ss);
	return l.some((e) => e === null || e < 0 || e > 255) ? e : [...l, ...c].join(".");
}, ws = (e) => /^0{1,4}$/.test(e), Ts = (e) => {
	if (e === "::") return !0;
	let t = e.indexOf("::");
	if (t !== -1) {
		if (t !== e.lastIndexOf("::")) return !1;
		let n = e.slice(0, t), r = e.slice(t + 2), i = n ? n.split(":") : [], a = r ? r.split(":") : [];
		return i.length + a.length < 8 && i.every(ws) && a.every(ws);
	}
	let n = e.split(":");
	return n.length === 8 && n.every(ws);
}, Es = (e) => {
	if (e === "::1") return !0;
	let t = e.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/i);
	if (t) return xs(t[1]);
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
}, Ds = (e) => e ? ys.has(e) || xs(e) || Ts(e) ? !0 : Es(e) : !1, Os = {
	http: 80,
	https: 443,
	ws: 80,
	wss: 443,
	ftp: 21
}, ks = (e) => {
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
}, As = /^(?:::|(?:0{1,4}:){1,4}:|(?:0{1,4}:){5})ffff:(\d+\.\d+\.\d+\.\d+)$/i, js = /^(?:::|(?:0{1,4}:){1,4}:|(?:0{1,4}:){5})ffff:([0-9a-f]{1,4}):([0-9a-f]{1,4})$/i, Ms = (e) => {
	if (typeof e != "string" || e.indexOf(":") === -1) return e;
	let t = e.match(As);
	if (t) return t[1];
	let n = e.match(js);
	if (n) {
		let e = parseInt(n[1], 16), t = parseInt(n[2], 16);
		return `${e >> 8}.${e & 255}.${t >> 8}.${t & 255}`;
	}
	return e;
}, Ns = /^(?:0|[1-9]\d{0,2})$/, Ps = (e) => {
	let t = e.split(".");
	return t.length === 4 && t.every((e) => Ns.test(e) && Number(e) <= 255) ? t.map(Number) : null;
}, Fs = /^[0-9a-f]{1,4}$/i, Is = (e) => {
	let t = e.split("::");
	if (t.length > 2) return null;
	let n = t[0] ? t[0].split(":") : [];
	if (t.length === 2) {
		let e = t[1] ? t[1].split(":") : [], r = 8 - n.length - e.length;
		if (r < 1) return null;
		n.push(...Array(r).fill("0"), ...e);
	}
	return n.length !== 8 || n.some((e) => !Fs.test(e)) ? null : n.flatMap((e) => {
		let t = Number.parseInt(e, 16);
		return [t >> 8 & 255, t & 255];
	});
}, Ls = (e) => typeof e != "string" || !e ? null : e.indexOf(":") === -1 ? Ps(e) : Is(e), Rs = (e) => {
	if (!e) return e;
	e.charAt(0) === "[" && e.charAt(e.length - 1) === "]" && (e = e.slice(1, -1));
	let t = bs(e), n = Cs(t);
	return n === t ? Ms(t) : n;
}, zs = (e) => {
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
	else if (t = Cs(t), !Ps(t)) return null;
	return {
		normalized: Ms(t),
		wasIPv6: a
	};
}, Bs = /^(.+)\/(0|[1-9]\d{0,2})$/, Vs = (e) => {
	if (e.indexOf("/") === -1) return;
	let t = Bs.exec(e);
	if (!t) return null;
	let n = Number(t[2]), r = zs(t[1]);
	if (!r) return null;
	let { normalized: i, wasIPv6: a } = r;
	if (a && i.indexOf(":") === -1) {
		if (n < 96) return null;
		n -= 96;
	}
	let o = Ls(i);
	return !o || n > o.length * 8 ? null : {
		bytes: o,
		prefix: n
	};
}, Hs = (e, t, n) => {
	let r = n >> 3;
	for (let n = 0; n < r; n++) if (e[n] !== t[n]) return !1;
	let i = n & 7;
	if (i) {
		let n = 255 << 8 - i & 255;
		if ((e[r] & n) !== (t[r] & n)) return !1;
	}
	return !0;
};
function Us(e) {
	let t;
	try {
		t = new URL(e);
	} catch {
		return !1;
	}
	let n = (process.env.no_proxy || process.env.NO_PROXY || "").toLowerCase();
	if (!n) return !1;
	if (n === "*") return !0;
	let r = Number.parseInt(t.port, 10) || Os[t.protocol.split(":", 1)[0]] || 0, i = Rs(t.hostname.toLowerCase()), a = Ls(i);
	return n.split(/[\s,]+/).some((e) => {
		if (!e) return !1;
		if (e === "*") return !0;
		let t = Vs(e);
		if (t !== void 0) return t !== null && !!a && a.length === t.bytes.length && Hs(a, t.bytes, t.prefix);
		let [n, o] = ks(e);
		return n = Rs(n), !n || o && o !== r ? !1 : (n.charAt(0) === "*" && (n = n.slice(1)), n.charAt(0) === "." ? i.endsWith(n) : i === n || Ds(i) && Ds(n));
	});
}
//#endregion
//#region node_modules/axios/lib/helpers/speedometer.js
function Ws(e, t) {
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
function Gs(e, t) {
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
var Ks = (e, t, n = 3) => {
	let r = 0, i = Ws(50, 250);
	return Gs((n) => {
		if (!n || !J.isNumber(n.loaded)) return;
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
}, qs = (e, t) => {
	let n = e != null;
	return [(r) => t[0]({
		lengthComputable: n,
		total: e,
		loaded: r
	}), t[1]];
}, Js = (e, t = J.asap) => (...n) => t(() => e(...n)), Ys = (e) => e >= 48 && e <= 57 || e >= 65 && e <= 70 || e >= 97 && e <= 102, Xs = (e, t, n) => t + 2 < n && Ys(e.charCodeAt(t + 1)) && Ys(e.charCodeAt(t + 2)), Zs = (e) => e <= 57 ? e - 48 : (e & 223) - 55, Qs = (e) => e >= 65 && e <= 90 || e >= 97 && e <= 122 || e >= 48 && e <= 57 || e === 43 || e === 47 || e === 45 || e === 95, $s = (e) => e === 9 || e === 10 || e === 12 || e === 13 || e === 32, ec = (e) => {
	let t = Math.floor(e / 4), n = e % 4;
	return t * 3 + (n === 2 ? 1 : n === 3 ? 2 : 0);
}, tc = (e) => {
	let t = e.length, n = 0;
	return t > 0 && e.charCodeAt(t - 1) === 61 && (n++, t > 1 && e.charCodeAt(t - 2) === 61 && n++), Math.floor((t - n) * 3 / 4);
}, nc = (e) => {
	let t = e.length, n = 0, r = 0, i = !1;
	for (let a = 0; a < t; a++) {
		let o = e.charCodeAt(a);
		if (o === 37 && Xs(e, a, t) && (o = Zs(e.charCodeAt(a + 1)) * 16 + Zs(e.charCodeAt(a + 2)), a += 2), !$s(o)) {
			if (o === 61) {
				r++;
				continue;
			}
			if (!Qs(o) || r > 0) {
				i = !0;
				continue;
			}
			n++;
		}
	}
	return i || r > 2 || r > 0 && (n + r) % 4 != 0 || n % 4 == 1 ? tc(e) : ec(n);
}, rc = (e, t) => {
	if (!e || typeof e != "string" || !e.startsWith("data:")) return 0;
	let n = e.indexOf(",");
	if (n < 0) return 0;
	let r = e.slice(5, n), i = e.slice(n + 1);
	if (/;base64/i.test(r)) return t(i);
	let a = 0;
	for (let e = 0, t = i.length; e < t; e++) {
		let n = i.charCodeAt(e);
		if (n === 37 && Xs(i, e, t)) a += 1, e += 2;
		else if (n < 128) a += 1;
		else if (n < 2048) a += 2;
		else if (n >= 55296 && n <= 56319 && e + 1 < t) {
			let t = i.charCodeAt(e + 1);
			t >= 56320 && t <= 57343 ? (a += 4, e++) : a += 3;
		} else a += 3;
	}
	return a;
};
function ic(e) {
	let t = typeof e == "string" ? e.indexOf("#") : -1;
	return rc(t === -1 ? e : e.slice(0, t), nc);
}
function ac(e) {
	return rc(e, tc);
}
//#endregion
//#region node_modules/axios/lib/adapters/http.js
var oc = /* @__PURE__ */ M(Xo(), 1), sc = /* @__PURE__ */ M(Qo(), 1), cc = {
	flush: g.constants.Z_SYNC_FLUSH,
	finishFlush: g.constants.Z_SYNC_FLUSH
}, lc = {
	flush: g.constants.BROTLI_OPERATION_FLUSH,
	finishFlush: g.constants.BROTLI_OPERATION_FLUSH
}, uc = {
	flush: g.constants.ZSTD_e_flush,
	finishFlush: g.constants.ZSTD_e_flush
}, dc = J.isFunction(g.createBrotliDecompress), fc = J.isFunction(g.createZstdDecompress), pc = "gzip, compress, deflate" + (dc ? ", br" : ""), mc = pc + (fc ? ", zstd" : ""), hc = typeof process < "u" && process.nextTick ? process.nextTick.bind(process) : J.asap, { http: gc, https: _c } = sc.default, vc = /https:?/, yc = Symbol("axios.http.socketListener"), bc = Symbol("axios.http.currentReq");
function xc(e) {
	let t = this[bc];
	t && !t.destroyed && t.destroy(e);
}
var Sc = Symbol("axios.http.installedTunnel"), Cc = /* @__PURE__ */ new Map(), wc = /* @__PURE__ */ new WeakMap(), Tc = {
	22: 21,
	24: 5
};
function Ec(e = process.versions && process.versions.node) {
	if (!e) return !1;
	let [t, n] = e.split(".").map((e) => Number(e));
	return !Number.isInteger(t) || !Number.isInteger(n) ? !1 : t > 24 || Tc[t] != null && n >= Tc[t];
}
function Dc(e, t = process.versions && process.versions.node) {
	if (!Ec(t)) return !1;
	let n = e && e.options;
	return !!(n && J.hasOwnProp(n, "proxyEnv") && n.proxyEnv != null);
}
function Oc(e, t, n) {
	return vc.test(e.protocol) ? n || b.globalAgent : t || _.globalAgent;
}
function kc(e, t) {
	let n = e.protocol + "//" + e.hostname + ":" + (e.port || "") + "#" + (e.auth || ""), r = t ? wc.get(t) || wc.set(t, /* @__PURE__ */ new Map()).get(t) : Cc, i = r.get(n);
	if (i) return i;
	let a = t && t.options ? {
		...t.options,
		...e
	} : e;
	if (i = new oc.default(a), t && t.options) {
		let e = { ...t.options }, n = i.callback;
		i.callback = function(t, r) {
			return n.call(this, t, {
				...e,
				...r
			});
		};
	}
	return i[Sc] = !0, r.set(n, i), i;
}
var Ac = Z.protocols.map((e) => e + ":"), jc = (e) => {
	if (!J.isString(e)) return e;
	try {
		return decodeURIComponent(e);
	} catch {
		return e;
	}
}, Mc = (e, [t, n]) => (e.on("end", n).on("error", n), t), Nc = new _s();
function Pc(e, t, n) {
	e.beforeRedirects.proxy && e.beforeRedirects.proxy(e), e.beforeRedirects.auth && e.beforeRedirects.auth(e), e.beforeRedirects.sensitiveHeaders && e.beforeRedirects.sensitiveHeaders(e, n), e.beforeRedirects.config && e.beforeRedirects.config(e, t, n);
}
function Fc(e, t) {
	e && Object.keys(e).forEach((n) => {
		t.has(n.toLowerCase()) && delete e[n];
	});
}
function Ic(e, t) {
	if (!t) return !1;
	try {
		return new URL(t.url).origin === new URL(e.href).origin;
	} catch {
		return !1;
	}
}
function Lc(e, t, n, r, i, a, o = !0) {
	let s = t, c = Oc(e, a, i);
	if (!s && s !== !1 && o && !Dc(c)) {
		let e = Uo(n);
		e && (Us(n) || (s = new URL(e)));
	}
	if (r && e.headers) for (let t of Object.keys(e.headers)) t.toLowerCase() === "proxy-authorization" && delete e.headers[t];
	if (r && e.agent && e.agent[Sc] && (e.agent = void 0), s) {
		let t = s instanceof URL, r = (e) => t || J.hasOwnProp(s, e) ? s[e] : void 0, a = r("username"), o = r("password"), c = J.hasOwnProp(s, "auth") ? s.auth : void 0;
		if (a && (c = (a || "") + ":" + (o || "")), c) {
			let e = typeof c == "object", t = e && J.hasOwnProp(c, "username") ? c.username : void 0, n = e && J.hasOwnProp(c, "password") ? c.password : void 0;
			if (t || n) c = (t || "") + ":" + (n || "");
			else if (e) throw new X("Invalid proxy authorization", X.ERR_BAD_OPTION, { proxy: s });
		}
		if (vc.test(e.protocol)) {
			if (!(i instanceof oc.default)) {
				let t = r("hostname") || r("host"), n = r("port"), a = r("protocol"), o = a ? a.includes(":") ? a : `${a}:` : "http:", s = t && t.includes(":") && !t.startsWith("[") ? `[${t}]` : t, l = new URL(`${o}//${s}${n ? ":" + n : ""}`), u = {
					protocol: l.protocol,
					hostname: l.hostname.replace(/^\[|\]$/g, ""),
					port: l.port,
					auth: c && typeof c == "string" ? c : void 0
				};
				l.protocol === "https:" && (u.ALPNProtocols = ["http/1.1"]);
				let d = kc(u, i);
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
		Lc(e, t, e.href, !0, i, a, o);
	}, !!(s || t !== !1 && o && Dc(c));
}
var Rc = typeof process < "u" && J.kindOf(process) === "process", zc = (e) => new Promise((t, n) => {
	let r, i, a = (e, t) => {
		i || (i = !0, r && r(e, t));
	}, o = (e) => {
		a(e), t(e);
	}, s = (e) => {
		a(e, !0), n(e);
	};
	e(o, s, (e) => r = e).catch(s);
}), Bc = ({ address: e, family: t }) => {
	if (!J.isString(e)) throw new X("address must be a string", X.ERR_BAD_OPTION_VALUE);
	return {
		address: e,
		family: t || (e.indexOf(".") < 0 ? 6 : 4)
	};
}, Vc = (e, t) => Bc(J.isObject(e) ? e : {
	address: e,
	family: t
}), Hc = /* @__PURE__ */ new WeakMap(), Uc = (e) => {
	let t = Hc.get(e);
	if (t) return t;
	let n = vs(e, (e) => J.isArray(e) ? e : [e]);
	return t = (e, t, r) => {
		n(e, t, (e, n, i) => {
			if (e) return r(e);
			let a;
			try {
				a = J.isArray(n) ? n.map((e) => Vc(e)) : [Vc(n, i)];
			} catch (e) {
				return r(e);
			}
			t.all ? r(e, a) : r(e, a[0].address, a[0].family);
		});
	}, Hc.set(e, t), t;
}, Wc = { request(e, t) {
	let n = e.protocol + "//" + e.hostname + ":" + (e.port || (e.protocol === "https:" ? 443 : 80)), { http2Options: r, headers: i } = e, a = Nc.getSession(n, r), { HTTP2_HEADER_SCHEME: o, HTTP2_HEADER_METHOD: s, HTTP2_HEADER_PATH: c, HTTP2_HEADER_STATUS: l } = x.constants, u = {
		[o]: e.protocol.replace(":", ""),
		[s]: e.method,
		[c]: e.path
	};
	J.forEach(i, (e, t) => {
		t.charAt(0) !== ":" && (u[t] = e);
	});
	let d = a.request(u);
	return d.once("response", (e) => {
		let n = d;
		e = Object.assign({}, e);
		let r = e[l];
		delete e[l], n.headers = e, n.statusCode = +r, t(n);
	}), d;
} }, Gc = Rc && function(e) {
	return zc(async function(t, n, r) {
		let i = (t) => J.getSafeProp(e, t), o = i("transitional") || ao, l = i("data"), d = i("lookup"), f = i("family"), p = i("httpVersion");
		p === void 0 && (p = 1);
		let m = p, h = i("http2Options"), v = i("httpAgent"), y = i("httpsAgent"), x = i("proxy"), S = i("responseType"), C = i("responseEncoding"), w = i("socketPath"), T = i("method").toUpperCase(), E = i("maxRedirects"), D = i("maxBodyLength"), O = i("maxContentLength"), k = i("decompress"), A, j = !1, M, N;
		try {
			p = +p;
		} catch {
			throw new X("Invalid protocol version: value is not a number", X.ERR_BAD_OPTION_VALUE, e);
		}
		if (Number.isNaN(p)) throw new X(`Invalid protocol version: '${m}' is not a number`, X.ERR_BAD_OPTION_VALUE, e);
		if (p !== 1 && p !== 2) throw new X(`Unsupported protocol version '${p}'`, X.ERR_BAD_OPTION_VALUE, e);
		let P = p === 2;
		d &&= Uc(d);
		let F = new u();
		function I(t) {
			try {
				F.emit("abort", !t || t.type ? new Ao(null, e, M) : t);
			} catch {}
		}
		function ee() {
			N &&= (clearTimeout(N), null);
		}
		function L() {
			let t = i("timeout"), n = t ? "timeout of " + t + "ms exceeded" : "timeout exceeded", r = i("timeoutErrorMessage");
			return r && (n = r), new X(n, o.clarifyTimeoutError ? X.ETIMEDOUT : X.ECONNABORTED, e, M);
		}
		F.once("abort", n);
		let R = () => {
			ee(), e.cancelToken && e.cancelToken.unsubscribe(I), e.signal && e.signal.removeEventListener("abort", I), F.removeAllListeners();
		};
		(e.cancelToken || e.signal) && (e.cancelToken && e.cancelToken.subscribe(I), e.signal && (e.signal.aborted ? I() : e.signal.addEventListener("abort", I))), r((e, t) => {
			if (A = !0, ee(), t) {
				j = !0, R();
				return;
			}
			let { data: n } = e;
			if (n instanceof a.Readable || n instanceof a.Duplex) {
				let e = a.finished(n, () => {
					e(), R();
				});
			} else R();
		});
		let z = Bo(i("baseURL"), i("url"), i("allowAbsoluteUrls"), e), te = w ? "http://localhost" : Z.hasBrowserEnv ? Z.origin : void 0, B = new URL(z, te), V = B.protocol || Ac[0];
		if (V === "data:") {
			if (O > -1 && ac(String(i("url") || z || "")) > O) return n(new X("maxContentLength size of " + O + " exceeded", X.ERR_BAD_RESPONSE, e));
			let r;
			if (T !== "GET") return jo(t, n, {
				status: 405,
				statusText: "method not allowed",
				headers: {},
				config: e
			});
			try {
				r = ns(i("url"), S === "blob", { Blob: e.env && e.env.Blob });
			} catch (t) {
				throw X.from(t, X.ERR_BAD_REQUEST, e);
			}
			return S === "text" ? (r = r.toString(C), (!C || C === "utf8") && (r = J.stripBOM(r))) : S === "stream" && (r = a.Readable.from(r)), jo(t, n, {
				data: r,
				status: 200,
				statusText: "OK",
				headers: new Y(),
				config: e
			});
		}
		if (Ac.indexOf(V) === -1) return n(new X("Unsupported protocol " + V, X.ERR_BAD_REQUEST, e));
		let H = Y.from(e.headers).normalize();
		H.set("User-Agent", "axios/1.20.0", !1);
		let { onUploadProgress: ne, onDownloadProgress: U } = e, re = e.maxRate, W, ie;
		if (J.isSpecCompliantForm(l)) {
			let e = H.getContentType(/boundary=([-_\w\d]{10,70})/i);
			l = hs(l, (e) => {
				H.set(e);
			}, {
				tag: "axios-1.20.0-boundary",
				boundary: e && e[1] || void 0
			});
		} else if (J.isFormData(l) && J.isFunction(l.getHeaders) && l.getHeaders !== Object.prototype.getHeaders) {
			if (is(H, l.getHeaders(), i("formDataHeaderPolicy")), !H.hasContentLength()) try {
				let e = await s.promisify(l.getLength).call(l);
				Number.isFinite(e) && e >= 0 && H.setContentLength(e);
			} catch {}
		} else if (J.isBlob(l) || J.isFile(l)) l.size && H.setContentType(l.type || "application/octet-stream"), H.setContentLength(l.size || 0), l = a.Readable.from(cs(l));
		else if (l && !J.isStream(l)) {
			if (!Buffer.isBuffer(l)) {
				if (J.isArrayBuffer(l)) l = Buffer.from(new Uint8Array(l));
				else if (J.isString(l)) l = Buffer.from(l, "utf-8");
				else return n(new X("Data after transformation must be a string, an ArrayBuffer, a Buffer, or a Stream", X.ERR_BAD_REQUEST, e));
			}
			if (H.setContentLength(l.length, !1), D > -1 && l.length > D) return n(new X("Request body larger than maxBodyLength limit", X.ERR_BAD_REQUEST, e));
		}
		let ae = J.toFiniteNumber(H.getContentLength());
		J.isArray(re) ? (W = re[0], ie = re[1]) : W = ie = re, l && (ne || W) && (J.isStream(l) || (l = a.Readable.from(l, { objectMode: !1 })), l = a.pipeline([l, new os({ maxRate: J.toFiniteNumber(W) })], J.noop), ne && l.on("progress", Mc(l, qs(ae, Ks(Js(ne, hc), !1, 3)))));
		let oe, se = i("auth");
		if (se) {
			let e = J.getSafeProp(se, "username") || "", t = J.getSafeProp(se, "password") || "";
			oe = e + ":" + t;
		}
		if (!oe && (B.username || B.password)) {
			let e = jc(B.username), t = jc(B.password);
			oe = e + ":" + t;
		}
		oe && H.delete("authorization");
		let ce;
		try {
			ce = $a(B.pathname + B.search, i("params"), i("paramsSerializer")).replace(/^\?/, "");
		} catch (t) {
			return n(X.from(t, X.ERR_BAD_REQUEST, e, null, null, {
				url: i("url"),
				exists: !0
			}));
		}
		H.set("Accept-Encoding", J.hasOwnProp(o, "advertiseZstdAcceptEncoding") && o.advertiseZstdAcceptEncoding === !0 ? mc : pc, !1), P && d && (h = Object.assign(Object.create(null), h, { lookup: d }));
		let G = Object.assign(Object.create(null), {
			path: ce,
			method: T,
			headers: Ci(H),
			agents: {
				http: v,
				https: y
			},
			auth: oe,
			protocol: V,
			family: f,
			beforeRedirect: Pc,
			beforeRedirects: Object.create(null),
			http2Options: h,
			createConnection: void 0
		});
		!J.isUndefined(d) && (G.lookup = d);
		let le = !1;
		if (w) {
			if (typeof w != "string") return n(new X("socketPath must be a string", X.ERR_BAD_OPTION_VALUE, e));
			let t = i("allowedSocketPaths");
			if (t != null) {
				let r = Array.isArray(t) ? t : [t], i = c(w);
				if (!r.some((e) => typeof e == "string" && c(e) === i)) return n(new X(`socketPath "${w}" is not permitted by allowedSocketPaths`, X.ERR_BAD_OPTION_VALUE, e));
			}
			G.socketPath = w;
		} else G.hostname = B.hostname.startsWith("[") ? B.hostname.slice(1, -1) : B.hostname, G.port = B.port, le = Lc(G, x, V + "//" + B.hostname + (B.port ? ":" + B.port : "") + G.path, !1, y, v, !P);
		let ue, de = !1, fe = !1, pe = vc.test(G.protocol);
		if (G.agent ??= pe ? y : v, P) {
			if (le) return n(new X("HTTP/2 requests with a proxy are not supported", X.ERR_NOT_SUPPORT, e));
			ue = Wc;
		} else {
			let t = i("transport");
			if (t) ue = t;
			else if (E === 0) ue = pe ? b : _, de = !0;
			else {
				fe = !0, G.sensitiveHeaders = [], E && (G.maxRedirects = E);
				let t = i("beforeRedirect");
				if (t && (G.beforeRedirects.config = t), oe) {
					let e = B.origin, t = oe;
					G.beforeRedirects.auth = function(n) {
						try {
							new URL(n.href).origin === e && (n.auth = t);
						} catch {}
					};
				}
				let r = i("sensitiveHeaders");
				if (r != null) {
					if (!J.isArray(r)) return n(new X("sensitiveHeaders must be an array of strings", X.ERR_BAD_OPTION_VALUE, e));
					let t = /* @__PURE__ */ new Set();
					for (let i of r) {
						if (!J.isString(i)) return n(new X("sensitiveHeaders must be an array of strings", X.ERR_BAD_OPTION_VALUE, e));
						t.add(i.toLowerCase());
					}
					t.size && (G.sensitiveHeaders = Array.from(t), G.beforeRedirects.sensitiveHeaders = function(e, n) {
						Ic(e, n) || Fc(e.headers, t);
					});
				}
				ue = pe ? _c : gc;
			}
		}
		G.maxBodyLength = D > -1 ? D : Infinity, G.insecureHTTPParser = !!i("insecureHTTPParser"), M = ue.request(G, function(r) {
			if (ee(), M.destroyed) return;
			let i = [r], o = J.toFiniteNumber(r.headers["content-length"]);
			if (U || ie) {
				let e = new os({ maxRate: J.toFiniteNumber(ie) });
				U && e.on("progress", Mc(e, qs(o, Ks(Js(U, hc), !0, 3)))), i.push(e);
			}
			let s = r, c = r.req || M;
			if (k !== !1 && r.headers["content-encoding"]) switch ((T === "HEAD" || r.statusCode === 204) && delete r.headers["content-encoding"], (r.headers["content-encoding"] || "").toLowerCase()) {
				case "gzip":
				case "x-gzip":
				case "compress":
				case "x-compress":
					i.push(g.createUnzip(cc)), delete r.headers["content-encoding"];
					break;
				case "deflate":
					i.push(new gs()), i.push(g.createUnzip(cc)), delete r.headers["content-encoding"];
					break;
				case "br":
					dc && (i.push(g.createBrotliDecompress(lc)), delete r.headers["content-encoding"]);
					break;
				case "zstd": fc && (i.push(g.createZstdDecompress(uc)), delete r.headers["content-encoding"]);
			}
			s = i.length > 1 ? a.pipeline(i, J.noop) : i[0];
			let l = {
				status: r.statusCode,
				statusText: r.statusMessage,
				headers: new Y(r.headers),
				config: e,
				request: c
			};
			if (S === "stream") {
				if (O > -1) {
					let t = O, n = s;
					async function* r() {
						let r = 0;
						for await (let i of n) {
							if (r += i.length, r > t) throw new X("maxContentLength size of " + t + " exceeded", X.ERR_BAD_RESPONSE, e, c);
							yield i;
						}
					}
					s = a.Readable.from(r(), { objectMode: !1 });
				}
				l.data = s, jo(t, n, l);
			} else {
				let r = [], i = 0;
				s.on("data", function(t) {
					r.push(t), i += t.length, O > -1 && i > O && (j = !0, s.destroy(), I(new X("maxContentLength size of " + O + " exceeded", X.ERR_BAD_RESPONSE, e, c)));
				}), s.on("aborted", function() {
					if (j) return;
					let t = new X("stream has been aborted", X.ERR_BAD_RESPONSE, e, c, l);
					s.destroy(t), n(t);
				}), s.on("error", function(t) {
					j || n(X.from(t, null, e, c, l));
				}), s.on("end", function() {
					try {
						let e = r.length === 1 ? r[0] : Buffer.concat(r);
						S !== "arraybuffer" && (e = e.toString(C), (!C || C === "utf8") && (e = J.stripBOM(e))), l.data = e;
					} catch (t) {
						return n(X.from(t, null, e, l.request, l));
					}
					jo(t, n, l);
				});
			}
			F.once("abort", (e) => {
				s.destroyed || (s.emit("error", e), s.destroy());
			});
		}), F.once("abort", (e) => {
			M.close ? M.close() : M.destroy(e);
		}), M.on("error", function(t) {
			n(X.from(t, null, e, M));
		});
		let me = /* @__PURE__ */ new Set();
		if (M.on("socket", function(e) {
			typeof e.setKeepAlive == "function" && e.setKeepAlive(!0, 6e4), e[yc] || (e.on("error", xc), e[yc] = !0), e[bc] = M, me.add(e);
		}), M.once("close", function() {
			ee();
			for (let e of me) e[bc] === M && (e[bc] = null);
			me.clear();
		}), i("timeout")) {
			let t = parseInt(i("timeout"), 10);
			if (Number.isNaN(t)) {
				I(new X("error trying to parse `config.timeout` to int", X.ERR_BAD_OPTION_VALUE, e, M));
				return;
			}
			let n = function() {
				A || I(L());
			};
			de && t > 0 && (N = setTimeout(n, t)), M.setTimeout(t, n);
		} else M.setTimeout(0);
		if (J.isStream(l)) {
			let t = !1, n = !1;
			l.on("end", () => {
				t = !0;
			}), l.once("error", (e) => {
				n = !0, M.destroy(e);
			}), l.on("close", () => {
				!t && !n && I(new Ao("Request stream has been aborted", e, M));
			});
			let r = l;
			if (D > -1 && !fe) {
				let t = D, n = 0;
				r = a.pipeline([l, new a.Transform({ transform(r, i, a) {
					if (n += r.length, n > t) return a(new X("Request body larger than maxBodyLength limit", X.ERR_BAD_REQUEST, e, M));
					a(null, r);
				} })], J.noop), r.on("error", (e) => {
					M.destroyed || M.destroy(e);
				});
			}
			r.pipe(M);
		} else l && M.write(l), M.end();
	});
}, Kc = Z.hasStandardBrowserEnv ? ((e, t) => (n) => (n = new URL(n, Z.origin), e.protocol === n.protocol && e.host === n.host && (t || e.port === n.port)))(new URL(Z.origin), Z.navigator && /(msie|trident)/i.test(Z.navigator.userAgent)) : () => !0, qc = Z.hasStandardBrowserEnv ? {
	write(e, t, n, r, i, a, o) {
		if (typeof document > "u") return;
		let s = [`${e}=${encodeURIComponent(t)}`];
		J.isNumber(n) && s.push(`expires=${new Date(n).toUTCString()}`), J.isString(r) && s.push(`path=${r}`), J.isString(i) && s.push(`domain=${i}`), a === !0 && s.push("secure"), J.isString(o) && s.push(`SameSite=${o}`), document.cookie = s.join("; ");
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
}, Jc = (e) => e instanceof Y ? { ...e } : e, Yc = (e) => Object.getOwnPropertySymbols && Object.getOwnPropertyDescriptor ? Object.keys(e).concat(Object.getOwnPropertySymbols(e).filter((t) => Object.getOwnPropertyDescriptor(e, t).enumerable)) : Object.keys(e);
function Xc(e, t) {
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
		return J.isPlainObject(e) && J.isPlainObject(t) ? J.merge.call({ caseless: r }, e, t) : J.isPlainObject(t) ? J.merge({}, t) : J.isArray(t) ? t.slice() : t;
	}
	function i(e, t, n, i) {
		if (!J.isUndefined(t)) return r(e, t, n, i);
		if (!J.isUndefined(e)) return r(void 0, e, n, i);
	}
	function a(e, t) {
		if (!J.isUndefined(t)) return r(void 0, t);
	}
	function o(e, t) {
		if (!J.isUndefined(t)) return r(void 0, t);
		if (!J.isUndefined(e)) return r(void 0, e);
	}
	function s(n) {
		let r = J.hasOwnProp(t, "transitional") ? t.transitional : void 0;
		if (!J.isUndefined(r)) {
			if (J.isPlainObject(r)) {
				if (J.hasOwnProp(r, n)) return r[n];
			} else return;
		}
		let i = J.hasOwnProp(e, "transitional") ? e.transitional : void 0;
		if (J.isPlainObject(i) && J.hasOwnProp(i, n)) return i[n];
	}
	function c(n, i, a) {
		if (J.hasOwnProp(t, a)) return r(n, i);
		if (J.hasOwnProp(e, a)) return r(void 0, n);
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
		headers: (e, t, n) => i(Jc(e), Jc(t), n, !0)
	};
	return J.forEach(Yc({
		...e,
		...t
	}), function(r) {
		if (r === "__proto__" || r === "constructor" || r === "prototype") return;
		let a = J.hasOwnProp(l, r) ? l[r] : i, o = a(J.hasOwnProp(e, r) ? e[r] : void 0, J.hasOwnProp(t, r) ? t[r] : void 0, r);
		J.isUndefined(o) && a !== c || (n[r] = o);
	}), J.hasOwnProp(t, "validateStatus") && J.isUndefined(t.validateStatus) && s("validateStatusUndefinedResolves") === !1 && (J.hasOwnProp(e, "validateStatus") ? n.validateStatus = r(void 0, e.validateStatus) : delete n.validateStatus), n;
}
//#endregion
//#region node_modules/axios/lib/helpers/resolveConfig.js
var Zc = (e) => encodeURIComponent(e).replace(/%([0-9A-F]{2})/gi, (e, t) => String.fromCharCode(parseInt(t, 16)));
function Qc(e) {
	let t = Xc({}, e), n = (e) => J.hasOwnProp(t, e) ? t[e] : void 0, r = n("data"), i = n("withXSRFToken"), a = n("xsrfHeaderName"), o = n("xsrfCookieName"), s = n("headers"), c = n("auth"), l = n("baseURL"), u = n("allowAbsoluteUrls"), d = n("url");
	if (t.headers = s = Y.from(s), t.url = $a(Bo(l, d, u, t), n("params"), n("paramsSerializer")), c) {
		let t = J.getSafeProp(c, "username") || "", n = J.getSafeProp(c, "password") || "";
		try {
			s.set("Authorization", "Basic " + btoa(t + ":" + (n ? Zc(n) : "")));
		} catch (t) {
			throw X.from(t, X.ERR_BAD_OPTION_VALUE, e);
		}
	}
	if (J.isFormData(r)) {
		let e = J.getSafeProp(r, "getHeaders");
		Z.hasStandardBrowserEnv || Z.hasStandardBrowserWebWorkerEnv || J.isReactNative(r) ? s.setContentType(void 0) : J.isFunction(e) && is(s, e.call(r), n("formDataHeaderPolicy"));
	}
	if (Z.hasStandardBrowserEnv && (J.isFunction(i) && (i = i(t)), i === !0 || i == null && Kc(t.url))) {
		let e = a && o && qc.read(o);
		e && s.set(a, e);
	}
	return t;
}
var $c = typeof XMLHttpRequest < "u" && function(e) {
	return new Promise(function(t, n) {
		let r = Qc(e), i = r.data, a = Y.from(r.headers).normalize(), { responseType: o, onUploadProgress: s, onDownloadProgress: c } = r, l, u, d, f, p, m;
		function h() {
			f && f(), p && p(), r.cancelToken && r.cancelToken.unsubscribe(l), r.signal && r.signal.removeEventListener("abort", l);
		}
		let g = new XMLHttpRequest();
		g.open(r.method.toUpperCase(), r.url, !0), g.timeout = r.timeout;
		function _(i) {
			if (!g) return;
			if (g.status === 0 && (es(Fo(r.url)) || es(Z.origin)) !== "file" && !(g.responseURL && g.responseURL.startsWith("file:"))) {
				n(new X("Request aborted", X.ECONNABORTED, e, g)), h(), g = null;
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
			let a = Y.from("getAllResponseHeaders" in g && g.getAllResponseHeaders());
			jo(function(e) {
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
			g &&= (n(new X("Request aborted", X.ECONNABORTED, e, g)), h(), null);
		}, g.onerror = function(t) {
			let r = new X(t && t.message ? t.message : "Network Error", X.ERR_NETWORK, e, g);
			r.event = t || null, n(r), h(), g = null;
		}, g.ontimeout = function() {
			let t = r.timeout ? "timeout of " + r.timeout + "ms exceeded" : "timeout exceeded", i = r.transitional || ao;
			r.timeoutErrorMessage && (t = r.timeoutErrorMessage), n(new X(t, i.clarifyTimeoutError ? X.ETIMEDOUT : X.ECONNABORTED, e, g)), h(), g = null;
		}, i === void 0 && a.setContentType(null), "setRequestHeader" in g && J.forEach(Ci(a), function(e, t) {
			g.setRequestHeader(t, e);
		}), J.isUndefined(r.withCredentials) || (g.withCredentials = !!r.withCredentials), o && o !== "json" && (g.responseType = r.responseType), c && ([d, p, m] = Ks(c, !0), g.addEventListener("progress", d)), s && g.upload && ([u, f] = Ks(s), g.upload.addEventListener("progress", u), g.upload.addEventListener("loadend", f)), (r.cancelToken || r.signal) && (l = (t) => {
			g &&= (n(!t || t.type ? new Ao(null, e, g) : t), g.abort(), h(), null);
		}, r.cancelToken && r.cancelToken.subscribe(l), r.signal && (r.signal.aborted ? l() : r.signal.addEventListener("abort", l)));
		let v = es(r.url);
		if (v && !Z.protocols.includes(v)) {
			n(new X("Unsupported protocol " + v + ":", X.ERR_BAD_REQUEST, e)), h();
			return;
		}
		g.send(i || null);
	});
}, el = (e, t) => {
	if (e = e ? e.filter(Boolean) : [], !t && !e.length) return;
	let n = new AbortController(), r = !1, i = function(e) {
		if (!r) {
			r = !0, o();
			let t = e instanceof Error ? e : this.reason;
			n.abort(t instanceof X ? t : new Ao(t instanceof Error ? t.message : t));
		}
	}, a = t && setTimeout(() => {
		a = null, i(new X(`timeout of ${t}ms exceeded`, X.ETIMEDOUT));
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
	return s.unsubscribe = () => J.asap(o), s;
}, tl = function* (e, t) {
	let n = e.byteLength;
	if (!t || n < t) {
		yield e;
		return;
	}
	let r = 0, i;
	for (; r < n;) i = r + t, yield e.slice(r, i), r = i;
}, nl = async function* (e, t) {
	for await (let n of rl(e)) yield* tl(n, t);
}, rl = async function* (e) {
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
}, il = (e, t, n, r) => {
	let i = nl(e, t), a = 0, o, s = (e) => {
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
}, al = 65536, ol = {
	cache: "default",
	redirect: "follow",
	referrer: "about:client",
	referrerPolicy: "",
	mode: "cors",
	integrity: "",
	keepalive: !1,
	priority: "auto",
	window: null
}, { isFunction: sl } = J, cl = (e) => encodeURIComponent(e).replace(/%([0-9A-F]{2})/gi, (e, t) => String.fromCharCode(parseInt(t, 16))), ll = (e) => {
	if (!J.isString(e)) return e;
	try {
		return decodeURIComponent(e);
	} catch {
		return e;
	}
}, ul = (e, ...t) => {
	try {
		return !!e(...t);
	} catch {
		return !1;
	}
}, dl = (e) => {
	let t = e.indexOf("://"), n = e;
	return t !== -1 && (n = n.slice(t + 3)), n.includes("@") || n.includes(":");
}, fl = (e) => {
	let t = J.global !== void 0 && J.global !== null ? J.global : globalThis, { ReadableStream: n, TextEncoder: r } = t;
	e = J.merge.call({ skipUndefined: !0 }, {
		Request: t.Request,
		Response: t.Response
	}, e);
	let { fetch: i, Request: a, Response: o } = e, s = i ? sl(i) : typeof fetch == "function", c = sl(a), l = sl(o);
	if (!s) return !1;
	let u = s && sl(n), d = s && (typeof r == "function" ? ((e) => (t) => e.encode(t))(new r()) : async (e) => new Uint8Array(await new a(e).arrayBuffer())), f = c && u && ul(() => {
		let e = !1, t = new a(Z.origin, {
			body: new n(),
			method: "POST",
			get duplex() {
				return e = !0, "half";
			}
		}), r = t.headers.has("Content-Type");
		return t.body != null && t.body.cancel(), e && !r;
	}), p = l && u && ul(() => J.isReadableStream(new o("").body)), m = { stream: p && ((e) => e.body) };
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
			throw new X(`Response type '${e}' is not supported`, X.ERR_NOT_SUPPORT, n);
		});
	});
	let h = async (e) => {
		if (e == null) return 0;
		if (J.isBlob(e)) return e.size;
		if (J.isSpecCompliantForm(e)) return (await new a(Z.origin, {
			method: "POST",
			body: e
		}).arrayBuffer()).byteLength;
		if (J.isArrayBufferView(e) || J.isArrayBuffer(e)) return e.byteLength;
		if (J.isURLSearchParams(e) && (e += ""), J.isString(e)) return (await d(e)).byteLength;
	}, g = async (e, t) => J.toFiniteNumber(e.getContentLength()) ?? h(t);
	return async (e) => {
		let { url: t, method: n, data: s, signal: l, cancelToken: d, timeout: _, onDownloadProgress: v, onUploadProgress: y, responseType: b, headers: x, withCredentials: S = "same-origin", fetchOptions: C, maxContentLength: w, maxBodyLength: T, maxRedirects: E } = Qc(e), D = J.isNumber(w) && w > -1, O = J.isNumber(T) && T > -1, k = (t) => J.hasOwnProp(e, t) ? e[t] : void 0, A = i || fetch;
		b = b ? (b + "").toLowerCase() : "text";
		let j = el([l, d && d.toAbortSignal()], _), M = null, N = j && j.unsubscribe && (() => {
			j.unsubscribe();
		}), P, F = null, I = () => new X("Request body larger than maxBodyLength limit", X.ERR_BAD_REQUEST, e, M);
		try {
			let i, l = k("auth");
			if (l && (i = {
				username: J.getSafeProp(l, "username") || "",
				password: J.getSafeProp(l, "password") || ""
			}), dl(t)) {
				let e = new URL(t, Z.origin);
				!i && (e.username || e.password) && (i = {
					username: ll(e.username),
					password: ll(e.password)
				}), (e.username || e.password) && (e.username = "", e.password = "", t = e.href);
			}
			if (i && (x.delete("authorization"), x.set("Authorization", "Basic " + btoa(cl((i.username || "") + ":" + (i.password || ""))))), D && typeof t == "string" && t.startsWith("data:") && ic(t) > w) throw new X("maxContentLength size of " + w + " exceeded", X.ERR_BAD_RESPONSE, e, M);
			if (O && n !== "get" && n !== "head") {
				let e = await h(s);
				if (typeof e == "number" && isFinite(e) && (P = e, e > T)) throw I();
			}
			let d = O && (J.isReadableStream(s) || J.isStream(s)), _ = (e, t, n) => il(e, al, (e) => {
				if (O && e > T) throw F = I();
				t && t(e);
			}, n);
			if (f && n !== "get" && n !== "head" && (y || d)) {
				if (P ??= await g(x, s), P !== 0 || d) {
					let e = new a(t, {
						method: "POST",
						body: s,
						duplex: "half"
					}), n;
					if (J.isFormData(s) && (n = e.headers.get("content-type")) && x.setContentType(n), e.body) {
						let [t, n] = y && qs(P, Ks(Js(y))) || [];
						s = _(e.body, t, n);
					}
				}
			} else if (d && !c && u && n !== "get" && n !== "head") s = _(s);
			else if (d && c && !f && n !== "get" && n !== "head") throw new X("Stream request bodies are not supported by the current fetch implementation", X.ERR_NOT_SUPPORT, e, M);
			J.isString(S) || (S = S ? "include" : "omit");
			let ee = c && "credentials" in a.prototype;
			if (J.isFormData(s)) {
				let e = x.getContentType();
				e && /^multipart\/form-data/i.test(e) && !/boundary=/i.test(e) && x.delete("content-type");
			}
			x.set("User-Agent", "axios/" + $o, !1);
			let L = C == null ? C : Object.assign(Object.create(null), C);
			L && (delete L.body, delete L.headers, delete L.method, delete L.signal, delete L.duplex, delete L.credentials);
			let R = Object.assign(Object.create(null), L, {
				signal: j,
				method: n.toUpperCase(),
				headers: Ci(x.normalize()),
				body: s,
				duplex: "half",
				credentials: ee ? S : void 0
			});
			c && (J.forEach(ol, (e, t) => {
				R[t] === void 0 && (R[t] = e);
			}), R.signal === void 0 && (R.signal = null), R.body === void 0 && (R.body = null)), E === 0 && (R.redirect = "manual", L && (L.redirect = "manual")), M = c && new a(t, R);
			let z = await (c ? A(M, L) : A(t, R)), te = Y.from(z.headers);
			if (D) {
				let t = J.toFiniteNumber(te.getContentLength());
				if (t != null && t > w) throw new X("maxContentLength size of " + w + " exceeded", X.ERR_BAD_RESPONSE, e, M);
			}
			let B = p && (b === "stream" || b === "response");
			if (p && z.body && (v || D || B && N)) {
				let t = {};
				[
					"status",
					"statusText",
					"headers"
				].forEach((e) => {
					t[e] = z[e];
				});
				let n = J.toFiniteNumber(te.getContentLength()), [r, i] = v && qs(n, Ks(Js(v), !0)) || [], a = 0;
				z = new o(il(z.body, al, (t) => {
					if (D && (a = t, a > w)) throw new X("maxContentLength size of " + w + " exceeded", X.ERR_BAD_RESPONSE, e, M);
					r && r(t);
				}, () => {
					i && i(), N && N();
				}), t);
			}
			b ||= "text";
			let V = await m[J.findKey(m, b) || "text"](z, e);
			if (D && !p && !B) {
				let t;
				if (V != null && (typeof V.byteLength == "number" ? t = V.byteLength : typeof V.size == "number" ? t = V.size : typeof V == "string" && (t = typeof r == "function" ? new r().encode(V).byteLength : V.length)), typeof t == "number" && t > w) throw new X("maxContentLength size of " + w + " exceeded", X.ERR_BAD_RESPONSE, e, M);
			}
			return !B && N && N(), await new Promise((t, n) => {
				jo(t, n, {
					data: V,
					headers: Y.from(z.headers),
					status: z.status,
					statusText: z.statusText,
					config: e,
					request: M
				});
			});
		} catch (t) {
			if (N && N(), j && j.aborted && j.reason instanceof X) {
				let n = j.reason;
				throw n.config = e, M && (n.request = M), t !== n && Object.defineProperty(n, "cause", {
					__proto__: null,
					value: t,
					writable: !0,
					enumerable: !1,
					configurable: !0
				}), n;
			}
			if (F) throw M && !F.request && (F.request = M), F;
			if (t instanceof X) throw M && !t.request && (t.request = M), t;
			if (t && t.name === "TypeError" && /Load failed|fetch/i.test(t.message)) {
				let n = new X("Network Error", X.ERR_NETWORK, e, M, t && t.response);
				throw Object.defineProperty(n, "cause", {
					__proto__: null,
					value: t.cause || t,
					writable: !0,
					enumerable: !1,
					configurable: !0
				}), n;
			}
			throw X.from(t, t && t.code, e, M, t && t.response);
		}
	};
}, pl = /* @__PURE__ */ new Map(), ml = (e) => {
	let t = e && e.env || {}, { fetch: n, Request: r, Response: i } = t, a = [
		r,
		i,
		n
	], o = a.length, s, c, l = pl;
	for (; o--;) s = a[o], c = l.get(s), c === void 0 && l.set(s, c = o ? /* @__PURE__ */ new Map() : fl(t)), l = c;
	return c;
};
ml();
//#endregion
//#region node_modules/axios/lib/adapters/adapters.js
var hl = {
	http: Gc,
	xhr: $c,
	fetch: { get: ml }
};
J.forEach(hl, (e, t) => {
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
var gl = (e) => `- ${e}`, _l = (e) => J.isFunction(e) || e === null || e === !1;
function vl(e, t) {
	e = J.isArray(e) ? e : [e];
	let { length: n } = e, r, i, a = {};
	for (let o = 0; o < n; o++) {
		r = e[o];
		let n;
		if (i = r, !_l(r) && (i = hl[(n = String(r)).toLowerCase()], i === void 0)) throw new X(`Unknown adapter '${n}'`);
		if (i && (J.isFunction(i) || (i = i.get(t)))) break;
		a[n || "#" + o] = i;
	}
	if (!i) {
		let e = Object.entries(a).map(([e, t]) => `adapter ${e} ` + (t === !1 ? "is not supported by the environment" : "is not available in the build"));
		throw new X("There is no suitable adapter to dispatch the request " + (n ? e.length > 1 ? "since :\n" + e.map(gl).join("\n") : " " + gl(e[0]) : "as no adapter specified"), X.ERR_NOT_SUPPORT);
	}
	return i;
}
var yl = {
	getAdapter: vl,
	adapters: hl
};
//#endregion
//#region node_modules/axios/lib/core/dispatchRequest.js
function bl(e) {
	if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted) throw new Ao(null, e);
}
function xl(e) {
	let t = J.toSafeFlatObject(e);
	return bl(t), t.headers = Y.from(J.getSafeProp(t, "headers")), t.data = Oo.call(t, t.transformRequest), [
		"post",
		"put",
		"patch"
	].indexOf(t.method) !== -1 && t.headers.setContentType("application/x-www-form-urlencoded", !1), yl.getAdapter(t.adapter || Do.adapter, t)(t).then(function(e) {
		bl(t), t.response = e;
		try {
			e.data = Oo.call(t, t.transformResponse, e);
		} finally {
			delete t.response;
		}
		return e.headers = Y.from(e.headers), e;
	}, function(e) {
		if (!ko(e) && (bl(t), e && e.response)) {
			t.response = e.response;
			try {
				e.response.data = Oo.call(t, t.transformResponse, e.response);
			} finally {
				delete t.response;
			}
			e.response.headers = Y.from(e.response.headers);
		}
		return Promise.reject(e);
	});
}
//#endregion
//#region node_modules/axios/lib/helpers/validator.js
var Sl = {};
[
	"object",
	"boolean",
	"number",
	"function",
	"string",
	"symbol"
].forEach((e, t) => {
	Sl[e] = function(n) {
		return typeof n === e || "a" + (t < 1 ? "n " : " ") + e;
	};
});
var Cl = {};
Sl.transitional = function(e, t, n) {
	function r(e, t) {
		return "[Axios v" + $o + "] Transitional option '" + e + "'" + t + (n ? ". " + n : "");
	}
	return (n, i, a) => {
		if (e === !1) throw new X(r(i, " has been removed" + (t ? " in " + t : "")), X.ERR_DEPRECATED);
		return t && !Cl[i] && (Cl[i] = !0, console.warn(r(i, " has been deprecated since v" + t + " and will be removed in the near future"))), !e || e(n, i, a);
	};
}, Sl.spelling = function(e) {
	return (t, n) => (console.warn(`${n} is likely a misspelling of ${e}`), !0);
};
function wl(e, t, n) {
	if (typeof e != "object" || !e) throw new X("options must be an object", X.ERR_BAD_OPTION_VALUE);
	let r = Object.keys(e), i = r.length;
	for (; i-- > 0;) {
		let a = r[i], o = Object.prototype.hasOwnProperty.call(t, a) ? t[a] : void 0;
		if (o) {
			let t = e[a], n = t === void 0 || o(t, a, e);
			if (n !== !0) throw new X("option " + a + " must be " + n, X.ERR_BAD_OPTION_VALUE);
			continue;
		}
		if (n !== !0) throw new X("Unknown option " + a, X.ERR_BAD_OPTION);
	}
}
var Tl = {
	assertOptions: wl,
	validators: Sl
}, El = Tl.validators, Dl = class {
	constructor(e) {
		this.defaults = e || {}, this.interceptors = {
			request: new io(),
			response: new io()
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
		typeof e == "string" ? (t ||= {}, t.url = e) : t = e || {}, t = Xc(this.defaults, t);
		let { transitional: n, paramsSerializer: r, headers: i } = t;
		n !== void 0 && Tl.assertOptions(n, {
			silentJSONParsing: El.transitional(El.boolean),
			forcedJSONParsing: El.transitional(El.boolean),
			clarifyTimeoutError: El.transitional(El.boolean),
			legacyInterceptorReqResOrdering: El.transitional(El.boolean),
			advertiseZstdAcceptEncoding: El.transitional(El.boolean),
			validateStatusUndefinedResolves: El.transitional(El.boolean)
		}, !1), r != null && (J.isFunction(r) ? t.paramsSerializer = { serialize: r } : Tl.assertOptions(r, {
			encode: El.function,
			serialize: El.function
		}, !0)), t.allowAbsoluteUrls !== void 0 || (this.defaults.allowAbsoluteUrls === void 0 ? t.allowAbsoluteUrls = !0 : t.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls), Tl.assertOptions(t, {
			baseUrl: El.spelling("baseURL"),
			withXsrfToken: El.spelling("withXSRFToken")
		}, !0), t.method = (J.getSafeProp(t, "method") || J.getSafeProp(this.defaults, "method") || "get").toLowerCase();
		let a = i && J.merge(i.common, i[t.method]);
		i && J.forEach(wo.concat("common"), (e) => {
			delete i[e];
		}), t.headers = Y.concat(a, i);
		let o = [], s = !0;
		this.interceptors.request.forEach(function(e) {
			if (typeof e.runWhen == "function" && e.runWhen(t) === !1) return;
			s &&= e.synchronous;
			let n = t.transitional || ao;
			n && n.legacyInterceptorReqResOrdering ? o.unshift(e.fulfilled, e.rejected) : o.push(e.fulfilled, e.rejected);
		});
		let c = [];
		this.interceptors.response.forEach(function(e) {
			c.push(e.fulfilled, e.rejected);
		});
		let l, u = 0, d;
		if (!s) {
			let e = [xl.bind(this), void 0];
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
					J.isThenable(n) && (l = Promise.resolve(n).then(() => xl.call(this, f)));
				} catch (e) {
					l = Promise.reject(e);
				}
				break;
			}
		}
		if (!l) try {
			l = xl.call(this, f);
		} catch (e) {
			l = Promise.reject(e);
		}
		for (u = 0, d = c.length; u < d;) l = l.then(c[u++], c[u++]);
		return l;
	}
	getUri(e) {
		return e = Xc(this.defaults, e), $a(Bo(e.baseURL, e.url, e.allowAbsoluteUrls, e), e.params, e.paramsSerializer);
	}
};
J.forEach([
	"delete",
	"get",
	"head",
	"options"
], function(e) {
	Dl.prototype[e] = function(t, n) {
		return this.request(Xc(n || {}, {
			method: e,
			url: t,
			data: n && J.hasOwnProp(n, "data") ? n.data : void 0
		}));
	};
}), J.forEach([
	"post",
	"put",
	"patch",
	"query"
], function(e) {
	function t(t) {
		return function(n, r, i) {
			return this.request(Xc(i || {}, {
				method: e,
				headers: t ? { "Content-Type": "multipart/form-data" } : {},
				url: n,
				data: r
			}));
		};
	}
	Dl.prototype[e] = t(), e !== "query" && (Dl.prototype[e + "Form"] = t(!0));
});
//#endregion
//#region node_modules/axios/lib/cancel/CancelToken.js
var Ol = class e {
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
			n.reason || (n.reason = new Ao(e, r, i), t(n.reason));
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
function kl(e) {
	return function(t) {
		return e.apply(null, t);
	};
}
//#endregion
//#region node_modules/axios/lib/helpers/isAxiosError.js
function Al(e) {
	return J.isObject(e) && e.isAxiosError === !0;
}
//#endregion
//#region node_modules/axios/lib/helpers/HttpStatusCode.js
var jl = {
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
Object.entries(jl).forEach(([e, t]) => {
	jl[t] === void 0 && (jl[t] = e);
});
//#endregion
//#region node_modules/axios/lib/axios.js
function Ml(e) {
	let t = new Dl(e), n = Jn(Dl.prototype.request, t);
	return J.extend(n, Dl.prototype, t, { allOwnKeys: !0 }), J.extend(n, t, null, { allOwnKeys: !0 }), n.create = function(t) {
		return Ml(Xc(e, t));
	}, n;
}
var Q = Ml(Do);
Q.Axios = Dl, Q.CanceledError = Ao, Q.CancelToken = Ol, Q.isCancel = ko, Q.VERSION = $o, Q.toFormData = Ja, Q.AxiosError = X, Q.Cancel = Q.CanceledError, Q.all = function(e) {
	return Promise.all(e);
}, Q.spread = kl, Q.isAxiosError = Al, Q.mergeConfig = Xc, Q.AxiosHeaders = Y, Q.formToJSON = (e) => Co(J.isHTMLForm(e) ? new FormData(e) : e), Q.getAdapter = yl.getAdapter, Q.HttpStatusCode = jl, Q.default = Q;
//#endregion
//#region electron/main.ts
var Nl = qn();
e(import.meta.url);
var Pl = y.dirname(v(import.meta.url));
process.env.APP_ROOT = y.join(Pl, "..");
var Fl = process.env.VITE_DEV_SERVER_URL, Il = y.join(process.env.APP_ROOT, "dist-electron"), Ll = y.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = Fl ? y.join(process.env.APP_ROOT, "public") : Ll;
var Rl, zl = "https://printpanda-api.onrender.com", Bl = 5e3, Vl = y.join(n.getPath("userData"), "temp-prints"), Hl = y.join(n.getPath("userData"), "printpanda-config.json");
i.existsSync(Vl) || i.mkdirSync(Vl, { recursive: !0 });
function Ul() {
	try {
		if (i.existsSync(Hl)) return JSON.parse(i.readFileSync(Hl, "utf-8"));
	} catch (e) {
		console.error("Failed to load config", e);
	}
	return {
		storeId: "",
		isAutoPrintEnabled: !1
	};
}
function Wl(e) {
	try {
		let t = Ul();
		i.writeFileSync(Hl, JSON.stringify({
			...t,
			...e
		}, null, 2));
	} catch (e) {
		console.error("Failed to save config", e);
	}
}
var Gl = Ul(), Kl = Gl.storeId || null, ql = !1, Jl = Gl.isAutoPrintEnabled || !1, Yl = null;
function $(e) {
	console.log(e), Rl?.webContents.send("agent-log", e);
}
async function Xl(e, t) {
	try {
		await Q.patch(`${zl}/orders/${e}/status`, { status: t }), $(`[Status] Order ${e} updated to ${t}`);
	} catch (n) {
		$(`[Error] Failed to update order ${e} to ${t}: ${n.message}`);
	}
}
async function Zl(e, t = !1) {
	return new Promise((n, r) => {
		let i = "";
		i = t ? `notepad /p "${e}"` : `powershell.exe -Command "Start-Process -FilePath '${e}' -Verb Print -PassThru | %{sleep 30;$_} | kill"`, l(i, (t, i, a) => {
			if (t) return $(`[Error] Failed to print document ${e}: ${t.message}`), r(t);
			n();
		});
	});
}
async function Ql(e, t) {
	let { id: n } = e;
	$(`[Agent] Processing order: ${n}`), await Xl(n, "PRINTING");
	let r = y.join(Vl, `order-${n}.pdf`);
	$(`[Agent] Downloading PDF for order ${n}...`);
	try {
		let e = await Q({
			method: "GET",
			url: `${zl}/orders/${n}/download`,
			responseType: "stream"
		}), t = i.createWriteStream(r);
		e.data.pipe(t), await new Promise((e, n) => {
			t.on("finish", e), t.on("error", n);
		}), $(`[Agent] Download complete: ${r}`);
	} catch (e) {
		$(`[Error] Failed to download PDF for order ${n}: ${e.message}`);
		return;
	}
	if (t) {
		$(`[Print Spooler] Printing cover page for order ${n}...`);
		let t = y.join(Vl, `cover-${n}.txt`), r = `PRINTPANDA AUTOMATED ORDER\n\nOrder ID: ${n}\nPages: ${e.totalPages}\nPrice: BDT ${e.totalPrice}\n\n======================\nEnd of Cover Page\n`;
		i.writeFileSync(t, r);
		try {
			await Zl(t, !0), i.unlinkSync(t);
		} catch {
			$("[Error] Failed to print cover page.");
		}
	}
	$(`[Print Spooler] Sending job to Windows Print Spooler: ${r}`);
	try {
		await Zl(r, !1);
	} catch {}
	await Xl(n, "READY_TO_PICKUP");
	try {
		i.unlinkSync(r), $("[Agent] Cleaned up temporary file");
	} catch (e) {
		$(`[Error] Failed to delete file ${r}: ${e.message}`);
	}
	$(`[Agent] Finished processing order: ${n}`), Rl?.webContents.send("order-completed", e), $l();
}
async function $l() {
	if (Kl) try {
		let e = (await Q.get(`${zl}/orders/ready-to-print?storeId=${Kl}`)).data;
		Rl?.webContents.send("orders-updated", e);
	} catch {}
}
async function eu() {
	if (ql && Kl) try {
		let e = (await Q.get(`${zl}/orders/ready-to-print?storeId=${Kl}`)).data;
		Rl?.webContents.send("orders-updated", e), e && e.length > 0 && Jl && ($("[Auto-Print] Processing oldest order in queue..."), await Ql(e[0], !0));
	} catch (e) {
		$(`[Error] Polling failed: ${e.message}`);
	} finally {
		ql && (Yl = setTimeout(eu, Bl));
	}
}
r.handle("get-config", () => ({
	storeId: Kl,
	isAutoPrintEnabled: Jl
})), r.handle("validate-store", async (e, t) => {
	try {
		return !!(await Q.get(`${zl}/stores/${t}/dashboard`)).data.store;
	} catch {
		return !1;
	}
}), r.handle("get-store-info", async () => {
	if (!Kl) return null;
	try {
		return (await Q.get(`${zl}/stores/${Kl}/dashboard`)).data.store;
	} catch {
		return null;
	}
}), r.handle("toggle-accepting-orders", async (e, t) => {
	if (!Kl) return !1;
	try {
		return await Q.patch(`${zl}/stores/${Kl}/accepting-orders`, { isAccepting: t }), !0;
	} catch {
		return !1;
	}
}), r.handle("set-store-id", (e, t) => (Kl = t, Wl({ storeId: Kl }), $(`[System] Store ID set to: ${Kl}`), !0)), r.handle("clear-store-id", () => (Kl = "", Wl({ storeId: "" }), $("[System] Store ID cleared"), !0)), r.handle("start-polling", (e) => Kl ? ql ? {
	success: !0,
	message: "Already polling"
} : (ql = !0, $(`[System] Started polling for Store: ${Kl}`), eu(), { success: !0 }) : {
	success: !1,
	error: "Store ID not set"
}), r.handle("stop-polling", (e) => (ql = !1, Yl && clearTimeout(Yl), $("[System] Stopped polling."), { success: !0 })), r.handle("set-auto-print", (e, t) => (Jl = t, Wl({ isAutoPrintEnabled: Jl }), $(`[System] Auto-Print is now ${t ? "ENABLED" : "DISABLED"}`), !0)), r.handle("get-auto-print", () => Jl), r.handle("print-order", async (e, t) => ($(`[Manual Print] Staff triggered print for ${t.id}`), Ql(t, !1).catch((e) => console.error(e)), !0)), r.handle("refresh-orders", async () => (await $l(), !0)), r.handle("get-history", async (e, t = 7) => {
	if (!Kl) return [];
	try {
		return (await Q.get(`${zl}/orders/history?storeId=${Kl}&days=${t}`)).data;
	} catch (e) {
		return $(`[Error] Failed to fetch history: ${e.message}`), [];
	}
}), r.handle("get-printer-status", async () => new Promise((e) => {
	l("powershell.exe -Command \"Get-Printer | Select-Object Name, PrinterStatus | ConvertTo-Json\"", (t, n) => {
		if (t) {
			e({
				connected: !1,
				name: "Unknown",
				status: "Error"
			});
			return;
		}
		try {
			let t = JSON.parse(n);
			Array.isArray(t) || (t = [t]);
			let r = t.find((e) => e.Name && !e.Name.includes("PDF") && !e.Name.includes("XPS") && !e.Name.includes("OneNote")) || t[0];
			e(r ? {
				connected: r.PrinterStatus === "Normal" || r.PrinterStatus === 3 || r.PrinterStatus === 0,
				name: r.Name,
				status: r.PrinterStatus
			} : {
				connected: !1,
				name: "No Printer Found",
				status: "Offline"
			});
		} catch {
			e({
				connected: !1,
				name: "Error Parsing",
				status: "Unknown"
			});
		}
	});
}));
function tu() {
	Rl = new t({
		width: 1200,
		height: 800,
		title: `PrintPanda Agent v${n.getVersion()}`,
		icon: y.join(process.env.VITE_PUBLIC, "vite.svg"),
		autoHideMenuBar: !0,
		webPreferences: {
			preload: y.join(Pl, "preload.mjs"),
			plugins: !0
		}
	}), Rl.on("page-title-updated", (e) => {
		e.preventDefault();
	}), Fl ? Rl.loadURL(Fl) : Rl.loadFile(y.join(Ll, "index.html"));
}
n.on("window-all-closed", () => {
	process.platform !== "darwin" && (n.quit(), Rl = null);
}), n.on("activate", () => {
	t.getAllWindows().length === 0 && tu();
}), n.whenReady().then(() => {
	tu(), Nl.autoUpdater.autoDownload = !0, Nl.autoUpdater.checkForUpdatesAndNotify(), Nl.autoUpdater.on("update-available", (e) => {
		$(`[System] Update v${e.version} is available. Downloading...`), Rl?.webContents.send("update-available", e);
	}), Nl.autoUpdater.on("download-progress", (e) => {
		Rl?.webContents.send("update-progress", e.percent);
	}), Nl.autoUpdater.on("update-downloaded", (e) => {
		$(`[System] Update v${e.version} downloaded.`);
		let t = (e.releaseNotes || "").toString().toUpperCase().includes("[FORCE_UPDATE]");
		Rl?.webContents.send("update-downloaded", {
			version: e.version,
			force: t
		}), t && ($("[System] FORCE UPDATE detected. Installing in 5 seconds..."), setTimeout(() => {
			Nl.autoUpdater.quitAndInstall();
		}, 5e3));
	});
}), r.handle("install-update", () => {
	$("[System] User initiated update install."), Nl.autoUpdater.quitAndInstall();
});
//#endregion
export { Il as MAIN_DIST, Ll as RENDERER_DIST, Fl as VITE_DEV_SERVER_URL };
