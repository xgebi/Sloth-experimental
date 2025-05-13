import Link from "next/link";
import styles from './dashboard.module.css';
import {getPosts, getPost} from "@/app/services/post.service";

export default async function DashboardPage() {
	const posts = await getPosts(10);
	const post = await getPost("0799f030-4907-486e-b962-66760cb80909");
	console.log(post);
	return (
		<main className={styles.main}>
			<h1>Dashboard page</h1>
			<Link href={"/dashboard/statistics"}>Statistics</Link>
		</main>
	)
}