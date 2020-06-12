import React, { useState } from 'react';
import People from './components/people'
import PersonForm from './components/person_form'
import Filter from './components/filter'


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

  return (
    <div>
      <h2>Phone book</h2>
      <Filter filterString={filterString} setFilterString={setFilterString} />
      <h2>Add a new</h2>
      <PersonForm newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} people={people} setPerson={setPerson} />
      <h2>Numbers</h2>
      <People people={people} filterString={filterString} />
    </div>
  );
}

export default App;
