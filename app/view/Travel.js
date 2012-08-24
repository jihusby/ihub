Ext.define("App.view.Travel", {
    extend: 'Ext.navigation.View',
    xtype: 'travel',
    requires: [
        'Ext.TitleBar'
    ],

    config: {
        scrollable: true,
        items: [
            {
                title: 'Reiseinfo',
                maxWidth: 750,
                xtype: 'dataview',
                //ui: 'light',
                itemTpl: [
                    '<div class="textBlock">',
                    '<div class="header">{header}</div>',
                    '<div class="contentText">{ingress}</div>',
                    '<div class="contentText">{content1}</div></div>',
                    '<input type="button" class="buttonWide" onClick="showPopupMap(\'{map}\', \'{mapHeader}\');" value="{mapHeader}" />',
                    '</div>'
                ],

                store: {
                    autoLoad: true,
                    fields: ['header', 'ingress', 'content1', 'mapHeader', 'map'],
                    proxy: {
                        type: 'ajax',
                        url: 'resources/data/travel.json',
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
