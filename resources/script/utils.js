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
        endTime: session.data.endTime,
        name: session.data.name,
        speaker: session.data.speaker,
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
        saveContentFromExternal("Infos", "ExternalInfos");
    }
}

function saveContentFromExternal(localStoreName, externalStoreName) {
    console.log("1 saveContentFromExternal("+localStoreName+", "+externalStoreName+")");
    var content = Ext.getStore(externalStoreName).findRecord('id', 1);
    if(content!==null){
        console.log("2 saveContentFromExternal:content not null");
        var localStore = Ext.getStore(localStoreName);
        localStore.add(content);
        localStore.sync();
    }
    console.log("3 saveContentFromExternal");
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

function getEventListTemplate() {
    return '<input class="x-list-star" type="image" src="resources/icons/star_color_small.png" onClick="removeEvent({externalId});" value="Fjern" />'+
                '<div class="x-list-content">'+
                '<div class="list-item-title">{name}</div>'+
                '<div class="list-item-description">{startTime} - {speaker}</div>'+
                '<div class="list-item-description">{ingress}</div>'+
                '</div>';
}

function getEventDetailTemplate() {
    return '<div class="textBlock">' + 
                '<div class="contentInfo"><input type="button" onClick="showPopupMap(\'{place}.jpg\', \'{place}\').show();" value="{place}"></a></div>' + 
                '<input class="x-detail-star" type="image" src="resources/icons/star_color.png" onClick="removeEvent({externalId});" value="Fjern" />'+
                '<div class="contentTitle">{name}</div>' + 
                '<div class="contentIngress">{ingress}</div>' + 
                '<div class="contentText">{description}</div>' + 
                '</div>';
}

function getSessionListTemplate() {
    return '<input class="x-list-star" id="img{id}" type="image" src="resources/icons/star_gray_small.png" onClick="saveSessionDetail(\'{id}\');" onLoad="setImageSource({id});" />'+
                '<image id="img2{id}" src="resources/icons/star_gray_small.png" onLoad="setImageSource({id});" style="display:none;" />'+
                '<div class="x-list-content">'+
                '<div class="list-item-title">{name}</div>'+
                '<div class="list-item-description">{startTime} - {speaker}</div>'+
                '<div class="list-item-description">{ingress}</div>'+
                '</div>';
}

function getSessionDetailTemplate(btnText) {
    return '<input value="'+btnText+'" id="btn" class="buttonWide" type="button" onClick="saveSessionDetail({id});" />' + 
                '<input class="buttonWide" type="button" onClick="showPopupMap(\'{place}.jpg\', \'{place}\').show();" value="{place}" />'+
                '<div class="textBlock">' + 
                '<div class="contentInfo">{place} kl. {startTime}</div>' + 
                '<div class="contentTitle">{name}</div>' + 
                '<div class="contentIngress">{ingress}</div>' + 
                '<div class="contentText">{description}</div>' + 
                '</div>';
}


