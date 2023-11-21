import React, { useEffect, useState } from "react";
import TransactionTableRow from "./TransactionTableRow";
import Spinner from "./Spinner";
import { dateConverter } from "../utils/helper";

import "../assets/css/table.css";

function PendingTransactions() {
	const [pendingDeposits, setPendingDeposits] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		async function fetchPendingDeposits() {
			try {
				setIsLoading(true);
				const response = await fetch( "http://127.0.0.1:3005/api/wallets/transactions/pending/deposits", {
                    "Content-Type": "application/json",
                });
                
                if(!response) return;
                
				const data = await response.json();

                if(data?.status === 'success') {
                    setIsLoading(false);
                    setPendingDeposits(data.data.transactions);
                }
				setIsLoading(false);
			} catch (err) {
				setIsLoading(false);
            }
		}
		fetchPendingDeposits();
	}, []);
	
    
	return (
        <>
        {isLoading && <Spinner />}
        <div className="transaction-table">
            {/* <span>
                <h3 className="wallet--heading">Transactions History</h3>
                <div className="wallet--tabs">
                    <span className={`wallet--tab ${activeModalTab === "deposit" && "tab--active"}`} onClick={() => { setActiveModalTab("deposit")}}>Deposit</span>

                    <span className={`wallet--tab ${activeModalTab === "withdrawal" && "tab--active"}`} onClick={() => { setActiveModalTab("withdrawal")}}>Withdrawal</span>
                </div>
            </span> */}
            
            {/* <DashboardTable activeModalTab={activeModalTab} isDataUpdated={isDataUpdated} /> */}

            <table>
			<thead>
				<tr>
					<th>Currency</th>
					<th>Amount</th>
					<th>Transaction Type</th>
					<th>Status</th>
					<th>Reference</th>
					<th>Date</th>
				</tr>
			</thead>

			<tbody>
				{pendingDeposits.length > 0 &&
					pendingDeposits.map((deposit) => {
						console.log(deposit)
						return (
							<TransactionTableRow
								currency={deposit.currency}
								amount={`${deposit.amount} TAJI`}
								transactionType={deposit.type}
								status={deposit.status}
								reference={deposit.reference}
								date={dateConverter(deposit.date)}
							/>
						);
					})}
			</tbody>
		</table>
            
        </div>
		
        </>
	);
}

export default PendingTransactions;
