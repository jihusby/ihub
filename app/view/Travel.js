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

                items: [
                    {
                        xtype: 'button',
                        ui: 'normal',
                        id: 'travelBtn',
                        text: 'Bykart',
                        cls: 'buttonContact',
                        docked: 'bottom',
                        handler: function() {
                            showPopupMap("areamap.jpg", "Bykart");
                        }
                    }],

                itemTpl: [
                    '<div class="textBlock">',
                    '<div class="header">{item1}</div>',
                    '<div class="contentText">{item2}</div></div>',
                    '</div>'
                ],

                store: {
                    autoLoad: true,
                    fields: ['item1', 'item2'],
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
