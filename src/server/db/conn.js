const mongoose = require("mongoose");


// connection for compass

// mongoose.connect("mongodb://localhost:27017/mentalHealth", {
//     useNewUrlParser:true,
//     useUnifiedTopology:true,
//     useCreateIndex:true
// }).then(() => {
//     console.log("connection Succesful");
// }).catch((e) => {
//     console.log("No Connection!!!");
// }) 


const DB = 'mongodb+srv://devraj:W5j-ZkX$JSVE3@2@cluster0.d2pxc.mongodb.net/pbl_website?retryWrites=true&w=majority';
mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log("Connected to atlas");
}).catch((err) => console.log("Unable to connect to Atlas"));