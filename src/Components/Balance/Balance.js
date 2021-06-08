import React, { useState, useEffect } from 'react'
import './Balance.css'
import Transaction from './../Transaction/Transaction'

const Balance = () => {
  const [expense, setExpense] = useState('')
  const [array] = useState(() => {
    let obj
    var res = []
    try {
      obj = JSON.parse(localStorage.getItem('arr') || [])
      for (var i in obj) {
        res.push(obj[i])
      }
    } catch (e) {
      obj = []
    }
    console.log(res)
    return res
  })
  const [balance, setBalance] = useState(() => {
    let value
    try {
      value = localStorage.getItem('bal') || '0'
    } catch (e) {
      value = 0
    }
    return value
  })

  function convertDate() {
    let date = new Date()
    var month = date.getMonth() + 1
    var day = date.getDate()
    if (month < 10) {
      month = '0' + month
    }
    if (day < 10) {
      day = '0' + day
    }
    let formateDate =
      date.getFullYear() +
      '-' +
      month +
      '-' +
      day +
      'T' +
      date.getHours() +
      ':' +
      date.getMinutes() +
      ':' +
      date.getSeconds()
    return formateDate
  }

  const addExpense = () => {
    if (typeof Storage !== 'undefined') {
      array.push({
        expense: expense,
        date: convertDate(),
        addRemove: 'Add',
      })
      console.log(array)
      var total = parseFloat(balance) + parseFloat(expense)
      total = total.toFixed(2)
      setBalance(total)
    } else {
      return console.log(`The browser does not support local storage`)
    }
  }
  const removeExpense = () => {
    if (typeof Storage !== 'undefined') {
      let a = parseFloat(balance)
      let b = parseFloat(expense)
      if (a > b) {
        array.push({
          expense: expense,
          date: convertDate(),
          addRemove: 'Remove',
        })
        var total = a - b
        total = total.toFixed(2)
        setBalance(total)
      } else {
        console.log(`Low balance`)
      }
    } else {
      return `The browser does not support local storage`
    }
  }

  useEffect(() => {
    localStorage.setItem('bal', balance)
    localStorage.setItem('arr', JSON.stringify(array))
  }, [balance, array])
  return (
    <>
      <div className='balance-wrapper'>
        <title>Balance : {balance}</title>
        <input
          type='number'
          value={expense}
          onChange={(e) => setExpense(e.target.value)}
        />
        <button onClick={addExpense}>Add</button>
        <button onClick={removeExpense}>Remove</button>
      </div>
      <Transaction array={array} />
    </>
  )
}

export default Balance
