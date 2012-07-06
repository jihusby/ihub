Ext.define('App.view.SessionDetail', {
    extend: 'Ext.Panel',
    xtype: 'sessiondetail',
    requires: [
        'Ext.Button'
    ],
    config: {
        scrollable: 'vertical',
        styleHtmlContent: true, 
        maxWidth: 750,
        xtype: 'dataview',
        ui: 'light'
    }
});

function saveSessionDetail(id) {
    if(toggleSession(id)){
        document.getElementById("btn").value = "Fjern fra huskeliste";
    }else {
        document.getElementById("btn").value = "Legg til i huskeliste";
    }
}

