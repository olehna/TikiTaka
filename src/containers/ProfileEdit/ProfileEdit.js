import React, { Component } from "react";
import Button from "../../components/UI/Button/Button";
import classes from "./ProfileEdit.module.css";
import ProfileHeader from "../../components/ProfileHeader/ProfileHeader";
import Input from "../../components/UI/Input/Input";

export default class ProfileEdit extends Component {
  state = {
    username: "Алешка П.",
    level: 1,
    wins: 89,
    defeats: 88,
  };

  edit() {
    alert("test alert дабы убедиться что кнопка рабоает");
  }

  render() {
    const username = this.state.username;
    const level = this.state.level;

    return (
      <div className={classes.wrapper}>
        <ProfileHeader text="редактировать" />

        <img
          className={classes.profilePic}
          src={"/profilepic.png"}
          alt="no pic"
        />
        <h1 className={classes.username}>{username}</h1>

        <h2 className={classes.level}>{level} уровень</h2>

        <div className={classes.editForm}>
          <form>
            <label className={classes.label}>ИМЯ</label>
            <Input />
            <label className={classes.label}>ФАМИЛИЯ</label>
            <Input />
            <label className={classes.label}>USERNAME</label>
            <Input />
            <label className={classes.label}>ПОЛ</label>
            <Input />
            <label className={classes.label}>ДАТА РОЖДЕНИЯ</label>
            <Input />
            <Button onClick={() => this.edit()}>редактировать</Button>
          </form>
        </div>
      </div>
    );
  }
}
