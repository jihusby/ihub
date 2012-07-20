Ext.define("App.model.Event", {
    extend: "Ext.data.Model",
    
    config: {
        idProperty: 'id',
        fields: [
            { name: 'id', type: 'string' },
            { name: 'externalId', type: 'string' },
            { name: 'dateCreated', type: 'string' },
            { name: 'place', type: 'string' },
            { name: 'start', type: 'string' },
            { name: 'timestamp', type: 'string' },
            { name: 'startTime', type: 'string' },
            { name: 'endTime', type: 'string' },
            { name: 'name', type: 'string' },
            { name: 'speaker', type: 'string' },
            { name: 'ingress', type: 'string' },
            { name: 'description', type: 'string' }
        ],
        validations: [
            { type: 'presence', field: 'id' },
            { type: 'presence', field: 'name', message: 'Vennligst fyll inn navn.' }
        ]        
    }
});