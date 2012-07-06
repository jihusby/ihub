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
                    var myDays=
                    ["Søndag", "Mandag","Tirsdag","Onsdag","Torsdag","Fredag","Lørdag"];
                    var d = record.data.start.substring(0,2);
                    var m = record.data.start.substring(3,5);
                    var y = record.data.start.substring(6,10);
                    var date = new Date(Date.parse(m+"/"+d+"/"+y,"MM/dd/yyyy"));
                    return myDays[date.getDay()] + " " + record.data.start;
                } else {
                    return '';
                }
            }
        }
    }

});
