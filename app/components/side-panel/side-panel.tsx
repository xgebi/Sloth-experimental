// 'use client'; // indicates if it's client side component

import styles from "./side-panel.module.css";
import MainNavLink from "./main-nav-link";

export default function SidePanel() {
	return (
		<nav>
			<ul className={styles["main-nav"]}>
				<li><MainNavLink href="/dashboard">Dashboard</MainNavLink></li>
				<li><MainNavLink href="/dashboard/statistics">Statistics</MainNavLink></li>
			</ul>
		</nav>
	)
}