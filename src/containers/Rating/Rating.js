// import React, {  useEffect  } from "react";
// // import firebase from '../../firebase'
// import { connect } from "react-redux";
// import Loader from '../../components/UI/Loader2/Loader'
// import classes from "./Rating.module.css";
// import { fetchRating } from '../../store/actions/rating'

// const Rating = ({loading, users, fetchRating }) => {
    
//     useEffect(() => {
//       fetchRating()
//     }, [fetchRating])
  
//   return (
//     <main className={classes.main}>
//       <div className={classes.wrapper}>
//         <h1 className={classes.title}>ТАБЛИЦА РЕЗУЛЬТАТОВ</h1>
//         {loading ? (
//             <Loader />
//           ) : (
//             <table className={classes.tableRating}>
//             <thead>
//               <tr className={classes.rowThead}>
//                 <td className={classes.tdHead}>РЕЙТИНГ</td>
//                 <td className={classes.tdHead}>ИМЯ</td>
//                 <td className={classes.tdHead}>ИГРЫ</td>
//               </tr>
//             </thead>
//             <tbody>
//               {users.length > 0 &&
//                 users.map((elem, index) => {
//                   return (
//                     <tr key={index}>
//                       <td className={classes.tdBody}><div className={classes.round}>{elem.rightAnswers}</div></td>
//                       <td className={classes.tdBody}>
//                         <div className={classes.iconLogoBox}>
//                         </div>
//                         {elem.userName ? elem.userName : (elem.firstName || elem.email)}
//                       </td>
//                       <td className={classes.tdBody} >{elem.games}</td>
//                     </tr>
//                   );
//                 })}
//             </tbody>
//           </table>
//           )}
       
//       </div>
//     </main>
//   );

// }

// function mapStateToProps(state) {
//   return {
//     users: state.rating.users,
//     loading: state.rating.loading,
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     fetchRating: () => dispatch(fetchRating()),
//   };
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Rating);


import React, { useState, useEffect  } from "react";
import firebase from '../../firebase'
import Loader from '../../components/UI/Loader2/Loader'
import classes from "./Rating.module.css";

const fairRating = (el) => {
  let coef;
  if(el.games < 5) {
    coef = 0.5;
  } else if (el.games >= 5 && el.games < 10) {
    coef = 0.8;
  } else if (el.games >= 10 && el.games < 25) {
    coef = 0.9;
  } else {
    coef = 1;
  }
  return Math.round((el.rightAnswers*coef))
}
function useUsers() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("users")
      // .orderBy("rightAnswers", "desc")
      .onSnapshot((snapshot) => {
        
        const newTest = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        
        })).sort((a,b) => fairRating(b) - fairRating(a))
                
        setUsers(newTest)
      })
      return () => unsubscribe()
  }, [])
    
  return users
}





const Rating = () => {
  const base = useUsers()
  
  return (
    <main className={classes.main}>
      <div className={classes.wrapper}>
        <h1 className={classes.title}>ТАБЛИЦА РЕЗУЛЬТАТОВ</h1>
        <table className={classes.tableRating}>
          <thead>
            <tr className={classes.rowThead}>
              <td className={classes.tdHead}>РЕЙТИНГ</td>
              {/* <td className={classes.tdHead}>Верные ответы</td> */}
              <td className={classes.tdHead}>ИМЯ</td>
              <td className={classes.tdHead}>ИГРЫ</td>
            </tr>
          </thead>
          <tbody>
            {base.length > 0 &&
              base.map((elem, index) => {
                return (
                  <tr key={index}>
                    <td className={classes.tdBody}><div className={classes.round}>{fairRating(elem)}</div></td>
                    <td className={classes.tdBody}>
                      <div className={classes.iconLogoBox}>
                        {/* <img
                          className={classes.iconLogoImg}
                          src={elem.photo}
                          alt=""
                        /> */}
                      </div>
                      {elem.userName ? elem.userName : (elem.firstName || elem.email)}
                    </td>
                    <td className={classes.tdBody} >{elem.games}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </main>
  );

}

export default Rating;
