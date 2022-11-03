import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    passward: {
        type: String,
        required: true
    }
});




// const collection 

const userModel = mongoose.model('bloguser', userSchema);

export default userModel