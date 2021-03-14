import React from 'react'
import { Route } from 'react-router-dom'
import HomePage from './pages/Home/Home'
import AddMoviePage from './pages/AddMovie/AddMovie'

const App = props => {
    return (
        <React.Fragment>
            <main>
                <Route path='/' component={HomePage} exact />
                <Route path='/add-movie' component={AddMoviePage} />
            </main>
        </React.Fragment>
    )
}

export default App