const express = require('express')
const musicRouter = require('./routes/music.router')
const cors = require('cors')
const multer = require("multer");
const fs = require("fs");
const {
    v1: uuidv1,
    v4: uuidv4,
} = require('uuid');
const musics = require('./assets')


const app = express()
const PORT = process.env.PORT || 5000
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '/assets')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({storage})

app.use(cors())
app.use(express.json())

app.post('/api/music',upload.fields([
    { name: 'file', maxCount: 1 },
    { name: 'image', maxCount: 1 }
]), (req, res) => {
    const {name, author} = req.body
    res.json(req.files)
    const imagePath1 = req.files.image[0].path.replaceAll('\\', '/')
    const filePath1 = req.files.file[0].path.replaceAll('\\', '/')
    const imagePath = () => {
        let newPath = ''
        for (let i = 60; i < imagePath1.length; i++) {
            newPath+=imagePath1[i]
        }
        return newPath
    }
    const filePath = () => {
        let newPath = ''
        for (let i = 60; i < filePath1.length; i++) {
            newPath+=filePath1[i]
        }
        return newPath
    }
    try{
        musics.push({
            id: null,
            name: name,
            desc: 'By ' + author,
            file: filePath(),
            image: imagePath()
        })
        console.log(musics)
        }
        catch (e){
            console.log(e)
        }
})

app.get('/api/music', (req, res) => {
    for (let i = 0; i < musics.length; i++) {
        musics[i].id = i + 1
    }
    console.log(musics)
    res.json(musics)
})

app.delete('/api/music/:id', async (req, res) => {
    const {id} = req.params
    let realid = parseInt(id)
    console.log(id)
    console.log(realid === 0)
    musics.splice(realid === 0 ? realid : realid - 1, 1)
})


app.listen(PORT, () => {
    console.log(`Робит на порте ${PORT}`)
})
