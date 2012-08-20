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
                title: 'XP2010',
                maxWidth: 750,
                xtype: 'dataview',
                //ui: 'light',
                itemTpl: [
                    '<div class="textBlock">',
                    '<div class="header">{header}</div>',
                    '<div class="contentText">{ingress}</div>',
                    '<div class="contentText">{content1}</div></div>',
                    '<input type="button" class="buttonWide" onClick="showPopupMap(\'{map}\', \'{mapHeader}\');" value="{mapHeader}" />',
                    '<div class="footer">{footer}</div>'
                ],

                store: {
                    autoLoad: true,
                    fields: ['header', 'ingress', 'content1', 'mapHeader', 'map', 'footer'],
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

function showPopupMap(image, title){
    showPopup(image, title);
}
