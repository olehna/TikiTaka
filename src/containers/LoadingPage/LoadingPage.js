import React, { Component } from "react";
import classes from "./LoadingPage.module.css";
import Loader2 from "../../components/UI/Loader2/Loader";
import Logo from "../../components/UI/Logo/Logo";
export default class LoadingPage extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.history.push("/auth");
    },3000);
  }

  render() {
    return (
      <div className={classes.main}>
        <div className={classes.marginTop}>
        <Logo />
        </div>
        <h1 className={classes.AppTitle}>
          тики
          <br />
          така
        </h1>
        <h3 className={classes.AppSubTitle}>интеллектуальные турниры</h3>
        {<Loader2 />}
      </div>
    );
  }
}
