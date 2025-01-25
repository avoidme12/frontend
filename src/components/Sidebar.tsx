'use client'

import React, {useContext, useRef, useState} from 'react';
import {HomeIcon, SearchIcon} from "lucide-react";
import {PlayerContext} from "../context/PlayerContext.tsx";
import {assets} from "@/assets/assets";
import {useNavigate} from "react-router-dom";

export default function Sidebar(){

    const [cat, setCat] = useState(false)
    const yuppieRef = useRef(null)
    const {playWithId, audioRef,track,play,mute} = useContext(PlayerContext)
    const navigate = useNavigate()

    return(
        <div className='w-[25%] h-full p-2 flex-col gap-2 text-white lg:flex'>
            <div className='bg-[#121212] h-[20%] rounded md:flex flex-col justify-around'>
                <div className='items-center gap-3 pl-8 cursor-pointer grid grid-cols-1' onClick={() => navigate(`/`)}>
                    <HomeIcon className='w-6 flex left-6'/>
                    <p className='font-bold'>Домашняя страница</p>
                </div>
                <div className='md:shrink-0 items-center gap-3 pl-8 cursor-pointer grid grid-cols-1' onClick={() => navigate(`/search`)}>
                    <SearchIcon className='w-6'/>
                    <p className='font-bold'>Поиск</p>
                </div>
            </div>
            {cat
                ? <div className='m-4 flex items-center gap-3 pl-8 transition-all ease-in duration-150'>
                    <img
                        className='w-[90px] rounded-lg'
                        width={500}
                        height={500}
                        src='https://media1.tenor.com/m/sVNO62-MYV0AAAAC/zxc-cat.gif'
                        alt='cat'/>
                </div>
                : ''}
            <div
                className='absolute mt-[75vh] justify-center items-center gap-3 pl-1 cursor-pointer text-gray-300 hover:text-white transition-all ease-in duration-150'
                onClick={() => {
                    setCat(!cat)
                    yuppieRef.current.play()
                    console.log(playWithId)
                    console.log(audioRef)
                    console.log(track)
                    console.log(play)
                    console.log(mute)
                }}
            >
                <h1 className='ml-5 font-semibold'>By Avo1d</h1>
                <img
                    className='w-[60px] ml-5 lg:mb-5 mt-[10px]'
                    width={500}
                    height={500}
                    alt='img'
                    src='https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRFLGgvp-goECgdN65x6oW1Hx-2XJKT_PkTIB_Pz0xJtTIwnuV8'
                />
            </div>
            <audio ref={yuppieRef} src={assets.yuppie} preload='auto'></audio>
        </div>
    )
}