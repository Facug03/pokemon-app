import { useState } from 'react'
import { useOrder } from '../hooks/useOrder'
import styles from './Filter.module.css'
import img from '../img/filter.png'

export default function Filter () {
  const [show, setShow] = useState(false)
  const {
    type,
    order,
    ori,
    handleClose,
    handleOrder,
    handleType,
    handleOrigin
  } = useOrder()

  const handleShow = () => {
    if (!show) setShow(true)
    else setShow(false)
  }

  return (
    <>
      <div onClick={handleShow} className={`${show && styles.back}`}> </div>
      <div className={styles.filticon}>
        <img onClick={handleShow} className={styles.filtimg} src={img} alt='filter-icon' />
      </div>
      <section className={`${styles.filtro} ${show && styles.active}`}>
        <h2 className={styles.filtertitle}>Filter by</h2>
        {ori.value &&
          <div className={`${styles.show} ${styles.showorigin}`}>
            <span className={styles.filtershow}>
              {ori.text}
              <svg className={styles.iconx} onClick={() => handleClose('origin')}><path transform='translate(5 5)' fillOpacity='0.45' d='M8.594.552l.855.842L5.87 5.022 9.45 8.6l-.849.848-3.572-3.572-3.521 3.572-.855-.842L4.18 5.028.552 1.4l.849-.848 3.621 3.62L8.594.553z' /></svg>
            </span>
          </div>}
        {order.value &&
          <div className={`${styles.show} ${styles.showorder}`}>
            <span className={styles.filtershow}>
              {order.text}
              <svg className={styles.iconx} onClick={() => handleClose('order')}><path transform='translate(5 5)' fillOpacity='0.45' d='M8.594.552l.855.842L5.87 5.022 9.45 8.6l-.849.848-3.572-3.572-3.521 3.572-.855-.842L4.18 5.028.552 1.4l.849-.848 3.621 3.62L8.594.553z' /></svg>
            </span>
          </div>}
        {type.value &&
          <div className={`${styles.show} ${styles.showtype}`}>
            <span className={styles.filtershow}>
              {type.text}
              <svg className={styles.iconx} onClick={() => handleClose('type')}><path transform='translate(5 5)' fillOpacity='0.45' d='M8.594.552l.855.842L5.87 5.022 9.45 8.6l-.849.848-3.572-3.572-3.521 3.572-.855-.842L4.18 5.028.552 1.4l.849-.848 3.621 3.62L8.594.553z' /></svg>
            </span>
          </div>}
        {show && <hr className={styles.hr} />}
        <div className={styles.typefilter}>
          <h4 className={`${styles.typetitle} ${styles.origintitle}`}>Origin</h4>
          <div className={`${styles.originorder}`}>
            <span className={styles.orderorigin} onClick={(e) => handleOrigin(e.target.textContent)}>All</span>
            <span className={styles.orderorigin} onClick={(e) => handleOrigin(e.target.textContent)}>Created</span>
            <span className={styles.orderorigin} onClick={(e) => handleOrigin(e.target.textContent)}>Original</span>
          </div>
        </div>
        {show && <hr className={styles.hr} />}
        <div className={styles.typefilter}>
          <h4 className={`${styles.typetitle} ${styles.typeprimary}`}>Type</h4>
          <div className={`${styles.primaryorder}`}>
            <span className={styles.types} onClick={(e) => handleType(e)}>normal</span>
            <span className={styles.types} onClick={(e) => handleType(e)}>fighting</span>
            <span className={styles.types} onClick={(e) => handleType(e)}>flying</span>
            <span className={styles.types} onClick={(e) => handleType(e)}>poison</span>
            <span className={styles.types} onClick={(e) => handleType(e)}>ground</span>
            <span className={styles.types} onClick={(e) => handleType(e)}>rock</span>
            <span className={styles.types} onClick={(e) => handleType(e)}>bug</span>
            <span className={styles.types} onClick={(e) => handleType(e)}>ghost</span>
            <span className={styles.types} onClick={(e) => handleType(e)}>steel</span>
            <span className={styles.types} onClick={(e) => handleType(e)}>fire</span>
            <span className={styles.types} onClick={(e) => handleType(e)}>water</span>
            <span className={styles.types} onClick={(e) => handleType(e)}>grass</span>
            <span className={styles.types} onClick={(e) => handleType(e)}>electric</span>
            <span className={styles.types} onClick={(e) => handleType(e)}>psychic</span>
            <span className={styles.types} onClick={(e) => handleType(e)}>ice</span>
            <span className={styles.types} onClick={(e) => handleType(e)}>dragon</span>
            <span className={styles.types} onClick={(e) => handleType(e)}>dark</span>
            <span className={styles.types} onClick={(e) => handleType(e)}>fairy</span>
            <span className={styles.types} onClick={(e) => handleType(e)}>unknown</span>
            <span className={styles.types} onClick={(e) => handleType(e)}>shadow</span>
          </div>
        </div>
        {show && <hr className={styles.hr} />}
        <div className={styles.typefilter}>
          <h4 className={styles.typetitle}>Order</h4>
          <div className={styles.orderby}>
            <span className={styles.ordertype} onClick={(e) => handleOrder(e)}>A-Z</span>
            <span className={styles.ordertype} onClick={(e) => handleOrder(e)}>Z-A</span>
            <span className={styles.ordertype} onClick={(e) => handleOrder(e)}>Hp++</span>
            <span className={styles.ordertype} onClick={(e) => handleOrder(e)}>Hp--</span>
            <span className={styles.ordertype} onClick={(e) => handleOrder(e)}>Attack++</span>
            <span className={styles.ordertype} onClick={(e) => handleOrder(e)}>Attack--</span>
            <span className={styles.ordertype} onClick={(e) => handleOrder(e)}>Defense++</span>
            <span className={styles.ordertype} onClick={(e) => handleOrder(e)}>Defense--</span>
          </div>
        </div>
      </section>
    </>
  )
}
