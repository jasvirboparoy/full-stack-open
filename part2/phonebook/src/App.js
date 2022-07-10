import { useState, useEffect } from 'react'
import axios from 'axios'

const PhonebookForm = ({ onSubmit, nameVal, nameOnChange, numVal, numOnChange }) => {
  return (
    <>
      <form onSubmit={onSubmit}>
        <div>
          name:
          <input
            value={nameVal}
            onChange={nameOnChange}
          />
          <br />
          number:
          <input
            value={numVal}
            onChange={numOnChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )
}

const Person = ({ person }) => {
  return (
    <div>
      {person.name} {person.number}
    </div>
  )
}

const DisplayNumbers = ({ numbersList }) => {
  return (
    <>
      {numbersList.map(person => <Person key={person.id} person={person} />)}
    </>
  )
}

const DisplayFilter = ({ filterString, filterDisplayList }) => {
  return (
    <div>filter shown with
      <input
        value={filterString}
        onChange={filterDisplayList}
      />
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterString, setFilterString] = useState('')
  const [displayList, setDisplayList] = useState(persons);

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => { 
        setPersons(response.data)
        setFilterString('')
        setDisplayList(response.data)
      })
  }, [])

  const addNewPerson = (event) => {
    event.preventDefault();
    
    const matches = persons.filter(person => person.name === newName)
    if (matches.length) {
      return alert(`${newName} is already added to phonebook`)
    }

    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  const filterDisplayList = (event) => {
    setFilterString(event.target.value)
    // Convert the name to lowercase & also the filterString
    // use indexOf to search for substring
    // If element not found, -1 is returned
    if (event.target.value === '') {
      return setDisplayList(persons)
    }
    const filteredArr = persons.filter(person => person.name.toLowerCase().indexOf(filterString.toLowerCase()) !== -1)
    setDisplayList(filteredArr)
  }

  const nameOnChange = (event) => {
    setNewName(event.target.value)
  }

  const numOnChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <DisplayFilter
        filterString={filterString}
        filterDisplayList={filterDisplayList}
      />
      <h2>add a new</h2>
      <PhonebookForm
        onSubmit={addNewPerson}
        nameVal={newName}
        nameOnChange={nameOnChange}
        numVal={newNumber}
        numOnChange={numOnChange}
      />
      <h2>Numbers</h2>
      <DisplayNumbers numbersList={displayList} />
    </div>
  )
}

export default App