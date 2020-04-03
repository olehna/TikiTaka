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
            {link.icon && <img className={classes.icon} src={`./img/Menu/${link.icon}.png`} alt="" />}
           <span className={classes.text}> {link.label}</span>
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
      {to: '/', label: 'СПИСОК', exact: true, icon: 'bonus'}
    ]

    if (this.props.isAuthenticated) {
      // links.push({to: '/loading', label: 'LOADING PAGE', exact: false, icon: 'cup'})
      links.push({to: '/quiz-creator', label: 'СОЗДАТЬ ТЕСТ', exact: false, icon: 'rating'})
      links.push({to: '/logout', label: 'ВЫЙТИ', exact: false, icon: 'settings'})
      links.push({ to: '/user', label: 'Личный кабинет', exact: false })
    } else {
      links.push({to: '/auth', label: 'АВТОРИЗАЦИЯ', exact: false, icon: 'edit'})
      // links.push({to: '/loading', label: 'LOADING PAGE', exact: false, icon: 'cup'})
      // links.push({ to: '/quiz-creator', label: 'Создать тест', exact: false })
      links.push({ to: '/logout', label: 'Выйти', exact: false })
      // links.push({ to: '/user', label: 'Личный кабинет', exact: false })
      // links.push({ to: '/loading', label: 'Loading page', exact: false })
    // } else {
    //   links.push({ to: '/auth', label: 'Авторизация', exact: false })
    //   links.push({ to: '/loading', label: 'Loading page', exact: false })
    }

    return (
      <React.Fragment>
        <nav className={cls.join(' ')}>

          <ul>
          <div onClick={this.onProfilePic} className={classes.boxLogo}><img src={'/ava.png'} alt="" className={classes.Ava} /></div>
          <div className={classes.userName}>Алёша Панин</div>
            { this.renderLinks(links) }
          </ul>
          <a href='./' className={classes.mail}>
            <img className={classes.iconMail} src='./img/Menu/mail.png' alt=""/>
            Связаться с нами</a>
        </nav>
        {this.props.isOpen ? <Backdrop onClick={this.props.onClose} /> : null}
      </React.Fragment>
    )
  }
}

export default Drawer
