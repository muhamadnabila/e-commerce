const { Transaction } = require('../models');

module.exports =  {
    clearAllTransaction: function() {
        if (process.env.NODE_ENV === 'test') {
            return Transaction
                .deleteMany({})
                .then(function() {
                    console.log('All transaction deleted ')
                })
                .catch(function(err) {
                    console.log(err);
                });
        }
    }
}