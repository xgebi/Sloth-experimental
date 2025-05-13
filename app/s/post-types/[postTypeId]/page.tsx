import {getPostType} from "@/app/services/post-type.service";
import {getPostsByType} from "@/app/services/post.service";
import Link from "next/link";

export default async function SettingsPage({ params }: { params: { postTypeId : string }}) {
	const uuid = (await params).postTypeId;
	console.log(await params);
	const postType = await getPostType(uuid);
	const posts = await getPostsByType(uuid);
	console.log(uuid, postType, postType?.display_name);
	if (postType) {
		return (
			<main>
				<h1>{postType.display_name}</h1>
				<table>
					<thead>
						<tr>
							<th>Title</th>
							<th>Edit</th>
						</tr>
					</thead>
					<tbody>
					{posts.map((post) => (
						<tr key={post.uuid}>
							<td>{post.title}</td>
							<td><Link href={`/s/post-types/${uuid}/${post.uuid}`}>edit</Link></td>
						</tr>
					))}
					</tbody>
				</table>
			</main>
		)
	}
	return (
		<h1>Wrong post type</h1>
	)
}