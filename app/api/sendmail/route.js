import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connect } from "./address"; // Import your MongoDB connection string or function
import { Userid } from "./find_address"; // Import your user model or schema
import nodemailer from 'nodemailer';
import CryptoJS from 'crypto-js'; // Import CryptoJS properly

const transporter = nodemailer.createTransport({
  secure: true,
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: "deekshithgowda8888@gmail.com", // Replace with actual email
    pass: "rbtzeektxpwqwekd" // Replace with app-specific password (don't hardcode in production)
  }
});

export async function POST(req) {
  try {
    const payload = await req.json(); // Assuming you receive some data from the request body
    const { originalText } = payload; // Assuming originalText comes from the payload

    await mongoose.connect(connect); // Connect to MongoDB

    // Find all emails
    const emails = await Userid.find({}, 'email -_id'); // Fetch emails without _id field
    const emailList = emails.map((user) => user.email); // Extract email addresses from the result

    // Function to send emails
    function sendMail(to, subject, message) {
      const mailOptions = {
        to: to, // Recipient email(s)
        subject: subject, // Subject of the email
        html: message // Message body (in HTML format)
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
        } else {
          console.log("Email sent:", info.response);
        }
      });
    }



    // Send emails to all users in the email list
    emailList.forEach((email) => {
      sendMail(email, "Helping Peoples", originalText); // Adjust subject/message as needed
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ success: false, message: error.message });
  }
}
