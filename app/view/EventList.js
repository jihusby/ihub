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
        grouped: true,
        iconCls: "button",
        itemTpl:
                '</pre>'+
                '<div class="list-item-title">'+
                //'<image id="img{id}" type="image" src="resources/icons/star_color_small.png" onclick="removeEvent({externalId});" />' +
                '<input type="image" src="resources/icons/star_color_small.png" onClick="removeEvent({externalId});" value="Fjern" />' + 
                '{name}</div>'+
                '<div class="list-item-title"></div>'+
                '<div class="list-item-description">{ingress}</div>'+
                '<div class="list-item-title"><input class="buttonList" type="button" onClick="showPopupMap(\'{place}\', \'{place}\');" value="{place}" /></div>'+
                '<pre>'
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

