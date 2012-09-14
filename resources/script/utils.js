function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

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
    if ((null == Ext.getStore("AttendingListElement").findRecord('externalId', currentSessionId)) &&
            (null != Ext.getStore("ListElement").findRecord('id', currentSessionId))) {
        var eventStore = Ext.getStore("AttendingListElement");
        eventStore.add(getListElementCopy(Ext.getStore("ListElement").findRecord('id', currentSessionId)));
        eventStore.sync();
        eventStore.sort([
            {property: 'timestamp', direction: 'ASC'}
        ]);
    }
}

function saveContentFromExternal(localStoreName, externalStoreName) {
    
    var result = false;
    if(Ext.getStore(externalStoreName).getCount()>0){
        if(localStoreName === "ListElement"){
            result = saveListObjects(localStoreName);
        }else{
            result = saveContentObject(Ext.getStore(externalStoreName).findRecord('id', 1), localStoreName);
        }
    }
    return result;
}

function saveContentObject(obj, objectName){
    var localStore = Ext.getStore(objectName);
    var localRecord = localStore.findRecord('item0', "1");
    var externalStore = Ext.getStore("External"+objectName);
    var externalRecord = externalStore.findRecord('item0', "1");
    var result = false;
    if(!isRecordEqual(localRecord, externalRecord)){
        localStore.removeAll();
        localStore.add(getRecordCopy(obj, objectName));
        localStore.sync();
        result = true;
    }
    return result;
}

function saveListObjects(objectName){
    var localStore = Ext.getStore(objectName);
    var externalStore = Ext.getStore("External"+objectName);
    var result = false;
    externalStore.each(function(record,idx){
        var localRecord = localStore.findRecord('externalId', record.get('id'));
        if(!isListElementEqual(localRecord, record)){
            if(localRecord){
                localStore.remove(localRecord);
                localStore.sync();
            }
            localStore.add(getListElementCopy(record));
            localStore.sync();
            result = true;
        }
    });
    return result;
}


function isRecordEqual(record1, record2){
    if(record1 && record2){
        return record1.data.item0 === record1.data.item0 &&
            record1.data.item1 === record2.data.item1 &&
            record1.data.item2 === record2.data.item2 &&
            record1.data.item3 === record2.data.item3;
    }
    return false;
}

function getRecordCopy(record, type) {
    return Ext.create("App.model.ViewContent", {
        item0: record.data.item0,
        item1: record.data.item1,
        item2: record.data.item2,
        item3: record.data.item3
    });
}

function isListElementEqual(record1, record2){
    if(record1 && record2){
        return record1.data.place === record2.data.place &&
            record1.data.start === record2.data.start &&
            record1.data.startTime === record2.data.startTime &&
            record1.data.endTime === record2.data.endTime &&
            record1.data.name === record2.data.name &&
            record1.data.speaker === record2.data.speaker &&
            record1.data.ingress === record2.data.ingress &&
            record1.data.description === record2.data.description;
    }
    return false;
}

function getListElementCopy(element) {
    return Ext.create("App.model.ListElement", {
        externalId: element.data.id,
        dateCreated: element.data.dateCreated,
        place: element.data.place,
        start: element.data.start,
        timestamp: element.data.timestamp,
        startTime: element.data.startTime,
        endTime: element.data.endTime,
        name: element.data.name,
        speaker: element.data.speaker,
        ingress: element.data.ingress,
        description: element.data.description
    });
}


function removeItem(id){
    var eventStore = Ext.getStore("AttendingListElement");
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
    return (Ext.getStore("AttendingListElement").findRecord('externalId', id) != null);
}

function isUpcomingEvent(node){
    console.log("node is " + node);
    //return node.data.timestamp >= new Date().getTime();
    return true;
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
