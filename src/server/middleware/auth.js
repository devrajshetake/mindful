const jwt = require("jsonwebtoken");
const Register = require("../models/registers");


const auth = async (req, res, next) => {
    try {

        const token = req.cookies.jwt;
        const verifyUser = jwt.verify(token, "thisismentalhealthwebsitemadeforpblproject2b52021");
        console.log(verifyUser);
        // alert("Hello! I am an alert box!!");
        next();
        
    } catch (error) {
        res.status(401).send(`You are not authorized to this page, please login. ${error}`);
       
        
    }
}

module.exports = auth;