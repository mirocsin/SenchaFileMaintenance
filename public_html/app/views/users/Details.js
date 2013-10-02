App.views.UsersDetails = Ext.extend(Ext.form.FormPanel, {
    initComponent: function() {
        var cancelButton, titlebar, fields, buttonbar,saveButton,deleteButton

        cancelButton = {
            text: 'cancel',
            ui: 'back',
            handler: this.onCancelAction,
            scope: this
        };

        saveButton = {
            id: 'userDetailSaveButton',
            text: 'save',
            ui: 'confirm',
            handler: this.onSaveAction,
            scope: this
        };

        deleteButton = {
            id: 'userDetailDeleteButton',
            text: 'delete',
            ui: 'decline',
            handler: this.onDeleteAction,
            scope: this
        };
        
        titlebar = {
            id: 'userDetailTitlebar',
            xtype: 'toolbar',
            title: 'Enter User Details',
            items: [cancelButton]
        };

        buttonbar = {
            xtype: 'toolbar',
            dock: 'bottom',
            items: [{xtype: 'spacer'}, saveButton]
        };
        
        fields = {
            xtype: 'fieldset',
            id: 'userDetailFieldset',
            title: 'User details',
            defaults: {
                xtype: 'textfield',
                labelAlign: 'left',
                labelWidth: '40%',
                required: false,
                useClearIcon: true,
                autoCapitalize: false
            },
            items: [
                {
                    name: 'customer',
                    label: 'customer',
                    autoCapitalize: true
                },
                {
                    name: 'email',
                    label: 'email',
                },
                {
                    name: 'phone',
                    label: 'phone',
                }
            ]

        };
         
        Ext.apply(this, {
            scroll: 'vertical',
            dockedItems: [titlebar, buttonbar],
            items: [fields]
        });

        App.views.UsersDetails.superclass.initComponent.call(this);
    },
    onCancelAction: function() {
        // App.views.viewport.reveal('usersForm','right');
        Ext.dispatch({
            controller: 'Users_details',
            action: 'cancel',
            form: this
        });
    },
    
    onSaveAction: function() {
        var model = this.getRecord();
        Ext.dispatch({
            controller: 'Users_details',
            action: 'save',
            form: this,
            record: model,
            data: this.getValues()
        });
    }        


})
Ext.reg('App.views.UsersDetails', App.views.UsersDetails);

