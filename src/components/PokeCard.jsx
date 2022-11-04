import { useState } from 'react'
import Pokemon from './Pokemon'
import styles from './PokeCard.module.css'
import { typeColor, typeText } from '../helpers/colorType'
import image from '../img/not-found.png'

export default function PokeCard ({
  id,
  name,
  types,
  filter,
  hp,
  attack,
  defense,
  specialAt,
  specialDef,
  speed,
  url,
  created,
  search
}) {
  const [modal, setModal] = useState(false)
  const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${id}.gif`
  let idPoke = ''

  if (id.toString().length === 1) {
    idPoke = `N.º 00${id}`
  } else if (id.toString().length === 2) {
    idPoke = `N.º 0${id}`
  } else {
    idPoke = `N.º ${id}`
  }

  if (filter) {
    return (
      <div className={styles.notfound}>
        <img className={styles.imfound} src={image} alt='not-found' />
        <div className={styles.notfoundtitle}>
          {filter}
          {search && (
            <ul className={styles.listul}>
              <li className={styles.list}>Look if you wrote it rigth</li>
              <li className={styles.list}>Try with another word</li>
            </ul>
          )}
        </div>
      </div>
    )
  }
  return (
    <>
      <div className={styles.cardcontainer}>
        <div className={styles.pokecard}>
          <div className={styles.detailright} />
          <div className={styles.detailleft} />
          <img
            onClick={() => setModal(true)}
            className={styles.imagepoke}
            src={url || img}
            alt='pokemon'
          />
        </div>
        <div className={styles.middledetail}>
          <hr />
          <hr />
          <hr />
        </div>
        <div className={styles.data}>
          <span onClick={() => setModal(true)} className={styles.idpoke}>
            {!created ? idPoke : null}
          </span>
          <h3 onClick={() => setModal(true)} className={styles.namepoke}>
            {name}
          </h3>
          <div className={styles.types}>
            <span
              style={{
                backgroundColor: typeColor[types[0]],
                color: typeText[types[0]]
              }}
              className={styles.type}
            >
              {types[0]}
            </span>
            {types[1] && (
              <span
                style={{
                  backgroundColor: typeColor[types[1]],
                  color: typeText[types[1]]
                }}
                className={styles.type2}
              >
                {types[1]}
              </span>
            )}
          </div>
        </div>
      </div>
      <Pokemon
        color={typeColor[types[0]]}
        id={id}
        idPoke={idPoke}
        name={name}
        img={img}
        modal={modal}
        setModal={setModal}
        hp={hp}
        attack={attack}
        defense={defense}
        specialAt={specialAt}
        specialDef={specialDef}
        speed={speed}
        url={url}
        created={created}
      />
    </>
  )
}
