let Secret = require('../models/secret')
let express = require('express')
let router = express.Router()

// // Create a new customer
// // POST localhost:3000/customer
const axios = require('axios')

const sss = require('shamirs-secret-sharing')

// const recovered = sss.combine(shares.slice(1,3))
// console.log(recovered.toString()) // 'secret key
router.get('/secret_link', (req, res) => {
  if(!req.body) {
    return res.status(400).send('Request body is missing')
  }
  else   
  // let model = new SecretModel(req.body)
  // model.save
  {
    axios.get('https://kamakoti-server.herokuapp.com/api/users')
    .then((response) => {
      // console.log('i need a text', response.data)
      // return res.status(200).json(response)

      //Server - 1
      response.data.data.map(values => {
        let id = values._id;
        let user_name = values.name;
        Secret.findOne({
          user_id: id
        }).then(data => {
          console.log('Data', data)
          if (data){
            console.log('Already exists')
          } else {
            
            //Secret Sharing
            const secret = Buffer.from(user_name)
            let shares = sss.split(secret, { shares: 3, threshold: 2 })

            let secretForm = shares[0];
            const newSecret = new Secret({
              user_id: id,
              secret_key: secretForm
            })
            newSecret.save().then(user => console.log('User saves', user.id)).catch(error => console.log('Error', error))
          }
        }).catch(error=> {
          return res.status(400).json({"Error": error})
        })
      })
      
    })
    .catch(error => console.log(error))
  }
    {return res.status(200).json("Secret for server one has been placed!!!!") }
})

// router.get('/all', async(req, res) =>{
//   await Secret.find({}, { _id: 0, __v: 0 }).lean().exec((err, result) => {
//       res.json(result)
//   })
// })


module.exports = router