import React, { Component, useState, useEffect } from "react";
import classes from "./Drawer.module.css";
import { NavLink } from "react-router-dom";
import Backdrop from "../../UI/Backdrop/Backdrop";
import firebase from "../../../firebase";
const links = [{
  to: "/",
  label: " ВЫБРАТЬ ТЕМУ",
  exact: true,
  icon: "literature",
}, {
  to: "/rating",
  label: "РЕЙТИНГ",
  exact: false,
  icon: "rating",
}, {
  to: `/user/${localStorage.userId}`,
  label: "ЛИЧНЫЙ КАБИНЕТ",
  exact: false,
  icon: "user",
}, {
  to: "/logout",
  label: "ВЫЙТИ",
  exact: false,
  icon: "logout",
}];
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
function Drawer (props) {
  const user = useUsers();
  const clickHandler = () => {
    props.onClose();
  };
 const renderLinks = (links) => {
    return links.map((link, index) => {      
      return (
        <li 
        className={classes.itemListing} 
        key={index}>
          <NavLink
          className={classes.linkListing}
            to={link.to}
            exact={link.exact}
            activeClassName={classes.active}
            onClick={clickHandler}
          >
            {link.icon && (
              <img
                className={classes.icon}
                src={`./img/Menu/${link.icon}.png`}
                alt=""
              />
            )}
            <span className={classes.text}> {link.label}</span>
          </NavLink>
        </li>
      );
    });
  }
    const cls = [classes.Drawer];
    if (!props.isOpen) {
      cls.push(classes.close);
    }
    return (
      <>
        <nav className={cls.join(" ")}>
          {props.isAuthenticated ? (
            <ul className={classes.listing}>
              <div className={classes.boxLogo}>
                <img src={"/img/logo.png"} alt="" className={classes.Ava} />
              </div>
          <div className={classes.userName}>{user.userName}</div>
            </ul>
          ) : null}
          <ul className={classes.listing} >
            {renderLinks(links)}
          </ul>
          <a href="./" className={classes.mail}>
            <img
              className={classes.iconMail}
              src="./img/Menu/mail.png"
              alt=""
            />
            Связаться с нами
          </a>
        </nav>
        {props.isOpen ? <Backdrop onClick={props.onClose} /> : null}
      </>
    );
}
export default Drawer;
