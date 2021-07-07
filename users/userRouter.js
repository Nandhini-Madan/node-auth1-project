const express = require("express")
const users = require("./userModel")
const bycrypt = require("bcryptjs")
const { restrict } = require("./userMiddleware")
const router = express.Router()

router.get("/users",restrict(), async (req, res, next) => {
    try {
        res.json(await users.getAllUsers())
    }
    catch (err) {
        next(err)
    }
})

//register
router.post("/register", async (req, res, next) => {
    try {
        const { username, password } = req.body
        console.log(username)
        const user = await users.getByUsername({ username }).first()
        if (user) {
            res.status(409).json({
                message: "User already exists"
            })
        }
        else {
            const newuser = await users.insertUser({
                username,
                password: await bycrypt.hash(password, 10) //password has been encrypted to 10 md5
            })
            res.json({
                newuser, data: "Succesfully inserted"
            }
            )
        }
    }
    catch (err) {
        next(err)
    }
})

//login
router.post("/login",async(req,res,next)=>{
    try {
		const { username, password } = req.body
		const user = await users.getByUsername({ username }).first()

		if (!user) {
			return res.status(401).json({
				message: "Invalid Credentials",
			})
		}
		//will be true or false depending on whether the password matched the hash
		const passwordValid = await bycrypt.compare(password, user.password)
		if (!passwordValid) {
			return res.status(401).json({
				message: "Invalid credentials",

			})
		}
		res.json({
			message: `Welcome ${user.username}!`,
			data: `hai ${user.id}`
		})
	} catch (err) {
		next(err)
	}
})
router.get("/logout",async (req,res,next)=>{
	try{
		//delete the session on the server side, so the user is no longer authenticated
		req.session.destroy((err)=>{
			if(err){
				next(err)

			}
			else{
				res.status(204).end()
			}
		})
	}
	catch(err){
		next(err)
	}
})

module.exports = router