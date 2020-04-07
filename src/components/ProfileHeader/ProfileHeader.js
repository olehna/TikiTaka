import React, { Component } from 'react'
// import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
// import Button from '../../components/UI/Button/Button'
import classes from './ProfileHeader.module.css'

export default class ProfileHeader extends Component {
    render() {
        return (
            <div className={classes.profileHeader}>
                <h1 className={classes.pfofileName}>{this.props.text}</h1>
                <Link className={classes.editButton} to={`/user/edit/${localStorage.userId}`}>
                    <img className={classes.editPicture}
                        src={'/pencil_edit.png'} alt='no pic' />
                </Link>
            </div>
        )
    }
}
