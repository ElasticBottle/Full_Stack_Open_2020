import React, { useState } from 'react';

const Person = ({ person }) => {
  return <div>
    {person.name}
  </div>
}

const People = ({ people }) => {
  return people.map((person) => {
    return <Person key={person.name} person={person} />
  })
}

function App() {
  const [people, setPerson] = useState([]);
  const [newName, setNewName] = useState('');

  const handleChange = (event) => {
    console.log(event);
    console.log(event.target.value);
    setNewName(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName
    }
    if (people.filter(person => person.name = newPerson.name).length != 0) {
      window.alert('${newPerson.name} is already added to phone book')
    }
    else {
      setPerson(people.concat(newPerson))
      setNewName('')
    }
  }

  return (
    <div>
      <h2>Phone book</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleChange} />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        <People people={people} />
      </div>
    </div>
  );
}

export default App;
