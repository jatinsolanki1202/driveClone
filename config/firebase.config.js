import fs from 'fs'
import Firebase from 'firebase-admin'
const serviceAccount = JSON.parse(fs.readFileSync('./drive-572ed-firebase-adminsdk-vzcmx-fe579d2698.json'));

const firebase = Firebase.initializeApp({
    credential: Firebase.credential.cert(serviceAccount),
    storageBucket: 'drive-572ed.appspot.com'
})

export default Firebase;