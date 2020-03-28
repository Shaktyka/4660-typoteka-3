'use strict';

const readFileData = require(`../../../utils.js`).readFileData;
// const nanoid = require(`nanoid`);

const MOCKS_FILE = `mocks.json`;
// const ID_SYMBOLS_AMOUNT = 6;

const article = {
  // Получаем весь список объявлений
  getAll: async () => {
    const articlesList = await readFileData(MOCKS_FILE);
    return articlesList;
  }
};

module.exports = article;
