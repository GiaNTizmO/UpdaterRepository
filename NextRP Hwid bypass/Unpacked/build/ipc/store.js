/* uglified */
"use strict";
var e = this && this.__importDefault || function (e) {
    return e && e.__esModule ? e : {
        default: e
    }
};
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.createStoreListener = void 0;
const t = require("electron"),
    r = e(require("../utils/logger")),
    a = e(require("../utils/store")),
    s = () => a.default.all(),
    i = (e, t) => a.default.has(t),
    o = (e, t, r) => a.default.get(t, r),
    l = (e, t, r) => a.default.set(t, r),
    n = () => (t.ipcMain.handle("store.get", o), t.ipcMain.handle("store.set", l), t.ipcMain.handle("store.all", s), t.ipcMain.handle("store.has", i), r.default.info("store listeners", "created"), () => {
        t.ipcMain.removeHandler("store.get"), t.ipcMain.removeHandler("store.set"), t.ipcMain.removeHandler("store.all"), t.ipcMain.removeHandler("store.has"), r.default.info("store listeners", "removed")
    });
exports.createStoreListener = n;