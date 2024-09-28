import mongoose from "mongoose"
const signupschema=new mongoose.Schema({
    email:String,
    value:Array
})
export const Userid = mongoose.models.items||mongoose.model("items",signupschema)