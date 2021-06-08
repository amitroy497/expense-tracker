import React from 'react'
import './Transaction.css'

const Transaction = ({ array }) => {
  return (
    <div className='transaction-wrapper'>
      <title>Transactions : </title>
      <div className='transaction-list'>
        {array.map((item, i) => (
          <div key={i}>
            <span>{item.date.toString()} - </span>
            <span>{item.expense} - </span>
            <span>{item.addRemove}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Transaction
