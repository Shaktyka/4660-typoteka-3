'use strict';

const chalk = require(`chalk`);
const packageJsonFile = require(`../../../package.json`);

module.exports = {
  name: `--version`,
  async run() {
    const version = await packageJsonFile.version;
    if (version) {
      console.info(chalk.blue(version));
    }
  }
};
