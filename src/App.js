import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'

// import store
import store from './public/redux/store'

// import component
import Main from './hiring/Main'

function App() {
  return (
    <>
      <Main />
    </>
  )
}

function Root(){
  return(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  )
}


export default Root
