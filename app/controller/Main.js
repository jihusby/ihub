
Ext.define('App.controller.Main', {
    extend: 'Ext.app.Controller',
    
    requires: [
        'App.view.SessionDetail',
        'Ext.MessageBox'
    ],
    
    config: {
        refs: {
            mainView: '#mainview',
            mainList: '#mainlist',
            detailCard: '#detailcard',
            eventListContainer: 'eventlistcontainer',
            sessionListContainer: 'sessionlistcontainer',
            eventEditor: 'eventeditor',
            sessionEditor: 'sessioneditor',
            sessionspanel: 'sessionspanel'
        },

        control: {
            mainView: {
                activeitemchange: 'onMainViewActiveItemChange'
            },
            
            mainList: {
                activeitemchange: 'onListActiveItemChange'
            },

            eventListContainer: {
                editEventCommand: "onEditEventCommand",
                deleteEventCommand: "onDeleteEventCommand"
            },

            sessionListContainer: {
                editSessionCommand: "onEditSessionCommand"
            },

            eventEditor: {
                saveEventCommand: "onSaveEventCommand",
                deleteEventCommand: "onDeleteEventCommand",
                eventListCommand: "onEventListCommand"
            },

            sessionEditor: {
                saveSessionCommand: "onSaveSessionCommand",
                eventListCommand: "onSessionListCommand"
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
    addToHistory: function(id) {
        console.log("addToHistory");
        // Add new point to history
        this.getHistory().add(new Ext.app.Action({
            url: id
        }), true);
    },
*/    
    
    onMainViewActiveItemChange: function(comp, activeItem, oldItem) {
        console.log("onMainViewActiveItemChange");
        /*
        Ext.getStore("Sessions").load();
        if (Ext.isDefined(oldItem)) {
            var id = activeItem.getId();
            
            if (id === 'sessions') {
                
                // Restore node position and history
                var mainList = this.getMainList();
                var lastNode = mainList.getLastNode();
                
                if (!lastNode.isRoot()) {
                    var path = lastNode.getPath('id').slice(5);//strip /root from begin
                    this.addToHistory('session' + path);
                } else {
                    this.addToHistory('sessions');
                }                
                
            } else {
                this.addToHistory(id);
            }
        }
        */
    },
    
    onListActiveItemChange: function(comp, activeRecord, oldRecord) {
        console.log("onListActiveItemChange");
/*
        var record;
        
        if (activeRecord.getId() == 'detailcard' && 
            Ext.isObject(oldRecord)) {
            
            record = oldRecord.getStore().getNode();
            var leafRecord = comp.getLastNode();
            this.addToHistory('session/' + record.get('id') + '/' + leafRecord.get('id'));
        } else {
            record = activeRecord.getStore().getNode();
            var id = record.get('id');
            
            if (id === 'root') {
                this.addToHistory('sessions');
            } else {
                this.addToHistory('session/' + record.get('id'));
            }
        }
*/
    },
    
    showViewById: function(id) {
        console.log("showViewById");
/*
        var mainView = this.getMainView();
        Ext.each(mainView.getInnerItems(), function(item) {
            if (item.getId() == id) {
                mainView.setActiveItem(item);
            }
        });
*/
    },
    
    goToSelectedNode: function(list, store, id, product) {
        console.log("goToSelectedNode");
/*        
        var node = store.getNodeById(id);
                    
        if (node) {
            list.goToNode(node);
            
            if (Ext.isDefined(product)) {
                var productNode = store.getNodeById(product);
                
                if (productNode) {
                    list.goToLeaf(productNode);
                }
            }
        }
*/        
    },
    
    showSessionById: function(id, product) {
        console.log("showSessionById");
/*        
        this.showViewById('sessions');
        
        var self = this;
        var mainList = this.getMainList();
        var store = mainList.getStore();
        
        if (store.loading) {
            store.on({
                load: function() {
                   self.goToSelectedNode(mainList, store, id, product);
                }
            });
        } else {
            self.goToSelectedNode(mainList, store, id, product);
        }
*/        
    },

    onSessionListCommand: function() {
        Ext.Viewport.animateActiveItem(this.getSessionListContainer(), this.slideRightTransition);
    },
    
    onEditSessionCommand: function(list, record) {
        var body = "<b>"+ record.data.start +"</b><br>" + record.data.description;
        Ext.Msg.alert(record.data.name, body);
        // Doesn't work. Commented out, temporarily replaced with view dialog.
        //var sessionEditor = this.getSessionEditor();
        //sessionEditor.setRecord(record); // load() is deprecated.
        //Ext.Viewport.animateActiveItem(sessionEditor, this.slideLeftTransition);
    },

    onSaveSessionCommand :function () {
        console.log("onSaveSessionCommand");
        
        /*
         * For future use
         *
        
        var sessionEditor = this.getSessionEditor();
        addItem(sessionEditor.getRecord().id);
        this.activateSessionList();
        */
    },


    onEventListCommand: function() {
        Ext.Viewport.animateActiveItem(this.getEventListContainer(), this.slideRightTransition);
    },

    onEditEventCommand: function(list, record) {
        var body = "<b>"+ record.data.start +"</b><br>" + record.data.description;
        Ext.Msg.alert(record.data.name, body);
        // Doesn't work. Commented out, temporarily replaced with view dialog.
        //var eventEditor = this.getEventEditor();
        //eventEditor.setRecord(record); // load() is deprecated.
        //Ext.Viewport.animateActiveItem(eventEditor, this.slideLeftTransition);
    },

    onDeleteEventCommand: function (list, record) {
        deleteEvent(record);
    },

    onRemoveEventCommand: function () {
        console.log("onSaveSessionCommand");

        /*
         * For future use
         *
        
        var eventEditor = this.getEventEditor();
        removeItem(sessionEditor.getRecord().id);
        this.activateSessionList();
        */
    }


});



