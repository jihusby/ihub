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
                /*'<input type="image" src="resources/icons/star_active.png" onClick="addItem({id});" value="Legg til" /> '+*/
                '{name}</div>'+
                '<div class="list-item-title"></div>'+
                '<div class="list-item-description">{ingress}</div>'+
                '<div class="list-item-title"><a href="">{place}</a></div>'+
                '<pre>'
    }
});
