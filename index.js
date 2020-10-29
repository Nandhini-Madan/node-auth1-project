const express=require("express")
const helmet=require("helmet")
const cors=require("cors")
const usersRouter=require("")
const session=require("express-session")
const knexSessionStore=require("connect-session-knex")(session)
const db=require("./database/config")
const server=express()
const port=process.env.PORT||4000

server.use(helmet())
server.use(cors())
server.use(express.json())
server.use(session({
    resave:false,
    saveUninitialized:false,
    secret:"keep it secret",
    store: new knexSessionStore({
        knex:db,
        createTable:true,
    })
}))

server.use(usersRouter)
server.use((err,req,res,next)=>{
    console.log(err)
})

server.listen(port,()=>{
    console.log(`Running successfully in http://localhost:${port}`)
})

