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
                '<div class="list-item-title">'+
                '{startTime}: {name}</div>'+
                '<div class="list-item-title"></div>'+
                '<div class="list-item-description">{ingress}</div>'+
                '<div class="list-item-title"><input class="buttonList" type="button" onClick="showPlace(\'{place}\');" value="{place}" /></div>'+
                '<pre>'
    }
});

function showPlace(place) {
    var body = "<img src='resources/images/map2.jpg' style='height:70%; width:90%'>";
    Ext.Msg.alert(place, body);
}



