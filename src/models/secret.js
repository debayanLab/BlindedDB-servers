let mongoose = require('mongoose')

let secret_1 = mongoose.createConnection(`mongodb+srv://user:pass@cluster0.sdt4t.mongodb.net/server_1?retryWrites=true&w=majority`, {'useNewUrlParser': true})

let SecretSchema = new mongoose.Schema({
  user_id: {
      type: String,
      required: true
    },
  secret_key: {
      type: Object,
      required: true
  }
  }
)
const secret_1Model = secret_1.model('secret', SecretSchema);

// let secret_2 = mongoose.createConnection(`mongodb+srv://user1:pass1@cluster0.vqaok.mongodb.net/server_2?retryWrites=true&w=majority`, {'useNewUrlParser': true})
// const secret_2Model = secret_2.model('secret', SecretSchema);

module.exports = secret_1Model