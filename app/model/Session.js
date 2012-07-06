Ext.define("App.model.Session", {
    extend: "Ext.data.Model",
    
    config: {
        idProperty: 'id',
        fields: [
            { name: 'id', type: 'int' },
            { name: 'externalId', type: 'int' },
            { name: 'dateCreated', type: 'string' },            
            { name: 'place', type: 'string' },
            { name: 'start', type: 'string' },
            { name: 'timestamp', type: 'string' },
            { name: 'startTime', type: 'string' },
            { name: 'name', type: 'string' },
            { name: 'ingress', type: 'string' },
            { name: 'description', type: 'string' }
        ]
    }
});