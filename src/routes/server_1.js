let mongoose = require('mongoose')

let secret_1 = mongoose.createConnection(`mongodb+srv://user:pass@cluster0.sdt4t.mongodb.net/server_1?retryWrites=true&w=majority`, {'useNewUrlParser': true})

let SecretSchema = new mongoose.Schema({
  user_id: {
      type: String,
      required: true
    },
  secret_key: {
      type: Buffer,
  }
  }
)
const secret_1Model = secret_1.model('secret_1', SecretSchema);

let secret_2 = mongoose.createConnection(`mongodb+srv://user1:pass1@cluster0.vqaok.mongodb.net/server_2?retryWrites=true&w=majority`, {'useNewUrlParser': true})
const secret_2Model = secret_2.model('secret_2', SecretSchema);

let secret_3 = mongoose.createConnection(`mongodb+srv://user2:pass2@cluster0.wpih2.mongodb.net/server_3?retryWrites=true&w=majority`, {'useNewUrlParser': true})
const secret_3Model = secret_3.model('secret_3', SecretSchema);


let express = require('express')
let router = express.Router()

// // Create a new customer
// // POST localhost:3000/customer
const axios = require('axios')

const sss = require('shamirs-secret-sharing')
let shares;
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
    axios.get('https://blinded-db.herokuapp.com/api/users')
    .then((response) => {
      // console.log('i need a text', response.data)
      // return res.status(200).json(response)
      response.data.data.map(values => {
        let id = values._id;
        let user_name = values.name;
        secret_1Model.findOne({
          user_id: id
        }).then(data => {
          console.log('Data', data)
          if (data){
            console.log('Already exists')
          } else {
            
            //Secret Sharing
            const secret = user_name
            shares = sss.split(secret, { shares: 3, threshold: 2 })
            let secretForm0 = shares[0];
            let secretForm1 = shares[1];
            let secretForm2 = shares[2];
            const newSecret0 = new secret_1Model({
              user_id: id,
              secret_key: secretForm0
            })
            const newSecret1 = new secret_2Model({
              user_id: id,
              secret_key: secretForm1
            })
            const newSecret2 = new secret_3Model({
              user_id: id,
              secret_key: secretForm2
            })
            newSecret0.save().then(user => console.log('User saves', user.id)).catch(error => console.log('Error', error))
            newSecret1.save().then(user => console.log('User saves', user.id)).catch(error => console.log('Error', error))
            newSecret2.save().then(user => console.log('User saves', user.id)).catch(error => console.log('Error', error))
          }
        }).catch(error=> {
          return res.status(400).json({"Error": error})
        })
      })
    })
    .catch(error => console.log(error))
  }
    //return res.status(200).json("hello") }
})

router.get('/all-server-1', (req, res) => {
  if(!req.body) {
    return res.status(400).send('Request body is missing')
  }
  else   
  {
    secret_1Model.find({ })
      .then(data => {
        res.json(data)
      })
      .catch(err => {
        res.status(500).json(err)
      });
  }

});

router.get('/all-server-2', (req, res) => {
  if(!req.body) {
    return res.status(400).send('Request body is missing')
  }
  else   
  {
    secret_2Model.find({ })
      .then(data => {
        res.json(data)
      })
      .catch(err => {
        res.status(500).json(err)
      });
  }

});

router.get('/all-server-3', (req, res) => {
  if(!req.body) {
    return res.status(400).send('Request body is missing')
  }
  else   
  {
    secret_3Model.find({ })
      .then(data => {
        res.json(data)
      })
      .catch(err => {
        res.status(500).json(err)
      });
  }

});

router.put('/delete-server-1', (req, res) => {
  if(!req.body) {
    return res.status(400).send('Request body is missing')
  }
  else   
  {
    secret_1Model.remove({ })
      .then(data => {
        res.json(data)
      })
      .catch(err => {
        res.status(500).json(err)
      });
  }

});

router.put('/delete-server-2', (req, res) => {
  if(!req.body) {
    return res.status(400).send('Request body is missing')
  }
  else   
  {
    secret_2Model.remove({ })
      .then(data => {
        res.json(data)
      })
      .catch(err => {
        res.status(500).json(err)
      });
  }

});

router.put('/delete-server-3', (req, res) => {
  if(!req.body) {
    return res.status(400).send('Request body is missing')
  }
  else   
  {
    secret_3Model.remove({ })
      .then(data => {
        res.json(data)
      })
      .catch(err => {
        res.status(500).json(err)
      });
  }

});

module.exports = router