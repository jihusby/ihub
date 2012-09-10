Ext.define("App.store.Info", {
    extend: "Ext.data.Store",
    requires: [
        "Ext.data.proxy.LocalStorage"
    ],
    config: {
        model: "App.model.Info",
        autoLoad: true,
        proxy: {
            type: 'localstorage',
            id: 'info-app-store'
        }
    }

});
