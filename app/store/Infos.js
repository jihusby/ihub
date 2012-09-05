Ext.define("App.store.Infos", {
    extend: "Ext.data.Store",
    requires: [
        "Ext.data.proxy.LocalStorage"
    ],
    config: {
        model: "App.model.Info",
        autoLoad: true,
        proxy: {
            type: 'localstorage',
            id: 'infos-app-store'
        }
    }

});
