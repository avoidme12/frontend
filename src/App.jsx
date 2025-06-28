import './App.css'
import Display from "./components/Display.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Player from "./components/Player.jsx";
import {useContext, useEffect} from "react";
import {PlayerContext} from "./context/PlayerContext.jsx";
import {songsData} from "@/assets/assets.js";


const App = () => {
    useEffect(() => {
        fetch(`${import.meta.env.VITE_HOST}/get`).then(r => r.json()).then(r => {
            for (let i = 0; i < r.length; i++) {
                songsData.push(r[i])
                console.log(r[i])
            }
        })
        console.log(songsData, 'сваааа')
    }, [songsData]);

    if(!sessionStorage.getItem('volume')){
        sessionStorage.setItem('volume', 1)
    }
    const {audioRef, track, play, muted, switchNextSong} = useContext(PlayerContext)
    audioRef.current.volume = sessionStorage.getItem('volume')

  return (
      <div className="h-screen bg-black">
          <div className='h-[90%] flex'>
              <Sidebar/>
              <Display/>
          </div>
          <Player/>
          <audio autoPlay={false} ref={audioRef} src={track.file} onEnded={switchNextSong} onLoadStartCapture={play}
          muted={muted}></audio>
      </div>
  )
}

export default App
