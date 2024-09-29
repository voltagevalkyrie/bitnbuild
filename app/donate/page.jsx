"use client";
import React, { useState } from 'react';
import { jwtDecode } from "jwt-decode";// Make sure you have jwt-decode installed
const { GoogleGenerativeAI } = require("@google/generative-ai");

const Page = () => {
  const [selected, setSelected] = useState("fassion");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState(""); // State for AI response
  const [data1, setData1] = useState(""); // Use camelCase for state variables
  const [display, setDisplay] = useState(""); // State to hold display content

  const predefinedQuestions = "What are the products you can see in this image? Give it one in the array format without any sentences.";

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file); 
    }
  };

  const handleSubmit = async () => {
    if (!image) {
      setOutput("Please upload an image.");
      return;
    }

    setLoading(true); // Start loading
    try {
      // Convert the image to Base64
      const imageBase64 = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(",")[1]); // Get only the Base64 part
        reader.onerror = reject;
        reader.readAsDataURL(image); // Read the file as data URL
      });

      // Prepare the request body
      const response = await fetch("/api/airesponse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image: imageBase64,
          questions: predefinedQuestions, // Use the fixed question
        }),
      });

      const result = await response.json();
      setOutput(result.response); 

      const token = localStorage.getItem('Token');
      if (!token) {
        console.error('No token found');
        return;
      }
  
      const decoded = jwtDecode(token); // Decode without the second parameter (it is the secret key)

      const responseData = await fetch("/api/getdata", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: decoded.email,
        }),
      });

      const data = await responseData.json();
      console.log(data.user.value);
      setData1(data.user.value);

      const good = JSON.stringify(data1, null, 2); // Fixed variable name

      const genAI = new GoogleGenerativeAI("AIzaSyBqesLtJwXmltzUG21f-1T0vNUvRXTwotM");
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `${output} and ${good} comparing the two data give me which is not common in the form of an array without any extra sentence.`;

      const result2 = await model.generateContent(prompt);
      setDisplay(result2.response.text); // Correctly set display content

      // Add products to the database
      await fetch("/api/addproductes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: decoded.email,
          value: {
            display
          },
        }),
      });

    } catch (e) {
      setOutput(`Error: ${e.message}`);
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <>
      <div className="h-screen w-screen flex">
        {/* Sidebar */}
        <div className="h-screen bg-black text-white w-[20%]">
          <div className="h-[10%] w-[100%] p-5 font-serif text-pretty text-2xl">Category</div>
          {/* Category Buttons */}
          {/* (Category buttons can be added here if needed) */}
        </div>

        {/* Main Content */}
        <div className="h-screen w-[80%]">
          <div className="w-[100%] h-[10%] border border-white flex text-white bg-black">
            <div className="h-[100%] w-[40%] p-5 font-serif text-pretty text-xl">CodeJS</div>
            <button className="h-[100%] w-[20%] p-5 font-serif text-pretty text-md">GitHub</button>
            <button className="h-[100%] w-[20%] p-5 font-serif text-pretty text-md">Contact</button>
            <button onClick={() => { localStorage.clear(); window.location.replace(`/`); }} className="h-[100%] w-[20%] p-5 font-serif text-pretty text-md">Logout</button>
          </div>

          {/* Render Category Items */}
          <div className='h-[80%]'>
            {/* Image Input */}
            <div className="h-[20%] p-5">
              <label htmlFor="image-upload" className="text-gray-700 text-lg font-serif">Upload Image:</label>
              <input
                type="file"
                id="image-upload"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full p-3 mt-2 border border-gray-400 rounded-md"
              />
              <button onClick={handleSubmit} className="mt-4 p-2 bg-blue-500 text-white rounded">Submit</button>
            </div>
            {display && (
              <div className="text-lg font-serif text-gray-700 mt-5">{display}</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
