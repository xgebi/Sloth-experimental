import sql from "@/app/db/db";

export async function getPostTypes() {
	return sql`
      select uuid, slug, display_name, tags_enabled, categories_enabled, archive_enabled
      from sloth_post_types;
	`;
}

export async function getPostType(ptId: string) {
	const result = await sql`
      select uuid, slug, display_name, tags_enabled, categories_enabled, archive_enabled
      from sloth_post_types WHERE uuid = ${ptId};
	`;
	return result.pop();
}