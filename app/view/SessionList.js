Ext.define("App.view.SessionList", {
    extend: "Ext.List",
    xtype: 'sessionlist',

    requires: [
        'App.store.Sessions',
        'App.model.Session'
    ],

    config: {
        store: 'Sessions',
        title: 'Agenda',
        loadingText: "Henter agenda...",
        scrollable: 'vertical',
        indexBar: false,
        emptyText:
                '</pre>'+
                '<div class="session-list-empty-text">Agendaen er tom.</div>'+
                '<pre>',
        onItemDisclosure: true,
        grouped: true,
        iconCls: "button",
        itemTpl:
                '</pre>'+
                '<div class="list-item-title"><input id="img{id}" type="image" src="resources/icons/star_gray_small.png" onClick="saveSessionDetail(\'{id}\');" onLoad="setImageSource({id});" />{startTime} - {endTime}: {name}</div>'+
                '<image id="img2{id}" src="resources/icons/star_gray_small.png" onLoad="setImageSource({id});" style="display:none;" />'+
                '<div class="list-item-title">{speaker}</div>'+
                '<div class="list-item-description">{ingress}</div>'+
                '<div class="list-item-title"><input class="buttonList" type="button" onClick="showPopupMap(\'{place}.jpg\', \'{place}\');" value="{place}" /></div>'+
                '<pre>'
    }
});

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


