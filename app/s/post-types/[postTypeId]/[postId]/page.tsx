import {getTaxonomyKindOfTypeByPostType} from "@/app/services/taxonomy";
import styles from './post.module.css';
import PostEditor from "@/app/components/post-editor";
type PostPageParams = Promise<{postId: string, postTypeId: string}>

// eslint-disable-next-line @next/next/no-async-client-component
export default async function PostPage({ params }: { params: PostPageParams }) {
	const postId = (await params).postId;
	const postTypeId = (await params).postTypeId;
	// fetch list of categories
	const categories = await getTaxonomyKindOfTypeByPostType(postTypeId, "category");
	// fetch list of libraries
	if (postId.toLocaleLowerCase() !== "new") {
		// fetch sections
		// fetch tags & categories
	}

	return (
		<main className={styles.main}>
			<PostEditor />
		</main>
	)
}