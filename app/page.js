"use client"
import { useState, useEffect } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { jwtDecode } from "jwt-decode";
const CryptoJS = require("crypto-js");


export default function Example() {
  const [email, setemail] = useState()
  const [password, setpassword] = useState()
  const [selected, setSelected] = useState("User");

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {

    async function checkAndLogin() {

      {
        try {
          const token = localStorage.getItem('Token');
          if (!token) {
            console.error('No token found');
            return;
          }

          const decoded = jwtDecode(token, '@deekshigowda');
          if (!decoded) {
            console.error('Token verification failed');
            return;
          }
          var bytes = CryptoJS.AES.decrypt(decoded.password, '@deekshigowda');
          var originalText = bytes.toString(CryptoJS.enc.Utf8);
          const data = await fetch("/api/login", {
            method: "post",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: decoded.email, password: originalText })
          })
          const result = await data.json()
          const select = localStorage.getItem('select');
          if (result.success) {
            if (select === "User") {
              window.location.replace(`/user_page?token=${token}`)
            }
            else {
              window.location.replace(`/acceptor_page?token=${token}`)
            }

          } else {
            console.error('Login failed:', result.message);

          }
        } catch (error) {
          console.error('Error:', error);
        }
      }
    }
    setIsClient(true);

    checkAndLogin();
  }, []);





  const Submit = async (e) => {
    e.preventDefault()
    const data = await fetch("/api/login", {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
    const result = await data.json()
    if (result.success) {
      localStorage.setItem('Token', result.token)
      localStorage.setItem('select', selected)
      const tok = localStorage.getItem('Token');

      toast("Success")
      setemail("")
      setpassword("")
      setTimeout(() => {
        if (selected === "User") {
          window.location.replace(`/user_page?token=${tok}`)
        }
        else {
          window.location.replace(`/acceptor_page?token=${tok}`)
        }

      }, 500);
    }
    else {

      toast.error(result.error)
      setemail("")
      setpassword("")
    }


  }

  return (
    <>
      <div className="flex bg-[#f4f4f4] h-[100vh] flex-col justify-center c ">
        <ToastContainer />
        <div className=" flex justify-center gap-1">
          <button className="smooth shadow2 border-none outline-none"
            onClick={() => setSelected("User")}
            style={{
              width: "15%",
              height: "40px",
              margin: "0px",
              backgroundColor: selected === "User" ? "#4f46e5" : "white",
              cursor: "pointer",
              borderRadius: "5px",
              fontWeight: "bold",
            }}
          >
            USER
          </button>

          <button className="smooth shadow2 border-none outline-none"
            onClick={() => setSelected("Acceptor")}
            style={{
              width: "15%",
              margin: "0px",
              backgroundColor: selected === "Acceptor" ? "#4f46e5" : "white",
              cursor: "pointer",
              borderRadius: "5px",
              fontWeight: "bold",
            }}
          >
            DISTRIBUTOR
          </button>
        </div>

        <div className="mt-5 w-[30%] h-[70vh] lap:mx-auto bg-[#00000007] shadow1 rounded-xl flex items-center justify-center">
          <div className=" lap:w-full lap:max-w-sm h-full">
            <form onSubmit={Submit} method="POST" className=" space-y-6 flex flex-col gap-2 pt-10 ">
              <div className="">
                <label htmlFor="email" className="text-[15px] font-medium text-[#303030]">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => { setemail(e.target.value) }}
                    required
                    autoComplete="email"
                    className="block w-full rounded-md border-0 p-3 text-gray-900 font-medium shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset outline-none focus:ring-[#0000002b] lap:text-sm lap:leading-6"
                  />
                </div>
              </div>

              <div className="">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-[15px] font-medium text-[#303030]">
                    Password
                  </label>
                  <div className="text-sm ">
                    <a href="/forgotpassword" className="font-semibold  text-indigo-600 hover:text-indigo-500">
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2 ">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => { setpassword(e.target.value) }}
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
                  Log in
                </button>
              </div>
            </form>

            <p className="mt-10 text-[16px] text-center text-sm text-gray-500">
              Don't have a account?{' '}
              <a href="/signup" className="aanim relative leading-6 text-[16px] font-semibold text-[#4f46e5] focus:text-[#000000]">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}  