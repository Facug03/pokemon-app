import { useState, useEffect } from "react";
import PokeCard from "./PokeCard";
import Loading from "./Loading";
import Filter from "./Filter";
import styles from "./Main.module.css";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "./Pagination";
import { resetPage } from "../redux/slice";

export default function Main() {
  const pokemons = useSelector((state) => state.pokemon.pokemons);
  const pokemonsFiltered = useSelector(
    (state) => state.pokemon.pokemonsFiltered
  );
  const reset = useSelector((state) => state.pokemon.reset);
  const [page, setPage] = useState({ current: 1, show: 5 });
  const [currentPage, setCurrentPage] = useState(0);
  const dispatch = useDispatch();
  console.log(pokemons);
  const filteredPokemons = (num) => {
    if (num) {
      if (pokemonsFiltered.length !== 0) {
        return pokemonsFiltered.slice(currentPage, currentPage + 12);
      } else {
        return pokemons.slice(currentPage, currentPage + 12);
      }
    }
    if (pokemonsFiltered.length !== 0) {
      return pokemonsFiltered.slice(currentPage, currentPage + 12);
    }
    return pokemons.slice(currentPage, currentPage + 12);
  };

  useEffect(() => {
    if (reset) {
      setCurrentPage(0);
      setPage({ ...page, current: 1, show: 5 });
      dispatch(resetPage(false));
    }
  }, [reset, page, dispatch]);

  const nextPage = () => {
    if (currentPage + 12 < pokemons.length) {
      setCurrentPage(currentPage + 12);
      if (page.current % 5 === 0)
        setPage({ ...page, show: page.show + 5, current: page.current + 1 });
      else setPage({ ...page, current: page.current + 1 });
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 12);
      if ((page.current - 1) % 5 === 0)
        setPage({ ...page, show: page.show - 5, current: page.current - 1 });
      else setPage({ ...page, current: page.current - 1 });
    }
  };

  const handlePage = (num) => {
    setPage({ ...page, current: num + 1 });
    setCurrentPage(num * 12);
  };

  return (
    <div className={styles.main}>
      <Filter />
      <div className={styles.mid} />
      <section className={styles.card}>
        {filteredPokemons().map((poke) => (
          <PokeCard
            key={poke.id}
            id={poke.id}
            name={poke.name}
            types={poke.types}
            filter={poke.filter}
            hp={poke.hp}
            attack={poke.attack}
            defense={poke.defense}
            specialAt={poke.specialAt}
            specialDef={poke.specialDef}
            speed={poke.speed}
            url={poke.url}
            created={poke.created}
            search={poke.search}
          />
        ))}
        {pokemons.length === 0 && <Loading />}
        <Pagination
          currentPage={currentPage}
          pokemons={pokemons.length}
          pokemonsFiltered={pokemonsFiltered.length}
          filteredPokemons={filteredPokemons}
          nextPage={nextPage}
          prevPage={prevPage}
          handlePage={handlePage}
          page={page}
        />
      </section>
    </div>
  );
}
