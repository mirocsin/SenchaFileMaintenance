App.views.UsersForm = Ext.extend(Ext.form.FormPanel, {
    defaultInstructions: 'Please enter the information above.',
    initComponent: function() {
        var titlebar, cancelButton, buttonbar, saveButton, deleteButton, fields, field_details, add_detailButton;

        cancelButton = {
            text: 'cancel',
            ui: 'back',
            handler: this.onCancelAction,
            scope: this
        };

        titlebar = {
            id: 'userFormTitlebar',
            xtype: 'toolbar',
            title: 'Create user',
            items: [cancelButton]
        };

        saveButton = {
            id: 'userFormSaveButton',
            text: 'save',
            ui: 'confirm',
            handler: this.onSaveAction,
            scope: this
        };

        deleteButton = {
            id: 'userFormDeleteButton',
            text: 'delete',
            ui: 'decline',
            handler: this.onDeleteAction,
            scope: this
        };

        buttonbar = {
            xtype: 'toolbar',
            dock: 'bottom',
            items: [deleteButton, {xtype: 'spacer'}, saveButton]
        };

        fields = {
            xtype: 'fieldset',
            id: 'userFormFieldset',
            title: 'User details',
            instructions: this.defaultInstructions,
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
                    name: 'code',
                    label: 'code',
                    autoCapitalize: true
                },
                {
                    xtype: 'App.views.ErrorField',
                    fieldname: 'code',
                },
                {
                    name: 'name',
                    label: 'name',
                    autoCapitalize: true
                },
                {
                    xtype: 'App.views.ErrorField',
                    fieldname: 'name',
                },
                {
                    name: 'email',
                    label: 'email',
                    xtype: 'emailfield',
                },
                {
                    xtype: 'App.views.ErrorField',
                    fieldname: 'email',
                },
                {
                    name: 'phone',
                    label: 'phone',
                    xtype: 'numberfield',
                },
                {
                    xtype: 'App.views.ErrorField',
                    fieldname: 'phone',
                },
                {
                    name: 'dtype',
                    xtype: 'hiddenfield'
                }
            ]
        };

        add_detailButton = {
            xtype: 'button',
            ui: 'normal',
            text: 'Add Details',
            handler: this.onAddDetail,
            scope: this
        };

        field_details = {
            xtype: 'list',
            itemTpl: '{customer} &nbsp;&nbsp;{email}',
            store: App.stores.users_details
        };

        Ext.apply(this, {
            scroll: 'vertical',
            dockedItems: [titlebar, buttonbar],
            items: [fields,add_detailButton,field_details],
            listeners: {
                beforeactivate: function() {
                    var deleteButton = this.down('#userFormDeleteButton'),
                            saveButton = this.down('#userFormSaveButton'),
                            titlebar = this.down('#userFormTitlebar'),
                            model = this.getRecord();

                    if (model.phantom) {
                        titlebar.setTitle('Create user');
                        saveButton.setText('create');
                        deleteButton.hide();
                    } else {
                        titlebar.setTitle('Update user');
                        saveButton.setText('update');
                        deleteButton.show();
                    }
                },
                deactivate: function() {
                    this.resetForm()
                }
            }
        });

        App.views.UsersForm.superclass.initComponent.call(this);
    },
    onCancelAction: function() {
        Ext.dispatch({
            controller: 'Users',
            action: 'index'
        });
    },
    onSaveAction: function() {
        var model = this.getRecord();

        Ext.dispatch({
            controller: 'Users',
            action: (model.phantom ? 'save' : 'update'),
            data: this.getValues(),
            record: model,
            form: this
        });
    },
    onDeleteAction: function() {
        Ext.Msg.confirm("Delete this user?", "", function(answer) {
            if (answer === "yes") {
                Ext.dispatch({
                    controller: 'Users',
                    action: 'remove',
                    record: this.getRecord()
                });
            }
        }, this);
    },
    showErrors: function(errors) {
        var fieldset = this.down('#userFormFieldset');
        this.fields.each(function(field) {
            var fieldErrors = errors.getByField(field.name);

            if (fieldErrors.length > 0) {
                var errorField = this.down('#' + field.name + 'ErrorField');
                field.addCls('invalid-field');
                errorField.update(fieldErrors);
                errorField.show();
            } else {
                this.resetField(field);
            }
        }, this);
        fieldset.setInstructions("Please amend the flagged fields");
    },
    resetForm: function() {
        var fieldset = this.down('#userFormFieldset');
        this.fields.each(function(field) {
            this.resetField(field);
        }, this);
        fieldset.setInstructions(this.defaultInstructions);
        this.reset();
    },
    resetField: function(field) {
        if (field.name == "dtype") {
            return "";
        }
        var errorField = this.down('#' + field.name + 'ErrorField');
        errorField.hide();
        field.removeCls('invalid-field');
        return errorField;
    },
    onAddDetail: function() {
        var model = this.getRecord();
        Ext.dispatch({
            controller: 'Users',
            action: 'onAddDetail',
            data: this.getValues(),
            record: model,
            form: this
        });
        //App.stores.users_details.add({customer:'New Row...'});
        //App.stores.users_details.sync();
//        Ext.dispatch({
//            controller: 'Users',
//            action: save_userdetail,
//            form: this
//        });
        
    }
});

Ext.reg('App.views.UsersForm', App.views.UsersForm);
