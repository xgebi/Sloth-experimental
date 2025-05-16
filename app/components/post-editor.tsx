'use client';

import styles from "@/app/(app)/post-types/[postTypeId]/[postId]/post.module.css";
import {FullPost} from "@/app/interfaces/post";
import {SyntheticEvent, useState} from "react";
import slug from 'slug'

interface PostEditorProps {
	post: FullPost,
}

export function PostEditor({post}: PostEditorProps) {
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

	function updateSection(ev: SyntheticEvent) {
		const updatedPost = statePost;
		const section = updatedPost.sections.find((section) =>
			section.uuid === ((ev.target as HTMLTextAreaElement)['parentNode'] as HTMLElement)?.dataset.uuid);
		if (section) {
			section.content = (ev.target as HTMLTextAreaElement).value;
		}
		setStatePost({
			...updatedPost
		});
	}

	function changeSectionType(ev: SyntheticEvent) {
		const updatedPost = statePost;
		const selectValue = ((ev.target as HTMLElement).previousElementSibling as HTMLSelectElement)?.value;
		const sectionUuid = (((ev.target as HTMLTextAreaElement)['parentNode'] as HTMLElement)['parentNode'] as HTMLElement)?.dataset.uuid;
		const section = updatedPost.sections.find((section) =>
			section.uuid === sectionUuid);
		if (section) {
			section.section_type = selectValue;
		}
		setStatePost({
			...updatedPost
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
					<input id="slug" type="text" value={statePost.slug} onInput={updateSlug}/>
				</section>
				{post.sections.map((section) => {
					return (
						<div key={section.uuid} className={styles['article-post-sections']} data-uuid={section.uuid}>
							{section.position === 0 && <h2>Excerpt</h2>}
							{section.position === 1 && <h2>Rest of the article</h2>}
							{section.section_type === "text" && <textarea value={section.content} onInput={updateSection}></textarea>}
							{section.section_type === "form" && <input type="text" value={section.content} onInput={updateSection} />}
							<section className={styles['article-post-sections-actions']}>
								<select defaultValue={section.section_type}>
									<option value="toc">Table of Content</option>
									<option value="text">Text</option>
									<option value="form">Form</option>
									<option value="image">Image</option>
								</select>
								<button onClick={changeSectionType}>Change section type</button>
							</section>
							<section className={styles['article-post-sections-actions']}>
								<button>▲</button>
								<button>▼</button>
								<button>Remove section</button>
							</section>
						</div>
					)
				})}
			</article>
			<aside className={styles.aside}>
				<button onClick={wontImplement}>Publish</button>
			</aside>
		</>
	)
}