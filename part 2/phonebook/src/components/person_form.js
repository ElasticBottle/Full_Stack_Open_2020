import React from 'react'
import contactService from '../services/contact'


const handleNameChange = (setNewName) => (event) => setNewName(event.target.value)

const handleNumberChange = (setNewNumber) => (event) => setNewNumber(event.target.value)

const isNumberValid = (newNumber) => {
    return newNumber.length !== 0
}

const isUpdating = (people, newName) => {
    const existing = people.filter(person => person.name.toLowerCase() === newName.toLowerCase())
    return existing.length !== 0
}

const isEmpty = (value) => value.length === 0

const resetField = (setNewNumber, setNewName) => {
    setNewName('')
    setNewNumber('')
}

const handleSubmit = (setPerson, people, setNewName, setNewNumber, newName, newNumber) => (event) => {
    event.preventDefault()
    const numberValid = isNumberValid(newNumber)
    const updating = isUpdating(people, newName)
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
    else if (!numberValid) {
        window.alert(`${newNumber} is not a valid phone number`)
    } else if (updating) {
        if (window.confirm(`${newPerson.name} is already added to phone book, update old number with a new one?`)) {
            console.log('update number');
            const toUpdate = people.filter(person => person.name === newPerson.name)
            contactService
                .updateExisting(toUpdate[0].id, newPerson)
                .then(
                    response => {
                        const updatedPeople = people.map(person => {
                            return person.id === response.data.id ? response.data : person
                        })
                        console.log(updatedPeople);
                        setPerson(updatedPeople)
                        resetField(setNewNumber, setNewName)
                    }
                )
        }
    }
    else {
        contactService.addNew(newPerson).then(
            (response) => {
                setPerson(people.concat(response.data))
                resetField(setNewNumber, setNewName)
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