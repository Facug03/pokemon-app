/* eslint-disable react/jsx-closing-tag-location */
import styles from './Pagination.module.css'

export default function Pagination ({ page, currentPage, pokemons, pokemonsFiltered, handlePage, prevPage, nextPage }) {
  return (
    <>
      {(pokemons > 0 && pokemonsFiltered === 0) &&
        <div className={styles.button}>
          {currentPage !== 0 ? <button className={styles.buttonprev} onClick={prevPage}>{'<'}</button> : <div className={styles.nobutton} />}
          <div className={styles.pages}>
            <button
              className={`${styles.pagesbutton} ${(page.current === page.show - 4) && styles.current}`}
              onClick={() => handlePage(page.show - 5)}
            >{page.show - 4}</button>
            <button
              className={`${styles.pagesbutton} ${(page.current === page.show - 3) && styles.current} ${(Math.ceil(pokemons / 12) < page.show - 3) && styles.active}`}
              onClick={() => handlePage(page.show - 4)}
            >{page.show - 3}</button>
            <button
              className={`${styles.pagesbutton} ${(page.current === page.show - 2) && styles.current} ${(Math.ceil(pokemons / 12) < page.show - 2) && styles.active}`}
              onClick={() => handlePage(page.show - 3)}
            >{page.show - 2}</button>
            <button
              className={`${styles.pagesbutton} ${(page.current === page.show - 1) && styles.current} ${(Math.ceil(pokemons / 12) < page.show - 1) && styles.active}`}
              onClick={() => handlePage(page.show - 2)}
            >{page.show - 1}</button>
            <button
              className={`${styles.pagesbutton} ${(page.current === page.show) && styles.current} ${(Math.ceil(pokemons / 12) < page.show) && styles.active}`}
              onClick={() => handlePage(page.show - 1)}
            >{page.show}</button>
          </div>
          {currentPage + 12 < pokemons ? <button className={styles.buttonnext} onClick={() => nextPage(currentPage)}>{'>'}</button> : <div className={styles.nobutton} />}
        </div>}
      {pokemonsFiltered > 0 &&
        <div className={styles.button}>
          {currentPage !== 0 ? <button className={styles.buttonprev} onClick={prevPage}>{'<'}</button> : <div className={styles.nobutton} />}
          <div className={styles.pages}>
            <button
              className={`${styles.pagesbutton} ${(page.current === page.show - 4) && styles.current}`}
              onClick={() => handlePage(page.show - 5)}
            >{page.show - 4}</button>
            <button
              className={`${styles.pagesbutton} ${(page.current === page.show - 3) && styles.current} ${(Math.ceil(pokemonsFiltered / 12) < page.show - 3) && styles.active}`}
              onClick={() => handlePage(page.show - 4)}
            >{page.show - 3}</button>
            <button
              className={`${styles.pagesbutton} ${(page.current === page.show - 2) && styles.current} ${(Math.ceil(pokemonsFiltered / 12) < page.show - 2) && styles.active}`}
              onClick={() => handlePage(page.show - 3)}
            >{page.show - 2}</button>
            <button
              className={`${styles.pagesbutton} ${(page.current === page.show - 1) && styles.current} ${(Math.ceil(pokemonsFiltered / 12) < page.show - 1) && styles.active}`}
              onClick={() => handlePage(page.show - 2)}
            >{page.show - 1}</button>
            <button
              className={`${styles.pagesbutton} ${(page.current === page.show) && styles.current} ${(Math.ceil(pokemonsFiltered / 12) < page.show) && styles.active}`}
              onClick={() => handlePage(page.show - 1)}
            >{page.show}</button>
          </div>
          {currentPage + 12 < pokemonsFiltered ? <button className={styles.buttonnext} onClick={nextPage}>{'>'}</button> : <div className={styles.nobutton} />}
        </div>}
    </>
  )
}
