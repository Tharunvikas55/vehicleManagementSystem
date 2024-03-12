const mongoose=require("mongoose");
const schema=mongoose.Schema;

const vehicleSchema=new schema({
    registrationNumber:{
        type:String,
        required:true,
    },
    busNumber:{
        type:String,
        required:true,
    },
    Model:{
        type:String,
        required:true,
    },
    engineNumber:{
        type:String,
        required:true,
    },
    vehicleClass:{
        type:String,
        required:true,
    },
    registrationNumber:{
        type:String,
        required:true,
    },
    fitnessValidupto:{
        type:String,
        required:true,
    },
    taxValidupto:{
        type:String,
        required:true,
    },
    lastServiceDate:{
        type:Date,
        required:true,
    },
    lastServiceKilometer:{
        type:Number,
        required:true,
    },
    nextServiceKilometer:{
        type:Number,
        required:true,
    }

})

const Vehicle=mongoose.model("vehicle",vehicleSchema);

module.exports=Vehicle;