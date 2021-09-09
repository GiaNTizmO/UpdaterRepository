/* uglified */
"use strict";
var e = this && this.__createBinding || (Object.create ? function (e, t, r, l) {
        void 0 === l && (l = r), Object.defineProperty(e, l, {
            enumerable: !0,
            get: function () {
                return t[r]
            }
        })
    } : function (e, t, r, l) {
        void 0 === l && (l = r), e[l] = t[r]
    }),
    t = this && this.__setModuleDefault || (Object.create ? function (e, t) {
        Object.defineProperty(e, "default", {
            enumerable: !0,
            value: t
        })
    } : function (e, t) {
        e.default = t
    }),
    r = this && this.__importStar || function (r) {
        if (r && r.__esModule) return r;
        var l = {};
        if (null != r)
            for (var i in r) "default" !== i && Object.prototype.hasOwnProperty.call(r, i) && e(l, r, i);
        return t(l, r), l
    },
    l = this && this.__importDefault || function (e) {
        return e && e.__esModule ? e : {
            default: e
        }
    };
Object.defineProperty(exports, "__esModule", {
    value: !0
});
const i = r(require("electron-log")),
    o = l(require("path")),
    n = l(require("./isProd")),
    u = i;
u.transports.file.fileName = "launcher.log", u.transports.file.level = n.default ? "info" : "silly", u.transports.console.level = !n.default && "silly", u.transports.file.resolvePath = e => o.default.resolve(process.cwd(), e.fileName), exports.default = u;