import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username: {
        type: 'string',
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: [3, 'username must be at least 3 characters long'],
    },
    email: {
        type: 'string',
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: 'string',
        required: true,
        minLength: [5, 'password must be at least 5 characters long'],
        trim: true
    }
})

const userModel = new mongoose.model("user", userSchema);

export default userModel;