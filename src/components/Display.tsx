'use client'

import DisplayHome from "./DisplayHome.tsx";
import {useEffect, useRef} from "react";
import {Route, Routes, useLocation} from "react-router";
import {albumsData} from "@/assets/assets.js";
import DisplayAlbum from "./DisplayAlbum.tsx";
import DisplaySearch from "@/components/DisplaySearch.tsx";
import DisplayDashboard from "@/components/DisplayDashboard.tsx";

export default function Display() {

    const displayRef = useRef(null)
    const location = useLocation();
    const isAlbum = location.pathname.includes("album");
    const albumId = isAlbum ? location.pathname.slice(-1) : "";
    const bgColor = albumsData[Number(albumId)].bgColor;

    const changePlaylist = () => {
        if(isAlbum && location.pathname.includes("0")){
            return <Route path='/album/:id' element={<DisplayAlbum />} />
        }
    }

    useEffect(() => {
        if(isAlbum) {
            displayRef.current.style.background = `linear-gradient(${bgColor},#121212)`
        }
        else {
            displayRef.current.style.background = `#121212`
        }

    })

    return (
        <div ref={displayRef}
             className='w-[80%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto'>
            <Routes>
                <Route path='/' element={<DisplayHome/>} />
                <Route path='/search' element={<DisplaySearch/>} />
                <Route path='/dashboard' element={<DisplayDashboard/>}/>
                {changePlaylist()}
            </Routes>
        </div>
    )
}