import React from 'react'
import classes from './FinishedQuiz.module.css'
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
      <div>
        <h1>Игра завершена</h1>
        <table width="100%" cellspacing="20" cellpadding="0" border="0">
          <tbody>
            <tr>
              <th></th>
              <th align='left'>Вопрос</th>
              <th>Правильный ответ</th>
            </tr>
            {props.quiz.map((quizItem, index) => {
              const cls = [
                'fa',
                props.results[quizItem.id] === 'error' ? 'fa-times' : 'fa-check',
                classes[props.results[quizItem.id]]
              ]
              console.log(quizItem.answers)
              return (
                <tr className={classes.Row} key={index}>
                  {/* <td><strong>{index + 1}</strong>.&nbsp;</td> */}
                  <td style={{ width: '5%' }} ><div className={classes.Status}><i className={cls.join(' ')} /></div></td>
                  <td style={{ width: '55%' }}>{quizItem.question}</td>
                  <td style={{ width: '40%', textAlign: 'center' }}>{quizItem.answers[quizItem.rightAnswerId - 1].text}</td>
                </tr>
              )
            })
            }
          </tbody>
        </table>

        <div className={classes.Result}>
          <h1>Результат:</h1>
          <div className={classes.ResultCircle}><h1 style={{ textAlign: 'center' }}>{successCount} / {props.quiz.length}</h1></div>
        </div>
        <div className={classes.Buttons}>
          <button
            className={classes.Button}
            style={{ background: 'rgb(255, 93, 125)' }}
            onClick={props.onRetry}
            type="primary" >
            Повторить
            </button>

          <Link to="/">
            <button
              className={classes.Button}
              style={{ background: 'darkgrey' }}
              type="success">
              Главное меню
              </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default FinishedQuiz
