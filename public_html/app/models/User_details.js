App.models.User_details = Ext.regModel('User_details', {
    fields: [
        {
            name: 'id',
            type: 'int'
        },{
            name: 'ucode',
            type: 'string'
        },{
            name: 'customer',
            type: 'string'
        }, {
            name: 'email',
            type: 'string'
        }, {
            name: 'phone',
            type: 'string'
        }, {
            name: 'dtype',
            type: 'string'
        }
    ],
    proxy: {
       type: 'localstorage',
       id: 'sencha-users_details'
    }
});
