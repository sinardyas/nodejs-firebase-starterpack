const admin = require('firebase-admin');

const db = admin.database();

module.exports = {
  getAll: () => new Promise((resolve) => {
    const ref = db.ref('reflection');

    ref.once('value', (data) => {
      resolve(data.val());
    });
  }),
};
