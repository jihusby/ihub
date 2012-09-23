var store = new function() {
    this.localStore = Ext.getStore("Info");
    this.externalStore = Ext.getStore("ExternalInfo");
    this.recordType = "App.model.ViewContent";
    this.recordItem = "item0";
    this.recordId = "1";
    this.record = "";
    
    this.saveRecordToLocalStore = function(){
        var localRecord = this.localStore.findRecord(this.recordItem, this.recordId);
        var externalRecord = this.externalStore.findRecord(this.recordItem, this.recordId);
        if(!isRecordEqual(localRecord, externalRecord)){
            this.localStore.remove(localRecord);
            this.localStore.add(duplicateRecord(externalRecord));
            this.localStore.sync();
            console.log("TIME FOR A CHANGE");
            return true;

        }
        console.log("returnung false...");
        return false;
    };
    
    function duplicateRecord(record) {
        return Ext.create(this.recordType, {
            item0: record.data.item0,
            item1: record.data.item1,
            item2: record.data.item2,
            item3: record.data.item3
        });
    }
    
    
    
    
}



