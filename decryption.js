import crypto from 'crypto';
import { loadKey } from './encryptionKey.js';
import { loadIv } from './encryptionIv.js';

export async function decrypt(cipherText) {
	const key = await loadKey();
	const iv = await loadIv();

	try {
		let decrypted = await crypto.webcrypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, cipherText);
		return decrypted;
	} catch (error) {
		console.log('Unable to decrypt file.');
		process.exit();
	}
}
