'use strict';

const CommentRequirement = {
  minLength: {
    VALUE: 20,
    ERROR_TEXT: `Минимальное количество символов`
  }
};

const ArticleRequirement = {
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

module.export = {
  CommentRequirement,
  ArticleRequirement
};
