Ext.application({
    name: 'App',

    views: [
        'Main',
        'Homepage',
        'Info',
        'Travel',
        'SessionListContainer',
        'SessionList',
        'SessionDetail',
        'EventListContainer',
        'EventList',
    ],
    
    models: [
        'Info',
        'Session',
        'Event'
    ],
    
    stores: [
        'ExternalInfos',
        'Infos',
        'Sessions',
        'Events'
    ],
    
    controllers: [
        'Main'
    ],

    icon: {
        57: 'resources/loading/Default.png',
        72: 'resources/loading/Default.png',
        114: 'resources/loading/Default.png',
        144: 'resources/loading/Default.png'
    },

    phoneStartupScreen: 'resources/loading/Default.png',
    tabletStartupScreen: 'resources/loading/Default.png',

    launch: function() {
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();

        // Initialize the main view
        Ext.Viewport.add(Ext.create('App.view.Main'));
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
