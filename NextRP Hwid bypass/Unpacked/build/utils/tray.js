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
    a = e(require("path")),
    u = e(require("./updater")),
    s = e(require("./store")),
    l = e(require("../windows")),
    r = e(require("./isProd"));
let i;

function n(e) {
    const a = l.default.get("main"),
        r = [];
    return r.push({
        enabled: !1,
        label: "NEXTRP v." + t.app.getVersion()
    }), a && (a.isMinimized() || !a.isVisible() ? r.push({
        label: "Развернуть",
        click: () => l.default.controls.show(a)
    }) : r.push({
        label: "Свернуть",
        click: () => l.default.controls.hide(a)
    })), r.length > 0 && r.push({
        type: "separator"
    }), r.push({
        checked: s.default.get("use_beta_updates", !1),
        label: "Получать Бета-версию",
        type: "checkbox",
        click: () => {
            const e = !s.default.get("use_beta_updates", !1);
            s.default.set("use_beta_updates", e)
        }
    }), e.updater.checking ? r.push({
        enabled: !1,
        label: "Поиск обновлений..."
    }) : e.updater.available && e.updater.downloaded && e.updater.update_info ? r.push({
        enabled: !0,
        label: "Установить версию " + e.updater.update_info.version,
        click: () => u.default.quit_and_install()
    }) : e.updater.downloading && e.updater.progress_info && r.push({
        enabled: !1,
        label: `Загрузка обновления: ${e.updater.progress_info.percent.toFixed(0)}%`
    }), r.push({
        type: "separator"
    }), r.push({
        label: "Выйти",
        click: () => t.app.quit()
    }), r
}
const d = () => {
        o() || "win32" === process.platform && c()
    },
    o = () => !!i,
    p = () => {
        o() && f({
            updater: u.default.get_state()
        })
    };

function c() {
    i = new t.Tray(r.default ? a.default.resolve(t.app.getPath("exe"), "../extras/icons/favicon.png") : a.default.resolve(process.cwd(), "./extras/icons/favicon.png")), i.on("click", (() => {
        const e = l.default.get("main");
        if (!e) return t.app.quit();
        l.default.controls.show(e)
    })), f({
        updater: u.default.get_state()
    })
}

function f(e) {
    const a = t.Menu.buildFromTemplate(n(e));
    i.setContextMenu(a)
}
const b = {
    init: d,
    has: o
};
exports.default = b, s.default.subscribe("use_beta_updates", p), u.default.subscribe(p), l.default.subscribe("main", "focus", p), l.default.subscribe("main", "blur", p), l.default.subscribe("main", "show", p), l.default.subscribe("main", "hide", p);