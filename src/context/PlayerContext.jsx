'use client'

import {createContext, useEffect, useRef, useState} from "react";
import {songsData} from "../assets/assets.js";

export const PlayerContext = createContext({})

const PlayerContextProvider = (props) => {

    const audioRef = useRef({
        ontimeupdate: undefined, currentTime: undefined, duration: 0, onvolumechange: undefined, volume: undefined,


        play() {

        },
        pause() {

        }
    });
    const seekBg = useRef(null); // массив сразу с бд
    const seekBar = useRef(null);

    const volumeBg = useRef(null)
    const volumeBar = useRef(null)

    const [playLooping, setPlayLooping] = useState(false)
    const [page,setPage] = useState(0)
    const [track, setTrack] = useState(songsData[0]);
    const [playStatus, setPlayStatus] = useState(false)
    const [muted, setMuted] = useState(false)

    const [time,setTime] = useState({
        currentTime:{
            second:'',
            minute:''
        },
        totalTime:{
            second:'',
            minute:0
        }
    })

    const play = async () => {
        const play = await audioRef.current.play();
        setPlayStatus(true)
        console.log(playStatus)
    }
    const mute = () => {
        if (muted){
            setMuted(false)
        }
        else {
            setMuted(true)
        }
    }

    const pause = () => {
        audioRef.current.pause();
        setPlayStatus(false)
        console.log(playStatus)
    }

    const playWithId = async (id) => {
        const selectedTrack = songsData.find((element) => {
            return element.id === id
        })
        setTrack(selectedTrack)
        await audioRef.current.play()
        setPlayStatus(true)
    }

    const previous = async () => {
        if(track.id > 0) {
            const selectedTrack = songsData.find((element) => {
                return element.id === track.id - 1
            })
            setTrack(selectedTrack)
            await audioRef.current.play()
            setPlayStatus(true)
        }
    }

    const next = async () => {
        if(track.id < songsData.length - 1) {
            const selectedTrack = songsData.find((element) => {
                return element.id === track.id + 1
            })
            setTrack(selectedTrack)
            await audioRef.current.play()
            setPlayStatus(true)
            console.log(playStatus)
        }
    }

    const switchNextSong = async () => {
        console.log('переключаем')
        if (playLooping) {
            console.log('повтор')
            const selectedTrack = songsData.find((element) => {
                return element.id === track.id
            })
            setTrack(selectedTrack)
            audioRef.current.play()
            setPlayStatus(true)
            console.log(playStatus)
        }
        else {
            if (track.id < songsData.length - 1) {
                console.log('следующая')
                const selectedTrack = songsData.find((element) => {
                    return element.id === track.id + 1
                })
                setTrack(selectedTrack)
                audioRef.current.play()
                setPlayStatus(true)
                console.log(playStatus)
            }
            else {
                console.log('с начала')
                await setTrack(songsData[0])
                audioRef.current.play()
                setPlayStatus(true)
                console.log(playStatus)
            }
        }
    }


    const seekSong = async (e) => {
        audioRef.current.currentTime = ((e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration)
    }

    const seekVolume = async (e) => {
        audioRef.current.volume = ((e.nativeEvent.offsetX / volumeBg.current.offsetWidth))
        console.log(audioRef.current.volume)
        console.log(volumeBar.current.style.width)
    }

    useEffect(() => {
        setTimeout(() =>{
            audioRef.current.ontimeupdate = () => {
                console.log('work')
                seekBar.current.style.width = (Math.floor(audioRef.current.currentTime/audioRef.current.duration * 100)) + "%"
                setTime({
                    currentTime:{
                        second: Math.floor(audioRef.current.currentTime % 60) < 10 ? `0${Math.floor(audioRef.current.currentTime % 60)}` : `${Math.floor(audioRef.current.currentTime % 60)}`,
                        minute: `${Math.floor(audioRef.current.currentTime / 60)}`,
                    },
                    totalTime:{
                        second: Math.floor(audioRef.current.duration % 60) < 10 ? `0${Math.floor(audioRef.current.duration % 60)}` : `${Math.floor(audioRef.current.duration % 60)}`,
                        minute: Math.floor(audioRef.current.duration / 60),
                    }
                })
            }
            audioRef.current.onvolumechange = () => {
                sessionStorage.setItem('volume', audioRef.current.volume)
                if (!muted){
                    volumeBar.current.style.width = (audioRef.current.volume * 100) + '%'
                }
            }
        }, 1000);
    }, [audioRef, muted])


    const contextValue = {
        audioRef,
        seekBar,
        seekBg,
        mute,
        seekVolume,
        muted,
        setMuted,
        playLooping, setPlayLooping,
        track, setTrack,
        volumeBar,
        page,
        setPage,
        volumeBg,
        playStatus, setPlayStatus,
        time, setTime,
        play,pause,
        playWithId,
        previous, next,
        seekSong,
        switchNextSong,
    }

    return (
        <PlayerContext.Provider value={contextValue}>
            {props.children}
        </PlayerContext.Provider>
    )
}

export default PlayerContextProvider
