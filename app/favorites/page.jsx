"use client";
import React, { useState, useEffect } from 'react';

const Page = () => {
  // State to store selected category and fetched items
  const [selected, setSelected] = useState("fassion");
  const [items, setItems] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(false); // To show a loading indicator
  const [error, setError] = useState(null); // To handle errors
  const [add, setadd] = useState(false)
  const address=()=>{
    setadd(true)
  }
   // Logout function
  const Logout = () => {
    localStorage.clear();
    setTimeout(() => {
      window.location.replace(`/`);
    }, 500);
  };

 
  const fetchCategoryItems = async () => {
    try {
      setLoading(true); // Start loading
      const response = await fetch("/api/getitems", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ category: selected }), // Send the selected category to the API
      });

      const data = await response.json();
      setLoading(false); // End loading

      if (data.success && data.result[selected]) {
        setItems(data.result[selected]); // Ensure the selected category exists
      } else {
        setItems([]); // If no items are found, set an empty array
        setError(`No items found for ${selected}`);
      }
    } catch (error) {
      setLoading(false); // End loading
      setError("Error fetching data");
      console.error("Error fetching data:", error);
    }
  };

  // Fetch items when the selected category changes
  useEffect(() => {
    fetchCategoryItems();
  }, [selected]);

  return (
    <>
      <div className="h-screen w-screen flex">
        {/* Sidebar */}
        <div className="h-screen bg-black text-white w-[20%]">
          <div className="h-[10%] w-[100%] p-5 font-serif text-pretty text-2xl">Category</div>
          <div className="h-[10%] w-[100%] p-5 font-serif text-pretty text-xl">
            <button
              onClick={() => setSelected("fassion")}
              style={{
                padding: "10px 20px",
                margin: "0px",
                color: selected === "fassion" ? "#4f46e5" : "white",
                border: "1px solid black",
                cursor: "pointer",
              }}
            >
              Fassion
            </button>
          </div>
          <div className="h-[10%] w-[100%] p-5 font-serif text-pretty text-xl">
            <button
              onClick={() => setSelected("homeproducts")}
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
              onClick={() => setSelected("electronics")}
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
              onClick={() => setSelected("books")}
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
              onClick={() => setSelected("accessories")}
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
            <button onClick={Logout} className="h-[100%] w-[20%] p-5 font-serif text-pretty text-md">Logout</button>
          </div>

          {/* Render Category Items */}
          <div className='h-[80%]'>
            {loading ? (
              <div className="text-gray-700 text-lg">Loading...</div>
            ) : error ? (
              <div className="text-red-500 text-lg">{error}</div>
            ) : (
              <ul className="list-disc list-inside bg-gray-100 p-4 rounded-md shadow-md">
                {items.length > 0 ? (
                  items.map((item, index) => (
                    <li key={index} className="text-gray-700 text-lg">
                      {item}
                    </li>
                  ))
                ) : (
                  <li className="text-gray-500 text-lg">No items found for {selected}</li>
                )}
              </ul>
            )}
          </div>
          <div className='grid w-[100%] text-white font-serif text-md place-items-center'><button onClick={address} className='bg-green-500 grid p-2 rounded-3xl place-items-center w-[20%]'>We can take this items</button></div>
        </div>
      </div>
    </>
  );
};

export default Page;
