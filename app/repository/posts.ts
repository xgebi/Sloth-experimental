
import {Row, RowList} from "postgres";
import sql from "@/app/db/db";

export async function getPosts(limit = -1): Promise<RowList<Row[]>> {
	const limitStr = limit >= 0 ? sql`LIMIT ${limit}` : sql``;
	return sql`
      select title
      from sloth_posts ${limitStr};
	`;
}

export async function getPostsByType(ptId: string): Promise<RowList<Row[]>> {
	return sql`
      select title, uuid
      from sloth_posts WHERE post_type = ${ptId};
	`;
}

export async function getPost(postId: string): Promise<Row | undefined> {
	const post = await sql`
    select
      title
    from sloth_posts WHERE uuid = ${postId};
  `;
	return post.pop();
}

/**
 * Suspense component from react. Shows fallback content when data is being loaded
 */