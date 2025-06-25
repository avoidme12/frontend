'use client'

import React, {useContext, useRef, useState} from 'react';
import {HomeIcon, SearchIcon} from "lucide-react";
import {PlayerContext} from "../context/PlayerContext.jsx";
import {assets} from "../assets/assets.js";
import {useNavigate} from "react-router-dom";

export default function Sidebar(){

    const [cat, setCat] = useState(false)
    const yuppieRef = useRef(null)
    const {playWithId, audioRef,track,play,mute} = useContext(PlayerContext)
    const navigate = useNavigate()

    return(
        <div className='w-[20%] h-full p-2 flex-col gap-2 text-white lg:flex'>
            <div className='bg-[#121212] h-[20%] rounded md:flex flex-col justify-around'>
                <div className='items-center lg:gap-3 lg:pl-8 cursor-pointer grid grid-cols-1' onClick={() => navigate(`/`)}>
                    <HomeIcon className='w-6 flex left-6 hidden md:flex'/>
                    <p className='font-bold'>Домашняя страница</p>
                </div>
                <div className='md:shrink-0 items-center lg:gap-3 lg:pl-8 lg:text-[16px] sm:text-[10px] cursor-pointer grid grid-cols-1' onClick={() => navigate(`/search`)}>
                    <SearchIcon className='w-6 hidden md:flex'/>
                    <p className='font-bold'>Поиск</p>
                </div>
            </div>
            {cat
                ? <div className='m-4 flex items-center gap-3 pl-8 lg:text-[16px] sm:text-[10px] transition-all ease-in duration-150'>
                    <img
                        className='w-[90px] rounded-lg'
                        width={500}
                        height={500}
                        src='https://media1.tenor.com/m/sVNO62-MYV0AAAAC/zxc-cat.gif'
                        alt=''/>
                </div>
                : ''}
            <div
                className='absolute mt-[87vh] justify-center items-center gap-3 pr-9 cursor-pointer text-gray-300 hover:text-white transition-all ease-in duration-150'
                onClick={() => {
                    setCat(!cat)
                    console.log(playWithId)
                    console.log(audioRef)
                    console.log(track)
                    console.log(play)
                    console.log(mute)
                }}
            >
                <h1 className='ml-2 font-semibold'>Click me</h1>

            </div>
            <audio ref={yuppieRef} src={assets.yuppie} preload='auto'></audio>
        </div>
    )
}