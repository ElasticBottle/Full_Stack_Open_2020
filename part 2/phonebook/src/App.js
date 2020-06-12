import React, { useState } from 'react';

const Person = ({ person }) => {
  return <div>
    {person.name} {person.number}
  </div>
}

const People = ({ people }) => {
  return people.map((person) => {
    return <Person key={person.name} person={person} />
  })
}

function App() {
  const [people, setPerson] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterString, setFilterString] = useState('');
  const [filterPeople, setFilterPeople] = useState([...people]);

  const handleNameChange = (event) => setNewName(event.target.value)

  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => {
    setFilterString(event.target.value);
    const filtered = people.filter((person) => {
      const name = person.name.toLowerCase()
      const contains = name.includes(event.target.value.toLowerCase());
      return contains
    })
    setFilterPeople(filtered)
  }

  const isNumberValid = (newNumber) => {
    return newNumber.length !== 0
  }

  const isNameValid = (newName) => {
    const existing = people.filter(person => person.name.toLowerCase() === newName.toLowerCase())
    return existing.length === 0
  }

  const isEmpty = (value) => value.length === 0

  const handleSubmit = (event) => {
    event.preventDefault()
    const numberValid = isNumberValid(newNumber)
    const nameValid = isNameValid(newName)
    const nameEmpty = isEmpty(newName)
    const numberEmpty = isEmpty(newNumber)
    const newPerson = {
      name: newName,
      number: newNumber
    }
    if (nameEmpty) {
      window.alert('Please enter a name')
    }
    else if (numberEmpty) {
      window.alert(`Please enter a number`)
    }
    else if (!nameValid) {
      window.alert(`${newPerson.name} is already added to phone book`)
    } else if (!numberValid) {
      window.alert(`${newNumber} is not a valid phone number`)
    }
    else {
      setPerson(people.concat(newPerson))
      setNewName('')
    }
  }

  return (
    <div>
      <h2>Phone book</h2>
      <div>
        filter shown with <input value={filterString} onChange={handleFilterChange} />
      </div>
      <h2>Add a new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        <People people={filterPeople} />
      </div>
    </div>
  );
}

export default App;
