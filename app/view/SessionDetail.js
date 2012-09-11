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
    console.log("saveSessionDetail invoked");
    var hasAddedToEventList = toggleSession(id);
    setListButtonText(hasAddedToEventList);
    setImageSource(id);
}

function setListButtonText(removeFromList){
    if(document.getElementById("btn")) {
        if(removeFromList){
            document.getElementById("btn").value = "Fjern fra huskeliste";
        }else {
            document.getElementById("btn").value = "Legg til i huskeliste";
        }
    }
}

function setImageSource(id){
    var saved = isEventSaved(id) ? "color" : "gray";
    setSource(id, saved);
}

function setSource(id, color){
    if(document.getElementById("img"+id)){
        document.getElementById("img"+id).src = "resources/icons/star_"+ color +"_small.png";
    }
}


