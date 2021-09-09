/* uglified */
"use strict";
var e = this && this.__awaiter || function (e, t, n, r) {
        return new(n || (n = Promise))((function (o, a) {
            function i(e) {
                try {
                    s(r.next(e))
                } catch (e) {
                    a(e)
                }
            }

            function l(e) {
                try {
                    s(r.throw(e))
                } catch (e) {
                    a(e)
                }
            }

            function s(e) {
                var t;
                e.done ? o(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
                    e(t)
                }))).then(i, l)
            }
            s((r = r.apply(e, t || [])).next())
        }))
    },
    t = this && this.__importDefault || function (e) {
        return e && e.__esModule ? e : {
            default: e
        }
    };
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.createAuthListener = void 0;
const n = require("electron"),
    r = t(require("../utils/logger")),
    o = t(require("../windows")),
    a = require("../locals"),
    i = () => e(void 0, void 0, void 0, (function* () {
        return new Promise((e => {
            let t = o.default.get("auth_vk");
            t ? (t.show(), t.focus()) : t = o.default.create("auth_vk", {
                backgroundColor: "transparent",
                width: 520,
                height: 800,
                center: !0,
                fullscreen: !1,
                fullscreenable: !1,
                titleBarStyle: "hidden",
                show: !0,
                frame: !0,
                maximizable: !1,
                webPreferences: {
                    contextIsolation: !0,
                    devTools: !1,
                    enableRemoteModule: !1,
                    nodeIntegration: !1
                }
            });
            const n = Math.random().toString(36).substring(7);
            let r = "";
            if (!t) return e(r);
            t.setMenu(null), t.loadURL(`https://oauth.vk.com/authorize?client_id=${a.VK_CLIENT_ID}&display=popup&redirect_uri=https%3A%2F%2F${a.VK_REDIRECT_DOMAIN}%2Fsocial-vk&scope=email&response_type=code&v=5.124&state=${n}`), t.once("closed", (() => e(r))), t.webContents.on("did-navigate", ((e, o) => {
                if (o.includes("act=authcheck")) return;
                if (!o.includes(a.VK_REDIRECT_DOMAIN)) return void(t && t.close());
                const i = o.replace("#", "?"),
                    l = new URL(i).searchParams,
                    s = l.get("error"),
                    c = l.get("cancel");
                if (s || c) return void(t && t.close());
                const u = l.get("code"),
                    d = l.get("state");
                n === d && u && (r = u, t && t.close())
            }))
        }))
    })),
    l = () => e(void 0, void 0, void 0, (function* () {
        return new Promise((e => {
            let t = o.default.get("auth_discord");
            t ? (t.show(), t.focus()) : t = o.default.create("auth_discord", {
                backgroundColor: "transparent",
                width: 520,
                height: 800,
                center: !0,
                fullscreen: !1,
                fullscreenable: !1,
                titleBarStyle: "hidden",
                show: !0,
                frame: !0,
                maximizable: !1,
                webPreferences: {
                    nodeIntegration: !1,
                    webSecurity: !1,
                    contextIsolation: !0
                }
            });
            const n = Math.random().toString(36).substring(7);
            let r = "";
            if (!t) return e(r);
            t.setMenu(null), t.loadURL(`https://discord.com/api/oauth2/authorize?response_type=code&client_id=${a.DISCORD_CLIENT_ID}&state=${n}&scope=email%20identify&redirect_uri=https%3A%2F%2F${a.DISCORD_REDIRECT_DOMAIN}%2Fsocial-discord&prompt=consent`), t.once("closed", (() => e(r))), t.webContents.on("did-navigate", ((e, o) => {
                if (!o.includes(a.DISCORD_REDIRECT_DOMAIN)) return void(t && t.close());
                const i = o.replace("#", "?"),
                    l = new URL(i).searchParams,
                    s = l.get("error"),
                    c = l.get("code"),
                    u = l.get("state");
                s ? t && t.close() : n === u && c && (r = c, t && t.close())
            }))
        }))
    })),
    s = () => e(void 0, void 0, void 0, (function* () {
        return new Promise((e => {
            let t = o.default.get("auth_telegram");
            t ? (t.show(), t.focus()) : t = o.default.create("auth_telegram", {
                backgroundColor: "transparent",
                center: !0,
                fullscreen: !1,
                fullscreenable: !1,
                titleBarStyle: "hidden",
                height: 1,
                transparent: !0,
                width: 1,
                show: !0,
                frame: !1,
                maximizable: !1,
                title: "NEXTRP Telegram Auth",
                webPreferences: {
                    nodeIntegration: !0,
                    contextIsolation: !1
                }
            }), t.setMenu(null);
            let n = null;
            if (!t) return e(n);
            t.once("closed", (() => e(n))), t.webContents.addListener("ipc-message-sync", ((e, r, o) => {
                "callback" === r && (n = o || null, t && t.close())
            })), t.loadURL("https://nextrp.ru/auth/telegram.html")
        }))
    })),
    c = () => (n.ipcMain.handle("auth.vk", i), n.ipcMain.handle("auth.telegram", s), n.ipcMain.handle("auth.discord", l), r.default.info("auth listeners", "created"), () => {
        n.ipcMain.removeHandler("auth.vk"), n.ipcMain.removeHandler("auth.telegram"), n.ipcMain.removeHandler("auth.discord"), r.default.info("auth listeners", "removed")
    });
exports.createAuthListener = c;