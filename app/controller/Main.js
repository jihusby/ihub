
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
        console.log("onEventDetailCommand invoked");
        this.getEventListContainer().push(getEventDetail(record.data));
    }
});

function getSessionDetail(record) {
    var btnText = isEventSaved(record.id)?"Fjern fra huskeliste":"Legg til i huskeliste";
    this.setMainWindow();
    return {
            xtype: 'sessiondetail',
            title: record.startTime,
            data: record,
            tpl: getSessionDetailTemplate(btnText)
    }
}

function getEventDetail(record) {
    return {
            xtype: 'sessiondetail',
            title: record.startTime + " - " + record.endTime,
            data: record,
            tpl: getEventDetailTemplate()
    }
}

function showPopupMap(image, imageTitle){
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
    
    popup.show();
}


  
  
