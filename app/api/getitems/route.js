import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connect } from "./address";
import { Userid } from "./find_address";



export async function POST(req){
	await mongoose.connect(connect)
	const user=await Userid.findOne({name:"doner"})
	return NextResponse.json({success:true,result:user});
	
}
