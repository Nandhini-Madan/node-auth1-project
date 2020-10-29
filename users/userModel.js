const { insert } = require("../database/config")
const db=require("../database/config")

//return username and id of all users

function getAllUsers(){
    return db("users").select("id","username")
}
//find by username
async function getByUsername(data){
              return await db("users")
                       .select("id","username","password")
                       .where(data)
}
async function insertUser(data){
        const [id]= await db("users")
                        insert(data)
}

module.exports={
    getAllUsers,
    getByUsername,
    insertUser,

}