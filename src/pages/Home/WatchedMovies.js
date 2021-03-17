import React, {useEffect, useMemo, useReducer} from 'react'
import Movies from "../../components/Movies/Movies";
import useHttp from "../../hooks/http";

const moviesReducer = (watchedMovies, action) => {
    switch (action.type) {
        case 'GET_WATCHED':
            return action.movies
        default:
            throw new Error('Invalid action.type!')
    }
}

const WatchedMovies = props => {
    const [watchedMovies, dispatch] = useReducer(moviesReducer, [])
    const {
        isLoading,
        error,
        data,
        sendRequest,
        reqExtra,
        reqIdentifer,
        clear
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
    }, [sendRequest])

    useEffect(() => {
        if (!isLoading && !error && reqIdentifer === 'GET_WATCHED_MOVIES') {
            dispatch({type: 'GET_WATCHED', movies: data})
        }
    }, [data, reqExtra, reqIdentifer, isLoading, error])

    const handleRemoveFromWatchedMovies = () => {

    }

    return(<Movies category='Already Watched' list={watchedMovies} onToggleItem={handleRemoveFromWatchedMovies}/>)

}

export default WatchedMovies