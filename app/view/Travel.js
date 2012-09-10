Ext.define("App.view.Travel", {
    extend: 'Ext.navigation.View',
    xtype: 'travel',
    requires: [
        'App.store.Travel',
        'App.model.ViewContent',
        'Ext.TitleBar'
    ],

    config: {
        model: "App.model.ViewContent",
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

                store: "Travel",
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
