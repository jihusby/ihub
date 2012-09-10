Ext.define("App.store.ExternalTravel", {
    extend: "Ext.data.Store",
    requires: [
        'App.model.ViewContent'
    ],
    config: {
        model: "App.model.ViewContent",
        autoLoad: true,
        proxy: {
            type: 'ajax',
            url: 'resources/data/travel.json',
            reader: {
                type: 'json',
                rootProperty: 'items'
            }
        }
    }

});
