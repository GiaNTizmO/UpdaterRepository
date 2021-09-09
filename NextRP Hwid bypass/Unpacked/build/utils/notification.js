/* uglified */
"use strict";
var e = this && this.__awaiter || function (e, t, n, i) {
        return new(n || (n = Promise))((function (r, o) {
            function a(e) {
                try {
                    u(i.next(e))
                } catch (e) {
                    o(e)
                }
            }

            function s(e) {
                try {
                    u(i.throw(e))
                } catch (e) {
                    o(e)
                }
            }

            function u(e) {
                var t;
                e.done ? r(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
                    e(t)
                }))).then(a, s)
            }
            u((i = i.apply(e, t || [])).next())
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
const n = require("electron"),
    i = t(require("https")),
    r = t(require("fs-extra")),
    o = t(require("crypto")),
    a = t(require("path")),
    s = t(require("../utils/appId")),
    u = t(require("../utils/isProd")),
    d = t(require("../windows")),
    c = t(require("./logger")),
    f = new(require("node-notifier").WindowsToaster);

function l(t, s) {
    return e(this, void 0, void 0, (function* () {
        const e = u.default ? a.default.resolve(n.app.getPath("exe"), "../extras/icons/favicon.png") : a.default.resolve(process.cwd(), "./extras/icons/favicon.png");
        try {
            if (!t || "string" != typeof t || !t.startsWith("https")) return e;
            const u = n.app.getPath("temp"),
                d = o.default.createHash("md5").update(JSON.stringify({
                    nextrp: "notification_center",
                    url: t,
                    props: s
                })).digest("hex"),
                c = a.default.resolve(u, d + ".png");
            if (yield r.default.stat(c).then((() => !0)).catch((() => !1))) return c;
            const f = yield new Promise(((e, n) => {
                const r = [];
                i.default.get(t, {
                    rejectUnauthorized: !1
                }, (t => {
                    t.on("data", (e => r.push(e))), t.on("end", (() => {
                        const t = Buffer.concat(r);
                        return e(t)
                    })), t.on("error", n)
                })).on("error", n).end()
            })).then((e => e));
            if (f.length > 0) return yield r.default.ensureDir(u), yield r.default.writeFile(c, f), c
        } catch (e) {
            c.default.error("notification", "iconLoader", e.message)
        }
        return e
    }))
}
const p = e => {
        const t = d.default.get("main");
        t && t.webContents.send("notification", e)
    },
    h = t => e(void 0, void 0, void 0, (function* () {
        return f.notify({
            title: t.title,
            message: t.body,
            icon: yield l(t.icon, t.icon_props),
            appID: s.default,
            sound: void 0 === t.sound || t.sound,
            wait: !0,
            id: t.id
        }, ((e, n, i) => e ? c.default.error("notification", "action", e.message) : n ? i ? p({
            type: i.action,
            id: t.id,
            obj: i
        }) : void 0 : p({
            type: "click",
            id: t.id
        }))), !0
    })),
    v = {
        show: h
    };
exports.default = v;