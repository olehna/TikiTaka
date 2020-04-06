import React, { useState, useEffect  } from "react";
import classes from "./Rating.module.css";
import firebase from '../../firebase'

function useUsers() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("users")
      .orderBy("rightAnswers", "desc")
      .onSnapshot((snapshot) => {
        // debugger
        const newTest = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))
        setUsers(newTest)
      })
    return () => unsubscribe()
  }, [])
  return users
}

const Rating = () => {
  const base = useUsers()

  return (
    <main className={classes.main}>
      <div className={classes.wrapper}>
        <h1 className={classes.title}>ТАБЛИЦА РЕЗУЛЬТАТОВ</h1>
        <table>
          <thead>
            <tr>
              <td>РЕЙТИНГ</td>
              <td>Имя</td>
              <td>ИГРЫ</td>
            </tr>
          </thead>
          <tbody>
            {base.length > 0 &&
              base.map((elem, index) => {
                return (
                  <tr key={index}>
                    <td>{elem.rightAnswers}</td>
                    <td className={classes.blockIcon}>
                      <div className={classes.iconLogoBox}>
                        <img
                          className={classes.iconLogoImg}
                          src={elem.photo}
                          alt=""
                        />
                      </div>
                      {elem.userName ? elem.userName : (elem.firstName || elem.email)}
                    </td>
                    <td>{elem.games}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </main>
  );

}

export default Rating;
