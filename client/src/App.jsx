
import React from 'react'
import './App.css'
import Header from './components/Header'
import Home from './components/Home'
import { Route, Routes } from 'react-router-dom'
import Todo from './components/Todo'

function App() {

  return (
    <React.Fragment>
      <Header/>
      <Routes>
        <Route path='/' element = {<Home/>} />
        <Route path='/todo' element = {<Todo/>} />
      </Routes>
    </React.Fragment>
  )
}

export default App
