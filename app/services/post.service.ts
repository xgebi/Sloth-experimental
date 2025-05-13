import {getPost as dbGetPost, getPosts as dbGetPosts, getPostsByType as dbGetPostsByType} from "@/app/repository/posts";
import Post from "@/app/interfaces/post";

export async function getPosts(limit = -1) {
	const fetchedResult = await dbGetPosts(limit);
	const result: Post[] = [];
	for (const row of fetchedResult) {
		result.push(row as Post);
	}
	return result;
}

export async function getPostsByType(ptId: string) {
	const fetchedResult = await dbGetPostsByType(ptId);
	const result: Post[] = [];
	for (const row of fetchedResult) {
		result.push(row as Post);
	}
	return result;
}

export async function getPost(postId: string) {
	const fetchedResult = await dbGetPost(postId);
	return fetchedResult ? fetchedResult as Post : undefined;
}