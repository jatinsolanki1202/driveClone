import mongoose from 'mongoose'

async function connectToDb() {
    let uri = process.env.MONGO_URI
    await mongoose.connect(uri).then(() => {
        console.log("Database Connected");
    })
}

export default connectToDb