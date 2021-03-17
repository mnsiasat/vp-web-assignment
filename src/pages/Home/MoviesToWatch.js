import React, {useEffect, useMemo, useReducer} from 'react'
import useHttp from "../../hooks/http";
import Movies from "../../components/Movies/Movies";

const moviesReducer = (allMovies, action) => {
    switch (action.type) {
        case 'GET_ALL':
            return action.movies
        default:
            throw new Error('Invalid action.type!')
    }
}

const MoviesToWatch = props => {
    const [allMovies, dispatch] = useReducer(moviesReducer, [])
    const {
        isLoading,
        error,
        data,
        sendRequest,
        reqExtra,
        reqIdentifer,
        clear
    } = useHttp()

    //url, method, body, reqExtra, reqIdentifer
    useEffect(() => {
        //url, method, body, reqExtra, reqIdentifer
        sendRequest(
            `${process.env.REACT_APP_API_URL}/movies`,
            'GET',
            null,
            null,
            'GET_ALL_MOVIES'
        )
    }, [sendRequest])

    useEffect(() => {
        if (!isLoading && !error && reqIdentifer === 'GET_ALL_MOVIES') {
            dispatch({type: 'GET_ALL', movies: data})
        }
    }, [data, reqExtra, reqIdentifer, isLoading, error])

    const handleAddToWatchedMovies = () => {

    }

    return (<Movies category='Watchlist' list={allMovies} onToggleItem={handleAddToWatchedMovies}/>)
}

export default MoviesToWatch