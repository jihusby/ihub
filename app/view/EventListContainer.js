Ext.define("App.view.EventListContainer", {
    extend: 'Ext.Container',
    alias: "widget.eventlistcontainer",
    id:'eventlistcontainer',

    requires: [
        'Ext.TitleBar',
        'App.store.Events',
        'App.model.Event'
    ],

    initialize: function () {
        this.callParent(arguments);

        var topToolbar = {
            xtype: 'toolbar',
            title: 'Min huskeliste',
            ui: 'dark',
            docked: 'top',
            items: [
                {
                    xtype: 'spacer'
                }
            ]
        };

        var eventList = {
            xtype: "eventlist",
            store: Ext.getStore("Events"),
            listeners: {
                disclose: { fn: this.onEventListDisclose, scope: this }
                //itemtaphold: { fn: this.onEventRemove, scope: this }
            }
        };

        this.add([topToolbar, eventList]);
    },

    onEventListDisclose: function (list, record, target, index, evt, options) {
        console.log("onEventListDisclose");
        this.fireEvent('editEventCommand', this, record);
    },

    onEventRemove: function (view, index, item, e) {
        console.log("onEventRemove");
        var record = view.getStore().getAt(index);
        this.fireEvent('deleteEventCommand', this, record);
    },

    config: {
        layout: {
            type: 'fit'
        },
        detailCard: {
            xtype: 'detailcard'
        }

    }

});
