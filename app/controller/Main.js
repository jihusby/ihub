
Ext.define('App.controller.Main', {
    extend: 'Ext.app.Controller',
    
    requires: [
        'App.view.SessionDetail',
        'Ext.MessageBox'
    ],
    
    config: {
        refs: {
            main: 'sessionlistcontainer',
            mainView: 'mainview',
            eventListContainer: 'eventlistcontainer',
            eventEditor: 'eventeditor'
        },

        control: {
            'sessionlist': {
                disclose: 'onSessionDetailCommand'
            },
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
        },
        
        history: null
    },

    slideLeftTransition: {type: 'slide', direction: 'left'},
    slideRightTransition: {type: 'slide', direction: 'right'},

    launch: function() {
        console.log("launch");
        this.callParent(arguments);
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
        this.getMain().push({
            xtype: 'sessiondetail',
            data: record.data,
            id: record.data.id
        });
    },

    onEventListCommand: function() {
        Ext.Viewport.animateActiveItem(this.getEventListContainer(), this.slideRightTransition);
    },

    onEventDetailCommand: function(list, record) {
        var body = "<b>"+ record.data.start +"</b><br>" + record.data.description;
        Ext.Msg.alert(record.data.name, body);
        // Doesn't work. Commented out, temporarily replaced with view dialog.
        //var eventEditor = this.getEventEditor();
        //eventEditor.setRecord(record); // load() is deprecated.
        //Ext.Viewport.animateActiveItem(eventEditor, this.slideLeftTransition);
    },

    onRemoveEventCommand: function (list, record) {
        console.log("onRemoveEventCommand");
        deleteEvent(record);

        /*
         * For future use
         *
        
        var eventEditor = this.getEventEditor();
        removeItem(sessionEditor.getRecord().id);
        this.activateSessionList();
        */
    }


});



