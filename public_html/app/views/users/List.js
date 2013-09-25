App.views.UsersList = Ext.extend(Ext.Panel, {
    initComponent: function(){
        var addButton, titlebar, list, syncButton;

        addButton = {
            itemId: 'addButton',
            iconCls: 'add',
            iconMask: true,
            ui: 'plain',
            handler: this.onAddAction,
            scope: this
        };

//syncButton = {
//itemId: 'syncButton',
//xtype: 'button',
//text: 'Sync Data',
//width: 400,
//handler: this.onSyncAction,
//scope: this
//};

        titlebar = {
            dock: 'top',
            xtype: 'toolbar',
            title: 'Users',
            items: [ { xtype: 'spacer' }, addButton ]
        };

        list = {
            xtype: 'list',
            itemTpl: '{name}',
            store: App.stores.users,
            listeners: {
                scope: this,
                itemtap: this.onItemtapAction
            }
        };


        Ext.apply(this, {
            html: 'placeholder',
            layout: 'fit',
            dockedItems: [titlebar],
            items: [list]
            //items: [list,syncButton]
        });

        App.views.UsersList.superclass.initComponent.call(this);
    },

    onAddAction: function() {
        Ext.dispatch({
            controller: 'Users',
            action: 'newForm'
        });
    },

    onItemtapAction: function(list, index, item, e) {
        Ext.dispatch({
            controller: 'Users',
            action: 'editForm',
            index: index
        });
    },
            
    onSyncAction: function(){
        var offlineSyncStore = Ext.getStore('Users');
        offlineSyncStore.syncServer();
        Ext.Msg.alert('Data Sync Complete');
    }
    
});

Ext.reg('App.views.UsersList', App.views.UsersList);
