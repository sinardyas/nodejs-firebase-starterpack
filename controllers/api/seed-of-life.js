const firebase = require('./../../libs/firebase');

const controller = {
  getAll: async (req, res, next) => {
    let ref;
    let totalData;
    const { page, limit } = req.query;
    const data = [];
    const query = { page, limit };

    try {
      ref = await firebase.getAll(query);
      totalData = await firebase.countAll();
    } catch (e) {
      return next(e);
    }

    ref.forEach((element) => {
      data.push(element.val());
    });

    return res.status(200).json({
      success: true,
      data: {
        currentPage: parseInt(page, 10),
        dataPerPage: parseInt(limit, 10),
        totalData,
        docs: data
      }
    });
  }
};

module.exports = (router) => {
  router.get('/', controller.getAll);
};
