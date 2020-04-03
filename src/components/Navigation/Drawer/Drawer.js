import React, { Component } from 'react'
import classes from './Drawer.module.css'
import { NavLink, Redirect } from 'react-router-dom'
import Backdrop from '../../UI/Backdrop/Backdrop'
class Drawer extends Component {

  clickHandler = () => {
    this.props.onClose()
  }
 

  renderLinks(links) {
    return links.map((link, index) => {
      return (
        <li key={index}>
          <NavLink
            to={link.to}
            exact={link.exact}
            activeClassName={classes.active}
            onClick={this.clickHandler}
          >
            {link.label}
          </NavLink>
        </li>
      )
    })
  }

  render() {
    const cls = [classes.Drawer]

    if (!this.props.isOpen) {
      cls.push(classes.close)
    }

    const links = [
      { to: '/', label: 'Список', exact: true }
    ]

    if (this.props.isAuthenticated) {
      links.push({ to: '/quiz-creator', label: 'Создать тест', exact: false })
      links.push({ to: '/logout', label: 'Выйти', exact: false })
      links.push({ to: '/user', label: 'Личный кабинет', exact: false })
      links.push({ to: '/loading', label: 'Loading page', exact: false })
    } else {
      links.push({ to: '/auth', label: 'Авторизация', exact: false })
      links.push({ to: '/loading', label: 'Loading page', exact: false })
    }

    return (
      <React.Fragment>
        <nav className={cls.join(' ')}>

          <ul>
            <div onClick={this.onProfilePic}><img src={'/ava.png'} alt="" className={classes.Ava} /></div>
            <div>Алёша</div>
            {this.renderLinks(links)}
          </ul>
          <div>Связаться с нами</div>
        </nav>
        {this.props.isOpen ? <Backdrop onClick={this.props.onClose} /> : null}
      </React.Fragment>
    )
  }
}

export default Drawer
