import React, { Component } from 'react'
// import { Redirect } from 'react-router'
// import { Link } from 'react-router-dom'
// import Button from '../../components/UI/Button/Button'
import classes from './Profile.module.css'
// import Progressbar from '../../components/UI/ProgressBar/Progressbar'
import ProfileHeader from '../../components/ProfileHeader/ProfileHeader'

export default class Profile extends Component {
    state = {
        username: 'Алешка П.',
        level: 1,
        wins: 89,
        defeats: 88,
    }
   
    render() {
        const username = this.state.username
        const level = this.state.level
        // const width = 100 * this.state.wins / (this.state.wins + this.state.defeats)
        return (
            <div className={classes.wrapper}>
                <ProfileHeader text='профиль'/>

                <img className={classes.profilePic} src={'/profilepic.png'} alt='no pic' />
                <h1 className={classes.username}>
                    {username}
                </h1>

                <h2 className={classes.level}>
                    {level} уровень
                </h2>

                <div className={classes.results}>
                    {/* <Progressbar width={`${width}%`} /> */}
                    <div className={classes.resultNumbers}>
                        <p>ПОБЕДЫ<br /><span>{this.state.wins}</span></p>
                        <p>ПОРАЖЕНИЯ<br /><span>{this.state.defeats}</span></p>
                    </div>


                </div>
            </div>
        )
    }
}
