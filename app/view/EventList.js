Ext.define("App.view.EventList", {
    extend: "Ext.dataview.List",
    alias: 'widget.eventlist',

    requires: [
        'App.store.Events',
        'App.model.Event'
    ],

    config: {
        loadingText: "Henter huskelisten...",
        scrollable: 'vertical',
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
                '<input type="button" onClick="removeItem({id});" value="Fjern" /> '+
                '{start} {name} ({startTime})</div>'+
                '<div class="list-item-title"></div>'+
                '<div class="list-item-description">{ingress}</div>'+
                '<pre>'
    }
});
