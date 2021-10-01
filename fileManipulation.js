import fs from 'fs';

export function saveFile(fileName, data) {
	try {
		fs.writeFileSync(fileName, data);
	} catch (error) {
		console.log(error.message);
		process.exit();
	}
}

export function loadFile(fileName) {
	try {
		const loadedFile = fs.readFileSync(fileName);
		return loadedFile;
	} catch (error) {
		if (error.message.includes('key.json')) {
			throw new Error('key.json');
		}
		if (error.message.includes('iv')) {
			console.log('Cannot read iv file.');
			process.exit();
		}
		console.log(error.message);
		process.exit();
	}
}

export function toArrayBuffer(buf) {
	var ab = new ArrayBuffer(buf.length);
	var view = new Uint8Array(ab);
	for (var i = 0; i < buf.length; ++i) {
		view[i] = buf[i];
	}
	return ab;
}

export function toBuffer(ab) {
	var buf = Buffer.alloc(ab.byteLength);
	var view = new Uint8Array(ab);
	for (var i = 0; i < buf.length; ++i) {
		buf[i] = view[i];
	}
	return buf;
}

export function changeName(fileName, type) {
	const extensionRegex = /\.[0-9a-z]+$/i;
	const fileExtension = fileName.match(extensionRegex)[0];

	if (type === 'encrypted') {
		const newFileName = fileName.replace(
			fileExtension,
			`-encrypted${fileName.match(extensionRegex)[0]}`
		);
		return newFileName;
	}

	if (type === 'decrypted') {
		const newFileName = fileName.replace(
			fileExtension,
			`-decrypted${fileName.match(extensionRegex)[0]}`
		);
		return newFileName;
	}
}
