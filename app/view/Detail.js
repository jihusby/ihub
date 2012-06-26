Ext.define('App.view.Detail', {
    extend: 'Ext.Panel',
    xtype: 'detailcard',
    requires: [
        'Ext.Button'
    ],

    id: 'detailcard',
    
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
                text: 'Legg til som favoritt',
                handler: this.onAddEventButtonTap
            },
            
            {
                id: 'description',
                html: ''
            }
        ]
    },

    onAddEventButtonTap: function () {
        this.fireEvent("addEventCommand", this);
    }

});