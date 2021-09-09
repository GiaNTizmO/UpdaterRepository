/* uglified */
"use strict";
var e = this && this.__awaiter || function (e, t, a, n) {
        return new(a || (a = Promise))((function (o, d) {
            function l(e) {
                try {
                    u(n.next(e))
                } catch (e) {
                    d(e)
                }
            }

            function i(e) {
                try {
                    u(n.throw(e))
                } catch (e) {
                    d(e)
                }
            }

            function u(e) {
                var t;
                e.done ? o(e.value) : (t = e.value, t instanceof a ? t : new a((function (e) {
                    e(t)
                }))).then(l, i)
            }
            u((n = n.apply(e, t || [])).next())
        }))
    },
    t = this && this.__importDefault || function (e) {
        return e && e.__esModule ? e : {
            default: e
        }
    };
Object.defineProperty(exports, "__esModule", {
    value: !0
});
const a = require("electron-updater"),
    n = require("builder-util-runtime"),
    o = require("lodash"),
    d = t(require("../mta")),
    l = t(require("./logger")),
    i = t(require("./store")),
    u = t(require("../windows"));
let r = [];
const c = o.throttle((e => {
        const t = u.default.get("main");
        t && t.webContents.send("updater", e)
    }), 300),
    s = e => {
        const t = Math.random().toString(36);
        return r.push({
            id: t,
            fn: e
        }), e(Object.assign({}, f)), () => {
            r = r.filter((t => t.fn !== e))
        }
    },
    f = new Proxy({
        checking: !1,
        available: !1,
        downloaded: !1,
        downloading: !1,
        update_info: null,
        progress_info: null
    }, {
        set: (e, t, a) => (e[t] = a, c(e), r.forEach((t => t.fn(Object.assign({}, e)))), !0)
    });
let p, w;
a.autoUpdater.logger = l.default, a.autoUpdater.autoDownload = !1, a.autoUpdater.allowDowngrade = !0, a.autoUpdater.autoInstallOnAppQuit = !1;
const g = () => {
        l.default.info("updater", "init", "called"), p && clearTimeout(p), p = setTimeout((() => {
            v().finally(U)
        }), 15e3)
    },
    _ = () => {
        l.default.info("updater", "check_for_updates", "called"), p && clearTimeout(p), f.downloading && y(), p = setTimeout((() => {
            v(!0).finally(U)
        }), 1500)
    },
    h = () => {
        l.default.info("updater", "use_beta_updates_changed", "called"), p && clearTimeout(p), f.downloading && y(), p = setTimeout((() => {
            v(!1).finally(U)
        }), 1500)
    },
    b = () => {
        const e = u.default.get("main"),
            t = !(f.downloading || !e || !e.isVisible() || d.default.execution());
        return l.default.info("updater", "is_ready_to_check_for_updates", t, {
            downloading: f.downloading,
            win: !e,
            mta: d.default.execution()
        }), t
    };
let m;
const v = (t = !1) => e(void 0, void 0, void 0, (function* () {
        if (!t && !b()) return;
        const n = i.default.get("use_beta_updates", !1) ? "beta" : "latest";
        return l.default.info("updater", "handle_timeout", n), a.autoUpdater.channel = n, m && m.cancel(), m = (() => {
            let t = !1;
            return {
                resolver: () => e(void 0, void 0, void 0, (function* () {
                    if (yield new Promise((e => setTimeout(e, 1e3))), t) throw new Error("Cancelled.");
                    return f.checking = !0, a.autoUpdater.checkForUpdates().finally((() => {
                        f.checking = !1
                    }))
                })),
                cancel: () => t = !0
            }
        })(), m.resolver().catch((() => null))
    })),
    U = () => {
        p && clearTimeout(p), p = setTimeout((() => {
            p = null, v().finally(U)
        }), 9e5)
    },
    y = () => {
        l.default.info("updater", "cancel_downloading", "called"), w && (l.default.info("updater", "cancel_downloading", "cancelled"), w.cancel()), f.downloading = !1
    },
    k = () => f.downloaded && a.autoUpdater.quitAndInstall(),
    T = () => Object.assign({}, f),
    q = {
        init: g,
        quit_and_install: k,
        check_for_updates: _,
        subscribe: s,
        get_state: T
    };
exports.default = q, i.default.subscribe("use_beta_updates", h), a.autoUpdater.on("update-available", (e => {
    f.checking = !1, f.available = !0, f.downloaded = !1, f.downloading = !0, f.update_info = e, a.autoUpdater.downloadUpdate(w = new n.CancellationToken).catch((e => {
        l.default.error("updater", "download_update", e.message)
    })).finally((() => {
        f.downloading = !1
    }))
})), a.autoUpdater.on("update-not-available", (e => {
    f.checking = !1, f.available = !1, f.downloaded = !1, f.downloading = !1, f.update_info = e
})), a.autoUpdater.on("update-downloaded", (e => {
    f.checking = !1, f.available = !0, f.downloaded = !0, f.downloading = !1, f.update_info = e
})), a.autoUpdater.on("download-progress", (e => {
    f.checking = !1, f.downloaded = !1, f.available = !0, f.downloading = !0, f.progress_info = e
}));