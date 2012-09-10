Ext.define("App.store.Hotel", {
    extend: "Ext.data.Store",
    requires: [
        "Ext.data.proxy.LocalStorage"
    ],
    config: {
        model: "App.model.Hotel",
        autoLoad: true,
        proxy: {
            type: 'localstorage',
            id: 'hotel-app-store'
        }
    }

});