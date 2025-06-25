import {app, BrowserWindow} from 'electron'
import path from 'path'

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        height: 1080,
        width: 1920,
        icon: './src/assets/vercel.svg',
        webPreferences:{
            nodeIntegration: true,
            enableRemoteModule: true,
            titleBarStyle: 'hidden',
            ...(process.platform !== 'darwin' ? { titleBarOverlay: true } : {})
        }
    })
    mainWindow.loadURL('http://localhost:5173')
}

app.on('ready', createWindow)