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
                // styleHtmlContent: true,
                title: 'Rica Nidelven',
                maxWidth: 750,
                xtype: 'dataview',
                itemTpl: [
                    '<div class="textBlock">',
                    '<div class="header">{header}</div>',
                    '<div class="contentText">{content.content1}</div>',
                    '<div class="contentText">{content.content2}</div>',
                    '<div class="contentText">{content.content3}</div>',
                    '<div class="contentText">{content.content4}</div>',
                    '<div class="contentText">{content.content5}</div>',
                    '<div class="contentText">{content.content6}</div>',
                    '<div class="contentText">{content.content7}</div>',
                    '<div class="contentText">{content.content8}</div>',
                    '<div class="footer">{footer}</div></div>'
                ],

                store: {
                    autoLoad: true,
                    fields: ['header', 'ingress', 'content', 'footer'],
                    proxy: {
                        type: 'ajax',
                        url: 'resources/data/homepage.json',
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
