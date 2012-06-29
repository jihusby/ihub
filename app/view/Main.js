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
                items: [
                    {
                        xtype: 'info'
                    }
                ]
            },

            {
                id: 'sessions',
                title: 'Agenda',
                iconCls: 'bookmarks',
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