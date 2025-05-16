'use client';

import styles from "@/app/(app)/post-types/[postTypeId]/[postId]/post.module.css";
import {FullPost} from "@/app/interfaces/post";
import {SyntheticEvent, useState} from "react";
import slug from 'slug'
import ImagePicker, {ImageData} from "@/app/components/image-picker";

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

	function useThemeCSS() {
		setStatePost({
			...statePost,
			use_theme_css: !statePost.use_theme_css
		})
	}

	function useThemeJS() {
		setStatePost({
			...statePost,
			use_theme_js: !statePost.use_theme_js
		})
	}

	function changeCustomCSS(ev: SyntheticEvent) {
		setStatePost({
			...statePost,
			css: (ev.target as HTMLTextAreaElement).value
		});
	}

	function changeCustomJS(ev: SyntheticEvent) {
		setStatePost({
			...statePost,
			js: (ev.target as HTMLTextAreaElement).value
		});
	}

	function changeMetaDescription(ev: SyntheticEvent) {
		setStatePost({
			...statePost,
			meta_description: (ev.target as HTMLTextAreaElement).value
		});
	}

	function changeSocialDescription(ev: SyntheticEvent) {
		setStatePost({
			...statePost,
			twitter_description: (ev.target as HTMLTextAreaElement).value
		});
	}

	function setThumbnail(img: ImageData): void {

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
				<section>
					<ImagePicker label={"Choose thumbnail"} onPicked={setThumbnail} />
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
				<section>
					<label>
						Use theme&#39;s CSS
						<input type="checkbox" checked={statePost.use_theme_css} onChange={useThemeCSS}/>
					</label>
					<label htmlFor="css-code">Custom CSS</label>
					<textarea value={statePost.css} id="css-code" onInput={changeCustomCSS}></textarea>
				</section>
				<section>
					<label>
						Use theme&#39;s JS
						<input type="checkbox" checked={statePost.use_theme_js} onChange={useThemeJS}/>
					</label>
					<label htmlFor="js-code">Custom JavaScript</label>
					<textarea value={statePost.js} id="js-code" onInput={changeCustomJS}></textarea>
				</section>
				<h2>SEO</h2>
				<section>
					<label htmlFor="meta-desc">Meta description</label>
					<textarea value={statePost.meta_description} id="meta-desc" onInput={changeMetaDescription}></textarea>
				</section>
				<section>
					<label htmlFor="social-desc">Social description</label>
					<textarea value={statePost.twitter_description} id="social-desc" onInput={changeSocialDescription}></textarea>
				</section>
			</article>
			<aside className={styles.aside}>
				<button onClick={wontImplement}>Publish</button>
			</aside>
		</>
	)
}