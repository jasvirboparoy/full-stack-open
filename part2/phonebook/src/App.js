import { useState, useEffect } from 'react'
import Error from './components/Error'
import Notification from './components/Notification'
import personService from './services/persons'

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
  
  const handleDelete = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.deletePerson(person.id)
    }
  }

  return (
    <div>
      {person.name} {person.number}
      <button onClick={() => handleDelete(person)}>delete</button>
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
  const [displayList, setDisplayList] = useState(persons)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(returnedPersons => {
        setPersons(returnedPersons)
        setFilterString('')
        setDisplayList(returnedPersons)
      })
  }, [])

  const addNewPerson = (event) => {
    event.preventDefault();

    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }
    
    // Check if person is already in phone book
    const existingPerson = persons.find(person => person.name === newName)
    if (existingPerson !== undefined) {
      if (window.confirm(`${existingPerson.name} is already added to phonebook, replace old number with a new one?`)) {
        personService
          .updatePerson(existingPerson.id, personObject)
          .then(returnedPerson => {
            setNewName('')
            setNewNumber('')
            setNotificationMessage(`Updated phone number for ${returnedPerson.name}`)
            setTimeout(() => {
              setNotificationMessage(null)
            }, 5000)
          })
          .catch(error => {
            setErrorMessage(`Information of ${newName} has already been removed from server`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
      }
      return
    }

    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')

        setNotificationMessage(`Added ${returnedPerson.name}`)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      })
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
      <Notification message={notificationMessage} />
      <Error message={errorMessage} />
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