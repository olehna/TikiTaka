import React, { Component, useState } from 'react'
import firebase from '../../firebase'
// import { Redirect } from 'react-router'
// import { Link } from 'react-router-dom'
import Button from '../../components/UI/Button/Button'
import classes from './ProfileEdit.module.css'
// import Progressbar from '../../components/UI/progressbar/Progressbar'
import ProfileHeader from '../../components/ProfileHeader/ProfileHeader'
import Input from '../../components/UI/Input/Input'
import TestLine from '../../components/testfirebase'
import {connect} from 'react-redux'
import {auth} from '../../store/actions/auth'

const ProfileEdit = () => {


    const [firstName, setName] = useState('');
    const [lastName, setLastName] = useState('');

    // state = {
    //     username: 'Алешка П.',
    //     level: 1,
    //     wins: 89,
    //     defeats: 88,
    // }

    // function edit() {
    //     alert('test alert дабы убедиться что кнопка рабоает')
    // }

    function onSubmit(e) {
        e.preventDefault()

        firebase
            .firestore()
            .collection('vikaTests')
            .add({
                firstName,
                // lastName
            })
            .then(() => {
                setName('')
                // setLastName('')
            })
    }

    

        return (
                   
            <div className={classes.wrapper}>
            <TestLine />
            <ProfileHeader text='редактировать' />

            {/* <img className={classes.profilePic} src={'/profilepic.png'} alt='no pic' />
            //     <h1 className={classes.username}>
            //         {username}
            //     </h1>

            //     <h2 className={classes.level}>
            //         {level} уровень
            //     </h2> */}

                <div className={classes.editForm}>
            <form onSubmit={onSubmit}>
            <label>ИМЯ</label><Input value={firstName} onChange={e => setName(e.currentTarget.value)} />
            <label>ФАМИЛИЯ</label><Input value={lastName} onChange={e => setLastName(e.currentTarget.value)} />
            <label>USERNAME</label><Input />
            <label>ПОЛ</label><Input />
            <label>ДАТА РОЖДЕНИЯ</label><Input />
            {/* <Button onClick={() => this.edit()}>редактировать</Button> */}
        <button>ОБНОВИТЬ</button>
        </form>
                </div>
            </div> 

        )
    
}

function mapDispatchToProps(dispatch) {
    return {
      auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin))
    }
  }

// export default ProfileEdit
export default connect(null, mapDispatchToProps)(ProfileEdit)