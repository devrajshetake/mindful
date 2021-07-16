const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



const userSchema = new mongoose.Schema({
    fullname : {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true,
        unique:true
    },
    phone: {
        type:Number,
        required:true,
        unique:true
    },
    password: {
        type: String,
        required:true
    },
    confirmpassword: {
        type: String,
        required:true
    },
    tokens: [{
        token:{
            type: String,
            required:true
        }
    }]
})


// ----------------------------Hashing middleware for password-------------------------

userSchema.pre("save", async function(next) {

    if(this.isModified("password")){
        // const passwordHash = await bcrypt.hash(password, 10);
        
        this.password = await bcrypt.hash(this.password, 10);
        
        this.confirmpassword = await bcrypt.hash(this.password, 10);

    }
    
    next();
})


// ----------------------------jwt middleware for generating token while registration-------------------------

userSchema.methods.generateAuthToken = async function(){
    try {
        
        const token = jwt.sign({_id:this._id.toString()}, "thisismentalhealthwebsitemadeforpblproject2b52021");
        this.tokens = this.tokens.concat({token:token});
        // console.log("the token is:"+token);
        await this.save();
        return token;
    } catch (error) {
        res.send(error);
        console.log(error);
    }
}




// ------------------------------------------exporting the schema -----------------------------------

const Register = new mongoose.model("Register", userSchema);

module.exports = Register;