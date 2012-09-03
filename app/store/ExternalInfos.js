Ext.define("App.store.ExternalInfos", {
    extend: "Ext.data.Store",
    requires: [
        'App.model.Info'
    ],
    config: {
        model: "App.model.Info",
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
