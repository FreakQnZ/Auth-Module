import mongoose from "mongoose";

const User = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        token_version: {
            type: Number,
            required: true
        }
    },
    { collection: "user-data" }
)

const model = mongoose.model("User", User)

export default model