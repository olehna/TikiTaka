import React, {Component} from 'react'
import classes from './LoadingPage.module.css'
// import Loader from '../../components/UI/Loader/Loader'
import Loader2 from '../../components/UI/Loader2/Loader'
import Logo from '../../components/UI/Logo/Logo'
import {connect} from 'react-redux'
class LoadingPage extends Component {
  render() {
    return (
      <div className={classes.main}>
          <Logo />
          <h1 className={classes.AppTitle}>тики<br/>така</h1>
          <h3 className={classes.AppSubTitle}>интеллектуальные турниры</h3>
          {
            // this.props.loading ?
              //  <Loader />
               <Loader2 />
              // : <div>Вроде как должен быть спиннер</div>
          }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    loading: state.quiz.loading
  }
}

function mapDispatchToProps(dispatch) {
  return {
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoadingPage)
