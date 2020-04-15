const { db, firestore } = require('../util/admin');
var CryptoJS = require('crypto-js');

exports.postscore = (req, res) => {
  let uid = req.user.sub;
  let scoreFromBody = req.body.score;
  let encryptedScore = req.body.encdbkey;
  const arrayofS = encryptedScore.split('/')[0];
  const hash = encryptedScore.substring(encryptedScore.length - 44);
  const SA = encryptedScore.length - hash.length;
  const anotherlen = arrayofS.length + 1;
  const key = encryptedScore.substring(anotherlen, SA);
  const bytes = CryptoJS.AES.decrypt(hash, key);
  const decryptedScore = bytes.toString(CryptoJS.enc.Utf8);

  if (scoreFromBody.toString() === decryptedScore) {
    const userData = {
      userName: req.user.name,
      userEmail: req.user.email,
      userScore: parseInt(decryptedScore),
      userAuthTime: firestore.Timestamp.now(),
    };
    db.collection('Users')
      .doc(uid)
      .create(userData)
      .then((result) => {
        return res.status(201).json({ message: 'document created' });
      })
      .catch((err) => {
        return res.status(400).json(err);
      });
  } else {
    return res.status(401).json({ message: 'wrong score' });
  }
};
