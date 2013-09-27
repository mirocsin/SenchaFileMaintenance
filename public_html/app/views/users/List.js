App.views.UsersList = Ext.extend(Ext.Panel, {
    initComponent: function() {
        var addButton, titlebar, list, syncButton, clrdataButton;

        addButton = {
            itemId: 'addButton',
            iconCls: 'add',
            iconMask: true,
            ui: 'plain',
            handler: this.onAddAction,
            scope: this
        };

        clrdataButton = {
            itemId: 'clrdataButton',
            iconCls: 'trash',
            iconMask: true,
            ui: 'plain',
            handler: this.onClearDataAction,
            scope: this
        };


        syncButton = {
            itemId: 'syncButton',
            iconCls: 'action',
            iconMask: true,
            ui: 'plain',
            handler: this.onSyncAction,
            scope: this
        };

        titlebar = {
            dock: 'top',
            xtype: 'toolbar',
            title: 'Users',
            items: [addButton, {xtype: 'spacer'}, clrdataButton, syncButton]
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
    onSyncAction: function() {
        Ext.dispatch({
            controller: 'Users',
            action: 'syncList'
        });
    },
    onClearDataAction: function() {
        Ext.Msg.confirm("Clear Data?", "", function(answer) {
            if (answer === "yes") {
                Ext.dispatch({
                    controller: 'Users',
                    action: 'clrData'
                });

            }
        });
    }

});

Ext.reg('App.views.UsersList', App.views.UsersList);
