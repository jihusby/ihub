Ext.define("App.view.EventEditor", {
    extend: "Ext.form.Panel",
    id: "event",
    requires: [
        "Ext.form.FieldSet",
        'Ext.Button',
        'Ext.Toolbar'
    ],

    alias: "widget.eventeditor",
    config:{
        scrollable:'vertical'
    },
    initialize: function () {

        this.callParent(arguments);

        var backButton = {
            xtype: "button",
            ui: "back",
            text: "Hjem",
            handler: this.onBackButtonTap,
            scope: this
        };

        var saveButton = {
            xtype: "button",
            ui: "action",
            text: "Lagre",
            handler: this.onSaveButtonTap,
            scope: this
        };

        var deleteButton = {
            xtype: "button",
            iconCls: "trash",
            iconMask: true,
            handler: this.onDeleteButtonTap,
            scope: this
        };

        var topToolbar = {
            xtype: "toolbar",
            docked: "top",
            title: "Rediger event",
            items: [
                backButton,
                { xtype: "spacer" },
                saveButton,
                deleteButton
            ]
        };

        var bottomToolbar = {
            xtype: "toolbar",
            docked: "bottom",
            html: "This is info about something"
        };

        var eventNameEditor = {
            xtype: 'textfield',
            name: 'name',
            label: 'Tittel',
            required: true
        };

        var eventDescriptionEditor = {
            xtype: 'textareafield',
            name: 'description',
            label: 'Beskrivelse'
        };

        this.add([
            topToolbar,
            { xtype: "fieldset",
                items: [eventNameEditor, eventDescriptionEditor]
            },
            bottomToolbar
        ]);

    },

    onSaveButtonTap: function () {
        this.fireEvent("saveEventCommand", this);
    },

    onDeleteButtonTap: function () {
        this.fireEvent("deleteEventCommand", this);
    },

    onBackButtonTap: function () {
        this.fireEvent("eventListCommand", this);
    }

});