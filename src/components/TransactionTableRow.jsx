

import React from 'react'

function TransactionTableRow({ currency, amount, type, status, reference, date }) {
    return (
        <tr>
            <td>{currency}</td>
            <td>{amount}</td>
            <td>{type}</td>
            <td>{status}</td>
            <td>{reference}</td>
            <td>{date}</td>
        </tr>
    );
}

export default TransactionTableRow
