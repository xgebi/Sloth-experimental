'use client';

import styles from "@/app/s/post-types/[postTypeId]/[postId]/post.module.css";

export default function PostEditor({ props }) {
	function wontImplement() {
		alert("Won't implement")
	}

	return (
		<>
			<article className={styles.article}>
				<h1>Post</h1>
			</article>
			<aside className={styles.aside}>
				<button onClick={wontImplement}>Publish</button>
			</aside>
		</>
	)
}