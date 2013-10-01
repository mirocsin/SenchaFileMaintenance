    Ext.regController('Users_details', {
    store: App.stores.users_details,
    
    cancel: function(){
        App.views.viewport.reveal('usersForm','right');
    }
    
});