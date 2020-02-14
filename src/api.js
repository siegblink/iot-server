const express = require('express')
const serverless = require('serverless-http')
const cors = require('cors')
const server = express()
const router = express.Router()
let data = null

server.use(express.urlencoded({ extended: false }))
server.use(express.json())
server.use(cors())

router.get('/', function (req, res) {
  res.send(`
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Simple IoT Server</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
  </head>
  <body>
    <div class="container"> 
      <div class="jumbotron p-3 shadow-sm mt-5">
        <form id="create-form" action="/.netlify/functions/api/send-data" method="POST">
          <div class="d-flex align-items-center">
            <input id="create-field" name="data" autofocus autocomplete="off" class="form-control mr-3" type="text" style="flex: 1;">
            <button class="btn btn-primary">Send data</button>
          </div>
        </form>
      </div>
      
      <ul id="item-list" class="list-group pb-5">
        
      </ul>
    </div>

    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
  </body>
  </html>`)
})

router.get('/get-data', function (req, res) {
  res.json(data)
})

router.post('/send-data', function (req, res) {
  data = req.body
  res.json(data)
})

server.use('/.netlify/functions/api', router)

module.exports.handler = serverless(server)
