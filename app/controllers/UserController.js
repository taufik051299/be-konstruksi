const Users = require('../models/Users')
const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')

exports.findAll = (req, res) => {
  Users.findAll()
    .then(data=>{

      res.status(200).json({
        'message': 'success get all user data',
        'data': data
      })
    })
}

exports.findById = (req, res) =>{
  
  Users.findOne({
    where: {
      id: req.query.id
    }
  })
    .then(data=>{
      data != null ?
      res.status(200).json({
        'message': 'User found',
        'data': data
      })
      :
      res.status(404).json({
        'message': 'User not found'
      })
    })
}

exports.auth = (req, res) =>{
  const {email, password} = req.body

  console.log(req.body)
  console.log(password)
  if(!password && !email){
    res.status(200).json({'message': 'fill the email & password'})
  }
  if(!email){
    res.status(200).json({'message': 'fill the email'})
  }
  else if(!password){
    res.status(200).json({'message': 'fill the password'})
  }
  else{
    Users.findOne({
      where:{
        email: email
      }
    })
      .then(data=>{
        const checkPassword = bcrypt.compareSync(password, data.password)
        if(checkPassword){
          const token = jwt.sign({
            data: data,
          }, process.env.ACCESS_TOKEN, { expiresIn: '1d' })

          res.status(200).json({
            'message': 'Success to login',
            'token': token,
            // 'data': data
          })
        }
        else{
          res.status(401).json({
            'message': 'Unauthorized'
          })
        }
      })
  }
}

exports.create = (req, res) => {
  const data = req.body

  data.password = bcrypt.hashSync(data.password, saltRounds)

  Users.create({
    nama: data.nama,
    email: data.email,
    password: data.password,
    role: 'user'
  })

  res.status(201).json({
    'message': 'user created',
  })
}

exports.update = (req, res) =>{
  const id = req.query.id
  const newData = req.body

  Users.findOne({
    where: {
      id: id
    }
  })
    .then(data=>{
      if(data){
        Users.update({
          nama: newData.nama,
          email: newData.email,
          password: bcrypt.hashSync(newData.password, saltRounds)
        }, {where: {id: data.id}})
        res.status(200).json({
          'message' : 'User updated'
        })
      }
      else{
        res.status(404).json({
          'message': 'User not found'
        })
      }
    })
}

exports.delete = (req, res) =>{
  Users.findOne({
    where: {
      id: req.query.id
    }
  })
    .then(data=>{
      Users.destroy({
        where: {
          id: data.id
        }
      })

      res.status(200).json({
        'message': `User deleted`
      })
    })
    .catch(err=>{
      res.status(404).json({
        'message': 'user not found'
      })
    })
}