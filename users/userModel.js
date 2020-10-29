const db=require("../database/config")

//return username and id of all users

function getAllUsers(){
    return db("users").select("id","username")
}


module.exports={
    getAllUsers,
    
}