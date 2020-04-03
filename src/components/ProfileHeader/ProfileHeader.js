import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import Button from '../../components/UI/Button/Button'
import classes from './ProfileHeader.module.css'

export default class ProfileHeader extends Component {
    render() {
        return (
            <div className={classes.profileHeader}>
                <div></div>
                <div className={classes.pfofileName}>{this.props.text}</div>
                <Link to="/user/edit">
                    <img className={classes.editButton}
                        src={'/pencil_edit.png'} alt='no pic' />
                </Link>
            </div>
        )
    }
}