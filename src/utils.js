'use strict';

const chalk = require(`chalk`);
const fs = require(`fs`).promises;

// Генерация рандомных чисел
const getRandomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Перемешивание массива
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * i);
    [array[i], array[randomPosition]] = [array[randomPosition], array[i]];
  }
  return array;
};

// Читает данные из файла
const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf8`);
    return content.split(`\n`);
  } catch (err) {
    console.log(chalk.red(err));
    return [];
  }
};

module.exports = {
  getRandomNumber,
  shuffleArray,
  readContent
};
