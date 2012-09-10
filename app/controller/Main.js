
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
            hotel: 'hotel',
            info: 'info',
            travel: 'travel',
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
            'hotel' : {
                paintedEvent: 'onHotelPanelPaintedCommand'
            },
            'info' : {
                paintedEvent: 'onInfoPanelPaintedCommand'
            },
            'travel' : {
                paintedEvent: 'onTravelPanelPaintedCommand'
            }
        }

    },

    slideLeftTransition: {type: 'slide', direction: 'left'},
    slideRightTransition: {type: 'slide', direction: 'right'},


    launch: function() {
        this.callParent(arguments);
        var main = this.getMainView();
        startPollingExternalStores(main);    

    },
    
    init: function() {
        this.callParent(arguments);
    },

    onHotelPanelPaintedCommand: function() {
        this.getMainView().getTabBar().items.items[0].setItemId("Hotel");
        clearBadgeText(this.getMainView().getTabBar().items.items[0], this.getMainView());
    },

    onInfoPanelPaintedCommand: function() {
        clearBadgeText(this.getMainView().getTabBar().items.items[1], this.getMainView());
    },

    onTravelPanelPaintedCommand: function() {
        clearBadgeText(this.getMainView().getTabBar().items.items[2], this.getMainView());
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

function startPollingExternalStores(main){
    var pollExternalStores = function(main) {
        var task = Ext.create('Ext.util.DelayedTask', function() {
            this.pollStore(main, "Hotel", 0);
            this.pollStore(main, "Info", 1);
            this.pollStore(main, "Travel", 2);
            pollExternalStores.call(this, main);

        }, this);

        task.delay(4000);
    };

    pollExternalStores(main);
}

function pollStore(main, store, num) {
    Ext.getStore("External"+store).load();
    var result = false;
    Ext.onReady(function(){
        console.log("polling " + store);
        result = saveContentFromExternal(store, "External"+store);
    });
    setBadgeText(main.getTabBar().items.items[num], result);
}


function setBadgeText(item, updated) {
    if(updated){
        console.log("setBadgeText:" + updated + " on " + item.id);
        item.setBadgeText("NB!");
    }
}
function clearBadgeText(item) {
    if(item){
        item.setBadgeText("");
    }
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
  
  
