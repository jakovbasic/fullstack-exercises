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
      <div>
        {props.text} {props.value} %
      </div>
      )
  } else return(
  <div>
    {props.text} {props.value} 
  </div>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const avg = (good - bad)/(good + neutral + bad)
  const pos = (good)/(good + neutral + bad)
  return(
    <div>
      <StatisticLine text="good" value = {good} />
      <StatisticLine text="neutral" value = {neutral} />
      <StatisticLine text="bad" value = {bad} />
      <StatisticLine text="average" value = {avg}/>
      <StatisticLine text="positive" value = {pos}/>
    </div>
  )
}

const History = (props) => {
if(props.good + props.neutral + props.bad === 0) {
  return( <div>No feedback given</div>)
}
else return (
  <div>
    <Statistics good = {props.good} 
                neutral = {props.neutral} 
                bad = {props.bad} />
  </div>
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
      <History good = {good} neutral = {neutral} bad = {bad} />
    </div>
  )
}

export default App
