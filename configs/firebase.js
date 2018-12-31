const firebase = require('firebase-admin');

const db = firebase.initializeApp({
  credential: firebase.credential.cert({
    projectId: process.env.PROJECT_ID,
    clientEmail: process.env.CLIENT_EMAIL,
    privateKey: process.env.PRIVATE_KEY.replace(/\\n/g, '\n')
  }),
  databaseURL: process.env.DB_URL
});

module.exports = db;
