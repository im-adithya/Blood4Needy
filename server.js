const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
let crypto = require('crypto');
const { exec } = require('child_process');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post('/redeploy', validateSecret, (req,res) => {

  exec('git pull && npm run post-deploy', (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      res.status(403).send(err);
    } else {
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
      res.status(200).send(`Auto deploy completed ${stdout} ${stderr}`);
    }
  })
})

function validateSecret(req, res, next) {
  const payload = JSON.stringify(req.body);
  if (!payload) {
    return next('Request body empty')
  }
  let sig =
    'sha1='+
    crypto
      .createHmac('sha1','Blood4Needy')
      .update(payload)
      .digest('hex');
  if (req.headers['x-hub-signature'] == sig) {
    return next();
  } else {
    return next('Signatures did not match');
  }

}
const uri = 'mongodb+srv://The_Hyperboy:mongodbat98@cluster0.v8oho.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const otpRouter = require('./routes/otp');
const userRouter = require('./routes/user');
const bloodRouter = require('./routes/blood');
const requestRouter = require('./routes/request');
const updateRouter = require('./routes/updates');

app.use('/api/otp', otpRouter);
app.use('/api/user', userRouter);
app.use('/api/blood', bloodRouter);
app.use('/api/updates', updateRouter);
app.use('/api/request', requestRouter);

app.use(express.static('client/build'))

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'client/build/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
