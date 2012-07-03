Ext.define("App.view.SessionEditor", {
    extend: "Ext.form.Panel",
    id: "session",
    requires: [
        "Ext.form.FieldSet",
        'Ext.Button',
        'Ext.Toolbar'
    ],

    alias: "widget.sessioneditor",
    config:{
        scrollable:'vertical'
    },
    tabBarDock: 'bottom', 
    initialize: function () {

        this.callParent(arguments);

        var backButton = {
            xtype: "button",
            ui: "back",
            text: "Tilbake",
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
            title: "Rediger session",
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

        var sessionNameEditor = {
            xtype: 'textfield',
            name: 'name',
            label: 'Tittel',
            required: true
        };

        var sessionDescriptionEditor = {
            xtype: 'textareafield',
            name: 'description',
            label: 'Beskrivelse'
        };

        this.add([
            topToolbar,
            { xtype: "fieldset",
                items: [sessionNameEditor, sessionDescriptionEditor]
            },
            bottomToolbar
        ]);

    },

    onSaveButtonTap: function () {
        this.fireEvent("saveSessionCommand", this);
    },

    onDeleteButtonTap: function () {
        this.fireEvent("deleteSessionCommand", this);
    },

    onBackButtonTap: function () {
        this.fireEvent("sessionListCommand", this);
    }

});