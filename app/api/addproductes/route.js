import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connect } from "./address";
import { Userid } from "./find_address";

export async function POST(req) {
  const payload = await req.json();
  await mongoose.connect(connect);

  // Assuming 'category' is part of the payload and indicates which category to update
  const { email, category, item } = payload;
  const array = item
    .split('\n') // Split the string by newline characters
    .map(item => item.trim()) // Trim extra spaces
    .filter(item => item !== '') // Filter out any empty strings
    .map(item => item.replace('- ', '')); // Remove the leading "- "
  
  // Convert the input array to a 1D array
  const outputArray = array[0].replace('[', '').replace(']', '').split(',').map(item => item.trim());
  
  console.log(outputArray);

  // Find the user by email and update the specific category
  await Userid.updateOne(
    { email: email },
    { $push: { [category]: { $each: outputArray } } }, // Using $each to add multiple items
    { upsert: true } // Using dynamic field name for the category
  );
  console.log("good");

  return NextResponse.json({ success: true });
}
