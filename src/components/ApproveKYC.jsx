import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';

import { BiSolidSortAlt } from "react-icons/bi";
import Loading from './Loading';
import { dateConverter } from '../utils/helper';
const sortIcon = ( <BiSolidSortAlt />);

const columns = [
	{
		name: 'Username',
		selector: row => row.user.username,
		sortable: true,
	},
	{
		name: 'KYC Document Type',
		selector: row => row.documentType,
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
		name: 'Address',
		selector: row => row.homeAddress,
	},
	{
		name: 'Utitlity Bill Type',
		selector: row => row.utilBillType,
	},
	{
		name: 'Date',
		selector: row => dateConverter(row.updatedAt),
		sortable: true
	},
];

function ApproveKYC() {
    const [isLoading, setIsLoading] = useState(false)
    const [pendingKyc, setPendingKyc] = useState([])
    const [approvedKyc, setApprovedKyc] = useState([])
    const [rejectedKyc, setRejectedKyc] = useState([])    

    useEffect(function() {
        async function fetchKycDocuments () {
			setIsLoading(true)
            const [pendingKycRes, approvedKycRes, rejectedKycRes] = await Promise.all([
                await fetch('https://api.tajify.com/api/kyc/pending-kycs'),
                await fetch('https://api.tajify.com/api/kyc/approved-kycs'),
                await fetch('https://api.tajify.com/api/kyc/rejected-kycs')
            ]);

			if(!pendingKycRes.ok || !approvedKycRes.ok || !rejectedKycRes.ok) {
				setIsLoading(false);
				return;
			}

            const pendingKycData = await pendingKycRes.json();
            const approvedKycData = await approvedKycRes.json();
            const rejectedKycData = await rejectedKycRes.json();

			setPendingKyc(pendingKycData.data.pendingKycDocs);
			setApprovedKyc(approvedKycData.data.approvedKycDoc);
			setRejectedKyc(rejectedKycData.data.rejectedKycDocument);
			setIsLoading(false)
        }
        fetchKycDocuments();
    }, []);


  return (
    <>

        <DataTable 
            columns={columns}
            data={pendingKyc}
			title={'Pending KYC'}
			sortIcon={sortIcon}
            pagination
            highlightOnHover
            progressPending={isLoading}
            progressComponent={<Loading />}
        />

      
    </>
  )
}

export default ApproveKYC
