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

const handleSubmit = (setPerson, people, setNewName, setNewNumber, newName, newNumber, setMessage) => (event) => {
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
        setMessage({ content: 'Please enter a name', isError: true })
        setTimeout(() => setMessage({ content: null, isError: false }), 3000)
    }
    else if (numberEmpty) {
        setMessage({ content: `Please enter a number`, isError: true })
        setTimeout(() => setMessage({ content: null, isError: false }), 3000)
    }
    else if (!numberValid) {
        setMessage({ content: `${newNumber} is not a valid phone number`, isError: true })
        setTimeout(() => setMessage({ content: null, isError: false }), 3000)
    } else if (updating) {
        if (window.confirm(`${newPerson.name} is already added to phone book, update old number with a new one?`)) {
            const toUpdate = people.filter(person => person.name === newPerson.name)
            contactService
                .updateExisting(toUpdate[0].id, newPerson)
                .then(
                    response => {
                        const updatedPeople = people.map(person => {
                            return person.id === response.data.id ? response.data : person
                        })
                        console.log(updatedPeople);
                        setMessage({ content: `${newPerson.name}'s contact has been updated`, isError: false })
                        setTimeout(() => setMessage({ content: null, isError: false }), 3000)
                        setPerson(updatedPeople)
                        resetField(setNewNumber, setNewName)
                    }
                )
                .catch(error => {
                    setMessage({ content: `${newPerson.name}'s contact has been deleted from the server before this`, isError: true })
                    setTimeout(() => setMessage({ content: null, isError: false }), 3000)
                    setPerson(people.filter(person => person.name !== toUpdate.name))
                })
        }
    }
    else {
        contactService
            .addNew(newPerson)
            .then(
                (response) => {
                    setMessage({ content: `${newPerson.name}'s contact has been added`, isError: false })
                    setTimeout(() => setMessage({ content: null, isError: false }), 3000)
                    setPerson(people.concat(response.data))
                    resetField(setNewNumber, setNewName)
                }
            )
            .catch(error => {
                setMessage({ content: 'something happened...', isError: true })
                setTimeout(() => setMessage({ content: null, isError: false }), 3000)
            })
    }
}

const PersonForm = ({ newName, setNewName, newNumber, setNewNumber, setPerson, people, setMessage }) => {
    return <form onSubmit={handleSubmit(setPerson, people, setNewName, setNewNumber, newName, newNumber, setMessage)}>
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