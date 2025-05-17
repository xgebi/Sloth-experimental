import {useState} from "react";
import styles from './image-picker.module.css';
import Media from "@/app/interfaces/media";

interface ImagePickerProps {
	label: string,
	media: Media[],
	onPicked: (img: ImageData) => void
}

export interface ImageData {
	imageUrl: string,
	alt: string
}

export default function ImagePicker({ label, media, onPicked }: ImagePickerProps) {
	const [imageUrl, setImageUrl] = useState('');
	const [alt, setAlt] = useState('');
	const [dialogOpen, setDialogOpen] = useState(false)

	function processImage() {
		const imageData: ImageData = {
			imageUrl,
			alt,
		}
		setDialogOpen(false);
		// onPicked(imageData);
	}

	return (
		<>
			<button onClick={() => setDialogOpen(true)}>{label}</button>
			<dialog open={dialogOpen}>
				<section className={styles['media-picker-wrapper']}>
					{media.map((img) => (
						<article key={img.uuid}>
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img
								src={`https://www.sarahgebauer.com/${img.file_path}`}
								alt=""
							/>
						</article>
					))}
				</section>
				<button onClick={processImage}>Choose and close</button>
			</dialog>
		</>
	)
}