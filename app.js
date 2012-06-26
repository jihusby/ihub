Ext.application({
    name: 'App',

    requires: [
        'Ext.MessageBox'
    ],

    views: [
        'Main',
        'Homepage',
        'Info',
        'Sections',
        'Detail',
        'EventList',
        'EventListContainer',
        'EventEditor'
    ],
    
    models: [
        'Sections',
        'Event'
    ],
    
    stores: [
        'Sections',
        'Events'
    ],
    
    controllers: [
        'Main'
    ],

    icon: {
        57: 'resources/icons/Icon.png',
        72: 'resources/icons/Icon~ipad.png',
        114: 'resources/icons/Icon@2x.png',
        144: 'resources/icons/Icon~ipad@2x.png'
    },

    phoneStartupScreen: 'resources/loading/Homescreen.jpg',
    tabletStartupScreen: 'resources/loading/Homescreen~ipad.jpg',

    launch: function() {
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();

        var eventEditor = {
            xtype: "eventeditor"
        };

        // Initialize the main view
        Ext.Viewport.add(Ext.create('App.view.Main'), eventEditor);
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
