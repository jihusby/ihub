Ext.define("App.model.Travel", {
    extend: "Ext.data.Model",
    
    config: {
        idProperty: 'id',
        fields: [
            { name: 'id', type: 'string' },
            { name: 'item0', type: 'string' },
            { name: 'item1', type: 'string' },
            { name: 'item2', type: 'string' },
        ]
    }
});