import React, { useState } from 'react'

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Heading = ({ heading }) => {
  return (
    <h1>{heading}</h1>
  )
}

const StatisticLine = ({ text, value }) => {
  if (text === 'positive') {
    return (
    <tbody>
      <tr>
        <td>{text}</td>
        <td>{value}%</td>
      </tr>
    </tbody>
    )
  }
  return (
    <tbody>
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    </tbody>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  const average = (good - bad) / all
  const positive = ((good / all) * 100)

  if (all === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <div>
      <Heading heading="statistics" />
      <table>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={all} />
        <StatisticLine text="average" value={average} />
        <StatisticLine text="positive" value={positive} />
      </table>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  return (
    <div>
      <Heading heading="give feedback" />
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App;
