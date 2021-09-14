import React, { useState } from 'react'

const AnecdoteMostVotes = (props) => {
  return (
    <h1>Anecdote with most votes</h1>,
    <p>{props.anecedote}</p>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState(0)

  const initPoints = Array(anecdotes.length).fill(0)
  const [points, setPoints] = useState(initPoints)

  const [maxPoints, setMaxPoints] = useState(0)
  const [maxIndex, setMaxIndex] = useState(0)

  const handleNextClick = () => {
    const min = 0
    const max = 7
    const rand = Math.floor(Math.random() * (max - min) + min);
    setSelected(rand)
  }

  const handleVoteClick = () => {
    const copy = [...points]
    copy[selected] += 1
    if (copy[selected] > maxPoints) {
      setMaxPoints(copy[selected])
      setMaxIndex(selected)
    }
    setPoints(copy)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <button onClick={handleVoteClick}>vote</button>
      <button onClick={() => handleNextClick()}>next anecdote</button>
      <AnecdoteMostVotes anecedote={anecdotes[maxIndex]}/>
    </div>
  )
}

export default App