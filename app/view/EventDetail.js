Ext.define('App.view.EventDetail', {
    extend: 'Ext.Panel',
    xtype: 'eventdetail',
    requires: [
        'Ext.Button'
    ],
    config: {
        scrollable: 'vertical',
        styleHtmlContent: true, 
        title: 'Details',
        maxWidth: 750,
        xtype: 'dataview',
        ui: 'light'
    }
});
