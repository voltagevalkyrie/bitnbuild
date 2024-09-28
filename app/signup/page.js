"use client"
import { useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Example() {
  const [name, setname] = useState()
  const [email, setemail] = useState()
  const [password, setpassword] = useState()

  const Submit = async (e) => {
    e.preventDefault()
    console.log(name, password, email);
    const data = await fetch("/api", {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, password, email })
    })
    if (data.ok) {
      toast("Done!")
      setemail("")
      setname("")
      setpassword("")
      setTimeout(() => {
        window.location.replace("/")
      }, 2000);


    }

  }
  return (
    <div className="flex bg-[#f4f4f4] h-[100vh] flex-col justify-center w-[100vw]">
      <ToastContainer />
      <div className="text-center">
        <div className=" font-bold text-3xl">
           Organize yourself... Help others !!!
        </div>
        <h2 className="mt-5 text-center text-2xl  font-semibold leading-9 tracking-tight text-gray-900">
          Get Started
        </h2>
      </div>

      <div className="mt-5 w-[30%] h-[70vh] lap:mx-auto bg-[#00000007] shadow1 rounded-xl flex items-center justify-center">
        <div className=" lap:w-full lap:max-w-sm h-full">
          <form onSubmit={Submit} method="POST" className="space-y-6 flex flex-col gap-2 pt-10">
            <div className="">
              <label htmlFor="name" className="text-[15px] font-medium text-[#303030]">
                Name
              </label>
              <div className="mt-2 ">
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={(e) => { setname(e.target.value) }}
                  required
                  className="block w-full rounded-md border-0 p-3 text-gray-900 font-medium shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset outline-none focus:ring-[#0000002b] lap:text-sm lap:leading-6"
                />
              </div>
            </div>
            <div className="">
              <label htmlFor="email" className="text-[15px] font-medium text-[#303030]">
                Email address
              </label>
              <div className="mt-2 ">
                <input
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => { setemail(e.target.value) }}
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md border-0 p-3 text-gray-900 font-medium shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset outline-none focus:ring-[#0000002b] lap:text-sm lap:leading-6"
                />
              </div>
            </div>

            <div className="">
              <div className="text-[15px] font-medium text-[#303030]">
                <label htmlFor="password" className="block  text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>

              </div>
              <div className="mt-2 ">
                <input
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => { setpassword(e.target.value) }}
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 p-3 text-gray-900 font-medium shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset outline-none focus:ring-[#0000002b] lap:text-sm lap:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="smooth flex w-full justify-center rounded-md bg-indigo-600 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#000] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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