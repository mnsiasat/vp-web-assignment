import React, {useEffect, useReducer, useState, useMemo} from 'react'
import Movies from '../../components/Movies/Movies'
import classes from './Home.module.scss'
import useHttp from "../../hooks/http"
import MoviesToWatch from "./MoviesToWatch"
import WatchedMovies from "./WatchedMovies";

const Home = props => {
    const [showAddMovieModal, setShowAddMovieModal] = useState(false)

    const toggleShowAddMovie = () => {
        setShowAddMovieModal(!showAddMovieModal)
    }

    return (
        <div className={classes.Home}>
            <h1>Codest Movies!</h1>
            <button onClick={toggleShowAddMovie}>Add Movie To Watchlist</button>
            <MoviesToWatch/>
            <WatchedMovies/>
        </div>
    )
}
export default Home