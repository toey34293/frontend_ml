import React, { Suspense } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HttpNotFound from './page/error/HttpNotFound'

const ViewMain = React.lazy(() => import('./page'))
const ViewApp = React.lazy(() => import('./page/app/HomePage'))

const App = (props) => {
    return (
        <Suspense fallback={<div className="loading"/>}>
            <Router>
                <Routes>
                    <Route path="*" element={<HttpNotFound {...props} />}/>
                    <Route exact path="/" element={<ViewMain {...props} />}/>
                    <Route exact path="/homepage" element={<ViewApp {...props} />}/>
                </Routes>
            </Router>
        </Suspense>
    )
}

export default App
