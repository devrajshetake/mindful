const express = require('express');
const app = express();
const hbs = require('hbs');
const port = process.env.PORT || 8000;
const path = require('path');
const bodyParser = require('body-parser');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const auth = require("./middleware/auth")
const nodemailer = require("nodemailer");
const multiparty = require("multiparty");
require("dotenv").config();



require("./db/conn")
const Register = require("./models/registers");
const { connect } = require('http2');

// main page path
const main_path = path.join(__dirname, "../..") 
const template_path = path.join(__dirname,"../templates/views")
const partial_path = path.join(__dirname, "../templates/partials")

// yeh likhna padta json file ke liye 
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser()); 


// app.use(bodyParser.urlencoded({extended:true}));




// some registrations and basic things to be done 
app.set('view engine', 'hbs');
app.set('views', template_path)
hbs.registerPartials(partial_path)

app.use(express.static(main_path));

// ---------------------------------------routing ------------------------------------------------

app.get('/', (req,res) =>{
    res.render("../../index.html")
})
app.get('/quotes',  (req,res) =>{
    res.render("quotes")
})
app.get('/register', (req,res) =>{
    res.render("register")
})
app.get('/login', (req,res) =>{
    res.render("login")
})
app.get('/contact', (req,res) =>{
    res.render("contact_us")
})
app.get('/chatbot', (req,res) =>{
    res.render("chatbot")
})
app.get('/about', (req,res) =>{
    res.render("about-us")
})
app.get('/quiz', (req,res) =>{
    res.render("quiz")
})


app.get('*', (req,res) =>{
    res.render("error_404")
})



// --------------sign up ka code-----------------
// create a new user in our database
app.post("/register", async (req, res) => {
    
    try {
        
        const password = req.body.password;
        const cpassword = req.body.cpassword;

        if(password == cpassword){

            const registerUser = new Register({
                fullname : req.body.fullname,
                email: req.body.email,
                phone: req.body.phone,
                password: req.body.password,
                confirmpassword: cpassword
            })

            // console.log("the sucsess part" + registerUser); this was to print the whole data
            const token = await registerUser.generateAuthToken();

            res.cookie("jwt", token, {
                expires: new Date(Date.now()+ 30000),//shayad change karna padega..
                httpOnly: true
            });
             


            const registered = await registerUser.save();
            res.status(201).render("login");
            console.log("Data saved to the server");

        }else{
            res.send("passwords are not matching")
        }


    } catch (error) {
        res.status(400).send(error);
    }
})

// -----------------------------------login ka code--------------------------------------- 

app.post("/login", async(req,res) => {
    try {
        
        const email = req.body.email;
        const password = req.body.password;

        const userEmail = await Register.findOne({email:email});

        const isMatch = await bcrypt.compare(password, userEmail.password);
        const token = await userEmail .generateAuthToken(); //may have to change
        res.cookie("jwt", token, {
            expires: new Date(Date.now()+ 300000000000),//shayad change karna padega..
            httpOnly: true
        });
        
        

        if (isMatch) {
            res.status(201).render("index");
            

            
        } else {
            res.send("Invalid Credentials!");
        }

        

    } catch (error) {
        res.status(201).render("goBack") //Your are not registered.
    }
})



// -----------------------------------contat us email service --------------------------------

// const transporter = nodemailer.createTransport({
//     host: "smtp.gmail.com", //replace with your email provider
//     port: 587,
//     auth: {
//       user: process.env.EMAIL,
//       pass: process.env.PASS,
//     },
//   });
  
//   // verify connection configuration
// transporter.verify(function (error, success) {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log("Server is ready to take our messages");
//     }
//   });

  
//   app.post("/contact", (req, res) => {
//     //1.
//     let form = new multiparty.Form();
//     let data = {};
//     form.parse(req, function (err, fields) {
//       console.log(fields);
//       Object.keys(fields).forEach(function (property) {
//         data[property] = fields[property].toString();
//       });
  
//       //2. You can configure the object however you want
//       const mail = {
//         from: data.name,
//         to: process.env.EMAIL,
//         subject: data.subject,
//         text: `${data.name} <${data.email}> \n${data.message}`,
//       };
  
//       //3.
//       transporter.sendMail(mail, (err, data) => {
//         if (err) {
//           console.log(err);
//           res.status(500).send("Something went wrong.");
//         } else {
//           res.status(200).send("Email successfully sent to recipient!");
//         }
//       });
//     });
//   });
  


app.listen(port, () => {
    console.log(`Listening to the port number ${port}.`)
})