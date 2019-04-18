const path = require('path');
module.exports = {
    development: {
        sitename: 'Telecom Services [Development]',
        data: {
            ourservices: path.join(__dirname, '../data/ourservices.json'),
            feedback: path.join(__dirname, '../data/feedback.json'),
            //6. Add in a path to the users.json data
            users: path.join(__dirname, '../data/users.json')
        }

    },
    production: {
        sitename: 'Telecom Services',
        data: {
            ourservices: path.join(__dirname, '../data/ourservices.json'),
            feedback: path.join(__dirname, '../data/feedback.json'),
            //7. Add in a path to the users.json data
            users: path.join(__dirname, '../data/users.json')
            //8. Open Server>index.js
        }
    }
}