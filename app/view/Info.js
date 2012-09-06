Ext.define("App.view.Info", {
    extend: 'Ext.navigation.View',
    xtype: 'info',
    requires: [
        'App.store.Infos',
        'App.model.Info',
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
                fields: ['id', 'item0', 'item1', 'item2', 'item3']                
        }]
    },

    listeners: {
        painted: function(){
            this.fireEvent('painted');
        }
    }
    
    
});

function showPopupMap(image, title){
    showPopup(image, title);
}
