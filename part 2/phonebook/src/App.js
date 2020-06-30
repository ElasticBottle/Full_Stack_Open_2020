import React, { useState, useEffect } from 'react';
import People from './components/people'
import PersonForm from './components/person_form'
import Filter from './components/filter'
import contactService from './services/contact'
import Notification from './components/notification'

function App() {
  const [people, setPerson] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterString, setFilterString] = useState('');
  const [message, setMessage] = useState({ content: null, isError: false })

  const phoneNumberRetrieval = () => {
    contactService.getAll()
      .then(response => {
        console.log(response.data);
        setPerson(response.data)
      })
      .catch(error => {
        setMessage({ content: 'error fetching data from server', isError: true })
        setTimeout(() => setMessage({ content: null, isError: false }), 3000)
      })
  }
  useEffect(phoneNumberRetrieval, [])

  return (
    <div>
      <h2>Phone book</h2>
      <Notification message={message.content} isError={message.isError} />
      <Filter filterString={filterString} setFilterString={setFilterString} />
      <h2>Add a new</h2>
      <PersonForm newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} people={people} setPerson={setPerson} setMessage={setMessage} />
      <h2>Numbers</h2>
      <People people={people} setPerson={setPerson} filterString={filterString} setMessage={setMessage} />
    </div>
  );
}

export default App;
