import React, {useState, useEffect} from 'react'
import {add, addWatchedMovie, getAllMovies, getWatchedMovies, removeWatchedMovie} from '../../api'
import Movies from '../../components/Movies/Movies'
import Modal from '../../components/Modal/Modal'
import classes from './Home.module.scss'
import AddMovieForm from "../../components/AddMovieForm/AddMovieForm";

const Home = props => {
    //TODO: replace with call to backend
    const allMovies = getAllMovies()
    const [watchedMovies, setWatchedMovies] = useState(getWatchedMovies())
    const [showAddMovieModal, setShowAddMovieModal] = useState(false)

    const handleAddToWatchedMovies = ({
          title,
          comment,
          image
      }) => {
        addWatchedMovie({
            title,
            comment,
            image
        })
        const results = getWatchedMovies()
        setWatchedMovies(results)
    }

    const handleRemoveFromWatchedMovies = ({title}) => {
        removeWatchedMovie(title)
        const results = getWatchedMovies()
        setWatchedMovies(results)
    }

    const toggleShowAddMovie = () => {
        setShowAddMovieModal(!showAddMovieModal)
    }

    const handleAddMovieToWatchList = (event) => {
        const formData = new FormData(event.target)
        event.preventDefault()
        add(Object.fromEntries(formData.entries()))
        toggleShowAddMovie()
    }

    return (
        <div className={classes.Home}>
            <h1>Codest Movies!</h1>
            <button onClick={toggleShowAddMovie}>Add Movie To Watchlist</button>
            <Modal show={showAddMovieModal}><AddMovieForm onSubmit={handleAddMovieToWatchList} onCancel={toggleShowAddMovie}></AddMovieForm></Modal>
            <Movies category='Watchlist' list={allMovies} onToggleItem={handleAddToWatchedMovies}></Movies>
            <Movies category='Already watched' list={watchedMovies} onToggleItem={handleRemoveFromWatchedMovies}></Movies>
        </div>
    )
}

export default Home
