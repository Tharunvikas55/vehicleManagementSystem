const express=require("express");
const controller=require("../controller/adminController")

const router=express.Router();

router.get("/index",controller.getHomePage);

router.get("/addNewVehicle",controller.getNewVehicleForm);

router.get("/vehicleList",controller.getVehicleList);

router.get("/:id/vehicleEdit",controller.getVehicleEdit)

router.get("/:id/vehicleDelete",controller.vehicleDelete);

router.get("/remainder",controller.getRemainder);

router.post("/addNewVehiclePost",controller.postNewVehicleForm);

router.post("/:id/vehicleEditPost",controller.postVehicleEdit)

module.exports=router;