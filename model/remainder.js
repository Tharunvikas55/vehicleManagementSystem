const mongoose=require("mongoose");
const schema=mongoose.Schema;

const remainderSchema=new schema({})


const Remainder=mongoose.model("remainder",remainderSchema);

module.exports=Remainder;