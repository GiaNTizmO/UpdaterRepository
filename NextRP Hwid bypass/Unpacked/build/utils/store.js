/* uglified */
"use strict";
var e = this && this.__importDefault || function (e) {
    return e && e.__esModule ? e : {
        default: e
    }
};
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.configureStore = void 0;
const t = require("uuid"),
    r = require("lodash"),
    s = e(require("path")),
    o = e(require("fs-extra")),
    a = require("electron-store"),
    n = e(require("../windows"));
let u = [];
const i = (e, t) => {
        const r = n.default.get("main");
        r && r.webContents.send("store", {
            key: e,
            value: t
        })
    },
    c = (e, t) => {
        const r = Math.random().toString(36);
        return u.push({
            key: e,
            id: r,
            fn: t
        }), () => {
            u = u.filter((e => e.fn !== t))
        }
    },
    p = new a({}),
    d = () => {
        try {
            const e = s.default.resolve(process.cwd(), "bundle-version.dat"),
                t = o.default.readFileSync(e).toString().match(/^.+?-(yt|d|a|ad|vk)\.exe$/i);
            if (t && t[1]) return t[1] || ""
        } catch (e) {}
        return ""
    },
    _ = () => {
        try {
            const e = s.default.resolve(process.cwd(), "ni.dat");
            return o.default.statSync(e), !0
        } catch (e) {}
        return !1
    },
    l = () => {
        const e = {
            ps: "",
            pi: "",
            pc: ""
        };
        try {
            const t = s.default.resolve(process.cwd(), "parameters.dat"),
                a = o.default.readFileSync(t).toString().split("\n");
            for (const t of a) {
                const [s, ...o] = t.split(":"), a = r.trim(o.join(":"));
                a && (e[s] = a)
            }
            return e
        } catch (e) {}
        return e
    },
    g = () => {
        if (p.get("check_sv")) return;
        p.set("game_path", p.get("gamePath", "")), p.set("is_first_download", !!p.get("isFirstDownload", !0)), p.set("is_first_login", !!p.get("isFirstLogin", !0)), p.set("is_secondary_account", !!p.get("launcherId", !1)), p.set("last_server_id", p.get("lastServerId", 0)), p.set("launcher_id", p.get("launcherId", t.v4())), p.set("launcher_install_date", p.get("launcherInstallDate", Math.floor(Date.now() / 1e3))), p.set("user_refresh_token", p.get("userRefreshToken", "")), p.set("launch_counter", p.get("launchCounter", 0)), p.set("use_beta_updates", !!p.get("useBetaUpdates", !1)), p.set("use_noty", !!p.get("useNoty", !0)), p.set("use_seed", !!p.get("useSeed", !0)), p.set("proxy_server_id", p.get("proxyServerId", 0)), p.set("proxy_type", p.get("proxy_type", 0)), p.set("proxy_host", p.get("proxy_host", "")), p.set("proxy_port", p.get("proxy_port", "")), p.set("proxy_user", p.get("proxy_user", "")), p.set("proxy_password", p.get("proxy_password", ""));
        const e = l(),
            r = d();
        p.set("bundle_version", p.get("bundleVersion", r || "")), p.set("param_ps", p.get("param_ps", e.ps || "")), p.set("param_pi", p.get("param_pi", e.pi || "")), p.set("param_pc", p.get("param_pc", e.pc || "")), p.set("param_ni", p.get("param_ni", _())), p.set("check_sv", !0)
    };
exports.configureStore = g;
const f = {
    all: () => Object.assign({}, p.store),
    has: e => p.has(e),
    get: (e, t) => p.get(e, t),
    set: (e, t) => {
        p.get(e) !== t && (p.set(e, t), i(e, t), u.forEach((r => {
            r.key === e && void 0 !== t && r.fn(t)
        })))
    },
    subscribe: c
};
exports.default = f;