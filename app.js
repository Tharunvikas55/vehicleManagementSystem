const express=require("express");
const mongoose=require("mongoose");

const app=express();

const path = require('path');

const Routes=require("./routes/Routes")

const Remainder = require('./model/remainder');

const accountSid = 'ACe1154afd5197349b3eae1ad34aaca4a5';
const authToken = 'dee16b1312b5a1badacbc9a3adf0ce52';
const client = require("twilio")(accountSid, authToken);

//DB configuration
const db=require("./config/keys").MongoURI;

//DB connection
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
 });

mongoose.set('strictQuery', true);

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});



const sendMessage = async () => {
  const accountSid = process.env.ACCOUNT_SID;
  const authToken = process.env.AUTH_TOKEN_TWILIO;
  const client = require("twilio")(accountSid, authToken);
  try {
    const message = await client.messages.create({
      body:"Next service",
      from: "+12408378385",
      to: "+919384148359",
    });
    
  } catch (err) {
    console.error(`Error sending SMS: `);
    // Handle the error gracefully, log it, or perform other actions.
  }
};

app.use("/admin/:id/sendRemainder", async (req, res) => {
  // const _id = req.params.id;
  // const messageBody = "Your reminder message goes here.";
  // try {
  //   await sendMessage()
  //   res.redirect("/admin/index");
  // } catch (err) {
  //   console.log(err);
  //   res.status(500).send("Error sending SMS ");
  // }
  client.messages
    .create({
                from: '+12408378385',
        to: '+919384148359',
        body:"Service date"
    })
    .then(message => console.log(message.sid))
    
});


app.use('/admin',Routes);
app.get("/",(req,res)=>{
    res.render("login",{title:"Login"});
})
// const sendSMS=async(body)=>{
//   let options={
//     from:"+12408378385",
//     to:"9384148359",
//     body,
//   };
//   try{
//     const message=await client.messages.create(options);
//     console.log(message);

//   }
//   catch (err){
//     console.log(err);
//   }
// };

// sendSMS("Next Services is approaching");


// const sendMessage = async (body, pnum) => {
//   const accountSid = process.env.ACCOUNT_SID;
//   const authToken = process.env.AUTH_TOKEN_TWILIO;
//   const client = require("twilio")(accountSid, authToken);

//   try {
//     const message = await client.messages.create({
//       body: "bus services is approaching",
//       from: "+12408378385",
//       to: `+919384148359`,
//     });

//     console.log(message.sid);
//   } catch (err) {
//     console.error(`Error sending SMS: ${err.message}`);
//     // Handle the error gracefully, log it, or perform other actions.
//   }
// };

// app.get("/admin/:id/sendRemainder", async (req, res) => {
//   const id = req.params.id;
//   Remainder.findOne({_id:id})
//     .then(result=>{
//         res.render('remainder',{remainder:result,title:"Remainder Details"})
//     })

//   try {
//     await sendMessage(req.body);
//     res.redirect("/admin/index");
//   } catch (err) {
//     console.log(err);
    
//     res.status(500).send("Error sending SMS");
//   }
// });


 app.use((req,res)=>{
    res.render("404",{title:"error"});
  })

 app.listen(5000);