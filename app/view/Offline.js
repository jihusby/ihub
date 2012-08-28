Ext.define("App.view.Offline", {
    extend: 'Ext.navigation.View',
    xtype: 'info',
    requires: [
        'Ext.TitleBar'
    ],

    config: {
        scrollable: true,
        items: [
            {
                title: 'XP2010',
                maxWidth: 750,
                xtype: 'dataview',
                //ui: 'light',
                itemTpl: [
                    '<div class="textBlock">',
                    '<div class="header">Appen er offline</div></div>'
                ]
        }]
    }
    
});
