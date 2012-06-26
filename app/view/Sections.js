Ext.define('App.view.Sections', {
    extend: 'Ext.dataview.NestedList',    
    xtype: 'sectionslist',
    id: 'mainlist',
    requires: [
        'App.store.Sections',
        'App.view.Detail',
        'Ext.TitleBar'
    ],
    
    config: {
        title: 'Agenda',
        useTitleAsBackText: false,
        onItemDisclosure: true,
        store: 'Sections',
        detailCard: {
            xtype: 'detailcard'
        },
        zIndex: 0
    },
    
//    getTitleTextTpl: function() {
//        return '<div>hmm {name}</div>';
//    },
    getItemTextTpl: function(node) {
        return  '<div class="list-item-title">{start} {name}</div>' +
                '<div class="list-item-description">{ingress}</div>';
    }
});