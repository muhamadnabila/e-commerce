const { Item } = require('../models');

module.exports =  {
    clearAllItem: function() {
        if (process.env.NODE_ENV === 'test') {
            return Item
                .deleteMany({})
                .then(function() {
                    console.log('All items deleted ')
                })
                .catch(function(err) {
                    console.log(err);
                });
        }
    }
}