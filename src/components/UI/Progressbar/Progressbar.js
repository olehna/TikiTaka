import React, { Component } from "react";

import classes from "./Progressbar.module.css";

export default class Progressbar extends Component {
  render() {
    return (
      <div className={classes.meter}>
        <span className={classes.metrSpan} style={{ width: this.props.width }}>
          <span className={classes.progress}></span>
        </span>
      </div>
    );
  }
}
