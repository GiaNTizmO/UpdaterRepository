/* uglified */
"use strict";
var e = this && this.__importDefault || function (e) {
    return e && e.__esModule ? e : {
        default: e
    }
};
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.createTorrentListener = void 0;
const t = require("electron"),
    r = e(require("../torrent")),
    n = e(require("../torrent/emitter")),
    o = e(require("../windows")),
    i = e(require("../utils/logger")),
    a = e => {
        const t = o.default.get("main");
        t && t.webContents.send("torrent", {
            type: "error",
            data: e
        })
    },
    s = e => {
        const t = o.default.get("main");
        t && t.webContents.send("torrent", {
            type: "info",
            data: e
        })
    },
    f = e => {
        const t = o.default.get("main");
        t && t.webContents.send("torrent", {
            type: "instance",
            data: e
        })
    },
    u = (e, t) => r.default.start(t),
    d = () => r.default.stop(),
    c = (e, t) => r.default.set_quiet_mode(t),
    p = (e, t) => r.default.set_paused_mode(t),
    l = (e, t, n) => r.default.set_proxied_mode(t, n),
    b = (e, t, n) => r.default.subscribe(t, n, (e => {
        const r = o.default.get("main");
        r && r.webContents.send("torrent", {
            type: t,
            data: e,
            key: n
        })
    })),
    M = (e, t) => r.default.unsubscribe(t),
    _ = () => (t.ipcMain.on("torrent.start", u), t.ipcMain.on("torrent.stop", d), t.ipcMain.on("torrent.quiet", c), t.ipcMain.on("torrent.paused", p), t.ipcMain.on("torrent.proxied", l), t.ipcMain.on("torrent.subscribe", b), t.ipcMain.on("torrent.unsubscribe", M), n.default.on("error", a), n.default.on("info", s), n.default.on("instance", f), i.default.info("torrent listeners", "created"), () => {
        t.ipcMain.off("torrent.start", u), t.ipcMain.off("torrent.stop", d), t.ipcMain.off("torrent.quiet", c), t.ipcMain.off("torrent.paused", p), t.ipcMain.off("torrent.proxied", l), t.ipcMain.off("torrent.subscribe", b), t.ipcMain.off("torrent.unsubscribe", M), n.default.off("error", a), n.default.off("info", s), n.default.off("instance", f), i.default.info("torrent listeners", "removed")
    });
exports.createTorrentListener = _;