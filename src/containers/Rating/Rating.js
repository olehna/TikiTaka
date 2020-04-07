import React, { useState, useEffect  } from "react";
import firebase from '../../firebase'
import Loader from '../../components/UI/Loader2/Loader'
import classes from "./Rating.module.css";

function useUsers() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("users")
      .orderBy("rightAnswers", "desc")
      .onSnapshot((snapshot) => {
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
        <table className={classes.tableRating}>
          <thead>
            <tr className={classes.rowThead}>
              <td className={classes.tdHead}>РЕЙТИНГ</td>
              <td className={classes.tdHead}>ИМЯ</td>
              <td className={classes.tdHead}>ИГРЫ</td>
            </tr>
          </thead>
          <tbody>
            {base.length > 0 &&
              base.map((elem, index) => {
                return (
                  <tr key={index}>
                    <td className={classes.tdBody}><div className={classes.round}>{elem.rightAnswers}</div></td>
                    <td className={classes.tdBody}>
                      <div className={classes.iconLogoBox}>
                        {/* <img
                          className={classes.iconLogoImg}
                          src={elem.photo}
                          alt=""
                        /> */}
                      </div>
                      {elem.userName ? elem.userName : (elem.firstName || elem.email)}
                    </td>
                    <td className={classes.tdBody} >{elem.games}</td>
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
