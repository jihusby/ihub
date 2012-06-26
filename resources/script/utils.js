function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getUniqueEventId() {
    return (new Date().getTime() + (getRandomInt(0, 100)).toString());

}

function getTimeFromTimestamp(d) {
    return (d.getHours()>9? d.getHours(): "0"+ d.getHours()) + ":" + (d.getMinutes()>9? d.getMinutes(): "0"+ d.getMinutes());
}

function getEmptyEvent() {
    var event = Ext.create("App.model.Event", {
        externalId: "",
        dateCreated: new Date().getTime(),
        place: "",
        //start: new Date().getTime(),
        start: new Date(),
        //timestamp: 
        name: "",
        ingress: "",
        description: "",
        leaf: true
    });
    return event;
}

function getEventFromSection(section) {
    var d = new Date();
    d.setTime(section.data.start);

    var event = Ext.create("App.model.Event", {
        externalId: section.data.id,
        dateCreated: section.data.dateCreated,
        place: section.data.place,
        start: section.data.start,
        timestamp: section.data.timestamp,
        startTime: section.data.startTime,
        name: section.data.name,
        ingress: section.data.ingress,
        description: section.data.description,
        leaf: section.data.leaf
    });
    return event;
}

function saveEvent(currentEvent) {
    var errors = currentEvent.validate();
    currentEvent.data.id = getUniqueEventId();

    if (!errors.isValid()) {
        console.log("Error saving event: " + errors);
        alert('Wait!', errors.getByField("name")[0].getMessage(), Ext.emptyFn);
        currentEvent.reject();
        return;
    }

    var eventStore = Ext.getStore("Events");
    if (null == eventStore.findRecord('externalId', currentEvent.data.externalId)) {
        eventStore.add(currentEvent);
    }
    eventStore.sync();
    eventStore.sort([
        {property: 'timestamp', direction: 'ASC'}
    ]);
}

function deleteEvent(currentEvent) {
    var eventStore = Ext.getStore("Events");

    eventStore.remove(currentEvent);
    eventStore.sync();
    eventStore.sort([
        {property: 'timestamp', direction: 'ASC'}
    ]);
}

function getFormattedDetailCard(record) {
    return '<div class="textBlock"><div class="header">'+
            record.get('name') + '</div><div class="contentText">' + 
            '<b>' + record.get('start') + '&nbsp;' + record.get('startTime') + '</b><br>' + 
            record.get('description') + '</div>';
}

function isUpcomingEvent(node){
    console.log("node is " + node);
    //return node.data.timestamp >= new Date().getTime();
    return true;
}

function removeItem(id){
    var record = Ext.getStore("Events").findRecord('id', id)
    this.deleteEvent(record);
}