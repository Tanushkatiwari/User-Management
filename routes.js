const express=require("express")
const Route=express.Router()

const{addUser,getUsers,updateUser}=require("../controllers/userController");


Route.post("/addUser", addUser);
Route.get("/userDetails",getUsers);
Route.put("/updateUsers/:id",updateUser);

module.exports=Route

