Ext.define('App.view.SessionDetail', {
    extend: 'Ext.Panel',
    xtype: 'sessionDetail',
    requires: [
        'Ext.Button'
    ],

    id: 'sessiondetail',
    
    config: {
        scrollable: true,
        
        defaults: {
            styleHtmlContent: true
        },
        
        items: [
            {
                id: 'productBtn',
                xtype: 'button',
                ui: 'confirm',
                margin: 0,
                text: 'Legg til i huskeliste',
                handler: this.onAddEventButtonTap
            },
            
            {
                id: 'description',
                html: ''
            }
        ]
    },

    onAddEventButtonTap: function () {
        this.fireEvent("newEventCommand", this);
    }

});