const express = require("express");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require('uuid');
const router = express.Router();
const AdminUser = require("../models/AdminUser");
const RefreshToken = require("../models/RefreshToken");
const jwt = require("jsonwebtoken");




router.post("/login", async (req, res) => {
    let { email, password } = req.body;


    let adminUser = await AdminUser.findOne({ email, password, isDeleted: false })

    if (adminUser) {
        const token = jwt.sign({ id: adminUser._id }, "my_secret_key", {
            expiresIn: "2h",
        })

        //guid ile refresh token üretip hem db ye kaydedip hem de client a gönder
        const refreshToken = uuidv4();

        let newRefreshtoken = new RefreshToken({
            token: refreshToken,
            userId: adminUser._id,
            expiresAt: new Date(Date.now() + 60 * 60 * 4000), // 4 hours
            createdByIp: "0.0.0.0"
        })

        await newRefreshtoken.save();

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
        })

        res.cookie("token", token, {
            httpOnly: true,
        })
        return res.json({ status: "success", message: "Login successful" })
    }
    else {
        return res.status(404).json({ status: "error", message: "Invalid email/password" })
    }
})


router.post("/refresh-token", async (req, res) => {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
        return res.status(401).json({ status: "error", message: "Refresh token is required" })
    }

    let refreshTokenDoc = await RefreshToken.findOne({
        token: refreshToken,
    })

    if(refreshTokenDoc.expiresAt < new Date()) {
        return res.status(401).json({ status: "error", message: "Refresh token expired" })
    }

    if (!refreshTokenDoc) {
        return res.status(401).json({ status: "error", message: "Invalid refresh token" })
    }

    let token = jwt.sign({ id: refreshTokenDoc.userId}, "my_secret_key", {
        expiresIn: "2h",
    })

    res.cookie("token", token, {
        httpOnly: true,
    })

    return res.json({ status: "success", message: "Token refreshed" })

})


router.post("/logout", async (req, res) => {

    res.clearCookie("token");
    res.clearCookie("refreshToken");

    return res.json({ status: "success", message: "Logged out" })
})


router.get("/google", (req,res) => {

    console.log("req.body", req.body)
    return res.send("OK!")

})


router.post("/google", (req,res) => {

    console.log("req.body", req.body)
    return res.send("OK!")

})



module.exports = router;