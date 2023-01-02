import { useState, useEffect } from 'react'
import personService from './services/persons'

const Header = ({header}) => {
  return(<div><h1>{header}</h1></div>
)}

const Notification = ({ message }) => {
  if (message === '') {
    return null
  } else if (message.includes('Information of')) {
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

const Persons = (props) => {
  return(
    <div>
      {props.show.map(person =>
        <div key = {person.name}> {person.name} {person.number}
          <button onClick={()=>props.removePerson(person.id)}>delete</button>
        </div>
      )}
    </div>
  )
}

const Filter = (props) => {
  return(
      <form>
        <div>filter shown with <input value = {props.filter} onChange={props.handler}/></div>
      </form>
  )
}

const Submit = (props) => {
  return(
    <form onSubmit={props.submit}>
        <div>name: <input value = {props.name} onChange={props.nameHanlder}/></div>
        <div>number: <input value = {props.number} onChange={props.numberHandler}/></div>
        <div><button type="submit" >add</button></div>
    </form>
  )
}

const App = () => {
  const head1 = "Phonebook"
  const head2 = "add a new"
  const head3 = "Numbers"

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState('')

  const names = persons.map(person => person.name)

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
        .then(response => {
          console.log('promise fulfilled')
          setPersons(response.data)
        })
  }, [])
  console.log('render', persons.length, 'notes')

  const addName = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)

    if(names.includes(newName)) {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find(p=> p.name===newName)
        const newObject = {...person, number: newNumber}
        personService
          .update(person.id, newObject)
            .then(response => {
              setPersons(persons.filter(p2 => p2.id !== person.id ? p2 : response.data))
              setMessage(`Updated ${person.name}`)
            }).catch(error => {
              setMessage( `Information of ${person.name} has already been removed from server`)
              setPersons(persons.filter(p => p.id !== person.id))
            })
      }
    } else {
      const nameObject = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
      personService
        .create(nameObject)
        .then(response => {
          console.log(response)
        })
      setMessage(`Added ${newName}`)
    }
    setNewName('')
    setNewNumber('')
  }

  const deleteById = (id) => {
    const name = persons.find(p=> p.id===id).name
    if(window.confirm(`Delete ${name}`)) {
      personService
        .deletePerson(id)
          .then(person => {
            setPersons(persons.filter(p => p.id !== person.id))
          })
      setMessage(`Deleted ${name}`)
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const filteredPersons = (newFilter === '')
  ? persons : persons.filter(person => person.name.includes(newFilter))

  return (
    <div>
      <Header header ={head1}/>
      <Filter filter = {newFilter} handler = {handleFilterChange}/>
      <Header header ={head2}/>
      <Notification message={message}/>
      <Submit submit = {addName} name = {newName} nameHanlder = {handleNameChange}
              number = {newNumber} numberHandler = {handleNumberChange} />
      <Header header ={head3}/>
      <Persons show = {filteredPersons} removePerson = {deleteById} />
    </div>
  )

}

export default App
