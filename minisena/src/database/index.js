const mongoose = require('mongoose');
require('dotenv').config()
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.wbyilx0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,{},(error)=>{
    if (error){
        console.log("failed to connect with mongodb");
        console.log(error);
        return;
    }
    console.log("conexão com mongodb testada");
});

mongoose.Promise = global.Promise;

module.exports=mongoose;