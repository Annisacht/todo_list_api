const express = require('express')
const app = express()
const PORT = 5000


const morgan = require('morgan')
const cors = require('cors')
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

app.listen(PORT, function() {
    console.log(`server is running in port : ${ PORT }`)
})

const ConnectionMongoDB = require('./mongodb/ConnectionMongoDB')
ConnectionMongoDB()

app.get('/',(req, res) => {
    res.send('homepage')
})

const routes = require('./routes/apiRoutes')
app.use('/api/v1', routes)