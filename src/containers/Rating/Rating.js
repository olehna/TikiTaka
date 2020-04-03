import React, { Component } from "react";
import classes from "./Rating.module.css";
const base = [
  {
    place: 1,
    name: "Петрович",
    rating: 123,
    photo: "https://clck.ru/MoRdX"
  },
  {
    place: 2,
    name: "Анна",
    rating: 322,
    photo: "https://clck.ru/MoSR8"
  },
  {
    place: 3,
    name: "Серега",
    rating: 2,
    photo: "https://clck.ru/MoSqC"
  },
  {
    place: 4,
    name: "Гера",
    rating: 12,
    photo: "https://clck.ru/MoSov"
  },
  {
    place: 5,
    name: "Толясик",
    rating: 22,
    photo: "https://clck.ru/MoSYy"
  },
  {
    place: 6,
    name: "Наталья",
    rating: 1233,
    photo: "https://clck.ru/MoSrj"
  },
  {
    place: 7,
    name: "Серега",
    rating: 122,
    photo: "https://clck.ru/MoSqC"
  },
  {
    place: 8,
    name: "Игнат",
    rating: 544,
    photo: "https://clck.ru/MoSmi"
  },
  {
    place: 9,
    name: "Алена",
    rating: 122,
    photo: "https://i.pinimg.com/originals/d2/b3/d8/d2b3d8b5a388d92848950012442fbfe8.jpg"
  },
  {
    place: 10,
    name: "Антуан",
    rating: 322,
    photo: "https://clck.ru/MoSfW"
  }
];
class Rating extends Component {
  render() {
    return (
      <main className={classes.main}>
        <div className={classes.wrapper}>
          <h1 className={classes.title}>RATING</h1>
          <table>
            <thead>
              <tr>
                <td>Место</td>
                <td>Имя</td>
                <td>Баллы</td>
              </tr>
            </thead>
            <tbody>
              {base.length > 0 &&
                base.map((elem, index) => {
                  return (
                    <tr key={index}>
                      <td>{elem.place}</td>
                      <td className={classes.blockIcon}>
                        <div className={classes.iconLogoBox}>
                          <img
                            className={classes.iconLogoImg}
                            src={elem.photo}
                            alt=""
                          />
                        </div>
                        {elem.name}
                      </td>
                      <td>{elem.rating}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </main>
    );
  }
}

export default Rating;
