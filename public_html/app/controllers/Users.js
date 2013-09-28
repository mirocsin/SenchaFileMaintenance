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
            if (this.store.data.items[0].data.dtype !== "NEW") {
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
        // NEW Users
        var syncData = [];
        this.store.data.each(function(record) {
            if (record.data.dtype === "NEW") {
                syncData.push(record.data);
            }
        });
        var tbldata_New = Ext.util.JSON.encode(syncData);
        //this.syncToServer({tblUsers: tbldata, DataType: "NEW"});
        
        // EDIT Users
        syncData = [];
        this.store.data.each(function(record) {
            if (record.data.dtype === "EDIT") {
                syncData.push(record.data);
            }
        });
        var tbldata_Edit = Ext.util.JSON.encode(syncData);
        //this.syncToServer({tblUsers: tbldata, DataType: "EDIT"});
        
        this.syncToServer({tblUsers_New: tbldata_New, tblUsers_Edit: tbldata_Edit});
        
        Ext.Msg.alert('Status', 'Sync successfully.');
    },
    syncToServer: function(syncData,othis) {
        var me = this;
        //Ext.util.JSONP.current = undefined;
        Ext.util.JSONP.current = null;
        Ext.util.JSONP.request({
            url: 'http://127.0.0.1:6101/QueueService/leebeautypromo.asmx/syncToServer',
            params: syncData,
            scope: me,
            callback: function(response) {
                me.clrData();
                for (var i = 0; i < response.length; i++) {
                   me.store.add(response[i]);                    
                }
                me.store.save();
                me.store.sync(); 
              
            }
     });
    },
    clrData: function() {
        var records = this.store.getRange();
        this.store.remove(records);
        this.store.save();
        this.store.sync();
    }

});
