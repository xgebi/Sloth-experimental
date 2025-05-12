type PostPageParams = Promise<{post_id: string}>


 // Promise<{ slug: string[] }>;

export default async function PostPage({ params }: { params: PostPageParams }) {
	const postId = (await params).post_id;
	return (
		<main>
			<h1>Post</h1>
			<p>{ postId }</p>
		</main>
	)
}