const express=require("express");
const Vehicle=require("../model/Vehicle");
const Remainder = require('../model/remainder'); // Import the model for Remainder collection
const axios=require("axios");

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

exports.getRemainder=(req,res)=>{
    Remainder.find()
    .then(result=>{
        res.render('remainder',{remainder:result,title:"Remainder Details"})
    })
    // res.render("remainder",{title:"Remainder Details"})
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

// exports.postVehicleEdit=(req,res)=>{
//     const {busNumber,fitnessValidupto,taxValidupto,lastServiceDate,lastServiceKilometer,currentKm,nextServiceKilometer}=req.body;
//     const _id=req.params.id;

    
//     // Calculate the difference between currentKm and nextServiceKilometer
//     const kmDifference = nextServiceKilometer - currentKm;

//     Vehicle.updateOne({_id:_id},{$set:{busNumber:busNumber,v:fitnessValidupto,taxValidupto:taxValidupto,lastServiceDate:lastServiceDate,lastServiceKilometer:lastServiceKilometer,currentKm:currentKm,nextServiceKilometer:nextServiceKilometer}})
//     // .then(result=>{
//     //     res.redirect("/admin/vehicleList")
//     // })

//     .then(result => {
//         // Check if the difference meets the condition
//         if (kmDifference <= 2000) { // Change this condition as needed
//             // If condition is met, store values in the Remainder collection
//             const remainder = new Remainder({
//                 bus_number: _id.busNumber,
//                 remaining_km: kmDifference,
//                 expire_Date:_id.nextServiceKilometer,
//                 register_Number:_id.registrationNumber// Store the difference in the new collection
//             });
//             remainder.save()
//                 .then(savedRemainder => {
//                     console.log("Reminder saved:", savedRemainder);
//                     res.redirect("/admin/vehicleList");
//                 })
//                 .catch(err => {
//                     console.error("Error saving Reminder:", err);
//                     res.status(500).send("Error saving Reminder");
//                 });
//         } else {
//             // If condition is not met, simply redirect
//             res.redirect("/admin/vehicleList");
//         }
//     })

//     .catch((err)=>{
//         console.log(err);
//     })
// }

exports.postVehicleEdit = (req, res) => {
    const { registrationNumber,busNumber, fitnessValidupto, taxValidupto, lastServiceDate, lastServiceKilometer, currentKm, nextServiceKilometer } = req.body;
    const _id = req.params.id;

    // Calculate the difference between currentKm and nextServiceKilometer
    const kmDifference = nextServiceKilometer - currentKm;

    Vehicle.updateOne({ _id: _id }, {
            $set: {
                registrationNumber:registrationNumber,
                busNumber: busNumber,
                fitnessValidupto: fitnessValidupto,
                taxValidupto: taxValidupto,
                lastServiceDate: lastServiceDate,
                lastServiceKilometer: lastServiceKilometer,
                currentKm: currentKm,
                nextServiceKilometer: nextServiceKilometer
            }
        })
        .then(result => {
            // Check if the difference meets the condition
            if (kmDifference <= 2000) {
                // If condition is met, store values in the Remainder collection
                Remainder.findOne({ bus_number: busNumber })
                    .then(existingRemainder => {
                        if (existingRemainder) {
                            // If document exists, update it
                            existingRemainder.remaining_km = kmDifference;
                            existingRemainder.expire_Date = nextServiceKilometer;
                            existingRemainder.register_Number = registrationNumber;
                            return existingRemainder.save();
                        } else {
                            // If document doesn't exist, create a new one
                            const remainder = new Remainder({
                                bus_number: busNumber,
                                remaining_km: kmDifference,
                                expire_Date: nextServiceKilometer,
                                register_Number: registrationNumber
                            });
                            
                            return remainder.save();
                        }
                    })
                    .then(savedRemainder => {
                        console.log("Reminder saved:", savedRemainder);
                        
                        res.redirect("/admin/remainder");
                    })
                    .catch(err => {
                        console.error("Error saving Reminder:", err);
                        res.status(500).send("Error saving Reminder");
                    });
            } else {
                // If condition is not met, simply redirect
                res.redirect("/admin/vehicleList");
            }
        })
        .catch((err) => {
            console.log(err);
        });
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




