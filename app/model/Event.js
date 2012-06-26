Ext.define("App.model.Event", {
    extend: "Ext.data.Model",
    
    config: {
        idProperty: 'id',
        fields: [
            { name: 'id', type: 'int' },
            { name: 'externalId', type: 'string' },
            { name: 'start', type: 'string' },
            { name: 'startTime', type: 'string' },
            { name: 'timestamp', type: 'string' },
            { name: 'dateCreated', type: 'string' },
            { name: 'name', type: 'string' },
            { name: 'place', type: 'string' },
            { name: 'ingress', type: 'string' },
            { name: 'description', type: 'string' },
            { name: 'items', type: 'string' },
            { name: 'leaf', type: 'boolean' }
        ],
        validations: [
            { type: 'presence', field: 'id' },
            { type: 'presence', field: 'name', message: 'Vennligst fyll inn navn.' }
        ]
    }
});