/* uglified */
"use strict";
var e = this && this.__awaiter || function (e, i, r, n) {
        return new(r || (r = Promise))((function (d, t) {
            function o(e) {
                try {
                    s(n.next(e))
                } catch (e) {
                    t(e)
                }
            }

            function a(e) {
                try {
                    s(n.throw(e))
                } catch (e) {
                    t(e)
                }
            }

            function s(e) {
                var i;
                e.done ? d(e.value) : (i = e.value, i instanceof r ? i : new r((function (e) {
                    e(i)
                }))).then(o, a)
            }
            s((n = n.apply(e, i || [])).next())
        }))
    },
    i = this && this.__importDefault || function (e) {
        return e && e.__esModule ? e : {
            default: e
        }
    };
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.createFsListener = void 0;
const r = require("electron"),
    n = require("hdd-space"),
    d = require("../utils/hReaddir"),
    t = i(require("check-disk-space")),
    o = i(require("fs-extra")),
    a = i(require("path")),
    s = i(require("../utils/logger")),
    l = (i, r) => e(void 0, void 0, void 0, (function* () {
        try {
            const e = a.default.resolve(r),
                i = a.default.resolve(e, "test");
            return yield o.default.ensureDir(e), yield o.default.ensureFile(i), yield o.default.unlink(i), !0
        } catch (e) {
            return !1
        }
    })),
    f = (i, r) => e(void 0, void 0, void 0, (function* () {
        const e = a.default.resolve(r);
        return (yield o.default.readdir(e)).length <= 0
    })),
    u = (i, r) => e(void 0, void 0, void 0, (function* () {
        const e = a.default.resolve(r);
        return (yield o.default.stat(e)).isDirectory()
    })),
    c = (i, r) => e(void 0, void 0, void 0, (function* () {
        const e = a.default.resolve(r);
        return o.default.stat(e).then((() => !0)).catch((() => !1))
    })),
    v = (i, r) => e(void 0, void 0, void 0, (function* () {
        const e = a.default.resolve(r);
        return d.hReaddir(e, {
            recursive: !1
        })
    })),
    p = (i, r) => e(void 0, void 0, void 0, (function* () {
        const e = a.default.resolve(r);
        return d.hReaddir(e, {
            recursive: !0
        })
    })),
    h = () => e(void 0, void 0, void 0, (function* () {
        return n.fetchHddInfo()
    })),
    M = (i, r) => e(void 0, void 0, void 0, (function* () {
        const e = a.default.resolve(r);
        return (yield t.default(e)).free
    })),
    m = (i, r) => e(void 0, void 0, void 0, (function* () {
        return o.default.mkdir(a.default.resolve(r))
    })),
    _ = (i, r) => e(void 0, void 0, void 0, (function* () {
        return o.default.mkdirp(a.default.resolve(r))
    })),
    y = (i, r) => e(void 0, void 0, void 0, (function* () {
        return o.default.remove(a.default.resolve(r))
    })),
    H = (i, r, n) => e(void 0, void 0, void 0, (function* () {
        return o.default.copyFile(a.default.resolve(r), a.default.resolve(n))
    })),
    k = (i, r, n) => e(void 0, void 0, void 0, (function* () {
        return o.default.writeFile(r, n)
    })),
    w = () => (r.ipcMain.handle("fs.is_writable", l), r.ipcMain.handle("fs.is_empty", f), r.ipcMain.handle("fs.is_directory", u), r.ipcMain.handle("fs.is_exists", c), r.ipcMain.handle("fs.readdir", v), r.ipcMain.handle("fs.readdirp", p), r.ipcMain.handle("fs.drives", h), r.ipcMain.handle("fs.free_space", M), r.ipcMain.handle("fs.mkdir", m), r.ipcMain.handle("fs.mkdirp", _), r.ipcMain.handle("fs.remove", y), r.ipcMain.handle("fs.copy_file", H), r.ipcMain.handle("fs.write_file", k), s.default.info("fs listeners", "created"), () => {
        r.ipcMain.removeHandler("fs.is_writable"), r.ipcMain.removeHandler("fs.is_empty"), r.ipcMain.removeHandler("fs.is_directory"), r.ipcMain.removeHandler("fs.is_exists"), r.ipcMain.removeHandler("fs.readdir"), r.ipcMain.removeHandler("fs.readdirp"), r.ipcMain.removeHandler("fs.drives"), r.ipcMain.removeHandler("fs.free_space"), r.ipcMain.removeHandler("fs.mkdir"), r.ipcMain.removeHandler("fs.mkdirp"), r.ipcMain.removeHandler("fs.remove"), r.ipcMain.removeHandler("fs.copy_file"), r.ipcMain.removeHandler("fs.write_file"), s.default.info("fs listeners", "removed")
    });
exports.createFsListener = w;