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

module.exports = {
  CommentRequirements,
  ArticleRequirements,
  validateComment
};
