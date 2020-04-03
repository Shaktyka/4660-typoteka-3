'use strict';

const {check} = require(`express-validator`);

const CommentRequirements = {
  minLength: {
    VALUE: 20,
    ERROR_TEXT: `Минимальное количество символов`
  }
};

const ArticleRequirements = {
  createdDate: {
    format: {
      VALUE: `YYYY:MM:DD HH:MM:SS`,
      ERROR_TEXT: `Неверный формат даты`
    }
  },
  title: {
    minLength: {
      VALUE: 30,
      ERROR_TEXT: `Минимальное количество символов`
    },
    maxLength: {
      VALUE: 250,
      ERROR_TEXT: `Максимальное количество символов`
    }
  },
  image: {
    allowedExtentions: {
      VALUE: [`jpeg`, `jpg`, `png`],
      ERROR_TEXT: `Неразрешённый тип данных`
    }
  },
  category: {
    minAmount: {
      VALUE: 1,
      ERROR_TEXT: `Должна быть выбрана как минимум 1 категория`
    }
  },
  announce: {
    minLength: {
      VALUE: 30,
      ERROR_TEXT: `Минимальное количество символов`
    },
    maxLength: {
      VALUE: 250,
      ERROR_TEXT: `Максимальное количество символов`
    }
  },
  fullText: {
    maxLength: {
      VALUE: 1000,
      ERROR_TEXT: `Максимальное количество символов`
    }
  }
};

// Валидирует комментарий
const validateComment = () => {
  return [
    check(`comment`)
      .not().isEmpty()
      .trim()
      .escape()
      .isLength({min: CommentRequirements.minLength.VALUE})
      .withMessage(`${CommentRequirements.minLength.ERROR_TEXT} ${CommentRequirements.minLength.VALUE}`)
  ];
};

// Валидация публикации
const validateArticle = () => {
  return [
    check(`picture`)
      .optional()
      .matches(`(?:jpg|jpeg|png)$`)
      .withMessage(`Неверный формат файла`),
    check(`title`)
      .not().isEmpty().withMessage(`Заголовок должен быть заполнен`)
      .trim()
      .escape()
      .isLength({min: 30}).withMessage(`Мин символов 30`)
      .isLength({max: 250}).withMessage(`Макс символов 250`),
    check(`created-date`)
      .not().isEmpty().withMessage(`Дата должна присутствовать`)
      .isISO8601().toDate().withMessage(`Неверный формат даты`),
    check(`announce`)
      .not().isEmpty().withMessage(`Анонс должен быть заполнен`)
      .trim()
      .escape()
      .isLength({min: 30}).withMessage(`Мин символов 30`)
      .isLength({max: 250}).withMessage(`Макс символов 250`),
    check(`full-text`)
      .optional()
      .trim()
      .escape()
      .isLength({max: 1000})
      .withMessage(`Полное описание не более 1000 символов`),
    check(`сategory`)
      .not().isEmpty()
      .isArray({min: 1})
      .withMessage(`Нужно выбрать хотя бы одну категорию`)
  ];
};

module.exports = {
  validateComment,
  validateArticle
};
