import React, {useState, useMemo} from 'react'
import classes from './Home.module.scss'
import MoviesToWatch from "./MoviesToWatch"
import WatchedMovies from "./WatchedMovies"
import Modal from "../../components/Modal/Modal"
import AddMovieForm from "../../components/AddMovieForm/AddMovieForm"
import {MOVIE_ACTIONS} from "../../constants";
import useHttp from "../../hooks/http";

const Home = props => {
    const [showAddMovieModal, setShowAddMovieModal] = useState(false)
    const [addedToWatchedListCnt, setAddedToWatchedListCnt] = useState(0)
    const [addedNewMovieCnt, setAddedNewMovieCnt] = useState(0)

    const {
        sendRequest,
    } = useHttp()


    const toggleShowAddMovie = () => {
        setShowAddMovieModal(!showAddMovieModal)
    }

    const addNewMovieHandler = async (event) => {
        const formData = new FormData(event.target)
        event.preventDefault()
        const newMovie = Object.fromEntries(formData.entries())

       await sendRequest(
            `${process.env.REACT_APP_API_URL}/movies`,
            'POST',
            JSON.stringify(newMovie),
        )
        setAddedNewMovieCnt(addedNewMovieCnt+1)
        toggleShowAddMovie()
    }

    const updateMovieListsHandler = (action) => {
        if(action === MOVIE_ACTIONS.ADDED_TO_WATCHED_LIST){
            setAddedToWatchedListCnt(addedToWatchedListCnt+1)
        }
    }

    return (
        <div className={classes.Home}>
            <h1>Codest Movies!</h1>
            <button onClick={toggleShowAddMovie}>Add Movie To Watchlist</button>
            <Modal show={showAddMovieModal}><AddMovieForm onSubmit={addNewMovieHandler} onCancel={toggleShowAddMovie}></AddMovieForm></Modal>
            <MoviesToWatch newMovieAdded={addedNewMovieCnt} onNotifyUpdate={updateMovieListsHandler}/>
            <WatchedMovies addedToWatchedList={addedToWatchedListCnt} onNotifyUpdate={updateMovieListsHandler}/>
        </div>
    )
}
export default Home