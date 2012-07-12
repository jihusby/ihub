Ext.define("App.view.Info", {
    extend: 'Ext.navigation.View',
    xtype: 'info',
    requires: [
        'Ext.TitleBar'
    ],

    config: {
        scrollable: true,
        items: [
            {
                //styleHtmlContent: true,
                title: 'XP2010',
                maxWidth: 750,
                xtype: 'dataview',
                ui: 'light',
                itemTpl: [
                    '<div class="textBlock">',
                    '<div class="contentText">{header}</div>',
                    '<div class="contentText">{ingress}</div>',
                    '<div class="contentText">{content1}</div>',
                    '<div class="contentText">{content2}</div>',
                    '<div class="footer">{footer}</div></div>'
                ],

                store: {
                    autoLoad: true,
                    fields: ['header', 'ingress', 'content1', 'content2', 'footer'],
                    proxy: {
                        type: 'ajax',
                        url: 'resources/data/info.json',
                        reader: {
                            type: 'json',
                            rootProperty: 'responseData.feed.entries'
                    }
                }
            }
        }]
    }
});
