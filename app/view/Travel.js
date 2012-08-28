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
                    '<div class="header">{item1}</div>',
                    '<div class="contentText">{item2}</div></div>',
                    '<input type="button" class="buttonWide" onClick="showPopupMap(\'{item4}.jpg\', \'{item3}\');" value="{item3}" />',
                    '</div>'
                ],

                store: {
                    autoLoad: true,
                    fields: ['item1', 'item2', 'item3', 'item4'],
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
