import React from 'react'

const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <p>Number of exercises {sum}</p>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
    {parts.map(part =>
      <Part key={part.id} part={part} />
    )}
  </>

const Course = ({ course }) => {

  const getSum = () => {
    const sum = course.parts.reduce((prevVal, currVal) => prevVal + currVal.exercises, 0);
    return sum;
  }
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total sum={getSum()} />
    </>
  )
}

export default Course