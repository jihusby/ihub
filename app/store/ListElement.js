Ext.define("App.store.ListElement", {
    extend: "Ext.data.Store",
    requires: [
        "Ext.data.proxy.LocalStorage"
    ],
    config: {
        model: "App.model.ListElement",
        autoLoad: true,
        proxy: {
            type: 'localstorage',
            id: 'listelement-app-store'
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
                if (record && record.data.start && record.data.start!=null) {
                    return getDateWithWeekdayFromDateString(record.data.start);
                } else {
                    return '';
                }
            }
        }
    }

});