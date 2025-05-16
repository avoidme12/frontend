const MusicRouter = require('express')
const router = new MusicRouter()
const musicController = require('../controllers/music.controller')

// router.post('/music', musicController.createUser)
// router.get('/music', musicController.getUsers)
// router.get('/music/:id', musicController.getOneUser)
// router.put('/music', musicController.updateUser)
// router.delete('/music/:id', musicController.deleteUser)

module.exports = router