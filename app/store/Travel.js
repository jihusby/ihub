Ext.define("App.store.Travel", {
    extend: "Ext.data.Store",
    requires: [
        "Ext.data.proxy.LocalStorage"
    ],
    config: {
        model: "App.model.Travel",
        autoLoad: true,
        proxy: {
            type: 'localstorage',
            id: 'travel-app-store'
        }
    }

});