import React, {useMemo} from 'react'
import Movie from './Movie/Movie'
import classes from './Movies.module.scss'

const Movies = ({category, list: movies, onToggleItem, isLoading}) => {

    const movieCards = useMemo(() => {
        return (
            <ul className='gradient-list'>
                {movies.map((item, index) => (
                        <li key={index}>
                            <Movie
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                comment={item.comment}
                                watched={item.watched}
                                onToggle={onToggleItem}
                            />
                        </li>
                    )
                )}
            </ul>
        );
    }, [movies,onToggleItem]);

    if (!!isLoading) {
        return (
            <div className={classes.movies}>
                <h1>{category}: </h1>
                <span>Loading...</span>
            </div>)
    }

    return (
        <div className={classes.movies}>
            <h1>{category}: </h1>
            {movies && movies.length>0 && movieCards}
        </div>
    )
}

export default Movies