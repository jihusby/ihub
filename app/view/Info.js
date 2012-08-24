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
                    '<div class="header">{item1}</div>',
                    '<div class="contentText">{item2}</div>',
                    '<div class="contentText">{item3}</div></div>',
                    '<input type="button" class="buttonWide" onClick="showPopupMap(\'{item5}\', \'{item4}\');" value="{item4}" />',
                ],

                store: {
                    autoLoad: true,
                    fields: ['item0', 'item1', 'item2', 'item3', 'item4', 'item5'],
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
