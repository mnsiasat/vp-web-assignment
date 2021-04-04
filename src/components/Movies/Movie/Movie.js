import React from 'react'
import classes from './Movie.module.scss'

const Movie = ({   id,
                   image,
                   title,
                   comment,
                   watched,
                   onToggle
               }) => {

    return (
        <div className={classes.movie}>
            <div>
                <img src={image} height='100px'/>
            </div>
            <div>
                <input type='button' value={title} onClick={() => onToggle({id,title, comment, image, watched})}/>
                <br/>
                <span>
                  {comment}
                </span>
            </div>
        </div>
    )
}

export default Movie