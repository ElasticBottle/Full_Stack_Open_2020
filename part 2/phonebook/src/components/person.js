import React from 'react'
import contactService from '../services/contact'

const deleteOnClick = (id, name, people, setPerson, setMessage) => {
    return (event) => {
        if (window.confirm(`Delete ${name}?`)) {
            contactService
                .removeExisting(id)
                .then(response => {
                    setMessage({ content: `Deleted ${name}'s contact`, isError: false })
                    setTimeout(() => {
                        setMessage({ content: null, isError: false })
                    }, 3000);
                    return setPerson(people.filter((person) => person.id !== id))
                })
                .catch(error => {
                    setPerson(people.filter(person => person.id !== id))
                })
        }
    }
}
const Person = ({ person, people, setPerson, setMessage }) => {
    return <div>
        {person.name} {person.number} <button onClick={deleteOnClick(person.id, person.name, people, setPerson, setMessage)}>Delete</button>
    </div>
}

export default Person