/* uglified */
"use strict";

function e(e) {
    e && e.minimize()
}

function i(e) {
    e && e.maximize()
}

function o(e) {
    e && e.show()
}

function n(e) {
    e && e.hide()
}

function s(e) {
    e && e.focus()
}
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.controls = void 0;
const t = (e, i, o, n = !1) => {
    e.resizable = !0;
    const s = 1e3 === i && 720 === o;
    s ? e.setMinimumSize(i, o) : e.setMinimumSize(250, 450), e.setSize(i, o, n), e.center(), e.resizable = s
};
exports.controls = {
    minimize: e,
    show: o,
    hide: n,
    focus: s,
    resize: t,
    maximize: i
};