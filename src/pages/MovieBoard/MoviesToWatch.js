import React, {useEffect, useReducer} from 'react'
import useHttp from "../../hooks/http"
import Movies from "../../components/Movies/Movies"
import {MOVIE_ACTIONS} from "../../constants";

const moviesReducer = (allMovies, action) => {
    switch (action.type) {
        case 'GET_ALL':
            return action.movies
        case 'UPDATE':
            return allMovies && allMovies.map(mov => {
                if (mov.id === action.movie.id) {
                    return action.movie
                }
                return mov
            })
        default:
            throw new Error('Invalid action.type!')
    }
}

const MoviesToWatch = ({
    onNotifyUpdate,
    newMovieAdded,
}) => {
    const [allMovies, dispatch] = useReducer(moviesReducer, [])
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
            `${process.env.REACT_APP_API_URL}/movies`,
            'GET',
            null,
            null,
            'GET_ALL_MOVIES'
        )
    }, [sendRequest,newMovieAdded])

    useEffect(() => {
        if (!isLoading && !error) {
            if (reqIdentifer === 'GET_ALL_MOVIES') {
                dispatch({type: 'GET_ALL', movies: data})
            }
            if (reqIdentifer === 'UPDATE_MOVIE') {
                dispatch({type: 'UPDATE', movie: data})
            }
        }
    }, [data, reqExtra, reqIdentifer, isLoading, error])

    const addToWatchedMoviesHandler = (movie) => {
        sendRequest(
            `${process.env.REACT_APP_API_URL}/movies/${movie.id}`,
            'PUT',
            JSON.stringify({watched: true}),
            movie,
            'UPDATE_MOVIE'
        )
        onNotifyUpdate(MOVIE_ACTIONS.ADDED_TO_WATCHED_LIST)
    }

    return (
        <Movies category='Watchlist' isLoading={isLoading} list={allMovies} onToggleItem={addToWatchedMoviesHandler}/>)
}

export default MoviesToWatch