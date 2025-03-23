import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Result from './components/Result'
import Generate from './components/Generate'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Generate />
    </>
  )
}

export default App
