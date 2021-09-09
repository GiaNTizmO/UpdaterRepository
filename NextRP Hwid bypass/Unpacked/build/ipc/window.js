/* uglified */
"use strict";
var e = this && this.__importDefault || function (e) {
    return e && e.__esModule ? e : {
        default: e
    }
};
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.createWindowListener = void 0;
const i = require("electron"),
    n = e(require("../utils/logger")),
    a = e(require("../windows")),
    o = () => {
        const e = a.default.get("main");
        e && a.default.controls.show(e)
    },
    t = () => {
        const e = a.default.get("main");
        e && a.default.controls.focus(e)
    },
    d = () => {
        const e = a.default.get("main");
        e && a.default.controls.hide(e)
    },
    r = () => {
        const e = a.default.get("main");
        e && a.default.controls.minimize(e)
    },
    l = () => {
        const e = a.default.get("main");
        e && (e.isMaximized() ? e.unmaximize() : e.isMaximizable() && a.default.controls.maximize(e))
    },
    s = (e, i, n, o = !1) => {
        const t = a.default.get("main");
        t && a.default.controls.resize(t, i, n, o)
    },
    c = (e, n, o) => {
        const t = a.default.get("main");
        if (t) return n ? n.startsWith("data:image/png;base64") ? t.setOverlayIcon(i.nativeImage.createFromDataURL(n), o) : void 0 : t.setOverlayIcon(i.nativeImage.createEmpty(), o)
    },
    w = () => (i.ipcMain.handle("window.show", o), i.ipcMain.handle("window.focus", t), i.ipcMain.handle("window.hide", d), i.ipcMain.handle("window.minimize", r), i.ipcMain.handle("window.maximize", l), i.ipcMain.handle("window.resize", s), i.ipcMain.handle("window.set_overlay_icon", c), n.default.info("window listeners", "created"), () => {
        i.ipcMain.removeHandler("window.show"), i.ipcMain.removeHandler("window.focus"), i.ipcMain.removeHandler("window.hide"), i.ipcMain.removeHandler("window.minimize"), i.ipcMain.removeHandler("window.maximize"), i.ipcMain.removeHandler("window.resize"), i.ipcMain.removeHandler("window.set_overlay_icon"), n.default.info("window listeners", "removed")
    });
exports.createWindowListener = w;