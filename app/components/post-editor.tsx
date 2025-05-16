'use client';

import styles from "@/app/(app)/post-types/[postTypeId]/[postId]/post.module.css";
import {FullPost} from "@/app/interfaces/post";
import {SyntheticEvent, useEffect, useState} from "react";
import slug from 'slug'
import ImagePicker, {ImageData} from "@/app/components/image-picker";
import PostEditorSection from "@/app/components/post-editor-section";

interface PostEditorProps {
	post: FullPost,
}

export function PostEditor({post}: PostEditorProps) {
	const [statePost, setStatePost] = useState(post);
	const [caretPosition, setCaretPosition] = useState({
		offset: -1,
		element: "",
	});
	useEffect(() => {
		console.log('abc', caretPosition.element);
		// caretPosition.element!.setSelectionRange(caretPosition.offset, caretPosition.offset);
	}, [caretPosition]);

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

	function updateSection(uuid: string, content: string) {
		const updatedPost = statePost;
		const section = updatedPost.sections.find((section) =>
			section.uuid === uuid);
		if (section) {
			section.content = content;
		}
		setStatePost({
			...updatedPost
		});
	}

	function changeSectionType(uuid: string, type: string) {
		const updatedPost = statePost;
		const section = updatedPost.sections.find((section) =>
			section.uuid === uuid);
		if (section) {
			section.section_type = type;
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
				{post.sections.map((section) => (
						<PostEditorSection
							key={section.uuid}
							section={section}
							onSectionTypeUpdated={changeSectionType}
							onSectionContentUpdated={updateSection}
							onMoveUp={() => {}}
							onMoveDown={() => {}}
							onDelete={() => {}}></PostEditorSection>
					))}
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