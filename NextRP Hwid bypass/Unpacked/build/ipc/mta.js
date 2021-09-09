/* uglified */
"use strict";
var e = this && this.__importDefault || function (e) {
    return e && e.__esModule ? e : {
        default: e
    }
};
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.createMtaListener = void 0;
const a = require("electron"),
    t = e(require("../mta")),
    r = e(require("../utils/logger")),
    n = (e, a, r) => t.default.create_cmd_commands(a, r),
    c = (e, a, r) => t.default.create_vbs_commands(a, r),
    i = (e, a) => t.default.exec(a),
    m = (e, a, r) => t.default.spawn(a, r),
    d = () => t.default.close(),
    s = () => (a.ipcMain.handle("mta.create_cmd_commands", n), a.ipcMain.handle("mta.create_vbs_commands", c), a.ipcMain.handle("mta.exec", i), a.ipcMain.handle("mta.spawn", m), a.ipcMain.handle("mta.close", d), r.default.info("mta listeners", "created"), () => {
        a.ipcMain.removeHandler("mta.create_cmd_commands"), a.ipcMain.removeHandler("mta.create_vbs_commands"), a.ipcMain.removeHandler("mta.exec"), a.ipcMain.removeHandler("mta.spawn"), a.ipcMain.removeHandler("mta.close"), r.default.info("mta listeners", "removed")
    });
exports.createMtaListener = s;