'use strict';

const {readFileData} = require(`../../../utils`);
const nanoid = require(`nanoid`);
const {
  MOCKS_FILE,
  ID_SYMBOLS_AMOUNT
} = require(`../../../constants`);

const article = {
  // Возвращает весь список публикаций
  getAll: async () => {
    const articlesList = await readFileData(MOCKS_FILE);
    return articlesList;
  },

  // Возвращает публикацию по id
  get: async (id) => {
    let post = null;
    const articlesList = await article.getAll();
    const parsedList = JSON.parse(articlesList);

    for (let i = 0; i < parsedList.length; i++) {
      if (parsedList[i].id === id) {
        post = parsedList[i];
        break;
      }
    }
    return post;
  },

  // Добавляет новую публикацию
  add: async (articleData) => {
    const articlesList = await article.getAll();
    const parsedList = JSON.parse(articlesList);

    const articleObject = articleData;
    articleObject.id = nanoid(ID_SYMBOLS_AMOUNT);

    parsedList.push(articleObject);
    return articleObject; // временно
  },

  // Обновляет публикацию по id
  updateOffer: async (id) => {
    // articleData
    const post = await article.get(id);

    /*
    post.title = articleData[`ticket-name`];
    post.picture = articleData.avatar;
    post.description = articleData.comment;
    post.type = articleData.action;
    post.sum = articleData.price;
    post.category = articleData.category;
    */

    return post; // временно
  },

  // Удаляет публикацию по id
  delete: async (id) => {
    const articlesList = await article.getAll();
    const parsedList = JSON.parse(articlesList);

    const filteredList = parsedList.filter((it) => {
      return it.id !== id;
    });

    return filteredList; // временно
  },

  // Возвращает список комментариев публикации по id
  getComments: async (id) => {
    let comments = [];
    const post = await article.get(id);

    if (post.hasOwnProperty(`comments`)) {
      comments = post.comments;
    }

    return comments;
  },

  // Добавляет комментарий в публикацию по id
  addComment: async (id, comment) => {
    const post = await article.get(id);
    if (post) {
      post.comments.push({id: nanoid(ID_SYMBOLS_AMOUNT), text: comment});
    }
    return post; // временно
  },

  // Удаляет комментарий по id в публикации с id
  deleteComment: async (articleId, commentId) => {
    const post = await article.get(articleId);
    post.comments = post.comments.filter((comment) => {
      return comment.id !== commentId;
    });

    return post; // временно
  }
};

module.exports = article;
