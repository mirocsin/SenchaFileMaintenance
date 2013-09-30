App.stores.users = new Ext.data.Store({
    model: 'User',
    autoLoad: true,
    listeners: {
        'load': function(store, records, options) {
            store.filter(function(r) {
                var value = r.get('id');
                return (value === 'NEW' || value === 'EDIT' || value === '');
            });
        }
    },
            
});