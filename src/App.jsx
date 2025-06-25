import './App.css'
import Display from "./components/Display.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Player from "./components/Player.jsx";
import {useContext} from "react";
import {PlayerContext} from "./context/PlayerContext.jsx";
import axios from "axios";
import {albumsData, mostPopularMusic, songsData} from "./assets/assets.js";

try{
    axios.get('http://localhost:5000/api/music').then(r => {
        for (let i = 0; i < r.data.length; i++) {
            songsData.push(r.data[i])
            if(i <= 6){
                albumsData[0].songs.push(r.data[i])
                mostPopularMusic.push(r.data[i])
            }
            console.log(r.data[i])
        }
    })
}
catch (e) {
    console.log(e)
}

const App = () => {
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
          <audio autoPlay={false} ref={audioRef} src={track?.file} onEnded={switchNextSong} onLoadStartCapture={play}
          muted={muted}></audio>
      </div>
  )
}

export default App
