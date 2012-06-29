Ext.define("App.view.SessionList", {
    extend: "Ext.dataview.List",
    alias: 'widget.sessionlist',

    requires: [
        'App.store.Sessions',
        'App.model.Session'
    ],

    config: {
        loadingText: "Henter agenda...",
        scrollable: 'vertical',
        emptyText:
                '</pre>'+
                '<div class="session-list-empty-text">Agendaen er tom.</div>'+
                '<pre>',
        onItemDisclosure: true,
        grouped: true,
        iconCls: "button",
        itemTpl:
                '</pre>'+
                '<div class="list-item-title">'+
                '<input type="button" onClick="addItem({id});" value="Legg til" /> '+
                '{start} {name} ({startTime})</div>'+
                '<div class="list-item-title"></div>'+
                '<div class="list-item-description">{ingress}</div>'+
                '<pre>'
    }
});
