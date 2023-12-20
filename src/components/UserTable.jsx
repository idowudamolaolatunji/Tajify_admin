import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { dateConverter } from "../utils/helper"; 
import { BiSolidSortAlt } from "react-icons/bi";
import Spinner from "./Spinner";
import Loading from "./Loading";


const sortIcon = ( <BiSolidSortAlt />);
const columns = [
	{
		name: 'Full Name',
		selector: row => row.fullName || row.username,
		sortable: true,
	},
	{
		name: 'Email Address',
		selector: row => row.email,
		sortable: true,
	},
	{
		name: 'Verified',
		selector: row => (
		<span className={`status status--${row.isCompletedKyc ? "success" : "pending"}`}>
			<p>{row.isCompletedKyc ? 'Verified' : 'Not Verified'}</p>
		</span>
		),
		sortable: true
	},
	{
		name: 'Followers',
		selector: row => (row.followers).length,
	},
	{
		name: 'Invites',
		selector: row => (row.invites).length,
	},
	{
		name: 'Joined At',
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

function CustomersTableEl() {
	const [users, setUsers] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		async function fetchAllUsers() {
			setIsLoading(true);
			const response = await fetch("http://127.0.0.1:3005/api/users");
			const data = await response.json();
			setUsers(data.data.users);
			setIsLoading(false);
		}
		fetchAllUsers();
	}, []);

	console.log(users)

	return (
		<>
			{/* {isLoading && <Spinner />} */}
			<DataTable 
				title="All Users"
				columns={columns}
				data={users}
				selectableRows
				progressPending={isLoading}
				progressComponent={<Loading />}
				sortIcon={sortIcon}
				pagination
				customStyles={customStyles}
			/>
		</>
	);
}

export default CustomersTableEl;
