Ext.define("App.view.Homepage", {
    extend: 'Ext.navigation.View',
    xtype: 'homepage',
    requires: [
        'Ext.TitleBar'
    ],

    config: {
        scrollable: true,
        items: [
            {
                title: 'Rica Nidelven',
                maxWidth: 750,
                xtype: 'dataview',
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
                    '<div class="contentText">{item3}</div>',
                    '<div class="footer">{item4}</div></div>'
                ],

                store: {
                    autoLoad: true,
                    fields: ['item1', 'item2', 'item3', 'item4'],
                    proxy: {
                        type: 'ajax',
                        url: 'resources/data/hotel.json',
                        reader: {
                            type: 'json',
                            rootProperty: 'responseData.feed.entries'
                        }
                    }
                }
            }
        ]
    }

});
