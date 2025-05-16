const db = require('../db')
const fs = require("fs");
const multer = require("multer");

class MusicController {
    async createUser(req, res) {
        const upload = multer({dest: 'assets/' })
        const {name, author, imageUrl, file} = req.body
        // const newPerson = await db.query(`INSERT INTO music (name, author, imageUrl, fileUrl) values ($1, $2, $3, $4) RETURNING *`, [name ? name : 'Unknown name', author ? author : 'Unknown author', imageUrl ? imageUrl : 'Unknown image', fileUrl])
        // res.json(newPerson.rows[0])
        // try{
        //     const fileData = JSON.parse(fs.readFileSync('./assets.json'))
        //     fileData.push(newPerson.rows[0])
        //     fs.writeFileSync('./assets.json', JSON.stringify(fileData, null, 2));
        //     console.log(fileData)
        //     console.log(JSON.parse(fs.readFileSync('./assets.json'))[0])
        // }
        // catch (e){
        //     console.log(e)
        // }
        // console.log(newPerson.rows[0])
        // console.log(name, author, imageUrl, fileUrl)
        console.log(file)
    }
    async getUsers(req, res) {
        const musics = JSON.parse(fs.readFileSync('./assets.json'))
        res.json(musics)
    }
    async getOneUser(req, res) {
        const id = req.params.id
        const user = await db.query(`SELECT * FROM music where id = $1`, [id])
        res.json(user.rows[0])
    }
    async updateUser(req, res) {
        const {id, name, author, image, file} = req.body
        const user = await db.query(`UPDATE music set name = $1, authorurl = $2, imageurl = $3, file = $4 where id = $5 RETURNING *`, [name, author, image, file, id])
        res.json(user.rows[0])
    }
    async deleteUser(req, res) {
        const id = req.params.id
        const user = await db.query(`DELETE FROM music where id = $1`, [id])
        res.json(user.rows[0])
    }
}

module.exports = new MusicController()