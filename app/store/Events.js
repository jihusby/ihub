Ext.define("App.store.Events", {
    extend: "Ext.data.Store",
    requires: [
        "Ext.data.proxy.LocalStorage"
    ],
    config: {
        model: "App.model.Event",
        proxy: {
            type: 'localstorage',
            id: 'events-app-store'
        },
        sorters: [
            {property: 'timestamp', direction: 'ASC'}
    ],

        grouper: {
            sortProperty: [
                "timestamp"
            ],
                
            direction: "ASC",

            groupFn: function (record) {
                if (record && record.data.startTime && record.data.startTime!=null) {
                    return record.data.startTime;
                } else {
                    return '';
                }
            }
        }
    }

});