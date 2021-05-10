import React from 'react'
import {useLocation} from 'react-router-dom'
import PropTypes from 'prop-types'
import Button from "./Button"

//CSS in JS
const heading5Style = {
    color: 'white', backgroundColor: '#ccc', padding: 3
}


    const Header = (props) => {

    //To hide header button when on different path - router
    const location = useLocation()

    const onTopAddClickInParent = (e) => {
        console.log('F defined in consumer')
    }

    return (
        <header className="header">
            <h1>{props.title} ({props.total})</h1>
            <h5 className='headerVersion' style={heading5Style}>V {props.version}</h5>
            {location.pathname === '/' &&  (<Button 
                //color='green'
                color={props.showAdd ? 'red' : 'green'} 
                //text='Add'
                text={props.showAdd ? 'Close' : 'Add'} 
                //onClick={onTopAddClickInParent} 
                onClick={props.onAdd}
            />)}
        </header>
    )
}

//default props
Header.defaultProps = {
    version: 0.9,
    title: "Task Tracker"
}

//Static Types - This is optional
Header.propTypes = {
    version: PropTypes.number,
    title: PropTypes.string.isRequired,
}

export default Header


// //CSS in JS
// const heading5Style = {
//     color: 'white', backgroundColor: 'green'
// }

// const Header = (props) => {
//     return (
//         <header>
//             <h1 style={{color: 'red', backgroundColor: 'black'}}>{props.title}</h1>
//             <h5 style={heading5Style}>{props.version}</h5>
//         </header>
//     )
// }