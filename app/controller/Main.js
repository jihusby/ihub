
Ext.define('App.controller.Main', {
    extend: 'Ext.app.Controller',
    
    requires: [
        'App.view.SessionDetail',
        'App.view.EventDetail',
        'Ext.MessageBox'
    ],
    
    config: {
        refs: {
            mainView: 'mainview',
            sessionListContainer: 'sessionlistcontainer',
            eventListContainer: 'eventlistcontainer',
            eventEditor: 'eventeditor'
        },

        control: {
            'sessionlist': {
                disclose: 'onSessionDetailCommand'
            },
            'eventlist': {
                disclose: 'onEventDetailCommand'
            }
        }
    },

    slideLeftTransition: {type: 'slide', direction: 'left'},
    slideRightTransition: {type: 'slide', direction: 'right'},

    launch: function() {
        this.callParent(arguments);
        Ext.getStore("Events").load();
        Ext.getStore("Sessions").load();
    },

    init: function() {
        console.log("init");
        this.callParent(arguments);
    },

    onSessionListCommand: function() {
        Ext.Viewport.animateActiveItem(this.getMainView(), this.slideRightTransition);
    },
    
    onSessionDetailCommand: function(list, record) {
        this.getSessionListContainer().push(getSessionDetail(record.data));
    },

    onEventListCommand: function() {
        Ext.Viewport.animateActiveItem(this.getMainView(), this.slideRightTransition);
    },

    onEventDetailCommand: function(list, record) {
        this.getEventListContainer().push(getEventDetail(record.data));
    }
});

function getSessionDetail(record) {
    var value = isEventSaved(record.id)?"Glem":"Husk";
    return {
            xtype: 'sessiondetail',
            data: record,
            tpl:'<div class="textBlock">' + 
                '<div class="contentInfo">{place} kl. {startTime} &nbsp; <input value="'+value+'" id="btn" class="buttonRight" type="button" onClick="saveSessionDetail({id});" /></div>' + 
                '<div class="contentTitle">{name}</div>' + 
                '<div class="contentIngress">{ingress}</div>' + 
                '<div class="contentText">{description}</div>' + 
                '</div>'
    }
}

function getEventDetail(record) {
    return {
            xtype: 'sessiondetail',
            data: record,
            tpl:'<div class="textBlock">' + 
                '<div class="contentInfo">{place} kl. {startTime} &nbsp; <input value="Fjern" id="btn" class="buttonRight" type="button" onClick="removeItem({externalId});" /></div>' + 
                '<div class="contentTitle">{name}</div>' + 
                '<div class="contentIngress">{ingress}</div>' + 
                '<div class="contentText">{description}</div>' + 
                '</div>'
    }
}
