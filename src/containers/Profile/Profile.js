import React, { useState, useEffect } from "react";
import firebase from "../../firebase";
import classes from "./Profile.module.css";
import Progressbar from "../../components/UI/Progressbar/Progressbar";
import ProfileHeader from "../../components/ProfileHeader/ProfileHeader";

function useUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const userRef = firebase
      .firestore()
      .collection("users")
      .doc(localStorage.userId);
    userRef.get().then(function (documentSnapshot) {
      if (documentSnapshot.exists) {
        const data = documentSnapshot.data();
        setUsers(data);
      } else {
        console.log("document not found");
      }
    });
  }, []);
  return users;
}

const Profile = () => {
  const user = useUsers();

  const wrongAnswers = user.games * 10 - user.rightAnswers;
  const width = (user.rightAnswers / user.games) * 10;

  return (
    <div className={classes.wrapper}>
      <div className={classes.profile}>
        <ProfileHeader text={user.userName} />
        <div className={classes.userInfo}>
          <div className={classes.blockList}>
            <div className={classes.userName}>
              {" "}
              <h2>Имя:</h2>{" "}
            </div>
            <div className={classes.dataName}> {user.firstName} </div>
          </div>
          <div className={classes.blockList}>
            <div className={classes.userName}>
              {" "}
              <h2>Фамилия:</h2>{" "}
            </div>
            <div className={classes.dataName}> {user.lastName} </div>
          </div>
        </div>
        <div className={classes.results}>
          <div className={classes.titleBlock}>
          <h3 className={classes.level}>{user.games} игр сыграно</h3>
          </div>
          <Progressbar width={`${width}%`} />
          <div className={classes.resultNumbers}>
            <div className={classes.textBlock}>
              <p>ПРАВИЛЬНЫХ ОТВЕТОВ: </p>
              <div className={classes.roundSuccess} ><span  className={classes.text} >{user.rightAnswers || 0}</span></div>
            </div>
            <div className={classes.textBlock} >
              <p> НЕПРАВИЛЬНЫХ ОТВЕТОВ: </p>
              <div className={classes.roundError}><span  className={classes.text} >{wrongAnswers || 0}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
