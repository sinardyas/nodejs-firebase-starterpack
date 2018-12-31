const firebase = require('./../../libs/firebase');

const controller = {
  getAll: async (req, res, next) => {
    let ref;
    try {
      ref = await firebase.getAll();
    } catch (e) {
      return next(e);
    }

    return res.status(200).json({
      success: true,
      data: ref
    });
  }
};

module.exports = (router) => {
  router.get('/', controller.getAll);
};
