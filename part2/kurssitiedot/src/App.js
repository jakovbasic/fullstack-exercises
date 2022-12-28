const Header = (props) => {
  return (
    <div>
      <p>{props.course}</p>
    </div>
  )
}

const Part = (props) => {
return (
    <li>{props.name} {props.exercise}</li>
)
}

const Content = ({parts}) => {
return (
  <div>
    <ul>
        {parts.map(part => 
          <Part key={part.id} name={part.name} exercise={part.exercises} />
        )}
    </ul>
  </div>
)
}

const Course = (props) => {
  return(
    <div>
      <Header course = {props.course.name} />
      <Content parts = {props.course.parts} />
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