const { db } = require('../util/admin');

exports.getdata = (req, res) => {
  let EasySET = [];
  let MediumSET = [];
  let HardSET = [];
  let random = req.randomArray;
  console.log(req.headers);
  Promise.all([
    db
      .collection('QuestionCollection/Easy/QuestionsData')
      .where('id', 'in', [...random])
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
      .where('id', 'in', [...random])
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
      .where('id', 'in', [...random])
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
      data: { EasySET: EasySET, MediumSET: MediumSET, HardSET: HardSET },
    });
  });
};
