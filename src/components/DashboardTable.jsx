import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

import { currencyConverter, dateConverter } from "../utils/helper";
import { BiSolidSortAlt } from "react-icons/bi";
import Loading from "./Loading";


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
		name: 'Transaction Status',
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
];

const customStyles = {
    rows: {
        style: {
            minHeight: '58px',
        },
    },
}

function DashboardTable() {
	const [transactions, setTransactions] = useState([])
	const [isLoading, setIsLoading] = useState(false);
	const [allStaking, setAllStaking] = useState([]);
    const [activeTab, setActiveTab] = useState('deposit');
	///////////////////////////////////////////////////

	const withdrawals = transactions?.filter(transaction => transaction.type === 'withdrawal');
	const deposits = transactions?.filter(transaction => transaction.type === 'deposit');
	const stakings = transactions?.filter(transaction => transaction.type === 'staking');
	const purchases = transactions?.filter(transaction => transaction.type === 'purchase');
	const sales = transactions?.filter(transaction => transaction.type === 'sales');

	useEffect(() => {
		async function fetchTransaction() {
			try {
				setIsLoading(true)
				const res = await fetch("https://api.tajify.com/api/transactions/", {
					method: 'GET',
					headers: {
						"Content-Type": "application/json",
					}
				});
				if(!res.ok) throw new Error('Something went wrong!');
				const data = await res.json();
				const transactions = data.data.transactions;
				console.log(transactions, res)
				setTransactions(transactions);
			} catch(err) {
				console.log(err);
			} finally {
				setIsLoading(false)
			}
		}
		fetchTransaction();
	}, []);

	return (
        <div className="dashboard--table">
            <div className="dashboard--tabs">
                <span className={`dashboard--tab ${activeTab === "deposit" && "tab--active"}`} onClick={() => { setActiveTab("deposit")}}>Deposit</span>

                <span className={`dashboard--tab ${activeTab === "withdrawal" && "tab--active"}`} onClick={() => { setActiveTab("withdrawal")}}>Withdrawal</span>

                <span className={`dashboard--tab ${activeTab === "staking" && "tab--active"}`} onClick={() => { setActiveTab("staking")}}>Staking</span>

                <span className={`dashboard--tab ${activeTab === "purchase" && "tab--active"}`} onClick={() => { setActiveTab("purchase")}}>Purchases</span>

            </div>
        

            {activeTab === 'deposit' && 
                <DataTable 
                    columns={columns}
                    data={deposits}
                    pagination
                    sortIcon={sortIcon}
					progressPending={isLoading}
					progressComponent={<Loading />}
					customStyles={customStyles}
                />
            }

            {activeTab === 'withdrawal' &&
                <DataTable 
                    columns={columns}
                    data={withdrawals}
                    pagination
                    sortIcon={sortIcon}
                    progressPending={isLoading}
					progressComponent={<Loading />}
					customStyles={customStyles}
                />
            }

            {activeTab === 'staking' &&
                <DataTable 
                    columns={columns}
                    data={stakings}
                    pagination
                    sortIcon={sortIcon}
                    progressPending={isLoading}
					progressComponent={<Loading />}
					customStyles={customStyles}
                />
            }

            {activeTab === 'purchase' &&
                <DataTable 
                    columns={columns}
                    data={purchases}
                    pagination
                    sortIcon={sortIcon}
                    progressPending={isLoading}
					progressComponent={<Loading />}
					customStyles={customStyles}
                />
            }

        </div>
	);
}

export default DashboardTable;
