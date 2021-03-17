import React from 'react'
import Movie from './Movie/Movie'
import classes from './Movies.module.scss'

const Movies = ({category, list: movies, onToggleItem}) => {
    return (
        <div className={classes.movies}>
            <h1>{category}: </h1>
            <ul className='gradient-list'>
                {movies.map((item, index) => (
                    <li key={index}>
                        <Movie id={item.id}
                               title={item.title}
                               image={item.image}
                               comment={item.comment}
                               watched={item.watched}
                               onToggle={onToggleItem}
                        />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Movies