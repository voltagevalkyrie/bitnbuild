"use client";
import React, { useState, useEffect, useRef } from "react";

const Page = () => {
  // State to store selected category and fetched items
  const [selected, setSelected] = useState("fashion");
  const [email, setEmail] = useState(""); // To store email
  const [name, setName] = useState(""); // To store name
  const [message, setMessage] = useState(""); // To store message
  const [click, setClick] = useState(false); // To handle click event
  const [category, setCategory] = useState("fashion"); // To store category
  const Ref = useRef(null); // Corrected the useRef initialization

  // Function to send email
  const sendEmail = async() => {
    const response = await fetch("/api/sendmail", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ originalText:`${message} on the basis of catagory ${selected}`}), // Send the selected category to the API
    });
    if (response.ok) {
      alert("messeage is sent")
      setName("")
      setEmail("")
      setMessage("")
      
    }
  };

  // Function to handle category selection
  const handleCategorySelection = (categoryName) => {
    setCategory(categoryName);
    setSelected(categoryName);
    setClick(false); // Reset click state when category is selected
  };

  useEffect(() => {
    console.log(`Category changed to: ${category}`);
    // You can fetch data or refresh content here based on the selected category
  }, [category]); // This useEffect triggers when 'category' changes

  // Handling the Ref display behavior based on click
  useEffect(() => {
    if (Ref.current) {
      Ref.current.style.display = click ? "none" : "block";
    }
  }, [click]);

  const Logout = () => {
    localStorage.clear();
    setTimeout(() => {
      window.location.replace(`/`);
    }, 500);
  };

  return (
    <>
      <div className="h-screen w-screen flex">
        {/* Sidebar */}
        <div className="h-screen bg-black text-white w-[20%]">
          <div className="h-[10%] w-[100%] p-5 font-serif text-pretty text-2xl">Category</div>
          {/* Category Buttons */}
          <div className="h-[10%] w-[100%] p-5 font-serif text-pretty text-xl">
            <button
              onClick={() => handleCategorySelection("fashion")}
              style={{
                padding: "10px 20px",
                margin: "0px",
                color: selected === "fashion" ? "#4f46e5" : "white",
                border: "1px solid black",
                cursor: "pointer",
              }}
            >
              Fashion
            </button>
          </div>
          <div className="h-[10%] w-[100%] p-5 font-serif text-pretty text-xl">
            <button
              onClick={() => handleCategorySelection("homeproducts")}
              style={{
                padding: "10px 20px",
                margin: "0px",
                color: selected === "homeproducts" ? "#4f46e5" : "white",
                border: "1px solid black",
                cursor: "pointer",
              }}
            >
              Home products
            </button>
          </div>
          <div className="h-[10%] w-[100%] p-5 font-serif text-pretty text-xl">
            <button
              onClick={() => handleCategorySelection("electronics")}
              style={{
                padding: "10px 20px",
                margin: "0px",
                color: selected === "electronics" ? "#4f46e5" : "white",
                border: "1px solid black",
                cursor: "pointer",
              }}
            >
              Electronics
            </button>
          </div>
          <div className="h-[10%] w-[100%] p-5 font-serif text-pretty text-xl">
            <button
              onClick={() => handleCategorySelection("books")}
              style={{
                padding: "10px 20px",
                margin: "0px",
                color: selected === "books" ? "#4f46e5" : "white",
                border: "1px solid black",
                cursor: "pointer",
              }}
            >
              Books
            </button>
          </div>
          <div className="h-[10%] w-[100%] p-5 font-serif text-pretty text-xl">
            <button
              onClick={() => handleCategorySelection("accessories")}
              style={{
                padding: "10px 20px",
                margin: "0px",
                color: selected === "accessories" ? "#4f46e5" : "white",
                border: "1px solid black",
                cursor: "pointer",
              }}
            >
              Accessories
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="h-screen w-[80%]">
          <div className="w-[100%] h-[10%] border border-white flex text-white bg-black">
            <div className="h-[100%] w-[40%] p-5 font-serif text-pretty text-xl">CodeJS</div>
            <button className="h-[100%] w-[20%] p-5 font-serif text-pretty text-md">GitHub</button>
            <button className="h-[100%] w-[20%] p-5 font-serif text-pretty text-md">Contact</button>
            <button onClick={Logout} className="h-[100%] w-[20%] p-5 font-serif text-pretty text-md">
              Logout
            </button>
          </div>

          {click && (
            <div className="w-[90%] flex justify-center align-middle h-[90%]">
              <div className="w-[60%] input flex flex-col align-middle justify-center h-[100%]">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-5 py-3 change border-2 border-neutral-600 my-3 placeholder:text-gray-500 sm:placeholder:text-md placeholder:text-xs placeholder:font-serif"
                  placeholder="Enter your name."
                  required
                />
                <input
                  type="text"
                  value={selected}
                  className="w-full px-5 change py-3 border-2 border-neutral-600 my-3 placeholder:text-gray-500 sm:placeholder:text-md placeholder:text-xs placeholder:font-serif"
                  readOnly
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-5 change py-3 border-2 border-neutral-600 my-3 placeholder:text-gray-500 sm:placeholder:text-md placeholder:text-xs placeholder:font-serif"
                  placeholder="Enter your email."
                  required
                />
                <textarea
                  id="paragraph"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  name="paragraph"
                  className="w-full change h-[40%] px-5 py-3 my-3 border-2 border-neutral-600 placeholder:text-gray-500 placeholder:text-md placeholder:font-serif"
                  placeholder="Mention address and contact details"
                  required
                />
                <div className="w-full mt-5 h-[20%] flex justify-center align-middle">
                  <button
                    className="w-[20%] h-[60%] button bg-black rounded-xl text-sm font-serif font-bold border-gray-500 border-2 text-white"
                    onClick={sendEmail}
                  >
                    Send mail
                  </button>
                </div>
              </div>
            </div>
          )}

          <button
            ref={Ref}
            onClick={() => {
              setClick(true);
            }}
            className="bg-green-500 grid p-2 rounded-3xl my-60 mx-96 place-items-center w-[20%]"
          >
            We can take these items
          </button>
        </div>
      </div>
    </>
  );
};

export default Page;

