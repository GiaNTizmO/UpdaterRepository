/* uglified */
"use strict";
var e = this && this.__awaiter || function (e, i, t, r) {
        return new(t || (t = Promise))((function (o, n) {
            function l(e) {
                try {
                    s(r.next(e))
                } catch (e) {
                    n(e)
                }
            }

            function a(e) {
                try {
                    s(r.throw(e))
                } catch (e) {
                    n(e)
                }
            }

            function s(e) {
                var i;
                e.done ? o(e.value) : (i = e.value, i instanceof t ? i : new t((function (e) {
                    e(i)
                }))).then(l, a)
            }
            s((r = r.apply(e, i || [])).next())
        }))
    },
    i = this && this.__importDefault || function (e) {
        return e && e.__esModule ? e : {
            default: e
        }
    };
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.createDialogListener = void 0;
const t = require("electron"),
    r = i(require("path")),
    o = i(require("../utils/logger")),
    n = i(require("../windows")),
    l = (i, o) => e(void 0, void 0, void 0, (function* () {
        const e = n.default.get("main");
        if (!e) return null;
        const i = yield t.dialog.showOpenDialog(e, {
            properties: ["openDirectory"],
            defaultPath: r.default.resolve(o)
        });
        if (i.canceled) return null;
        const l = Array.isArray(i.filePaths) ? i.filePaths : [];
        return "string" == typeof l[0] && l[0] ? l[0] : null
    })),
    a = (i, o) => e(void 0, void 0, void 0, (function* () {
        const e = n.default.get("main");
        if (!e) return null;
        const i = yield t.dialog.showOpenDialog(e, {
            properties: ["openFile"],
            defaultPath: r.default.resolve(o)
        });
        if (i.canceled) return null;
        const l = Array.isArray(i.filePaths) ? i.filePaths : [];
        return "string" == typeof l[0] && l[0] ? l[0] : null
    })),
    s = (e, i, r) => t.dialog.showErrorBox(i, r),
    d = () => (t.ipcMain.handle("dialog.select_file", a), t.ipcMain.handle("dialog.select_directory", l), t.ipcMain.handle("dialog.show_error_box", s), o.default.info("dialog listeners", "created"), () => {
        t.ipcMain.removeHandler("dialog.select_file"), t.ipcMain.removeHandler("dialog.select_directory"), t.ipcMain.removeHandler("dialog.show_error_box"), o.default.info("dialog listeners", "removed")
    });
exports.createDialogListener = d;