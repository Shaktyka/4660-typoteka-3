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

  addToArray: async (articleObj) => {
    await article.getAll()
      .then((articlesList) => {
        articlesList.push(articleObj);
        articles = articlesList;
      })
      .catch((err) => console.log(err));
  },

  // Возвращает публикацию по id
  get: async (id) => {
    let post = null;
    await article.getAll()
      .then((articlesList) => {
        post = articlesList.find((it) => it.id === id);
      })
      .catch((err) => console.log(err));
    return post;
  },

  // Добавляет новую публикацию
  add: async (articleData) => {
    const articleObject = articleData;
    articleObject.id = nanoid(ID_SYMBOLS_AMOUNT);
    await article.addToArray(articleObject);
    return articleObject.id;
  },

  // Обновляет публикацию по id
  update: async (id, articleData) => {
    const post = await article.get(id);

    if (post) {
      post.title = articleData[`title`];
      post.picture = articleData.picture || ``;
      post.createdDate = articleData[`created-date`];
      post.announce = articleData.announce;
      post.fullText = articleData[`full-text`] || ``;
      post.category = articleData.category;

      await article.getAll()
        .then((articlesList) => {
          for (let it of articlesList) {
            if (it.id === post.id) {
              it = post;
              break;
            }
          }
          articles = articlesList;
        })
        .catch((err) => console.log(err));
    }

    return post;
  },

  // Удаляет публикацию по id
  delete: async (id) => {
    await article.getAll()
      .then((articlesList) => {
        articles = articlesList.filter((it) => {
          return it.id !== id;
        });
      })
      .catch((err) => console.log(err));
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

    await article.getAll()
      .then((articlesList) => {
        for (let it of articlesList) {
          if (it.id === id) {
            it.comments.push(newComment);
            break;
          }
        }
        articles = articlesList;
      })
      .catch((err) => console.log(err));

    return newComment;
  },

  // Удаляет комментарий по id в публикации с id
  deleteComment: async (articleId, commentId) => {
    let isDeleted = false;

    await article.getAll()
      .then((articlesList) => {
        for (let articleItem of articlesList) {
          if (articleItem.id === articleId) {
            const articleComments = articleItem.comments;

            const filteredComments = articleComments.filter((comment) => {
              return comment.id !== commentId;
            });
            articleItem.comments = filteredComments;
            isDeleted = true;
            break;
          }
        }
        articles = articlesList;
      })
      .catch((err) => console.log(err));
    return isDeleted;
  }
};

module.exports = article;
