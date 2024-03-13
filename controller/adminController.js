const express=require("express");
const Vehicle=require("../model/Vehicle");

exports.getHomePage=(req,res)=>{
    res.render("index",{title:"Home"});
}

exports.getNewVehicleForm=(req,res)=>{
    res.render("newVehicleForm",{title:"new Vehicle"});
}

exports.getVehicleList=(req,res)=>{
    // res.render("vehicleList",{title:"vehicle List"});
    Vehicle.find()
    .then(result=>{
        res.render('vehicleList',{vehicles:result,title:"Vehicle list"})
    })

}

exports.getVehicleEdit=(req,res)=>{
    const id=req.params.id;
    Vehicle.findById(id)
    .then(result=>{
        res.render("vehicleEdit",{vehicles:result,title:"Edit"})
    })
}

exports.postNewVehicleForm=(req,res)=>{
    const New=new Vehicle(req.body);
    New.save()
    .then(result=>{
        res.redirect("/admin/index")
    })
    .catch(err=>{
        console.log(err);
    })
}

exports.postVehicleEdit=(req,res)=>{
    const {busNumber,fitnessValidupto,taxValidupto,lastServiceDate,lastServiceKilometer,currentKm,nextServiceKilometer}=req.body;
    const _id=req.params.id;
    Vehicle.updateOne({_id:_id},{$set:{busNumber:busNumber,v:fitnessValidupto,taxValidupto:taxValidupto,lastServiceDate:lastServiceDate,lastServiceKilometer:lastServiceKilometer,currentKm:currentKm,nextServiceKilometer:nextServiceKilometer}})
    .then(result=>{
        res.redirect("/admin/vehicleList")
    })
    .catch((err)=>{
        console.log(err);
    })
}

exports.vehicleDelete=(req,res)=>{
    Vehicle.findByIdAndDelete(req.params.id)
    .then(result=>{
        res.redirect("/admin/vehicleList")
    })
    .catch(err=>{
        console.log(err);
    });
}