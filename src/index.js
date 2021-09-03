let express = require('express')
let app = express()
let server_1Route = require('./routes/server_1')
// let customerRoute = require('./routes/customer')
let path = require('path')
app.use(express.json())

app.use(server_1Route)
// app.use(customerRoute)
app.use(express.static('public'))

// Handler for 404 - Resource Not Found
app.use((req, res, next) => {
  res.status(404).send('Not found')
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.info(`Server has started on ${PORT}`))