import React from 'react'
import Person from './person'


const People = ({ people, setPerson, filterString }) => {

    const filtered = people.filter((person) => {
        const name = person.name.toLowerCase()
        const contains = name.includes(filterString.toLowerCase());
        return contains
    })
    return filtered.map((person) => {
        return <Person key={person.name} person={person} people={people} setPerson={setPerson} />

    })
}

export default People