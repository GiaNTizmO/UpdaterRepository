/* uglified */
"use strict";var e=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.get_info_hash=exports.get_torrent_basedir=void 0;const t=e(require("path")),r=require("url"),o=e=>t.default.resolve(e,"redist/torrents");exports.get_torrent_basedir=o;const s=e=>{const o=new r.URL(e);return t.default.basename(o.pathname).toLowerCase().replace(".torrent","")};exports.get_info_hash=s;