Ext.define("App.store.ExternalInfo", {
    extend: "Ext.data.Store",
    requires: [
        'App.model.Info'
    ],
    config: {
        model: "App.model.Info",
        autoLoad: true,
        proxy: {
            type: 'ajax',
            url: 'resources/data/info.json',
            reader: {
                type: 'json',
                rootProperty: 'items'
            }
        }
    }

});


