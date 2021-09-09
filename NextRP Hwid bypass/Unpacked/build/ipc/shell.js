/* uglified */
"use strict";
var e = this && this.__importDefault || function (e) {
    return e && e.__esModule ? e : {
        default: e
    }
};
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.createShellListener = void 0;
const l = require("electron"),
    r = e(require("../utils/logger")),
    t = () => l.shell.beep(),
    n = (e, t) => l.shell.openExternal(t).catch((e => {
        throw r.default.error("open_external", e), e
    })),
    s = () => (l.ipcMain.handle("shell.beep", t), l.ipcMain.handle("shell.open_external", n), r.default.info("shell listeners", "created"), () => {
        l.ipcMain.removeHandler("shell.beep"), l.ipcMain.removeHandler("shell.open_external"), r.default.info("shell listeners", "removed")
    });
exports.createShellListener = s;