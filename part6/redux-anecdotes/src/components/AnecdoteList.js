import { useSelector, useDispatch } from 'react-redux'
import {voteById} from '../reducers/anecdoteReducer'
import { notification } from '../reducers/notificationReducer'

const AnecdoteList = () => {

    const anecdotes = useSelector(state => {
    if ( state.filter === 'ALL' ) {
      return state.anecdotes
    }
    return state.anecdotes.filter(a => a.content.includes(state.filter))
    })

    const dispatch = useDispatch()

    const vote = async (anecdote) => {
        dispatch(voteById(anecdote.id))
        dispatch(notification(`you voted '${anecdote.content}'`, 5000))
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
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
    )
}

export default AnecdoteList