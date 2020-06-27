import React from 'react'
import contactService from '../services/contact'


const handleNameChange = (setNewName) => (event) => setNewName(event.target.value)

const handleNumberChange = (setNewNumber) => (event) => setNewNumber(event.target.value)

const isNumberValid = (newNumber) => {
    return newNumber.length !== 0
}

const isNameValid = (people, newName) => {
    const existing = people.filter(person => person.name.toLowerCase() === newName.toLowerCase())
    return existing.length === 0
}

const isEmpty = (value) => value.length === 0

const handleSubmit = (setPerson, people, setNewName, setNewNumber, newName, newNumber) => (event) => {
    event.preventDefault()
    const numberValid = isNumberValid(newNumber)
    const nameValid = isNameValid(people, newName)
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
        contactService.addNew(newPerson).then(
            (response) => {
                setPerson(people.concat(response.data))
                setNewName('')
                setNewNumber('')
            }
        )
    }
}

const PersonForm = ({ newName, setNewName, newNumber, setNewNumber, setPerson, people }) => {
    return <form onSubmit={handleSubmit(setPerson, people, setNewName, setNewNumber, newName, newNumber)}>
        <div>
            name: <input value={newName} onChange={handleNameChange(setNewName)} />
        </div>
        <div>
            number: <input value={newNumber} onChange={handleNumberChange(setNewNumber)} />
        </div>
        <div>
            <button type='submit'>add</button>
        </div>
    </form>
}

export default PersonForm