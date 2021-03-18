import React, {useReducer, useState, useEffect} from 'react'
import classes from './MovieBoard.module.scss'
import MoviesToWatch from './MoviesToWatch'
import WatchedMovies from './WatchedMovies'
import Modal from '../../components/Modal/Modal'
import AddMovieForm from '../../components/AddMovieForm/AddMovieForm'
import {DASHBOARD_ACTIONS} from '../../constants'
import useHttp from '../../hooks/http'


const dashboardReducer = (updateDashboard, action) => {
    switch (action.type) {
        case 'UPDATE':
            return action.updateDashboard
        default:
            throw new Error('Invalid action.type for dashboardReducer!')
    }
}

const MovieBoard = props => {
    const [showAddMovieModal, setShowAddMovieModal] = useState(false)
    const [updateDashboard, dispatch] = useReducer(dashboardReducer, '')

    const {
        isLoading,
        error,
        data,
        sendRequest,
        reqExtra,
        reqIdentifer,
    } = useHttp()

    useEffect(() => {
        if (!isLoading && !error && reqIdentifer === 'UPDATE_DASHBOARD') {
            dispatch({type: 'UPDATE', updateDashboard: reqExtra})
        }
    }, [data, reqExtra, reqIdentifer, isLoading, error])

    const toggleShowAddMovie = () => {
        setShowAddMovieModal(!showAddMovieModal)
    }

    const addNewMovieHandler = (event) => {
        const formData = new FormData(event.target)
        event.preventDefault()
        const newMovie = Object.fromEntries(formData.entries())

       sendRequest(
            `${process.env.REACT_APP_API_URL}/movies`,
            'POST',
            JSON.stringify(newMovie),
            `${DASHBOARD_ACTIONS.ADDED_NEW_MOVIE}:${newMovie.title}`,
            'UPDATE_DASHBOARD'
        )
        toggleShowAddMovie()
    }

    const updateMovieListsHandler = (action) => {
        if(action.includes(DASHBOARD_ACTIONS.ADDED_TO_WATCHED)){
            dispatch({type: 'UPDATE', updateDashboard: action})
        }
    }

    return (
        <div className={classes.Home}>
            <h1>Codest Movies!</h1>
            <button onClick={toggleShowAddMovie}>Add Movie To Watchlist</button>
            <Modal show={showAddMovieModal}><AddMovieForm onSubmit={addNewMovieHandler} onCancel={toggleShowAddMovie}></AddMovieForm></Modal>
            <MoviesToWatch dashboardUpdate={updateDashboard} onNotifyUpdate={updateMovieListsHandler}/>
            <WatchedMovies dashboardUpdate={updateDashboard}/>
        </div>
    )
}
export default MovieBoard