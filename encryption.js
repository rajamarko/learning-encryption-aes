import crypto from 'crypto';
import { createIv } from './encryptionIv.js';
import { generateKeyFromPassword, createSalt } from './keyFromPassword.js';

export async function encrypt(data, password) {
	const salt = createSalt();
	const key = await generateKeyFromPassword(password, salt);
	const iv = createIv();

	const cipherText = await crypto.webcrypto.subtle.encrypt(
		{
			name: 'AES-GCM',
			iv,
		},
		key,
		data
	);

	return cipherText;
}
