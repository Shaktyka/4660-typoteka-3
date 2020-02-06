'use strict';

const moment = require(`moment`);
const chalk = require(`chalk`);
const fs = require(`fs`).promises;
const {getRandomNumber, shuffleArray, readContent} = require(`../../utils`);

const DEFAULT_AMOUNT = 1;
const FILE_NAME = `mocks.json`;

const FilePath = {
  TITLES: `./data/titles.txt`,
  CATEGORIES: `./data/categories.txt`,
  SENTENCES: `./data/sentences.txt`
};

const ResultWriteMessage = {
  SUCCESS: `Operation success. File created.`,
  ERROR: `Can't write data to file...`
};

let articles = [];
let titlesData = null;
let sentencesData = null;
let categoriesData = null;

// Генерирует даты в пределах трёх месяцев, включая текущий
const generateRandomDate = () => {
  const dateNow = moment().valueOf();
  const threeMonthAgo = moment().subtract(3, `months`).valueOf();
  return moment(getRandomNumber(threeMonthAgo, dateNow)).format(`YYYY:MM:DD HH:mm:ss`);
};

// Генерирует объект данных для 1 публикации
const generateArticle = (titles, categories, sentences) => {
  return {
    title: titles[getRandomNumber(0, titles.length - 1)],
    createdDate: generateRandomDate(),
    announce: shuffleArray(sentences).slice(0, getRandomNumber(1, 4)).join(` `),
    fullText: shuffleArray(sentences).slice(0, getRandomNumber(1, sentences.length - 1)).join(` `),
    сategory: [shuffleArray(categories).slice(0, getRandomNumber(1, categories.length - 1))]
  };
};

// Генерирует массив публикаций по переданному числу
const generateArticles = (amount, titlesArray, categoriesArray, sentencesArray) => {
  for (let i = 0; i < amount; i++) {
    articles.push(generateArticle(titlesArray, categoriesArray, sentencesArray));
  }
  return articles;
};

module.exports = {
  name: `--generate`,
  async run(args) {
    titlesData = await readContent(FilePath.TITLES);
    categoriesData = await readContent(FilePath.CATEGORIES);
    sentencesData = await readContent(FilePath.SENTENCES);

    const amountArticles = Number.parseInt(args, 10) || DEFAULT_AMOUNT;
    const articlesInJson = JSON.stringify(generateArticles(amountArticles, titlesData, categoriesData, sentencesData));

    try {
      await fs.writeFile(FILE_NAME, articlesInJson);
      console.info(chalk.green(ResultWriteMessage.SUCCESS));
    } catch (err) {
      console.error(chalk.red(ResultWriteMessage.ERROR));
    }
  }
};
