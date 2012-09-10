Ext.define("App.store.ExternalHotel", {
    extend: "Ext.data.Store",
    requires: [
        'App.model.Hotel'
    ],
    config: {
        model: "App.model.Hotel",
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


