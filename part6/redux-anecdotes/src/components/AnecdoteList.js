import { useSelector, useDispatch } from 'react-redux'
import {voteById} from '../reducers/anecdoteReducer'

const AnecdoteList = () => {

    const anecdotes = useSelector(state => {
    if ( state.filter === 'ALL' ) {
      return state.anecdotes
    }
    return state.anecdotes.filter(a => a.content.includes(state.filter))
    })

    const dispatch = useDispatch()

    const vote = (id) => {
        dispatch(voteById(id))
    }

    return(
    <div>
      {anecdotes.slice().sort((a, b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
    )
}

export default AnecdoteList