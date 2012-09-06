
Ext.define('App.controller.Main', {
    extend: 'Ext.app.Controller',
    
    requires: [
        'App.view.SessionDetail',
        'App.view.SessionList',
        'App.view.Main',
        'App.view.Info',
    ],

    config: {
        refs: {
            mainView: 'mainview',
            info: 'info',
            sessionListContainer: 'sessionlistcontainer',
            eventListContainer: 'eventlistcontainer'
        },

        control: {
            'sessionlist': {
                disclose: 'onSessionDetailCommand'
            },
            'eventlist': {
                disclose: 'onEventDetailCommand'
            },
            'info' : {
                painted: 'onInfoPaintedCommand'
            }
        }

    },

    slideLeftTransition: {type: 'slide', direction: 'left'},
    slideRightTransition: {type: 'slide', direction: 'right'},


    launch: function() {
        this.callParent(arguments);
        var main = this.getMainView();
        
            
        var pollExternalStores = function(num) {
            var task = Ext.create('Ext.util.DelayedTask', function() {
                Ext.getStore("ExternalInfos").load();
                var result = "";
                Ext.onReady(function(){
                    result = saveContentFromExternal("Infos", "ExternalInfos");
                });
                setBadgeText(main.getTabBar().items.items[1], result);
                pollExternalStores.call(this, num+1);
                
            }, this);

            task.delay(3000);
        };

        pollExternalStores(1);
            
        
    },

    init: function() {
        this.callParent(arguments);
    },

    onInfoPaintedCommand: function(obj) {
        var main = this.getMainView();
        clearBadgeText(main.getTabBar().items.items[1]);
        
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

function setBadgeText(item, updated) {
    if(updated){
        console.log("setBadgeText:" + updated + " on " + item.id);
        item.setBadgeText("NB!");
    }
}
function clearBadgeText(item) {
    item.setBadgeText("");
}

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
  
  
