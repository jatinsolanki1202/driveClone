import express from 'express'
import upload from '../config/multer.config.js';
import fileModel from '../models/files.model.js';
import authMiddleware from '../middlewares/auth.js';
import firebase from '../config/firebase.config.js'

const router = express.Router();

router.get('/', authMiddleware, async (req, res) => {

    const userFiles = await fileModel.find({ user: req.user.userId })
    res.render("../views/index", {
        files: userFiles,
        user: req.user.username
    })

})

router.post('/upload-file', authMiddleware, upload.single('file'), async (req, res) => {

    try {
        const newFile = await fileModel.create({
            path: req.file.path,
            originalName: req.file.originalname,
            user: req.user.userId
        });

        return res.status(200).redirect('/');
    } catch (error) {
        console.error("Error uploading file:", error); // Logs the exact error
        return res.status(500).json({ message: "File upload failed", error });
    }
})

router.get('/download/:filePath', authMiddleware, async (req, res) => {

    const loggedInUser = req.user.userId
    const filePath = req.params.filePath

    const file = await fileModel.findOne({ path: filePath, user: loggedInUser });

    if (!file) {
        return res.status(401).json({ message: 'unauthorized' })
    }

    const signedUrl = await firebase.storage().bucket().file(filePath).getSignedUrl({
        action: 'read',
        expires: Date.now() + 60 * 1000
    });

    return res.redirect(signedUrl[0])
})
export default router