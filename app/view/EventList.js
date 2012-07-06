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
                '<input class="buttonLeft" type="button" onClick="removeEvent({externalId});" value="Fjern" />' + 
                '{name}</div>'+
                '<div class="list-item-title"></div>'+
                '<div class="list-item-description">{ingress}</div>'+
                '<div class="list-item-title"><a href="">{place}</a></div>'+
                '<pre>'
    }
});

function removeEvent(id) {
    removeItem(id);
}


