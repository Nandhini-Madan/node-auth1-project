const express = require("express")
const users = require("./userModel")
const bycrypt = require("bcryptjs")
const router = express.Router()

router.get("/users", async (req, res, next) => {
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
        const user = await users.getByUsername(username)
        if (user) {
            res.status(409).json({
                message: "User already exists"
            })
        }
        else {
            const newuser = await users.insertUser({
                username,
                password: await bycrypt.harsh(password, 10) //password has been encrypted to 10 md5
            })
            res.status(200).json({ newuser })
        }
    }
    catch (err) {
        next(err)
    }
})

module.exports = router