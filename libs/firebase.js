const admin = require('firebase-admin');

const db = admin.database();

module.exports = {
  getAll: req => new Promise((resolve) => {
    const { page = 1, limit = 10 } = req;
    const pageValue = (page - 1) * parseInt(limit, 10);
    const limitValue = parseInt(limit, 10);
    const ref = db.ref('reflection');

    ref.orderByKey().startAt(`${pageValue}`).limitToFirst(limitValue).on('value', (data) => {
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
