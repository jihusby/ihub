function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getUniqueEventId() {
    return (new Date().getTime() + (getRandomInt(0, 100)).toString());

}

function getTimeFromTimestamp(d) {
    return (d.getHours()>9? d.getHours(): "0"+ d.getHours()) + ":" + (d.getMinutes()>9? d.getMinutes(): "0"+ d.getMinutes());
}

function getEventFromSession(session) {
    var event = Ext.create("App.model.Event", {
        externalId: session.data.id,
        dateCreated: session.data.dateCreated,
        place: session.data.place,
        start: session.data.start,
        timestamp: session.data.timestamp,
        startTime: session.data.startTime,
        name: session.data.name,
        ingress: session.data.ingress,
        description: session.data.description
    });
    return event;
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
    if ((null == Ext.getStore("Events").findRecord('externalId', currentSessionId)) &&
            (null != Ext.getStore("Sessions").findRecord('id', currentSessionId))) {
        var eventStore = Ext.getStore("Events");
        eventStore.add(getEventFromSession(Ext.getStore("Sessions").findRecord('id', currentSessionId)));
        eventStore.sync();
        eventStore.sort([
            {property: 'timestamp', direction: 'ASC'}
        ]);
    }
}


function removeItem(id){
    var record = Ext.getStore("Events").findRecord('externalId', id)
    var eventStore = Ext.getStore("Events");
    eventStore.remove(record);
    eventStore.sync();
    eventStore.sort([
        {property: 'timestamp', direction: 'ASC'}
    ]);
}

function isEventSaved(id) {
    return (Ext.getStore("Events").findRecord('externalId', id) != null);
}

function isUpcomingEvent(node){
    console.log("node is " + node);
    //return node.data.timestamp >= new Date().getTime();
    return true;
}

