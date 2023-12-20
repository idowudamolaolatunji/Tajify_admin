import React, { useState } from "react";
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

function DashboardTable({ isLoading, pendingWithdrawals, pendingDeposits }) {
    const [activeTab, setActiveTab] = useState('deposit');

	return (
        <div className="dashboard--table">
            <div className="dashboard--tabs">
                <span className={`dashboard--tab ${activeTab === "deposit" && "tab--active"}`} onClick={() => { setActiveTab("deposit")}}>Deposit</span>

                <span className={`dashboard--tab ${activeTab === "withdrawal" && "tab--active"}`} onClick={() => { setActiveTab("withdrawal")}}>Withdrawal</span>

            </div>
        

            {activeTab === 'deposit' && 
                <DataTable 
                    columns={columns}
                    data={pendingDeposits}
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
                    data={pendingWithdrawals}
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
