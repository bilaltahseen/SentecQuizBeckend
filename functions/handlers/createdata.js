const { db, firestore } = require('../util/admin');

exports.createdata = (req, res) => {
  let currentid;
  if (
    req.body.level === '' &&
    req.body.question === '' &&
    req.body.options === '' &&
    req.body.CorrectAnswer === ''
  ) {
    return res.status(400).json({ message: 'fields cannot be emptied' });
  } else {
    if (req.user.uid === 'zrzflr5xzQUCpluwE5JZ4iFNDK22') {
      db.collection(`QuestionCollection/${req.body.level}/QuestionsData`)
        .get()
        .then((snapshot) => {
          if (snapshot.size) {
            currentid = snapshot.size;
          } else {
            currentid = 0;
          }
        })
        .then(() => {
          db.collection(`QuestionCollection/${req.body.level}/QuestionsData`)
            .add({
              id: currentid + 1,
              questionPara: req.body.question,
              options: req.body.options,
              CorrectAnswer: new Buffer.from(
                Math.random().toString(36).substring(2, 15) +
                  req.body.CorrectAnswer
              ).toString('base64'),
            })
            .then(() => {
              return res.status(200).json({ message: 'docuemnet created' });
            });
        })
        .catch((err) => {
          console.error(err);
          res.status(500).json(err);
        });
    } else {
      return res.status(403).json({ message: 'Unauthorized' });
    }
  }
};
