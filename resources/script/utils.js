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
        id: session.data.id,
        dateCreated: session.data.dateCreated,
        place: session.data.place,
        start: session.data.start,
        timestamp: session.data.timestamp,
        startTime: session.data.startTime,
        name: session.data.name,
        ingress: session.data.ingress,
        description: session.data.description,
        leaf: session.data.leaf
    });
    return event;
}

function addItem(currentSessionId) {
    var sessionStore = Ext.getStore("Sessions");
    var eventStore = Ext.getStore("Events");
    if (null != sessionStore.findRecord('id', currentSessionId)) {
        if (null == eventStore.findRecord('id', currentSessionId)) {
            eventStore.add(getEventFromSession(sessionStore.findRecord('id', currentSessionId)));
            eventStore.sync();
            eventStore.sort([
                {property: 'timestamp', direction: 'ASC'}
            ]);
        }
    }
}

function isUpcomingEvent(node){
    console.log("node is " + node);
    //return node.data.timestamp >= new Date().getTime();
    return true;
}

function removeItem(id){
    var record = Ext.getStore("Events").findRecord('id', id)
    var eventStore = Ext.getStore("Events");
    eventStore.remove(record);
    eventStore.sync();
    eventStore.sort([
        {property: 'timestamp', direction: 'ASC'}
    ]);
}