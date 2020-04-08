import React, { useEffect, useState } from 'react'
import firebase from '../../firebase'
// import Button from '../../components/UI/Button/Button'
import { useHistory } from "react-router-dom";
import classes from './ProfileEdit.module.css'
import ProfileHeader from '../../components/ProfileHeader/ProfileHeader'


const ProfileEdit = () => {

  

    const [firstName, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userName, setUserName] = useState('');
    const history = useHistory();

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
            
          history.push(`/user/${localStorage.userId}`)
    }

    return (
        <div className={classes.wrapper}>
          <div className={classes.mainBlock}>
            <ProfileHeader text={userName} />
              <div className={classes.userInfo}>
                  <div className={classes.userName}>  
                  {/* <label>Имя:</label> */}
                  <input className={classes.inputChange} placeholder='Имя'  onChange={e => setName(e.currentTarget.value)} />
                  </div>
                  <div className={classes.userName}> 
                   {/* Фамилия: */}
                  <input className={classes.inputChange} placeholder='Фамилия' onChange={e => setLastName(e.currentTarget.value)} />
                  </div>
                  <div className={classes.userName}> 
                   {/* Ник: */}
                  <input className={classes.inputChange} placeholder='Ник' onChange={e => setUserName(e.currentTarget.value)} />
                  </div>
              </div>
              {/* <Button className={classes.btn} onClick={onSubmit}>Изменить</Button> */}
             <div className={classes.btnBlock}>
              <button className={classes.btn} onClick={onSubmit}>Изменить</button>
             </div>
          </div>
        </div>
    )
}


export default ProfileEdit
