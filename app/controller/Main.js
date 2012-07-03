
Ext.define('App.controller.Main', {
    extend: 'Ext.app.Controller',
    
    requires: [
        'App.view.SessionDetail',
        'Ext.MessageBox'
    ],
    
    config: {
        refs: {
            mainView: '#mainview',
            eventListContainer: 'eventlistcontainer',
            sessionListContainer: 'sessionlistcontainer',
            eventEditor: 'eventeditor',
            sessionList: 'sessionlist',
            sessionDetail: 'sessiondetail'
        },

        control: {
/*
            mainView: {
                activeitemchange: 'onMainViewActiveItemChange'
            },
            
            mainList: {
                activeitemchange: 'onListActiveItemChange'
            },
*/
            eventListContainer: {
                eventDetailCommand: "onEventDetailCommand",
                removeEventCommand: "onRemoveEventCommand"
            },

            sessionListContainer: {
                sessionDetailCommand: "onSessionDetailCommand"
            },

            eventEditor: {
                deleteEventCommand: "onRemoveEventCommand",
                eventListCommand: "onEventListCommand"
            },

            sessionDetail: {
                sessionListCommand: "onSessionListCommand",
                addEventCommand: "onAddEventCommand"
            },

            'eventspanel list': {
                itemtap: 'showEvent'
            },
            
            'sessionspanel list': {
                itemtap: 'showSession'
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

/*
    onMainViewActiveItemChange: function(comp, activeItem, oldItem) {
        console.log("onMainViewActiveItemChange");
    },
*/    
    onSessionListCommand: function() {
        Ext.Viewport.animateActiveItem(this.getMainView(), this.slideRightTransition);
    },
    
    onSessionDetailCommand: function(list, record) {
        console.log('onSessionDetailCommand');
        var sessionDetail = this.getSessionDetail();
        sessionDetail.setRecord(record); // load() is deprecated.
        Ext.Viewport.animateActiveItem(sessionDetail, this.slideLeftTransition);
    },

    onAddEventCommand :function () {
        console.log('onAddEventCommand');
        var currentSession = this.getSessionDetail().getRecord();        
        addItem(currentSession.data.id);
        Ext.Viewport.animateActiveItem(this.getMainView(), this.slideRightTransition);
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



