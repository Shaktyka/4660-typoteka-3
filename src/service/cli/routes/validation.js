'use strict';

const {check} = require(`express-validator`);
const moment = require(`moment`);
const createError = require(`http-errors`);
const {
  HttpCode
} = require(`../../../constants`);

const REQUIRED_MESSAGE = `Поле должно быть заполнено`;

const CommentRequirements = {
  minLength: {
    VALUE: 20,
    ERROR_TEXT: `Минимальное количество символов`
  }
};

const ArticleRequirements = {
  createdDate: {
    format: {
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
    allowedFormats: {
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
      .withMessage(ArticleRequirements.image.allowedFormats.ERROR_TEXT),
    check(`title`)
      .not().isEmpty().withMessage(REQUIRED_MESSAGE)
      .trim()
      .escape()
      .isLength({min: 30}).withMessage(`${ArticleRequirements.title.minLength.ERROR_TEXT} ${ArticleRequirements.title.minLength.VALUE}`)
      .isLength({max: 250}).withMessage(`${ArticleRequirements.title.maxLength.ERROR_TEXT} ${ArticleRequirements.title.maxLength.VALUE}`),
    check(`created-date`)
      .not().isEmpty().withMessage(REQUIRED_MESSAGE)
      .custom((value, {req}) => {
        const formattedValue = moment(value, `DD.MM.YYYY`).format();
        if (!moment(value, `DD.MM.YYYY`).isValid()) {
          throw createError(
              HttpCode.UNPROCESSABLE_ENTITY,
              {message: ArticleRequirements.createdDate.format.ERROR_TEXT}
          );
        }
        req.body[`created-date`] = formattedValue;
        return true;
      }),
    check(`announce`)
      .not().isEmpty().withMessage(REQUIRED_MESSAGE)
      .trim()
      .escape()
      .isLength({min: 30}).withMessage(`${ArticleRequirements.announce.minLength.ERROR_TEXT} ${ArticleRequirements.announce.minLength.VALUE}`)
      .isLength({max: 250}).withMessage(`${ArticleRequirements.announce.maxLength.ERROR_TEXT} ${ArticleRequirements.announce.maxLength.VALUE}`),
    check(`category`)
       .isArray({min: 1})
       .withMessage(ArticleRequirements.category.minAmount.ERROR_TEXT),
    check(`full-text`)
      .optional()
      .trim()
      .escape()
      .isLength({max: 1000})
      .withMessage(`${ArticleRequirements.fullText.maxLength.ERROR_TEXT} ${ArticleRequirements.fullText.maxLength.VALUE}`)
  ];
};

module.exports = {
  validateComment,
  validateArticle
};
