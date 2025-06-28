import {BookAudio, ListMusic} from "lucide-react";
import {albumsData, mostPopularMusic, songsData} from "@/assets/assets.js";
import {DialogAddSong} from "@/components/DialogAddSong.jsx";
import {Button} from "@/components/ui/button.tsx";
import axios from "axios";
import {useContext, useEffect} from "react";
import {PlayerContext} from "@/context/PlayerContext.jsx";
import {toast} from "@/hooks/use-toast.js";
import {DialogEditSong} from "@/components/DialogEditSong.jsx";

export default function DisplayDashboard(){
    document.title = 'Next Music | Панель управления'
    const {playWithId} = useContext(PlayerContext)
    const {audioRef, volumeBar, pause} = useContext(PlayerContext)


    useEffect(() => {
        audioRef.current.volume = sessionStorage.getItem('volume')
        volumeBar.current.style.width = (audioRef.current.volume * 100) + '%'
    }, []);

    let idSongList = []
    let idAlbumList = []

    const listSongs = () => {
        for(let i = 0; i < songsData.length; i++){
            idSongList.push(i)
        }
        return Math.max(idSongList.length)
    }
    const listAlbums = () => {
        for(let i = 0; i < albumsData.length; i++){
            idAlbumList.push(i)
        }
        return Math.max(idAlbumList.length) //TODO: ляляляляляля ну типо запросы удаление вся хрень
    }

    return(
        <div className='min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900 to-black text-zinc-100 p-8'>
            <div className='w-full grid grid-cols-2 h-[70px]'>
                <div className='bg-zinc-800 rounded-md mx-7 flex'>
                    <div className='m-3 flex'>
                        <ListMusic size={55} className='inline mx-3' color='#FFFFFF'/>
                        <h1 className='font-semibold text-[35px] inline mx-3 pb-2 top-2'>Total
                            songs: {Math.max(listSongs())}</h1>
                    </div>
                </div>
                <div className='bg-zinc-800 rounded-md mx-7'>
                    <div className='m-3 flex'>
                        <BookAudio size={50} className='inline mx-3' color='#FFFFFF'/>
                        <h1 className='font-semibold text-[35px] inline mx-3 pb-2 top-2'>Total
                            albums: {Math.max(listAlbums())}</h1>
                    </div>
                </div>
            </div>
            <div className='mt-[5%] flex'>
                <DialogAddSong/>
            </div>
            <div className="container mx-auto">
                <div className='grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]'>
                    <p><b className='mr-3'>#</b>Название</p>
                    <p className='mr-6'>Автор</p>
                    <h1 className='ml-[100%]'>Действие</h1>
                </div>
                <hr/>
                {
                    songsData.map((item, index) => (
                        <div
                            key={index}
                            className='grid grid-cols-5 sm:grid-cols-5 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer'
                            onClick={() => {
                                playWithId(item.id)
                            }}
                        >
                            <p className='text-white'>
                                <b className='mr-4 text-[#a7a7a7]'>{index + 1}</b>
                                <img className='inline w-10 mr-5' src={item.image} alt=""/>
                                {item.name}
                            </p>
                            <p className='text-[15px] sm:block'>{item.desc}</p>
                            <div className='flex md:ml-[115%] xl:ml-[148%]'>
                                <div onClick={pause}>
                                    <Button onClick={async () => {
                                        toast({
                                            title: 'Начался процесс удаления!',
                                            description: 'Пожалуйста не обновляйте страницу!'
                                        })
                                        await axios.post(`${import.meta.env.VITE_HOST}/delete`, {
                                            id: item.id,
                                            publicIdImage: item.publicIdImage,
                                            publicIdFile: item.publicIdFile
                                        }).then(r => {
                                            if(r.data !== 'Success!'){
                                                toast({
                                                    title: 'Ошибка!',
                                                    description: 'Повторите попытку позже!'
                                                })
                                            }
                                            else {
                                                toast({
                                                    title: 'Успешно удалено!',
                                                    description: 'Можно обновить страницу'
                                                })
                                            }
                                        })
                                    }} className='bg-black text-white font-semibold duration-300 mr-6' variant="outline">Delete Song</Button>
                                </div>
                                <div onClick={pause}>
                                    <DialogEditSong item={item}/>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}