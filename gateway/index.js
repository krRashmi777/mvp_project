const express = require('express')
const proxy = require('express-http-proxy')

const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerDocument = YAML.load('swagger.yaml');
const cors = require('cors')

const config = require('./config')

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use('/api-swaggerDoc', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use('/auth', proxy('http://localhost:8001'));

app.listen(config.PORT, () => {
    console.log("gateway is running successful")
})

