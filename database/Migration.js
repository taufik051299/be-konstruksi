const sequlize = require('./Database')
// MODELS
const Users = require('../app/models/Users')

exports.migrate = (req, res) =>{
  sequlize.sync({force: true})
    .then(res=>{
      console.log(res)
    })
    .catch(err=>console.log(err))
    res.status(200).json({
      'message': 'tables migrated'
    })
  }