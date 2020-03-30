'use strict';

const {Router} = require(`express`);
const categoriesRouter = new Router();
const category = require(`../models/category`);
const asyncHandler = require(`express-async-handler`);
const createError = require(`http-errors`);
const chalk = require(`chalk`);
const {
  HttpCode,
  ResultMessage,
  SERVER_ERROR_MESSAGE
} = require(`../../../constants`);

// Отдаёт все категории
categoriesRouter.get(`/`, asyncHandler(async (req, res) => {
  try {
    let response = await category.getAll();
    console.log(chalk.green(ResultMessage.DATA_SENT));
    return res.json(response);
  } catch (err) {
    console.log(chalk.red(err));
    throw createError(HttpCode.INTERNAL_SERVER_ERROR, SERVER_ERROR_MESSAGE);
  }
}));

module.exports = categoriesRouter;
