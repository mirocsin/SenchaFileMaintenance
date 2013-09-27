Ext.regController('Users', {
    store: App.stores.users,
    index: function() {
        App.views.viewport.reveal('usersList');
    },
    newForm: function() {
        var model = new App.models.User()
        App.views.usersForm.load(model);
        App.views.viewport.reveal('usersForm');
    },
    editForm: function(params) {
        var model = this.store.getAt(params.index);
        App.views.usersForm.load(model);
        App.views.viewport.reveal('usersForm');
    },
    save: function(params) {
        params.data.dtype = "NEW";
        params.record.set(params.data);
        var errors = params.record.validate();

        if (errors.isValid()) {
            this.store.create(params.data);
            this.index();
        } else {
            params.form.showErrors(errors);
        }
    },
    update: function(params) {
        var tmpUser = new App.models.User(params.data),
                errors = tmpUser.validate();

        if (errors.isValid()) {
            if (this.store.data.items[0].data.dtype != "NEW") {
                params.record.set('dtype', 'EDIT');
            }
            params.record.set('name', tmpUser.data.name);
            params.record.set('email', tmpUser.data.email);
            params.record.set('phone', tmpUser.data.phone);
            this.store.sync();

            //params.record.set(params.data);
            //params.record.save();                        
            this.index();
        } else {
            params.form.showErrors(errors);
        }
    },
    remove: function(params) {
        this.store.remove(params.record);
        this.store.sync();
        this.index();
    },
    syncList: function(params) {
        // Users
        var syncData = [];
        this.store.data.each(function(record) {
            if (record.data.dtype === "NEW") {
                syncData.push(record.data);
            }
        });
        var tbldata = Ext.util.JSON.encode(syncData);
        this.syncToServer({tblUsers: tbldata});
        this.syncFromServer(this,params);                  
        Ext.Msg.alert('Status', 'Sync successfully.');
    },
    syncToServer: function(syncData) {
        //Ext.util.JSONP.current = undefined;
        Ext.util.JSONP.current = null;
        Ext.util.JSONP.request({
            url: 'http://127.0.0.1:6101/QueueService/leebeautypromo.asmx/syncToServer',
            params: syncData,
            callback: function(response1) {
                 alert('done1');                 
            }
     });
    },
    syncFromServer: function(othis,params) {
        //Ext.util.JSONP.current = undefined;
        Ext.util.JSONP.current = null;
        Ext.util.JSONP.request({
            url: 'http://127.0.0.1:6101/QueueService/leebeautypromo.asmx/syncFromServer',
            callback: function(response2) {
                othis.clrData();
                for (var i = 0; i < response2.length; i++) {
                   othis.store.add(response2[i]);                    
                }
                othis.store.sync();
                //this.clrData();
            }
        });
    },
    clrData: function() {
        var records = this.store.getRange();
        this.store.remove(records);
        this.store.sync();
    }

});
