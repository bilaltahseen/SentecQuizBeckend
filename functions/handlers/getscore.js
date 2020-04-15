const { db } = require('../util/admin');
exports.getscore = (req, res) => {
  if (req.user.uid === 'zrzflr5xzQUCpluwE5JZ4iFNDK22') {
    db.collection('Users')
      .orderBy('userScore', 'desc')
      .get()
      .then((snapshot) => {
        let scoreData = [];
        snapshot.forEach((document) => {
          scoreData.push(document.data());
        });
        return res.status(200).json({ scoreData: scoreData });
      })
      .catch((err) => {
        res.status(404).json({ err });
      });
  } else {
    return res.status(403).json({ message: 'Unauthorized' });
  }
};
