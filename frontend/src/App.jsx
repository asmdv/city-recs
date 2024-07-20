import { useState } from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import { ChakraProvider, useToast } from "@chakra-ui/react";
import './App.css'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Quiz from './components/Quiz'
import History from './components/History'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar />
      <div>
        <Routes>
          {/* Add more routes as needed */}
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </div>
    </>
  )
}

export default App
