const { insert } = require("../database/config")
const db=require("../database/config")

//return username and id of all users

function getAllUsers(){
    return db("users").select("id","username")
}
//find by username
 function getByUsername(data){
    console.log(data)
              return  db("users")
                       .select("id","username","password")
                       .where(data)
}
async function insertUser(data){
        const id= await db("users")
                        .insert(data)
        return getById(id)
}
async function getById(id){
    return await db("users")
                .select("id","username","password")
                .where({id})
                .first()
}

module.exports={
    getAllUsers,
    getByUsername,
    insertUser,
    getById,

}