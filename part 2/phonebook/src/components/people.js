import React from 'react'

const Person = ({ person }) => {
    return <div>
        {person.name} {person.number}
    </div>
}


const People = ({ people, filterString }) => {
    const filtered = people.filter((person) => {
        const name = person.name.toLowerCase()
        const contains = name.includes(filterString.toLowerCase());
        return contains
    })
    return filtered.map((person) => {
        return <Person key={person.name} person={person} />
    })
}

export default People