import React, { useEffect, useState } from "react";
import InsightFigure from "./InsightFigure";
import DashboardTable from "./DashboardTable";


import { FaUsers } from "react-icons/fa";
import { MdPendingActions } from "react-icons/md";
import { LuShoppingBasket } from "react-icons/lu";
import { ImUserTie } from "react-icons/im";
import { GiMoneyStack } from "react-icons/gi";
import { RiStackLine } from "react-icons/ri";
import { GrStakeholder } from "react-icons/gr";

import { numberFormatter } from "../utils/helper";
import Spinner from "./Spinner";



function DashboardMain() {
  // const { user, token } = 
	const [users, setUsers] = useState([]);
	const [pendingDeposits, setPendingDeposits] = useState([]);
	const [pendingWithdrawals, setPendingWithdrawals] = useState([]);
	const [stakeHolders, setStakeHolders] = useState([]);
	const [boughtSlots, setBoughtSlots] = useState([]);
	const [availableSlots, setAvailableSlots] = useState(1000000);
	const [uploadedProducts, setUploadedProducts] = useState([]);

	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		async function fetchAll() {
			setIsLoading(true)
			const [usersRes, pendingDepoRes, pendingWithdrRes, stakeHoldersRes, boughtStakeRes, productsRes] = await Promise.all([ 
				await fetch("https://api.tajify.com/api/users"),
				await fetch("https://api.tajify.com/api/transactions/pending/deposits"), 
				await fetch("https://api.tajify.com/api/transactions/pending/withdrawals"),
				await fetch("https://api.tajify.com/api/stakings/all-stakeholders"),
				await fetch("https://api.tajify.com/api/stakings/all-stakings"),
				await fetch("https://api.tajify.com/api/market/getall"),
			]);
			const usersData = await usersRes.json();
			const pendingDepoData = await pendingDepoRes.json();
			const pendingWithdrData = await pendingWithdrRes.json();
			const stakeHoldersData = await stakeHoldersRes.json();
			const boughtStakeData = await boughtStakeRes.json();
			const productsData = await productsRes.json();

			const stakings = boughtStakeData.data.stakings;

			const slotsBought = stakings.reduce((acc, curr) => {
				return acc + curr.slotAmount;
			}, 0);

			const slotsRemaining = Number(availableSlots - slotsBought);
			console.log(stakings, slotsBought, slotsRemaining)

			setUsers(usersData.data.users);
			setPendingDeposits(pendingDepoData.data.transactions);
			setPendingWithdrawals(pendingWithdrData.data.transactions);
			setStakeHolders(stakeHoldersData.data.stakeHolders);
			setBoughtSlots(slotsBought);
			setAvailableSlots(slotsRemaining);
			setUploadedProducts(productsData.data.products);
			setIsLoading(false)
		}
		fetchAll();
	}, []);
	return (
		<>
			<div className="dashboard_top">
					<span className="heading__text">Dashboard</span>
			</div>
			<div className="admin__insight" style={{ marginBottom: '4.8rem' }}>
				<InsightFigure
					insightIcon={<FaUsers />}
					insightTitle={"Total Active Users"}
					insightFigure={users.length}
				/>
				<InsightFigure
					insightIcon={<MdPendingActions />}
					insightTitle={"Pending Deposits"}
					insightFigure={pendingDeposits.length}
				/>
				<InsightFigure
					insightIcon={<MdPendingActions />}
					insightTitle={"Withdrawals"}
					insightFigure={pendingWithdrawals.length}
				/>
				<InsightFigure
					insightIcon={<ImUserTie />}
					insightTitle={"StakeHolders"}
					insightFigure={stakeHolders.length}
				/>
				<InsightFigure
					insightIcon={<RiStackLine />}
					insightTitle={"Available Slots"}
					insightFigure={numberFormatter(availableSlots)}
				/>
				<InsightFigure
					insightIcon={<GiMoneyStack />}
					insightTitle={"Bought Slots"}
					insightFigure={numberFormatter(boughtSlots || 0)}
				/>
				<InsightFigure
					insightIcon={<LuShoppingBasket />}
					insightTitle={"Uploaded Products"}
					insightFigure={uploadedProducts.length}
				/>
			</div>

			<DashboardTable isLoading={isLoading} pendingWithdrawals={pendingWithdrawals} pendingDeposits={pendingDeposits} />
		</>
	);
}

export default DashboardMain;
