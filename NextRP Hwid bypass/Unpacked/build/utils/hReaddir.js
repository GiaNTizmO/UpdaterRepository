/* uglified */
"use strict";
var e = this && this.__awaiter || function (e, t, i, o) {
        return new(i || (i = Promise))((function (r, n) {
            function d(e) {
                try {
                    s(o.next(e))
                } catch (e) {
                    n(e)
                }
            }

            function a(e) {
                try {
                    s(o.throw(e))
                } catch (e) {
                    n(e)
                }
            }

            function s(e) {
                var t;
                e.done ? r(e.value) : (t = e.value, t instanceof i ? t : new i((function (e) {
                    e(t)
                }))).then(d, a)
            }
            s((o = o.apply(e, t || [])).next())
        }))
    },
    t = this && this.__importDefault || function (e) {
        return e && e.__esModule ? e : {
            default: e
        }
    };
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.hReaddirCancellable = exports.hReaddir = void 0;
const i = t(require("fs-extra")),
    o = t(require("path")),
    r = (t, {
        recursive: r
    }) => e(void 0, void 0, void 0, (function* () {
        const n = [],
            d = a => e(void 0, void 0, void 0, (function* () {
                const e = yield i.default.readdir(a);
                for (const s of e) {
                    const e = o.default.join(a, s),
                        u = yield i.default.stat(e), c = u.isDirectory();
                    n.push({
                        is_dir: c,
                        size: c ? 0 : u.size,
                        abs_path: e,
                        rel_path: o.default.relative(t, e)
                    }), r && c && (yield d(e))
                }
            }));
        return yield d(t), n
    }));
exports.hReaddir = r;
const n = (t, {
    recursive: r
}, n) => e(void 0, void 0, void 0, (function* () {
    const d = [],
        a = s => e(void 0, void 0, void 0, (function* () {
            if (n()) return;
            const e = yield i.default.readdir(s);
            for (const n of e) {
                const e = o.default.join(s, n),
                    u = yield i.default.stat(e), c = u.isDirectory();
                d.push({
                    is_dir: c,
                    size: c ? 0 : u.size,
                    abs_path: e,
                    rel_path: o.default.relative(t, e)
                }), r && c && (yield a(e))
            }
        }));
    return yield a(t), d
}));
exports.hReaddirCancellable = n;