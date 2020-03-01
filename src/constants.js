'use strict';

const DEFAULT_COMMAND = `--help`;
const USER_ARGV_INDEX = 2;
const POSTS_AMOUNT_MAX = 1000;

const ExitCode = {
  SUCCESS: 0,
  ERROR: 1
};

const Message = {
  OVERHEAD: `Не больше 1000 объявлений`
};

const HttpCode = {
  OK: 200,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  FORBIDDEN: 403,
  UNAUTHORIZED: 401
};

module.exports = {
  DEFAULT_COMMAND,
  USER_ARGV_INDEX,
  POSTS_AMOUNT_MAX,
  ExitCode,
  Message,
  HttpCode
};
