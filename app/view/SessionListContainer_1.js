Ext.define("App.view.SessionListContainer", {
    extend: 'Ext.Container',
    alias: "widget.sessionlistcontainer",
    id:'sessionlistcontainer',

    requires: [
        'Ext.TitleBar',
        'App.store.Sessions',
        'App.model.Session'
    ],

    initialize: function () {
        this.callParent(arguments);

        var topToolbar = {
            xtype: 'toolbar',
            title: 'Agenda',
            ui: 'dark',
            docked: 'top',
            items: [
                {
                    xtype: 'spacer'
                }
            ]
        };

        var sessionList = {
            xtype: "sessionlist",
            store: Ext.getStore("Sessions"),
            listeners: {
                //itemtap: { fn: this.onSessionListDisclose, scope: this }
                disclose: { fn: this.onSessionListDisclose, scope: this }
            }
        };

        this.add([topToolbar, sessionList]);
    },

    onSessionListDisclose: function (list, record, target, index, evt, options) {
        console.log("onSessionListDisclose");
        this.fireEvent('sessionDetailCommand', list, record);
    },

    config: {
        layout: {
            type: 'card'
        },
        detailCard: {
            xtype: 'detailcard'
        }

    }

});