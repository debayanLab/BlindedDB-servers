let mongoose = require('mongoose')

mongoose.connect(`mongodb+srv://user:pass@cluster0.jzpjc.mongodb.net/server_2?retryWrites=true&w=majority`, {'useNewUrlParser': true})

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

module.exports = Secret1 = mongoose.model('secret_2', SecretSchema)