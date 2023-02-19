import { useSelector } from 'react-redux'

const Notification = () => {

  const notification = useSelector(state => {
    return state.notification
  })

  if (notification === '') return null
  else if (notification.includes('wrong')) return(<div className="error">{notification}</div>)
  else return ( <div className='message'> {notification} </div> )

}

export default Notification