Ext.define("App.view.SponsorList", {
    extend: "Ext.List",
    xtype: 'sponsorlist',

    requires: [
        'App.store.Sponsors.Sponsor',
        'App.model.ListElement'
    ],

    config: {
        store: 'Sponsor',
        title: 'Sponsorer',
        loadingText: "Henter sponsorliste...",
        scrollable: 'vertical',
        indexBar: false,
        emptyText:
                '</pre>'+
                '<div class="session-list-empty-text">Listen er tom.</div>'+
                '<pre>',
        onItemDisclosure: false,
        grouped: true,
        iconCls: "button",
        itemTpl: getTemplate()
    }
});


function getTemplate() {
    return getSponsorListTemplate();
}
