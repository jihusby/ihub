Ext.define("App.store.Links.ExternalLink", {
    extend: "Ext.data.Store",
    requires: [
        'App.model.LinkElement'
    ],
    config: {
        model: "App.model.LinkElement",
        autoLoad: true,
        proxy: {
            type: 'ajax',
            url: 'resources/data/links.json',
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
