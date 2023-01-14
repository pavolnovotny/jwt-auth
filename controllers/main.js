const { BadRequest } = require('../errors')
const jwt = require('jsonwebtoken')

const login = async (req,res) => {
  const {username, password} = req.body
  const id = new Date().getDate()
  if (!username || !password) {
    throw new BadRequest('Please provide email and password')
  }
  const token = jwt.sign({id, username},
    process.env.JWT_SECRET,
    {expiresIn: '30d'}
  )

  res.status(200).json({msg: 'user created', token})
}


const dashboard = async (req,res) => {
  console.log(req.user, 'controller')
  const luckyNumber = Math.floor(Math.random() * 100)
  res.status(200).json({msg: `Hello ${req.user.username}`, secret: luckyNumber})
}

module.exports = {
  login,
  dashboard
}
