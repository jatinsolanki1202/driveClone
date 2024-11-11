import Firebase from 'firebase-admin'
import serviceAccount from '../drive-572ed-firebase-adminsdk-vzcmx-d37ea92f73.json' assert { type: 'json' }

const firebase = Firebase.initializeApp({
    credential: Firebase.credential.cert(serviceAccount),
    storageBucket: 'drive-572ed.appspot.com'
})

export default Firebase;