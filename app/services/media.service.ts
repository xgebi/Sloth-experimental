import {getMedia as dbGetMedia} from "@/app/repository/media.repository";
import Media from "@/app/interfaces/media";

export async function getMedia() {
	const fetchedResult = await dbGetMedia();
	const result: Media[] = [];
	for (const row of fetchedResult) {
		result.push(row as Media);
	}
	return result;
}