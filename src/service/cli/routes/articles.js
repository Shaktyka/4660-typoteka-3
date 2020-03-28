'use strict';

const {Router} = require(`express`);
const articlesRouter = new Router();
const asyncHandler = require(`express-async-handler`);
const createError = require(`http-errors`);
const article = require(`../models/article`);
const {
  HttpCode,
  ServerMessage
} = require(`../../../constants`);
// const validation = require(`../../../validation`);

// const NO_ID_MESSAGE = `Не передан id`;

// Отдаёт список всех статей
articlesRouter.get(`/`, asyncHandler(async (req, res) => {
  try {
    const result = await article.getAll();
    console.log(ServerMessage.DATA_SENT);
    res.json(result);
  } catch (err) {
    throw createError(
        HttpCode.INTERNAL_SERVER_ERROR,
        {message: `Ошибка сервера`}
    );
  }
}));

module.exports = articlesRouter;
