const router = require('express').Router()
const { 
    verifyToken, 
    verifyTokenAndAuthorization, 
    verifyTokenAndAdmin 
} = require('../middleware/verifyToken')
const User = require('../models/User')
const CryptoJS = require('crypto-js')


// @desc: updating user
// ROUTE PUT/
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    //encrypt password again should user change it
    if(req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password , 
            process.env.PASSWORD_SECRET).toString()
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            // take everything and insert
            $set: req.body
        }, { new: true })
        res.status(200).json(updatedUser)
    } catch (err) {
        res.status(500).json(err)
    }
})

// @desc: delete user
// ROUTE DELETE/
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User has been deleted...")
    } catch (err) {
        res.status(500).json(err)
    }
})

// @desc: get user
// only admin can get any user
// ROUTE GET/
http://localhost:5000/api/users/find/id
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        const { password, ...others } = user._doc
        // return everything except the password
        res.status(200).json(others)
    } catch (err) {
        res.status(500).json(err)
    }
})

// @desc: get all users
// only admin can get all users
// ROUTE GET/
// http://localhost:5000/api/users/stats
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    const query = req.query.new
    try {
        // http://localhost:5000/api/users?new=true
        // when used this way, instead of
        // http://localhost:5000/api/users
        const users = query 
        ? await User.find().sort({ _id: -1 }).limit(5)
        : await User.find()
        res.status(200).json(users)
    } catch (err) {
        res.status(500).json(err)
    }
})

// @desc: get user stats
// only admin can get all user stats
// ROUTE GET/
router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
    const date = new Date()
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1))

    try {
        const data = await User.aggregate([
            { $match: { createdAt: { $gte: lastYear}}},
            {
                // exact month
                $project: {
                    month: { $month: "$createdAt"}
                },
            },
            {
                
                // number of users with that month as created at date
                $group: {
                    _id: "$month",
                    total: { $sum: 1 },
                },
            },
        ])
        res.status(200).json(data)
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router