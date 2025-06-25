import React, {useContext} from 'react';
import {PlayerContext} from "../context/PlayerContext.jsx";
import {assets} from '@/assets/assets.js'
import {useToast} from "../hooks/use-toast.ts";
import {Volume2, VolumeX} from "lucide-react";

export default function Player() {

    const {previous,next,track,seekBar,muted,mute,seekVolume,audioRef,volumeBg,volumeBar,seekBg,playStatus, setPlayStatus, play,pause,time,seekSong, playLooping, setPlayLooping} = useContext(PlayerContext)
    const { toast } = useToast()
    window.onload = () => {
        setPlayStatus(false)
    }

    return (
        <div className='h-[10%] bg-black flex justify-between items-center text-white px-4'>
            <div className='lg:flex items-center gap-4'>
                <img className='w-12' src={track?.image} alt=""/>
                <div>
                    <p>{track?.name}</p>
                    <p>{track?.desc}</p>
                </div>
            </div>
            <div className='flex flex-col absolute gap-1 ml-[36vw] justify-center items-center m-auto'>
                <div className='flex gap-4'>
                    <img className='w-4 cursor-pointer' src={assets.plays_icon} alt="" onClick={() => {
                        console.log(track?.file.duration)
                        toast({
                            title: `Сейчас играет: ${track.name} - ${track.desc}`,
                            description: `
                            Текущее время: ${time.currentTime.minute}:${time.currentTime.second} - ${audioRef === null ? 0 : Math.floor(audioRef?.current.duration / 60)}:${audioRef === null ? 0 : Math.floor(audioRef?.current.duration % 60) < 10 ? `0${Math.floor(audioRef?.current.duration % 60)}` : `${Math.floor(audioRef?.current.duration % 60)}`}
                            Громкость: ${muted ? '0' : audioRef.current.volume * 100}%`
                        })
                    }}/>
                    <img onClick={previous} className='w-4 cursor-pointer' src={assets.prev_icon} alt=""/>
                    {playStatus
                        ? <img onClick={pause} className='w-4 cursor-pointer' src={assets.pause_icon} alt=""/>
                        : <img onClick={play} className='w-4 cursor-pointer' src={assets.play_icon} alt=""/>
                    }
                    <img onClick={next} className='w-4 cursor-pointer' src={assets.next_icon} alt=""/>
                    <img className='w-4 cursor-pointer' src={assets.loop_icon} onClick={() => {
                        setPlayLooping(!playLooping)
                        if (playLooping) {
                            toast({
                                title: 'Зацикленное воспроизведение выключено',
                                description: 'Наслаждайтесь :)'
                            })
                        } else {
                            toast({
                                title: 'Зацикленное воспроизведение включено',
                                description: 'Наслаждайтесь :)'
                            })
                        }
                        console.log(playLooping)
                    }} alt=""/>
                </div>
                <div className='flex items-center gap-5'>
                    <p>{time?.currentTime.minute ? time?.currentTime.minute : '0'}:{time?.currentTime.second ? time?.currentTime.second : '00'}</p>
                    <div ref={seekBg} onClick={seekSong}
                         className='w-[60vh] max-w-[500px] bg-gray-300 rounded-full cursor-pointer'>
                        <hr ref={seekBar} className='h-1 border-none w-0 bg-green-800 rounded-full'/>
                    </div>
                    <p>{audioRef === null ? 0 : Math.floor(audioRef?.current.duration / 60)}:{audioRef === null ? 0 : Math.floor(audioRef?.current.duration % 60) < 10 ? `0${Math.floor(audioRef?.current.duration % 60)}` : `${Math.floor(audioRef?.current.duration % 60)}`}</p>
                </div>
            </div>
            <div className='lg:flex items-center gap-2 opacity-75'>
                {muted
                    ? <VolumeX size={90} className='w-4 cursor-pointer' onClick={mute}/>
                    : <Volume2 size={90} className='w-4 cursor-pointer' onClick={mute}/>
                }
                <div onClick={seekVolume} ref={volumeBg} className='w-20 bg-slate-50 h-1 rounded cursor-pointer'>
                    <hr ref={volumeBar} className='h-1 border-none w-20 bg-green-800 rounded-full'/>
                </div>
            </div>
        </div>
    );
};
