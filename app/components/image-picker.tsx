import {useState} from "react";

interface ImagePickerProps {
	label: string,
	onPicked: (img: ImageData) => void
}

export interface ImageData {
	imageUrl: string,
	alt: string
}

export default function ImagePicker({ label, onPicked }: ImagePickerProps) {
	const [imageUrl, setImageUrl] = useState('');
	const [alt, setAlt] = useState('');

	function processImage() {
		const imageData: ImageData = {
			imageUrl,
			alt,
		}
		onPicked(imageData);
	}

	return (
		<>
			<button>{label}</button>
			<dialog>
				<button onClick={processImage}>Choose and close</button>
			</dialog>
		</>
	)
}