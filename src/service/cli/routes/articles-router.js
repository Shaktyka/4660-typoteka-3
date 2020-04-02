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
  BAD_REQUEST_MESSAGE,
  ResultMessage,
  NO_ID_MESSAGE
} = require(`../../../constants`);

const {
  ArticleRequirements,
  validateComment
} = require(`../../../validation`);

// Возвращает список всех статей
articlesRouter.get(`/`, asyncHandler(async (req, res) => {
  try {
    const result = await article.getAll();
    console.log(chalk.green(ServerMessage.DATA_SENT));
    res.json(result);
  } catch (err) {
    console.log(chalk.red(err));
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

// Валидация публикации
const validateArticle = () => {
  return [

  ];
};

// Добавляет новую публикацию
articlesRouter.post(`/`, validateArticle(), asyncHandler(async (req, res) => {
  const articleData = req.body;
  console.log(articleData);

  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(HttpCode.BAD_REQUEST).json({errors: errors.array()});
  // }

  try {
    await article.add(articleData);
    console.log(chalk.green(ResultMessage.ARTICLE_CREATED));
    return res.status(HttpCode.CREATED).send(ResultMessage.ARTICLE_CREATED);
  } catch (err) {
    console.log(chalk.red(err));
    throw createError(
        HttpCode.INTERNAL_SERVER_ERROR,
        {message: err.message}
    );
  }
}));

// Обновляет публикацию по id
articlesRouter.put(`/:articleId`, asyncHandler(async (req, res) => {
  const articleId = req.params.articleId.trim();
  if (articleId.length === 0) {
    throw createError(
        HttpCode.BAD_REQUEST,
        {message: NO_ID_MESSAGE}
    );
  }

  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(HttpCode.BAD_REQUEST).json({errors: errors.array()});
  // }

  try {
    const articleData = req.body;
    await article.update(articleId, articleData);
    console.log(chalk.green(ResultMessage.ARTICLE_CREATED));
    return res.status(HttpCode.NO_CONTENT).send(ResultMessage.ARTICLE_UPDATED);
  } catch (err) {
    console.log(chalk.red(err));
    throw createError(
        HttpCode.INTERNAL_SERVER_ERROR,
        {message: err.message}
    );
  }
}));

// Удаляет публикацию по id
articlesRouter.delete(`/:articleId`, asyncHandler(async (req, res) => {
  const articleId = req.params.articleId.trim();
  if (articleId.length === 0) {
    throw createError(
        HttpCode.BAD_REQUEST,
        {message: NO_ID_MESSAGE}
    );
  }

  try {
    await article.delete(articleId);
    console.log(chalk.green(ResultMessage.ARTICLE_DELETED));
    return res.status(HttpCode.NO_CONTENT).send(ResultMessage.ARTICLE_DELETED);
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
    console.log(chalk.red(err));
    throw createError(
        HttpCode.INTERNAL_SERVER_ERROR,
        {message: SERVER_ERROR_MESSAGE}
    );
  }
}));

// Добавляет комментарий для публикации с id
articlesRouter.put(`/:articleId/comments`, validateComment(), asyncHandler(async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(HttpCode.BAD_REQUEST).json({errors: errors.array()});
  }

  const articleId = req.params.articleId.trim();
  const {comment} = req.body;

  try {
    const result = await article.addComment(articleId, comment);
    if (result) {
      console.log(chalk.green(ResultMessage.COMMENT_CREATED));
      return res.status(HttpCode.CREATED).send(ResultMessage.COMMENT_CREATED);
    } else {
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

// Удаляет комментарий по id в публикации с id
articlesRouter.delete(`/:articleId/comments/:commentId`, asyncHandler(async (req, res) => {
  const articleId = req.params.articleId.trim();
  const commentId = req.params.commentId.trim();
  if (articleId.length === 0 || commentId === 0) {
    throw createError(
        HttpCode.BAD_REQUEST,
        {message: BAD_REQUEST_MESSAGE}
    );
  }

  try {
    await article.deleteComment(articleId, commentId);
    console.log(chalk.green(ResultMessage.COMMENT_DELETED));
    return res.status(HttpCode.NO_CONTENT).send(ResultMessage.COMMENT_DELETED);
  } catch (err) {
    console.log(chalk.red(err));
    throw createError(
        HttpCode.INTERNAL_SERVER_ERROR,
        {message: SERVER_ERROR_MESSAGE}
    );
  }
}));

module.exports = articlesRouter;
