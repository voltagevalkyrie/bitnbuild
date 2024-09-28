import mongoose from "mongoose"
const signupschema=new mongoose.Schema({
    email:String,
    fassion:Array,
    accessories:Array,
    homeproducts:Array,
    electronics:Array,
    books:Array,
    random:Array

})
export const Userid = mongoose.models.items||mongoose.model("items",signupschema)