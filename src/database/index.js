const mongoose = require('mongoose');


mongoose.connect(process.env.MONGO_URL || 'mongodb+srv://testeadmin:teset0205@cluster0-8k4rz.gcp.mongodb.net/test?retryWrites=true&w=majority',  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
mongoose.Promise = global.Promise;


module.exports = mongoose;


