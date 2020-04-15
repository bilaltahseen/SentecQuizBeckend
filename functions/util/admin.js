//Admin Sdk

const admin = require('firebase-admin');
admin.initializeApp();

//Database

const db = admin.firestore();

const firestore = admin.firestore;

module.exports = { admin, db, firestore };
