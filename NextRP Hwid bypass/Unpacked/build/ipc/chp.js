/* uglified */
"use strict";
var e = this && this.__awaiter || function (e, i, c, n) {
        return new(c || (c = Promise))((function (o, t) {
            function r(e) {
                try {
                    s(n.next(e))
                } catch (e) {
                    t(e)
                }
            }

            function a(e) {
                try {
                    s(n.throw(e))
                } catch (e) {
                    t(e)
                }
            }

            function s(e) {
                var i;
                e.done ? o(e.value) : (i = e.value, i instanceof c ? i : new c((function (e) {
                    e(i)
                }))).then(r, a)
            }
            s((n = n.apply(e, i || [])).next())
        }))
    },
    i = this && this.__importDefault || function (e) {
        return e && e.__esModule ? e : {
            default: e
        }
    };
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.createChpListener = void 0;
const c = require("electron"),
    n = require("../locals"),
    o = require("../utils/ps"),
    t = i(require("util")),
    r = i(require("../utils/regedit")),
    a = i(require("iconv-lite")),
    s = i(require("execa")),
    d = i(require("child_process")),
    l = i(require("path")),
    u = i(require("../utils/logger")),
    f = (i, c) => e(void 0, void 0, void 0, (function* () {
        const e = l.default.resolve(c);
        return o.ps.AddMpPreferenceExclusionProcess(e)
    })),
    p = (i, c) => e(void 0, void 0, void 0, (function* () {
        const e = l.default.resolve(c);
        return o.ps.AddMpPreferenceExclusionPath(e)
    })),
    m = (i, c) => e(void 0, void 0, void 0, (function* () {
        const e = l.default.resolve(c);
        return new Promise((i => {
            u.default.info("chp exec_file", e), d.default.execFile(e).on("close", (e => {
                i("number" == typeof e ? e : 1)
            }))
        })).catch((i => (u.default.error("chp exec_file", e, i.message), 999)))
    })),
    _ = (i, c, n) => e(void 0, void 0, void 0, (function* () {
        return new Promise((e => {
            u.default.info("chp spawn_file", c), d.default.spawn(c, n).on("close", (i => {
                e("number" == typeof i ? i : 1)
            }))
        })).catch((e => (u.default.error("chp spawn_file", c, e.message), 999)))
    })),
    h = (i, c) => e(void 0, void 0, void 0, (function* () {
        const e = l.default.resolve(n.EXTRAS_PATH, "./", c);
        return new Promise((i => {
            u.default.info("chp exec_file_component", e), d.default.execFile(e).on("close", (e => {
                i("number" == typeof e ? e : 1)
            }))
        })).catch((i => (u.default.error("chp exec_file_component", e, i.message), 999)))
    })),
    v = (i, c) => e(void 0, void 0, void 0, (function* () {
        u.default.info("write_vbs_commands", "called");
        const i = c.OS_ARCH_AGNOSTIC || "A",
            n = yield new Promise((n => e(void 0, void 0, void 0, (function* () {
                let e = !1,
                    o = null;
                const a = i => {
                    if (!e) return clearTimeout(o), e = !0, n(i)
                };
                o = setTimeout(a.bind(null, 999), 1e4);
                for (const n of c.keys) {
                    if (e) break;
                    u.default.info("write_vbs_commands", "create", n);
                    const c = t.default.promisify(r.default.createKey);
                    yield c(n, i).catch((e => {
                        u.default.error("write_vbs_commands", "create", n, e.message), a(e.code || 999)
                    }))
                }
                for (const [n, o, s] of c.values) {
                    if (e) break;
                    u.default.info("write_vbs_commands", "value", n, o, s);
                    const c = t.default.promisify(r.default.putValue);
                    yield c({
                        [n]: {
                            [o]: {
                                value: s,
                                type: "REG_SZ"
                            }
                        }
                    }, i).catch((e => {
                        u.default.info("write_vbs_commands", "value", n, o, s, e.message), a(e.code || 999)
                    }))
                }
                e || a(0)
            }))));
        return u.default.info("write_vbs", "processed", n), n
    })),
    w = (i, c) => e(void 0, void 0, void 0, (function* () {
        u.default.info("chp.write_cmd_commands", "called"), u.default.info("chp.write_cmd_commands", c);
        const e = s.default(n.COMSPEC, {
                shell: !0
            }),
            i = yield new Promise((i => {
                let n, o = !1;
                const t = e => {
                        if (!o) return clearTimeout(n), o = !0, i(e)
                    },
                    r = () => {
                        t.bind(null, 999)(), e.kill("SIGKILL")
                    };
                e.stderr && e.stderr.on("data", (e => {
                    r(), u.default.error("chp.write_cmd_commands", a.default.decode(e, "cp866"))
                })), e.on("error", (e => {
                    r(), u.default.error("chp.write_cmd_commands", e && e.message ? e.message : e)
                })), e.once("close", t);
                try {
                    if (e.stdin) {
                        for (const i of c) e.stdin.write(a.default.encode(i, "cp866"));
                        e.stdin.end()
                    }
                    n = setTimeout(r, 1e4)
                } catch (e) {
                    r(), u.default.error("chp.write_cmd_commands", e && e.message ? e.message : e)
                }
            }));
        return u.default.info("chp.write_cmd_commands", "processed", i), i
    })),
    x = () => (c.ipcMain.handle("chp.exec_file", m), c.ipcMain.handle("chp.exec_file_component", h), c.ipcMain.handle("chp.spawn_file", _), c.ipcMain.handle("chp.write_cmd_commands", w), c.ipcMain.handle("chp.write_vbs_commands", v), c.ipcMain.handle("chp.exec_ps_exclusion_process", f), c.ipcMain.handle("chp.exec_ps_exclusion_path", p), u.default.info("chp listeners", "created"), () => {
        c.ipcMain.removeHandler("chp.exec_file"), c.ipcMain.removeHandler("chp.exec_file_component"), c.ipcMain.removeHandler("chp.spawn_file"), c.ipcMain.removeHandler("chp.write_cmd_commands"), c.ipcMain.removeHandler("chp.write_vbs_commands"), c.ipcMain.removeHandler("chp.exec_ps_exclusion_process"), c.ipcMain.removeHandler("chp.exec_ps_exclusion_path"), u.default.info("chp listeners", "removed")
    });
exports.createChpListener = x;