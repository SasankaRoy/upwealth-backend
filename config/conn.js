const mongoose = require('mongoose');
// kl2qHV5QUqgZc5xl mongo password

const conn = ()=>{
    mongoose.connect(process.env.MONGO_CONNECT_URI).then(()=>{
        console.log('DB Connected');
    });
  
}

module.exports = conn;