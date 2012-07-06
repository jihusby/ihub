Ext.define('App.view.EventDetail', {
    extend: 'Ext.Panel',
    xtype: 'eventdetail',
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
        tpl:'<div class="textBlock">' + 
            '<div class="contentInfo">{place} kl. {startTime}</div>' + 
            '<div class="contentTitle">{name}</div>' + 
            '<div class="contentIngress">{ingress}</div>' + 
            '<div class="contentText">{description}</div>' + 
            
            '</div>'
    },

    initialize: function(){
        //console.log("initialize EventDetail: this.id is " + this.eventId);
        // TODO: Set initial value on the save button based on event list
    }

});

function removeEventDetail(id) {
    console.log("removeEvent in detail");
    toggleSession(id);
}

