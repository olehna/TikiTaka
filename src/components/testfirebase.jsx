import React, { useState, useEffect } from 'react'

import firebase from '../firebase'

function useTest() {
    const [test, setTest] = useState([])

    useEffect(() => {
        firebase
            .firestore()
            .collection("vikaTests")
            .onSnapshot((snapshot) => {
                debugger
                const newTest = snapshot.docs.map((doc) => ({ 
                    id: doc.id,
                    ...doc.data()
                }))
                setTest(newTest)
            })

    }, [])
    return test
}



const TestLine = () => {
    const tests = useTest()
    return (

        <div className='test-test'> 
             TESTING TEST {tests.map((elem)=>
             <li>
                 {elem.firstName}
             </li>
             )}
        </div>
    )
}

export default TestLine