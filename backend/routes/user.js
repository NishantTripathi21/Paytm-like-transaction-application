const express = require("express");
const zod = require("zod");
const { authMiddleware } = require('../middlewares/user');
const { userDb } = require("../db");
const router = express.Router();
const JWT_SECRET = "NISAHI";
const jwt = require("jsonwebtoken");
const signupSchema= zod.object({
    firstName: zod.string(),
    lastName: zod.string(),
    username: zod.string(),
    password: zod.string()
})
router.post("/signup",async (req,res)=>{
    const body = req.body;
    const {success} = signupSchema.safeParse(req.body);
    if(!success) {
        return res.status(400).json({
            message: "Invalid input"
        })
    }
    const user = await userDb.findOne({ username: body.username });
    if(user) {
        return res.status(400).json({
            message: "User already exists"
        })
    }
    const dbuser = await userDb.create({
        firstName: body.firstName,
        lastName: body.lastName,
        username: body.username,
        password: body.password
    })
    const token = jwt.sign({
        userId: dbuser._id
    }, JWT_SECRET)
    res.json({
        message: "user created successfully",
        token: token
    })
})

router.post("/signin", async (req,res) => {
    const signinBody = zod.object({
        username: zod.string().email(),
        password: zod.string()
    })
    const { success } = signinBody.safeParse(req.body)
        if (!success) {
            return res.status(411).json({
                message: "Email already taken / Incorrect inputs"
            })
        }

        const user = await userDb.findOne({
            username: req.body.username,
            password: req.body.password
        });
    
        if (user) {
            const token = jwt.sign({
                userId: user._id
            }, JWT_SECRET);
      
            res.json({
                token: token
            })
            return;
        }
        res.status(411).json({
            message: "Error while logging in"
        })
})

const updateBody = zod.object({
	password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})

router.put("/", authMiddleware, async (req, res) => {
    const { success } = updateBody.safeParse(req.body)
    if (!success) {
        res.status(411).json({
            message: "Error while updating information"
        })
    }

    await userDb.updateOne(req.body, {
        id: req.userId
    })

    res.json({
        message: "Updated successfully"
    })
})

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await userDb.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

router.get("/getUsers",authMiddleware,async (req, res) => {
    const allUsers = userDb.find({})
    console.log(allUsers);
    res.json({
        user: allUsers
    })
    return;
})
module.exports = router