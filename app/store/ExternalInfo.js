Ext.define("App.store.ExternalInfo", {
    extend: "Ext.data.Store",
    requires: [
        'App.model.ViewContent'
    ],
    config: {
        model: "App.model.ViewContent",
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

