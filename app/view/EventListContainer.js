Ext.define("App.view.EventListContainer", {
    extend: 'Ext.navigation.View',
    xtype: 'eventlistcontainer',

    requires: [
        'App.view.EventList',
        'Ext.TitleBar'
    ],
    
    config: {
        items: [{
                xtype: 'eventlist'
        }]
    }
});
