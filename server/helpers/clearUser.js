const { User } = require('../models');

module.exports =  {
    clearAllUser: function(done) {
        if (process.env.NODE_ENV === 'test') {
            return User
                .deleteMany({})
                .then(function() {
                    console.log('All users deleted ')
                    done()
                })
                .catch(function(err) {
                    console.log(err);
                });
        }
    }
}