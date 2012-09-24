function StoreManager() {
    this.store = "";
    this.recordType = "";
    this.recordItem = "item0";
    this.recordId = "1";
    
    this.saveRecordToLocalStore = function(){
        var hasRecords = false;
        var localStore = this.store;
        var recordItem = this.recordItem;
        var recordType = this.recordType;
        console.log(localStore + ": " + recordType + " start");
        Ext.getStore("External"+localStore).each(function(record,idx) {
            var localRecord = Ext.getStore(localStore).findRecord(recordItem, record.data.id);
            if(!isRecordEqual(localRecord, record, recordType)){
                Ext.getStore(localStore).remove(localRecord);
                Ext.getStore(localStore).add(duplicateRecord(record, recordType));
                Ext.getStore(localStore).sync();
            }
            hasRecords = true;
        });
        console.log(recordType + " end");
        return hasRecords;
    };
    
    function duplicateRecord(record, type) {
        if(type==="App.model.ViewContent"){
            return Ext.create(type, {
                item0: record.data.item0,
                item1: record.data.item1,
                item2: record.data.item2,
                item3: record.data.item3
            });
        }else if(type==="App.model.ListElement"){
            return Ext.create(type, {
                externalId: record.data.id,
                dateCreated: record.data.dateCreated,
                place: record.data.place,
                start: record.data.start,
                timestamp: record.data.timestamp,
                startTime: record.data.startTime,
                endTime: record.data.endTime,
                name: record.data.name,
                speaker: record.data.speaker,
                ingress: record.data.ingress,
                description: record.data.description
            });
            
        }else if(type==="App.model.LinkElement"){
            return Ext.create(type, {
                externalId: record.data.id,
                dateCreated: record.data.dateCreated,
                title: record.data.title,
                description: record.data.description,
                longUrl: record.data.longUrl,
                shortUrl: record.data.shortUrl,
                icon: record.data.icon
            });
        }
        return false;
    }
    
    function isRecordEqual(record1, record2, type){
        if(record1 && record2){
            if(type==="App.model.ViewContent"){
                console.log("view start");
                return record1.data.item0 === record2.data.item0 &&
                    record1.data.item1 === record2.data.item1 &&
                    record1.data.item2 === record2.data.item2 &&
                    record1.data.item3 === record2.data.item3;
            }else if(type==="App.model.ListElement"){
                console.log("list start");
                return record1.data.place === record2.data.place &&
                    record1.data.start === record2.data.start &&
                    record1.data.startTime === record2.data.startTime &&
                    record1.data.endTime === record2.data.endTime &&
                    record1.data.name === record2.data.name &&
                    record1.data.speaker === record2.data.speaker &&
                    record1.data.ingress === record2.data.ingress &&
                    record1.data.description === record2.data.description;
            }else if(type==="App.model.LinkElement"){
                console.log("link start");
                return record1.data.title === record2.data.title &&
                    record1.data.description === record2.data.description &&
                    record1.data.shortUrl === record2.data.shortUrl &&
                    record1.data.longUrl === record2.data.longUrl;
            }
        }
        return false;
    }
    
    
    
    
    
}



