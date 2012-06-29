/*
app = new Ext.Application({ 
    name: "Application", 

    launch: function() { 

    this.detailView = new Ext.Panel({ 
        id: 'detailView', 
        layout: { 
                flex: 1, 
                type: 'fit'
        }, 
        tpl: '{field1} {field2}' 
    }); 

    this.listView = new Ext.List({ 
        id: 'listView', 
        store: dataStore, 
        itemTpl: '{field1}', 
        grouped: true, 
        onItemDisclosure: function(record) {     
            app.detailView.update(record.data); 
            app.listCard.setActiveItem('detailView');  //fails here!!! 
        } 
    }); 

        this.backButton = new Ext.Button({ 
            text: this.backText, 
            ui: 'back', 
            handler: this.onUiBack, 
            hidden: true, 
            scope: this 
        }); 

        var btns = []; 
        if (Ext.is.Phone) { 
            btns.unshift(this.backButton); 
        } 

        this.navigationBar = new Ext.Toolbar({ 
            ui: 'dark', 
            dock: 'top', 
            title: this.title, 
            items: btns.concat(this.buttons || []) 
        }); 
         
    this.listCard = new Ext.Panel({ 
            title: 'list', 
            cls: 'card_list', 
            id: 'card_list', 
            iconCls: 'calendar', 
            layout: 'card', 
            items: [this.listView, this.detailView] 
    }); 
         
    this.mainView = new Ext.TabPanel({ 
        tabBar: { 
                dock: 'bottom', 
                ui: 'dark', 
                layout: { pack: 'center' } 
            }, 
        cardSwitchAnimation: { 
                type: 'fade', 
                cover: true 
            }, 
        dockedItems: [this.navigationBar], 
        items: [this.listCard], 
        tabBarDock: 'bottom', 
        defaults: { 
                scroll: 'vertical',
                layout: 'fit' 
        },
        fullscreen: true, 
        layout: 'fit' 
    }); 
         
    this.Viewport = this.mainView; 
    this.dataStore.load();     
    } 
});  



*/


Ext.application({
    name: 'App',

    requires: [
        'Ext.MessageBox'
    ],

    views: [
        'Main',
        'Homepage',
        'Info',
        'SessionList',
        'SessionListContainer',
        'SessionEditor',
        'EventList',
        'EventListContainer',
        'SessionListContainer',
        'EventEditor',
        'SessionEditor'
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
            xtype: "sessioneditor"
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
