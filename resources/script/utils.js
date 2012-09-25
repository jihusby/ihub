function getTimeFromTimestamp(d) {
    return (d.getHours()>9? d.getHours(): "0"+ d.getHours()) + ":" + (d.getMinutes()>9? d.getMinutes(): "0"+ d.getMinutes());
}

function toggleSession(id) {
    if (isEventSaved(id)) {
        removeItem(id);
        return false;
    } else {
        addItem(id);
        return true;
    }
}

function addItem(currentSessionId) {
    if ((null == Ext.getStore("AttendingSession").findRecord('externalId', currentSessionId)) &&
            (null != Ext.getStore("Session").findRecord('id', currentSessionId))) {
        var eventStore = Ext.getStore("AttendingSession");
        eventStore.add(getListElementCopy(Ext.getStore("Session").findRecord('id', currentSessionId)));
        eventStore.sync();
        eventStore.sort([
            {property: 'timestamp', direction: 'ASC'}
        ]);
    }
}

function saveContentFromExternal(storeName) {
    var result = false;
    if(Ext.getStore("External" + storeName).getCount()>0){ // External store exists
        var storeManager = new StoreManager();
        storeManager.store = storeName;
        if(storeName === "Session"){
            storeManager.recordType = "App.model.ListElement";
        }else if(storeName === "Sponsor") {
            storeManager.recordType = "App.model.LinkElement";
        }else{
            storeManager.recordType = "App.model.ViewContent";
        }
        result = storeManager.saveRecordToLocalStore();
    }
    return result;
}

function removeItem(id){
    var eventStore = Ext.getStore("AttendingSession");
    var record = eventStore.findRecord('externalId', id)
    if(record){
        eventStore.remove(record);
        eventStore.sync();
        eventStore.sort([
            {property: 'timestamp', direction: 'ASC'}
        ]);
    }
}

function isEventSaved(id) {
    return (Ext.getStore("AttendingSession").findRecord('externalId', id) != null);
}

function getDateWithWeekdayFromDateString(dateString) {
    var myDays= ["Søndag", "Mandag","Tirsdag","Onsdag","Torsdag","Fredag","Lørdag"];
    var d = dateString.substring(0,2);
    var m = dateString.substring(3,5);
    var y = dateString.substring(6,10);
    var date = new Date(Date.parse(m+"/"+d+"/"+y,"MM/dd/yyyy"));
    return myDays[date.getDay()] + " " + dateString;
}

function showPopup(image, imageTitle) {
    var popup = new Ext.Panel({
        floating: true,
        modal: true,
        width: 320,
        height: 420,
        html: '<body style="margin: 0px 0px 0px 0px; padding: 0px 0px 0px 0px;"><img src="resources/images/maps/'+image+'" style="height:100%; width:100%"></body>',
        items: [{
            xtype: 'toolbar',
            title: imageTitle,
            docked: 'top',
            items: [{
                xtype: 'spacer'
            },{
                text: 'Lukk',
                handler: function(){
                    popup.hide();
                }
            }]
        }]
    });
    
    return popup;
}
