import React from 'react'
import classes from './AddMovieForm.module.scss'

const AddMovieForm = ({
    onSubmit,
    onCancel,
 }) => {

    return (
        <div className={classes.addMovie}>
            <h3>ADD MOVIE</h3>
            <form name="addMovie" onSubmit={onSubmit}>
                <input type="text" name="title" placeholder="Title"/>
                <input type="text" name="image" placeholder="Image URL"/>
                <input type="text" name="comment" placeholder="Comment"/>
                <button type="submit">SUBMIT</button>
                <button onClick={onCancel}>CANCEL</button>
            </form>
        </div>
    )
}

export default AddMovieForm