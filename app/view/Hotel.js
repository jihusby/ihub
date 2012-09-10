Ext.define("App.view.Hotel", {
    extend: 'Ext.navigation.View',
    xtype: 'hotel',
    faen: 'Hotel',
    requires: [
        'App.store.Hotel',
        'App.model.Hotel',
        'Ext.TitleBar'
    ],

    config: {
        faen: 'FAEN',
        scrollable: true,
        items: [
            {
                title: 'Rica Nidelven',
                maxWidth: 750,
                xtype: 'dataview',
                faen: 'ARGH',
                config: {
                    faen: 'HELLER'
                },
                items: [
                    {
                        xtype: 'button',
                        ui: 'normal',
                        id: 'contactBtn',
                        text: 'Kontakt oss',
                        cls: 'buttonContact',
                        docked: 'bottom',
                        handler: function() {
                            window.location = 'tel:99205294';
                        }
                    }],

                itemTpl: [
                    '<div class="textBlock">',
                    '<div class="header">{item1}</div>',
                    '<div class="contentText">{item2}</div>',
                    '<div class="contentText">{item3}</div></div>'
                ],

                store: "Hotel",
                fields: ['id', 'item0', 'item1', 'item2', 'item3'] 
            }
        ],
        listeners: {
            painted: function(){
                this.fireEvent('paintedEvent');
            }
        }

    }
});
