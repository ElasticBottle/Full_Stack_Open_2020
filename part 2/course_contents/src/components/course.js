import React from 'react'

const Header = (props) => (
    <h1>{props.course}</h1>
)

const Part = ({ part }) => {
    return <p>{part.name} {part.exercises}</p>
}

const Content = ({ parts }) => {
    return <div>
        {parts.map((part) => <Part key={part.id} part={part} />)}
    </div>
}

const Total = ({ parts }) => {
    let total = parts.reduce((sum, part) => {
        return sum + part.exercises
    }, 0);

    return <p><strong>Total of {total} exercises</strong></p>
}
const Course = ({ courses }) => courses.map((course) => {
    return <div key={course.id}>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
    </div>
})

export default Course