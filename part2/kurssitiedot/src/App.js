const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Part = (props) => {
return (
    <div>
      {props.name} {props.exercises}
    </div>
  )
}

const Content = ({parts}) => {
return (
  <div>
        {parts.map(part => 
          <Part key={part.id} name={part.name} exercises={part.exercises} />
        )}
  </div>
)
}

const Total = ({parts}) => {
  const exercises = parts.map(part => part.exercises)
  const total = exercises.reduce( (s, p) => {
    console.log('what is happening', s, p)
    return s + p
  })

  return (
    <div>
      <h4>Total of {total} exercises</h4>
    </div>
  )
}

const Course = (props) => {
  return(
    <div>
      <Header course = {props.course.name} />
      <Content parts = {props.course.parts} />
      <Total parts = {props.course.parts} />
    </div>
  )
}


const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}
export default App