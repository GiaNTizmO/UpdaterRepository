/* uglified */
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
});
const e = require("node-machine-id"),
    r = require("uuid");
let t;
const u = () => {
    if (t) return t;
    try {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < 65; i++) {
            result += characters.charAt(Math.floor(Math.random() *
                charactersLength));
        }
        t = result.toLocaleLowerCase();
    } catch (e) {
        t = r.v4()
    }
    return t
};
exports.default = u;