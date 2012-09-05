Ext.define("App.store.Hotels", {
    extend: "Ext.data.Store",
    requires: [
        "Ext.data.proxy.LocalStorage"
    ],
    config: {
        model: "App.model.Hotel",
        autoLoad: true,
        proxy: {
            type: 'localstorage',
            id: 'hotels-app-store'
        }
    }

});