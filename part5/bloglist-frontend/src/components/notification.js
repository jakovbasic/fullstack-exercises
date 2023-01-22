const Notification = ({ message }) => {
  if (message === '') {
    return null
  } else if (message.includes('wrong')) {
    return(
      <div className="error">
        {message}
      </div>
    )
  }
  return (
    <div className="message">
      {message}
    </div>
  )
}

export default Notification