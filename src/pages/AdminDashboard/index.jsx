import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { MdDashboardCustomize } from "react-icons/md";
import { FaUsers } from "react-icons/fa";

import { AiOutlineBell } from "react-icons/ai";
import { RiAdminLine } from "react-icons/ri";
import { HiOutlineLogout } from "react-icons/hi";
import { MdPendingActions } from "react-icons/md";
import { LuShoppingBasket } from "react-icons/lu";
import { MdOutlinePostAdd } from "react-icons/md";
import { GiOpenTreasureChest } from "react-icons/gi";



import "./main.css";
import "../../assets/css/table.css";
import DashboardEl from "../../components/DashboardMain";
import UserTable from "../../components/UserTable";
import PendingTransactions from "../../components/TransactionTable";

// import Logo from '../../assets/imgs/TAJIFY-LOGO.png';
import Logo from '../../assets/imgs/logo-complete.png';
import LiquidityPool from "../../components/LiquidityPool";

function index() {
	const [activeTab, setActiveTab] = useState("dashboard");

	const changeTab = (tabName) => {
	  setActiveTab(tabName);
	};

	return (
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
						<MdPendingActions className="sidebar--icon" /> Pending Transactions
					</li>

					<li className={`sidebar--item ${activeTab === 'users' ? 'sidebar--active' : ''}`} onClick={() => changeTab("users")} >
						<FaUsers className="sidebar--icon" /> All Users
					</li>

					<li className={`sidebar--item ${activeTab === 'products' ? 'sidebar--active' : ''}`} onClick={() => changeTab("products")} >
						<LuShoppingBasket className="sidebar--icon" /> Uploaded Products
					</li>
					<li className={`sidebar--item ${activeTab === 'blogPosts' ? 'sidebar--active' : ''}`} onClick={() => changeTab("blogPosts")} >
						<MdOutlinePostAdd className="sidebar--icon" /> Blog Posts
					</li>
				</ul>

				<span className="sidebar--logout">
					<HiOutlineLogout className="sidebar--icon" /> Logout
				</span>
			</menu>


			<div className="admin__main">
				<nav className="admin__nav">
					<span>
						<AiOutlineBell className="nav--icon bell" />
						<RiAdminLine className="nav--icon admin" />
					</span>
				</nav>

				<section className="admin__container">
					{activeTab === "dashboard" && <DashboardEl />}
					{activeTab === "liquidity" && <LiquidityPool />}
					{activeTab === "pendingTransactions" && <PendingTransactions />}
					{activeTab === "users" && <UserTable />}
				</section>
			</div>
		</main>
	);
}

export default index;
