/* uglified */
"use strict";
var e = this && this.__importDefault || function (e) {
    return e && e.__esModule ? e : {
        default: e
    }
};
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.createNotificationListener = void 0;
const i = require("electron"),
    t = e(require("../utils/logger")),
    o = e(require("../utils/notification")),
    n = (e, i) => o.default.show(i),
    r = () => (i.ipcMain.handle("notification.show", n), t.default.info("notification listeners", "created"), () => {
        i.ipcMain.removeHandler("notification.show"), t.default.info("notification listeners", "removed")
    });
exports.createNotificationListener = r;