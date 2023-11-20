import React, { useEffect, useState } from 'react'
import TableRow from './TransactionTableRow';

import Spinner from './Spinner'

function DashboardTable() {
    const [pendingDeposits, setPendingDeposits] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function fetchPendingDeposits() {
            setIsLoading(true)
            const response = await fetch('http://api.tajify.com/api/pending-deposit')
            const data = await response.json()
            console.log(data.data.pendingDeposits)
            setPendingDeposits(data.data.pendingDeposits)
            setIsLoading(false)
        }
        // fetchPendingDeposits();
    }, []);

  return (
    <table>
        <thead>
            <tr>
                <th>Currency</th>
                <th>Amount</th>
                <th>Transaction Type</th>
                <th></th>
            </tr>
        </thead>

        <tbody>
            {/* {isLoading && <Spinner />} */}
            {pendingDeposits.length > 0 && pendingDeposits.map((deposit) => {
                return (
                    <TransactionTableRow currency={deposit.currency} amount={`${deposit.amount} TAJI`} transactionType={deposit.transactionType} />
                )
            } )}
        </tbody>
    </table>
  )
}

export default DashboardTable;
