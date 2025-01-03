import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {BrowserRouter} from "react-router-dom";
import PlayerContextProvider from "./context/PlayerContext.tsx";
import {Toaster} from "@/components/ui/toaster.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
            <PlayerContextProvider>
                <App />
                <Toaster />
            </PlayerContextProvider>
      </BrowserRouter>
  </StrictMode>
)
