import React, {useEffect, useReducer, useCallback} from 'react'
import useHttp from "../../hooks/http"
import Movies from "../../components/Movies/Movies"
import {DASHBOARD_ACTIONS} from "../../constants";

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
                           dashboardUpdate,
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
        //Invoke if sendRequest changed, or if dashboardUpdate changed and value is ADDED_NEW_MOVIE
        if (!dashboardUpdate || (dashboardUpdate && dashboardUpdate.includes(DASHBOARD_ACTIONS.ADDED_NEW_MOVIE))) {
            sendRequest(
                `${process.env.REACT_APP_API_URL}/movies`,
                'GET',
                null,
                null,
                'GET_ALL_MOVIES'
            )
        }
    }, [sendRequest, dashboardUpdate])

    useEffect(() => {
        if (!isLoading && !error) {
            if (reqIdentifer === 'GET_ALL_MOVIES') {
                dispatch({type: 'GET_ALL', movies: data})
            }
            if (reqIdentifer === 'UPDATE_MOVIE') {
                dispatch({type: 'UPDATE', movie: data})
                onNotifyUpdate(`${DASHBOARD_ACTIONS.ADDED_TO_WATCHED}:${data.title}`)
            }
        }
    }, [data, reqExtra, reqIdentifer, isLoading, error])

    const addToWatchedMoviesHandler = useCallback(movie => {
        sendRequest(
            `${process.env.REACT_APP_API_URL}/movies/${movie.id}`,
            'PUT',
            JSON.stringify({watched: true}),
            movie,
            'UPDATE_MOVIE'
        )
    },[onNotifyUpdate,sendRequest])

    return (
        <Movies category='Watchlist' isLoading={isLoading} list={allMovies} onToggleItem={addToWatchedMoviesHandler}/>)
}

export default MoviesToWatch