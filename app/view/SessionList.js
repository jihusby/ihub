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
                '<div class="list-item-title"><a href="">{place}</a></div>'+
                '<pre>'
    }
});

function saveSessionList(id, icon) {
    console.log("saveSession in list");
    if(toggleSession(id)){
        document.getElementById("list_"+id).src="resources/icons/star_color_small.png";
    }else {
        document.getElementById("list_"+id).src="resources/icons/star_gray_small.png";
    }
}


