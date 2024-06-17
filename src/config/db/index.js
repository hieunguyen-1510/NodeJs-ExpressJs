const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/hieu_learn_dev', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connect successfully!!!');
    } catch (error) {
        console.error('Connect failed!!!');
    }
}

module.exports = { connect };
