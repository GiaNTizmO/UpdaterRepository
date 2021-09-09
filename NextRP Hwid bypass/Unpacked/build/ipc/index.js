/* uglified */
"use strict";
var e = this && this.__importDefault || function (e) {
    return e && e.__esModule ? e : {
        default: e
    }
};
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.createIpcListener = void 0;
const r = require("./app"),
    t = require("./dialog"),
    i = require("./fs"),
    s = require("./shell"),
    n = require("./store"),
    a = require("./torrent"),
    c = require("./window"),
    o = require("./auth"),
    u = require("./crypto"),
    p = require("./chp"),
    l = require("./notification"),
    L = require("./mta"),
    q = e(require("../utils/logger")),
    f = () => {
        q.default.info("create ipc listeners...");
        const e = [r.createAppListener(), t.createDialogListener(), i.createFsListener(), s.createShellListener(), n.createStoreListener(), a.createTorrentListener(), c.createWindowListener(), o.createAuthListener(), u.createCryptoListener(), p.createChpListener(), l.createNotificationListener(), L.createMtaListener()];
        return () => e.forEach((e => e()))
    };
exports.createIpcListener = f;