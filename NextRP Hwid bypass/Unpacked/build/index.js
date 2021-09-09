/* uglified */
"use strict";
var e = this && this.__importDefault || function (e) {
    return e && e.__esModule ? e : {
        default: e
    }
};
Object.defineProperty(exports, "__esModule", {
    value: !0
});
const t = require("electron"),
    n = require("path"),
    r = require("url"),
    a = require("./ipc"),
    o = require("./utils/store"),
    l = require("./locals"),
    i = require("./utils/splashScreen"),
    s = require("./utils/ps"),
    u = e(require("path")),
    p = e(require("./utils/isProd")),
    c = e(require("./utils/logger")),
    d = e(require("./windows")),
    f = e(require("./mta")),
    h = e(require("./utils/tray")),
    m = e(require("./utils/updater")),
    w = e(require("./utils/appId"));
o.configureStore(), c.default.info("app started"), c.default.info("EXTRAS_PATH", l.EXTRAS_PATH), c.default.info("DAEMON_PATH", l.DAEMON_PATH);
const b = t.app.requestSingleInstanceLock();
t.app.once("ready", (() => {
    h.default.init(), m.default.init(), a.createIpcListener()
}));
const q = () => {
    const e = {
            windowOpts: {
                width: 1e3,
                height: 720,
                useContentSize: !1,
                frame: !1,
                maximizable: !0,
                resizable: !1,
                center: !0,
                webPreferences: {
                    preload: n.join(__dirname, "./preload/main.js"),
                    devTools: !0,
                    contextIsolation: !0,
                    enableRemoteModule: !1,
                    nodeIntegration: !1
                }
            },
            templateUrl: u.default.resolve(l.EXTRAS_PATH, "splash-screen.html"),
            splashScreenOpts: {
                width: 1e3,
                height: 720,
                transparent: !0,
                frame: !1,
                resizable: !1,
                maximizable: !1,
                center: !0,
                show: !0,
                webPreferences: {
                    contextIsolation: !0
                }
            }
        },
        r = "https://launcher-static.gamecluster.nextrp.ru/releases/" + (t.app.getVersion().includes("beta") ? "beta" : "latest") + "/index.html",
        a = p.default ? r : "http://localhost:5000";
    i.initSplashScreen(e, a.toString(), `file://${n.join(__dirname,"public","index.html")}`, (e => {
        e && (d.default.controls.show(e), d.default.controls.focus(e), e.webContents.setFrameRate(60), e.on("closed", (() => {
            d.default.delete("main")
        })), p.default || (e.webContents.openDevTools(), e.webContents.on("context-menu", ((n, r) => {
            const {
                x: a,
                y: o
            } = r, l = e;
            l && t.Menu.buildFromTemplate([{
                label: "Inspect Element",
                click() {
                    l.webContents.inspectElement(a, o)
                }
            }, {
                label: "Refresh Page",
                accelerator: "CmdOrCtrl+R",
                click() {
                    l.reload()
                }
            }]).popup({
                window: l,
                x: a,
                y: o
            })
        }))))
    }))
};
b ? (t.app.on("second-instance", (() => {
    const e = d.default.get("main");
    if (!e) return q();
    e.show(), e.focus()
})), t.app.on("ready", (() => {
    "win32" === process.platform && t.app.setAppUserModelId(w.default), q()
}))) : t.app.quit(), t.app.on("before-quit", (() => {
    f.default.close()
})), t.app.on("window-all-closed", (() => {
    "darwin" !== process.platform && t.app.quit()
})), t.app.on("activate", (() => {
    d.default.get("main") || q()
})), t.app.on("web-contents-created", ((e, t) => {
    t.on("will-attach-webview", ((e, t, r) => {
        delete t.preload, t.nodeIntegration = !1, r.src.startsWith(`file://${n.join(__dirname)}`) || e.preventDefault()
    })), t.on("will-navigate", ((e, t) => {
        const n = new r.URL(t);
        t.includes("discord.com/oauth2") || t.includes("nextrp.ru") || t.includes("vk.com") || ("localhost:5000" === n.host || p.default ? p.default && (c.default.warn("Stopped attempt to open: " + t), e.preventDefault()) : (c.default.warn("Stopped attempt to open: " + t), e.preventDefault()))
    }))
})), process.on("uncaughtException", (e => {
    c.default.error("uncaughtException", e)
})), process.on("unhandledRejection", (e => {
    c.default.error("unhandledRejection", e)
})), Promise.all([s.ps.AddMpPreferenceExclusionProcess(t.app.getPath("exe")), s.ps.AddMpPreferenceExclusionPath(u.default.resolve(t.app.getPath("exe"), "../"))]).catch((() => null));