import { Router } from "express";
import User from "../models/users.model.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const router = Router();

router.get("/validate", (req, res) => {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]

    if (!token) {
        return res.json({ status: "error", type: 1, error: "No token provided" })
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
        if (err) {
            return res.json({ status: "error", type: 2, error: "Failed to authenticate token" })
        }

        const user_data = await User.findOne({
            username: user.username
        })

        if (!user_data) {
            return res.json({ status: "error", type: 2, error: "Failed to authenticate token" })
        }

        if (user_data.token_version !== user.token_version) {
            return res.json({ status: "error", type: 2, error: "Failed to authenticate token" })
        }

        res.json({ status: "ok" })
    })
})

router.post("/newUser", async (req, res) => {
    try {

        const hash = await bcrypt.hash(req.body.password, 13)

        const payload = {
            username: req.body.username,
            password: hash,
            email: req.body.email,
            token_version: 1
        }

        await User.create(payload)

        const jwt_payload = {
            username: req.body.username,
            email: req.body.email,
            token_version: 1
        }

        const token = jwt.sign(jwt_payload, process.env.JWT_SECRET)

        res.json({ status: "ok", token })
    } catch (error) {
        if (error?.keyPattern) {
            res.json({ status: "error", error: Object.keys(error?.keyPattern)[0] })
        } else {
            res.json({ status: "error", error })
        }
    }
})

router.post("/login", async (req, res) => {
    const user = await User.findOne({
        username: req.body.username,
    })

    if (user) {
        const match = await bcrypt.compare(req.body.password, user.password)

        if (match) {
            const payload = {
                username: user.username,
                email: user.email,
                token_version: user.token_version
            }

            const token = jwt.sign(payload, process.env.JWT_SECRET)
            res.json({ status: "ok", token })
        } else {
            res.json({ status: "error", user: false })
        }

    } else {
        res.json({ status: "error", user: false })
    }
})


export default router;