const connectToMongo=require('./db_users');
const cors = require('cors');
const express=require("express");

connectToMongo();
const app=express();
const port=5000;
app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
  }));
app.use(express.json())
app.use('/api/userauth',require('./routes/userRoutes'))
app.use('/api/adminauth',require('./routes/adminRoute'))
app.use('/api/prodauth',require('./routes/itemRoute'))
app.use('/api/cartauth',require('./routes/cartRoutes'))

app.listen(port,()=>{
    console.log(`listening to the give port:${port}` );
})

