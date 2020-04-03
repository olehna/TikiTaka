// import React, { Component } from 'react'
// import Progress from 'react-progressbar';
// import classes from './Progressbar.module.css'

// export default class Progressbar extends React.Component {
//   render () {
//     return (
//         <div className={classes.meter}>
//         <span style={{width: this.props.width}}><span className={classes.progress}></span></span>
//     </div>
//     )
//   }
// }


import React, { Component } from 'react'
// import Progress from 'react-progressbar';
import classes from './Progressbar.module.css'

export default class Progressbar extends Component {
  render () {
    return (
        <div className={classes.meter}>
        <span style={{width: this.props.width}}><span className={classes.progress}></span></span>
    </div>
    )
  }
} 
