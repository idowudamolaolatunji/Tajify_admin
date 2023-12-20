import React, { useState } from "react";
import { MdDashboardCustomize } from "react-icons/md";
import { FaUsers } from "react-icons/fa";

import { AiOutlineBell } from "react-icons/ai";
import { RiAdminLine } from "react-icons/ri";
import { HiOutlineLogout, HiOutlineIdentification } from "react-icons/hi";
import { GiOpenTreasureChest } from "react-icons/gi";
import { FaMoneyBillTransfer } from "react-icons/fa6";


import "./main.css";
import DashboardEl from "../../components/DashboardMain";
import UserTable from "../../components/UserTable";
import PendingTransactions from "../../components/TransactionTable";

import Logo from '../../assets/imgs/logo-complete.png';
import LiquidityPool from "../../components/LiquidityPool";
import ApproveKYC from "../../components/ApproveKYC";
import { useAuthContext } from "../../context/AuthContext";
import Spinner from "../../components/Spinner";


function index() {
	const [activeTab, setActiveTab] = useState("dashboard");
	const [isLoading, setIsLoading] = useState(false);
	const { logout } = useAuthContext();

	const changeTab = (tabName) => {
	  setActiveTab(tabName);
	};

	function handleLogout () {
		setIsLoading(true);
		logout();

		// logging out
		setTimeout(() => {
			setIsLoading(false)
		}, 2500)
		window.location.reload(true)
	}

	return (
		<>
		{ isLoading && <Spinner />}
		<main className="admin__dashboard">
			<menu className="admin__sidebar">
				<span id="logo-container">
					<img src={Logo} alt={Logo} />
				</span>
				<ul className="sidebar--list">

					<li className={`sidebar--item ${activeTab === 'dashboard' ? 'sidebar--active' : ''}`} onClick={() => changeTab("dashboard")} >
						<MdDashboardCustomize className="sidebar--icon" /> Dashboard
					</li>

					<li className={`sidebar--item ${activeTab === 'liquidity' ? 'sidebar--active' : ''}`} onClick={() => changeTab("liquidity")}>
						<GiOpenTreasureChest className="sidebar--icon" /> Liquidity Pool
					</li>

					<li className={`sidebar--item ${activeTab === 'pendingTransactions' ? 'sidebar--active' : ''}`} onClick={() => changeTab("pendingTransactions")}>
						<FaMoneyBillTransfer className="sidebar--icon" /> Pending Transactions
					</li>

					<li className={`sidebar--item ${activeTab === 'users' ? 'sidebar--active' : ''}`} onClick={() => changeTab("users")} >
						<FaUsers className="sidebar--icon" /> All Users
					</li>

					<li className={`sidebar--item ${activeTab === 'kyc' ? 'sidebar--active' : ''}`} onClick={() => changeTab("kyc")} >
						<HiOutlineIdentification className="sidebar--icon" /> Approve KYC
					</li>
				</ul>

			</menu>


			<div className="admin__main">
				<nav className="admin__nav">
					<span>
						<AiOutlineBell className="nav--icon bell" />
						<RiAdminLine className="nav--icon admin" />
						<HiOutlineLogout className="nav--icon logout" onClick={handleLogout} />
					</span>
				</nav>

				<section className="admin__container">
					{activeTab === "dashboard" && <DashboardEl />}
					{activeTab === "liquidity" && <LiquidityPool />}
					{activeTab === "pendingTransactions" && <PendingTransactions />}
					{activeTab === "users" && <UserTable />}
					{activeTab === "kyc" && <ApproveKYC />}
				</section>
			</div>
		</main>
		</>
	);
}

export default index;
