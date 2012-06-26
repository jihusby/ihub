function logEvent(event, message) {
    console.log("-------------------- devUtils.logEvent invoked from " + arguments.callee.caller.name + " --------------------");
    console.log(message);
    console.log(event.data.name + "(" + event.data.externalId + ")");
    console.log("external id: " + event.data.id);
    console.log("created: " + event.data.dateCreated + ", start: " + event.data.start);
    console.log("place: " + event.data.place);
    console.log("description: " + event.data.description);
    console.log("leaf: " + event.data.leaf);
}
