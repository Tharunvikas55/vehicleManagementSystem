const mongoose=require("mongoose");
const schema=mongoose.Schema;

const remainderSchema=new schema({
    bus_number:{
        type:String,
        
    },
    register_Number:{
        type:String,
        required:true,
        
    },
    alert_Type:{
        type:String,
        default:"Mobile",
    },
    expire_Date:{
        type:String,
        
    },
    mobile:{
        type:Number,
        default:"9384148359"
    },
    remaining_km:{
        type:Number,
        
    },
},{timestamps:true})


const Remainder=mongoose.model("remainder",remainderSchema);

module.exports=Remainder;