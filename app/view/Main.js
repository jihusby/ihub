Ext.define("App.view.Main", {
    extend: 'Ext.tab.Panel',
    id: 'mainview',
    
    config: {
        tabBarPosition: 'bottom',
        defaults: {
            layout: 'card'
            /*layout: {
                type: 'auto',
                align: 'stretch'
            }*/
            
        },

        items: [
            {
                id: 'home',
                title: 'Rica',
                iconCls: 'home',
                onComplete: function () {
                    setMainWindow(0);
                }, 
                listeners: {
                    activate : function() {
                        setMainWindow(0);
                    }
                },
                items: [
                    {
                        xtype: 'homepage'
                    }
                    
                ]
            },
            {
                id: 'info',
                title: 'XP2010',
                iconCls: 'team',
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
                id: 'agenda',
                title: 'Agenda',
                iconCls: 'bookmarks',
                listeners: {
                    activate : function() {
                        setMainWindow(2);
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
    if(parent.document.getElementById("hotel")) {
        var elements = new Array("hotel", "info", "agenda");
        for(var i=elements.length-1; i>=0; i--) {
            var value = elements[i];
            parent.document.getElementById(value).style.display = "none";
            parent.document.getElementById(value).enabled = "false";
            parent.document.forms[i].disabled=true;
        }    
        parent.document.forms[elementIndex].disabled=false;
        parent.document.getElementById(elements[elementIndex]).style.display = "block";
    }
}
