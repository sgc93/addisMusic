// renaming file
export const renameMusicFile = (originalFile, newFilename) => {
	const type = originalFile.type;
	const reader = new FileReader();

	return new Promise((resolve, reject) => {
		reader.onload = (event) => {
			const arrayBuffer = event.target.result;
			const blob = new Blob([arrayBuffer], { type }); // Create a new Blob with the original data

			const newFile = new File([blob], newFilename, { type });
			resolve(newFile);
		};

		reader.onerror = (error) => reject(error);
		reader.readAsArrayBuffer(originalFile);
	});
};
