import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from "react-router-dom";
import PlayerContextProvider from "./context/PlayerContext.jsx";
import {Toaster} from "@/components/ui/toaster.tsx";




createRoot(document.getElementById('root')).render(
      <BrowserRouter>
            <PlayerContextProvider>
                <App />
                <Toaster />
            </PlayerContextProvider>
      </BrowserRouter>
)
