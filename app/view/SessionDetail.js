Ext.define('App.view.SessionDetail', {
    id: "session",
    extend: 'Ext.form.Panel',
    alias: "widget.sessiondetail",
    requires: [
        'Ext.Button'
    ],

    config: {
        scrollable: true,
        
        defaults: {
            styleHtmlContent: true
        }
    },

    initialize: function() {
        
        this.callParent(arguments);
        console.log("detail:");
        console.log("this:" + this);
        console.log("this.id: " + this.id);
        console.log("this.data: " + this.data);
        console.log("this.getRecord: " + this.getRecord());

        var backButton = {
            xtype: "button",
            ui: "back",
            text: "Tilbake",
            handler: this.onBackButtonTap,
            scope: this
        };
        
        var addButton = {
            id: 'productBtn',
            xtype: 'button',
            ui: 'confirm',
            margin: 0,
            text: 'Legg til i huskeliste',
            handler: this.onAddEventButtonTap,
            scope: this
        };
        

        var topToolbar = {
            xtype: "toolbar",
            docked: "top",
            title: "",
            items: [
                backButton
            ]
        };

        var sessionNameLabel = {
            xtype: 'textfield',
            name: 'name',
            label: 'Tittel',
            readOnly: true
        };

        var sessionDescriptionLabel = {
            xtype: 'textareafield',
            name: 'description',
            label: 'Beskrivelse',
            readOnly: true
        };

        this.add([
            topToolbar,
            addButton,
            { xtype: "fieldset",
                items: [sessionNameLabel, sessionDescriptionLabel]
            },
        ]);
    },

    onBackButtonTap: function () {
        this.fireEvent("sessionListCommand", this);
    },

    onAddEventButtonTap: function () {
        console.log("onAddEventButtonTap");
        this.fireEvent("addEventCommand", this);
    }

});