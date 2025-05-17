import {SyntheticEvent, useState} from "react";
import styles from './image-picker.module.css';
import {Media} from "@/app/interfaces/media";

interface ImagePickerProps {
	label: string,
	media: Media[],
	onPicked: (img: ImageData) => void
}

export interface ImageData {
	uuid: string,
	imageUrl: string,
	alt: string
}

export default function ImagePicker({ label, media, onPicked }: ImagePickerProps) {
	const [image, setImage] = useState({
		uuid: '',
		imageUrl: '',
		alt: '',
	});
	const [dialogOpen, setDialogOpen] = useState(false)

	function processImage() {
		setDialogOpen(false);
		onPicked(image);
	}

	function pickImage(ev: SyntheticEvent) {
		const uuid = (ev.target as HTMLButtonElement).dataset['uuid'];
		const imageData = media.find((img) => img.uuid === uuid);
		if (imageData) {
			const alt = imageData.alt.find((alt) => alt.lang === "2d7f579a-4793-4254-a036-0a3b2e8da35b")
			setImage({
				uuid: imageData.uuid,
				imageUrl: imageData.file_path,
				alt: alt ? alt.alt : '',
			});
		}
	}

	function closeDialog() {
		setDialogOpen(false);
	}

	return (
		<>
			<button onClick={() => setDialogOpen(true)}>{label}</button>
			<dialog open={dialogOpen}>
				<div className={styles['media-picker-dialog']}>
					<section className={styles['media-picker-wrapper']}>
						{media.map((img) => (
							<article key={img.uuid}>
								{/* eslint-disable-next-line @next/next/no-img-element */}
								<div className={styles['image-wrapper']}>
									<img
										src={`https://www.sarahgebauer.com/${img.file_path}`}
										alt=""
									/>
								</div>
								<button data-uuid={img.uuid} onClick={pickImage}>Choose image</button>
							</article>
						))}
					</section>
					<div className={styles['media-picker-actions']}>
						<div className={styles['media-picker-header']}>
							<h2>Chosen image</h2>
							<div>
								<button onClick={closeDialog}>Close</button>
							</div>
						</div>
						<div><button onClick={processImage}>Choose and close</button></div>
					</div>
				</div>
			</dialog>
		</>
	)
}