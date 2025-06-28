'use client'

import Navbar from "./Navbar.jsx";
import SongItem from "./SongItem.jsx";
import {albumsData, mostPopularMusic, songsData} from '@/assets/assets.js';
import AlbumItem from "./MusicAlbum.jsx";
import {useContext, useEffect} from "react";
import {PlayerContext} from "../context/PlayerContext.jsx";

export default function DisplayHome() {

    const {page} = useContext(PlayerContext)

    const pagesRender = () => {
        if(page === 0){
            document.title = 'Next Music | Главная'
            return (
                <>
                    <Navbar/>
                    <div className='mb-4'>
                        <h1 className='my-5 font-bold text-2xl'>Популярные плейлисты</h1>
                        <div className='flex overflow-auto'>
                            {albumsData.map((item, index) => (
                                <AlbumItem key={index} name={item.name} desc={item.desc} id={item.id} image={item.image}/>))}
                        </div>
                    </div>
                    <div className=''>
                        <h1 className='my-2 font-bold text-2xl'>Самые популярные</h1>
                        <div className='overflow-auto h-full grid grid-cols-6'>
                            {songsData.map((item,index) => (
                                    <SongItem key={index} name={item.name} desc={item.desc} image={item.image} id={item.id} />
                                )
                            )}
                        </div>
                    </div>
                </>
            )
        }
        else if(page === 1){
            document.title = 'Next Music | Музыка'
            return (
                <>
                    <Navbar/>
                    <div className='mb-4'>
                        <h1 className='my-5 font-bold text-2xl'>Музыка</h1>
                        <div className='overflow-auto h-full grid grid-cols-6'>
                            {songsData.map((item,index) => (
                                <SongItem key={index} name={item.name} desc={item.desc} image={item.image} id={item.id} />))}
                        </div>
                    </div>
                </>
            )
        }
        else if (page === 2){
            document.title = 'Next Music | Плейлисты'
            return (
                <>
                    <Navbar/>
                    <div className='mb-4'>
                        <h1 className='my-5 font-bold text-2xl'>Плейлисты</h1>
                        <div className='overflow-auto h-full grid grid-cols-6'>
                            {albumsData.map((item, index) => (
                                <AlbumItem key={index} name={item.name} desc={item.desc} id={item.id} image={item.image}/>))}
                        </div>
                    </div>
                </>
            )
        }
    }

    return(
        <>
            {pagesRender()}
        </>
    )
}