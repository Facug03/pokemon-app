import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { primaryType, deleteFilter, resetPage, orderByAll, orderByCreated, orderByOriginal, orderByStats } from '../redux/slice'

export const useOrder = () => {
  const [order, setOrder] = useState({ value: false, text: '' })
  const [type, setType] = useState({ value: false, text: '' })
  const [ori, setOri] = useState({ value: false, text: '' })
  const dispatch = useDispatch()

  const handleType = (e) => {
    dispatch(resetPage(true))
    if (type.value && order.value && ori.value) {
      handleOrigin(ori.text, true)
      dispatch(primaryType({ primary: e.target.textContent, make: true }))
      setType({ ...type, value: true, text: e.target.textContent })
      const orderByBef = orderByStats(order.text)
      dispatch(orderByBef(true))
    } else if (ori.value) {
      handleOrigin(ori.text, true)
      dispatch(primaryType({ primary: e.target.textContent, make: true }))
      setType({ ...type, value: true, text: e.target.textContent })
    } else if (order.value) {
      dispatch(primaryType({ primary: e.target.textContent, make: false }))
      setType({ ...type, value: true, text: e.target.textContent })
      const orderByBef = orderByStats(order.text)
      dispatch(orderByBef(true))
    } else {
      setType({ ...type, value: true, text: e.target.textContent })
      dispatch(primaryType({ primary: e.target.textContent, make: false }))
    }
  }

  const handleOrder = (e) => {
    dispatch(resetPage(true))
    setOrder({ ...order, text: e.target.textContent, value: true })
    const orderBy = orderByStats(e.target.textContent)
    dispatch(orderBy(true))
  }

  const handleClose = (filter) => {
    if (filter === 'order') {
      dispatch(resetPage(true))
      setOrder({ ...order, value: false })
      if (type.value && ori.value) {
        dispatch(deleteFilter('origin', ori.text))
        dispatch(primaryType({ primary: type.text, make: true }))
      } else if (type.value) {
        const deleteOrder = deleteFilter('order')
        dispatch(deleteOrder({ primary: type.text, make: false }))
      } else if (ori.value) {
        const deleteOrder = deleteFilter('origin', ori.text)
        dispatch(deleteOrder())
      } else {
        const deleteAll = deleteFilter()
        dispatch(deleteAll())
      }
    } else if (filter === 'type') {
      setType({ ...type, value: false })
      if (order.value && ori.value) {
        const deleteType = deleteFilter('origin', ori.text)
        dispatch(deleteType())
        const orderAll = deleteFilter('type', order.text)
        dispatch(orderAll(true))
      } else if (order.value) {
        dispatch(resetPage(true))
        const orderAll = deleteFilter('type', order.text)
        dispatch(orderAll(false))
      } else if (ori.value) {
        const deleteType = deleteFilter('origin', ori.text)
        dispatch(deleteType())
      } else {
        const deleteAll = deleteFilter()
        dispatch(deleteAll())
      }
    } else {
      setOri({ ...ori, value: false })
      if (type.value && order.value) {
        dispatch(primaryType({ primary: type.text, make: false }))
        const orderAll = deleteFilter('type', order.text)
        dispatch(orderAll(true))
      } else if (type.value) {
        dispatch(primaryType({ primary: type.text, make: false }))
      } else if (order.value) {
        dispatch(resetPage(true))
        const orderAll = deleteFilter('type', order.text)
        dispatch(orderAll(false))
      } else {
        dispatch(orderByAll())
      }
    }
  }

  const handleOrigin = (origin, control) => {
    dispatch(resetPage(true))
    setOri({ ...ori, value: true, text: origin })
    if (origin === 'All') {
      setType({ ...type, value: false, text: '' })
      setOrder({ ...order, value: false, text: '' })
      dispatch(orderByAll())
    } else if (origin === 'Created') {
      if (control) {
        dispatch(orderByCreated())
      } else if (type.value && order.value) {
        dispatch(orderByCreated())
        dispatch(primaryType({ primary: type.text, make: true }))
        const orderByBef = orderByStats(order.text)
        dispatch(orderByBef(true))
      } else if (type.value) {
        dispatch(orderByCreated())
        dispatch(primaryType({ primary: type.text, make: true }))
      } else if (order.value) {
        dispatch(orderByCreated())
        const orderByBef = orderByStats(order.text)
        dispatch(orderByBef(true))
      } else {
        dispatch(orderByCreated())
      }
    } else {
      if (control) {
        dispatch(orderByOriginal())
      } else if (type.value && order.value) {
        dispatch(orderByOriginal())
        dispatch(primaryType({ primary: type.text, make: true }))
        const orderByBef = orderByStats(order.text)
        dispatch(orderByBef(true))
      } else if (type.value) {
        dispatch(orderByOriginal())
        dispatch(primaryType({ primary: type.text, make: true }))
      } else if (order.value) {
        dispatch(orderByOriginal())
        const orderByBef = orderByStats(order.text)
        dispatch(orderByBef(true))
      } else {
        dispatch(orderByOriginal())
      }
    }
  }

  return {
    type,
    order,
    ori,
    handleClose,
    handleOrder,
    handleType,
    handleOrigin
  }
}
