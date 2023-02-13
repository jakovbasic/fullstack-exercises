import { useNotificationDispatch } from '../NotificationContext'

const Button = ({ type, label }) => {
  const dispatch = useNotificationDispatch()
  if (type === 'ADD') {
  return (
    <button type='submit' onClick={() => dispatch({ type })}>
      {label}
    </button>
  )} else if (type == 'VOTE') {
    <button onClick={() => dispatch({ type })}>
      {label}
    </button>
  }
}

export default Button