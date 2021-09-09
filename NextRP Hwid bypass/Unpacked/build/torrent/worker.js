/* uglified */
"use strict";var e=this&&this.__awaiter||function(e,r,t,s){return new(t||(t=Promise))((function(i,o){function n(e){try{d(s.next(e))}catch(e){o(e)}}function a(e){try{d(s.throw(e))}catch(e){o(e)}}function d(e){var r;e.done?i(e.value):(r=e.value,r instanceof t?r:new t((function(e){e(r)}))).then(n,a)}d((s=s.apply(e,r||[])).next())}))},r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.create_worker=void 0;const t=r(require("axios")),s=require("lodash"),i=require("./paths"),o=require("../utils/hReaddir"),n=require("./error"),a=r(require("https")),d=r(require("path")),l=r(require("fs-extra")),u=r(require("./emitter")),_=r(require("./logger"));class c{constructor({query:e,logger:r,preload:t}){this.destroyed=!1,this.instance_id=Math.random().toString(36).substring(7),this.progress_pending=!1,this.subscribers=[],this.done=!1,this.commands=[],this.commands_pending=!1,this.preload=!1,this.query=e,this.logger=r,this.preload=t,this.logger.info("constructor",{instance_id:this.instance_id,destroyed:this.destroyed,done:this.done,preload:this.preload,progress_pending:this.progress_pending,baseURL:this.query.defaults.baseURL}),this.wait_for_alive_promise=this.waiting_for_alive()}push_commands(...e){const r=[];e.forEach((e=>{"resume"!==e.type&&"pause"!==e.type||(this.commands=this.commands.filter((e=>"resume"!==e.type&&"pause"!==e.type)),r.push(e)),"set_params"!==e.type&&"clear_params"!==e.type||(this.commands=this.commands.filter((e=>"set_params"!==e.type&&"clear_params"!==e.type)),r.push(e)),"set_proxy_params"!==e.type&&"clear_proxy_params"!==e.type||(this.commands=this.commands.filter((e=>"set_proxy_params"!==e.type&&"clear_proxy_params"!==e.type)),r.push(e))})),this.commands.push(...r),this.commands.length>0&&!this.commands_pending&&this.create_commands_pending()}is_done(){return this.done}get_instance_id(){return this.instance_id}set_done(e){this.done=e}is_destroyed(){return this.destroyed}cleanup(){this.logger.info("cleanup","called"),this.destroyed=!0,this.subscribers=[],this.stop_query().catch((()=>null))}subscribe(e,r,t){if(this.destroyed)return;this.unsubscribe(r),this.subscribers.push({type:e,key:r,fn:t}),this.logger.info("subscribe",e,r),"progress"!==e||this.progress_pending||this.create_progress_pending();const s=this.unsubscribe.bind(null,r);return()=>{s()}}unsubscribe(e){this.subscribers.some((r=>r.key===e))&&this.logger.info("unsubscribe","called",e),this.subscribers=this.subscribers.filter((r=>r.key!==e))}override_progress(e){this.overrided_progress=e}create_progress_pending(){this.logger.info("create_progress_pending","called"),this.progress_pending=!0,(()=>e(this,void 0,void 0,(function*(){for(yield new Promise((e=>setTimeout(e,4e3)));(yield new Promise((e=>setTimeout(e,1e3))),!this.destroyed)&&(yield this.wait_for_alive_promise)&&this.subscribers.some((e=>"progress"===e.type));){const e=this.overrided_progress?this.overrided_progress:yield this.get_status_query().catch((()=>null));e&&this.subscribers.filter((e=>"progress"===e.type)).forEach((r=>{r.fn(e)}))}})))().catch((()=>null)).then((()=>{this.progress_pending=!1,this.logger.info("create_progress_pending","processed")}))}create_commands_pending(){this.logger.info("create_commands_pending","called"),this.commands_pending=!0,(()=>e(this,void 0,void 0,(function*(){for(;(yield new Promise((e=>setTimeout(e,1e3))),!this.destroyed)&&(yield this.wait_for_alive_promise)&&!(this.commands.length<=0);){const r=this.commands.find((e=>!!e));this.commands=this.commands.filter((e=>e!==r)),r&&(this.logger.info("execute command",r),yield(()=>e(this,void 0,void 0,(function*(){switch(r.type){case"resume":yield this.resume_query();break;case"pause":yield this.pause_query();break;case"clear_params":yield this.clear_params_query();break;case"set_params":yield this.set_params_query(r.data);break;case"clear_proxy_params":yield this.reset_proxy_params_query();break;case"set_proxy_params":yield this.set_proxy_params_query(r.data.host,r.data.port,r.data.user,r.data.password,r.data.type)}})))().catch((e=>{this.logger.error("command execution failed",r,e.message)})))}})))().catch((()=>null)).then((()=>{this.commands_pending=!1,this.logger.info("create_commands_pending","processed")}))}torrent_binary_contents_query(r){return e(this,void 0,void 0,(function*(){return this.logger.info("torrent_binary_contents_query","called",r),new Promise(((e,t)=>{const s=[];a.default.get(r,{rejectUnauthorized:!1},(r=>{r.on("data",(e=>{s.push(e)})),r.on("end",(()=>{const r=Buffer.concat(s);return e(r)})),r.on("error",t)})).on("error",t).end()}))}))}pause_query(){return e(this,void 0,void 0,(function*(){return this.logger.info("pause_query","called"),this.query.post("/jsonrpc",{method:this.preload?"preloader_pause":"pause",jsonrpc:"2.0",id:0}).then((e=>e.data))}))}resume_query(){return e(this,void 0,void 0,(function*(){return this.logger.info("resume_query","called"),this.query.post("/jsonrpc",{method:this.preload?"preloader_resume":"resume",jsonrpc:"2.0",id:0}).then((e=>e.data))}))}download_torrent_query(r,t){return e(this,void 0,void 0,(function*(){const e=[r,t];return this.logger.info("download_torrent_query","called",e),this.query.post("/jsonrpc",{method:this.preload?"preloader_download_torrent":"download_torrent",params:e,jsonrpc:"2.0",id:0},{timeout:6e4}).then((e=>e.data))}))}stop_query(){return e(this,void 0,void 0,(function*(){return this.logger.info("stop_query","called"),this.query.post("/jsonrpc",{method:this.preload?"preloader_stop":"stop",jsonrpc:"2.0",id:0},{timeout:3e3}).then((()=>!0)).catch((()=>!0))}))}set_proxy_params_query(r,t,s,i,o){return e(this,void 0,void 0,(function*(){const e=[r,parseInt(t,10),s,i,o];return this.logger.info("set_proxy_params_query","called",[e[0],e[1],e[2]&&"user[!]",e[3]&&"pass[!]",e[4]]),this.query.post("/jsonrpc",{method:"set_proxy_params",params:e,jsonrpc:"2.0",id:0}).then((e=>e.data))}))}reset_proxy_params_query(){return e(this,void 0,void 0,(function*(){return this.logger.info("reset_proxy_params_query","called"),this.query.post("/jsonrpc",{method:"reset_proxy_params",jsonrpc:"2.0",id:0}).then((e=>e.data))}))}is_alive_query(){return e(this,void 0,void 0,(function*(){return this.logger.info("is_alive_query","called"),this.get_status_query().then((()=>!0)).catch((()=>!1))}))}get_status_query(){return e(this,void 0,void 0,(function*(){return this.query.post("/jsonrpc",{method:this.preload?"preloader_get_status":"get_status",jsonrpc:"2.0",id:0},{timeout:1e4}).then((e=>e.data.result))}))}waiting_for_alive(){return e(this,void 0,void 0,(function*(){if(this.wait_for_alive_promise)return this.logger.info("waiting_for_alive","called","but responsed current alive promise"),this.wait_for_alive_promise;this.logger.info("waiting_for_alive","called");const r=yield(()=>e(this,void 0,void 0,(function*(){let e=3;for(;e>=0;){if(yield new Promise((e=>setTimeout(e,1500))),yield this.is_alive_query())return!0;if(this.destroyed)break;e--}return!1})))();return this.logger.info("waiting_for_alive","processed","is_alive:",r),r}))}clear_params_query(){return e(this,void 0,void 0,(function*(){return this.logger.info("clear_params_query","called"),this.query.post("/jsonrpc",{method:this.preload?"preloader_clear_params":"clear_params",jsonrpc:"2.0",id:0}).then((e=>e.data))}))}set_params_query(r){return e(this,void 0,void 0,(function*(){return this.logger.info("set_params_query","called",r),this.query.post("/jsonrpc",{method:this.preload?"preloader_set_params":"set_params",params:r,jsonrpc:"2.0",id:0}).then((e=>e.data))}))}}function h(r,{game_path:t,torrent_url:a,check_everything:_,preload:c}){return e(this,void 0,void 0,(function*(){const h=r=>e(this,void 0,void 0,(function*(){return l.default.stat(r).then((()=>!0)).catch((()=>!1))})),p=i.get_torrent_basedir(t);if(r.logger.info("torrent_folder_path",p),yield l.default.ensureDir(p),!(yield r.waiting_for_alive())){if(r.is_destroyed())return;throw n.create_error(n.ERROR_NOT_ALIVE,"Child process is not alive")}const f=i.get_info_hash(a),g=yield r.torrent_binary_contents_query(a),m=d.default.resolve(p,`${f}.torrent`),y=c?"done-preload":"done",v=d.default.resolve(p,`${f}.${y}`),b=d.default.resolve(p,`${f}.done-preload`);if(r.logger.info("info_hash",f),r.logger.info("torrent_file_path",m),r.logger.info("torrent_done_file_path",v),yield l.default.writeFile(m,g),r.is_destroyed())return;_&&(yield l.default.unlink(v).catch((()=>null)));const q=yield h(v);if(r.logger.info("is_done",q),r.is_destroyed())return;if(r.set_done(q),u.default.emit("info",{info_hash:f,done:q,preload:c}),r.is_destroyed())return;if(!c){const i=yield h(b);if(r.logger.info("preloaded_client_exists",i),i){const i=()=>e(this,void 0,void 0,(function*(){const i=d.default.resolve(t,"preload");if(!(yield h(i)))return;const n=yield l.default.readdir(i);let a;for(const e of n){const r=d.default.resolve(i,e),t=yield l.default.stat(r).catch((()=>null));t&&t.isDirectory()&&(a=r)}if(!a)return;if(r.is_destroyed())return;const u=yield o.hReaddirCancellable(a,{recursive:!0},r.is_destroyed.bind(r));let _=0;const c=u.length;for(const i of s.chunk(u,4)){if(r.is_destroyed())return;yield Promise.all(i.map((s=>e(this,void 0,void 0,(function*(){const e=d.default.resolve(t,s.rel_path);r.override_progress({download_rate:0,downloaded_size:_,peers:0,progress:_/c,state:"moving_preload",time_left:0,total_size:c,upload_rate:0}),yield l.default.move(s.abs_path,e,{overwrite:!0}).then((()=>{r.logger.info("success_transfer_file",s.abs_path,"to",e)})).catch((t=>{r.logger.info("failed_transfer_file",s.abs_path,"to",e,t.message)})),_++})))))}yield l.default.remove(i),yield l.default.remove(b)}));r.logger.info("preloaded_start_transfer"),yield i().then((()=>r.logger.error("transfer_success"))).catch((e=>r.logger.error("transfer_failed",e.message)))}}if(yield new Promise((e=>setTimeout(e,5e3))),r.override_progress(null),r.is_destroyed())return;if(!(yield r.download_torrent_query(m,t).catch((e=>{if(r.is_destroyed())throw new Error("ignoreplease");throw e}))).result)throw n.create_error(n.ERROR_DOWNLOAD_QUERY_FAILED,"Failed to start download");if(r.is_destroyed())return;const w="s+"+Math.random().toString(36);r.subscribe("progress",w,(e=>{"seeding"===e.state&&e.progress>=1&&(u.default.emit("info",{info_hash:f,done:!0,preload:c}),r.unsubscribe(w),r.set_done(!0),l.default.writeFile(v,Math.floor(Date.now()/1e3).toString()).catch((e=>r.logger.error("write done file failed",v,e.message)))),"downloading"===e.state&&r.is_done()&&(r.set_done(!1),u.default.emit("info",{info_hash:f,done:!1,preload:c}))}))}))}const p=({port:e},{logger:r,preload:s})=>{const i=_.default(r,"worker"),o=`http://localhost:${e}`,n=t.default.create({baseURL:o}),a=new c({query:n,logger:i,preload:s});return u.default.emit("instance",{id:a.get_instance_id()}),{start:e=>h(a,e),cleanup:()=>a.cleanup(),is_destroyed:()=>a.is_destroyed(),unsubscribe:e=>a.unsubscribe(e),subscribe:(e,r,t)=>a.subscribe(e,r,t),push_commands:(...e)=>a.push_commands(...e),is_done:()=>a.is_done()}};exports.create_worker=p;