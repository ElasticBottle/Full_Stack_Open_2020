import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Title = ({ text }) => {
  return <h2>
    {text}
  </h2>
}

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>
}
const Vote = ({ value }) => {
  return <p>has {value} votes</p>
}

const App = ({ anecdotes }) => {
  const anecdotesLength = anecdotes.length
  const [anecdote, setAnecdote] = useState(0)
  const [votes, setVote] = useState(Array(anecdotesLength).fill(0))

  const indexOfMax = (arr) => {
    if (arr.length === 0) {
      return -1;
    }

    var max = arr[0];
    var maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
      if (arr[i] > max) {
        maxIndex = i;
        max = arr[i];
      }
    }

    return maxIndex;
  }

  const randomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  }
  const getRandomAnecdote = () => {
    setAnecdote(randomInt(anecdotesLength))
  }
  const voteAnecdote = () => {
    const updatedVotes = [...votes]
    updatedVotes[anecdote] += 1
    setVote(updatedVotes)
  }
  return <div>
    <Title text='Anecdote of the day' />
    <p>
      {anecdotes[anecdote]}
    </p>
    <Vote value={votes[anecdote]} />
    <Button handleClick={voteAnecdote} text='vote' />
    <Button handleClick={getRandomAnecdote} text='next anecdote' />
    <Title text='Anecdote with most votes' />
    <p>
      {anecdotes[indexOfMax(votes)]}
    </p>
  </div>
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <React.StrictMode>
    <App anecdotes={anecdotes} />
  </React.StrictMode>,
  document.getElementById('root')
);
