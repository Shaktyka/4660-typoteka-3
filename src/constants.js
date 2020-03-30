'use strict';

const DEFAULT_COMMAND = `--help`;
const USER_ARGV_INDEX = 2;
const POSTS_AMOUNT_MAX = 1000;

const MOCKS_FILE = `mocks.json`;
const SERVER_ERROR_MESSAGE = `Ошибка сервера`;

const ExitCode = {
  SUCCESS: 0,
  ERROR: 1
};

const Message = {
  OVERHEAD: `Не больше 1000 объявлений`
};

const HttpCode = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500
};

const ServerMessage = {
  ERROR: `Ошибка при создании сервера`,
  CONNECT: `Ожидаю соединений на порту`,
  FILE_NOT_FOUND: `Файл не найден`,
  EMPTY_FILE: `Файл пустой`,
  DATA_SENT: `Данные отправлены`
};

const ResultMessage = {
  COMMENT_CREATED: `Комментарий добавлен`,
  COMMENT_DELETED: `Комментарий удалён`,
  ARTICLE_CREATED: `Объявление добавлено`,
  ARTICLE_UPDATED: `Объявление обновлено`,
  ARTICLE_DELETED: `Объявление удалено`,
  DATA_SENT: `Данные отправлены`,
  NOT_FOUND: `Объект не найден`
};

module.exports = {
  DEFAULT_COMMAND,
  USER_ARGV_INDEX,
  POSTS_AMOUNT_MAX,
  ExitCode,
  Message,
  HttpCode,
  ServerMessage,
  ResultMessage,
  MOCKS_FILE,
  SERVER_ERROR_MESSAGE
};
