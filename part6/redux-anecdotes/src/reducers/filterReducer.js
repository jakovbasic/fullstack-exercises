const filterReducer = (state = 'ALL', action) => {
  console.log('ACTION: ', action)

    switch (action.type) {
      case 'SET_FILTER':
        state = action.payload
        return state
      default:
        return state
    }
  }
  
  export const filterChange = filter => {
    return {
      type: 'SET_FILTER',
      payload: filter,
    }
  }
  
  export default filterReducer