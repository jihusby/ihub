Ext.define("App.view.SessionList", {
    extend: "Ext.List",
    xtype: 'sessionlist',

    requires: [
        'App.store.ListElement',
        'App.model.ListElement'
    ],

    config: {
        store: 'ListElement',
        title: 'Agenda 2.0',
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
        itemTpl: getTemplate()
    }
});


function getTemplate() {
    return getSessionListTemplate();
}
