'use client'

import React, {useContext, useRef, useState} from "react";
import {ArrowLeft, ArrowRight} from "lucide-react";
import {useNavigate} from "react-router-dom";
import {PlayerContext} from "../context/PlayerContext.tsx";


export default function Navbar() {
    const allRef = useRef(null)
    const tracksRef = useRef(null)
    const podcastsRef = useRef(null)
    const navigate = useNavigate()
    const {page, setPage} = useContext(PlayerContext)

    return (
        <>
            <div className='w-full flex justify-between items-center font-semibold'>
                <div className='flex items-center gap-2'>
                    <ArrowLeft onClick={() => navigate(-1)} size={30}
                               className='w-6 bg-black rounded-2xl p-[2px] cursor-pointer'/>
                    <ArrowRight onClick={() => navigate(1)} size={30}
                                className='w-6 bg-black rounded-2xl p-[2px] cursor-pointer'/>
                </div>
                <div className='flex items-center gap-4'>
                    {/*<h1 onClick={() => {*/}
                    {/*    window.open("https://www.donationalerts.com/r/avoidme12", "_blank")*/}
                    {/*}}*/}
                    {/*    className='bg-black text-white py-1 px-3 rounded-2xl text-[15px] cursor-pointer hover:bg-orange-400 transition-all ease-in duration-300'>Поддержать*/}
                    {/*    меня</h1>*/}
                    <h1 onClick={() => {
                        window.open("https://github.com/avoidme12?tab=repositories")
                    }}
                        className='bg-black py-1 px-3 rounded-2xl text-[15px] cursor-pointer hover:bg-white hover:text-black transition-all ease-in duration-300'>GitHub</h1>
                </div>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <button ref={allRef} onClick={() => {
                    setPage(0)
                    console.log(page)

                    allRef.current.style.color = 'black'
                    tracksRef.current.style.color = 'white'
                    podcastsRef.current.style.color = 'white'

                    allRef.current.style.background = 'white'
                    tracksRef.current.style.background = 'black'
                    podcastsRef.current.style.background = 'black'
                }} className='font-semibold bg-white text-black px-4 py-1 rounded-2xl cursor-pointer transition-all ease-out duration-150'>Всё</button>
                <button ref={tracksRef} onClick={() => {
                    setPage(1)
                    console.log(page)

                    allRef.current.style.color = 'white'
                    tracksRef.current.style.color = 'black'
                    podcastsRef.current.style.color = 'white'

                    allRef.current.style.background = 'black'
                    tracksRef.current.style.background = 'white'
                    podcastsRef.current.style.background = 'black'
                }} className='font-semibold bg-black px-4 py-1 rounded-2xl cursor-pointer transition-all ease-out duration-150'>Музыка</button>
                <button ref={podcastsRef} onClick={() => {
                    setPage(2)
                    console.log(page)

                    allRef.current.style.color = 'white'
                    tracksRef.current.style.color = 'white'
                    podcastsRef.current.style.color = 'black'

                    allRef.current.style.background = 'black'
                    tracksRef.current.style.background = 'black'
                    podcastsRef.current.style.background = 'white'
                }} className='font-semibold bg-black px-4 py-1 rounded-2xl cursor-pointer transition-all ease-out duration-150'>Плейлисты</button>
            </div>
        </>
    )
}