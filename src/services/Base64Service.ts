export default class Base64Service {
	static toBase64(file: File): Promise<string | ArrayBuffer> {
		return new Promise<string | ArrayBuffer>((resolve, reject) => {
			const fileReader = new FileReader();
			fileReader.readAsDataURL(file);

			fileReader.onloadend = () => {
				if (fileReader.result) {
					resolve(fileReader.result);
				} else {
					reject('Result is null');
				}
			};

			fileReader.onerror = error => {
				reject(error);
			};
		});
	}
}
