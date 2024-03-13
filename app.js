const express=require("express");
const mongoose=require("mongoose");

const app=express();

const path = require('path');

const Routes=require("./routes/Routes")

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

app.use('/admin',Routes);
app.get("/",(req,res)=>{
    res.render("login",{title:"Login"});
})


 app.use((req,res)=>{
    res.render("404",{title:"error"});
  })

 app.listen(5000);