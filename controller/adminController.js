const express=require("express");
const Vehicle=require("../model/Vehicle");

exports.getHomePage=(req,res)=>{
    res.render("home",{title:"Home"});
}

exports.getNewVehicleForm=(req,res)=>{
    res.render("newVehicleForm",{title:"new Vehicle"});
}