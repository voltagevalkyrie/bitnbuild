import React, { useState } from 'react'
import { PiCheckCircleFill, PiCrownFill, PiHeartFill } from "react-icons/pi";
import { RxCross1 } from "react-icons/rx";
import { BiSolidDonateHeart } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const Profile = () => {
    const [username, setusername] = useState("")
    const [emailid, setemailid] = useState("")
    const [ham,setHam]=useState(false)

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
        <>
            <div onClick={() => setHam(true)} className="fixed top-[5vw] right-[6%] text-[25px] cursor-pointer hidden max-[550px]:block"><GiHamburgerMenu /></div>
            <div className={`${ham ? 'w-[85%] h-full bg-[#000000] fixed left-0 block smooth' : 'w-[25%] h-full bg-[#000000] fixed right-0 max-[550px]:hidden profile'}`}>
                <div onClick={() => setHam(false)} className="text-[#ffffff] fixed top-[10%] right-[5%] text-[25px] cursor-pointer hidden max-[550px]:block"><RxCross1 /></div>
                <div className='w-full flex justify-center mt-3'>
                    <div className="w-[90%] bg-[#262626] flex items-center gap-4 p-2 rounded-full">

                        <div className='p-1 bg-[#ffffff] rounded-full '>
                            <img className='w-[50px] h-[50px] rounded-full' src="/pfp.webp" alt="" />
                        </div>
                        <div className='h-full items-start justify-center flex flex-col text-[#ffffff] text-[15px]'>
                            <span className='font-serif text-[15px]'>{username}</span>
                            <span className='font-serif text-[15px]'>{emailid}</span>
                        </div>
                    </div>
                </div>

                <div className='w-full h-full flex justify-center mt-3'>
                    <div className="w-[90%] h-[70%] bg-[#262626] flex flex-col pt-7 items-center gap-5 p-2 rounded-xl">


                        <a href="/possessions">
                            <div className='text-[#ffffff] flex gap-2 items-center '>
                                <span className='text-[18px]' ><PiCrownFill /></span>
                                <span className='text-[15px]'>My Posessions</span>
                            </div>
                        </a>
                        <div className='h-[1.5px] w-[75%] bg-[#ffffff] '></div>

                        <a href="/favorites">
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

                        <a href="/donations">
                            <div className='text-[#ffffff] flex gap-2 items-center '>
                                <span className='text-[18px]' ><PiCheckCircleFill /></span>
                                <span className='text-[15px]'>My Donations</span>
                            </div>
                        </a>
                    </div>



                </div>

            </div>
        </>
    )
}

export default Profile
