import React from 'react'

const Notification = ({ message, isError }) => {

    const errorStyle = {
        padding: 10,
        borderStyle: 'dotted',
        borderRadius: 30,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 20,

        color: 'red',
        backgroundColor: 'white'
    }
    const successStyle = {
        padding: 10,
        borderStyle: 'solid',
        borderRadius: 15,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 20,

        color: 'green',
        backgroundColor: 'white'
    }
    if (message !== null) {
        if (isError) {
            return <div className='error' style={errorStyle}>
                <p> {message} </p>
            </div>
        } else {
            return <div className='success' style={successStyle}>
                <p> {message} </p>
            </div>
        }
    } else {
        return null
    }
}

export default Notification