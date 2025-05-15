'use client';

import styles from "@/app/s/post-types/[postTypeId]/[postId]/post.module.css";
import {FullPost} from "@/app/interfaces/post";
import {SyntheticEvent, useState} from "react";
import slug from 'slug'

interface PostEditorProps {
	post: FullPost,
}

export default function PostEditor({ post }: PostEditorProps) {
	const [statePost, setStatePost] = useState(post);
	function wontImplement() {
		alert("Won't implement")
	}

	function updateTitle(val: SyntheticEvent) {
		console.log(val);
		setStatePost({
			...statePost,
			title: (val.target as HTMLInputElement)['value'],
			slug: slug((val.target as HTMLInputElement)['value'])
		});
		console.log(statePost);
	}

	function updateSlug(val: SyntheticEvent) {
		setStatePost({
			...statePost,
			slug: slug((val.target as HTMLInputElement)['value']),
		});
	}

	return (
		<>
			<article className={styles.article}>
				<h1>
					{post.uuid.toLocaleLowerCase() === "new" && 'New post'}
					{post.uuid !== "new" && 'Edit post'}
				</h1>
				<section className={styles['article-section']}>
					<label htmlFor="title">Title</label>
					<input id="title" type="text" value={statePost.title} onInput={updateTitle}/>
				</section>
				<section className={styles['article-section']}>
					<label htmlFor="slug">Slug</label>
					<input id="slug" type="text" value={statePost.slug} onInput={updateSlug} />
				</section>
				<section>

				</section>
			</article>
			<aside className={styles.aside}>
				<button onClick={wontImplement}>Publish</button>
			</aside>
		</>
	)
}