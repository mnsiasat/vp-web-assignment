import React from 'react'
import classes from './Movie.module.scss'

const Movie = ({
                   image,
                   title,
                   comment,
                   onToggle
               }) => {

    return (
        <div className={classes.movie}>
            <div>
                <img src={image} height='100px' alt='IMAGE NOT AVAILABLE'/>
            </div>
            <div>
                <input type='button' value={title} onClick={() => onToggle({title, comment, image})}/>
                <br/>
                <span>
                  {comment}
                </span>
            </div>
        </div>
    )
}

export default Movie