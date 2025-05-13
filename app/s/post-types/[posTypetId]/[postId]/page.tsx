type PostPageParams = Promise<{postId: string, postTypeId: string}>


 // Promise<{ slug: string[] }>;

export default async function PostPage({ params }: { params: PostPageParams }) {
	const postId = (await params).postId;
	const postTypeId = params.postTypeId;
	// fetch list of categories
	// fetch list of libraries
	if (postId.toLocaleLowerCase() !== "new") {
		// fetch sections
		// fetch tags & categories
	}

	return (
		<main>
			<h1>Post</h1>
			<p>{ postId }</p>
		</main>
	)
}