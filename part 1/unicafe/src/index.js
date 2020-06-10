import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Title = ({ title }) => {
  return <h2>{title}</h2>
}
const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>
}
const Buttons = ({ buttonProperty }) => {
  return <div>
    <Button handleClick={buttonProperty[0].handleClick} text={buttonProperty[0].text} />
    <Button handleClick={buttonProperty[1].handleClick} text={buttonProperty[1].text} />
    <Button handleClick={buttonProperty[2].handleClick} text={buttonProperty[2].text} />
  </div>
}

const Stat = ({ text, value }) => {
  return <p>{text} {value}</p>
}
const Stats = ({ stats }) => {
  const total = () => {
    let total = 0
    for (const stat of stats) {
      total += stat.value
    }
    return total
  }
  const average = (total) => {
    let average = 0
    for (const stat of stats) {
      average += stat.value * stat.score
    }
    if (total !== 0)
      average /= total
    else average = 0
    return average
  }

  const positive = (total) => {
    let positiveCount = 0
    for (const stat of stats) {
      if (stat.value * stat.score > 0) positiveCount = stat.value
    }
    return total === 0 ? '0 %' : positiveCount / total * 100 + ' %'
  }

  let feedbackCount = total()
  return <div>
    <Stat text={stats[0].text} value={stats[0].value} />
    <Stat text={stats[1].text} value={stats[1].value} />
    <Stat text={stats[2].text} value={stats[2].value} />
    <Stat text='all' value={feedbackCount} />
    <Stat text='average' value={average(feedbackCount)} />
    <Stat text='positive' value={positive(feedbackCount)} />
  </div>
}

const App = () => {
  const [goodCount, setGood] = useState(0)
  const [neutralCount, setNeutral] = useState(0)
  const [badCount, setBad] = useState(0)
  const handleClick = (handleClick, affectedValue) => {
    return () => { handleClick(affectedValue + 1) }
  }
  const buttonProperty = [
    { handleClick: handleClick(setGood, goodCount), text: 'good' },
    { handleClick: handleClick(setNeutral, neutralCount), text: 'neutral' },
    { handleClick: handleClick(setBad, badCount), text: 'bad' }
  ]
  const stats = [
    { text: 'good', value: goodCount, score: 1 },
    { text: 'neutral', value: neutralCount, score: 0 },
    { text: 'bad', value: badCount, score: -1 },
  ]

  return <div>
    <Title title='give feedback' />
    <Buttons buttonProperty={buttonProperty} />
    <Title title='statistics' />
    <Stats stats={stats} />
  </div>
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

