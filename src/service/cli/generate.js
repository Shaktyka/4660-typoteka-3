'use strict';

const moment = require(`moment`);
const chalk = require(`chalk`);
const {getRandomNumber, shuffleArray} = require(`../../utils`);

const DEFAULT_AMOUNT = 1;
const FILE_NAME = `mocks.json`;

const TITLES = [
  `Ёлки. История деревьев`,
  `Как перестать беспокоиться и начать жить`,
  `Как достигнуть успеха не вставая с кресла`,
  `Обзор новейшего смартфона`,
  `Лучшие рок-музыканты 20-века`,
  `Как начать программировать`,
  `Учим HTML и CSS`,
  `Что такое золотое сечение`,
  `Как собрать камни бесконечности`,
  `Борьба с прокрастинацией`,
  `Рок — это протест`,
  `Самый лучший музыкальный альбом этого года`
];

const SENTENCES = [
  `Ёлки — это не просто красивое дерево. Это прочная древесина.`,
  `Первая большая ёлка была установлена только в 1938 году.`,
  `Вы можете достичь всего. Стоит только немного постараться и запастись книгами.`,
  `Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.`,
  `Золотое сечение — соотношение двух величин, гармоническая пропорция.`,
  `Собрать камни бесконечности легко, если вы прирожденный герой.`,
  `Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.`,
  `Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами.`,
  `Программировать не настолько сложно, как об этом говорят.`,
  `Простые ежедневные упражнения помогут достичь успеха.`,
  `Это один из лучших рок-музыкантов.`,
  `Он написал больше 30 хитов.`,
  `Из под его пера вышло 8 платиновых альбомов.`,
  `Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.`,
  `Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?`,
  `Достичь успеха помогут ежедневные повторения.`,
  `Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.`,
  `Как начать действовать? Для начала просто соберитесь.`,
  `Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравится только игры.`,
  `Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.`
];

const CATEGORIES = [
  `Деревья`,
  `За жизнь`,
  `Без рамки`,
  `Разное`,
  `IT`,
  `Музыка`,
  `Кино`,
  `Программирование`,
  `Железо`
];

const ResultWriteMessage = {
  SUCCESS: `Operation success. File created.`,
  ERROR: `Can't write data to file...`
};

// Массив данных публикаций
let articles = [];

// Генерирует даты в пределах трёх месяцев, включая текущий
const generateRandomDate = () => {
  const dateNow = moment().valueOf();
  const threeMonthAgo = moment().subtract(3, `months`).valueOf();
  return moment(getRandomNumber(threeMonthAgo, dateNow)).format(`YYYY:MM:DD HH:mm:ss`);
};

// Генерирует объект данных для 1 публикации
const generateArticle = () => {
  return {
    title: TITLES[getRandomNumber(0, TITLES.length - 1)],
    createdDate: generateRandomDate(),
    announce: shuffleArray(SENTENCES).slice(0, getRandomNumber(1, 4)).join(` `),
    fullText: shuffleArray(SENTENCES).slice(0, getRandomNumber(1, SENTENCES.length - 1)).join(` `),
    сategory: [shuffleArray(CATEGORIES).slice(0, getRandomNumber(1, SENTENCES.length - 1))]
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
  run(args) {
    const fs = require(`fs`);

    const [articlesAmount] = args;
    const amountArticles = Number.parseInt(articlesAmount, 10) || DEFAULT_AMOUNT;
    const articlesInJson = JSON.stringify(generateArticles(amountArticles));

    fs.writeFile(FILE_NAME, articlesInJson, (err) => {
      if (err) {
        return console.error(chalk.red(ResultWriteMessage.ERROR));
      }
      return console.info(chalk.green(ResultWriteMessage.SUCCESS));
    });
  }
};
