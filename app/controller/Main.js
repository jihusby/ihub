
Ext.define('App.controller.Main', {
    extend: 'Ext.app.Controller',
    
    requires: [
        'App.view.SessionDetail'
        //'Ext.MessageBox'
    ],

    config: {
        refs: {
            mainView: 'mainview',
            sessionListContainer: 'sessionlistcontainer',
            eventListContainer: 'eventlistcontainer'
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
    var value = isEventSaved(record.id)?"Fjern fra huskeliste":"Legg til i huskeliste";
    this.setMainWindow();
    return {
            xtype: 'sessiondetail',
            title: record.startTime,
            data: record,
            tpl:
                '<input value="'+value+'" id="btn" class="buttonWide" type="button" onClick="saveSessionDetail({id});" />' + 
                '<div class="textBlock">' + 
                '<div class="contentInfo">{place} kl. {startTime}</div>' + 
                '<div class="contentTitle">{name}</div>' + 
                '<div class="contentIngress">{ingress}</div>' + 
                '<div class="contentText">{description}</div>' + 
                '</div>'
    }
}

function getEventDetail(record) {
    return {
            xtype: 'sessiondetail',
            title: record.startTime,
            data: record,
            tpl:'<div class="textBlock">' + 
                '<div class="contentInfo">{place} kl. {startTime}</div>' + 
                '<div class="contentTitle">{name}</div>' + 
                '<div class="contentIngress">{ingress}</div>' + 
                '<div class="contentText">{description}</div>' + 
                '</div>'
    }
}

  
  
