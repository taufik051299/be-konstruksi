const Users = require('../../app/models/Users')
const bcrypt = require('bcrypt')
const saltRounds = 10

exports.createAdmin = (req, res) =>{
  Users.create({
    nama: 'admin',
    email: 'admin@gmail.com',
    password: bcrypt.hashSync('admin123', saltRounds),
    role: 'admin'
  })

  res.status(201).json({
    'message': 'Admin created',
  })
}