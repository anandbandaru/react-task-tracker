import React from 'react'
import PropTypes from 'prop-types'


const Button = ({color, text, onClick}) => {

    //This is now not used as parent consumer is passing in the functuion
    const topAddClick = (e) => {
        console.log('F defined in component')
    }

    return (
        <button style={{backgroundColor:color}} 
            onClick={onClick}
            className='btn'>
                {text}
        </button>
    )
}

Button.defaultProps = {
    color: 'steelblue'
}

Button.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func
}

export default Button
