"use client"
import { Result } from "postcss";
import { useState } from "react"
import 'react-toastify/dist/ReactToastify.css';
import { MdCopyAll } from "react-icons/md";
import { MdFileDownloadDone } from "react-icons/md";
import { useRef } from "react";

export default function Example() {
  const [name, setname] = useState()
  const [email, setemail] = useState()
  const [password, setpassword] = useState(" ")
  const copying = useRef("")
  const copyed = useRef("")
  const copies=()=>{
    navigator.clipboard.writeText(password);
    copyed.current.style.display = "block"
    copying.current.style.display="none"
  }
  
  const Submit=async(e)=>{
    e.preventDefault()
    const data= await fetch("/api/forgotpassword", {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name,email})
    })
    if(data.ok){
      window.location.replace("/")
      
    }

  }
    return (
      <div className="flex min-h-screen lap:h-[100vh] bg-[#f7f7f7] flex-1 flex-col  justify-center px-6 py-12 lap:py-0 ">
        <div className="flex min-h-full lap:h-[80vh] border bg-white shadow-lg shadow-slate-200 lap:shadow-xl lap:shadow-slate-200 flex-1 flex-col justify-center px-6  py-12 lap:py-2 lg:px-8">
          <div className="lap:mx-auto lap:w-full bg-white lap:max-w-sm">
            <img
              alt="Expenditure manager"
              src="https://cdn1.iconfinder.com/data/icons/shopping-essentials-3/32/invoice-bill-statement-purchase-expenditure-cost-shopping-1024.png"
              className="mx-auto h-10 bg-white w-auto"
            />
            <h2 className="mt-10 text-center text-2xl bg-white font-bold leading-9 tracking-tight text-gray-900">
             Get your Password
            </h2>
          </div>
  
          <div className="mt-10 lap:mx-auto bg-white lap:w-full lap:max-w-sm">
            <form  onSubmit={Submit} method="POST" className="bg-white space-y-6">
            <div className="bg-white">
                <label htmlFor="name" className="block text-sm font-medium bg-white leading-6 text-gray-900">
                  Name
                </label>
                <div className="mt-2 bg-white">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={name}
                    onChange={(e)=>{setname(e.target.value)}}
                    required
                    className="block px-4 w-full bg-white rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 lap:text-sm lap:leading-6"
                  />
                </div>
              </div>
              <div className="bg-white">
                <label htmlFor="email" className="block text-sm font-medium leading-6 bg-white text-gray-900">
                  Email address
                </label>
                <div className="mt-2 bg-white">
                  <input
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e)=>{setemail(e.target.value)}}
                    type="email"
                    required
                    autoComplete="email"
                    className="block bg-white px-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 lap:text-sm lap:leading-6"
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Get Password
                </button>
                <div classname="text-red-600 ">*Your password will be sent to Your gmail please check it</div>
              </div>
            </form>
  
            
          </div>
        </div>
      </div>
    )
  }  