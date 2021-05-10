
import Task from './Task'

const Tasks = (props) => {
    //This is how you change the state as direct tasks.push will not work
    //Since state is immutable
    // setTasks([...tasks, {id:4, text: 'randon', day: 'Mar 2 @ 4:00 PM', reminder: false}])
    return (
        <>
            {props.tasks.map((task) => (
                // <h3 key={task.id}>{task.text}</h3>
                <Task key={task.id} task={task} onDelete={props.onDelete} onToggle={props.onToggle} />
            ))}
        </>
    )
}

export default Tasks

//external data
// const tasks = [
//     {
//         id: 1,
//         text: 'doctor appointment',
//         day: 'Feb 5th @ 1:00 PM',
//         reminder: true
//     },
//     {
//         id: 2,
//         text: 'interview',
//         day: 'Feb 6th @ 11:00 AM',
//         reminder: true
//     },
//     {
//         id: 3,
//         text: 'Shopping',
//         day: 'Feb 7th @ 10:00 AM',
//         reminder: false
//     }
// ]