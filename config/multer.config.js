import fs from 'fs';
import multer from 'multer'
import firebaseStorage from 'multer-firebase-storage'
import firebase from './firebase.config.js'
const serviceAccount = JSON.parse(fs.readFileSync('./drive-572ed-firebase-adminsdk-vzcmx-fe579d2698.json'));

const storage = firebaseStorage({
    credentials: firebase.credential.cert(serviceAccount),
    bucketName: 'drive-572ed.appspot.com',
    unique: true
})

const upload = multer({
    storage: storage,
})

export default upload