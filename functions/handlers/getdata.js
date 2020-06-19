const { db, firestore } = require('../util/admin');

exports.getdata = (req, res) => {
  let EasySET = [];
  let MediumSET = [];
  let HardSET = [];
  let random = req.randomArray;
  console.log(req.headers);

  function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  if (Math.round(Math.random())) {
    Promise.all([
      db
        .collection('QuestionCollection/Easy/QuestionsData')
        .orderBy('id', 'asc')
        .limit(20)
        .get()
        .then((snapshot) => {
          snapshot.forEach((document) => {
            EasySET.push(document.data());
          });
        })
        .catch((err) => {
          console.error(err);
          res.status(500).json(err);
        }),
      db
        .collection('QuestionCollection/Medium/QuestionsData')
        .orderBy('id', 'asc')
        .limit(20)
        .get()
        .then((snapshot) => {
          snapshot.forEach((document) => {
            MediumSET.push(document.data());
          });
        })
        .catch((err) => {
          console.error(err);
          res.status(500).json(err);
        }),
      db
        .collection('QuestionCollection/Hard/QuestionsData')
        .orderBy('id', 'asc')
        .limit(20)
        .get()
        .then((snapshot) => {
          snapshot.forEach((document) => {
            HardSET.push(document.data());
          });
        })
        .catch((err) => {
          console.error(err);
          res.status(500).json(err);
        }),
    ]).then(() => {
      return res.status(200).json({
        data: {
          EasySET: shuffle(EasySET),
          MediumSET: shuffle(MediumSET),
          HardSET: shuffle(HardSET),
        },
      });
    });
  } else {
    Promise.all([
      db
        .collection('QuestionCollection/Easy/QuestionsData')
        .orderBy('id', 'desc')
        .limit(20)
        .get()
        .then((snapshot) => {
          snapshot.forEach((document) => {
            EasySET.push(document.data());
          });
        })
        .catch((err) => {
          console.error(err);
          res.status(500).json(err);
        }),
      db
        .collection('QuestionCollection/Medium/QuestionsData')
        .orderBy('id', 'desc')
        .limit(20)
        .get()
        .then((snapshot) => {
          snapshot.forEach((document) => {
            MediumSET.push(document.data());
          });
        })
        .catch((err) => {
          console.error(err);
          res.status(500).json(err);
        }),
      db
        .collection('QuestionCollection/Hard/QuestionsData')
        .orderBy('id', 'desc')
        .limit(20)
        .get()
        .then((snapshot) => {
          snapshot.forEach((document) => {
            HardSET.push(document.data());
          });
        })
        .catch((err) => {
          console.error(err);
          res.status(500).json(err);
        }),
    ]).then(() => {
      return res.status(200).json({
        data: {
          EasySET: shuffle(EasySET),
          MediumSET: shuffle(MediumSET),
          HardSET: shuffle(HardSET),
        },
      });
    });
  }
};
