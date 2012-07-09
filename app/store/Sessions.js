Ext.define("App.store.Sessions", {
    extend: "Ext.data.Store",
    requires: [
        'App.model.Session'
    ],
    config: {
        model: "App.model.Session",
        proxy: {
            type: 'ajax',
            url: 'resources/data/data.json',
            reader: {
                type: 'json',
                rootProperty: 'day1'
            }
        },
        sorters: [
            {property: 'start', direction: 'ASC'},
            {property: 'startTime', direction: 'ASC'}
    ],

        grouper: {
            sortProperty: [
                "start", "startTime"
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
