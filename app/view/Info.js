Ext.define("App.view.Info", {
    extend: 'Ext.navigation.View',
    xtype: 'info',
    requires: [
        'App.store.Info',
        'App.model.ViewContent',
        'Ext.TitleBar'
    ],
    
    config: {
        model: "App.model.ViewContent",
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

                store: "Info",
                fields: ['id', 'item0', 'item1', 'item2', 'item3']                
        }],

        listeners: {
            painted: function(){
                this.fireEvent('paintedEvent');
            }
        }
    }

    
    
});

function showPopupMap(image, title){
    showPopup(image, title);
}
