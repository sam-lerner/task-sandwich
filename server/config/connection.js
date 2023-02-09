const mongoose = require('mongoose');

mongoose.connect(
    // !!! CHANGE MONGOOSE LINK
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/tech-friends-ins-demo',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

module.exports = mongoose.connection;
