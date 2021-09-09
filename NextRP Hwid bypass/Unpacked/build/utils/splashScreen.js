/* uglified */
"use strict";
var e = this && this.__awaiter || function (e, t, i, n) {
        return new(i || (i = Promise))((function (o, s) {
            function r(e) {
                try {
                    d(n.next(e))
                } catch (e) {
                    s(e)
                }
            }

            function l(e) {
                try {
                    d(n.throw(e))
                } catch (e) {
                    s(e)
                }
            }

            function d(e) {
                var t;
                e.done ? o(e.value) : (t = e.value, t instanceof i ? t : new i((function (e) {
                    e(t)
                }))).then(r, l)
            }
            d((n = n.apply(e, t || [])).next())
        }))
    },
    t = this && this.__importDefault || function (e) {
        return e && e.__esModule ? e : {
            default: e
        }
    };
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.initSplashScreen = void 0;
const i = require("electron"),
    n = t(require("../windows")),
    o = t(require("./logger"));
let s = 0,
    r = !1,
    l = !1,
    d = !1;
const a = () => {
        w && r && l && (w.show(), s = Date.now())
    },
    c = (e, t) => {
        if (w) {
            const i = t - (Date.now() - s);
            setTimeout((() => {
                d = !0, w && (w.isDestroyed() || w.close(), w = null), e.show()
            }), i)
        }
    };
let w;
const u = (t, s, u, p) => {
    var f, h, y;
    let m = s;
    const v = {
        windowOpts: t.windowOpts,
        templateUrl: t.templateUrl,
        splashScreenOpts: t.splashScreenOpts,
        delay: null !== (f = t.delay) && void 0 !== f ? f : 500,
        minVisible: null !== (h = t.minVisible) && void 0 !== h ? h : 500,
        closeWindow: null === (y = t.closeWindow) || void 0 === y || y
    };
    let O;
    v.splashScreenOpts.frame = !1, v.splashScreenOpts.center = !0, v.splashScreenOpts.show = !1, v.windowOpts.show = !1, e(void 0, void 0, void 0, (function* () {
        for (;;) {
            O && !O.isDestroyed() && O.destroy();
            const e = new i.BrowserWindow(v.windowOpts);
            O = e, n.default.set("main", O);
            try {
                o.default.info("trying load window by", m), yield e.loadURL(m), yield new Promise((e => setTimeout(e, 1e3))), yield new Promise(((t, i) => "NEXTRP Launcher" !== e.getTitle() ? i(new Error(e.getTitle())) : t()));
                break
            } catch (e) {
                o.default.error("loading window by", m, "failed", JSON.stringify(e), "using", u), m = u, yield new Promise((e => setTimeout(e, 100)))
            }
        }
        c(O, v.minVisible), setTimeout((() => p(O)), v.minVisible), o.default.info("window by", m, "loaded")
    })).catch((e => {
        o.default.error("internal error", JSON.stringify(e)), i.app.quit()
    })), w = new i.BrowserWindow(v.splashScreenOpts), v.closeWindow && w.on("close", (() => {
        d || !O.isDestroyed() && O.destroy()
    })), w.webContents.on("did-finish-load", (() => {
        r = !0, a()
    })), w.loadURL(`file://${v.templateUrl}`), setTimeout((() => {
        l = !0, a()
    }), v.delay)
};
exports.initSplashScreen = u;