App.models.User = Ext.regModel('User', {
    fields: [
        {
            name: 'id',
            type: 'string'            
        }, {
            name: 'code',
            type: 'string'
        },{
            name: 'name',
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
    validations: [
        {
            type: 'presence',
            name: 'code'
        },
        {
            type: 'presence',
            name: 'name'
        }, {
            type: 'format',
            name: 'email',
            matcher: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
            message: 'must be a valid email'
        }
    ],
    proxy: {
        type: 'localstorage',
        id: 'sencha-users'
    },
    //hasMany: {model: 'User_details', name: 'user_details'}
});
