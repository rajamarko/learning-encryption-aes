import crypto from 'crypto';
import { loadIv } from './encryptionIv.js';
import { generateKeyFromPassword, loadSalt } from './keyFromPassword.js';

export async function decrypt(cipherText, password) {
	const salt = await loadSalt();
	const key = await generateKeyFromPassword(password, salt);
	const iv = await loadIv();

	try {
		let decrypted = await crypto.webcrypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, cipherText);
		return decrypted;
	} catch (error) {
		console.log('Unable to decrypt file.');
		process.exit();
	}
}
