'use strict';

const moment = require(`moment`);
const chalk = require(`chalk`);
const fs = require(`fs`).promises;
const {getRandomNumber, shuffleArray, readContent} = require(`../../utils`);
const nanoid = require(`nanoid`);

const DEFAULT_AMOUNT = 1;
const FILE_NAME = `mocks.json`;
const ID_SYMBOLS_AMOUNT = 4;

const FilePath = {
  TITLES: `./data/titles.txt`,
  CATEGORIES: `./data/categories.txt`,
  SENTENCES: `./data/sentences.txt`,
  COMMENTS: `./data/comments.txt`
};

const ResultWriteMessage = {
  SUCCESS: `Operation success. File created.`,
  ERROR: `Can't write data to file...`
};

const CommentsRestrict = {
  MIN: 1,
  MAX: 10,
};

const CommentsStringsRestrict = {
  MIN: 1,
  MAX: 4,
};

let articles = [];
let titlesData = null;
let sentencesData = null;
let categoriesData = null;
let commentsData = null;

// Генерирует даты в пределах трёх месяцев, включая текущий
const generateRandomDate = () => {
  const dateNow = moment().valueOf();
  const threeMonthAgo = moment().subtract(3, `months`).valueOf();
  return moment(getRandomNumber(threeMonthAgo, dateNow)).format(`YYYY:MM:DD HH:mm:ss`);
};

// Генерация одного комментария
const getComment = (commentTexts) => {
  return {
    id: nanoid(ID_SYMBOLS_AMOUNT),
    text: commentTexts.join(` `)
  };
};

// Генерация массива комментариев
const getComments = (amount) => {
  const comments = [];

  for (let i = 0; i < amount; i++) {
    const commentStrings = shuffleArray(commentsData)
      .slice(0, getRandomNumber(CommentsStringsRestrict.MIN, CommentsStringsRestrict.MAX));
    const commentObj = getComment(commentStrings);
    comments.push(commentObj);
  }
  return comments;
};

// Генерирует объект данных для 1 публикации
const generateArticle = () => {
  return {
    id: nanoid(ID_SYMBOLS_AMOUNT + 2),
    title: titlesData[getRandomNumber(0, titlesData.length - 1)],
    createdDate: generateRandomDate(),
    announce: shuffleArray(sentencesData).slice(0, getRandomNumber(1, 4)).join(` `),
    fullText: shuffleArray(sentencesData).slice(0, getRandomNumber(1, sentencesData.length - 1)).join(` `),
    category: shuffleArray(categoriesData).slice(0, getRandomNumber(1, categoriesData.length - 1)),
    comments: getComments(getRandomNumber(CommentsRestrict.MIN, CommentsRestrict.MAX))
  };
};

// Генерирует массив публикаций по переданному числу
const generateArticles = (amount) => {
  for (let i = 0; i < amount; i++) {
    articles.push(generateArticle());
  }
  return articles;
};

module.exports = {
  name: `--generate`,
  async run(args) {
    titlesData = await readContent(FilePath.TITLES);
    categoriesData = await readContent(FilePath.CATEGORIES);
    sentencesData = await readContent(FilePath.SENTENCES);
    commentsData = await readContent(FilePath.COMMENTS);

    titlesData = titlesData.filter((title) => title.length > 0);
    categoriesData = categoriesData.filter((category) => category.length > 0);
    sentencesData = sentencesData.filter((sentence) => sentence.length > 0);
    commentsData = commentsData.filter((comment) => comment.length > 0);

    const amountArticles = Number.parseInt(args, 10) || DEFAULT_AMOUNT;
    const articlesInJson = JSON.stringify(generateArticles(amountArticles));

    try {
      await fs.writeFile(FILE_NAME, articlesInJson);
      console.info(chalk.green(ResultWriteMessage.SUCCESS));
    } catch (err) {
      console.error(chalk.red(ResultWriteMessage.ERROR));
    }
  }
};
