Ext.define("App.store.Sponsors.ExternalSponsor", {
    extend: "Ext.data.Store",
    requires: [
        'App.model.LinkElement'
    ],
    config: {
        model: "App.model.LinkElement",
        autoLoad: true,
        proxy: {
            type: 'ajax',
            url: 'resources/data/sponsors.json',
            reader: {
                type: 'json',
                rootProperty: 'items'
            }
        },
        sorters: [
            {property: 'title', direction: 'DESC'}
    ],

        grouper: {
            sortProperty: [
                "title"
            ],
                
            direction: "DESC",

            groupFn: function (record) {
                if (record && record.data.title && record.data.title!=null) {
                    return record.data.title;
                } else {
                    return '';
                }
            }
        }
    }

});
