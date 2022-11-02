import Main from './components/Main'
import Nav from './components/Nav'
import Create from './components/Create'
import Footer from './components/Footer'
import { Route, Routes } from 'react-router-dom'
import { usePokemon } from './hooks/usePokemon'

function App () {
  usePokemon()

  return (
    <>
      <Nav />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/create' element={<Create />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
