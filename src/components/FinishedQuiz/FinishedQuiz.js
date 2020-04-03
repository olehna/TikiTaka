import React from 'react'
import classes from './FinishedQuiz.module.css'
import Button from '../UI/Button/Button'
import { Link } from 'react-router-dom'

const FinishedQuiz = props => {
  const successCount = Object.keys(props.results).reduce((total, key) => {
    if (props.results[key] === 'success') {
      total++
    }

    return total
  }, 0)


  return (
    <div className={classes.FinishedQuiz}>
      <h1>Результат</h1>
      <div>
        {props.quiz.map((quizItem, index) => {
          const cls = [
            'fa',
            props.results[quizItem.id] === 'error' ? 'fa-times' : 'fa-check',
            classes[props.results[quizItem.id]]
          ]
          console.log(quizItem.answers)
          return (
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
              <tr>
                {/* <td><strong>{index + 1}</strong>.&nbsp;</td> */}
                <div className={classes.Status}><i className={cls.join(' ')} /></div>
                <td>{quizItem.question}</td>
                <td>{quizItem.answers[quizItem.rightAnswerId - 1].text}</td>
              </tr>

            </div>
          )

        })}
      </div>

      <p>Правильно {successCount} из {props.quiz.length}</p>

      <div style={{ display: 'flex' }}>
        <Button onClick={props.onRetry} type="primary" >Повторить</Button>
        <Link to="/">
          <Button type="success">Перейти в список тестов</Button>
        </Link>
      </div>
    </div >
  )
}

export default FinishedQuiz
