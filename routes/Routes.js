const express=require("express");
const controller=require("../controller/adminController")

const router=express.Router();

router.get("/home",controller.getHomePage);

router.get("/new",controller.getNewVehicleForm);


module.exports=router;