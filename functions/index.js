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

//getdataRoute
app.use(helmet());
app.use(cors);
app.use(cookieParser);
app.use(validateFirebaseIdToken);

app.get('/getdata', getdata);
app.get('/getscore', getscore);
//createdataRoute
app.post('/postdata', createdata);
app.post('/postscore', postscore);

exports.api = functions.region('asia-east2').https.onRequest(app);
