/* uglified */
"use strict";
var e = this && this.__importDefault || function (e) {
    return e && e.__esModule ? e : {
        default: e
    }
};
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.DAEMON_PATH = exports.EXTRAS_PATH = exports.COMSPEC = exports.REG_TREE_X86 = exports.REG_TREE_X64 = exports.REG_GAME_VERSION = exports.REG_GAME_NAME = exports.GAME_CLIENT_EXEC = exports.GAME_PROCESS_NAMES = exports.DISCORD_REDIRECT_DOMAIN = exports.DISCORD_CLIENT_ID = exports.VK_REDIRECT_DOMAIN = exports.VK_CLIENT_ID = exports.TORRENT_TOKEN = void 0;
const t = require("electron"),
    r = require("path"),
    o = e(require("./utils/isProd"));
exports.TORRENT_TOKEN = "Vpo4IMrqLPrK71WUHx2XSDHjj9U2XJsHH98aXZhCyJsGp7PycchUiQiCPdtA200MAdBN2",
exports.VK_CLIENT_ID = "7605890",
exports.VK_REDIRECT_DOMAIN = "nextrp.ru",
exports.DISCORD_CLIENT_ID = "753202754347859999",
exports.DISCORD_REDIRECT_DOMAIN = "nextrp.ru",
exports.GAME_PROCESS_NAMES = ["proxy_sa.exe", "gta_sa.exe", "Multi Theft Auto.exe"],
exports.GAME_CLIENT_EXEC = "Multi Theft Auto.exe",
exports.REG_GAME_NAME = "MTA NRP",
exports.REG_GAME_VERSION = "1.5",
exports.REG_TREE_X64 = r.join("HKLM", "software", "WOW6432Node"),
exports.REG_TREE_X86 = r.join("HKLM", "software"),
exports.COMSPEC = (process.env.ComSpec ? process.env.ComSpec : process.env.SystemRoot && r.join(process.env.SystemRoot, "system32", "cmd.exe")) || "cmd",
exports.EXTRAS_PATH = o.default ? r.resolve(t.app.getPath("exe"), "../extras") : r.resolve(process.cwd(), "./extras"),
exports.DAEMON_PATH = r.resolve(exports.EXTRAS_PATH, "./lt", "nextrp-daemon-x32.exe");