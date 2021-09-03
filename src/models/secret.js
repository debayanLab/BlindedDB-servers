let mongoose = require('mongoose')

mongoose.connect(`mongodb+srv://user:pass@cluster0.sdt4t.mongodb.net/server_1?retryWrites=true&w=majority`, {'useNewUrlParser': true})

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

module.exports = Secret = mongoose.model('secret_1', SecretSchema)