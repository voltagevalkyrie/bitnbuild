import React, { useState } from 'react'
import { PiCheckCircleFill, PiCrownFill, PiHeartFill } from "react-icons/pi";
import { BiSolidDonateHeart } from "react-icons/bi";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const Profile = () => {
    const [username, setusername] = useState("")
    const [emailid, setemailid] = useState("")
    useEffect(() => {
     
        async function  checkAndLogin () {
          
        {
          try {
            const token = localStorage.getItem('Token');
            if (!token) {
              console.error('No token found');
              return;
            }
        
            const decoded = jwtDecode(token,'@deekshigowda'); 
            if (!decoded) {
              console.error('Token verification failed');
              return;
            }
              setusername(decoded.name);
              setemailid(decoded.email)   
          } catch (error) {
            console.error('Error:', error);
          }
        } 
         }
       
          checkAndLogin();
      }, []);
    return (
        <div className='w-[25%] h-full bg-[#000000] fixed right-0 profile'>
            <div className='w-full flex justify-center mt-3'>
                <div className="w-[90%] bg-[#262626] flex items-center gap-4 p-2 rounded-full">

                    <div className='p-1 bg-[#ffffff] rounded-full '>
                        <img className='w-[50px] h-[50px] rounded-full' src="/books.jpg" alt="" />
                    </div>
                    <div className='h-full items-start gap-1 justify-center flex flex-col text-[#ffffff] text-[15px]'>
                        <span className='font-serif text-[10px]'>{username}</span>
                        <span className='font-serif text-[10px]'>{emailid}</span>
                    </div>
                </div>
            </div>

            <div className='w-full h-full flex justify-center mt-3'>
                <div className="w-[90%] h-[70%] bg-[#262626] flex flex-col pt-7 items-center gap-5 p-2 rounded-xl">


                    <a href="/#">
                        <div className='text-[#ffffff] flex gap-2 items-center '>
                            <span className='text-[18px]' ><PiCrownFill /></span>
                            <span className='text-[15px]'>My Posessions</span>
                        </div>
                    </a>
                    <div className='h-[1.5px] w-[75%] bg-[#ffffff] '></div>

                    <a href="/#">
                        <div className='text-[#ffffff] flex gap-2 items-center '>
                            <span className='text-[18px]' ><PiHeartFill /></span>
                            <span className='text-[15px]'>My Favorites</span>
                        </div>
                    </a>
                    <div className='h-[1.5px] w-[75%] bg-[#ffffff] '></div>


                    <a href="/donate">
                        <div className='text-[#ffffff] flex gap-2 items-center '>
                            <span className='text-[18px]' ><BiSolidDonateHeart /></span>
                            <span className='text-[15px]'>Donate Your Possession</span>
                        </div>
                    </a>
                    <div className='h-[1.5px] w-[75%] bg-[#ffffff] '></div>

                    <a href="/#">
                        <div className='text-[#ffffff] flex gap-2 items-center '>
                            <span className='text-[18px]' ><PiCheckCircleFill /></span>
                            <span className='text-[15px]'>My Donations</span>
                        </div>
                    </a>
                </div>



            </div>

        </div>
    )
}

export default Profile
