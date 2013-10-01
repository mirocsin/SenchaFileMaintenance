App.views.UsersDetails = Ext.extend(Ext.Panel, {
    initComponent: function() {
        var cancelButton, titlebar

        cancelButton = {
            text: 'cancel',
            ui: 'back',
            handler: this.onCancelAction,
            scope: this
        };

        titlebar = {
            id: 'userFormTitlebar',
            xtype: 'toolbar',
            title: 'Enter User Details',
            items: [cancelButton]
        };

        Ext.apply(this, {
            scroll: 'vertical',
            dockedItems: [titlebar]
                    //items: [fields,add_detailButton,field_details],
        });

        App.views.UsersDetails.superclass.initComponent.call(this);
    },
    onCancelAction: function() {
        App.views.viewport.reveal('usersForm','right');
    }


})
Ext.reg('App.views.UsersDetails', App.views.UsersDetails);

