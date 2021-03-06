const express = require('express'),
  bodyParser = require('body-parser'),
  cors = require('cors');

const app = express();

require('dotenv').config();

require('./server/config/mongoose')();

// For DEVELOPMENT PURPOSE. Delete when being deployed.
app.use(cors());
app.use(express.static( __dirname + '/public/dist/libreriaProject' ));
app.use(bodyParser.json());

require('./server/config/passport')(app);

require('./server/config/routes')(app);

app.listen(process.env.PORT || 8000, function() {
  console.log(`Listening on port ${process.env.PORT || 8000}`);
})