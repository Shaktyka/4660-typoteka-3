'use strict';

const readFileData = require(`../../../utils`).readFileData;
const {MOCKS_FILE} = require(`../../../constants`);
const getArticles = require(`./article`).getAll;

const search = {
  getMatches: async (text) => {
    const articles = await getArticles();
    const parsedArticles = JSON.parse(articles);
    const matches = [];
    const regExp = new RegExp(text, `gi`);

    parsedArticles.filter((article) => {
      if (article.title.match(regExp)) {
        matches.push(article);
      }
    });

    return matches;
  }
};

module.exports = search;
