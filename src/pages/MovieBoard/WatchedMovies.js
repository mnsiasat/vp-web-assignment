import React, {useEffect, useReducer, useCallback} from 'react'
import Movies from "../../components/Movies/Movies"
import useHttp from "../../hooks/http"
import {DASHBOARD_ACTIONS} from "../../constants";

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
     dashboardUpdate,
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
        //Invoke if sendRequest changed, or if dashboardUpdate changed and value is ADDED_TO_WATCHED
        if(!dashboardUpdate || ( dashboardUpdate && dashboardUpdate.includes(DASHBOARD_ACTIONS.ADDED_TO_WATCHED))){

            sendRequest(
                `${process.env.REACT_APP_API_URL}/movies/watched`,
                'GET',
                null,
                null,
                'GET_WATCHED_MOVIES'
            )
        }
    }, [sendRequest,dashboardUpdate])

    useEffect(() => {
        if (!isLoading && !error) {
            if (reqIdentifer === 'GET_WATCHED_MOVIES') {
                dispatch({type: 'GET_WATCHED', movies: data})
            }else if (reqIdentifer === 'UPDATE_MOVIE') {
                dispatch({type: 'UPDATE', movie: data})
            }
        }
    }, [data, reqExtra, reqIdentifer, isLoading, error])

    const removeFromWatchedMoviesHandler = useCallback(movie => {
        sendRequest(
            `${process.env.REACT_APP_API_URL}/movies/${movie.id}`,
            'PUT',
            JSON.stringify({watched: false}),
            movie,
            'UPDATE_MOVIE'
        )
    },[sendRequest])

    return (<Movies category='Already Watched' list={watchedMovies} onToggleItem={removeFromWatchedMoviesHandler}/>)

}

export default WatchedMovies