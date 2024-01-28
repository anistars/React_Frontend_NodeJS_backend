// const mongoose = require('mongoose');

// const mongURI_user = "mongodb+srv://Aniket:aniket1999@generalstrore.mqilgwy.mongodb.net";

// const connectToMongo_user = async () => {
//     try {
//         const connection = await mongoose.createConnection(mongURI_user);
//         console.log('Mongo user connected');
//         return connection;
//     } catch (error) {
//         console.error(error);
//         process.exit(1);
//     }
// };

// module.exports = connectToMongo_user;
const mongoose=require("mongoose");
const mongURI="mongodb+srv://Aniket:aniket1999@generalstrore.mqilgwy.mongodb.net/general";

const connectToMongo_user= async()=>{
    try {
        mongoose.set('strictQuery', false)
        mongoose.connect(mongURI) 
        console.log('Mongo admin connected')
    } catch(error) {
        console.log(error)
        process.exit()
    }
}

module.exports=connectToMongo_user;