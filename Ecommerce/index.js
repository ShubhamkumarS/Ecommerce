const express =require("express")
const bodyParser =require("body-parser")
const mongoose = require("mongoose")
const port = process.env.PORT || 2000;

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017/mydb');

const db = mongoose.connection;

db.on('error',()=>console.log("Error in connecting to database"));
db.once('open',()=>console.log("connected to database"));

app.post("/signup_script",(req,res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var password =req.body.password;
    var contact =req.body.contact;
    var city = req.body.city;
    var address =req.body.address;

    var data ={
        "name":name,
        "email":email,
        "password":password,
        "contact":contact,
        "city":city,
        "address":address
    }

    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    return res.redirect('index.html')
})





app.get("/login",(req,res)=>{
    res.render("login.html");
});

//-----



app.post("/login_submit",async(req,res)=>{
    try{
        const email =req.body.email;
        const password =req.body.password;

        const useremail = await users.findOne({email:email});
        if(useremail.password==password){
            res.status(201).render("index");
        }else{
            res.send("password not matched")
        }

    } catch(error){
        res.status(400).send("Invalid Email")
    }
})



app.get("/", (req, res)=>{
    // res.send("Hello from server")
    res.set({"ALLow-access-ALLow-Origin":  '*'})
    return res.redirect('signup.html');
}).listen(port, () => {
    console.log(`server is running at port no ${port}`);
});;




