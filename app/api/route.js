import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connect } from "./address";
import { userid } from "./find_address";
var CryptoJS = require("crypto-js");


export async function POST(req){
	const {name,email,password} = await req.json();
	await mongoose.connect(connect)
	const password01=await new userid({name,email,password:CryptoJS.AES.encrypt(password, '@deekshigowda').toString()});
	const result=await password01.save();
	return NextResponse.json({result,success:true});
	
}
