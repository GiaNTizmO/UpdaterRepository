/* uglified */
"use strict";
var e = this && this.__awaiter || function (e, t, n, E) {
        return new(n || (n = Promise))((function (o, i) {
            function _(e) {
                try {
                    l(E.next(e))
                } catch (e) {
                    i(e)
                }
            }

            function a(e) {
                try {
                    l(E.throw(e))
                } catch (e) {
                    i(e)
                }
            }

            function l(e) {
                var t;
                e.done ? o(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
                    e(t)
                }))).then(_, a)
            }
            l((E = E.apply(e, t || [])).next())
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
const n = t(require("path")),
    E = t(require("child_process")),
    o = require("../locals");
let i;
const _ = (e, t) => ({
        keys: [n.default.join(e, o.REG_GAME_NAME), n.default.join(e, o.REG_GAME_NAME, "Client"), n.default.join(e, o.REG_GAME_NAME, "Client", "Session"), n.default.join(e, o.REG_GAME_NAME, "Game"), n.default.join(e, o.REG_GAME_NAME, "Common"), n.default.join(e, o.REG_GAME_NAME, o.REG_GAME_VERSION), n.default.join(e, o.REG_GAME_NAME, o.REG_GAME_VERSION, "Settings"), n.default.join(e, o.REG_GAME_NAME, o.REG_GAME_VERSION, "Settings", "general")],
        values: [
            [n.default.join(e, o.REG_GAME_NAME, "Client"), "Login", t.username],
            [n.default.join(e, o.REG_GAME_NAME, "Client"), "Remember", "False"],
            [n.default.join(e, o.REG_GAME_NAME, "Client", "Session"), "HWID", t.session_id],
            [n.default.join(e, o.REG_GAME_NAME, "Client", "Session"), "SSID", t.client_id],
            [n.default.join(e, o.REG_GAME_NAME, "Game"), "InstallPath", t.game_path],
            [n.default.join(e, o.REG_GAME_NAME, "Game"), "Mode", "MTA NRP"],
            [n.default.join(e, o.REG_GAME_NAME, o.REG_GAME_VERSION), "PostUpdateConnect", "host=" + t.server_ip + " " + t.server_udp_port1],
            [n.default.join(e, o.REG_GAME_NAME, o.REG_GAME_VERSION), "PostConnect", t.server_ip + ":" + t.server_udp_port1],
            [n.default.join(e, o.REG_GAME_NAME, o.REG_GAME_VERSION, "Settings", "general"), "locale", "ru"],
            [n.default.join(e, o.REG_GAME_NAME, "Common"), "File Cache Path", n.default.join(t.game_path, "mods", "deathmatch")],
            [n.default.join(e, o.REG_GAME_NAME, "Common"), "GTA:SA Path", t.game_path]
        ]
    }),
    a = (e, t) => {
        const E = n.default.join(t.game_path, "mods", "deathmatch"),
            i = n.default.join(e, o.REG_GAME_NAME, "Game"),
            _ = n.default.join(e, o.REG_GAME_NAME, "Client"),
            a = n.default.join(_, "Session"),
            l = n.default.join(e, o.REG_GAME_NAME, "Common"),
            G = n.default.join(e, o.REG_GAME_NAME, o.REG_GAME_VERSION),
            s = n.default.join(G, "Settings", "general");
        return ["@ECHO OFF", "cd /d %SystemRoot%\\System32\\", "SETLOCAL enableextensions", "echo SystemRoot: %SystemRoot%", "echo windir: %windir%", `REG ADD "${i}" /f /ve`, `REG ADD "${i}" /f /v InstallPath /d "${t.game_path}"`, `REG ADD "${i}" /f /v Mode /d "MTA NRP"`, `REG ADD "${a}" /f /ve`, `REG ADD "${_}" /f /v Login /d "${t.username}"`, `REG ADD "${a}" /f /v HWID /d "${t.session_id}"`, `REG ADD "${a}" /f /v SSID /d "${t.client_id}"`, `REG ADD "${l}" /f /ve`, `REG ADD "${l}" /f /v "File Cache Path" /d "${E}"`, `REG ADD "${l}" /f /v "GTA:SA Path" /d "${t.game_path}"`, `REG ADD "${G}" /f /ve`, `REG ADD "${s}" /f /v "locale" /d "ru"`, `REG ADD "${G}" /f /v PostUpdateConnect /d "host=${t.server_ip} ${t.server_udp_port1}"`, `REG ADD "${G}" /f /v PostConnect /d "${t.server_ip}:${t.server_udp_port1}"`, "EXIT"].filter(Boolean).join("\r\n")
    },
    l = t => e(void 0, void 0, void 0, (function* () {
        const e = n.default.join(t, o.GAME_CLIENT_EXEC);
        return new Promise((t => {
            i && !i.killed && i.kill(), i = E.default.execFile(e), i.once("close", (e => {
                i = null, t(e || 0)
            })), i.unref && i.unref()
        }))
    })),
    G = (e, t) => new Promise((n => {
        i && !i.killed && i.kill(), i = E.default.spawn(o.GAME_CLIENT_EXEC, Object.assign({
            cwd: e
        }, t || {})), i.once("close", (e => {
            i = null, n(e || 0)
        })), i.unref && i.unref()
    })),
    s = () => {
        i && (i.killed || i.kill(), i = null)
    },
    d = () => !!i,
    A = {
        create_cmd_commands: a,
        create_vbs_commands: _,
        exec: l,
        spawn: G,
        close: s,
        execution: d
    };
exports.default = A;