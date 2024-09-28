"use client"
import { useState,useEffect } from "react"
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
     
      async function  checkAndLogin() {
        
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
          var bytes  = CryptoJS.AES.decrypt(decoded.password, '@deekshigowda');
          var originalText = bytes.toString(CryptoJS.enc.Utf8);
          const data = await fetch("/api/login", {
            method: "post",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({email:decoded.email, password:originalText})
          })
          const result= await data.json()
          const select = localStorage.getItem('select');
          if (result.success) {
            if (select === "User"){
              window.location.replace(`/user_page?token=${token}`)
            }
            else{
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
      body: JSON.stringify({email,password })
    })
    const result= await data.json()
    if(result.success)
     {
      localStorage.setItem('Token',result.token)
      localStorage.setItem('select',selected)
      const tok = localStorage.getItem('Token');

      toast("Success")
      setemail("")
      setpassword("")
      setTimeout(() => {
        if (selected === "User"){
          window.location.replace(`/user_page?token=${tok}`)
        }
        else{
          window.location.replace(`/acceptor_page?token=${tok}`)
        }
        
      }, 500);}
      else{
        
      toast.error(result.error)
        setemail("")
      setpassword("")
      }
     

  }

return (
  <>
  <div className="flex min-h-screen bg-[#f7f7f7] flex-1 flex-col justify-center px-6 py-12 lg:px-[20%]"> 
    <div className="flex min-h-full border bg-white shadow-lg shadow-slate-200 md:shadow-xl md:shadow-slate-200 flex-1 flex-col justify-center px-6  py-12 lap:py-2 lg:px-8">
    <ToastContainer />
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <div>
        <button
          onClick={() => setSelected("User")}
          style={{
            padding: "10px 20px",
            margin: "0px",
            backgroundColor: selected === "User" ? "#4f46e5" : "white",
            border: "1px solid black",
            cursor: "pointer",
          }}
        >
          User
        </button>

        <button
          onClick={() => setSelected("Acceptor")}
          style={{
            padding: "10px 20px",
            margin: "0px",
            backgroundColor: selected === "Acceptor" ? "#4f46e5" : "white",
            border: "1px solid black",
            cursor: "pointer",
          }}
        >
          Acceptor
        </button>
      </div></div>

      <div className="mt-10 lap:mx-auto bg-white lap:w-full lap:max-w-sm">
        <form onSubmit={Submit} method="POST" className="bg-white space-y-6">
          <div className="bg-white">
            <label htmlFor="email" className="block text-sm bg-white font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2 bg-white">
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => { setemail(e.target.value) }}
                required
                autoComplete="email"
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 lap:text-sm lap:leading-6"
              />
            </div>
          </div>

          <div className="bg-white">
            <div className="flex items-center bg-white justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 bg-white text-gray-900">
                Password
              </label>
              <div className="text-sm bg-white">
                <a href="/forgotpassword" className="font-semibold bg-white text-indigo-600 hover:text-indigo-500">
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2 bg-white">
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => { setpassword(e.target.value) }}
                required
                autoComplete="current-password"
                className="block w-full rounded-md border-0 p-1.5 bg-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 lap:text-sm lap:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-10 text-center bg-white text-sm text-gray-500">
          Don't have a account?{' '}
          <a href="/signup" className="font-semibold leading-6 bg-white text-indigo-600 hover:text-indigo-500">
            Sign up
          </a>
        </p>
      </div>
    </div>
  </div></>
)
  }  