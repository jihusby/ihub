Ext.define('App.view.SessionDetail', {
    extend: 'Ext.Panel',
    xtype: 'sessiondetail',
    requires: [
        'Ext.Button'
    ],

    config: {
        scrollable: 'vertical',
        styleHtmlContent: true, 
        title: 'Details',
        maxWidth: 750,
        xtype: 'dataview',
        ui: 'light',
        
        tpl: '<div class="textBlock">' + 
            '<div class="contentText"><b>{name}</b></div>' + 
            '<div class="contentText">{ingress}</div>' + 
            '<div class="contentText"><b>{place} kl. {startTime} </b></div>' + 
            '<div class="contentText">{description}</div>' + 
            
            '<input type="image" id="star" src="resources/icons/star_passive.png" onClick="saveSession({id});" value="Legg til i huskeliste" /> '+
            '</div>'
    },

    init: function(){
        console.log("init: function");
    }

});



function saveSession(id) {
    if (isEventSaved(id)) {
        removeItem(id);
        document.getElementById("star").src="resources/icons/star_active.png";
    } else {
        addItem(id);
        document.getElementById("star").src="resources/icons/star_passive.png";
    }
}

function isEventSaved(id) {
    return (getStoreItem(id, "Events") != null);
}
