Ext.define("App.view.EventList", {
    extend: "Ext.dataview.List",
    xtype: 'eventlist',

    requires: [
        'App.store.Events',
        'App.model.Event'
    ],

    config: {
        store: 'Events',
        title: 'Min huskeliste',
        loadingText: "Henter huskeliste...",
        scrollable: 'vertical',
        indexBar: false,
        emptyText:
                '</pre>'+
                '<div class="event-list-empty-text">Huskelisten er tom.</div>'+
                '<pre>',
        onItemDisclosure: true,
        listeners: {
            itemtap: function() {
                console.log("item tapped");
                
            }
        },
        grouped: true,
        iconCls: "button",
        itemTpl: getTemplate() 
    }
});

function removeEvent(id) {
    removeItem(id);
}

function showPopupMap(image, imageTitle){
    
    var popup = new Ext.Panel({
        floating: true,
        modal: true,
        width: 320,
        height: 420,
        html: '<body style="margin: 0px 0px 0px 0px; padding: 0px 0px 0px 0px;"><img src="resources/images/maps/'+image+'" style="height:100%; width:100%"></body>',
        items: [{
            xtype: 'toolbar',
            title: imageTitle,
            docked: 'top',
            items: [{
                xtype: 'spacer'
            },{
                text: 'Lukk',
                handler: function(){
                    popup.hide();
                }
            }]
        }]
    });
    
    popup.show();
}

function getTemplate() {
    return getEventListTemplate();
}


