Ext.application({
    name: 'App',

    requires: [
        'Ext.MessageBox'
    ],

    views: [
        'Main',
        'Homepage',
        'Info',
        'SessionListContainer',
        'SessionList',
        'SessionDetail',
        'EventListContainer',
        'EventList',
        'EventEditor'
    ],
    
    models: [
        'Session',
        'Event'
    ],
    
    stores: [
        'Sessions',
        'Events'
    ],
    
    controllers: [
        'Main'
    ],

    icon: {
        57: 'resources/icons/Icon.png',
        72: 'resources/icons/Icon~ipad.png',
        114: 'resources/icons/Icon@2x.png',
        144: 'resources/icons/Icon-spot~ipad@2x.png'
    },

    phoneStartupScreen: 'resources/loading/Default.png',
    tabletStartupScreen: 'resources/loading/Default~ipad.png',

    launch: function() {
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();

        var event = {
            xtype: "eventeditor"
        };
        
        var session = {
            xtype: "sessiondetail"
        };

        // Initialize the main view
        Ext.Viewport.add(Ext.create('App.view.Main'), event, session);

        
    },

    onUpdated: function() {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function(buttonId) {
                if (buttonId === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
