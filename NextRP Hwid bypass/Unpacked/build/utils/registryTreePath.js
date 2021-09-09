/* uglified */
"use strict";
var e = this && this.__awaiter || function (e, t, r, i) {
        return new(r || (r = Promise))((function (a, n) {
            function o(e) {
                try {
                    c(i.next(e))
                } catch (e) {
                    n(e)
                }
            }

            function u(e) {
                try {
                    c(i.throw(e))
                } catch (e) {
                    n(e)
                }
            }

            function c(e) {
                var t;
                e.done ? a(e.value) : (t = e.value, t instanceof r ? t : new r((function (e) {
                    e(t)
                }))).then(o, u)
            }
            c((i = i.apply(e, t || [])).next())
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
const r = t(require("execa")),
    i = t(require("os")),
    a = t(require("child_process")),
    n = t(require("./logger")),
    o = require("path"),
    u = require("../locals");
let c;
const s = () => e(void 0, void 0, void 0, (function* () {
    n.default.info("registryTreePath", "called");
    const t = yield e(void 0, void 0, void 0, (function* () {
        if (c) return c;
        try {
            return n.default.info("registryTreePath", "wmic"), /64/g.test((yield r.default("wmic OS get OSArchitecture")).stdout.toString()) ? u.REG_TREE_X64 : u.REG_TREE_X86
        } catch (e) {
            n.default.error("registryTreePath", "wmic", e.message)
        }
        try {
            return n.default.info("registryTreePath", "bat"), /64/g.test((yield r.default(o.resolve(u.EXTRAS_PATH, "OSArchitecture.bat"))).stdout.toString()) ? u.REG_TREE_X64 : u.REG_TREE_X86
        } catch (e) {
            n.default.error("registryTreePath", "bat", e)
        }
        try {
            return n.default.info("registryTreePath", "bat sync"), /64/g.test(a.default.execFileSync(o.resolve(u.EXTRAS_PATH, "OSArchitecture.bat")).toString()) ? u.REG_TREE_X64 : u.REG_TREE_X86
        } catch (e) {
            n.default.error("registryTreePath", "bat sync", e)
        }
        return /64/g.test(i.default.arch()) ? u.REG_TREE_X64 : u.REG_TREE_X86
    }));
    return n.default.info("registryTreePath", c ? "processed (cache)" : "processed", t), c = t, t
}));
exports.default = s;