'use strict';

const chalk = require(`chalk`);
const {Cli} = require(`./cli`);

const {
  DEFAULT_COMMAND,
  USER_ARGV_INDEX,
  OFFERS_AMOUNT_MAX,
  ExitCode,
  Message
} = require(`../constants.js`);

const userArguments = process.argv.slice(USER_ARGV_INDEX);
const userCommand = userArguments.slice(USER_ARGV_INDEX);
const offersAmount = userCommand.slice(USER_ARGV_INDEX);

if (offersAmount > OFFERS_AMOUNT_MAX) {
  console.info(chalk.red(Message.OVERHEAD));
  process.exit(ExitCode.ERROR);
}

let result = null;

// Обрабатывает результат асинхронного выполнения команд
const processResult = (promice) => {
  promice
    .then(() => process.exit(ExitCode.SUCCESS))
    .catch((err) => console.log(chalk.red(err)));
};

if (userArguments.length === 0 || !Cli[userCommand[0]]) {
  result = Cli[DEFAULT_COMMAND].run();
  if (result instanceof Promise) {
    processResult(result);
  }
} else {
  result = Cli[userCommand[0]].run(offersAmount);
  if (result instanceof Promise) {
    processResult(result);
  }
}
