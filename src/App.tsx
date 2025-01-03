import './App.css'
import Display from "./components/Display.tsx";
import Sidebar from "./components/Sidebar.tsx";
import Player from "./components/Player.tsx";
import {useContext} from "react";
import {PlayerContext} from "./context/PlayerContext.tsx";

const App = () => {

    const {audioRef, track, play, muted, switchNextSong} = useContext(PlayerContext)

  return (
      <div className="h-screen bg-black">
          <div className='h-[90%] flex'>
              <Sidebar/>
              <Display/>
          </div>
          <Player/>
          <audio ref={audioRef} src={track?.file} onEnded={switchNextSong} onLoadStartCapture={play}
          muted={muted}></audio>
      </div>
  )
}

export default App
