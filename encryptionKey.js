import crypto from 'crypto';
import { saveFile, loadFile } from './fileManipulation.js';

async function generateKey() {
	const key = await crypto.webcrypto.subtle.generateKey({ name: 'AES-GCM', length: 256 }, true, [
		'encrypt',
		'decrypt',
	]);
	return key;
}

async function exportKey(key) {
	const result = await crypto.webcrypto.subtle.exportKey('jwk', key);
	return result;
}

export async function createKey() {
	const key = await generateKey();
	const exportedKey = await exportKey(key);

	saveFile('key.json', JSON.stringify(exportedKey));
	console.log('New key created.');

	return key;
}

async function importKey(exportedKey) {
	const result = await crypto.webcrypto.subtle.importKey(
		'jwk',
		exportedKey,
		{ name: 'AES-GCM', length: 256 },
		true,
		['encrypt', 'decrypt']
	);
	return result;
}

export async function loadKey() {
	try {
		let savedKey = loadFile('key.json');
		const key = importKey(JSON.parse(savedKey));
		return key;
	} catch (error) {
		const key = createKey();
		return key;
	}
}
