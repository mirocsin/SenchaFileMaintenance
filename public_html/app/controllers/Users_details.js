    Ext.regController('Users_details', {
    store: App.stores.users_details,
    
    showUserForm: function(){
       App.views.viewport.reveal('usersForm','right');  
    },
    
    save: function(params){
        params.data.dtype = "NEW";
        params.data.ucode = App.views.usersForm.getRecord().data.code; //App.views.usersList.getComponent('userList').getSelectedRecords()[0].data.code;
        params.record.set(params.data);
        this.store.create(params.data);
        this.showUserForm();
    },
    update: function(params){
        var tmpData = new App.models.User_details(params.data)
        if (tmpData.data.dtype !== "NEW") {
            tmpData.set('dtype', 'EDIT');
        }
        tmpData.data.id = params.record.data.id;
        params.record.set(tmpData.data)
        this.store.sync();
        this.showUserForm();
    },        
    cancel: function(){
        this.showUserForm();
    },
    
    remove: function(params){
        var record = params.list.getStore().getAt(params.index)//this.store.getById(params.index)
        
        record.data.dtype = "DELETE";
        record.set(record.data);
        this.store.sync();    
        this.filter();
        //App.stores.users_details.load();
        //App.views.usersForm.getComponent('userdetail_List').refresh();
    },
    editDetails: function(params) {
        var model = this.store.getAt(params.index);
        App.views.userDetails.load(model);
        App.views.viewport.reveal('userDetails');
    },
    filter: function(){
        App.stores.users_details.clearFilter();
        var filter_ucode = App.views.usersForm.record.data.code; //params.form.record.data.code;
        if (filter_ucode === "") {
            filter_ucode = "DUMMY_FILTER";  // Dummy Filter
        }
        App.stores.users_details.filter(function(r){
            var dtype = r.get('dtype');
            var ucode = r.get('ucode')
            return ((dtype === 'NEW' || dtype === 'EDIT' || dtype === '') && ucode === filter_ucode);
        });
        App.stores.users_details.load();
        App.views.usersForm.getComponent('userdetail_List').refresh();
    }
    
});