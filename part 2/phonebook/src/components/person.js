import React from 'react'
import contactService from '../services/contact'

const deleteOnClick = (id, name, people, setPerson) => {
    return (event) => {
        if (window.confirm(`Delete ${name}?`)) {
            contactService
                .removeExisting(id)
                .then(response => {
                    return setPerson(people.filter((person) => person.id !== id))
                })
        }
    }
}
const Person = ({ person, people, setPerson }) => {
    return <div>
        {person.name} {person.number} <button onClick={deleteOnClick(person.id, person.name, people, setPerson)}>Delete</button>
    </div>
}

export default Person