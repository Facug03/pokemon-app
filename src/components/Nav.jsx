/* eslint-disable react/jsx-closing-tag-location */
import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { resetPage, searchPokemon } from '../redux/slice'
import styles from './Nav.module.css'
import img from '../img/poke-ball.png'
import logo from '../img/Pokedex.png'

export default function Nav () {
  const location = useLocation()
  const dispatch = useDispatch()
  const [current, setCurrent] = useState(false)
  const [search, setSearch] = useState('')

  if (location.pathname === '/create' && !current) {
    setCurrent(true)
  } else if (location.pathname === '/' && current) {
    setCurrent(false)
  }

  const handleChange = e => {
    dispatch(resetPage(true))
    setSearch(e.target.value)
    if (e.target.value.length < 10) {
      dispatch(searchPokemon(e.target.value))
    }
  }

  return (
    <nav className={styles.nav}>
      <Link to='/'>
        <div className={styles.logo}>
          <img className={styles.image} src={img} alt='pokemon' />
          <img className={styles.title} src={logo} alt='logo' />
        </div>
      </Link>
      <form className={styles.searchbar} onSubmit={(e) => e.preventDefault()}>
        <input value={search} onChange={e => handleChange(e)} placeholder='Search Pokemon...' className={styles.search} type='text' />
        <input onClick={(e) => handleChange(e)} type='submit' className={styles.searchicon} />
        {search.length !== 0 &&
          <svg
            onClick={() => {
              setSearch('')
              dispatch(searchPokemon(''))
            }} viewBox='0 0 24 24' className={styles.clean} focusable='false'
          ><g><path d='M12.7,12l6.6,6.6l-0.7,0.7L12,12.7l-6.6,6.6l-0.7-0.7l6.6-6.6L4.6,5.4l0.7-0.7l6.6,6.6l6.6-6.6l0.7,0.7L12.7,12z' /></g></svg>}
      </form>

      <div className={styles.create}>
        <div className={styles.camera}>
          <div className={styles.ligth} />
        </div>
        <div className={styles.buttoncolor}>
          <div className={!current ? styles.colors : styles.current}>
            <div className={styles.red} />
            <div className={styles.yellow} />
            <div className={styles.green} />
          </div>
          {!current
            ? <div>
              <Link to='/create'>
                <button className={styles.createpoke}>Create Pokemon</button>
              </Link>
            </div>
            : null}
        </div>
      </div>
    </nav>
  )
}
