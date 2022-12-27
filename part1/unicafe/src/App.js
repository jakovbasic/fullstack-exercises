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

const Stat = (props) => {
  return(
  <div>
    {props.name} {props.stats}
  </div>
  )
}

const Average = (props) => {
  const avg = (props.good - props.bad)/(props.good + props.neutral + props.bad)
  return (
    <div>
      average {avg}
    </div>
  )
}

const Positive = (props) => {
  const pos = (props.good)/(props.good + props.neutral + props.bad)
  return (
    <div>
      positive {pos} %
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
      <Stat stats = {good} name = {"good"} />
      <Stat stats = {neutral} name = {"neutral"}/>
      <Stat stats = {bad} name = {"bad"} />
      <Average good = {good} neutral = {neutral} bad = {bad} />
      <Positive good = {good} neutral = {neutral} bad = {bad} />
    </div>
  )
}

export default App
