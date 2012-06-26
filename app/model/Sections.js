Ext.define('App.model.Sections', {
    extend: 'Ext.data.Model',
    
    config: {
        fields: [
            'id', 
            'dateCreated', 
            'start',
            'timestamp',
            'startTime', 
            'name', 
            'place', 
            'ingress', 
            'description', 
            'items'
        ]
    }
});