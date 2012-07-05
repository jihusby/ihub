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
        tpl:'<div class="textBlock">' + 
            '<div class="contentInfo">{place} kl. {startTime} &nbsp; <input class="button" type="button" id="detail_{id}" src="resources/icons/star_gray.png" onClick="saveSessionDetail({id});" value="Husk" /></div>' + 
            '<div class="contentTitle">{name}</div>' + 
            '<div class="contentIngress">{ingress}</div>' + 
            '<div class="contentText">{description}</div>' + 
            
            '</div>'
    },

    initialize: function(){
        console.log("initialize: this.id is " + this.id);
        // TODO: Set initial value on the save button based on event list
    }

});

function saveSessionDetail(id) {
    console.log("saveSession in detail");
    if(toggleSession(id)){
        document.getElementById("detail_"+id).value = "Glem";
    }else {
        document.getElementById("detail_"+id).value = "Husk";
    }
}

