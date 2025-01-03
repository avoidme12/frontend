'use client'

import {useContext} from 'react';
import Navbar from "./Navbar.tsx";
import { useParams } from "react-router-dom";
import {albumsData, assets, relaxedSongsData} from "../assets/assets.js";
import {PlayerContext} from "../context/PlayerContext.tsx";

export default function DisplayAlbum() {

    const {id} = useParams();
    const albumData = relaxedSongsData[id]
    const albumInfo = albumsData[id]
    const {playWithId} = useContext(PlayerContext)

    return (
        <>
            <Navbar />
            <div className='mt-10 flex gap-8 flex-col md:flex-row md:items-end'>
                <img className='w-48 rounded-md' src={albumInfo.image} alt=""/>
                <div className='flex flex-col'>
                    <p>Плейлист</p>
                    <h2 className='text-5xl font-bold mb-4 md:text-7xl'>{albumInfo.name}</h2>
                    <h4>{albumData.desc}</h4>
                    {/*<p className='mt-0'>*/}
                    {/*    <img className='inline-block w-5' src='https://github.com/avoidme12/next-music-app/blob/main/assets/img10.jpg?raw=true' alt=""/>*/}
                    {/*    <b>Next Music</b>*/}
                    {/*    - <b>284,482 Лайков</b>*/}
                    {/*    - <b>8 Треков </b>*/}
                    {/*    - примерно 15 минут*/}
                    {/*</p>*/}
                </div>
            </div>
            <div className='grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]'>
                <p><b className='mr-4'>#</b>Название</p>
                <p>Плейлист</p>
                <p className='sm:block'>Автор</p>
                <img className='m-auto w-4' src={assets.clock_icon} alt=""/>
            </div>
            <hr/>
            {
                relaxedSongsData.map((item, index) => (
                    <div
                         key={index}
                         className='grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer'
                         onClick={() => {
                             playWithId(item.id)
                         }}
                    >
                        <p className='text-white'>
                            <b className='mr-4 text-[#a7a7a7]'>{index + 1}</b>
                            <img className='inline w-10 mr-5' src={item.image} alt=""/>
                            {item.name}
                        </p>
                        <p className='text-[15px]'>{albumInfo.name}</p>
                        <p className='text-[15px] sm:block'>{item.desc}</p>
                        <p className='text-[15px] text-center'>{item.minutes}:{item.seconds}</p>
                    </div>
                ))
            }
        </>
    );
};
