Ext.define('App.view.Sections', {
    extend: 'Ext.dataview.NestedList',    
    xtype: 'sectionslist',
    id: 'mainlist',
    requires: [
        'App.store.Sections',
        'App.view.Detail',
        'Ext.TitleBar'
    ],
    
    config: {
        title: 'Agenda',
        useTitleAsBackText: false,
        onItemDisclosure: true,
        grouped: true,
        iconCls: "button",
        store: 'Sections',
        detailCard: {
            xtype: 'detailcard'
        },
        zIndex: 0
    },
    
//    getTitleTextTpl: function() {
//        return '<div>hmm {name}</div>';
//    },
    getItemTextTpl: function(node) {
        return  '<div class="list-item-title">{startTime} {name}</div>' +
                '<div class="list-item-description">{ingress}</div>';
    },
    
    getSubList: function (node) {
        console.log("getSubList called");
        var items = this.items,
        list,
        itemId = node.internalId;


        if (items && items.get) {
            list = items.get(itemId);
        }


        //if (list) {
            /*NOTE: have a condition here because I only want the middle nested list to be grouped 
            remove this if statement and use only the body if you want ALL nested lists to be grouped
            */
            if (typeof node.isRoot == 'undefined' && !node.childNodes[0].leaf) {
                //list.store.groupField = 'Text';
                list.store.getGroupString = function (record) {
                /*IMPORTANT!! depending on what your data type is, this line may need to be changed, 
                but what you want is to return ONLY THE FIRST LETTER of your text
                */


                return record.data.Text[0];
                };
            list.grouped = true;
            list.indexBar = true;
        //}
        return list;
        } else {
            var config = this.getListConfig(node);

            /*NOTE: have a condition here because I only want the middle nested list to be grouped 
            remove this if statement and use only the body if you want ALL nested lists to be grouped
            */
            if (typeof node.isRoot == 'undefined' && !node.childNodes[0].leaf) {
                config.store.getGroupString = function (record) {
                /*IMPORTANT!! depending on what your data type is, this line may need to be changed, 
                but what you want is to return ONLY THE FIRST LETTER of your text
                */
                return record.data.Text[0];
                };
                config.grouped = true;
                config.indexBar = true;
            }
            return config;
        }
    }    
});