import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connect } from "./address";
import { Userid } from "./find_address";
const nodemailer= require('nodemailer');
const CryptoJS = require("crypto-js");
const transporter = nodemailer.createTransport(
	{
		secure:true,
		host:"smtp.gmail.com",
		port:465,
		auth:{
			user:"deekshithgowda8888@gmail.com",
			pass:"rbtzeektxpwqwekd"
		}
	}
)


export async function POST(req){
	const payload = await req.json();
	await mongoose.connect(connect)
	const user=await Userid.findOne({"email":payload.email})
    if(user){
	   var bytes  = CryptoJS.AES.decrypt(user.password, '@deekshigowda');
	   var originalText = bytes.toString(CryptoJS.enc.Utf8);
		if(payload.email== user.email && payload.name==user.name){
            function sendmail(to,sub,msg){
				transporter.sendMail(
					{to:to,
					subject:sub,
					html:msg}
				)
			}
			sendmail(user.email,"your password is",originalText)
			return NextResponse.json({success:true});

		}
		else{
			return NextResponse.json({success:false,password:"Invalid Name"});
		}

	}
	else{
		return NextResponse.json({success:false,password:"User not found"});
	}	
}
