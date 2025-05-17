'use client';

import styles from "@/app/(app)/post-types/[postTypeId]/[postId]/post.module.css";
import {FullPost, PostSection} from "@/app/interfaces/post";
import {SyntheticEvent, useState} from "react";
import slug from 'slug'
import ImagePicker, {ImageData} from "@/app/components/image-picker/image-picker";
import PostEditorSection from "@/app/components/post-editor-section";
import TextareaAutosize from "react-textarea-autosize";
import Media from "@/app/interfaces/media";
import Category from "@/app/interfaces/category";
import Library from "@/app/interfaces/library";

interface PostEditorProps {
	post: FullPost,
	media: Media[],
	libraries: Library[],
	categories: Category[]
}

export function PostEditor({post, media, libraries, categories}: PostEditorProps) {
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

	function sectionMoveUp(uuid: string) {
		const index = statePost.sections.findIndex((section) => section.uuid === uuid);
		const sections = statePost.sections;
		if (index > 0) {
			// [arr[0], arr[1]] = [arr[1], arr[0]];
			const originalPosition = statePost.sections[index].position;
			sections[index].position = originalPosition - 1;
			sections[index - 1].position = originalPosition;
		}
		sections.sort((a: PostSection, b: PostSection)=> a.position - b.position);
		setStatePost({
			...statePost,
		});
	}

	function sectionMoveDown(uuid: string) {
		const index = statePost.sections.findIndex((section) => section.uuid === uuid);
		const sections = statePost.sections;
		if (index < sections.length - 1) {
			// [arr[0], arr[1]] = [arr[1], arr[0]];
			const originalPosition = statePost.sections[index].position;
			sections[index + 1].position = originalPosition;
			sections[index].position = originalPosition + 1;
		}
		sections.sort((a: PostSection, b: PostSection)=> a.position - b.position);
		setStatePost({
			...statePost,
		});
	}

	function deleteSection(uuid: string) {
		const index = statePost.sections.findIndex((section) => section.uuid === uuid);
		const sections = statePost.sections;
		sections.splice(index, 1);
		sections.forEach((section, index) => {
			section.position = index;
		});
		setStatePost({
			...statePost,
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
				<section>
					<ImagePicker label={"Choose thumbnail"} onPicked={setThumbnail} media={media}/>
				</section>
				<div className={styles['sections-wrapper']}>
					{post.sections.map((section) => (
							<PostEditorSection
								key={section.uuid}
								section={section}
								onSectionTypeUpdated={changeSectionType}
								onSectionContentUpdated={updateSection}
								onMoveUp={sectionMoveUp}
								onMoveDown={sectionMoveDown}
								onDelete={deleteSection}></PostEditorSection>
						))}
				</div>
				<section className={styles["article-section"]}>
					<label>
						Use theme&#39;s CSS
						<input type="checkbox" checked={statePost.use_theme_css} onChange={useThemeCSS}/>
					</label>
					<div>
						<label htmlFor="css-code">Custom CSS</label>
						<TextareaAutosize value={statePost.css} id="css-code" onInput={changeCustomCSS} />
					</div>
				</section>
				<section className={styles["article-section"]}>
					<label>
						Use theme&#39;s JS
						<input type="checkbox" checked={statePost.use_theme_js} onChange={useThemeJS}/>
					</label>
					<div>
						<label htmlFor="js-code">Custom JavaScript</label>
						<TextareaAutosize value={statePost.js} id="js-code" onInput={changeCustomJS} />
					</div>
				</section>
				<h2>SEO</h2>
				<section className={styles["article-section-description"]}>
					<label htmlFor="meta-desc">Meta description</label>
					<TextareaAutosize value={statePost.meta_description ? statePost.meta_description : ''} id="meta-desc" onInput={changeMetaDescription} />

				</section>
				<section className={styles["article-section-description"]}>
					<label htmlFor="social-desc">Social description</label>
					<TextareaAutosize value={statePost.twitter_description ? statePost.twitter_description : ''} id="social-desc" onInput={changeSocialDescription} />
				</section>
			</article>
			<aside className={styles.aside}>
				<button onClick={wontImplement}>Publish</button>
			</aside>
		</>
	)
}