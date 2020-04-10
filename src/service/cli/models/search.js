'use strict';

const getArticles = require(`./article`).getAll;

const search = {
  getMatches: async (text) => {
    const articles = await getArticles();
    const matches = [];
    const regExp = new RegExp(text, `gi`);

    articles.filter((article) => {
      if (article.title.match(regExp)) {
        matches.push(article);
      }
    });

    return matches;
  }
};

module.exports = search;
