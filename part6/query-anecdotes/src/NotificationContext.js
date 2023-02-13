import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
    switch (action.type) {
      case "ADD":
          return state
      case "VOTE":
          console.log('perse')
          return state
      default:
          return state
    }
  }

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, '')
  
    return(
      <NotificationContext.Provider value={[notification, notificationDispatch] }>
        {props.children}
      </NotificationContext.Provider>
    )
}

export const useNotificationValue = () => {
    const nd = useContext(NotificationContext)
    return nd[0]
}
  
export const useNotificationDispatch = () => {
    const nd = useContext(NotificationContext)
    return nd[1]
}

export default NotificationContext