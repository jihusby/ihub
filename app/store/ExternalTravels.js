Ext.define("App.store.ExternalTravels", {
    extend: "Ext.data.Store",
    requires: [
        'App.model.Travel'
    ],
    config: {
        model: "App.model.Travel",
        autoLoad: true,
        proxy: {
            type: 'ajax',
            url: 'resources/data/travel.json',
            reader: {
                type: 'json',
                rootProperty: 'items'
            }
        },
        listeners: {
            load: function(){
                saveContentFromExternal("Travels", "ExternalTravels");
            }
        }
    }

});
