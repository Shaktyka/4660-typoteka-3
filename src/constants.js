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

module.exports = {
  DEFAULT_COMMAND,
  USER_ARGV_INDEX,
  POSTS_AMOUNT_MAX,
  ExitCode,
  Message
};
