const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const axios = require('axios');
const vision = require('@google-cloud/vision');
const fs = require('fs');
const {Translate} = require('@google-cloud/translate');

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

app.post('/spellcheck', (req, res) => {
  let returnString = req.body.text;
  uri = encodeURI(`https://api.cognitive.microsoft.com/bing/v7.0/spellcheck?mkt=en-us&mode=proof&text=${req.body.text}`)
  axios({
    url: uri,
    method: 'POST',
    headers: {
      'Ocp-Apim-Subscription-Key': 'c835add0136a44adafc4176ae7e27e58',
      'Content-Type': 'application/json'
    }
  })
    .then((corrected) => {
      corrected.data.flaggedTokens.forEach((token) => {
        returnString = returnString.replace(new RegExp(`\\b${token.token}\\b`), `${token.suggestions[0].suggestion}`);
      });
      res.send(returnString);
    }).catch((err) => {
      console.log(err);
      res.status(400).send({Error: 'The spellcheck failed'});
    });
});

app.post('/translate', (req, res) => {
  console.log(req.body.text);
  const text = req.body.text;
  const targetLang = req.body.lang;
  // Your Google Cloud Platform project ID
  const projectId = 'notepal-216511';

  // Instantiates a client
  const translate = new Translate({
    projectId: projectId,
  });

  translate
    .translate(text, targetLang)
    .then(results => {
      let translations = results[0];
      translations = Array.isArray(translations)
        ? translations
        : [translations];

      console.log('Translations:');
      translations.forEach((translation, i) => {
        res.send({translatedText: `${translation}`});
      });
    })
    .catch(err => {
      res.status(404).send({Error: 'An error occurred with Google Translate'});
    });

  // res.send({translatedText: `test!`});
});

app.post('/summarize', (req, res) => {
  uri = encodeURI(`http://api.meaningcloud.com/summarization-1.0?key=b5e571b2efbf07d5f7202bfa428e52ae&sentences=3&txt=${req.body.text}`)
  axios ({
    url: uri,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((response) => {
      if (response.data.summary === '') {
        return res.send({summarizedText: req.body.text})
      }
      res.send({summarizedText: `${response.data.summary}`});

    }).catch((err) => {
      console.log(err)
      res.status(400).send({Error: 'The summarization failed'});
    });
});

app.get('/notePicture', (req, res) => {
  const filePath = __dirname + '/' + req.query.filePath;
  res.sendFile(filePath, null, (err) => {
    if (err){
      return res.status(404).send();
    }
  });
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
      res.send({fullText: `${fullTextAnnotation.text}`, filePath});
    })
    .catch((err) => {
      res.status(400).send({Error: 'An error occurred with Google Vision'});
    });
});

app.get('/myNotes/:userId', (req, res) => {
  const userId = req.params.userId;
  console.log(userId)
  axios({
    method: 'get',
    url: 'https://notepal-216511.firebaseio.com/notes/.json'
  }).then((data) => {

    let keys = Object.keys(data.data).filter((key) => {
      return data.data[key].userId === userId
    });
    let notes = [];
    keys.forEach((key) => {
      notes.push({...data.data[key], key});
    });
    res.send({notes})
  }).catch((err) => {
    res.status(400).send({Error: 'An error occured while fetching your messages'});
  })
});

app.listen(PORT, () => {
  console.log(`[Server] : Running on port ${PORT}`);
});
