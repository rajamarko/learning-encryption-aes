import crypto from 'crypto';
import { saveFile, loadFile } from './fileManipulation.js';

const generateIv = () => {
	const iv = crypto.webcrypto.getRandomValues(new Uint8Array(16));
	return iv;
};

export function createIv() {
	const iv = generateIv();
	saveFile('iv', iv);
	return iv;
}

export async function loadIv() {
	try {
		let iv = loadFile('iv');
		return iv;
	} catch (error) {
		console.log('missing IV:', error);
		const iv = createIv();
		return iv;
	}
}
