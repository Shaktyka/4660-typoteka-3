'use strict';

const {readFileData} = require(`../../../utils`);
const nanoid = require(`nanoid`);
const {
  MOCKS_FILE,
  ID_SYMBOLS_AMOUNT
} = require(`../../../constants`);

// Массив статей из файла
let articles = null;

const article = {
  // Возвращает весь список публикаций
  getAll: async () => {
    if (!Array.isArray(articles)) {
      articles = await readFileData(MOCKS_FILE);
      articles = JSON.parse(articles);
    }
    return articles;
  },

  // Возвращает объект с данными нового объявления
  fillWithData: (articleData) => {
    const articleObjest = {
      id: nanoid(ID_SYMBOLS_AMOUNT),
      title: articleData.title,
      picture: articleData.picture || ``,
      createdDate: articleData[`created-date`],
      announce: articleData.announce,
      fullText: articleData[`full-text`] || ``,
      category: articleData.category,
      comments: []
    };
    return articleObjest;
  },

  // Добавляет объект в массив статей
  addToArray: async (articleObj) => {
    const articlesList = await article.getAll();
    articlesList.push(articleObj);
  },

  // Возвращает публикацию по id
  get: async (articleId) => {
    const articlesList = await article.getAll();
    return articlesList.find((articleItem) => articleItem.id === articleId);
  },

  // Добавляет новую публикацию
  add: async (articleData) => {
    const newArticle = article.fillWithData(articleData);
    await article.addToArray(newArticle);
    return newArticle.id;
  },

  // Обновляет публикацию по id
  update: async (articleId, articleData) => {
    let post = await article.get(articleId);
    let postId = null;

    if (post) {
      post.title = articleData.title;
      post.picture = articleData.picture || ``;
      post.createdDate = articleData[`created-date`];
      post.announce = articleData.announce;
      post.fullText = articleData[`full-text`] || ``;
      post.category = articleData.category;
      postId = articleId;
    }

    return postId;
  },

  // Удаляет публикацию по id
  delete: async (articleId) => {
    const articlesList = await article.getAll();
    articles = articlesList.filter((articleItem) => {
      return articleItem.id !== articleId;
    });
  },

  // Возвращает список комментариев публикации по id
  getComments: async (articleId) => {
    let comments = [];
    const post = await article.get(articleId);
    if (post.hasOwnProperty(`comments`)) {
      comments = post.comments;
    }
    return comments;
  },

  // Добавляет комментарий в публикацию по id
  addComment: async (articleId, comment) => {
    const newComment = {"id": nanoid(4), "text": comment};
    const post = await article.get(articleId);
    post.comments.push(newComment);
    return articleId;
  },

  // Удаляет комментарий по id в публикации с id
  deleteComment: async (articleId, commentId) => {
    let isDeleted = false;

    const post = await article.get(articleId);
    const commentsLength = post.comments.length;

    post.comments = post.comments.filter((comment) => comment.id !== commentId);
    if (commentsLength > post.comments.length) {
      isDeleted = true;
    }

    return isDeleted;
  }
};

module.exports = article;
