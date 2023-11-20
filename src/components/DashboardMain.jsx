import React, { useEffect, useState } from "react";
import InsightFigure from "./InsightFigure";
import DashboardTable from "./DashboardTable";
import Spinner from "./Spinner";

import { FaUsers } from "react-icons/fa";
import { MdPendingActions } from "react-icons/md";
import { TbBrandFeedly } from "react-icons/tb";
import { LuShoppingBasket } from "react-icons/lu";
import { MdOutlinePostAdd } from "react-icons/md";
import { GiMoneyStack } from "react-icons/gi";
import { RiStackLine } from "react-icons/ri";
import { GrStakeholder } from "react-icons/gr";

import { numberFormatter } from "../utils/helper";



function DashboardMain() {
  // const { user, token } = 
	const [users, setUsers] = useState([]);
	const [pendingDeposits, setPendingDeposits] = useState([]);
	const [pendingWithdrawals, setPendingWithdrawals] = useState([]);
	const [stakeHolders, setStakeHolders] = useState([]);
	const [boughtSlots, setBoughtSlots] = useState([]);
	const [availableSlots, setAvailableSlots] = useState(1000000);
	const [blogPosts, setBlogPosts] = useState([]);
	const [uploadedProducts, setUploadedProducts] = useState([]);

	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		async function fetchAll() {
			const [usersRes, pendingDepoRes, pendingWithdrRes, stakeHoldersRes, boughtStakeRes, blogsRes, productsRes] = await Promise.all([ 
				await fetch("http://localhost:3005/api/users"),
				await fetch("http://localhost:3005/api/wallets/transactions/pending/deposits"), 
				await fetch("http://localhost:3005/api/wallets/transactions/pending/withdrawals"),
				await fetch("http://localhost:3005/api/stakings/all-stakeholders"),
				await fetch("http://localhost:3005/api/stakings/all-stakings"),
				await fetch("http://localhost:3005/api/blogs/"),
				await fetch("http://localhost:3005/api/market/getall"),
			]);
			const usersData = await usersRes.json();
			const pendingDepoData = await pendingDepoRes.json();
			const pendingWithdrData = await pendingWithdrRes.json();
			const stakeHoldersData = await stakeHoldersRes.json();
			const boughtStakeData = await boughtStakeRes.json();
			const blogsData = await blogsRes.json();
			const productsData = await productsRes.json();

			const stakings = boughtStakeData.data.stakings;

			const slotsBought = stakings.reduce((acc, curr) => {
				return acc + curr.slotsAmount;
			}, 0);
			const slotsRemaining = Number(availableSlots - slotsBought);
			console.log(stakings, slotsBought, slotsRemaining)

			setUsers(usersData.data.users);
			setPendingDeposits(pendingDepoData.data.transactions);
			setPendingWithdrawals(pendingWithdrData.data.transactions);
			setStakeHolders(stakeHoldersData.data.stakeHolders);
			setBoughtSlots(slotsBought);
			setAvailableSlots(slotsRemaining);
			setBlogPosts(blogsData.data.blogs);
			setUploadedProducts(productsData.data.products);
		}
		fetchAll();
	}, []);
	return (
		<>
			<div className="admin__insight">
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
					insightTitle={"Pending Withdrawals"}
					insightFigure={pendingWithdrawals.length}
				/>
				<InsightFigure
					insightIcon={<GrStakeholder />}
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
					insightFigure={boughtSlots}
				/>
				<InsightFigure
					insightIcon={<MdOutlinePostAdd />}
					insightTitle={"Blog Posts & News"}
					insightFigure={blogPosts.length}
				/>
				<InsightFigure
					insightIcon={<LuShoppingBasket />}
					insightTitle={"Uploaded Products"}
					insightFigure={uploadedProducts.length}
				/>			
			</div>

			<DashboardTable />
		</>
	);
}

export default DashboardMain;
