Ext.define("App.view.Main", {
    extend: 'Ext.tab.Panel',
    id: 'mainview',
    xtype: 'mainview',
    
    config: {
        id: "tabBar",
        tabBarPosition: 'bottom',
        defaults: {
            layout: 'card'
        },

        items: [
            {
                id: 'Hotel',
                title: 'Rica',
                iconCls: 'home',
                onInitialize: function () {
                    setMainWindow(0);
                }, 
                listeners: {
                    activate : function() {
                        setMainWindow(0);
                    }
                },
                items: [
                    {
                        xtype: 'hotel'
                    }
                    
                ]
            },
            {
                id: 'info',
                title: 'XP2010',
                iconCls: 'info',
                listeners: {
                    activate : function() {
                        setMainWindow(1);
                    }
                },
                items: [
                    {
                        xtype: 'info'
                    }
                ]
            },

            {
                id: 'travel',
                title: 'Reiseinfo',
                iconCls: 'search',
                listeners: {
                    activate : function() {
                        setMainWindow(2);
                    }
                },
                items: [
                    {
                        xtype: 'travel'
                    }
                ]
            },

            {
                id: 'agenda',
                title: 'Agenda',
                iconCls: 'time',
                listeners: {
                    activate : function() {
                        setMainWindow(3);
                    }
                },
                items: [
                    {
                        xtype: 'sessionlistcontainer'
                    }
                ]
            },

            {
                id: 'eventlist',
                title: 'Min huskeliste',
                iconCls: 'star',
                listeners: {
                    activate : function() {
                        setMainWindow(4);
                    }
                },
                items: [
                    {
                        xtype: 'eventlistcontainer'
                    }
                ]
            }            
        ]
    }
});

/**
 * Fix for Bug TOUCH-2665 (Sencha Touch 2.0.1 RC)
 * must be removed in next release
 */
Ext.define('App.Tabfix', {
    override: 'Ext.tab.Panel',
    doTabChange: function(tabBar, newTab) {
        this.setActiveItem(tabBar.indexOf(newTab));
    }
});

function setMainWindow(elementIndex){
    
    /* FIXME: Admin/refresh doesn't work now!
     * 
     */
    
    if(parent.document.getElementById("motherf")!==null) {
        var elements = new Array("hotel", "info", "travel", "agenda", "favorites");
        for(var i=elements.length-1; i>=0; i--) {
            var value = elements[i];
            parent.document.getElementById(value).style.display = "none";
            parent.document.getElementById(value).enabled = "false";
            parent.document.forms[i].disabled=true;
            
        }    
        if(elementIndex >= 0) {
            if(parent.document.forms[elementIndex]){
                parent.document.forms[elementIndex].disabled=false;
                parent.document.getElementById(elements[elementIndex]).style.display = "block";
            }
        }
    }
}
