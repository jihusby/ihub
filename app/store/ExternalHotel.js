Ext.define("App.store.ExternalHotel", {
    extend: "Ext.data.Store",
    requires: [
        'App.model.ViewContent'
    ],
    config: {
        model: "App.model.ViewContent",
        autoLoad: true,
        proxy: {
            type: 'ajax',
            url: 'resources/data/hotel.json',
            reader: {
                type: 'json',
                rootProperty: 'items'
            }
        }
    }

});


