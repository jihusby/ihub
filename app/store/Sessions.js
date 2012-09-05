Ext.define("App.store.Sessions", {
    extend: "Ext.data.Store",
    requires: [
        'App.model.Session'
    ],
    config: {
        model: "App.model.Session",
        autoLoad: true,
        proxy: {
            type: 'ajax',
            url: 'resources/data/agenda.json',
            reader: {
                type: 'json',
                rootProperty: 'items'
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
