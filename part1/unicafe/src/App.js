import { useState } from 'react'

const Header = (props) => {
  return (
    <div>
      <h1>
        {props.header}
      </h1>
    </div>
    )
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticLine = (props) => {
  if(props.text === "positive") {
    return (
        <tr>
          <td>{props.text} {props.value} %</td>
        </tr>
      )
  } else return(
    <tr>
      <td>{props.text} {props.value} </td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad
  const avg = (good - bad)/(total)
  const pos = (good)/(total)
  if(total === 0) {
    return( <div>No feedback given</div>)
  } else return(
    <table>
      <tbody>
      <StatisticLine text="good" value = {good} />
      <StatisticLine text="neutral" value = {neutral} />
      <StatisticLine text="bad" value = {bad} />
      <StatisticLine text="average" value = {avg}/>
      <StatisticLine text="positive" value = {pos}/>
      </tbody>
    </table>
  )
}

const App = () => {
  const header = "give feedback"
  const header2 = "statistics"
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header header={header} />
      <Button handleClick={() => setGood(good + 1)} text='good' />
      <Button handleClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button handleClick={() => setBad(bad +1)} text='bad' />
      <Header header={header2} />
      <Statistics good = {good} neutral = {neutral} bad = {bad} />
    </div>
  )
}

export default App
