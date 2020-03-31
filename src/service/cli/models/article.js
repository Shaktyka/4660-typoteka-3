'use strict';

const readFileData = require(`../../../utils.js`).readFileData;
const {MOCKS_FILE} = require(`../../../constants`);
// const nanoid = require(`nanoid`);

const article = {
  // Получаем весь список объявлений
  getAll: async () => {
    const articlesList = await readFileData(MOCKS_FILE);
    return articlesList;
  }
};

module.exports = article;
