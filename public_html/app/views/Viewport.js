App.views.Viewport = Ext.extend(Ext.Panel, {
    fullscreen: true,
    layout: 'card',
    
    initComponent: function() {
        Ext.apply(this, {
            items: [
                { xtype: 'App.views.UsersList', id: 'usersList' },
                { xtype: 'App.views.UsersForm', id: 'usersForm' },
                { xtype: 'App.views.UsersDetails', id: 'userDetails' }
            ]
        });
        App.views.Viewport.superclass.initComponent.apply(this, arguments);
    },

    reveal: function(target,direction2) {
        var direction = (target === 'usersList') ? 'right' : 'left'
        if (direction2 !== undefined){
            direction = direction2;
        }
        this.setActiveItem(
            App.views[target],
            { type: 'slide', direction: direction }
        );
    }
});
