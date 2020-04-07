import React, { Component } from "react";
import classes from "./Drawer.module.css";
import { NavLink } from "react-router-dom";
import Backdrop from "../../UI/Backdrop/Backdrop";

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

class Drawer extends Component {


  clickHandler = () => {
    this.props.onClose();
  };

  renderLinks(links) {
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
            onClick={this.clickHandler}
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

  render() {
    const cls = [classes.Drawer];

    if (!this.props.isOpen) {
      cls.push(classes.close);
    }

    

    return (
      <>
        <nav className={cls.join(" ")}>
          {this.props.isAuthenticated ? (
            <ul className={classes.listing}>
              <div onClick={this.onProfilePic} className={classes.boxLogo}>
                <img src={"/ava.png"} alt="" className={classes.Ava} />
              </div>
              <div className={classes.userName}>Алёша Панин</div>
            </ul>
          ) : null}

          <ul className={classes.listing} >
            {this.renderLinks(links)}
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
        {this.props.isOpen ? <Backdrop onClick={this.props.onClose} /> : null}
      </>
    );
  }
}

export default Drawer;
