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
const n = require("electron"),
    r = require("./controls"),
    t = e(require("../utils/logger"));
let o = [],
    l = [];
const s = e => (n, r) => {
        const t = w.get(e);
        if (t && (t.webContents.send("window", {
                name: e,
                key: n,
                value: r
            }), l.forEach((t => {
                t.name === e && t.key === n && t.fn(r)
            }))), "main" !== e) {
            const t = w.get("main");
            if (!t) return;
            t.webContents.send("window", {
                name: e,
                key: n,
                value: r
            })
        }
    },
    i = (e, n, r) => {
        const t = Math.random().toString(36);
        return l.push({
            key: n,
            id: t,
            fn: r,
            name: e
        }), () => {
            l = l.filter((e => e.fn !== r))
        }
    },
    u = e => {
        const n = o.find((n => n.name === e));
        return n ? n.win : null
    },
    a = (e, n) => {
        if (u(e)) throw new Error(`Window ${e} already exists`);
        return o.push({
            name: e,
            win: n
        }), f(e), n
    },
    c = e => o = o.filter((n => n.name !== e)),
    f = e => {
        const n = u(e);
        if (!n) throw new Error("Cant handle window events, because window not found");
        const r = s(e);
        n.on("blur", (() => r("blur", !0))), n.on("focus", (() => r("focus", !0))), n.on("hide", (() => r("hide", !0))), n.on("show", (() => r("show", !0))), n.on("close", (() => r("close", !0))), n.on("closed", (() => {
            c(e), r("closed", !0)
        })), n.on("unmaximize", (() => r("unmaximize", !0))), n.on("enter-full-screen", (() => r("enter-full-screen", !0))), n.on("enter-html-full-screen", (() => r("enter-html-full-screen", !0))), n.on("leave-full-screen", (() => r("leave-full-screen", !0))), n.on("leave-html-full-screen", (() => r("leave-html-full-screen", !0)))
    },
    d = (e, r) => {
        if (u(e)) throw new Error(`Window ${e} already exists`);
        t.default.info("create window", e);
        const l = new n.BrowserWindow(r);
        return o.push({
            name: e,
            win: l
        }), f(e), l
    },
    w = {
        get: u,
        set: a,
        create: d,
        delete: c,
        controls: r.controls,
        subscribe: i
    };
exports.default = w;