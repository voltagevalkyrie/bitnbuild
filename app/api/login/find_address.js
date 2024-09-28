import mongoose from "mongoose"
const signupschema=new mongoose.Schema({
    name:String,
    email:String,
    password:String
})
export const Userid = mongoose.models.signup||mongoose.model("signup",signupschema)