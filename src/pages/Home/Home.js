import React from 'react'
import {addWatchedMovie, getAllMovies, getWatchedMovies, removeWatchedMovie} from '../../api'
import Movies from '../../components/Movies/Movies'
import classes from './Home.module.scss'

const Home = props => {
    //TODO: replace with call to backend
    const allMovies = getAllMovies()
    const watchedMovies = getWatchedMovies()

    return (
        <div className={classes.Home}>
            <h1>Codest Movies!</h1>
            <Movies category='Watchlist' list={allMovies} onToggleItem={addWatchedMovie}></Movies>
            <Movies category='Already watched' list={watchedMovies} onToggleItem={removeWatchedMovie}></Movies>
        </div>
    )
}

export default Home
