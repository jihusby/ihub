Ext.define("App.store.Travel", {
    extend: "Ext.data.Store",
    requires: [
        "Ext.data.proxy.LocalStorage"
    ],
    config: {
        model: "App.model.ViewContent",
        autoLoad: true,
        proxy: {
            type: 'localstorage',
            id: 'travel-app-store'
        }
    }

});