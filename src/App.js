import React from 'react'
import { Route } from 'react-router-dom'
import MovieBoard from './pages/MovieBoard/MovieBoard'

const App = props => {
    return (
        <React.Fragment>
            <main>
                <Route path='/' component={MovieBoard} exact />
            </main>
        </React.Fragment>
    )
}

export default App