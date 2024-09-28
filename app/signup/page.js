"use client"
import { useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Example() {
  const [name, setname] = useState()
  const [email, setemail] = useState()
  const [password, setpassword] = useState()
  
  const Submit=async(e)=>{
    e.preventDefault()
    console.log(name,password,email);
    const data= await fetch("/api", {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name,password,email})
    })
    if(data.ok){
      toast("Done!")
      const data = await fetch("/api/addexpenditure", {
        method: "post",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email})
      })
      setemail("")
      setname("")
      setpassword("")
      setTimeout(() => {
        window.location.replace("/")
      }, 2000);
      

    }

  }
    return (
      <div className="flex min-h-screen bg-[#f7f7f7] flex-1 flex-col  justify-center px-6 py-12 lg:px-[20%]">
        <div className="flex h-full border bg-white shadow-lg shadow-slate-200 md:shadow-xl md:shadow-slate-200 flex-1 flex-col justify-center px-6  py-12 lap:py-0 lap:pb-6 lg:px-8">
        <ToastContainer />
          <div className="lap:mx-auto lap:w-full bg-white lap:max-w-sm">
            <img
              alt="Expenditure manager"
              src="https://cdn1.iconfinder.com/data/icons/shopping-essentials-3/32/invoice-bill-statement-purchase-expenditure-cost-shopping-1024.png"
              className="mx-auto h-10 bg-white w-auto"
            />
            <h2 className="mt-10 text-center text-2xl bg-white font-bold leading-9 tracking-tight text-gray-900">
             Just Sign up
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
  
              <div className="bg-white">
                <div className="flex bg-white items-center justify-between">
                  <label htmlFor="password" className="block bg-white text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                  
                </div>
                <div className="mt-2 bg-white">
                  <input
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e)=>{setpassword(e.target.value)}}
                    type="password"
                    required
                    autoComplete="current-password"
                    className="block px-4 w-full bg-white rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 lap:text-sm lap:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign up
                </button>
              </div>
            </form>
  
            
          </div>
        </div>
      </div>
    )
  }  