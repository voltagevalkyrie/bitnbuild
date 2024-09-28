import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connect } from "./address"; // Ensure this imports your MongoDB connection string
import { Userid } from "./find_address"; // Ensure this imports your User model

export async function POST(req) {
  try {
    
    const payload = await req.json();
    const { email} = payload;

    // Ensure Mongoose connection
    await mongoose.connect(connect, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Validate the required fields
    if (!email) {
      throw new Error("Missing email or value in the request.");
    }

    // Ensure value is an array
    let user = await Userid.findOne({ email });

    // If user was not found or update failed, handle it here
    if (!user) {
      throw new Error("User not found or update failed.");
    }

    
    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error("Error during the update process:", error.message);
    return NextResponse.json({ success: false, error: error.message });
  } finally {
    // Optional: Close the connection if needed
    await mongoose.connection.close();
  }
}