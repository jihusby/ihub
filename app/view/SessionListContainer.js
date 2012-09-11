Ext.define("App.view.SessionListContainer", {
    extend: 'Ext.navigation.View',
    xtype: 'sessionlistcontainer',

    requires: [
        'App.view.SessionList',
        'App.view.SessionDetail',
        'Ext.TitleBar'
    ],
    
    config: {
        items: [{
                xtype: 'sessionlist'
        }],
        listeners: {
            painted: function(){
                this.fireEvent('paintedEvent');
            }
        }
    }
});
