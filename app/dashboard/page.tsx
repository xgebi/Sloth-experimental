import Link from "next/link";
import styles from './dashboard.module.css';

export default function DashboardPage() {
	return (
		<main className={styles.main}>
			<h1>Dashboard page</h1>
			<Link href={"/dashboard/statistics"}>Statistics</Link>
		</main>
	)
}