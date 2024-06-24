import { Router } from "express";
import User from "../models/users.model.js"
import jwt from "jsonwebtoken"

const router = Router();

router.post("/newUser", async (req, res) => {
    try {
        await User.create({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            token_version: 1
        })


        res.json({ status: "ok" })
    } catch (error) {
        res.json({ status: "error", error: Object.keys(error?.keyPattern)[0] })
    }
})

router.post("/login", async (req, res) => {
    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    })
    if (user) {
        res.json({ status: "ok", user: true })
    } else {
        res.json({ status: "error", user: false })
    }
})

export default router;