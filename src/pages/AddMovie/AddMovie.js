import React from 'react'
import {add} from '../../api'
import classes from './AddMovie.module.scss'

const AddMovie = props => {

    return (
        <div className={classes.AddMovie}>
            <h1>Add movie!</h1>
            <b>TITLE:<br/><input type='text'/></b><br/>
            <b>IMAGE URL:<br/><input type='text'/></b><br/>
            <b>COMMENT:<br/><input type='text'/></b><br/>
            <input type='button' value='ADD MOVIE'/>
        </div>
    )
}

export default AddMovie