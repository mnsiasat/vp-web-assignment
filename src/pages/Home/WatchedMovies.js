import React, {useEffect, useReducer} from 'react'
import Movies from "../../components/Movies/Movies"
import useHttp from "../../hooks/http"
import {MOVIE_ACTIONS} from "../../constants";

const moviesReducer = (watchedMovies, action) => {
    switch (action.type) {
        case 'GET_WATCHED':
            return action.movies
        case 'UPDATE':
            return watchedMovies.filter(mov => mov.id !== action.movie.id)
        default:
            throw new Error('Invalid action.type!')
    }
}

const WatchedMovies = ({
     onNotifyUpdate,
     addedToWatchedList
 }) => {

    const [watchedMovies, dispatch] = useReducer(moviesReducer, [])
    const {
        isLoading,
        error,
        data,
        sendRequest,
        reqExtra,
        reqIdentifer,
    } = useHttp()

    useEffect(() => {

        //url, method, body, reqExtra, reqIdentifer
        sendRequest(
            `${process.env.REACT_APP_API_URL}/movies/watched`,
            'GET',
            null,
            null,
            'GET_WATCHED_MOVIES'
        )
    }, [sendRequest,addedToWatchedList])

    useEffect(() => {
        if (!isLoading && !error) {
            if (reqIdentifer === 'GET_WATCHED_MOVIES') {
                dispatch({type: 'GET_WATCHED', movies: data})
            }
            if (reqIdentifer === 'UPDATE_MOVIE') {
                dispatch({type: 'UPDATE', movie: data})
            }
        }
    }, [data, reqExtra, reqIdentifer, isLoading, error])

    const removeFromWatchedMoviesHandler = (movie) => {
        sendRequest(
            `${process.env.REACT_APP_API_URL}/movies/${movie.id}`,
            'PUT',
            JSON.stringify({watched: false}),
            movie,
            'UPDATE_MOVIE'
        )
        onNotifyUpdate(MOVIE_ACTIONS.REMOVED_FROM_WATCHED_LIST)
    }

    return (<Movies category='Already Watched' list={watchedMovies} onToggleItem={removeFromWatchedMoviesHandler}/>)

}

export default WatchedMovies