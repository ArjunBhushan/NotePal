const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
const multer = require('multer')
const axios = require('axios')
const vision = require('@google-cloud/vision')
const fs = require('fs')

process.env.GOOGLE_APPLICATION_CREDENTIALS  = __dirname + '/vision_auth.json';

const upload = multer({ dest: 'uploads/'});
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors())
app.use(bodyParser.json())

app.use((req, res, next) => {
  console.log(`[Server] : ${req.method} ${req.url}`);
  next();
});

app.post('/translate', (req, res) => {
  console.log(req.body);
  res.send();
});

app.post('/analyzePicture', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(404).send({Error: 'No image uploaded'});
  }
  const filePath = req.file.path

  const client = new vision.ImageAnnotatorClient()
  const request = {
    image: {
      content: fs.readFileSync(filePath),
    },
    feature: {
      languageHints: ['en-t-i0-handwrit'],
    },
  };
  client
    .documentTextDetection(request)
    .then((results) =>{
      const fullTextAnnotation = results[0].fullTextAnnotation;
      res.send({fullText: `${fullTextAnnotation.text}`});
    })
    .catch((err) => {
      res.status(400).send({Error: 'An error occurred with Google Vision'});
    });
});
app.listen(PORT, () => {
  console.log(`[Server] : Running on port ${PORT}`);
});
