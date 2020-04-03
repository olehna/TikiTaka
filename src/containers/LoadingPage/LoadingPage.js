import React, {Component} from 'react'
import classes from './LoadingPage.module.css'
import Loader from '../../components/UI/Loader/Loader'
// import Logo from '../../components/UI/Logo/Logo'
import Logo from '../../components/UI/Logo/Logo'
import {connect} from 'react-redux'

export default class LoadingPage extends Component {
  state = {
    loading: true
  }
  render() {
    return (
      <div>
        <div>
          {/* <Logo /> */}
          <h1 className={classes.AppTitle}>тики<br/>така</h1>
          <h3 className={classes.AppSubTitle}>интеллектуальные турниры</h3>
          {
            this.state.loading 
              ? <Loader />
              : <div>Text</div>
          }
        </div>
      </div>
    )
  }
}

// function mapStateToProps(state) {
//   return {
//     loading: state.quiz.loading
//   }
// }

// function mapDispatchToProps(dispatch) {
//   return {
    
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(LoadingPage)
