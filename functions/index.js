const functions = require('firebase-functions');

//Dependincies
const cors = require('cors')({ origin: true });
const cookieParser = require('cookie-parser')();
const helmet = require('helmet');
//Initliazation
const app = require('express')();

const { db, firestore } = require('./util/admin');

//GetData
const { getdata } = require('./handlers/getdata');

//MiddleWare
const { validateFirebaseIdToken } = require('./util/MiddleWare');

//CreateData
const { createdata } = require('./handlers/createdata');

//ScorePost
const { postscore } = require('./handlers/postscore');

//ScoreGet
const { getscore } = require('./handlers/getscore');

//RandomGen
const generateRandom = (req, res, next) => {
  const max = 5;
  let random = [];
  for (let i = 0; i < max; i++) {
    let temp = Math.floor(Math.random() * 6);
    if (random.indexOf(temp) === -1 && temp !== 0) {
      random.push(temp);
    } else i--;
  }
  req.randomArray = random;
  return next();
};
//getdataRoute
app.use(helmet());
app.use(cors);
app.use(cookieParser);
app.use(validateFirebaseIdToken);

app.get('/getdata', generateRandom, getdata);
app.get('/getscore', getscore);
//createdataRoute
app.post('/postdata', createdata);
app.post('/postscore', postscore);

exports.api = functions.region('asia-east2').https.onRequest(app);
