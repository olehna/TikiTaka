import React, {Component} from 'react'
import Layout from './hoc/Layout/Layout'
import {Route, Switch, Redirect, withRouter} from 'react-router-dom'
import Quiz from './containers/Quiz/Quiz'
import QuizList from './containers/QuizList/QuizList'
import LoadingPage from './containers/LoadingPage/LoadingPage'
import Auth from './containers/Auth/Auth'
import QuizCreator from './containers/QuizCreator/QuizCreator'
import {connect} from 'react-redux'
import Logout from './components/Logout/Logout'
import {autoLogin} from './store/actions/auth';
import ProfileEdit from './containers/ProfileEdit/ProfileEdit'
import Profile from './containers/Profile/Profile'
import Rating from './containers/Rating/Rating'


class App extends Component {

  componentDidMount() {
    this.props.autoLogin()
  }

  render() {

    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        {/* <Route path="/quiz/:id" component={Quiz} /> */}
        <Route path="/" exact component={LoadingPage} />
        {/* <Route path="/" exact component={QuizList} /> */}
        {/* <Route path="/loading" exact component={LoadingPage} /> */}
        <Redirect to="/" />
      </Switch>
    )

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/quiz-creator" component={QuizCreator} />
          <Route path="/quiz/:id" component={Quiz} />
          <Route path="/logout" component={Logout} />
          <Route path="/user/edit" component={ProfileEdit} />
          <Route path="/user" component={Profile} />
          <Route path="/" exact component={QuizList} />
          <Route path="/rating" exact component={Rating} />
          <Redirect to="/" />
        </Switch>
      )
    }

    return (
      <Layout>
        { routes }
      </Layout>
    )
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token
  }
}

function mapDispatchToProps(dispatch) {
  return {
    autoLogin: () => dispatch(autoLogin())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
