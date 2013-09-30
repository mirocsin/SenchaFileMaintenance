App.stores.users = new Ext.data.Store({
    model: 'User',
    autoLoad: true,
    listeners: {
        'load': function(store, records, options) {
//            store.filter([{property:"dtype", value:""}]);
            store.filter(function(r) {
                var value = r.get('dtype');
                return (value == 'NEW' || value == 'EDIT' || value == '');
            });
        }
    }
});