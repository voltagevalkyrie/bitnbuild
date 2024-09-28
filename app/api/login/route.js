import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connect } from "./address";
import { Userid } from "./find_address";
const CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');



export async function POST(req){
	const payload = await req.json();
	await mongoose.connect(connect)
	const user=await Userid.findOne({"email":payload.email})
    if(user){
	   var bytes  = CryptoJS.AES.decrypt(user.password, '@deekshigowda');
	   var originalText = bytes.toString(CryptoJS.enc.Utf8);
	   
	   console.log();
		if(payload.email== user.email && payload.password==originalText){
			var token = jwt.sign({email:user.email,name:user.name,password:user.password}, '@deekshigowda');
			return NextResponse.json({success:true,email:user.email,name:user.name,token:token});

		}
		else{
			return NextResponse.json({success:false,error:"Invaild password"});
		}

	}
	else{
		return NextResponse.json({success:false,error:"User not found"});
	}	
}
