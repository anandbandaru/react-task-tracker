import { React, useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from "./components/Header"
import './App.css';
import Tasks from "./components/Tasks"
import AddTask from "./components/AddTask"
import Footer from "./components/Footer"
import About from "./components/About"

function App() {

  // const name = "Anand";
  // const x = true;
  //  <h4>JSX code with Conditional {x ? "yes": "no"}</h4>

  //Now this is app level state - Gloal
  //Ideally use REDUX or CONTEXT API
  //NOw getting it from mock backend - json-server
  const [tasks, setTasks] = useState([])

  //For input form
  const [showAddTask, setShowAddTask] = useState(false);

  useEffect(() => {

    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer);
    }

    getTasks();
  }, [])


  //FETCH TASKS FROM BACKEND
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    console.log(data)
    return data;
  }

  //FETCH SINGLE TASK
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    console.log(data)
    return data;
  }

  //ADD TASK
  const addTask = async (task) => {
    console.log('add', task)
    console.log(JSON.stringify(task));

    //Below could have been done in AddTask C
    // const id = Math.floor(Math.random() * 10000) + 1
    // const newTask = {id, ...task}
    //setTasks([...tasks, newTask])

    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      header: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })

    const data = await res.json()

    setTasks([...tasks, data])
  }

  //DEELTE TASK
  const deleteTask = async (id) => {
    console.log('delete', id);

    //Calls the mock backend - Update the db.json
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    })

    setTasks(tasks.filter((task) => task.id !== id))
  }

  //TOGGLE REMINDER - DOUBLE CLICK
  const toggleReminder = async (id) => {
    console.log('toggle reminder', id);

    const taskToToggle = await fetchTask(id)
    const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      header: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updatedTask)
    })

    const data = await res.json()

    setTasks(tasks.map((task) => task.id === id
      ?
      {
        ...task,
        reminder:
          //!task.reminder
          data.reminder
      }
      :
      task
    ))
  }

  return (
    <Router>
      <div className="container">
        <Header
          version={2}
          title="Task Tracker App"
          total={tasks.length}
          onAdd={() => setShowAddTask(!showAddTask)}
          showAdd={showAddTask}
        />

        <Route path='/' exact render={(props) => (
          <>
            {showAddTask ? <AddTask onAdd={addTask} /> : ''}
            {tasks.length > 0
              ?
              <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
              :
              ('No tasks to show')
            }
          </>
        )} />
        <Route path='/about' component={About} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
