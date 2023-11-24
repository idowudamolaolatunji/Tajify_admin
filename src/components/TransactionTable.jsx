import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { currencyConverter, dateConverter } from "../utils/helper";
import DataTable from "react-data-table-component";

import "../assets/css/table.css";

import { BiSolidSortAlt } from "react-icons/bi";

const sortIcon = ( <BiSolidSortAlt />);
const columns = [
	{
		name: 'Currency Paid',
		selector: row => row.currency,
		sortable: true,
	},
	{
		name: 'Amount',
		selector: row => `${row.currency === 'taji' ? 'TAJI ' : row.currency === 'naira' ? '₦' : '$'}${currencyConverter(row.amount)}`,
	},
	{
		name: 'Status',
		// selector: row => row.status,
		selector: row => (
			<span className={`status status--${row.status === "pending" ? "pending" : "success"}`}>
				<p>{row.status}</p>
			</span>
		),
		sortable: true
	},
	{
		name: 'Reference',
		selector: row => row.reference,
	},
	{
		name: 'Date',
		selector: row => dateConverter(row.createdAt),
		sortable: true
	},
	{
		name: 'Actions',
		selector: () => (
			<div className="button--actions">
				<button className="button-action action-approve">Approve</button>
				<button className="button-action action-decline">Reject</button>
			</div>
		),
	}
]

function PendingTransactions({ onClick }) {
	const [pendingDeposits, setPendingDeposits] = useState([]);
	const [pendingWithdrawals, setPendingWithdrawals] = useState([]);
	const [activeTab, setActiveTab] = useState('deposit')
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		async function fetchPendingTransactions() {
			setIsLoading(true);
			const [depositRes, withdrawalRes] = await Promise.all([
                await fetch("http://127.0.0.1:3005/api/transactions/pending/deposits"),
                await fetch("http://127.0.0.1:3005/api/transactions/pending/withdrawals"),
            ]);

			const depositData = await depositRes.json();
			const withdrawalData = await withdrawalRes.json();

			console.log(depositData.data.transactions, withdrawalData.data.transactions);
			setPendingDeposits(depositData.data.transactions);
			setPendingWithdrawals(withdrawalData.data.transactions);

			setIsLoading(false);
		}
		fetchPendingTransactions();
	}, []);

	// function handleClick() {}
	
    
	return (
        <>
			{isLoading && <Spinner />}

			<div className="transaction-table">
				<div className="dashboard--tabs">
					<span className={`dashboard--tab ${activeTab === "deposit" && "tab--active"}`} onClick={() => setActiveTab("deposit")}>Deposit</span>

					<span className={`dashboard--tab ${activeTab === "withdrawal" && "tab--active"}`} onClick={() => setActiveTab("withdrawal")}>Withdrawal</span>
				</div>


				{activeTab === 'deposit' && 
					<DataTable 
						columns={columns}
						data={pendingDeposits}
						sortIcon={sortIcon}
						selectableRows
						pagination
					/>
				}
				{activeTab === 'withdrawal' && 
					<DataTable 
						columns={columns}
						data={pendingWithdrawals}
						sortIcon={sortIcon}
						selectableRows
						pagination
					/>
				}
				
			</div>
        </>
	);
}

export default PendingTransactions;
