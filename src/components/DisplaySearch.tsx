import {albumsData, songsData} from "@/assets/assets.js";
import AlbumItem from "@/components/MusicAlbum.tsx";
import React, {useState} from "react";
import SongItem from "@/components/SongItem.tsx";
import NotFound from "@/components/NotFound.tsx";

export default function DisplaySearch(){

    const [searchValue, setSearchValue] = useState('')

    const onChangeSearchInput = (e: string) => {
        setSearchValue(e)
        console.log(searchValue)
    }

    document.title = 'Next Music | Поиск'

    const undef = [undefined]

    const listAlbum = () => {
        if(searchValue == ''){
            return albumsData
        }
        else{
            return [albumsData.find(item => {
                const itemLowerCase = item.name.toLowerCase()
                const searchValueLowerCase = searchValue.toLowerCase()
                return itemLowerCase.includes(searchValueLowerCase)
            })]
        }
    }

    const listSongs = () => {
        if(searchValue == ''){
            return songsData
        }
        else{
            return [songsData.find(item => {
                const itemLowerCase = item.name.toLowerCase()
                const searchValueLowerCase = searchValue.toLowerCase()
                return itemLowerCase.includes(searchValueLowerCase)
            })]
        }
    }

    console.log(listAlbum())

    return(
        <>
            <div className='w-full my-5'>
                <input
                    className='w-full font-semibold text-white bg-[#1d1d1d] p-2 rounded-md'
                    placeholder='Название'
                    type="text"
                    onChange={(e) => onChangeSearchInput(e.target.value)}
                />
            </div>
            <div>
                <div className='mb-4'>
                    <h1 className='my-5 font-bold text-2xl'>Плейлисты</h1>
                    <div className='overflow-auto h-full grid grid-cols-6'>
                        {listAlbum()[0] === undef[0] ? (
                            <NotFound/>
                        ) : listAlbum().map((item, index) => (
                            <AlbumItem key={index} name={item.name} desc={item.desc} image={item.image} id={item.id} />
                        ))}
                    </div>
                </div>
                <div className='mb-4'>
                    <h1 className='my-5 font-bold text-2xl'>Музыка</h1>
                    <div className='overflow-auto h-full grid grid-cols-6'>
                        {listSongs()[0] === undef[0] ? (
                            <NotFound/>
                        ) : listSongs().map((item, index) => (
                            <SongItem key={index} name={item.name} desc={item.desc} image={item.image} id={item.id}/>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
