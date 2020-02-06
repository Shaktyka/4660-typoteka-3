'use strict';

const chalk = require(`chalk`);
const {Cli} = require(`./cli`);

const {
  DEFAULT_COMMAND,
  USER_ARGV_INDEX,
  POSTS_AMOUNT_MAX,
  ExitCode,
  Message
} = require(`../constants.js`);

const userArguments = process.argv.slice(USER_ARGV_INDEX);
let userCommand = userArguments[0];
const amountParam = userArguments[1];
let result = null;

// Если параметры не переданы или команда не найдена
if (userArguments.length === 0 || !Cli[userCommand]) {
  userCommand = DEFAULT_COMMAND;
}

if (userCommand === `--generate` && amountParam > POSTS_AMOUNT_MAX) {
  console.info(chalk.red(Message.OVERHEAD));
  process.exit(ExitCode.ERROR);
}

// Проверка результата
const processResult = (promice) => {
  // console.log(promice);
  // promice
  //   .then(() => process.exit(ExitCode.SUCCESS))
  //   .catch((err) => console.info(chalk.red(err)));
};

// Вычисление и возврат результата
result = Cli[userCommand].run(amountParam);
if (result instanceof Promise) {
  processResult(result);
}
