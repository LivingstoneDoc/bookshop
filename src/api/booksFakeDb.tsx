import atlant from "../assets/img/atlant.png";
import god from "../assets/img/god.png";
import tenNiggers from "../assets/img/ten_niggers.png";
import clearCode from "../assets/img/clear_code.png";

export const booksData = [
  {
    id: "1",
    title: "Атлант расправил плечи (Комплект из трех книг",
    author: "Айн Рэнд",
    imgUrl: atlant,
    coverType: [1],
    coverFormat: ["А4", "A5"],
    category: 4,
    price: 700,
  },
  {
    id: "2",
    title: "Бог всегда путешествует инкогнито",
    author: "Лоран Гунель",
    imgUrl: god,
    coverType: [0, 1],
    coverFormat: ["А4", "A5", "A6"],
    category: 4,
    price: 400,
  },
  {
    id: "3",
    title: "Десять негритят",
    author: "Агата Кристи",
    imgUrl: tenNiggers,
    coverType: [0, 1],
    coverFormat: ["А4", "A5"],
    category: 2,
    price: 350,
  },
  {
    id: "4",
    title: "Чистый код",
    author: "Роберт Мартин",
    imgUrl: clearCode,
    coverType: [0],
    coverFormat: ["А4", "A5"],
    category: 5,
    price: 500,
  },
];
