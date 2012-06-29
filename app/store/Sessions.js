Ext.define("App.store.Sessions", {
    extend: "Ext.data.Store",
    requires: "Ext.data.proxy.LocalStorage",
    config: {
        model: "App.model.Session",
        proxy: {
            type: 'ajax',
            url: 'resources/data/data.json',
            reader: {
                type: 'json',
                rootProperty: 'items'
            }
        },
        sorters: [
            {property: 'timestamp', direction: 'ASC'}
    ],

        grouper: {
            sortProperty: "timestamp",
                
            direction: "ASC",

            groupFn: function (record) {
                if (record && record.data.start && record.data.start!=null) {
                    return record.data.start;
                } else {
                    return '';
                }
            }
        }
    }

});