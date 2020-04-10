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

  // Возвращает объект с данными, которые можно перед записью модифицировать
  fillWithData: (data, isNew = false) => {
    const articleObjest = {
      title: data.title,
      picture: data.picture || ``,
      createdDate: data[`created-date`],
      announce: data.announce,
      fullText: data[`full-text`] || ``,
      category: data.category
    };
    if (isNew) {
      articleObjest.id = nanoid(ID_SYMBOLS_AMOUNT);
    }
    console.log(articleObjest);
    return articleObjest;
  },

  // Добавляет объект в массив статей
  addToArray: async (articleObj) => {
    const articlesList = await article.getAll();
    articlesList.push(articleObj);
  },

  // Возвращает публикацию по id
  get: async (id) => {
    const articlesList = await article.getAll();
    return articlesList.find((it) => it.id === id);
  },

  // Добавляет новую публикацию
  add: async (articleData) => {
    const isNew = true;
    const newArticle = article.fillWithData(articleData, isNew);
    await article.addToArray(newArticle);
    return newArticle.id;
  },

  // Обновляет публикацию по id
  update: async (id, articleData) => {
    let post = await article.get(id);
    console.log(post);

    if (post) {
      post = article.fillWithData(articleData);
      console.log(post);
      // post.title = articleData[`title`];
      // post.picture = articleData.picture || ``;
      // post.createdDate = articleData[`created-date`];
      // post.announce = articleData.announce;
      // post.fullText = articleData[`full-text`] || ``;
      // post.category = articleData.category;
    }

    return post;
  },

  // Удаляет публикацию по id
  delete: async (id) => {
    const articlesList = await article.getAll();
    articles = articlesList.filter((it) => {
      return it.id !== id;
    });
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
    const newComment = {"id": nanoid(4), "text": comment};
    const articlesList = await article.getAll();
    for (let it of articlesList) {
      if (it.id === id) {
        it.comments.push(newComment);
        break;
      }
    }
    return newComment;
  },

  // Удаляет комментарий по id в публикации с id
  deleteComment: async (articleId, commentId) => {
    let isDeleted = false;

    const articlesList = await article.getAll();
    for (let articleItem of articlesList) {
      if (articleItem.id === articleId) {
        articleItem.comments = articleItem.comments.filter((comment) => {
          return comment.id !== commentId;
        });
        isDeleted = true;
        break;
      }
    }
    return isDeleted;
  }
};

module.exports = article;
