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
const r = e(require("regedit")),
    t = require("path"),
    i = require("../locals"),
    l = e(require("../utils/logger")),
    o = e(require("./isProd")),
    s = o.default ? t.resolve(i.EXTRAS_PATH, "../lib/regedit/vbs") : t.resolve(process.cwd(), "node_modules/regedit/vbs"),
    u = r.default.setExternalVBSLocation(s);
l.default.info("regedit", "external vbs location", u, s), exports.default = r.default;