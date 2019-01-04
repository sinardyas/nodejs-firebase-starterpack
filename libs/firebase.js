const admin = require('firebase-admin');

const db = admin.database();

module.exports = {
  getAll: params => new Promise((resolve) => {
    const { page = 1, limit = 10 } = params;
    const pageValue = (page - 1) * parseInt(limit, 10);
    const limitValue = parseInt(limit, 10);
    const ref = db.ref('reflection');

    ref.orderByKey().startAt(`${pageValue}`).limitToFirst(limitValue).on('value', (data) => {
      resolve(data);
    });
  }),

  getAllByChild: params => new Promise((resolve) => {
    const { field, startAtValue, endAtValue } = params;
    const ref = db.ref('reflection');

    ref.orderByChild(field).startAt(startAtValue).endAt(endAtValue).on('value', (data) => {
      resolve(data);
    });
  }),

  countAll: () => new Promise((resolve) => {
    const ref = db.ref('reflection');

    ref.on('value', (data) => {
      resolve(data.numChildren());
    });
  }),

  create: params => new Promise((resolve) => {
    const {
      body,
      date,
      title,
      verse,
      verseBody
    } = params;
    const ref = db.ref('reflection');
    const postRef = ref.push().set({
      body,
      date,
      title,
      verse,
      verseBody
    });

    resolve(postRef);
  }),

  update: params => new Promise((resolve) => {
    const {
      body,
      date,
      title,
      verse,
      verseBody,
      id
    } = params;
    const ref = db.ref('reflection');
    const postRef = ref.child(`${id}`).update({
      body,
      date,
      title,
      verse,
      verseBody
    });

    resolve(postRef);
  }),

  delete: params => new Promise((resolve) => {
    const { id } = params;

    const ref = db.ref('reflection');
    const postRef = ref.child(`${id}`);
    postRef.remove();

    resolve(postRef);
  })
};
