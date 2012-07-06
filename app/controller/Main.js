
Ext.define('App.controller.Main', {
    extend: 'Ext.app.Controller',
    
    requires: [
        'App.view.SessionDetail',
        'App.view.EventDetail',
        'Ext.MessageBox'
    ],
    
    config: {
        refs: {
            mainView: 'mainview',
            sessionListContainer: 'sessionlistcontainer',
            eventListContainer: 'eventlistcontainer',
            eventEditor: 'eventeditor'
        },

        control: {
            'sessionlist': {
                disclose: 'onSessionDetailCommand'
            },
            'eventlist': {
                disclose: 'onEventDetailCommand'
            }
/*            
            eventListContainer: {
                eventDetailCommand: "onEventDetailCommand",
                removeEventCommand: "onRemoveEventCommand"
            },

            eventEditor: {
                deleteEventCommand: "onRemoveEventCommand",
                eventListCommand: "onEventListCommand"
            },

            'eventspanel list': {
                itemtap: 'showEvent'
            }
*/            
        }
        
        //history: null
    },

    slideLeftTransition: {type: 'slide', direction: 'left'},
    slideRightTransition: {type: 'slide', direction: 'right'},

    launch: function() {
        this.callParent(arguments);
        //Ext.getStore("Events").load();
        Ext.getStore("Events").load();
        Ext.getStore("Sessions").load();
    },

    init: function() {
        console.log("init");
        this.callParent(arguments);
    },

    onSessionListCommand: function() {
        Ext.Viewport.animateActiveItem(this.getMainView(), this.slideRightTransition);
    },
    
    onSessionDetailCommand: function(list, record) {
        console.log('onSessionDetailCommand: ');
        console.log("event store is " + Ext.getStore("Events").id);
        console.log("session store is " + Ext.getStore("Sessions").id);
        
        this.getSessionListContainer().push({
            xtype: 'sessiondetail',
            data: record.data
            //sessionId: record.data.id
        });
    },

    onEventListCommand: function() {
        Ext.Viewport.animateActiveItem(this.getMainView(), this.slideRightTransition);
    },

    onEventDetailCommand: function(list, record) {
        this.getEventListContainer().push({
            xtype: 'eventdetail',
            data: record.data
            //eventId: record.data.id
        });
    }
});



