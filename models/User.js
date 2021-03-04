import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {type: String, required: true,min:3,max:255},
    email: {type: String, required: true,min:6,max:255},
    password: {type: String, required: true,max:50,min:6},
});

const User = mongoose.model("User", userSchema);

export default User;
