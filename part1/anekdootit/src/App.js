import { useState } from 'react'

const Header = (props) => {
  return(
  <div>
    <h1>{props.header}</h1>
  </div>
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Anecdote = (props) => {
  return(
    <div>
      {props.anecdote} has {props.votes} votes
    </div>
  )
}

const votes = new Uint8Array(7)

const App = () => {
  const header1 = "Anecdote of the day"
  const header2 = "Anecdote with most votes"
  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState(0)

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]

  const maxvotes = Math.max(...votes)
  var i = 0
  while(votes[i] < maxvotes) {
    i++
  }

  const handleNext = () => {
    let number = Math.floor(Math.random() * anecdotes.length)
    setSelected(number)
  }

  const handleVote = () => {
    votes[selected] += 1
    setVote(vote +votes[selected])
  }
   
  return (
    <div>
      <Header header = {header1} />
      <Anecdote anecdote = {anecdotes[selected]} votes = {votes[selected]}/>
      <Button handleClick = {handleVote} text = "vote" />
      <Button handleClick = {handleNext} text = "next anecdote" />
      <Header header = {header2} />
      <Anecdote anecdote = {anecdotes[i]} votes = {maxvotes}/>
    </div>
  )
}

export default App