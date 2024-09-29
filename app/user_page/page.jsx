"use client";
import Image from "next/image";
import "../globals.css";
import React, { useState,useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import Profile from "../components/Profile";
const { GoogleGenerativeAI } = require("@google/generative-ai");
import { FaSearch } from "react-icons/fa";

const ImageGenerator = () => {
  const [output, setOutput] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [data1, setdata1] = useState("")
  const [selectedCategory, setSelectedCategory] = useState(null); 
  const [fileInput, setFileInput] = useState(null); 
  const [showUploadForm, setShowUploadForm] = useState(false); 
  const [input, setinput] = useState("")
  const [display, setdisplay] = useState("")
  const [bgColor, setBgColor] = useState('bg-blue-800');
  const categories = [
    { id: 1, name: "fashion", path: "/fashion", img: "/cloth.jpeg", questions: "what are the Fashion items present in this image , identify it with colour and give me it in the form for array without any extra text" },
    { id: 2, name: "accessories", path: "/accessories", img: "/accessories.jpg", questions: "what are the accessories items present in this image , identify it  and give me it in the form for array without any extra text" },
    { id: 3, name: "homeproducts", path: "/homeprod", img: "/homeprod.avif", questions: "what are the Home Products present in this image , identify it with colour and give me it in the form for array without any extra text" },
    { id: 4, name: "electronics", path: "/electronics", img: "/electronics.jpeg", questions: "what are the electronics items present in this image , identify it with colour and give me it in the form for array without any extra text" },
    { id: 5, name: "books", path: "/books", img: "/books.jpg", questions: "what are the bookes present in this image , identify it with colour and give me it in the form for array without any extra text" },
  ];
const submit=async()=>{
  const token = localStorage.getItem('Token');
    if (!token) {
      console.error('No token found');
      return;
    }
    
  
    const decoded = jwtDecode(token, '@deekshigowda');
  const respon=await fetch("/api/getdata", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: decoded.email
       // Predefined questions
    }),

  });
  const data= await respon.json();
  console.log(data.user.value);
  setdata1(data.user.value)
const good= JSON.stringify(data1, null, 2)
  const genAI = new GoogleGenerativeAI("AIzaSyBqesLtJwXmltzUG21f-1T0vNUvRXTwotM");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const prompt = `${input}.if it is there in that data then just say "No you already have one" if it is not there in that data just say "You can have it" comparing to this ${good}. `;

const result = await model.generateContent(prompt);
setdisplay(result.response.text())
  
}
  useEffect(() => {
    if(selectedCategory){
    const token = localStorage.getItem('Token');
    if (!token) {
      console.error('No token found');
      return;
    }
  
    const decoded = jwtDecode(token, '@deekshigowda');
    const response = async () => {
      await fetch("/api/addproductes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: decoded.email,value:{category: selectedCategory.name,
            item: output}
           // Predefined questions
        }),
      });
    };
  
    if (output) {
      response(); // <--- Call the function here
    }}
  }, [output, selectedCategory]);
  
  
  // Categories
  
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
      if (response.ok) {
        setBgColor('bg-blue-800')
      }
    } catch (e) {
      setOutput(`Error: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };
  const changeColor = () => {
    setBgColor('bg-red-800'); // Change to red using Tailwind class
  };

  return (
    <>
      <nav className="bg-[#ffffff]">
        <div className="flex justify-between items-center py-2 px-7">
          <div className="flex justify-center">
            <span className="text-[45px] z-20 logo">CodeJS</span>
          </div>
          <div className="w-full max-w-sm min-w-[200px] relative">
            <div className="relative flex">
              <input
                type="text"
                value={input}
                onChange={(e)=>{
                  setinput(e.target.value)
                  console.log(input);
                  
                }}
                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-10 py-2"
                placeholder="Enter the product name"
              />
              <button onClick={submit} className=" p-3 mx-2 bg-black rounded-full text-white"><FaSearch /></button>
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
      {display && <div className="h-[10%] py-2 text-[10px] font-serif text-center w-[60%]">{display}</div>}
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

          
          {showUploadForm && (
            <div className="mt-5">
              <h3 className="text-[20px] font-semibold text-center">Upload Image for {selectedCategory.name}</h3>

              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input type="file" accept="image/*" onChange={handleFileChange} required />

                <button onClick={changeColor} type="submit" className={`bg-blue-500 ${bgColor}  text-white px-4 py-2`}>
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
