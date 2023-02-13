import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAnecdotes, updateAnecdote } from '../requests'
import { useNotificationDispatch } from '../NotificationContext'

const Anecdotes = () => {
    const queryClient = useQueryClient()
    const dispatch = useNotificationDispatch()

    const updateAnecdoteMutation = useMutation(updateAnecdote, {
        onSuccess: () => {
        queryClient.invalidateQueries('anecdotes')
        },
    })

    const handleVote = (anecdote) => {
        updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes+1})
        dispatch('VOTE')
    }

    const result = useQuery('anecdotes', getAnecdotes,  {retry: 1})
    console.log(result)

    if ( result.isLoading ) {
        return <div>loading data...</div>
    }

    if (result.isError) {
        return <div>anecdote service not available due to problems in server</div>
    }

    const anecdotes = result.data

    return(
        <div>
        {anecdotes.map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => handleVote(anecdote)}>vote</button>
              </div>
            </div>
          )}
        </div>
    )
}

export default Anecdotes