import userModel from "../model/user.js";
import bcrypt from "bcrypt"


export const signupUser = async (request, response) => {
    try {
        const hashedPassward = await bcrypt.hash(request.body.passward , 10)
        const user = { username: request.body.username, name: request.body.name, passward: hashedPassward };
        const newUser = new userModel(user);
        await newUser.save();
        return response.status(200).json({ msg: 'Signup successfull' });
    }
    catch (error) {
        return response.status(400).json({ msg: 'Error while signing up user' });
    }
}