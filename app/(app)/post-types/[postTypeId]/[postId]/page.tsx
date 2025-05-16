import {getTaxonomyKindOfTypeByPostType} from "@/app/services/taxonomy";
import styles from './post.module.css';
import {PostEditor} from "@/app/components/post-editor";
import {createEmptyFullPost, FullPost} from "@/app/interfaces/post";
import {getFullPost} from "@/app/services/post.service";
type PostPageParams = Promise<{postId: string, postTypeId: string}>

export default async function PostPage({ params }: { params: PostPageParams }) {
	const postId = (await params).postId;
	const postTypeId = (await params).postTypeId;
	// fetch list of categories
	const categories = await getTaxonomyKindOfTypeByPostType(postTypeId, "category");
	// fetch list of libraries
	let post: FullPost = createEmptyFullPost();
	if (postId.toLocaleLowerCase() !== "new") {
		const fetchedPost = await getFullPost(postId);
		if (fetchedPost) {
			post = fetchedPost;
		}
		// fetch tags & categories
	} else {
		post.uuid = "new";
	}
	console.log(postId);
	return (
		<main className={styles.main}>
			<PostEditor post={post}/>
		</main>
	)
}

/*
		import {notFound} from "next/navigation";
		if (!post) {
			notFound();
		}
		revalidatePath(<url>) // revalidates path
		 */