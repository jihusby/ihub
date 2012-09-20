Ext.define("App.view.SponsorListContainer", {
    extend: 'Ext.navigation.View',
    xtype: 'sponsorlistcontainer',

    requires: [
        'App.view.SponsorList',
        'Ext.TitleBar'
    ],
    
    config: {
        items: [{
                xtype: 'sponsorlist'
        }],
        listeners: {
            painted: function(){
                this.fireEvent('paintedEvent');
            }
        }
    }
});
