Ext.define("App.model.LinkElement", {
    extend: "Ext.data.Model",
    
    config: {
        idProperty: 'id',
        fields: [
            { name: 'id', type: 'string' },
            { name: 'externalId', type: 'string' },
            { name: 'dateCreated', type: 'string' },
            { name: 'title', type: 'string' },
            { name: 'description', type: 'string' },
            { name: 'longUrl', type: 'string' },
            { name: 'shortUrl', type: 'string' },
            { name: 'icon', type: 'string' },
        ]
    }
});