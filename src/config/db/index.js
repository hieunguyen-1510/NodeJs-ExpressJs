const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/hieu_learn_dev', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connect successfully to MongoDB!');
    } catch (error) {
        console.error('Connect failed to MongoDB!', error.message);
    }
}

module.exports = { connect };
