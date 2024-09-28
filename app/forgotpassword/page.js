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
  const [sentpass, setSentpass] = useState(false)
  const [password, setpassword] = useState(" ")
  const copying = useRef("")
  const copyed = useRef("")
  const copies = () => {
    navigator.clipboard.writeText(password);
    copyed.current.style.display = "block"
    copying.current.style.display = "none"
  }

  const Submit = async (e) => {
    e.preventDefault()
    const data = await fetch("/api/forgotpassword", {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email })
    })
    if (data.ok) {
      window.location.replace("/")

    }

  }
  return (
    <div className="flex bg-[#f4f4f4] h-[100vh] flex-col justify-center items-center w-[100vw]">

      <div className="text-center">
        <h2 className=" text-2xl  font-bold ">
          Get your Password
        </h2>
      </div>

      <div className="mt-5 w-[30%] h-[70vh] lap:mx-auto bg-[#00000007] shadow1 rounded-xl flex items-center justify-center">
        <div className=" lap:w-full lap:max-w-sm h-full">

          <form onSubmit={Submit} method="POST" className=" space-y-6 flex flex-col gap-2 pt-10">
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
              <label htmlFor="email" className="block text-sm font-medium leading-6  text-gray-900">
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
            <div>
              <button
              onClick={()=>setSentpass(true)}
                type="submit"
                className="smooth flex w-full justify-center rounded-md bg-indigo-600 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#000] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get Password
              </button>
              <div className={`text-[#bf0000] text-center mt-2 text-[14px] font-medium ${sentpass? 'block' : 'hidden'}`}>*Your password is sent please check your mail</div>
            </div>
          </form>

        </div>
      </div>
    </div>
  )
}  