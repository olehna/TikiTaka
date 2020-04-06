export const changeIconName = (name) => {
  switch (name) {
    case "Life Style":
      return "ls";

    case "Военное дело и политика":
      return "war";

    case "География":
      return "geo";
    case "Деньги и бизнес":
      return "money";

    case "Еда и напитки":
      return "eat";

    case "Игры":
      return "game";

    case "Известные выражения и цитаты":
      return "book";

    case "Искусство и архитектура":
      return "art";

    case "История":
      return "story";

    case "Кино":
      return "cinima";

    case "Кино и ТВ":
      return "tv";

    case "Литература":
      return "lit";

    case "Музыка":
      return "music";

    case "Наука и образование":
      return "science";

    case "Общие и прочие":
      return "all";

    case "Обычаи, традиции, мифология":
      return "tradi";

    case "Природа":
      return "animal";
    case "Спорт":
      return "sport";
    case "Транспорт":
      return "transport";
    case "Техника и технологии":
      return "technology";
    case "Языки мира":
      return "lang";
    default:
      return "";
  }
};
