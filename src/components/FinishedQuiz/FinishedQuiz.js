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
        <h1 className={classes.gameOver}>Игра завершена</h1>
        <div className={classes.tableWrap}>
        <table className={classes.FinishTable}>
          <tbody>
            <tr className={classes.Row} >
              <th className={classes.th}>Ваш выбор</th>
              <th className={classes.th}>Вопрос</th>
              <th className={classes.th}>Правильный ответ</th>
            </tr>
            {props.quiz.map((quizItem, index) => {
              const cls = [
                'fa',
                props.results[quizItem.id] === 'error' ? 'fa-times' : 'fa-check',
                classes[props.results[quizItem.id]]
              ]
          
              return (
                <tr className={classes.Row} key={index}>
                  {/* <td><strong>{index + 1}</strong>.&nbsp;</td> */}
                  <td className={classes.td} ><div className={classes.Status}><i className={cls.join(' ')} /></div></td>
                  <td className={classes.td}>{quizItem.question}</td>
                  <td className={classes.td}>{quizItem.answers[quizItem.rightAnswerId - 1].text}</td>
                </tr>
              )
            })
            }
          </tbody>
        </table>

        </div>
        <div className={classes.Result}>
          <h1 className={classes.titleResult}>Результат:</h1>
          <div className={classes.ResultCircle}><h1 className={classes.titleResult}>{successCount} / {props.quiz.length}</h1></div>
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
  )
}

export default FinishedQuiz
