"use client";
import Image from "next/image";
import "../globals.css";
import React, { useState } from "react";

import Profile from "../components/Profile";

const ImageGenerator = () => {
  const [output, setOutput] = useState(""); // To store AI response
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null); // Track selected category
  const [fileInput, setFileInput] = useState(null); // Store the uploaded image file
  const [showUploadForm, setShowUploadForm] = useState(false); // Toggle form visibility

  // Categories
  const categories = [
    { id: 1, name: "Fashion", path: "/fashion", img: "/cloth.jpeg", questions: "what are the Fashion items present in this image , identify it with colour and give me it in the form for array without any extra text" },
    { id: 2, name: "Accessories", path: "/accessories", img: "/accessories.jpg", questions: "what are the accessories items present in this image , identify it  and give me it in the form for array without any extra text" },
    { id: 3, name: "Home Products", path: "/homeprod", img: "/homeprod.avif", questions: "what are the Home Products present in this image , identify it with colour and give me it in the form for array without any extra text" },
    { id: 4, name: "Electronics", path: "/electronics", img: "/electronics.jpeg", questions: "what are the electronics items present in this image , identify it with colour and give me it in the form for array without any extra text" },
    { id: 5, name: "Books", path: "/books", img: "/books.jpg", questions: "what are the bookes present in this image , identify it with colour and give me it in the form for array without any extra text" },
  ];

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setShowUploadForm(true);
  };

  const handleFileChange = (e) => {
    setFileInput(e.target.files[0]);
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setLoading(true);

    try {
      const imageBase64 = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(",")[1]);
        reader.onerror = reject;
        reader.readAsDataURL(fileInput);
      });

      // Send the image and the fixed questions to the AI
      const response = await fetch("/api/airesponse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image: imageBase64,
          questions: selectedCategory.questions, // Predefined questions
        }),
      });

      const result = await response.json();
      setOutput(result.response);
    } catch (e) {
      setOutput(`Error: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <nav className="bg-[#ffffff]">
        <div className="flex justify-between items-center py-2 px-7">
          <div className="flex justify-center">
            <span className="text-[45px] z-20 logo">CodeJS</span>
          </div>
          <div className="w-full max-w-sm min-w-[200px] relative">
            <div className="relative">
              <input
                type="email"
                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-10 py-2"
                placeholder="Enter your text"
              />
            </div>
          </div>
          <div className="flex justify-center items-center pr-10 gap-10 text-[15px]">
            <a href="/" className="aanim relative focus:text-[#696969]">Home</a>
            <a href="https://github.com/voltagevalkyrie/bitnbuild" target="./main" className="aanim relative focus:text-[#696969]">GitHub</a>
            <a href="/collaborators" className="aanim relative focus:text-[#696969]">Collaborators</a>
          </div>
        </div>
      </nav>

      <Profile />
      <div className="flex w-[75%] h-[85vh] items-center justify-center">
        <div className="w-[85%] h-[85%] bg-[#0000000d] cshadow rounded-sm py-2 flex flex-col gap-3 centerbg">
          <div className="text-center text-[30px] font-semibold">Your Categories</div>

          <div className="w-[100%] h-[100%] flex flex-col gap-20 ">
            <div className="flex w-full h-1/3 justify-center gap-14">
              {categories.map((item, index) => (
                <button key={index} onClick={() => handleCategoryClick(item)}>
                  <div className="flex flex-col justify-center gap-2">
                    <img className="w-[100px] h-[100px] rounded-full catshadow" src={item.img} alt={item.name} />
                    <div className="text-center text-[15px] font-medium">{item.name}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Show the form after selecting the category */}
          {showUploadForm && (
            <div className="mt-5">
              <h3 className="text-[20px] font-semibold text-center">Upload Image for {selectedCategory.name}</h3>

              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input type="file" accept="image/*" onChange={handleFileChange} required />

                <button type="submit" className="bg-blue-500 text-white px-4 py-2">
                  Submit
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ImageGenerator;
