import { useState } from 'react'

const Header = ({header}) => {
  return(<div><h1>{header}</h1></div>
  )}

const Persons = (props) => {
  return(
    <div>
      {props.show.map(person =>
        <div key = {person.name}> {person.name} {person.number}</div>
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
        <div><button type="submit">add</button></div>
    </form>
  )
}

const App = () => {
  const head1 = "Phonebook"
  const head2 = "add a new"
  const head3 = "Numbers"

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const names = persons.map(person => person.name)

  const addName = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)

    if(names.includes(newName)) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      const nameObject = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
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
      <Submit submit = {addName} name = {newName} nameHanlder = {handleNameChange}
              number = {newNumber} numberHandler = {handleNumberChange} />
      <Header header ={head3}/>
      <Persons show = {filteredPersons} />
    </div>
  )

}

export default App
