import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => (
  <h1>{props.course}</h1>
)

const Part = (props) => {
  return <p>{props.part} {props.exercises}</p>
}

const Content = (props) => {
  return <>
    {props.parts.map(
      (part) => {
        return <Part part={part.name} exercises={part.exercises} />;
      }
    )}
  </>
}

const Total = (props) => {
  let total = 0
  for (const part of props.parts) {
    total += part.exercises
  }
  return <p>Number of exercises {total}</p>

}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))