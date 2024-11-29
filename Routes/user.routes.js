import express from 'express';
import { body, validationResult } from 'express-validator'
import userModel from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.get('/register', (req, res) => {
    res.render('registerUser');
})

router.post('/register',
    body('username').trim(),
    body('email').trim().isEmail(),
    body('password').trim().isLength({ min: 5 }),
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Invalid data'
            });
        }

        let { username, email, password } = req.body
        try {
            let existingUser = await userModel.findOne({ email })

            if (existingUser) {
                return res.status(400).send("User already exists")
            }

            let hashedPassword = await bcrypt.hash(password, 10)
            let newUser = await userModel.create({
                username,
                email,
                password: hashedPassword
            })

            const token = jwt.sign({ userId: newUser._id, email: newUser.email, username: newUser.username }, process.env.JWT_SECRET_KEY)
            res.cookie("token", token);
            return res.status(200).redirect("/")

        } catch (err) {
            console.error(err)
            return res.status(500).send("Server Error")
        }
    })

router.get('/login', (req, res) => {
    res.render('loginUser');
})

router.post('/login', async (req, res) => {
    let { email, password } = req.body

    let user = await userModel.findOne({ email })
    if (!user) {
        return res.render('../views/loginUser', { message: 'Invalid email or password' });
    }

    bcrypt.compare(password, user.password, function (err, result) {
        if (!result) return res.render('../views/loginUser', { message: 'Invalid email or password' });

        const token = jwt.sign({ userId: user._id, email: user.email, username: user.username }, process.env.JWT_SECRET_KEY)
        res.cookie("token", token);
        return res.status(200).redirect("/")
    });
})

router.get('/logout', (req, res) => {
    res.cookie("token", "")

    res.redirect("/user/login")
})

export default router