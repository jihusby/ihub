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
                itemTpl: [
                    '<div class="textBlock">',
                    '<div class="header">{content1}</div>',
                    '<div class="contentText">{content2}</div>',
                    '<div class="contentText">{content3}</div>',
                    '<div class="footer">{content4}</div></div>'
                ],

                store: {
                    autoLoad: true,
                    fields: ['content1', 'content2', 'content3', 'content4'],
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
