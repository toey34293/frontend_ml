import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'antd/dist/antd.dark.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <Suspense fallback={<div className="loading"/>}>
        <App/>
    </Suspense>
)
