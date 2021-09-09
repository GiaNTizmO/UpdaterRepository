/* uglified */
"use strict";
var e = this && this.__awaiter || function (e, a, i, p) {
        return new(i || (i = Promise))((function (n, t) {
            function r(e) {
                try {
                    d(p.next(e))
                } catch (e) {
                    t(e)
                }
            }

            function c(e) {
                try {
                    d(p.throw(e))
                } catch (e) {
                    t(e)
                }
            }

            function d(e) {
                var a;
                e.done ? n(e.value) : (a = e.value, a instanceof i ? a : new i((function (e) {
                    e(a)
                }))).then(r, c)
            }
            d((p = p.apply(e, a || [])).next())
        }))
    },
    a = this && this.__importDefault || function (e) {
        return e && e.__esModule ? e : {
            default: e
        }
    };
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.createAppListener = void 0;
const i = require("electron"),
    p = a(require("../utils/registryTreePath")),
    n = a(require("../utils/hwid")),
    t = a(require("../utils/updater")),
    r = a(require("../utils/logger")),
    c = () => i.app.quit(),
    d = () => t.default.quit_and_install(),
    u = () => t.default.check_for_updates(),
    l = () => e(void 0, void 0, void 0, (function* () {
        return p.default()
    })),
    o = () => n.default(),
    s = () => i.app.getVersion(),
    _ = () => i.app.getAppMetrics(),
    h = (e, a) => i.app.relaunch(a),
    f = (e, a) => i.app.setBadgeCount(a),
    M = e => i.app.getBadgeCount(),
    v = () => (i.ipcMain.handle("app.quit", c), i.ipcMain.handle("app.quit_and_install", d), i.ipcMain.handle("app.check_for_updates", u), i.ipcMain.handle("app.registry_tree_path", l), i.ipcMain.handle("app.hwid", o), i.ipcMain.handle("app.version", s), i.ipcMain.handle("app.metrics", _), i.ipcMain.handle("app.relaunch", h), i.ipcMain.handle("app.set_badge_count", f), i.ipcMain.handle("app.get_badge_count", M), r.default.info("app listeners", "created"), () => {
        i.ipcMain.removeHandler("app.quit"), i.ipcMain.removeHandler("app.quit_and_install"), i.ipcMain.removeHandler("app.check_for_updates"), i.ipcMain.removeHandler("app.registry_tree_path"), i.ipcMain.removeHandler("app.hwid"), i.ipcMain.removeHandler("app.version"), i.ipcMain.removeHandler("app.metrics"), i.ipcMain.removeHandler("app.relaunch"), i.ipcMain.removeHandler("app.set_badge_count"), i.ipcMain.removeHandler("app.get_badge_count"), r.default.info("app listeners", "removed")
    });
exports.createAppListener = v;