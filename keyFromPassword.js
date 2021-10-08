import crypto from 'crypto';
import { saveFile, loadFile } from './fileManipulation.js';

function getKeyMaterial(password) {
	let enc = new TextEncoder();

	const keyMaterial = crypto.webcrypto.subtle.importKey(
		'raw',
		enc.encode(password),
		'PBKDF2',
		false,
		['deriveBits', 'deriveKey']
	);
	return keyMaterial;
}

export async function generateKeyFromPassword(password, salt) {
	const keyMaterial = await getKeyMaterial(password);
	const key = await crypto.webcrypto.subtle.deriveKey(
		{
			name: 'PBKDF2',
			salt: salt,
			iterations: 100000,
			hash: 'SHA-256',
		},
		keyMaterial,
		{ name: 'AES-GCM', length: 256 },
		true,
		['encrypt', 'decrypt']
	);
	return key;
}

export function createSalt() {
	const salt = crypto.webcrypto.getRandomValues(new Uint8Array(16));
	saveFile('salt', salt);
	return salt;
}

export function loadSalt() {
	try {
		const salt = loadFile('salt');
		return salt;
	} catch (error) {
		console.log('missing salt:', error);
		process.exit();
	}
}
