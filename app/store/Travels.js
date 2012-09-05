Ext.define("App.store.Travels", {
    extend: "Ext.data.Store",
    requires: [
        "Ext.data.proxy.LocalStorage"
    ],
    config: {
        model: "App.model.Travel",
        autoLoad: true,
        proxy: {
            type: 'localstorage',
            id: 'travels-app-store'
        }
    }

});