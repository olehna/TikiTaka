import React, { useEffect, useState } from 'react'
import firebase from '../../firebase'
import Button from '../../components/UI/Button/Button'
import classes from './ProfileEdit.module.css'
import ProfileHeader from '../../components/ProfileHeader/ProfileHeader'


const ProfileEdit = () => {

    const [firstName, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const userRef = firebase.firestore().collection('users').doc(localStorage.userId)
        userRef.onSnapshot(function (documentSnapshot) {
            const data = documentSnapshot.data()
            setName(data.firstName)
            setLastName(data.lastName)
            setUserName(data.userName)
        })
    }, []);

    function onSubmit(e) {
        e.preventDefault()

        firebase
            .firestore()
            .collection('users')
            .doc(localStorage.userId)
            .update({
                firstName,
                lastName,
                userName,
            })
    }

    return (
        <div className={classes.wrapper}>
            <ProfileHeader text={userName} />
            <div className={classes.userInfo}>
                <div className={classes.userName}>  Имя:
                <input className={classes.inputChange} value={firstName} onChange={e => setName(e.currentTarget.value)} />
                </div>
                <div className={classes.userName}>  Фамилия:
                <input className={classes.inputChange} value={lastName} onChange={e => setLastName(e.currentTarget.value)} />
                </div>
                <div className={classes.userName}>  Ник:
                <input className={classes.inputChange} value={userName} onChange={e => setUserName(e.currentTarget.value)} />
                </div>
            </div>
            <Button onClick={onSubmit}>change</Button>

        </div>
    )
}


export default ProfileEdit
