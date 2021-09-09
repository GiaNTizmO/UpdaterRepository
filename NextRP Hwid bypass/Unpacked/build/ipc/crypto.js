/* uglified */
"use strict";
var e = this && this.__importDefault || function (e) {
    return e && e.__esModule ? e : {
        default: e
    }
};
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.createCryptoListener = void 0;
const r = require("electron"),
    t = e(require("crypto")),
    o = e(require("../utils/logger")),
    i = (e, r, o) => {
        const i = o.split(":"),
            c = Buffer.from(i.shift(), "hex"),
            s = Buffer.from(i.join(":"), "hex"),
            f = t.default.createDecipheriv("aes-256-cbc", Buffer.from(r), c);
        let n = f.update(s);
        return n = Buffer.concat([n, f.final()]), n.toString()
    },
    c = () => (r.ipcMain.handle("crypto.decrypt_aes", i), o.default.info("crypto listeners", "created"), () => {
        r.ipcMain.removeHandler("crypto.decrypt_aes"), o.default.info("crypto listeners", "removed")
    });
exports.createCryptoListener = c;