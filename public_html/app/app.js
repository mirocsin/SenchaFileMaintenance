App = new Ext.Application({
    name: "App",

    launch: function() {
        this.views.viewport = new this.views.Viewport();
        this.views.userDetails = this.views.viewport.down('#userDetails');
        this.views.usersList = this.views.viewport.down('#usersList');
        this.views.usersForm = this.views.viewport.down('#usersForm');
        
        //App.stores.users_details.add({customer:'Customer101'});
        //App.stores.users_details.sync(); 
    }
});
