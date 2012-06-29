Ext.define('App.controller.Main', {
    extend: 'Ext.app.Controller',
    
    requires: [
        'App.view.Detail',
        'Ext.MessageBox'
    ],
    
    config: {
        refs: {
            mainView: '#mainview',
            mainList: '#mainlist',
            detailCard: '#detailcard',
            eventListContainer: 'eventlistcontainer',
            eventEditor: 'eventeditor',
            eventspanel: 'eventspanel'
        },
        
        routes: {
            ':id': 'showViewById',
            'section/:id': 'showSectionById',
            'section/:id/:product': 'showSectionById'
        },
        
        control: {
            mainView: {
                activeitemchange: 'onMainViewActiveItemChange'
            },
            
            mainList: {
                activeitemchange: 'onListActiveItemChange'
            },
            
            detailCard: {
                activate: 'onDetailCardActivate',
                addEventCommand: "onSaveEventCommand"
            },

            eventListContainer: {
                newEventCommand: "onNewEventCommand",
                editEventCommand: "onEditEventCommand",
                deleteEventCommand: "onDeleteEventCommand"
            },

            eventEditor: {
                saveEventCommand: "onSaveEventCommand",
                deleteEventCommand: "onDeleteEventCommand",
                eventListCommand: "onEventListCommand"
            },

            'eventspanel list': {
                itemtap: 'showEvent',
                itemtaphold: 'deleteEvent'
            }
        },
        
        history: null
    },

    slideLeftTransition: { type: 'slide', direction: 'left' },
    slideRightTransition: { type: 'slide', direction: 'right' },

    launch: function() {
        this.callParent(arguments);
        Ext.getStore("Events").load();
    },

    init: function() {
        // Setup start history point
        this.setHistory(this.getApplication().getHistory());
        this.callParent(arguments);
    },

    addToHistory: function(id) {
        
        // Add new point to history
        this.getHistory().add(new Ext.app.Action({
            url: id
        }), true);
    },
    
    onDetailCardActivate: function(card, list) {
        
        // Get selected leaf node
        var record = list.getLastNode();
        
        // Get and update description
        var descriptionField = card.down('#description');
        descriptionField.setHtml(getFormattedDetailCard(record));
        
        // Get and update product button
        var detailBtn = card.down('#productBtn');
        //detailBtn.setText(record.get('name'));
        
        // Add custom tap listener for product button
        detailBtn.on({
            scope: record,
            tap: this.onDetailButtonTap
        });
    },

    onDetailButtonTap: function() {
        saveEvent(getEventFromSection(this));
    },


    
    onMainViewActiveItemChange: function(comp, activeItem, oldItem) {
        if (Ext.isDefined(oldItem)) {
            var id = activeItem.getId();
            
            if (id === 'sections') {
                
                // Restore node position and history
                var mainList = this.getMainList();
                var lastNode = mainList.getLastNode();
                
                if (!lastNode.isRoot()) {
                    var path = lastNode.getPath('id').slice(5);//strip /root from begin
                    this.addToHistory('section' + path);
                } else {
                    this.addToHistory('sections');
                }                
                
            } else {
                this.addToHistory(id);
            }
        }
    },
    
    onListActiveItemChange: function(comp, activeRecord, oldRecord) {
        var record;
        
        if (activeRecord.getId() == 'detailcard' && 
            Ext.isObject(oldRecord)) {
            
            record = oldRecord.getStore().getNode();
            var leafRecord = comp.getLastNode();
            this.addToHistory('section/' + record.get('id') + '/' + leafRecord.get('id'));
        } else {
            record = activeRecord.getStore().getNode();
            var id = record.get('id');
            
            if (id === 'root') {
                this.addToHistory('sections');
            } else {
                this.addToHistory('section/' + record.get('id'));
            }
        }
    },
    
    showViewById: function(id) {
        var mainView = this.getMainView();
        Ext.each(mainView.getInnerItems(), function(item) {
            if (item.getId() == id) {
                mainView.setActiveItem(item);
            }
        });
    },
    
    goToSelectedNode: function(list, store, id, product) {
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
    },
    
    showSectionById: function(id, product) {
        this.showViewById('sections');
        
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
    },

    onNewEventCommand: function() {
        this.activateEventEditor(getEmptyEvent());
    },

    onEditEventCommand: function(list, record) {
        this.activateEventEditor(record);
    },

    onDeleteEventCommand: function (list, record) {
        deleteEvent(record);
    },


    onEventListCommand: function() {
        this.activateEventList();
    },

    activateEventEditor: function (record) {
        var body = "<b>"+ record.data.start +"</b><br>" + record.data.description;
        Ext.Msg.alert(record.data.name, body);
        // Doesn't work. Commented out, temporarily replaced with view dialog.
        // var eventEditor = this.getEventEditor();
        // eventEditor.setRecord(record); // load() is deprecated.
        // Ext.Viewport.animateActiveItem(eventEditor, this.slideLeftTransition);
    },

    activateEventList: function () {
        Ext.Viewport.animateActiveItem(this.getEventListContainer(), this.slideRightTransition);
    },

    onSaveEventCommand: function () {
        var eventEditor = this.getEventEditor();
        var currentEvent = eventEditor.getRecord();
        var newValues = eventEditor.getValues();

        currentEvent.set("name", newValues.name);
        currentEvent.set("ingress", newValues.ingress);
        currentEvent.set("description", newValues.description);

        saveEvent(currentEvent);

        this.activateEventList();
    }


});



