import React from 'react'
import { Route } from 'react-router-dom'
import HomePage from './pages/Home/Home'

const App = props => {
    return (
        <React.Fragment>
            <main>
                <Route path='/' component={HomePage} exact />
            </main>
        </React.Fragment>
    )
}

export default App