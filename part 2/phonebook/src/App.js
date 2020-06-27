import React, { useState, useEffect } from 'react';
import People from './components/people'
import PersonForm from './components/person_form'
import Filter from './components/filter'
import contactService from './services/contact'


function App() {
  const [people, setPerson] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterString, setFilterString] = useState('');

  const phoneNumberRetrieval = () => {
    contactService.getAll()
      .then(response => {
        console.log(response.data);
        setPerson(response.data)
      })
  }
  useEffect(phoneNumberRetrieval, [])

  return (
    <div>
      <h2>Phone book</h2>
      <Filter filterString={filterString} setFilterString={setFilterString} />
      <h2>Add a new</h2>
      <PersonForm newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} people={people} setPerson={setPerson} />
      <h2>Numbers</h2>
      <People people={people} setPerson={setPerson} filterString={filterString} />
    </div>
  );
}

export default App;
