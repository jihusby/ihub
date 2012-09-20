Ext.application({
    name: 'App',

    views: [
        'Main',
        'Hotel',
        'Info',
        'Travel',
        'SessionListContainer',
        'SessionList',
        'SessionDetail',
        'EventListContainer',
        'EventList',
        'SponsorListContainer',
        'SponsorList',
        
    ],
    
    models: [
        'ViewContent',
        'ListElement',
        'LinkElement'
    ],
    
    stores: [
        'Hotel',
        'ExternalHotel',
        'Info',
        'ExternalInfo',
        'Travel',
        'ExternalTravel',
        'Sessions.Session',
        'Sessions.ExternalSession',
        'Sessions.AttendingSession',
        'Sponsors.ExternalSponsor',
        'Sponsors.Sponsor',
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

