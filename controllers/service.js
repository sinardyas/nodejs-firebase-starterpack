const firebase = require('../libs/firebase');

const controller = {
  getAll: async (req, res, next) => {
    let ref;
    let totalData;
    const { page } = req.query;
    const data = [];
    const value = page < 10 ? `0${page}` : `${page}`;
    const query = {
      field: 'date',
      startAtValue: value,
      endAtValue: `${value}\uf8ff`
    };

    try {
      ref = await firebase.getAllByChild(query);
      totalData = await firebase.countAll();
    } catch (e) {
      return next(e);
    }

    ref.forEach((element) => {
      data.push(element.val());
    });

    return res.status(200).json({
      status: 200,
      success: true,
      data: {
        currentPage: parseInt(page, 10),
        totalData,
        docs: data
      }
    });
  },

  create: async (req, res, next) => {
    req.checkBody({
      body: { notEmpty: true, errorMessage: 'body is required' },
      date: { notEmpty: true, errorMessage: 'date is required' },
      title: { notEmpty: true, errorMessage: 'title is required' },
      verse: { notEmpty: true, errorMessage: 'verse is required' },
      verseBody: { notEmpty: true, errorMessage: 'verseBody is required' }
    });

    const errors = req.validationErrors();
    if (errors) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: errors
      });
    }

    const {
      body,
      date,
      title,
      verse,
      verseBody
    } = req.body;

    try {
      await firebase.create({
        body,
        date,
        title,
        verse,
        verseBody
      });
    } catch (e) {
      return next(e);
    }

    return res.status(200).json({
      status: 200,
      success: true
    });
  },

  update: async (req, res, next) => {
    req.checkBody({
      body: { notEmpty: true, errorMessage: 'body is required' },
      date: { notEmpty: true, errorMessage: 'date is required' },
      title: { notEmpty: true, errorMessage: 'title is required' },
      verse: { notEmpty: true, errorMessage: 'verse is required' },
      verseBody: { notEmpty: true, errorMessage: 'verseBody is required' }
    });

    const errors = req.validationErrors();
    if (errors) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: errors
      });
    }

    const {
      body,
      date,
      title,
      verse,
      verseBody
    } = req.body;
    const { id } = req.params;

    try {
      await firebase.update({
        body,
        date,
        title,
        verse,
        verseBody,
        id
      });
    } catch (e) {
      return next(e);
    }

    return res.status(200).json({
      status: 200,
      success: true
    });
  }
};

module.exports = (router) => {
  router.get('/', controller.getAll);
  router.post('/', controller.create);
  router.post('/:id', controller.update);
};
