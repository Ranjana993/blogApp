import mongoose from "mongoose"

export const Connection = async () => {
    const URL = "mongodb://localhost:27017"
    try {
        await mongoose.connect(URL, { useNewUrlParser: true })
        console.log("Successful connected :)");
    }
    catch (error) {
        console.log("database error in db/data.js", error)
    }
}