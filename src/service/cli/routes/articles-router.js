'use strict';

const {Router} = require(`express`);
const articlesRouter = new Router();
const asyncHandler = require(`express-async-handler`);
const createError = require(`http-errors`);
const article = require(`../models/article`);
const chalk = require(`chalk`);
const {check, validationResult} = require(`express-validator`);
const {
  HttpCode,
  ServerMessage,
  SERVER_ERROR_MESSAGE,
  ResultMessage,
  NO_ID_MESSAGE
} = require(`../../../constants`);
const {
  CommentRequirements,
  ArticleRequirements
} = require(`../../../validation`);

// Возвращает список всех статей
articlesRouter.get(`/`, asyncHandler(async (req, res) => {
  try {
    const result = await article.getAll();
    console.log(chalk.green(ServerMessage.DATA_SENT));
    res.json(result);
  } catch (err) {
    throw createError(
        HttpCode.INTERNAL_SERVER_ERROR,
        {message: SERVER_ERROR_MESSAGE}
    );
  }
}));

// Отдаёт публикацию по id
articlesRouter.get(`/:articleId`, asyncHandler(async (req, res) => {
  try {
    const articleId = req.params.articleId.trim();
    const result = await article.get(articleId);
    if (result) {
      console.log(chalk.green(ResultMessage.DATA_SENT));
      return res.json(result);
    } else {
      console.log(chalk.red(ResultMessage.NOT_FOUND));
      return res.status(HttpCode.NOT_FOUND).send(ResultMessage.NOT_FOUND);
    }
  } catch (err) {
    console.log(chalk.red(err));
    throw createError(
        HttpCode.INTERNAL_SERVER_ERROR,
        {message: SERVER_ERROR_MESSAGE}
    );
  }
}));

// Отдаёт комментарии публикации по id
articlesRouter.get(`/:articleId/comments`, asyncHandler(async (req, res) => {
  const articleId = req.params.articleId.trim();
  if (articleId.length === 0) {
    throw createError(
        HttpCode.BAD_REQUEST,
        {message: NO_ID_MESSAGE}
    );
  }

  try {
    const result = await article.getComments(articleId);
    console.log(chalk.green(ResultMessage.DATA_SENT));
    res.json(result);
  } catch (err) {
    throw createError(
        HttpCode.INTERNAL_SERVER_ERROR,
        {message: SERVER_ERROR_MESSAGE}
    );
  }
}));

module.exports = articlesRouter;
