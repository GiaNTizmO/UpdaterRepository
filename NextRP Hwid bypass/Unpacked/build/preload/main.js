/* uglified */
const {
    contextBridge: e,
    ipcRenderer: n
} = require("electron");
e.exposeInMainWorld("api", {
    subscribe: (e, s) => {
        const i = (e, ...n) => s(...n);
        return n.on(e, i), () => {
            n.off(e, i)
        }
    },
    is_launcher: () => !0,
    store: {
        get: async (e, s) => n.invoke("store.get", e, s),
        set: async (e, s) => n.invoke("store.set", e, s),
        all: async () => n.invoke("store.all"),
        has: async e => n.invoke("store.has", e)
    },
    fs: {
        mkdir: async e => n.invoke("fs.mkdir", e),
        mkdirp: async e => n.invoke("fs.mkdirp", e),
        readdir: async e => n.invoke("fs.readdir", e),
        readdirp: async e => n.invoke("fs.readdirp", e),
        drives: async () => n.invoke("fs.drives"),
        free_space: async e => n.invoke("fs.free_space", e),
        remove: async e => n.invoke("fs.remove", e),
        is_writable: async e => n.invoke("fs.is_writable", e),
        is_empty: async e => n.invoke("fs.is_empty", e),
        is_exists: async e => n.invoke("fs.is_exists", e),
        is_directory: async e => n.invoke("fs.is_directory", e),
        copy_file: async (e, s) => n.invoke("fs.copy_file", e, s),
        write_file: async (e, s) => n.invoke("fs.write_file", e, s)
    },
    dialog: {
        select_directory: async e => n.invoke("dialog.select_directory", e),
        select_file: async e => n.invoke("dialog.select_file", e),
        show_error_box: async (e, s) => n.invoke("dialog.show_error_box", e, s)
    },
    app: {
        quit: async () => n.invoke("app.quit"),
        quit_and_install: async () => n.invoke("app.quit_and_install"),
        check_for_updates: async () => n.invoke("app.check_for_updates"),
        registry_tree_path: async () => n.invoke("app.registry_tree_path"),
        hwid: async () => {
            let e;
            return e || (e = await n.invoke("app.hwid")), Promise.resolve(e)
        },
        version: async () => n.invoke("app.version"),
        metrics: async () => n.invoke("app.metrics"),
        relaunch: async e => n.invoke("app.relaunch", e),
        set_badge_count: async e => n.invoke("app.set_badge_count", e),
        get_badge_count: async () => n.invoke("app.get_badge_count")
    },
    window: {
        show: async () => n.invoke("window.show"),
        focus: async () => n.invoke("window.focus"),
        hide: async () => n.invoke("window.hide"),
        minimize: async () => n.invoke("window.minimize"),
        maximize: async () => n.invoke("window.maximize"),
        resize: async (e, s, i = !1) => n.invoke("window.resize", e, s, i),
        set_overlay_icon: async (e, s) => n.invoke("window.set_overlay_icon", e, s)
    },
    shell: {
        beep: async () => n.invoke("shell.beep"),
        open_external: async e => n.invoke("shell.open_external", e)
    },
    torrent: {
        start: e => n.send("torrent.start", e),
        stop: () => n.send("torrent.stop"),
        quiet: e => n.send("torrent.quiet", e),
        paused: e => n.send("torrent.paused", e),
        proxied: (e, s) => n.send("torrent.proxied", e, s),
        subscribe: e => {
            const s = Math.random().toString(36);
            return n.send("torrent.subscribe", e, s), () => {
                n.send("torrent.unsubscribe", s)
            }
        }
    },
    auth: {
        vk: async () => n.invoke("auth.vk"),
        telegram: async () => n.invoke("auth.telegram"),
        discord: async () => n.invoke("auth.discord")
    },
    crypto: {
        decrypt_aes: async (e, s) => n.invoke("crypto.decrypt_aes", e, s)
    },
    chp: {
        write_cmd_commands: async e => n.invoke("chp.write_cmd_commands", e),
        write_vbs_commands: async e => n.invoke("chp.write_vbs_commands", e),
        exec_file: async e => n.invoke("chp.exec_file", e),
        exec_file_component: async e => n.invoke("chp.exec_file_component", e),
        spawn_file: async (e, s) => n.invoke("chp.spawn_file", e, s),
        exec_ps_exclusion_process: async (...e) => n.invoke("chp.exec_ps_exclusion_process", ...e),
        exec_ps_exclusion_path: async (...e) => n.invoke("chp.exec_ps_exclusion_path", ...e)
    },
    notification: {
        show: e => n.invoke("notification.show", e)
    },
    mta: {
        close: () => n.invoke("mta.close"),
        exec: e => n.invoke("mta.exec", e),
        spawn: (e, s) => n.invoke("mta.spawn", e, s),
        create_cmd_commands: async (e, s) => n.invoke("mta.create_cmd_commands", e, s),
        create_vbs_commands: async (e, s) => n.invoke("mta.create_vbs_commands", e, s)
    },
    mta_launch: async e => n.invoke("mta_launch", e),
    mta_kill: async () => n.invoke("mta_kill")
});