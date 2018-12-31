const admin = require('firebase-admin');

const db = admin.database();

module.exports = {
  getAll: req => new Promise((resolve) => {
    const { page, limit } = req;
    const ref = db.ref('reflection');

    ref.orderByKey().startAt(`${(page - 1) * parseInt(limit, 10)}`).limitToFirst(parseInt(limit, 10)).on('value', (data) => {
      resolve(data);
    });
  }),

  countAll: () => new Promise((resolve) => {
    const ref = db.ref('reflection');

    ref.on('value', (data) => {
      resolve(data.numChildren());
    });
  })
};
