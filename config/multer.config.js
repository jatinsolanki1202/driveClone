import multer from 'multer'
import firebaseStorage from 'multer-firebase-storage'
import firebase from './firebase.config.js'
import serviceAccount from '../drive-572ed-firebase-adminsdk-vzcmx-742035eccb.json' assert { type: 'json' }

const storage = firebaseStorage({
    credentials: firebase.credential.cert(serviceAccount),
    bucketName: 'drive-572ed.appspot.com',
    unique: true
})

const upload = multer({
    storage: storage,
})

export default upload