import React, { useState, useEffect } from 'react'
import firebase from '../../firebase'
import classes from './Profile.module.css'
import Progressbar from '../../components/UI/Progressbar/Progressbar'
import ProfileHeader from '../../components/ProfileHeader/ProfileHeader'

function useUsers() {
    const [users, setUsers] = useState([])

    useEffect(() => {
        const userRef = firebase.firestore().collection('users').doc(localStorage.userId)
        userRef.get().then(function (documentSnapshot) {
            if (documentSnapshot.exists) {
                const data = documentSnapshot.data()
                setUsers(data)
            } else {
                console.log('document not found');
            }
        })
    }, []);
    return users
}

const Profile = () => {
    const user = useUsers()

    const wrongAnswers = user.games * 10 - user.rightAnswers
    const width =  user.rightAnswers / user.games * 10

    return (

        <div className={classes.wrapper}>
            <div className={classes.profile}>

                <ProfileHeader text={user.userName} />
                <div className={classes.userInfo}>
                    <h2 className={classes.userName}>  Имя: {user.firstName}  </h2>
                    <h2 className={classes.userName}>  Фамилия: {user.lastName} </h2>
                </div>
                <div className={classes.results}>
                    <h3 className={classes.level}>
                        {user.games} игр сыграно
                    </h3>
                    <Progressbar width={`${width}%`} />
                    <div className={classes.resultNumbers}>
                        <p>ПРАВИЛЬНЫХ ОТВЕТОВ<br /><span>{user.rightAnswers || 0}</span></p>
                        <p>НЕПРАВИЛЬНЫХ ОТВЕТОВ<br /><span>{wrongAnswers|| 0}</span></p>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default Profile
