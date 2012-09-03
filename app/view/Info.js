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
                items: [
                    {
                        xtype: 'button',
                        ui: 'normal',
                        id: 'infoBtn',
                        text: 'Konferanserom',
                        cls: 'buttonContact',
                        docked: 'bottom',
                        handler: function() {
                            showPopupMap("map.jpg", "Konferanserom");
                        }
                    }],

                itemTpl: [
                    '<div class="textBlock">',
                    '<div class="header">{item1}</div>',
                    '<div class="contentText">{item2}</div>',
                    '<div class="contentText">{item3}</div></div>'
                ],

                store: "Infos",
                autoLoad: true,
                fields: ['id', 'item0', 'item1', 'item2', 'item3']                

//                {
//                    autoLoad: true,
//                    fields: ['item0', 'item1', 'item2', 'item3'],
//                    proxy: {
//                        type: 'ajax',
//                        url: 'resources/data/info.json',
//                        reader: {
//                            type: 'json',
//                            rootProperty: 'responseData.feed.entries'
//                    }
//                }
//            }
        }]
    }
    
});

function showPopupMap(image, title){
    showPopup(image, title);
}
