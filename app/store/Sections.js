Ext.define('App.store.Sections', {
    extend: 'Ext.data.TreeStore',
    
    requires: [
        'App.model.Sections'
    ],
    
    config: {
        autoLoad: true,
        
        model: 'App.model.Sections',
        
        proxy: {
            type: 'ajax',
            url: 'resources/data/data.json',
            reader: {
                type: 'json',
                rootProperty: 'items'
            }
        },
        sorters: [
            { property: 'timestamp', direction: 'ASC'}
        ],

        grouper: {
            sortProperty: "timestamp",
            direction: "ASC",

            groupFn: function (record) {
                if (record && record.data.start && record.data.start!=null) {
                    var theDate = new Date(record.data.timestamp*1);
                    return theDate.getDate() + "." + theDate.getMonth() + "." + theDate.getFullYear();
                } else {
                    return '';
                }
            }
        }
        
    }
});