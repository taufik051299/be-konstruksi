const express = require('express')
const router = express.Router()
const multer = require('multer');
const upload = multer();
// MIGRATE TABLE TO DATABASE
const Migration = require('./database/Migration')
// SEEDING
const UserSeeder = require('./database/seeder/UserSeeder')
// CONTROLLERS
const UserController = require('./app/controllers/UserController')
// MIDDLEWARE
const middleware = require('./app/middleware')

router.get('/migrate', Migration.migrate)
router.get('/create-admin', UserSeeder.createAdmin)

router.post('/registration', upload.none(), UserController.create)
router.post('/auth', upload.none(), UserController.auth)
router.get('/users', UserController.findAll)
router.get('/user', UserController.findById)
router.put('/user', upload.none(), middleware, UserController.update)
router.delete('/user', middleware, UserController.delete)

module.exports = router