const firebase = require('../libs/firebase');
const { httpStatus } = require('./../configs/app');

const controller = {
  getAll: async (req, res, next) => {
    let ref;
    let totalData;
    const { page = 1 } = req.query;
    const data = [];
    const value = page.padStart(2, '0');
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

    return res.status(httpStatus.ok).json({
      status: httpStatus.ok,
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
      return res.status(httpStatus.badRequest).json({
        status: httpStatus.badRequest,
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

    return res.status(httpStatus.ok).json({
      status: httpStatus.ok,
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
      return res.status(httpStatus.badRequest).json({
        status: httpStatus.badRequest,
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

    return res.status(httpStatus.ok).json({
      status: httpStatus.ok,
      success: true
    });
  },

  delete: async (req, res, next) => {
    const { id } = req.params;

    try {
      await firebase.delete({ id });
    } catch (e) {
      return next(e);
    }

    return res.status(httpStatus.ok).json({
      status: httpStatus.ok,
      success: true
    });
  }
};

module.exports = (router) => {
  router.get('/', controller.getAll);
  router.post('/', controller.create);
  router.post('/:id/update', controller.update);
  router.post('/:id/delete', controller.delete);
};
