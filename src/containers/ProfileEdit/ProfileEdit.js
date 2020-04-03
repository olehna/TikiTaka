import React, { Component } from 'react'
// import { Redirect } from 'react-router'
// import { Link } from 'react-router-dom'
import Button from '../../components/UI/Button/Button'
import classes from './ProfileEdit.module.css'
// import Progressbar from '../../components/UI/progressbar/Progressbar'
import ProfileHeader from '../../components/ProfileHeader/ProfileHeader'
import Input from '../../components/UI/Input/Input'

export default class ProfileEdit extends Component {
    state = {
        username: 'Алешка П.',
        level: 1,
        wins: 89,
        defeats: 88,
    }

    edit() {
        alert('test alert дабы убедиться что кнопка рабоает')
    }

    render() {
        const username = this.state.username
        const level = this.state.level
        
        return (
            <div className={classes.wrapper}>
                <ProfileHeader text='редактировать' />

                <img className={classes.profilePic} src={'/profilepic.png'} alt='no pic' />
                <h1 className={classes.username}>
                    {username}
                </h1>

                <h2 className={classes.level}>
                    {level} уровень
                </h2>

                <div className={classes.editForm}>
                    <form >
                        <label>ИМЯ</label><Input />
                        <label>ФАМИЛИЯ</label><Input />
                        <label>USERNAME</label><Input />
                        <label>ПОЛ</label><Input />
                        <label>ДАТА РОЖДЕНИЯ</label><Input />
                        <Button onClick={() => this.edit()}>редактировать</Button>
                    </form>
                </div>
            </div>

        )
    }
}
